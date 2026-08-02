import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');
const productionLocales = new Set(['es', 'pt-BR', 'de', 'fr', 'pl', 'uk']);

const hardNeedles = [
  'Waiting for input',
  'Developer snapshot JSON',
  'Raw JSON output',
  'Primary local workbench',
  'Secondary local workflow',
  'Primary local atelier',
  'Secondary local atelier',
  'Search country workbenches',
  'Enter to jump',
  'Use current input',
  'Browser history',
  'Multi-row validator',
  'Run batch to compare pass/review states',
  'History, batch diagnostics',
  'History, batch checks',
  'Input is available locally.',
  'Currency / decimal browser-checkable evidence detected.',
  'Browser-local amount/currency display.',
  'Numeric amount extracted from the current input.',
  'Legal tender status, exchange rates',
  'Keep compact, display, masked',
  'Do not treat browser-local output',
  'Retain negative fixtures',
  'Open the universal workbenches',
  'the universal workbenches',
  'for payloads, encoding',
  'Identity, registry, tax, payment',
  'workbenches with local samples',
  'Use fresh browser-only values',
  'Generation belongs next to validation',
  'Named slices, local meaning',
  'Pass/review states must match',
  'green success and clear invalid paths',
  'When the domain supports generation',
  'Offline structure is not official registry status',
  'Format, inspect, and copy clean payloads',
  'Decode token headers and claims locally',
  'Encode browser-only test strings',
  'Encode query strings and route-safe values',
  'Test pattern behavior before shipping',
  'Generate copy-ready identifiers',
  'Create structural IBAN fixtures',
  'Generate IBAN check digits',
  'PESEL checksum, date',
  'PIX payload checks',
  'SIRET/SIREN/NIC evidence',
  'IdNr structure, control evidence',
  'German Tax ID / IdNr',
  'BSN 11-test replay',
  'Rodne cislo parser',
  'RNOKPP local structure',
  'Codice fiscale parser',
  'Czech Rodne cislo',
  'Ukrainian RNOKPP',
  'Italian Codice Fiscale',
  'Company Suffix',
  'IBAN generator for structural fixtures',
  'Generate Polish IBAN',
  'Generate French IBAN',
  'Generate German IBAN',
  'fixture payload',
  'Neutral world atlas',
  'Hover or focus the map',
  'Local identifiers and payment formats',
  'World map summary',
  'country hubs online',
  'identifier families indexed',
  'Each full-premium country',
  'Open all 194 country hubs',
  'National Identifiers Tools',
  'Explore utility tools for national identifiers tools.',
  'Available tools',
  'Tools for postal codes, addresses, phone formats, municipalities, and regional data.',
  'Tools for postal codes, addresses, telefon formats, municipalities, and regional data.',
  'Home',
  'Banking fixtures',
  'Privacy boundary',
  'Runs locally',
  'Completed locally',
  'Network calls',
  'Sample fixtures',
  'No upload, database, runtime API, or server-side execution.',
  'ВаліднийoHub',
  'ВаліднийоHub',
  'Валіднийate',
  'Валіднийator',
  'Poprawnyate',
  'Poprawnyator',
  'GültigoHub',
  'Gültigate',
  'Gültigator',
  'ValideeeoHub',
  'Valideeeate',
  'Valideeeator',
  'INTELIGENCJA DEVELOPERSKA TYLKO W PRZEGLĄDARCE',
  'ІНТЕЛЕКТ ДЛЯ РОЗРОБНИКІВ ЛИШЕ В БРАУЗЕРІ'
];

const localeHardNeedles = {
  pl: [
    'Generuj and inspect JSON fixtures',
    'Generuj local accounting evidence checklist',
    'Banking and Waliduj dane płatnicze',
    'Developer intelligence for',
    'Developer Tools',
    'Browse ValidoHub global browser-only validators',
    'Generuj, validate, convert'
  ],
  uk: [
    'Згенерувати and inspect JSON fixtures',
    'Згенерувати local accounting evidence checklist',
    'Банкінг and Перевіряти платіжні дані',
    'Developer intelligence for',
    'Developer Tools',
    'Developer Інструменти',
    'Browse ValidoHub global browser-only validators',
    'Згенерувати, validate, convert'
  ]
};

const localeSeoHardNeedles = {
  pl: [
    'Browser-only developer workbenches',
    'Waliduj, inspect',
    'Generuj and inspect JSON fixtures',
    'Generuj local accounting evidence checklist',
    'Developer intelligence for',
    'Developer Tools',
    'Practical ValidoHub guides for browser-only developer tools',
    'Browse ValidoHub global browser-only validators',
    'Generuj, validate, convert',
    'country-aware identifiers',
    'banking formats',
    'lokalizacja data',
    'developer fixtures in your browser'
  ],
  uk: [
    'Browser-only developer воркбенчі',
    'Browser-only developer workbenches',
    'Перевіряйте, inspect',
    'Згенерувати and inspect JSON fixtures',
    'Згенерувати local accounting evidence checklist',
    'Developer intelligence for',
    'Developer Tools',
    'Developer Інструменти',
    'Practical ValidoHub guides for browser-only developer tools',
    'Browse ValidoHub global browser-only validators',
    'Згенерувати, validate, convert',
    'country-aware identifiers',
    'banking formats',
    'локаль data',
    'developer fixtures in your browser'
  ]
};

const softNeedles = [
  'Validate',
  'Generate',
  'Copy result',
  'Download result',
  'Clear',
  'Advanced analysis',
  'Integration traps',
  'Official boundary',
  'Quality notes',
  'Field breakdown',
  'Validation pipeline',
  'Related tools',
  'Continue with related',
  'Search global tools',
  'Find the workbench',
  'Primary workbench',
  'Reference workflow'
];

const htmlHardNeedles = [
  'aria-label="Home"'
];

const seoHardNeedles = [
  'Company Suffix',
  'Validation, generation, parsing, encoding, and conversion tools.',
  'Browse browser-only national identifiers tools',
  'Explore browser-only national identifiers tools',
  'browser-only national identifiers tools',
  'National Identifiants',
  'Tools fur nationale Kennungen',
  ' Normalizer'
];

function parseArgs(argv) {
  const args = { paths: [], failOnSoft: false, limit: 120 };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--paths') args.paths = String(argv[++index] || '').split(',').map(value => value.trim()).filter(Boolean);
    else if (arg.startsWith('--paths=')) args.paths = arg.slice('--paths='.length).split(',').map(value => value.trim()).filter(Boolean);
    else if (arg === '--fail-on-soft') args.failOnSoft = true;
    else if (arg === '--limit') args.limit = Number(argv[++index] || args.limit);
    else if (arg.startsWith('--limit=')) args.limit = Number(arg.slice('--limit='.length) || args.limit);
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
  return rel === 'index.html' ? '/' : `/${rel.replace(/\/index\.html$/, '/')}`;
}

function localeFromRoute(routePath) {
  return routePath.split('/').filter(Boolean)[0] || 'en';
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<pre[\s\S]*?<\/pre>/gi, ' ')
    .replace(/<code[\s\S]*?<\/code>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function decodeHtml(value) {
  return String(value || '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function seoText(html) {
  const parts = [];
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1];
  if (title) parts.push(title);
  for (const match of html.matchAll(/<meta\b[^>]*(?:name|property)="(?:description|og:title|og:description|twitter:title|twitter:description)"[^>]*content="([^"]*)"[^>]*>/gi)) {
    parts.push(match[1]);
  }
  return decodeHtml(parts.join(' ')).replace(/\s+/g, ' ').trim();
}

function structuredDataText(html) {
  const parts = [];
  for (const match of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    parts.push(match[1]);
  }
  return decodeHtml(parts.join(' ')).replace(/\s+/g, ' ').trim();
}

function needleHit(text, needle) {
  if (/^[A-Za-z]+$/.test(needle)) {
    return new RegExp(`(?<![A-Za-z])${needle}(?![A-Za-z])`).test(text);
  }
  return text.includes(needle);
}

async function targetFiles(paths) {
  if (!paths.length) return listHtmlFiles(siteRoot);
  const files = paths.map(path => resolve(siteRoot, path.replace(/^\/+/, ''), path.endsWith('.html') ? '' : 'index.html'));
  for (const file of files) {
    if (!(await stat(file).catch(() => null))?.isFile()) {
      throw new Error(`Missing audit target: ${file}`);
    }
  }
  return files;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const files = await targetFiles(args.paths);
  const failures = [];
  const warnings = [];
  let checked = 0;

  for (const file of files) {
    const route = routePathForFile(file);
    const locale = localeFromRoute(route);
    if (!productionLocales.has(locale)) continue;
    checked += 1;
    const html = await readFile(file, 'utf8');
    const text = visibleText(html);
    const seo = seoText(html);
    const structuredData = structuredDataText(html);
    const hardHits = [
      ...hardNeedles,
      ...(localeHardNeedles[locale] || [])
    ].filter(needle => needleHit(text, needle));
    const htmlHardHits = htmlHardNeedles.filter(needle => html.includes(needle));
    const seoHits = [
      ...seoHardNeedles,
      ...(localeSeoHardNeedles[locale] || [])
    ].filter(needle => needleHit(`${seo} ${structuredData}`, needle));
    const softHits = softNeedles.filter(needle => needleHit(text, needle));
    if (hardHits.length) failures.push(`${route} untranslated high-signal UI: ${hardHits.join(', ')}`);
    if (htmlHardHits.length) failures.push(`${route} untranslated HTML chrome: ${htmlHardHits.join(', ')}`);
    if (seoHits.length) failures.push(`${route} untranslated SEO shell: ${seoHits.join(', ')}`);
    if (softHits.length) warnings.push(`${route} possible English UI/domain text: ${softHits.join(', ')}`);
  }

  for (const warning of warnings.slice(0, args.limit)) console.warn(`WARN ${warning}`);
  if (warnings.length > args.limit) console.warn(`WARN ...and ${warnings.length - args.limit} more possible localization warnings`);
  if (failures.length || (args.failOnSoft && warnings.length)) {
    console.error(`Localization audit failed: ${failures.length} blocker(s), ${warnings.length} warning(s).`);
    for (const failure of failures.slice(0, args.limit)) console.error(`- ${failure}`);
    if (failures.length > args.limit) console.error(`- ...and ${failures.length - args.limit} more blockers`);
    process.exit(1);
  }
  console.log(`✓ Localization audit passed for ${checked} localized page(s) with ${warnings.length} warning(s).`);
}

main().catch(error => {
  console.error(error.message || error);
  process.exit(1);
});
