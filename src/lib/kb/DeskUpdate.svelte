<script lang="ts">
  import update from '#lib/data/desk-update.json';
  import { groups } from '#lib/kb/investigation';
  import filedIssues from '#lib/data/filed-issues.json';
  const count = (cause: string) => groups.find(g => g.cause === cause)?.reports.length ?? 0;
  const url = (cause: string) => (filedIssues as Record<string,{url:string}>)[cause]?.url;
</script>

<section aria-label="Current desk disposition">
  <h2>Later desk update: closed, with different outcomes</h2>
  <p>The <a href={update.source}>course desk update</a>, observed {update.observedOn}, says
    desk #{update.parentTicket} closed on <strong>{update.closedOn}</strong>.
    This is newer than the October 4 export and supersedes its “known / queued” status.</p>
  <table>
    <thead><tr><th>Problem</th><th>Historical reports</th><th>Desk outcome</th><th>Engineering note (verbatim)</th><th>Our issue</th></tr></thead>
    <tbody>{#each update.outcomes as outcome (outcome.cause)}
      <tr><td>{outcome.cause}</td><td>{count(outcome.cause)}</td><td><strong>{outcome.status}</strong></td>
        <td>{outcome.note}</td><td><a href={url(outcome.cause)}>#{outcome.issue}</a> · {outcome.stateReason}</td></tr>
    {/each}</tbody>
  </table>
  <p>Close the parser issue as completed on the desk's fix report.
    Close the hint issue as not planned: the form was retired, not repaired.
    Do not describe “won't fix” as a fix, or infer that a closed parent resolves every symptom.</p>
  <p>These are dispositions reported by the desk, not independently reproduced deployment tests.
    The historical counts and the five unexplained reports remain visible; no updated report export was supplied.
    Validate any new recurrence against current product behavior rather than applying a retired form's guidance.</p>
</section>
