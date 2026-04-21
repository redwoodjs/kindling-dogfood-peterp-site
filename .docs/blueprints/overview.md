### 2000ft View

`kindling-dogfood-peterp-site` is a fork of `peterp/peterp.github.io` (a single-page static personal site) used as a live dogfood target for the RedwoodJS **kindling** agentic harness. It is intentionally small so that kindling tasks can exercise real workflows — scaffolds, migrations, CI, and deploys — on a low-stakes repository. The site currently serves a single `index.html` via GitHub Pages at `peterp.org`. The active epic (Issue 8) is migrating it to **RedwoodSDK** (a Vite-based React framework that runs on Cloudflare Workers). All issues, PRs, and commits here are produced by kindling tasks.

### System Flow

**Current state (static site):**
1. `index.html` — a single hand-written HTML file with inline CSS and a short bio / project list.
2. GitHub Pages serves the file from the `master` branch at the custom domain `peterp.org` (configured via `CNAME`).
3. `.github/workflows/ci.yml` exists as a placeholder — it runs `true` on every pull request and push to `master`.

**Planned state (RedwoodSDK app):**
1. A RedwoodSDK project scaffolded (likely in a `web/` subfolder or at root — not yet decided).
2. `pnpm dev` serves the Vite-based React app locally.
3. `pnpm release` (or `wrangler deploy`) deploys the built Worker to Cloudflare.
4. GitHub Actions workflow triggers on push to `master`, runs `pnpm install`, builds, and deploys via `wrangler` using a `CLOUDFLARE_API_TOKEN` secret.
5. `@redwoodjs/agent-ci` allows agents to validate workflow changes locally before pushing.

### Directory Map

- `/` — root contains `index.html` (the current site), `CNAME` (GitHub Pages domain config), and `README.md`.
- `.docs/blueprints/` — architectural context for future kindling tasks (this file).
- `.github/workflows/` — GitHub Actions workflow definitions. Currently contains a placeholder `ci.yml`.
- `.github/PULL_REQUEST_TEMPLATE.md` — one-line reminder that PRs target this fork's `master`, not upstream.
- `.kindling/board/` — kindling harness metadata directory (currently empty).

### Key Abstractions

- **Kindling harness** — the agentic task runner that creates branches, writes code, opens PRs, and posts status comments on this repo. It operates through the `.kindling/` directory and uses GitHub issues as the task backlog.
- **RedwoodSDK (rwsdk)** — the target framework: Vite + React + Cloudflare Workers. The epic is migrating the static site into this stack.
- **Dogfood fork** — this repo is explicitly a testbed. Changes here are expected to be mechanical and driven by kindling tasks, not human editorial decisions.
- **Agent-ci** — `@redwoodjs/agent-ci`, a local GitHub Actions runner. Once installed, it will let agents run workflow files locally before pushing, preserving container state on failures.

### Conventions Observed

- **Package manager:** `pnpm` is mandated for all package management (no npm or yarn). Lockfile must be `pnpm-lock.yaml`.
- **Branch naming:** kindling creates branches like `kindling/YYYY-MM-DD-HHMM-brief-<slug>--<id>`.
- **Commit messages:** kindling commits include `[skip ci]` in the message to avoid triggering the placeholder workflow during agent operations.
- **PR target:** all PRs target this fork's `master` branch, not upstream `peterp/peterp.github.io`.
- **Issue numbering:** tasks reference GitHub issues on `redwoodjs/kindling-dogfood-peterp-site`. The epic (Issue 8) groups sub-issues for the RedwoodSDK migration.

### Known Unknowns

- **Scaffold location:** Issue 1 mentions scaffolding "into a `web/` subfolder or a fresh branch" — the final location is not yet fixed.
- **Build/deploy flow:** No `wrangler.toml`, `package.json`, or deploy script exists yet. The exact build output path and wrangler configuration are TBD.
- **Testing strategy:** No test files or test runner configuration exist yet.
- **Agent instructions file:** The task references adding notes to `CLAUDE.md` or `AGENTS.md`, but neither file exists in the repo yet. It is unclear which filename will become the canonical agent instructions file.
- **Kindling board usage:** `.kindling/board/` exists but is empty; its intended file format and consumption pattern are not visible.