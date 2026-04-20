### 2000ft View

This is `kindling-dogfood-peterp-site`, a fork of peterp's personal site (peterp.org) used exclusively as a live test target for the [kindling](https://github.com/redwoodjs/kindling) agentic development harness. Real users do not interact with this repo directly — kindling agents produce all PRs, commits, and issue updates here as part of dogfooding the agent pipeline. The upstream personal site lives at peterp/peterp.github.io.

### System Flow

The project has two distinct layers:

**Legacy static site (root):** `index.html` at the repo root is a static HTML file served via GitHub Pages using the custom domain `peterp.org` (configured via `CNAME`). No build step. This layer is preserved during the RedwoodSDK migration to avoid breaking the live site.

**RedwoodSDK app (`web/`):** The in-flight migration target. Scaffolded via `pnpm create rwsdk web`. The app entry point is `web/src/worker.tsx` (the Cloudflare Worker entry). Routes are defined there and delegate to pages under `web/src/app/pages/`. The client hydration entry is `web/src/client.tsx`. The document shell lives at `web/src/app/document.tsx`. The dev server (`pnpm dev` inside `web/`) runs on port 5173 via Vite.

The migration stages tracked on issue #48 are:
1. Scaffold RedwoodSDK project into `web/` — done (sub-task #1)
2. Port `index.html` content into RedwoodSDK routes/components
3. Port styles to RedwoodSDK app
4. Verify local dev
5. Add `wrangler.toml` / Worker config
6. Add CI deploy workflow (GitHub Actions → Cloudflare Workers)
7. Install agent-ci for local GitHub Actions validation

### Directory Map

```
/                        — repo root
├── index.html           — original personal site HTML (GitHub Pages legacy, preserved)
├── CNAME                — GitHub Pages custom domain: peterp.org
├── README.md            — explains this is a kindling dogfood fork
├── .github/             — GitHub Actions workflow definitions
├── .kindling/           — kindling harness orchestration state (board, task files)
├── .docs/blueprints/    — persistent architectural context for kindling agents
└── web/                 — RedwoodSDK application (Cloudflare Workers target)
    ├── src/
    │   ├── worker.tsx       — Cloudflare Worker entry point; defines routes
    │   ├── client.tsx       — client-side hydration entry
    │   └── app/
    │       ├── document.tsx     — HTML document shell (head, body wrapper)
    │       ├── headers.ts       — HTTP response headers config
    │       ├── shared/          — shared utilities (e.g. links.ts)
    │       └── pages/           — route page components
    ├── public/              — static assets (favicons)
    ├── types/               — ambient TypeScript declarations (CSS, Vite, rw)
    ├── package.json         — dependencies and scripts
    ├── pnpm-lock.yaml       — lockfile (committed)
    ├── vite.config.mts      — Vite config (uses @cloudflare/vite-plugin)
    ├── wrangler.jsonc       — Wrangler / Cloudflare Workers config
    └── tsconfig.json        — TypeScript config
```

### Key Abstractions

**kindling harness** — The external agent system (redwoodjs/kindling) that drives all changes to this repo. Tasks are dispatched by kindling, agents run in this environment, and progress is tracked via GitHub issues. The `.kindling/board` directory holds local orchestration state including in-progress task files.

**Progress board (issue #48)** — A GitHub issue that serves as the orchestration checklist for Epic #8 (Migrate peterp.org to RedwoodSDK). Each sub-task is a checkbox item. Agents update this issue as work proceeds — marking items in-progress, linking to PRs, and leaving comments.

**`web/src/worker.tsx`** — The Cloudflare Worker entry point for the RedwoodSDK app. This is where routes are registered and request handling is defined. It is the top of the server-side code path.

**`web/src/app/pages/`** — Contains the React Server Component page files for each route. New routes add a file here and a corresponding registration in `worker.tsx`.

**RedwoodSDK (`rwsdk`)** — The full-stack framework wrapping React Server Components and Cloudflare Workers. Version 1.2.3 is in use. The dev server runs via `vite dev` on port 5173. Deployment targets Cloudflare Workers via `wrangler`.

**Static root (legacy)** — `index.html` and `CNAME` at the repo root are the GitHub Pages deployment artifacts. They must remain untouched until the Cloudflare Workers deployment is fully live and domain transfer is complete (domain transfer is out of scope for this project).

### Conventions Observed

- Package manager is `pnpm` exclusively — no npm or yarn commands anywhere in the project.
- The RedwoodSDK app lives in `web/` as a subdirectory, keeping the repo root clean for the legacy GitHub Pages files.
- All agent-driven changes produce PRs targeting `master` (not direct commits).
- Sub-tasks on issue #48 are updated with comments linking to PRs when work begins.
- `web/pnpm-lock.yaml` is committed (not gitignored).
- `web/node_modules/` and `web/.wrangler/` are gitignored.

### Known Unknowns

- Contents of `.github/` workflows — unclear whether any CI currently runs and what triggers it.
- Whether GitHub Pages deployment is currently active and serving `index.html` via `peterp.org`.
- Final shape of `wrangler.jsonc` for production deployment — the scaffolded file is a starter template; sub-task #5 will finalize it.
- CI deploy workflow — does not exist yet; planned in sub-task #6.
- How domain cutover from GitHub Pages to Cloudflare Workers will be handled — explicitly out of scope per issue #48.
