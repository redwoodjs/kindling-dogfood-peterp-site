# peterp.org Migration — Phase 3 Findings Report

**Epic:** [#8 — Migrate peterp.org to RedwoodSDK](https://github.com/redwoodjs/kindling-dogfood-peterp-site/issues/8)
**Progress Board:** [#59](https://github.com/redwoodjs/kindling-dogfood-peterp-site/issues/59)
**Produced by:** Analyst (phase 3)
**Evidence reviewed by:** TechLead (phase 2 — PASS)

---

## 1. Content Parity Inventory

### Meta Tags

| Tag | Value |
|---|---|
| charset | UTF-8 |
| viewport | width=device-width, initial-scale=1.0 |
| X-UA-Compatible | ie=edge |
| title | Peter Pistorius |

**Not present:** `<meta name="description">`, Open Graph tags, favicon, canonical link.

### Bio Text (verbatim, lines 17–25 of index.html)

Heading (line 18):
> Hi, my name is Peter.

Paragraph 1 (line 20):
> I'm a South African living in Berlin. I love programming and it tends to take all of my time, so I try to balance my life with friendship, cycling, hiking and woodwork.

Paragraph 2 (lines 22–25, contains inline links):
> You can follow me on
>   [Twitter](https://twitter.com/appfactory/), or see my code on
>   [GitHub](https://github.com/peterp/).

### Social Links (verbatim, lines 22–24)

| Label | URL |
|---|---|
| Twitter | `https://twitter.com/appfactory/` |
| GitHub | `https://github.com/peterp/` |

### Side Projects — Ordered List (lines 28–43, must remain ordered)

| # | Name | URL | Description | Defect |
|---|---|---|---|---|
| 1 | RedwoodJS | `https://redwoodjs.com` | Bringing full-stack to the JAMstack | Uses `<i>` for name |
| 2 | Machinen | `https://machinen.dev` | Coming soon... | **Malformed anchor** — source reads `<a href="https://machinen.dev"></a><i>Machinen</i></a>`. The text "Machinen" is not linked. Must be corrected in port. |
| 3 | Blackspace | `https://github.com/peterp/Blackspace` | Add blank spaces to your macOS Dock | Uses `<i>` for name |
| 4 | Billable | `http://billable.me` | Billing Made Simple. Period. | Uses `<i>` for name. **Plain HTTP** — consider upgrading to HTTPS. |

All four entries use `&dash;` (HTML entity for en dash) as the separator between name and description in the source.

---

## 2. Style Parity Inventory

Inline `<style>` block, lines 8–14 of index.html (complete — four declarations only):

```css
body {
  max-width: 480px;
  line-height: 1.6;
  padding: 20px;
}
```

- **Font families:** none declared — browser default sans-serif
- **Color palette:** none declared — browser default black on white
- **Layout:** plain block layout — no flexbox, no grid, no flex
- **Responsive breakpoints:** none
- **Animations:** none
- **External stylesheets:** none

---

## 3. Assets and Metadata

- **No images** in the repo (confirmed by exhaustive directory listing)
- **No scripts** — the page is static HTML with no JavaScript
- **No fonts** — no @font-face declarations, no Google Fonts or similar
- **No favicon** — no `<link rel="icon">` tag
- **No `<meta name="description">`**, no Open Graph tags, no Twitter Card tags
- **Domain:** `peterp.org` (confirmed from CNAME, single-line file)

---

## 4. Repo State

### Files at Root

| File | Content |
|---|---|
| `index.html` | 45-line static HTML page (entire current site) |
| `CNAME` | `peterp.org` |
| `README.md` | Fork notice explaining this is a kindling dogfood fork of `peterp/peterp.github.io` |

No `package.json`, no lockfiles, no `node_modules/`, no partial scaffold. The repo is a clean slate.

### CI Workflow

`.github/workflows/ci.yml` (11 lines — confirmed no-op):

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

Triggers correctly on `master`. Must be replaced entirely for deployment.

---

## 5. Known Unknowns

| Unknown | Relevant Sub-Issues |
|---|---|
| rwsdk scaffold directory structure (entry point path, component/page locations) — undefined until #1 runs | #1, #2, #3 |
| Styling approach post-scaffold (CSS modules, Tailwind, or global stylesheet) — determined by rwsdk defaults | #3 |
| Where `<title>` lives in rwsdk (layout component vs per-page) — depends on rwsdk routing model | #2 |
| `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` must be set as GitHub repo secrets before deploy CI can run | #6, #7 |
| Worker name in `wrangler.toml` — should align with `peterp.org` branding | #5 |
| Whether GitHub Pages serving needs to be disabled when the Worker goes live | #6 |
| Whether to upgrade `http://billable.me` to `https://billable.me` in the ported content | #2 |
| Whether Machinen's "Coming soon..." description is intentional or placeholder — porter's call | #2 |

---

## 6. Per-Sub-Issue Implications

### #1 — Scaffold

The repo has no `package.json`, `pnpm-lock.yaml`, or `node_modules/`. The scaffold runs from a clean slate. The result of `pnpm create rwsdk` is unknown until the command executes; all downstream tasks depend on the scaffold output. The default branch is `master`, not `main`.

### #2 — Port Content

The port must capture: two bio paragraphs and an H1 heading, two inline social links (Twitter and GitHub), and four ordered side-project entries. One defect must be fixed: the Machinen anchor is malformed in the source (`<a href="..."></a><i>Machinen</i></a>`) — the text is not linked. The port should produce a correctly nested anchor. A decision is needed on `http://billable.me` (plain HTTP).

### #3 — Port Styles

Four CSS declarations on `body` are the entire style surface. No external stylesheets, fonts, or assets are involved. The styling approach (CSS modules, Tailwind, global) will be determined by what rwsdk scaffolds, so this task should wait for #1 to complete before choosing where to place the styles.

### #4 — Verify Local Dev

No test infrastructure exists. The verification is manual: launch `pnpm dev`, verify the rendered page matches the original at 480px width, confirm no console errors. The visual expectations are clear: centered narrow column, default fonts and colors, bio text, ordered project list.

### #5 — Wrangler Config

The custom domain `peterp.org` must be routed to the Cloudflare Worker via the wrangler config or Cloudflare dashboard. No KV, D1, R2, or Durable Objects bindings are expected (simple portfolio), but this should be confirmed against the scaffold output. The Worker name should align with the domain.

### #6 — CI Deploy Workflow

The existing `ci.yml` is a confirmed no-op. It must be replaced with a real deploy workflow using `pnpm`, `pnpm/action-setup`, pnpm caching, and a `CLOUDFLARE_API_TOKEN` repository secret. The workflow triggers on push to `master`. The `CLOUDFLARE_ACCOUNT_ID` secret is also required.

### #7 — Agent CI

No existing CI steps to preserve. The `@redwoodjs/agent-ci` package must be added as a dev dependency. Agents should be instructed to validate workflow changes locally via agent-ci before pushing.

---

## Migration Scope Statement

**In scope:** Two paragraphs of bio text, one heading, two social links, four side-project entries with URLs and descriptions, four CSS declarations on `body`, and the custom domain `peterp.org`.

**Out of scope:** There are no images, fonts, JavaScript files, CSS files, external stylesheets, asset directories, favicons, or Open Graph tags. No package dependencies exist. The entire current site is a single 45-line HTML file.

The migration surface is narrow. The primary work is scaffolding the rwsdk app and configuring Cloudflare deployment — the content and style port are trivial in volume.
