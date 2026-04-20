### 2000ft View
This repository is a very small personal site for Peter Pistorius, currently serving a single static HTML page from the project root. It exists as a kindling dogfood fork of `peterp/peterp.github.io`, so the primary user is the maintainer using the repo as a live test target for automation rather than a large application team.

### System Flow
1. The site entry point is `index.html` at the repository root.
2. The page is pure static markup with inline CSS and no client-side build step.
3. Deployment is configured for Cloudflare Workers static assets via `wrangler.toml`, which points Workers at the repository root as the asset directory.
4. GitHub Actions runs the deployment workflow from `.github/workflows/deploy.yml` on pushes to `master` and on manual dispatch.
5. The workflow uses `cloudflare/wrangler-action@v3` with Cloudflare API credentials supplied from repository secrets.

### Directory Map
- `.github/` GitHub metadata and automation, including the deployment workflow and pull request template.
- `.kindling/` Local kindling task state and run metadata.
- `.docs/` Repository documentation and blueprint artifacts.
- Root files `index.html`, `wrangler.toml`, `README.md`, and `CNAME` define the site content and deployment target.

### Key Abstractions
`index.html` is the entire visible application. It contains the page content, layout, and styling in one file, so there is no separate component tree or asset pipeline to follow.

`wrangler.toml` is the deployment contract for Cloudflare Workers static assets. It gives Wrangler the worker name, compatibility date, and the asset directory to publish.

`.github/workflows/deploy.yml` is the automation entry point. It is responsible for checking out the repo and invoking Wrangler with Cloudflare credentials from GitHub secrets.

The repository root itself functions as the publishable asset directory. Because the site is static and tiny, the deployment model is file-based rather than build-based.

The `.github/PULL_REQUEST_TEMPLATE.md` file reflects the repo’s dogfood use case by reminding contributors that PRs should target this fork’s `master` branch.

### Conventions Observed
- The project is flat at the top level; there is no `src/` tree or package manifest.
- The site is implemented as a single static HTML document with inline CSS.
- GitHub automation is minimal and lives under `.github/`.
- The default branch naming in existing repo metadata is `master`, not `main`.
- The repo already contains a `CNAME`, which suggests the site may also be associated with a custom domain.

### Known Unknowns
- No local package manager, build script, or test runner is present.
- No Cloudflare account, route, or custom domain configuration is defined in-repo beyond the existing `CNAME`.
- It is unclear whether deployment should remain root-based long term or eventually switch to a build output directory if the site grows.