### 2000ft View
This repository is a minimal personal homepage for Peter Pistorius, currently implemented as a single static HTML page. It presents a short bio, a couple of outbound profile links, and a small list of side projects. The repo is also a kindling dogfood fork, so the codebase is intentionally small and serves as a live test target for agent-driven changes rather than a full product application.

### System Flow
1. The browser opens `index.html` at the repository root.
2. The document head sets basic metadata and inlined page styling.
3. The body renders a simple content stack: headline, biography paragraphs, social links, and a side-project list.
4. All behavior is static; there is no client-side runtime, server entry point, routing layer, or data fetching path in the current repo.

### Directory Map
- `.github/` - GitHub workflow and repository-facing templates; currently includes the pull request template.
- `.kindling/` - Local kindling harness state and working files; not part of the page runtime.
- `.docs/` - Blueprint and other repo documentation; absent at bootstrap time and created by this run.
- Root `index.html` - The entire site entry point and only rendered application file.
- Root `README.md` - Human-authored repository description and provenance note.
- Root `CNAME` - Custom domain configuration for GitHub Pages style hosting.

### Key Abstractions
The page document is the central unit of the site. `index.html` owns all visible content and the small amount of styling that currently defines the layout, width, spacing, and typography.

The hero introduction is the primary content block. It contains the page title and first-person bio, and it establishes the tone and narrow visual rhythm of the page.

The outbound link section is the social navigation area. It links to Peter Pistorius’s Twitter and GitHub profiles and is part of the fixed content hierarchy rather than a reusable component system.

The side-project list is the secondary content block. It is an ordered list of external project links with short descriptions, and it provides the only structured repeating content on the page.

The inline style block is the only presentational abstraction. It currently constrains the page width and sets line height and padding directly in the document head.

### Conventions Observed
The repository is static and file-based rather than framework-based.

Presentation is currently inlined in `index.html` instead of split into separate CSS or component files.

Content is arranged in a single top-to-bottom flow with simple semantic HTML elements.

External destinations are represented with ordinary anchor tags and open navigation is not intercepted by script.

The repository root is the effective application root; there is no `src/`, `app/`, or build output directory in the current tree.

### Known Unknowns
The RedwoodSDK app structure is not present yet, so the eventual framework-specific entry points, routing shape, and component boundaries are not visible in this repository snapshot.

The build and deployment pipeline is unclear. There is no package manifest, bundler config, or deployment script in the current tree.

The intended source of truth for future design changes is unclear beyond the current single HTML page and the upstream `peterp.github.io` reference mentioned in `README.md`.

Whether the page should remain purely static in RedwoodSDK or gain server-side rendering, routes, or dynamic data is not established in the current files.