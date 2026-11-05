#!/usr/bin/env node
// Convert explicit, approved-for-discovery Skunkworks manifests into normalized
// course metadata. This never reads lesson bodies or publishes offerings.
import {readFileSync,writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {normalize} from './vendor-catalog-diff.mjs';

export function importSkunkworksManifest(manifest,checkedAt=new Date().toISOString()) {
  if (!manifest || typeof manifest!=='object' || Array.isArray(manifest) ||
      manifest.schemaVersion!==1 || !Array.isArray(manifest.courses)) {
    throw new Error('Expected schemaVersion 1 and a courses array');
  }
  const seen=new Set();
  return manifest.courses.map((entry,index)=>{
    if (!entry || typeof entry!=='object' || entry.discoverable!==true)
      throw new Error(`Course ${index}: explicit discoverable=true required`);
    const record=normalize({...entry,vendor:'skunkworks',reviewStatus:'unreviewed',
      academyOfferingStatus:'not_offered'},checkedAt);
    if(seen.has(record.externalId)) throw new Error(`Duplicate course ID: ${record.externalId}`);
    seen.add(record.externalId);
    return record;
  });
}
function main() {
  const [filename,...flags]=process.argv.slice(2);
  if(!filename) {console.error('Usage: node scripts/import-skunkworks-manifest.mjs manifest.json [--output=records.json]');process.exitCode=2;return;}
  try {
    const records=importSkunkworksManifest(JSON.parse(readFileSync(filename,'utf8')));
    const serialized=JSON.stringify(records,null,2)+'\n';
    const output=flags.find(x=>x.startsWith('--output='));
    if(output) writeFileSync(output.slice(9),serialized,{flag:'wx'});
    else process.stdout.write(serialized);
  }catch(error){console.error(error.message);process.exitCode=1;}
}
if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) main();
