# rwsdk Scaffold Recipe

## Scaffolding into an existing directory

When running `pnpm create rwsdk` into a directory that already has files (not a fresh empty directory), use:

```bash
pnpm create rwsdk . --force
```

The `.` specifies the current directory as the project location. The `--force` flag is required because the directory is not empty.

## Files to preserve

The rwsdk generator creates a `README.md` that will overwrite any existing one. If the repo has files that must be preserved:

1. **Before scaffolding**: Back up files that will be overwritten
   ```bash
   cp README.md README.md.bak
   ```

2. **After scaffolding**: Restore the originals
   ```bash
   mv README.md.bak README.md
   ```

The generator does **not** create:
- `CNAME`
- `.github/`
- `.kindling/`

These directories are safe and do not need backup.

## Post-scaffold steps

```bash
pnpm install          # Generates pnpm-lock.yaml
pnpm dev              # Starts Vite dev server on port 5173
```

## Generator output structure

The scaffold creates:
- `package.json` — rwsdk dependencies
- `src/` — App source (document.tsx, client.tsx, worker.tsx, pages/)
- `public/` — Static assets (favicons)
- `types/` — TypeScript declarations
- `tsconfig.json` — TypeScript configuration
- `vite.config.mts` — Vite configuration
- `wrangler.jsonc` — Cloudflare Workers configuration
- `.gitignore` — Standard ignores for node_modules, dist, .env, etc.
