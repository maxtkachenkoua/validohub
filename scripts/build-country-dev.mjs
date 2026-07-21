import { access, cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRouteRegistry } from './route-registry.mjs';
import { renderCountryPage } from './build-countries-portal.mjs';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');
const CORE_PRODUCTION_LOCALES = ['en', 'es', 'pt-BR', 'de', 'fr', 'pl', 'uk'];

const COUNTRY_RUNTIME_BY_SLUG = {
  france: 'france-suite.js',
  netherlands: 'netherlands-suite.js',
  switzerland: 'switzerland-suite.js',
  germany: 'germany-suite.js',
  italy: 'italy-suite.js',
  spain: 'spain-suite.js',
  brazil: 'brazil-suite.js',
  poland: 'poland-suite.js'
};

const LEGACY_RICH_LAYER = 'country-legacy-rich-layer.js';
const LEGACY_RICH_COUNTRIES = new Set(['brazil', 'poland', 'france', 'netherlands']);

const COUNTRY_ALGORITHM_BY_SLUG = {
  brazil: 'validohub.brazil-suite',
  poland: 'validohub.poland-suite',
  france: 'validohub.france-suite',
  netherlands: 'validohub.netherlands-suite',
  switzerland: 'validohub.switzerland-suite',
  germany: 'validohub.germany-suite',
  italy: 'validohub.italy-suite',
  spain: 'validohub.spain-suite',
  portugal: 'validohub.portugal-suite',
  austria: 'validohub.austria-suite',
  belgium: 'validohub.belgium-suite',
  ireland: 'validohub.ireland-suite',
  czechia: 'validohub.czechia-suite',
  sweden: 'validohub.sweden-suite',
  norway: 'validohub.norway-suite',
  denmark: 'validohub.denmark-suite',
  finland: 'validohub.finland-suite',
  romania: 'validohub.romania-suite'
};

const FACTORY_COUNTRY_SLUGS = new Set([
  'switzerland',
  'germany',
  'italy',
  'spain',
  'portugal',
  'austria',
  'belgium',
  'ireland',
  'czechia',
  'sweden',
  'norway',
  'denmark',
  'finland',
  'romania'
]);

function usage() {
  return [
    'Usage: node scripts/build-country-dev.mjs --country <slug> [--locales en,es,pt-BR,de,fr,pl,uk]',
    '',
    'Fast country materializer. It recompiles shared CSS/JS assets, renders /en/<country>/ from source,',
    'clones the English country tree into selected locale trees, rewrites locale URLs, and runs targeted guards.',
    'Full npm run build remains the release gate.'
  ].join('\n');
}

function parseArgs(argv) {
  const args = { country: '', locales: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--country' || arg === '-c') args.country = argv[++i] || '';
    else if (arg.startsWith('--country=')) args.country = arg.slice('--country='.length);
    else if (arg === '--locales' || arg === '-l') args.locales = String(argv[++i] || '').split(',').map(s => s.trim()).filter(Boolean);
    else if (arg.startsWith('--locales=')) args.locales = arg.slice('--locales='.length).split(',').map(s => s.trim()).filter(Boolean);
    else if (arg === '--help' || arg === '-h') args.help = true;
  }
  return args;
}

async function pathExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function compileDesignAssets() {
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

  let cssContent = '';
  for (const filename of cssSourceFiles) {
    const content = await readFile(resolve(projectRoot, 'assets', 'css', filename), 'utf8');
    cssContent += `/* --- ${filename} --- */\n${content.replace(/@import\s+[^;]+;/g, '')}\n`;
  }

  const jsContent = await readFile(resolve(projectRoot, 'assets', 'js', 'bundle.js'), 'utf8');
  const cssHash = createHash('sha256').update(cssContent).digest('hex').slice(0, 6);
  const jsHash = createHash('sha256').update(jsContent).digest('hex').slice(0, 6);
  const cssFileName = `bundle.${cssHash}.css`;
  const jsFileName = `bundle.${jsHash}.js`;
  const srcCssDir = resolve(projectRoot, 'assets', 'css');
  const destCssDir = resolve(siteRoot, 'assets', 'css');
  const destJsDir = resolve(siteRoot, 'assets', 'js');
  const hashedBundlePattern = /^bundle\.[a-f0-9]{6}\.(css|js)$/;

  for (const dir of [srcCssDir, destCssDir, destJsDir]) {
    if (!(await pathExists(dir))) continue;
    for (const file of await readdir(dir)) {
      if (hashedBundlePattern.test(file)) await rm(resolve(dir, file));
    }
  }

  await mkdir(destCssDir, { recursive: true });
  await mkdir(destJsDir, { recursive: true });
  await writeFile(resolve(srcCssDir, cssFileName), cssContent, 'utf8');
  await writeFile(resolve(destCssDir, cssFileName), cssContent, 'utf8');
  await writeFile(resolve(destJsDir, jsFileName), jsContent, 'utf8');

  const manifest = {
    css: `/assets/css/${cssFileName}`,
    js: `/assets/js/${jsFileName}`
  };
  await writeFile(resolve(projectRoot, 'assets', 'assets-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
  await writeFile(resolve(siteRoot, 'assets-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
  return manifest;
}

async function renderEnglishCountryFromSource(country, assetsManifest) {
  const routeRegistry = await buildRouteRegistry();
  const route = routeRegistry.getAll().find(item => item.type === 'country' && item.metadata?.id === country);
  if (!route) throw new Error(`Country route not found in source registry: ${country}`);
  await renderCountryPage(route, routeRegistry, assetsManifest);
  return routeRegistry;
}

async function configuredLocales() {
  const siteConfig = await readFile(resolve(projectRoot, 'site.yaml'), 'utf8');
  const inline = siteConfig.match(/^locales:\s*\[(.*?)\]\s*$/m);
  if (!inline) return CORE_PRODUCTION_LOCALES;
  const values = inline[1].split(',').map(item => item.trim()).filter(Boolean);
  return values.length ? values : CORE_PRODUCTION_LOCALES;
}

async function scanHtmlFiles(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) out.push(...await scanHtmlFiles(full));
    else if (entry.isFile() && entry.name === 'index.html') out.push(full);
  }
  return out;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function routeFromFile(filePath) {
  return '/' + filePath.replace(siteRoot, '').replace(/\\/g, '/').replace(/^\//, '').replace(/index\.html$/, '');
}

function pruneRelatedLinksToCountry(content, { country, locale, suffix }) {
  if (!content.includes('class="related-section"')) return content;
  const allowedPrefix = `/${locale}/${country}/`;
  const pagePath = `/${locale}/${country}${suffix}`.endsWith('/') ? `/${locale}/${country}${suffix}` : `/${locale}/${country}${suffix}/`;
  return content.replace(/<section class="related-section">[\s\S]*?<\/section>/g, (section) => {
    return section.replace(/<a href="([^"]+)" class="link-card">[\s\S]*?<\/a>/g, (card, href) => {
      const normalizedHref = href.endsWith('/') ? href : `${href}/`;
      return normalizedHref.startsWith(allowedPrefix) && normalizedHref !== pagePath ? card : '';
    });
  });
}

function buildAlternateTags(country, suffix, locales) {
  const tags = locales.map(locale => `<link rel="alternate" hreflang="${locale}" href="https://validohub.com/${locale}/${country}${suffix}">`);
  tags.push(`<link rel="alternate" hreflang="x-default" href="https://validohub.com/en/${country}${suffix}">`);
  return tags.join('\n  ');
}

function localizeCountryHtml(content, { country, locale, suffix, locales }) {
  let next = content;
  next = next.replace(/<html\s+lang="[^"]+">/i, `<html lang="${locale}">`);
  next = next.replace(new RegExp(`https://validohub\\.com/en/${escapeRegExp(country)}/`, 'g'), `https://validohub.com/${locale}/${country}/`);
  next = next.replace(new RegExp(`href="/en/${escapeRegExp(country)}/`, 'g'), `href="/${locale}/${country}/`);
  next = next.replace(new RegExp(`content="/en/${escapeRegExp(country)}/`, 'g'), `content="/${locale}/${country}/`);
  next = next.replace(/"inLanguage"\s*:\s*"en"/g, `"inLanguage":"${locale}"`);
  next = next.replace(/<link rel="alternate" hreflang="[^"]+" href="[^"]+">\s*/gi, '');
  next = next.replace('</head>', `  ${buildAlternateTags(country, suffix, locales)}\n</head>`);
  next = pruneRelatedLinksToCountry(next, { country, locale, suffix });
  return next;
}

function updateAssetLinks(content, assetsManifest) {
  let next = content;
  next = next.replace(/<link rel="stylesheet" href="\/assets\/css\/bundle\.[a-f0-9]{6}\.css">/gi, `<link rel="stylesheet" href="${assetsManifest.css}">`);
  next = next.replace(/<script src="\/assets\/js\/bundle\.[a-f0-9]{6}\.js"( defer)?><\/script>/gi, `<script src="${assetsManifest.js}" defer></script>`);
  if (!/<link rel="stylesheet" href="\/assets\/css\/bundle\.[a-f0-9]{6}\.css">/i.test(next) && !next.includes(`href="${assetsManifest.css}"`)) {
    next = next.replace('</head>', `  <link rel="stylesheet" href="${assetsManifest.css}">\n</head>`);
  }
  if (!next.includes(`src="${assetsManifest.js}"`)) {
    next = next.replace('</body>', `<script src="${assetsManifest.js}" defer></script>\n</body>`);
  }
  return next;
}

async function rewriteHtmlTreeAssetLinks(dir, assetsManifest) {
  if (!(await pathExists(dir))) return 0;
  const htmlFiles = await scanHtmlFiles(dir);
  let updated = 0;
  for (const filePath of htmlFiles) {
    const content = await readFile(filePath, 'utf8');
    const next = updateAssetLinks(content, assetsManifest);
    if (next !== content) {
      await writeFile(filePath, next, 'utf8');
      updated += 1;
    }
  }
  return updated;
}

function runtimeScriptsForCountry(country) {
  const runtime = COUNTRY_RUNTIME_BY_SLUG[country] || `${country}-suite.js`;
  if (LEGACY_RICH_COUNTRIES.has(country)) return [LEGACY_RICH_LAYER, runtime];
  if (FACTORY_COUNTRY_SLUGS.has(country)) return ['country-suite-factory.js', runtime];
  return [runtime];
}

function ensureOrderedToolScripts(content, scripts) {
  let next = content;
  const tags = [];
  for (const script of scripts) {
    const src = `/assets/js/tools/${script}`;
    const oldTag = new RegExp(`<script src="${escapeRegExp(src)}(?:\\?[^\"]*)?"></script>`, 'g');
    next = next.replace(oldTag, '');
    tags.push(`<script src="${src}?v=country-premium-20260719"></script>`);
  }
  return next.replace('</body>', tags.join('') + '\n</body>');
}

async function refreshEnglishCountryRuntimeScripts(country) {
  const algorithmId = COUNTRY_ALGORITHM_BY_SLUG[country];
  if (!algorithmId) return 0;
  const dir = resolve(siteRoot, 'en', country);
  if (!(await pathExists(dir))) return 0;
  const htmlFiles = await scanHtmlFiles(dir);
  let updated = 0;
  for (const filePath of htmlFiles) {
    const content = await readFile(filePath, 'utf8');
    if (!content.includes(`data-algorithm-id="${algorithmId}"`)) continue;
    const next = ensureOrderedToolScripts(content, runtimeScriptsForCountry(country));
    if (next !== content) {
      await writeFile(filePath, next, 'utf8');
      updated += 1;
    }
  }
  return updated;
}

async function syncRuntimeAssets(country) {
  const destTools = resolve(siteRoot, 'assets', 'js', 'tools');
  const destWorkbench = resolve(siteRoot, 'assets', 'js', 'workbench');
  await mkdir(destTools, { recursive: true });
  await mkdir(destWorkbench, { recursive: true });
  await cp(resolve(projectRoot, 'assets', 'js', 'workbench'), destWorkbench, { recursive: true });

  const runtime = COUNTRY_RUNTIME_BY_SLUG[country] || `${country}-suite.js`;
  const scripts = LEGACY_RICH_COUNTRIES.has(country) ? [LEGACY_RICH_LAYER, runtime] : [runtime];
  for (const script of scripts) {
    const sourceRuntime = resolve(projectRoot, 'assets', 'js', 'tools', script);
    if (await pathExists(sourceRuntime)) {
      await cp(sourceRuntime, resolve(destTools, script));
    }
  }

  const factory = resolve(projectRoot, 'assets', 'js', 'tools', 'country-suite-factory.js');
  if (await pathExists(factory)) {
    await cp(factory, resolve(destTools, 'country-suite-factory.js'));
  }
}

async function materializeLocaleCountry({ country, locale, locales }) {
  const sourceDir = resolve(siteRoot, 'en', country);
  const targetDir = resolve(siteRoot, locale, country);
  if (!(await pathExists(sourceDir))) {
    throw new Error(`Missing ${sourceDir}. Run npm run build once before using build:country for this country.`);
  }

  if (locale !== 'en') {
    await rm(targetDir, { recursive: true, force: true });
    await mkdir(dirname(targetDir), { recursive: true });
    await cp(sourceDir, targetDir, { recursive: true });
  }

  const htmlFiles = await scanHtmlFiles(targetDir);
  for (const filePath of htmlFiles) {
    const relative = filePath.replace(targetDir, '').replace(/\\/g, '/').replace(/\/index\.html$/, '/');
    const suffix = relative === '/index.html' || relative === '/' ? '/' : relative;
    const content = await readFile(filePath, 'utf8');
    const next = localizeCountryHtml(content, { country, locale, suffix, locales });
    await writeFile(filePath, next, 'utf8');
  }

  return htmlFiles.length;
}

async function refreshSelectedCountryRouteAssets(country, locales, assetsManifest) {
  let updated = 0;
  for (const locale of locales) {
    updated += await rewriteHtmlTreeAssetLinks(resolve(siteRoot, locale, country), assetsManifest);
    updated += await rewriteHtmlTreeAssetLinks(resolve(siteRoot, locale, 'countries'), assetsManifest);
  }
  return updated;
}

async function validateCountryHtml(country, locales) {
  const failures = [];
  let checked = 0;
  const isFactoryCountry = FACTORY_COUNTRY_SLUGS.has(country);
  const currentManifest = JSON.parse(await readFile(resolve(projectRoot, 'assets', 'assets-manifest.json'), 'utf8'));
  for (const locale of locales) {
    const dir = resolve(siteRoot, locale, country);
    if (!(await pathExists(dir))) {
      failures.push(`Missing localized country directory: /${locale}/${country}/`);
      continue;
    }
    const htmlFiles = await scanHtmlFiles(dir);
    checked += htmlFiles.length;
    for (const filePath of htmlFiles) {
      const content = await readFile(filePath, 'utf8');
      const route = routeFromFile(filePath);
      if (content.includes('[object Object]')) failures.push(`${route} contains [object Object]`);
      if (/<h3>\s*<\/h3>/.test(content)) failures.push(`${route} contains empty h3`);
      if (/<p class="vh-(?:mt-xs vh-mb-xs|mb-xs vh-mt-xs)">\s*<\/p>/.test(content)) failures.push(`${route} contains empty country info-card summary`);
      if (isFactoryCountry && content.includes('>Run the tool<')) failures.push(`${route} still shows generic Run the tool shell`);
      if (isFactoryCountry && content.includes('workbench-heading')) failures.push(`${route} still contains generic workbench heading`);
      const relatedSection = content.match(/<section class="related-section">[\s\S]*?<\/section>/)?.[0] || '';
      const foreignRelated = [...relatedSection.matchAll(/href="([^"]+)"/g)]
        .map(match => match[1])
        .filter(href => href.startsWith('/') && !href.startsWith(`/${locale}/${country}/`));
      if (foreignRelated.length) failures.push(`${route} has cross-country related links: ${foreignRelated.slice(0, 3).join(', ')}`);
      if (isFactoryCountry && content.includes('data-algorithm-id="validohub.') && content.includes(`${country}-suite`)) {
        if (!content.includes('/assets/js/tools/country-suite-factory.js')) failures.push(`${route} missing country-suite-factory.js`);
        if (!content.includes(`/assets/js/tools/${COUNTRY_RUNTIME_BY_SLUG[country] || `${country}-suite.js`}`)) failures.push(`${route} missing country runtime script`);
      }
      if (LEGACY_RICH_COUNTRIES.has(country) && content.includes('data-algorithm-id="validohub.') && content.includes(`${country}-suite`)) {
        if (!content.includes('/assets/js/tools/' + LEGACY_RICH_LAYER)) failures.push(`${route} missing ${LEGACY_RICH_LAYER}`);
        const layerIndex = content.indexOf('/assets/js/tools/' + LEGACY_RICH_LAYER);
        const runtimeIndex = content.indexOf(`/assets/js/tools/${COUNTRY_RUNTIME_BY_SLUG[country] || `${country}-suite.js`}`);
        if (layerIndex !== -1 && runtimeIndex !== -1 && layerIndex > runtimeIndex) failures.push(`${route} loads ${LEGACY_RICH_LAYER} after country runtime`);
      }
      const cssLinks = content.match(/<link[^>]*rel="stylesheet"[^>]*>/gi) || [];
      if (cssLinks.length !== 1) failures.push(`${route} has ${cssLinks.length} stylesheet links`);
      if (!content.includes(`href="${currentManifest.css}"`)) {
        failures.push(`${route} does not reference the current CSS bundle`);
      }
      if (!content.includes(`src="${currentManifest.js}"`)) {
        failures.push(`${route} does not reference the current JS bundle`);
      }
    }
  }
  if (failures.length) {
    throw new Error(`Country dev build validation failed:\n- ${failures.join('\n- ')}`);
  }
  return checked;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    return;
  }
  const country = String(args.country || '').trim().toLowerCase();
  if (!country) throw new Error('Missing --country.\n' + usage());
  const locales = args.locales.length ? args.locales : await configuredLocales();
  if (!locales.includes('en')) locales.unshift('en');

  console.log(`=== ValidoHub country dev build: ${country} ===`);
  console.log(`Locales: ${locales.join(', ')}`);
  const assetsManifest = await compileDesignAssets();
  console.log(`✓ Compiled assets: ${assetsManifest.css}, ${assetsManifest.js}`);
  await renderEnglishCountryFromSource(country, assetsManifest);
  console.log(`✓ Rendered /en/${country}/ from source`);
  await syncRuntimeAssets(country);
  const assetLinkUpdates = await refreshSelectedCountryRouteAssets(country, locales, assetsManifest);
  console.log(`✓ Refreshed current CSS/JS bundle links on ${assetLinkUpdates} selected country/portal pages`);
  const runtimeUpdates = await refreshEnglishCountryRuntimeScripts(country);
  console.log(`✓ Refreshed tool runtime scripts on ${runtimeUpdates} English country tool pages`);

  let pages = 0;
  for (const locale of locales) {
    pages += await materializeLocaleCountry({ country, locale, locales });
  }

  const checked = await validateCountryHtml(country, locales);
  console.log(`✓ Materialized ${pages} country pages for ${country}`);
  console.log(`✓ Targeted HTML guards passed on ${checked} pages`);
  console.log('Note: this is a dev accelerator. Run npm run build before release.');
}

main().catch(error => {
  console.error(error.message || error);
  process.exit(1);
});
