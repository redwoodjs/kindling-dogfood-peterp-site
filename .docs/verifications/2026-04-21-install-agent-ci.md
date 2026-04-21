# Proof of Work: Install agent-ci for local GitHub Actions validation

## Success Condition 1: `@redwoodjs/agent-ci` in devDependencies

**Evidence:** `package.json` contains the dependency.

```json
{
  "name": "kindling-dogfood-peterp-site",
  "version": "0.0.1",
  "private": true,
  "devDependencies": {
    "@redwoodjs/agent-ci": "^0.12.4"
  }
}
```

Also confirmed by `pnpm-lock.yaml` presence and `pnpm add -D @redwoodjs/agent-ci` output:

```
devDependencies:
+ @redwoodjs/agent-ci 0.12.4
```

---

## Success Condition 2: CLI is installed and responsive

**Command:** `pnpm dlx @redwoodjs/agent-ci --help`

**Complete transcript:**

```
Progress: resolved 1, reused 0, downloaded 0, added 0
Progress: resolved 18, reused 18, downloaded 0, added 0
Progress: resolved 107, reused 107, downloaded 0, added 0
Progress: resolved 132, reused 132, downloaded 0, added 0
Packages: +136
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 136, reused 136, downloaded 0, added 0, done
╭ Warning ─────────────────────────────────────────────────────────────────────╮
│                                                                              │
│   Ignored build scripts: cpu-features@0.0.10, protobufjs@7.5.5,              │
│   ssh2@1.17.0.                                                               │
│   Run "pnpm approve-builds" to pick which dependencies should be allowed     │
│   to run scripts.                                                            │
│                                                                              │
╰──────────────────────────────────────────────────────────────────────────────╯
Usage: agent-ci <command> [args]

Commands:
  run [sha] --workflow <path>   Run all jobs in a workflow file (defaults to HEAD)
  run --all                     Run all relevant PR/Push workflows for current branch
  retry --name <name>           Send retry signal to a paused runner
    --from-step <N>              Re-run from step N (skips earlier steps)
    --from-start                 Re-run all run: steps from the beginning
  abort --name <name>           Send abort signal to a paused runner

Options:
  -w, --workflow <path>         Path to the workflow file
  -a, --all                     Discover and run all relevant workflows
  -j, --jobs <n>                Max concurrent containers (auto-detected from CPU/memory)
  -p, --pause-on-failure         Pause on step failure for interactive debugging
  -q, --quiet                   Suppress animated rendering (also enabled by AI_AGENT=1)
      --no-matrix               Collapse all matrix combinations into a single job (uses first value of each key)
      --github-token [<token>]  GitHub token for fetching remote reusable workflows
                                (auto-resolves via `gh auth token` if no value given)
                                Or set: AGENT_CI_GITHUB_TOKEN env var
      --commit-status           Post a GitHub commit status after the run (requires --github-token)
      --var KEY=VALUE           Provide a workflow variable (${{ vars.KEY }}); repeat for multiple

Secrets:
  Workflow secrets (${{ secrets.FOO }}) are resolved from:
    1. .env.agent-ci file in the repo root
    2. Environment variables (shell env acts as fallback)
    3. --github-token automatically provides secrets.GITHUB_TOKEN

Vars:
  Workflow vars (${{ vars.FOO }}) must be provided via --var FOO=VALUE.
  The run fails if any referenced var is missing.
EXIT_CODE: 1
```

**Assessment:** Exit code `1` is expected when no subcommand is provided; the tool prints usage and exits non-zero. All documented commands (`run`, `retry`, `abort`) and options are present. The CLI is fully responsive.

---

## Success Condition 3: Local workflow execution confirmed

**Command:** `pnpm dlx @redwoodjs/agent-ci run --workflow .github/workflows/ci.yml`

**Complete transcript:**

```
Pulling runner image ghcr.io/actions/actions-runner:latest...
  First run downloads the image (~300 MB); subsequent runs use the cache.
Downloading: 100% (413 MB / 413 MB)
Done.

Starting runner agent-ci-orbstack-1 (5.4s)
   Logs: /home/vscode/.cache/pnpm/dlx/.../@redwoodjs/agent-ci/.agent-ci/runs/agent-ci-orbstack-1/logs

pass
  ├── ✓ 1. Set up job (0s)
  ├── ✓ 2. Run true (0s)
  ├── ✓ 3. Capture outputs (0s)
  └── ✓ 4. Complete job (0s)

━━━ SUMMARY ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Status:    ✓ 1 passed (1 total)
  Duration:  6s

EXIT_CODE: 0
```

**Assessment:** The local runner successfully pulled the official GitHub Actions runner image, started a container, and executed the `pass` job. All steps passed. Exit code `0` confirms success.

---

## Success Condition 4: Updated agent instructions exist

**Evidence:** `AGENTS.md` was created with the following content:

```markdown
# Agent Instructions

## Workflow Validation

Before declaring any task that modifies GitHub Actions workflows as complete, you must validate the changes locally using agent-ci.

Run the relevant workflow file with:

```bash
pnpm dlx @redwoodjs/agent-ci run --workflow .github/workflows/<workflow-file>.yml
```

Do not report the task as done until the local run passes.

For detailed usage, refer to the installed skill documentation at `.agents/skills/agent-ci/SKILL.md`.
```

---

## Success Condition 5: No forbidden files in the PR diff

**Verification performed:**

1. `node_modules/`: Was accidentally committed by harness bootstrap commit `5c16bc1`. Removed from tracking via `git rm -r --cached node_modules` and excluded going forward by `.gitignore`.
2. Browser binaries, screenshots, videos: Checked with `git ls-files | grep -iE "\.(png|jpg|jpeg|gif|mp4|webm|mov|exe|dll|so|dylib)$"` — none found.
3. Final diff against `master` (`git diff --name-status master...HEAD`) contains only:
   - `.agents/skills/agent-ci/SKILL.md`
   - `.claude/skills/agent-ci`
   - `.docs/blueprints/overview.md`
   - `.gitignore`
   - `.kindling/board/doing/2026-04-21-2300-brief-install-agent-ci-for-local-github--2331.md`
   - `AGENTS.md`
   - `package.json`
   - `pnpm-lock.yaml`
   - `skills-lock.json`

**No `node_modules`, browser binaries, screenshots, or videos appear in the cumulative PR diff.**
