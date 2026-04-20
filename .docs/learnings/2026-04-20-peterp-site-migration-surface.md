# peterp.org Migration Surface — Investigation Findings

**Investigated:** `redwoodjs/kindling-dogfood-peterp-site`
**Phase:** Investigation (Phase 1) — completed
**Review gate:** PASS (TechLead, 2026-04-20)
**Epic:** #8 Migrate peterp.org to RedwoodSDK

---

## 1. Summary

The repository contains a single static `index.html` (46 lines) served via GitHub Pages under the custom domain `peterp.org`. The page renders a minimal personal bio, two social links, and a four-entry side-projects list. Styling consists of exactly three CSS rules applied to the `<body>` element: `max-width: 480px`, `line-height: 1.6`, and `padding: 20px`. No JavaScript, no images, no external stylesheets, and no runtime dependencies exist in the current repository. The CI workflow is a confirmed no-op (`run: "true"`). No scaffold work has been attempted; the git history contains only documentation bootstrapping commits.

---

## 2. Full Content Inventory

### `index.html` — 46 lines

**Meta tags (lines 3–7):**
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Peter Pistorius</title>
```
No Open Graph tags, no description `<meta>`, no Twitter card tags, no favicon `<link>`.

**Inline CSS (lines 8–14):**
```css
body {
  max-width: 480px;
  line-height: 1.6;
  padding: 20px;
}
```
- Color palette: not specified (browser defaults: black text, white background)
- Font families: not specified (browser defaults)
- Layout: single-column, centered via `max-width` + implicit auto margins
- Responsive breakpoints: none (no media queries)
- Animations: none
- External stylesheets: none

**Content sections:**

*Heading (line 18):*
```html
<h1>Hi, my name is Peter.</h1>
```

*Bio paragraph (line 20):*
> I'm a South African living in Berlin. I love programming and it tends to take all of my time, so I try to balance my life with friendship, cycling, hiking and woodwork.

*Social links (lines 22–25):*
| Label | URL |
|-------|-----|
| Twitter | `https://twitter.com/appfactory/` |
| GitHub | `https://github.com/peterp/` |

*Side projects (lines 27–43):*
| # | Name | URL | Description |
|---|------|-----|-------------|
| 1 | RedwoodJS | `https://redwoodjs.com` | Bringing full-stack to the JAMstack |
| 2 | Machinen | `https://machinen.dev` | Coming soon... |
| 3 | Blackspace | `https://github.com/peterp/Blackspace` | Add blank spaces to your macOS Dock |
| 4 | Billable | `http://billable.me` | Billing Made Simple. Period. |

*HTML bug (line 33):* The Machinen entry contains a malformed closing anchor:
```html
<a href="https://machinen.dev"></a><i>Machinen</i></a>
```
The `<i>` element is placed outside the anchor. Browsers tolerate this; rwsdk port should render it correctly as an inline `<i>` inside the anchor.

**JavaScript:** None. No `<script>` tags in the file.
**Images / assets:** None. No `<img>`, `<video>`, `<audio>`, or `<object>` elements.

---

## 3. Migration Surface Table

| Category | What exists | What must survive |
|---|---|---|
| **Bio text** | H1 greeting + 1 bio paragraph | All text verbatim |
| **Social links** | Twitter, GitHub (2 URLs) | URLs and link labels preserved |
| **Side projects** | 4 entries (name, URL, description) | All names, URLs, descriptions verbatim |
| **Meta / SEO** | charset, viewport, X-UA-Compatible, title | Title "Peter Pistorius" must be preserved |
| **Styling** | 3 CSS rules on `body` only | Visual result: constrained width, readable line spacing, padding |
| **JavaScript** | None | Nothing to port |
| **Images / assets** | None | Nothing to port |
| **Interactive** | None (links are outbound only) | Nothing to port |
| **Domain** | `peterp.org` via CNAME file | CNAME stays; DNS migration separate from epic scope |
| **CI** | No-op `run: "true"` workflow | Must be replaced in #6 |

---

## 4. Known Unknowns

Items that cannot be resolved from the current repository. Child tasks must handle these:

| # | Unknown | Impact |
|---|---------|--------|
| KU-1 | rwsdk scaffold output structure | #2 and #3 need to know where routes and components live |
| KU-2 | rwsdk default styling system (CSS modules / Tailwind / global CSS) | #3 must decide/adopt the appropriate approach |
| KU-3 | Deploy command (`pnpm release` vs `wrangler deploy`) | #5 and #6 must align on the correct command |
| KU-4 | `CLOUDFLARE_API_TOKEN` repository secret configuration | #6 needs the exact secret name and repo-level setup |
| KU-5 | Any Cloudflare Worker bindings (KV, D1, etc.) needed | #5 must configure bindings if site requires them |
| KU-6 | Testing strategy for the rwsdk app | #4 has no defined acceptance criteria for tests |
| KU-7 | `agent-ci` installation details and invocation interface | #7 needs exact setup and usage steps |

---

## 5. Sub-Issue Readiness Assessment

| Issue | Protocol | Prerequisite status | Blocking |
|-------|----------|---------------------|----------|
| #1 Scaffold | `scaffold` | **Green** — repo is clean, no prior scaffold, pnpm available | None |
| #2 Port content | `port` | **Blocked** — needs #1 scaffold output structure | KU-1 |
| #3 Port styles | `port` | **Blocked** — needs #1 scaffold output structure; style approach TBD | KU-1, KU-2 |
| #4 Verify local dev | `fix` | **Blocked** — needs #2 and #3 complete | #2, #3 |
| #5 Wrangler config | `infra` | **Blocked** — needs #1 scaffold output; deploy command TBD | KU-1, KU-3 |
| #6 CI deploy workflow | `infra` | **Blocked** — needs #5 wrangler config; secret name TBD | KU-4 |
| #7 agent-ci | `infra` | **Blocked** — needs #1 scaffold; interface TBD | KU-7 |

---

## 6. Epic Dependency Graph

Confirmed from `epic-decomposition.md` (lines 83–95):

```
#1 (scaffold)
    ↓
#2 (port content) ─┬─ #3 (port styles)
                   ↓
                  #4 (verify local dev)
                   ↓
#5 (wrangler config) ─┬─ #7 (agent-ci)
                      ↓
                     #6 (CI deploy workflow)
```

**Phase 1:** #1 — Foundation; unblocked.
**Phase 2:** #2, #3 — Content and style porting; parallel after #1.
**Phase 3:** #4 — Verification; after #2 and #3 complete.
**Phase 4:** #5, #7 — Infrastructure; parallel after #1.
**Phase 5:** #6 — CI workflow; after #5 (ideally after #7 for local validation).

---

## 7. Other Files in Repo

Complete file list (excluding `.git/`):
```
.docs/blueprints/overview.md
.docs/epic-decomposition.md
.github/PULL_REQUEST_TEMPLATE.md
.github/workflows/ci.yml
.kindling/board/doing/2026-04-20-2341-you-are-the-investigation-leg-of-an-orch-f555.md
CNAME
README.md
index.html
```

- No `package.json`, `pnpm-lock.yaml`, `yarn.lock`, or `package-lock.json`
- No `wrangler.toml`
- No `CLAUDE.md`
- No `agent-ci` setup
- Kindling board is empty except for the current investigation task file in `doing/`
