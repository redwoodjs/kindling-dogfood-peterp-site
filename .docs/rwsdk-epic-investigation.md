# rwsdk Migration Epic — Sub-Issue Investigation

_Last updated: 2026-04-20. Data fetched live from GitHub via gh CLI._

---

## 1. Epic Summary

**Issue #8 — Epic: Migrate peterp.org to RedwoodSDK**  
**State:** OPEN  
**Labels:** kindling-dogfood  
**Upstream:** peterp/peterp.github.io#1

The goal of this epic is to rewrite the current single-file `index.html` personal site as a [RedwoodSDK](https://docs.rwsdk.com) (rwsdk) application — a Vite-based React framework that runs on Cloudflare Workers. The motivation is to move from a static one-pager to a structured app capable of supporting RSC, server functions, and realtime features, aligned with the same stack used elsewhere in the RedwoodJS ecosystem. The epic covers only the framework migration (code); hosting cutover and domain transfer are tracked separately. All package management must use `pnpm`.

**References:**
- https://docs.rwsdk.com/getting-started/quick-start/
- https://developers.cloudflare.com/workers/framework-guides/web-apps/redwoodsdk/
- https://agent-ci.dev

---

## 2. Sub-Issues

### #1 — Scaffold new RedwoodSDK project
**State:** CLOSED ✓

Run `pnpm create rwsdk` to generate a new RedwoodSDK project (e.g. into a `web/` subfolder or a fresh branch). This is the foundational step — getting the boilerplate scaffolded and verifying that `pnpm install` succeeds and `pnpm dev` serves the app on localhost:5173. A `pnpm-lock.yaml` must be committed; no `package-lock.json` or `yarn.lock` should be present. This sub-issue is complete.

---

### #2 — Port index.html content into RedwoodSDK routes/components
**State:** OPEN

Move the bio, links, and structural content currently in the static `index.html` into RedwoodSDK route files and React components. The home page in the rwsdk app should render the same content as the current single-page site, with all external links preserved. Removal of the old `index.html` is tracked separately under the hosting cutover work and is not part of this sub-issue.

---

### #3 — Port styles to RedwoodSDK app
**State:** OPEN

Migrate the inline `<style>` block from `index.html` into the rwsdk app using whichever styling approach the rwsdk scaffold provides (CSS module, global stylesheet, etc.). The acceptance bar is visual parity with the current site at the same viewport sizes — the migrated app must look identical to the original at equivalent breakpoints.

---

### #4 — Verify local dev for rwsdk app
**State:** OPEN

A focused sanity-check pass: confirm that `pnpm dev` boots cleanly, all routes render without errors, no browser console errors appear, and Vite's hot module reload functions correctly. This is a validation gate before moving on to deployment configuration and should be completed after #2 and #3 are done.

---

### #5 — Add wrangler.toml / Worker config
**State:** OPEN

Ensure the rwsdk-generated `wrangler.toml` (or `wrangler.jsonc`) is committed to the repo with the correct worker name, compatibility date, and any required bindings. Acceptance requires `wrangler deploy --dry-run` to succeed locally, confirming the config is valid before any real deployment attempt.

---

### #6 — Add CI deploy workflow (GitHub Actions → Cloudflare Workers)
**State:** OPEN

Create a GitHub Actions workflow that runs on push to `master` and deploys the rwsdk app to Cloudflare Workers using `pnpm release` or `wrangler deploy`. The workflow must use a `CLOUDFLARE_API_TOKEN` repo secret, the `pnpm/action-setup` action, and pnpm caching. The workflow file lives under `.github/workflows/`. This sub-issue depends on #5 (wrangler config) and should be validated locally with agent-ci (#7) before merging.

---

### #7 — Install agent-ci for local GitHub Actions validation
**State:** OPEN

Install [agent-ci](https://agent-ci.dev) (`@redwoodjs/agent-ci`) as a dev dependency to enable local validation of the GitHub Actions deploy workflow (from issue #6) before pushing to the remote — avoiding cloud round-trips and preserving container state on failure. The setup involves installing the package with `pnpm add -D @redwoodjs/agent-ci`, confirming `pnpm dlx agent-ci run` can execute the deploy workflow locally end-to-end, installing the agent skill via `pnpm dlx skills add redwoodjs/agent-ci --skill agent-ci`, and adding instructions to `CLAUDE.md` / `AGENTS.md` directing agents to validate workflow changes via agent-ci before declaring work done.

---

## 3. Open vs Closed Summary

| # | Title | State |
|---|-------|-------|
| #1 | Scaffold new RedwoodSDK project | **CLOSED** ✓ |
| #2 | Port index.html content into RedwoodSDK routes/components | OPEN |
| #3 | Port styles to RedwoodSDK app | OPEN |
| #4 | Verify local dev for rwsdk app | OPEN |
| #5 | Add wrangler.toml / Worker config | OPEN |
| #6 | Add CI deploy workflow (GitHub Actions → Cloudflare Workers) | OPEN |
| #7 | Install agent-ci for local GitHub Actions validation | OPEN |

**1 of 7 sub-issues closed. 6 remain open.**

### Closed (1)
- #1 Scaffold new RedwoodSDK project

### Open (6)
- #2 Port index.html content into RedwoodSDK routes/components
- #3 Port styles to RedwoodSDK app
- #4 Verify local dev for rwsdk app
- #5 Add wrangler.toml / Worker config
- #6 Add CI deploy workflow (GitHub Actions → Cloudflare Workers)
- #7 Install agent-ci for local GitHub Actions validation

---

## 4. Suggested Sequencing (observed from issue dependencies)

Based on declared dependencies in the issue bodies, the natural order is:

1. **#1** Scaffold ✓ → **#2** Port content → **#3** Port styles → **#4** Verify local dev → **#5** wrangler config → **#7** agent-ci install → **#6** CI deploy workflow

Agent-ci (#7) should land before the CI workflow (#6) so the workflow can be validated locally before merging.
