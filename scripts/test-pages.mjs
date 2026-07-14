import { readFile, readdir, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { buildRouteRegistry } from './route-registry.mjs';

const execAsync = promisify(exec);
const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function getFileHash(filePath) {
  const content = await readFile(filePath);
  return createHash('sha256').update(content).digest('hex');
}

async function scanFolderHtmlFiles(dir) {
  const results = [];
  const list = await readdir(dir, { withFileTypes: true });
  for (const item of list) {
    const res = resolve(dir, item.name);
    if (item.isDirectory()) {
      results.push(...(await scanFolderHtmlFiles(res)));
    } else if (item.isFile() && item.name === 'index.html') {
      results.push(res);
    }
  }
  return results;
}

async function runDeterminismCheck() {
  console.log('\n--------------------------------------------');
  console.log('Verifying Build Determinism...');
  console.log('--------------------------------------------');

  const build1Dir = resolve(projectRoot, 'generated', 'validohub-build1');

  // Copy build output to build1Dir
  await execAsync(`rm -rf "${build1Dir}" && cp -R "${siteRoot}" "${build1Dir}"`);

  // Run the second build compilation
  console.log('Running second build pass...');
  await execAsync('node scripts/build-all.mjs', { cwd: projectRoot });

  // Compare files
  const htmlFiles = await scanFolderHtmlFiles(siteRoot);
  let checkedCount = 0;

  for (const file of htmlFiles) {
    const relativePath = file.replace(siteRoot, '');
    const file1 = resolve(build1Dir, relativePath.replace(/^\//, ''));

    if (!(await pathExists(file1))) {
      throw new Error(`Determinism failed: File ${relativePath} missing in first build`);
    }

    const hash1 = await getFileHash(file1);
    const hash2 = await getFileHash(file);

    if (hash1 !== hash2) {
      throw new Error(`Determinism failed: File ${relativePath} changed between builds!`);
    }
    checkedCount++;
  }

  // Compare assets
  const cssFiles = (await readdir(resolve(siteRoot, 'assets', 'css'))).filter(f => f.startsWith('bundle.'));
  const jsFiles = (await readdir(resolve(siteRoot, 'assets', 'js'))).filter(f => f.startsWith('bundle.'));

  for (const file of cssFiles) {
    const path1 = resolve(build1Dir, 'assets', 'css', file);
    const path2 = resolve(siteRoot, 'assets', 'css', file);
    if (!(await pathExists(path1))) throw new Error(`CSS bundle missing in build 1: ${file}`);
    if ((await getFileHash(path1)) !== (await getFileHash(path2))) {
      throw new Error(`CSS bundle hash mismatch between builds: ${file}`);
    }
    checkedCount++;
  }

  for (const file of jsFiles) {
    const path1 = resolve(build1Dir, 'assets', 'js', file);
    const path2 = resolve(siteRoot, 'assets', 'js', file);
    if (!(await pathExists(path1))) throw new Error(`JS bundle missing in build 1: ${file}`);
    if ((await getFileHash(path1)) !== (await getFileHash(path2))) {
      throw new Error(`JS bundle hash mismatch between builds: ${file}`);
    }
    checkedCount++;
  }

  // Clean up temp directory
  await execAsync(`rm -rf "${build1Dir}"`);

  console.log(`✓ OK: Deterministic byte-for-byte check passed across ${checkedCount} compiled resources!`);
}

async function main() {
  console.log('=== STARTING VALIDO-HUB INTEGRATION VERIFICATIONS ===');

  const routeRegistry = await buildRouteRegistry();

  // Test Country routes contents
  const countryRoutes = [
    { path: '/en/poland/', name: 'Poland', expectedSpecs: ['PESEL', 'NIP', 'REGON'], expectedWorkbench: '/en/poland/pesel-validator/' },
    { path: '/en/brazil/', name: 'Brazil', expectedSpecs: ['CPF', 'CNPJ'], expectedWorkbench: '/en/brazil/brazil-pix-validator/' },
    { path: '/en/germany/', name: 'Germany', expectedSpecs: ['Steuer-IdNr'], expectedWorkbench: null }
  ];

  for (const r of countryRoutes) {
    console.log(`\nTesting Country Route: ${r.path}`);
    const filePath = resolve(siteRoot, r.path.replace(/^\//, ''), 'index.html');
    
    if (!(await pathExists(filePath))) {
      throw new Error(`FATAL: Country page is missing at path "${filePath}"`);
    }

    const content = await readFile(filePath, 'utf8');

    // Breadcrumbs check
    if (!content.includes('href="/en/"') || !content.includes('href="/en/countries/"')) {
      throw new Error(`FATAL: Breadcrumbs navigation check failed for country ${r.name}`);
    }

    // Active nav check
    if (!content.includes('href="/en/countries/" aria-current="page" class="is-active"')) {
      throw new Error(`FATAL: Active navigation highlight is incorrect in route ${r.path}`);
    }

    // Single stylesheet asset check
    const cssMatches = content.match(/<link rel="stylesheet"[^>]+>/g);
    if (!cssMatches || cssMatches.length > 1) {
      throw new Error(`FATAL: Expected exactly one stylesheet link, found: ${cssMatches ? cssMatches.length : 0}`);
    }

    // No JavaScript tags checks
    if (content.includes('<script src=')) {
      throw new Error(`FATAL: Country page must load no JS libraries unless required!`);
    }

    // Content Specifications check
    for (const spec of r.expectedSpecs) {
      if (!content.includes(spec)) {
        throw new Error(`FATAL: Country page ${r.name} does not link to expected identifier: ${spec}`);
      }
    }

    // Validator check
    if (r.expectedWorkbench) {
      if (!content.includes(r.expectedWorkbench)) {
        throw new Error(`FATAL: Country page ${r.name} does not link to expected validator: ${r.expectedWorkbench}`);
      }
    } else {
      // Germany must have no validator links and no empty sections
      if (/href="\/en\/germany\/[a-z0-9-]*validator\/"/.test(content)) {
        throw new Error(`FATAL: Germany page incorrectly contains validator section link elements`);
      }
    }

    console.log(`✓ OK: Country validations passed for ${r.name}`);
  }

  // Test Identifier routes details
  const identifierRoutes = [
    { path: '/en/identifiers/pesel/', name: 'PESEL', countryCode: 'PL', category: 'Polish Personal Identifier' },
    { path: '/en/identifiers/nip/', name: 'NIP', countryCode: 'PL', category: 'Polish Tax Identification Number' },
    { path: '/en/identifiers/regon/', name: 'REGON', countryCode: 'PL', category: 'Polish Business Statistical Registry Number' },
    { path: '/en/identifiers/cpf/', name: 'CPF', countryCode: 'BR', category: 'Brazilian Natural Persons Register' },
    { path: '/en/identifiers/cnpj/', name: 'CNPJ', countryCode: 'BR', category: 'Brazilian National Registry of Legal Entities' },
    { path: '/en/identifiers/steuer-id/', name: 'Steuer-IdNr', countryCode: 'DE', category: 'German Personal Tax Identification Number' }
  ];

  for (const r of identifierRoutes) {
    console.log(`\nTesting Identifier Route: ${r.path}`);
    const filePath = resolve(siteRoot, r.path.replace(/^\//, ''), 'index.html');
    
    if (!(await pathExists(filePath))) {
      throw new Error(`FATAL: Identifier spec page is missing at path "${filePath}"`);
    }

    const content = await readFile(filePath, 'utf8');

    // Breadcrumbs check
    if (!content.includes(`href="/en/countries/"`)) {
      throw new Error(`FATAL: Breadcrumbs missing countries hub link in ${r.name}`);
    }

    // Active nav check
    if (!content.includes('href="/en/categories/national-identifiers/" aria-current="page" class="is-active"')) {
      throw new Error(`FATAL: Active navigation highlight is incorrect in route ${r.path}`);
    }

    // Country name and ISO mapping format checks (Metadata isolation check)
    const expectedLabel = `${r.countryCode === 'PL' ? 'Poland' : r.countryCode === 'BR' ? 'Brazil' : 'Germany'} (${r.countryCode})`;
    if (!content.includes(expectedLabel)) {
      throw new Error(`FATAL: Duplicate country metadata label check failed for ${r.name}. Expected "${expectedLabel}"`);
    }

    // Semantic category label checks
    if (!content.includes(r.category)) {
      throw new Error(`FATAL: Category label check failed for ${r.name}. Expected "${r.category}"`);
    }

    // Component-scoped selectors checks
    if (content.includes('id="vh-snippet-copy-btn"') || content.includes('id="vh-code-block-content"')) {
      throw new Error(`FATAL: Scoped JavaScript violation: page contains deprecated global snippet IDs`);
    }

    // Verify copy button class exists
    if (!content.includes('class="vh-copy-button"')) {
      throw new Error(`FATAL: Accessible copy button trigger is missing in route ${r.path}`);
    }

    console.log(`✓ OK: Identifier validations passed for ${r.name}`);
  }

  // Run final determinism check
  await runDeterminismCheck();

  console.log('\n============================================');
  console.log('🎉 ALL INTEGRATION VALIDATIONS PASSED SUCCESSFULLY!');
  console.log('============================================');
}

main().catch(err => {
  console.error('\n!!! TEST SUITE FAILED !!!');
  console.error(err.message || err);
  process.exit(1);
});
