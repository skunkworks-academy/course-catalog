#!/usr/bin/env node
// Safe metadata-only vendor catalogue diff. No public publishing or courseware retrieval.
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export const VENDORS = new Set(['microsoft','ibm','comptia','cisco','google','skunkworks']);
const TYPES = new Set(['course','module','learning_path','certification','exam','lab']);
const keyOf = r => `${r.vendor}:${r.externalId}`;

export function normalize(input, checkedAt = new Date().toISOString()) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Course must be an object');
  const {vendor, externalId, title, type, sourceUrl} = input;
  if (!VENDORS.has(vendor)) throw new Error('Unknown vendor');
  if (typeof externalId !== 'string' || !externalId.trim()) throw new Error('Missing externalId');
  if (typeof title !== 'string' || !title.trim()) throw new Error('Missing title');
  if (!TYPES.has(type)) throw new Error('Unknown course type');
  let url; try { url = new URL(sourceUrl); } catch { throw new Error('Invalid sourceUrl'); }
  if (url.protocol !== 'https:') throw new Error('sourceUrl must be HTTPS');
  return {vendor, externalId: externalId.trim(), title: title.trim(), type,
    sourceUrl: url.toString(), checkedAt,
    reviewStatus: input.reviewStatus === 'approved' ? 'approved' : 'unreviewed',
    academyOfferingStatus: input.academyOfferingStatus === 'approved_offering' ? 'approved_offering' : 'not_offered'};
}

export function diffCatalog(previous, incoming, checkedAt = new Date().toISOString()) {
  if (!Array.isArray(previous) || !Array.isArray(incoming)) throw new Error('Both inputs must be arrays');
  const prior = new Map(), next = new Map();
  for (const r of previous) { const v=normalize(r,checkedAt); const k=keyOf(v);
    if(prior.has(k)) throw new Error(`Duplicate previous ID: ${k}`); prior.set(k,v); }
  for (const r of incoming) { const v=normalize(r,checkedAt); const k=keyOf(v);
    if(next.has(k)) throw new Error(`Duplicate incoming ID: ${k}`); next.set(k,v); }
  const changes=[];
  for (const [k,v] of next) {
    const old=prior.get(k);
    const fields=['title','type','sourceUrl'];
    const modified=old ? fields.filter(f=>old[f]!==v[f]) : [];
    changes.push({key:k,status:!old?'new':modified.length?'changed':'unchanged',
      changedFields:modified,record:{...v,
        // An incoming vendor feed must never authorize publication or enrolment.
        reviewStatus:old?.reviewStatus ?? 'unreviewed',
        academyOfferingStatus:old?.academyOfferingStatus ?? 'not_offered'}});
  }
  // A missing item is only a candidate. Never delete/retire on a single sync.
  for (const [k,v] of prior) if(!next.has(k))
    changes.push({key:k,status:'missing_candidate',changedFields:[],record:v});
  return {checkedAt,counts:Object.fromEntries(['new','changed','unchanged','missing_candidate'].map(s=>[s,changes.filter(c=>c.status===s).length])),changes};
}

function cli() {
  const [previousPath,incomingPath,...options]=process.argv.slice(2);
  if (!previousPath || !incomingPath) {
    console.error('Usage: node scripts/vendor-catalog-diff.mjs previous.json incoming.json [--output=draft.json]');
    process.exitCode=2;return;
  }
  try {
    const previous=JSON.parse(readFileSync(previousPath,'utf8'));
    const incoming=JSON.parse(readFileSync(incomingPath,'utf8'));
    const report=diffCatalog(previous,incoming);
    const output=options.find(a=>a.startsWith('--output='));
    if(output) writeFileSync(output.slice(9),JSON.stringify(report,null,2)+'\n',{flag:'wx'});
    else process.stdout.write(JSON.stringify(report,null,2)+'\n');
  } catch(e) {console.error(e.message);process.exitCode=1;}
}
if (process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) cli();
