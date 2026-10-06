---
name: easystore-components
description: Build, refactor, review, or document EasyStore frontend components and their hooks, GraphQL data flow, localized errors, and Storybook stories. Use for UI work in easystore-client; use generic component skills alone outside this repository.
---

# EasyStore Components

Apply EasyStore's repository-specific frontend conventions without duplicating the
generic guidance already provided by specialist skills.

## Start here

1. Inspect the affected route, neighboring components, existing hooks, types,
   stories, and tests before choosing ownership or creating files.
2. Read `DESIGN.md` for any UI or styling change.
3. Before writing Next.js code, read the relevant version-matched guide under
   `node_modules/next/dist/docs/`.
4. Load only the references below that match the task; use `npm run verify` as the
   single final verification gate.

## Route the work

- For component placement, props, composition, imports, localization, styling, or
  Server/Client boundaries, read
  [references/component-architecture.md](references/component-architecture.md).
- For hooks, GraphQL operations, Apollo usage, forms, and centralized errors, read
  [references/data-and-errors.md](references/data-and-errors.md).
- For prices, currencies, or any money value, read
  [docs/MONETARY-CONTRACT.md](../../../docs/MONETARY-CONTRACT.md).
- For reusable-component documentation, executable interactions, and network
  fixtures, read [references/storybook.md](references/storybook.md).
- Before handing off an implementation, read
  [references/verification.md](references/verification.md).

Use the installed specialist skill when its concern is material:

- `building-components` for accessible, composable component APIs;
- `shadcn` for finding, adding, or modifying Shadcn UI;
- `vercel-react-best-practices` for React/Next.js performance work;
- `apollo-client` for Apollo cache, query, and mutation behavior;
- `react-hook-form` and `zod` for forms and validation;
- `web-design-guidelines` when the component requires accessibility.

## Completion contract

A complete change owns the full affected path: correct atomic placement, typed public
props, semantic design tokens, localized visible copy, reused or correctly placed
hooks, generated GraphQL contracts, centralized error behavior, representative
Storybook states for reusable UI, and proportionate executable verification. Do not
add artifacts that the change does not need.
