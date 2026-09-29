import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
test('architecture checker has explicit rules and no baseline mode', () => {
  const source = readFileSync(new URL('./check.mjs', import.meta.url), 'utf8');
  assert.match(source, /ARCH-LAYER-001/);
  assert.match(source, /ARCH-STORY-001/);
  assert.doesNotMatch(source, /baseline/);
});
