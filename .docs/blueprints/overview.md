# Project Blueprint: peterp.org (RedwoodSDK)

## 2000ft View

This is a personal website for Peter Pistorius (peterp.org), built on the RedwoodSDK framework (rwsdk v1.2.3). It runs as a Cloudflare Worker, rendered via React Server Components. The repo is also used as a live dogfood test case for the [kindling](https://github.com/redwoodjs/kindling) agentic harness, so pull requests and commits are frequently produced by automated agents.

## System Flow

1. **Entry point — `src/worker.tsx`**: Defines the application using `defineApp` from rwsdk. This is where routes are registered and the top-level request handling is configured.
2. **Document wrapper — `src/app/document.tsx`**: Wraps every rendered page with the HTML shell (head, body, style links, etc.).
3. **Pages — `src/app/pages/`**: Individual page components. The home page lives at `src/app/pages/home.tsx`. A welcome/demo page lives at `src/app/pages/welcome.tsx`.
4. **Client hydration — `src/client.tsx`**: The client-side entry point that hydrates React Server Components in the browser.
5. **Build/Dev — Vite + Cloudflare plugin**: `vite.config.mts` wires the `@cloudflare/vite-plugin` to produce a Cloudflare Worker bundle. `pnpm dev` runs the Vite dev server on port 5173. `pnpm release` builds and deploys via Wrangler.

## Directory Map

| Path | Contents |
|------|----------|
| `src/` | Application source — worker entry, client entry, app subdirectory |
| `src/app/` | App-level modules: document wrapper, headers, pages, shared utilities |
| `src/app/pages/` | Page-level React components (home, welcome) |
| `src/app/shared/` | Shared constants/utilities used across pages (e.g., links) |
| `public/` | Static assets served directly (favicons) |
| `types/` | Ambient TypeScript declarations for CSS modules, Vite env, and rwsdk types |
| `.vscode/` | VS Code launch configuration for debugging |
| `.github/` | GitHub Actions workflows and PR template |
| `.kindling/` | Kindling agentic harness configuration |
| `.docs/blueprints/` | Persisted architectural blueprints for kindling tasks |

## Key Abstractions

**`defineApp` (rwsdk)** — The core factory imported in `src/worker.tsx` that wires together routes, middleware, and the document wrapper into a Cloudflare Worker fetch handler. All route registration goes through this call.

**Document (`src/app/document.tsx`)** — A React Server Component that provides the HTML skeleton for every page. It wraps page content with the `<html>`, `<head>`, and `<body>` tags. Modifying global styles, meta tags, or the favicon happens here.

**Pages (`src/app/pages/`)** — Self-contained React Server Components, one per route. Each page exports a default component. New pages are added here and then registered as routes inside `src/worker.tsx`.

**Wrangler / Worker runtime** — The project targets the Cloudflare Workers runtime. `wrangler.jsonc` holds the worker name, compatibility date, and asset configuration. `worker-configuration.d.ts` and `types/rw.d.ts` provide the TypeScript environment for the Worker global scope.

**Vite + `@cloudflare/vite-plugin`** — The build pipeline. `vite.config.mts` configures the Cloudflare plugin which handles RSC compilation and Worker bundling. The dev server proxies to a local workerd instance.

## Conventions Observed

- **pnpm only** — `pnpm-lock.yaml` is the only lockfile; no `package-lock.json` or `yarn.lock` are present.
- **Routes registered in `src/worker.tsx`** — All application routes are wired in the `defineApp` call in the worker entry point.
- **React Server Components by default** — Pages and the document are server components; client components are marked with `"use client"`.
- **TypeScript throughout** — All source files use `.tsx` or `.ts`; ambient declarations live in `types/`.
- **CSS Modules** — Page-level styles use `.module.css` files co-located with their component.

## Known Unknowns

- **Testing** — No test files or test runner configuration were found. It is unclear whether tests are expected or planned.
- **CI/CD deploy pipeline** — `.github/workflows/` exists but was not inspected in detail. Whether `pnpm release` (Wrangler deploy) is wired into CI is unknown.
- **`index.html` at repo root** — A legacy static HTML file from before the RedwoodSDK scaffold remains at the root. Its role going forward (kept for redirect, deleted, replaced) is not yet determined.
- **Environment variables / secrets** — `wrangler.jsonc` and rwsdk may require Cloudflare account credentials for deploy. No `.env.example` or secrets documentation was found.