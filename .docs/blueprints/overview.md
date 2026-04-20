# 2000ft View
This repository is a very small personal-site fork for Peter Pistorius, currently serving as a single static HTML page for the `peterp.org` site. The active migration epic is to turn that one-file site into a RedwoodSDK application that runs on Cloudflare Workers, using pnpm and adding the expected worker and CI scaffolding along the way.

# System Flow
1. The site currently starts at [`index.html`](./index.html), which is the only application file in the repo.
2. The browser loads the document directly as a static page, with content and styling defined inline.
3. Navigation is just external links to Peter's Twitter, GitHub, and side projects; there is no app state, routing, or server-side logic yet.
4. The repo also contains GitHub metadata for dogfooding and issue/PR workflow, plus a `CNAME` for the custom domain.
5. The migration target, per issue #8, is a RedwoodSDK app with routes/components, styling moved into the framework, local dev verification, `wrangler.toml`, and a GitHub Actions deploy workflow.

# Directory Map
- `./` Root of the site repository; contains the HTML entry point, custom domain file, README, and GitHub workflow metadata.
- `./.github/` GitHub-specific configuration, currently only a pull request template.
- `./.kindling/` Kindling task state for the current dogfood run; not part of the site itself.
- `./.docs/` Documentation area for repo-local planning artifacts; currently being introduced with the blueprint.

# Key Abstractions
`index.html` is the entire live product today. It combines document structure, copy, and presentation in one file, so it is the main source for the current site content and the first thing to port into any app framework.

The `CNAME` file represents the custom domain setup for the site. It indicates the repository is tied to a hosted personal domain rather than just being an anonymous static demo.

The Kindling task board under `.kindling/board/doing/` records the active migration task and its brief. It shows that this repo is being used as a live dogfood target, and that the current work is organized around the epic rather than a standalone feature request.

The GitHub issue `redwoodjs/kindling-dogfood-peterp-site#8` is the authoritative task reference for the migration. It defines the target stack as RedwoodSDK on Cloudflare Workers, calls out pnpm as the package manager, and splits the work into scaffold, content port, styling, local verification, worker config, CI deployment, and agent-ci setup.

The planned RedwoodSDK app is not present yet, but it is the central future abstraction for this repo. Based on the epic, it will be the place where routing, React components, framework styling, and Cloudflare Worker deployment configuration live.

# Conventions Observed
- The repository is extremely flat today; there is no existing `src/`, `app/`, or package manager structure.
- Application content is currently authored directly in a single HTML file with inline CSS.
- External links are used instead of internal routing.
- The repo is set up as a dogfood fork, so task tracking lives alongside the site content.
- The epic explicitly says to use `pnpm` for package management and scripts.

# Known Unknowns
- The RedwoodSDK scaffold does not exist yet, so the eventual source tree, route layout, and component boundaries are not visible in the current repo.
- There is no `package.json`, so the build/dev/test commands are not yet defined here.
- The local verification and deployment flow are not implemented yet; `wrangler.toml` and GitHub Actions are still pending.
- The current hosting pipeline is unclear from the repo alone beyond the presence of `CNAME`.
- No tests, linting setup, or formatter configuration are present in the current tree.