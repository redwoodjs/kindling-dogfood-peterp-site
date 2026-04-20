# peterp.org Site — Migration Reference Card

Quick reference for any agent picking up a sub-issue in the peterp.org migration epic.
Full findings in `.docs/references/peterp-site-migration-inventory.md`.

---

## What Must Survive the Migration

**Page title:** Peter Pistorius

**Bio text (verbatim):**
- Heading: "Hi, my name is Peter."
- Para 1: "I'm a South African living in Berlin. I love programming and it tends to take all of my time, so I try to balance my life with friendship, cycling, hiking and woodwork."
- Para 2: "You can follow me on Twitter, or see my code on GitHub." (Twitter and GitHub are inline links)

**Social links:**
- Twitter → https://twitter.com/appfactory/
- GitHub → https://github.com/peterp/

**Side projects (ordered list — order must be preserved):**
1. RedwoodJS — https://redwoodjs.com — "Bringing full-stack to the JAMstack"
2. Machinen — https://machinen.dev — "Coming soon..." ⚠️ see bug below
3. Blackspace — https://github.com/peterp/Blackspace — "Add blank spaces to your macOS Dock"
4. Billable — http://billable.me — "Billing Made Simple. Period." ⚠️ see bug below

**Complete inline CSS (all 4 declarations — nothing else exists):**
```css
body {
  max-width: 480px;
  line-height: 1.6;
  padding: 20px;
}
```
No font declarations, no colors, no breakpoints, no animations. Browser defaults for everything else.

**Custom domain:** peterp.org (from CNAME)

---

## Bugs in Source HTML (must be fixed during port)

**Bug 1 — Machinen anchor is malformed (source line 33):**
```html
<a href="https://machinen.dev"></a><i>Machinen</i></a>
```
The anchor closes before the link text. "Machinen" renders visually but is not clickable. The port must fix this to a valid anchor wrapping the link text.

**Bug 2 — Billable uses plain HTTP:**
```html
<a href="http://billable.me">
```
The URL uses `http://` not `https://`. Porter (#2) must decide: fix to HTTPS or preserve as-is.

---

## CI Workflow — Confirmed No-Op

The current CI workflow has one job, one step: `run: "true"`. It does not check out the repo, install dependencies, build, test, or deploy. It exists only to satisfy branch protection. Sub-issue #6 must replace it entirely.

Required GitHub repo secrets for the new deploy workflow (must be set manually in repo settings before #6 can work):
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

---

## Known Unknowns

| Unknown | Relevant to |
|---|---|
| rwsdk scaffold directory structure (entry point, pages/components location) | #1, #2, #3 |
| Styling approach (CSS modules, Tailwind, global CSS) — determined by rwsdk scaffold defaults | #3 |
| Whether `<title>` lives in a layout component or per-page | #2 |
| `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` must be manually set as repo secrets | #6, #7 |
| Worker name for `wrangler.toml` | #5 |
| Whether GitHub Pages must be disabled when the Worker goes live | #6 |
| Confirmed pnpm compatibility with rwsdk scaffold (mandated but unverified until #1 runs) | #1 |
| Whether to upgrade Billable from HTTP to HTTPS | #2 |

---

## What Does NOT Exist (nothing to migrate)

No images, favicons, fonts, JavaScript files, CSS files, external stylesheets, asset directories, Open Graph tags, meta description, package files, or test infrastructure. Zero external runtime dependencies.
