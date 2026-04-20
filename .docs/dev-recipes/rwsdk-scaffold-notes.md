# rwsdk Scaffolding Notes

## Generator behavior: rwsdk v1.2.3

**Command**: `pnpm create rwsdk create <project-name>`

- No `--yes` flag. First positional arg `<project-name>` is required; generator creates a new subdirectory.
- No `--template` flag — single default template.
- Produces `package.json`, `pnpm-lock.yaml`, Vite config, src/app structure, and wrangler.jsonc.
- Does NOT produce a README or .github directory — so no conflict with pre-existing repo files.
- Port 5173 is the default dev server port (Vite's default); multiple concurrent invocations shift to 5174, 5175, etc.

**Scaffolding strategy for a repo with root files (CNAME, index.html, etc.)**:
- The existing repo already had a valid rwsdk scaffold (`package.json` with `"rwsdk": "1.2.3"`, full src/app structure) that was committed by the harness. No regeneration was needed — the scaffold was already correctly applied.
- If regenerating from scratch, scaffold into a fresh subdirectory (e.g. `web/`) rather than the repo root to avoid conflicts with GitHub Pages files at the root.

**Lockfile**: `pnpm-lock.yaml` only. No `package-lock.json` or `yarn.lock` produced.