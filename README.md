# RedwoodSDK migration scaffold

This repository is set up as the base application for the RedwoodSDK migration. It keeps the runtime and workspace wiring in place while leaving content and deployment work for later phases.

## Local development

```shell
pnpm install
pnpm dev
```

Open the URL printed by the dev server, typically `http://localhost:5173/`.

## Notes

- The repository uses pnpm and keeps the generated lockfile in source control.
- The app shell is intentionally minimal so future migration work can build on it without starter content getting in the way.
