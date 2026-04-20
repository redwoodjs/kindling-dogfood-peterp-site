# peterp.org Migration Reference

Canonical migration reference for Epic #8: static `index.html` → rwsdk app on Cloudflare Workers.

Produced by empirical investigation (all claims backed by direct file reads). Evidence reviewed by TechLead (PASS).

**Source files:** `index.html`, `CNAME`, `.github/workflows/ci.yml`, `README.md`
**Related:** [.docs/epic-decomposition.md](../epic-decomposition.md) · [.docs/learnings/2026-04-20-static-to-rwsdk-migration-baseline.md](../learnings/2026-04-20-static-to-rwsdk-migration-baseline.md)

---

## Migration Scope

**In scope:** Two paragraphs of bio text, one heading, two social links, four side-project entries (ordered), four CSS declarations on `body`, custom domain `peterp.org`.

**Out of scope:** No images, fonts, JavaScript, external stylesheets, favicons, or Open Graph tags. No package dependencies. The entire site is one 45-line HTML file.

---

## Content Inventory

All content below must survive the migration.

### Meta Tags

| Tag | Value |
|---|---|
| charset | UTF-8 |
| viewport | width=device-width, initial-scale=1.0 |
| X-UA-Compatible | ie=edge |
| title | Peter Pistorius |

**Not present:** `<meta name="description">`, Open Graph tags, favicon, canonical link.

### Bio Text

Heading (index.html line 18):
> Hi, my name is Peter.

Paragraph 1 (line 20):
> I'm a South African living in Berlin. I love programming and it tends to take all of my time, so I try to balance my life with friendship, cycling, hiking and woodwork.

Paragraph 2 (lines 22–25, links inline):
> You can follow me on [Twitter](https://twitter.com/appfactory/), or see my code on [GitHub](https://github.com/peterp/).

### Social Links

| Label | URL |
|---|---|
| Twitter | https://twitter.com/appfactory/ |
| GitHub | https://github.com/peterp/ |

### Side Projects — Ordered List

| # | Name | URL | Description | Notes |
|---|---|---|---|---|
| 1 | RedwoodJS | https://redwoodjs.com | Bringing full-stack to the JAMstack | `<i>` for name |
| 2 | Machinen | https://machinen.dev | Coming soon... | **Malformed HTML** — anchor closes before link text; see note below |
| 3 | Blackspace | https://github.com/peterp/Blackspace | Add blank spaces to your macOS Dock | `<i>` for name |
| 4 | Billable | http://billable.me | Billing Made Simple. Period. | `<i>` for name; plain HTTP |

**Machinen defect:** Source reads `<a href="https://machinen.dev"></a><i>Machinen</i></a>` (line 33). The opening `<a>` wraps nothing; the visible text is a sibling node, not a child. The port must correct this — the name must be inside the anchor.

**Billable:** Uses `http://billable.me` (plain HTTP). Decide whether to upgrade to HTTPS or preserve.

All four entries use `&dash;` (HTML entity, renders as en dash) as the separator between name and description.

---

## Style Inventory

Inline `<style>` block, lines 8–14 of `index.html`:

```css
body {
  max-width: 480px;
  line-height: 1.6;
  padding: 20px;
}
```

- Font families: none declared (browser default sans-serif)
- Color palette: none declared (browser default black on white)
- Layout: plain block — no flexbox, grid, or floats
- Responsive breakpoints: none
- Animations: none
- External stylesheets: none

---

## Repo State

| File | Notes |
|---|---|
| `index.html` | 45-line static HTML (entire site) |
| `CNAME` | `peterp.org` |
| `README.md` | Fork notice only |
| `.github/workflows/ci.yml` | No-op placeholder — `run: "true"`, triggers on `master` |

**No `package.json`, `pnpm-lock.yaml`, `node_modules/`, or `wrangler.toml`.** The repo is a clean slate.

---

## Per-Sub-Issue Notes

### #1 — Scaffold
Repo has no package files. Scaffold runs from a clean slate. The default branch is `master` (not `main`). The scaffold output is unknown until the command executes — all downstream tasks depend on it.

### #2 — Port Content
Must capture: H1 heading, two bio paragraphs, two inline social links, four ordered side-project entries. **Must fix:** Machinen malformed anchor. **Decision needed:** Billable plain-HTTP upgrade. The `<i>` tags around project names are in the source; porter decides whether to preserve or use `<em>`/plain text.

### #3 — Port Styles
Four CSS declarations are the entire style surface. No external stylesheets or assets. The styling approach (CSS modules, Tailwind, global) is determined by what rwsdk scaffolds — wait for #1 output before placing styles.

### #4 — Verify Local Dev
No test infrastructure exists. Verification is manual: run `pnpm dev`, confirm the rendered page matches at 480px width, check for console errors. Visual expectations are documented in the Style Inventory above.

### #5 — Wrangler Config
Custom domain `peterp.org` must be routed to the Cloudflare Worker. No KV, D1, R2, or Durable Objects bindings expected for a simple portfolio. Worker name should align with the domain.

### #6 — CI Deploy Workflow
Existing `ci.yml` is a confirmed no-op — replace entirely. Requires `pnpm`, `pnpm/action-setup`, pnpm caching, and `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` repository secrets. **These secrets must be set manually by a human** before any CI deploy run can succeed — no automated task can satisfy this prerequisite.

### #7 — Agent CI
No existing CI steps to preserve. Install `@redwoodjs/agent-ci` as a dev dependency and instruct agents to validate workflow changes locally before pushing.

---

## Known Unknowns

| Unknown | Relevant to |
|---|---|
| rwsdk scaffold directory structure — entry point path, component/page locations | #1, #2, #3 |
| Styling approach post-scaffold — CSS modules, Tailwind, or global stylesheet | #3 |
| Where `<title>` lives in rwsdk — layout component vs. per-page | #2 |
| `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` must be manually set as GitHub repo secrets | #6 |
| Worker name in `wrangler.toml` | #5 |
| Whether GitHub Pages serving needs to be disabled when Worker goes live | #6 |
| Whether to upgrade `http://billable.me` to HTTPS | #2 |
| Whether Machinen's "Coming soon..." is intentional | #2 |
