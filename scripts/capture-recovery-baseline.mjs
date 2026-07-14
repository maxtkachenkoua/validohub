import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');
const baselineDir = resolve(projectRoot, 'tests', 'visual', 'baselines');
const snapshotDir = resolve(baselineDir, 'snapshots');

const TARGET_PAGES = [
  'en/countries/index.html',
  'en/poland/index.html',
  'en/brazil/index.html',
  'en/germany/index.html',
  'en/spain/index.html',
  'en/identifiers/pesel/index.html',
  'en/identifiers/nip/index.html',
  'en/identifiers/regon/index.html',
  'en/identifiers/cpf/index.html',
  'en/identifiers/cnpj/index.html',
  'en/identifiers/steuer-id/index.html'
];

async function computeFileStats(filePath) {
  const content = await readFile(filePath);
  const size = Buffer.byteLength(content);
  const hash = createHash('sha256').update(content).digest('hex');
  return { size, hash };
}

async function main() {
  console.log('=== CREATING RECOVERY BASELINE SNAPSHOTS ===');
  await mkdir(snapshotDir, { recursive: true });

  const manifest = {};

  for (const page of TARGET_PAGES) {
    const srcPath = resolve(siteRoot, page);
    const destPath = resolve(snapshotDir, page.replace(/\//g, '_'));

    try {
      const { size, hash } = await computeFileStats(srcPath);
      await copyFile(srcPath, destPath);

      manifest[page] = {
        size,
        hash,
        snapshotFile: destPath.replace(projectRoot, '')
      };
      console.log(`✓ Snapshotted ${page} (${size} bytes, hash: ${hash.substring(0, 8)})`);
    } catch (err) {
      console.error(`❌ Failed to process ${page}: ${err.message}`);
    }
  }

  const manifestPath = resolve(baselineDir, 'current-sizes.json');
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`✓ Manifest written to ${manifestPath}`);
}

main();
