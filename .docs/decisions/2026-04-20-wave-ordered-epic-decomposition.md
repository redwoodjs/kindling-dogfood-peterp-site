# Wave-Ordered Epic Decomposition

**Date:** 2026-04-20
**Context:** Epic #8 (Migrate peterp.org to RedwoodSDK) — 7 sub-issues with interdependencies

---

## Decision

Use **wave-ordered dependency chains** (grouping sub-issues by dependency depth) as the canonical structure for decomposing multi-step epics, rather than a strict linear sequence or a flat list with ad-hoc gating notes.

---

## Context

Epic #8 has 7 sub-issues with mixed dependency relationships:
- #1 is a prerequisite for all others (scaffold must exist first)
- #2, #3, #4 are independent of each other and can run in parallel
- #5 depends only on #1, not on #2, #3, or #4
- #6 depends on #5
- #7 depends on #6

A naive linear ordering would serialize work that could run concurrently, inflating total elapsed time. A flat list with informal "gated by" notes buries the parallelization opportunities and makes it easy to accidentally schedule dependent work too early.

---

## Alternatives Considered

**Strict linear sequencing** — schedule issues #1 → #2 → #3 → #4 → #5 → #6 → #7 in order.
- Correctness: yes, respects all dependencies.
- Problem: incorrectly gates #5 behind #2, #3, and #4, even though #5 only requires the scaffold. This blocked infrastructure work unnecessarily.
- Verdict: rejected — wastes scheduling opportunities.

**Flat list with informal gating notes** — list all issues with prose notes like "gated by #1" or "can run after #2".
- Correctness: depends on how carefully the note-writer reads each issue body.
- Problem: informal notes are easy to misread or skip; no structural signal for parallelization.
- Verdict: rejected — insufficient for orchestrative tasks that spawn parallel agents.

**Wave-ordered dependency chains** — compute the dependency depth of each issue and group by wave. Issues in the same wave have no mutual dependencies and can run in parallel.
- Correctness: yes, derived directly from issue bodies; captures both explicit and implicit dependencies.
- Parallelization: explicit — waves with multiple issues are clearly labeled as parallelizable.
- Scheduling signal: strong — orchestrators can safely spawn all issues in a wave concurrently.
- Verdict: **adopted**.

---

## Consequences

- Wave boundaries must be verified against actual issue text, not assumed from surface plausibility. The first version of the Epic #8 decomposition incorrectly placed #5 in a later wave because infrastructure work "usually" follows content work — but the issue body contains no such dependency.
- Waves with a single issue are still a useful signal: they represent work that must happen before the next wave but has no parallel siblings.
- The wave structure should be updated if new sub-issues are added that introduce cross-wave dependencies.
