# peterp.org — Architectural Overview

## 2000ft View

This is a kindling dogfood fork of Peter Pistorius's personal site (peterp.org), used as a live test target for the [kindling](https://github.com/redwoodjs/kindling) agentic harness. The repo is being migrated from a single static `index.html` to a [RedwoodSDK](https://docs.rwsdk.com) application — a Vite + React framework that deploys to Cloudflare Workers. Pull requests and commits here are produced by kindling agents as part of dogfooding. The real upstream site lives at peterp/peterp.github.io.

## System Flow

**Pre-migration (current baseline):** The entire site is one file — `index.html` — served as a GitHub Pages static site via the `CNAME` record pointing `peterp.org` at the repo. No build step; no framework.

**Post-migration target:** A RedwoodSDK application scaffolded under `web/`. The entry point becomes `web/src/worker.tsx`, which uses `defineApp` to register routes. On the main request path, the Cloudflare Worker receives an HTTP request → `worker.tsx` routes it → the matching route handler renders a React component tree (via RSC) → returns an HTML response. Deployment is via Wrangler (`pnpm release` or `wrangler deploy`) triggered by a GitHub Actions workflow on push to `master`.

## Directory Map

```
/                     — repo root
├── index.html        — current static site (entire personal site, pre-migration)
├── CNAME             — GitHub Pages custom domain (peterp.org)
├── .github/
│   ├── workflows/    — GitHub Actions (ci.yml stub; deploy workflow to be added)
│   └── PULL_REQUEST_TEMPLATE.md
├── .docs/
│   └── blueprints/   — architectural context for kindling agents
├── .kindling/
│   └── board/        — kindling task board (inbox/todo/doing/done/etc. directories)
└── web/              — (to be created) RedwoodSDK application
    ├── src/
    │   ├── worker.tsx      — Cloudflare Worker entry point; defineApp + route registration
    │   └── app/            — React components (Document, page components)
    ├── wrangler.toml       — Cloudflare Worker config (name, compat date, bindings)
    └── package.json        — pnpm project; scripts: dev, build, release
```

## Key Abstractions

**`index.html` (pre-migration baseline):** The complete current site. Contains the page title ("Peter Pistorius"), a bio paragraph, social links (Twitter, GitHub), and a Side Projects `<ol>` (RedwoodJS, Machinen, Blackspace, Billable). The only CSS is an inline `<style>` block setting `body { max-width: 480px; line-height: 1.6; padding: 20px }`. This file is the canonical source of content that must be faithfully ported.

**RedwoodSDK worker entry (`web/src/worker.tsx`):** In the target architecture, this is the Cloudflare Worker entry point. It calls `defineApp` with an array of route definitions. Each route maps a URL pattern to a React Server Component render. This is where all routing lives — there is no separate router config file.

**Wrangler config (`web/wrangler.toml`):** Declares the Cloudflare Worker name, `compatibility_date`, and any bindings (KV, D1, etc.). Required for both local `wrangler dev` and remote `wrangler deploy`. The rwsdk scaffold generates a default version that must be committed.

**CI deploy workflow (`.github/workflows/deploy.yml`):** GitHub Action that triggers on push to `master`, installs pnpm via `pnpm/action-setup`, caches dependencies, and runs `pnpm release` (or `wrangler deploy`) using a `CLOUDFLARE_API_TOKEN` repository secret. Replaces the current stub `ci.yml`.

**kindling board (`.kindling/board/`):** Directories representing task states (`inbox`, `todo`, `doing`, `done`, `dormant`, `archived`, `in-review`). Each task is a markdown file with YAML frontmatter (`status`, `github-pr`, `depends-on`, etc.) and a `## Brief` / `## Progress Log` body. The harness reads and writes these files to track agent work.

## Conventions Observed

- `pnpm` is the required package manager; `pnpm-lock.yaml` must be committed; no `package-lock.json` or `yarn.lock`.
- PRs must target this fork's `master` branch, not upstream `peterp/peterp.github.io`.
- GitHub issues carry an `**Upstream:**` reference linking to the corresponding peterp/peterp.github.io issue.
- Kindling task files use YAML frontmatter for machine-readable state and freeform markdown for human-readable progress.
- All sub-issues reference a parent epic with `Parent: #8`.

## Known Unknowns

- Exact rwsdk scaffold output structure not inspected from a live run — directory layout inferred from documentation.
- Whether `wrangler deploy --dry-run` can succeed in this environment without Cloudflare credentials is unclear.
- `agent-ci` (`@redwoodjs/agent-ci`) local runner behavior and whether it can run in this dev container is untested.
- No `CLOUDFLARE_API_TOKEN` secret confirmed to exist in repo settings — deploy workflow acceptance criteria may require manual secret setup.
- `pnpm dlx skills add redwoodjs/agent-ci --skill agent-ci` command behavior in the kindling harness context is not documented here.