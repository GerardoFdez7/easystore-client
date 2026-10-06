---
applyTo: 'server/graphql/domains/**/*.gql,server/errors/**'
excludeAgent: 'coding-agent'
---

## GraphQL operations (\*.gql)

Require named operations, minimal selections, typed variables, bounded limits and
pagination where collections are exposed, and UI, Apollo-cache and generated-contract
compatibility. Do not duplicate GraphQL lint findings or request manual edits to
generated output.

## Error handling (server/errors/\*\*)

Preserve priority-based classification, localized recovery and safe error masking.
Fail raw backend internals, credentials, tokens, PII, variables or sensitive response
data reaching the UI, logs, telemetry or user-facing messages.
