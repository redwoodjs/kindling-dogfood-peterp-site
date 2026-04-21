# Blueprint: kindling-dogfood-peterp-site

## 2000ft View

This repository (`redwoodjs/kindling-dogfood-peterp-site`) is a kindling dogfood fork of `peterp/peterp.github.io`. It exists as a live test example for the [kindling](https://github.com/redwoodjs/kindling) agentic harness; pull requests, issues, and commits here are produced by kindling tasks. At present the repo holds a minimal static HTML personal site (`peterp.org`). Issue #1 is actively scaffolding a RedwoodSDK project into the repository to replace or augment that static site.

## System Flow

There is no application runtime in the current pre-scaffold state. The repository contains a single static `index.html` served as a GitHub Pages site (indicated by the `CNAME` file pointing to `peterp.org`). The kindling task system drives changes via issues and PRs against this fork.

The planned scaffold (Issue #1) will introduce a RedwoodSDK application, likely under a `web/` subdirectory, with a Vite-based dev server on port 5173. Once scaffolded, the main code path will be: Vite dev server boots from the `web/` directory, serves the RedwoodSDK application on `localhost:5173`, and the project will be managed with `pnpm`.

## Directory Map

- `.github/` — GitHub metadata: a PR template reminding contributors to target this fork rather than upstream, and a placeholder CI workflow (`ci.yml`) that currently just exits `true`.
- `.kindling/` — Kindling agentic harness board directories (`board/archived`, `board/doing`, `board/done`, `board/dormant`, `board/in-review`, `board/inbox`, `board/todo`). Empty at present; used by the kindling system to track task state.
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

- No `package.json`, `vite.config.*`, or source tree exists yet — the RedwoodSDK scaffold is the immediate next step.
- Build and deploy pipeline is undefined after scaffolding; the existing CI is a placeholder.
- Testing strategy is unknown — no test files or configuration exist.
- The exact relationship between the scaffolded `web/` app and the root `index.html` is unclear (will the static page be replaced or coexist?).