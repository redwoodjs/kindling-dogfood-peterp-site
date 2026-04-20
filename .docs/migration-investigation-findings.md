# Migration Investigation Findings: peterp.org

**Epic:** #8 — Migrate peterp.org to RedwoodSDK
**Investigation produced by:** Analyst (phase 1, re-run)
**Evidence quality reviewed by:** TechLead (phase 2) — PASS
**Committed:** Phase 1 findings → `.kindling/board/inbox/phase1-findings.md` (commit `d6f3526`)

---

## Summary

The current site is a single self-contained HTML file with four lines of inline CSS and no external dependencies of any kind — no images, no fonts, no scripts, no CSS files, no package manager files. The entire migration surface is two short paragraphs of bio text, two social links, four side-project entries, and a minimal body stylesheet. A malformed HTML anchor was found in the Machinen entry (text rendered outside the clickable link) and the Billable entry uses plain HTTP. No scaffold work, package files, or prior migration attempts exist in the repository. All seven sub-issues from the migration epic remain open.

---

## Content Inventory

### Meta Tags (index.html, lines 3–7)

| Tag | Value |
|---|---|
| charset | UTF-8 |
| viewport | width=device-width, initial-scale=1.0 |
| X-UA-Compatible | ie=edge |
| title | Peter Pistorius |

Not present: `<meta name="description">`, Open Graph tags, favicon, canonical link.

### Bio Text (verbatim, lines 17–26)

**Heading:** "Hi, my name is Peter."

**Paragraph 1:** "I'm a South African living in Berlin. I love programming and it tends to take all of my time, so I try to balance my life with friendship, cycling, hiking and woodwork."

**Paragraph 2:** Social links inline within the sentence: "You can follow me on Twitter, or see my code on GitHub."

### Social Links

| Label | URL |
|---|---|
| Twitter | https://twitter.com/appfactory/ |
| GitHub | https://github.com/peterp/ |

### Side Projects (ordered list, lines 28–43)

| # | Name | URL | Description |
|---|---|---|---|
| 1 | RedwoodJS | https://redwoodjs.com | "Bringing full-stack to the JAMstack" |
| 2 | Machinen | https://machinen.dev | "Coming soon..." |
| 3 | Blackspace | https://github.com/peterp/Blackspace | "Add blank spaces to your macOS Dock" |
| 4 | Billable | http://billable.me | "Billing Made Simple. Period." |

All names rendered in italic (`<i>`). Separator uses HTML entity `&dash;` (renders as en dash).

### Inline CSS (complete, lines 8–15)

```css
body {
  max-width: 480px;
  line-height: 1.6;
  padding: 20px;
}
```

No font families declared (browser default). No color palette declared (black on white). Layout: plain block, no flexbox or grid. No responsive breakpoints. No animations. No external stylesheet references.

### Custom Domain

`peterp.org` — confirmed from `CNAME` file (single line, exact content).

---

## Bug and Issue Findings

### Bug 1: Machinen — Broken Anchor (line 33)

The HTML source shows:
```html
<a href="https://machinen.dev"></a><i>Machinen</i></a>
```

The anchor closes before the italicised text. "Machinen" is not clickable in the rendered page — it renders as plain text followed by a dangling closing tag. The port task (#2) must produce correct anchor markup so the project name is actually a hyperlink.

### Issue 2: Billable — Plain HTTP

The Billable entry uses `http://billable.me` (plain HTTP, not HTTPS). The port task (#2) should decide whether to upgrade this to `https://billable.me` or preserve it as-is.

---

## Per-Sub-Issue Notes

### #1 — Scaffold (`pnpm create rwsdk`)

- No existing `package.json`, `pnpm-lock.yaml`, `node_modules/`, or `wrangler.toml`. Clean slate.
- `README.md` is a 3-line fork notice — scaffold generator will overwrite it; this is expected and acceptable.
- Must commit `pnpm-lock.yaml` as part of this task.
- Mandatory: `pnpm` only (not npm or yarn).
- The resulting directory structure is unknown until scaffold runs; all downstream tasks depend on this output.

### #2 — Port Content

- Content parity baseline: heading, two bio paragraphs, two social links (Twitter + GitHub), four side-project entries.
- **Must fix:** Machinen broken anchor — the port must produce correct anchor markup.
- **Decision required:** Billable uses `http://billable.me`. Upgrade to HTTPS or preserve as-is — porter's call.
- `<title>` tag is "Peter Pistorius" — must survive the port. Placement (layout component vs. per-page) depends on rwsdk routing model.
- Project names use `<i>` tags — standard JSX practice would use `<em>` or plain text; porter's call.

### #3 — Port Styles

- Only 4 CSS declarations on `body`: max-width, line-height, padding.
- No font imports, color variables, breakpoints, or animations.
- Styling approach (CSS modules, Tailwind, global CSS) is determined by rwsdk scaffold defaults at #1 — this task must check what #1 produced before placing styles.
- No external stylesheet references to preserve.

### #4 — Verify Local Dev

- No existing test infrastructure or test files.
- Verification is manual: run `pnpm dev`, confirm ported content and styles render correctly.
- No assets, images, or complex JavaScript to verify — minimal surface.

### #5 — `wrangler.toml` / Worker Config

- Custom domain: `peterp.org` — domain routing must be configured in Cloudflare dashboard or via wrangler.
- No Cloudflare Worker bindings expected (no KV, D1, R2, Durable Objects) — confirm once scaffold output is known.
- Worker name in `wrangler.toml` should reflect `peterp.org` branding.

### #6 — CI Deploy Workflow

- Current `ci.yml` is confirmed no-op (`run: "true"`). Must be replaced entirely.
- Required GitHub repo secrets (not present — must be set manually before workflow can deploy):
  - `CLOUDFLARE_API_TOKEN`
  - `CLOUDFLARE_ACCOUNT_ID`
- Workflow must use `pnpm`. Triggers on push to `master`.

### #7 — Agent CI

- No existing agent-ci configuration or `@redwoodjs/agent-ci` package.
- No CI infrastructure beyond the no-op placeholder to preserve.
- Parallel with #5 (wrangler config) — can proceed independently.

---

## Known Unknowns Summary

| Unknown | Affects |
|---|---|
| rwsdk scaffold directory structure — entry point path, where components/pages live | #1, #2, #3 |
| Styling approach post-scaffold — CSS modules, Tailwind, or global CSS | #3 |
| `<title>` placement — layout component vs. per-page | #2 |
| `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` must be set as GitHub repo secrets | #6, #7 |
| Worker name in `wrangler.toml` | #5 |
| Machinen broken anchor must be fixed in port | #2 |
| Billable plain HTTP — upgrade decision | #2 |
| GitHub Pages serving should be disabled when Worker goes live | #6 |

---

## Migration Scope Statement

**In scope:** Two paragraphs of bio text, one heading, two social links, four side-project entries with URLs and descriptions, four CSS declarations on the body element, and the custom domain `peterp.org`.

**Out of scope:** No images, no fonts, no JavaScript files, no CSS files, no external stylesheets, no favicons, no Open Graph tags, no package dependencies.

The migration is narrow. The primary work is scaffolding the rwsdk app and configuring Cloudflare deployment — the content and style port are trivial in volume.