import test from 'node:test';
import assert from 'node:assert/strict';
import {diffCatalog} from '../scripts/vendor-catalog-diff.mjs';
const a={vendor:'microsoft',externalId:'AZ-900',title:'Azure Fundamentals',type:'course',sourceUrl:'https://learn.microsoft.com/en-us/training/'};
const t='2026-11-05T00:00:00.000Z';
test('same source yields no changes',()=>{const r=diffCatalog([a],[a],t);assert.deepEqual(r.counts,{new:0,changed:0,unchanged:1,missing_candidate:0});});
test('precise change report and immutable approval',()=>{
 const r=diffCatalog([{...a,reviewStatus:'approved',academyOfferingStatus:'approved_offering'}],[{...a,title:'Updated'}],t);
 assert.equal(r.changes[0].status,'changed');assert.deepEqual(r.changes[0].changedFields,['title']);
 assert.equal(r.changes[0].record.reviewStatus,'approved');
});
test('vendor cannot self-approve new offerings',()=>{
 const r=diffCatalog([],[{...a,reviewStatus:'approved',academyOfferingStatus:'approved_offering'}],t);
 assert.equal(r.changes[0].record.reviewStatus,'unreviewed');assert.equal(r.changes[0].record.academyOfferingStatus,'not_offered');
});
test('missing item not deleted',()=>{assert.equal(diffCatalog([a],[],t).changes[0].status,'missing_candidate');});
test('duplicate vendor IDs rejected',()=>assert.throws(()=>diffCatalog([],[a,a],t),/Duplicate/));
test('insecure URL rejected',()=>assert.throws(()=>diffCatalog([],[{...a,sourceUrl:'http://example.com'}],t),/HTTPS/));
