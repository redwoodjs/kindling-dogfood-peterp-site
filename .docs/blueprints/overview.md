# kindling-dogfood-peterp-site

## 2000ft View

This repository is a personal website for Peter Pistorius (peterp.org), currently a static single-page HTML site served via GitHub Pages. It doubles as a live dogfood test environment for the kindling agentic harness — an AI task orchestration system developed by RedwoodJS — so all pull requests, issues, and commits are produced by kindling agents. An active epic (#8) is migrating the site from its bare `index.html` to a RedwoodSDK application running on Cloudflare Workers.

## System Flow

**Pre-migration state (current):**

1. GitHub Pages serves `index.html` directly from the repository root.
2. The `CNAME` file maps the custom domain `peterp.org` to the GitHub Pages deployment.
3. No build step, no framework, no JavaScript runtime.

**Target state (what the migration epic produces):**

1. A RedwoodSDK project scaffolded into the `web/` subdirectory via `pnpm create rwsdk`.
2. Vite-based build system with React components under `web/src/`.
3. `wrangler.jsonc` configures deployment to Cloudflare Workers.
4. A GitHub Actions CI workflow automates deployment on push to `master`.

The kindling harness tracks work via markdown files in `.kindling/board/`, moving task files through directories named `inbox`, `todo`, `doing`, `in-review`, `done`, `dormant`, and `archived`.

## Directory Map

- `.docs/blueprints/` — Architectural context files for kindling agents (this file lives here)
- `.github/` — GitHub configuration: CI workflow stub, PR template
- `.kindling/` — Kindling task board root
- `.kindling/board/` — Task state directories implementing a file-based kanban board
- `web/` — *(post-scaffold)* RedwoodSDK application; contains its own `package.json`, `pnpm-lock.yaml`, `wrangler.jsonc`, and `src/`

Root-level files: `index.html` (the current site), `CNAME` (custom domain config), `README.md` (dogfood fork notice).

## Key Abstractions

**index.html:** The entire current website — a minimal HTML file with inline CSS containing Peter's bio, a side-projects ordered list, and links to Twitter and GitHub. This content must be ported to React components during migration.

**RedwoodSDK (target framework):** A Vite-based React framework designed to run on Cloudflare Workers. Provides file-based routing, React Server Components, and server functions. Scaffolded via `pnpm create rwsdk`; the scaffold creates `src/app/pages/`, `src/app/document.tsx`, `wrangler.jsonc`, and related config files under `web/`.

**Kindling Board:** The `.kindling/board/` directory implements a file-based task board. Each task is a markdown file with YAML frontmatter tracking status, timestamps, and PR links. The harness moves files between state directories to track task lifecycle. The `doing/` directory holds the currently active task.

**Migration Epic (#8):** A structured seven-issue plan decomposing the rwsdk migration: scaffold (#1), port content (#2), port styles (#3), verify local dev (#4), add Worker config (#5), add CI deploy workflow (#6), and install agent-ci (#7). Issues run in phases with explicit dependency ordering documented in the progress board (issue #59).

**AGENTS.md:** Added during migration work; documents project conventions for agents including pnpm-only package management, agent-ci usage, and PR targeting rules.

## Conventions Observed

- `master` is the default branch (not `main`)
- `pnpm` is the exclusive package manager — no `package-lock.json` or `yarn.lock`
- The rwsdk project is scaffolded into a `web/` subfolder to avoid conflicting with root-level GitHub Pages files (`index.html`, `CNAME`)
- Pull requests are opened as drafts while work is in progress; they target `master`
- The CI workflow stub always passes (`exit 0`) — real validation is added by sub-issues
- Task markdown files use YAML frontmatter with fields: `status`, `labels`, `created`, `started`, `completed`, `github-pr`, `github-comments`, `no-pr`, `depends-on`

## Known Unknowns

- **Exact rwsdk scaffold output:** The files created by `pnpm create rwsdk` depend on the installed version; running the command is required to confirm the directory structure.
- **Node/pnpm version requirements:** No `.nvmrc` or `engines` field exists in the repo; rwsdk may have minimum version requirements.
- **Cloudflare account setup:** Deployment requires a Cloudflare account and `CLOUDFLARE_API_TOKEN` repository secret — neither is documented in the repo.
- **GitHub Actions workflow scope:** Prior attempts could not push `.github/workflows/deploy.yml` due to the GitHub token lacking the `workflow` scope; this remains unresolved.
- **Upstream relationship:** The repo is a fork of `peterp/peterp.github.io` but the fork relationship appears inactive — no upstream syncing is expected.
