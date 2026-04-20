# Project Blueprint: kindling-dogfood-peterp-site

### 2000ft View

This repository is a GitHub Pages personal site for Peter Pistorius (peterp.org), forked as a live dogfood target for the [kindling](https://github.com/redwoodjs/kindling) agentic harness. The site is being migrated from a single static `index.html` to a [RedwoodSDK](https://docs.rwsdk.com) application — a Vite-based React framework that runs on Cloudflare Workers. Pull requests, issues, and commits here are produced by kindling agents exercising real-world tasks.

### System Flow

**Pre-migration (current state):** The entire site is a single `index.html` file served by GitHub Pages. There is no build step, no package manager, and no framework.

**Post-migration target:** A RedwoodSDK project scaffolded via `pnpm create rwsdk`. The entry point becomes `src/worker.tsx`, which handles incoming HTTP requests and returns responses. The Document shell lives under `src/app/document`. The home page content lives under `src/app/pages/home`. Vite builds the app; Cloudflare Workers hosts it. Deployment is triggered via GitHub Actions on push to `master`.

### Directory Map

```
/               Root of repo — currently contains only index.html, CNAME, README.md
src/            (post-migration) RedwoodSDK application source
src/worker.tsx  Entry point — request router
src/app/        React components and pages
src/app/document/   Document shell component (HTML boilerplate)
src/app/pages/home/ Home page component (bio, links, projects)
.github/workflows/  CI/CD — deploy workflow to Cloudflare Workers
```

### Key Abstractions

**`index.html` (legacy):** The entire current site. Contains a bio paragraph, links to Twitter and GitHub, and an ordered list of side projects (RedwoodJS, Machinen, Blackspace, Billable). Inline styles set `max-width: 480px`, `line-height: 1.6`, `padding: 20px` on `body`. This file is the sole source of truth for content to be ported.

**`src/worker.tsx` (post-migration):** The rwsdk entry point. Registers routes and maps URL paths to React page components. All HTTP requests pass through here.

**`src/app/pages/home` (post-migration):** The React component that replaces `index.html` content — bio text, external links, and side-projects list.

**`wrangler.toml` (post-migration):** Cloudflare Worker configuration — worker name, compatibility date, and bindings. Required for `wrangler deploy` and local dry-runs.

**GitHub Actions deploy workflow (post-migration):** Runs on push to `master`; uses `pnpm/action-setup`, pnpm cache, and a `CLOUDFLARE_API_TOKEN` repo secret to deploy via `pnpm release` or `wrangler deploy`.

### Conventions Observed

- Package manager is `pnpm` exclusively (no npm or yarn).
- The repo is a fork; upstream is `peterp/peterp.github.io`. Issues reference upstream issue numbers.
- Issues are labelled `kindling-dogfood` and follow a parent/sub-issue hierarchy with explicit acceptance criteria.
- The kindling harness produces all commits and PRs — human-authored changes go upstream.

### Known Unknowns

- Exact output of `pnpm create rwsdk` is not confirmed — the docs do not detail every generated file; actual scaffold output may differ from what the docs describe.
- Whether the project should be scaffolded into the repo root or a `web/` subfolder is unspecified (issue #1 says "e.g. into a `web/` subfolder or a fresh branch").
- `wrangler deploy --dry-run` behaviour without a real Cloudflare account/token is unclear — issue #5 acceptance requires it to succeed locally.
- `@redwoodjs/agent-ci` install and local CI run (issue #7) has not been attempted; whether it works against this repo's workflow is unknown.
- Testing strategy is absent — no test files, no test runner configuration found.
- Build/deploy has not been exercised end-to-end; the Cloudflare Worker name for this site is unspecified.
