# 2000ft View
This repository is a kindling dogfood fork of `peterp/peterp.github.io`. It currently serves a simple personal homepage for Peter Pistorius, with a handful of external links and a short bio. The repo appears to be used primarily as a live test target for kindling workflows rather than as a large application codebase.

# System Flow
1. The site starts at `index.html` in the repository root.
2. The document defines the full page structure inline, including metadata, content, and styles.
3. There is no client-side application bundle, server entry point, or build pipeline visible in the current tree.
4. Deployment context is implied by the `CNAME` file and the fork metadata, but no runtime config is currently present in the repo.

# Directory Map
- `.github/` - repository metadata for GitHub, currently only a pull request template.
- `.kindling/` - local kindling task state created by the harness.

# Key Abstractions
- `index.html` - the entire rendered site lives in this file. It contains the page title, inline CSS, and the visible homepage content.
- `CNAME` - indicates the custom domain associated with the site, `peterp.org`.
- `README.md` - describes the repository as a kindling dogfood fork and points contributors back to the upstream project for the real site.
- kindling task branch - the active branch name indicates the current task is focused on adding Cloudflare Workers runtime configuration for RedwoodSDK deployment.

# Conventions Observed
- The site is static and intentionally minimal.
- Styling is inline in the HTML rather than split into separate assets.
- GitHub-facing workflow guidance lives in `.github/PULL_REQUEST_TEMPLATE.md`.
- The repository root is the deployment root; there is no subpackage layout visible.

# Known Unknowns
- No package manager manifest is present, so the build and test strategy is unclear.
- No Cloudflare Workers or Wrangler configuration exists yet, so the intended deployment entry point is not explicit.
- No RedwoodSDK source tree is visible in this checkout, so how the runtime config should connect to application code is not yet clear.
- No CI configuration was found in the current tree.