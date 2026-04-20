# Decomposing a GitHub Epic into Sub-Issues

## Purpose

When tasked to investigate or decompose a GitHub epic (e.g., issue #8 on kindling-dogfood-peterp-site), this procedure ensures complete, empirically-backed decomposition with work types and dependencies clearly identified.

## Prerequisites

- GitHub CLI (`gh`) installed and authenticated
- Target epic issue number and repo name

## Procedure

### Step 1: Fetch the Epic

```bash
gh issue view <EPIC_NUMBER> --repo <OWNER>/<REPO>
```

**Capture:**
- Epic title and goal
- Any checkbox items (sub-issues) in the body
- Overall scope description

### Step 2: Extract Sub-Issue Numbers

Parse the checkboxes from the epic body to identify all sub-issue numbers. Example:
```
- [ ] #1  Scaffold new RedwoodSDK project
- [ ] #2  Port index.html content into RedwoodSDK routes/components
```

Extract the numbers: `1, 2, 3, ...`

### Step 3: Fetch Each Sub-Issue

For every sub-issue number `N`:

```bash
gh issue view <N> --repo <OWNER>/<REPO>
```

**Capture for each:**
- Title
- Current state (OPEN / CLOSED)
- Full body (description, acceptance criteria, any referenced dependencies)
- Labels and assignees (if any)

### Step 4: Classify Work Type

From the issue body, infer a work type category:

| Category | Pattern | Example |
|----------|---------|---------|
| **scaffold** | "run `<tool> create`", "initialize", "bootstrap" | "Run `pnpm create rwsdk`" |
| **port** | "convert", "migrate", "move", "rewrite" (moving existing code) | "Move inline `<style>` into CSS" |
| **feature** | "add", "implement", "build" (net new) | "Add authentication system" |
| **infra** | "configure", "setup", "add wrangler", "add workflow" | "Add wrangler.toml", "Add GitHub Actions workflow" |
| **verification** | "verify", "test", "sanity check", "check", "confirm" | "Verify dev server starts, no errors" |
| **tool-setup** | "install", "add devDep", "setup tooling" | "Install agent-ci, configure locally" |
| **fix** | "fix", "correct", "resolve" | "Fix auth token leak" |
| **refactor** | "refactor", "cleanup", "reorganize" (restructuring) | "Reorganize components" |

### Step 5: Extract Dependencies

For each sub-issue, identify both:

1. **Explicit dependencies** — Stated directly in the issue body (e.g., "depends on #5", "requires issue #3 first")
2. **Implicit dependencies** — Logical ordering inferred from the work description (e.g., "cannot port content into a scaffold that doesn't exist")

### Step 6: Build Dependency Graph

Create a directed graph showing all dependencies:

```
#1 (scaffold)
  ├── #2 (port content)
  ├── #3 (port styles)
  │     └── #4 (verify)
  └── #5 (infra)
        └── #6 (CI)
              └── #7 (tooling)
```

### Step 7: Identify Wave Structure

Group sub-issues by parallelizable layers:

- **Wave 1:** Issues with no dependencies (usually just the scaffold)
- **Wave 2:** All issues depending only on Wave 1
- **Wave 3:** All issues depending on Wave 2
- ... and so on

This shows which work can run in parallel.

### Step 8: Document Findings

Create a structured decomposition report (see example: `.docs/learnings/2026-04-20-epic-8-sub-issue-decomposition.md`) including:
- Epic goal
- Sub-issue table (number, title, state, work type, dependencies)
- Dependency graph
- Wave structure
- Notes on implicit vs. explicit dependencies

## Output Format

The report should be placed in `.docs/learnings/YYYY-MM-DD-<slug>.md` and include:

1. **Epic Goal** — One or two sentences describing what the epic aims to achieve
2. **Sub-Issue Table** — Structured with #, Title, State, Work Type, Dependencies
3. **Dependency Graph** — ASCII diagram showing the full chain
4. **Dependency Notes** — Distinguish implicit from explicit; explain any circular risks
5. **Status Summary** — What is open, what is closed, what is blocked

## Example

See: `.docs/learnings/2026-04-20-epic-8-sub-issue-decomposition.md` for a complete example from the migration epic.

## When to Use This Recipe

- Tasked to decompose an epic
- Tasked to understand sub-issue ordering or prerequisites
- Planning release sequencing or PR review order
- Onboarding a new engineer onto a project epic

## Tips

- Always use `gh issue view` (not manual GitHub web browsing) to avoid missing details or misremembering state
- Capture the full body of each issue — clues about dependencies are often buried in acceptance criteria
- Distinguish implicit vs. explicit — makes it clear which dependencies are strict vs. conventional
- Document work types consistently — helps future wave planners group tasks correctly
