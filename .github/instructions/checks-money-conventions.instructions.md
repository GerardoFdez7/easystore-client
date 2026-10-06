---
applyTo: '**/*'
excludeAgent: 'coding-agent'
---

# Check: Monetary values

Enforce docs/MONETARY-CONTRACT.md for every changed price, amount, currency or total.

Fail:

- money as a JavaScript number (state, form values, props, Number(), parseFloat(),
  toFixed(), float arithmetic);
- hand-built amounts instead of normalizeDecimal;
- hardcoded currency symbols or codes, or a default-currency constant/env variable;
- display that bypasses formatMoney or formatAmount;
- combining Money values without a matching-currency check;
- client-submitted totals, taxes or discounts.

Currency must come from the Money value or the product (or its draft). The store
currency is only the default for a new product; variants never carry their own
currency. Do not flag non-monetary numbers (quantities, percentages, dimensions).

# Check: Frontend conventions and risk-aware coverage

Enforce AGENTS.md and .agents/skills/easystore-components with their references:

- semantic component ownership and reuse;
- explicit public types;
- generated GraphQL contracts (never hand-edit generated output);
- centralized localized errors;
- React Hook Form + Zod form conventions.

Require Storybook states, tests, mocks and observable assertions only when changed
behavior or risk warrants them. Do not repeat automated checks for syntax, tokens,
naming, story presence or deterministic architecture rules. Weakening quality scripts,
exclusions, allowlists or enforcement rules is a finding unless narrowly justified.
