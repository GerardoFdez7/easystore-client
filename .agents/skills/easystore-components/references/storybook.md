# Storybook

Create or update one story file for each reusable component affected by the change.
Mirror the component hierarchy under `stories/` and import the component through its
configured alias. Story files use `Meta` and `StoryObj` from `@storybook/nextjs` and
remain documentation artifacts; do not import Cypress, Jest, or other test APIs.

Document the component contract with `autodocs`, useful controls, and concise prop
descriptions. Add distinct stories only for meaningful visual or behavioral states,
such as variants, loading, empty, error, disabled, selected, overflow, and realistic
content. Avoid stories that differ only in name.

Reuse the global Apollo, authentication, next-intl, and theme decorators in
`.storybook/preview.ts`. Add a local decorator only when the component requires
additional context. Put non-trivial domain data and GraphQL mocks in a `mocks/`
folder beside the relevant story area; keep tiny one-off args inline. Keep mocks typed
with generated GraphQL types and documents.

Stories must render with semantic design tokens and pass the configured accessibility
checks. Storybook demonstrates states; Cypress owns executable interaction and route
behavior assertions.
