import { access, cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDevRouteRegistry } from './route-registry.mjs';
import { compileCountriesPortal, compileHomePortal, compileToolsPortal } from './build-countries-portal.mjs';
import { applyFinalLocalizationPass } from './localization-pass.mjs';
import { refreshGeneratedAssetLinks } from './dev-asset-links.mjs';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');
const CORE_PRODUCTION_LOCALES = ['en', 'es', 'pt-BR', 'de', 'fr', 'pl', 'uk'];

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

async function syncPortalRuntimeAssets() {
  const destJsDir = resolve(siteRoot, 'assets', 'js');
  await mkdir(destJsDir, { recursive: true });
  for (const file of ['portal-home.js', 'portal-tools.js', 'countries-portal.js', 'countries.js', 'brand-assets.js']) {
    const source = resolve(projectRoot, 'assets', 'js', file);
    if (await pathExists(source)) await cp(source, resolve(destJsDir, file));
  }
}

async function configuredLocales() {
  const siteConfig = await readFile(resolve(projectRoot, 'site.yaml'), 'utf8');
  const inline = siteConfig.match(/^locales:\s*\[(.*?)\]\s*$/m);
  if (!inline) return CORE_PRODUCTION_LOCALES;
  const values = inline[1].split(',').map(item => item.trim()).filter(Boolean);
  return values.length ? values : CORE_PRODUCTION_LOCALES;
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function localizedChromeLabels(localeCode) {
  const dictionary = {
    en: { home: 'Home', tools: 'Tools', countries: 'Countries', identifiers: 'Identifiers', navigation: 'Main navigation' },
    fr: { home: 'Accueil', tools: 'Outils', countries: 'Pays', identifiers: 'Identifiants', navigation: 'Navigation principale' },
    uk: { home: 'Головна', tools: 'Інструменти', countries: 'Країни', identifiers: 'Ідентифікатори', navigation: 'Головна навігація' },
    de: { home: 'Startseite', tools: 'Tools', countries: 'Länder', identifiers: 'Kennungen', navigation: 'Hauptnavigation' },
    es: { home: 'Inicio', tools: 'Herramientas', countries: 'Países', identifiers: 'Identificadores', navigation: 'Navegación principal' },
    pl: { home: 'Start', tools: 'Narzędzia', countries: 'Kraje', identifiers: 'Identyfikatory', navigation: 'Nawigacja główna' },
    'pt-BR': { home: 'Início', tools: 'Ferramentas', countries: 'Países', identifiers: 'Identificadores', navigation: 'Navegação principal' }
  };
  return dictionary[localeCode] || dictionary.en;
}

function splitRouteLocalePath(routePath) {
  const match = String(routePath || '').match(/^\/([^/]+)\//);
  return match?.[1] || 'en';
}

function normalizeGeneratedChrome(content, localeCode, routePath) {
  const labels = localizedChromeLabels(localeCode);
  const prefix = `/${localeCode}/`;
  const link = (href, label, active) => `<a href="${href}"${active ? ' aria-current="page" class="is-active"' : ''}>${escapeHtml(label)}</a>`;
  const nav = `<nav class="primary-nav" aria-label="${escapeHtml(labels.navigation)}">`
    + link(prefix, labels.home, routePath === prefix)
    + link(`${prefix}tools/`, labels.tools, routePath.includes('/tools/'))
    + link(`${prefix}countries/`, labels.countries, routePath.includes('/countries/') || /^\/[^/]+\/[^/]+\/?$/.test(routePath))
    + link(`${prefix}categories/national-identifiers/`, labels.identifiers, routePath.includes('/identifiers/') || routePath.includes('/categories/national-identifiers/'))
    + '</nav>';

  return content
    .replace(/<nav class="primary-nav"[^>]*>[\s\S]*?<\/nav>/g, nav)
    .replace(/\s*<p>\s*(?:(?:Static tools|Herramientas|Ferramentas|Statyczne narzedzia|Statische Tools|Статичні інструменти)[^<]*Valido Engine\.?)\s*<\/p>/giu, '');
}

function portalRoutePaths(locales) {
  const suffixes = ['/', '/tools/', '/countries/', '/categories/national-identifiers/'];
  return locales.flatMap(locale => suffixes.map(suffix => suffix === '/' ? `/${locale}/` : `/${locale}${suffix}`));
}

async function normalizeGeneratedChromeFiles(locales) {
  let updated = 0;
  for (const routePath of portalRoutePaths(locales)) {
    const outputPath = resolve(siteRoot, routePath.replace(/^\//, ''), 'index.html');
    if (!(await pathExists(outputPath))) continue;
    const localeCode = splitRouteLocalePath(routePath);
    const content = await readFile(outputPath, 'utf8');
    const next = normalizeGeneratedChrome(content, localeCode, routePath);
    if (next !== content) {
      await writeFile(outputPath, next, 'utf8');
      updated += 1;
    }
  }
  return updated;
}

async function main() {
  console.log('=== ValidoHub portal dev build: home + tools + countries ===');
  const locales = await configuredLocales();
  const assetsManifest = await compileDesignAssets();
  await syncPortalRuntimeAssets();
  console.log(`✓ Compiled assets: ${assetsManifest.css}, ${assetsManifest.js}`);
  const globalAssetLinks = await refreshGeneratedAssetLinks(siteRoot, assetsManifest, { routePaths: portalRoutePaths(locales) });
  console.log(`✓ Refreshed current CSS/JS bundle links on ${globalAssetLinks.updated} portal pages (checked ${globalAssetLinks.checked})`);

  const routeRegistry = await buildDevRouteRegistry();
  const homeRoute = routeRegistry.get('/en/');
  if (homeRoute) homeRoute.sourceOwner = 'node';
  const toolsPortalRoute = routeRegistry.get('/en/tools/');
  if (toolsPortalRoute) toolsPortalRoute.sourceOwner = 'node';

  await compileHomePortal(routeRegistry, assetsManifest);
  await compileToolsPortal(routeRegistry, assetsManifest);
  await compileCountriesPortal(routeRegistry, assetsManifest, { renderCountryPages: false });
  await applyFinalLocalizationPass(routeRegistry, siteRoot, locales, { includeSuffixes: ['/', '/tools/', '/countries/', '/categories/national-identifiers/'] });
  const chromeUpdates = await normalizeGeneratedChromeFiles(locales);

  console.log(`✓ Localized portal pages: ${locales.map(locale => `/${locale}/ + /${locale}/countries/`).join(', ')}`);
  console.log(`✓ Normalized generated chrome on ${chromeUpdates} pages`);
  console.log('Note: this is a dev accelerator. Run npm run build before release.');
}

main().catch(error => {
  console.error(error.message || error);
  process.exit(1);
});
