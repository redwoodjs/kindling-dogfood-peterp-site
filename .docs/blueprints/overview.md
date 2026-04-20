# 2000ft View
This repository is a very small personal-site fork used to dogfood the Kindling agent harness. In its current state, it serves a single static homepage from a root `index.html` for the `peterp.org` domain, with no application framework, build step, or package manifest checked in. The repo is used both as a live website codebase and as a controlled test target for automation work done through Kindling.

# System Flow
The top-level request path is simple: a static host serves `index.html` from the repository root, and the browser renders the page directly. All content, structure, and styling for the site live in that single file.

At runtime, the page loads the document head metadata, applies a short inline stylesheet defined in the `<style>` block, and renders a short personal introduction plus an ordered list of side projects. There is no client-side JavaScript, no data fetching, and no server-side processing in the current codebase.

Operationally, `README.md` explains that this repository is a Kindling dogfood fork of `peterp/peterp.github.io`, while `CNAME` pins the custom domain. The GitHub issue tracked in the Kindling board and upstream repository indicates that the intended next major change is a migration to RedwoodSDK, but that framework code is not present yet.

# Directory Map
`.github/` - Repository metadata; currently contains a pull request template reminding contributors to target this fork rather than the upstream site.

`.kindling/` - Kindling task state for local harness runs; currently includes a board item for the RedwoodSDK migration epic.

`.git/` - Git metadata for the repository.

# Key Abstractions
`index.html` is the application. It combines document metadata, inline CSS, and all rendered content in one file. Any current site change happens here, so future migration tasks will likely treat it as the canonical source to port into routes and components.

`README.md` is the primary repository-level context. It explains that this is not the canonical personal-site repo but a fork used for Kindling dogfooding. That distinction matters when interpreting issues, pull requests, and architectural decisions in this repo.

`CNAME` is the deployment-facing domain binding. Its presence indicates the existing site is or was intended to be served under `peterp.org`, independent of any future framework migration.

The Kindling board entry at `.kindling/board/doing/2026-04-20-1200-complete-rwsdk-migration-epic-fcf0.md` is the main in-repo task artifact. It ties the local working copy to the active migration task and shows that the harness expects to reason about this repo as an evolving target rather than a finished application.

The GitHub migration epic is an important conceptual abstraction even though its implementation is absent. Issue `#8` in `redwoodjs/kindling-dogfood-peterp-site` defines the desired future system shape: a RedwoodSDK application using `pnpm`, Cloudflare Workers configuration, and CI deployment. That issue should be read as roadmap context, not evidence of existing modules.

# Conventions Observed
The current site uses a root-level, no-build layout: the main page is served directly from `index.html` rather than from a `src/` directory or generated output.

Styling is inline and minimal. The only CSS observed is embedded in the document head next to the HTML it affects.

Repository context is documented in lightweight top-level files instead of a larger docs tree. `README.md`, `CNAME`, and `.github/PULL_REQUEST_TEMPLATE.md` carry most of the non-code guidance.

Kindling task state is stored under `.kindling/board/` as dated markdown files with frontmatter and a short progress log.

# Known Unknowns
- Current hosting mechanism is implied by `CNAME`, but no deploy workflow or hosting configuration exists in the repo.
- Testing strategy is unclear; no test files or test runner configuration were found.
- Local development workflow is unclear because there is no package manifest, script entrypoint, or framework tooling checked in.
- It is unclear whether additional site pages or assets exist upstream; this fork currently contains only the single-page version.
- No RedwoodSDK scaffold, Cloudflare Worker config, or CI setup is present yet, so exact migration boundaries are defined only by the GitHub epic.