# peterp.org Blueprint

## 2000ft View

This is a personal website for Peter Pistorius, currently implemented as a single static HTML page hosted on GitHub Pages. The site displays a brief bio, social media links (Twitter, GitHub), and a list of side projects including RedwoodJS, Machinen, Blackspace, and Billable. This repository is a kindling dogfood fork of `peterp/peterp.github.io`, used as a test subject for the RedwoodJS kindling agentic harness. The active work here is migrating the static site to a RedwoodSDK application running on Cloudflare Workers.

## System Flow

The current site has no dynamic behavior. The flow is trivial:

1. **Static hosting:** GitHub Pages serves files from the `master` branch.
2. **Entry point:** `index.html` at the repository root is served directly.
3. **Rendering:** The browser renders the HTML, applies the inline `<style>` block, and displays the page.
4. **DNS:** The `CNAME` file points the custom domain `peterp.org` to GitHub Pages.

After the planned migration to RedwoodSDK, the flow will become:

1. A Vite-based React app with server-side capabilities.
2. Cloudflare Workers hosting via wrangler deployment.
3. GitHub Actions CI/CD on push to master.

## Directory Map

- **`.git/`** — Git repository metadata.
- **`.github/`** — GitHub configuration: PR template and workflows.
  - **`workflows/`** — Contains `ci.yml`, a placeholder CI job (currently just runs `true`).
- **`.kindling/`** — Kindling harness state directory.
  - **`board/`** — Task board with subdirectories for task lifecycle stages (inbox, todo, doing, in-review, done, dormant, archived).

Root files:
- `index.html` — The entire site: HTML structure, inline CSS, bio content, and links.
- `CNAME` — Custom domain configuration (`peterp.org`).
- `README.md` — Fork notice explaining this is a kindling dogfood repo.

## Key Abstractions

### index.html (Current Site)
The single source of truth for the entire site. Contains a `<head>` with viewport meta tags, page title, and an inline `<style>` block defining minimal responsive styling (max-width 480px, line-height 1.6, padding 20px). The `<body>` contains an H1 greeting, two bio paragraphs with social links, and an ordered list of side projects with descriptions.

### CNAME
Standard GitHub Pages custom domain file. Contains the bare domain `peterp.org`. GitHub Pages uses this to configure DNS routing and HTTPS certificate provisioning.

### Kindling Board
The `.kindling/board/` directory implements a kanban-style task tracking system with stages: inbox, todo, doing, in-review, done, dormant, and archived. Tasks are markdown files that move between directories as they progress. This is used by the kindling harness to track agent work.

### CI Workflow
The `.github/workflows/ci.yml` defines a minimal GitHub Actions workflow that triggers on PRs and pushes to master. Currently it runs a no-op job (`run: "true"`). This will be replaced by a real deploy workflow as part of the migration.

## Conventions Observed

- **pnpm required:** The migration epic explicitly mandates pnpm for all package management (no npm/yarn).
- **Master branch:** The default branch is `master` (not `main`).
- **Inline styles:** The current site uses a minimal inline `<style>` block rather than external stylesheets.
- **Minimal dependencies:** The current site has zero runtime dependencies — pure HTML/CSS.
- **Kindling task files:** Task specifications live in `.kindling/board/` as timestamped markdown files.
- **PR template:** All PRs should note they target this fork, not upstream.

## Known Unknowns

- **RedwoodSDK project structure:** Until the scaffold task (#1) completes, the exact directory structure and configuration of the rwsdk app is undefined.
- **Styling approach:** Whether rwsdk defaults to CSS modules, Tailwind, or global stylesheets is not yet determined.
- **Worker bindings:** Whether the site will need any Cloudflare Worker bindings (KV, D1, etc.) is unclear; likely none for a simple portfolio site.
- **Environment variables:** No secrets or environment configuration exists yet; `CLOUDFLARE_API_TOKEN` will be needed for CI deployment.
- **Testing strategy:** No tests exist in the current static site. Whether the rwsdk app will include tests is not specified in the epic.
