# kindling-dogfood-peterp-site

## 2000ft View

This repository is a personal website for Peter Pistorius (peterp.org), currently a static single-page HTML site. It serves as a dogfood testing ground for the kindling agentic harness — an AI task orchestration system developed by RedwoodJS. The site is being migrated from a bare HTML file served via GitHub Pages to a RedwoodSDK application running on Cloudflare Workers. Pull requests, issues, and commits here are produced by kindling tasks as part of validating the agent workflow.

## System Flow

**Pre-migration state** (what exists now):

1. GitHub Pages serves `index.html` directly from the repository root
2. The CNAME file maps the custom domain `peterp.org` to the GitHub Pages deployment
3. No build step, no framework, no JavaScript runtime

**Target state** (what the migration epic produces):

1. RedwoodSDK (rwsdk) framework scaffolded at repo root
2. Vite-based build system with React components
3. Deployment to Cloudflare Workers instead of GitHub Pages
4. CI workflow for automated deployment

The kindling harness tracks work via markdown files in `.kindling/board/`, moving tasks through inbox → todo → doing → in-review → done → archived states.

## Directory Map

- `.github/` — GitHub configuration: CI workflow stub, PR template
- `.kindling/` — Kindling task board with kanban-style directories for task lifecycle
- `.kindling/board/` — Task state directories (inbox, todo, doing, in-review, done, dormant, archived)

*Post-scaffold, the following will be added by rwsdk:*
- `src/` — Application source code (React components, routes, server functions)
- `public/` — Static assets served directly
- Configuration files at root: package.json, vite.config.ts, wrangler.toml, tsconfig.json

## Key Abstractions

**Kindling Board**: The `.kindling/board/` directory structure implements a file-based task board. Each task is a markdown file with YAML frontmatter (status, labels, dates, PR link). The harness moves files between directories to track state. The `doing/` directory contains the active task being worked.

**GitHub Pages Deployment**: Currently, the site deploys by pushing to master — GitHub Pages serves the root `index.html` directly. The CNAME file configures the custom domain. This deployment model will be replaced by Cloudflare Workers.

**RedwoodSDK (target)**: A Vite-based React framework designed for Cloudflare Workers. It provides file-based routing, React Server Components, server functions, and real-time capabilities. The scaffold creates the project structure; subsequent tasks port content and configure deployment.

## Conventions Observed

- The repository uses `master` as the default branch (not `main`)
- Pull requests target the dogfood fork, not upstream peterp/peterp.github.io
- The CI workflow is a stub that always passes — real validation happens in future sub-issues
- Task tracking uses markdown files with structured frontmatter in `.kindling/board/`
- Package management uses pnpm exclusively (per epic requirements)

## Known Unknowns

- **rwsdk scaffold output**: Exact files and directories created by `pnpm create rwsdk` depend on the current version of the scaffold — need to run it to see the actual structure
- **Conflict handling**: Unknown whether rwsdk scaffold will conflict with existing index.html or attempt to overwrite preserved files
- **Node version requirements**: No .nvmrc or engines field exists — rwsdk may have specific Node version requirements
- **Cloudflare account setup**: Deployment to Cloudflare Workers will require account configuration not tracked in the repo