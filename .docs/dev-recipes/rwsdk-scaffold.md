# rwsdk Project Scaffolding

## Problem

Setting up a new RedwoodSDK project requires understanding which files the generator creates by default, what configuration is included, and how to verify the dev server works correctly.

## Context

RedwoodSDK is a Vite-based React framework targeting Cloudflare Workers. We scaffolded the initial project for peterp-site to establish the application skeleton before migrating content from the static `index.html`.

## Solution

**Exact command:**
```bash
pnpm create rwsdk create web
```

The positional `web` argument specifies the target directory and makes the generator non-interactive by default — it does not expose `--non-interactive` or `--yes` flags.

**Generator behavior (v1.2.3)**:
- Fetches the latest starter template from the RedwoodSDK GitHub releases.
- Extracts the template tarball directly into the target directory (`web/`).
- Does NOT auto-install dependencies — manual `pnpm install` is required to generate `pnpm-lock.yaml`.

**Generated files of note**:
- `wrangler.jsonc` — Cloudflare Workers configuration (JSON with comments). This is the generator's own default, not a manually-created file. Do not confuse this with a manual `wrangler.toml` setup in later tasks.
- `pnpm-lock.yaml` — Dependency resolution snapshot (commit this).
- `node_modules/` — Excluded by `.gitignore`.

**Dev server verification**:
```bash
cd web
pnpm dev
```

The server boots on `http://localhost:5173` (Vite default). On first startup, it performs RSC boundary detection (scanning for `'use client'` and `'use server'` directives), which adds ~1.6s to startup time.

A `punycode` deprecation warning from Node.js v18+ may appear — this originates in an upstream dependency (not rwsdk) and does not affect operation.

## Gotcha

The generator includes `wrangler.jsonc` by default. Do not treat this as a manual addition; it is part of the starter template. If a later task requires a custom `wrangler.toml`, it will explicitly state that scope.
