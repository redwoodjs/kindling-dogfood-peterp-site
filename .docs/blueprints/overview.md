# 2000ft View
This repository is a very small personal site forked for kindling dogfood. It serves a static homepage for Peter Pistorius, with simple personal copy, a short list of side projects, and GitHub Pages style deployment. The current codebase is intentionally minimal: there is one HTML page, a custom domain file, and repo metadata for kindling and pull request handling.

# System Flow
1. The main entry point is `index.html`, which contains the entire page markup and inline styles.
2. A browser loads the page directly as static content. There is no application runtime, bundler, or client-side routing visible in the repository.
3. GitHub Pages serves the site content, with `CNAME` indicating the custom domain configuration.
4. Kindling tracks work state in `.kindling/board/doing/`, where the active task brief and progress log live for agent runs.

# Directory Map
- `.`: Root static site files and repo metadata.
- `.github/`: GitHub configuration, including the pull request template.
- `.kindling/`: Kindling task state and board metadata for the current work item.
- `.docs/`: Blueprint and other repo documentation artifacts. Currently absent before this bootstrap run, except for the new blueprint file being added.

# Key Abstractions
`index.html` is the whole site. It defines the document structure, inline CSS, and the visible content of the homepage. There are no separate components or templates in the repository.

`CNAME` captures the custom domain name for the GitHub Pages deployment. It is part of the hosting configuration rather than the page content.

`.kindling/board/doing/...md` is the active task record. It stores the task brief, status, timestamps, and a progress log that kindling updates during execution.

The README frames the repository as a kindling dogfood fork of `peterp/peterp.github.io`. That context explains why the repository is small and why changes are expected to target this fork rather than the upstream site.

# Conventions Observed
- The site is implemented as a single static HTML file with inline CSS.
- Styling is minimal and scoped directly in the page rather than split into assets or a stylesheet.
- External links are hardcoded in the page content.
- The repository uses GitHub pull request guidance through `.github/PULL_REQUEST_TEMPLATE.md`.
- Kindling task state is stored under `.kindling/board/doing/` with dated markdown files.

# Known Unknowns
- The deployment workflow is not present yet; no GitHub Actions workflow files exist in `.github/workflows/`.
- There is no package manager metadata, so there is no build or test script to describe.
- The hosting path beyond GitHub Pages is unclear; the repo contains `CNAME` but no deployment automation.
- The relationship between this fork and the broader RedwoodSDK migration epic is not represented in the checked-in files.