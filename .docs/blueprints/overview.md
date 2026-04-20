# 2000ft View
This repository is a minimal personal website currently implemented as a single static HTML page and used as a dogfood target for the Kindling agentic development harness. The live product in this repo today is the simple `index.html` site for peterp.org; the surrounding repo metadata exists mainly to support Kindling-driven issue, pull request, and task workflows while the site is being migrated to a larger application stack.

# System Flow
The current user-facing entry point is `index.html` at the repository root. A browser requests that file directly, then renders inline HTML and CSS without any build step, client-side framework, or server runtime. The page contains the document metadata, a small inline stylesheet, introductory copy, and a list of external links.

There is no application source tree, package manifest, or runtime server code in the repository yet. Deployment for the current site is implied by the presence of `CNAME`, which is the standard custom-domain marker used by GitHub Pages, but no workflow or deploy script is present in this repo snapshot.

Operational context for agent work lives under `.kindling`, especially the board subdirectories. Those files track task state for the Kindling harness rather than contributing to the website runtime.

# Directory Map
`/.github` - Repository metadata; currently only a pull request template reminding contributors to target this fork rather than upstream.  
`/.kindling` - Kindling harness state for local task tracking and board files.  
`/.docs` - Documentation artifacts for future agent context; currently used to store this blueprint.  
`/` - Site root containing the static page (`index.html`), custom domain file (`CNAME`), and README.

# Key Abstractions
`index.html` is the entire website application at present. It defines document structure, content, and styling inline, so any user-visible behavior or layout change currently routes through this one file.

`README.md` is the repository-level framing document. It explains that this is not the canonical personal-site repository but a Kindling dogfood fork of the upstream site, which is important context when reasoning about issues, pull requests, and divergence from upstream.

`.kindling/board/*` is the project-management model used by the harness. Each markdown file represents a task card with frontmatter for status and metadata plus a progress log. This is not product code, but it is part of how work is organized in this repo.

`CNAME` is the only visible deployment-oriented artifact in the repo root. Its presence suggests the current static site is or was intended for GitHub Pages custom-domain routing.

# Conventions Observed
The website is currently implemented as a single-file static document with inline CSS rather than split templates, assets, or component files.

Repository metadata is lightweight and markdown-based. Both the pull request template and Kindling task state are stored as plain text files checked into the repo.

There is no detectable package manager, build tool, test runner, or CI pipeline in the current repository state.

# Known Unknowns
- The current deployment flow is unclear. `CNAME` suggests GitHub Pages, but no GitHub Actions workflow or other deployment config is present.
- Testing strategy is unclear because no tests or test tooling exist in the current tree.
- There is no local development command surface yet; no package manifest or framework scaffold is present.
- The intended post-migration architecture is described in GitHub issue #8, but none of that RedwoodSDK structure exists in the repository snapshot examined here.