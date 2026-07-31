import { access, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');
const countryDataRoot = resolve(projectRoot, 'countries', 'data');
const assetsManifest = JSON.parse(await readFile(resolve(projectRoot, 'assets', 'assets-manifest.json'), 'utf8'));

const COPY = {
  en: {
    relatedTools: 'Related tools',
    nextSteps: 'Useful next steps',
    note: 'Short, relevant links for this country and workflow.',
    relatedCountryTools: country => `Related ${country} tools`,
    sameWorkflow: workflow => `Same ${workflow} workflow in other countries`,
    allCountryTools: country => `All ${country} tools`,
    allCountries: 'All country tools',
    globalTools: 'Global tools',
    workflows: {
      identity: 'Identity',
      tax: 'Tax and registry',
      banking: 'Banking and payments',
      address: 'Address and contact',
      privacy: 'Privacy and fixtures',
      vehicle: 'Vehicle and transport',
      general: 'Developer workflow'
    }
  },
  es: {
    relatedTools: 'Herramientas relacionadas',
    nextSteps: 'Siguientes pasos utiles',
    note: 'Enlaces breves y relevantes para este pais y flujo.',
    relatedCountryTools: country => `Herramientas de ${country} relacionadas`,
    sameWorkflow: workflow => `Mismo flujo de ${workflow} en otros paises`,
    allCountryTools: country => `Todas las herramientas de ${country}`,
    allCountries: 'Todas las herramientas por pais',
    globalTools: 'Herramientas globales',
    workflows: { identity: 'identidad', tax: 'impuestos y registro', banking: 'banca y pagos', address: 'direccion y contacto', privacy: 'privacidad y fixtures', vehicle: 'vehiculos y transporte', general: 'desarrollador' }
  },
  'pt-BR': {
    relatedTools: 'Ferramentas relacionadas',
    nextSteps: 'Proximos passos uteis',
    note: 'Links curtos e relevantes para este pais e fluxo.',
    relatedCountryTools: country => `Ferramentas relacionadas de ${country}`,
    sameWorkflow: workflow => `Mesmo fluxo de ${workflow} em outros paises`,
    allCountryTools: country => `Todas as ferramentas de ${country}`,
    allCountries: 'Todas as ferramentas por pais',
    globalTools: 'Ferramentas globais',
    workflows: { identity: 'identidade', tax: 'impostos e registro', banking: 'bancos e pagamentos', address: 'endereco e contato', privacy: 'privacidade e fixtures', vehicle: 'veiculos e transporte', general: 'desenvolvedor' }
  },
  de: {
    relatedTools: 'Verwandte Tools',
    nextSteps: 'Nuetzliche naechste Schritte',
    note: 'Kurze, relevante Links fuer dieses Land und diesen Workflow.',
    relatedCountryTools: country => `Verwandte ${country}-Tools`,
    sameWorkflow: workflow => `Derselbe ${workflow}-Workflow in anderen Laendern`,
    allCountryTools: country => `Alle ${country}-Tools`,
    allCountries: 'Alle Laender-Tools',
    globalTools: 'Globale Tools',
    workflows: { identity: 'Identitaet', tax: 'Steuer und Register', banking: 'Banking und Zahlungen', address: 'Adresse und Kontakt', privacy: 'Datenschutz und Fixtures', vehicle: 'Fahrzeug und Transport', general: 'Entwickler' }
  },
  fr: {
    relatedTools: 'Outils lies',
    nextSteps: 'Prochaines etapes utiles',
    note: 'Liens courts et pertinents pour ce pays et ce workflow.',
    relatedCountryTools: country => `Outils ${country} lies`,
    sameWorkflow: workflow => `Meme workflow ${workflow} dans d'autres pays`,
    allCountryTools: country => `Tous les outils ${country}`,
    allCountries: 'Tous les outils par pays',
    globalTools: 'Outils globaux',
    workflows: { identity: 'identite', tax: 'taxe et registre', banking: 'banque et paiements', address: 'adresse et contact', privacy: 'confidentialite et fixtures', vehicle: 'vehicule et transport', general: 'developpeur' }
  },
  pl: {
    relatedTools: 'Powiazane narzedzia',
    nextSteps: 'Przydatne kolejne kroki',
    note: 'Krotkie, trafne linki dla tego kraju i workflow.',
    relatedCountryTools: country => `Powiazane narzedzia: ${country}`,
    sameWorkflow: workflow => `Ten sam workflow: ${workflow} w innych krajach`,
    allCountryTools: country => `Wszystkie narzedzia: ${country}`,
    allCountries: 'Wszystkie narzedzia krajowe',
    globalTools: 'Narzedzia globalne',
    workflows: { identity: 'tozsamosc', tax: 'podatki i rejestry', banking: 'bankowosc i platnosci', address: 'adres i kontakt', privacy: 'prywatnosc i fixtures', vehicle: 'pojazdy i transport', general: 'developerski' }
  },
  uk: {
    relatedTools: 'Повʼязані інструменти',
    nextSteps: 'Корисні наступні кроки',
    note: 'Короткі релевантні посилання для цієї країни й workflow.',
    relatedCountryTools: country => `Повʼязані інструменти ${country}`,
    sameWorkflow: workflow => `Такий самий workflow: ${workflow} в інших країнах`,
    allCountryTools: country => `Усі інструменти ${country}`,
    allCountries: 'Усі інструменти країн',
    globalTools: 'Глобальні інструменти',
    workflows: { identity: 'ідентифікація', tax: 'податки й реєстри', banking: 'банкінг і платежі', address: 'адреси й контакти', privacy: 'приватність і фікстури', vehicle: 'транспорт', general: 'розробницький' }
  }
};

const WORKFLOW_GROUPS = [
  { id: 'identity', label: 'Identity', terms: ['dni', 'id-card', 'passport', 'mrz', 'personal', 'residence', 'driving', 'license', 'licence', 'national-id', 'curp', 'pesel', 'cpf', 'rnokpp', 'cedula', 'cuil'] },
  { id: 'tax', label: 'Tax and registry', terms: ['tax', 'vat', 'iva', 'cuit', 'nit', 'tin', 'eori', 'company', 'registry', 'register', 'customs', 'fiscal', 'invoice', 'importer'] },
  { id: 'banking', label: 'Banking and payments', terms: ['iban', 'bank', 'account', 'payment', 'transfer', 'remittance', 'swift', 'bic', 'cbu', 'cvu', 'boleto', 'pix', 'qr', 'debit', 'payout'] },
  { id: 'address', label: 'Address and contact', terms: ['address', 'postal', 'postcode', 'zip', 'phone', 'e164', 'region', 'municipality', 'locale-number', 'date-locale', 'currency-decimal'] },
  { id: 'privacy', label: 'Privacy and fixtures', terms: ['pii', 'redaction', 'personal-data', 'fixture', 'support-ticket', 'ocr', 'data-quality', 'api-payload', 'json-fixture', 'regex', 'form-field', 'smoke-test', 'csv', 'slug', 'copy'] },
  { id: 'vehicle', label: 'Vehicle and transport', terms: ['vehicle', 'vin', 'plate', 'tracking'] }
];

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function localizedHref(href, locale) {
  return locale === 'en' ? href : String(href || '').replace(/^\/en\//, `/${locale}/`);
}

function routeSearchText(route) {
  return `${route?.href || ''} ${route?.title || ''} ${route?.text || ''} ${route?.summary || ''}`.toLowerCase();
}

function workflowForRoute(route) {
  const text = routeSearchText(route);
  return WORKFLOW_GROUPS.find(group => group.terms.some(term => text.includes(term))) || { id: 'general', label: 'Developer workflow', terms: [] };
}

function keywordSetForRoute(route) {
  const stopWords = new Set(['and', 'the', 'for', 'with', 'from', 'into', 'local', 'browser', 'only', 'helper', 'validator', 'generator', 'inspector', 'parser', 'workbench', 'country', 'evidence', 'format', 'formats', 'official', 'boundary']);
  return new Set(routeSearchText(route)
    .split(/[^a-z0-9]+/i)
    .filter(token => token.length > 2 && !stopWords.has(token)));
}

function scoreRelatedTool(currentRoute, candidateRoute) {
  const workflowScore = workflowForRoute(currentRoute).id === workflowForRoute(candidateRoute).id ? 40 : 0;
  const currentKeywords = keywordSetForRoute(currentRoute);
  const candidateKeywords = keywordSetForRoute(candidateRoute);
  let score = workflowScore;
  for (const keyword of currentKeywords) {
    if (candidateKeywords.has(keyword)) score += 4;
  }
  return score;
}

function routesFromCountryData(data) {
  const countrySlug = data.id || data.catalog?.id || '';
  const routes = [];
  if (Array.isArray(data.hub?.routes)) routes.push(...data.hub.routes);
  if (Array.isArray(data.catalog?.availableWorkbenches)) {
    routes.push(...data.catalog.availableWorkbenches
      .filter(name => typeof name === 'string' && name.trim())
      .map(name => ({
        title: name,
        href: `/en/${countrySlug}/${countrySlug}-${slugifyToolName(name)}/`,
        text: ''
      })));
  }
  if (Array.isArray(data.availableWorkbenches)) {
    routes.push(...data.availableWorkbenches
      .filter(tool => tool?.id)
      .map(tool => ({
        title: tool.name || tool.title || String(tool.id).replace(/-/g, ' '),
        href: `/en/${countrySlug}/${tool.id}/`,
        text: tool.description || tool.text || ''
      })));
  } else if (data.availableWorkbenches && typeof data.availableWorkbenches === 'object') {
    routes.push(...Object.entries(data.availableWorkbenches)
      .map(([name, details]) => ({
        title: name,
        href: `/en/${countrySlug}/${countrySlug}-${slugifyToolName(name)}/`,
        text: details?.description || ''
      })));
  }
  const seen = new Set();
  return routes.filter(route => {
    const href = String(route.href || '');
    if (!href || seen.has(href)) return false;
    seen.add(href);
    return true;
  });
}

function slugifyToolName(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function scanHtmlFiles(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) files.push(...await scanHtmlFiles(full));
    else if (entry.isFile() && entry.name === 'index.html') files.push(full);
  }
  return files;
}

async function readCountryDataIndex() {
  const files = (await readdir(countryDataRoot)).filter(file => file.endsWith('.json'));
  const entries = [];
  for (const file of files) {
    try {
      const data = JSON.parse(await readFile(resolve(countryDataRoot, file), 'utf8'));
      const routes = routesFromCountryData(data);
      if (!routes.length) continue;
      entries.push({
        slug: data.id || data.catalog?.id || file.replace(/\.json$/, ''),
        name: data.catalog?.name || file.replace(/\.json$/, ''),
        iso2: data.catalog?.iso2 || '',
        region: data.catalog?.region || data.catalog?.continent || '',
        continent: data.catalog?.continent || '',
        data,
        routes
      });
    } catch {
      // Other validation passes own malformed country data reporting.
    }
  }
  return entries;
}

function countryNameForLocale(entry, locale) {
  if (locale === 'en' || !entry.iso2) return entry.name;
  try {
    return new Intl.DisplayNames([locale], { type: 'region' }).of(entry.iso2) || entry.name;
  } catch {
    return entry.name;
  }
}

function renderLinkCards(routes, locale) {
  return routes.map(route => `
              <a href="${escapeHtml(localizedHref(route.href, locale))}" class="link-card">
                <span>${escapeHtml(route.title)}</span>
                <span aria-hidden="true">→</span>
              </a>`).join('');
}

function stripHtml(value) {
  return String(value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function deriveRouteFromContent(content, countrySlug, toolSlug) {
  const title = stripHtml(content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]) || toolSlug.replace(/-/g, ' ');
  const text = content.match(/<meta name="description" content="([^"]*)"/i)?.[1] || '';
  return {
    title,
    href: `/en/${countrySlug}/${toolSlug}/`,
    text
  };
}

function extractSameCountryLinks(content, { locale, countrySlug, pagePath }) {
  const allowedPrefix = `/${locale}/${countrySlug}/`;
  const seen = new Set();
  return [...content.matchAll(/<a href="([^"]+)" class="link-card">([\s\S]*?)<\/a>/g)]
    .map(match => ({
      href: match[1],
      title: stripHtml(match[2]).replace(/→$/, '').trim(),
      text: ''
    }))
    .filter(route => {
      const normalizedHref = route.href.endsWith('/') ? route.href : `${route.href}/`;
      if (!normalizedHref.startsWith(allowedPrefix) || normalizedHref === pagePath || seen.has(normalizedHref)) return false;
      seen.add(normalizedHref);
      return true;
    })
    .slice(0, 12);
}

function chooseSameCountryRoutes(routes, currentRoute) {
  return routes
    .filter(route => route.href && route.href !== currentRoute.href)
    .map(route => ({ route, score: scoreRelatedTool(currentRoute, route) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map(item => item.route);
}

function buildWorkflowBuckets(index) {
  const buckets = new Map();
  for (const entry of index) {
    const usedByWorkflow = new Set();
    for (const route of entry.routes) {
      const workflowId = workflowForRoute(route).id;
      if (usedByWorkflow.has(workflowId)) continue;
      usedByWorkflow.add(workflowId);
      if (!buckets.has(workflowId)) buckets.set(workflowId, []);
      buckets.get(workflowId).push({ entry, route });
    }
  }
  return buckets;
}

function chooseSameWorkflowRoutes(workflowBuckets, entry, currentRoute) {
  const workflow = workflowForRoute(currentRoute);
  const scored = [];
  for (const candidate of workflowBuckets.get(workflow.id) || []) {
    const candidateEntry = candidate.entry;
    if (candidateEntry.slug === entry.slug) continue;
    const regionBoost = candidateEntry.region && candidateEntry.region === entry.region ? 12 : 0;
    const continentBoost = candidateEntry.continent && candidateEntry.continent === entry.continent ? 8 : 0;
    scored.push({
      route: candidate.route,
      score: scoreRelatedTool(currentRoute, candidate.route) + regionBoost + continentBoost
    });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, 6).map(item => item.route);
}

function renderFooter({ entry, currentRoute, sameCountry, locale }) {
  const countryName = countryNameForLocale(entry, locale);
  const copy = COPY[locale] || COPY.en;
  return `
        <section class="related-section vh-tool-related-footer" aria-label="Related navigation">
          <div class="section-heading">
            <span class="eyebrow">${escapeHtml(copy.relatedTools)}</span>
            <h2>${escapeHtml(copy.nextSteps)}</h2>
            <p>${escapeHtml(copy.note)}</p>
          </div>
          <div class="vh-tool-related-layout">
            <div class="vh-tool-related-group">
              <h3>${escapeHtml(copy.relatedCountryTools(countryName))}</h3>
              <div class="vh-tool-related-links">${renderLinkCards(sameCountry, locale)}</div>
            </div>
            <div class="vh-tool-related-side">
              <div class="vh-tool-related-actions">
                <a href="/${escapeHtml(locale)}/${escapeHtml(entry.slug)}/" class="pill-link">${escapeHtml(copy.allCountryTools(countryName))}</a>
                <a href="/${escapeHtml(locale)}/countries/" class="pill-link">${escapeHtml(copy.allCountries)}</a>
                <a href="/${escapeHtml(locale)}/tools/" class="pill-link">${escapeHtml(copy.globalTools)}</a>
              </div>
            </div>
          </div>
        </section>`;
}

function parseCsvArg(name) {
  const prefix = `--${name}=`;
  const arg = process.argv.find(item => item.startsWith(prefix));
  return arg ? new Set(arg.slice(prefix.length).split(',').map(item => item.trim()).filter(Boolean)) : null;
}

function stringArg(name) {
  const prefix = `--${name}=`;
  const arg = process.argv.find(item => item.startsWith(prefix));
  return arg ? arg.slice(prefix.length) : '';
}

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function runtimeTagsForCountry(countrySlug) {
  const scripts = [
    '/assets/js/workbench/clipboard.js',
    '/assets/js/workbench/download.js',
    '/assets/js/workbench/file.js',
    '/assets/js/workbench/keyboard.js',
    '/assets/js/workbench/preview.js',
    '/assets/js/workbench/stats.js',
    '/assets/js/workbench/utf8.js',
    '/assets/js/workbench/hex.js',
    '/assets/js/workbench/framework.js'
  ];
  const baseScripts = scripts.map(src => `<script src="${src}"></script>`).join('');
  const countryRuntime = `${countrySlug}-suite.js`;
  const countryRuntimePath = resolve(projectRoot, 'assets', 'js', 'tools', countryRuntime);
  const countryTags = await pathExists(countryRuntimePath)
    ? `<script src="/assets/js/tools/country-suite-factory.js?v=country-suite-factory-rail-preview-fix-20260727"></script><script src="/assets/js/tools/${countryRuntime}?v=country-premium-clickfix-20260730"></script><script src="/assets/js/tools/gold-tools-lab.js?v=gold-tools-lab-v4-20260727"></script>`
    : '';
  return `${baseScripts}<script src="${assetsManifest.js}" defer></script>\n${countryTags}`;
}

async function closingShell(locale, countrySlug) {
  const scripts = await runtimeTagsForCountry(countrySlug);
  return `
      </div>
    </section>
  </main>
  <footer class="site-footer">
    <div class="container footer-inner">
      <a class="brand compact" href="/${escapeHtml(locale)}/">
        <span class="brand-mark">V</span>
        <span class="brand-text">ValidoHub</span>
      </a>
      <nav class="footer-links" aria-label="Footer navigation"><a href="/${escapeHtml(locale)}/tools/">Tools</a><a href="/${escapeHtml(locale)}/countries/">Countries</a><a href="/${escapeHtml(locale)}/categories/national-identifiers/">Identifiers</a><a href="/sitemap.xml">Sitemap</a></nav>
    </div>
  </footer>
  ${scripts}
</body>
</html>
`;
}

async function replaceRelatedSection(content, footer, { locale, countrySlug }) {
  let inserted = false;
  const relatedSectionPattern = /<section class="[^"]*\brelated-section\b[^"]*"[^>]*>[\s\S]*?<\/section>/g;
  const closed = content.replace(relatedSectionPattern, () => {
    if (inserted) return '';
    inserted = true;
    return footer;
  });
  if (inserted) return closed;

  const start = content.search(/<section class="[^"]*\brelated-section\b[^"]*"[^>]*>/);
  if (start === -1) return content;
  return `${content.slice(0, start)}${footer}${await closingShell(locale, countrySlug)}`;
}

const countryFilter = parseCsvArg('countries');
const localeFilter = parseCsvArg('locales');
const index = await readCountryDataIndex();
const bySlug = new Map(index.map(entry => [entry.slug, entry]));
const workflowBuckets = buildWorkflowBuckets(index);
const targetFile = stringArg('targets-file');
const htmlFiles = targetFile
  ? (await readFile(targetFile, 'utf8')).split(/\r?\n/).map(line => line.trim()).filter(Boolean)
  : await scanHtmlFiles(siteRoot);
let updated = 0;
let scanned = 0;
let skippedCompact = 0;

for (const filePath of htmlFiles) {
  const normalizedFilePath = filePath.replace(/\\/g, '/');
  const match = normalizedFilePath.match(/(?:^|\/)generated\/validohub\/([^/]+)\/([^/]+)\/([^/]+)\/index\.html$/);
  if (!match) continue;
  const [, locale, countrySlug, toolSlug] = match;
  if (countryFilter && !countryFilter.has(countrySlug)) continue;
  if (localeFilter && !localeFilter.has(locale)) continue;
  const entry = bySlug.get(countrySlug);
  if (!entry) continue;
  let content = '';
  try {
    content = await readFile(filePath, 'utf8');
  } catch {
    continue;
  }
  if (!/class="[^"]*\brelated-section\b/.test(content)) continue;
  const hasEscapedCompactLinks = content.includes('vh-tool-related-footer')
    && new RegExp(`href="/${locale}/(?!${countrySlug}/|countries/|tools/)`).test(content);
  if (content.includes('vh-tool-related-footer') && !hasEscapedCompactLinks) {
    skippedCompact++;
    continue;
  }
  const pagePath = `/${locale}/${countrySlug}/${toolSlug}/`;
  const currentRoute = entry.routes.find(route => route.href === `/en/${countrySlug}/${toolSlug}/`)
    || deriveRouteFromContent(content, countrySlug, toolSlug);
  const sameCountry = entry.routes.some(route => route.href === currentRoute.href)
    ? chooseSameCountryRoutes(entry.routes, currentRoute)
    : extractSameCountryLinks(content, { locale, countrySlug, pagePath });
  scanned++;
  const footer = renderFooter({
    entry,
    currentRoute,
    sameCountry,
    locale
  });
  const next = await replaceRelatedSection(content, footer, { locale, countrySlug });
  if (next !== content) {
    await writeFile(filePath, next, 'utf8');
    updated++;
  }
  if (updated > 0 && updated % 500 === 0) {
    console.log(`...processed ${updated} updated, ${skippedCompact} already compact`);
  }
}

console.log(`✓ Repaired compact related footers on ${updated}/${scanned} country tool pages (${skippedCompact} already compact)`);
