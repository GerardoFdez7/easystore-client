import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

// Usage: node tools/test-storybook-changed.mjs [extra vitest args]
// Runs the Storybook vitest project only for stories affected by uncommitted
// changes: changed stories, stories next to changed story mocks, and stories
// that mirror a changed component under app/[locale]/components/<layer>/.
const COMPONENTS_ROOT = 'app/[locale]/components/';
const STORIES_ROOT = 'stories/';

const git = (args) =>
  execFileSync('git', args, { encoding: 'utf8' }).split('\n').filter(Boolean);

const changed = [
  ...new Set([
    ...git(['diff', '--name-only', '--diff-filter=d', 'HEAD']),
    ...git(['ls-files', '--others', '--exclude-standard']),
  ]),
].filter(existsSync);

const stories = new Set();

const addStoriesIn = (dir) => {
  if (!existsSync(dir)) return;
  for (const file of git(['ls-files', '-co', '--exclude-standard', dir])) {
    if (/\.stories\.(js|jsx|mjs|ts|tsx)$/.test(file)) stories.add(file);
  }
};

for (const file of changed) {
  if (/\.stories\.(js|jsx|mjs|ts|tsx)$/.test(file)) {
    stories.add(file);
  } else if (file.startsWith(STORIES_ROOT)) {
    // Mocks/helpers: run every story in the directory that owns them.
    const dir = path.dirname(file).replace(/\/mocks(\/.*)?$/, '');
    addStoriesIn(dir);
  } else if (file.startsWith(COMPONENTS_ROOT) && /\.tsx?$/.test(file)) {
    const rel = file.slice(COMPONENTS_ROOT.length);
    const { dir, name } = path.parse(rel);
    const storyDir = path.join(STORIES_ROOT, dir);
    for (const ext of ['tsx', 'ts']) {
      const story = path.join(storyDir, `${name}.stories.${ext}`);
      if (existsSync(story)) stories.add(story);
    }
  }
}

const existing = [...stories].filter(existsSync);

if (existing.length === 0) {
  console.log('No affected stories found for uncommitted changes.');
  process.exit(0);
}

console.log(`Running ${existing.length} affected story file(s)...`);

const result = spawnSync(
  'npx',
  [
    'vitest',
    'run',
    '--project',
    'storybook',
    '--maxWorkers=4',
    ...process.argv.slice(2),
    ...existing,
  ],
  { stdio: 'inherit', shell: process.platform === 'win32' },
);

process.exit(result.status ?? 1);
