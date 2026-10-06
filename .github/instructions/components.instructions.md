---
applyTo: 'app/**/components/**'
excludeAgent: 'coding-agent'
---

Enforce the atoms, molecules, organisms, templates and shadcn ownership model.

- Preserve downward composition; search for existing components before introducing
  duplicates.
- Keep public props explicitly typed in the appropriate type boundary.
- Keep hooks, forms, accessibility, localized copy and UI state ownership semantically
  cohesive.
- Do not duplicate deterministic lint or architecture rules.
