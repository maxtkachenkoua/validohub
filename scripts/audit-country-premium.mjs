#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const args = process.argv.slice(2);
const CORE_LOCALES = ['en', 'es', 'pt-BR', 'de', 'fr', 'pl', 'uk'];
const ACTIVE_BASELINE_COUNTRIES = ['brazil', 'poland', 'france', 'netherlands', 'switzerland', 'germany', 'italy', 'spain'];
const FACTORY_COUNTRIES = new Set([
  'switzerland', 'germany', 'italy', 'spain', 'argentina', 'bolivia', 'chile', 'colombia',
  'ecuador', 'guyana', 'paraguay', 'peru', 'suriname', 'uruguay', 'venezuela',
  'united-states', 'canada', 'mexico', 'belize', 'guatemala', 'el-salvador', 'honduras',
  'nicaragua', 'costa-rica', 'panama', 'bahamas', 'cuba', 'jamaica', 'haiti',
  'dominican-republic', 'antigua-and-barbuda', 'dominica', 'saint-kitts-and-nevis',
  'saint-lucia', 'saint-vincent-and-the-grenadines', 'grenada', 'barbados',
  'trinidad-and-tobago'
]);
const BESPOKE_GOLD_RUNTIME_FILES = new Set([
  'pix.js',
  'pesel.js',
  'mexico-suite.js',
  'spain-id.js'
]);
const RUNTIME_BY_ALGORITHM = new Map([
  ['validohub.brazil-pix', 'pix.js'],
  ['validohub.brazil-suite', 'brazil-suite.js'],
  ['validohub.iban', 'generic-suite.js'],
  ['validohub.iban-generator', 'generic-suite.js'],
  ['validohub.pesel', 'pesel.js'],
  ['validohub.poland-suite', 'poland-suite.js'],
  ['validohub.poland-expansion', 'poland-expansion.js'],
  ['validohub.poland-baseline', 'poland-baseline.js'],
  ['validohub.france-suite', 'france-suite.js'],
  ['validohub.netherlands-suite', 'netherlands-suite.js'],
  ['validohub.switzerland-suite', 'switzerland-suite.js'],
  ['validohub.germany-suite', 'germany-suite.js'],
  ['validohub.italy-suite', 'italy-suite.js'],
  ['validohub.spain-suite', 'spain-suite.js'],
  ['validohub.spain-id', 'spain-id.js'],
  ['validohub.vanuatu-suite', 'vanuatu-suite.js'],
  ['validohub.tuvalu-suite', 'tuvalu-suite.js'],
  ['validohub.tonga-suite', 'tonga-suite.js'],
  ['validohub.solomon-islands-suite', 'solomon-islands-suite.js'],
  ['validohub.samoa-suite', 'samoa-suite.js'],
  ['validohub.papua-new-guinea-suite', 'papua-new-guinea-suite.js'],
  ['validohub.palau-suite', 'palau-suite.js'],
  ['validohub.new-zealand-suite', 'new-zealand-suite.js'],
  ['validohub.nauru-suite', 'nauru-suite.js'],
  ['validohub.micronesia-suite', 'micronesia-suite.js'],
  ['validohub.marshall-islands-suite', 'marshall-islands-suite.js'],
  ['validohub.kiribati-suite', 'kiribati-suite.js'],
  ['validohub.fiji-suite', 'fiji-suite.js'],
  ['validohub.australia-suite', 'australia-suite.js'],
  ['validohub.zimbabwe-suite', 'zimbabwe-suite.js'],
  ['validohub.zambia-suite', 'zambia-suite.js'],
  ['validohub.uganda-suite', 'uganda-suite.js'],
  ['validohub.tunisia-suite', 'tunisia-suite.js'],
  ['validohub.togo-suite', 'togo-suite.js'],
  ['validohub.tanzania-suite', 'tanzania-suite.js'],
  ['validohub.sudan-suite', 'sudan-suite.js'],
  ['validohub.south-sudan-suite', 'south-sudan-suite.js'],
  ['validohub.south-africa-suite', 'south-africa-suite.js'],
  ['validohub.somalia-suite', 'somalia-suite.js'],
  ['validohub.sierra-leone-suite', 'sierra-leone-suite.js'],
  ['validohub.seychelles-suite', 'seychelles-suite.js'],
  ['validohub.senegal-suite', 'senegal-suite.js'],
  ['validohub.sao-tome-and-principe-suite', 'sao-tome-and-principe-suite.js'],
  ['validohub.rwanda-suite', 'rwanda-suite.js'],
  ['validohub.nigeria-suite', 'nigeria-suite.js'],
  ['validohub.niger-suite', 'niger-suite.js'],
  ['validohub.namibia-suite', 'namibia-suite.js'],
  ['validohub.mozambique-suite', 'mozambique-suite.js'],
  ['validohub.morocco-suite', 'morocco-suite.js'],
  ['validohub.mauritius-suite', 'mauritius-suite.js'],
  ['validohub.mauritania-suite', 'mauritania-suite.js'],
  ['validohub.mali-suite', 'mali-suite.js'],
  ['validohub.malawi-suite', 'malawi-suite.js'],
  ['validohub.madagascar-suite', 'madagascar-suite.js'],
  ['validohub.libya-suite', 'libya-suite.js'],
  ['validohub.liberia-suite', 'liberia-suite.js'],
  ['validohub.lesotho-suite', 'lesotho-suite.js'],
  ['validohub.kenya-suite', 'kenya-suite.js'],
  ['validohub.guinea-bissau-suite', 'guinea-bissau-suite.js'],
  ['validohub.guinea-suite', 'guinea-suite.js'],
  ['validohub.ghana-suite', 'ghana-suite.js'],
  ['validohub.gambia-suite', 'gambia-suite.js'],
  ['validohub.gabon-suite', 'gabon-suite.js'],
  ['validohub.ethiopia-suite', 'ethiopia-suite.js'],
  ['validohub.eswatini-suite', 'eswatini-suite.js'],
  ['validohub.eritrea-suite', 'eritrea-suite.js'],
  ['validohub.equatorial-guinea-suite', 'equatorial-guinea-suite.js'],
  ['validohub.egypt-suite', 'egypt-suite.js'],
  ['validohub.djibouti-suite', 'djibouti-suite.js'],
  ['validohub.democratic-republic-of-the-congo-suite', 'democratic-republic-of-the-congo-suite.js'],
  ['validohub.cote-d-ivoire-suite', 'cote-d-ivoire-suite.js'],
  ['validohub.congo-suite', 'congo-suite.js'],
  ['validohub.comoros-suite', 'comoros-suite.js'],
  ['validohub.chad-suite', 'chad-suite.js'],
  ['validohub.central-african-republic-suite', 'central-african-republic-suite.js'],
  ['validohub.cameroon-suite', 'cameroon-suite.js'],
  ['validohub.cabo-verde-suite', 'cabo-verde-suite.js'],
  ['validohub.burundi-suite', 'burundi-suite.js'],
  ['validohub.burkina-faso-suite', 'burkina-faso-suite.js'],
  ['validohub.botswana-suite', 'botswana-suite.js'],
  ['validohub.benin-suite', 'benin-suite.js'],
  ['validohub.angola-suite', 'angola-suite.js'],
  ['validohub.algeria-suite', 'algeria-suite.js'],
  ['validohub.yemen-suite', 'yemen-suite.js'],
  ['validohub.turkey-suite', 'turkey-suite.js'],
  ['validohub.timor-leste-suite', 'timor-leste-suite.js'],
  ['validohub.taiwan-suite', 'taiwan-suite.js'],
  ['validohub.syria-suite', 'syria-suite.js'],
  ['validohub.palestine-suite', 'palestine-suite.js'],
  ['validohub.north-korea-suite', 'north-korea-suite.js'],
  ['validohub.maldives-suite', 'maldives-suite.js'],
  ['validohub.lebanon-suite', 'lebanon-suite.js'],
  ['validohub.kazakhstan-suite', 'kazakhstan-suite.js'],
  ['validohub.iraq-suite', 'iraq-suite.js'],
  ['validohub.iran-suite', 'iran-suite.js'],
  ['validohub.georgia-suite', 'georgia-suite.js'],
  ['validohub.brunei-suite', 'brunei-suite.js'],
  ['validohub.bhutan-suite', 'bhutan-suite.js'],
  ['validohub.azerbaijan-suite', 'azerbaijan-suite.js'],
  ['validohub.armenia-suite', 'armenia-suite.js'],
  ['validohub.afghanistan-suite', 'afghanistan-suite.js'],
  ['validohub.jordan-suite', 'jordan-suite.js'],
  ['validohub.oman-suite', 'oman-suite.js'],
  ['validohub.bahrain-suite', 'bahrain-suite.js'],
  ['validohub.kuwait-suite', 'kuwait-suite.js'],
  ['validohub.qatar-suite', 'qatar-suite.js'],
  ['validohub.turkmenistan-suite', 'turkmenistan-suite.js'],
  ['validohub.tajikistan-suite', 'tajikistan-suite.js'],
  ['validohub.kyrgyzstan-suite', 'kyrgyzstan-suite.js'],
  ['validohub.uzbekistan-suite', 'uzbekistan-suite.js'],
  ['validohub.mongolia-suite', 'mongolia-suite.js'],
  ['validohub.laos-suite', 'laos-suite.js'],
  ['validohub.cambodia-suite', 'cambodia-suite.js'],
  ['validohub.myanmar-suite', 'myanmar-suite.js'],
  ['validohub.sri-lanka-suite', 'sri-lanka-suite.js'],
  ['validohub.nepal-suite', 'nepal-suite.js'],
  ['validohub.israel-suite', 'israel-suite.js'],
  ['validohub.saudi-arabia-suite', 'saudi-arabia-suite.js'],
  ['validohub.bangladesh-suite', 'bangladesh-suite.js'],
  ['validohub.pakistan-suite', 'pakistan-suite.js'],
  ['validohub.philippines-suite', 'philippines-suite.js'],
  ['validohub.vietnam-suite', 'vietnam-suite.js'],
  ['validohub.thailand-suite', 'thailand-suite.js'],
  ['validohub.malaysia-suite', 'malaysia-suite.js'],
  ['validohub.indonesia-suite', 'indonesia-suite.js'],
  ['validohub.china-suite', 'china-suite.js'],
  ['validohub.united-arab-emirates-suite', 'united-arab-emirates-suite.js'],
  ['validohub.south-korea-suite', 'south-korea-suite.js'],
  ['validohub.singapore-suite', 'singapore-suite.js'],
  ['validohub.india-suite', 'india-suite.js'],
  ['validohub.japan-suite', 'japan-suite.js'],
  ['validohub.vatican-city-suite', 'vatican-city-suite.js'],
  ['validohub.united-kingdom-suite', 'united-kingdom-suite.js'],
  ['validohub.ukraine-suite', 'ukraine-suite.js'],
  ['validohub.slovenia-suite', 'slovenia-suite.js'],
  ['validohub.slovakia-suite', 'slovakia-suite.js'],
  ['validohub.serbia-suite', 'serbia-suite.js'],
  ['validohub.san-marino-suite', 'san-marino-suite.js'],
  ['validohub.north-macedonia-suite', 'north-macedonia-suite.js'],
  ['validohub.montenegro-suite', 'montenegro-suite.js'],
  ['validohub.monaco-suite', 'monaco-suite.js'],
  ['validohub.moldova-suite', 'moldova-suite.js'],
  ['validohub.malta-suite', 'malta-suite.js'],
  ['validohub.luxembourg-suite', 'luxembourg-suite.js'],
  ['validohub.lithuania-suite', 'lithuania-suite.js'],
  ['validohub.liechtenstein-suite', 'liechtenstein-suite.js'],
  ['validohub.latvia-suite', 'latvia-suite.js'],
  ['validohub.iceland-suite', 'iceland-suite.js'],
  ['validohub.hungary-suite', 'hungary-suite.js'],
  ['validohub.greece-suite', 'greece-suite.js'],
  ['validohub.estonia-suite', 'estonia-suite.js'],
  ['validohub.cyprus-suite', 'cyprus-suite.js'],
  ['validohub.croatia-suite', 'croatia-suite.js'],
  ['validohub.bulgaria-suite', 'bulgaria-suite.js'],
  ['validohub.bosnia-and-herzegovina-suite', 'bosnia-and-herzegovina-suite.js'],
  ['validohub.andorra-suite', 'andorra-suite.js'],
  ['validohub.albania-suite', 'albania-suite.js'],
  ['validohub.portugal-suite', 'portugal-suite.js'],
  ['validohub.romania-suite', 'romania-suite.js'],
  ['validohub.finland-suite', 'finland-suite.js'],
  ['validohub.denmark-suite', 'denmark-suite.js'],
  ['validohub.norway-suite', 'norway-suite.js'],
  ['validohub.sweden-suite', 'sweden-suite.js'],
  ['validohub.czechia-suite', 'czechia-suite.js'],
  ['validohub.ireland-suite', 'ireland-suite.js'],
  ['validohub.belgium-suite', 'belgium-suite.js'],
  ['validohub.austria-suite', 'austria-suite.js'],
  ['validohub.argentina-suite', 'argentina-suite.js'],
  ['validohub.venezuela-suite', 'venezuela-suite.js'],
  ['validohub.uruguay-suite', 'uruguay-suite.js'],
  ['validohub.suriname-suite', 'suriname-suite.js'],
  ['validohub.peru-suite', 'peru-suite.js'],
  ['validohub.paraguay-suite', 'paraguay-suite.js'],
  ['validohub.guyana-suite', 'guyana-suite.js'],
  ['validohub.ecuador-suite', 'ecuador-suite.js'],
  ['validohub.colombia-suite', 'colombia-suite.js'],
  ['validohub.chile-suite', 'chile-suite.js'],
  ['validohub.bolivia-suite', 'bolivia-suite.js'],
  ['validohub.united-states-suite', 'united-states-suite.js'],
  ['validohub.canada-suite', 'canada-suite.js'],
  ['validohub.mexico-suite', 'mexico-suite.js'],
  ['validohub.belize-suite', 'belize-suite.js'],
  ['validohub.guatemala-suite', 'guatemala-suite.js'],
  ['validohub.el-salvador-suite', 'el-salvador-suite.js'],
  ['validohub.honduras-suite', 'honduras-suite.js'],
  ['validohub.nicaragua-suite', 'nicaragua-suite.js'],
  ['validohub.costa-rica-suite', 'costa-rica-suite.js'],
  ['validohub.panama-suite', 'panama-suite.js'],
  ['validohub.bahamas-suite', 'bahamas-suite.js'],
  ['validohub.cuba-suite', 'cuba-suite.js'],
  ['validohub.jamaica-suite', 'jamaica-suite.js'],
  ['validohub.haiti-suite', 'haiti-suite.js'],
  ['validohub.dominican-republic-suite', 'dominican-republic-suite.js'],
  ['validohub.antigua-and-barbuda-suite', 'antigua-and-barbuda-suite.js'],
  ['validohub.dominica-suite', 'dominica-suite.js'],
  ['validohub.saint-kitts-and-nevis-suite', 'saint-kitts-and-nevis-suite.js'],
  ['validohub.saint-lucia-suite', 'saint-lucia-suite.js'],
  ['validohub.saint-vincent-and-the-grenadines-suite', 'saint-vincent-and-the-grenadines-suite.js'],
  ['validohub.grenada-suite', 'grenada-suite.js'],
  ['validohub.barbados-suite', 'barbados-suite.js'],
  ['validohub.trinidad-and-tobago-suite', 'trinidad-and-tobago-suite.js'],
  ['validohub.portugal-suite', 'portugal-suite.js']
]);
const FOREIGN_TERMS = {
  brazil: ['PESEL', 'NIP', 'REGON', 'KRS', 'PLN', 'NRB', 'KSeF', 'JPK', 'DNI', 'NIE', 'NIF', 'AEAT', 'Facturae', 'CHE-', 'Swiss UID', 'Partita IVA'],
  poland: ['CPF', 'CNPJ', 'PIX', 'CNH', 'DNI', 'NIE', 'AEAT', 'Facturae', 'CHE-', 'Swiss UID', 'Partita IVA'],
  france: ['PESEL', 'NIP', 'REGON', 'KRS', 'PIX', 'CPF', 'CNPJ', 'DNI', 'NIE', 'AEAT', 'Facturae', 'CHE-', 'Swiss UID', 'Partita IVA'],
  netherlands: ['PESEL', 'NIP', 'REGON', 'KRS', 'PIX', 'CPF', 'CNPJ', 'DNI', 'NIE', 'AEAT', 'Facturae', 'CHE-', 'Swiss UID', 'Partita IVA'],
  switzerland: ['PESEL', 'NIP', 'REGON', 'KRS', 'PIX', 'CPF', 'CNPJ', 'DNI', 'NIE', 'AEAT', 'Facturae', 'Partita IVA'],
  germany: ['PESEL', 'NIP', 'REGON', 'KRS', 'PIX', 'CPF', 'CNPJ', 'DNI', 'NIE', 'AEAT', 'Facturae', 'Swiss UID', 'Partita IVA'],
  italy: ['PESEL', 'NIP', 'REGON', 'KRS', 'PIX', 'CPF', 'CNPJ', 'DNI', 'NIE', 'AEAT', 'Facturae', 'Swiss UID'],
  spain: ['PESEL', 'NIP', 'REGON', 'KRS', 'PIX', 'CPF', 'CNPJ', 'Swiss UID', 'Partita IVA']
};

function hasFlag(name) { return args.includes(name); }
function readArg(names) {
  for (let i = 0; i < args.length; i += 1) if (names.includes(args[i])) return args[i + 1];
  return null;
}
if (hasFlag('--help') || hasFlag('-h')) {
  console.log('Usage: npm run audit:country-premium -- --country spain');
  console.log('       npm run audit:country-premium -- --all');
  process.exit(0);
}
const selectedCountry = readArg(['--country', '-c']);
const writeReport = !hasFlag('--no-write-report');

function abs(rel) { return path.join(ROOT, rel); }
function fileExists(rel) { return fs.existsSync(abs(rel)); }
function readFile(rel) { return fs.readFileSync(abs(rel), 'utf8'); }
function listFiles(rel) {
  const dir = abs(rel);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).sort();
}
function escapeRegExp(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function stripQuotes(value) { return value.trim().replace(/^['"]|['"]$/g, ''); }

function parseSiteLocales() {
  if (!fileExists('site.yaml')) return CORE_LOCALES;
  const text = readFile('site.yaml');
  const match = text.match(/locales:\s*\n([\s\S]*?)(?:\n\S|$)/);
  if (!match) return CORE_LOCALES;
  const locales = [...match[1].matchAll(/^\s*-\s*([A-Za-z0-9-]+)/gm)].map((m) => m[1]);
  return locales.length ? locales : CORE_LOCALES;
}
function countryDataSlugs() {
  return listFiles('countries/data').filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));
}
function countryYamlSlugs() {
  return listFiles('countries').filter((f) => f.endsWith('.yaml') || f.endsWith('.yml')).map((f) => f.replace(/\.ya?ml$/, ''));
}
function parseToolYaml(text, file) {
  const scalar = (key) => {
    const re = new RegExp('^' + escapeRegExp(key) + ':\\s*(.+)$', 'm');
    const match = text.match(re);
    return match ? stripQuotes(match[1]) : '';
  };
  const localizedName = text.match(/^name:\s*\n\s+en:\s*['"]?([^'"\n]+)/m)?.[1] ?? '';
  const listBlock = (key) => {
    const inline = text.match(new RegExp('^' + escapeRegExp(key) + ':\\s*\\[([^\\]]*)\\]', 'm'));
    if (inline) return inline[1].split(',').map(stripQuotes).filter(Boolean);
    const re = new RegExp('^' + escapeRegExp(key) + ':\\s*\\n([\\s\\S]*?)(?:\\n\\S|$)', 'm');
    const match = text.match(re);
    if (!match) return [];
    return [...match[1].matchAll(/^\s*-\s*([^\n#]+)/gm)].map((m) => stripQuotes(m[1])).filter(Boolean);
  };
  const algorithmId = text.match(/^\s*algorithmId:\s*([^\n#]+)/m)?.[1] ?? scalar('algorithmId');
  const explicitRelated = text.match(/^\s*explicit:\s*\[([^\]]*)\]/m);
  const relatedTools = explicitRelated ? explicitRelated[1].split(',').map(stripQuotes).filter(Boolean) : listBlock('relatedTools');
  return {
    file,
    id: scalar('id'),
    country: scalar('country'),
    name: scalar('name') || localizedName,
    algorithmId: stripQuotes(algorithmId || ''),
    category: scalar('category'),
    forms: /^forms:\s*$/m.test(text) ? ['forms'] : listBlock('forms'),
    capabilities: listBlock('capabilities'),
    relatedTools
  };
}
function loadCountryTools(slug) {
  const prefixes = slug === 'germany' ? ['germany-', 'german-'] : [slug + '-'];
  const data = loadCountryData(slug);
  const iso2 = data?.catalog?.iso2 || data?.hub?.metadata?.iso2 || data?.iso2 || '';
  return listFiles('tools')
    .filter((f) => f.endsWith('.yaml'))
    .map((f) => parseToolYaml(readFile(path.join('tools', f)), f))
    .filter((tool) => {
      if (iso2 && tool.country) return tool.country === iso2;
      return prefixes.some((prefix) => tool.file.startsWith(prefix));
    });
}
function loadCountryData(slug) {
  const rel = path.join('countries/data', slug + '.json');
  if (!fileExists(rel)) return null;
  try { return JSON.parse(readFile(rel)); } catch (error) { return { __parseError: error.message }; }
}
function routeToolId(slug, href) {
  return String(href || '').match(new RegExp(`/${escapeRegExp(slug)}/([^/]+)/`))?.[1] || '';
}
function loadCountryDataTools(slug, data) {
  const routes = Array.isArray(data?.hub?.routes) ? data.hub.routes : [];
  const routeIds = routes.map((route) => routeToolId(slug, route.href)).filter(Boolean);
  return routes.map((route, index) => {
    const id = routeToolId(slug, route.href);
    return {
      file: `countries/data/${slug}.json#hub.routes[${index}]`,
      id,
      name: route.title || id,
      algorithmId: `validohub.${slug}-suite`,
      category: route.category || 'country',
      forms: ['textarea'],
      capabilities: ['browser-only', 'offline-checks', 'field-breakdown', 'integration-traps'],
      relatedTools: routeIds.filter((candidate) => candidate && candidate !== id).slice(0, 5)
    };
  }).filter((tool) => tool.id);
}
function generatedToolDirs(slug, locale = 'en') {
  const dir = abs(path.join('generated/validohub', locale, slug));
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((entry) => fs.statSync(path.join(dir, entry)).isDirectory() && fs.existsSync(path.join(dir, entry, 'index.html'))).sort();
}
function scanGeneratedPage(slug, locale, toolId, result) {
  const rel = path.join('generated/validohub', locale, slug, toolId, 'index.html');
  if (!fileExists(rel)) return;
  const html = readFile(rel);
  result.checkedGeneratedPages += 1;
  if (html.includes('[object Object]')) result.blockers.push(`${locale}/${slug}/${toolId}: generated page contains [object Object]`);
  if (/<h3[^>]*>\s*<\/h3>/i.test(html)) result.blockers.push(`${locale}/${slug}/${toolId}: generated page contains empty h3`);
  if (/class="[^"]*country-card[^"]*"[\s\S]*?<p>\s*<\/p>/i.test(html)) result.blockers.push(`${locale}/${slug}/${toolId}: generated page contains empty country-card summary`);
  if (result.factoryRuntime && (/class="[^"]*workbench-heading[^"]*"/i.test(html) || />\s*Run the tool\s*</i.test(html))) result.blockers.push(`${locale}/${slug}/${toolId}: generated page still ships generic Run the tool shell`);
  if (/Offline checks passed/i.test(html) && /#dc2626|#ef4444|rgb\(220,\s*38,\s*38\)|text-red|border-red|red/i.test(html)) result.warnings.push(`${locale}/${slug}/${toolId}: generated page may use red styling near success copy`);
  const related = html.match(/<section[^>]+class="[^"]*related-section[^"]*"[\s\S]*?<\/section>/i)?.[0] ?? '';
  if (related) {
    const hrefs = [...related.matchAll(/href="([^"]+)"/g)].map((m) => m[1]).filter((href) => href.startsWith('/'));
    const allowedDirectoryLinks = new Set([`/${locale}/countries/`, `/${locale}/tools/`, `/${locale}/${slug}/`]);
    const foreign = hrefs.filter((href) => !href.startsWith(`/${locale}/${slug}/`) && !href.startsWith(`/${slug}/`) && !allowedDirectoryLinks.has(href));
    if (foreign.length) result.blockers.push(`${locale}/${slug}/${toolId}: related links escape country: ${foreign.slice(0, 3).join(', ')}`);
  }
}
function scanHub(slug, locales, result) {
  for (const locale of locales) {
    const rel = path.join('generated/validohub', locale, slug, 'index.html');
    if (!fileExists(rel)) {
      if (result.toolCount > 0 || result.catalogStatus === 'available') result.blockers.push(`${locale}/${slug}: generated country hub missing`);
      continue;
    }
    const html = readFile(rel);
    if (html.includes('[object Object]')) result.blockers.push(`${locale}/${slug}: generated hub contains [object Object]`);
    if (/<h3[^>]*>\s*<\/h3>/i.test(html)) result.blockers.push(`${locale}/${slug}: generated hub contains empty h3`);
    if (/class="[^"]*country-card[^"]*"[\s\S]*?<p>\s*<\/p>/i.test(html)) result.blockers.push(`${locale}/${slug}: generated hub contains empty country-card summary`);
    if (/Utility & Electrical Profile/i.test(html)) {
      const techSection = html.match(/<section[^>]+class="[^"]*country-tech-facts[^"]*"[\s\S]*?<\/section>/i)?.[0] ?? '';
      if (/Plug Types[\s\S]*?<\/h3>\s*<\/div>|Electrical Voltage[\s\S]*?<\/h3>\s*<\/div>|Grid Frequency[\s\S]*?<\/h3>\s*<\/div>/i.test(techSection)) {
        result.blockers.push(`${locale}/${slug}: technical standards cards render empty values`);
      }
    }
    if (!/vh-country-civic-snapshot/i.test(html)) {
      result.blockers.push(`${locale}/${slug}: country civic snapshot missing before developer actions`);
    }
    const heroTag = html.match(/<header[^>]+class="[^"]*vh-country-hero[^"]*"[^>]*>/i)?.[0] ?? '';
    if (!/--vh-country-flag-color-1\s*:/.test(heroTag) || !/--vh-country-flag-color-2\s*:/.test(heroTag)) {
      result.blockers.push(`${locale}/${slug}: country hero missing inline flag-gradient theme variables`);
    }
    const civicTag = html.match(/<section[^>]+class="[^"]*vh-country-civic-snapshot[^"]*"[^>]*>/i)?.[0] ?? '';
    if (civicTag && (!/--vh-country-flag-color-1\s*:/.test(civicTag) || !/--vh-country-flag-color-2\s*:/.test(civicTag))) {
      result.blockers.push(`${locale}/${slug}: country civic snapshot missing inline flag-gradient theme variables`);
    }
    if (/<div[^>]+class="[^"]*vh-country-civic-snapshot[^"]*"/i.test(html)) {
      result.blockers.push(`${locale}/${slug}: country civic snapshot reuses the outer section class on an inner layout`);
    }
    if (!/vh-country-civic-layout/i.test(html)) {
      result.blockers.push(`${locale}/${slug}: country civic snapshot missing dedicated inner layout wrapper`);
    }
    const placeholder = html.match(/class="[^"]*vh-country-tool-search-input[^"]*"[^>]*placeholder="([^"]*)"/i)?.[1] ?? '';
    if (placeholder && /IBAN,\s*SWIFT\/BIC,\s*SEPA,\s*VAT,\s*INVOICE/i.test(placeholder)) {
      result.blockers.push(`${locale}/${slug}: country search placeholder is generic and lacks local systems`);
    }
  }
}
function scanForeignFallback(slug, result) {
  const terms = FOREIGN_TERMS[slug] ?? [];
  const sources = [];
  const dataRel = path.join('countries/data', slug + '.json');
  if (fileExists(dataRel)) sources.push([dataRel, readFile(dataRel)]);
  const hubRel = path.join('generated/validohub/en', slug, 'index.html');
  if (fileExists(hubRel)) sources.push([hubRel, readFile(hubRel)]);
  for (const [rel, text] of sources) for (const term of terms) {
    if (new RegExp('\\b' + escapeRegExp(term) + '\\b', 'i').test(text)) result.blockers.push(`${rel}: possible foreign fallback term "${term}"`);
  }
}
function scanRuntime(slug, tools, result) {
  const algorithms = [...new Set(tools.map((t) => t.algorithmId).filter(Boolean))].sort();
  result.algorithms = algorithms;
  const runtimeFiles = [...new Set(algorithms.map((id) => RUNTIME_BY_ALGORITHM.get(id) || (id === `validohub.${slug}-suite` ? `${slug}-suite.js` : '')).filter(Boolean))].sort();
  result.runtimes = runtimeFiles;
  for (const algorithmId of algorithms) if (algorithmId.startsWith('validohub.') && !RUNTIME_BY_ALGORITHM.has(algorithmId) && algorithmId !== `validohub.${slug}-suite`) result.blockers.push(`${slug}: no runtime mapping for ${algorithmId}`);
  for (const runtimeFile of runtimeFiles) {
    const rel = path.join('assets/js/tools', runtimeFile);
    if (!fileExists(rel)) { result.blockers.push(`${slug}: runtime file missing: ${rel}`); continue; }
    const source = readFile(rel);
    const isBespokeGoldRuntime = BESPOKE_GOLD_RUNTIME_FILES.has(runtimeFile);
    const isFactory = !isBespokeGoldRuntime && (source.includes('ValidoHubCountrySuiteFactory') || FACTORY_COUNTRIES.has(slug));
    if (isFactory) result.factoryRuntime = true;
    if (!/breakdownTitle|field breakdown|Field breakdown|fields\s*:|fieldBreakdown|localStructuralSlices|result\.breakdown|pesel-breakdown|checksum debugger|anatomy|Identifier anatomy|TLV explorer|checksum replay/i.test(source)) result.blockers.push(`${slug}: ${runtimeFile} lacks explicit field breakdown source tokens`);
    if (!/qualityNotes|Quality notes|privacy boundary|official lookup|official boundary|boundary|runs locally|generated locally|locally in your browser/i.test(source)) result.blockers.push(`${slug}: ${runtimeFile} lacks quality-note or boundary source tokens`);
    if (isFactory) {
      for (const token of ['createSuite', 'breakdownTitle', 'breakdownSummary', 'result.breakdown']) if (!source.includes(token)) result.blockers.push(`${slug}: ${runtimeFile} factory runtime missing ${token}`);
      for (const locale of CORE_LOCALES) if (!source.includes(`${locale}:`) && !source.includes(`'${locale}'`) && !source.includes(`"${locale}"`)) result.blockers.push(`${slug}: ${runtimeFile} missing runtime locale ${locale}`);
    }
  }
}
function evaluateCountry(slug, locales) {
  const data = loadCountryData(slug);
  const yamlExists = fileExists(path.join('countries', slug + '.yaml'));
  const yamlTools = loadCountryTools(slug);
  const dataTools = loadCountryDataTools(slug, data);
  const tools = yamlTools.length ? yamlTools : dataTools;
  const toolIds = tools.map((t) => t.id || t.file.replace(/\.yaml$/, ''));
  const generatedEnglish = generatedToolDirs(slug, 'en');
  const availableWorkbenchCount = Array.isArray(data?.availableWorkbenches)
    ? data.availableWorkbenches.length
    : dataTools.length;
  const result = { slug, name: data?.name ?? slug, iso2: data?.iso2 ?? null, catalogStatus: data?.catalog?.status ?? 'unknown', completion: data?.catalog?.completion ?? null, yamlExists, dataRouteToolCount: dataTools.length, toolCount: tools.length, availableWorkbenchCount, plannedWorkbenchCount: Array.isArray(data?.plannedWorkbenches) ? data.plannedWorkbenches.length : 0, generatedEnglishToolPages: generatedEnglish.length, checkedGeneratedPages: 0, algorithms: [], runtimes: [], state: 'unknown', blockers: [], warnings: [] };
  if (data?.__parseError) result.blockers.push(`${slug}: country data JSON parse error: ${data.__parseError}`);
  if (fileExists('assets/js/bundle.js') && /mountOfficialLanguageQuickActions\(localeState/i.test(readFile('assets/js/bundle.js'))) {
    result.blockers.push(`${slug}: country breadcrumb official-language quick action is enabled in bundle.js`);
  }
  if ((result.catalogStatus === 'available' || tools.length > 0) && !yamlExists && dataTools.length === 0) result.blockers.push(`${slug}: country yaml missing for available/tool country`);
  if (tools.length > 0 && result.availableWorkbenchCount !== tools.length) result.warnings.push(`${slug}: availableWorkbenches (${result.availableWorkbenchCount}) differs from tool YAML count (${tools.length})`);
  const seen = new Set();
  for (const tool of tools) {
    const id = tool.id || tool.file.replace(/\.yaml$/, '');
    if (seen.has(id)) result.blockers.push(`${slug}: duplicate tool id ${id}`);
    seen.add(id);
    if (!tool.id) result.blockers.push(`${slug}/${tool.file}: missing id`);
    if (!tool.name) result.blockers.push(`${slug}/${tool.file}: missing name`);
    if (!tool.algorithmId) result.blockers.push(`${slug}/${tool.file}: missing algorithmId`);
    if (!tool.forms.length) result.blockers.push(`${slug}/${tool.file}: missing forms`);
    if (!tool.capabilities.length) result.blockers.push(`${slug}/${tool.file}: missing capabilities`);
    const allowedRelatedPrefixes = slug === 'germany' ? ['germany-', 'german-'] : [slug + '-'];
    const allowedGlobalRelated = new Set(['iban-validator']);
    const foreignRelated = tool.relatedTools.filter((r) => r && !allowedRelatedPrefixes.some((prefix) => r.startsWith(prefix)) && !(slug === 'poland' && r === 'pesel-validator') && !allowedGlobalRelated.has(r));
    if (foreignRelated.length) result.blockers.push(`${slug}/${tool.file}: relatedTools escape country: ${foreignRelated.join(', ')}`);
    if (!tool.relatedTools.length && tools.length > 1) result.warnings.push(`${slug}/${tool.file}: no relatedTools configured`);
  }
  for (const id of toolIds) if (id && !generatedEnglish.includes(id)) result.blockers.push(`en/${slug}/${id}: generated tool page missing`);
  scanRuntime(slug, tools, result);
  scanHub(slug, locales, result);
  for (const locale of locales) for (const id of toolIds) scanGeneratedPage(slug, locale, id, result);
  scanForeignFallback(slug, result);
  if (result.blockers.length === 0 && tools.length > 0) result.state = 'full-premium-ready';
  else if (tools.length > 0) result.state = 'needs-hardening';
  else if (result.catalogStatus === 'planned') result.state = 'planned';
  else result.state = 'legacy-or-metadata-only';
  return result;
}
function writeReports(results) {
  const outDir = abs('docs/reports');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'country-premium-readiness.json'), JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2) + '\n');
  const lines = ['# Country Premium Readiness Report', '', 'Generated by `npm run audit:country-premium`.', '', '| Country | State | Tools | Generated en pages | Blockers | Warnings |', '| --- | --- | ---: | ---: | ---: | ---: |'];
  for (const r of results) lines.push(`| ${r.slug} | ${r.state} | ${r.toolCount} | ${r.generatedEnglishToolPages} | ${r.blockers.length} | ${r.warnings.length} |`);
  lines.push('', '## Blockers');
  if (!results.some((r) => r.blockers.length)) lines.push('', 'No blockers detected for selected countries.');
  for (const r of results) if (r.blockers.length) { lines.push('', `### ${r.slug}`); for (const b of r.blockers) lines.push(`- ${b}`); }
  lines.push('', '## Warnings');
  if (!results.some((r) => r.warnings.length)) lines.push('', 'No warnings detected for selected countries.');
  for (const r of results) if (r.warnings.length) { lines.push('', `### ${r.slug}`); for (const w of r.warnings) lines.push(`- ${w}`); }
  fs.writeFileSync(path.join(outDir, 'country-premium-readiness.md'), lines.join('\n') + '\n');
}

const locales = selectedCountry ? ['en'] : parseSiteLocales();
const countries = selectedCountry ? [selectedCountry] : [...new Set([...ACTIVE_BASELINE_COUNTRIES, ...countryYamlSlugs(), ...countryDataSlugs()])].sort();
const results = countries.map((slug) => evaluateCountry(slug, locales));
if (writeReport) writeReports(results);
for (const result of results) {
  const icon = result.blockers.length ? 'FAIL' : 'PASS';
  console.log(`${icon} ${result.slug}: ${result.state} (${result.toolCount} tools, ${result.blockers.length} blockers, ${result.warnings.length} warnings)`);
  for (const blocker of result.blockers.slice(0, 8)) console.log(`  - ${blocker}`);
  if (result.blockers.length > 8) console.log(`  - ... ${result.blockers.length - 8} more blockers`);
}
const strictResults = selectedCountry ? results : (hasFlag('--strict') ? results.filter((r) => r.toolCount > 0 || r.catalogStatus === 'available' || r.yamlExists) : []);
const failed = strictResults.filter((r) => r.blockers.length > 0);
if (failed.length) {
  console.error(`Country premium audit failed for ${failed.length} ${failed.length === 1 ? 'country' : 'countries'}.`);
  process.exit(1);
}
console.log(selectedCountry || hasFlag('--strict') ? 'Country premium audit passed.' : 'Country premium readiness report generated.');
