---
applyTo: 'app/**/lib/**'
excludeAgent: 'coding-agent'
---

Review public types, contexts, Apollo boundaries, utilities and services for safe
serialization, client-only assumptions, cache/session-store isolation, localized error
handling and narrowly scoped reusable contracts.

## lib/utils/money.ts

This is the single home of money helpers. Verify exact decimal-string handling with no
float round trip, 2-decimal scale, canonical normalization, and Intl-based display
consistent with docs/MONETARY-CONTRACT.md. Require executable evidence (tests) for
changed rounding, normalization or formatting behavior.
