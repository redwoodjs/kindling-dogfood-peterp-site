# Agent Instructions

## Package manager

Use `pnpm` for all installs and scripts. Never use `npm` or `yarn`.

## Validating CI workflow changes

Before declaring any change to `.github/workflows/` done, validate it locally with agent-ci:

```
pnpm dlx agent-ci run --workflow .github/workflows/deploy.yml
```

agent-ci pauses on failures with container state preserved so you can inspect what went wrong without a cloud round-trip.

## Stack

This site is a [RedwoodSDK](https://docs.rwsdk.com) app deployed to Cloudflare Workers.

- Entry point: `src/worker.tsx`
- Routes and React components: `src/app/`
- Cloudflare config: `wrangler.jsonc`
- Local dev: `pnpm dev` → http://localhost:5173
- Deploy: `pnpm release`
