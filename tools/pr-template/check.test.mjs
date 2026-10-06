import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { validate } from './check.mjs';

const template = readFileSync('.github/PULL_REQUEST_TEMPLATE.md', 'utf8');

const fill = (text) =>
  text
    // Give every empty "**Label:**" and "Path:"-style field a value.
    .replace(/^(\s*[-*]\s+\*\*[^*]+\*\*)\s*$/gm, '$1 filled')
    .replace(
      /^(\s*[-*]\s+(?:Path|Scenarios and assertions):)\s*$/gm,
      '$1 filled',
    )
    .replace(/^-\s*$/gm, '- None')
    .replace(/- \[ \]/g, '- [x]');

const validBody = fill(template);

test('the untouched template is rejected', () => {
  assert.notEqual(validate(template, template).length, 0);
});

test('a completed template is accepted', () => {
  assert.deepEqual(validate(template, validBody), []);
});

test('an empty body reports every missing section', () => {
  const problems = validate(template, '');
  assert.ok(problems.some((problem) => problem.includes('"## Summary"')));
  assert.ok(problems.some((problem) => problem.includes('"## Checklist"')));
});

test('an unchecked checklist item is rejected', () => {
  const body = validBody.replace('- [x]', '- [ ]');
  assert.ok(
    validate(template, body).some((problem) => problem.includes('unchecked')),
  );
});

test('a removed section is rejected', () => {
  const body = validBody.replace(/## Breaking Changes[\s\S]*$/, '');
  assert.ok(
    validate(template, body).some((problem) =>
      problem.includes('Breaking Changes'),
    ),
  );
});

test('an empty required field is rejected', () => {
  const body = validBody.replace(
    '**Why this approach:** filled',
    '**Why this approach:**',
  );
  assert.ok(
    validate(template, body).some((problem) =>
      problem.includes('Why this approach'),
    ),
  );
});

test('testing needs stories, tests, or an explanation', () => {
  const body = validBody
    .replace(
      '**Stories added or updated:** filled',
      '**Stories added or updated:**',
    )
    .replace(
      '**Story tests added or updated:** filled',
      '**Story tests added or updated:**',
    )
    .replace(/(If stories or tests were unchanged[^\n]*\*\*) filled/, '$1')
    .replace(/Path: filled/, 'Path:')
    .replace(/Scenarios and assertions: filled/, 'Scenarios and assertions:');
  assert.ok(
    validate(template, body).some((problem) =>
      problem.includes('stories or tests'),
    ),
  );
});

test('sections may be reordered only by failing', () => {
  const [head, ...rest] = validBody.split(/^(?=## )/m);
  const swapped = [head, rest[1], rest[0], ...rest.slice(2)].join('');
  assert.ok(
    validate(template, swapped).some((problem) =>
      problem.includes('out of order'),
    ),
  );
});
