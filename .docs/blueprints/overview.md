# 2000ft View
This repository is a very small personal site forked from peterp.github.io. It presents a single HTML landing page with a short bio and links to external profiles and side projects. The current shape is closer to a static site than an application: the root `index.html` is the primary artifact, and the added Cloudflare Workers layer exists to serve that page in the target runtime and support local development.

# System Flow
1. Requests enter the Cloudflare Worker defined in `src/worker.js`.
2. The worker checks the method and only allows GET and HEAD.
3. Root requests are rewritten to `index.html` so the homepage resolves cleanly.
4. All other requests are handed to the Cloudflare assets binding, which serves files from the repo root.
5. `wrangler.toml` ties the worker to the assets directory and provides the local dev port used by `wrangler dev`.

# Directory Map
`/.github` - GitHub metadata such as the pull request template.
`/.kindling` - Kindling task state and run metadata.
`/.docs` - Project documentation, including the blueprint added by this bootstrap run.
`/src` - Worker entry point code for Cloudflare runtime behavior.
`/` - Root site files, currently the public `index.html`, `README.md`, and `CNAME`.

# Key Abstractions
`src/worker.js` is the runtime entry point. It acts as the request handler for Cloudflare Workers and delegates static file delivery to the assets binding. Its only policy is to normalize root requests to `index.html` and reject non-idempotent methods.

`wrangler.toml` is the runtime and development configuration. It sets the worker name, compatibility date, main module, asset directory, and local dev port. It is the bridge between the repository layout and the Cloudflare runtime.

`index.html` is the user-facing document. It contains the full page content, styling, and external links, so the runtime layer exists only to serve this file consistently.

`CNAME` is a deployment-era site identity file preserved from the GitHub Pages origin. It is part of the repo root content, not the runtime logic.

# Conventions Observed
The project currently keeps site content at the repository root rather than under a nested app directory.
The page is written as a single self-contained HTML file with inline styles.
Runtime configuration is added at the repo root, while executable code lives under `src`.
The site has no build step in the source content itself; the runtime layer serves existing files directly.

# Known Unknowns
The broader deployment path is unclear beyond the new Cloudflare Workers config; there is no existing CI or release automation in the repo.
Testing strategy is not defined. There are no existing test files or test runner configuration.
Local development dependencies are now declared, but the repo did not previously have a package manager lockfile, so install behavior depends on the chosen package manager.
It is unclear whether the site should support client-side routing beyond serving `index.html` at the root.
When the repository root is used as the assets directory, local dependency folders must be excluded from asset scanning or Wrangler will try to treat installed tooling as deployable static content.
