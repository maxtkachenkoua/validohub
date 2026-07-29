import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');

const budgets = [
  { manifestKey: 'css', max: 360_000, label: 'main CSS bundle' },
  { manifestKey: 'js', max: 90_000, label: 'main JS bundle' },
  { path: 'assets/js/portal-tools.js', max: 18_000, label: 'global tools search JS' },
  { path: 'assets/js/portal-home.js', max: 18_000, label: 'home portal JS' },
  { path: 'assets/js/portal-countries.js', max: 40_000, label: 'countries portal JS' },
  { path: 'search-index.json', max: 2_200_000, label: 'country search index' },
  { path: 'sitemap.xml', max: 3_000_000, label: 'sitemap' }
];

async function listHtmlFiles(dir, out = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'assets') continue;
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) await listHtmlFiles(path, out);
    else if (entry.isFile() && entry.name === 'index.html') out.push(path);
  }
  return out;
}

async function fileSize(path) {
  return (await stat(resolve(siteRoot, path))).size;
}

async function readManifest() {
  return JSON.parse(await readFile(resolve(siteRoot, 'assets-manifest.json'), 'utf8'));
}

function routePathForFile(file) {
  const rel = relative(siteRoot, file).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  return `/${rel.replace(/\/index\.html$/, '/')}`;
}

async function auditManifest(manifest, failures) {
  for (const key of ['css', 'js']) {
    const asset = String(manifest[key] || '').replace(/^\/+/, '');
    if (!asset) {
      failures.push(`assets-manifest.json missing ${key}`);
      continue;
    }
    try {
      await stat(resolve(siteRoot, asset));
    } catch {
      failures.push(`assets-manifest.json points to missing ${key} asset: ${manifest[key]}`);
    }
  }
}

async function auditHtmlPages(warnings) {
  const files = await listHtmlFiles(siteRoot);
  let oversized = 0;
  for (const file of files) {
    const size = (await stat(file)).size;
    if (size > 2_500_000) {
      oversized += 1;
      if (warnings.length < 40) warnings.push(`${routePathForFile(file)} large HTML page (${size} bytes)`);
    }
  }
  if (oversized > 40) warnings.push(`...and ${oversized - 40} more large HTML pages`);
  return files.length;
}

async function main() {
  const failures = [];
  const warnings = [];
  const manifest = await readManifest();

  for (const budget of budgets) {
    try {
      const assetPath = budget.manifestKey ? String(manifest[budget.manifestKey] || '').replace(/^\/+/, '') : budget.path;
      const size = await fileSize(assetPath);
      if (size > budget.max) failures.push(`${budget.label} exceeds budget: ${size} > ${budget.max} bytes (${assetPath})`);
    } catch {
      failures.push(`${budget.label} missing: ${budget.manifestKey || budget.path}`);
    }
  }

  await auditManifest(manifest, failures);
  const pageCount = await auditHtmlPages(warnings);

  for (const warning of warnings.slice(0, 60)) console.warn(`WARN ${warning}`);
  if (failures.length) {
    console.error(`Performance budget failed on ${failures.length} issue(s):`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log(`✓ Performance budget passed for generated assets and ${pageCount} HTML page(s).`);
}

main().catch(error => {
  console.error(error.message || error);
  process.exit(1);
});
