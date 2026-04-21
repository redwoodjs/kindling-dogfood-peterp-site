# peterp.org Architecture Blueprint

## 2000ft View

This repository is Peter Pistorius's personal website (peterp.org), being migrated from a static HTML page to a RedwoodSDK application. RedwoodSDK (rwsdk) is a full-stack React framework built on React Server Components running on Cloudflare Workers. The site serves as a dogfooding target for the kindling agentic harness. The intended audience is Peter himself and anyone interested in his work—the site showcases his bio and side projects including RedwoodJS, Machinen, Blackspace, and Billable.

## System Flow

1. **Request arrives at Cloudflare Worker** — The `src/worker.tsx` file exports the application via `defineApp()` from rwsdk.

2. **Middleware chain executes** — The app definition is an array of handlers. `setCommonHeaders()` runs first to set security and caching headers, then a context setup function runs.

3. **Router matches the path** — The `render()` call wraps the `Document` component around matched routes. Currently only `/` is defined, mapping to the `Home` page.

4. **React Server Component renders** — The page renders server-side. The `Document` component provides the HTML shell (head, body, fonts). Pages live in `src/app/pages/`.

5. **Client hydration** — The browser loads `src/client.tsx` which initializes rwsdk's client-side navigation via `initClient()` and `initClientNavigation()`.

6. **Subsequent navigation uses RSC RPC** — Client-side route changes fetch server-rendered payloads without full page reloads.

## Directory Map

- `.docs/` — Documentation artifacts including this blueprint
- `.github/` — GitHub configuration (PR template, CI workflow)
- `.kindling/` — Kindling task board tracking work in progress
- `public/` — Static assets served directly (favicons)
- `src/` — Application source code
- `src/app/` — React components and application logic
- `src/app/pages/` — Page components (home.tsx, welcome.tsx)
- `src/app/shared/` — Shared utilities (links.ts)
- `types/` — TypeScript declaration files for CSS modules, rwsdk, and Vite

## Key Abstractions

**defineApp** — The rwsdk function that creates a Cloudflare Worker-compatible application. It takes an array of middleware and route handlers. The exported default from `src/worker.tsx` is the application entry point.

**Document** — The root HTML document component at `src/app/document.tsx`. All pages render as children of this component. It sets up the HTML structure, meta tags, fonts, and client script loading.

**render and route** — Routing primitives from `rwsdk/router`. `route(path, Component)` defines a URL-to-component mapping. `render(Document, routes)` wraps matched routes in the Document shell.

**setCommonHeaders** — A middleware function in `src/app/headers.ts` that sets HTTP headers on responses. Returns a function compatible with the defineApp middleware chain.

**initClient and initClientNavigation** — Client-side initialization functions from `rwsdk/client`. They enable RSC-based client-side navigation where route changes fetch server-rendered content via RPC rather than full page loads.

## Conventions Observed

- All source files use TypeScript with `.tsx` or `.ts` extensions
- CSS modules are used for component styles (e.g., `welcome.module.css`)
- Path aliases use `@/` to reference `src/` (configured in tsconfig)
- Pages are standalone components exported as named exports
- The worker entry point is always `src/worker.tsx`
- Client entry point is always `src/client.tsx`
- Package manager is pnpm (pnpm-lock.yaml committed, no npm/yarn lockfiles)
- Cloudflare Workers configuration lives in `wrangler.jsonc`

## Known Unknowns

- **Deployment configuration complete** — The `wrangler.jsonc` is configured with `name: "peterp-org"`, `compatibility_date: "2026-04-21"`, `main: "src/worker.tsx"`, and `assets.directory: "public"`. `wrangler deploy --dry-run` exits 0.
- **No database or D1 bindings configured** — The scaffold is minimal; any data persistence will need to be added
- **Testing strategy unclear** — No test files or test configuration present in the scaffold
- **Build/deploy CI not configured** — Current CI workflow is a placeholder that just runs `true`
- **Original site content not migrated** — The existing `index.html` with Peter's bio is preserved but not integrated into the rwsdk app