# Agent Instructions

## Workflow Validation

Before declaring any task that modifies GitHub Actions workflows as complete, you must validate the changes locally using agent-ci.

Run the relevant workflow file with:

```bash
pnpm dlx @redwoodjs/agent-ci run --workflow .github/workflows/<workflow-file>.yml
```

Do not report the task as done until the local run passes.

For detailed usage, refer to the installed skill documentation at `.agents/skills/agent-ci/SKILL.md`.
