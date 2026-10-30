import { createServer } from 'vite';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const server = await createServer({server:{middlewareMode:true},appType:'custom'});
try {
  const {raw,reports,groups,mismatches,anomalies,receivedBeforeJuly,mergedOnJuly2,evidence} =
    await server.ssrLoadModule('/src/lib/kb/investigation.ts');
  const {dayFirst,sameCause} = await server.ssrLoadModule('/src/lib/kb/causes.ts');
  const {tenantOf} = await server.ssrLoadModule('/src/lib/kb/locales.ts');
  const {DEDUPE_CASES} = await server.ssrLoadModule('/src/lib/kb/dedupe-cases.ts');
  assert.equal(raw.length,427);
  assert.equal(reports.length,412);
  assert.equal(new Set(reports.map(r=>r.id)).size,412);
  assert.deepEqual(groups.map(g=>[g.cause,g.reports.length]),[['parser',379],['hint',33]]);
  assert.equal(mismatches.length,38);
  assert.equal(anomalies.length,5);
  assert.equal(receivedBeforeJuly,179);
  assert.equal(mergedOnJuly2,184);
  assert.deepEqual(DEDUPE_CASES.map(c=>sameCause(c.a,tenantOf(c.a),c.b,tenantOf(c.b))),[true,false,false,true,false]);
  assert.equal(dayFirst('en-US'),false);
  assert.equal(dayFirst('pl-PL'),true);
  const {default:deskUpdate} = await server.ssrLoadModule('/src/lib/data/desk-update.json');
  assert.equal(deskUpdate.closedOn,'2026-10-05');
  assert.deepEqual(deskUpdate.outcomes.map(x=>[x.cause,x.status,x.stateReason]),[['parser','FIXED','completed'],['hint',"WON'T FIX",'not_planned']]);
  const membership=groups.flatMap(g=>g.reports.map(r=>r.id));
  assert.equal(new Set(membership).size,412);
  for(const r of raw) assert.deepEqual(r,reports.find(u=>u.id===r.id));
  mkdirSync('evidence',{recursive:true});
  writeFileSync('evidence/membership.json',JSON.stringify(evidence,null,2)+'\n');
  writeFileSync('evidence/check.json',JSON.stringify({ok:true,raw:raw.length,unique:reports.length,duplicates:raw.length-reports.length,groups:groups.map(g=>({cause:g.cause,count:g.reports.length})),mismatches:mismatches.length,anomalyIds:anomalies.map(r=>r.id),dedupeCases:[true,false,false,true,false]},null,2)+'\n');
  console.log('PASS: unique IDs, tenant-aware counts, overlap, intake mismatches, anomalous reports, time axis, all dedupe cases.');
} finally {await server.close();}
