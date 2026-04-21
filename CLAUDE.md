## Validating workflow changes with agent-ci

Any change under `.github/workflows/` must be validated locally before declaring the task complete. Run:

```
pnpm dlx agent-ci run --workflow .github/workflows/<name>.yml
```

Do NOT declare done until this command exits 0 (or exits with actionable, understood output).
