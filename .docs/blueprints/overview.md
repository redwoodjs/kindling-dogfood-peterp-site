# 2000ft View
This repository currently hosts a very small personal website as a single static HTML page. The README identifies it as a kindling dogfood fork of `peterp/peterp.github.io`, used to exercise the kindling agent harness while evolving the site. Today the codebase serves a one-page brochure-style site for Peter Pistorius; the linked migration epic tracks rewriting that page as a RedwoodSDK application that will run on Cloudflare Workers, but that framework scaffold is not present in the repository yet.

# System Flow
The current runtime path is extremely short. The browser requests the site root, which is served directly from [index.html](/home/vscode/repo/index.html). That file contains the full document structure, the inline CSS, and all rendered content.

Within `index.html`, the page defines a simple `<head>` with metadata and a small inline style block that constrains body width and spacing. The `<body>` then renders the site content directly: an introduction, links to external profiles, and a list of side projects. There is no build step, no asset pipeline, no client-side routing, and no JavaScript application logic in the current implementation.

Outside the page itself, [README.md](/home/vscode/repo/README.md) provides the human-authored description of the repo's purpose, and `CNAME` indicates the repository is intended to be served on a custom domain. `.kindling/board/...` contains task-tracking metadata for kindling runs rather than application runtime code.

# Directory Map
`.git/` Git metadata for the fork and active task branch.

`.github/` Repository-level GitHub metadata; currently only a pull request template.

`.kindling/` Kindling harness task board state for work running against this repo.

`.docs/` Documentation artifacts; currently used for the persisted project blueprint.

Project root Static site files and repo metadata, including `index.html`, `README.md`, and `CNAME`.

# Key Abstractions
`index.html` is the application. It is both the entry point and the complete implementation of the current site. Any visual structure, content changes, or styling changes happen in this single file because there are no component or template boundaries elsewhere in the repo.

The inline CSS block inside `index.html` is the only styling layer. It sets a narrow readable layout and basic spacing, which means there is currently no external stylesheet organization, no design token system, and no asset bundling to understand before making visual changes.

The page content is organized as static semantic HTML sections: heading, descriptive paragraphs, and an ordered list of projects. That content model matters because the migration epic will likely preserve this information architecture even if the eventual framework changes the file layout.

The repository metadata files act as operational context rather than app logic. `README.md` explains that this fork is for kindling dogfooding, `CNAME` declares the production hostname mapping, and `.kindling/board` records the task harness state for automation runs.

The migration epic itself is a key conceptual abstraction for future work in this repo. GitHub issue `#8` defines the target state as a RedwoodSDK app using `pnpm`, Cloudflare Worker configuration, and CI support, but those concerns are still planning context rather than implemented modules in the checked-out code.

# Conventions Observed
The site is currently implemented with direct, hand-authored files at the repository root rather than through a generated app structure.

Styling is kept inline in the page instead of in separate CSS assets.

Repository process context lives alongside the codebase in lightweight text files such as `README.md`, `CNAME`, and `.kindling/board/...`.

GitHub workflow/configuration footprint is minimal; no CI workflow files are present under `.github/workflows/`.

# Known Unknowns
- Build and deploy flow for the current site is not explicit; there is no package manifest, no build script, and no workflow configuration in the repo.
- Local development workflow is unclear beyond opening or serving `index.html`; no dev server configuration is present.
- Testing strategy is unclear; no test files or test runner configuration were found.
- Hosting details for the current production site are only partially visible. `CNAME` suggests a custom domain, but the repository does not contain deployment automation.
- The intended RedwoodSDK application structure is defined only in the migration epic, not in checked-in source files yet.