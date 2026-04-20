# kindling-dogfood-peterp-site — Architectural Overview

## 2000ft View

This repository is a fork of [peterp/peterp.github.io](https://github.com/peterp/peterp.github.io), maintained as a live dogfood target for the [kindling](https://github.com/redwoodjs/kindling) agentic harness built by RedwoodJS. The actual site is Peter Pistorius's personal page (bio, social links, side projects). Every pull request, issue, and commit here is produced by kindling agent tasks; the repo exists to exercise the agent harness against a real, small, low-stakes codebase. The upstream "real" site is at peterp/peterp.github.io.

## System Flow

At the time of this blueprint, the entire site is a single static file. There is no build pipeline, no server, and no framework.

1. A browser requests the site (currently served via GitHub Pages with a custom domain via `CNAME`).
2. GitHub Pages serves `index.html` directly.
3. The browser renders the page — inline styles, bio text, and anchor links to external URLs.

There is no JavaScript, no bundler, no asset pipeline, and no server-side logic. The active epic (Issue #8) aims to replace this with a RedwoodSDK application deployed to Cloudflare Workers, but that migration has not yet been committed.

## Directory Map

| Path | Contents |
|------|----------|
| `/` (root) | The entire project — `index.html` (the site), `CNAME` (GitHub Pages custom domain), `README.md` (dogfood context) |

There are no subdirectories. Once Issue #1 lands, a project scaffold (likely under `web/` or at the root) will introduce a standard RedwoodSDK directory structure.

## Key Abstractions

**index.html** — The sole deliverable of the current codebase. It is a self-contained HTML document with an inline `<style>` block (max-width, line-height, padding), a short bio paragraph, social links (Twitter, GitHub), and an ordered list of side projects with links. This is the content and structure that Issues #2 and #3 are tasked with porting into a framework.

**CNAME** — A single-line file containing the custom domain. This is what GitHub Pages uses to route `peterp.org` to this repo. It is separate from the eventual Cloudflare Workers hosting that the epic targets.

**RedwoodSDK (future target)** — The migration target framework. RedwoodSDK is a Vite-based React framework that compiles to Cloudflare Workers. It introduces a `src/` directory with route files, React Server Components, and a `wrangler.toml` for deployment config. This does not yet exist in the repo but is the destination for all active sub-issues.

**kindling harness (external)** — The agent framework at [redwoodjs/kindling](https://github.com/redwoodjs/kindling) that drives tasks on this repo. Agent tasks read issues, produce code changes, and open PRs here as part of the harness dogfooding loop. Agents use `pnpm` exclusively per the epic's tooling requirement.

## Conventions Observed

- **Package manager:** `pnpm` is mandated for all installs and scripts (no npm or yarn). A `pnpm-lock.yaml` must be committed; no `package-lock.json` or `yarn.lock`.
- **Branch/push trigger:** CI workflows are expected to trigger on push to `master` (not `main`).
- **Issue linking:** Sub-issues declare their parent epic with `Parent: #N` in the body and cross-reference an upstream issue at `peterp/peterp.github.io` with `Upstream: org/repo#N`.
- **Labels:** All dogfood issues carry the `kindling-dogfood` label.
- **Agent instructions:** Issue #7 specifies that workflow changes should be validated via agent-ci before declaring done, and that this instruction be recorded in `CLAUDE.md` or `AGENTS.md`.

## Known Unknowns

- **Post-migration directory structure:** The scaffold location (root vs. `web/` subfolder) is not yet determined — Issue #1 leaves it open ("e.g. into a `web/` subfolder or a fresh branch").
- **Cloudflare account/worker name:** The worker name and account ID needed for `wrangler.toml` are not specified in any issue.
- **`CLOUDFLARE_API_TOKEN` secret:** Referenced in Issue #6 but not yet configured — unclear whether it exists in repo secrets.
- **What happens to index.html and CNAME post-migration:** Issue #2 notes the old `index.html` can be removed "once cutover happens (tracked separately)"; the timing and mechanism are not defined here.
- **Testing strategy:** No tests exist and no test framework is mentioned in any issue.
- **`pnpm release` vs `wrangler deploy`:** Issue #6 references both commands interchangeably without clarifying which the rwsdk scaffold generates.