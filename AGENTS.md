# Agent Instructions

## Package manager

Always use `pnpm` (not npm or yarn). The lockfile is `web/pnpm-lock.yaml`.

## Working directory

The rwsdk application lives in `web/`. Run all `pnpm` commands from there.

## Validating CI workflow changes

Before declaring a workflow change done, validate it locally using agent-ci:

```bash
pnpm dlx agent-ci run --workflow .github/workflows/deploy.yml
```

This runs the GitHub Actions workflow in a local container. It pauses on failure with container state preserved so you can inspect what went wrong without a cloud round-trip.

`@redwoodjs/agent-ci` is installed as a dev dependency in `web/`.

## PRs

Target this fork's `master` branch — not the upstream `peterp/peterp.github.io`.
