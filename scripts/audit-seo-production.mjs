import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');
const productionLocales = new Set(['en', 'es', 'pt-BR', 'de', 'fr', 'pl', 'uk']);
const productionOrigin = 'https://validohub.com';

function parseArgs(argv) {
  const args = { paths: [], strictLocalization: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--paths') args.paths = String(argv[++index] || '').split(',').map(value => value.trim()).filter(Boolean);
    else if (arg.startsWith('--paths=')) args.paths = arg.slice('--paths='.length).split(',').map(value => value.trim()).filter(Boolean);
    else if (arg === '--strict-localization') args.strictLocalization = true;
  }
  return args;
}

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

function routePathForFile(file) {
  const rel = relative(siteRoot, file).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  return `/${rel.replace(/\/index\.html$/, '/')}`;
}

function localeFromRoute(routePath) {
  const first = routePath.split('/').filter(Boolean)[0] || 'en';
  return productionLocales.has(first) ? first : 'en';
}

function textMatch(html, pattern) {
  const match = html.match(pattern);
  return match ? match[1].trim() : '';
}

function failIf(condition, failures, file, message) {
  if (condition) failures.push(`${routePathForFile(file)} ${message}`);
}

function warnIf(condition, warnings, file, message) {
  if (condition) warnings.push(`${routePathForFile(file)} ${message}`);
}

async function readOptional(path) {
  try {
    return await readFile(path, 'utf8');
  } catch {
    return '';
  }
}

async function auditSiteArtifacts() {
  const failures = [];
  const warnings = [];
  const robotsPath = resolve(siteRoot, 'robots.txt');
  const sitemapPath = resolve(siteRoot, 'sitemap.xml');
  const robots = await readOptional(robotsPath);
  const sitemap = await readOptional(sitemapPath);

  if (!robots) failures.push('/ missing robots.txt');
  else {
    if (!/User-agent:\s*\*/i.test(robots)) failures.push('/ robots.txt missing global user-agent');
    if (!new RegExp(`Sitemap:\\s*${productionOrigin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/sitemap\\.xml`, 'i').test(robots)) {
      failures.push('/ robots.txt missing production sitemap URL');
    }
  }

  if (!sitemap) failures.push('/ missing sitemap.xml');
  else {
    const urls = sitemap.match(/<loc>https:\/\/validohub\.com\/[^<]*<\/loc>/g) || [];
    if (urls.length < 1000) failures.push(`/ sitemap.xml looks too small (${urls.length} URLs)`);
    if (!urls.some(url => url.includes('/en/'))) failures.push('/ sitemap.xml missing English URLs');
    if (!urls.some(url => url.includes('/uk/'))) warnings.push('/ sitemap.xml missing Ukrainian URLs');
  }

  return { failures, warnings };
}

async function auditFile(file, options) {
  const html = await readFile(file, 'utf8');
  const routePath = routePathForFile(file);
  const locale = localeFromRoute(routePath);
  const failures = [];
  const warnings = [];
  const title = textMatch(html, /<title>([\s\S]*?)<\/title>/i);
  const description = textMatch(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const canonical = textMatch(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const jsonLdCount = (html.match(/<script\s+type="application\/ld\+json"/gi) || []).length;
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const alternateCount = (html.match(/<link\s+rel="alternate"\s+hreflang=/gi) || []).length;
  const hasCurrentAlternate = new RegExp(`<link\\s+rel="alternate"\\s+hreflang="${locale}"`, 'i').test(html);
  const hasXDefault = /<link\s+rel="alternate"\s+hreflang="x-default"/i.test(html);
  const canonicalRoute = canonical.startsWith(productionOrigin) ? canonical.slice(productionOrigin.length) : '';
  const canonicalLocale = localeFromRoute(canonicalRoute);
  const hasSocialTitle = /<meta\s+(?:property|name)="(?:og:title|twitter:title)"\s+content="[^"]{8,}"/i.test(html);
  const hasSocialDescription = /<meta\s+(?:property|name)="(?:og:description|twitter:description)"\s+content="[^"]{35,}"/i.test(html);

  failIf(!/<html\s+lang="[^"]+"/i.test(html), failures, file, 'missing html lang');
  failIf(!title || title.length < 12, failures, file, 'missing or thin title');
  failIf(!description || description.length < 45, failures, file, 'missing or thin meta description');
  failIf(!canonical || !canonical.startsWith(`${productionOrigin}/`), failures, file, 'missing or malformed canonical');
  failIf(Boolean(canonicalRoute) && canonicalLocale !== locale, failures, file, `canonical locale ${canonicalLocale} does not match html locale ${locale}`);
  failIf(/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html), failures, file, 'has noindex robots meta');
  failIf(h1Count !== 1, failures, file, `expected exactly one h1, found ${h1Count}`);
  failIf(alternateCount > 0 && !hasCurrentAlternate, failures, file, `missing current-locale hreflang ${locale}`);
  warnIf(alternateCount > 1 && !hasXDefault, warnings, file, 'missing x-default hreflang');
  warnIf(jsonLdCount === 0, warnings, file, 'missing structured data JSON-LD');
  warnIf(!hasSocialTitle || !hasSocialDescription, warnings, file, 'missing Open Graph/Twitter title or description');
  failIf(/\[object Object\]|undefined|null null/i.test(html), failures, file, 'contains generated placeholder text');

  if (options.strictLocalization && locale !== 'en') {
    const englishUiNeedles = [
      'Waiting for input',
      'Developer API preview',
      'Raw JSON output',
      'Primary local workbench',
      'Secondary local workflow',
      'Enter to jump',
      'Search country workbenches',
      'Privacy boundary',
      'Runs locally',
      'Generate check digits',
      'No upload',
      'Integration traps',
      'Result preview',
      'Advanced analysis',
      'Validation pipeline',
      'Global Tools',
      'Find the workbench',
      'High-signal starting points',
      'No global tools match this search'
    ];
    const hits = englishUiNeedles.filter(needle => html.includes(needle));
    if (hits.length) warnings.push(`${routePath} possible untranslated UI: ${hits.join(', ')}`);
  }

  return { failures, warnings };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const files = args.paths.length
    ? args.paths.map(path => resolve(siteRoot, path.replace(/^\/+/, ''), path.endsWith('.html') ? '' : 'index.html'))
    : await listHtmlFiles(siteRoot);
  const existingFiles = [];
  for (const file of files) {
    try {
      if ((await stat(file)).isFile()) existingFiles.push(file);
    } catch {
      throw new Error(`Missing audit target: ${file}`);
    }
  }
  const failures = [];
  const warnings = [];
  const siteArtifacts = await auditSiteArtifacts();
  failures.push(...siteArtifacts.failures);
  warnings.push(...siteArtifacts.warnings);
  for (const file of existingFiles) {
    const result = await auditFile(file, args);
    failures.push(...result.failures);
    warnings.push(...result.warnings);
  }
  for (const warning of warnings.slice(0, 40)) console.warn(`WARN ${warning}`);
  if (warnings.length > 40) console.warn(`WARN ...and ${warnings.length - 40} more warnings`);
  if (failures.length) {
    console.error(`SEO audit failed on ${failures.length} issue(s):`);
    for (const failure of failures.slice(0, 80)) console.error(`- ${failure}`);
    if (failures.length > 80) console.error(`- ...and ${failures.length - 80} more`);
    process.exit(1);
  }
  console.log(`✓ SEO audit passed for ${existingFiles.length} page(s)${args.strictLocalization ? ' with strict localization warnings enabled' : ''}.`);
}

main().catch(error => {
  console.error(error.message || error);
  process.exit(1);
});
