import test from 'node:test';
import assert from 'node:assert/strict';
import {importSkunkworksManifest} from '../scripts/import-skunkworks-manifest.mjs';

const course={externalId:'SW-NET-001',title:'Networking Essentials',type:'course',
  sourceUrl:'https://www.skunkworksacademy.com/networking/',discoverable:true};
const input={schemaVersion:1,courses:[course]};
test('imports explicit Skunkworks discovery metadata',()=>{
 const [record]=importSkunkworksManifest(input,'2026-11-05T00:00:00.000Z');
 assert.equal(record.vendor,'skunkworks');
 assert.equal(record.externalId,'SW-NET-001');
 assert.equal(record.reviewStatus,'unreviewed');
 assert.equal(record.academyOfferingStatus,'not_offered');
});
test('requires explicit course discoverability',()=>assert.throws(
 ()=>importSkunkworksManifest({schemaVersion:1,courses:[{...course,discoverable:false}]}),/discoverable/));
test('rejects duplicate IDs',()=>assert.throws(
 ()=>importSkunkworksManifest({schemaVersion:1,courses:[course,course]}),/Duplicate/));
test('rejects malformed manifest',()=>assert.throws(
 ()=>importSkunkworksManifest({courses:[course]}),/schemaVersion/));
test('rejects non-HTTPS source references',()=>assert.throws(
 ()=>importSkunkworksManifest({schemaVersion:1,courses:[{...course,sourceUrl:'http://example.com'}]}),/HTTPS/));
