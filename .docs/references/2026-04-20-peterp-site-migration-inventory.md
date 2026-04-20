# peterp.org Migration Inventory

**Date:** 2026-04-20  
**Source:** Investigation phase of Epic #8 (migrate peterp.org to RedwoodSDK)  
**Status:** Verified by TechLead review (PASS)

This is the authoritative handoff artifact for child tasks in the migration epic. Every entry was confirmed by direct file read.

---

## Content Parity Baseline

Everything in this table must survive the migration intact.

### HTML Content

| Element | Value |
|---|---|
| Page title | Peter Pistorius |
| H1 | Hi, my name is Peter. |
| Bio paragraph 1 | "I'm a South African living in Berlin. I love programming and it tends to take all of my time, so I try to balance my life with friendship, cycling, hiking and woodwork." |
| Bio paragraph 2 | "You can follow me on [Twitter], or see my code on [GitHub]." |
| Social link — Twitter | `https://twitter.com/appfactory/` (label: "Twitter") |
| Social link — GitHub | `https://github.com/peterp/` (label: "GitHub") |
| H2 | Side Projects |
| Project list type | Ordered list (`<ol>`) |
| Project 1 — RedwoodJS | `https://redwoodjs.com` — "Bringing full-stack to the JAMstack" |
| Project 2 — Machinen | `https://machinen.dev` — "Coming soon..." ⚠️ *HTML bug: anchor is malformed; "Machinen" text is outside the `<a>` tag — must be fixed when porting, not copied* |
| Project 3 — Blackspace | `https://github.com/peterp/Blackspace` — "Add blank spaces to your macOS Dock" |
| Project 4 — Billable | `http://billable.me` — "Billing Made Simple. Period." *(HTTP, not HTTPS — preserve as-is unless confirmed to redirect)* |

### Inline CSS

Full style block (lines 8–14 of `index.html`):

```css
body {
  max-width: 480px;
  line-height: 1.6;
  padding: 20px;
}
```

No font-family, no color declarations, no media queries, no animations, no flexbox/grid. Browser defaults apply for all other visual properties.

### Meta Tags

| Tag | Value |
|---|---|
| `charset` | `UTF-8` |
| `viewport` | `width=device-width, initial-scale=1.0` |
| `http-equiv` | `X-UA-Compatible` → `ie=edge` |
| OG tags | None present |
| Description meta | None present |
| Favicon | None present |

### Domain

| File | Value |
|---|---|
| CNAME | `peterp.org` |

---

## Validated Assumptions

| Assumption | Verified? | Evidence |
|---|---|---|
| `ci.yml` is a no-op `run: "true"`, single job | ✅ | File read — line 10, single step |
| No other workflow files exist | ✅ | Directory listing — only `ci.yml` |
| CNAME = `peterp.org` | ✅ | File read — 1-line file |
| No `package.json` or lockfiles | ✅ | `ls -la` repo root |
| No `wrangler.toml` | ✅ | `ls -la` repo root |
| Inline CSS only: max-width 480px, line-height 1.6, padding 20px | ✅ | File read — lines 9–13 |
| Social links: Twitter + GitHub | ✅ | File read — lines 22–25 |
| Side projects: RedwoodJS, Machinen, Blackspace, Billable | ✅ | File read — lines 28–43 |
| No OG tags or description meta | ✅ | File read — head section |
| No favicon | ✅ | File read — no `link rel=icon` |
| `README.md` exists (fork-notice only) | ✅ | Directory listing + file read |
| No sub-tasks started in `.kindling/board/` | ✅ | `find` — only current task file present |
| Blueprint and decomposition docs exist in `.docs/` | ✅ | `find` — both files confirmed |

No priming assumptions were invalidated.

---

## Known Unknowns

These cannot be resolved from the current repo state and must be answered by child tasks as they execute:

1. **rwsdk scaffold directory structure** — `pnpm create rwsdk` output is unknown until run. Sub-issues #2 and #3 cannot identify correct component file locations until #1 completes.
2. **Styling system post-scaffold** — CSS modules vs. Tailwind vs. global stylesheet is undetermined. Sub-issue #3 cannot finalize approach until scaffold output is inspected.
3. **`README.md` overwrite behavior** — Some scaffold generators overwrite `README.md`. Sub-issue #1 should record what happens to it.
4. **Machinen HTML bug fix** — The malformed anchor is a required correction during porting (#2), not just a copy. The port task must confirm the fix renders the Machinen link as clickable text.
5. **Billable HTTP vs HTTPS** — `http://billable.me` is the documented URL. Sub-issue #2 should check whether HTTPS exists before deciding to upgrade or preserve.
6. **`CLOUDFLARE_API_TOKEN` secret** — Must be added to GitHub repo secrets by a human before the CI deploy (#6) can execute a live deploy. Not a code task.
7. **Worker name** — The wrangler worker name is unspecified in all existing docs. Sub-issue #5 must decide it.
8. **`@redwoodjs/agent-ci` package availability** — Not verified on npm. Sub-issue #7 must confirm the exact package name and current version.
9. **Testing strategy** — No tests exist and the epic does not mandate adding any. Acknowledged gap; not a blocker.

---

## Execution Order Assessment

Planned order: `#1 → (#2 ∥ #3) → #4 → (#5 ∥ #7) → #6`

**Status: UNBLOCKED.** No prior work conflicts with any phase.
