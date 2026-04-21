## 2000ft View

This repo is `redwoodjs/kindling-dogfood-peterp-site`, a fork of `peterp/peterp.github.io` used as a live test example for the kindling agentic harness. It currently hosts a single-page static personal site (`index.html`) for Peter Pistorius, served via GitHub Pages at `peterp.org`. The active effort is an epic migration to [RedwoodSDK](https://docs.rwsdk.com) — a Vite-based React framework that runs on Cloudflare Workers — moving the site from a static one-pager to a structured full-stack application.

## System Flow

**Current state (pre-migration):** The site is a single static HTML file. GitHub Pages serves `index.html` directly. There is no build step, no bundler, and no server-side logic.

**Future state (post-migration):** After Issue 1 (scaffold) lands, the repo will contain a RedwoodSDK application. The intended flow is:
1. Developer runs `pnpm dev` to start the Vite development server (default port 5173).
2. RedwoodSDK routes incoming requests to React components.
3. The home route renders the bio, links, and side-project list previously found in `index.html`.
4. Production builds target Cloudflare Workers, deployed via GitHub Actions (Issues 5 and 6).

## Directory Map

- `/` — Project root. Currently contains `index.html` (the entire site), `README.md`, and `CNAME`.
- `.github/workflows/` — GitHub Actions. Currently holds a placeholder `ci.yml` that trivially passes.
- `.kindling/board/` — Kindling agent board directories (inbox, todo, doing, in-review, done, dormant, archived).
- `.docs/blueprints/` — Persisted architectural context for future kindling tasks (this file).

No `src/`, `app/`, `node_modules/`, or `dist/` directories exist yet; they will be introduced by the rwsdk scaffold in Issue 1.

## Key Abstractions

**`index.html` page structure** — The current site consists of a single HTML document with a heading, two paragraphs (bio and social links), and an ordered list of side projects. Each side project is an `<li>` containing an `<a>` tag with an external `href`. This structure is what Issue 2 will port into RedwoodSDK routes and React components.

**RedwoodSDK route** — The future primary entry point for HTTP requests. Once the scaffold is in place, the home route (e.g., `src/pages/Home.tsx`) will replace the static `index.html` as the source of rendered content.

**Cloudflare Worker target** — The intended runtime for the migrated app. RedwoodSDK produces a Worker-compatible bundle, configured via `wrangler.toml` (Issue 5).

## Conventions Observed

- Pull requests must target this fork's `master` branch, not the upstream `peterp/peterp.github.io` repository (stated in `PULL_REQUEST_TEMPLATE.md`).
- Package management uses `pnpm`; `pnpm-lock.yaml` is the expected lockfile (no `package-lock.json` or `yarn.lock`).
- The existing `index.html` is not to be deleted during content porting; removal is tracked separately.
- External links in the original markup are preserved verbatim — no domain rewriting, query stripping, or anchor changes.
- CI commits may include `[skip ci]` in their message.

## Known Unknowns

- **Scaffold location:** Whether the rwsdk scaffold will live at the repo root or inside a `web/` subfolder is not yet decided; Issue 1 acceptance criteria mention both possibilities.
- **Build and deploy pipeline:** No `wrangler.toml`, deploy script, or Dockerfile exists yet; the Cloudflare Workers deploy flow is fully future work (Issues 5 and 6).
- **Testing strategy:** No test files, test runner config, or testing conventions are present yet.
- **Styling approach:** The current `index.html` uses a small inline `<style>` block. Issue 3 will port styles, so the CSS methodology (Tailwind, CSS modules, etc.) is undetermined.
- **Kindling board state:** The `.kindling/board/` directories appear empty in this snapshot; it is unclear whether task state is tracked via files inside them or externally.