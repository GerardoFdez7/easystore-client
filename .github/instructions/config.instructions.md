---
applyTo: 'next.config.ts,proxy.ts,codegen.ts,.env.example'
excludeAgent: 'coding-agent'
---

- next.config.ts: review trusted configuration, public runtime-variable exposure,
  redirects, remote image policy, cache behavior and compatibility contracts.
- proxy.ts: review route matching, locale and authentication redirects, untrusted URL
  input, headers, cookies and cache boundaries for bypasses or loops.
- codegen.ts: review GraphQL source, output, scalar and generation contracts. Reject
  changes that hide incompatible schema or generated-type failures.
- .env.example: no secrets; document only safe public values; do not normalize exposing
  server-only settings to browser code.
