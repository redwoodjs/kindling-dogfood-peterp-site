# Installing agent-ci for local GitHub Actions validation

## Gotchas

1. **Scoped package name required for `pnpm dlx`**: The brief suggested `pnpm dlx agent-ci --help`, but the package is scoped `@redwoodjs/agent-ci`. The unscoped name `agent-ci` does not exist, so the correct command is `pnpm dlx @redwoodjs/agent-ci --help`.

2. **Skill installation requires `-y` flag in non-interactive environments**: `pnpm dlx skills add redwoodjs/agent-ci --skill agent-ci` presents an interactive prompt to select target agents. Without a TTY, the command exits without installing anything. Use `pnpm dlx skills add redwoodjs/agent-ci --skill agent-ci -y` to accept defaults and complete installation unattended.

3. **Always ensure `.gitignore` excludes `node_modules/` before running harness operations**: The absence of a `.gitignore` file allowed the harness bootstrap to accidentally commit `node_modules/` (4,322 files), which included test SSH private keys from the `ssh2` package. GitHub push protection blocked the branch push because it detected secrets in the commit history. The fix required rewriting history to remove the offending commit entirely.

## Recommended commands

```bash
# Install the dev dependency
pnpm add -D @redwoodjs/agent-ci

# Verify CLI is responsive
pnpm dlx @redwoodjs/agent-ci --help

# Run a workflow locally
pnpm dlx @redwoodjs/agent-ci run --workflow .github/workflows/ci.yml

# Install the agent skill (non-interactive)
pnpm dlx skills add redwoodjs/agent-ci --skill agent-ci -y
```
