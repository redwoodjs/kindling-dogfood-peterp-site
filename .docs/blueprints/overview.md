### 2000ft View
This repository is now carrying the first RedwoodSDK scaffold for the migration path. The old static site content remains the published baseline for now, but the repo has been reshaped around a package-managed app shell with runtime entrypoints and a worker-based build pipeline so later phases can replace the content without redoing the foundation.

### System Flow
1. The app now boots through a RedwoodSDK worker entrypoint with a matching client bootstrap.
2. The document shell provides the HTML scaffold and global styling, while the home route renders the current migration placeholder.
3. The project is package-managed and builds through the Cloudflare and Redwood tooling chain.
4. The old root-level static page remains the historical content baseline, but it is no longer the only runtime shape in the tree.
5. `CNAME` still signals the legacy GitHub Pages deployment context that the migration must eventually reconcile.

### Directory Map
- `.github/` GitHub metadata, including the pull request template.
- `.kindling/` Kindling task state and local orchestration metadata.
- `.git/` Repository history and internal Git data.
- `.docs/` Blueprints and migration notes, including this scaffold overview.
- Root files:
  - `index.html` Legacy static entrypoint kept during the migration transition.
  - `README.md` Brief description of the fork and its purpose.
  - `CNAME` Custom domain marker for GitHub Pages.
  - `package.json` Package manager manifest for the RedwoodSDK app shell.
  - `wrangler.jsonc` Worker configuration used by the scaffolded runtime.

### Key Abstractions
The RedwoodSDK scaffold now owns the runtime surface for the new app shell. The HTML document, client bootstrap, and worker entrypoint cooperate to render the placeholder migration home while the legacy static page remains part of the transition context.

`README.md` frames the repo as a kindling dogfood fork of `peterp/peterp.github.io`. It establishes that the repo is not the canonical upstream site and that changes here are part of the kindling workflow.

`CNAME` is the deployment hint for GitHub Pages. Its presence indicates that the current site is published as a static custom-domain site rather than through an app server or hosting abstraction.

`.github/PULL_REQUEST_TEMPLATE.md` encodes a repository convention rather than application logic. It explicitly notes that pull requests should target this fork's `master` branch, not the upstream repository.

### Conventions Observed
- The repository is currently static and minimal, with no `package.json`, lockfile, or source tree.
- The repository now has a package manager manifest, lockfile, and source tree for the scaffolded app shell.
- The current migration placeholder lives in the app shell rather than the original static page.
- GitHub Pages conventions still exist in the history of the project, including a root `CNAME`, but the app scaffold introduces a separate runtime path that future work must account for.
- Repository metadata and task workflow hints live alongside the content in `.github/` and `.kindling/`.
- The fork identity is documented in both `README.md` and the PR template.

### Known Unknowns
- The scaffold builds only when the project is treated as an ESM package; the Cloudflare toolchain expects that shape for the worker bundle.
- The worker config points at the source worker entry, while the build output is produced in the scaffolded worker and client directories.
- The app shell intentionally stays minimal: placeholder content, shared styling, and a simple route boundary are enough for the migration foundation.
- The legacy static page is still present as a transition marker, but the new app shell is now the runtime path that future migration work should extend.
