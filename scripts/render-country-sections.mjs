import { escape } from 'node:querystring';

function cleanHtml(html) {
  // Sort classes alphabetically on all HTML elements for byte-identical determinism
  return html.replace(/class=["']([^"']+)["']/g, (match, classList) => {
    const sorted = classList.split(/\s+/).filter(Boolean).sort().join(' ');
    return `class="${sorted}"`;
  });
}

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function createSection(eyebrow, title, className, description, content) {
  if (!content) return '';
  const html = `
    <section class="vh-country-section vh-${className}">
      <div class="section-heading">
        <span class="vh-eyebrow">${escapeHtml(eyebrow)}</span>
        <h2>${escapeHtml(title)}</h2>
        ${description ? `<p>${escapeHtml(description)}</p>` : ''}
      </div>
      <div class="vh-section-content">
        ${content}
      </div>
    </section>
  `;
  return cleanHtml(html);
}

function createMetricCard(label, value, icon = null, copyValue = null, brandKey = null) {
  const brandIcon = icon ? `<span class="vh-country-card-icon" aria-hidden="true">${icon}</span>` : '';
  const valBlock = copyValue 
    ? `<span class="vh-country-code-value"><code>${escapeHtml(value)}</code><button class="vh-country-copy-button" type="button" data-copy-value="${escapeHtml(copyValue)}" data-copy-label="${escapeHtml(label)}">Copy</button></span>`
    : `<strong>${escapeHtml(value)}</strong>`;

  const html = `
    <article class="vh-country-metric-card">
      ${brandIcon}
      <span class="vh-country-card-label">${escapeHtml(label)}</span>
      ${valBlock}
    </article>
  `;
  return html;
}

function createInfoCard(title, text, icon = null, status = null, related = [], href = null, disabled = false) {
  const tag = href ? 'a' : 'article';
  const hrefAttr = href ? `href="${href}"` : '';
  const disabledClass = disabled ? 'is-disabled' : '';
  const linkClass = href ? 'is-linked' : 'is-reference';
  
  const statusBadge = status 
    ? `<span class="vh-country-status-badge vh-country-status-${status.toLowerCase() === 'ready' ? 'ready' : (status.toLowerCase() === 'available' ? 'ready' : 'in-progress')}">${escapeHtml(status)}</span>`
    : '';

  const iconBlock = icon ? `<span class="vh-country-card-icon" aria-hidden="true">${icon}</span>` : '';
  
  const relatedChips = related.length > 0
    ? `<div class="vh-country-badge-row">${related.map(r => `<span class="vh-country-status-badge vh-custom-badge">${escapeHtml(r)}</span>`).join('')}</div>`
    : '';

  const html = `
    <${tag} class="vh-country-info-card ${disabledClass} ${linkClass}" ${hrefAttr}>
      <div class="vh-flex vh-align-center vh-justify-between vh-gap-sm">
        <div class="vh-flex vh-align-center vh-gap-xs">
          ${iconBlock}
          <h3>${escapeHtml(title)}</h3>
        </div>
        ${statusBadge}
      </div>
      <p class="vh-mt-xs vh-mb-xs">${escapeHtml(text)}</p>
      ${relatedChips}
    </${tag}>
  `;
  return html;
}

function getCountryValidatorRoutes(model, routeRegistry) {
  if (!routeRegistry) return [];
  return routeRegistry.getAll()
    .filter(r => r.type === 'validator' && r.path.startsWith(`/en/${model.slug}/`))
    .sort((a, b) => (a.title || '').localeCompare(b.title || ''));
}

function routeSlug(route) {
  return route.path.split('/').filter(Boolean).at(-1) || '';
}

const ROUTE_QUALITY_FEATURES = [
  { key: 'validate', label: 'Validate' },
  { key: 'batch', label: 'Batch' },
  { key: 'export', label: 'Export' },
  { key: 'masking', label: 'Masking' },
  { key: 'docs', label: 'Docs' }
];

function routeFeatures(route) {
  const slug = routeSlug(route);
  const title = String(route.title || '').toLowerCase();
  const inText = (needle) => slug.includes(needle) || title.includes(needle);

  const features = ['validate', 'docs'];
  if (inText('validator') || inText('inspector') || inText('checker') || inText('helper')) {
    features.push('validate');
  }
  if (inText('batch') || inText('data-quality') || inText('test-data')) {
    features.push('batch');
  }
  if (inText('generator') || inText('formatter') || inText('converter') || inText('builder')) {
    features.push('export');
  }
  if (inText('mask') || inText('pii')) {
    features.push('masking');
  }
  return Array.from(new Set(features));
}

function routeQualitySummary(route) {
  const features = routeFeatures(route);
  const enabled = ROUTE_QUALITY_FEATURES.filter(item => features.includes(item.key));
  const percent = Math.round((enabled.length / ROUTE_QUALITY_FEATURES.length) * 100);
  return {
    features,
    percent,
    labels: enabled.map(item => item.label)
  };
}

function createRouteCard(route, description, tags = [], status = 'available') {
  const quality = routeQualitySummary(route);
  const qualityLabel = quality.labels.length > 0 ? quality.labels.join(' · ') : 'Validate';
  return createInfoCard(
    route.title || 'Interactive Workbench',
    `${description || 'Run a browser-only country validation, formatting, or data-quality workflow.'} Quality ${quality.percent}%: ${qualityLabel}.`,
    null,
    status,
    tags,
    route.path
  );
}

const POLAND_WORKBENCH_GROUPS = [
  {
    key: 'identity',
    title: 'Identity, registry & official numbers',
    summary: 'PESEL, NIP, REGON, KRS, documents, vehicle identifiers, and official registry-shaped data.',
    tags: ['identity', 'registry'],
    match: /(pesel|nip|regon|krs|id-card|passport|mrz|driving|license-plate|vehicle-registration|vin|eori|bdo|teryt|municipality)/
  },
  {
    key: 'tax',
    title: 'Tax, invoices & business compliance',
    summary: 'VAT, KSeF, JPK, invoices, company onboarding, classifications, and fiscal record helpers.',
    tags: ['tax', 'business'],
    match: /(vat|ksef|jpk|invoice|receipt|paragon|pkd|pkwiu|ceidg|company|tax-microaccount)/
  },
  {
    key: 'banking',
    title: 'Banking, payments & money movement',
    summary: 'IBAN, NRB, BIC, SEPA, BLIK, split payment, transfer titles, amounts, and payment QR payloads.',
    tags: ['banking', 'payments'],
    match: /(iban|nrb|bank|swift|bic|sepa|blik|split-payment|payment-qr|transfer-title|grosz|pln-amount|statement)/
  },
  {
    key: 'address',
    title: 'Address, phone, logistics & local format',
    summary: 'Postal codes, addresses, phones, parcel numbers, date/locale formatting, and delivery-ready data.',
    tags: ['localization', 'operations'],
    match: /(postal|address|phone|parcel|date-locale)/
  },
  {
    key: 'developer',
    title: 'Developer data operations',
    summary: 'Masking, test fixtures, privacy-safe demos, and whole-record Polish data-quality audits.',
    tags: ['developer', 'data-quality'],
    match: /(pii-masker|test-data|data-quality)/
  }
];

function groupCountryWorkbenchRoutes(routes) {
  const buckets = POLAND_WORKBENCH_GROUPS.map(group => ({ ...group, routes: [] }));
  const other = { key: 'other', title: 'Other country developer workflows', summary: 'Additional country-specific tools and inspectors.', tags: ['country'], routes: [] };

  for (const route of routes) {
    const slug = routeSlug(route);
    const group = buckets.find(item => item.match.test(slug));
    (group || other).routes.push(route);
  }

  return [...buckets, other].filter(group => group.routes.length > 0);
}

function renderExpandableRouteGroup(group, open = false) {
  const rows = group.routes.map(route => `
    <a class="vh-country-catalog-row" data-intent-group="${escapeHtml(group.key)}" data-route-slug="${escapeHtml(routeSlug(route))}" href="${route.path}">
      <span>
        <strong>${escapeHtml(route.title || route.path)}</strong>
        <small>${escapeHtml(route.path)} · quality ${routeQualitySummary(route).percent}%</small>
      </span>
      <span class="vh-country-row-arrow" aria-hidden="true">→</span>
    </a>
  `).join('\n');

  return `
    <details class="vh-country-route-group" ${open ? 'open' : ''}>
      <summary>
        <span>
          <strong>${escapeHtml(group.title)}</strong>
          <small>${escapeHtml(group.summary)}</small>
        </span>
        <span class="vh-country-group-count">${group.routes.length}</span>
      </summary>
      <div class="vh-country-route-list">
        ${rows}
      </div>
    </details>
  `;
}

function findRoutes(routes, pattern) {
  return routes.filter(route => pattern.test(routeSlug(route)) || pattern.test((route.title || '').toLowerCase()));
}

function findFirstRoute(routes, patterns) {
  for (const pattern of patterns) {
    const found = routes.find(route => pattern.test(routeSlug(route)) || pattern.test((route.title || '').toLowerCase()));
    if (found) return found;
  }
  return null;
}

function findCountryStandardRoute(routes, label) {
  const text = String(label || '').toLowerCase();
  if (text.includes('bank code')) return findFirstRoute(routes, [/bank-code/]);
  if (text.includes('nrb domestic') || text.includes('iban') || text.includes('pln and polish iban')) return findFirstRoute(routes, [/iban-nrb/]);
  if (text.includes('swift') || text.includes('bic')) return findFirstRoute(routes, [/swift-bic/]);
  if (text.includes('sepa')) return findFirstRoute(routes, [/sepa-transfer/]);
  if (text.includes('blik')) return findFirstRoute(routes, [/blik-code/]);
  if (text.includes('split') || text.includes('mpp')) return findFirstRoute(routes, [/split-payment/]);
  if (text.includes('payment qr')) return findFirstRoute(routes, [/payment-qr/]);
  if (text.includes('tax microaccount')) return findFirstRoute(routes, [/tax-microaccount/]);
  if (text.includes('grosz')) return findFirstRoute(routes, [/grosz-converter/]);
  if (text.includes('pln amount')) return findFirstRoute(routes, [/pln-amount/]);
  if (text.includes('domestic account')) return findFirstRoute(routes, [/bank-code/, /iban-nrb/]);
  return null;
}

export function renderCountryWorkbenchCatalog(model, routeRegistry) {
  const routes = getCountryValidatorRoutes(model, routeRegistry);
  if (routes.length === 0) return '';

  const featuredPatterns = /(pesel-validator|poland-nip-validator|poland-regon-validator|poland-iban-nrb-validator|poland-vat-validator|poland-krs-inspector|poland-postal-code-validator|poland-phone-number-validator|poland-blik-code-helper|poland-ksef-invoice-xml-validator)/;
  const featured = routes.filter(route => featuredPatterns.test(routeSlug(route))).slice(0, 10);
  const groups = groupCountryWorkbenchRoutes(routes);
  const intentChips = groups.map(group => `<button class="vh-country-intent-chip" type="button" data-country-intent="${escapeHtml(group.key)}">${escapeHtml(group.title)} <span>${group.routes.length}</span></button>`).join('');

  const routeBySlug = (patternList) => findFirstRoute(routes, patternList)?.path || routes[0].path;
  const personPath = routeBySlug([/pesel-validator/, /id-card/, /passport/, /phone-number/, /postal-code/]);
  const companyPath = routeBySlug([/poland-nip-validator/, /regon-validator/, /krs-inspector/, /company/]);
  const paymentPath = routeBySlug([/poland-iban-nrb-validator/, /blik-code/, /swift-bic/, /sepa-transfer/, /payment-qr/]);

  const quickStarts = `
    <div class="vh-country-quick-starts" aria-label="Quick start scenarios">
      <a class="vh-country-quick-start" href="${personPath}">
        <strong>Validate person identity</strong>
        <small>PESEL and document-related checks</small>
      </a>
      <a class="vh-country-quick-start" href="${companyPath}">
        <strong>Validate company identity</strong>
        <small>NIP, REGON, KRS and business references</small>
      </a>
      <a class="vh-country-quick-start" href="${paymentPath}">
        <strong>Validate payment flow</strong>
        <small>IBAN/NRB, BLIK and transfer-readiness</small>
      </a>
    </div>
  `;

  const offlineBoundary = `
    <div class="vh-country-offline-boundary" role="note" aria-label="Offline validation boundary">
      <strong>Trusted offline boundary</strong>
      <p>Format, checksum, structure, and normalization run locally in browser. Registry status, bank account ownership, government confirmation, and legal identity verification require official external systems.</p>
    </div>
  `;

  const stats = `
    <div class="vh-country-catalog-stats" aria-label="Country workbench coverage">
      <span><strong>${routes.length}</strong><small>available workbenches</small></span>
      <span><strong>${groups.length}</strong><small>organized domains</small></span>
      <span><strong>0</strong><small>server calls required</small></span>
    </div>
  `;

  const featuredHtml = featured.length > 0 ? `
    <div class="vh-country-featured-tools" aria-label="Featured country workbenches">
      ${featured.map(route => createRouteCard(route, 'Open the production-grade browser workbench for this country data standard.', ['featured', 'offline'])).join('\n')}
    </div>
  ` : '';

  const groupsHtml = `
    <div class="vh-country-intent-filters" data-country-intent-filters>
      <button class="vh-country-intent-chip is-active" type="button" data-country-intent="all">All intents <span>${routes.length}</span></button>
      ${intentChips}
    </div>
    <div class="vh-country-route-groups">
      ${groups.map((group, index) => renderExpandableRouteGroup(group, index < 2)).join('\n')}
    </div>
    <p class="vh-country-tool-search-empty" data-country-tool-search-empty>No matching workbenches found for this country. Try local identifiers, payments, address, phone, or tax terms.</p>
  `;

  const content = `
    ${quickStarts}
    ${offlineBoundary}
    ${stats}
    ${featuredHtml}
    ${groupsHtml}
  `;
  return createSection('Tool Catalog', `${model.displayName} workbench suite`, 'country-workbench-catalog', 'All country-specific tools grouped by user intent so developers can scan the whole country baseline without a wall of cards.', content);
}

// 1. Facts Sections
export function renderCountryIdentityFacts(model) {
  const content = `
    <div class="vh-country-fact-grid">
      ${createMetricCard('Capital City', model.capital, '🏛')}
      ${createMetricCard('Native Name', model.nativeName, '🗣')}
      ${createMetricCard('ISO Alpha-2', model.iso2, '🪪')}
      ${createMetricCard('ISO Alpha-3', model.iso3, '🪪')}
      ${createMetricCard('Calling Prefix', model.callingCode, '☎', model.callingCode)}
      ${createMetricCard('Internet TLD', model.internetTld, '🌐', model.internetTld)}
      ${createMetricCard('Driving Side', model.drivingSide, '🚗')}
      ${createMetricCard('Time Zones', model.timeZones, '🕒')}
    </div>
  `;
  return createSection('Geography & Standards', 'Identity & Standards Profile', 'country-identity-facts', 'Core country registry details and national system standards.', content);
}

export function renderCountryLocaleFacts(model) {
  const content = `
    <div class="vh-country-fact-grid">
      ${createMetricCard('Active Locale', model.locale, '📅', model.locale)}
      ${createMetricCard('Date Format', model.dateFormats, '📆', model.dateFormats)}
      ${createMetricCard('Currency Name', model.currency, '💵')}
      ${createMetricCard('Decimal Separator', model.decimalSeparator, '🔢', model.decimalSeparator)}
      ${createMetricCard('Thousands Separator', model.thousandsSeparator, '🔢', model.thousandsSeparator)}
      ${createMetricCard('Postal Pattern', model.postalCode, '✉', model.postalCode)}
    </div>
  `;
  return createSection('Locale Conventions', 'Local Formats & Layouts', 'country-locale-facts', 'Locale preferences, separator characters, and display configurations.', content);
}

export function renderCountryTechnicalFacts(model) {
  const content = `
    <div class="vh-country-fact-grid">
      ${createMetricCard('Plug Types', model.plugTypes, '🔌')}
      ${createMetricCard('Electrical Voltage', model.voltage, '⚡')}
      ${createMetricCard('Grid Frequency', model.frequency, '⚡')}
      ${createMetricCard('Emergency Number', model.emergencyNumbers, '🚨', model.emergencyNumbers)}
    </div>
  `;
  return createSection('Technical Standards', 'Utility & Electrical Profile', 'country-tech-facts', 'Utility metrics, emergency networks, and infrastructure constants.', content);
}

// 2. Developer Cheat Sheets & Quick Copy
export function renderCountryQuickCopyBar(model) {
  const items = [
    { label: 'Locale', val: model.locale, hint: 'BCP 47' },
    { label: 'ISO-2', val: model.iso2, hint: 'country code' },
    { label: 'ISO-3', val: model.iso3, hint: 'alpha-3' },
    { label: 'Calling code', val: model.callingCode, hint: 'phone' },
    { label: 'TLD', val: model.internetTld, hint: 'domain' },
    { label: 'Date format', val: model.dateFormats, hint: 'display' },
    { label: 'Currency', val: model.currency, hint: 'money' },
    { label: 'Postal pattern', val: model.postalCode, hint: 'address' },
    { label: 'Decimal', val: model.decimalSeparator, hint: 'numbers' },
    { label: 'Thousands', val: model.thousandsSeparator, hint: 'numbers' }
  ].filter(i => i.val);

  if (items.length === 0) return '';

  const buttonsHtml = items.map(item => `
    <button class="vh-country-action-button" type="button" data-copy-value="${escapeHtml(item.val)}" data-copy-label="${escapeHtml(item.label)}">
      <span>${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.val)}</strong>
      <small>${escapeHtml(item.hint)}</small>
    </button>
  `).join('\n');

  const content = `
    <div class="vh-country-action-bar">
      ${buttonsHtml}
    </div>
  `;
  return createSection('Developer Actions', `Copy ${model.displayName} constants instantly`, 'country-quick-actions', 'One-click values developers repeatedly need for forms, payloads, tests, and locale-aware formatting.', content);
}

// 3. Formatting Examples (Currency, dates, percentages)
export function renderCountryFormattingExamples(model, rawHubData) {
  const examples = rawHubData.localizationExamples || [];
  if (examples.length === 0) return '';

  const cardsHtml = examples.map(ex => createMetricCard(ex.label, ex.value, null, ex.value)).join('\n');

  const content = `
    <div class="vh-country-fact-grid">
      ${cardsHtml}
    </div>
  `;
  return createSection('Formatting Previews', 'Locale-aware display examples', 'country-formatting-examples', 'Real formatting previews representing dates, times, currency, and phone layouts.', content);
}

// 4. Address & Postal Format
export function renderCountryAddressFormat(model) {
  const addr = model.addressFormat;
  if (!addr || !addr.formatted || addr.formatted.length === 0) return '';

  const preBlock = `
    <div class="vh-country-address-card">
      <pre><code>${addr.formatted.map(escapeHtml).join('\n')}</code></pre>
      <button class="vh-country-copy-button" type="button" data-copy-value="${escapeHtml(addr.formatted.join('\n'))}" data-copy-label="Address Example">Copy Address</button>
    </div>
  `;

  const fieldsGrid = addr.fields && addr.fields.length > 0
    ? `<div class="vh-country-card-grid-compact">
        ${addr.fields.map(f => createInfoCard(f.label, `${f.value} — ${f.description}`, '📍')).join('\n')}
       </div>`
    : '';

  const content = `
    <div class="vh-country-split-layout">
      ${preBlock}
      ${fieldsGrid}
    </div>
  `;
  return createSection('Address Standards', 'Structured address formatting', 'country-address-format', 'Display order, postal mask, street notation, and delivery-ready field sequence.', content);
}

// 5. Phone & Vehicle Registration
export function renderCountryPhoneFormats(model) {
  if (!model.phoneFormats || model.phoneFormats.length === 0) return '';

  const cardsHtml = model.phoneFormats.map(item => {
    const card = createInfoCard(item.label, item.description, '☎', 'available', item.tags || []);
    // Embed the phone template block
    const codeBlock = createMetricCard('Example layout', item.value, null, item.value);
    return `<div class="vh-country-phone-card-wrapper">${card}${codeBlock}</div>`;
  }).join('\n');

  const content = `
    <div class="vh-country-card-grid-compact">
      ${cardsHtml}
    </div>
  `;
  return createSection('Phone Conventions', 'Telephone layouts & parsing guidelines', 'country-phone-formats', 'Mobile, regional landline, and international dialing representations.', content);
}

export function renderCountryVehicleRegistration(model, rawHubData) {
  const vehicle = rawHubData.vehicleRegistration || (model.vehicleRegistration ? { format: model.vehicleRegistration } : null);
  if (!vehicle || !vehicle.format) return '';

  const content = `
    <div class="vh-country-card-grid-compact">
      ${createInfoCard('License Plates Format', `Standard shape pattern: ${vehicle.format}. Example plate: ${vehicle.example || 'N/A'}.`, '🚗', 'available')}
      ${vehicle.notes ? createInfoCard('Validation & Encoding', vehicle.notes, 'ℹ', 'available') : ''}
    </div>
  `;
  return createSection('License Plates', 'Vehicle registration layout conventions', 'country-vehicle-registration', 'Standard registration plates formatting and region encodings.', content);
}

// 6. Ecosystem divisions & banking structures
export function renderCountryAdministrativeDivisions(model, rawHubData) {
  const divisions = rawHubData.administrativeDivisions || model.administrativeDivisions;
  if (!divisions || (Array.isArray(divisions) && divisions.length === 0)) return '';

  const listHtml = Array.isArray(divisions)
    ? `<ul class="vh-country-checklist">${divisions.map(d => `<li><span class="vh-country-check-box">□</span><span>${escapeHtml(d)}</span></li>`).join('')}</ul>`
    : `<p>${escapeHtml(divisions)}</p>`;

  return createSection('Administrative Divisions', 'National administrative divisions hierarchy', 'country-admin-divisions', 'Government subdivisions and territorial structure.', listHtml);
}

export function renderCountryTaxSystem(model, rawHubData) {
  const tax = rawHubData.taxSystem || model.taxSystem;
  if (!tax) return '';

  const content = `
    <div class="vh-country-card-grid-compact">
      ${createInfoCard(tax.name || 'National Tax System', tax.description || tax, '💸', 'available')}
      ${tax.authority ? createInfoCard('Tax Administration Authority', tax.authority, '🏛', 'available') : ''}
    </div>
  `;
  return createSection('Tax System', 'Business registration & tax overview', 'country-tax-system', 'Tax identification numbers, vat rules, and compliance requirements.', content);
}

export function renderCountryBankingSystem(model, routeRegistry = null) {
  if (!model.bankingSystem || model.bankingSystem.length === 0) return '';

  const routes = getCountryValidatorRoutes(model, routeRegistry);
  const toolRoutes = findRoutes(routes, /(iban|nrb|bank|swift|bic|sepa|blik|split-payment|payment-qr|transfer-title|grosz|pln-amount|statement|tax-microaccount)/).slice(0, 12);

  const cardsHtml = model.bankingSystem.map(bank => {
    const relatedRoute = findCountryStandardRoute(routes, bank.name);
    return createInfoCard(bank.name, bank.description, '🏦', bank.status || 'available', bank.tags || [], relatedRoute?.path || null);
  }).join('\n');
  const toolsHtml = toolRoutes.length > 0 ? `
    <div class="vh-country-subsection">
      <h3>Related banking workbenches</h3>
      <div class="vh-country-route-list vh-country-route-list-compact">
        ${toolRoutes.map(route => `
          <a class="vh-country-catalog-row" href="${route.path}">
            <span><strong>${escapeHtml(route.title)}</strong><small>${escapeHtml(route.path)}</small></span>
            <span class="vh-country-row-arrow" aria-hidden="true">→</span>
          </a>
        `).join('\n')}
      </div>
    </div>
  ` : '';

  const content = `
    <div class="vh-country-card-grid-compact">
      ${cardsHtml}
    </div>
    ${toolsHtml}
  `;
  return createSection('Banking Standards', 'Polish account, transfer & clearing standards', 'country-banking-system', 'IBAN, NRB, BIC, SEPA, Elixir-style routing context, and payment-ready developer workflows.', content);
}

export function renderCountryPaymentSystems(model, routeRegistry = null) {
  if (!model.paymentSystems || model.paymentSystems.length === 0) return '';

  const routes = getCountryValidatorRoutes(model, routeRegistry);
  const toolRoutes = findRoutes(routes, /(blik|split-payment|payment-qr|sepa|transfer-title|tax-microaccount|vat-calculator|grosz|pln-amount|iban|nrb)/).slice(0, 12);

  const cardsHtml = model.paymentSystems.map(pay => {
    const title = pay.title || pay.name;
    const relatedRoute = findCountryStandardRoute(routes, title);
    return createInfoCard(title, pay.text || pay.description, '💳', pay.status || 'available', pay.tags || [], relatedRoute?.path || null);
  }).join('\n');
  const toolsHtml = toolRoutes.length > 0 ? `
    <div class="vh-country-subsection">
      <h3>Related payment workbenches</h3>
      <div class="vh-country-route-list vh-country-route-list-compact">
        ${toolRoutes.map(route => `
          <a class="vh-country-catalog-row" href="${route.path}">
            <span><strong>${escapeHtml(route.title)}</strong><small>${escapeHtml(route.path)}</small></span>
            <span class="vh-country-row-arrow" aria-hidden="true">→</span>
          </a>
        `).join('\n')}
      </div>
    </div>
  ` : '';

  const content = `
    <div class="vh-country-card-grid-compact">
      ${cardsHtml}
    </div>
    ${toolsHtml}
  `;
  return createSection('Payment Networks', 'Polish payment rails & offline helpers', 'country-payment-systems', 'BLIK, SEPA, split payment, payment QR, PLN amounts, VAT amounts, and transfer-reference workflows.', content);
}

// 7. National Identifiers & Validators
export function renderCountryIdentifiers(model, routeRegistry) {
  if (!model.identifiers || model.identifiers.length === 0) return '';

  const idRoutes = routeRegistry.getAll().filter(r => r.type === 'identifier' && r.metadata.countryCode === model.iso2);
  const validatorRoutes = getCountryValidatorRoutes(model, routeRegistry);
  const identifierRoutes = findRoutes(validatorRoutes, /(pesel|nip|regon|krs|id-card|passport|mrz|driving|license-plate|vehicle-registration|vin|eori|bdo|teryt|municipality|ppe|postal-code|phone-number)/);
  if (idRoutes.length === 0 && identifierRoutes.length === 0) return '';

  const cardsHtml = idRoutes.map(r => {
    return createInfoCard(
      r.metadata.displayName,
      r.metadata.summary || 'Structure breakdowns, weighted checksum math, and developer implementation guidelines.',
      '🆔',
      'available',
      ['identifier', 'specification'],
      r.path
    );
  }).join('\n');

  const routeGroups = identifierRoutes.length > 0 ? `
    <div class="vh-country-subsection">
      <h3>${identifierRoutes.length} related identifier workbenches</h3>
      <div class="vh-country-route-list vh-country-route-list-compact">
        ${identifierRoutes.map(route => `
          <a class="vh-country-catalog-row" href="${route.path}">
            <span><strong>${escapeHtml(route.title)}</strong><small>${escapeHtml(route.path)}</small></span>
            <span class="vh-country-row-arrow" aria-hidden="true">→</span>
          </a>
        `).join('\n')}
      </div>
    </div>
  ` : '';

  const content = `
    ${cardsHtml ? `<div class="vh-country-card-grid-compact">
      ${cardsHtml}
    </div>` : ''}
    ${routeGroups}
  `;
  return createSection('National Identifiers', 'Identifier registry specs & workbenches', 'country-identifiers-specs', 'Official identifier specs plus related browser tools for personal, business, vehicle, address, and registry-shaped Polish data.', content);
}

export function renderCountryValidators(model, routeRegistry) {
  if (!model.validators || model.validators.length === 0) return '';

  const valRoutes = getCountryValidatorRoutes(model, routeRegistry);

  const cardsHtml = valRoutes.map(r => {
    return createInfoCard(
      r.title || 'Interactive Validator',
      'Run interactive client-side validations, format conversions, and integrity checks.',
      '🧪',
      'available',
      ['validator', 'workbench'],
      r.path
    );
  }).join('\n');

  if (cardsHtml.length === 0) return '';

  const content = `
    <div class="vh-country-card-grid-compact">
      ${cardsHtml}
    </div>
  `;
  return createSection('Interactive Sandboxes', 'Developer Validator Workbenches', 'country-validators-sandboxes', 'Pre-rendered interactive validator tools to test identifiers in a real browser.', content);
}

// 8. Roadmap & checklists
export function renderCountryIntegrationChecklist(model) {
  if (!model.integrationChecklist || model.integrationChecklist.length === 0) return '';

  const listHtml = `
    <ul class="vh-country-checklist">
      ${model.integrationChecklist.map(item => `
        <li>
          <span class="vh-country-check-box">☑</span>
          <span>${escapeHtml(item)}</span>
        </li>
      `).join('')}
    </ul>
  `;
  return createSection('Developer Checklist', 'Integration checklist reminders', 'country-integration-checklist', 'Important checkmarks to verify when deploying localized pipelines.', listHtml);
}

export function renderCountryRoadmap(model) {
  if (!model.plannedWorkbenches || model.plannedWorkbenches.length === 0) return '';

  const cardsHtml = model.plannedWorkbenches.map(item => {
    return createInfoCard(
      item.name,
      item.description,
      '🧩',
      item.status || 'planned',
      item.tags || [],
      null,
      true
    );
  }).join('\n');

  const content = `
    <div class="vh-country-card-grid-compact">
      ${cardsHtml}
    </div>
  `;
  return createSection('Product Roadmap', 'Future workbenches timeline', 'country-roadmap-timeline', 'Roadmap schedule for upcoming developer workbenches and specs.', content);
}

// 9. Official Resources
export function renderCountryOfficialResources(model) {
  if (!model.officialResources || model.officialResources.length === 0) return '';

  const cardsHtml = model.officialResources.map(res => {
    const card = createInfoCard(
      res.label || res.title,
      res.note || res.description || 'Official country authority resource and portal guides.',
      '🏛',
      res.status || 'available',
      res.tags || []
    );
    const badge = `<span class="vh-country-visual-caption">Reference note, not a link</span>`;
    return `<div class="vh-country-resource-card-wrapper">${card}${badge}</div>`;
  }).join('\n');

  const content = `
    <div class="vh-country-card-grid-compact">
      ${cardsHtml}
    </div>
  `;
  return createSection('Official Sources', 'National regulatory & reference portals', 'country-official-sources', 'Verified legislative resources to validate compliance formats.', content);
}

// 10. Knowledge Graph and cross-linking
export function renderCountryKnowledgeGraph(model, countryDiscovery, routeRegistry) {
  if (!countryDiscovery || !countryDiscovery.relatedResources) return '';

  const res = countryDiscovery.relatedResources;
  const cards = [];

  // 1. Identifiers Graph links
  if (res.identifiers && res.identifiers.length > 0) {
    res.identifiers.forEach(item => {
      const activePath = item.link ? `/en/${item.link}/` : `/en/identifiers/${item.slug}/`;
      const isRegistered = routeRegistry && routeRegistry.has(activePath);
      cards.push(createInfoCard(
        item.name,
        item.description || 'National identifier metadata.',
        '🆔',
        isRegistered ? 'available' : 'planned',
        ['graph-node', 'identifier'],
        isRegistered ? activePath : null,
        !isRegistered
      ));
    });
  }

  // 2. Payments Graph links
  if (res.payments && res.payments.length > 0) {
    res.payments.forEach(item => {
      const activePath = item.link ? `/en/${item.link}/` : null;
      const isRegistered = activePath && routeRegistry && routeRegistry.has(activePath);
      cards.push(createInfoCard(
        item.name,
        item.description || 'Payment system standard.',
        '💳',
        isRegistered ? 'available' : 'planned',
        ['graph-node', 'payment'],
        isRegistered ? activePath : null,
        !isRegistered
      ));
    });
  }

  // 3. Standards Graph links
  if (res.standards && res.standards.length > 0) {
    res.standards.forEach(item => {
      const activePath = item.link ? `/en/${item.link}/` : null;
      const isRegistered = activePath && routeRegistry && routeRegistry.has(activePath);
      cards.push(createInfoCard(
        item.name,
        item.description || 'National banking standard format.',
        '📜',
        isRegistered ? 'available' : 'planned',
        ['graph-node', 'standard'],
        isRegistered ? activePath : null,
        !isRegistered
      ));
    });
  }

  // 4. Workbenches Graph links
  if (res.workbenches && res.workbenches.length > 0) {
    res.workbenches.forEach(item => {
      const activePath = `/en/${model.slug}/${item.slug}/`;
      const isRegistered = routeRegistry && routeRegistry.has(activePath);
      cards.push(createInfoCard(
        item.name,
        item.description || 'Interactive validation tool.',
        '🛠',
        isRegistered ? 'available' : 'planned',
        ['graph-node', 'validator'],
        isRegistered ? activePath : null,
        !isRegistered
      ));
    });
  }

  if (cards.length === 0) return '';

  const content = `
    <div class="vh-country-card-grid-compact">
      ${cards.join('\n')}
    </div>
  `;
  return createSection('Knowledge Graph', 'Graph-powered developer metadata & navigation', 'country-knowledge-graph', 'Pre-rendered relationship paths compiled directly from the ValidoHub central index.', content);
}

export function renderCountryRelatedCountries(model, countryDiscovery, routeRegistry) {
  if (!countryDiscovery || !countryDiscovery.relatedCountries || countryDiscovery.relatedCountries.length === 0) return '';

  const cardsHtml = countryDiscovery.relatedCountries.map(item => {
    const activePath = `/en/${item.slug}/`;
    const isRegistered = routeRegistry && routeRegistry.has(activePath);
    return createInfoCard(
      item.name,
      `Shares standards: ${item.via.join(', ')}`,
      '🌍',
      isRegistered ? 'available' : 'planned',
      item.via,
      isRegistered ? activePath : null,
      !isRegistered
    );
  }).join('\n');

  const content = `
    <div class="vh-country-card-grid-compact">
      ${cardsHtml}
    </div>
  `;
  return createSection('Regional Cross-Links', 'Related regional standard conventions', 'country-cross-links', 'Countries sharing overlapping currency codes, payment gateways, or regulatory acts.', content);
}

// 11. Extra Rich Text blocks
export function renderCountryCommonMistakes(model, rawHubData) {
  const mistakes = rawHubData.commonMistakes || [];
  if (mistakes.length === 0) return '';

  const listHtml = `
    <ul class="vh-country-checklist">
      ${mistakes.map(m => `
        <li>
          <span class="vh-country-check-box vh-color-danger">⚠</span>
          <span>${escapeHtml(m)}</span>
        </li>
      `).join('')}
    </ul>
  `;
  return createSection('Common Mistakes', 'Integration pitfalls to avoid', 'country-common-mistakes', 'Locale formatting and validation traps developers frequently encounter.', listHtml);
}

export function renderCountryHighlights(model, rawHubData) {
  const highlights = rawHubData.highlights || [];
  if (highlights.length === 0) return '';

  const listHtml = `
    <ul class="vh-country-checklist">
      ${highlights.map(h => `
        <li>
          <span class="vh-country-check-box">✦</span>
          <span>${escapeHtml(h)}</span>
        </li>
      `).join('')}
    </ul>
  `;
  return createSection('Key Highlights', 'Highlights and quick summaries', 'country-highlights-notes', 'Summary overview of national localization rules.', listHtml);
}

export function renderCountryDeveloperNotes(model, rawHubData) {
  const notes = rawHubData.developerNotes || [];
  if (notes.length === 0) return '';

  const listHtml = `
    <ul class="vh-country-checklist">
      ${notes.map(n => `
        <li>
          <span class="vh-country-check-box">▪</span>
          <span>${escapeHtml(n)}</span>
        </li>
      `).join('')}
    </ul>
  `;
  return createSection('Developer Notes', 'Developer implementation instructions', 'country-developer-notes', 'Important coding notes for storage, parameters, and validations.', listHtml);
}

export function renderCountryDeveloperExamples(model, rawHubData) {
  const examples = rawHubData.developerExamples || [];
  if (examples.length === 0) return '';

  const cardsHtml = examples.map(ex => {
    const card = createInfoCard(ex.title, ex.note, '💻', 'available', [ex.language]);
    const codeBlock = `
      <div class="vh-country-address-card vh-mt-xs">
        <pre><code class="language-${ex.language}">${escapeHtml(ex.code)}</code></pre>
        <button class="vh-country-copy-button" type="button" data-copy-value="${escapeHtml(ex.code)}" data-copy-label="${escapeHtml(ex.title)}">Copy Code</button>
      </div>
    `;
    return `<div class="vh-country-code-example-wrapper">${card}${codeBlock}</div>`;
  }).join('\n');

  const content = `
    <div class="vh-country-card-grid-compact">
      ${cardsHtml}
    </div>
  `;
  return createSection('Code Examples', 'Developer integration code snippets', 'country-developer-examples', 'Ready-to-use programming snippets in JavaScript, Java, Python, and Go.', content);
}

export function renderCountryLocalizationNotes(model, rawHubData) {
  const notes = rawHubData.localizationNotes || [];
  if (notes.length === 0) return '';

  const cardsHtml = notes.map(n => createInfoCard(n.name, n.description, '📝', 'available', n.tags || [])).join('\n');

  const content = `
    <div class="vh-country-card-grid-compact">
      ${cardsHtml}
    </div>
  `;
  return createSection('Localization Notes', 'Local conventions and grammar exceptions', 'country-localization-notes', 'Grammar peculiarities, diacritics, and calendar configurations.', content);
}

export function renderCountryEcosystem(model, rawHubData) {
  const eco = rawHubData.ecosystem || [];
  if (eco.length === 0) return '';

  const cardsHtml = eco.map(item => createInfoCard(item.name, item.description, '🔗', 'available', item.tags || [])).join('\n');

  const content = `
    <div class="vh-country-card-grid-compact">
      ${cardsHtml}
    </div>
  `;
  return createSection('Country Ecosystem', 'National ecosystem directories', 'country-ecosystem-nodes', 'Canonical national portals, APIs, and registries related to compliance formats.', content);
}
