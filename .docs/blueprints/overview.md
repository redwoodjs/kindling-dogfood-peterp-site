# Overview

## 2000ft View

This repository is a kindling dogfood fork of Peter Pistorius's personal website (`peterp.org`). Its primary purpose is to serve as a live test target for the [kindling](https://github.com/redwoodjs/kindling) agentic development harness. Real migration work happens here — kindling tasks produce commits, PRs, and issues against this repo as part of exercising the harness end-to-end. The site itself is being migrated from a static single-file HTML page to a RedwoodSDK (rwsdk) application: a Vite-based React framework that targets Cloudflare Workers.

## System Flow

At the start of the migration the repo contains only three files: `index.html` (a single-page personal bio), `CNAME` (the custom domain `peterp.org`), and `README.md` (dogfood context). There is no build pipeline, no framework, and no package manager manifest.

The migration is structured as a sequence of sub-issues under epic #8:

1. Scaffold a new rwsdk project (issue #1) — run `pnpm create rwsdk create web` to generate the application skeleton in a `web/` subdirectory.
2. Port content from `index.html` into rwsdk routes and components (issue #2).
3. Port styles (issue #3).
4. Verify local dev for the rwsdk app (issue #4).
5. Add `wrangler.toml` and Cloudflare Worker config (issue #5).
6. Add CI deploy workflow via GitHub Actions (issue #6).
7. Install agent-ci for local GitHub Actions validation (issue #7).

After scaffolding, the expected entry point for the rwsdk app is `web/` with Vite serving on `http://localhost:5173` during local development.

## Directory Map

```
/                  — repo root; currently holds the legacy static site
index.html         — original single-page personal bio (legacy, will be superseded)
CNAME              — custom domain: peterp.org
README.md          — dogfood context for kindling harness
web/               — (to be created) scaffolded rwsdk application
```

After scaffolding, `web/` will contain a full rwsdk project tree including `package.json`, `pnpm-lock.yaml`, `src/`, and Vite/Worker configuration files.

## Key Abstractions

**RedwoodSDK (rwsdk)**: The target framework for the migrated site. It is a Vite-based React framework designed to run on Cloudflare Workers, supporting React Server Components (RSC) and server functions. The scaffold generator is invoked via `pnpm create rwsdk create <project-name>`.

**`web/` subdirectory**: The chosen location for the scaffolded application. The generator is given `web` as the project name, placing all generated files under `web/`. This isolates the new app from the legacy root-level files during migration.

**`index.html` (legacy)**: The original static page content — a personal bio with social links and side-project listings. It is the content source for issue #2 but is NOT modified as part of scaffolding.

**`CNAME`**: GitHub Pages custom domain file. Retained at root throughout migration; the hosting cutover is tracked in upstream issues, not here.

**kindling harness**: The agentic system that drives work on this repo. It produces commits, PRs, and issues. The repo exists specifically as a dogfood target — changes here are made by kindling agents, not manually.

## Conventions Observed

- `pnpm` is the required package manager for all operations; `npm` and `yarn` are not used.
- The `web/` subdirectory is the conventional placement for the rwsdk app within this repo.
- PRs are produced by kindling tasks and left open for human review — they are not auto-merged.
- Commit `pnpm-lock.yaml`; never commit `package-lock.json` or `yarn.lock`.
- Sub-tasks are tracked as GitHub issues under a parent epic; each task maps to one PR.

## Known Unknowns

- The internal structure of the scaffolded `web/` directory is not yet known — it will be determined by `pnpm create rwsdk create web` output.
- The rwsdk scaffold generator's interactive behavior when a project name is supplied is assumed to be non-interactive; this has not been confirmed by a live run.
- It is unclear whether the generator writes any files outside the `web/` directory (e.g. a root-level `.gitignore` or `pnpm-workspace.yaml`).
- The final hosting/deploy mechanism (Cloudflare Workers, GitHub Actions workflow shape) is not yet defined — those details belong to issues #5 and #6.
- Whether a monorepo workspace setup at the repo root is needed (to coordinate `web/` as a workspace package) is not addressed in the current scope.