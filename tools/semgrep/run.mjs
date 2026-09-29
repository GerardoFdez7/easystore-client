import { mkdtempSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { delimiter, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { candidatePaths } from './resolve.mjs';

// Semgrep's CLI persists settings and logs even for a local, offline scan.
// Keep those writes isolated to a disposable temporary directory so verify is
// usable in read-only home directories and cannot modify the worktree.
const dir = mkdtempSync(join(tmpdir(), 'easystore-semgrep-'));
const settings = join(dir, 'settings.yml');
writeFileSync(
  settings,
  'has_shown_metrics_notification: true\nanonymous_user_id: 00000000-0000-4000-8000-000000000000\n',
);
for (const name of ['cache', 'config', 'data']) mkdirSync(join(dir, name));

const env = {
  ...process.env,
  SEMGREP_SETTINGS_FILE: settings,
  SEMGREP_LOG_FILE: join(dir, 'semgrep.log'),
  SEMGREP_SEND_METRICS: 'off',
  SEMGREP_ENABLE_VERSION_CHECK: '0',
  XDG_CACHE_HOME: join(dir, 'cache'),
  XDG_CONFIG_HOME: join(dir, 'config'),
  XDG_DATA_HOME: join(dir, 'data'),
};

const probe = (command, args) =>
  spawnSync(command, args, { env, stdio: 'ignore', encoding: 'utf8' });
const candidates = candidatePaths({ path: process.env.PATH });
const pipxDir = spawnSync('pipx', ['environment', '--value', 'PIPX_BIN_DIR'], {
  env,
  stdio: 'pipe',
  encoding: 'utf8',
});
if (pipxDir.status === 0)
  candidates.push(join(pipxDir.stdout.trim(), 'semgrep'));
for (const python of ['python3', 'python']) {
  const base = spawnSync(python, ['-m', 'site', '--user-base'], {
    env,
    stdio: 'pipe',
    encoding: 'utf8',
  });
  if (base.status === 0)
    candidates.push(join(base.stdout.trim(), 'bin', 'semgrep'));
}
const executable = candidates.find(
  (candidate) => probe(candidate, ['--version']).status === 0,
);
if (!executable)
  throw new Error(
    'Semgrep is not available. Run `npm run install:semgrep` or provide it on PATH.',
  );
try {
  const result = spawnSync(executable, process.argv.slice(2), {
    env,
    stdio: 'inherit',
  });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} finally {
  rmSync(dir, { recursive: true, force: true });
}
