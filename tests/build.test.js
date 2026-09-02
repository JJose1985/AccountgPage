const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');

const execFileAsync = promisify(execFile);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

test('build copies the static site assets to dist', async () => {
  await execFileAsync('node', ['scripts/build.js'], { cwd: rootDir });

  const builtIndex = await fs.readFile(path.join(distDir, 'index.html'), 'utf8');
  const builtStyles = await fs.readFile(path.join(distDir, 'styles.css'), 'utf8');

  assert.match(builtIndex, /Accounting process in five practical steps/);
  assert.match(builtStyles, /\.card \{/);
});
