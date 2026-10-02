# Storybook

Create or update one story file for each reusable component affected by the change.
Mirror the component hierarchy under `stories/` and import the component through its
configured alias. Story files use `Meta` and `StoryObj` from
`@storybook/nextjs-vite`.

Document the component contract with `autodocs`, useful controls, and concise prop
descriptions. Add distinct stories only for meaningful visual or behavioral states,
such as variants, loading, empty, error, disabled, selected, overflow, and realistic
content. Avoid stories that differ only in name.

Reuse the global Apollo, authentication, next-intl, and theme decorators in
`.storybook/preview.ts`. Add a local decorator only when the component requires
additional context. Put non-trivial domain data and GraphQL mocks in a `mocks/`
folder beside the relevant story area; keep tiny one-off args inline. Keep mocks typed
with generated GraphQL types and documents.

Every exported CSF story must have executable coverage: give it an async `play`
function that uses accessible canvas queries and at least one assertion from
`storybook/test` (usually `expect`). A meta-level `play` is allowed only when its
assertion meaningfully covers every exported story inheriting it; add story-level
plays for state-specific behavior. Do not leave bare interactions without an
assertion, and do not import Jest or unrelated test APIs.

Storybook runs with `@storybook/nextjs-vite`. For Apollo Client v4 UI that makes a
network request, use MSW GraphQL handlers (`graphql.query` or `graphql.mutation`)
and `HttpResponse` under `parameters.msw.handlers`. Never use `MockedProvider`,
`MockLink`, `MockSubscriptionLink`, or Apollo testing mocks in stories or Storybook
support. Add handlers only for networked UI; document success, loading, and error
states when they are meaningful to the component. If a story reports an unhandled
request, verify the operation name, variables, endpoint, and handler scope before
changing the component.

Stories must render with semantic design tokens and pass the configured accessibility
checks. Run the architecture checker when adding stories: it reports missing play
assertions, legacy Storybook framework imports, and Apollo testing mocks.
