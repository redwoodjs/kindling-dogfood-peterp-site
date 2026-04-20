# Agent Instructions

## Project overview

This is peterp.org, migrated to [RedwoodSDK](https://docs.rwsdk.com) — a Vite + React app deployed to Cloudflare Workers. The rwsdk app lives in `web/`. Use `pnpm` for all package management (never npm or yarn).

## Common commands

```bash
# Install dependencies
cd web && pnpm install

# Start dev server (http://localhost:5173)
cd web && pnpm dev

# Build
cd web && pnpm build

# Deploy to Cloudflare Workers (requires CLOUDFLARE_API_TOKEN)
cd web && pnpm release
```

## Validating GitHub Actions workflows

Before declaring any workflow change done, validate it locally using agent-ci:

```bash
pnpm dlx agent-ci run --workflow .github/workflows/deploy.yml
```

agent-ci (installed as `@redwoodjs/agent-ci` in `web/devDependencies`) runs GitHub Actions workflows locally, pausing on failure with container state preserved — no cloud round-trip needed.

Ref: https://agent-ci.dev

## Key files

- `web/src/worker.tsx` — app entry point, route definitions
- `web/src/app/document.tsx` — HTML shell (title, global styles)
- `web/src/app/pages/home.tsx` — home page content
- `web/wrangler.jsonc` — Cloudflare Worker config (name: `peterp-site`)
- `.github/workflows/deploy.yml` — CI deploy on push to `master`
