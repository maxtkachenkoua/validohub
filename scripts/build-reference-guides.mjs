import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRouteRegistry } from './route-registry.mjs';
import { applyFinalLocalizationPass } from './localization-pass.mjs';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');
const locale = 'en';
const CORE_PRODUCTION_LOCALES = ['en', 'es', 'pt-BR', 'de', 'fr', 'pl', 'uk'];

const GUIDE_GROUPS = {
  global: 'Global formats and APIs',
  identity: 'Identity and tax identifiers',
  banking: 'Banking and payment fixtures'
};

const CHECK_LABELS = {
  syntax: 'Format and character rules',
  checksum: 'Checksum/control replay',
  anatomy: 'Field anatomy and parser evidence',
  generation: 'Safe fixture generation',
  masking: 'Masked and normalized outputs',
  batch: 'Batch and import debugging',
  tree: 'Structured tree or token view',
  security: 'Security and implementation hints',
  boundary: 'Official-system boundary',
  mod97: 'ISO 13616 MOD-97 replay',
  qr: 'Payload and handoff structure'
};

const BOUNDARY_LABELS = {
  official: 'Official existence or legal status still belongs to the authority or source system.',
  ownership: 'Account, company, person, or ownership status is not proven by browser-only checks.',
  network: 'No live network, registry, bank, payment, or tax-office lookup is performed.',
  privacy: 'Inputs stay browser-local; treat copied output as developer test data.',
  compliance: 'Compliance, filing, settlement, identity proof, and production acceptance need the responsible system.'
};

const TRAP_LABELS = {
  displayStorage: 'Keep display strings, compact storage values, masked output, and exported JSON separate.',
  checksumOfficial: 'Do not treat a valid checksum as proof that the value exists in an official registry.',
  negativeFixtures: 'Keep malformed, short, wrong-prefix, and bad-checksum fixtures in CI.',
  locale: 'Persist country, locale, currency, and field-type metadata with exported fixtures.',
  logs: 'Never log raw personal, payment, or secret values when masked output is enough.',
  staleTables: 'Version local rules and registry tables so adapters do not silently drift.',
  api: 'Use stable machine fields and error codes; do not parse translated UI strings downstream.',
  generation: 'Generated values are structural fixtures, not real accounts, people, companies, or payments.'
};

const GLOBAL_GUIDES = [
  ['json-formatting', 'JSON formatting', '/en/tools/json-formatter/', 'JSON Formatter', 'Data contracts', ['syntax', 'tree', 'batch'], ['privacy', 'network'], ['displayStorage', 'api', 'negativeFixtures']],
  ['json-schema', 'JSON Schema validation', '/en/tools/json-schema-workbench/', 'JSON Schema Workbench', 'Data contracts', ['syntax', 'tree', 'batch'], ['privacy', 'network'], ['api', 'negativeFixtures', 'staleTables']],
  ['jwt', 'JWT decoding', '/en/tools/jwt-decoder/', 'JWT Decoder', 'Tokens', ['syntax', 'tree', 'security'], ['privacy', 'network'], ['logs', 'api', 'negativeFixtures']],
  ['base64', 'Base64 encoding', '/en/tools/base64-encoder/', 'Base64 Encoder', 'Encoding', ['syntax', 'tree', 'batch'], ['privacy', 'network'], ['displayStorage', 'api', 'negativeFixtures']],
  ['url-encoding', 'URL encoding', '/en/tools/url-encoder/', 'URL Encoder', 'Encoding', ['syntax', 'anatomy', 'batch'], ['privacy', 'network'], ['displayStorage', 'api', 'negativeFixtures']],
  ['regex', 'Regex testing', '/en/tools/regex-tester/', 'Regex Tester', 'Developer QA', ['syntax', 'batch', 'security'], ['privacy', 'network'], ['negativeFixtures', 'api', 'logs']],
  ['iban-validation', 'IBAN validation', '/en/tools/iban-validator/', 'IBAN Validator', 'Banking', ['syntax', 'mod97', 'anatomy'], ['ownership', 'network'], ['checksumOfficial', 'displayStorage', 'negativeFixtures']],
  ['iban-generation', 'IBAN generation', '/en/tools/iban-generator/', 'IBAN Generator', 'Banking fixtures', ['generation', 'mod97', 'masking'], ['ownership', 'network'], ['generation', 'displayStorage', 'checksumOfficial']],
  ['uuid', 'UUID generation', '/en/tools/uuid-generator/', 'UUID Generator', 'Fixtures', ['generation', 'syntax', 'batch'], ['privacy', 'network'], ['generation', 'displayStorage', 'api']],
  ['webhook-signatures', 'Webhook signatures', '/en/tools/webhook-signature-verifier/', 'Webhook Signature Verifier', 'Security', ['checksum', 'security', 'batch'], ['privacy', 'network'], ['logs', 'api', 'negativeFixtures']],
  ['http-security-headers', 'HTTP security headers', '/en/tools/http-security-headers-inspector/', 'HTTP Headers & Security Headers Inspector', 'Security', ['syntax', 'security', 'anatomy'], ['network', 'compliance'], ['api', 'staleTables', 'negativeFixtures']],
  ['pii-redaction', 'Secret and PII redaction', '/en/tools/secret-pii-redactor/', 'Secret & PII Scanner Redactor', 'Privacy', ['masking', 'security', 'batch'], ['privacy', 'compliance'], ['logs', 'displayStorage', 'negativeFixtures']],
  ['eu-vat', 'EU VAT number checks', '/en/tools/eu-vat-number-workbench/', 'EU VAT Number Workbench', 'Tax identifiers', ['syntax', 'checksum', 'boundary'], ['official', 'network'], ['checksumOfficial', 'staleTables', 'api']],
  ['swift-bic', 'SWIFT/BIC structure', '/en/tools/swift-bic-workbench/', 'SWIFT / BIC Workbench', 'Banking', ['syntax', 'anatomy', 'masking'], ['ownership', 'network'], ['checksumOfficial', 'displayStorage', 'api']],
  ['mrz-passport', 'MRZ passport parsing', '/en/tools/mrz-passport-workbench/', 'MRZ Passport Workbench', 'Documents', ['syntax', 'checksum', 'anatomy'], ['official', 'privacy'], ['logs', 'checksumOfficial', 'negativeFixtures']]
].map(([slug, title, primaryHref, primaryLabel, topic, checkKeys, boundaryKeys, trapKeys]) => ({
  slug,
  title,
  group: 'global',
  topic,
  primaryHref,
  primaryLabel,
  summary: `${title} guide for browser-only debugging, fixture handling, developer output, and production boundary decisions.`,
  checkKeys,
  boundaryKeys,
  trapKeys
}));

const LOCAL_GUIDES = [
  ['poland-pesel', 'Poland PESEL', '/en/poland/pesel-validator/', 'Open PESEL validator', 'Poland', 'Personal identifiers', ['syntax', 'checksum', 'anatomy', 'generation', 'batch'], ['official', 'privacy'], ['checksumOfficial', 'displayStorage', 'negativeFixtures']],
  ['poland-nip', 'Poland NIP', '/en/poland/poland-nip-validator/', 'Open NIP validator', 'Poland', 'Tax identifiers', ['syntax', 'checksum', 'anatomy', 'batch'], ['official', 'network'], ['checksumOfficial', 'staleTables', 'negativeFixtures']],
  ['poland-regon', 'Poland REGON', '/en/poland/poland-regon-validator/', 'Open REGON validator', 'Poland', 'Business identifiers', ['syntax', 'checksum', 'anatomy', 'batch'], ['official', 'network'], ['checksumOfficial', 'staleTables', 'api']],
  ['poland-iban-nrb', 'Poland IBAN / NRB', '/en/poland/poland-iban-nrb-validator/', 'Open Poland IBAN workbench', 'Poland', 'Banking', ['syntax', 'mod97', 'anatomy', 'masking'], ['ownership', 'network'], ['checksumOfficial', 'displayStorage', 'negativeFixtures']],
  ['brazil-cpf', 'Brazil CPF', '/en/brazil/brazil-cpf-validator/', 'Open CPF validator', 'Brazil', 'Personal identifiers', ['syntax', 'checksum', 'anatomy', 'generation', 'batch'], ['official', 'privacy'], ['checksumOfficial', 'displayStorage', 'logs']],
  ['brazil-cnpj', 'Brazil CNPJ', '/en/brazil/brazil-cnpj-validator/', 'Open CNPJ validator', 'Brazil', 'Business identifiers', ['syntax', 'checksum', 'anatomy', 'generation'], ['official', 'network'], ['checksumOfficial', 'staleTables', 'negativeFixtures']],
  ['brazil-pix', 'Brazil Pix', '/en/brazil/brazil-pix-validator/', 'Open Pix workbench', 'Brazil', 'Payments', ['syntax', 'checksum', 'anatomy', 'generation', 'qr'], ['ownership', 'network'], ['generation', 'logs', 'checksumOfficial']],
  ['mexico-curp', 'Mexico CURP', '/en/mexico/mexico-curp-validator/', 'Open CURP validator', 'Mexico', 'Personal identifiers', ['syntax', 'checksum', 'anatomy', 'generation'], ['official', 'privacy'], ['checksumOfficial', 'displayStorage', 'negativeFixtures']],
  ['mexico-rfc', 'Mexico RFC', '/en/mexico/mexico-rfc-validator/', 'Open RFC validator', 'Mexico', 'Tax identifiers', ['syntax', 'checksum', 'anatomy', 'batch'], ['official', 'network'], ['checksumOfficial', 'staleTables', 'api']],
  ['spain-dni', 'Spain DNI', '/en/spain/spain-id-validator/', 'Open Spain ID workbench', 'Spain', 'Personal identifiers', ['syntax', 'checksum', 'anatomy', 'batch'], ['official', 'privacy'], ['checksumOfficial', 'displayStorage', 'negativeFixtures']],
  ['spain-nie', 'Spain NIE', '/en/spain/spain-id-validator/', 'Open Spain ID workbench', 'Spain', 'Foreign resident identifiers', ['syntax', 'checksum', 'anatomy', 'batch'], ['official', 'privacy'], ['checksumOfficial', 'displayStorage', 'negativeFixtures']],
  ['spain-nif-cif', 'Spain NIF / CIF', '/en/spain/spain-id-validator/', 'Open Spain ID workbench', 'Spain', 'Tax and company identifiers', ['syntax', 'checksum', 'anatomy', 'batch'], ['official', 'network'], ['checksumOfficial', 'staleTables', 'api']],
  ['france-siren', 'France SIREN', '/en/france/france-siren-validator/', 'Open SIREN validator', 'France', 'Business identifiers', ['syntax', 'checksum', 'anatomy', 'batch'], ['official', 'network'], ['checksumOfficial', 'staleTables', 'api']],
  ['france-siret', 'France SIRET', '/en/france/france-siret-validator/', 'Open SIRET validator', 'France', 'Establishment identifiers', ['syntax', 'checksum', 'anatomy', 'batch'], ['official', 'network'], ['checksumOfficial', 'staleTables', 'displayStorage']],
  ['france-tva', 'France TVA', '/en/france/france-vat-tva-validator/', 'Open TVA validator', 'France', 'VAT identifiers', ['syntax', 'checksum', 'anatomy'], ['official', 'network'], ['checksumOfficial', 'staleTables', 'api']],
  ['france-iban', 'France IBAN and RIB', '/en/france/france-iban-generator/', 'Open France IBAN generator', 'France', 'Banking fixtures', ['generation', 'mod97', 'anatomy', 'masking'], ['ownership', 'network'], ['generation', 'displayStorage', 'checksumOfficial']],
  ['germany-tax-id', 'Germany Tax ID / IdNr', '/en/germany/german-tax-id-validator/', 'Open German Tax ID validator', 'Germany', 'Personal tax identifiers', ['syntax', 'checksum', 'anatomy', 'batch'], ['official', 'privacy'], ['checksumOfficial', 'displayStorage', 'negativeFixtures']],
  ['germany-vat', 'Germany USt-IdNr / VAT', '/en/germany/german-vat-ust-idnr-validator/', 'Open German VAT validator', 'Germany', 'VAT identifiers', ['syntax', 'checksum', 'anatomy'], ['official', 'network'], ['checksumOfficial', 'staleTables', 'api']],
  ['netherlands-bsn', 'Netherlands BSN', '/en/netherlands/netherlands-bsn-validator/', 'Open BSN validator', 'Netherlands', 'Personal identifiers', ['syntax', 'checksum', 'anatomy', 'batch'], ['official', 'privacy'], ['checksumOfficial', 'displayStorage', 'logs']],
  ['netherlands-kvk', 'Netherlands KVK', '/en/netherlands/netherlands-kvk-number-validator/', 'Open KVK validator', 'Netherlands', 'Business identifiers', ['syntax', 'checksum', 'anatomy', 'batch'], ['official', 'network'], ['checksumOfficial', 'staleTables', 'api']],
  ['netherlands-btw', 'Netherlands BTW / VAT', '/en/netherlands/netherlands-btw-vat-validator/', 'Open BTW validator', 'Netherlands', 'VAT identifiers', ['syntax', 'checksum', 'anatomy'], ['official', 'network'], ['checksumOfficial', 'staleTables', 'api']],
  ['italy-codice-fiscale', 'Italy Codice Fiscale', '/en/italy/italy-codice-fiscale-validator/', 'Open Codice Fiscale validator', 'Italy', 'Personal identifiers', ['syntax', 'checksum', 'anatomy', 'generation'], ['official', 'privacy'], ['checksumOfficial', 'displayStorage', 'negativeFixtures']],
  ['italy-partita-iva', 'Italy Partita IVA', '/en/italy/italy-partita-iva-validator/', 'Open Partita IVA validator', 'Italy', 'VAT identifiers', ['syntax', 'checksum', 'anatomy'], ['official', 'network'], ['checksumOfficial', 'staleTables', 'api']],
  ['switzerland-uid', 'Switzerland UID', '/en/switzerland/switzerland-uid-validator/', 'Open UID validator', 'Switzerland', 'Business identifiers', ['syntax', 'checksum', 'anatomy'], ['official', 'network'], ['checksumOfficial', 'staleTables', 'api']],
  ['switzerland-ahv', 'Switzerland AHV / AVS', '/en/switzerland/switzerland-ahv-avs-number-validator/', 'Open AHV validator', 'Switzerland', 'Personal identifiers', ['syntax', 'checksum', 'anatomy', 'batch'], ['official', 'privacy'], ['checksumOfficial', 'displayStorage', 'logs']],
  ['ukraine-rnokpp', 'Ukraine RNOKPP', '/en/ukraine/ukraine-rnokpp-validator/', 'Open RNOKPP validator', 'Ukraine', 'Personal tax identifiers', ['syntax', 'checksum', 'anatomy'], ['official', 'privacy'], ['checksumOfficial', 'displayStorage', 'negativeFixtures']],
  ['czechia-rodne-cislo', 'Czechia Rodne cislo', '/en/czechia/czechia-rodne-cislo-validator/', 'Open Rodne cislo validator', 'Czechia', 'Personal identifiers', ['syntax', 'checksum', 'anatomy'], ['official', 'privacy'], ['checksumOfficial', 'displayStorage', 'negativeFixtures']],
  ['chile-rut', 'Chile RUT', '/en/chile/chile-rut-validator/', 'Open RUT validator', 'Chile', 'Tax identifiers', ['syntax', 'checksum', 'anatomy', 'batch'], ['official', 'network'], ['checksumOfficial', 'displayStorage', 'negativeFixtures']],
  ['colombia-nit', 'Colombia NIT', '/en/colombia/colombia-nit-validator/', 'Open NIT validator', 'Colombia', 'Tax identifiers', ['syntax', 'checksum', 'anatomy', 'batch'], ['official', 'network'], ['checksumOfficial', 'staleTables', 'api']],
  ['iban-country-generators', 'Country IBAN generators', '/en/tools/iban-generator/', 'Open global IBAN generator', 'Global + local countries', 'Banking fixtures', ['generation', 'mod97', 'anatomy', 'masking'], ['ownership', 'network'], ['generation', 'displayStorage', 'checksumOfficial']]
].map(([slug, title, primaryHref, primaryLabel, country, topic, checkKeys, boundaryKeys, trapKeys]) => ({
  slug,
  title,
  group: topic.includes('Banking') || topic.includes('Payments') ? 'banking' : 'identity',
  topic,
  country,
  primaryHref,
  primaryLabel,
  summary: `${title} guide for local browser checks, safe fixtures, parser evidence, and the official boundary developers must preserve.`,
  checkKeys,
  boundaryKeys,
  trapKeys
}));

const GUIDE_PROFILES = [...GLOBAL_GUIDES, ...LOCAL_GUIDES];

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
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

async function configuredLocales() {
  const siteConfig = await readFile(resolve(projectRoot, 'site.yaml'), 'utf8');
  const inline = siteConfig.match(/^locales:\s*\[(.*?)\]\s*$/m);
  if (!inline) return CORE_PRODUCTION_LOCALES;
  const values = inline[1].split(',').map(item => item.trim()).filter(Boolean);
  return values.length ? values : CORE_PRODUCTION_LOCALES;
}

function renderHeader(active = 'guides') {
  const isActive = (name) => active === name ? ' aria-current="page" class="is-active"' : '';
  return `
    <header class="site-header">
      <div class="vh-container header-inner">
        <a class="brand" href="/en/">
          <span class="brand-mark">V</span>
          <span class="brand-text">ValidoHub</span>
        </a>
        <nav class="primary-nav" aria-label="Main navigation">
          <a href="/en/"${isActive('home')}>Home</a>
          <a href="/en/tools/"${isActive('tools')}>Tools</a>
          <a href="/en/countries/"${isActive('countries')}>Countries</a>
          <a href="/en/guides/"${isActive('guides')}>Guides</a>
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
          <a href="/en/guides/">Guides</a>
          <a href="/en/categories/national-identifiers/">Identifiers</a>
          <a href="/sitemap.xml">Sitemap</a>
        </nav>
      </div>
    </footer>
  `;
}

function renderBreadcrumbs(current) {
  return `
    <nav class="vh-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><a href="/en/">Home</a></li>
        <li><a href="/en/guides/">Guides</a></li>
        <li><span aria-current="page">${escapeHtml(current)}</span></li>
      </ol>
    </nav>
  `;
}

function renderIndexBreadcrumbs() {
  return `
    <nav class="vh-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><a href="/en/">Home</a></li>
        <li><span aria-current="page">Guides</span></li>
      </ol>
    </nav>
  `;
}

function guidePath(profile) {
  return `/en/guides/${profile.slug}/`;
}

function cardGrid(items, className = '') {
  return `<div class="vh-guide-card-grid ${className}">${items.join('\n')}</div>`;
}

function renderMiniCard(label, value, note = '') {
  return `
    <article class="vh-guide-mini-card">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      ${note ? `<p>${escapeHtml(note)}</p>` : ''}
    </article>
  `;
}

function renderGuideHero(profile) {
  return `
    <header class="vh-page-intro vh-guide-hero">
      <div>
        <span class="vh-eyebrow">${escapeHtml(profile.topic)}</span>
        <h1>${escapeHtml(profile.title)} guide</h1>
        <p>${escapeHtml(profile.summary)}</p>
        <div class="vh-guide-actions">
          <a class="vh-btn vh-btn-primary" href="${escapeHtml(profile.primaryHref)}">${escapeHtml(profile.primaryLabel)}</a>
          <a class="vh-btn vh-btn-secondary" href="/en/guides/">Browse reference guides</a>
        </div>
      </div>
      <aside class="vh-guide-hero-panel" aria-label="Guide promise">
        <span class="vh-eyebrow">Tool-first reference</span>
        <strong>Use the guide to decide, then run the local tool.</strong>
        <p>No fake registry lookup, no upload promise, and no documentation dead end. The production tool remains the primary workflow.</p>
      </aside>
    </header>
  `;
}

function renderGuideContent(profile, routeExists) {
  const factCards = [
    renderMiniCard('Primary workbench', profile.primaryLabel, routeExists ? 'Linked production route' : 'Route not found in current preview'),
    renderMiniCard('Scope', profile.country || 'Global', profile.topic),
    renderMiniCard('Local evidence', profile.checkKeys.map(key => CHECK_LABELS[key]).slice(0, 2).join(' + '), 'Browser-checkable work only'),
    renderMiniCard('Boundary', 'No live source proof', 'Official state remains external')
  ];

  const checkCards = profile.checkKeys.map(key => renderMiniCard('Check', CHECK_LABELS[key], 'Use the workbench for current evidence.'));
  const boundaryCards = profile.boundaryKeys.map(key => renderMiniCard('Boundary', BOUNDARY_LABELS[key]));
  const trapCards = profile.trapKeys.map(key => renderMiniCard('Trap', TRAP_LABELS[key]));

  return `
    <section class="vh-card vh-guide-facts-card">
      ${cardGrid(factCards)}
    </section>

    <section class="vh-card vh-guide-content-card">
      <div class="section-heading">
        <span class="vh-eyebrow">Why this exists</span>
        <h2>Know what can be trusted before wiring the value into production.</h2>
      </div>
      <p class="vh-guide-lede">${escapeHtml(profile.title)} pages in ValidoHub are tool-first. This reference layer explains the checks, fixtures, developer handoff, and source-system limits so teams can integrate the live workbench output deliberately.</p>
      ${cardGrid([
        renderMiniCard('Use for', 'Implementation planning', 'Choose normalization, storage, masking, and fixture strategy.'),
        renderMiniCard('Use for', 'QA and CI fixtures', 'Keep pass, review, malformed, and edge examples beside the code.'),
        renderMiniCard('Use for', 'Developer handoff', 'Copy the live tool JSON instead of reverse-engineering display text.')
      ], 'vh-guide-three')}
    </section>

    <section class="vh-card vh-guide-content-card">
      <div class="section-heading">
        <span class="vh-eyebrow">Browser checks</span>
        <h2>Local evidence the workbench can expose.</h2>
      </div>
      ${cardGrid(checkCards)}
    </section>

    <section class="vh-card vh-guide-content-card">
      <div class="section-heading">
        <span class="vh-eyebrow">Official boundary</span>
        <h2>Where local validation must stop.</h2>
      </div>
      ${cardGrid(boundaryCards)}
    </section>

    <section class="vh-card vh-guide-content-card vh-guide-traps">
      <div class="section-heading">
        <span class="vh-eyebrow">Integration traps</span>
        <h2>Small mistakes that create expensive debugging later.</h2>
      </div>
      ${cardGrid(trapCards)}
    </section>

    <section class="vh-card vh-guide-live-card">
      <div>
        <span class="vh-eyebrow">Run the workbench</span>
        <h2>${escapeHtml(profile.primaryLabel)}</h2>
        <p>Validate, generate, inspect, copy, or export the current value in the browser.</p>
      </div>
      <a class="vh-btn vh-btn-primary" href="${escapeHtml(profile.primaryHref)}">Open live tool</a>
    </section>
  `;
}

function renderIndexHero() {
  return `
    <header class="vh-page-intro vh-guide-hero vh-guide-index-hero">
      <div>
        <span class="vh-eyebrow">Reference guides</span>
        <h1>Tool-first guides for real-world developer data.</h1>
        <p>Short, practical reference pages for ValidoHub workbenches: what the browser can prove, what stays official, and which live tool to use next.</p>
      </div>
      <aside class="vh-guide-hero-panel">
        <span class="vh-eyebrow">Coverage</span>
        <strong>${GUIDE_PROFILES.length} high-signal guides</strong>
        <p>Focused on global utilities, identifiers, tax formats, banking, payments, and fixture workflows that already have useful live tools.</p>
      </aside>
    </header>
  `;
}

function renderGuideIndex() {
  const sections = Object.entries(GUIDE_GROUPS).map(([group, label]) => {
    const cards = GUIDE_PROFILES
      .filter(profile => profile.group === group)
      .map(profile => `
        <a class="vh-guide-index-card" href="${guidePath(profile)}">
          <span>${escapeHtml(profile.topic)}</span>
          <strong>${escapeHtml(profile.title)}</strong>
          <p>${escapeHtml(profile.summary)}</p>
        </a>
      `);
    return `
      <section class="vh-card vh-guide-index-section">
        <div class="section-heading">
          <span class="vh-eyebrow">Guide family</span>
          <h2>${escapeHtml(label)}</h2>
        </div>
        <div class="vh-guide-index-grid">${cards.join('\n')}</div>
      </section>
    `;
  });
  return sections.join('\n');
}

function renderPageShell({ headHtml, breadcrumbsHtml, heroHtml, contentHtml, jsonLd, assetsManifest }) {
  const jsonLdScript = `<script type="application/ld+json">${escapeHtmlJson(JSON.stringify(jsonLd))}</script>`;
  const scriptsHtml = `<script src="${assetsManifest.js}" defer></script>`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${headHtml}
  ${jsonLdScript}
</head>
<body>
  ${renderHeader()}
  <main class="site-main">
    <section class="vh-page-shell">
      <div class="vh-container vh-page-stack vh-guide-page-stack">
        ${breadcrumbsHtml}
        ${heroHtml}
        ${contentHtml}
      </div>
    </section>
  </main>
  ${renderFooter()}
  ${scriptsHtml}
</body>
</html>`;
}

function headFor({ title, description, canonicalPath, assetsManifest }) {
  const canonicalUrl = `https://validohub.com${canonicalPath}`;
  return `
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonicalUrl}">
  <link rel="alternate" hreflang="en" href="${canonicalUrl}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <meta name="twitter:card" content="summary">
  <link rel="stylesheet" href="${assetsManifest.css}">
  `;
}

async function registerGuideRoutes(routeRegistry) {
  const paths = ['/en/guides/', ...GUIDE_PROFILES.map(guidePath)];
  for (const path of paths) {
    if (routeRegistry.has(path)) continue;
    const profile = GUIDE_PROFILES.find(item => guidePath(item) === path);
    routeRegistry.register(path, {
      type: profile ? 'guide' : 'guides',
      title: profile ? `${profile.title} Guide | ValidoHub` : 'Reference Guides | ValidoHub',
      sourceOwner: 'node',
      metadata: profile || {}
    });
  }
  return paths.map(path => path.replace(/^\/en/, '') || '/');
}

async function compileReferenceGuides(routeRegistry, assetsManifest) {
  console.log('--- Rendering reference guides ---');
  await registerGuideRoutes(routeRegistry);

  const indexPath = '/en/guides/';
  const indexHtml = renderPageShell({
    assetsManifest,
    headHtml: headFor({
      title: 'Reference Guides | ValidoHub',
      description: 'Practical ValidoHub guides for browser-only developer tools, local identifiers, banking formats, payments, fixtures, and production boundaries.',
      canonicalPath: indexPath,
      assetsManifest
    }),
    breadcrumbsHtml: renderIndexBreadcrumbs(),
    heroHtml: renderIndexHero(),
    contentHtml: renderGuideIndex(),
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      headline: 'ValidoHub Reference Guides',
      description: 'Tool-first guides for browser-only developer data workflows.',
      url: `https://validohub.com${indexPath}`
    }
  });
  const indexOutput = resolve(siteRoot, 'en', 'guides', 'index.html');
  await mkdir(dirname(indexOutput), { recursive: true });
  await writeFile(indexOutput, indexHtml, 'utf8');
  console.log('✓ Generated: /en/guides/');

  for (const profile of GUIDE_PROFILES) {
    const path = guidePath(profile);
    const routeExists = routeRegistry.has(profile.primaryHref) || await pathExists(resolve(siteRoot, profile.primaryHref.replace(/^\//, ''), 'index.html'));
    const html = renderPageShell({
      assetsManifest,
      headHtml: headFor({
        title: `${profile.title} Guide | ValidoHub`,
        description: profile.summary,
        canonicalPath: path,
        assetsManifest
      }),
      breadcrumbsHtml: renderBreadcrumbs(`${profile.title} guide`),
      heroHtml: renderGuideHero(profile),
      contentHtml: renderGuideContent(profile, routeExists),
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: `${profile.title} Guide`,
        description: profile.summary,
        url: `https://validohub.com${path}`,
        inLanguage: 'en',
        audience: {
          '@type': 'Audience',
          audienceType: 'Software Developers'
        },
        about: profile.topic,
        isBasedOn: profile.primaryHref
      },
      assetsManifest
    });
    const outputPath = resolve(siteRoot, path.replace(/^\//, ''), 'index.html');
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html, 'utf8');
    console.log(`✓ Generated: ${path}`);
  }

  return ['/guides/', ...GUIDE_PROFILES.map(profile => `/guides/${profile.slug}/`)];
}

async function refreshSitemap(locales, suffixes) {
  const sitemapPath = resolve(siteRoot, 'sitemap.xml');
  let existing = '';
  if (await pathExists(sitemapPath)) {
    existing = await readFile(sitemapPath, 'utf8');
  }

  const wantedPaths = [];
  for (const currentLocale of locales) {
    for (const suffix of suffixes) {
      wantedPaths.push(`/${currentLocale}${suffix}`);
    }
  }

  const guideLocPattern = /^\s*<url><loc>https:\/\/validohub\.com\/[^/]+\/guides\/[^<]*<\/loc><\/url>\s*$/gm;
  const withoutOldGuides = existing
    ? existing.replace(guideLocPattern, '').replace(/\n{3,}/g, '\n\n')
    : '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>\n';

  const guideUrls = wantedPaths
    .sort((a, b) => a.localeCompare(b))
    .map(path => `  <url><loc>https://validohub.com${path}</loc></url>`)
    .join('\n');

  const next = withoutOldGuides.includes('</urlset>')
    ? withoutOldGuides.replace('</urlset>', `${guideUrls}\n</urlset>`)
    : `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${guideUrls}\n</urlset>\n`;

  await writeFile(sitemapPath, next, 'utf8');
  console.log(`✓ Refreshed sitemap guide URLs: ${wantedPaths.length}`);
}

async function main() {
  const manifestPath = resolve(projectRoot, 'assets', 'assets-manifest.json');
  const assetsManifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  const routeRegistry = await buildRouteRegistry();
  const includeSuffixes = await compileReferenceGuides(routeRegistry, assetsManifest);
  const locales = await configuredLocales();
  await applyFinalLocalizationPass(routeRegistry, siteRoot, locales, {
    includeSuffixes,
    forceRefresh: true
  });
  await refreshSitemap(locales, includeSuffixes);
  console.log(`✓ Localized reference guides: ${locales.join(', ')}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => {
    console.error(error.message || error);
    process.exit(1);
  });
}
