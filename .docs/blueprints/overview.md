### 2000ft View

This repository is `redwoodjs/kindling-dogfood-peterp-site`, a fork of Peter Pistorius's personal site (`peterp/peterp.github.io`). It exists as a live test example for the kindling agentic harness. Currently it is a single-page static HTML site (`index.html`) served via GitHub Pages at `peterp.org`. The active initiative is Epic #8: migrating the site to a [RedwoodSDK](https://docs.rwsdk.com) application — a Vite-based React framework that deploys to Cloudflare Workers.

### System Flow

Today there is no application runtime. The site is a static HTML file served by GitHub Pages:

1. Request arrives at `peterp.org`.
2. GitHub Pages serves `index.html` from the repository root.
3. The browser renders a single page containing a short bio, social links, and a list of side projects.
4. An inline `<style>` block applies minimal layout rules to the `body` element.

The planned rwsdk flow (not yet implemented) will be:
1. `pnpm dev` (or the Worker) boots a Vite-based React application.
2. A home route renders the content currently in `index.html`.
3. Styles are loaded via the rwsdk default mechanism (CSS module, global stylesheet, or Vite CSS import).

### Directory Map

- `/` (root) — `index.html` (the entire current site), `CNAME` (GitHub Pages domain config), `README.md`
- `.github/` — GitHub-specific templates and workflows
  - `workflows/ci.yml` — placeholder CI that does nothing
  - `PULL_REQUEST_TEMPLATE.md` — reminder to target this fork's master
- `.kindling/` — kindling agentic harness board state
  - `board/` — Kanban columns (`inbox`, `todo`, `doing`, `in-review`, `done`, `dormant`, `archived`)

### Key Abstractions

**index.html** — The entire site. Contains the HTML structure, content (bio, links, side projects), and a small inline CSS block. This is the source of truth for both content and styles until the rwsdk migration lands.

**RedwoodSDK (rwsdk)** — The target framework. A Vite-based React stack designed for Cloudflare Workers. The migration will introduce routes, components, and a styling mechanism to replace the static file.

**kindling board** — The agentic task tracker. Briefs and progress logs live in `.kindling/board/<column>/`. The current task brief is in `doing/`.

### Conventions Observed

- **Static site hosting:** GitHub Pages via `CNAME` at the repository root.
- **CI placeholder:** `.github/workflows/ci.yml` is a no-op (`run: "true"`); it runs on PRs and pushes to `master`.
- **Fork targeting:** The PR template explicitly warns contributors to target this fork's `master`, not upstream.
- **pnpm mandate:** Epic #8 specifies `pnpm` for all package management (no npm/yarn).
- **Minimal footprint:** The current site is intentionally tiny — one HTML file with inline styles, no build step, no dependencies.

### Known Unknowns

- **rwsdk scaffold not present:** Issues #1 and #2 (scaffold and content port) have not been merged to `master` at the time of this priming. The rwsdk project structure, route files, and default styling mechanism are therefore not yet visible in the repo.
- **Build and deploy pipeline:** No `wrangler.toml`, Dockerfile, or deploy script exists yet. How the rwsdk app will build and deploy to Cloudflare Workers is tracked in sub-issues but not implemented.
- **Testing strategy:** No tests, test runner config, or test scripts exist. The CI is a placeholder.
- **Viewport verification tooling:** The task acceptance criteria reference verifying visual parity across viewports, but no existing screenshot or visual regression tooling is present.