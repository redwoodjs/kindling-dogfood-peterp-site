# Architecture Overview: kindling-dogfood-peterp-site

## 2000ft View

This repo is a dogfood fork of Peter Pistorius's personal site (`peterp.org`), maintained by the RedwoodJS team as a live test target for the [kindling](https://github.com/redwoodjs/kindling) agentic harness. Kindling agents open issues, write code, and raise PRs here as part of validating the harness. The site itself is being migrated from a static `index.html` (GitHub Pages) to a [RedwoodSDK](https://docs.rwsdk.com) application deployed on Cloudflare Workers. The upstream source-of-truth for Peter's real site is `peterp/peterp.github.io`; this fork tracks it.

## System Flow

**Before migration (current state):** GitHub serves `index.html` directly as a static page via GitHub Pages. The CNAME file points `peterp.org` at this repo. There is no build step — the HTML is the output.

**After migration (target state):**
1. Source lives under a scaffolded rwsdk project directory (likely `web/` or repo root, TBD by scaffold).
2. `pnpm dev` runs a Vite-based local dev server on port 5173 with React Server Components and hot reload.
3. `pnpm build` produces a Cloudflare Worker bundle.
4. `wrangler deploy` (or `pnpm release`) pushes the bundle to Cloudflare Workers.
5. A GitHub Actions workflow in `.github/workflows/` triggers on push to `master`, runs the deploy using a `CLOUDFLARE_API_TOKEN` secret.
6. The entry point is an rwsdk route file that renders the home page component (ported from `index.html`).

## Directory Map

```
.                        — repo root; currently holds the static site directly
index.html               — current site (to be superseded by rwsdk app)
CNAME                    — peterp.org domain binding for GitHub Pages
README.md                — dogfood purpose description
.github/
  workflows/ci.yml       — trivial CI (no-op pass); will be replaced/extended with deploy workflow
  PULL_REQUEST_TEMPLATE.md — PRs must target this fork's master, not upstream
.kindling/               — kindling harness configuration directory
.docs/blueprints/        — kindling architectural context (this file)
```

After scaffolding, a new directory (e.g. `web/` or project root structure) will contain the rwsdk application with its own `package.json`, `pnpm-lock.yaml`, `wrangler.toml`, and `src/` tree.

## Key Abstractions

**RedwoodSDK (rwsdk):** The target framework. Vite-based, React, runs on Cloudflare Workers. Scaffolded via `pnpm create rwsdk`. Provides React Server Components, server functions, and a file-based or config-based routing system. The `pnpm dev` command starts a local Vite dev server; `pnpm build` bundles for Cloudflare; `pnpm release` or `wrangler deploy` publishes.

**wrangler.toml:** Cloudflare's Worker configuration file. Declares the worker name, compatibility date, and any bindings (KV, D1, etc.). Must be committed so `wrangler deploy --dry-run` can validate the deployment config without a live push.

**GitHub Actions deploy workflow:** A YAML file under `.github/workflows/` that runs on push to `master`. Uses `pnpm/action-setup` for pnpm installation, caches dependencies, builds the rwsdk app, and deploys via `wrangler deploy` authenticated with a `CLOUDFLARE_API_TOKEN` secret.

**agent-ci:** RedwoodJS's local GitHub Actions runner (`@redwoodjs/agent-ci`). Allows agents (and humans) to validate the deploy workflow locally before pushing — pauses on failure with container state preserved. Invoked via `pnpm dlx agent-ci run --workflow .github/workflows/<name>.yml`. Usage instructions belong in `CLAUDE.md` or `AGENTS.md`.

**index.html (source of truth for content/styles):** The current single-page site. Contains the full bio, side-projects list, and an inline `<style>` block (`body { max-width: 480px; line-height: 1.6; padding: 20px; }`). All content and styling from this file must be preserved in the rwsdk app with visual parity.

## Conventions Observed

- `pnpm` is the required package manager for all install and script invocations — `npm` and `yarn` must not be used.
- PRs must target this fork's `master` branch, not the upstream `peterp/peterp.github.io` (enforced by PR template).
- Issues carry an **Upstream:** pointer to the corresponding issue in `peterp/peterp.github.io` and a **Parent:** pointer to the epic (#8).
- The `.kindling/` directory is present at the root; kindling harness metadata lives there.
- CI workflows live under `.github/workflows/`; the existing `ci.yml` is a no-op stub intended to be replaced or extended.

## Known Unknowns

- **Scaffold target directory:** Whether `pnpm create rwsdk` should run at the repo root (replacing the current layout) or into a subdirectory (e.g. `web/`) is not specified in the issues.
- **rwsdk routing convention:** The exact file names and directory structure for routes/components in a freshly scaffolded rwsdk project are not confirmed here — depends on the scaffold output.
- **Cloudflare account / worker name:** The worker name and Cloudflare account ID needed in `wrangler.toml` are not recorded in any checked-in file.
- **GitHub Pages disable step:** Cutting over from GitHub Pages to Cloudflare Workers is explicitly out of scope for this epic; no plan for that transition is present in the repo.
- **AGENTS.md / CLAUDE.md:** Neither file exists yet; issue #7 requires one to be created with agent-ci instructions.
- **Testing strategy:** No tests exist and no test framework is configured; none are mentioned in the epic scope.
