# 2000ft View
This repository is currently a very small static site for Peter Pistorius, and the checked-in README describes it as a kindling dogfood fork of `peterp/peterp.github.io`. The existing page is a single HTML document with a short bio, links to social profiles, and a list of side projects. The intended migration work is to turn this into a RedwoodSDK app shell for peterp.org, but that application structure is not present yet in the current tree.

# System Flow
1. The browser loads `index.html` at the repository root.
2. The document renders static content directly from HTML, with a small inline style block in the head.
3. There is no client-side bootstrapping, routing layer, build pipeline, or server entry point in the current repo state.
4. GitHub metadata is limited to a pull request template under `.github`, which only warns that PRs here should target this fork rather than upstream.

# Directory Map
- `.github/` contains repository workflow metadata; currently only a pull request template.
- `.kindling/` is present locally during this run and appears to be task state, not product code.
- `README.md` explains that this repo is a kindling dogfood fork of the upstream site.
- `index.html` is the live page content and styling for the current site.
- `CNAME` holds the custom domain mapping for GitHub Pages.

# Key Abstractions
The current codebase has very few abstractions because it is still a static site. The only meaningful page-level unit is the root HTML document in `index.html`, which defines the site title, page copy, outbound links, and a minimal CSS rule for layout.

The repository conceptually has a fork boundary. The README and PR template both emphasize that this repo is a dogfood fork and that work here targets the fork itself, not the upstream `peterp/peterp.github.io` repository.

The `CNAME` file is part of the deployment identity of the site. It indicates that the repository is wired for a custom-domain GitHub Pages style deployment, even though the rest of the app shell has not been scaffolded yet.

# Conventions Observed
- The site is currently static and self-contained in one HTML file.
- Styling is inline in `index.html` rather than split into separate assets.
- The repo is intentionally lightweight; there is no package manifest, build configuration, or source tree yet.
- Repository guidance is documented in plain markdown files at the root and under `.github`.
- The existing content is written as personal homepage copy rather than application UI.

# Known Unknowns
- The RedwoodSDK app shell has not been created yet, so entry points, routing, and rendering conventions are unknown.
- No `package.json`, `pnpm-workspace.yaml`, or other package manager wiring is present in the current tree.
- Build, test, and deploy scripts are not defined in the checked-in files.
- The intended source directory layout for the migration is not yet visible.
- It is unclear whether the future site will remain GitHub Pages hosted, move to another deployment target, or use a dedicated build step for Pages output.