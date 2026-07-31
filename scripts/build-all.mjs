import { spawn } from 'node:child_process';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile, writeFile, readdir, rm, access, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { buildRouteRegistry } from './route-registry.mjs';
import { compileCountriesPortal, compileHomePortal, compileToolsPortal } from './build-countries-portal.mjs';
import { compileIdentifiers } from './build-identifiers.mjs';
import { applyFinalLocalizationPass } from './localization-pass.mjs';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');
const locale = 'en';

function parseBuildCliOptions(argv) {
  const timeoutOption = argv.indexOf('--timeout-minutes');
  const progressOption = argv.indexOf('--progress-seconds');
  const timeoutMinutes = timeoutOption >= 0 ? Number(argv[timeoutOption + 1]) : Number(process.env.VALIDOHUB_FULL_BUILD_TIMEOUT_MINUTES || 180);
  const progressSeconds = progressOption >= 0 ? Number(argv[progressOption + 1]) : Number(process.env.VALIDOHUB_BUILD_PROGRESS_SECONDS || 60);
  return {
    timeoutMs: argv.includes('--no-timeout') ? 0 : Math.max(0, Number.isFinite(timeoutMinutes) ? timeoutMinutes : 180) * 60 * 1000,
    progressMs: Math.max(10, Number.isFinite(progressSeconds) ? progressSeconds : 60) * 1000
  };
}

const buildCliOptions = parseBuildCliOptions(process.argv.slice(2));

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes === 0) return `${seconds}s`;
  return `${minutes}m ${seconds}s`;
}

async function runBuildPhase(label, action) {
  const startedAt = Date.now();
  console.log(`\n[phase] ${label}...`);
  try {
    const result = await action();
    console.log(`[phase] ${label} done in ${formatDuration(Date.now() - startedAt)}.`);
    return result;
  } catch (error) {
    console.error(`[phase] ${label} failed after ${formatDuration(Date.now() - startedAt)}.`);
    throw error;
  }
}

async function runCommand(command, cwd) {
  console.log(`Running: ${command} in ${cwd}`);
  const startedAt = Date.now();
  let lastOutputAt = startedAt;

  await new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(command, {
      cwd,
      shell: true,
      stdio: ['ignore', 'pipe', 'pipe']
    });

    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const silent = Date.now() - lastOutputAt;
      console.log(`[build] Still running after ${formatDuration(elapsed)}; no output for ${formatDuration(silent)}.`);
    }, buildCliOptions.progressMs);

    const timeoutTimer = buildCliOptions.timeoutMs > 0 ? setTimeout(() => {
      const elapsed = Date.now() - startedAt;
      console.error(`[build] Command exceeded ${formatDuration(buildCliOptions.timeoutMs)} after ${formatDuration(elapsed)}. Sending SIGINT.`);
      child.kill('SIGINT');
      setTimeout(() => {
        if (!child.killed) child.kill('SIGKILL');
      }, 15_000);
    }, buildCliOptions.timeoutMs) : null;

    child.stdout.on('data', chunk => {
      lastOutputAt = Date.now();
      process.stdout.write(chunk);
    });
    child.stderr.on('data', chunk => {
      lastOutputAt = Date.now();
      process.stderr.write(chunk);
    });
    child.on('error', error => {
      clearInterval(progressTimer);
      if (timeoutTimer) clearTimeout(timeoutTimer);
      rejectPromise(error);
    });
    child.on('close', (code, signal) => {
      clearInterval(progressTimer);
      if (timeoutTimer) clearTimeout(timeoutTimer);
      if (code === 0) {
        resolvePromise();
        return;
      }
      rejectPromise(new Error(`Command failed (${command}) with code ${code ?? 'null'}${signal ? ` and signal ${signal}` : ''}`));
    });
  });
}

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function buildConcurrency(defaultValue = 32) {
  const parsed = Number(process.env.VALIDOHUB_BUILD_CONCURRENCY || defaultValue);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : defaultValue;
}

async function runWithConcurrency(items, worker, concurrency = buildConcurrency()) {
  for (let index = 0; index < items.length; index += concurrency) {
    await Promise.all(items.slice(index, index + concurrency).map(worker));
  }
}

// 1. Build and fingerprinted assets compiler
async function compileAssets() {
  const cssSourceFiles = [
    'variables.css',
    'reset.css',
    'base.css',
    'typography.css',
    'layout.css',
    'components.css',
    'country.css',
    'countries-portal.css',
    'workbench.css',
    'tables.css',
    'code.css',
    'accordion.css',
    'graph.css',
    'utilities.css',
    'validohub.css'
  ];

  // Concatenate CSS
  let cssContent = '';
  for (const filename of cssSourceFiles) {
    const filePath = resolve(projectRoot, 'assets', 'css', filename);
    const content = await readFile(filePath, 'utf8');
    // Strip native browser @import statements
    const cleanContent = content.replace(/@import\s+[^;]+;/g, '');
    cssContent += `/* --- ${filename} --- */\n${cleanContent}\n`;
  }

  // Read JS bundle
  const jsSourcePath = resolve(projectRoot, 'assets', 'js', 'bundle.js');
  const jsContent = await readFile(jsSourcePath, 'utf8');

  // Compute 6-character SHA-256 hashes
  const cssHash = createHash('sha256').update(cssContent).digest('hex').substring(0, 6);
  const jsHash = createHash('sha256').update(jsContent).digest('hex').substring(0, 6);

  const srcCssDir = resolve(projectRoot, 'assets', 'css');
  const srcJsDir = resolve(projectRoot, 'assets', 'js');
  const destCssDir = resolve(siteRoot, 'assets', 'css');
  const destJsDir = resolve(siteRoot, 'assets', 'js');

  // Write new hashed assets to generated output only (NOT back to source assets/)
  const cssFileName = `bundle.${cssHash}.css`;
  const jsFileName = `bundle.${jsHash}.js`;

  await mkdir(destCssDir, { recursive: true });
  await mkdir(destJsDir, { recursive: true });

  // Write hashed CSS to source assets/css/ so the Java publisher picks it up via siteAssetPaths()
  // Write hashed JS only to generated output (Java publisher excludes js/bundle.js from copy)
  await writeFile(resolve(srcCssDir, cssFileName), cssContent, 'utf8');
  await writeFile(resolve(destCssDir, cssFileName), cssContent, 'utf8');
  await writeFile(resolve(destJsDir, jsFileName), jsContent, 'utf8');

  for (const file of ['portal-home.js', 'portal-tools.js', 'countries-portal.js', 'countries.js', 'brand-assets.js']) {
    const source = resolve(srcJsDir, file);
    if (await pathExists(source)) {
      const content = await readFile(source, 'utf8');
      await writeFile(resolve(destJsDir, file), content, 'utf8');
    }
  }

  const manifest = {
    css: `/assets/css/${cssFileName}`,
    js: `/assets/js/${jsFileName}`
  };

  // Keep source and generated manifests in sync so every pipeline stage reads the same bundle hashes.
  await writeFile(resolve(projectRoot, 'assets', 'assets-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
  await writeFile(resolve(siteRoot, 'assets-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

  console.log(`✓ Compiled CSS bundle: ${manifest.css}`);
  console.log(`✓ Compiled JS bundle: ${manifest.js}`);
  return manifest;
}



const TOOL_SCRIPT_BY_ALGORITHM = {
  // BEGIN global premium batch v4 scripts
  'validohub.oauth-oidc-flow': 'generic-suite.js',
  'validohub.jwt-risk-scanner': 'generic-suite.js',
  'validohub.jwks-rotation': 'generic-suite.js',
  'validohub.openapi-breaking-diff': 'generic-suite.js',
  'validohub.json-patch-builder': 'generic-suite.js',
  'validohub.json-merge-patch-builder': 'generic-suite.js',
  'validohub.rest-pagination-contract': 'generic-suite.js',
  'validohub.api-error-catalog': 'generic-suite.js',
  'validohub.webhook-replay-payload': 'generic-suite.js',
  'validohub.idempotency-collision-lab': 'generic-suite.js',
  'validohub.robots-txt-tester': 'generic-suite.js',
  'validohub.xml-sitemap-inspector': 'generic-suite.js',
  'validohub.canonical-hreflang-auditor': 'generic-suite.js',
  'validohub.search-snippet-preview': 'generic-suite.js',
  'validohub.structured-data-jsonld': 'generic-suite.js',
  'validohub.csv-schema-inferencer': 'generic-suite.js',
  'validohub.duplicate-row-detector': 'generic-suite.js',
  'validohub.unicode-confusable-scanner': 'generic-suite.js',
  'validohub.locale-number-parser': 'generic-suite.js',
  'validohub.locale-date-parser': 'generic-suite.js',
  'validohub.luhn-card-fixture-generator': 'generic-suite.js',
  'validohub.bin-iin-shape-inspector': 'generic-suite.js',
  'validohub.currency-minor-units': 'generic-suite.js',
  'validohub.sepa-pain001-fixture': 'generic-suite.js',
  'validohub.payment-reference-generator': 'generic-suite.js',
  'validohub.password-policy-tester': 'generic-suite.js',
  'validohub.csp-nonce-hash-helper': 'generic-suite.js',
  'validohub.cookie-samesite-lab': 'generic-suite.js',
  'validohub.email-header-auth-inspector': 'generic-suite.js',
  'validohub.log-redaction-rule-tester': 'generic-suite.js',
  // END global premium batch v4 scripts
  'validohub.pesel': ['pesel.js', 'gold-tools-lab.js'],
  'validohub.brazil-pix': ['pix.js'],
  'validohub.brazil-tax-id': ['brazil-tax-id.js'],
  'validohub.brazil-suite': ['country-legacy-rich-layer.js', 'brazil-suite.js', 'gold-tools-lab.js'],
  'validohub.spain-id': ['spain-id.js'],
  'validohub.spain-suite': ['country-suite-factory.js', 'spain-suite.js', 'gold-tools-lab.js'],
  'validohub.poland-suite': ['country-legacy-rich-layer.js', 'poland-suite.js'],
  'validohub.poland-expansion': 'poland-expansion.js',
  'validohub.poland-baseline': 'poland-baseline.js',
  'validohub.france-suite': ['country-legacy-rich-layer.js', 'france-suite.js', 'gold-tools-lab.js'],
  'validohub.netherlands-suite': ['country-legacy-rich-layer.js', 'netherlands-suite.js', 'gold-tools-lab.js'],
  'validohub.switzerland-suite': ['country-suite-factory.js', 'switzerland-suite.js', 'gold-tools-lab.js'],
  'validohub.germany-suite': ['country-suite-factory.js', 'germany-suite.js', 'gold-tools-lab.js'],
  'validohub.italy-suite': ['country-suite-factory.js', 'italy-suite.js', 'gold-tools-lab.js'],
  'validohub.vanuatu-suite': ['country-suite-factory.js', 'vanuatu-suite.js'],
  'validohub.tuvalu-suite': ['country-suite-factory.js', 'tuvalu-suite.js'],
  'validohub.tonga-suite': ['country-suite-factory.js', 'tonga-suite.js'],
  'validohub.solomon-islands-suite': ['country-suite-factory.js', 'solomon-islands-suite.js'],
  'validohub.samoa-suite': ['country-suite-factory.js', 'samoa-suite.js'],
  'validohub.papua-new-guinea-suite': ['country-suite-factory.js', 'papua-new-guinea-suite.js'],
  'validohub.palau-suite': ['country-suite-factory.js', 'palau-suite.js'],
  'validohub.new-zealand-suite': ['country-suite-factory.js', 'new-zealand-suite.js', 'gold-tools-lab.js'],
  'validohub.nauru-suite': ['country-suite-factory.js', 'nauru-suite.js'],
  'validohub.micronesia-suite': ['country-suite-factory.js', 'micronesia-suite.js'],
  'validohub.marshall-islands-suite': ['country-suite-factory.js', 'marshall-islands-suite.js'],
  'validohub.kiribati-suite': ['country-suite-factory.js', 'kiribati-suite.js'],
  'validohub.fiji-suite': ['country-suite-factory.js', 'fiji-suite.js'],
  'validohub.australia-suite': ['country-suite-factory.js', 'australia-suite.js', 'gold-tools-lab.js'],
  'validohub.zimbabwe-suite': ['country-suite-factory.js', 'zimbabwe-suite.js'],
  'validohub.zambia-suite': ['country-suite-factory.js', 'zambia-suite.js'],
  'validohub.uganda-suite': ['country-suite-factory.js', 'uganda-suite.js'],
  'validohub.tunisia-suite': ['country-suite-factory.js', 'tunisia-suite.js'],
  'validohub.togo-suite': ['country-suite-factory.js', 'togo-suite.js'],
  'validohub.tanzania-suite': ['country-suite-factory.js', 'tanzania-suite.js'],
  'validohub.sudan-suite': ['country-suite-factory.js', 'sudan-suite.js'],
  'validohub.south-sudan-suite': ['country-suite-factory.js', 'south-sudan-suite.js'],
  'validohub.south-africa-suite': ['country-suite-factory.js', 'south-africa-suite.js', 'gold-tools-lab.js'],
  'validohub.somalia-suite': ['country-suite-factory.js', 'somalia-suite.js'],
  'validohub.sierra-leone-suite': ['country-suite-factory.js', 'sierra-leone-suite.js'],
  'validohub.seychelles-suite': ['country-suite-factory.js', 'seychelles-suite.js'],
  'validohub.senegal-suite': ['country-suite-factory.js', 'senegal-suite.js'],
  'validohub.sao-tome-and-principe-suite': ['country-suite-factory.js', 'sao-tome-and-principe-suite.js'],
  'validohub.rwanda-suite': ['country-suite-factory.js', 'rwanda-suite.js'],
  'validohub.nigeria-suite': ['country-suite-factory.js', 'nigeria-suite.js', 'gold-tools-lab.js'],
  'validohub.niger-suite': ['country-suite-factory.js', 'niger-suite.js'],
  'validohub.namibia-suite': ['country-suite-factory.js', 'namibia-suite.js'],
  'validohub.mozambique-suite': ['country-suite-factory.js', 'mozambique-suite.js'],
  'validohub.morocco-suite': ['country-suite-factory.js', 'morocco-suite.js', 'gold-tools-lab.js'],
  'validohub.mauritius-suite': ['country-suite-factory.js', 'mauritius-suite.js'],
  'validohub.mauritania-suite': ['country-suite-factory.js', 'mauritania-suite.js'],
  'validohub.mali-suite': ['country-suite-factory.js', 'mali-suite.js'],
  'validohub.malawi-suite': ['country-suite-factory.js', 'malawi-suite.js'],
  'validohub.madagascar-suite': ['country-suite-factory.js', 'madagascar-suite.js'],
  'validohub.libya-suite': ['country-suite-factory.js', 'libya-suite.js'],
  'validohub.liberia-suite': ['country-suite-factory.js', 'liberia-suite.js'],
  'validohub.lesotho-suite': ['country-suite-factory.js', 'lesotho-suite.js'],
  'validohub.kenya-suite': ['country-suite-factory.js', 'kenya-suite.js', 'gold-tools-lab.js'],
  'validohub.guinea-bissau-suite': ['country-suite-factory.js', 'guinea-bissau-suite.js'],
  'validohub.guinea-suite': ['country-suite-factory.js', 'guinea-suite.js'],
  'validohub.ghana-suite': ['country-suite-factory.js', 'ghana-suite.js', 'gold-tools-lab.js'],
  'validohub.gambia-suite': ['country-suite-factory.js', 'gambia-suite.js'],
  'validohub.gabon-suite': ['country-suite-factory.js', 'gabon-suite.js'],
  'validohub.ethiopia-suite': ['country-suite-factory.js', 'ethiopia-suite.js'],
  'validohub.eswatini-suite': ['country-suite-factory.js', 'eswatini-suite.js'],
  'validohub.eritrea-suite': ['country-suite-factory.js', 'eritrea-suite.js'],
  'validohub.equatorial-guinea-suite': ['country-suite-factory.js', 'equatorial-guinea-suite.js'],
  'validohub.egypt-suite': ['country-suite-factory.js', 'egypt-suite.js', 'gold-tools-lab.js'],
  'validohub.djibouti-suite': ['country-suite-factory.js', 'djibouti-suite.js'],
  'validohub.democratic-republic-of-the-congo-suite': ['country-suite-factory.js', 'democratic-republic-of-the-congo-suite.js'],
  'validohub.cote-d-ivoire-suite': ['country-suite-factory.js', 'cote-d-ivoire-suite.js'],
  'validohub.congo-suite': ['country-suite-factory.js', 'congo-suite.js'],
  'validohub.comoros-suite': ['country-suite-factory.js', 'comoros-suite.js'],
  'validohub.chad-suite': ['country-suite-factory.js', 'chad-suite.js'],
  'validohub.central-african-republic-suite': ['country-suite-factory.js', 'central-african-republic-suite.js'],
  'validohub.cameroon-suite': ['country-suite-factory.js', 'cameroon-suite.js'],
  'validohub.cabo-verde-suite': ['country-suite-factory.js', 'cabo-verde-suite.js'],
  'validohub.burundi-suite': ['country-suite-factory.js', 'burundi-suite.js'],
  'validohub.burkina-faso-suite': ['country-suite-factory.js', 'burkina-faso-suite.js'],
  'validohub.botswana-suite': ['country-suite-factory.js', 'botswana-suite.js'],
  'validohub.benin-suite': ['country-suite-factory.js', 'benin-suite.js'],
  'validohub.angola-suite': ['country-suite-factory.js', 'angola-suite.js'],
  'validohub.algeria-suite': ['country-suite-factory.js', 'algeria-suite.js'],
  'validohub.yemen-suite': ['country-suite-factory.js', 'yemen-suite.js'],
  'validohub.turkey-suite': ['country-suite-factory.js', 'turkey-suite.js', 'gold-tools-lab.js'],
  'validohub.timor-leste-suite': ['country-suite-factory.js', 'timor-leste-suite.js'],
  'validohub.taiwan-suite': ['country-suite-factory.js', 'taiwan-suite.js'],
  'validohub.syria-suite': ['country-suite-factory.js', 'syria-suite.js'],
  'validohub.palestine-suite': ['country-suite-factory.js', 'palestine-suite.js'],
  'validohub.north-korea-suite': ['country-suite-factory.js', 'north-korea-suite.js'],
  'validohub.maldives-suite': ['country-suite-factory.js', 'maldives-suite.js'],
  'validohub.lebanon-suite': ['country-suite-factory.js', 'lebanon-suite.js'],
  'validohub.kazakhstan-suite': ['country-suite-factory.js', 'kazakhstan-suite.js'],
  'validohub.iraq-suite': ['country-suite-factory.js', 'iraq-suite.js'],
  'validohub.iran-suite': ['country-suite-factory.js', 'iran-suite.js'],
  'validohub.georgia-suite': ['country-suite-factory.js', 'georgia-suite.js'],
  'validohub.brunei-suite': ['country-suite-factory.js', 'brunei-suite.js'],
  'validohub.bhutan-suite': ['country-suite-factory.js', 'bhutan-suite.js'],
  'validohub.azerbaijan-suite': ['country-suite-factory.js', 'azerbaijan-suite.js'],
  'validohub.armenia-suite': ['country-suite-factory.js', 'armenia-suite.js'],
  'validohub.afghanistan-suite': ['country-suite-factory.js', 'afghanistan-suite.js'],
  'validohub.jordan-suite': ['country-suite-factory.js', 'jordan-suite.js'],
  'validohub.oman-suite': ['country-suite-factory.js', 'oman-suite.js'],
  'validohub.bahrain-suite': ['country-suite-factory.js', 'bahrain-suite.js'],
  'validohub.kuwait-suite': ['country-suite-factory.js', 'kuwait-suite.js'],
  'validohub.qatar-suite': ['country-suite-factory.js', 'qatar-suite.js'],
  'validohub.turkmenistan-suite': ['country-suite-factory.js', 'turkmenistan-suite.js'],
  'validohub.tajikistan-suite': ['country-suite-factory.js', 'tajikistan-suite.js'],
  'validohub.kyrgyzstan-suite': ['country-suite-factory.js', 'kyrgyzstan-suite.js'],
  'validohub.uzbekistan-suite': ['country-suite-factory.js', 'uzbekistan-suite.js'],
  'validohub.mongolia-suite': ['country-suite-factory.js', 'mongolia-suite.js'],
  'validohub.laos-suite': ['country-suite-factory.js', 'laos-suite.js'],
  'validohub.cambodia-suite': ['country-suite-factory.js', 'cambodia-suite.js'],
  'validohub.myanmar-suite': ['country-suite-factory.js', 'myanmar-suite.js'],
  'validohub.sri-lanka-suite': ['country-suite-factory.js', 'sri-lanka-suite.js'],
  'validohub.nepal-suite': ['country-suite-factory.js', 'nepal-suite.js'],
  'validohub.israel-suite': ['country-suite-factory.js', 'israel-suite.js', 'gold-tools-lab.js'],
  'validohub.saudi-arabia-suite': ['country-suite-factory.js', 'saudi-arabia-suite.js', 'gold-tools-lab.js'],
  'validohub.bangladesh-suite': ['country-suite-factory.js', 'bangladesh-suite.js'],
  'validohub.pakistan-suite': ['country-suite-factory.js', 'pakistan-suite.js'],
  'validohub.philippines-suite': ['country-suite-factory.js', 'philippines-suite.js', 'gold-tools-lab.js'],
  'validohub.vietnam-suite': ['country-suite-factory.js', 'vietnam-suite.js', 'gold-tools-lab.js'],
  'validohub.thailand-suite': ['country-suite-factory.js', 'thailand-suite.js', 'gold-tools-lab.js'],
  'validohub.malaysia-suite': ['country-suite-factory.js', 'malaysia-suite.js', 'gold-tools-lab.js'],
  'validohub.indonesia-suite': ['country-suite-factory.js', 'indonesia-suite.js', 'gold-tools-lab.js'],
  'validohub.china-suite': ['country-suite-factory.js', 'china-suite.js', 'gold-tools-lab.js'],
  'validohub.united-arab-emirates-suite': ['country-suite-factory.js', 'united-arab-emirates-suite.js', 'gold-tools-lab.js'],
  'validohub.south-korea-suite': ['country-suite-factory.js', 'south-korea-suite.js', 'gold-tools-lab.js'],
  'validohub.singapore-suite': ['country-suite-factory.js', 'singapore-suite.js', 'gold-tools-lab.js'],
  'validohub.india-suite': ['country-suite-factory.js', 'india-suite.js', 'gold-tools-lab.js'],
  'validohub.japan-suite': ['country-suite-factory.js', 'japan-suite.js', 'gold-tools-lab.js'],
  'validohub.vatican-city-suite': ['country-suite-factory.js', 'vatican-city-suite.js'],
  'validohub.united-kingdom-suite': ['country-suite-factory.js', 'united-kingdom-suite.js', 'gold-tools-lab.js'],
  'validohub.ukraine-suite': ['country-suite-factory.js', 'ukraine-suite.js'],
  'validohub.slovenia-suite': ['country-suite-factory.js', 'slovenia-suite.js', 'gold-tools-lab.js'],
  'validohub.slovakia-suite': ['country-suite-factory.js', 'slovakia-suite.js', 'gold-tools-lab.js'],
  'validohub.serbia-suite': ['country-suite-factory.js', 'serbia-suite.js'],
  'validohub.san-marino-suite': ['country-suite-factory.js', 'san-marino-suite.js'],
  'validohub.north-macedonia-suite': ['country-suite-factory.js', 'north-macedonia-suite.js'],
  'validohub.montenegro-suite': ['country-suite-factory.js', 'montenegro-suite.js'],
  'validohub.monaco-suite': ['country-suite-factory.js', 'monaco-suite.js'],
  'validohub.moldova-suite': ['country-suite-factory.js', 'moldova-suite.js'],
  'validohub.malta-suite': ['country-suite-factory.js', 'malta-suite.js', 'gold-tools-lab.js'],
  'validohub.luxembourg-suite': ['country-suite-factory.js', 'luxembourg-suite.js', 'gold-tools-lab.js'],
  'validohub.lithuania-suite': ['country-suite-factory.js', 'lithuania-suite.js', 'gold-tools-lab.js'],
  'validohub.liechtenstein-suite': ['country-suite-factory.js', 'liechtenstein-suite.js'],
  'validohub.latvia-suite': ['country-suite-factory.js', 'latvia-suite.js', 'gold-tools-lab.js'],
  'validohub.iceland-suite': ['country-suite-factory.js', 'iceland-suite.js', 'gold-tools-lab.js'],
  'validohub.hungary-suite': ['country-suite-factory.js', 'hungary-suite.js', 'gold-tools-lab.js'],
  'validohub.greece-suite': ['country-suite-factory.js', 'greece-suite.js', 'gold-tools-lab.js'],
  'validohub.estonia-suite': ['country-suite-factory.js', 'estonia-suite.js', 'gold-tools-lab.js'],
  'validohub.cyprus-suite': ['country-suite-factory.js', 'cyprus-suite.js', 'gold-tools-lab.js'],
  'validohub.croatia-suite': ['country-suite-factory.js', 'croatia-suite.js', 'gold-tools-lab.js'],
  'validohub.bulgaria-suite': ['country-suite-factory.js', 'bulgaria-suite.js'],
  'validohub.bosnia-and-herzegovina-suite': ['country-suite-factory.js', 'bosnia-and-herzegovina-suite.js'],
  'validohub.andorra-suite': ['country-suite-factory.js', 'andorra-suite.js'],
  'validohub.albania-suite': ['country-suite-factory.js', 'albania-suite.js'],
  'validohub.portugal-suite': ['country-suite-factory.js', 'portugal-suite.js', 'gold-tools-lab.js'],
  'validohub.austria-suite': ['country-suite-factory.js', 'austria-suite.js', 'gold-tools-lab.js'],
  'validohub.belgium-suite': ['country-suite-factory.js', 'belgium-suite.js', 'gold-tools-lab.js'],
  'validohub.ireland-suite': ['country-suite-factory.js', 'ireland-suite.js', 'gold-tools-lab.js'],
  'validohub.czechia-suite': ['country-suite-factory.js', 'czechia-suite.js', 'gold-tools-lab.js'],
  'validohub.sweden-suite': ['country-suite-factory.js', 'sweden-suite.js', 'gold-tools-lab.js'],
  'validohub.norway-suite': ['country-suite-factory.js', 'norway-suite.js', 'gold-tools-lab.js'],
  'validohub.denmark-suite': ['country-suite-factory.js', 'denmark-suite.js', 'gold-tools-lab.js'],
  'validohub.finland-suite': ['country-suite-factory.js', 'finland-suite.js', 'gold-tools-lab.js'],
  'validohub.romania-suite': ['country-suite-factory.js', 'romania-suite.js', 'gold-tools-lab.js'],
  'validohub.venezuela-suite': ['country-suite-factory.js', 'venezuela-suite.js'],
  'validohub.uruguay-suite': ['country-suite-factory.js', 'uruguay-suite.js', 'gold-tools-lab.js'],
  'validohub.suriname-suite': ['country-suite-factory.js', 'suriname-suite.js'],
  'validohub.peru-suite': ['country-suite-factory.js', 'peru-suite.js', 'gold-tools-lab.js'],
  'validohub.paraguay-suite': ['country-suite-factory.js', 'paraguay-suite.js', 'gold-tools-lab.js'],
  'validohub.guyana-suite': ['country-suite-factory.js', 'guyana-suite.js'],
  'validohub.ecuador-suite': ['country-suite-factory.js', 'ecuador-suite.js', 'gold-tools-lab.js'],
  'validohub.colombia-suite': ['country-suite-factory.js', 'colombia-suite.js', 'gold-tools-lab.js'],
  'validohub.chile-suite': ['country-suite-factory.js', 'chile-suite.js', 'gold-tools-lab.js'],
  'validohub.bolivia-suite': ['country-suite-factory.js', 'bolivia-suite.js'],
  'validohub.argentina-suite': ['country-suite-factory.js', 'argentina-suite.js', 'gold-tools-lab.js'],
  'validohub.united-states-suite': ['country-suite-factory.js', 'united-states-suite.js', 'gold-tools-lab.js'],
  'validohub.canada-suite': ['country-suite-factory.js', 'canada-suite.js', 'gold-tools-lab.js'],
  'validohub.mexico-suite': ['country-suite-factory.js', 'mexico-suite.js', 'gold-tools-lab.js'],
  'validohub.belize-suite': ['country-suite-factory.js', 'belize-suite.js'],
  'validohub.guatemala-suite': ['country-suite-factory.js', 'guatemala-suite.js'],
  'validohub.el-salvador-suite': ['country-suite-factory.js', 'el-salvador-suite.js'],
  'validohub.honduras-suite': ['country-suite-factory.js', 'honduras-suite.js'],
  'validohub.nicaragua-suite': ['country-suite-factory.js', 'nicaragua-suite.js'],
  'validohub.costa-rica-suite': ['country-suite-factory.js', 'costa-rica-suite.js', 'gold-tools-lab.js'],
  'validohub.panama-suite': ['country-suite-factory.js', 'panama-suite.js', 'gold-tools-lab.js'],
  'validohub.bahamas-suite': ['country-suite-factory.js', 'bahamas-suite.js'],
  'validohub.cuba-suite': ['country-suite-factory.js', 'cuba-suite.js'],
  'validohub.jamaica-suite': ['country-suite-factory.js', 'jamaica-suite.js'],
  'validohub.haiti-suite': ['country-suite-factory.js', 'haiti-suite.js'],
  'validohub.dominican-republic-suite': ['country-suite-factory.js', 'dominican-republic-suite.js', 'gold-tools-lab.js'],
  'validohub.antigua-and-barbuda-suite': ['country-suite-factory.js', 'antigua-and-barbuda-suite.js'],
  'validohub.dominica-suite': ['country-suite-factory.js', 'dominica-suite.js'],
  'validohub.saint-kitts-and-nevis-suite': ['country-suite-factory.js', 'saint-kitts-and-nevis-suite.js'],
  'validohub.saint-lucia-suite': ['country-suite-factory.js', 'saint-lucia-suite.js'],
  'validohub.saint-vincent-and-the-grenadines-suite': ['country-suite-factory.js', 'saint-vincent-and-the-grenadines-suite.js'],
  'validohub.grenada-suite': ['country-suite-factory.js', 'grenada-suite.js'],
  'validohub.barbados-suite': ['country-suite-factory.js', 'barbados-suite.js'],
  'validohub.trinidad-and-tobago-suite': ['country-suite-factory.js', 'trinidad-and-tobago-suite.js'],
  'validohub.json-schema': 'generic-suite.js',
  'validohub.openapi': 'generic-suite.js',
  'validohub.yaml-toml': 'generic-suite.js',
  'validohub.xml-xpath': 'generic-suite.js',
  'validohub.csv-profiler': 'generic-suite.js',
  'validohub.sql-inspector': 'generic-suite.js',
  'validohub.cron': 'generic-suite.js',
  'validohub.regex-explainer': 'generic-suite.js',
  'validohub.datetime': 'generic-suite.js',
  'validohub.color-contrast': 'generic-suite.js',
  'validohub.markdown-mdx': 'generic-suite.js',
  'validohub.graphql': 'generic-suite.js',
  'validohub.email-domain': 'generic-suite.js',
  'validohub.user-agent': 'generic-suite.js',
  'validohub.http-headers': 'generic-suite.js',
  'validohub.kubernetes-yaml': 'generic-suite.js',
  'validohub.dockerfile-auditor': 'generic-suite.js',
  'validohub.github-actions': 'generic-suite.js',
  'validohub.terraform-hcl': 'generic-suite.js',
  'validohub.webserver-config': 'generic-suite.js',
  'validohub.prompt-injection': 'generic-suite.js',
  'validohub.rag-chunking': 'generic-suite.js',
  'validohub.vector-metadata': 'generic-suite.js',
  'validohub.jsonl-finetune': 'generic-suite.js',
  'validohub.eval-dataset': 'generic-suite.js',
  'validohub.rest-error-contract': 'generic-suite.js',
  'validohub.idempotency-key': 'generic-suite.js',
  'validohub.rate-limit-headers': 'generic-suite.js',
  'validohub.cors-policy': 'generic-suite.js',
  'validohub.websocket-sse': 'generic-suite.js',
  'validohub.html-meta-seo': 'generic-suite.js',
  'validohub.accessibility-snapshot': 'generic-suite.js',
  'validohub.design-token': 'generic-suite.js',
  'validohub.stack-trace': 'generic-suite.js',
  'validohub.browser-storage': 'generic-suite.js',
  'validohub.jwt-jwk-oauth': 'generic-suite.js',
  'validohub.csp-auditor': 'generic-suite.js',
  'validohub.cookie-security': 'generic-suite.js',
  'validohub.url-redirect-utm': 'generic-suite.js',
  'validohub.http-message-diff': 'generic-suite.js',
  'validohub.jsonpath-jmespath': 'generic-suite.js',
  'validohub.avro-protobuf': 'generic-suite.js',
  'validohub.ndjson-log-parser': 'generic-suite.js',
  'validohub.diff-patch': 'generic-suite.js',
  'validohub.base64-binary': 'generic-suite.js',
  'validohub.secret-scanner': 'generic-suite.js',
  'validohub.tls-certificate': 'generic-suite.js',
  'validohub.dns-records': 'generic-suite.js',
  'validohub.spf-dmarc': 'generic-suite.js',
  'validohub.sri-hash': 'generic-suite.js',
  'validohub.phone-e164': 'generic-suite.js',
  'validohub.postal-code': 'generic-suite.js',
  'validohub.swift-bic': 'generic-suite.js',
  'validohub.mrz-passport': 'generic-suite.js',
  'validohub.csv-repair': 'generic-suite.js',
  'validohub.eu-vat': 'generic-suite.js',
  'validohub.iso20022-sepa': 'generic-suite.js',
  'validohub.secret-pii': 'generic-suite.js',
  'validohub.locale-test-data': 'generic-suite.js',
  'validohub.webhook-signature': 'generic-suite.js',
  'validohub.case-converter': 'generic-suite.js',
  'validohub.html-decoder': 'generic-suite.js',
  'validohub.html-encoder': 'generic-suite.js',
  'validohub.iban': 'generic-suite.js',
  'validohub.iban-generator': 'generic-suite.js',
  'validohub.md5': 'generic-suite.js',
  'validohub.regex-tester': 'generic-suite.js',
  'validohub.sha1': 'generic-suite.js',
  'validohub.sha256': 'generic-suite.js',
  'validohub.slug-generator': 'generic-suite.js',
  'validohub.text-diff': 'generic-suite.js',
  'validohub.uuid': 'generic-suite.js'
};

const FACTORY_TOOL_ALGORITHMS = new Set([
  'validohub.switzerland-suite',
  'validohub.spain-suite',
  'validohub.germany-suite',
  'validohub.italy-suite',
  'validohub.vanuatu-suite',
  'validohub.tuvalu-suite',
  'validohub.tonga-suite',
  'validohub.solomon-islands-suite',
  'validohub.samoa-suite',
  'validohub.papua-new-guinea-suite',
  'validohub.palau-suite',
  'validohub.new-zealand-suite',
  'validohub.nauru-suite',
  'validohub.micronesia-suite',
  'validohub.marshall-islands-suite',
  'validohub.kiribati-suite',
  'validohub.fiji-suite',
  'validohub.australia-suite',
  'validohub.zimbabwe-suite',
  'validohub.zambia-suite',
  'validohub.uganda-suite',
  'validohub.tunisia-suite',
  'validohub.togo-suite',
  'validohub.tanzania-suite',
  'validohub.sudan-suite',
  'validohub.south-sudan-suite',
  'validohub.south-africa-suite',
  'validohub.somalia-suite',
  'validohub.sierra-leone-suite',
  'validohub.seychelles-suite',
  'validohub.senegal-suite',
  'validohub.sao-tome-and-principe-suite',
  'validohub.rwanda-suite',
  'validohub.nigeria-suite',
  'validohub.niger-suite',
  'validohub.namibia-suite',
  'validohub.mozambique-suite',
  'validohub.morocco-suite',
  'validohub.mauritius-suite',
  'validohub.mauritania-suite',
  'validohub.mali-suite',
  'validohub.malawi-suite',
  'validohub.madagascar-suite',
  'validohub.libya-suite',
  'validohub.liberia-suite',
  'validohub.lesotho-suite',
  'validohub.kenya-suite',
  'validohub.guinea-bissau-suite',
  'validohub.guinea-suite',
  'validohub.ghana-suite',
  'validohub.gambia-suite',
  'validohub.gabon-suite',
  'validohub.ethiopia-suite',
  'validohub.eswatini-suite',
  'validohub.eritrea-suite',
  'validohub.equatorial-guinea-suite',
  'validohub.egypt-suite',
  'validohub.djibouti-suite',
  'validohub.democratic-republic-of-the-congo-suite',
  'validohub.cote-d-ivoire-suite',
  'validohub.congo-suite',
  'validohub.comoros-suite',
  'validohub.chad-suite',
  'validohub.central-african-republic-suite',
  'validohub.cameroon-suite',
  'validohub.cabo-verde-suite',
  'validohub.burundi-suite',
  'validohub.burkina-faso-suite',
  'validohub.botswana-suite',
  'validohub.benin-suite',
  'validohub.angola-suite',
  'validohub.algeria-suite',
  'validohub.yemen-suite',
  'validohub.turkey-suite',
  'validohub.timor-leste-suite',
  'validohub.taiwan-suite',
  'validohub.syria-suite',
  'validohub.palestine-suite',
  'validohub.north-korea-suite',
  'validohub.maldives-suite',
  'validohub.lebanon-suite',
  'validohub.kazakhstan-suite',
  'validohub.iraq-suite',
  'validohub.iran-suite',
  'validohub.georgia-suite',
  'validohub.brunei-suite',
  'validohub.bhutan-suite',
  'validohub.azerbaijan-suite',
  'validohub.armenia-suite',
  'validohub.afghanistan-suite',
  'validohub.jordan-suite',
  'validohub.oman-suite',
  'validohub.bahrain-suite',
  'validohub.kuwait-suite',
  'validohub.qatar-suite',
  'validohub.turkmenistan-suite',
  'validohub.tajikistan-suite',
  'validohub.kyrgyzstan-suite',
  'validohub.uzbekistan-suite',
  'validohub.mongolia-suite',
  'validohub.laos-suite',
  'validohub.cambodia-suite',
  'validohub.myanmar-suite',
  'validohub.sri-lanka-suite',
  'validohub.nepal-suite',
  'validohub.israel-suite',
  'validohub.saudi-arabia-suite',
  'validohub.bangladesh-suite',
  'validohub.pakistan-suite',
  'validohub.philippines-suite',
  'validohub.vietnam-suite',
  'validohub.thailand-suite',
  'validohub.malaysia-suite',
  'validohub.indonesia-suite',
  'validohub.china-suite',
  'validohub.united-arab-emirates-suite',
  'validohub.south-korea-suite',
  'validohub.singapore-suite',
  'validohub.india-suite',
  'validohub.japan-suite',
  'validohub.vatican-city-suite',
  'validohub.united-kingdom-suite',
  'validohub.ukraine-suite',
  'validohub.slovenia-suite',
  'validohub.slovakia-suite',
  'validohub.serbia-suite',
  'validohub.san-marino-suite',
  'validohub.north-macedonia-suite',
  'validohub.montenegro-suite',
  'validohub.monaco-suite',
  'validohub.moldova-suite',
  'validohub.malta-suite',
  'validohub.luxembourg-suite',
  'validohub.lithuania-suite',
  'validohub.liechtenstein-suite',
  'validohub.latvia-suite',
  'validohub.iceland-suite',
  'validohub.hungary-suite',
  'validohub.greece-suite',
  'validohub.estonia-suite',
  'validohub.cyprus-suite',
  'validohub.croatia-suite',
  'validohub.bulgaria-suite',
  'validohub.bosnia-and-herzegovina-suite',
  'validohub.andorra-suite',
  'validohub.albania-suite',
  'validohub.romania-suite',
  'validohub.venezuela-suite',
  'validohub.uruguay-suite',
  'validohub.suriname-suite',
  'validohub.peru-suite',
  'validohub.paraguay-suite',
  'validohub.guyana-suite',
  'validohub.ecuador-suite',
  'validohub.colombia-suite',
  'validohub.chile-suite',
  'validohub.bolivia-suite',
  'validohub.argentina-suite',
  'validohub.united-states-suite',
  'validohub.canada-suite',
  'validohub.mexico-suite',
  'validohub.belize-suite',
  'validohub.guatemala-suite',
  'validohub.el-salvador-suite',
  'validohub.honduras-suite',
  'validohub.nicaragua-suite',
  'validohub.costa-rica-suite',
  'validohub.panama-suite',
  'validohub.bahamas-suite',
  'validohub.cuba-suite',
  'validohub.jamaica-suite',
  'validohub.haiti-suite',
  'validohub.dominican-republic-suite',
  'validohub.antigua-and-barbuda-suite',
  'validohub.dominica-suite',
  'validohub.saint-kitts-and-nevis-suite',
  'validohub.saint-lucia-suite',
  'validohub.saint-vincent-and-the-grenadines-suite',
  'validohub.grenada-suite',
  'validohub.barbados-suite',
  'validohub.trinidad-and-tobago-suite',
  'validohub.portugal-suite',
  'validohub.austria-suite',
  'validohub.belgium-suite',
  'validohub.ireland-suite',
  'validohub.czechia-suite',
  'validohub.sweden-suite',
  'validohub.norway-suite',
  'validohub.denmark-suite',
  'validohub.finland-suite',
  'validohub.romania-suite'
]);

const WORKBENCH_SCRIPT_VERSION = 'country-premium-clickfix-20260730';
const GOLD_LAB_SCRIPT_VERSION = 'gold-tools-lab-v4-20260727';
const GENERIC_SUITE_SCRIPT_VERSION = 'generic-suite-clickfix-mount-20260730';
const COUNTRY_SUITE_FACTORY_SCRIPT_VERSION = 'country-suite-factory-rail-preview-fix-20260727';

function versionForWorkbenchScript(srcOrScript) {
  const value = String(srcOrScript || '');
  if (value.endsWith('gold-tools-lab.js')) return GOLD_LAB_SCRIPT_VERSION;
  if (value.endsWith('generic-suite.js')) return GENERIC_SUITE_SCRIPT_VERSION;
  if (value.endsWith('country-suite-factory.js')) return COUNTRY_SUITE_FACTORY_SCRIPT_VERSION;
  return WORKBENCH_SCRIPT_VERSION;
}

function ensureToolScript(content) {
  const match = content.match(/data-algorithm-id="([^"]+)"/);
  if (!match) return applyRouteSpecificWorkbenchOverrides(content);
  const mapped = TOOL_SCRIPT_BY_ALGORITHM[match[1]];
  if (!mapped) return applyRouteSpecificWorkbenchOverrides(content);
  let next;
  if (Array.isArray(mapped)) {
    next = ensureOrderedWorkbenchScripts(content, mapped);
  } else {
    next = ensureWorkbenchScripts(content, mapped);
  }
  return applyRouteSpecificWorkbenchOverrides(next);
}

function ensureOrderedWorkbenchScripts(content, mappedScripts) {
  let next = mappedScripts.reduce((current, script) => ensureWorkbenchScripts(current, script), content);
  const tags = [];
  for (const script of mappedScripts) {
    const src = '/assets/js/tools/' + script;
    const oldTag = new RegExp('<script src="' + src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?:\\?[^"]*)?"></script>', 'g');
    next = next.replace(oldTag, '');
    tags.push('<script src="' + src + '?v=' + versionForWorkbenchScript(script) + '"></script>');
  }
  return next.replace('</body>', tags.join('') + '\n</body>');
}

function removeWorkbenchScript(content, script) {
  const src = '/assets/js/tools/' + script;
  const oldTag = new RegExp('<script src="' + src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?:\\?[^"]*)?"></script>\\s*', 'g');
  return content.replace(oldTag, '');
}

function ensureAdditionalWorkbenchScript(content, script) {
  const src = '/assets/js/tools/' + script;
  if (content.includes(src)) return content;
  return content.replace('</body>', '<script src="' + src + '?v=' + versionForWorkbenchScript(script) + '"></script>\n</body>');
}

const GOLD_LAB_ROUTE_OVERRIDE_PATTERNS = [
  /\/en\/poland\/poland-invoice-number-helper\/?/,
  /\/en\/poland\/poland-mrz-passport-id-parser\/?/,
  /\/en\/poland\/poland-passport-number-inspector\/?/,
  /\/en\/poland\/poland-swift-bic-inspector\/?/,
  /\/en\/brazil\/brazil-iban-validator\/?/
];

function applyRouteSpecificWorkbenchOverrides(content) {
  if (/\/en\/brazil\/brazil-cpf-validator\/?/.test(content) || /\/en\/brazil\/brazil-cnpj-validator\/?/.test(content)) {
    let next = removeWorkbenchScript(content, 'gold-tools-lab.js');
    next = removeWorkbenchScript(next, 'country-legacy-rich-layer.js');
    next = removeWorkbenchScript(next, 'brazil-suite.js');
    next = ensureAdditionalWorkbenchScript(next, 'brazil-tax-id.js');
    next = next.replace(/\/assets\/js\/tools\/brazil-tax-id\.js\?v=[^"]+/g, '/assets/js/tools/brazil-tax-id.js?v=brazil-tax-id-gold-20260727');
    next = next.replace(/data-algorithm-id="validohub\.brazil-suite"/g, 'data-algorithm-id="validohub.brazil-tax-id"');
    return next;
  }
  if (/\/en\/spain\/spain-id-validator\/?/.test(content)) {
    let next = removeWorkbenchScript(content, 'gold-tools-lab.js');
    next = ensureAdditionalWorkbenchScript(next, 'spain-id.js');
    return next;
  }
  if (GOLD_LAB_ROUTE_OVERRIDE_PATTERNS.some((pattern) => pattern.test(content))) {
    return ensureAdditionalWorkbenchScript(content, 'gold-tools-lab.js');
  }
  return content;
}

function ensureWorkbenchScripts(content, mapped) {
  const scriptTag = (src) => '<script src="' + src + '?v=' + versionForWorkbenchScript(src) + '"></script>';
  const helperSrcs = [
    '/assets/js/workbench/clipboard.js',
    '/assets/js/workbench/download.js',
    '/assets/js/workbench/file.js',
    '/assets/js/workbench/keyboard.js',
    '/assets/js/workbench/preview.js',
    '/assets/js/workbench/stats.js',
    '/assets/js/workbench/utf8.js',
    '/assets/js/workbench/hex.js'
  ];
  const frameworkSrc = '/assets/js/workbench/framework.js';
  const toolSrc = '/assets/js/tools/' + mapped;
  let next = content;
  for (const src of helperSrcs) {
    const oldTag = new RegExp('<script src="' + src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?:\\?[^"]*)?"></script>', 'g');
    next = next.replace(oldTag, scriptTag(src));
    if (!next.includes(scriptTag(src))) {
      next = next.replace('</body>', scriptTag(src) + '\n</body>');
    }
  }
  const frameworkOldTag = /<script src="\/assets\/js\/workbench\/framework\.js(?:\?[^"]*)?"><\/script>/g;
  next = next.replace(frameworkOldTag, scriptTag(frameworkSrc));
  if (!next.includes(scriptTag(frameworkSrc))) {
    next = next.replace('</body>', scriptTag(frameworkSrc) + '\n</body>');
  }
  const toolOldTag = new RegExp('<script src="' + toolSrc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?:\\?[^"]*)?"></script>', 'g');
  next = next.replace(toolOldTag, scriptTag(toolSrc));
  if (!next.includes(scriptTag(toolSrc))) {
    next = next.replace('</body>', scriptTag(toolSrc) + '\n</body>');
  }
  return next;
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function stripHtml(value) {
  return String(value || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function escapeAttribute(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function normalizeSeoHead(content, route, title, description) {
  let next = content;
  const routePath = route.path || '/en/';
  const canonicalUrl = `https://validohub.com${routePath}`;
  const pageTitle = title.length >= 12 ? title : `${title} | ValidoHub`;
  const pageDescription = description.length >= 45
    ? description
    : `Run browser-only ${title} checks, examples, and developer diagnostics on ValidoHub.`;

  if (/<title>[\s\S]*?<\/title>/i.test(next)) {
    next = next.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(pageTitle)}</title>`);
  } else {
    next = next.replace(/<head\b[^>]*>/i, match => `${match}\n  <title>${escapeHtml(pageTitle)}</title>`);
  }

  if (/<meta\s+name="description"\s+content="[^"]*"/i.test(next)) {
    next = next.replace(/<meta\s+name="description"\s+content="[^"]*"/i, `<meta name="description" content="${escapeAttribute(pageDescription)}"`);
  } else {
    next = next.replace(/<\/title>/i, `</title>\n  <meta name="description" content="${escapeAttribute(pageDescription)}">`);
  }

  if (/<link\s+rel="alternate"\s+hreflang=/i.test(next) && !/<link\s+rel="alternate"\s+hreflang="x-default"/i.test(next)) {
    const xDefault = `<link rel="alternate" hreflang="x-default" href="${canonicalUrl.replace(/\/(?:es|pt-BR|de|fr|pl|uk)\//, '/en/')}">`;
    next = next.replace(/(<link\s+rel="alternate"\s+hreflang="[^"]+"\s+href="[^"]+">\s*)+/i, match => `${match}  ${xDefault}\n`);
  }

  const socialTags = [
    ['property', 'og:title', pageTitle],
    ['property', 'og:description', pageDescription],
    ['property', 'og:url', canonicalUrl],
    ['property', 'og:type', 'website'],
    ['name', 'twitter:card', 'summary'],
    ['name', 'twitter:title', pageTitle],
    ['name', 'twitter:description', pageDescription]
  ];
  const additions = socialTags
    .filter(([kind, name]) => !new RegExp(`<meta\\s+${kind}="${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"\\s+content=`, 'i').test(next))
    .map(([kind, name, value]) => `<meta ${kind}="${name}" content="${escapeAttribute(value)}">`);
  if (additions.length) {
    next = next.replace(/<\/head>/i, `${additions.map(line => `  ${line}`).join('\n')}\n</head>`);
  }

  return next;
}

const GENERIC_UTILITY_WORKBENCHES = {
  // BEGIN global premium batch v4 workbenches
  'oauth-oidc-flow-debugger': { id: 'oauth-oidc-flow-debugger', algorithmId: 'validohub.oauth-oidc-flow', capability: 'validate', group: 'Security / Auth', forms: [{ capability: 'validate', title: 'Auth redirect QA', fields: [{ type: 'textarea', name: 'input', label: 'OAuth redirect or token exchange notes' }, { type: 'select', name: 'profile', label: 'Profile', options: ['security-auth', 'strict', 'review'], value: 'security-auth' }], actions: ['validate','parse','generate','explain'] }] },
  'jwt-risk-scanner': { id: 'jwt-risk-scanner', algorithmId: 'validohub.jwt-risk-scanner', capability: 'validate', group: 'Security / Auth', forms: [{ capability: 'validate', title: 'Claim risk QA', fields: [{ type: 'textarea', name: 'input', label: 'JWT or decoded claims JSON' }, { type: 'select', name: 'profile', label: 'Profile', options: ['security-auth', 'strict', 'review'], value: 'security-auth' }], actions: ['validate','parse','generate','explain'] }] },
  'jwks-rotation-inspector': { id: 'jwks-rotation-inspector', algorithmId: 'validohub.jwks-rotation', capability: 'validate', group: 'Security / Auth', forms: [{ capability: 'validate', title: 'Keyset lifecycle QA', fields: [{ type: 'textarea', name: 'input', label: 'JWKS JSON' }, { type: 'select', name: 'profile', label: 'Profile', options: ['security-auth', 'strict', 'review'], value: 'security-auth' }], actions: ['validate','parse','generate','explain'] }] },
  'openapi-breaking-change-diff': { id: 'openapi-breaking-change-diff', algorithmId: 'validohub.openapi-breaking-diff', capability: 'validate', group: 'Backend / API', forms: [{ capability: 'validate', title: 'Contract diff QA', fields: [{ type: 'textarea', name: 'input', label: 'Before OpenAPI snippet' }, { type: 'textarea', name: 'changed', label: 'Changed / after payload' }, { type: 'select', name: 'profile', label: 'Profile', options: ['backend-api', 'strict', 'review'], value: 'backend-api' }], actions: ['validate','parse','generate','explain'] }] },
  'json-patch-builder': { id: 'json-patch-builder', algorithmId: 'validohub.json-patch-builder', capability: 'validate', group: 'Data & Integration', forms: [{ capability: 'validate', title: 'RFC 6902 payload QA', fields: [{ type: 'textarea', name: 'input', label: 'JSON Patch operations or before payload' }, { type: 'select', name: 'profile', label: 'Profile', options: ['data-integration', 'strict', 'review'], value: 'data-integration' }], actions: ['validate','parse','generate','explain'] }] },
  'json-merge-patch-builder': { id: 'json-merge-patch-builder', algorithmId: 'validohub.json-merge-patch-builder', capability: 'validate', group: 'Data & Integration', forms: [{ capability: 'validate', title: 'RFC 7396 payload QA', fields: [{ type: 'textarea', name: 'input', label: 'JSON Merge Patch body' }, { type: 'select', name: 'profile', label: 'Profile', options: ['data-integration', 'strict', 'review'], value: 'data-integration' }], actions: ['validate','parse','generate','explain'] }] },
  'rest-pagination-contract-tester': { id: 'rest-pagination-contract-tester', algorithmId: 'validohub.rest-pagination-contract', capability: 'validate', group: 'Backend / API', forms: [{ capability: 'validate', title: 'Pagination QA', fields: [{ type: 'textarea', name: 'input', label: 'Pagination response or headers' }, { type: 'select', name: 'profile', label: 'Profile', options: ['backend-api', 'strict', 'review'], value: 'backend-api' }], actions: ['validate','parse','generate','explain'] }] },
  'api-error-code-catalog-builder': { id: 'api-error-code-catalog-builder', algorithmId: 'validohub.api-error-catalog', capability: 'validate', group: 'Backend / API', forms: [{ capability: 'validate', title: 'Error taxonomy QA', fields: [{ type: 'textarea', name: 'input', label: 'Error catalog JSON/YAML' }, { type: 'select', name: 'profile', label: 'Profile', options: ['backend-api', 'strict', 'review'], value: 'backend-api' }], actions: ['validate','parse','generate','explain'] }] },
  'webhook-replay-payload-builder': { id: 'webhook-replay-payload-builder', algorithmId: 'validohub.webhook-replay-payload', capability: 'validate', group: 'Backend / API', forms: [{ capability: 'validate', title: 'Event fixture QA', fields: [{ type: 'textarea', name: 'input', label: 'Webhook event payload' }, { type: 'select', name: 'profile', label: 'Profile', options: ['backend-api', 'strict', 'review'], value: 'backend-api' }], actions: ['validate','parse','generate','explain'] }] },
  'idempotency-collision-lab': { id: 'idempotency-collision-lab', algorithmId: 'validohub.idempotency-collision-lab', capability: 'validate', group: 'Backend / API', forms: [{ capability: 'validate', title: 'Retry collision QA', fields: [{ type: 'textarea', name: 'input', label: 'Retry scenario text' }, { type: 'select', name: 'profile', label: 'Profile', options: ['backend-api', 'strict', 'review'], value: 'backend-api' }], actions: ['validate','parse','generate','explain'] }] },
  'robots-txt-tester': { id: 'robots-txt-tester', algorithmId: 'validohub.robots-txt-tester', capability: 'validate', group: 'SEO / Publishing', forms: [{ capability: 'validate', title: 'Crawler rule QA', fields: [{ type: 'textarea', name: 'input', label: 'robots.txt' }, { type: 'select', name: 'profile', label: 'Profile', options: ['seo-publishing', 'strict', 'review'], value: 'seo-publishing' }], actions: ['validate','parse','generate','explain'] }] },
  'xml-sitemap-inspector': { id: 'xml-sitemap-inspector', algorithmId: 'validohub.xml-sitemap-inspector', capability: 'validate', group: 'SEO / Publishing', forms: [{ capability: 'validate', title: 'Indexing map QA', fields: [{ type: 'textarea', name: 'input', label: 'XML sitemap' }, { type: 'select', name: 'profile', label: 'Profile', options: ['seo-publishing', 'strict', 'review'], value: 'seo-publishing' }], actions: ['validate','parse','generate','explain'] }] },
  'canonical-hreflang-auditor': { id: 'canonical-hreflang-auditor', algorithmId: 'validohub.canonical-hreflang-auditor', capability: 'validate', group: 'SEO / Publishing', forms: [{ capability: 'validate', title: 'Locale SEO QA', fields: [{ type: 'textarea', name: 'input', label: 'HTML head links' }, { type: 'select', name: 'profile', label: 'Profile', options: ['seo-publishing', 'strict', 'review'], value: 'seo-publishing' }], actions: ['validate','parse','generate','explain'] }] },
  'search-snippet-preview': { id: 'search-snippet-preview', algorithmId: 'validohub.search-snippet-preview', capability: 'validate', group: 'SEO / Publishing', forms: [{ capability: 'validate', title: 'SERP copy QA', fields: [{ type: 'textarea', name: 'input', label: 'Title and metadata notes' }, { type: 'select', name: 'profile', label: 'Profile', options: ['seo-publishing', 'strict', 'review'], value: 'seo-publishing' }], actions: ['validate','parse','generate','explain'] }] },
  'structured-data-json-ld-validator': { id: 'structured-data-json-ld-validator', algorithmId: 'validohub.structured-data-jsonld', capability: 'validate', group: 'SEO / Publishing', forms: [{ capability: 'validate', title: 'Schema.org QA', fields: [{ type: 'textarea', name: 'input', label: 'JSON-LD script or object' }, { type: 'select', name: 'profile', label: 'Profile', options: ['seo-publishing', 'strict', 'review'], value: 'seo-publishing' }], actions: ['validate','parse','generate','explain'] }] },
  'csv-schema-inferencer': { id: 'csv-schema-inferencer', algorithmId: 'validohub.csv-schema-inferencer', capability: 'validate', group: 'Data Quality', forms: [{ capability: 'validate', title: 'Import schema QA', fields: [{ type: 'textarea', name: 'input', label: 'CSV data' }, { type: 'select', name: 'profile', label: 'Profile', options: ['data-quality', 'strict', 'review'], value: 'data-quality' }], actions: ['validate','parse','generate','explain'] }] },
  'duplicate-row-detector': { id: 'duplicate-row-detector', algorithmId: 'validohub.duplicate-row-detector', capability: 'validate', group: 'Data Quality', forms: [{ capability: 'validate', title: 'Import dedupe QA', fields: [{ type: 'textarea', name: 'input', label: 'CSV, JSONL, or list rows' }, { type: 'select', name: 'profile', label: 'Profile', options: ['data-quality', 'strict', 'review'], value: 'data-quality' }], actions: ['validate','parse','generate','explain'] }] },
  'unicode-confusable-scanner': { id: 'unicode-confusable-scanner', algorithmId: 'validohub.unicode-confusable-scanner', capability: 'validate', group: 'Data Quality', forms: [{ capability: 'validate', title: 'Text spoofing QA', fields: [{ type: 'textarea', name: 'input', label: 'Unicode text' }, { type: 'select', name: 'profile', label: 'Profile', options: ['data-quality', 'strict', 'review'], value: 'data-quality' }], actions: ['validate','parse','generate','explain'] }] },
  'locale-number-parser': { id: 'locale-number-parser', algorithmId: 'validohub.locale-number-parser', capability: 'validate', group: 'Locale / Formats', forms: [{ capability: 'validate', title: 'Numeric locale QA', fields: [{ type: 'textarea', name: 'input', label: 'Number strings' }, { type: 'select', name: 'profile', label: 'Profile', options: ['locale-formats', 'strict', 'review'], value: 'locale-formats' }], actions: ['validate','parse','generate','explain'] }] },
  'locale-date-parser': { id: 'locale-date-parser', algorithmId: 'validohub.locale-date-parser', capability: 'validate', group: 'Locale / Formats', forms: [{ capability: 'validate', title: 'Date locale QA', fields: [{ type: 'textarea', name: 'input', label: 'Date strings' }, { type: 'select', name: 'profile', label: 'Profile', options: ['locale-formats', 'strict', 'review'], value: 'locale-formats' }], actions: ['validate','parse','generate','explain'] }] },
  'luhn-card-fixture-generator': { id: 'luhn-card-fixture-generator', algorithmId: 'validohub.luhn-card-fixture-generator', capability: 'validate', group: 'Payments / Fixtures', forms: [{ capability: 'validate', title: 'Payment test QA', fields: [{ type: 'textarea', name: 'input', label: 'Card number or fixture request' }, { type: 'select', name: 'profile', label: 'Profile', options: ['payments-fixtures', 'strict', 'review'], value: 'payments-fixtures' }], actions: ['validate','parse','generate','explain'] }] },
  'bin-iin-shape-inspector': { id: 'bin-iin-shape-inspector', algorithmId: 'validohub.bin-iin-shape-inspector', capability: 'validate', group: 'Payments / Fixtures', forms: [{ capability: 'validate', title: 'Card prefix QA', fields: [{ type: 'textarea', name: 'input', label: 'BIN/IIN or masked PAN' }, { type: 'select', name: 'profile', label: 'Profile', options: ['payments-fixtures', 'strict', 'review'], value: 'payments-fixtures' }], actions: ['validate','parse','generate','explain'] }] },
  'currency-minor-units-checker': { id: 'currency-minor-units-checker', algorithmId: 'validohub.currency-minor-units', capability: 'validate', group: 'Payments / Fixtures', forms: [{ capability: 'validate', title: 'Money amount QA', fields: [{ type: 'textarea', name: 'input', label: 'Money payload or amount list' }, { type: 'select', name: 'profile', label: 'Profile', options: ['payments-fixtures', 'strict', 'review'], value: 'payments-fixtures' }], actions: ['validate','parse','generate','explain'] }] },
  'sepa-pain001-fixture-helper': { id: 'sepa-pain001-fixture-helper', algorithmId: 'validohub.sepa-pain001-fixture', capability: 'validate', group: 'Payments / Fixtures', forms: [{ capability: 'validate', title: 'Credit transfer XML QA', fields: [{ type: 'textarea', name: 'input', label: 'pain.001 XML or fixture notes' }, { type: 'select', name: 'profile', label: 'Profile', options: ['payments-fixtures', 'strict', 'review'], value: 'payments-fixtures' }], actions: ['validate','parse','generate','explain'] }] },
  'payment-reference-generator': { id: 'payment-reference-generator', algorithmId: 'validohub.payment-reference-generator', capability: 'validate', group: 'Payments / Fixtures', forms: [{ capability: 'validate', title: 'Reference fixture QA', fields: [{ type: 'textarea', name: 'input', label: 'Payment reference request' }, { type: 'select', name: 'profile', label: 'Profile', options: ['payments-fixtures', 'strict', 'review'], value: 'payments-fixtures' }], actions: ['validate','parse','generate','explain'] }] },
  'password-policy-tester': { id: 'password-policy-tester', algorithmId: 'validohub.password-policy-tester', capability: 'validate', group: 'Security / Auth', forms: [{ capability: 'validate', title: 'Credential policy QA', fields: [{ type: 'textarea', name: 'input', label: 'Password policy and sample' }, { type: 'select', name: 'profile', label: 'Profile', options: ['security-auth', 'strict', 'review'], value: 'security-auth' }], actions: ['validate','parse','generate','explain'] }] },
  'csp-nonce-hash-helper': { id: 'csp-nonce-hash-helper', algorithmId: 'validohub.csp-nonce-hash-helper', capability: 'validate', group: 'Security / Browser', forms: [{ capability: 'validate', title: 'Inline script CSP QA', fields: [{ type: 'textarea', name: 'input', label: 'CSP or inline script/style' }, { type: 'select', name: 'profile', label: 'Profile', options: ['security-browser', 'strict', 'review'], value: 'security-browser' }], actions: ['validate','parse','generate','explain'] }] },
  'cookie-samesite-lab': { id: 'cookie-samesite-lab', algorithmId: 'validohub.cookie-samesite-lab', capability: 'validate', group: 'Security / Browser', forms: [{ capability: 'validate', title: 'Cross-site cookie QA', fields: [{ type: 'textarea', name: 'input', label: 'Set-Cookie header or scenario' }, { type: 'select', name: 'profile', label: 'Profile', options: ['security-browser', 'strict', 'review'], value: 'security-browser' }], actions: ['validate','parse','generate','explain'] }] },
  'email-header-auth-inspector': { id: 'email-header-auth-inspector', algorithmId: 'validohub.email-header-auth-inspector', capability: 'validate', group: 'Security / Email', forms: [{ capability: 'validate', title: 'Email delivery QA', fields: [{ type: 'textarea', name: 'input', label: 'Email headers' }, { type: 'select', name: 'profile', label: 'Profile', options: ['security-email', 'strict', 'review'], value: 'security-email' }], actions: ['validate','parse','generate','explain'] }] },
  'log-redaction-rule-tester': { id: 'log-redaction-rule-tester', algorithmId: 'validohub.log-redaction-rule-tester', capability: 'validate', group: 'Security / Ops Premium', forms: [{ capability: 'validate', title: 'Privacy log QA', fields: [{ type: 'textarea', name: 'input', label: 'Logs and redaction rules' }, { type: 'select', name: 'profile', label: 'Profile', options: ['security-ops-premium', 'strict', 'review'], value: 'security-ops-premium' }], actions: ['validate','parse','generate','explain'] }] },
  // END global premium batch v4 workbenches
  'json-schema-workbench': { id: 'json-schema-workbench', algorithmId: 'validohub.json-schema', capability: 'analyze', forms: [{ capability: 'analyze', title: 'Analyze', fields: [{ type: 'textarea', name: 'input', label: 'JSON payload' }, { type: 'textarea', name: 'schema', label: 'JSON Schema' }, { type: 'number', name: 'count', label: 'Fixture count', value: "2", min: '1', max: '25' }], actions: ["analyze","validate","generate","explain"] }] },
  'openapi-inspector': { id: 'openapi-inspector', algorithmId: 'validohub.openapi', capability: 'inspect', forms: [{ capability: 'inspect', title: 'Inspect', fields: [{ type: 'textarea', name: 'input', label: 'OpenAPI JSON or YAML' }, { type: 'select', name: 'profile', label: 'Profile', options: ["auto","openapi-3","swagger-2"], value: "auto" }], actions: ["inspect","validate","generate","explain"] }] },
  'yaml-toml-workbench': { id: 'yaml-toml-workbench', algorithmId: 'validohub.yaml-toml', capability: 'inspect', forms: [{ capability: 'inspect', title: 'Inspect', fields: [{ type: 'select', name: 'format', label: 'Format', options: ["auto","yaml","toml"], value: "auto" }, { type: 'textarea', name: 'input', label: 'YAML or TOML config' }], actions: ["inspect","validate","format","explain"] }] },
  'xml-xpath-workbench': { id: 'xml-xpath-workbench', algorithmId: 'validohub.xml-xpath', capability: 'parse', forms: [{ capability: 'parse', title: 'Parse', fields: [{ type: 'textarea', name: 'input', label: 'XML document' }, { type: 'text', name: 'xpath', label: 'XPath expression', value: "//*[local-name()='invoice']" }], actions: ["parse","validate","generate","explain"] }] },
  'csv-profiler': { id: 'csv-profiler', algorithmId: 'validohub.csv-profiler', capability: 'profile', forms: [{ capability: 'profile', title: 'Profile', fields: [{ type: 'textarea', name: 'input', label: 'CSV data' }, { type: 'select', name: 'delimiter', label: 'Delimiter', options: ["auto","comma","semicolon","tab"], value: "auto" }], actions: ["profile","validate","normalize","explain"] }] },
  'sql-query-inspector': { id: 'sql-query-inspector', algorithmId: 'validohub.sql-inspector', capability: 'inspect', forms: [{ capability: 'inspect', title: 'Inspect', fields: [{ type: 'select', name: 'dialect', label: 'Dialect', options: ["generic","postgres","mysql","sqlite","sqlserver"], value: "postgres" }, { type: 'textarea', name: 'input', label: 'SQL query' }], actions: ["inspect","format","validate","explain"] }] },
  'cron-expression-workbench': { id: 'cron-expression-workbench', algorithmId: 'validohub.cron', capability: 'inspect', forms: [{ capability: 'inspect', title: 'Inspect', fields: [{ type: 'text', name: 'input', label: 'Cron expression', value: "*/15 9-17 * * MON-FRI" }, { type: 'text', name: 'timezone', label: 'Timezone', value: "Europe/Kiev" }, { type: 'select', name: 'profile', label: 'Profile', options: ["unix-5","quartz-6"], value: "unix-5" }], actions: ["inspect","validate","generate","explain"] }] },
  'regex-explainer-generator': { id: 'regex-explainer-generator', algorithmId: 'validohub.regex-explainer', capability: 'explain', forms: [{ capability: 'explain', title: 'Explain', fields: [{ type: 'text', name: 'pattern', label: 'Regex pattern', value: "/^(?<prefix>[A-Z]{2})-\\d{4}$/" }, { type: 'select', name: 'intent', label: 'Generate intent', options: ["email","slug","uuid","iso-date","invoice-id"], value: "invoice-id" }, { type: 'textarea', name: 'input', label: 'Test corpus' }], actions: ["explain","generate","validate","parse"] }] },
  'date-timezone-workbench': { id: 'date-timezone-workbench', algorithmId: 'validohub.datetime', capability: 'convert', forms: [{ capability: 'convert', title: 'Convert', fields: [{ type: 'text', name: 'input', label: 'Date, time, or timestamp', value: "2026-07-23T09:30:00Z" }, { type: 'text', name: 'timezone', label: 'Target timezone', value: "Europe/Kiev" }, { type: 'select', name: 'locale', label: 'Locale', options: ["en-US","en-GB","de-DE","fr-FR","pl-PL","uk-UA","pt-BR"], value: "uk-UA" }], actions: ["convert","validate","generate","explain"] }] },
  'color-contrast-token-workbench': { id: 'color-contrast-token-workbench', algorithmId: 'validohub.color-contrast', capability: 'inspect', forms: [{ capability: 'inspect', title: 'Inspect', fields: [{ type: 'text', name: 'foreground', label: 'Foreground color', value: "#0f172a" }, { type: 'text', name: 'background', label: 'Background color', value: "#ffffff" }, { type: 'text', name: 'token', label: 'Token name', value: "color-text-primary" }], actions: ["inspect","validate","generate","explain"] }] },
  'markdown-mdx-inspector': { id: 'markdown-mdx-inspector', algorithmId: 'validohub.markdown-mdx', capability: 'inspect', forms: [{ capability: 'inspect', title: 'Inspect', fields: [{ type: 'textarea', name: 'input', label: 'Markdown or MDX' }, { type: 'select', name: 'profile', label: 'Profile', options: ["github","mdx","commonmark"], value: "github" }], actions: ["inspect","validate","format","explain"] }] },
  'graphql-workbench': { id: 'graphql-workbench', algorithmId: 'validohub.graphql', capability: 'inspect', forms: [{ capability: 'inspect', title: 'Inspect', fields: [{ type: 'textarea', name: 'query', label: 'GraphQL query or SDL' }, { type: 'textarea', name: 'variables', label: 'Variables JSON' }], actions: ["inspect","validate","generate","explain"] }] },
  'email-domain-workbench': { id: 'email-domain-workbench', algorithmId: 'validohub.email-domain', capability: 'validate', forms: [{ capability: 'validate', title: 'Validate', fields: [{ type: 'text', name: 'input', label: 'Email address or domain', value: "billing+test@example.com" }, { type: 'number', name: 'count', label: 'Generate count', value: "3", min: '1', max: '50' }], actions: ["validate","generate","parse","explain"] }] },
  'user-agent-client-hints-parser': { id: 'user-agent-client-hints-parser', algorithmId: 'validohub.user-agent', capability: 'parse', forms: [{ capability: 'parse', title: 'Parse', fields: [{ type: 'textarea', name: 'input', label: 'User-Agent and optional headers' }, { type: 'select', name: 'profile', label: 'Profile', options: ["auto","browser","bot","mobile"], value: "auto" }], actions: ["parse","validate","generate","explain"] }] },
  'http-security-headers-inspector': { id: 'http-security-headers-inspector', algorithmId: 'validohub.http-headers', capability: 'inspect', forms: [{ capability: 'inspect', title: 'Inspect', fields: [{ type: 'textarea', name: 'input', label: 'HTTP response headers' }, { type: 'select', name: 'profile', label: 'Profile', options: ["web-app","api","static-site"], value: "web-app" }], actions: ["inspect","validate","generate","explain"] }] },
  'kubernetes-yaml-inspector': { id: 'kubernetes-yaml-inspector', algorithmId: 'validohub.kubernetes-yaml', capability: 'validate', group: 'Cloud / DevOps', forms: [{ capability: 'validate', title: 'Cluster manifest QA', fields: [{ type: 'textarea', name: 'input', label: 'Kubernetes YAML manifests' }, { type: 'select', name: 'profile', label: 'Profile', options: ["deployment","service","ingress","mixed"], value: "mixed" }], actions: ['validate','parse','generate','explain'] }] },
  'dockerfile-auditor': { id: 'dockerfile-auditor', algorithmId: 'validohub.dockerfile-auditor', capability: 'validate', group: 'Cloud / DevOps', forms: [{ capability: 'validate', title: 'Container build QA', fields: [{ type: 'textarea', name: 'input', label: 'Dockerfile' }, { type: 'select', name: 'profile', label: 'Runtime profile', options: ["node","python","java","generic"], value: "generic" }], actions: ['validate','parse','generate','explain'] }] },
  'github-actions-workflow-inspector': { id: 'github-actions-workflow-inspector', algorithmId: 'validohub.github-actions', capability: 'validate', group: 'Cloud / DevOps', forms: [{ capability: 'validate', title: 'CI workflow safety', fields: [{ type: 'textarea', name: 'input', label: 'GitHub Actions workflow YAML' }, { type: 'select', name: 'profile', label: 'Workflow profile', options: ["ci","release","deploy"], value: "ci" }], actions: ['validate','parse','generate','explain'] }] },
  'terraform-hcl-plan-inspector': { id: 'terraform-hcl-plan-inspector', algorithmId: 'validohub.terraform-hcl', capability: 'validate', group: 'Cloud / DevOps', forms: [{ capability: 'validate', title: 'Infrastructure change QA', fields: [{ type: 'textarea', name: 'input', label: 'Terraform HCL or plan text' }, { type: 'select', name: 'profile', label: 'Profile', options: ["plan","hcl","module"], value: "plan" }], actions: ['validate','parse','generate','explain'] }] },
  'nginx-apache-config-inspector': { id: 'nginx-apache-config-inspector', algorithmId: 'validohub.webserver-config', capability: 'validate', group: 'Cloud / DevOps', forms: [{ capability: 'validate', title: 'Edge config QA', fields: [{ type: 'textarea', name: 'input', label: 'NGINX or Apache config' }, { type: 'select', name: 'profile', label: 'Server profile', options: ["nginx","apache","auto"], value: "auto" }], actions: ['validate','parse','generate','explain'] }] },
  'prompt-injection-scanner': { id: 'prompt-injection-scanner', algorithmId: 'validohub.prompt-injection', capability: 'validate', group: 'AI / Data / RAG', forms: [{ capability: 'validate', title: 'LLM safety QA', fields: [{ type: 'textarea', name: 'input', label: 'Prompt, document, or retrieved context' }, { type: 'select', name: 'profile', label: 'Scan profile', options: ["rag","agent","system-prompt"], value: "rag" }], actions: ['validate','parse','generate','explain'] }] },
  'rag-chunking-workbench': { id: 'rag-chunking-workbench', algorithmId: 'validohub.rag-chunking', capability: 'validate', group: 'AI / Data / RAG', forms: [{ capability: 'validate', title: 'Retrieval prep', fields: [{ type: 'textarea', name: 'input', label: 'Document text' }, { type: 'number', name: 'chunkSize', label: 'Target chunk words', value: "120", min: '20', max: '2000' }, { type: 'number', name: 'overlap', label: 'Overlap words', value: "20", min: '0', max: '500' }], actions: ['validate','parse','generate','explain'] }] },
  'vector-metadata-schema-inspector': { id: 'vector-metadata-schema-inspector', algorithmId: 'validohub.vector-metadata', capability: 'validate', group: 'AI / Data / RAG', forms: [{ capability: 'validate', title: 'Embedding metadata QA', fields: [{ type: 'textarea', name: 'input', label: 'Vector metadata JSON or JSONL' }, { type: 'select', name: 'profile', label: 'Vector DB profile', options: ["generic","pinecone","weaviate","qdrant"], value: "generic" }], actions: ['validate','parse','generate','explain'] }] },
  'jsonl-finetune-dataset-inspector': { id: 'jsonl-finetune-dataset-inspector', algorithmId: 'validohub.jsonl-finetune', capability: 'validate', group: 'AI / Data / RAG', forms: [{ capability: 'validate', title: 'Training data QA', fields: [{ type: 'textarea', name: 'input', label: 'Fine-tune JSONL dataset' }, { type: 'select', name: 'profile', label: 'Dataset profile', options: ["chat","prompt-completion","eval"], value: "chat" }], actions: ['validate','parse','generate','explain'] }] },
  'eval-dataset-builder': { id: 'eval-dataset-builder', algorithmId: 'validohub.eval-dataset', capability: 'validate', group: 'AI / Data / RAG', forms: [{ capability: 'validate', title: 'Model evaluation QA', fields: [{ type: 'textarea', name: 'input', label: 'Eval cases or notes' }, { type: 'select', name: 'format', label: 'Export format', options: ["json","csv","rubric"], value: "json" }], actions: ['validate','parse','generate','explain'] }] },
  'rest-error-contract-inspector': { id: 'rest-error-contract-inspector', algorithmId: 'validohub.rest-error-contract', capability: 'validate', group: 'Backend / API', forms: [{ capability: 'validate', title: 'API error contract QA', fields: [{ type: 'textarea', name: 'input', label: 'Error response JSON or HTTP response' }, { type: 'select', name: 'profile', label: 'API profile', options: ["problem-json","json-api","custom"], value: "problem-json" }], actions: ['validate','parse','generate','explain'] }] },
  'idempotency-key-workbench': { id: 'idempotency-key-workbench', algorithmId: 'validohub.idempotency-key', capability: 'validate', group: 'Backend / API', forms: [{ capability: 'validate', title: 'Safe retry QA', fields: [{ type: 'textarea', name: 'input', label: 'Idempotency scenario or headers' }, { type: 'text', name: 'key', label: 'Idempotency key', value: "idem_20260723_checkout_01" }], actions: ['validate','parse','generate','explain'] }] },
  'rate-limit-header-inspector': { id: 'rate-limit-header-inspector', algorithmId: 'validohub.rate-limit-headers', capability: 'validate', group: 'Backend / API', forms: [{ capability: 'validate', title: 'Quota header QA', fields: [{ type: 'textarea', name: 'input', label: 'Rate limit HTTP headers' }, { type: 'select', name: 'profile', label: 'Header profile', options: ["rfc","x-ratelimit","mixed"], value: "mixed" }], actions: ['validate','parse','generate','explain'] }] },
  'cors-policy-workbench': { id: 'cors-policy-workbench', algorithmId: 'validohub.cors-policy', capability: 'validate', group: 'Backend / API', forms: [{ capability: 'validate', title: 'Browser API boundary', fields: [{ type: 'textarea', name: 'input', label: 'CORS request/response headers' }, { type: 'select', name: 'profile', label: 'API profile', options: ["public-api","credentialed-app","same-origin"], value: "credentialed-app" }], actions: ['validate','parse','generate','explain'] }] },
  'websocket-sse-message-inspector': { id: 'websocket-sse-message-inspector', algorithmId: 'validohub.websocket-sse', capability: 'validate', group: 'Backend / API', forms: [{ capability: 'validate', title: 'Realtime contract QA', fields: [{ type: 'textarea', name: 'input', label: 'WebSocket messages or SSE frames' }, { type: 'select', name: 'profile', label: 'Realtime profile', options: ["websocket","sse","mixed"], value: "mixed" }], actions: ['validate','parse','generate','explain'] }] },
  'html-meta-seo-inspector': { id: 'html-meta-seo-inspector', algorithmId: 'validohub.html-meta-seo', capability: 'validate', group: 'Frontend / QA', forms: [{ capability: 'validate', title: 'Metadata QA', fields: [{ type: 'textarea', name: 'input', label: 'HTML document or head markup' }, { type: 'select', name: 'profile', label: 'Page profile', options: ["tool-page","article","landing"], value: "tool-page" }], actions: ['validate','parse','generate','explain'] }] },
  'accessibility-snapshot-inspector': { id: 'accessibility-snapshot-inspector', algorithmId: 'validohub.accessibility-snapshot', capability: 'validate', group: 'Frontend / QA', forms: [{ capability: 'validate', title: 'Markup accessibility QA', fields: [{ type: 'textarea', name: 'input', label: 'HTML snapshot' }, { type: 'select', name: 'profile', label: 'Component profile', options: ["page","form","dialog","nav"], value: "page" }], actions: ['validate','parse','generate','explain'] }] },
  'design-token-inspector': { id: 'design-token-inspector', algorithmId: 'validohub.design-token', capability: 'validate', group: 'Frontend / QA', forms: [{ capability: 'validate', title: 'Design system QA', fields: [{ type: 'textarea', name: 'input', label: 'CSS variables or token JSON' }, { type: 'select', name: 'profile', label: 'Token profile', options: ["css","json","mixed"], value: "mixed" }], actions: ['validate','parse','generate','explain'] }] },
  'source-map-stack-trace-parser': { id: 'source-map-stack-trace-parser', algorithmId: 'validohub.stack-trace', capability: 'validate', group: 'Frontend / QA', forms: [{ capability: 'validate', title: 'Frontend error triage', fields: [{ type: 'textarea', name: 'input', label: 'Stack trace, error log, or sourcemap note' }, { type: 'select', name: 'profile', label: 'Runtime profile', options: ["browser","node","react"], value: "browser" }], actions: ['validate','parse','generate','explain'] }] },
  'browser-storage-inspector': { id: 'browser-storage-inspector', algorithmId: 'validohub.browser-storage', capability: 'validate', group: 'Frontend / QA', forms: [{ capability: 'validate', title: 'Client state QA', fields: [{ type: 'textarea', name: 'input', label: 'Browser storage dump or key-value list' }, { type: 'select', name: 'profile', label: 'Storage profile', options: ["localStorage","sessionStorage","cookies","mixed"], value: "mixed" }], actions: ['validate','parse','generate','explain'] }] },
  'jwt-jwk-oauth-inspector': { id: 'jwt-jwk-oauth-inspector', algorithmId: 'validohub.jwt-jwk-oauth', capability: 'validate', group: 'Security / Ops Premium', forms: [{ capability: 'validate', title: 'Token security', fields: [{ type: 'textarea', name: 'input', label: 'JWT, JWK, or OAuth material' }, { type: 'select', name: 'mode', label: 'Profile', options: ["jwt","jwks","oauth"], value: "jwt" }], actions: ['validate','parse','generate','explain'] }] },
  'csp-builder-auditor': { id: 'csp-builder-auditor', algorithmId: 'validohub.csp-auditor', capability: 'validate', group: 'Web/API Quality', forms: [{ capability: 'validate', title: 'Browser policy QA', fields: [{ type: 'textarea', name: 'input', label: 'Content-Security-Policy' }, { type: 'select', name: 'profile', label: 'Profile', options: ["web-app","api","static-site"], value: "web-app" }], actions: ['validate','parse','generate','explain'] }] },
  'cookie-security-inspector': { id: 'cookie-security-inspector', algorithmId: 'validohub.cookie-security', capability: 'validate', group: 'Security / Ops Premium', forms: [{ capability: 'validate', title: 'Session safety', fields: [{ type: 'textarea', name: 'input', label: 'Set-Cookie headers' }, { type: 'select', name: 'profile', label: 'Profile', options: ["session","third-party","api"], value: "session" }], actions: ['validate','parse','generate','explain'] }] },
  'url-redirect-utm-workbench': { id: 'url-redirect-utm-workbench', algorithmId: 'validohub.url-redirect-utm', capability: 'validate', group: 'Web/API Quality', forms: [{ capability: 'validate', title: 'URL hygiene', fields: [{ type: 'textarea', name: 'input', label: 'URL or URL list' }, { type: 'select', name: 'profile', label: 'Profile', options: ["privacy-cleanup","campaign","redirect-review"], value: "privacy-cleanup" }], actions: ['validate','parse','generate','explain'] }] },
  'http-message-diff-inspector': { id: 'http-message-diff-inspector', algorithmId: 'validohub.http-message-diff', capability: 'validate', group: 'Web/API Quality', forms: [{ capability: 'validate', title: 'HTTP regression QA', fields: [{ type: 'textarea', name: 'input', label: 'Before HTTP message' }, { type: 'textarea', name: 'changed', label: 'Changed / after payload' }, { type: 'select', name: 'profile', label: 'Profile', options: ["response","request","api-regression"], value: "response" }], actions: ['validate','parse','generate','explain'] }] },
  'jsonpath-jmespath-workbench': { id: 'jsonpath-jmespath-workbench', algorithmId: 'validohub.jsonpath-jmespath', capability: 'validate', group: 'Data & Integration', forms: [{ capability: 'validate', title: 'JSON query lab', fields: [{ type: 'textarea', name: 'input', label: 'JSON payload' }, { type: 'text', name: 'selector', label: 'Selector', value: '$.items[*]' }, { type: 'select', name: 'selectorMode', label: 'Selector mode', options: ["jsonpath","jmespath"], value: "jsonpath" }], actions: ['validate','parse','generate','explain'] }] },
  'avro-protobuf-schema-inspector': { id: 'avro-protobuf-schema-inspector', algorithmId: 'validohub.avro-protobuf', capability: 'validate', group: 'Data & Integration', forms: [{ capability: 'validate', title: 'Schema compatibility', fields: [{ type: 'textarea', name: 'input', label: 'Avro JSON schema or .proto SDL' }, { type: 'select', name: 'format', label: 'Profile', options: ["auto","avro","protobuf"], value: "auto" }], actions: ['validate','parse','generate','explain'] }] },
  'ndjson-log-parser-workbench': { id: 'ndjson-log-parser-workbench', algorithmId: 'validohub.ndjson-log-parser', capability: 'validate', group: 'Data & Integration', forms: [{ capability: 'validate', title: 'Operational log QA', fields: [{ type: 'textarea', name: 'input', label: 'NDJSON or log lines' }, { type: 'select', name: 'profile', label: 'Profile', options: ["ndjson","application-log","security-log"], value: "ndjson" }], actions: ['validate','parse','generate','explain'] }] },
  'diff-patch-workbench': { id: 'diff-patch-workbench', algorithmId: 'validohub.diff-patch', capability: 'validate', group: 'Data & Integration', forms: [{ capability: 'validate', title: 'Change review', fields: [{ type: 'textarea', name: 'input', label: 'Original text' }, { type: 'textarea', name: 'changed', label: 'Changed / after payload' }, { type: 'select', name: 'mode', label: 'Profile', options: ["text","json","yaml"], value: "text" }], actions: ['validate','parse','generate','explain'] }] },
  'base64-binary-payload-inspector': { id: 'base64-binary-payload-inspector', algorithmId: 'validohub.base64-binary', capability: 'validate', group: 'Data & Integration', forms: [{ capability: 'validate', title: 'Binary payload QA', fields: [{ type: 'textarea', name: 'input', label: 'Base64, data URI, or text payload' }, { type: 'select', name: 'profile', label: 'Profile', options: ["auto","data-uri","jwt-part"], value: "auto" }], actions: ['validate','parse','generate','explain'] }] },
  'secret-scanner-workbench': { id: 'secret-scanner-workbench', algorithmId: 'validohub.secret-scanner', capability: 'validate', group: 'Security / Ops Premium', forms: [{ capability: 'validate', title: 'Secret hygiene', fields: [{ type: 'textarea', name: 'input', label: 'Payload, log, env, or config text' }, { type: 'select', name: 'mode', label: 'Profile', options: ["balanced","strict","ci"], value: "balanced" }], actions: ['validate','parse','generate','explain'] }] },
  'tls-certificate-inspector': { id: 'tls-certificate-inspector', algorithmId: 'validohub.tls-certificate', capability: 'validate', group: 'Security / Ops Premium', forms: [{ capability: 'validate', title: 'Certificate QA', fields: [{ type: 'textarea', name: 'input', label: 'PEM certificate or chain' }, { type: 'select', name: 'profile', label: 'Profile', options: ["leaf","chain","csr"], value: "leaf" }], actions: ['validate','parse','generate','explain'] }] },
  'dns-record-workbench': { id: 'dns-record-workbench', algorithmId: 'validohub.dns-records', capability: 'validate', group: 'Security / Ops Premium', forms: [{ capability: 'validate', title: 'Zone record QA', fields: [{ type: 'textarea', name: 'input', label: 'DNS zone records' }, { type: 'select', name: 'profile', label: 'Profile', options: ["email-security","zone-audit","migration"], value: "email-security" }], actions: ['validate','parse','generate','explain'] }] },
  'spf-dmarc-builder': { id: 'spf-dmarc-builder', algorithmId: 'validohub.spf-dmarc', capability: 'validate', group: 'Security / Ops Premium', forms: [{ capability: 'validate', title: 'Email auth policy', fields: [{ type: 'text', name: 'domain', label: 'Domain', value: 'example.com' }, { type: 'textarea', name: 'input', label: 'SPF and DMARC records' }, { type: 'select', name: 'policy', label: 'Policy', options: ["monitor","quarantine","reject"], value: "monitor" }], actions: ['validate','parse','generate','explain'] }] },
  'sri-hash-integrity-inspector': { id: 'sri-hash-integrity-inspector', algorithmId: 'validohub.sri-hash', capability: 'validate', group: 'Security / Ops Premium', forms: [{ capability: 'validate', title: 'Asset integrity', fields: [{ type: 'textarea', name: 'input', label: 'Asset content or integrity attribute' }, { type: 'select', name: 'algorithm', label: 'Profile', options: ["sha384","sha256","sha512"], value: "sha384" }], actions: ['validate','parse','generate','explain'] }] },
  'phone-e164-workbench': { id: 'phone-e164-workbench', algorithmId: 'validohub.phone-e164', capability: 'validate', forms: [{ capability: 'validate', title: 'Validate or generate', fields: [{ type: 'select', name: 'country', label: 'Country profile', options: ['US','GB','DE','FR','PL','BR','UA','FI','CZ','AT'], value: 'US' }, { type: 'text', name: 'input', label: 'Phone number' }, { type: 'number', name: 'count', label: 'Generate count', value: '1', min: '1', max: '50' }], actions: ['validate','generate','parse','explain'] }] },
  'postal-code-workbench': { id: 'postal-code-workbench', algorithmId: 'validohub.postal-code', capability: 'validate', forms: [{ capability: 'validate', title: 'Validate or generate', fields: [{ type: 'select', name: 'country', label: 'Country profile', options: ['DE','GB','FR','PL','BR','UA','FI','CZ','AT','NL','IE'], value: 'DE' }, { type: 'text', name: 'input', label: 'Postal code' }, { type: 'number', name: 'count', label: 'Generate count', value: '1', min: '1', max: '50' }], actions: ['validate','generate','parse','explain'] }] },
  'swift-bic-workbench': { id: 'swift-bic-workbench', algorithmId: 'validohub.swift-bic', capability: 'validate', forms: [{ capability: 'validate', title: 'Validate or generate', fields: [{ type: 'select', name: 'country', label: 'Country code', options: ['DE','GB','FR','PL','FI','CZ','AT','NL','IE'], value: 'DE' }, { type: 'text', name: 'input', label: 'SWIFT / BIC' }, { type: 'number', name: 'count', label: 'Generate count', value: '1', min: '1', max: '50' }], actions: ['validate','generate','parse','explain'] }] },
  'mrz-passport-workbench': { id: 'mrz-passport-workbench', algorithmId: 'validohub.mrz-passport', capability: 'validate', forms: [{ capability: 'validate', title: 'Parse or generate', fields: [{ type: 'text', name: 'country', label: 'Issuing country ISO-3', value: 'DEU' }, { type: 'textarea', name: 'input', label: 'MRZ TD3 lines' }], actions: ['validate','generate','parse','explain'] }] },
  'csv-locale-normalizer': { id: 'csv-locale-normalizer', algorithmId: 'validohub.csv-repair', capability: 'normalize', forms: [{ capability: 'normalize', title: 'Normalize', fields: [{ type: 'textarea', name: 'input', label: 'CSV payload' }, { type: 'select', name: 'delimiter', label: 'Output delimiter', options: ['comma','semicolon','tab'], value: 'comma' }], actions: ['normalize','validate','parse','explain'] }] },
  'eu-vat-number-workbench': { id: 'eu-vat-number-workbench', algorithmId: 'validohub.eu-vat', capability: 'validate', forms: [{ capability: 'validate', title: 'Validate or generate', fields: [{ type: 'select', name: 'country', label: 'EU country prefix', options: ['DE','FR','PL','ES','IT','NL','IE','FI','CZ','AT'], value: 'DE' }, { type: 'text', name: 'input', label: 'VAT number' }, { type: 'number', name: 'count', label: 'Generate count', value: '1', min: '1', max: '50' }], actions: ['validate','generate','parse','explain'] }] },
  'iso20022-sepa-inspector': { id: 'iso20022-sepa-inspector', algorithmId: 'validohub.iso20022-sepa', capability: 'inspect', forms: [{ capability: 'inspect', title: 'Inspect XML', fields: [{ type: 'select', name: 'profile', label: 'Profile', options: ['auto','pain.001','pain.008','camt.053'], value: 'auto' }, { type: 'textarea', name: 'input', label: 'ISO 20022 XML' }], actions: ['inspect','validate','parse','explain'] }] },
  'secret-pii-redactor': { id: 'secret-pii-redactor', algorithmId: 'validohub.secret-pii', capability: 'inspect', forms: [{ capability: 'inspect', title: 'Scan and redact', fields: [{ type: 'select', name: 'mode', label: 'Redaction mode', options: ['balanced','strict'], value: 'balanced' }, { type: 'textarea', name: 'input', label: 'Payload, log, or text' }], actions: ['inspect','redact','validate','explain'] }] },
  'locale-test-data-generator': { id: 'locale-test-data-generator', algorithmId: 'validohub.locale-test-data', capability: 'generate', forms: [{ capability: 'generate', title: 'Generate fixtures', fields: [{ type: 'select', name: 'country', label: 'Country profile', options: ['DE','FR','GB','PL','BR','UA','FI','CZ','AT'], value: 'DE' }, { type: 'select', name: 'format', label: 'Output format', options: ['json','csv'], value: 'json' }, { type: 'number', name: 'count', label: 'Rows', value: '3', min: '1', max: '50' }], actions: ['generate','validate','explain'] }] },
  'webhook-signature-verifier': { id: 'webhook-signature-verifier', algorithmId: 'validohub.webhook-signature', capability: 'validate', forms: [{ capability: 'validate', title: 'Verify or generate', fields: [{ type: 'textarea', name: 'payload', label: 'Raw payload' }, { type: 'text', name: 'secret', label: 'Signing secret', value: 'whsec_demo_secret' }, { type: 'text', name: 'signature', label: 'Signature header' }, { type: 'text', name: 'prefix', label: 'Header prefix', value: 'sha256=' }], actions: ['validate','generate','explain'] }] },
  'html-encoder': {
    id: 'html-encoder',
    algorithmId: 'validohub.html-encoder',
    capability: 'encode',
    forms: [{
      capability: 'encode',
      title: 'Encode',
      fields: [{ type: 'textarea', name: 'input', label: 'Text', required: true }],
      actions: ['encode', 'decode', 'validate', 'explain']
    }]
  },
  'html-decoder': {
    id: 'html-decoder',
    algorithmId: 'validohub.html-decoder',
    capability: 'decode',
    forms: [{
      capability: 'decode',
      title: 'Decode',
      fields: [{ type: 'textarea', name: 'input', label: 'HTML entity text', required: true }],
      actions: ['decode', 'encode', 'validate', 'explain']
    }]
  },
  'slug-generator': {
    id: 'slug-generator',
    algorithmId: 'validohub.slug-generator',
    capability: 'generate',
    forms: [{
      capability: 'generate',
      title: 'Generate',
      fields: [
        { type: 'text', name: 'title', label: 'Title', required: true },
        { type: 'checkbox', name: 'lowercase', label: 'Lowercase', checked: true }
      ],
      actions: ['generate', 'format', 'explain']
    }]
  },
  'case-converter': {
    id: 'case-converter',
    algorithmId: 'validohub.case-converter',
    capability: 'convert',
    forms: [{
      capability: 'convert',
      title: 'Convert',
      fields: [
        { type: 'textarea', name: 'input', label: 'Text', required: true },
        { type: 'select', name: 'style', label: 'Case style', options: ['lowercase', 'uppercase', 'title', 'sentence', 'camel', 'snake', 'kebab'], value: 'sentence' }
      ],
      actions: ['convert', 'format', 'explain']
    }]
  },
  'uuid-generator': {
    id: 'uuid-generator',
    algorithmId: 'validohub.uuid',
    capability: 'generate',
    forms: [{
      capability: 'generate',
      title: 'Generate or validate',
      fields: [
        { type: 'select', name: 'version', label: 'UUID version', options: ['v4', 'v7'], value: 'v4' },
        { type: 'number', name: 'count', label: 'Count', value: '1', min: '1', max: '100' },
        { type: 'text', name: 'uuid', label: 'UUID to validate' }
      ],
      actions: ['generate', 'validate', 'parse', 'explain']
    }]
  },
  'iban-validator': {
    id: 'iban-validator',
    algorithmId: 'validohub.iban',
    capability: 'validate',
    forms: [{
      capability: 'validate',
      title: 'Validate',
      fields: [{ type: 'text', name: 'iban', label: 'IBAN', required: true }],
      actions: ['validate', 'parse', 'explain']
    }]
  },
  'iban-generator': {
    id: 'iban-generator',
    algorithmId: 'validohub.iban-generator',
    capability: 'generate',
    forms: [{
      capability: 'generate',
      title: 'Generate IBAN',
      fields: [
        { type: 'text', name: 'country', label: 'Country code', value: 'DE', required: true },
        { type: 'text', name: 'bban', label: 'BBAN / account body', value: '370400440532013000', required: true },
        { type: 'text', name: 'iban', label: 'Existing IBAN to repair or inspect' }
      ],
      actions: ['generate', 'validate', 'explain']
    }]
  },
  'brazil-iban-validator': {
    id: 'brazil-iban-validator',
    algorithmId: 'validohub.iban',
    capability: 'validate',
    forms: [{
      capability: 'validate',
      title: 'Validate Brazilian IBAN',
      fields: [{ type: 'text', name: 'iban', label: 'Brazilian IBAN', required: true }],
      actions: ['validate', 'parse', 'explain']
    }]
  },
  'germany-iban-validator': {
    id: 'germany-iban-validator',
    algorithmId: 'validohub.iban',
    capability: 'validate',
    forms: [{
      capability: 'validate',
      title: 'Validate German IBAN',
      fields: [{ type: 'text', name: 'iban', label: 'German IBAN', required: true }],
      actions: ['validate', 'parse', 'explain']
    }]
  },
  'spain-iban-validator': {
    id: 'spain-iban-validator',
    algorithmId: 'validohub.iban',
    capability: 'validate',
    forms: [{
      capability: 'validate',
      title: 'Validate Spanish IBAN',
      fields: [{ type: 'text', name: 'iban', label: 'Spanish IBAN', required: true }],
      actions: ['validate', 'parse', 'explain']
    }]
  },
  'regex-tester': {
    id: 'regex-tester',
    algorithmId: 'validohub.regex-tester',
    capability: 'validate',
    forms: [{
      capability: 'validate',
      title: 'Test pattern',
      fields: [
        { type: 'text', name: 'pattern', label: 'Pattern', required: true },
        { type: 'textarea', name: 'input', label: 'Test text', required: true }
      ],
      actions: ['validate', 'explain']
    }]
  },
  'text-diff': {
    id: 'text-diff',
    algorithmId: 'validohub.text-diff',
    capability: 'calculate',
    forms: [{
      capability: 'calculate',
      title: 'Compare',
      fields: [
        { type: 'textarea', name: 'original', label: 'Original text', required: true },
        { type: 'textarea', name: 'changed', label: 'Changed text', required: true }
      ],
      actions: ['calculate', 'explain']
    }]
  },
  'md5-generator': {
    id: 'md5-generator',
    algorithmId: 'validohub.md5',
    capability: 'generate',
    forms: [{
      capability: 'generate',
      title: 'Generate or validate',
      fields: [
        { type: 'textarea', name: 'input', label: 'Input text' },
        { type: 'text', name: 'hash', label: 'MD5 hash to validate' }
      ],
      actions: ['generate', 'validate', 'explain']
    }]
  },
  'sha1-generator': {
    id: 'sha1-generator',
    algorithmId: 'validohub.sha1',
    capability: 'generate',
    forms: [{
      capability: 'generate',
      title: 'Generate or validate',
      fields: [
        { type: 'textarea', name: 'input', label: 'Input text' },
        { type: 'text', name: 'hash', label: 'SHA-1 hash to validate' }
      ],
      actions: ['generate', 'validate', 'explain']
    }]
  },
  'sha256-generator': {
    id: 'sha256-generator',
    algorithmId: 'validohub.sha256',
    capability: 'generate',
    forms: [{
      capability: 'generate',
      title: 'Generate or validate',
      fields: [
        { type: 'textarea', name: 'input', label: 'Input text' },
        { type: 'text', name: 'hash', label: 'SHA-256 hash to validate' }
      ],
      actions: ['generate', 'validate', 'explain']
    }]
  }
};

const COUNTRY_IBAN_GENERATOR_PROFILES = {
  brazil: { code: 'BR', name: 'Brazil', bban: '00000000000010932840814P2' },
  france: { code: 'FR', name: 'France', bban: '20041010050500013M02606' },
  germany: { code: 'DE', name: 'Germany', bban: '370400440532013000' },
  italy: { code: 'IT', name: 'Italy', bban: 'X0542811101000000123456' },
  netherlands: { code: 'NL', name: 'Netherlands', bban: 'ABNA0417164300' },
  poland: { code: 'PL', name: 'Poland', bban: '61109010140000071219812874'.slice(2) },
  spain: { code: 'ES', name: 'Spain', bban: '21000418450200051332' },
  switzerland: { code: 'CH', name: 'Switzerland', bban: '9300762011623852957' }
};

function countryIbanGeneratorWorkbench(slug, countrySlug) {
  if (!/-iban-generator$/.test(slug || '')) return null;
  const profile = COUNTRY_IBAN_GENERATOR_PROFILES[countrySlug || ''];
  if (!profile) return null;
  return {
    id: slug,
    algorithmId: 'validohub.iban-generator',
    capability: 'generate',
    isCountryIbanGenerator: true,
    countryCode: profile.code,
    countryName: profile.name,
    expectedLength: (profile.code + '00' + profile.bban).length,
    forms: [{
      capability: 'generate',
      title: 'Generate',
      fields: [
        { type: 'text', name: 'bban', label: profile.name + ' BBAN / account body', value: profile.bban, required: true },
        { type: 'text', name: 'iban', label: 'Existing IBAN to repair or inspect' }
      ],
      actions: ['generate', 'validate', 'explain']
    }]
  };
}

function renderCountryIbanGeneratorWorkbench(config) {
  const form = config.forms[0];
  const fields = [
    '<input type="hidden" name="country" value="' + escapeHtml(config.countryCode || '') + '">',
    form.fields.map(renderGenericField).join('')
  ].join('');
  const actions = ['generate', 'validate'].map((action, index) =>
    '<button type="button" class="button ' + (index === 0 ? 'button-primary' : 'button-secondary') + '" data-action="' + escapeHtml(action) + '">' + escapeHtml(action.charAt(0).toUpperCase() + action.slice(1)) + '</button>'
  ).join('');
  return [
    '<section class="workbench-card vh-country-iban-generator-card" aria-label="' + escapeHtml(config.countryName || 'Country') + ' IBAN generator">',
    '<div class="workbench-heading vh-country-iban-heading">',
    '<span class="eyebrow">Banking fixtures</span>',
    '<h2>Generate ' + escapeHtml(config.countryName || 'country') + ' IBAN fixtures</h2>',
    '<p>Create a fresh route-locked IBAN, repair check digits, inspect an existing value, and copy developer-ready evidence locally.</p>',
    '<div class="vh-country-iban-rail" aria-label="IBAN route context">',
    '<article><span>Route country</span><strong>' + escapeHtml(config.countryCode || '') + '</strong><small>' + escapeHtml(config.countryName || '') + '</small></article>',
    '<article><span>Expected length</span><strong>' + escapeHtml(String(config.expectedLength || '15-34')) + '</strong><small>IBAN characters</small></article>',
    '<article><span>Generate mode</span><strong>Fresh fixture</strong><small>New local value every click</small></article>',
    '</div>',
    '</div>',
    '<div class="workbench-list">',
    '<form class="tool-workbench" id="tool-' + escapeHtml(config.id) + '-generate" data-algorithm-id="' + escapeHtml(config.algorithmId) + '" data-capability="generate" data-country-iban-generator="true">',
    '<div class="workbench-form-heading">',
    '<h3>' + escapeHtml(form.title) + '</h3>',
    '<span class="input-mode-badge" data-input-mode-badge>' + escapeHtml((config.countryCode || 'IBAN') + ' fixture ready') + '</span>',
    '</div>',
    '<div class="field-grid">',
    fields,
    '</div>',
    '<div class="button-row">',
    actions,
    '<button type="button" class="button button-secondary" data-tool-copy>Copy result</button>',
    '<button type="button" class="button button-secondary" data-tool-download>Download result</button>',
    '<button type="button" class="button button-ghost" data-tool-clear>Clear</button>',
    '</div>',
    '<label class="field output-field">',
    '<span>Output</span>',
    '<textarea class="tool-output" readonly data-tool-output></textarea>',
    '</label>',
    '<p class="tool-message" aria-live="polite" data-tool-message></p>',
    '<div class="tool-feedback" data-tool-feedback></div>',
    '<div class="preview-panel" data-tool-preview></div>',
    '<details class="advanced-panel" data-advanced-panel>',
    '<summary>Advanced analysis</summary>',
    '<div data-tool-advanced></div>',
    '</details>',
    '</form>',
    '</div>',
    '</section>'
  ].join('');
}

function renderGenericField(field) {
  const required = field.required ? ' required="required"' : '';
  if (field.type === 'textarea') {
    return [
      '<label class="field">',
      '<span>' + escapeHtml(field.label) + '</span>',
      '<textarea name="' + escapeHtml(field.name) + '"' + required + '></textarea>',
      '</label>'
    ].join('');
  }
  if (field.type === 'select') {
    return [
      '<label class="field">',
      '<span>' + escapeHtml(field.label) + '</span>',
      '<select name="' + escapeHtml(field.name) + '">',
      field.options.map(option => '<option value="' + escapeHtml(option) + '"' + (option === field.value ? ' selected' : '') + '>' + escapeHtml(option) + '</option>').join(''),
      '</select>',
      '</label>'
    ].join('');
  }
  if (field.type === 'checkbox') {
    return [
      '<label class="field field-checkbox">',
      '<input type="checkbox" name="' + escapeHtml(field.name) + '"' + (field.checked ? ' checked' : '') + '>',
      '<span>' + escapeHtml(field.label) + '</span>',
      '</label>'
    ].join('');
  }
  return [
    '<label class="field">',
    '<span>' + escapeHtml(field.label) + '</span>',
    '<input type="' + escapeHtml(field.type || 'text') + '" name="' + escapeHtml(field.name) + '" value="' + escapeHtml(field.value || '') + '"' + (field.min ? ' min="' + escapeHtml(field.min) + '"' : '') + (field.max ? ' max="' + escapeHtml(field.max) + '"' : '') + required + '>',
    '</label>'
  ].join('');
}

function renderGenericUtilityWorkbench(config) {
  const forms = config.forms.map(form => [
    '<form class="tool-workbench" id="tool-' + escapeHtml(config.id) + '-' + escapeHtml(form.capability) + '" data-algorithm-id="' + escapeHtml(config.algorithmId) + '" data-capability="' + escapeHtml(form.capability) + '">',
    '<div class="workbench-form-heading">',
    '<h3>' + escapeHtml(form.title) + '</h3>',
    '<span class="input-mode-badge" data-input-mode-badge>Waiting for input</span>',
    '</div>',
    '<div class="field-grid">',
    form.fields.map(renderGenericField).join(''),
    '</div>',
    '<div class="button-row">',
    form.actions.map((action, index) => '<button type="button" class="button ' + (index === 0 ? 'button-primary' : 'button-secondary') + '" data-action="' + escapeHtml(action) + '">' + escapeHtml(action.charAt(0).toUpperCase() + action.slice(1)) + '</button>').join(''),
    '<button type="button" class="button button-secondary" data-tool-copy>Copy result</button>',
    '<button type="button" class="button button-secondary" data-tool-download>Download result</button>',
    '<button type="button" class="button button-ghost" data-tool-clear>Clear</button>',
    '</div>',
    '<label class="field output-field">',
    '<span>Output</span>',
    '<textarea class="tool-output" readonly data-tool-output></textarea>',
    '</label>',
    '<p class="tool-message" aria-live="polite" data-tool-message></p>',
    '<div class="tool-feedback" data-tool-feedback></div>',
    '<div class="preview-panel" data-tool-preview></div>',
    '<details class="advanced-panel" data-advanced-panel>',
    '<summary>Advanced analysis</summary>',
    '<div data-tool-advanced></div>',
    '</details>',
    '</form>'
  ].join('')).join('');
  return [
    '<section class="workbench-card" aria-label="Tool input and output">',
    '<div class="workbench-list">',
    forms,
    '</div>',
    '</section>'
  ].join('');
}

function ensureGenericUtilityWorkbench(content, route) {
  const path = String(route.path || '');
  const slug = path.match(/^\/en\/tools\/([^/]+)\//)?.[1] || path.match(/^\/en\/[^/]+\/([^/]+)\//)?.[1];
  const countrySlug = path.match(/^\/en\/([^/]+)\/[^/]+\//)?.[1] || '';
  const algorithmMatch = content.match(/data-algorithm-id="([^"]+)"/);
  const config = slug
    ? GENERIC_UTILITY_WORKBENCHES[slug] || (algorithmMatch && algorithmMatch[1] === 'validohub.iban-generator' ? countryIbanGeneratorWorkbench(slug, countrySlug) || GENERIC_UTILITY_WORKBENCHES['iban-generator'] : null)
    : null;
  if (algorithmMatch && FACTORY_TOOL_ALGORITHMS.has(algorithmMatch[1])) return content;
  if (!config) return content;
  const workbench = config.isCountryIbanGenerator
    ? renderCountryIbanGeneratorWorkbench(config)
    : renderGenericUtilityWorkbench(config);
  let next = content;
  if (/<section class="workbench-card"[\s\S]*?<\/section>\s*<article class="content-card">/.test(next)) {
    next = next.replace(/<section class="workbench-card"[\s\S]*?<\/section>\s*<article class="content-card">/, workbench + '\n\n        <article class="content-card">');
  } else {
    next = next.replace(/<\/header>\s*<article class="content-card">/, '</header>\n\n        ' + workbench + '\n\n        <article class="content-card">');
  }
  return ensureWorkbenchScripts(next, 'generic-suite.js');
}

function collapseFactoryWorkbenchShell(content) {
  const match = content.match(/data-algorithm-id="([^"]+)"/);
  const algorithmId = match && match[1];
  if (!algorithmId || !FACTORY_TOOL_ALGORITHMS.has(algorithmId)) return content;
  const staticHost = [
    '<section class="workbench-card csf-static-host" aria-label="Premium country workbench" data-algorithm-id="' + escapeHtml(algorithmId) + '">',
    '</section>'
  ].join('');
  return content.replace(
    /<section class="workbench-card" aria-label="Tool input and output">[\s\S]*?<\/section>\s*(?=<(?:article|section) class="(?:content-card|related-section)")/,
    staticHost + '\n\n        '
  );
}

async function getConfiguredLocales() {
  const siteConfig = await readFile(resolve(projectRoot, 'site.yaml'), 'utf8');
  const inline = siteConfig.match(/^locales:\s*\[(.*?)\]\s*$/m);
  if (!inline) return ['en'];
  const values = inline[1]
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);
  return values.length > 0 ? values : ['en'];
}

async function pruneGeneratedLocaleDirectories(configuredLocales) {
  if (!(await pathExists(siteRoot))) return;
  const keep = new Set(configuredLocales);
  const localeDirPattern = /^[a-z]{2}(?:-[A-Z]{2})?$/;
  const entries = await readdir(siteRoot, { withFileTypes: true });
  const pruned = [];

  for (const entry of entries) {
    if (!entry.isDirectory() || !localeDirPattern.test(entry.name) || keep.has(entry.name)) continue;
    await rm(resolve(siteRoot, entry.name), { recursive: true, force: true });
    pruned.push(entry.name);
  }

  if (pruned.length) {
    console.log('✓ Pruned stale generated locale directories: ' + pruned.join(', '));
  } else {
    console.log('✓ No stale generated locale directories found');
  }
}

async function validateConfiguredLocaleSwitcher(configuredLocales) {
  const bundleSource = await readFile(resolve(projectRoot, 'assets', 'js', 'bundle.js'), 'utf8');
  const blockMatch = bundleSource.match(/const supportedLocales = \[([\s\S]*?)\];/);
  if (!blockMatch) {
    throw new Error('FATAL: Global language switcher supportedLocales block not found in assets/js/bundle.js');
  }

  const switcherLocales = Array.from(blockMatch[1].matchAll(/code:\s*['"]([^'"]+)['"]/g)).map(match => match[1]);
  const configured = [...configuredLocales];
  const extra = switcherLocales.filter(localeCode => !configured.includes(localeCode));
  const missing = configured.filter(localeCode => !switcherLocales.includes(localeCode));
  if (extra.length || missing.length) {
    throw new Error('FATAL: Language switcher locales must match site.yaml. Extra: ' + (extra.join(', ') || 'none') + '; missing: ' + (missing.join(', ') || 'none'));
  }
}

function splitRouteLocale(pathname) {
  const parts = String(pathname || '/').split('/').filter(Boolean);
  if (!parts.length) return { locale: 'en', suffix: '/' };
  const localeCode = parts[0];
  const suffixParts = parts.slice(1);
  const suffix = suffixParts.length ? `/${suffixParts.join('/')}/` : '/';
  return { locale: localeCode, suffix };
}

function routeForLocale(localeCode, suffix) {
  if (suffix === '/') {
    return `/${localeCode}/`;
  }
  return `/${localeCode}${suffix}`;
}

function localizedOutputPath(localePath) {
  return resolve(siteRoot, localePath.replace(/^\//, ''), 'index.html');
}

function rewriteHrefLocale(content, localeCode, routeRegistry) {
  return content.replace(/href="\/en\/([^"]*)"/g, (match, target) => {
    const normalizedTarget = String(target || '').replace(/^\/+/, '');
    const localizedCandidate = `/${localeCode}/${normalizedTarget}`;
    const normalizedLocalized = localizedCandidate.endsWith('/') ? localizedCandidate : `${localizedCandidate}/`;
    if (!routeRegistry.has(normalizedLocalized)) return match;
    return `href="${localizedCandidate}"`;
  });
}

function injectAlternateLinks(content, currentPath, routeRegistry, locales) {
  const { locale: currentLocale, suffix } = splitRouteLocale(currentPath);
  const alternateTags = [];
  for (const localeCode of locales) {
    const candidatePath = routeForLocale(localeCode, suffix);
    if (routeRegistry.has(candidatePath)) {
      alternateTags.push(`<link rel="alternate" hreflang="${localeCode}" href="https://validohub.com${candidatePath}">`);
    }
  }
  const englishPath = routeForLocale('en', suffix);
  if (routeRegistry.has(englishPath)) {
    alternateTags.push(`<link rel="alternate" hreflang="x-default" href="https://validohub.com${englishPath}">`);
  }

  let next = content.replace(/<link rel="alternate" hreflang="[^"]+" href="[^"]+">\s*/gi, '');
  const alternatesBlock = alternateTags.join('\n  ');
  if (alternatesBlock) {
    next = next.replace('</head>', `  ${alternatesBlock}\n</head>`);
  }

  // Keep the document language attribute in sync with route locale.
  next = next.replace(/<html\s+lang="[^"]+">/i, `<html lang="${currentLocale}">`);
  return next;
}

function normalizeUiLocale(localeCode) {
  const normalized = String(localeCode || '').toLowerCase();
  if (normalized.startsWith('pt-')) return 'pt-BR';
  if (normalized === 'de') return 'de';
  if (normalized === 'es') return 'es';
  if (normalized === 'pl') return 'pl';
  return 'en';
}

function applyUiLocaleTranslations(content, localeCode) {
  const uiLocale = normalizeUiLocale(localeCode);
  if (uiLocale === 'en') return content;

  const dictionary = {
    de: {
      home: 'Startseite',
      countries: 'Laender',
      identifiers: 'Kennungen',
      developerTools: 'Entwicklertools',
      finance: 'Finanzen',
      text: 'Text',
      tool: 'Werkzeug',
      runTool: 'Tool ausfuehren',
      relatedTools: 'Aehnliche Tools',
      continueWithRelated: 'Mit aehnlichen Tools fortfahren',
      validate: 'Pruefen',
      copyResult: 'Ergebnis kopieren',
      downloadResult: 'Ergebnis herunterladen',
      clear: 'Leeren',
      output: 'Ausgabe',
      waitingForInput: 'Warte auf Eingabe',
      advancedAnalysis: 'Erweiterte Analyse',
      faq: 'FAQ',
      expandAll: 'Alle ausklappen',
      collapseAll: 'Alle einklappen',
      references: 'Referenzen',
      officialSources: 'Offizielle Quellen',
      quickFacts: 'Kurzinfos',
      overview: 'Ueberblick',
      visualization: 'Visualisierung',
      implementation: 'Implementierung',
      summary: 'Zusammenfassung',
      testCases: 'Testfaelle',
      developers: 'Entwickler',
      frequentlyAskedQuestions: 'Haeufig gestellte Fragen',
      officialSourcesPlain: 'Offizielle Quellen',
      implementationGuidance: 'Implementierungshinweise',
      validationExamples: 'Validierungsbeispiele',
      visualStructureBreakdown: 'Visuelle Strukturaufteilung',
      moduloChecksumDetails: 'Modulo-Pruefsummen-Details',
      whatIs: 'Was ist',
      verificationMath: 'Pruefmathematik',
      issuingAuthority: 'Ausstellende Behoerde',
      developerGuidelines: 'Entwickler-Richtlinien',
      languageCodeSnippets: 'Sprach-Codebeispiele',
      field: 'Feld',
      positions: 'Positionen',
      description: 'Beschreibung',
      sampleInput: 'Beispieleingabe',
      status: 'Status',
      regionJurisdiction: 'Region / Gerichtsbarkeit',
      identifierCategory: 'Kennungskategorie',
      formatLength: 'Format und Laenge',
      statusBadge: 'Statusabzeichen',
      reviewed: 'Geprueft',
      localSpec: 'Lokale Spezifikation',
      draftSpecification: 'Entwurfsspezifikation',
      privacyAssured: 'Datenschutz zugesichert',
      serial: 'Seriennummer',
      region: 'Region',
      checksum: 'Pruefsumme',
      controlDigitComputed: 'Die Pruefziffer wird wie folgt berechnet:',
      multipliersFirst9: 'Multiplikatoren werden auf die ersten 9 Ziffern angewendet:',
      multipliersFirst10: 'Multiplikatoren werden auf die ersten 10 Ziffern angewendet:',
      firstChecksumDigit: 'Erste Pruefziffer (Ziffer 10)',
      secondChecksumDigit: 'Zweite Pruefziffer (Ziffer 11)',
      standardCpfStructure: 'Standard-CPF-Nummern bestehen aus genau 11 Ziffern und sind wie folgt aufgebaut:',
      whenImplementingCpf: 'Bei der Implementierung der CPF-Validierung:',
      officialPortal: 'Offizielles Portal',
      workbench: 'Werkbank',
      findCountryTool: 'Landes-Tool finden',
      clearCountryToolSearch: 'Suche leeren',
      mainNavigation: 'Hauptnavigation',
      breadcrumb: 'Pfadnavigation'
    },
    es: {
      home: 'Inicio',
      countries: 'Paises',
      identifiers: 'Identificadores',
      developerTools: 'Herramientas para desarrolladores',
      finance: 'Finanzas',
      text: 'Texto',
      tool: 'Herramienta',
      runTool: 'Ejecutar herramienta',
      relatedTools: 'Herramientas relacionadas',
      continueWithRelated: 'Continuar con herramientas relacionadas',
      validate: 'Validar',
      copyResult: 'Copiar resultado',
      downloadResult: 'Descargar resultado',
      clear: 'Limpiar',
      output: 'Salida',
      waitingForInput: 'Esperando entrada',
      advancedAnalysis: 'Analisis avanzado',
      faq: 'Preguntas frecuentes',
      expandAll: 'Expandir todo',
      collapseAll: 'Contraer todo',
      references: 'Referencias',
      officialSources: 'Fuentes oficiales',
      quickFacts: 'Datos rapidos',
      overview: 'Resumen',
      visualization: 'Visualizacion',
      implementation: 'Implementacion',
      summary: 'Resumen',
      testCases: 'Casos de prueba',
      developers: 'Desarrolladores',
      frequentlyAskedQuestions: 'Preguntas frecuentes',
      officialSourcesPlain: 'Fuentes oficiales',
      implementationGuidance: 'Guia de implementacion',
      validationExamples: 'Ejemplos de validacion',
      visualStructureBreakdown: 'Desglose de estructura visual',
      moduloChecksumDetails: 'Detalles de checksum modulo',
      whatIs: 'Que es',
      verificationMath: 'Matematica de verificacion',
      issuingAuthority: 'Autoridad emisora',
      developerGuidelines: 'Guia para desarrolladores',
      languageCodeSnippets: 'Fragmentos de codigo por lenguaje',
      field: 'Campo',
      positions: 'Posiciones',
      description: 'Descripcion',
      sampleInput: 'Entrada de ejemplo',
      status: 'Estado',
      regionJurisdiction: 'Region / Jurisdiccion',
      identifierCategory: 'Categoria del identificador',
      formatLength: 'Formato y longitud',
      statusBadge: 'Insignia de estado',
      reviewed: 'Revisado',
      localSpec: 'Especificacion local',
      draftSpecification: 'Especificacion en borrador',
      privacyAssured: 'Privacidad garantizada',
      serial: 'serie',
      region: 'region',
      checksum: 'checksum',
      controlDigitComputed: 'El digito de control se calcula de la siguiente forma:',
      multipliersFirst9: 'Los multiplicadores se aplican a los primeros 9 digitos:',
      multipliersFirst10: 'Los multiplicadores se aplican a los primeros 10 digitos:',
      firstChecksumDigit: 'Primer digito de control (Digito 10)',
      secondChecksumDigit: 'Segundo digito de control (Digito 11)',
      standardCpfStructure: 'Los numeros CPF estandar constan de exactamente 11 digitos estructurados asi:',
      whenImplementingCpf: 'Al implementar la validacion de CPF:',
      officialPortal: 'Portal oficial',
      workbench: 'Banco de trabajo',
      findCountryTool: 'Buscar herramienta del pais',
      clearCountryToolSearch: 'Limpiar busqueda',
      mainNavigation: 'Navegacion principal',
      breadcrumb: 'Ruta de navegacion'
    },
    pl: {
      home: 'Start',
      countries: 'Kraje',
      identifiers: 'Identyfikatory',
      developerTools: 'Narzedzia deweloperskie',
      finance: 'Finanse',
      text: 'Tekst',
      tool: 'Narzedzie',
      runTool: 'Uruchom narzedzie',
      relatedTools: 'Powiazane narzedzia',
      continueWithRelated: 'Przejdz do powiazanych narzedzi',
      validate: 'Sprawdz',
      copyResult: 'Kopiuj wynik',
      downloadResult: 'Pobierz wynik',
      clear: 'Wyczysc',
      output: 'Wynik',
      waitingForInput: 'Oczekiwanie na dane',
      advancedAnalysis: 'Analiza zaawansowana',
      faq: 'FAQ',
      expandAll: 'Rozwin wszystko',
      collapseAll: 'Zwin wszystko',
      references: 'Zrodla',
      officialSources: 'Oficjalne zrodla',
      quickFacts: 'Szybkie fakty',
      overview: 'Przeglad',
      visualization: 'Wizualizacja',
      implementation: 'Implementacja',
      summary: 'Podsumowanie',
      testCases: 'Przypadki testowe',
      developers: 'Deweloperzy',
      frequentlyAskedQuestions: 'Najczesciej zadawane pytania',
      officialSourcesPlain: 'Oficjalne zrodla',
      implementationGuidance: 'Wskazowki implementacyjne',
      validationExamples: 'Przyklady walidacji',
      visualStructureBreakdown: 'Podzial struktury wizualnej',
      moduloChecksumDetails: 'Szczegoly sumy kontrolnej modulo',
      whatIs: 'Czym jest',
      verificationMath: 'Matematyka weryfikacji',
      issuingAuthority: 'Organ wydajacy',
      developerGuidelines: 'Wytyczne dla deweloperow',
      languageCodeSnippets: 'Fragmenty kodu jezykow',
      field: 'Pole',
      positions: 'Pozycje',
      description: 'Opis',
      sampleInput: 'Przykladowe dane',
      status: 'Status',
      regionJurisdiction: 'Region / Jurysdykcja',
      identifierCategory: 'Kategoria identyfikatora',
      formatLength: 'Format i dlugosc',
      statusBadge: 'Odznaka statusu',
      reviewed: 'Sprawdzone',
      localSpec: 'Lokalna specyfikacja',
      draftSpecification: 'Wersja robocza specyfikacji',
      privacyAssured: 'Prywatnosc zapewniona',
      serial: 'seria',
      region: 'region',
      checksum: 'suma kontrolna',
      controlDigitComputed: 'Cyfra kontrolna jest obliczana nastepujaco:',
      multipliersFirst9: 'Mnozniki stosuje sie do pierwszych 9 cyfr:',
      multipliersFirst10: 'Mnozniki stosuje sie do pierwszych 10 cyfr:',
      firstChecksumDigit: 'Pierwsza cyfra kontrolna (Cyfra 10)',
      secondChecksumDigit: 'Druga cyfra kontrolna (Cyfra 11)',
      standardCpfStructure: 'Standardowe numery CPF skladaja sie dokladnie z 11 cyfr o strukturze:',
      whenImplementingCpf: 'Podczas wdrazania walidacji CPF:',
      officialPortal: 'Portal oficjalny',
      workbench: 'Workbench',
      findCountryTool: 'Znajdz narzedzie kraju',
      clearCountryToolSearch: 'Wyczysc wyszukiwanie',
      mainNavigation: 'Nawigacja glowna',
      breadcrumb: 'Okruszki'
    },
    'pt-BR': {
      home: 'Inicio',
      countries: 'Paises',
      identifiers: 'Identificadores',
      developerTools: 'Ferramentas para desenvolvedores',
      finance: 'Financas',
      text: 'Texto',
      tool: 'Ferramenta',
      runTool: 'Executar ferramenta',
      relatedTools: 'Ferramentas relacionadas',
      continueWithRelated: 'Continuar com ferramentas relacionadas',
      validate: 'Validar',
      copyResult: 'Copiar resultado',
      downloadResult: 'Baixar resultado',
      clear: 'Limpar',
      output: 'Saida',
      waitingForInput: 'Aguardando entrada',
      advancedAnalysis: 'Analise avancada',
      faq: 'Perguntas frequentes',
      expandAll: 'Expandir tudo',
      collapseAll: 'Recolher tudo',
      references: 'Referencias',
      officialSources: 'Fontes oficiais',
      quickFacts: 'Resumo rapido',
      overview: 'Visao geral',
      visualization: 'Visualizacao',
      implementation: 'Implementacao',
      summary: 'Resumo',
      testCases: 'Casos de teste',
      developers: 'Desenvolvedores',
      frequentlyAskedQuestions: 'Perguntas frequentes',
      officialSourcesPlain: 'Fontes oficiais',
      implementationGuidance: 'Guia de implementacao',
      validationExamples: 'Exemplos de validacao',
      visualStructureBreakdown: 'Quebra da estrutura visual',
      moduloChecksumDetails: 'Detalhes do checksum modulo',
      whatIs: 'O que e',
      verificationMath: 'Matematica de verificacao',
      issuingAuthority: 'Autoridade emissora',
      developerGuidelines: 'Diretrizes para desenvolvedores',
      languageCodeSnippets: 'Trechos de codigo por linguagem',
      field: 'Campo',
      positions: 'Posicoes',
      description: 'Descricao',
      sampleInput: 'Entrada de exemplo',
      status: 'Status',
      regionJurisdiction: 'Regiao / Jurisdicao',
      identifierCategory: 'Categoria do identificador',
      formatLength: 'Formato e comprimento',
      statusBadge: 'Selo de status',
      reviewed: 'Revisado',
      localSpec: 'Especificacao local',
      draftSpecification: 'Especificacao em rascunho',
      privacyAssured: 'Privacidade assegurada',
      serial: 'serie',
      region: 'regiao',
      checksum: 'checksum',
      controlDigitComputed: 'O digito de controle e calculado da seguinte forma:',
      multipliersFirst9: 'Os multiplicadores sao aplicados aos primeiros 9 digitos:',
      multipliersFirst10: 'Os multiplicadores sao aplicados aos primeiros 10 digitos:',
      firstChecksumDigit: 'Primeiro digito de controle (Digito 10)',
      secondChecksumDigit: 'Segundo digito de controle (Digito 11)',
      standardCpfStructure: 'Os numeros CPF padrao consistem em exatamente 11 digitos estruturados assim:',
      whenImplementingCpf: 'Ao implementar a validacao de CPF:',
      officialPortal: 'Portal oficial',
      workbench: 'Workbench',
      findCountryTool: 'Encontrar ferramenta do pais',
      clearCountryToolSearch: 'Limpar busca',
      mainNavigation: 'Navegacao principal',
      breadcrumb: 'Trilha de navegacao'
    }
  };

  const t = dictionary[uiLocale];
  let next = content;

  const replacements = [
    ['>Home<', `>${t.home}<`],
    ['>Countries<', `>${t.countries}<`],
    ['>Identifiers<', `>${t.identifiers}<`],
    ['>Developer Tools<', `>${t.developerTools}<`],
    ['>Finance<', `>${t.finance}<`],
    ['>Text<', `>${t.text}<`],
    ['>Tool<', `>${t.tool}<`],
    ['>Run the tool<', `>${t.runTool}<`],
    ['>Related tools<', `>${t.relatedTools}<`],
    ['>Continue with related tools<', `>${t.continueWithRelated}<`],
    ['>Validate<', `>${t.validate}<`],
    ['>Copy result<', `>${t.copyResult}<`],
    ['>Download result<', `>${t.downloadResult}<`],
    ['>Clear<', `>${t.clear}<`],
    ['>Output<', `>${t.output}<`],
    ['>Waiting for input<', `>${t.waitingForInput}<`],
    ['>Advanced analysis<', `>${t.advancedAnalysis}<`],
    ['>FAQ<', `>${t.faq}<`],
    ['>Expand All<', `>${t.expandAll}<`],
    ['>Collapse All<', `>${t.collapseAll}<`],
    ['>References<', `>${t.references}<`],
    ['>Official Registry Sources<', `>${t.officialSources}<`],
    ['>Official Sources<', `>${t.officialSourcesPlain}<`],
    ['>Quick Facts<', `>${t.quickFacts}<`],
    ['>Overview<', `>${t.overview}<`],
    ['>Summary<', `>${t.summary}<`],
    ['>Visualization<', `>${t.visualization}<`],
    ['>Implementation<', `>${t.implementation}<`],
    ['>Test cases<', `>${t.testCases}<`],
    ['>Developers<', `>${t.developers}<`],
    ['>Frequently Asked Questions<', `>${t.frequentlyAskedQuestions}<`],
    ['>Implementation Guidance<', `>${t.implementationGuidance}<`],
    ['>Validation Examples<', `>${t.validationExamples}<`],
    ['>Visual Structure Breakdown<', `>${t.visualStructureBreakdown}<`],
    ['>Modulo Checksum Details<', `>${t.moduloChecksumDetails}<`],
    ['>Verification Math<', `>${t.verificationMath}<`],
    ['>Issuing Authority<', `>${t.issuingAuthority}<`],
    ['>Developer Guidelines<', `>${t.developerGuidelines}<`],
    ['>Language Code Snippets<', `>${t.languageCodeSnippets}<`],
    ['>Field<', `>${t.field}<`],
    ['>Positions<', `>${t.positions}<`],
    ['>Description<', `>${t.description}<`],
    ['>Sample Input<', `>${t.sampleInput}<`],
    ['>Status<', `>${t.status}<`],
    ['>Region / Jurisdiction<', `>${t.regionJurisdiction}<`],
    ['>Identifier Category<', `>${t.identifierCategory}<`],
    ['>Format & Length<', `>${t.formatLength}<`],
    ['>Status Badge<', `>${t.statusBadge}<`],
    ['>Reviewed:<', `>${t.reviewed}:<`],
    ['>Local Spec<', `>${t.localSpec}<`],
    ['>Draft specification<', `>${t.draftSpecification}<`],
    ['>Privacy Assured<', `>${t.privacyAssured}<`],
    ['>serial<', `>${t.serial}<`],
    ['>region<', `>${t.region}<`],
    ['>checksum<', `>${t.checksum}<`],
    ['The control digit is computed as:', t.controlDigitComputed],
    ['Multipliers are applied to the first 9 digits:', t.multipliersFirst9],
    ['Multipliers are applied to the first 10 digits:', t.multipliersFirst10],
    ['First Checksum Digit (Digit 10)', t.firstChecksumDigit],
    ['Second Checksum Digit (Digit 11)', t.secondChecksumDigit],
    ['Standard CPF numbers consist of exactly 11 digits structured as:', t.standardCpfStructure],
    ['When implementing CPF validation:', t.whenImplementingCpf],
    ['>Official portal<', `>${t.officialPortal}<`],
    ['>What is ', `>${t.whatIs} `],
    ['>Workbench<', `>${t.workbench}<`],
    ['>Find a country tool<', `>${t.findCountryTool}<`],
    ['>Clear country tool search<', `>${t.clearCountryToolSearch}<`],
    ['aria-label="Main navigation"', `aria-label="${t.mainNavigation}"`],
    ['aria-label="Breadcrumb"', `aria-label="${t.breadcrumb}"`]
  ];

  for (const [from, to] of replacements) {
    next = next.split(from).join(to);
  }
  return next;
}

function localizedChromeLabels(localeCode) {
  const locale = String(localeCode || 'en');
  const dictionary = {
    en: { home: 'Home', tools: 'Tools', countries: 'Countries', identifiers: 'Identifiers', navigation: 'Main navigation' },
    fr: { home: 'Accueil', tools: 'Outils', countries: 'Pays', identifiers: 'Identifiants', navigation: 'Navigation principale' },
    uk: { home: 'Головна', tools: 'Інструменти', countries: 'Країни', identifiers: 'Ідентифікатори', navigation: 'Головна навігація' },
    de: { home: 'Startseite', tools: 'Tools', countries: 'Länder', identifiers: 'Kennungen', navigation: 'Hauptnavigation' },
    es: { home: 'Inicio', tools: 'Herramientas', countries: 'Países', identifiers: 'Identificadores', navigation: 'Navegación principal' },
    pl: { home: 'Start', tools: 'Narzędzia', countries: 'Kraje', identifiers: 'Identyfikatory', navigation: 'Nawigacja główna' },
    'pt-BR': { home: 'Início', tools: 'Ferramentas', countries: 'Países', identifiers: 'Identificadores', navigation: 'Navegação principal' }
  };
  return dictionary[locale] || dictionary.en;
}

function normalizePrimaryNavigation(content, localeCode = 'en', routePath = '') {
  const labels = localizedChromeLabels(localeCode);
  const prefix = `/${localeCode}/`;
  const isGlobalTool = routePath.includes('/tools/');
  const isIdentifier = routePath.includes('/identifiers/') || routePath.includes('/categories/national-identifiers/');
  const routeParts = routePath.split('/').filter(Boolean);
  const isCountryArea = routePath.includes('/countries/') || (!isGlobalTool && !isIdentifier && routeParts.length >= 2);
  const link = (href, label, active) => `<a href="${href}"${active ? ' aria-current="page" class="is-active"' : ''}>${escapeHtml(label)}</a>`;
  const nav = `<nav class="primary-nav" aria-label="${escapeHtml(labels.navigation)}">`
    + link(prefix, labels.home, routePath === prefix)
    + link(`${prefix}tools/`, labels.tools, routePath.includes('/tools/'))
    + link(`${prefix}countries/`, labels.countries, isCountryArea)
    + link(`${prefix}categories/national-identifiers/`, labels.identifiers, isIdentifier)
    + '</nav>';

  return content.replace(/<nav class="primary-nav"[^>]*>[\s\S]*?<\/nav>/g, nav);
}

function removeGeneratedFooterText(content) {
  return content.replace(/\s*<p>[^<]*Valido Engine\.?[^<]*<\/p>/giu, '');
}

function normalizeGeneratedChrome(content, localeCode = 'en', routePath = '') {
  return removeGeneratedFooterText(normalizePrimaryNavigation(content, localeCode, routePath));
}

function localizeSeoUrls(content, localeCode) {
  const locale = String(localeCode || 'en');
  if (locale === 'en') return content;

  return content
    .replace(
      /<link rel="canonical" href="https:\/\/validohub\.com\/en\//g,
      `<link rel="canonical" href="https://validohub.com/${locale}/`
    )
    .replace(/("url"\s*:\s*")https:\/\/validohub\.com\/en\//g, `$1https://validohub.com/${locale}/`)
    .replace(/("url"\s*:\s*")https:\\\/\\\/validohub\.com\\\/en\\\//g, `$1https:\/\/validohub.com\/${locale}\/`)
    .replace(/content="\/en\//g, `content="/${locale}/`);
}

async function ensureLocalizedRouteFallbacks(routeRegistry, assetsManifest) {
  const locales = await getConfiguredLocales();
  const allRoutes = routeRegistry.getAll();
  const englishRoutes = allRoutes.filter(route => route.path.startsWith('/en/'));

  // Register missing locale routes for every English route.
  for (const localeCode of locales) {
    if (localeCode === 'en') continue;

    for (const englishRoute of englishRoutes) {
      const { suffix } = splitRouteLocale(englishRoute.path);
      const localizedPath = routeForLocale(localeCode, suffix);
      if (routeRegistry.has(localizedPath)) continue;

      routeRegistry.register(localizedPath, {
        type: englishRoute.type,
        title: englishRoute.title,
        sourceOwner: 'node',
        outputPath: localizedOutputPath(localizedPath),
        metadata: {
          fallback: true,
          sourcePath: englishRoute.path,
          locale: localeCode
        }
      });
    }
  }

  // Materialize any route that is still missing output by cloning the English equivalent.
  await runWithConcurrency(routeRegistry.getAll(), async (route) => {
    const { locale: routeLocale, suffix } = splitRouteLocale(route.path);
    if (routeLocale === 'en') return;
    if (await pathExists(route.outputPath)) return;

    const englishPath = routeForLocale('en', suffix);
    const englishRoute = routeRegistry.get(englishPath);
    if (!englishRoute || !(await pathExists(englishRoute.outputPath))) {
      return;
    }

    let localizedContent = await readFile(englishRoute.outputPath, 'utf8');
    localizedContent = rewriteHrefLocale(localizedContent, routeLocale, routeRegistry);
    localizedContent = localizedContent.replace(/<html\s+lang="[^"]+">/i, `<html lang="${routeLocale}">`);
    localizedContent = localizedContent.replace(/"inLanguage"\s*:\s*"en"/g, `"inLanguage":"${routeLocale}"`);
    localizedContent = localizeSeoUrls(localizedContent, routeLocale);

    await mkdir(dirname(route.outputPath), { recursive: true });
    await writeFile(route.outputPath, localizedContent, 'utf8');
    console.log(`✓ Generated localized route fallback: ${route.path}`);
  });

  // Normalize alternate locale links and locale-pinned internal hrefs on every route.
  await runWithConcurrency(routeRegistry.getAll(), async (route) => {
    if (!(await pathExists(route.outputPath))) return;
    const { locale: routeLocale } = splitRouteLocale(route.path);
    let content = await readFile(route.outputPath, 'utf8');
    const original = content;
    if (routeLocale !== 'en') {
      content = rewriteHrefLocale(content, routeLocale, routeRegistry);
      content = localizeSeoUrls(content, routeLocale);
      content = applyUiLocaleTranslations(content, routeLocale);
    }
    content = normalizeGeneratedChrome(content, routeLocale, route.path);
    content = injectAlternateLinks(content, route.path, routeRegistry, locales);
    if (content !== original) {
      await writeFile(route.outputPath, content, 'utf8');
    }
  });
}

function pageTitleForDocumentation(content, route) {
  if (route.title && route.title !== 'Java Component') return route.title;
  const match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (match) return stripHtml(match[1]);
  const slug = route.path.split('/').filter(Boolean).pop() || 'tool';
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function humanizeDocumentationSections(content, route) {
  if (!/<summary>(developer-examples|examples|explanation|faq|references)<\/summary>/i.test(content)) {
    return content;
  }
  const title = pageTitleForDocumentation(content, route);
  const safeTitle = escapeHtml(title);
  const labels = {
    'developer-examples': safeTitle + ' developer examples',
    examples: safeTitle + ' practical examples',
    explanation: 'How ' + safeTitle + ' works',
    faq: safeTitle + ' questions and edge cases',
    references: safeTitle + ' references and limits'
  };
  let next = content.replace(/<h2>Reference notes<\/h2>/g, '<h2>' + safeTitle + ' guide</h2>');
  for (const [raw, label] of Object.entries(labels)) {
    next = next.replace(new RegExp('<summary>' + raw + '<\/summary>', 'g'), '<summary>' + label + '</summary>');
  }
  return next;
}

function keepCountrySuiteRelatedLinksLocal(content, route) {
  const routePath = String(route.path || '');
  const match = routePath.match(/^\/en\/([^/]+)\/([^/]+)\/?$/);
  if (!match) return content;
  const countrySlug = match[1];
  const toolSlug = match[2];
  const isCountryTool = toolSlug.startsWith(`${countrySlug}-`) || (countrySlug === 'germany' && toolSlug.startsWith('german-'));
  if (!isCountryTool) return content;
  if (!content.includes('class="related-section"')) return content;
  const normalizedPath = routePath.endsWith('/') ? routePath : `${routePath}/`;
  const allowedPrefix = `/en/${countrySlug}/`;

  return content.replace(/<section class="related-section(?:\s[^"]*)?">([\s\S]*?)<\/section>/g, (section) => {
    if (section.includes('vh-tool-related-footer')) return section;
    return section.replace(/<a href="([^"]+)" class="link-card">[\s\S]*?<\/a>/g, (card, href) => {
      const normalizedHref = href.endsWith('/') ? href : `${href}/`;
      return normalizedHref.startsWith(allowedPrefix) && normalizedHref !== normalizedPath ? card : '';
    });
  });
}

// 2. Post-process Java-owned pages to use hashed assets, strip inline styles, and inject schema JSON-LD
async function postProcessJavaPages(routeRegistry, assetsManifest) {
  const javaRoutes = routeRegistry.getAll().filter(r => r.sourceOwner === 'java');
  
  for (const route of javaRoutes) {
    const filePath = route.outputPath;
    if (await pathExists(filePath)) {
      let content = await readFile(filePath, 'utf8');

      // Safely sanitize markdown leakage in public text nodes using placeholders
      const placeholders = [];
      content = content
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, (match) => {
          placeholders.push(match);
          return `<!--__PLACEHOLDER_${placeholders.length - 1}__-->`;
        })
        .replace(/<pre[^>]*>[\s\S]*?<\/pre>/gi, (match) => {
          placeholders.push(match);
          return `<!--__PLACEHOLDER_${placeholders.length - 1}__-->`;
        })
        .replace(/<code[^>]*>[\s\S]*?<\/code>/gi, (match) => {
          placeholders.push(match);
          return `<!--__PLACEHOLDER_${placeholders.length - 1}__-->`;
        });

      // Perform markdown corrections
      content = content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code>$1</code>');

      // Restore placeholders
      content = content.replace(/<!--__PLACEHOLDER_(\d+)__-->/g, (match, index) => {
        return placeholders[parseInt(index)];
      });

      content = humanizeDocumentationSections(content, route);
      content = ensureGenericUtilityWorkbench(content, route);
      content = collapseFactoryWorkbenchShell(content);
      content = ensureToolScript(content);
      content = keepCountrySuiteRelatedLinksLocal(content, route);
      content = normalizeGeneratedChrome(content, splitRouteLocale(route.path).locale, route.path);

      // Force current hashed bundles on Java-owned pages to avoid stale hash drift across publish stages.
      content = content.replace(/<link rel="stylesheet" href="\/assets\/css\/bundle\.[a-f0-9]{6}\.css">/gi, `<link rel="stylesheet" href="${assetsManifest.css}">`);
      content = content.replace(/<script src="\/assets\/js\/bundle\.[a-f0-9]{6}\.js"><\/script>/gi, `<script src="${assetsManifest.js}"></script>`);

      // Determine proper JSON-LD schema
      let type = 'WebPage';
      let title = route.title || 'ValidoHub';
      let description = 'Validation, generation, parsing, encoding, and conversion tools.';
      
      if (route.path.includes('/tools/') || route.path.includes('validator')) {
        type = 'SoftwareApplication';
        const toolName = route.path.split('/').filter(Boolean).pop();
        title = toolName.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        description = `Run interactive ${title} checks and validations.`;
      } else if (route.path.includes('/categories/')) {
        type = 'CollectionPage';
        const catName = route.path.split('/').filter(Boolean).pop();
        title = catName.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) + ' Tools';
        description = `Explore utility tools for ${title.toLowerCase()}.`;
      }

      content = normalizeSeoHead(content, route, title, description);

      const jsonLd = {
        "@context": "https://schema.org",
        "@type": type,
        "name": title,
        "description": description,
        "url": `https://validohub.com${route.path}`
      };

      if (type === 'SoftwareApplication') {
        jsonLd.applicationCategory = "DeveloperApplication";
        jsonLd.operatingSystem = "All";
      }

      const escapedJson = JSON.stringify(jsonLd)
        .replace(/&/g, '\\u0026')
        .replace(/</g, '\\u003c')
        .replace(/>/g, '\\u003e');

      const jsonLdScript = `<script type="application/ld+json">${escapedJson}</script>`;
      content = content.replace('</head>', `${jsonLdScript}\n</head>`);

      await writeFile(filePath, content, 'utf8');
      console.log(`✓ Post-processed Java page: ${route.path}`);
    }
  }
}

async function normalizeGeneratedChromeFiles(routeRegistry) {
  let updated = 0;
  for (const route of routeRegistry.getAll()) {
    if (!(await pathExists(route.outputPath))) continue;
    const { locale: routeLocale } = splitRouteLocale(route.path);
    const content = await readFile(route.outputPath, 'utf8');
    const next = normalizeGeneratedChrome(content, routeLocale, route.path);
    if (next !== content) {
      await writeFile(route.outputPath, next, 'utf8');
      updated += 1;
    }
  }
  if (updated > 0) {
    console.log(`✓ Normalized chrome on ${updated} generated pages`);
  }
}

// 3. Write final sitemap index and locale shards
async function writeSitemap(routeRegistry) {
  const routes = routeRegistry.getAll().sort((a, b) => a.path.localeCompare(b.path));
  const groups = new Map();
  for (const route of routes) {
    const { locale: routeLocale } = splitRouteLocale(route.path);
    if (!groups.has(routeLocale)) groups.set(routeLocale, []);
    groups.get(routeLocale).push(route);
  }

  const sitemapFiles = [];
  for (const [routeLocale, localeRoutes] of [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const urls = localeRoutes
      .map(route => `<url><loc>https://validohub.com${route.path}</loc></url>`)
      .join('');
    const shardName = `sitemap-${routeLocale}.xml`;
    const shardContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
    await writeFile(resolve(siteRoot, shardName), shardContent, 'utf8');
    sitemapFiles.push(shardName);
  }

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapFiles.map(file => `<sitemap><loc>https://validohub.com/${file}</loc></sitemap>`).join('\n')}
</sitemapindex>
`;

  await writeFile(resolve(siteRoot, 'sitemap.xml'), sitemapContent, 'utf8');
  console.log(`✓ Wrote sitemap.xml index with ${routes.length} routes across ${sitemapFiles.length} shard(s)`);
}

// 4. Recursive folder scanner
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

async function normalizeWorkbenchScriptVersions() {
  const htmlFiles = await scanFolderHtmlFiles(siteRoot);
  const scriptRegex = /<script src="(\/assets\/js\/(?:workbench|tools)\/[^"?]+)(?:\?[^"]*)?"><\/script>/g;
  for (const filePath of htmlFiles) {
    const content = await readFile(filePath, 'utf8');
    const next = content.replace(scriptRegex, (match, src) => {
      return `<script src="${src}?v=${versionForWorkbenchScript(src)}"></script>`;
    });
    if (next !== content) {
      await writeFile(filePath, next, 'utf8');
    }
  }
}

async function ensureGeneratedToolScripts() {
  const htmlFiles = await scanFolderHtmlFiles(siteRoot);
  let updated = 0;
  for (const filePath of htmlFiles) {
    const content = await readFile(filePath, 'utf8');
    const next = ensureToolScript(content);
    if (next !== content) {
      await writeFile(filePath, next, 'utf8');
      updated++;
    }
  }
  console.log(`✓ Ensured tool script dependencies on ${updated} generated pages`);
}

async function compactGeneratedSearchIndex() {
  const indexPath = resolve(siteRoot, 'search-index.json');
  if (!(await pathExists(indexPath))) return { before: 0, after: 0, count: 0 };
  const source = await readFile(indexPath, 'utf8');
  const before = Buffer.byteLength(source);
  const parsed = JSON.parse(source);
  const tools = Array.isArray(parsed.tools) ? parsed.tools : [];
  const compact = {
    tools: tools.map(item => {
      const next = {};
      for (const key of ['toolId', 'title', 'country', 'category', 'route']) {
        const value = item[key];
        if (value !== undefined && value !== null && value !== '') next[key] = value;
      }
      return next;
    })
  };
  const payload = JSON.stringify(compact);
  await writeFile(indexPath, payload, 'utf8');
  return { before, after: Buffer.byteLength(payload), count: tools.length };
}

async function pruneCountrySuiteRelatedLinksToCountry() {
  const htmlFiles = await scanFolderHtmlFiles(siteRoot);
  let updated = 0;
  for (const filePath of htmlFiles) {
    const normalizedFilePath = filePath.replace(/\\/g, '/');
    const match = normalizedFilePath.match(/\/generated\/validohub\/([^/]+)\/([^/]+)\/([^/]+)\/index\.html$/);
    if (!match) continue;

    const localeCode = match[1];
    const countrySlug = match[2];
    const toolSlug = match[3];
    const isCountryTool = toolSlug.startsWith(`${countrySlug}-`) || (countrySlug === 'germany' && toolSlug.startsWith('german-'));
    if (!isCountryTool) continue;
    const relativePagePath = '/' + normalizedFilePath
      .slice(normalizedFilePath.indexOf('/generated/validohub/') + '/generated/validohub/'.length)
      .replace(/index\.html$/, '');
    const allowedPrefix = `/${localeCode}/${countrySlug}/`;
    const pagePath = relativePagePath.endsWith('/') ? relativePagePath : `${relativePagePath}/`;
    const content = await readFile(filePath, 'utf8');
    if (!content.includes('class="related-section"')) continue;

    const next = content.replace(/<section class="related-section(?:\s[^"]*)?">[\s\S]*?<\/section>/g, (section) => {
      if (section.includes('vh-tool-related-footer')) return section;
      return section.replace(/<a href="([^"]+)" class="link-card">[\s\S]*?<\/a>/g, (card, href) => {
        const normalizedHref = href.endsWith('/') ? href : `${href}/`;
        return normalizedHref.startsWith(allowedPrefix) && normalizedHref !== pagePath ? card : '';
      });
    });

    if (next !== content) {
      await writeFile(filePath, next, 'utf8');
      updated++;
    }
  }
  console.log(`✓ Pruned country suite related links to same-country routes on ${updated} pages`);
}

// 5. Build Validations Checks
async function validateSiteOutput(routeRegistry, assetsManifest) {
  console.log('--- Pass 3: Running Site Integrity Validations ---');
  const htmlFiles = await scanFolderHtmlFiles(siteRoot);
  let totalHtmlSize = 0;
  let emptySectionsPruned = 0;
  let linksValidated = 0;
  let jsonLdGenerated = 0;

  const ALGORITHM_TO_SCRIPT = {
    ...TOOL_SCRIPT_BY_ALGORITHM,
    'validohub.base64-decoder': 'base64.js',
    'validohub.base64': 'base64.js',
    'validohub.json-formatter': 'json.js',
    'validohub.json-validator': 'json.js',
    'validohub.jwt-decoder': 'jwt.js',
    'validohub.url-decoder': 'url.js',
    'validohub.url-encoder': 'url.js'
  };

  const forbiddenPhrases = [
    'Draft editorial scaffold',
    'This block will describe',
    'This block will contain',
    'This block will answer',
    'This block will list',
    'This block will include'
  ];

  for (const filePath of htmlFiles) {
    const content = await readFile(filePath, 'utf8');
    totalHtmlSize += Buffer.byteLength(content, 'utf8');
    const relativePath = '/' + filePath.replace(siteRoot, '').replace(/index\.html$/, '').replace(/^\//, '');

    // 1. Placeholder Content Guard — Node-owned pages only (Constraint 6)
    // Java-owned tool documentation sections are editorially managed separately
    const isNodeOwned = relativePath.startsWith('/en/countries') ||
                        relativePath.startsWith('/en/identifiers/') ||
                        /^\/en\/[a-z]+\/$/.test(relativePath); // country hub paths
    if (isNodeOwned) {
      for (const phrase of forbiddenPhrases) {
        const regex = new RegExp('\\b' + phrase.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\b', 'i');
        if (regex.test(content)) {
          throw new Error(`FATAL: Forbidden placeholder phrase "${phrase}" detected in route: ${relativePath}`);
        }
      }
    }

    if (content.includes('[object Object]')) {
      throw new Error(`FATAL: JavaScript object serialization artifact "[object Object]" detected in route: ${relativePath}`);
    }

    const isCountryHubOutput = /^\/[a-z]{2}(?:-[A-Z]{2})?\/[a-z-]+\/$/.test(relativePath) && !relativePath.includes('/categories/') && !relativePath.includes('/identifiers/');
    if (isCountryHubOutput) {
      if (/class="[^"]*vh-country-info-card[^"]*"[\s\S]*?<h3>\s*<\/h3>/.test(content)) {
        throw new Error(`FATAL: Empty country info-card title detected in route: ${relativePath}`);
      }
      if (/class="[^"]*vh-country-info-card[^"]*"[\s\S]*?<p class="vh-(?:mt-xs vh-mb-xs|mb-xs vh-mt-xs)">\s*<\/p>/.test(content)) {
        throw new Error(`FATAL: Empty country info-card summary detected in route: ${relativePath}`);
      }
    }

    // 2. CSS Delivery Guard (Constraint 3)
    const cssLinks = content.match(/<link[^>]*rel="stylesheet"[^>]*>/gi) || [];
    if (cssLinks.length !== 1) {
      throw new Error(`FATAL: Route ${relativePath} has ${cssLinks.length} stylesheet link(s) (Expected exactly 1)`);
    }
    const expectedLink = `<link rel="stylesheet" href="${assetsManifest.css}">`;
    if (!content.includes(expectedLink)) {
      throw new Error(`FATAL: Route ${relativePath} is missing link to current CSS bundle: ${assetsManifest.css}`);
    }
    if (content.includes('href="/assets/css/layout.css"') || content.includes('href="/assets/css/base.css"') || content.includes('href="/assets/css/reset.css"')) {
      throw new Error(`FATAL: Route ${relativePath} contains links to individual CSS source files`);
    }
    if (/<style[^>]*>[\s\S]*?<\/style>/gi.test(content)) {
      throw new Error(`FATAL: Route ${relativePath} contains forbidden inline <style> blocks`);
    }

    // 3. Javascript Delivery & Dynamic Mapping (Constraint 4)
    const algoMatch = content.match(/data-algorithm-id="([^"]+)"/);
    if (algoMatch) {
      const algoId = algoMatch[1];
      const mappedScript = ALGORITHM_TO_SCRIPT[algoId];
      if (!mappedScript) {
        throw new Error(`FATAL: Missing active script mapping or handler for algorithm ID: ${algoId} on route ${relativePath}`);
      }

      const mappedScripts = Array.isArray(mappedScript) ? mappedScript : [mappedScript];
      const expectedScripts = [];
      for (const scriptName of mappedScripts) {
        const scriptPath = resolve(projectRoot, 'assets', 'js', 'tools', scriptName);
        if (await pathExists(scriptPath)) expectedScripts.push(scriptName);
      }
      if (expectedScripts.length > 0) {
        for (const scriptName of expectedScripts) {
          const expectedScriptRegex = new RegExp(`<script src="/assets/js/tools/${scriptName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:\\?[^"]*)?"></script>`);
          if (!expectedScriptRegex.test(content)) {
            throw new Error(`FATAL: Validator page ${relativePath} is missing script tag for /assets/js/tools/${scriptName}`);
          }
        }
        for (let i = 1; i < expectedScripts.length; i++) {
          const previousScript = expectedScripts[i - 1];
          const currentScript = expectedScripts[i];
          const previousScriptRegex = new RegExp(`<script src="/assets/js/tools/${previousScript.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:\\?[^"]*)?"></script>`);
          const currentScriptRegex = new RegExp(`<script src="/assets/js/tools/${currentScript.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:\\?[^"]*)?"></script>`);
          const previousIndex = content.search(previousScriptRegex);
          const currentIndex = content.search(currentScriptRegex);
          if (previousIndex === -1 || currentIndex === -1 || previousIndex > currentIndex) {
            throw new Error(`FATAL: Validator page ${relativePath} loads ${currentScript} before required dependency ${previousScript}`);
          }
        }

        const allowedScripts = new Set(expectedScripts);
        const otherScriptRegex = /<script[^>]*src="\/assets\/js\/tools\/([^"?]+)(?:\?[^"]*)?"[^>]*>/gi;
        let otherMatch;
        while ((otherMatch = otherScriptRegex.exec(content)) !== null) {
          if (!allowedScripts.has(otherMatch[1])) {
            throw new Error(`FATAL: Validator page ${relativePath} loaded duplicate/unrelated script: ${otherMatch[1]}`);
          }
        }
      }
      // Tools without a dedicated script file use the workbench bundle for their logic
    } else {
      // Non-interactive pages must not load workbench or tool-specific scripts
      if (content.includes('/assets/js/tools/') || content.includes('/assets/js/workbench/')) {
        throw new Error(`FATAL: Non-interactive page ${relativePath} loaded workbench/tool scripts unnecessarily`);
      }
    }

    // A. Single visible H1 Check
    const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/gi;
    let h1Matches = [];
    let match;
    while ((match = h1Regex.exec(content)) !== null) {
      h1Matches.push(match[1]);
    }
    if (h1Matches.length > 1) {
      throw new Error(`FATAL: Multiple H1 elements found in ${relativePath}: "${h1Matches.join('", "')}"`);
    }
    if (h1Matches.length === 0) {
      throw new Error(`FATAL: Missing H1 header tag in route ${relativePath}`);
    }

    // C. Markdown Leakage check
    const cleanText = content
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<pre[^>]*>[\s\S]*?<\/pre>/gi, '')
      .replace(/<code[^>]*>[\s\S]*?<\/code>/gi, '')
      .replace(/<textarea[^>]*>[\s\S]*?<\/textarea>/gi, '')
      .replace(/<[^>]+>/g, ' ');

    if (cleanText.includes('**')) {
      throw new Error(`FATAL: Markdown leakage '**' detected in text nodes of route ${relativePath}`);
    }
    if (cleanText.includes('`')) {
      throw new Error(`FATAL: Markdown leakage '\`' detected in text nodes of route ${relativePath}`);
    }

    // D. Empty Sections Check
    if (content.includes('class="card-grid"')) {
      const emptyGridRegex = /<div class="[^"]*card-grid[^"]*">\s*<\/div>/g;
      if (emptyGridRegex.test(content)) {
        throw new Error(`FATAL: Empty card grid container detected in route ${relativePath}`);
      }
    }
    if (content.includes('vh-graph')) {
      const emptyGraphRegex = /<div class="[^"]*vh-graph[^"]*">\s*<\/div>/g;
      if (emptyGraphRegex.test(content)) {
        throw new Error(`FATAL: Empty knowledge graph container detected in route ${relativePath}`);
      }
    }

    // E. JSON-LD Verification
    const jsonLdRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
    let jsonLdMatch;
    while ((jsonLdMatch = jsonLdRegex.exec(content)) !== null) {
      try {
        const payload = JSON.parse(jsonLdMatch[1]);
        if (!payload['@context'] || !payload['@type']) {
          throw new Error(`Missing context or type attributes in JSON-LD of route ${relativePath}`);
        }
        jsonLdGenerated++;
      } catch (err) {
        throw new Error(`FATAL: Invalid JSON-LD block syntax in route ${relativePath}: ${err.message}`);
      }
    }

    // F. Validate Internal Links
    const hrefRegex = /href\s*=\s*['"]([^'"]+)['"]/gi;
    let hrefMatch;
    while ((hrefMatch = hrefRegex.exec(content)) !== null) {
      const href = hrefMatch[1];
      
      if (/^(https?:|mailto:|tel:)/i.test(href)) {
        continue;
      }

      if (href.startsWith('#')) {
        const fragId = href.substring(1);
        if (fragId && !content.includes(`id="${fragId}"`) && !content.includes(`id='${fragId}'`)) {
          throw new Error(`FATAL: Broken fragment identifier link "${href}" in route ${relativePath}`);
        }
        continue;
      }

      if (href.startsWith('/assets/')) {
        const assetPath = resolve(siteRoot, href.replace(/^\//, ''));
        if (!(await pathExists(assetPath))) {
          throw new Error(`FATAL: Broken static asset path "${href}" referenced in route ${relativePath}`);
        }
        linksValidated++;
        continue;
      }

      const linkPath = href.split('#')[0];
      if (!routeRegistry.has(linkPath)) {
        throw new Error(`FATAL: Broken internal route link "${href}" found in page ${relativePath}`);
      }
      linksValidated++;
    }
  }

  // 4. Brazil Pix Draft Exclusion check (Constraint 1 & 9)
  const pixToolConfig = await readFile(resolve(projectRoot, 'tools', 'brazil-pix-validator.yaml'), 'utf8');
  const pixToolIsDraft = /^\s*status:\s*draft\s*$/m.test(pixToolConfig);
  if (pixToolIsDraft) {
    const pixRoutePath = resolve(siteRoot, 'en', 'brazil', 'brazil-pix-validator', 'index.html');
    if (await pathExists(pixRoutePath)) {
      throw new Error(`FATAL: Brazil Pix draft route is generated at: `);
    }
    const sitemapContent = await readFile(resolve(siteRoot, 'sitemap.xml'), 'utf8');
    if (sitemapContent.includes('/brazil-pix-validator/')) {
      throw new Error(`FATAL: Brazil Pix draft route found in sitemap.xml`);
    }
    const searchIndexContent = await readFile(resolve(siteRoot, 'search-index.json'), 'utf8');
    if (searchIndexContent.includes('brazil-pix-validator')) {
      throw new Error(`FATAL: Brazil Pix draft route found in search-index.json`);
    }
  }

  return {
    totalHtmlSize,
    linksValidated,
    jsonLdGenerated
  };
}


async function main() {
  const startTime = Date.now();
  try {
    console.log('=== STARTING PRODUCTION VALIDO-HUB BUILD PIPELINE ===');

    // 1. Compile Graph/Search Indexes
    console.log('\n[Step 1/5] Compiling Knowledge Graph & Search Indexes...');
    await runBuildPhase('Compile countries registry', () => runCommand('node scripts/compile-countries-registry.mjs', projectRoot));

    // 2. Asset Concatenation, Fingerprinting and Manifest writing
    console.log('\n[Step 2/5] Compiling Design-System Hashed Assets...');
    const assetsManifest = await runBuildPhase('Compile hashed assets', () => compileAssets());
    const configuredLocales = await runBuildPhase('Load configured locales', () => getConfiguredLocales());
    await runBuildPhase('Validate locale switcher', () => validateConfiguredLocaleSwitcher(configuredLocales));
    await runBuildPhase('Prune generated locale directories', () => pruneGeneratedLocaleDirectories(configuredLocales));

    // 3. Publish/Materialize Static Site via Maven
    console.log('\n[Step 3/5] Executing Maven Site Publisher...');
    const engineDir = '/Users/maxtkachenko/work/valido-engine';
    await runBuildPhase('Run Java publisher', () => runCommand('mvn -pl valido-cli exec:java -Dexec.mainClass="com.validoengine.cli.EngineMain" -Dexec.args="publish --site /Users/maxtkachenko/work/validohub/site.yaml"', engineDir));

    // 4. Pass 1: Build Registry & Assert Ownership Integrity
    console.log('\n[Step 4/5] Loading Canonical Route Registry...');
    const routeRegistry = await runBuildPhase('Load canonical route registry', () => buildRouteRegistry());
    console.log(`Registry loaded successfully: ${routeRegistry.getAll().length} routes discovered.`);

    // 5. Pass 2: Generators Materialization
    console.log('\n[Step 5/5] Re-compiling Template Archetypes...');
    const homeRoute = routeRegistry.get('/en/');
    if (homeRoute) homeRoute.sourceOwner = 'node';
    const toolsPortalRoute = routeRegistry.get('/en/tools/');
    if (toolsPortalRoute) toolsPortalRoute.sourceOwner = 'node';
    await runBuildPhase('Compile home portal', () => compileHomePortal(routeRegistry, assetsManifest));
    await runBuildPhase('Compile tools portal', () => compileToolsPortal(routeRegistry, assetsManifest));
    await runBuildPhase('Compile countries portal', () => compileCountriesPortal(routeRegistry, assetsManifest));
    await runBuildPhase('Compile identifiers', () => compileIdentifiers(routeRegistry, assetsManifest));
    await runBuildPhase('Ensure localized route fallbacks', () => ensureLocalizedRouteFallbacks(routeRegistry, assetsManifest));
    await runBuildPhase('Post-process Java pages', () => postProcessJavaPages(routeRegistry, assetsManifest));
    await runBuildPhase('Apply final localization pass', () => applyFinalLocalizationPass(routeRegistry, siteRoot, configuredLocales));
    await runBuildPhase('Normalize generated chrome files', () => normalizeGeneratedChromeFiles(routeRegistry));
    await runBuildPhase('Prune country tool related links', () => pruneCountrySuiteRelatedLinksToCountry());
    await runBuildPhase('Normalize workbench script versions', () => normalizeWorkbenchScriptVersions());
    await runBuildPhase('Ensure generated tool scripts', () => ensureGeneratedToolScripts());
    const compactedSearchIndex = await runBuildPhase('Compact generated search index', () => compactGeneratedSearchIndex());
    if (compactedSearchIndex.count) {
      console.log(`✓ Compacted search-index.json for ${compactedSearchIndex.count} tools: ${compactedSearchIndex.before} -> ${compactedSearchIndex.after} bytes`);
    }
    await runBuildPhase('Write sitemap', () => writeSitemap(routeRegistry));

    // 6. Site Integrity Verification & Metrics
    const metrics = await runBuildPhase('Validate generated site output', () => validateSiteOutput(routeRegistry, assetsManifest));

    // Build duration
    const buildDuration = Date.now() - startTime;

    // Print Build Summary Report
    const totalRoutes = routeRegistry.getAll().length;
    const countries = routeRegistry.getAll().filter(r => r.type === 'country').length;
    const identifiers = routeRegistry.getAll().filter(r => r.type === 'identifier').length;
    const validators = routeRegistry.getAll().filter(r => r.type === 'validator').length;
    const categories = routeRegistry.getAll().filter(r => r.type === 'category').length;
    const javaOwned = routeRegistry.getAll().filter(r => r.sourceOwner === 'java').length;
    const nodeOwned = routeRegistry.getAll().filter(r => r.sourceOwner === 'node').length;

    console.log('\n==================================================');
    console.log('          VALIDOHUB BUILD SUMMARY REPORT          ');
    console.log('==================================================');
    console.log(`Total Registered Routes:       ${totalRoutes}`);
    console.log(`  Java-Owned Routes:           ${javaOwned}`);
    console.log(`  Node-Owned Routes:           ${nodeOwned}`);
    console.log(`  Country Pages:               ${countries}`);
    console.log(`  Identifier Pages:            ${identifiers}`);
    console.log(`  Validator Pages:             ${validators}`);
    console.log(`  Category Pages:              ${categories}`);
    console.log(`Hashed CSS Bundle:             ${assetsManifest.css}`);
    console.log(`Hashed JS Bundle:              ${assetsManifest.js}`);
    console.log(`Internal Links Validated:      ${metrics.linksValidated}`);
    console.log(`JSON-LD Payloads Generated:    ${metrics.jsonLdGenerated}`);
    console.log(`Total HTML Size:               ${metrics.totalHtmlSize} bytes`);
    console.log(`Build Duration:                ${buildDuration} ms`);
    console.log('Build Integrity Verification:  PASSED');
    console.log('==================================================');

    // Write a JSON build stats report for CI determinism check
    const reportData = {
      totalRegisteredRoutes: totalRoutes,
      javaOwned,
      nodeOwned,
      countryPagesCount: countries,
      identifierPagesCount: identifiers,
      validatorPagesCount: validators,
      categoryPagesCount: categories,
      cssBundle: assetsManifest.css,
      jsBundle: assetsManifest.js,
      linksValidated: metrics.linksValidated,
      jsonLdGenerated: metrics.jsonLdGenerated,
      totalHtmlSize: metrics.totalHtmlSize,
      buildDuration
    };
    await writeFile(resolve(siteRoot, 'build-report.json'), JSON.stringify(reportData, null, 2), 'utf8');

  } catch (error) {
    console.error('\n!!! BUILD PIPELINE FAILED !!!');
    console.error(error.message || error);
    process.exit(1);
  }
}

main();
