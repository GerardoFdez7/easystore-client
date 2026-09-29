# Component architecture

## Placement and dependency direction

Place product components under `app/[locale]/components/<layer>/<domain>/`:

- `atoms`: smallest standalone controls or presentational elements;
- `molecules`: small combinations of atoms that form one interaction or content unit;
- `organisms`: feature sections that coordinate molecules, domain hooks, or data;
- `templates`: page-level composition and shared route layout;
- `shadcn/ui`: Shadcn/Radix primitives; `shadcn/features` holds project-level
  integrations built around those primitives.

Dependencies flow downward: templates may compose organisms, organisms may compose
molecules and atoms, and molecules may compose atoms. Do not make a lower layer
depend on a higher one. Keep `page.tsx` files thin and delegate page structure to a
template. Use a domain folder for domain-specific UI and `shared` only for genuine
cross-domain reuse.

Search the repository before creating a component. Prefer an existing EasyStore
component or Shadcn primitive over a near-duplicate. Do not edit Shadcn primitives
for feature-only behavior; wrap or compose them in the correct product layer.

## Contracts and module boundaries

- Define component prop interfaces or types under `app/[locale]/lib/types/`, grouped
  by the owning feature, and import them through `@types/*`. Keep purely internal
  implementation types local only when they are not part of a component contract.
- Preserve strict typing. Do not use `any`, non-null assertions, or handwritten
  substitutes for generated GraphQL types.
- Use configured aliases for cross-area imports. Import Shadcn modules by full path,
  such as `@shadcn/ui/button`, and Apollo React APIs from `@apollo/client/react`.
- Follow the import and naming rules enforced by `eslint.config.mjs`; the executable
  configuration is authoritative when prose and code disagree.

## Server and Client Components

Default to Server Components. Add `'use client'` only at the narrowest boundary that
needs browser APIs, state, effects, event handlers, client context, or client-only
libraries. Pass serializable data into client boundaries and avoid pulling static
layout into the client bundle.

## Design, accessibility, and localization

- Treat `DESIGN.md` and `app/[locale]/globals.css` as the visual source of truth.
  Use semantic Tailwind tokens and existing variants; do not add raw colors, inline
  styles, or arbitrary values that violate the Shadcn lint rules.
- Preserve visible focus, keyboard operation, semantic HTML, accessible names, and
  appropriate loading, empty, error, disabled, and success states.
- Put user-visible copy in `messages/en.json`, `messages/es.json`, and
  `messages/pt.json`, keeping the same key shape in every locale. Use `next-intl`
  rather than embedding translated product copy in components.
- Use `next/image` for application imagery when its optimization model applies and
  provide meaningful alternative text or an empty `alt` for decorative images.
