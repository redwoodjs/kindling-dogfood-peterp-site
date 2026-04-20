### 2000ft View
This repository is a migration-in-progress for a very small personal site that was previously a single static HTML file. It now uses the RedwoodSDK starter as the baseline application shell so future tasks can move the site onto the RedwoodSDK and Cloudflare Workers stack incrementally. The immediate users are contributors working through kindling tasks; end users are still effectively seeing starter content until the original site is ported.

### System Flow
The current runtime starts with Vite and the RedwoodSDK plugin configuration in `vite.config.mts`, with Cloudflare worker support enabled through the Cloudflare Vite plugin. Local development is driven through `pnpm dev`, which serves the app on port 5173 and runs the RedwoodSDK worker entry.

The main server entrypoint is `src/worker.tsx`. It defines the RedwoodSDK app, applies shared response headers via `src/app/headers.ts`, and registers the only route, `/`, which renders the `Home` page.

Rendering flows through `src/app/document.tsx`, which defines the HTML document shell and bootstraps the client with `src/client.tsx`. The `Home` page in `src/app/pages/home.tsx` currently delegates to the starter `Welcome` component in `src/app/pages/welcome.tsx`, so the shipped UI is still the stock RedwoodSDK welcome screen rather than the migrated site.

Cloudflare worker deployment configuration is present in `wrangler.jsonc`, but deployment automation and production-specific setup have not been added yet. The generated app still uses the starter structure, including public assets in `public/` and generated type declaration support in `types/` and `worker-configuration.d.ts`.

### Directory Map
`.docs/`: Project documentation artifacts, including the persisted architecture blueprint used by future kindling tasks.
`.github/`: Repository-level GitHub metadata; currently only a pull request template.
`.kindling/`: Kindling task board state and task records created by the harness.
`public/`: Static public assets served by the app, currently the starter favicons.
`src/`: Application source for the RedwoodSDK app.
`src/app/`: App-level modules such as the document shell, shared headers, routes, and starter page components.
`src/app/pages/`: Route-facing page components and page-local styles.
`src/app/shared/`: Shared app utilities; currently contains route link helpers.
`types/`: Type declaration shims for CSS modules, Vite, and RedwoodSDK.

### Key Abstractions
`defineApp` in `src/worker.tsx` is the top-level RedwoodSDK composition point. It wires together middleware-like setup steps and the route renderer, making it the place future tasks will extend when adding context, middleware, or more routes.

`render` and `route` from RedwoodSDK, used in `src/worker.tsx`, define how requests are matched and converted into rendered responses. Right now there is only one route for the home page, which keeps the routing surface minimal.

`Document` in `src/app/document.tsx` is the shared HTML shell. It sets page metadata, loads fonts, and injects the client bootstrap script, so any site-wide head or layout changes will likely start here.

`setCommonHeaders` in `src/app/headers.ts` centralizes response security headers. It is the only clear cross-cutting middleware in the current codebase and applies CSP, referrer policy, permissions policy, and related defaults to responses.

`Home` and `Welcome` in `src/app/pages/home.tsx` and `src/app/pages/welcome.tsx` represent the entire visible application at the moment. `Home` is a thin route component, while `Welcome` is the stock RedwoodSDK starter UI that will eventually be replaced by the real site content.

`initClient` and `initClientNavigation` in `src/client.tsx` establish the RedwoodSDK client-side runtime needed for hydration and client navigation. This is the bridge between the document shell and any client-interactive UI.

### Conventions Observed
The scaffold uses TypeScript and ES module syntax throughout.

App bootstrapping follows RedwoodSDK starter conventions: Vite config at the repo root, worker entry in `src/worker.tsx`, client bootstrap in `src/client.tsx`, and app modules under `src/app/`.

Routes are currently registered inline in the worker entry rather than split into a larger routing module.

Page-local styling uses CSS modules, as seen in `src/app/pages/welcome.module.css`.

Package management is based on `pnpm`, and the task requirements expect `pnpm-lock.yaml` rather than npm or Yarn lockfiles.

### Known Unknowns
- Production deployment flow is not yet established beyond the starter `wrangler.jsonc` and default `release` script.
- There is no test setup yet; no test runner configuration or test files are present.
- The final route structure for the migrated site is not defined yet because the existing static content has not been ported.
- There is no documented environment variable contract yet beyond the empty `vars` section in `wrangler.jsonc`.
