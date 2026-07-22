import { access, cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRouteRegistry } from './route-registry.mjs';
import { compileCountriesPortal, compileHomePortal, compileToolsPortal } from './build-countries-portal.mjs';
import { applyFinalLocalizationPass } from './localization-pass.mjs';

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

async function main() {
  console.log('=== ValidoHub portal dev build: home + tools + countries ===');
  const locales = await configuredLocales();
  const assetsManifest = await compileDesignAssets();
  await syncPortalRuntimeAssets();
  console.log(`✓ Compiled assets: ${assetsManifest.css}, ${assetsManifest.js}`);

  const routeRegistry = await buildRouteRegistry();
  const homeRoute = routeRegistry.get('/en/');
  if (homeRoute) homeRoute.sourceOwner = 'node';

  await compileHomePortal(routeRegistry, assetsManifest);
  await compileToolsPortal(routeRegistry, assetsManifest);
  await compileCountriesPortal(routeRegistry, assetsManifest, { renderCountryPages: false });
  await applyFinalLocalizationPass(routeRegistry, siteRoot, locales, { includeSuffixes: ['/', '/tools/', '/countries/'] });

  console.log(`✓ Localized portal pages: ${locales.map(locale => `/${locale}/ + /${locale}/countries/`).join(', ')}`);
  console.log('Note: this is a dev accelerator. Run npm run build before release.');
}

main().catch(error => {
  console.error(error.message || error);
  process.exit(1);
});
