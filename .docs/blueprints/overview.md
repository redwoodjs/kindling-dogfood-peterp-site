# 2000ft View
This repository is a very small personal site forked for kindling dogfood. It serves a single HTML page for Peter Pistorius, with a custom domain configured through `CNAME`. The visible content is mostly static biography and links, so the codebase is closer to a GitHub Pages landing page than a conventional application. The main users are contributors working on the kindling harness and anyone maintaining the published personal site.

# System Flow
1. A browser requests the site and receives `index.html` as the root document.
2. The HTML in `index.html` renders the page content directly, with inline CSS providing the minimal layout.
3. GitHub Pages style deployment is implied by the presence of `CNAME`, which points the published site at `peterp.org`.
4. Repo-level process metadata for kindling lives under `.kindling/`, where the current task state and brief are tracked.
5. Pull request hygiene is lightweight and currently limited to `.github/PULL_REQUEST_TEMPLATE.md`.

# Directory Map
- `/.github`: PR template only; no workflow files are present in the checked-in tree.
- `/.kindling`: kindling task state and brief metadata.
- `/.docs`: documentation artifacts created by kindling, including this blueprint.
- `/` root files: the static site entry point (`index.html`), custom domain mapping (`CNAME`), and repository README.

# Key Abstractions
`index.html` is the whole site. It contains the document structure, page content, and the inline stylesheet that controls layout. There is no client-side framework or build step visible in the repo.

`CNAME` binds the published GitHub Pages site to `peterp.org`. It is the clearest indicator of the deployment target and should be treated as part of the site’s delivery path.

`README.md` frames the repository as a kindling dogfood fork of `peterp/peterp.github.io`. It explains that PRs and other changes here are expected to support harness testing rather than the upstream personal site.

`.kindling` stores task orchestration state for the current run. The checked-in task brief and progress log are part of the harness metadata, not the site itself.

`.github/PULL_REQUEST_TEMPLATE.md` is the only GitHub automation artifact currently present. It documents the fork-specific PR target expectation and serves as the repository’s contribution note.

# Conventions Observed
- The site is completely static and lives in a single `index.html` file.
- Styling is inline in the HTML document instead of being split into separate CSS files.
- The repository is treated as a dogfood target for kindling, and the README and PR template both reinforce that framing.
- The project root is intentionally sparse; there is no package manifest, source tree, or build pipeline checked in.
- The fork-specific PR target note is repeated in both the README and the PR template.

# Known Unknowns
- No GitHub Actions workflow files are present, so the local validation path for Actions is not visible in the repository tree.
- The deployment mechanism is implied by GitHub Pages conventions, but no workflow or publish script confirms how updates are built and deployed.
- There is no package manifest or build configuration, so there is no declared local test or lint entry point.
- The exact relationship between this fork and the upstream `peterp/peterp.github.io` site beyond the README note is not documented here.