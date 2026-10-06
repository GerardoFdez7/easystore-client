---
applyTo: '**/*'
excludeAgent: 'coding-agent'
---

# Check: Client security and privacy boundaries

Trace changed untrusted data through HTML/Markdown rendering, URLs, navigation and
redirects, uploads, serialized props, responses, Apollo cache, logs, telemetry and
errors.

- Flag concrete XSS, open redirect, unsafe URL, secret or PII exposure, client-trusted
  identity/permission/tenant/store decisions, cross-session or cross-store cache
  leakage, and repeatable destructive action hazards.
- UI permissions are not authorization: require proportional evidence that the server
  enforces trust boundaries.
- State source, sink, attack scenario, impact and smallest mitigation. Do not invent
  risks without a reachable path.

# Check: Performance and data behavior

Flag only evidenced issues: unnecessary client boundaries, browser-only work or heavy
dependencies in critical paths, request waterfalls, duplicate requests, N+1 or
overfetched GraphQL, missing limits or pagination, unsafe Apollo cache policy,
expensive rerenders, uncleared effects, image loading or CLS regressions. Describe the
scenario and cost. Do not require memoization, abstraction or dependency changes by
default.

# Check: Optimistic mutation behavior

Review optimistic UI only for changed mutations where visible latency clearly harms UX
and the result is safe to anticipate. Do not require it for every mutation, nor for
destructive, privileged or uncertain-outcome actions, nor where confirmation matters.

When used, require:

- a complete typed optimisticResponse consistent with the mutation result;
- stable temporary identity and Apollo cache keys;
- an update/cache policy that reconciles with the server result without duplicates,
  stale data or flicker, tolerating both optimistic and confirmed runs, concurrent
  mutations, retries and out-of-order responses;
- no double submission;
- rollback or reconciliation through the centralized error path;
- localized, accessible pending, error and success feedback.

Client anticipation must never assume authorization. Report an omission only with a
concrete latency and safety rationale.
