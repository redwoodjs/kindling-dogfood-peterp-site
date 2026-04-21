# Architecture Overview: kindling-dogfood-peterp-site

## 2000ft View

This repo is a dogfood fork of Peter Pistorius's personal site (`peterp.org`), maintained by the RedwoodJS team as a live test target for the [kindling](https://github.com/redwoodjs/kindling) agentic harness. Kindling agents open issues, write code, and raise PRs here to validate the harness. The site is being migrated from a static `index.html` (GitHub Pages) to a [RedwoodSDK](https://docs.rwsdk.com) application deployed on Cloudflare Workers. The upstream source of truth is `peterp/peterp.github.io`; this fork tracks it. As of the latest state, the RedwoodSDK application lives on the `feat/rwsdk-migration` branch under the `web/` directory, while `master` still holds the legacy static page.

## System Flow

**Legacy mode (master branch):** GitHub Pages serves `index.html` directly. The `CNAME` file binds `peterp.org` to this repo. No build step exists.

**RedwoodSDK mode (feat/rwsdk-migration branch):**
1. The application source lives under `web/`. Run all package commands from inside that directory.
2. `pnpm dev` starts a Vite development server on port 5173. The Vite config (`web/vite.config.mts`) loads the `@cloudflare/vite-plugin` (worker environment) and the `rwsdk/vite` plugin.
3. The worker entry point is `web/src/worker.tsx`. It defines the app via `defineApp`, which chains middleware and a render tree. The render tree wraps every page in the `Document` component and registers the `/` route to the `Home` page.
4. The client entry point is `web/src/client.tsx`. It initializes client-side navigation using RSC RPC, enabling hydrated transitions without full page reloads.
5. `pnpm build` produces a Cloudflare Worker bundle via Vite.
6. `pnpm release` (or `wrangler deploy`) pushes the bundle to Cloudflare Workers, using `web/wrangler.jsonc` for configuration.
7. A GitHub Actions workflow under `.github/workflows/` is intended to run the deploy on push to `master`; the current placeholder workflow is a no-op pass.

## Directory Map

```
.                          — repo root; legacy static site files
index.html                 — current static page (bio, projects, inline styles)
CNAME                      — peterp.org domain binding for GitHub Pages
README.md                  — dogfood purpose description
AGENTS.md                  — agent instructions (pnpm, project layout, PR targets)
.github/
  workflows/ci.yml         — placeholder CI (no-op pass)
  PULL_REQUEST_TEMPLATE.md — reminder to target this fork's master, not upstream
.kindling/                 — kindling harness board configuration
.docs/blueprints/          — architectural context (this file)
web/                       — RedwoodSDK application (on feat/rwsdk-migration)
  package.json             — project manifest, scripts, dependencies
  pnpm-lock.yaml           — lockfile
  vite.config.mts          — Vite configuration with Redwood + Cloudflare plugins
  tsconfig.json            — TypeScript configuration with @/* path alias
  wrangler.jsonc           — Cloudflare Worker configuration
  worker-configuration.d.ts — Wrangler-generated type declarations
  public/                  — static assets (favicons)
  src/
    worker.tsx             — Worker entry point: app definition, routing, middleware
    client.tsx             — Browser entry point: hydration and client navigation
    app/
      document.tsx         — HTML document shell (<html>, <head>, <body>)
      headers.ts           — Security headers middleware (HSTS, CSP, etc.)
      pages/
        home.tsx           — Home page component (ported from index.html content)
        home.module.css    — Global-style CSS extracted from index.html inline styles
        welcome.tsx        — Scaffolded welcome page (unused, can be removed)
        welcome.module.css — Scaffolded welcome styles
      shared/
        links.ts           — Typed link helper for rwsdk router
  types/                   — Additional type declarations (css, rw, vite)
```

## Key Abstractions

**Worker entry (`src/worker.tsx`):** The Cloudflare Worker boots here. `defineApp` accepts an array of middleware and a render descriptor. The current app chains `setCommonHeaders()` (security headers), a no-op context-setup function, and `render(Document, [route("/", Home)])`. This is where new routes and global middleware are registered.

**Document wrapper (`src/app/document.tsx`):** A React component that renders the outer `<html>` envelope. It emits the viewport meta tag, a modulepreload link for `/src/client.tsx`, and a script tag that dynamically imports the client entry. All pages are wrapped inside this shell.

**Home page (`src/app/pages/home.tsx`):** The sole production route. It renders Peter's bio, social links, and side-projects list using a CSS module (`home.module.css`). The content and styling were ported from the legacy `index.html` to achieve visual parity.

**Security headers (`src/app/headers.ts`):** A `RouteMiddleware` factory that sets HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and a strict Content-Security-Policy. The HSTS header is skipped in development (`VITE_IS_DEV_SERVER`).

**Vite + Cloudflare plugin pipeline (`vite.config.mts`):** The build is orchestrated by Vite with two plugins: `@cloudflare/vite-plugin` (which targets the `worker` environment) and `redwood()` from `rwsdk/vite`. This enables RSC, server functions, and Worker bundling in one step.

## Conventions Observed

- `pnpm` is the required package manager. `npm` and `yarn` are not used.
- The rwsdk application is scoped inside `web/`. All package scripts (e.g. `pnpm dev`, `pnpm build`) must be run from that subdirectory.
- Path aliases use `@/*` mapped to `./src/*` in both `tsconfig.json` and Vite.
- Styles are written as CSS modules (`*.module.css`) and imported into components.
- Tests are not yet present; there is no test runner configuration.
- PRs must target this fork's `master` branch, not the upstream `peterp/peterp.github.io` (enforced by PR template).
- CI workflow changes are expected to be validated locally using `@redwoodjs/agent-ci` before being declared complete.

## Known Unknowns

- The `feat/rwsdk-migration` branch contains the rwsdk app but has not been merged to `master` yet. It is unclear when or how this merge will happen.
- The deploy workflow under `.github/workflows/` is currently a placeholder. The real deploy workflow (if it exists) may be on another branch or pending in a draft PR.
- No testing strategy is visible — no test files, test scripts, or test runner config were found in the rwsdk branch.
- The `welcome.tsx` scaffold page is still present but unused. Its removal status is unclear.
- The `pnpm-lock.yaml` is committed, but it is unknown whether pnpm workspace or monorepo tooling is intended for the repo root.