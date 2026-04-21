# Blueprint: kindling-dogfood-peterp-site

## 2000ft View

This repository (`redwoodjs/kindling-dogfood-peterp-site`) is a kindling dogfood fork of `peterp/peterp.github.io`. It exists as a live test example for the [kindling](https://github.com/redwoodjs/kindling) agentic harness; pull requests, issues, and commits here are produced by kindling tasks. The repo now contains a RedwoodSDK project scaffolded into the `web/` subdirectory alongside the preserved static HTML personal site (`peterp.org`). Issue #1 has been completed: the scaffold was generated, dependencies installed, the dev server verified on `localhost:5173`, and lockfile cleanup performed.

## System Flow

The repository contains a static `index.html` served as a GitHub Pages site (indicated by the `CNAME` file pointing to `peterp.org`) alongside a RedwoodSDK application in the `web/` subdirectory. The kindling task system drives changes via issues and PRs against this fork.

The RedwoodSDK scaffold (Issue #1) introduced a Vite-based dev server running on port 5173, managed with `pnpm`. The main code path is: `pnpm dev` boots from the `web/` directory and serves the RedwoodSDK application on `localhost:5173`.

## Directory Map

- `.github/` — GitHub metadata: a PR template reminding contributors to target this fork rather than upstream, and a placeholder CI workflow (`ci.yml`) that currently just exits `true`.
- `.kindling/` — Kindling agentic harness board directories (`board/archived`, `board/doing`, `board/done`, `board/dormant`, `board/in-review`, `board/inbox`, `board/todo`). Used by the kindling system to track task state.
- `web/` — RedwoodSDK application directory. Contains `package.json`, `vite.config.mts`, `tsconfig.json`, `wrangler.jsonc`, source files under `src/`, type definitions, public assets, and `pnpm-lock.yaml`.
- `CNAME` — GitHub Pages custom domain configuration (`peterp.org`).
- `README.md` — One-line description identifying this as a kindling dogfood fork.
- `index.html` — Static HTML personal page for Peter Pistorius.

## Key Abstractions

- **Kindling dogfood fork** — A copy of an upstream repository used to test the kindling agentic system. PRs, issues, and commits here are machine-generated during dogfooding.
- **RedwoodSDK (rwsdk)** — The framework being scaffolded into this repo per Issue #1. It is a full-stack JavaScript/TypeScript SDK; the quick-start creates a Vite-powered project.
- **Kindling board** — The `.kindling/board/` directory structure used by the kindling harness to track task lifecycle states.

## Conventions Observed

- CI is a minimal GitHub Actions workflow (`ci.yml`) with a no-op `pass` job.
- The PR template explicitly warns against targeting upstream.
- Pre-existing root files (`README.md`, `CNAME`, `index.html`) are expected to be preserved during scaffolding.
- The repository uses `pnpm` as its package manager (per Issue #1 acceptance criteria).
- Kindling commits use `[skip ci]` in messages.

## Known Unknowns

- Build and deploy pipeline is undefined; the existing CI is a placeholder.
- Testing strategy is unknown — no test files or configuration exist.
- The scaffolded `web/` app coexists with the root `index.html`; the static page has been preserved.