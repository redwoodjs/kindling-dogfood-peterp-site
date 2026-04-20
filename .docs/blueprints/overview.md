### 2000ft View
This repository is a small personal-site fork used as a Kindling dogfood project. The current public-facing product is a simple homepage for Peter Pistorius with a short bio, a couple of social links, and a list of side projects. The near-term work is to preserve that content while moving it into the RedwoodSDK app structure so the same site can be served through a routed component-based app instead of a single static HTML file.

### System Flow
1. The current entry point is `index.html` at the repository root.
2. That file defines the full page in one document: metadata, inline styles, and all visible homepage content.
3. The rendered output is a single centered-ish personal landing page with a heading, bio paragraphs, social links, and a numbered side-project list.
4. There is no application source tree yet in this snapshot, so the RedwoodSDK route/component layout has not been introduced on disk.

### Directory Map
- `.github/`: GitHub workflow metadata and the pull request template.
- `.kindling/`: task state and progress metadata written by Kindling during runs.
- `.docs/`: documentation artifacts created for this repository, including the blueprint.
- root: current site entry files such as `index.html`, `README.md`, and `CNAME`.

### Key Abstractions
The homepage is the main product surface. It is a static personal landing page that introduces Peter Pistorius and points to his social profiles and projects. Future RedwoodSDK work will need to preserve the visible copy and ordering of that surface.

`index.html` is the full implementation in the current state. It contains the HTML structure, inline CSS, and all user-facing content in one file. There is no evidence yet of a shared layout component, route module, or rendering pipeline beyond this file.

The README is a short provenance note. It explains that this repo is a Kindling dogfood fork of the upstream `peterp.github.io` site and is meant as a live test example rather than the canonical production site.

Kindling task metadata lives under `.kindling/`. The checked-in task note records the active task brief and progress log, which is useful for reconstructing what this run was trying to accomplish.

### Conventions Observed
The project is currently static and minimal. There is no package manifest, build script, or compiled source tree in the repository snapshot.

Content is presented in a single document with inline styling. The page uses straightforward semantic HTML: one main heading, paragraphs, a section heading, and an ordered list.

Links are explicit and external, with simple anchor tags and visible labels. The content order is stable and intentionally small, which makes it easy to preserve when porting into a component layout.

### Known Unknowns
The RedwoodSDK app structure does not exist yet in this checkout, so the eventual route files, layout components, and entry modules are unknown.

The build and deploy flow is unclear. There is no `package.json`, no framework config, and no obvious runtime entry beyond `index.html`.

Testing strategy is unknown. There are no test files or test runner configs visible in the current repository snapshot.

How `CNAME` is used in the eventual app deployment is unclear from the files present here.