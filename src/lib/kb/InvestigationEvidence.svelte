<script lang="ts">
  import { raw, reports, groups, mismatches, anomalies, receivedBeforeJuly, mergedOnJuly2, byMonth } from '#lib/kb/investigation';
</script>

<section aria-label="Reconciled counts">
  <h2>Count each report once</h2>
  <p><strong>{raw.length}</strong> exported rows − <strong>{raw.length - reports.length}</strong> repeated IDs
    = <strong>{reports.length}</strong> unique reports merged into #4471.
    Repeated rows are identical, not new customer reports.</p>
  <p><strong>{mismatches.length}</strong> intake tags disagree with the tenant-aware cause.
    Browser locale and intake tags are guesses, not the customer's booking configuration.</p>
  <table>
    <thead><tr><th>Problem</th><th>Unique reports</th><th>Tenants</th><th>First received</th><th>Last received</th></tr></thead>
    <tbody>{#each groups as g (g.cause)}
      <tr><td>{g.cause}</td><td>{g.reports.length}</td><td>{g.tenants}</td><td>{g.firstSeen}</td><td>{g.lastSeen}</td></tr>
    {/each}</tbody>
  </table>
</section>

<section aria-label="Received versus merged">
  <h2>Receipt time is not merge time</h2>
  <p><strong>{receivedBeforeJuly}</strong> reports arrived before July.
    <strong>{mergedOnJuly2}</strong> were merged on July 2.
    The merge spike is a backlog processing event, not the onset of a new incident.</p>
  <table>
    <thead><tr><th>Month</th><th>Received</th><th>Merged</th></tr></thead>
    <tbody>{#each byMonth as row (row.month)}<tr><td>{row.month}</td><td>{row.received}</td><td>{row.merged}</td></tr>{/each}</tbody>
  </table>
</section>

<section aria-label="Unresolved anomalous reports">
  <h2>Unexplained symptoms: preserve, do not invent a cause</h2>
  <p>The desk marked <strong>{anomalies.length}</strong> reports as one-day moves.
    The current tenant-based classifier files these under parser, and they remain included in its count.
    Their wording does not establish a month/day swap or a single shared cause.
    Time zones, DST and delivery order are hypotheses to investigate, not verified diagnoses.
    They are not an additional disjoint counted problem in this export.</p>
  <table>
    <thead><tr><th>ID</th><th>Tenant / channel</th><th>Exact report</th></tr></thead>
    <tbody>{#each anomalies as r (r.id)}<tr><td>{r.id}</td><td>{r.tenant} / {r.channel}</td><td>{r.body}</td></tr>{/each}</tbody>
  </table>
  <p>Next investigation: obtain original input, expected date, stored value, invite payload,
    tenant and recipient time zones, timestamps and form version for each ID.
    Split again only when evidence establishes a distinct cause; do not count a report twice.</p>
</section>

<section aria-label="Report membership">
  <h2>Auditable membership</h2>
  {#each groups as g (g.cause)}
    <details><summary>{g.cause}: {g.reports.length} report IDs</summary><p>{g.reports.map(r => r.id).join(', ')}</p></details>
  {/each}
</section>
