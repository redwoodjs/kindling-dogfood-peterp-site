# Epic #8 Decomposition — Structured Findings Report

**Epic:** Migrate peterp.org to RedwoodSDK
**Repo:** `redwoodjs/kindling-dogfood-peterp-site`
**Prepared by:** Analyst
**Date:** 2026-04-20
**Status:** TechLead Phase 2 gate PASSED; correction applied (issue #1 is CLOSED, not OPEN)

---

## Epic Goal

Rewrite the current single-file `index.html` site as a RedwoodSDK application — a Vite-based React framework that runs on Cloudflare Workers. Hosting move and domain registrar transfer are explicitly out of scope for this epic.

**Upstream source:** `peterp/peterp.github.io#1`

---

## Evidence Summary

All data fetched directly from GitHub CLI (`gh issue view N --repo redwoodjs/kindling-dogfood-peterp-site`). Raw outputs are preserved in the prior-phase draft artifact at `.docs/investigation/epic-8-findings-draft.md`.

| Field | Value |
|---|---|
| Epic state | OPEN |
| Epic comment count | 14 |
| Sub-issues: 1 CLOSED, 6 OPEN | all carry `kindling-dogfood` |
| All sub-issues have assignee | None |
| Orchestration boards present | #48 (progress tracking, 2 comments), #52 (decomposition board, 0 comments) |

---

## Sub-Issue Table

| # | Title | State | Work Type (inferred) | Comments | Parent | Upstream |
|---|---|---|---|---|---|---|
| 1 | Scaffold new RedwoodSDK project | **CLOSED** | scaffold | 2 | #8 | peterp/peterp.github.io#4 |
| 2 | Port index.html content into RedwoodSDK routes/components | OPEN | feature | 1 ("Done on PR #57") | #8 | peterp/peterp.github.io#5 |
| 3 | Port styles to RedwoodSDK app | OPEN | feature | 1 ("Done on PR #57") | #8 | peterp/peterp.github.io#6 |
| 4 | Verify local dev for rwsdk app | OPEN | verification | 1 ("Done on PR #57") | #8 | peterp/peterp.github.io#7 |
| 5 | Add wrangler.toml / Worker config | OPEN | infra | 1 ("Done on PR #57") | #8 | peterp/peterp.github.io#8 |
| 6 | Add CI deploy workflow (GitHub Actions → Cloudflare Workers) | OPEN | infra | 1 (token-scope blocker) | #8 | peterp/peterp.github.io#9 |
| 7 | Install agent-ci for local GitHub Actions validation | OPEN | tooling | 1 ("Done on PR #57") | #8 | peterp/peterp.github.io#20 |

---

## Wave Structure (Dependency Order)

No sub-issue declares a hard `depends on #N` cross-reference in its gh body — all share `Parent: #8` as the sole formal dependency marker. Wave ordering is inferred from acceptance criteria text and the RedwoodSDK scaffold lifecycle.

### Wave 1 — #1 ✅ DONE (scaffold complete via PR #63)

**Issue #1 — Scaffold new RedwoodSDK project**

Acceptance: `pnpm create rwsdk` scaffold committed to `web/`, `pnpm install` succeeds, `pnpm dev` serves on port 5173, `pnpm-lock.yaml` committed (no `package-lock.json` / `yarn.lock`). Pre-existing files (README.md, CNAME, index.html) were preserved.

**Verdict:** Closed. PR #63 merged. Scaffolded RedwoodSDK v1.2.3 into `web/`. Both verification comments confirm all acceptance criteria met. All subsequent waves now unblocked.

---

### Wave 2 — #2, #3, #4 (complete on `feat/rwsdk-migration` branch; marked "Done" in issue comments; awaiting PR #57 merge)

**Issue #2 — Port index.html content into RedwoodSDK routes/components**

Acceptance: Home page renders same content as current `index.html`, external links preserved, old `index.html` removable later (tracked separately).

**Issue #3 — Port styles to RedwoodSDK app**

Acceptance: Visual parity with current site at the same viewport sizes.

**Issue #4 — Verify local dev for rwsdk app**

Acceptance: `pnpm dev` boots cleanly, all routes render, no console errors, hot reload works.

These three can proceed in parallel after #1 is scaffolded. #2 and #3 produce the migrated content; #4 validates the result.

### Wave 3 — #5 (complete on `feat/rwsdk-migration` branch; marked "Done" in issue comment; awaiting PR #57 merge)

**Issue #5 — Add wrangler.toml / Worker config**

Acceptance: `wrangler.toml` checked in, `wrangler deploy --dry-run` succeeds locally.

The acceptance criteria explicitly reference "the rwsdk-generated wrangler.toml", and the worker name and bindings require site-specific content knowledge. Meaningful Worker configuration is gated on the scaffold from #1, the ported content from #2, the ported styles from #3, and the dev-verified scaffold from #4.

### Wave 4 — #6 (OPEN; blocked by token-scope error; content ready in PR #57 description)

**Issue #6 — Add CI deploy workflow (GitHub Actions → Cloudflare Workers)**

Acceptance: Workflow file under `.github/workflows/`, successful deploy on next push to `master`.

The workflow must target `master` (not `main`) per the repo's CI trigger convention. Requires `CLOUDFLARE_API_TOKEN` repo secret. Uses `pnpm/action-setup` and pnpm cache.

**⚠️ Blocker:** The workflow file (`.github/workflows/deploy.yml`) was committed locally (commit `522c077` on `feat/rwsdk-migration`) but the OAuth token lacks the `workflow` scope, preventing the push to GitHub. Error:
```
refusing to allow an OAuth App to create or update workflow `.github/workflows/deploy.yml` without `workflow` scope
```

Resolution: A human or CI token with the `workflow` scope must push the `feat/rwsdk-migration` branch, or manually create `.github/workflows/deploy.yml` using the content from PR #57's description. The file content is correct and ready — the block is purely a token permissions issue.

### Wave 5 — #7 (complete on `feat/rwsdk-migration` branch; marked "Done" in issue comment; awaiting PR #57 merge)

**Issue #7 — Install agent-ci for local GitHub Actions validation**

Acceptance: `@redwoodjs/agent-ci` in `devDependencies`, local run of CI workflow succeeds or fails with actionable output, agent instructions in `CLAUDE.md` / `AGENTS.md` reference agent-ci.

Steps: `pnpm add -D @redwoodjs/agent-ci`, confirm `pnpm dlx agent-ci run --workflow .github/workflows/<name>.yml` runs end-to-end, install agent skill, record instruction for future agents.

---

## Out-of-Scope Items

These are explicitly excluded from Epic #8 and tracked separately in the upstream repo:

| Item | Tracked by |
|---|---|
| Domain registrar transfer | Upstream `peterp/peterp.github.io#3` |
| Cutting traffic over from GitHub Pages | Upstream `peterp/peterp.github.io#2` |

---

## Open Questions

These are not answered by the gh issues. They must be resolved before or during their respective waves.

1. **Worker name, Cloudflare account ID, and `CLOUDFLARE_API_TOKEN` are not yet configured.** Required inputs for Issue #5's `wrangler.toml` but not specified anywhere. (Scaffold directory — Q1 — is now resolved: scaffold landed in `web/`.)
2. **Post-migration fate of `index.html` and `CNAME` is undefined.** Issue #2 defers this to "tracked separately" but no issue number is provided for the cutover task.
3. **Testing strategy is undecided.** No sub-issue references testing, and no test framework exists in the current repo.
4. **`pnpm release` vs `wrangler deploy` ambiguity.** Issue #6 mentions both interchangeably; which command the rwsdk scaffold generates is not yet confirmed.
5. **Issue #6 token-scope blocker.** The current OAuth token lacks the `workflow` scope needed to push `.github/workflows/deploy.yml`. This is a permissions problem, not a content problem — the file contents are correct and present in PR #57's description.

---

## Named Artifacts

**PR #57** — `feat: migrate peterp.org to RedwoodSDK (epic #8)`
- State: OPEN (not yet merged)
- Changed files: 24
- Lines: +6,778 / -0
- Closes: #1, #2, #3, #4, #5, #6, #7
- Contains: scaffold (`web/`), ported content, ported styles, wrangler config, agent-ci setup, AGENTS.md, `.docs/blueprints/overview.md`
- **Note:** Issue #6's workflow file (`.github/workflows/deploy.yml`) is committed locally (commit `522c077`) but cannot be pushed due to missing `workflow` scope. Contents available in PR description for manual file creation.

**Progress boards (coordination artifacts):** Issues #48, #52, #59, #65 are orchestration boards — not part of the migration itself. All carry no `kindling-dogfood` label. They track progress and do not represent work items.
