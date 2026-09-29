# Verification

Choose checks that prove the affected behavior without rewriting unrelated files.

## Handoff gate

- Run `npm run verify` as the single completion gate. It covers type checking,
  formatting, linting, tests, architecture, Semgrep, duplication, production build,
  and Storybook build.
- If GraphQL operations change, run `npm run gql` before `npm run verify` and review
  the generated diff.

## UI evidence

- Run the narrow Cypress component spec for interactive component behavior and the
  narrow E2E spec for routed user flows; expand to `npm run test:component` or
  `npm run test:e2e` only when warranted.
- Focused Cypress commands are useful while iterating; they do not replace the final
  `npm run verify` gate.

Inspect failures before editing. Fix failures caused by the current change; report
pre-existing or environment-dependent failures precisely instead of weakening a
gate or claiming success.
