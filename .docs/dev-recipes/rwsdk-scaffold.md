# RedwoodSDK Scaffold Recipe

## Command

```
pnpm create rwsdk <project-name>
```

## Non-obvious behaviors

**No `--yes` / non-interactive flag.** There is no `--yes` flag. Passing the project name as a positional argument is sufficient to make the run non-interactive — no prompts appear.

**Always creates a named subdirectory.** The generator resolves `path.resolve(cwd, projectName)` and always writes into a named directory. Passing `.` (current directory) requires `--force` because the directory already exists. For repos with existing files at root, the cleanest approach is to scaffold into a subdirectory (e.g. `web/`) to avoid any collision risk.

**pnpm is auto-detected — no flag needed.** The generator reads `npm_execpath` / `npm_config_user_agent` at runtime and detects pnpm automatically. No `--package-manager pnpm` flag is required.

**Dev server port is 5173.** The starter template uses `vite dev` with no custom port override. Vite defaults to 5173.

**Collision surface is small.** The only file the generator produces that commonly collides with an existing repo is `README.md`. It does NOT generate `CNAME` or `index.html` (the framework uses `src/worker.tsx` as the entry point, not a static HTML file).

## Preservation strategy when repo has existing files

Scaffold into a subdirectory (e.g. `web/`) so the framework code is isolated from root-level repo files:

```
pnpm create rwsdk web
cd web && pnpm install
```

This produces zero collision with `README.md`, `CNAME`, or `index.html` at the repo root.
