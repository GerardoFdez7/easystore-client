---
applyTo: 'app/**'
excludeAgent: 'coding-agent'
---

Review Server and Client Component boundaries: keep client code narrow, serialize only
safe data, and avoid leaking session, tenant, store or cache state across users.

Check translated metadata, navigation, loading and error behavior, landmarks and
heading order, safe redirects, localized copy, and observable loading, empty, error,
disabled and success states.
