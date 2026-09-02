const fs = require('node:fs/promises');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const filesToCopy = ['index.html', 'styles.css'];

async function build() {
  await fs.rm(distDir, { recursive: true, force: true });
  await fs.mkdir(distDir, { recursive: true });

  await Promise.all(
    filesToCopy.map((file) =>
      fs.copyFile(path.join(rootDir, file), path.join(distDir, file)),
    ),
  );
}

build().catch((error) => {
  console.error('Build failed:', error);
  process.exitCode = 1;
});
