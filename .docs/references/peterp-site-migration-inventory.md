# peterp.org Migration Inventory

Reference artifact for the migration epic: static `index.html` → rwsdk app on Cloudflare Workers.

Produced by empirical investigation (all claims backed by direct file reads). Verified by TechLead review (PASS).

---

## Summary

The current site is a single self-contained HTML file with four lines of inline CSS and no external dependencies of any kind — no images, no fonts, no scripts, no CSS files, no package manager files. The entire migration surface is two short paragraphs of bio text, two social links, four side-project entries, and a minimal body stylesheet. The CNAME confirms the custom domain is `peterp.org`. The CI workflow is a confirmed no-op placeholder. The migration is narrow in scope but requires several child tasks to resolve unknowns about the target rwsdk scaffold structure and Cloudflare deployment secrets.

---

## Content Inventory

Everything in this section **must survive the migration**.

### Meta Tags

| Tag | Value |
|---|---|
| charset | UTF-8 |
| viewport | width=device-width, initial-scale=1.0 |
| X-UA-Compatible | ie=edge |
| title | Peter Pistorius |

**Not present:** `<meta name="description">`, Open Graph tags, favicon, canonical link.

### Bio Text (verbatim)

Heading:
> Hi, my name is Peter.

Paragraph 1:
> I'm a South African living in Berlin. I love programming and it tends to take all of my time, so I try to balance my life with friendship, cycling, hiking and woodwork.

Paragraph 2 (contains inline links — see Social Links table):
> You can follow me on Twitter, or see my code on GitHub.

### Social Links

| Label | URL |
|---|---|
| Twitter | https://twitter.com/appfactory/ |
| GitHub | https://github.com/peterp/ |

### Side Projects (ordered list, must remain ordered)

| # | Name | URL | Description | Notes |
|---|---|---|---|---|
| 1 | RedwoodJS | https://redwoodjs.com | Bringing full-stack to the JAMstack | Uses `<i>` for name |
| 2 | Machinen | https://machinen.dev | Coming soon... | **Malformed HTML in source** — anchor closes before link text; "Machinen" is not actually linked. Must be fixed in port. Uses `<i>` for name. |
| 3 | Blackspace | https://github.com/peterp/Blackspace | Add blank spaces to your macOS Dock | Uses `<i>` for name |
| 4 | Billable | http://billable.me | Billing Made Simple. Period. | Uses `<i>` for name. **Plain HTTP** — porter should decide whether to upgrade to HTTPS or preserve as-is. |

### Inline CSS (complete — all 4 declarations)

```css
body {
  max-width: 480px;
  line-height: 1.6;
  padding: 20px;
}
```

- **Font families:** none declared; falls back to browser default
- **Color palette:** none declared; browser default black on white
- **Layout:** plain block layout — no flexbox, no grid
- **Responsive breakpoints:** none
- **Animations:** none
- **External stylesheets:** none

### Domain

`peterp.org` (confirmed from CNAME file, single line, exact content).

---

## Per-Sub-Issue Notes

### #1 — Scaffold (`pnpm create rwsdk`)

- No existing `package.json`, `pnpm-lock.yaml`, or `node_modules/` in the repo. The scaffold starts from a clean slate.
- Must commit `pnpm-lock.yaml` as part of this task.
- Mandatory: `pnpm` only — no npm or yarn.
- The resulting directory structure is unknown until scaffold runs; all downstream tasks (#2, #3) depend on this output.

### #2 — Port Content

- Bio text is two short paragraphs plus a heading — verbatim content above.
- Social links: Twitter (`https://twitter.com/appfactory/`) and GitHub (`https://github.com/peterp/`). Both inline within the second bio paragraph.
- Side projects: ordered list of four entries. See inventory table above.
- **Must fix:** Machinen entry has a malformed anchor (`<a href="..."></a><i>Machinen</i></a>`) — the text is not linked in the source. The port should produce correct HTML/JSX.
- **Decision needed:** Billable uses `http://billable.me` (plain HTTP). Choose whether to upgrade to HTTPS or reproduce as-is.
- Original source uses `<i>` tags for project names. Standard practice would be `<em>` or plain text; porter's call.
- `&dash;` HTML entity used as separator between project name and description in source. Renders as `–` (en dash).

### #3 — Port Styles

- Only 4 CSS declarations need to be ported — all on the `body` element (see CSS block above).
- No font imports, no color variables, no breakpoints, no animations.
- Styling approach (CSS modules vs Tailwind vs global CSS) is determined by rwsdk scaffold defaults at #1 — this task must check what #1 produced before deciding where to place the styles.
- No external stylesheet references to preserve.

### #4 — Verify Local Dev

- No existing test infrastructure or test files in the repo.
- Verification is manual: run `pnpm dev`, check that the ported content and styles render correctly in a browser.
- Known visual expectations: centered narrow column (480px max-width), default browser fonts and colors, two paragraphs of bio, ordered list of four projects.

### #5 — `wrangler.toml`

- Custom domain: `peterp.org` — the wrangler config or Cloudflare dashboard must route this domain to the Worker.
- No Cloudflare Worker bindings expected (simple portfolio with no KV, D1, R2, or Durable Objects), but this should be confirmed once scaffold output is known.
- Worker name in `wrangler.toml` should reflect the site (`peterp-site` or similar).

### #6 — CI Deploy Workflow

- Current CI (`ci.yml`) is a confirmed no-op (`run: "true"`) — it must be replaced entirely.
- **Required GitHub repo secrets (must be set manually before this workflow can deploy):**
  - `CLOUDFLARE_API_TOKEN`
  - `CLOUDFLARE_ACCOUNT_ID`
- The workflow must use `pnpm` (not npm or yarn).
- Triggers: at minimum on push to `master`.

### #7 — Agent CI (parallel infra)

- No existing CI infrastructure beyond the no-op placeholder.
- Context from this investigation: the CI file is minimal YAML — there are no existing steps, caches, or configurations to preserve.

---

## Known Unknowns

| Unknown | Relevant to sub-issue(s) |
|---|---|
| rwsdk scaffold directory structure (entry point path, where components/pages live) | #1, #2, #3 |
| Styling approach post-scaffold (CSS modules, Tailwind, or global CSS) — determined by rwsdk defaults | #3 |
| Whether `<title>` lives in a layout component or per-page — depends on rwsdk routing model | #2 |
| `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` must be manually set as GitHub repo secrets before deploy CI can run | #6, #7 |
| Worker name / `wrangler.toml` `name` field — should match `peterp.org` branding | #5 |
| Whether GitHub Pages deployment (current serving mechanism) needs to be disabled when Worker goes live — ops step, not a code concern | #6 |
| Confirmed pnpm compatibility with rwsdk scaffold — mandated by convention but unverified until #1 runs | #1 |
| Whether to upgrade `http://billable.me` to HTTPS in the ported content | #2 |

---

## Migration Scope Statement

**In scope:** Two paragraphs of bio text, one heading, two social links, four side-project entries with URLs and descriptions, four CSS declarations on the body element, and the custom domain `peterp.org`.

**Out of scope:** There are no images, no fonts, no JavaScript files, no CSS files, no external stylesheets, no asset directories, no favicons, no Open Graph tags, and no package dependencies to migrate. The entire current site is contained in a single 45-line HTML file.

The migration is narrow. The primary work is scaffolding the rwsdk app and configuring the Cloudflare deployment — the content and style port are trivial in volume.
