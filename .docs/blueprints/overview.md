### 2000ft View
This repository is a small kindling dogfood fork for `peterp.github.io` that is being migrated toward a RedwoodSDK-style worker app. The current codebase is intentionally minimal: it is set up to run locally as a Cloudflare worker entrypoint and serves as the scaffold for the migration epic, not as a finished content port.

### System Flow
1. The runtime entrypoint is `src/worker.tsx`.
2. The worker receives each request and immediately delegates to `renderApp` in `src/app.tsx`.
3. `renderApp` builds a small HTML document through `renderDocument` in `src/lib/render.ts`.
4. The worker returns that document as an HTML response with a UTF-8 content type.
5. Local execution is wired through `wrangler dev`, defined in `package.json`, with `wrangler.jsonc` pointing at the worker entry file.

### Directory Map
- `.github` - GitHub-facing repo metadata and the pull request template.
- `.kindling` - harness state and task progress metadata for the current kindling run.
- `src` - the worker scaffold and its small HTML rendering helpers.
- `src/lib` - low-level rendering utilities used by the worker app shell.
- `.docs` - persisted documentation artifacts used by future tasks.
- `.docs/blueprints` - architectural blueprint files, including this overview.

### Key Abstractions
`src/worker.tsx` is the runtime boundary. It exports the Cloudflare worker handler and defines the only request-to-response path currently present in the repo.

`renderApp` in `src/app.tsx` is the application-level assembly point. It is where the page shell is composed before the response is emitted.

`renderDocument` in `src/lib/render.ts` is the HTML document helper. It wraps a title and body in a full document and escapes the title text before insertion.

`package.json` is the local development contract. It defines the `dev`, `start`, and `typecheck` scripts and declares the worker-oriented toolchain dependencies.

`wrangler.jsonc` is the deployment/runtime config surface for local worker execution. It identifies the worker main file and the compatibility date.

### Conventions Observed
The repo is currently tiny and root-level. There is no monorepo layout, no nested package structure, and no generated build output checked in.

TypeScript is the chosen scaffold language for the worker path, with source files under `src`.

The current worker path is deliberately direct. Request handling stays in the worker entrypoint and rendering stays in small helper functions rather than introducing a larger framework layer.

The existing top-level `index.html` and `README.md` describe the legacy static site and the fork’s purpose, but they are not the runtime path for the new scaffold.

### Setup Notes
The worker scaffold depends on the local toolchain declared in the package manifest. A fresh checkout needs those dependencies installed before type checking or local execution will work.

The TypeScript configuration must allow JSX-aware source because the worker entry imports a TSX module. This is part of the scaffold shape, even though the runtime output is still plain HTML from the worker.

Local-only install and runtime artifacts stay untracked. That keeps the scaffold baseline clean while still allowing local execution through the worker dev server.

The runtime proof matters more than the static shape for this phase. If the worker serves the placeholder HTML successfully and type checking stays green, the scaffold is doing its job.

### Known Unknowns
The full RedwoodSDK application structure is not yet present. There is no confirmed router, component hierarchy, or client hydration setup in the repository.

Testing strategy is unclear. No test runner configuration or test files were present in the initial repo scan.

Deployment automation is unclear. There is no visible CI config, publish script, or hosting pipeline for the new worker scaffold.

Content migration scope is unclear beyond the current scaffold. The repo still contains the legacy static HTML page, but the new worker path only serves a placeholder shell.
