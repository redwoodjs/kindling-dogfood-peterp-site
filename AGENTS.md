# Agent Instructions

## Workflow Validation

When modifying GitHub Actions workflows or CI-related configuration, validate your changes with `agent-ci` before declaring the task done. Run the tool from the `web/` directory:

```bash
cd web && pnpm dlx @redwoodjs/agent-ci --help
```

Use the appropriate `agent-ci` command (for example, `run --all` or `run --workflow <path>`) to verify that the workflow file is syntactically valid and the jobs execute as expected.
