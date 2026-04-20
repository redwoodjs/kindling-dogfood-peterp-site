# Overview Blueprint

## 2000ft View

This repository is a kindling dogfood fork of peterp/peterp.github.io — the personal website of Peter Pistorius. The fork's purpose is to serve as a live test target for the kindling agentic harness: kindling tasks run here, open PRs, and produce real commits, exercising the harness under production conditions. The site is being migrated from a static single-file `index.html` to a RedwoodSDK (rwsdk) application — a Vite-based React framework that deploys to Cloudflare Workers. At the start of this migration, no build tooling exists; the scaffold task (sub-issue #1) is the first step.

## System Flow

At the time of this blueprint, the project has no application runtime. The current flow is:

1. A browser requests the site (hosted on GitHub Pages via the `CNAME` record pointing to the custom domain).
2. GitHub Pages serves `index.html` statically — no server, no build step, no framework.

After the rwsdk migration (the goal of epic #8), the flow will be:

1. Developer runs `pnpm dev` — Vite starts a local dev server on port 5173.
2. Requests hit the Cloudflare Workers runtime (via Vite's worker dev mode).
3. rwsdk routes the request to React Server Components, which render the page.
4. In production, `pnpm deploy` (via wrangler) publishes to Cloudflare Workers.

The entry point for the future application will be established by the scaffold — likely `src/worker.tsx` or equivalent per rwsdk conventions.

## Directory Map

```
/
├── index.html          — Current static site (single HTML page, full site content)
├── CNAME               — GitHub Pages custom domain config
├── README.md           — Kindling dogfood notice (not the real site README)
├── .github/            — GitHub config; contains PULL_REQUEST_TEMPLATE.md
└── .kindling/          — Kindling harness metadata (board file)
```

After scaffold, additional top-level files and directories will be added (package.json, pnpm-lock.yaml, src/, public/, wrangler.toml, etc.).

## Key Abstractions

**index.html** — The entirety of the current site. Plain HTML with inline CSS. Contains personal bio, Twitter/GitHub links, and a list of side projects (RedwoodJS, Machinen, Blackspace, Billable). This file must be preserved through the migration — it is not replaced by the scaffold but will eventually be superseded by rwsdk routes.

**RedwoodSDK (rwsdk)** — The target framework. Vite-based, React-first, deploys to Cloudflare Workers. Scaffolded via `pnpm create rwsdk`. Provides React Server Components, server functions, and a Cloudflare Workers runtime adapter. The quick-start reference is https://docs.rwsdk.com/getting-started/quick-start/.

**kindling** — The agentic harness driving this migration. Tasks are launched as kindling jobs, each targeting a sub-issue. Metadata lives in `.kindling/`. PRs produced by kindling tasks must target this fork's `master` branch, not the upstream repo.

**CNAME** — The custom domain file used by GitHub Pages. Must be preserved even as the deployment target migrates to Cloudflare Workers, until the hosting cutover is complete (tracked separately from this epic).

**Epic #8 sub-issue sequence** — The migration is broken into seven sequential sub-issues: scaffold (#1), port content (#2), port styles (#3), verify local dev (#4), wrangler.toml (#5), CI deploy (#6), agent-ci (#7). Each sub-issue is a discrete kindling task. This blueprint covers the state after #1.

## Conventions Observed

- Package manager is `pnpm` throughout — no npm or yarn.
- PRs target this fork's `master`, never the upstream `peterp/peterp.github.io` (enforced by the PR template).
- Existing files (`index.html`, `CNAME`, `README.md`, `.github/`) are preserved across scaffold and migration steps.
- The `.kindling/` directory holds harness metadata and is not part of the application.

## Known Unknowns

- Build and deploy flow post-scaffold is not yet established — wrangler.toml and CI workflow are future sub-issues (#5, #6).
- Testing strategy is unknown — no test files or test runner config exist yet.
- Whether the scaffold will place source files at the repo root or in a subdirectory (e.g. `web/`) is to be determined by the scaffold run itself; sub-issue #1 notes either is acceptable.
- How `index.html` will coexist with the rwsdk scaffold output is unknown until the scaffold runs and conflicts (if any) are resolved.
