import { access, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRouteRegistry } from './route-registry.mjs';
import { normalizeCountryData } from './country-page-model.mjs';
import { renderCountryVisualHero } from './render-country-visuals.mjs';
import {
  renderCountryIdentityFacts,
  renderCountryLocaleFacts,
  renderCountryTechnicalFacts,
  renderCountryCivicSnapshot,
  renderCountryQuickCopyBar,
  renderCountryWorkbenchCatalog,
  renderCountryFormattingExamples,
  renderCountryAddressFormat,
  renderCountryPhoneFormats,
  renderCountryVehicleRegistration,
  renderCountryAdministrativeDivisions,
  renderCountryTaxSystem,
  renderCountryBankingSystem,
  renderCountryPaymentSystems,
  renderCountryIdentifiers,
  renderCountryValidators,
  renderCountryIntegrationChecklist,
  renderCountryRoadmap,
  renderCountryOfficialResources,
  renderCountryKnowledgeGraph,
  renderCountryRelatedCountries,
  renderCountryCommonMistakes,
  renderCountryHighlights,
  renderCountryDeveloperNotes,
  renderCountryDeveloperExamples,
  renderCountryLocalizationNotes,
  renderCountryEcosystem
} from './render-country-sections.mjs';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');
const locale = 'en';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function escapeHtmlJson(jsonStr) {
  return jsonStr
    .replace(/&/g, '\\u0026')
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function renderHeader(active = 'countries') {
  const homeCurrent = active === 'home' ? ' aria-current="page" class="is-active"' : '';
  const toolsCurrent = active === 'tools' ? ' aria-current="page" class="is-active"' : '';
  const countriesCurrent = active === 'countries' ? ' aria-current="page" class="is-active"' : '';
  return `
    <header class="site-header">
      <div class="vh-container header-inner">
        <a class="brand" href="/en/">
          <span class="brand-mark">V</span>
          <span class="brand-text">ValidoHub</span>
        </a>
        <nav class="primary-nav" aria-label="Main navigation">
          <a href="/en/"${homeCurrent}>Home</a>
          <a href="/en/tools/"${toolsCurrent}>Tools</a>
          <a href="/en/countries/"${countriesCurrent}>Countries</a>
          <a href="/en/categories/national-identifiers/">Identifiers</a>
        </nav>
      </div>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="vh-container footer-inner">
        <a class="brand" href="/en/">
          <span class="brand-mark">V</span>
          <span class="brand-text">ValidoHub</span>
        </a>
        <nav class="footer-links" aria-label="Footer navigation">
          <a href="/en/tools/">Tools</a>
          <a href="/en/countries/">Countries</a>
          <a href="/en/categories/national-identifiers/">Identifiers</a>
          <a href="/sitemap.xml">Sitemap</a>
        </nav>
      </div>
    </footer>
  `;
}

function renderBreadcrumbs(countryName) {
  return `
    <nav class="vh-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><a href="/en/">Home</a></li>
        <li><a href="/en/countries/">Countries</a></li>
        <li><span aria-current="page">${escapeHtml(countryName)}</span></li>
      </ol>
    </nav>
  `;
}

function renderHero(countryName, flag, summary) {
  return `
    <header class="vh-page-intro">
      <div class="vh-flex vh-align-center vh-gap-sm">
        <span class="vh-flag">${flag}</span>
        <span class="vh-eyebrow">Country Hub</span>
      </div>
      <h1>${escapeHtml(countryName)} Developer Portal</h1>
      <p>${escapeHtml(summary)}</p>
    </header>
  `;
}

export async function renderCountryPage(route, routeRegistry, assetsManifest, options = {}) {
  const layoutTemplate = options.layoutTemplate || await readFile(resolve(projectRoot, 'templates', 'layout.html'), 'utf8');
  const countryTemplate = options.countryTemplate || await readFile(resolve(projectRoot, 'templates', 'country.html'), 'utf8');
  const discoveryData = options.discoveryData || JSON.parse(await readFile(resolve(projectRoot, 'knowledge', 'compiled-discovery.json'), 'utf8'));

  const data = route.metadata;
  const slug = data.id;
  const model = normalizeCountryData(data);
  const countryDiscovery = discoveryData.countries[slug] || { relatedCountries: [], relatedResources: { authorities: [], identifiers: [], payments: [], standards: [], workbenches: [] } };

  const sections = [];
  sections.push(renderCountryCivicSnapshot(model));
  sections.push(renderCountryQuickCopyBar(model));
  sections.push(renderCountryWorkbenchCatalog(model, routeRegistry));
  sections.push(renderCountryIdentifiers(model, routeRegistry));
  sections.push(renderCountryValidators(model, routeRegistry));
  sections.push(renderCountryTaxSystem(model, data.hub));
  sections.push(renderCountryBankingSystem(model, routeRegistry));
  sections.push(renderCountryPaymentSystems(model, routeRegistry));
  sections.push(renderCountryOfficialResources(model));
  sections.push(renderCountryIdentityFacts(model));
  sections.push(renderCountryLocaleFacts(model));
  sections.push(renderCountryTechnicalFacts(model));
  sections.push(await renderCountryAddressFormat(model));
  sections.push(renderCountryPhoneFormats(model));
  sections.push(renderCountryVehicleRegistration(model, data.hub));
  sections.push(renderCountryAdministrativeDivisions(model, data.hub));
  sections.push(renderCountryIntegrationChecklist(model));
  sections.push(renderCountryRoadmap(model));
  sections.push(renderCountryKnowledgeGraph(model, countryDiscovery, routeRegistry));
  sections.push(renderCountryRelatedCountries(model, countryDiscovery, routeRegistry));
  sections.push(renderCountryHighlights(model, data.hub));
  sections.push(renderCountryDeveloperNotes(model, data.hub));
  sections.push(renderCountryCommonMistakes(model, data.hub));
  sections.push(renderCountryDeveloperExamples(model, data.hub));
  sections.push(renderCountryEcosystem(model, data.hub));
  sections.push(renderCountryLocalizationNotes(model, data.hub));

  const bodyHtml = sections.filter(Boolean).join('\n');
  const countryContent = countryTemplate.replaceAll('{{ COUNTRY_BODY }}', () => bodyHtml);

  const headHtml = `
    <title>${escapeHtml(data.catalog.name)} Developer Tools & Identifiers | ValidoHub</title>
    <meta name="description" content="${escapeHtml(data.catalog.summary)}">
    <link rel="canonical" href="https://validohub.com/en/${slug}/">
    <link rel="alternate" hreflang="en" href="https://validohub.com/en/${slug}/">
    <link rel="stylesheet" href="${assetsManifest.css}">
  `;

  const breadcrumbsHtml = renderBreadcrumbs(data.catalog.name);
  const heroHtml = await renderCountryVisualHero(model, routeRegistry);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${escapeHtml(data.catalog.name)} Developer Tools & Identifiers | ValidoHub`,
    "description": data.catalog.summary,
    "url": `https://validohub.com/en/${slug}/`,
    "inLanguage": "en"
  };
  const jsonLdScript = `<script type="application/ld+json">${escapeHtmlJson(JSON.stringify(jsonLd))}</script>`;

  const assembledHtml = layoutTemplate
    .replaceAll('{{ HEAD }}', () => headHtml)
    .replaceAll('{{ HEADER }}', () => renderHeader())
    .replaceAll('{{ BREADCRUMBS }}', () => breadcrumbsHtml)
    .replaceAll('{{ HERO }}', () => heroHtml)
    .replaceAll('{{ CONTENT }}', () => countryContent)
    .replaceAll('{{ FOOTER }}', () => renderFooter())
    .replaceAll('{{ JSON_LD }}', () => jsonLdScript)
    .replaceAll('{{ SCRIPTS }}', () => `<script src="${assetsManifest.js}" defer></script>`);

  if (assembledHtml.includes('{{')) {
    throw new Error(`FATAL: Unresolved template slot marker found in generated country page: ${slug}`);
  }

  const outputFilePath = resolve(siteRoot, locale, slug, 'index.html');
  await mkdir(dirname(outputFilePath), { recursive: true });
  await writeFile(outputFilePath, assembledHtml, 'utf8');
  return outputFilePath;
}

function collectCountryPortalMetrics(countryRoutes) {
  let totalWorkbenches = 0;
  const uniqueIdentifiers = new Set();
  const uniquePayments = new Set();
  let totalAvailableGuides = 0;

  for (const route of countryRoutes) {
    const data = route.metadata;
    totalWorkbenches += (data.catalog.availableWorkbenches || []).length + (data.catalog.plannedWorkbenches || []).length;
    (data.catalog.identifiers || []).forEach(id => uniqueIdentifiers.add(id));
    (data.catalog.payments || []).forEach(payment => uniquePayments.add(payment));
    if (data.catalog.status === 'available') totalAvailableGuides += 1;
  }

  return {
    totalCountries: countryRoutes.length,
    totalWorkbenches,
    totalIdentifiers: uniqueIdentifiers.size,
    totalPayments: uniquePayments.size,
    totalAvailableGuides
  };
}

function findRouteByPath(routeRegistry, path) {
  return routeRegistry.get(path) || null;
}

function renderHomeToolCards(routeRegistry, items, cardClass = '') {
  return items.map(item => {
    const route = findRouteByPath(routeRegistry, item.path);
    if (!route && item.requireRoute !== false) return '';
    const title = route?.title || item.title || 'Developer Workbench';
    const cleanTitle = title.replace(/\s*\|\s*ValidoHub\s*$/i, '');
    const search = [
      cleanTitle,
      item.kicker,
      item.summary,
      ...(item.keywords || [])
    ].filter(Boolean).join(' ').toLowerCase();
    return `
      <a class="vh-home-tool-card vh-home-search-card ${cardClass}" href="${item.path}" data-search="${escapeHtml(search)}">
        <span class="vh-home-tool-kicker">${escapeHtml(item.kicker || 'tool')}</span>
        <strong>${escapeHtml(cleanTitle)}</strong>
        <span>${escapeHtml(item.summary || 'Open workbench')}</span>
      </a>
    `;
  }).filter(Boolean).join('\n');
}

function renderHomeCountryCards(countryRoutes) {
  const preferred = [
    'brazil',
    'poland',
    'france',
    'netherlands',
    'germany',
    'italy',
    'spain',
    'switzerland',
    'mexico',
    'united-kingdom',
    'united-states',
    'canada',
    'australia',
    'japan',
    'ukraine'
  ];
  const byId = new Map(countryRoutes.map(route => [route.metadata.id, route]));
  return preferred
    .map(id => byId.get(id))
    .filter(Boolean)
    .map(route => {
      const data = route.metadata;
      const workbenchCount = (data.catalog.availableWorkbenches || []).length;
      const search = [
        data.catalog.name,
        data.catalog.iso2,
        data.catalog.iso3,
        data.catalog.currency,
        data.catalog.language,
        ...(data.catalog.identifiers || []),
        ...(data.catalog.payments || [])
      ].join(' ').toLowerCase();
      return `
        <a class="vh-home-country-card vh-home-search-card" href="${route.path}" data-search="${escapeHtml(search)}">
          <span class="vh-flag">${escapeHtml(data.catalog.flag)}</span>
          <strong>${escapeHtml(data.catalog.name)}</strong>
          <span>${workbenchCount} local workbenches</span>
        </a>
      `;
    }).join('\n');
}

function rgbTripletToHex(rgbTriplet, fallback = '#0f766e') {
  const parts = String(rgbTriplet || '').trim().split(/\s+/).map(part => Number(part));
  if (parts.length < 3 || parts.some(part => !Number.isFinite(part))) return fallback;
  return `#${parts.slice(0, 3).map(part => Math.max(0, Math.min(255, Math.round(part))).toString(16).padStart(2, '0')).join('')}`;
}

const COUNTRY_MAP_FLAG_PALETTES = {
  brazil: ['#009739', '#fedd00', '#012169'],
  canada: ['#d80621', '#ffffff', '#d80621'],
  chile: ['#0039a6', '#ffffff', '#d52b1e'],
  france: ['#0055a4', '#ffffff', '#ef4135'],
  germany: ['#000000', '#dd0000', '#ffce00'],
  ghana: ['#ce1126', '#fcd116', '#006b3f'],
  italy: ['#008c45', '#f4f5f0', '#cd212a'],
  japan: ['#ffffff', '#bc002d', '#ffffff'],
  kenya: ['#000000', '#bb0000', '#006600'],
  mexico: ['#006847', '#ffffff', '#ce1126'],
  netherlands: ['#ae1c28', '#ffffff', '#21468b'],
  poland: ['#ffffff', '#dc143c', '#dc143c'],
  spain: ['#aa151b', '#f1bf00', '#aa151b'],
  switzerland: ['#ff0000', '#ffffff', '#ff0000'],
  'united-kingdom': ['#012169', '#ffffff', '#c8102e'],
  'united-states': ['#b22234', '#ffffff', '#3c3b6e']
};

function buildHomeMapCountry(route) {
  const data = route.metadata;
  const metadata = data.hub?.metadata || {};
  const visualIdentity = data.hub?.visualIdentity || {};
  const workbenchCount = (data.catalog.availableWorkbenches || []).length;
  const identifiers = (data.catalog.identifiers || []).slice(0, 3);
  const payments = (data.catalog.payments || []).slice(0, 2);
  const primary = rgbTripletToHex(visualIdentity.heroAccentPrimary, '#0f766e');
  const secondary = rgbTripletToHex(visualIdentity.heroAccentSecondary, '#ffffff');
  const tertiary = rgbTripletToHex(visualIdentity.heroAccentTertiary, '#2563eb');
  const colors = COUNTRY_MAP_FLAG_PALETTES[data.id] || [primary, secondary, tertiary];

  return {
    slug: data.id,
    href: route.path,
    name: data.catalog.name,
    flag: data.catalog.flag,
    iso2: data.catalog.iso2,
    iso3: data.catalog.iso3,
    continent: data.catalog.continent,
    region: data.catalog.region || metadata.region || data.catalog.continent,
    capital: metadata.capital || 'Capital varies by source',
    currency: data.catalog.currency || metadata.currencyCode || '',
    language: data.catalog.language || metadata.languages || '',
    workbenchCount,
    identifiers,
    payments,
    colors,
    outlineSrc: data.hero?.outlineSrc || data.hub?.hero?.outlineSrc || `/assets/images/countries/${data.id}-outline.png`,
    coordinates: data.catalog.coordinates || { x: 50, y: 50 }
  };
}

function renderHomeWorldMapMarkers(countries, supportedIso2) {
  const missing = countries.filter(country => !supportedIso2.has(String(country.iso2 || '').toUpperCase()));
  const grouped = new Map();

  return missing.map(country => {
    const key = `${Math.round(country.coordinates.x)}:${Math.round(country.coordinates.y)}`;
    const index = grouped.get(key) || 0;
    grouped.set(key, index + 1);
    const angle = (index * 58) * Math.PI / 180;
    const radius = index === 0 ? 0 : 1.8 + (index % 3) * 0.65;
    const x = Math.max(2, Math.min(98, Number(country.coordinates.x) + Math.cos(angle) * radius));
    const y = Math.max(3, Math.min(97, Number(country.coordinates.y) + Math.sin(angle) * radius));
    const colorA = country.colors[0];
    const colorB = country.colors[1];
    const colorC = country.colors[2];

    return `
      <button class="vh-home-world-marker"
              type="button"
              style="left:${x.toFixed(2)}%; top:${y.toFixed(2)}%; --vh-map-a:${colorA}; --vh-map-b:${colorB}; --vh-map-c:${colorC};"
              data-vh-world-country
              data-country-slug="${escapeHtml(country.slug)}"
              data-country-href="${escapeHtml(country.href)}"
              data-country-name="${escapeHtml(country.name)}"
              data-country-flag="${escapeHtml(country.flag)}"
              data-country-iso="${escapeHtml(`${country.iso2} / ${country.iso3}`)}"
              data-country-region="${escapeHtml(country.region)}"
              data-country-continent="${escapeHtml(country.continent)}"
              data-country-capital="${escapeHtml(country.capital)}"
              data-country-currency="${escapeHtml(country.currency)}"
              data-country-language="${escapeHtml(country.language)}"
              data-country-workbenches="${country.workbenchCount}"
              data-country-signals="${escapeHtml([...country.identifiers, ...country.payments].join(' · ') || 'Local developer formats')}"
              aria-label="Open ${escapeHtml(country.name)} developer hub">
        <span>${escapeHtml(country.flag)}</span>
      </button>
    `;
  }).join('\n');
}

async function renderHomeWorldMap(countryRoutes, metrics) {
  const countries = countryRoutes.map(buildHomeMapCountry);
  const byIso2 = new Map(countries.map(country => [String(country.iso2 || '').toLowerCase(), country]));
  const rawSvg = await readFile(resolve(projectRoot, 'assets', 'images', 'countries', 'world-map.svg'), 'utf8');
  const supportedIso2 = new Set([...rawSvg.matchAll(/\bid="([a-z]{2})"/g)].map(match => match[1].toUpperCase()).filter(iso2 => byIso2.has(iso2.toLowerCase())));
  const mapDefs = `
    <filter id="vh-home-premium-lift" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="2" stdDeviation="1.6" flood-color="#0f172a" flood-opacity="0.18"></feDropShadow>
      <feDropShadow dx="0" dy="-1" stdDeviation="0.65" flood-color="#ffffff" flood-opacity="0.55"></feDropShadow>
    </filter>
  `;

  let svg = rawSvg
    .replace('<svg ', '<svg class="vh-home-world-svg" ')
    .replace('role="img"', 'role="img" focusable="false"')
    .replace(/<title id="title">.*?<\/title>/s, '<title id="title">Interactive ValidoHub world coverage map</title>')
    .replace(/<desc id="desc">.*?<\/desc>/s, '<desc id="desc">Neutral world atlas. Hover or focus a country for a short developer hub preview; click to open it.</desc>');

  svg = svg.replace(/(<svg\b[^>]*>)/, `$1\n<defs>${mapDefs}</defs>`);

  for (const country of countries) {
    const iso2 = String(country.iso2 || '').toLowerCase();
    const attrs = [
      `id="vh-home-world-${country.slug}"`,
      `class="vh-home-world-country vh-marker-${country.slug}"`,
      'tabindex="0"',
      'role="link"',
      'data-vh-world-country',
      `data-country-slug="${escapeHtml(country.slug)}"`,
      `data-country-href="${escapeHtml(country.href)}"`,
      `data-country-name="${escapeHtml(country.name)}"`,
      `data-country-flag="${escapeHtml(country.flag)}"`,
      `data-country-iso="${escapeHtml(`${country.iso2} / ${country.iso3}`)}"`,
      `data-country-region="${escapeHtml(country.region)}"`,
      `data-country-continent="${escapeHtml(country.continent)}"`,
      `data-country-capital="${escapeHtml(country.capital)}"`,
      `data-country-currency="${escapeHtml(country.currency)}"`,
      `data-country-language="${escapeHtml(country.language)}"`,
      `data-country-workbenches="${country.workbenchCount}"`,
      `data-country-signals="${escapeHtml([...country.identifiers, ...country.payments].join(' · ') || 'Local developer formats')}"`,
      `data-country-outline="${escapeHtml(country.outlineSrc)}"`,
      `aria-label="Open ${escapeHtml(country.name)} developer hub"`,
      `style="--vh-map-a:${country.colors[0]}; --vh-map-b:${country.colors[1]}; --vh-map-c:${country.colors[2]};"`
    ].join(' ');
    svg = svg.replace(new RegExp(`(<(?:path|g)\\s+)id="${iso2}"`), `$1${attrs}`);
  }

  return `
    <section class="vh-home-section vh-home-world-section vh-home-search-results" id="home-world-map" aria-labelledby="home-world-map-title">
      <div class="vh-home-section-head">
        <span class="vh-eyebrow">World Coverage</span>
        <h2 id="home-world-map-title">A quiet atlas for local developer work.</h2>
        <p>All ${metrics.totalCountries} country hubs are reachable from one neutral map surface. Hover for a shape preview and integration snapshot; click to open the local developer portal.</p>
      </div>
      <div class="vh-home-world-shell">
        <div class="vh-home-world-map" data-vh-world-map>
          ${svg}
          <div class="vh-home-world-popover" data-vh-world-popover role="status" aria-live="polite">
            <span class="vh-home-world-popover-art">
              <img src="" alt="" loading="lazy" decoding="async" data-vh-world-popover-image>
            </span>
            <div class="vh-home-world-popover-top">
              <span data-vh-world-popover-flag>🌍</span>
              <div>
                <strong data-vh-world-popover-name>Choose a country</strong>
                <em data-vh-world-popover-region>Hover or focus the map</em>
              </div>
            </div>
            <dl>
              <div><dt>ISO</dt><dd data-vh-world-popover-iso>--</dd></div>
              <div><dt>Capital</dt><dd data-vh-world-popover-capital>--</dd></div>
              <div><dt>Currency</dt><dd data-vh-world-popover-currency>--</dd></div>
              <div><dt>Tools</dt><dd data-vh-world-popover-tools>--</dd></div>
            </dl>
            <p data-vh-world-popover-signals>Local identifiers and payment formats.</p>
          </div>
        </div>
        <aside class="vh-home-world-panel" aria-label="World map summary">
          <div><strong>${metrics.totalCountries}</strong><span>country hubs online</span></div>
          <div><strong>${metrics.totalWorkbenches}</strong><span>browser-only workbenches</span></div>
          <div><strong>${metrics.totalIdentifiers}</strong><span>identifier families indexed</span></div>
          <a href="/en/countries/">Open Countries Portal</a>
        </aside>
      </div>
    </section>
  `;
}

async function renderCountriesWorldMap(countryRoutes) {
  const countries = countryRoutes.map(buildHomeMapCountry);
  const byIso2 = new Map(countries.map(country => [String(country.iso2 || '').toLowerCase(), country]));
  const rawSvg = await readFile(resolve(projectRoot, 'assets', 'images', 'countries', 'world-map.svg'), 'utf8');
  const mapDefs = `
    <filter id="vh-countries-premium-lift" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="2" stdDeviation="1.6" flood-color="#0f172a" flood-opacity="0.18"></feDropShadow>
      <feDropShadow dx="0" dy="-1" stdDeviation="0.65" flood-color="#ffffff" flood-opacity="0.55"></feDropShadow>
    </filter>
  `;
  let svg = rawSvg
    .replace('<svg ', '<svg class="vh-countries-world-svg" aria-label="Interactive ValidoHub countries map" ')
    .replace('role="img"', 'role="img" focusable="false"')
    .replace(/<title id="title">.*?<\/title>/s, '')
    .replace(/<desc id="desc">.*?<\/desc>/s, '<desc id="desc">Neutral world atlas. Hover or focus a country to reveal a premium country-shape preview; click to open the country hub.</desc>');

  svg = svg.replace(/(<svg\b[^>]*>)/, `$1\n<defs>${mapDefs}</defs>`);

  for (const country of countries) {
    const iso2 = String(country.iso2 || '').toLowerCase();
    const attrs = [
      `id="vh-countries-world-${country.slug}"`,
      `class="vh-countries-world-country vh-marker-${country.slug}"`,
      'tabindex="0"',
      'role="link"',
      'data-vh-countries-map-item',
      `data-country-id="${escapeHtml(country.slug)}"`,
      `data-country-name="${escapeHtml(country.name)}"`,
      `data-country-href="${escapeHtml(country.href)}"`,
      `data-country-outline="${escapeHtml(country.outlineSrc)}"`,
      `aria-label="Open ${escapeHtml(country.name)} hub"`,
      `style="--vh-map-a:${country.colors[0]}; --vh-map-b:${country.colors[1]}; --vh-map-c:${country.colors[2]};"`
    ].join(' ');
    svg = svg.replace(new RegExp(`(<(?:path|g)\\s+)id="${iso2}"`), `$1${attrs}`);
  }

  return `
    <div class="vh-countries-world-map" data-vh-countries-world-map>
      ${svg}
      <div class="vh-countries-map-tooltip" data-vh-countries-map-tooltip role="status" aria-live="polite">
        <span class="vh-countries-map-tooltip-art">
          <img src="" alt="" loading="lazy" decoding="async" data-vh-countries-map-tooltip-image>
        </span>
        <strong data-vh-countries-map-tooltip-name>Country</strong>
      </div>
    </div>
  `;
}

export async function compileHomePortal(routeRegistry, assetsManifest) {
  console.log('--- Pass 2a: Rendering Home Portal ---');
  const layoutTemplate = await readFile(resolve(projectRoot, 'templates', 'layout.html'), 'utf8');
  const countryRoutes = routeRegistry.getAll().filter(route => route.type === 'country').sort((a, b) => a.metadata.catalog.name.localeCompare(b.metadata.catalog.name));
  const metrics = collectCountryPortalMetrics(countryRoutes);
  const globalToolsHtml = renderHomeToolCards(routeRegistry, [
    { path: '/en/tools/json-formatter/', kicker: 'JSON', summary: 'Format, inspect, and copy clean payloads.', keywords: ['global', 'developer', 'debug'] },
    { path: '/en/tools/jwt-decoder/', kicker: 'JWT', summary: 'Decode token headers and claims locally.', keywords: ['global', 'security', 'debug'] },
    { path: '/en/tools/base64-encoder/', kicker: 'Base64', summary: 'Encode browser-only test strings.', keywords: ['global', 'encoding', 'generator'] },
    { path: '/en/tools/url-encoder/', kicker: 'URL', summary: 'Encode query strings and route-safe values.', keywords: ['global', 'encoding'] },
    { path: '/en/tools/regex-tester/', kicker: 'Regex', summary: 'Test pattern behavior before shipping.', keywords: ['global', 'debug'] },
    { path: '/en/tools/uuid-generator/', kicker: 'UUID', summary: 'Generate copy-ready identifiers.', keywords: ['global', 'generator', 'fixtures'] },
    { path: '/en/tools/iban-validator/', kicker: 'IBAN', summary: 'Validate global ISO 13616 shape and MOD-97.', keywords: ['global', 'banking', 'payments'] },
    { path: '/en/tools/iban-generator/', kicker: 'IBAN Generator', summary: 'Create structural IBAN fixtures for supported countries.', keywords: ['global', 'generator', 'payments'] },
    { path: '/en/tools/json-schema-workbench/', kicker: 'Schema', summary: 'Inspect JSON Schema contracts before handoff.', keywords: ['json', 'schema', 'api'] },
    { path: '/en/tools/openapi-inspector/', kicker: 'OpenAPI', summary: 'Debug Swagger and OpenAPI payload contracts.', keywords: ['swagger', 'api', 'schema'] },
    { path: '/en/tools/webhook-signature-verifier/', kicker: 'Webhook', summary: 'Replay webhook signature evidence locally.', keywords: ['security', 'signature'] },
    { path: '/en/tools/http-security-headers-inspector/', kicker: 'Headers', summary: 'Audit HTTP security headers before launch.', keywords: ['security', 'csp', 'hsts'] },
    { path: '/en/tools/secret-pii-redactor/', kicker: 'PII', summary: 'Mask secrets and personal data in debug text.', keywords: ['privacy', 'redaction', 'mask'] },
    { path: '/en/tools/csv-locale-normalizer/', kicker: 'CSV', summary: 'Normalize locale-heavy CSV data safely.', keywords: ['locale', 'data quality'] },
    { path: '/en/tools/swift-bic-workbench/', kicker: 'BIC', summary: 'Inspect SWIFT/BIC bank routing shape.', keywords: ['banking', 'swift'] }
  ]);
  const countryToolsHtml = renderHomeToolCards(routeRegistry, [
    { path: '/en/poland/pesel-validator/', kicker: 'Poland', summary: 'PESEL checksum, date, gender, and debugger.', keywords: ['identity', 'checksum', 'field breakdown'] },
    { path: '/en/brazil/brazil-pix-validator/', kicker: 'Brazil', summary: 'PIX payload checks and payment handoff context.', keywords: ['payment', 'qr', 'pix'] },
    { path: '/en/france/france-siret-validator/', kicker: 'France', summary: 'SIRET/SIREN/NIC evidence and registry boundary.', keywords: ['registry', 'company', 'tax'] },
    { path: '/en/germany/german-tax-id-validator/', kicker: 'Germany', summary: 'IdNr structure, control evidence, and fixtures.', keywords: ['tax id', 'identity'] },
    { path: '/en/netherlands/netherlands-bsn-validator/', kicker: 'Netherlands', summary: 'BSN 11-test replay and field-level output.', keywords: ['identity', 'checksum'] },
    { path: '/en/czechia/czechia-rodne-cislo-validator/', kicker: 'Czechia', summary: 'Rodne cislo parser, date evidence, and review states.', keywords: ['identity', 'birth number'] },
    { path: '/en/ukraine/ukraine-rnokpp-validator/', kicker: 'Ukraine', summary: 'RNOKPP local structure and safe fixture handling.', keywords: ['tax id', 'identity'] },
    { path: '/en/italy/italy-codice-fiscale-validator/', kicker: 'Italy', summary: 'Codice fiscale parser and local evidence slices.', keywords: ['tax id', 'identity'] },
    { path: '/en/spain/spain-id-validator/', kicker: 'Spain', summary: 'DNI/NIE/NIF replay with local review states.', keywords: ['dni', 'nie', 'nif', 'identity'] },
    { path: '/en/mexico/mexico-curp-validator/', kicker: 'Mexico', summary: 'CURP anatomy, checksum, date, and state evidence.', keywords: ['curp', 'identity', 'checksum'] },
    { path: '/en/brazil/brazil-cpf-validator/', kicker: 'Brazil', summary: 'CPF checksum replay and fixture-safe output.', keywords: ['cpf', 'tax id', 'identity'] },
    { path: '/en/brazil/brazil-cnpj-validator/', kicker: 'Brazil', summary: 'CNPJ company identifier replay and masks.', keywords: ['cnpj', 'company', 'tax'] },
    { path: '/en/poland/poland-nip-validator/', kicker: 'Poland', summary: 'NIP tax checksum and wrong-prefix evidence.', keywords: ['nip', 'tax', 'checksum'] },
    { path: '/en/france/france-siren-validator/', kicker: 'France', summary: 'SIREN company-number structure and boundary.', keywords: ['siren', 'company'] },
    { path: '/en/netherlands/netherlands-kvk-number-validator/', kicker: 'Netherlands', summary: 'KVK registry number shape and local diagnostics.', keywords: ['kvk', 'company'] }
  ]);
  const generatorToolsHtml = renderHomeToolCards(routeRegistry, [
    { path: '/en/tools/iban-generator/', kicker: 'Global', summary: 'IBAN generator for structural fixtures.', keywords: ['generator', 'iban'] },
    { path: '/en/poland/poland-iban-generator/', kicker: 'Poland', summary: 'Generate Polish IBAN/NRB-style fixtures.', keywords: ['generator', 'payments'] },
    { path: '/en/france/france-iban-generator/', kicker: 'France', summary: 'Generate French IBAN test data.', keywords: ['generator', 'payments'] },
    { path: '/en/germany/germany-iban-generator/', kicker: 'Germany', summary: 'Generate German IBAN test data.', keywords: ['generator', 'payments'] },
    { path: '/en/netherlands/netherlands-iban-generator/', kicker: 'Netherlands', summary: 'Generate Dutch IBAN fixtures.', keywords: ['generator', 'payments'] },
    { path: '/en/spain/spain-iban-generator/', kicker: 'Spain', summary: 'Generate Spanish IBAN fixtures.', keywords: ['generator', 'payments'] },
    { path: '/en/italy/italy-iban-generator/', kicker: 'Italy', summary: 'Generate Italian IBAN fixtures.', keywords: ['generator', 'payments'] },
    { path: '/en/switzerland/switzerland-iban-generator/', kicker: 'Switzerland', summary: 'Generate Swiss IBAN fixtures.', keywords: ['generator', 'payments'] },
    { path: '/en/ukraine/ukraine-iban-generator/', kicker: 'Ukraine', summary: 'Generate Ukrainian IBAN fixtures.', keywords: ['generator', 'payments'] },
    { path: '/en/brazil/brazil-pix-qr-payload-generator/', kicker: 'Brazil', summary: 'Generate Pix QR payload fixtures.', keywords: ['generator', 'pix', 'qr'] },
    { path: '/en/brazil/brazil-test-data-generator/', kicker: 'Brazil', summary: 'Generate Brazilian local test records.', keywords: ['generator', 'fixtures'] },
    { path: '/en/tools/locale-test-data-generator/', kicker: 'Global', summary: 'Generate locale-aware test values.', keywords: ['generator', 'locale', 'fixtures'] },
    { path: '/en/poland/poland-test-data-generator/', kicker: 'Poland', summary: 'Generate Polish local test fixtures.', keywords: ['generator', 'fixtures'] },
    { path: '/en/france/france-personal-data-fixture-generator/', kicker: 'France', summary: 'Generate French personal-data fixtures.', keywords: ['generator', 'fixtures'] },
    { path: '/en/germany/german-personal-data-fixture-generator/', kicker: 'Germany', summary: 'Generate German personal-data fixtures.', keywords: ['generator', 'fixtures'] }
  ], 'vh-home-tool-card-compact');
  const featuredCountriesHtml = renderHomeCountryCards(countryRoutes);
  const worldMapHtml = await renderHomeWorldMap(countryRoutes, metrics);

  const headHtml = `
    <title>ValidoHub | Browser-only developer workbenches for global formats</title>
    <meta name="description" content="Validate, inspect, generate, and debug country-aware identifiers, payments, banking formats, locale data, and developer fixtures in your browser.">
    <link rel="canonical" href="https://validohub.com/en/">
    <link rel="alternate" hreflang="en" href="https://validohub.com/en/">
    <link rel="stylesheet" href="${assetsManifest.css}">
  `;

  const heroHtml = `
    <section class="vh-home-hero" aria-labelledby="home-title">
      <div class="vh-home-hero-copy">
        <span class="vh-eyebrow">Browser-only developer intelligence</span>
        <h1 id="home-title">Validate, generate, and debug real-world data.</h1>
        <p>Global utilities and country-aware workbenches for identifiers, payments, banking formats, local fixtures, and parser diagnostics. Private by default, precise before production.</p>
        <div class="vh-home-search-panel" data-home-search>
          <label class="vh-home-search-label" for="home-command-search">Command</label>
          <div class="vh-home-search-row">
            <input id="home-command-search" type="search" placeholder="Search JSON, JWT, IBAN generator, PESEL, PIX, SIRET, VAT..." autocomplete="off" data-home-search-input>
            <a class="vh-home-search-action" href="/en/countries/">Browse countries</a>
          </div>
          <div class="vh-home-search-dropdown" data-home-search-results role="listbox" aria-label="Search results"></div>
          <div class="vh-home-search-chips" aria-label="Suggested searches">
            <button type="button" data-home-query="json">JSON</button>
            <button type="button" data-home-query="jwt">JWT</button>
            <button type="button" data-home-query="iban">IBAN</button>
            <button type="button" data-home-query="generator">Generators</button>
            <button type="button" data-home-query="tax id">Tax ID</button>
            <button type="button" data-home-query="payment">Payments</button>
            <button type="button" data-home-query="debug">Debug</button>
          </div>
          <p class="vh-home-search-status" data-home-search-status>${metrics.totalWorkbenches} workbenches indexed.</p>
        </div>
        <div class="vh-home-metric-strip" aria-label="ValidoHub coverage snapshot">
          <div><strong>${metrics.totalCountries}</strong><span>premium hubs</span></div>
          <div><strong>${metrics.totalWorkbenches}</strong><span>workbenches</span></div>
          <div><strong>${metrics.totalIdentifiers}</strong><span>identifier families</span></div>
          <div><strong>7</strong><span>core locales</span></div>
        </div>
      </div>
      <aside class="vh-home-command-card" aria-label="Launch lanes">
        <a href="#home-global-tools" class="vh-home-lane" data-search="global tools json jwt base64 url regex uuid iban developer">
          <span>Global</span>
          <strong>JSON, JWT, Base64, URL, Regex</strong>
          <em>Universal browser utilities</em>
        </a>
        <a href="/en/countries/" class="vh-home-lane" data-search="country tools countries local identifiers payments banking tax local formats local rules">
          <span>Countries</span>
          <strong>${metrics.totalCountries} hubs, ${metrics.totalWorkbenches} workbenches</strong>
          <em>Local formats and rules</em>
        </a>
        <a href="#home-generators" class="vh-home-lane" data-search="generators iban generator iban uuid fixtures test data payment qr">
          <span>Generators</span>
          <strong>IBAN, UUID, test fixtures, payments</strong>
          <em>Fresh values for QA</em>
        </a>
        <a href="#home-contract" class="vh-home-lane" data-search="debug field breakdown validation replay quality official boundary">
          <span>Debug Contract</span>
          <strong>Field breakdown, replay, raw output</strong>
          <em>Evidence before trust</em>
        </a>
        <div class="vh-home-signal-board" aria-label="Example signals">
          <span>Try signals</span>
          <button type="button" data-home-query="json">{ JSON }</button>
          <button type="button" data-home-query="iban generator">IBAN generator</button>
          <button type="button" data-home-query="pesel">PESEL</button>
          <button type="button" data-home-query="pix">PIX</button>
        </div>
      </aside>
    </section>
  `;

  const contentHtml = `
    <div class="vh-home-portal-page">
      <section class="vh-home-section vh-home-search-results" id="home-global-tools" aria-labelledby="home-global-tools-title">
        <div class="vh-home-section-head">
          <span class="vh-eyebrow">Global Tools</span>
          <h2 id="home-global-tools-title">Fast utilities that are not tied to one country.</h2>
          <p>Open the universal workbenches for payloads, encoding, tokens, identifiers, regexes, and cross-country IBAN workflows.</p>
        </div>
        <div class="vh-home-tool-grid">
          ${globalToolsHtml}
        </div>
      </section>

      <section class="vh-home-section vh-home-search-results" aria-labelledby="home-featured-tools">
        <div class="vh-home-section-head">
          <span class="vh-eyebrow">Local Instruments</span>
          <h2 id="home-featured-tools">Premium country tools with real debugging depth.</h2>
          <p>Identity, registry, tax, payment, and banking workbenches with local samples, validation replay, field breakdown, and official-boundary notes.</p>
        </div>
        <div class="vh-home-tool-grid">
          ${countryToolsHtml}
        </div>
      </section>

      <section class="vh-home-section vh-home-generators" id="home-generators" aria-labelledby="home-generators-title">
        <div class="vh-home-section-head">
          <span class="vh-eyebrow">Generators</span>
          <h2 id="home-generators-title">Generate fixtures when validation is not enough.</h2>
          <p>Use fresh browser-only values for tests, demos, forms, and QA flows. Generation belongs next to validation so users can both inspect and create.</p>
        </div>
        <div class="vh-home-tool-grid vh-home-tool-grid-compact">
          ${generatorToolsHtml}
        </div>
      </section>

      ${worldMapHtml}

      <section class="vh-home-section vh-home-map-band" aria-labelledby="home-countries">
        <div class="vh-home-section-head">
          <span class="vh-eyebrow">Country Intelligence</span>
          <h2 id="home-countries">Browse premium country hubs.</h2>
          <p>Each full-premium country is generated from the same strict contract: useful local tools, readable visual identity, field-level debugging, and no fake official lookup promises.</p>
        </div>
        <div class="vh-home-country-strip">
          ${featuredCountriesHtml}
        </div>
        <a class="vh-home-wide-link" href="/en/countries/">Open all ${metrics.totalCountries} country hubs</a>
      </section>

      <section class="vh-home-section vh-home-contract" aria-labelledby="home-contract">
        <div class="vh-home-section-head">
          <span class="vh-eyebrow">Premium Contract</span>
          <h2 id="home-contract">Every serious tool needs more than a green check.</h2>
        </div>
        <div class="vh-home-contract-grid">
          <div><strong>Explain the fields</strong><span>Named slices, local meaning, checksums, masks, and copy-safe values.</span></div>
          <div><strong>Show the pipeline</strong><span>Pass/review states must match the sample, with green success and clear invalid paths.</span></div>
          <div><strong>Generate fixtures</strong><span>When the domain supports generation, give users fresh browser-only test data.</span></div>
          <div><strong>Name the boundary</strong><span>Offline structure is not official registry status; the page says exactly where that line is.</span></div>
        </div>
      </section>
    </div>
  `;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ValidoHub',
    url: 'https://validohub.com/en/',
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://validohub.com/en/countries/?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
  const jsonLdScript = `<script type="application/ld+json">${escapeHtmlJson(JSON.stringify(jsonLd))}</script>`;

  const assembledHtml = layoutTemplate
    .replaceAll('{{ HEAD }}', () => headHtml)
    .replaceAll('{{ HEADER }}', () => renderHeader('home'))
    .replaceAll('{{ BREADCRUMBS }}', () => '')
    .replaceAll('{{ HERO }}', () => heroHtml)
    .replaceAll('{{ CONTENT }}', () => contentHtml)
    .replaceAll('{{ FOOTER }}', () => renderFooter())
    .replaceAll('{{ JSON_LD }}', () => jsonLdScript)
    .replaceAll('{{ SCRIPTS }}', () => `<script src="/assets/js/portal-home.js"></script>\n<script src="${assetsManifest.js}" defer></script>`);

  if (assembledHtml.includes('{{')) {
    throw new Error('FATAL: Unresolved template slot marker found in generated home portal page');
  }

  const outputPath = resolve(siteRoot, locale, 'index.html');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, assembledHtml, 'utf8');
  console.log('✓ Generated: /en/');
}

function cleanToolTitle(route) {
  return String(route.title || 'Developer Tool')
    .replace(/\s*\|\s*ValidoHub\s*$/i, '')
    .replace(/\s*-\s*ValidoHub\s*$/i, '')
    .trim();
}

function classifyToolRoute(route) {
  const title = cleanToolTitle(route);
  const slug = route.path.split('/').filter(Boolean).pop() || '';
  const haystack = `${title} ${slug}`.toLowerCase();
  if (/kubernetes|dockerfile|github-actions|terraform|nginx|apache|webserver/.test(haystack)) return 'DevOps & Cloud QA';
  if (/prompt|rag|vector|fine-tune|finetune|eval|dataset/.test(haystack)) return 'AI & Data Ops';
  if (/jwt|jwk|oauth|secret|pii|cookie|tls|dns|spf|dmarc|sri|webhook|signature|headers|csp|cors|rate-limit/.test(haystack)) return 'Security & Trust';
  if (/iban|swift|bic|vat|iso20022|sepa|mrz|phone|postal/.test(haystack)) return 'Regulated Formats';
  if (/accessibility|design-token|color-contrast|stack-trace|browser-storage|user-agent|seo|html-meta/.test(haystack)) return 'Frontend & Product QA';
  if (/json|openapi|swagger|graphql|yaml|toml|xml|xpath|csv|sql|regex|avro|protobuf|ndjson|jsonpath|jmespath|rest-error|idempotency|websocket|sse|diff|patch/.test(haystack)) return 'Data & API Contracts';
  if (/base64|url|html|markdown|mdx|case|slug|uuid|date|timezone|cron|locale|hash|md5|sha/.test(haystack)) return 'Text, Time & Utilities';
  return 'Text, Time & Utilities';
}

function categoryMetaFor(category) {
  const meta = {
    'Data & API Contracts': {
      kicker: 'Contracts',
      summary: 'Schema, payload, query, log, and protocol inspectors for integration review.',
      query: 'json openapi graphql csv sql xml'
    },
    'Security & Trust': {
      kicker: 'Security',
      summary: 'Headers, tokens, secrets, signatures, DNS, cookies, and policy surfaces.',
      query: 'security jwt headers secret webhook'
    },
    'Regulated Formats': {
      kicker: 'Formats',
      summary: 'Banking, tax, identity, phone, postal, and payment formats with explicit live-system boundaries.',
      query: 'iban vat swift phone postal'
    },
    'DevOps & Cloud QA': {
      kicker: 'Ops',
      summary: 'Static review labs for infrastructure, CI, webserver, and deployment artifacts.',
      query: 'docker kubernetes terraform github'
    },
    'Frontend & Product QA': {
      kicker: 'Frontend',
      summary: 'Accessibility, metadata, storage, design-token, user-agent, and stack-trace QA.',
      query: 'accessibility design seo stack'
    },
    'AI & Data Ops': {
      kicker: 'AI Data',
      summary: 'RAG, prompt safety, eval, fine-tune, and vector metadata preparation checks.',
      query: 'rag prompt eval vector'
    },
    'Text, Time & Utilities': {
      kicker: 'Utilities',
      summary: 'Encoding, hashes, URLs, dates, slugs, case conversion, UUIDs, cron, and markdown helpers.',
      query: 'url base64 uuid date hash'
    }
  };
  return meta[category] || { kicker: 'Tools', summary: 'Browser-only developer workbenches.', query: category };
}

function toolSummaryFor(route) {
  const title = cleanToolTitle(route);
  const slug = route.path.split('/').filter(Boolean).pop() || '';
  const haystack = `${title} ${slug}`.toLowerCase();
  if (haystack.includes('phone')) return 'Normalize, generate, and inspect E.164 phone fixtures with country-prefix evidence.';
  if (haystack.includes('postal')) return 'Validate or generate postal-code samples while keeping deliverability lookup boundaries explicit.';
  if (haystack.includes('swift') || haystack.includes('bic')) return 'Inspect SWIFT/BIC structure, country evidence, branch shape, and directory lookup boundaries.';
  if (haystack.includes('mrz')) return 'Parse passport MRZ lines, replay structural checks, and generate safe travel-document fixtures.';
  if (haystack.includes('csv')) return 'Normalize locale-sensitive CSV payloads and expose row, delimiter, and decimal evidence.';
  if (haystack.includes('vat')) return 'Check EU VAT prefix and local syntax while clearly separating VIES status from offline evidence.';
  if (haystack.includes('iso20022') || haystack.includes('sepa')) return 'Inspect ISO 20022 / SEPA XML structure before bank handoff or QA review.';
  if (haystack.includes('secret') || haystack.includes('pii')) return 'Detect and redact common secrets, emails, IBANs, and log-sensitive payload fragments.';
  if (haystack.includes('locale-test')) return 'Generate localized JSON or CSV fixtures for country-aware QA and form testing.';
  if (haystack.includes('webhook')) return 'Generate or verify webhook signature fixtures and compare payload, secret, and header evidence.';
  if (haystack.includes('iban-generator')) return 'Generate structural IBAN fixtures with MOD-97 check digits and copy-ready grouping.';
  if (haystack.includes('iban')) return 'Validate IBAN structure, country profile, length, and MOD-97 evidence in the browser.';
  if (haystack.includes('json')) return 'Format, repair, inspect schema hints, flatten paths, and scan sensitive payload keys.';
  if (haystack.includes('jwt')) return 'Decode JWT headers and claims locally, inspect registered claims, and highlight security boundaries.';
  if (haystack.includes('base64')) return 'Encode or decode Base64, detect data URIs, byte signatures, and URL-safe variants.';
  if (haystack.includes('url')) return 'Encode, decode, parse query parameters, and inspect redirect or credential risk hints.';
  if (haystack.includes('regex')) return 'Test regex patterns, named groups, replacement previews, and match diagnostics.';
  if (haystack.includes('uuid')) return 'Generate and validate UUID fixtures with version, variant, and batch support.';
  return 'Open a browser-only developer workbench with premium debug evidence and copy-ready output.';
}

function toolMarkFor(route) {
  const title = cleanToolTitle(route);
  const slug = route.path.split('/').filter(Boolean).pop() || '';
  const haystack = `${title} ${slug}`.toLowerCase();
  if (haystack.includes('json')) return '{}';
  if (haystack.includes('jwt')) return 'JWT';
  if (haystack.includes('iban')) return 'IBAN';
  if (haystack.includes('phone')) return 'TEL';
  if (haystack.includes('postal')) return 'POST';
  if (haystack.includes('swift') || haystack.includes('bic')) return 'BIC';
  if (haystack.includes('mrz')) return 'MRZ';
  if (haystack.includes('csv')) return 'CSV';
  if (haystack.includes('vat')) return 'VAT';
  if (haystack.includes('iso20022') || haystack.includes('sepa')) return 'XML';
  if (haystack.includes('secret') || haystack.includes('pii')) return 'PII';
  if (haystack.includes('webhook')) return 'SIG';
  if (haystack.includes('uuid')) return 'ID';
  if (haystack.includes('regex')) return '.*';
  if (haystack.includes('url')) return 'URL';
  return 'VH';
}

function renderToolsPortalCards(toolRoutes) {
  return toolRoutes.map(route => {
    const title = cleanToolTitle(route);
    const category = classifyToolRoute(route);
    const summary = toolSummaryFor(route);
    const mark = toolMarkFor(route);
    const search = [title, category, summary, route.path].join(' ').toLowerCase();
    return `
      <a class="vh-tool-card" href="${route.path}" data-tool-card data-category="${escapeHtml(category)}" data-search="${escapeHtml(search)}">
        <span class="vh-tool-card-mark">${escapeHtml(mark)}</span>
        <span class="vh-tool-card-copy">
          <span class="vh-tool-card-category">${escapeHtml(category)}</span>
          <strong>${escapeHtml(title)}</strong>
          <span>${escapeHtml(summary)}</span>
        </span>
        <em aria-hidden="true">Open</em>
      </a>
    `;
  }).join('\n');
}

function renderToolsCategorySections(toolRoutes, categoryOrder) {
  return categoryOrder.map((category) => {
    const routes = toolRoutes.filter(route => classifyToolRoute(route) === category);
    if (!routes.length) return '';
    const meta = categoryMetaFor(category);
    return `
      <section class="vh-tools-family" data-tools-group>
        <div class="vh-tools-family-head">
          <div>
            <span class="vh-tools-family-kicker">${escapeHtml(meta.kicker)}</span>
            <h3>${escapeHtml(category)}</h3>
            <p>${escapeHtml(meta.summary)}</p>
          </div>
          <button type="button" data-tools-query="${escapeHtml(meta.query)}">${routes.length} tools</button>
        </div>
        <div class="vh-tools-grid">
          ${renderToolsPortalCards(routes)}
        </div>
      </section>
    `;
  }).join('\n');
}

export async function compileToolsPortal(routeRegistry, assetsManifest) {
  console.log('--- Pass 2b: Rendering Global Tools Portal ---');
  if (!routeRegistry.has('/en/tools/')) {
    routeRegistry.register('/en/tools/', {
      type: 'tools',
      title: 'Global Tools | ValidoHub',
      sourceOwner: 'node'
    });
  }

  const layoutTemplate = await readFile(resolve(projectRoot, 'templates', 'layout.html'), 'utf8');
  const toolRoutes = routeRegistry.getAll()
    .filter(route => route.path.startsWith('/en/tools/') && route.path !== '/en/tools/')
    .sort((a, b) => cleanToolTitle(a).localeCompare(cleanToolTitle(b)));
  const categoryOrder = [
    'Data & API Contracts',
    'Security & Trust',
    'Regulated Formats',
    'DevOps & Cloud QA',
    'Frontend & Product QA',
    'AI & Data Ops',
    'Text, Time & Utilities'
  ].filter(category => toolRoutes.some(route => classifyToolRoute(route) === category));
  const categories = categoryOrder;
  const categorySectionsHtml = renderToolsCategorySections(toolRoutes, categoryOrder);
  const featured = [
    '/en/tools/json-schema-workbench/',
    '/en/tools/openapi-inspector/',
    '/en/tools/webhook-signature-verifier/',
    '/en/tools/http-security-headers-inspector/',
    '/en/tools/iban-generator/',
    '/en/tools/secret-pii-redactor/'
  ].map(path => routeRegistry.get(path)).filter(Boolean);
  const featuredHtml = featured.map(route => `
    <a class="vh-tools-feature" href="${route.path}">
      <span>${escapeHtml(classifyToolRoute(route))}</span>
      <strong>${escapeHtml(cleanToolTitle(route))}</strong>
    </a>
  `).join('\n');

  const headHtml = `
    <title>Global Developer Tools | ValidoHub</title>
    <meta name="description" content="Browse ValidoHub global browser-only validators, generators, parsers, security helpers, locale fixtures, and payload debuggers.">
    <link rel="canonical" href="https://validohub.com/en/tools/">
    <link rel="alternate" hreflang="en" href="https://validohub.com/en/tools/">
    <link rel="stylesheet" href="${assetsManifest.css}">
  `;

  const breadcrumbsHtml = `
    <nav class="vh-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><a href="/en/">Home</a></li>
        <li><span aria-current="page">Tools</span></li>
      </ol>
    </nav>
  `;

  const heroHtml = `
    <section class="vh-tools-hero" aria-labelledby="tools-title">
      <div class="vh-tools-hero-copy">
        <span class="vh-eyebrow">Global Tools</span>
        <h1 id="tools-title">Browser labs for developer data.</h1>
        <p>Compact registry of validators, generators, parsers, security checks, and fixture labs. Private by default, useful before production handoff.</p>
      </div>
      <aside class="vh-tools-hero-panel" aria-label="Global tool coverage">
        <div><strong>${toolRoutes.length}</strong><span>global tools</span></div>
        <div><strong>${categories.length}</strong><span>families</span></div>
        <div><strong>0</strong><span>uploads required</span></div>
      </aside>
    </section>
  `;

  const contentHtml = `
    <div class="vh-tools-portal" data-tools-search>
      <section class="vh-tools-command">
        <div>
          <span class="vh-eyebrow">Command</span>
          <h2>Find the workbench.</h2>
        </div>
        <label class="vh-tools-search">
          <span class="vh-sr-only">Search global tools</span>
          <input type="search" placeholder="Search JSON, OpenAPI, JWT, IBAN, CSP, SQL, RAG..." autocomplete="off" data-tools-search-input>
        </label>
        <div class="vh-tools-chips" aria-label="Suggested tool searches">
          <button type="button" data-tools-query="json openapi graphql">API contracts</button>
          <button type="button" data-tools-query="security jwt headers secret">Security</button>
          <button type="button" data-tools-query="iban vat swift phone">Formats</button>
          <button type="button" data-tools-query="docker kubernetes terraform">Ops</button>
          <button type="button" data-tools-query="rag prompt eval vector">AI data</button>
          <button type="button" data-tools-query="">Clear</button>
        </div>
      </section>

      <section class="vh-tools-featured">
        <div class="vh-tools-section-head">
          <span class="vh-eyebrow">Priority</span>
          <h2>High-signal starting points.</h2>
        </div>
        <div class="vh-tools-feature-grid">
          ${featuredHtml}
        </div>
      </section>

      <section class="vh-tools-section">
        <div class="vh-tools-section-head">
          <span class="vh-eyebrow">Registry</span>
          <h2><span data-tools-count>${toolRoutes.length}</span> workbenches.</h2>
          <p>Grouped by integration job, not by random utility labels.</p>
        </div>
        ${categorySectionsHtml}
        <p class="vh-tools-empty" data-tools-empty hidden>No global tools match this search.</p>
      </section>
    </div>
  `;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Global Developer Tools | ValidoHub',
    description: 'Browse ValidoHub global browser-only validators, generators, parsers, security helpers, locale fixtures, and payload debuggers.',
    url: 'https://validohub.com/en/tools/',
    inLanguage: 'en'
  };
  const jsonLdScript = `<script type="application/ld+json">${escapeHtmlJson(JSON.stringify(jsonLd))}</script>`;

  const assembledHtml = layoutTemplate
    .replaceAll('{{ HEAD }}', () => headHtml)
    .replaceAll('{{ HEADER }}', () => renderHeader('tools'))
    .replaceAll('{{ BREADCRUMBS }}', () => breadcrumbsHtml)
    .replaceAll('{{ HERO }}', () => heroHtml)
    .replaceAll('{{ CONTENT }}', () => contentHtml)
    .replaceAll('{{ FOOTER }}', () => renderFooter())
    .replaceAll('{{ JSON_LD }}', () => jsonLdScript)
    .replaceAll('{{ SCRIPTS }}', () => `<script src="/assets/js/portal-tools.js"></script>\n<script src="${assetsManifest.js}" defer></script>`);

  if (assembledHtml.includes('{{')) {
    throw new Error('FATAL: Unresolved template slot marker found in generated tools portal page');
  }

  const outputPath = resolve(siteRoot, locale, 'tools', 'index.html');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, assembledHtml, 'utf8');
  console.log('✓ Generated: /en/tools/');
}

export async function compileCountriesPortal(routeRegistry, assetsManifest, options = {}) {
  console.log('--- Pass 2: Rendering Country Pages & Portal ---');

  const layoutTemplate = await readFile(resolve(projectRoot, 'templates', 'layout.html'), 'utf8');
  const countryTemplate = await readFile(resolve(projectRoot, 'templates', 'country.html'), 'utf8');
  const countryRoutes = routeRegistry.getAll().filter(r => r.type === 'country');
  countryRoutes.sort((a, b) => a.path.localeCompare(b.path));
  const discoveryData = JSON.parse(await readFile(resolve(projectRoot, 'knowledge', 'compiled-discovery.json'), 'utf8'));

  if (options.renderCountryPages !== false) {
    for (const route of countryRoutes) {
      await renderCountryPage(route, routeRegistry, assetsManifest, { layoutTemplate, countryTemplate, discoveryData });
      console.log(`✓ Generated: /en/${route.metadata.id}/`);
    }
  }

  // 2. Compile Countries Portal Page
  const {
    totalCountries,
    totalWorkbenches,
    totalIdentifiers,
    totalPayments,
    totalAvailableGuides
  } = collectCountryPortalMetrics(countryRoutes);
  const worldMapHtml = await renderCountriesWorldMap(countryRoutes);

  const continents = ['South America', 'Europe', 'North America', 'Asia', 'Africa', 'Oceania'];
  const continentGridsHtml = continents.map(continent => {
    const groupCountries = countryRoutes.filter(r => r.metadata.catalog.continent === continent);
    if (groupCountries.length === 0) return '';

    const cardsHtml = groupCountries.map(r => {
      const d = r.metadata;
      const progress = Number(d.catalog.completion) || 0;
      const status = d.catalog.status || 'planned';
      const statusLabel = status === 'available' ? 'Live' : (status === 'inProgress' ? 'Building' : 'Roadmap');
      const currencyLabel = d.catalog.currencyCode && d.catalog.currencyCode !== d.catalog.currency
        ? `${d.catalog.currency} (${d.catalog.currencyCode})`
        : d.catalog.currency;
      
      const badgeClass = status === 'available'
        ? 'vh-country-status-ready'
        : (status === 'inProgress' ? 'vh-country-status-in-progress' : 'vh-country-status-badge vh-custom-badge');

      const identifiersChips = (d.catalog.identifiers || []).slice(0, 3).map(id => `
        <span class="vh-countries-chip vh-countries-chip-identifier">${escapeHtml(id)}</span>
      `).join('');

      const paymentsChips = (d.catalog.payments || []).slice(0, 3).map(p => `
        <span class="vh-countries-chip vh-countries-chip-payment">${escapeHtml(p)}</span>
      `).join('');

      return `
        <a class="vh-countries-card status-${status}" 
           href="${r.path}" 
           data-country-id="${d.id}"
           data-accent="${d.id}"
           data-flag="${escapeHtml(d.catalog.flag)}"
           data-name="${escapeHtml(d.catalog.name)}"
           data-summary="${escapeHtml(d.catalog.summary)}"
           data-iso="${escapeHtml(d.catalog.iso2)} / ${escapeHtml(d.catalog.iso3)}"
           data-lang="${escapeHtml(d.catalog.language)}"
           data-currency="${escapeHtml(currencyLabel)}"
           data-continent="${escapeHtml(d.catalog.continent)}"
           data-region="${escapeHtml(d.catalog.region)}"
           data-status="${status}"
           data-features="${(d.catalog.features || []).join(' ')}"
           data-search="${escapeHtml(`${d.catalog.name} ${d.catalog.iso2} ${d.catalog.iso3} ${d.catalog.currency} ${d.catalog.language}`).toLowerCase()}"
           aria-label="Open ${escapeHtml(d.catalog.name)} Hub">
          <div class="vh-countries-card-top">
            <div class="vh-countries-card-identity">
              <span class="vh-flag">${escapeHtml(d.catalog.flag)}</span>
              <h3>${escapeHtml(d.catalog.name)}</h3>
            </div>
            <span class="${badgeClass}">${escapeHtml(statusLabel)}</span>
          </div>
          <p class="vh-countries-card-summary">${escapeHtml(d.catalog.summary)}</p>
          <div class="vh-countries-card-facts">
            <div><span>ISO</span><strong>${escapeHtml(d.catalog.iso2)}</strong></div>
            <div><span>Currency</span><strong>${escapeHtml(d.catalog.currency)}</strong></div>
            <div><span>Region</span><strong>${escapeHtml(d.catalog.region)}</strong></div>
          </div>
          <div class="vh-countries-card-progress">
            <span>Coverage</span>
            <strong>${progress}%</strong>
          </div>
          <progress class="vh-progress-bar" max="100" value="${progress}"></progress>
          <div class="vh-countries-chip-row">
            ${identifiersChips}
            ${paymentsChips}
          </div>
        </a>
      `;
    }).join('\n');

    return `
      <section class="vh-countries-continent-group" data-continent="${escapeHtml(continent)}">
        <div class="vh-countries-continent-heading">
          <h3>${escapeHtml(continent)}</h3>
          <span class="vh-country-status-badge vh-custom-badge">${groupCountries.length} countries</span>
        </div>
        <div class="vh-countries-grid">
          ${cardsHtml}
        </div>
      </section>
    `;
  }).join('\n');

  const previewPanelHtml = `
    <aside class="vh-countries-preview-panel is-empty" data-preview-panel="true">
      <span class="vh-eyebrow">Country Preview</span>
      <div class="vh-countries-preview-flag is-empty" data-preview-flag="true" aria-hidden="true"></div>
      <h2 data-preview-name="true">Choose a country</h2>
      <p data-preview-summary="true">Hover or focus any country card or map shape to inspect local developer coverage. No country is selected by default.</p>
      <div class="vh-countries-preview-list">
        <div><dt>ISO Codes</dt><dd data-preview-iso="true">No selection</dd></div>
        <div><dt>Language</dt><dd data-preview-lang="true">No selection</dd></div>
        <div><dt>Currency</dt><dd data-preview-currency="true">No selection</dd></div>
        <div><dt>Region</dt><dd data-preview-region="true">No selection</dd></div>
      </div>
      <div class="vh-countries-preview-progress">
        <span>Completion</span>
        <strong data-preview-percent="true">0%</strong>
      </div>
      <progress class="vh-progress-bar" max="100" value="0" data-preview-progress="true"></progress>
      <a class="vh-countries-preview-action is-muted" href="#" data-preview-link="true" tabindex="-1" aria-disabled="true">Choose a country</a>
    </aside>
  `;

  const portalContentHtml = `
    <div class="vh-countries-portal-page">
      <!-- Search & Filters Controls Section -->
      <section class="vh-countries-controls">
        <label class="vh-countries-search">
          <span class="vh-sr-only">Search countries</span>
          <input class="vh-countries-search-input" type="search" placeholder="Search name, ISO, currency, language, identifier, payment system..." autocomplete="off">
        </label>
        <div class="vh-countries-filter-grid">
          <label class="vh-countries-select-filter">
            <span>Filter Region</span>
            <select data-filter="region">
              <option value="all">All Regions</option>
              <option value="South America">South America</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="Asia">Asia</option>
              <option value="Africa">Africa</option>
              <option value="Oceania">Oceania</option>
            </select>
          </label>
          <label class="vh-countries-select-filter">
            <span>Filter Status</span>
            <select data-filter="status">
              <option value="all">All Statuses</option>
              <option value="available">Available</option>
              <option value="inProgress">In Progress</option>
              <option value="planned">Planned</option>
            </select>
          </label>
          <fieldset class="vh-countries-feature-filter">
            <legend>Developer Features</legend>
            <div class="vh-countries-feature-chips">
              <label class="vh-countries-feature-chip"><input type="checkbox" value="payments"><span>Payments</span></label>
              <label class="vh-countries-feature-chip"><input type="checkbox" value="identity"><span>Identity</span></label>
              <label class="vh-countries-feature-chip"><input type="checkbox" value="government"><span>Government</span></label>
              <label class="vh-countries-feature-chip"><input type="checkbox" value="banking"><span>Banking</span></label>
            </div>
          </fieldset>
        </div>
      </section>

      <!-- Map Explorer Section -->
      <section class="vh-countries-map-section vh-card">
        <div class="section-heading">
          <span class="vh-eyebrow">World Map</span>
          <h2>Explore country coverage</h2>
          <p>Hover a country to see its premium shape preview. Click a country shape to open the developer hub.</p>
        </div>
        ${worldMapHtml}
      </section>

      <!-- Country Directory Layout (Grids + Preview Sidebar) -->
      <div class="vh-countries-portal-layout">
        <div class="vh-countries-directory">
          ${continentGridsHtml}
          <p class="vh-countries-empty-state is-filtered-out">No countries match the current search or filters.</p>
        </div>
        ${previewPanelHtml}
      </div>
    </div>
  `;

  const portalBreadcrumbsHtml = `
    <nav class="vh-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><a href="/en/">Home</a></li>
        <li><span aria-current="page">Countries</span></li>
      </ol>
    </nav>
  `;

  const portalHeroHtml = `
    <header class="vh-page-intro vh-countries-intro">
      <span class="vh-eyebrow">Global Registry</span>
      <h1>Country Hubs</h1>
      <p>Explore local developer specifications, tax structures, payment protocols, and regional validators.</p>
      
      <div class="vh-countries-hero-stats">
        <div class="vh-countries-hero-stat-item">
          <strong>${totalCountries}</strong>
          <span>Countries</span>
        </div>
        <div class="vh-countries-hero-stat-item">
          <strong>${totalWorkbenches}</strong>
          <span>Workbenches</span>
        </div>
        <div class="vh-countries-hero-stat-item">
          <strong>${totalIdentifiers}</strong>
          <span>Identifiers</span>
        </div>
        <div class="vh-countries-hero-stat-item">
          <strong>${totalPayments}</strong>
          <span>Payments</span>
        </div>
        <div class="vh-countries-hero-stat-item">
          <strong>${totalAvailableGuides}</strong>
          <span>Guides</span>
        </div>
        <div class="vh-countries-hero-stat-item">
          <strong>6</strong>
          <span>Brands</span>
        </div>
      </div>
    </header>
  `;

  const portalHeadHtml = `
    <title>Countries | ValidoHub</title>
    <meta name="description" content="Explore ValidoHub country hubs, local identifiers, payment systems, banking notes, and country-specific developer tool roadmaps.">
    <link rel="canonical" href="https://validohub.com/en/countries/">
    <link rel="alternate" hreflang="en" href="https://validohub.com/en/countries/">
    <link rel="stylesheet" href="${assetsManifest.css}">
  `;

  // Generate JSON-LD payload (CollectionPage) for the portal
  const jsonLdPortal = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Countries | ValidoHub",
    "description": "Explore ValidoHub country hubs, local identifiers, payment systems, banking notes, and country-specific developer tool roadmaps.",
    "url": "https://validohub.com/en/countries/",
    "inLanguage": "en"
  };
  const jsonLdPortalScript = `<script type="application/ld+json">${escapeHtmlJson(JSON.stringify(jsonLdPortal))}</script>`;

  let assembledPortalHtml = layoutTemplate
    .replaceAll('{{ HEAD }}', () => portalHeadHtml)
    .replaceAll('{{ HEADER }}', () => renderHeader('countries'))
    .replaceAll('{{ BREADCRUMBS }}', () => portalBreadcrumbsHtml)
    .replaceAll('{{ HERO }}', () => portalHeroHtml)
    .replaceAll('{{ CONTENT }}', () => portalContentHtml)
    .replaceAll('{{ FOOTER }}', () => renderFooter())
    .replaceAll('{{ JSON_LD }}', () => jsonLdPortalScript)
    .replaceAll('{{ SCRIPTS }}', () => `<script src="/assets/js/countries-portal.js"></script>\n<script src="${assetsManifest.js}" defer></script>`);

  if (assembledPortalHtml.includes('{{')) {
    throw new Error('FATAL: Unresolved template slot marker found in generated countries portal page');
  }

  const portalOutputPath = resolve(siteRoot, locale, 'countries', 'index.html');
  await mkdir(dirname(portalOutputPath), { recursive: true });
  await writeFile(portalOutputPath, assembledPortalHtml, 'utf8');
  console.log(`✓ Generated: /en/countries/`);
}
