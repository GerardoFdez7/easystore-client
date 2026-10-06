---
applyTo: '**/*'
excludeAgent: 'coding-agent'
---

# Check: Translations and language quality

Review every changed visible or announced user-facing text: page titles and metadata,
labels, placeholders, accessible names, validation messages, notifications, and
loading, empty, error, disabled and success states.

- Require next-intl and correct values in messages/en.json, messages/es.json and
  messages/pt.json. Used keys must exist; preserve ICU variables, plurals and context;
  keep the same meaning in every locale.
- Check spelling, accents, punctuation, grammar and product terminology per locale.
  Flag copied untranslated content and semantically wrong keys.
- Do not demand mechanical JSON equality or flag identifiers, proper names, brands,
  user content or valid technical terms.

# Check: Functional accessibility

Review keyboard and screen-reader behavior across initial, loading, success, error,
empty and disabled states.

- Localized accessible names; correct label, help and error relationships.
- Focus management, restoration and traps for dialogs and transitions.
- Operable widgets; appropriate live announcements; meaningful headings, landmarks and
  tables; image alternatives; information not conveyed by color alone.
- Complement jsx-a11y, do not repeat it. Claim contrast or target-size defects only
  with evidence from the changed implementation or design tokens.
