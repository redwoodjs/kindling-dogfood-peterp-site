### 2000ft View
This repository currently contains a very small personal site for Peter Pistorius. It presents a short bio, social links, and a list of side projects on a single static page. The only human-authored source in the repo is the HTML for that page, so future work will likely involve recreating this experience inside a new RedwoodSDK app while keeping the public-facing content and layout recognizable.

### System Flow
1. The browser loads `index.html` directly from the repo root.
2. The document metadata sets the page title and viewport, then an inline `<style>` block defines the page width, spacing, and text rhythm.
3. The body renders a simple content stack: headline, bio paragraphs, social links, and an ordered list of side projects.
4. There is no visible client-side JavaScript, routing layer, server entry point, or build step in the current repo.

### Directory Map
- `/` Root static site files, currently `index.html`, `README.md`, and `CNAME`.
- `/.github` GitHub metadata only; currently contains a pull request template.
- `/.kindling` Local harness state created by the current task environment.
- `/.docs` Not present yet in source control before this bootstrap run; the blueprint will live under `/.docs/blueprints/`.

### Key Abstractions
`index.html` is the entire application surface today. It owns the page title, structure, and presentational CSS, so it is the primary reference for content and layout parity work.

The page body is a single-column personal profile layout. It starts with an introduction, then a short description paragraph, then social links, then a side-project list. That ordering defines the public experience and is the main thing to preserve in a port.

The inline stylesheet is the only styling mechanism present. It constrains the content width, sets line height, and adds padding. There are no design tokens, component styles, or shared CSS assets in the current repo.

The README describes the repository as a kindling dogfood fork of `peterp/peterp.github.io`. It provides provenance, but not application structure or operational details.

### Conventions Observed
The site is authored as a single static HTML document at the repository root.

Styling is inline in the document head rather than split into separate assets.

External links are used directly in markup for social profiles and side projects.

The repository does not currently show a package manifest, app framework configuration, tests, or build scripts.

### Known Unknowns
The RedwoodSDK app structure has not been added yet, so the future entry point, routing, and rendering model are not visible in this repo.

The build and deployment flow is unclear because there is no package manifest or framework config in the current tree.

The intended source of truth for the port beyond `index.html` is unclear; the repository does not contain additional content files or design assets.

Testing strategy is unclear because no test runner or test files are present.