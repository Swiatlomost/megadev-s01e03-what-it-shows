# hint: 33 unique reports from #4471

## Problem

The booking-v3 form prints MM/DD/YYYY for day-first tenants, but interprets input in the tenant date order. Following the hint produces a wrong date. This is distinct from the shared invite parser.

## Count and provenance

- **33 unique report IDs**, across 3 tenants.
- Received: 2026-04-17 through 2026-09-22.
- Source: support KB export of 2026-10-04, not the current live desk.
- Both issues partition the 412 unique IDs. The export contains 427 rows; 15 overlap rows repeat identical IDs.
- Computed with the exported uniqueById, groupByCause, causeOf and tenant directory, not browser locale or intake tags.
- Intake labels within this group: {"hint": 18, "parser": 15}.
- Reproducible evidence: [membership](https://github.com/Swiatlomost/megadev-s01e03-what-it-shows/blob/main/evidence/membership.json), [signed source](https://github.com/Swiatlomost/megadev-s01e03-what-it-shows/blob/main/src/routes/kb/incidents/4471-review/+page.svx), [rendered snapshot](https://github.com/Swiatlomost/megadev-s01e03-what-it-shows/blob/main/rendered.html).

## Representative original reports

- **R-41230** — copper.studio, es-ES, booking-v3, form; intake tag parser.
  > My client came on 1 June instead of 6 January. We sorted it out.

- **R-41241** — alder.physio, de-DE, booking-v3, form; intake tag hint.
  > We had two people show up on 8 June. They were booked for 6 August.

## Acceptance checks

Make the displayed date hint and form parsing agree for each tenant locale. Add booking-v3 day-first form regressions independently of the shared parser fix.

Compare expected date, original input, stored date and invite/form output.
A merge or “known” label is not a fix. Keep this issue open pending a verified fix.
Reconcile new desk reports separately before claiming current coverage.

## Membership

<details><summary>33 report IDs (one ID counts once)</summary>

R-41230, R-41241, R-41251, R-41259, R-41262, R-41275, R-41294, R-41305, R-41308, R-41366, R-41372, R-41384, R-41387, R-41396, R-41400, R-41406, R-41415, R-41416, R-41418, R-41428, R-41439, R-41441, R-41449, R-41453, R-41456, R-41460, R-41472, R-41485, R-41493, R-41539, R-41572, R-41582, R-41584

</details>
