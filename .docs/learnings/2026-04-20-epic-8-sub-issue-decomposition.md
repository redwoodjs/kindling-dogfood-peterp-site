# Epic #8 Sub-Issue Decomposition

**Date:** 2026-04-20  
**Repo:** redwoodjs/kindling-dogfood-peterp-site  
**Source:** Empirical investigation via `gh issue view` — all data from live GitHub issue bodies and states.

---

## Epic Goal

Issue #8 is the migration epic for peterp.org. The goal is to rewrite the current single-file static site (`index.html`) as a [RedwoodSDK](https://docs.rwsdk.com) application (Vite + React + Cloudflare Workers), deployed automatically via GitHub Actions CI. The migration is framework-only — domain transfer and traffic cutover are out of scope. Success means the RedwoodSDK app is scaffolded, all existing bio/link content and styles are ported, local dev works cleanly, and a wrangler-based CI deploy pipeline is operational with local validation tooling.

---

## Sub-Issue Table

| # | Title | State | Work Type | Dependencies |
|---|-------|-------|-----------|--------------|
| #1 | Scaffold new RedwoodSDK project | OPEN | **Scaffold** — run `pnpm create rwsdk` into the repo, verify `pnpm install` and `pnpm dev` work | None (starting point) |
| #2 | Port index.html content into RedwoodSDK routes/components | OPEN | **Port** — convert bio/links HTML into React route files and components | #1 (implicit: scaffold must exist first) |
| #3 | Port styles to RedwoodSDK app | OPEN | **Port** — move inline `<style>` block from `index.html` into rwsdk CSS (module or global) | #1 (implicit), likely parallel to #2 |
| #4 | Verify local dev for rwsdk app | OPEN | **QA/Verification** — confirm `pnpm dev` boots cleanly, all routes render, no console errors, hot reload works | #1, #2, #3 (implicit: nothing to verify until content+styles are ported) |
| #5 | Add wrangler.toml / Worker config | OPEN | **Infra** — ensure `wrangler.toml`/`wrangler.jsonc` is committed with correct worker name, compat date, and bindings; verify `wrangler deploy --dry-run` | #1 (implicit: scaffold generates the base config) |
| #6 | Add CI deploy workflow (GitHub Actions → Cloudflare Workers) | OPEN | **Infra/CI** — GitHub Action on push to `master` that deploys via `wrangler deploy`/`pnpm release`; uses `CLOUDFLARE_API_TOKEN` secret | #5 (implicit: needs wrangler config before CI can deploy) |
| #7 | Install agent-ci for local GitHub Actions validation | OPEN | **Tooling** — install `@redwoodjs/agent-ci` devDep; validate deploy workflow locally; add agent-ci skill; document in `CLAUDE.md`/`AGENTS.md` | #6 (**explicit**: issue body references the CI workflow as the thing to validate) |

---

## Dependency Graph

```
#1 (scaffold)
  ├── #2 (port content)
  ├── #3 (port styles)
  │     └── #4 (verify local dev)  ← needs #1 + #2 + #3
  └── #5 (wrangler config)
        └── #6 (CI deploy workflow)
              └── #7 (agent-ci tooling)
```

---

## Dependency Notes

**Implicit dependencies** (logical ordering, not stated in issue bodies):
- #2 depends on #1: cannot port content into a scaffold that doesn't exist.
- #3 depends on #1: same reasoning as #2.
- #4 depends on #1, #2, #3: local dev verification requires the full app to be assembled.
- #5 depends on #1: the scaffold generates the initial wrangler config file; the issue is about committing and hardening it.
- #6 depends on #5: CI deploy workflow needs a committed `wrangler.toml` to reference.

**Explicit dependencies** (stated in issue body):
- #7 depends on #6: the `agent-ci` issue body explicitly names the CI deploy workflow (from #6) as the artifact that agent-ci will validate locally.

**Cross-repo reference (out of scope):**
- #7's body also references `peterp/peterp.github.io#20` — this is an upstream context link to the original repo, not a dependency between sub-issues in scope for this migration. Omitted from the dependency column.

---

## Overall Status

All 7 sub-issues are **OPEN**. No work has been merged yet. The repo is currently a bare static site (`index.html`, `CNAME`, `README.md`) with no build tooling — #1 (scaffold) is the unblocked starting point for all downstream work.
