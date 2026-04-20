# kindling-dogfood-peterp-site — Architectural Overview

### 2000ft View

This repository is a kindling harness dogfood fork of Peter Pistorius's personal site (peterp.org). It serves as a live test subject for the [kindling](https://github.com/redwoodjs/kindling) agentic development harness — pull requests, issues, and commits here are produced by kindling tasks rather than human contributors. The upstream source is `peterp/peterp.github.io`. The site itself is a minimal personal homepage. Its primary purpose within this repo is to be a realistic but low-stakes target for testing kindling's scaffolding, migration, and CI workflows.

### System Flow

The current site has no build pipeline. The entry point is `index.html` at the repository root, which GitHub Pages serves directly at `peterp.org` (via the `CNAME` file). There are no compilation, bundling, or deployment steps — GitHub Pages picks up the root `index.html` on every push to `master`.

After the RedwoodSDK scaffold (issue #1), the expected flow will be:
1. Source lives in `web/` (a RedwoodSDK project)
2. `pnpm install` in `web/` installs dependencies
3. `pnpm dev` in `web/` starts Vite dev server on port 5173
4. Future: a build step produces static/server output that replaces or supplements the root `index.html` for deployment

### Directory Map

```
/                     — repo root; GitHub Pages source; preserves legacy static files
  index.html          — original static homepage (to be superseded by RedwoodSDK app)
  CNAME               — GitHub Pages custom domain (peterp.org)
  README.md           — dogfood fork explanation
  .github/            — GitHub Actions CI and PR template
  .kindling/          — kindling harness configuration
  web/                — RedwoodSDK scaffolded project (added in issue #1)
    src/              — application source (workers, pages, components)
    public/           — static assets
    package.json      — project manifest; scripts include dev, build, deploy
    pnpm-lock.yaml    — lockfile (pnpm only)
```

### Key Abstractions

**Static entrypoint (`index.html`):** The original personal homepage. A single self-contained HTML file with inline CSS. Serves as the preserved legacy artifact during the migration to RedwoodSDK. Not to be overwritten by generator templates.

**CNAME:** Declares `peterp.org` as the GitHub Pages custom domain. Must be preserved through any scaffolding or restructuring, or re-added post-scaffold, to maintain DNS mapping.

**kindling harness (`.kindling/`):** Configuration directory for the kindling agentic harness. Controls how kindling agents discover tasks, authenticate with GitHub, and dispatch work to this repo. The harness reads this directory to understand the project's task protocols.

**GitHub Actions CI (`.github/workflows/ci.yml`):** Minimal CI that runs on every push to `master` and every PR. Currently a no-op (`run: "true"`). Exists to satisfy branch protection or kindling's PR verification step.

**RedwoodSDK project (`web/`):** A Vite-based full-stack framework project scaffolded via `pnpm create rwsdk`. Contains its own `package.json`, `pnpm-lock.yaml`, source tree, and dev server. Dev server runs on port 5173. The worker entry point is typically `src/worker.tsx`.

### Conventions Observed

- `master` is the default and deployment branch (not `main`)
- pnpm is the designated package manager; `pnpm-lock.yaml` must be committed; no `package-lock.json` or `yarn.lock`
- Pre-existing files (`README.md`, `CNAME`, `index.html`) are treated as preserved artifacts — generator templates must not overwrite them
- New generated project material lives in `web/` to avoid root-level collisions with the static GitHub Pages setup
- CI workflow is intentionally minimal; it does not run tests or builds in its current state

### Known Unknowns

- Whether GitHub Pages deployment will remain root-based or migrate to a build artifact from `web/` is not yet decided
- The `.kindling/` directory contents are present but not fully documented here — kindling-specific task protocol details are not captured in this blueprint
- Whether the CI workflow will be updated to run `pnpm install` and `pnpm dev` smoke tests after the scaffold is unknown
- Relationship between this repo and the parent issue (#8, referenced in issue #1) is not yet traced
- The exact Cloudflare Workers / Pages deploy configuration for the RedwoodSDK app is not yet established
