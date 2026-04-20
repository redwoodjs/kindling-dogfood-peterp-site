# kindling-dogfood-peterp-site — Architecture Overview

## 2000ft View

This is a personal website (peterp.org) being migrated from a static HTML page to a RedwoodSDK application — a Vite-based React framework that runs on Cloudflare Workers. The repo is a Kindling dogfood fork used to test the Kindling agentic harness; PRs, issues, and commits here are produced by Kindling tasks. The site itself is a simple personal page with links and minimal content.

## System Flow

1. **Cloudflare Worker entry** — `src/worker.tsx` exports a default app defined via `defineApp()` from rwsdk. This is the server-side entry point.
2. **Middleware chain** — The app applies common headers (`src/app/headers.ts`), then a context setup function, then the router.
3. **Routing and rendering** — `render(Document, [...routes])` wraps page components in a document shell (`src/app/document.tsx`). Routes map URL paths to page components (currently just `/` → `Home`).
4. **Client hydration** — `src/client.tsx` handles client-side React hydration after the server-rendered response.
5. **Build and deploy** — Vite builds the project (`vite.config.mts` uses rwsdk and Cloudflare plugins). Wrangler (`wrangler.jsonc`) handles Cloudflare Workers deployment.

## Directory Map

- `.github/` — GitHub configuration (workflows, issue templates)
- `.kindling/` — Kindling harness board state and task tracking
- `public/` — Static assets served directly (favicons)
- `src/` — Application source code
  - `src/app/` — Application shell: document component, headers middleware, shared utilities
  - `src/app/pages/` — Page components (home, welcome) and their styles
- `types/` — TypeScript declaration files for Vite, rwsdk, and CSS modules

## Key Abstractions

**defineApp** — The top-level rwsdk function in `src/worker.tsx` that creates the Cloudflare Worker. Takes an array of middleware functions and a render call. This is the composition root of the application.

**render and route** — rwsdk's routing primitives imported from `rwsdk/router`. `render()` wraps routes in a document component; `route()` maps URL patterns to page components. All routing is declared in the middleware array passed to `defineApp`.

**Document** — The HTML document shell in `src/app/document.tsx`. Wraps all page content. Equivalent to a layout component that provides the outer HTML structure, head tags, and scripts.

**setCommonHeaders** — A middleware factory in `src/app/headers.ts` that returns a function adding standard HTTP headers to every response.

## Conventions Observed

- pnpm is the exclusive package manager; no npm or yarn lockfiles.
- TypeScript throughout; strict config in `tsconfig.json`.
- Path alias `@/` maps to `src/` for imports.
- CSS modules used for component styles (`.module.css` files).
- Shared constants and utilities live in `src/app/shared/`.
- Vite config is in `.mts` (ES module TypeScript).
- Cloudflare Worker types are generated via `wrangler types` (invoked through the `generate` script).

## Known Unknowns

- **Deployment flow incomplete** — `wrangler.jsonc` exists but deployment is not yet configured for the actual domain; this is tracked in epic sub-issues #5 and #6.
- **Testing strategy absent** — No test files, test runner, or test configuration present in the scaffold.
- **CI pipeline** — `.github/` directory exists from the original repo but CI workflows for the rwsdk app are not yet set up (tracked in sub-issue #6).
- **Content migration pending** — The scaffold contains default starter content, not the original peterp.org page content (tracked in sub-issues #2 and #3).