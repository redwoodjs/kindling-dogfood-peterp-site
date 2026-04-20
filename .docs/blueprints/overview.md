# 2000ft View
This repository currently hosts a very small personal-site fork for Peter Pistorius. The only user-facing artifact is a single static HTML page that introduces Peter, links to his Twitter and GitHub, and lists a handful of side projects. The repo is also a kindling dogfood target, so its current shape is intentionally minimal and the next major change is to port that presentation into a RedwoodSDK application without changing deployment wiring or worker configuration.

# System Flow
1. The browser opens `index.html` at the repository root.
2. The document sets page metadata, title, and a small inline stylesheet.
3. The body renders the entire experience in one pass: a greeting, bio text, social links, and a side-project list.
4. There is no client-side routing, build step, server entry point, or runtime data fetching in the current version.
5. The site is effectively static content served as-is.

# Directory Map
- `.github/` - GitHub workflow and pull request template metadata.
- `.kindling/` - Harness state for the current task, including the active work item markdown.
- `.docs/` - Documentation workspace; the `blueprints/` subtree is newly introduced here.
- `.git/` - Git repository internals.
- Root files:
  - `README.md` - Short human-authored description of the fork and its purpose.
  - `index.html` - The entire current site experience.
  - `CNAME` - Custom domain configuration for the hosted site.

# Key Abstractions
- `index.html` is the only application surface today. It contains all visible content and the only styling rules, so it currently plays the role of both layout and presentation layer.
- The hero greeting and bio paragraph define the primary content identity of the site. They establish the tone and are the first things a migration will need to preserve.
- The social links section represents the persistent outbound navigation pattern on the page. It is simple, static, and hard-coded.
- The side projects list is the only structured content block. It is an ordered list of external project links with brief descriptions.
- The kindling task file under `.kindling/board/doing/` is the active orchestration artifact for this run, but it is not part of the user-facing site.

# Conventions Observed
- The site is fully static in the current state.
- All content lives in one HTML file, with inline CSS rather than separated assets.
- External links are written directly into the document; there is no content model or data layer.
- There is no package manifest, source tree, or test suite in the repository snapshot.
- The repository appears to target GitHub Pages-style hosting, indicated by the presence of `CNAME` and the upstream fork structure.

# Known Unknowns
- The RedwoodSDK app scaffold is not present yet, so the eventual route and component structure is unknown.
- Build tooling, package manager choice, and source-language conventions are not declared in the current repository.
- The deployment path for the future RedwoodSDK version is not visible here beyond the instruction not to change worker or deployment wiring.
- Testing strategy is unclear because no tests or test runner configuration exist in the current tree.
- The canonical content source for the peterp.org migration is not included here; this repo only contains the current static snapshot.