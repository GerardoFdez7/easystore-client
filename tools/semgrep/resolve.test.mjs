import assert from 'node:assert/strict';
import test from 'node:test';
import { candidatePaths, shouldInstallSemgrep } from './resolve.mjs';
test('resolves spaced PATH, pipx, and python user base on Linux/macOS', () => {
  for (const platform of ['linux', 'darwin']) {
    const paths = candidatePaths({
      path: '/tmp/with spaces',
      pipxBinDir: '/tmp/pipx bin',
      userBase: '/tmp/python base',
      platform,
    });
    assert.ok(paths.includes('/tmp/with spaces/semgrep'));
    assert.ok(paths.includes('/tmp/pipx bin/semgrep'));
    assert.ok(paths.includes('/tmp/python base/bin/semgrep'));
  }
});
test('postinstall only runs in development, outside CI', () => {
  const dev = { NODE_ENV: 'development' };
  assert.equal(shouldInstallSemgrep(dev), true);
  assert.equal(shouldInstallSemgrep({}), false);
  assert.equal(shouldInstallSemgrep({ NODE_ENV: 'production' }), false);
  assert.equal(shouldInstallSemgrep({ ...dev, CI: 'true' }), false);
  assert.equal(
    shouldInstallSemgrep({ ...dev, npm_config_production: 'true' }),
    false,
  );
  assert.equal(
    shouldInstallSemgrep({ ...dev, npm_config_omit: 'optional,dev' }),
    false,
  );
});
