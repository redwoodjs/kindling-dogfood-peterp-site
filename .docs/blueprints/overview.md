### 2000ft View
This repository is currently a very small personal site hosted on GitHub Pages. It presents a short bio, links to social profiles, and a list of side projects on a single static HTML page. The near-term migration target is to replace that static site with a RedwoodSDK app and a package-managed project structure, but that application scaffold does not exist yet in the current tree.

### System Flow
1. The published entrypoint is `index.html` at the repository root.
2. The page is pure HTML with inline CSS and no JavaScript runtime, build step, or asset pipeline.
3. Browser navigation is entirely static: the page renders a heading, a short intro, a social link paragraph, and a side-project list.
4. `CNAME` indicates the site is intended for a custom GitHub Pages domain.
5. There is no package manager manifest, source directory, or application server entrypoint in the repo yet.

### Directory Map
- `.github/` GitHub metadata, including the pull request template.
- `.kindling/` Kindling task state and local orchestration metadata.
- `.git/` Repository history and internal Git data.
- `.docs/` Missing at the moment; expected future home for blueprints and task context.
- Root files:
  - `index.html` Static site entrypoint.
  - `README.md` Brief description of the fork and its purpose.
  - `CNAME` Custom domain marker for GitHub Pages.

### Key Abstractions
`index.html` is the entire runtime surface today. It is the document served to visitors and contains all visible content and styling inline, so there is no component boundary or client-side app structure to reason about yet.

`README.md` frames the repo as a kindling dogfood fork of `peterp/peterp.github.io`. It establishes that the repo is not the canonical upstream site and that changes here are part of the kindling workflow.

`CNAME` is the deployment hint for GitHub Pages. Its presence indicates that the current site is published as a static custom-domain site rather than through an app server or hosting abstraction.

`.github/PULL_REQUEST_TEMPLATE.md` encodes a repository convention rather than application logic. It explicitly notes that pull requests should target this fork's `master` branch, not the upstream repository.

### Conventions Observed
- The repository is currently static and minimal, with no `package.json`, lockfile, or source tree.
- The current site content lives directly in root-level `index.html`.
- GitHub Pages conventions are in use, including a root `CNAME`.
- Repository metadata and task workflow hints live alongside the content in `.github/` and `.kindling/`.
- The fork identity is documented in both `README.md` and the PR template.

### Known Unknowns
- The RedwoodSDK app scaffold has not been created yet, so the future runtime entrypoint layout is unknown.
- The package manager choice is not declared anywhere in the repo yet.
- Build, dev server, test, and deployment commands are not defined in the current tree.
- The migration boundary between the old static site and the new app is not yet expressed in code.
- There is no `src/`, `app/`, `packages/`, or equivalent application directory to map yet.