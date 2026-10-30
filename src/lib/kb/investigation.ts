import input from '#lib/data/reports-4471.json';
import notes from '#lib/data/desk-notes.json';
import { groupByCause, uniqueById, causeOf, type Report } from '#lib/kb/causes';
import { tenantOf } from '#lib/kb/locales';

export const raw = input as Report[];
export const reports = uniqueById(raw).filter(r => r.mergedInto === 4471);
export const groups = groupByCause(reports, tenantOf);
export const mismatches = reports.filter(r => r.meta.intakeTag !== causeOf(r, tenantOf(r)));
export const anomalies = reports.filter(r => notes.oneDayMove.includes(r.id));
export const receivedBeforeJuly = reports.filter(r => r.receivedAt.slice(0,10) < '2026-07-01').length;
export const mergedOnJuly2 = reports.filter(r => r.mergedAt?.slice(0,10) === '2026-07-02').length;
export const byMonth = [...new Set(reports.map(r => r.receivedAt.slice(0,7)))].sort().map(month => ({
  month,
  received: reports.filter(r => r.receivedAt.startsWith(month)).length,
  merged: reports.filter(r => r.mergedAt?.startsWith(month)).length,
}));
export const evidence = groups.map(g => ({
  cause:g.cause, count:g.reports.length, tenants:g.tenants,
  firstSeen:g.firstSeen, lastSeen:g.lastSeen, taggedAs:g.taggedAs,
  reportIds:g.reports.map(r => r.id),
}));
