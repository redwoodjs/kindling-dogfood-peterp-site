# 2000ft View
This repository is currently a very small personal site fork used as a kindling dogfood target. The visible product is a static profile page for Peter Pistorius with a short bio, outbound links, and a list of side projects. The repo exists as a migration target for future RedwoodSDK app work, but at the moment it does not contain an application scaffold, package manifest, or runtime code beyond a single HTML file.

# System Flow
1. The browser loads `index.html` at the repository root.
2. The document renders a simple static page with inline styles and content in the body.
3. There is no client framework, build pipeline, server entry point, or data fetch path in the current tree.
4. Navigation is entirely outbound via standard links to external sites.

# Directory Map
- `/.github` contains repository-level GitHub metadata, including the pull request template.
- `/.kindling` contains task state and board files used by the kindling harness.
- `/.docs` is the documentation area; the blueprints directory does not exist before this bootstrap pass.
- `/.git` is the repository metadata.
- `/` currently holds the site entry point `index.html`, the root `README.md`, and `CNAME`.

# Key Abstractions
- `index.html` is the entire runtime surface today. It defines the page title, inline layout rules, and all visible content in one file. There are no component boundaries or shared modules yet.
- The root `README.md` is a short provenance note. It identifies the repo as a kindling dogfood fork of `peterp/peterp.github.io` and points contributors back upstream for the real site.
- The kindling board under `/.kindling/board` is the operational metadata layer for the agent harness. It tracks task state, not application state.
- `CNAME` indicates the site is expected to be published with a custom domain, but the publishing mechanism is not defined in this tree.

# Conventions Observed
- The site is currently implemented as a single static HTML document with inline CSS.
- Repository documentation is minimal and lives at the root in `README.md`.
- PR guidance is encoded in `/.github/PULL_REQUEST_TEMPLATE.md`.
- Kindling task metadata is stored in `/.kindling` rather than in code.
- There is no evidence yet of a package manager, build script, source directory, test suite, or deployment config.

# Known Unknowns
- The intended RedwoodSDK project structure is not present yet, so entry points, routes, and runtime ownership are still undefined.
- The package manager and workspace layout are not defined because no `package.json`, lockfile, or workspace manifest exists.
- The build and dev workflow are unclear because there is no app scaffold, scripts, or tooling config.
- The deployment path is unclear beyond the presence of `CNAME`.
- The testing strategy is unknown because no test files or test runner config are present.