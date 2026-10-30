# MEGA.dev S01E03 — what it shows

Investigation of support ticket **#4471**, based on the course's **2026-10-04 KB export**.

**Solved: the course accepted the final submission on 2026-10-30 at 13:44:34 UTC.**
The later desk update says #4471 closed October 5: parser FIXED, hint WON'T FIX (booking-v3 retired).
Our issue closure reasons preserve that distinction; no independent deployment test is claimed.

Course result: [`evidence/course-result.json`](evidence/course-result.json).
Private course debrief (enrolled owner): https://hq.mega.dev/challenges/what-it-shows#debrief

## Deliverables

- Signed source: [`src/routes/kb/incidents/4471-review/+page.svx`](src/routes/kb/incidents/4471-review/+page.svx).
- Readable self-contained SSR snapshot: [`rendered.html`](rendered.html) (download and open in a browser).
- Fully rendered static KB with client-side components: [`build/kb/incidents/4471-review/index.html`](build/kb/incidents/4471-review/index.html).
- Auditable cause membership: [`evidence/membership.json`](evidence/membership.json).
- Reproducible assertions: [`evidence/check.json`](evidence/check.json).
- Public issues: [parser — 379 reports (#1)](https://github.com/Swiatlomost/megadev-s01e03-what-it-shows/issues/1), [hint — 33 reports (#2)](https://github.com/Swiatlomost/megadev-s01e03-what-it-shows/issues/2).
- Versioned issue bodies: [parser](issue-drafts/parser.md), [hint](issue-drafts/hint.md).

## Findings

427 exported rows contain **412 unique reports**, not 427 independent reports.
The original tenant-aware code classifies **379 as parser** and **33 as hint**.
38 intake tags disagree with that classification. Browser locale is not tenant locale.

Five anomalous reports remain included in parser according to that code, but their symptoms
are not explained by a proven month/day swap. The review preserves their exact wording and
asks for reproduction evidence rather than inventing a third demonstrated cause.

The July merge spike is not incident onset: receipt timestamps show an older backlog.
The original accepted decision 0001 is preserved byte-for-byte. Decision 0002 and the
current triage guide explain why matching subject lines cannot establish duplicate causes.

The export does not prove all reports belong to sched-prod, or that a report equals an affected person.

## Later desk update and closure

The course page supplies a later engineering update, observed October 30, for October 5:

- Parser: **FIXED** — `fix(dates): parse dd/mm for eu locales`. Issue #1 closes as **completed**.
- Hint: **WON'T FIX** — `booking-v3 form retired`. Issue #2 closes as **not planned**, not as fixed.

See `src/lib/data/desk-update.json` and the rendered DeskUpdate component. The export ZIP itself
has not changed. Historical counts and unexplained symptoms are retained; a closed parent
is not proof that all behavior was repaired.

## Reproduce

Requires Node 22.23+ and npm.

```sh
npm ci --ignore-scripts
node scripts/check.mjs
npm run build
npm run preview -- --port 4173
```

Open http://127.0.0.1:4173/kb/incidents/4471-review/ .

The source is real mdsvex and Svelte 5. Tables, charts, duplicate examples and desk ref
are computed by the exported components during the build, not fabricated as HTML.
The self-contained snapshot is extracted from that actual build; it has inline CSS and
no JavaScript. Use the full static build for the interactive duplicate explorer.
To regenerate the snapshot after building, run `python scripts/snapshot.py` with
BeautifulSoup 4 available. Browser checks and screenshots were run locally with Playwright;
see `evidence/browser-check.json` for their result.

The signature in the added pages is the course-issued authorship proof required by this
Challenge, **not a GitHub credential**. Account credentials, session data, private request logs,
and personal course notebooks are not included.

## Scope

Original course-export logic and data are retained in `src/lib`.
Added analysis lives in `investigation.ts` and `InvestigationEvidence.svelte`.
No actual product runtime was supplied, so this is a support investigation, not a tested product repair.
