# Data, hooks, forms, and errors

## Hooks and state ownership

Keep rendering and reusable presentation in components; extract reusable stateful or
data behavior into hooks:

- `app/[locale]/hooks/domains/<domain>/` owns business and GraphQL behavior for one
  domain;
- `app/[locale]/hooks/utils/` owns domain-agnostic utilities;
- `app/[locale]/hooks/media/` owns media-specific behavior;
- `app/[locale]/lib/contexts/` is for state genuinely shared across a broad subtree.

Search existing hooks before creating another abstraction. In particular, reuse or
extend `useDebounce.ts` for delayed values, `useInfiniteScroll.ts` for paginated
Apollo lists when their contracts fit and `useMobile.ts` for mobile queries. Do not copy their logic into a component or a
new domain hook. Keep hook public types explicit and locate broadly shared domain
types under `app/[locale]/lib/types/`.

## GraphQL and Apollo

- Define operations by domain in `server/graphql/domains/**/*.gql`.
- Use named operations, request only fields the UI needs, and reuse established
  fragments or operations when available.
- Run `npm run gql` after operation changes and consume documents and types from
  `@graphql/generated`. Never edit `server/graphql/generated.ts` manually.
- Import React hooks from `@apollo/client/react`. Keep query/mutation orchestration in
  the owning domain hook unless a Server Component is deliberately responsible for
  the data path.
- Represent loading, empty, error, pagination, refetch, and success states explicitly
  where they are observable. Follow the `apollo-client` skill for cache policy,
  optimistic updates, mutation updates, or non-trivial pagination.

## Forms

Use React Hook Form and Zod for client-side forms, following their installed skills.
Keep schemas and inferred form types single-sourced, avoid mirroring form state in
component state, and map server outcomes without bypassing centralized GraphQL error
handling.

## Centralized errors

Apollo errors flow through `app/[locale]/lib/apollo/link.ts` into
`server/errors/error.handler.ts` and the priority-based registry in
`server/errors/error-registry.ts`. Do not add component-level generic toasts for the
same GraphQL failure.

When a new backend error needs product-specific handling:

1. add a precise matcher and localized handler to the registry;
2. choose the priority range defined in `server/errors/error.types.ts`, keeping
   specific handlers ahead of fallbacks;
3. add every message key to `messages/en.json`, `messages/es.json`, and
   `messages/pt.json`;
4. update the registry tests and use the `test-errors:*` scripts, including
   `npm run test-errors:conflicts` when matcher overlap is possible.

Expose raw backend detail only in the registry's development behavior. Production UI
must remain localized and user-safe.
