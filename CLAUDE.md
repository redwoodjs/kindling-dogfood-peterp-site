# Agent Instructions

## Workflow Validation

Before declaring a task done that involves changes to `.github/workflows/`, validate the workflow locally using **agent-ci**:

```
pnpm --filter web dlx agent-ci run --workflow .github/workflows/<name>.yml
```

Or from inside the `web/` directory:

```
pnpm dlx agent-ci run --workflow ../.github/workflows/<name>.yml
```

agent-ci runs the GitHub Actions workflow in a local container. It pauses on failures with container state preserved so you can inspect what went wrong without a cloud round-trip.

`@redwoodjs/agent-ci` is installed as a devDependency in `web/package.json`.

## Package Manager

Always use `pnpm`. Never use `npm` or `yarn`.

## App Location

The rwsdk application lives in `web/`. All pnpm commands for the app should be run from `web/` or use `pnpm --filter web`.
