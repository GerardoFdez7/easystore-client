# Code review instructions

Be concise, direct, and evidence-based. Lead with severity and impact. Explain a
concrete failure or attack scenario, then the smallest safe fix and the verification
that proves it. Do not praise, speculate, or report cosmetic churn as a defect.

## Project

EasyStore Client: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4,
Shadcn/Radix, next-intl, Apollo Client/GraphQL, React Hook Form, Zod, Storybook.

## Rules for every changed file

- Follow AGENTS.md, .agents/skills/easystore-components/SKILL.md and its references.
  For visual work follow DESIGN.md and the actual globals.css. For Next.js APIs use
  the version-matched docs in node_modules/next/dist/docs/.
- Prioritize concrete behavioral, security, translation, accessibility and performance
  defects.
- tools/architecture/check.mjs, .semgrep.yml and eslint.config.mjs are authoritative
  for deterministic checks: do not repeat their findings, but review omissions,
  escapes, bypasses, weakened scripts, broadened exclusions and unjustified exceptions.
- Source code and inline documentation (identifiers, comments, JSDoc, TODOs, developer
  error/log messages) must be clear English. Exclude localized user-facing copy,
  translation keys, i18n resources, user content, proper names, standard names and
  external contract fields. Ignore generated files.
- Every finding must give: location, evidence, user or attack scenario, impact,
  smallest safe fix, proportional verification. Never claim checks passed without
  evidence. Do not demand abstractions, memoization, tests or dependencies without a
  concrete need.
- PR title: concise English, imperative, naming the affected behavior or domain.
  Reject WIP and vague titles ("fix", "update", "changes").
- PR description must summarize behavioral/UI changes, affected routes and
  client/server boundaries, translation and accessibility impact, security and
  data-isolation posture, performance impact, GraphQL or config contract changes and
  test evidence, separating verified facts from assumptions.

Skip generated files, snapshots, build output, coverage, storybook-static and
node_modules.

More checks are in `.github/instructions/checks-*.instructions.md`.
