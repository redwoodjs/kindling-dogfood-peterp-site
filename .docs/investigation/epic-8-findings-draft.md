# Epic #8 Investigation Findings

**Repo:** redwoodjs/kindling-dogfood-peterp-site
**Epic:** #8 — Migrate peterp.org to RedwoodSDK
**Investigated by:** Analyst (phase 1)
**Date:** 2026-04-20

---

## Raw Evidence

### `gh issue list` output (all issues)

```
52  OPEN  rwsdk migration epic — orchestration progress board  kindling-dogfood  2026-04-20
48  OPEN  rwsdk migration epic — orchestration progress board            2026-04-20
 8  OPEN  Epic: Migrate peterp.org to RedwoodSDK                kindling-dogfood  2026-04-20
 7  OPEN  Install agent-ci for local GitHub Actions validation   kindling-dogfood  2026-04-19
 6  OPEN  Add CI deploy workflow (GitHub Actions → Cloudflare)    kindling-dogfood  2026-04-19
 5  OPEN  Add wrangler.toml / Worker config                      kindling-dogfood  2026-04-19
 4  OPEN  Verify local dev for rwsdk app                        kindling-dogfood  2026-04-19
 3  OPEN  Port styles to RedwoodSDK app                         kindling-dogfood  2026-04-19
 2  OPEN  Port index.html content into RedwoodSDK routes/components kindling-dogfood 2026-04-19
 1  OPEN  Scaffold new RedwoodSDK project                       kindling-dogfood  2026-04-19
```

Issues #1–#8 all carry label `kindling-dogfood`. Issues #48 and #52 are orchestration boards; they are not part of the migration itself.

---

### `gh issue view 8` (epic body, full)

```
title:       Epic: Migrate peterp.org to RedwoodSDK
state:       OPEN
author:      justinvdm
labels:      kindling-dogfood
comments:    12

Goal:
  Rewrite the current single-file index.html site as a RedwoodSDK
  (rwsdk) application — a Vite-based React framework that runs on
  Cloudflare Workers.

Scope:
  - [ ] #1  Scaffold new RedwoodSDK project
  - [ ] #2  Port index.html content into RedwoodSDK routes/components
  - [ ] #3  Port styles to RedwoodSDK app
  - [ ] #4  Verify local dev for rwsdk app
  - [ ] #5  Add wrangler.toml / Worker config
  - [ ] #6  Add CI deploy workflow (GitHub Actions → Cloudflare Workers)
  - [ ] #7  Install agent-ci for local GitHub Actions validation

Tooling: pnpm only.

Out of scope:
  - Domain registrar transfer (upstream #3)
  - Cutting traffic over from GitHub Pages (upstream #2)
```

---

### `gh issue view` for each sub-issue

#### Issue #1 — Scaffold new RedwoodSDK project
- **State:** OPEN
- **Upstream:** peterp/peterp.github.io#4
- **Parent:** #8
- **Body:** Run `pnpm create rwsdk` (into `web/` subfolder or fresh branch), verify scaffold builds locally.
- **Acceptance:** rwsdk project committed, `pnpm install` succeeds, `pnpm dev` serves on port 5173, `pnpm-lock.yaml` committed (no `package-lock.json`/`yarn.lock`).
- **Work type:** scaffold
- **Dependencies:** none (root of dependency chain)

#### Issue #2 — Port index.html content into RedwoodSDK routes/components
- **State:** OPEN
- **Upstream:** peterp/peterp.github.io#5
- **Parent:** #8
- **Body:** Move bio/links/structure from `index.html` into rwsdk route files and React components.
- **Acceptance:** Home page renders same content as current `index.html`; external links preserved; old `index.html` removable later.
- **Work type:** feature (content migration)
- **Dependencies:** #1 (needs scaffolded project)

#### Issue #3 — Port styles to RedwoodSDK app
- **State:** OPEN
- **Upstream:** peterp/peterp.github.io#6
- **Parent:** #8
- **Body:** Move inline `<style>` from `index.html` into rwsdk app (CSS module or global stylesheet).
- **Acceptance:** Visual parity with current site at the same viewport sizes.
- **Work type:** feature (styling migration)
- **Dependencies:** #1 (needs scaffolded project)

#### Issue #4 — Verify local dev for rwsdk app
- **State:** OPEN
- **Upstream:** peterp/peterp.github.io#7
- **Parent:** #8
- **Body:** Sanity check: `pnpm dev` boots cleanly, all routes render, no console errors, hot reload works.
- **Acceptance:** Dev server runs, routes render, no console errors, hot reload confirmed.
- **Work type:** verification
- **Dependencies:** #1 (needs scaffolded project)

#### Issue #5 — Add wrangler.toml / Worker config
- **State:** OPEN
- **Upstream:** peterp/peterp.github.io#8
- **Parent:** #8
- **Body:** Ensure the rwsdk-generated `wrangler.toml` (or `wrangler.jsonc`) is committed with correct worker name, compatibility date, and bindings.
- **Acceptance:** `wrangler.toml` checked in; `wrangler deploy --dry-run` succeeds locally.
- **Work type:** infra
- **Dependencies:** #1 (infra cannot be configured before scaffold exists)

#### Issue #6 — Add CI deploy workflow (GitHub Actions → Cloudflare Workers)
- **State:** OPEN
- **Upstream:** peterp/peterp.github.io#9
- **Parent:** #8
- **Body:** GitHub Action running on push to `master` that deploys to Cloudflare via `pnpm release` (or `wrangler deploy`), using `CLOUDFLARE_API_TOKEN` repo secret. Use `pnpm/action-setup` and pnpm cache.
- **Acceptance:** Workflow file under `.github/workflows/`; successful deploy on next push.
- **Work type:** infra
- **Dependencies:** #5 (workflow references wrangler config)

#### Issue #7 — Install agent-ci for local GitHub Actions validation
- **State:** OPEN
- **Upstream:** peterp/peterp.github.io#20
- **Parent:** #8
- **Body:** Install `@redwoodjs/agent-ci`, confirm local workflow run via `pnpm dlx agent-ci run`, install agent skill, record instruction in `CLAUDE.md`/`AGENTS.md`.
- **Acceptance:** `@redwoodjs/agent-ci` in devDependencies; local CI run succeeds or fails with actionable output; agent instructions reference agent-ci.
- **Work type:** tool-setup
- **Dependencies:** #6 (agent-ci validates the CI workflow defined in #6)

---

## Structured Decomposition

| #  | Title | State | Work Type | Dependencies |
|----|-------|-------|-----------|-------------|
| 1  | Scaffold new RedwoodSDK project | OPEN | scaffold | — |
| 2  | Port index.html content into RedwoodSDK routes/components | OPEN | feature | #1 |
| 3  | Port styles to RedwoodSDK app | OPEN | feature | #1 |
| 4  | Verify local dev for rwsdk app | OPEN | verification | #1 |
| 5  | Add wrangler.toml / Worker config | OPEN | infra | #1 |
| 6  | Add CI deploy workflow (GitHub Actions → Cloudflare Workers) | OPEN | infra | #5 |
| 7  | Install agent-ci for local GitHub Actions validation | OPEN | tool-setup | #6 |

**Dependency chain:**
```
#1
 └── #2 (parallel with #3, #4)
      ├── #3 (parallel with #2, #4)
      └── #4 (parallel with #2, #3)
           └── #5
                └── #6
                     └── #7
```

**Wave structure:**
- **Wave 1:** #1 (serial — must complete before all others)
- **Wave 2:** #2, #3, #4 (parallel — all depend only on #1)
- **Wave 3:** #5 (depends on #2, #3, #4)
- **Wave 4:** #6 (depends on #5)
- **Wave 5:** #7 (depends on #6)

---

## Additional Findings

- **Progress boards already exist:** Issue #52 is the current orchestration board (posted 2026-04-20T21:06). Issue #48 is a prior version (posted 2026-04-20T21:03). Both mirror the decomposition plan in epic #8 exactly. No implementation has been started on any sub-issue.
- **Comments on sub-issues:** All sub-issues (#1–#7) have 0 comments. No agent has engaged with them yet.
- **Known unknowns captured in upstream docs:** The `.docs/blueprints/overview.md` already documents several known unknowns (scaffold directory, worker name, Cloudflare API token, `pnpm release` vs `wrangler deploy`). These do not block the decomposition but may surface during implementation.
- **Issue #52's notes match exactly:** The progress board's dependency order note (`#1 → #2, #3, #4 → #5 → #6 → #7`) is consistent with the body text in each sub-issue.

---

## Status Summary

All 7 sub-issues under Epic #8 are open with no prior work. The dependency chain is unambiguous. The decomposition is already captured in the orchestration progress board (issue #52). No sub-issue has comments, labels beyond `kindling-dogfood`, or assignees — no work has been started on any of them.