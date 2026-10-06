---
applyTo: 'stories/**/*'
excludeAgent: 'coding-agent'
---

Treat stories as component documentation.

- Review meaningful loading, empty, error, disabled, selected and overflow states when
  relevant; accessible markup; realistic typed mocks; global decorators.
- Request additions only for changed reusable behavior or visual risk, not as a
  mechanical presence requirement.
- Each story must be meaningful and have a meaningful test (a play function with
  observable assertions). Flag stories that only render and tests that assert nothing
  useful.
