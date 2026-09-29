# Verification

Choose checks that prove the affected behavior without rewriting unrelated files.

## Baseline

- Run `npx tsc --noEmit` for TypeScript changes.
- Run ESLint against changed source and story files directly `npm run lint`.
- Run `npm run gql` when `.gql` operations change and review the generated diff.
- Run the relevant `npm run test-errors:*` command for error-registry changes.

## UI evidence

- Use `npm run build-storybook` for reusable component or Storybook configuration
  changes when the environment supports it.
- Run the narrow Cypress component spec for interactive component behavior and the
  narrow E2E spec for routed user flows; expand to `npm run test:component` or
  `npm run test:e2e` only when warranted.
- Use `npm run build` for changes that affect routing, Server/Client boundaries,
  bundling, or production rendering when required environment variables are
  available.

Inspect failures before editing. Fix failures caused by the current change; report
pre-existing or environment-dependent failures precisely instead of weakening a
gate or claiming success.
