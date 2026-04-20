# Phase 1 Findings: peterp.org Repo State Investigation

Produced by direct file reads. Session: fresh (this is a re-run of phase 1 following prior output loss).

---

## Current Repo Files

Root directory contains:
- `index.html` — the entire site (45 lines)
- `CNAME` — single domain file
- `README.md` — fork notice (3 lines)
- `.github/workflows/ci.yml` — no-op CI placeholder
- `.docs/` — blueprints and reference artifacts
- `.kindling/board/` — kanban task tracking
- `.git/` — git metadata

**No `package.json`, no `pnpm-lock.yaml`, no `node_modules/`, no `wrangler.toml`.** The repo is a clean static site at this point.

---

## Content Inventory

### index.html — Full Content

**Lines 1-15 (head):**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Peter Pistorius</title>
  <style>
    body {
      max-width: 480px;
      line-height: 1.6;
      padding: 20px;
    }
  </style>
</head>
```

**Meta tags present:** charset (UTF-8), viewport, X-UA-Compatible, title (Peter Pistorius).
**Meta tags absent:** description, OG tags, favicon, canonical.

**Lines 17-44 (body):**
```html
<body>
  <h1>Hi, my name is Peter.</h1>

  <p>I'm a South African living in Berlin. I love programming and it tends to take all of my time, so I try to balance my life with friendship, cycling, hiking and woodwork.</p>

  <p>You can follow me on
    <a href="https://twitter.com/appfactory/">Twitter</a>, or see my code on
    <a href="https://github.com/peterp/">GitHub</a>.
  </p>

  <h2>Side Projects</h2>
  <ol>
    <li>
      <a href="https://redwoodjs.com"><i>RedwoodJS</i></a> &dash; Bringing full-stack to the JAMstack
    </li>
    <li>
      <a href="https://machinen.dev"></a><i>Machinen</i></a> &dash; Coming soon...
    </li>
    <li>
      <a href="https://github.com/peterp/Blackspace">
        <i>Blackspace</i>
      </a> &dash; Add blank spaces to your macOS Dock</li>
    <li>
      <a href="http://billable.me">
        <i>Billable</i>
      </a> &dash; Billing Made Simple. Period.</li>
  </ol>
</body>
```

### Bio Text (verbatim)

**Heading:** "Hi, my name is Peter."
**Paragraph 1:** "I'm a South African living in Berlin. I love programming and it tends to take all of my time, so I try to balance my life with friendship, cycling, hiking and woodwork."
**Paragraph 2:** Social links inline within text (Twitter + GitHub).

### Social Links

| Label | URL |
|---|---|
| Twitter | https://twitter.com/appfactory/ |
| GitHub | https://github.com/peterp/ |

### Side Projects (ordered list)

| # | Name | URL | Description | HTML Note |
|---|---|---|---|---|
| 1 | RedwoodJS | https://redwoodjs.com | "Bringing full-stack to the JAMstack" | `<i>` for name |
| 2 | Machinen | https://machinen.dev | "Coming soon..." | **BROKEN anchor** — `<a href="https://machinen.dev"></a><i>Machinen</i></a>` — "Machinen" text is outside the anchor; must be fixed in port |
| 3 | Blackspace | https://github.com/peterp/Blackspace | "Add blank spaces to your macOS Dock" | `<i>` for name |
| 4 | Billable | http://billable.me | "Billing Made Simple. Period." | `<i>` for name. **Plain HTTP** — decide on HTTPS upgrade |

### Inline CSS (complete, lines 8-15)

```css
body {
  max-width: 480px;
  line-height: 1.6;
  padding: 20px;
}
```

- Font families: none declared (browser default)
- Color palette: none declared (browser default black on white)
- Layout: plain block — no flexbox, no grid
- Responsive breakpoints: none
- Animations: none
- External stylesheets: none

---

## CNAME

```
peterp.org
```

Single line, exact domain confirmed.

---

## CI Workflow — `.github/workflows/ci.yml`

```yaml
name: CI
on:
  pull_request:
  push:
    branches: [master]
jobs:
  pass:
    runs-on: ubuntu-latest
    steps:
      - run: "true"
```

Confirmed no-op. No other workflow files exist.

---

## README.md

```
> **Kindling dogfood fork.** This is a fork of [peterp/peterp.github.io](https://github.com/peterp/peterp.github.io) used as a live test example for the [kindling](https://github.com/redwoodjs/kindling) agentic harness. Pull requests, issues, and commits here are produced by kindling tasks in the course of dogfooding the agent. For the real peterp.org site, go upstream.
```

Three-line fork notice. No package files, no build instructions.

---

## Kindling Board State

- `inbox/`: empty
- `todo/`: empty
- `doing/`: one file — `2026-04-20-2341-you-are-the-investigation-leg-of-an-orch-f555.md` (prior session artifact)
- `in-review/`: empty
- `done/`: empty
- `dormant/`: empty
- `archived/`: empty

No sub-tasks from the epic decomposition have been started or completed.

---

## `.docs/` Artifacts

- `.docs/epic-decomposition.md` — Full decomposition of epic #8 into 7 sub-issues with protocols, dependency graph, and tooling constraints. Sub-issues #1–#7 are all OPEN.
- `.docs/references/peterp-site-migration-inventory.md` — Prior session's full content inventory. Confirms the same content found in this session's investigation. Includes per-sub-issue notes and known unknowns table.
- `.docs/blueprints/overview.md` — Architecture blueprint describing current vs. target state (static HTML → rwsdk on Cloudflare Workers), current directory map, and known unknowns (scaffold structure TBD, styling approach TBD).

---

## Git History

```
8ff3889 harness: save uncommitted work from TechLead (cycle 2) [skip ci]
ac7552c harness: save uncommitted work from Analyst (cycle 1) [skip ci]
096bb11 harness: save uncommitted work from Analyst (cycle 1) [skip ci]
3e5de85 harness: save uncommitted work from Analyst (cycle 1) [skip ci]
5313d5a kindling: bootstrap .docs/blueprints/overview.md [skip ci]
48884c4 docs: add epic decomposition and initial blueprint
9dc396a kindling: start task [skip ci]
689c25a chore: fix placeholder CI shell quoting
```

No prior scaffold or migration attempts. Harness save commits only. Last real work was fixing CI shell quoting.

---

## Known Unknowns (for child task guidance)

| Unknown | Affects |
|---|---|
| rwsdk scaffold directory structure — entry point path, component/page location | #1, #2, #3 |
| Styling approach post-scaffold — CSS modules, Tailwind, or global CSS | #3 |
| `<title>` placement — layout component vs. per-page — depends on rwsdk routing model | #2 |
| `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` must be set as GitHub repo secrets before deploy CI can run | #6, #7 |
| Worker name field in `wrangler.toml` — should reflect `peterp.org` branding | #5 |
| Machinen broken anchor must be fixed in port (text outside `<a>` tag) | #2 |
| Billable URL uses plain HTTP (`http://billable.me`) — upgrade decision | #2 |

---

## Migration Scope Summary

**In scope:** 45-line HTML file, 2 paragraphs bio text, 1 heading, 2 social links, 4 side-project entries, 4 CSS declarations on `body`.
**Out of scope:** No images, no fonts, no JS files, no CSS files, no external stylesheets, no favicons, no OG tags, no package dependencies.

The repo is a clean static site. No prior scaffold or migration work exists. All 7 sub-issues from epic #8 are OPEN.