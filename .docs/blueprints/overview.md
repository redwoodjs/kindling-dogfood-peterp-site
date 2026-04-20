# peterp-site Blueprint

## 2000ft View

This is a personal website for Peter Pistorius (peterp.org) — currently a minimal static one-pager showing a bio, social links, and side projects. The repo is a kindling dogfood fork of the upstream peterp/peterp.github.io, used to test the kindling agentic harness. The active work is migrating from a single `index.html` file hosted on GitHub Pages to a RedwoodSDK (rwsdk) application running on Cloudflare Workers. The migration will enable the site to grow into a structured app supporting RSC, server functions, and realtime capabilities.

## System Flow

The current site has no application flow — it is a static HTML file:

1. **Entry point:** `index.html` at the root
2. **Content:** Bio paragraph, social links (Twitter, GitHub), list of side projects
3. **Styling:** Inline `<style>` block with minimal CSS (max-width, line-height, padding)
4. **Hosting:** GitHub Pages with custom domain via `CNAME` file (peterp.org)

The target architecture (rwsdk) will follow this flow:

1. Cloudflare Worker receives request
2. Vite-based React framework handles routing
3. RSC renders pages with React components
4. Response sent to client

## Directory Map

- `.github/` — GitHub configuration (PR template, workflows)
- `.github/workflows/` — CI workflow (currently a stub that just runs `true`)
- `.kindling/` — Kindling harness configuration and task board
- `.kindling/board/` — Task tracking directories (inbox, todo, doing, done, etc.)
- `.docs/` — Documentation and blueprints (this file)

## Key Abstractions

**index.html** — The entire current site. A self-contained HTML document with inline styles. Contains the bio content, external links, and a list of side projects. This will be decomposed into React components during the migration.

**CNAME** — Contains the custom domain `peterp.org`. Used by GitHub Pages for domain mapping. Will become irrelevant once traffic moves to Cloudflare Workers.

**Kindling board** — The `.kindling/board/` directory structure tracks task states (inbox → todo → doing → in-review → done). Tasks are markdown files that move between these directories as work progresses.

## Conventions Observed

- Branch name is `master` (not `main`)
- Uses pnpm for package management (specified in epic requirements)
- Kindling task files live in `.kindling/board/` with timestamp-prefixed filenames
- PR template reminds contributors this is a dogfood fork targeting this repo, not upstream
- CI workflow exists but is a placeholder (runs `true`)

## Known Unknowns

- No package.json exists yet — the scaffold task (#1) will create the pnpm project structure
- No rwsdk configuration present — wrangler.toml and Vite config will be added during migration
- Build/deploy flow incomplete — CI workflow is a stub; real deploy workflow is tracked in issue #6
- Testing strategy undefined — no tests present in current static site
- No CLAUDE.md or AGENTS.md exists yet — agent instructions will be added with issue #7