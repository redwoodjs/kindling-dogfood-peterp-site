# Overview — kindling-dogfood-peterp-site

## 2000ft View

This repository is a fork of `peterp/peterp.github.io`, the personal website of Peter Pistorius. It has been repurposed by RedwoodJS as a live dogfood testbed for the **kindling** agentic harness — an automated system that generates pull requests, issues, and commits to validate agent-driven development workflows. The site itself is a minimal static HTML page. Future tasks aim to evolve it into a Cloudflare Worker-deployable app, but the current state is deliberately simple so that infrastructure and CI changes can be exercised in a low-risk environment.

## System Flow

There is no runtime application code path today. The site is a single static HTML file (`index.html`) that would traditionally be served by GitHub Pages. The intended future flow, based on open issues, is:

1. **Source** — `index.html` (and eventually an rwsdk-based application) lives at the repository root.
2. **CI** — `.github/workflows/ci.yml` runs on every pull request and push to `master`. Currently it is a no-op placeholder.
3. **Deploy** — Issue #6 proposes a second workflow that triggers on `push` to `master`, installs dependencies via pnpm, and runs `pnpm wrangler deploy` (or `pnpm release`) to push the build to Cloudflare Workers.
4. **Validation** — Issue #7 introduces `@redwoodjs/agent-ci`, a local GitHub Actions runner, so workflows can be validated end-to-end before being pushed.

Until `wrangler.toml` (Issue #5) and a package manifest are present, the deploy path cannot actually execute.

## Directory Map

- `/` — Repository root. Contains `index.html` (the site), `CNAME` (domain mapping), and `README.md`.
- `.github/` — GitHub metadata and automation.
  - `workflows/` — GitHub Actions workflow definitions. Currently holds `ci.yml`, a placeholder workflow.
  - `PULL_REQUEST_TEMPLATE.md` — Template reminding contributors that PRs target this fork, not upstream.
- `.docs/blueprints/` — Agent-facing architectural documentation (this file).

## Key Abstractions

**Static Site (`index.html`)**  
The entire user-facing artifact is a single HTML file. There is no bundler, router, or framework in play today. Any future migration to an rwsdk application will replace this file with a generated build output.

**Placeholder CI (`ci.yml`)**  
A minimal GitHub Actions workflow that runs `true` on every PR and push to `master`. Its purpose is to satisfy branch protection checks while the real CI and deploy workflows are being scaffolded.

**Kindling Dogfood Context**  
The repository is explicitly marked as a kindling experiment. The PR template and README both call this out. Commits and PRs here are expected to be machine-generated or machine-assisted, and the repo is not the canonical source for peterp.org (which lives upstream).

## Conventions Observed

- **Branching:** The default branch is `master`, not `main`.
- **CI location:** All GitHub Actions workflows live under `.github/workflows/`.
- **PR template:** `.github/PULL_REQUEST_TEMPLATE.md` exists and warns that PRs must target this fork.
- **Commit style:** Kindling-generated commits use the prefix `kindling:` and often include `[skip ci]`.
- **No build artifacts checked in:** The repo contains only source files; no `node_modules`, `dist`, or generated Workers artifacts are present.
- **Upstream tracking:** Issues reference an upstream issue in `peterp/peterp.github.io` and often carry a `kindling-dogfood` label.

## Known Unknowns

- **Build system:** There is no `package.json`, `wrangler.toml`, or lockfile present yet. The shape of the eventual rwsdk application and its build command are undefined in the current tree.
- **Deploy target details:** While Issue #6 mentions Cloudflare Workers, there is no Worker configuration in the repository today, so the account name, worker name, and compatibility date are unknown.
- **Testing strategy:** No tests, test runner config, or test directories exist.
- **agent-ci availability:** Issue #7 prescribes installing `@redwoodjs/agent-ci`, but it is not yet in `devDependencies` and the skill has not been configured.
- **Custom domain hosting:** `CNAME` contains `peterp.org`, but it is unclear whether Cloudflare Workers or GitHub Pages (or both) will ultimately serve the domain.