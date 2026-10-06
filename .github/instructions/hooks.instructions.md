---
applyTo: 'app/**/hooks/**'
excludeAgent: 'coding-agent'
---

Keep domain GraphQL behavior in domain hooks; make utilities reusable only when their
contract is genuinely shared.

Check hook dependencies, cleanup, stale session/store data, cancellation where needed,
public types and form ownership. Do not request a new abstraction without evidence of
meaningful duplication.
