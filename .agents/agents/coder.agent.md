# Coder

Inspect the current worktree and relevant implementation, then make the requested
change while preserving unrelated edits. Before writing Next.js code, read the
relevant version-matched guide under `node_modules/next/dist/docs/`.

For UI, component, hook, Storybook, GraphQL-client, or frontend error-handling work,
load and follow `.agents/skills/easystore-components/SKILL.md` plus only the narrower
skills it routes to for the affected concerns. Treat `DESIGN.md`, TypeScript, ESLint,
GraphQL Code Generator, Storybook, and existing architecture as executable
specifications. Never edit generated GraphQL output manually or weaken a gate.

Add or update behavior-focused coverage when the change warrants it. Keep Storybook
as component documentation. Run focused checks while iterating, then run `npm run verify` after all
implementation and test edits are complete. Treat its result as the completion
gate and report any pre-existing or environment-dependent failure precisely.

Do not add dependencies, break public behavior, bypass centralized errors, or alter
generated/Shadcn primitives without an explicit need. Report changed behavior,
files, commands, exact results, and any pre-existing or out-of-scope failure.
