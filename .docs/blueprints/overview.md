# Overview

## 2000ft View

This repository is `redwoodjs/kindling-dogfood-peterp-site`, a fork of [`peterp/peterp.github.io`](https://github.com/peterp/peterp.github.io). It exists solely as a live test example for the [kindling](https://github.com/redwoodjs/kindling) agentic harness. In its current state it is a static, single-page personal bio site for Peter Pistorius. A migration to RedwoodSDK is in progress: Issue 1 (scaffold) and Issue 2 (port content) will replace the static file with a routed React application.

## System Flow

Today there is no build system or server-side runtime. The "system" is a browser requesting `index.html` from whatever host serves the repository root (historically GitHub Pages via the `CNAME` record for `peterp.org`). The HTML file contains a small set of inline styles and static markup; there are no scripts, no assets, and no routing layer.

Once the RedwoodSDK scaffold lands, the flow is expected to become:

1. **Scaffold** — `pnpm create rwsdk` (anticipated in a `web/` subdirectory) produces the dev server, build pipeline, and route tree.
2. **Route entry** — A home route (e.g., `src/pages/Home.tsx`) receives the request.
3. **Component render** — React components render the bio text, links, and side-project list that currently live in `index.html`.
4. **Output** — The dev server (port 5173) or a production build serves the equivalent page.

## Directory Map

- `.github/` — GitHub metadata. Contains a placeholder CI workflow (`workflows/ci.yml`) and a PR template reminding contributors to target this fork, not upstream.
- `.kindling/` — Kindling board directories (`inbox`, `todo`, `doing`, `in-review`, `done`, `archived`, `dormant`). Empty except for `doing/`.
- `.docs/blueprints/` — Architectural context for future kindling tasks (this file).
- `index.html` — The entire site. Bio paragraph, social links, and an ordered list of side projects.
- `CNAME` — GitHub Pages custom-domain file (`peterp.org`).
- `README.md` — One-line note identifying the repo as a kindling dogfood fork.

## Key Abstractions

- **`index.html` as the single source of truth** — Until the RedwoodSDK port lands, every piece of content (bio, external links, project list) lives in this one file. Future tasks will treat it as the specification for what must be preserved.
- **Side-project list** — An ordered list (`<ol>`) inside `index.html` containing four entries: RedwoodJS, Machinen, Blackspace, and Billable. Each entry pairs an external anchor with a short tagline.
- **External links** — Hrefs to `twitter.com/appfactory/`, `github.com/peterp/`, `redwoodjs.com`, `machinen.dev`, `github.com/peterp/Blackspace`, and `billable.me`. The port task requires these to be preserved verbatim.
- **Kindling branch** — The current task branch (`kindling/2026-04-21-2252-brief-port-index-html-content-into-redwo-6472`) was auto-created by the kindling harness. Future tasks will likely run on similarly dated branches.

## Conventions Observed

- **No build artifacts committed** — The repo contains no `node_modules`, `dist`, or lockfiles (yet).
- **Placeholder CI** — `.github/workflows/ci.yml` is a no-op (`run: "true"`). It exists to satisfy branch-protection or PR checks.
- **Fork-centric PRs** — The PR template explicitly states that PRs must target this fork's `master`, not upstream `peterp/peterp.github.io`.
- **Preserve root-level files** — Issue comments for the scaffold task stress that pre-existing files (`README.md`, `CNAME`, `index.html`) should not be deleted during migration.
- **No tests, no linting** — There is no visible test runner, linter, or formatter configuration.

## Known Unknowns

- **Scaffold location** — Issue comments suggest the RedwoodSDK app will live in a `web/` subdirectory, but no such directory exists in the current checkout.
- **Build and deploy flow** — No Dockerfile, deploy script, or GitHub Pages build workflow is present. It is unclear how the rwsdk app will be built or published.
- **Referenced PRs/branches** — Issues mention PRs #57, #63, #66 and a `feat/rwsdk-migration` branch, but none exist in the current clone.
- **Test strategy** — No tests or test configuration are visible, and the acceptance criteria for Issue 2 do not mention testing.
- **Style migration** — `index.html` contains a small inline `<style>` block. It is unclear whether these styles will be ported to CSS modules, Tailwind, or another rwsdk-compatible approach.
