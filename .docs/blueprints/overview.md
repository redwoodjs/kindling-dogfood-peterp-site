# 2000ft View

This repository is a very small static website for `peterp.org`, currently implemented as a single hand-written HTML page plus a `CNAME` file for custom-domain hosting. The README identifies it as a kindling dogfood fork of `peterp/peterp.github.io`, so contributors here are working in a testbed for the kindling agent harness rather than the upstream site itself. At this snapshot, the repo is not yet a RedwoodSDK application; it is a minimal baseline that later migration tasks will expand.

# System Flow

The current runtime path is simple and file-based. The host serves `index.html`, which contains the entire page structure, content, and inline CSS. There is no build step, package manager, application server, or generated asset pipeline in the repository.

The domain mapping is represented by `CNAME`. That suggests the site is intended to be published as a static host with a custom domain, but the repository does not include deployment configuration beyond that file.

Operational task tracking for agent work lives under `.kindling/board/doing/`. The active card in that directory records the current migration task metadata, but it is not part of the website runtime path.

# Directory Map

- `.git/` — Git metadata for the repository.
- `.github/` — GitHub repository metadata; currently includes a pull request template.
- `.kindling/` — kindling harness state for local task tracking, including board entries.

# Key Abstractions

`index.html` is the primary application artifact. It combines document structure, user-facing copy, external links, and the only styling in one file. Any current site behavior or content change flows through this file.

`CNAME` is the repository’s domain binding artifact. Its presence indicates the static site is intended to answer for `peterp.org`, and it is the only hosting-related file checked into the repo at this point.

The kindling task card under `.kindling/board/doing/2026-04-20-1206-scaffold-redwoodsdk-baseline-e628.md` is the current work-tracking abstraction for this fork. It stores the task brief, status fields, and progress log for the in-flight scaffold effort.

`README.md` is the human-authored project description. It explains that this repository is a dogfood fork used to exercise kindling against a live example and that the real site lives upstream.

# Conventions Observed

- The live site is currently maintained as a single static HTML document at the repository root.
- Styling is inline inside the HTML document rather than split into separate asset files.
- Repository-level metadata is sparse and human-authored; there is no generated project scaffolding yet.
- Kindling work items are stored as Markdown files under `.kindling/board/...`.

# Known Unknowns

- Build and deployment flow are not fully represented in the repo; aside from `CNAME`, there is no checked-in publish or hosting configuration.
- Testing strategy is unclear because there are no tests, test runner config, or package manifests yet.
- Branching and release conventions are unclear from the checked-in files.
- RedwoodSDK, pnpm, and Cloudflare Workers setup referenced by the current task brief are not present in this snapshot, so the future application structure is not yet visible from the codebase itself.