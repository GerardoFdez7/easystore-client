import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';

// Usage: node tools/lint-changed.mjs [--fix]
// Runs eslint and prettier over every uncommitted file (staged, unstaged, untracked).
const fix = process.argv.includes('--fix');
const EXTENSIONS = /\.(js|jsx|ts|tsx|json|css|md)$/;

const git = (args) =>
  execFileSync('git', args, { encoding: 'utf8' }).split('\n').filter(Boolean);

const files = [
  ...new Set([
    ...git(['diff', '--name-only', '--diff-filter=d', 'HEAD']),
    ...git(['ls-files', '--others', '--exclude-standard']),
  ]),
].filter(
  (file) =>
    EXTENSIONS.test(file) && !file.endsWith('generated.ts') && existsSync(file),
);

if (files.length === 0) {
  console.log('No uncommitted files to lint.');
  process.exit(0);
}

console.log(`Linting ${files.length} uncommitted file(s)...`);

const run = (args) =>
  spawnSync('npx', args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  }).status ?? 1;

const scriptFiles = files.filter((file) => /\.(js|jsx|ts|tsx)$/.test(file));
const eslintStatus = scriptFiles.length
  ? run([
      'eslint',
      '--no-warn-ignored',
      ...(fix ? ['--fix'] : []),
      ...scriptFiles,
    ])
  : 0;
const prettierStatus = run(['prettier', fix ? '--write' : '--check', ...files]);

process.exit(eslintStatus || prettierStatus);
