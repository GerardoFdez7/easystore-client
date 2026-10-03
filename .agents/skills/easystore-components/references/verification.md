# Verification

Choose checks that prove the affected behavior without rewriting unrelated files.

## Handoff gate

- Run `npm run verify` as the single completion gate. It covers type checking,
  formatting, linting, tests, architecture, Semgrep, duplication, production build,
  and Storybook build.
- If GraphQL operations change, run `npm run gql` before `npm run verify` and review
  the generated diff.

## UI evidence

- No browser test runner is configured at the moment; rely on Storybook states and
  `npm run verify` for UI evidence.

Inspect failures before editing. Fix failures caused by the current change; report
pre-existing or environment-dependent failures precisely instead of weakening a
gate or claiming success.
