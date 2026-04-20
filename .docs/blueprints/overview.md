# kindling-dogfood-peterp-site — Architecture Overview

## 2000ft View

This repository is a dogfood fork of [peterp/peterp.github.io](https://github.com/peterp/peterp.github.io) maintained by the RedwoodJS team as a live test target for the [kindling](https://github.com/redwoodjs/kindling) agentic harness. Kindling tasks — automated agents — operate on this repo to validate agent-driven development workflows. The site itself is a personal homepage for Peter Pistorius (peterp.org). In its current pre-migration state the entire site is a single static HTML file served via GitHub Pages; the active migration epic aims to rewrite it as a RedwoodSDK (rwsdk) application running on Cloudflare Workers.

## System Flow

The current site has no build step. A visitor requests peterp.org, GitHub Pages serves `index.html` directly, and the browser renders a static bio page with inline styles. There is no JavaScript, no bundler, and no server-side logic.

The intended post-migration flow: a visitor requests the domain → Cloudflare Workers routes the request → a RedwoodSDK (Vite + React) application handles it, rendering via React Server Components → HTML is streamed back to the browser. Local development uses `pnpm dev` (Vite dev server on localhost:5173). Deployment runs via a GitHub Actions workflow pushing to Cloudflare Workers using `wrangler deploy`.

Key files on the current main path:
- `index.html` — the entire current site
- `CNAME` — GitHub Pages custom domain (`board`)
- `.github/workflows/ci.yml` — stub CI (currently a no-op pass)

## Directory Map

| Path | Contents |
|------|----------|
| `.git/` | Git repository metadata |
| `.github/` | GitHub configuration — currently contains `workflows/ci.yml` (stub) |
| `.kindling/` | Kindling harness configuration for this dogfood target |
| `index.html` | The complete current site — static personal bio page |
| `CNAME` | GitHub Pages custom domain file |
| `README.md` | Project description noting this is a kindling dogfood fork |

## Key Abstractions

**index.html (current site):** The entire website in a single file. Contains a brief personal bio for Peter Pistorius, links to Twitter and GitHub, and a list of side projects (RedwoodJS, Machinen, Blackspace, Billable). Inline `<style>` block provides minimal layout. This file is the migration source — its content and styles are the acceptance criteria for the rwsdk port.

**RedwoodSDK (migration target):** A Vite-based React framework designed to run on Cloudflare Workers, with support for React Server Components and server functions. The migration will scaffold a new rwsdk project (via `pnpm create rwsdk`), then port the HTML content into route files and React components, and the inline styles into a stylesheet. The scaffolded project will introduce `wrangler.toml` for Cloudflare Worker configuration.

**Kindling harness (.kindling/):** Configuration consumed by the kindling agent system. Kindling reads this to understand how to operate on the repo — which tasks to run, what tools and skills are available. This repo exists specifically so kindling can open PRs, create issues, and commit code as part of harness validation.

**CI workflow (.github/workflows/ci.yml):** Currently a stub that always passes (`run: "true"`). The migration epic adds a real deploy workflow here — a GitHub Actions job that builds the rwsdk app and deploys to Cloudflare Workers on push to `master`.

**Migration epic (#8):** The primary active work item. Tracked as a GitHub issue with seven child issues (#1–#7), each covering one step of the migration: scaffold, port content, port styles, verify local dev, add wrangler config, add CI deploy, and install agent-ci for local workflow validation.

## Conventions Observed

- All package management uses `pnpm` (explicitly required by the epic; no `package.json` exists yet pre-migration).
- GitHub issues follow a structured format: upstream cross-reference, parent issue link, prose description, and a bulleted acceptance criteria list.
- Issues are labeled `kindling-dogfood`.
- The CI workflow file lives at `.github/workflows/ci.yml`; the deploy workflow will be added under `.github/workflows/` as well.
- The kindling harness configuration is isolated in `.kindling/`.

## Known Unknowns

- Contents of `.kindling/` not inspected — configuration schema and purpose of individual files is unclear.
- No `package.json` exists yet — post-migration project structure under `web/` or repo root is undecided (the epic says "e.g. into a `web/` subfolder or a fresh branch").
- The `CNAME` file contains `board` rather than a real domain — unclear if this is a misconfiguration or intentional for the dogfood fork.
- Testing strategy is not defined — no test files exist and no test runner configuration is present.
- Exact rwsdk scaffolded directory layout not yet known (depends on `pnpm create rwsdk` output).
- Build and deploy secrets (`CLOUDFLARE_API_TOKEN`) are referenced but not confirmed as configured in repo settings.