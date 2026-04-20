# Architecture Blueprint: Overview

## 2000ft View

This repository is a kindling dogfood fork of [peterp/peterp.github.io](https://github.com/peterp/peterp.github.io) — a personal GitHub Pages site for Peter Pistorius. It exists as a live test target for the [kindling](https://github.com/redwoodjs/kindling) agentic development harness: real issues are filed here, kindling tasks execute against it, and the results are observable in production. The upstream site is a minimal static HTML page hosted at peterp.org; this fork is where agentic scaffolding and RedwoodSDK migration work is prototyped before (optionally) upstreaming.

## System Flow

The current state of the repo is a static GitHub Pages site with no build step. The entry point is `index.html`, which is served directly by GitHub Pages at peterp.org (domain configured via `CNAME`). There is no JavaScript build pipeline, no server, and no package manager configuration as of the initial state.

Following the scaffold task (issue #1), the repo will gain a RedwoodSDK project — most likely under a `web/` subdirectory — providing a full-stack Cloudflare Workers-backed application scaffold. Once scaffolded, the flow becomes: pnpm workspace → RedwoodSDK dev server (`pnpm dev`) → Vite/Cloudflare Workers runtime serving on `http://localhost:5173`.

## Directory Map

| Path | Description |
|---|---|
| `index.html` | Static HTML entry point for the GitHub Pages site; preserved across scaffold |
| `README.md` | Repo description noting this is a kindling dogfood fork |
| `CNAME` | GitHub Pages custom domain configuration (`peterp.org`) |
| `.docs/` | Kindling knowledge artifacts: blueprints, learnings, conventions, decisions |
| `web/` | (Planned) RedwoodSDK scaffolded project — added by issue #1 scaffold task |

## Key Abstractions

**GitHub Pages static layer** — The `index.html` + `CNAME` pair is the current production artifact. GitHub Pages serves `index.html` at the root with no build step. The `CNAME` file tells Pages to respond to `peterp.org`. These files must be preserved through any scaffolding work.

**RedwoodSDK scaffold** — `pnpm create rwsdk` is the official scaffolder for RedwoodSDK projects. It generates a Cloudflare Workers-backed full-stack application with Vite for local development. The dev server runs on port 5173 by default. The scaffold is non-interactive when run with appropriate flags. The quick-start reference is at https://docs.rwsdk.com/getting-started/quick-start/.

**Kindling dogfood loop** — Issues filed in this repo are picked up by the kindling harness, which runs agentic tasks against the codebase, opens PRs, and monitors CI. This repo exists to surface real-world failures in the harness — not to be a production-quality codebase in its own right.

**pnpm workspace** — Once the RedwoodSDK project is scaffolded, the repo will use pnpm as its package manager. A `pnpm-lock.yaml` must be committed (not `package-lock.json` or `yarn.lock`). The `pnpm install` and `pnpm dev` commands are the canonical local workflow.

## Conventions Observed

- Static files (`index.html`, `CNAME`, `README.md`) at the repo root are considered preserved artifacts and must not be deleted by scaffolding tasks.
- pnpm is the designated package manager; no npm or yarn lockfiles should be committed.
- Knowledge artifacts live under `.docs/` with subdirectories by type (`blueprints/`, `learnings/`, `conventions/`, `decisions/`).
- The repo follows the kindling dogfood convention: PRs are opened but not merged by the agent unless explicitly instructed.

## Known Unknowns

- Where exactly `pnpm create rwsdk` scaffolds its output (repo root vs. a named subdirectory like `web/`) — needs to be determined by running the command and observing the output.
- Whether `pnpm create rwsdk` supports a fully non-interactive mode via CLI flags, or requires manual input suppression (e.g. piping defaults).
- Whether a pnpm workspace root `package.json` is needed at the repo root to co-locate the static site and the RedwoodSDK project.
- CI configuration — no workflow files observed; unclear whether GitHub Actions are configured for this fork.
- Deploy strategy for the RedwoodSDK app once scaffolded — Cloudflare Workers deployment config not yet present.