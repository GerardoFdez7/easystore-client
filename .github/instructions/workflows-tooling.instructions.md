---
applyTo: '.github/workflows/**,tools/architecture/**,.semgrep.yml,eslint.config.mjs,package.json'
excludeAgent: 'coding-agent'
---

## GitHub workflows

Review least-privilege permissions, untrusted pull-request input, command and
artifact/cache poisoning, secret exposure, pinned actions, timeouts and concurrency.
Preserve the quality workflow's effective review gate.

## Quality tooling and configuration

Treat these as enforcement code. Reject weakened scripts, rules, severity, coverage,
path filters, exceptions, generated-output handling or review gates. Flag bypasses
through aliases, dynamic imports or widened excludes. Require a narrow English
rationale and proportional fixture or behavior evidence for any legitimate exception.
