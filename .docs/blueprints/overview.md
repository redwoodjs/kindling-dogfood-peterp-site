# kindling-dogfood-peterp-site — Architectural Overview

### 2000ft View

This repo is a dogfood fork of [peterp/peterp.github.io](https://github.com/peterp/peterp.github.io), maintained by the RedwoodJS team as a live test target for the [kindling](https://github.com/redwoodjs/kindling) agentic harness. Real commits, pull requests, and issues here are produced by kindling agent tasks running in the course of dogfooding. The site itself is Peter Pistorius's personal homepage — currently a minimal static single-page HTML file hosted on GitHub Pages. An active migration epic (#8) is in progress to rewrite the site as a RedwoodSDK application running on Cloudflare Workers.

---

### System Flow

**Current state (pre-migration):** There is no build pipeline. The sole deliverable is `index.html` — a self-contained static page served directly by GitHub Pages. The `CNAME` file points the custom domain at the GitHub Pages host.

**Post-migration target (per Epic #8):**
1. A RedwoodSDK project is scaffolded (likely into the repo root or a `web/` subfolder) using `pnpm create rwsdk`.
2. The site's content (bio, links, side-project list) moves from `index.html` into React route files and components inside the rwsdk app.
3. Styles move from the inline `<style>` block in `index.html` into a CSS module or global stylesheet within the rwsdk app.
4. A `wrangler.toml` configures the Cloudflare Worker (worker name, compatibility date, bindings).
5. A GitHub Actions workflow under `.github/workflows/` deploys the app to Cloudflare Workers on push to `master`, using a `CLOUDFLARE_API_TOKEN` secret and `pnpm/action-setup`.
6. `agent-ci` is installed as a dev dependency to allow local pre-push validation of the GitHub Actions deploy workflow.

---

### Directory Map

| Path | Contents |
|------|----------|
| `.github/` | GitHub-specific config — PR template (`PULL_REQUEST_TEMPLATE.md`) and CI workflows under `workflows/` |
| `.github/workflows/` | GitHub Actions workflow files (currently the deploy workflow target for post-migration) |
| `index.html` | The current single-file static site (pre-migration deliverable) |
| `CNAME` | Custom domain config for GitHub Pages (`peterp.org`) |
| `README.md` | Dogfood fork notice; points readers to the upstream real site |

> After the rwsdk migration (Epic #8), a new project directory (e.g. `web/` or root-level rwsdk scaffold) will appear with the standard RedwoodSDK structure (`src/`, `public/`, `wrangler.toml`, `package.json`, etc.).

---

### Key Abstractions

**`index.html` (current site)**
The entire current site. Contains a minimal inline CSS block (max-width 480px, line-height 1.6, padding 20px), a bio paragraph, social links (Twitter, GitHub), and an ordered list of four side projects. This file is the content source that migration tasks #2 and #3 will consume.

**RedwoodSDK (migration target)**
A Vite-based React meta-framework that compiles to a Cloudflare Worker. Routes are file-based React components. Server-side rendering runs on the Worker edge. The project is bootstrapped via `pnpm create rwsdk`. Key config lives in `wrangler.toml`. Dev server runs on `http://localhost:5173`.

**`wrangler.toml` (post-migration)**
Cloudflare Workers deployment configuration. Specifies the worker name, compatibility date, and any bindings (KV, D1, etc.). Required for both local `wrangler dev` and `wrangler deploy`. This file does not yet exist in the repo.

**GitHub Actions deploy workflow (post-migration)**
A YAML workflow under `.github/workflows/` that triggers on push to `master`, sets up pnpm via `pnpm/action-setup`, installs dependencies, and runs `pnpm release` (or `wrangler deploy`) using a `CLOUDFLARE_API_TOKEN` secret. Does not yet exist.

**agent-ci**
A local GitHub Actions runner from RedwoodJS (`@redwoodjs/agent-ci`). Allows validating the deploy workflow locally before pushing — pauses on failures with container state preserved. Installed as a dev dependency and invoked via `pnpm dlx agent-ci run --workflow <workflow-file>`. Referenced in issue #7.

**Kindling orchestration issues**
Issues in this repo serve a dual purpose: they are both real GitHub issues and the task queue / progress tracker for the kindling agentic harness. Epic #8 is the parent issue; sub-issues #1–#7 are child tasks; issue #48 is the orchestration progress board created by this priming run.

---

### Conventions Observed

- **Package manager:** `pnpm` exclusively — enforced by the epic's tooling note.
- **Branching/deploy target:** `master` is the deploy branch (referenced in the CI workflow spec).
- **Issue structure:** Sub-issues carry a `Parent: #N` line and an `**Upstream:** org/repo#N` cross-reference linking to the real peterp.github.io repo.
- **Labels:** All kindling-generated issues carry the `kindling-dogfood` label.
- **Acceptance criteria:** Each sub-issue ends with an explicit `Acceptance:` block listing verifiable conditions.

---

### Known Unknowns

- **Existing workflows:** `.github/workflows/` exists but the workflow file names and contents were not read — unknown whether any CI already runs.
- **Target scaffold location:** Epic #8 says "e.g. into a `web/` subfolder or a fresh branch" — the final directory layout for the rwsdk app is unresolved.
- **Cloudflare account / worker name:** The worker name and account ID required for `wrangler.toml` are not specified in any issue.
- **`CLOUDFLARE_API_TOKEN` secret:** Whether this secret is already set in the repo's GitHub Actions secrets is unknown.
- **Dependency ordering:** Issues #1–#7 have no explicit `depends-on` links — the intended execution order beyond the logical (scaffold → port content → port styles → verify → wrangler → CI → agent-ci) is not documented.
- **Disposition of `index.html` post-migration:** Issue #2 notes "old `index.html` can be removed once cutover happens (tracked separately)" — the cutover task does not appear to be in this repo.