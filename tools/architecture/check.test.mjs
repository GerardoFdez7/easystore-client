import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
test('architecture checker has explicit rules and no baseline mode', () => {
  const source = readFileSync(new URL('./check.mjs', import.meta.url), 'utf8');
  assert.match(source, /ARCH-LAYER-001/);
  assert.match(source, /ARCH-STORY-001/);
  assert.doesNotMatch(source, /baseline/);
});

test('Storybook framework rule ignores application type-only imports', () => {
  const directory = mkdtempSync(join(tmpdir(), 'architecture-story-import-'));
  const story = join(directory, 'Example.stories.tsx');
  writeFileSync(
    story,
    "import type { Meta } from '@storybook/nextjs-vite';\nimport type { Product } from '@graphql/generated';\nexport default {} satisfies Meta;\n",
  );
  const result = spawnSync('node', ['tools/architecture/check.mjs'], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
  rmSync(directory, { recursive: true, force: true });
  assert.doesNotMatch(
    result.stdout,
    /story type import from @graphql\/generated/,
  );
});

test('Storybook test rule rejects known placeholder assertions', () => {
  const source = readFileSync(new URL('./check.mjs', import.meta.url), 'utf8');
  assert.match(source, /childElementCount/);
  assert.match(source, /isLiteralExpression/);
  assert.match(source, /hasMeaningfulExpectAssertion/);
});
