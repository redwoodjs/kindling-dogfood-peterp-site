# Agent Instructions

## Package manager

Always use `pnpm`. Never use `npm` or `yarn`.

## Project layout

The rwsdk application lives in `web/`. Run all package scripts from that directory (e.g. `cd web && pnpm dev`).

## Validating CI workflows with agent-ci

Before declaring a workflow change done, validate it locally using [agent-ci](https://agent-ci.dev):

```sh
cd web
pnpm dlx agent-ci run --workflow ../.github/workflows/deploy.yml
```

agent-ci pauses on failure with container state preserved so you can inspect what went wrong without a cloud round-trip.

## PRs

PRs must target **this fork's `master`** branch, not the upstream `peterp/peterp.github.io`. See `.github/PULL_REQUEST_TEMPLATE.md`.
