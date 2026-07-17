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

  const iconText = icon ? String(icon) : '';
  const iconClass = iconText && /^[A-Za-z0-9+./-]{2,8}$/.test(iconText) ? ' vh-country-card-icon-text' : '';
  const iconBlock = icon ? `<span class="vh-country-card-icon${iconClass}" aria-hidden="true">${escapeHtml(icon)}</span>` : '';
  
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

const COUNTRY_FLAGS = {
  brazil: '🇧🇷',
  br: '🇧🇷',
  germany: '🇩🇪',
  de: '🇩🇪',
  poland: '🇵🇱',
  pl: '🇵🇱',
  spain: '🇪🇸',
  es: '🇪🇸'
};

function getCountryFlag(value) {
  const key = String(value || '').toLowerCase().trim();
  return COUNTRY_FLAGS[key] || COUNTRY_FLAGS[key.replace(/\s+/g, '-')] || '🏳';
}

const POLAND_ROUTE_IDENTITIES = {
  'pesel-validator': 'PESEL',
  'poland-nip-validator': 'NIP',
  'poland-regon-validator': 'REGON',
  'poland-iban-nrb-validator': 'IBAN',
  'poland-vat-validator': 'VAT',
  'poland-krs-inspector': 'KRS',
  'poland-postal-code-validator': 'POST',
  'poland-phone-number-validator': '+48',
  'poland-blik-code-helper': 'BLIK',
  'poland-ksef-invoice-xml-validator': 'KSeF',
  'poland-bdo-number-inspector': 'BDO',
  'poland-driving-licence-inspector': 'DL',
  'poland-eori-inspector': 'EORI',
  'poland-id-card-validator': 'ID',
  'poland-license-plate-inspector': 'PLATE',
  'poland-mrz-passport-id-parser': 'MRZ',
  'poland-municipality-code-inspector': 'TERYT',
  'poland-passport-number-inspector': 'PASS',
  'poland-vehicle-registration-certificate-helper': 'VRC',
  'poland-teryt-code-inspector': 'TERYT',
  'poland-teryt-hierarchy-explorer': 'TERYT',
  'poland-vin-validator': 'VIN',
  'poland-ceidg-readiness-checker': 'CEIDG',
  'poland-jpk-file-validator': 'JPK',
  'poland-pkd-code-inspector': 'PKD',
  'poland-pkwiu-code-inspector': 'PKWiU',
  'poland-company-onboarding-auditor': 'KYC',
  'poland-invoice-data-auditor': 'INV',
  'poland-invoice-duplicate-risk-detector': 'DUP',
  'poland-invoice-number-helper': 'INV',
  'poland-ksef-fa2-field-mapper-assistant': 'FA(2)',
  'poland-receipt-paragon-helper': 'PAR',
  'poland-tax-microaccount-calculator': 'TAX',
  'poland-vat-calculator': 'VAT',
  'poland-pln-amount-formatter': 'PLN',
  'poland-grosz-converter': 'gr',
  'poland-bank-code-inspector': 'BANK',
  'poland-bank-statement-parser': 'STMT',
  'poland-bank-transfer-reconciliation-helper': 'RECON',
  'poland-swift-bic-inspector': 'BIC',
  'poland-iban-owner-name-precheck': 'IBAN',
  'poland-payment-qr-generator': 'QR',
  'poland-sepa-transfer-helper': 'SEPA',
  'poland-split-payment-helper': 'MPP',
  'poland-transfer-title-builder': 'TITLE',
  'poland-address-formatter': 'ADDR',
  'poland-address-transliteration-normalizer': 'ASCII',
  'poland-date-locale-formatter': 'DATE',
  'poland-parcel-tracking-inspector': 'PKG',
  'poland-postal-address-parser-pro': 'ADDR',
  'poland-data-quality-workbench': 'DQ',
  'poland-pii-masker': 'PII',
  'poland-test-data-generator': 'TEST',
  'poland-compliance-checklist-generator': 'CHECK',
  'poland-energy-meter-ppe-inspector': 'PPE',
  'poland-insurance-policy-number-helper': 'POLICY',
  'poland-ocr-postprocessing-fixer': 'OCR',
  'poland-payroll-net-gross-sanity-helper': 'PAY',
  'poland-upo-edeklaracje-payload-checker': 'UPO',
  'poland-vies-readiness-helper': 'VIES'
};

function acronymFromText(value, fallback = 'ID') {
  const words = String(value || '')
    .replace(/[^A-Za-z0-9+ ]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return fallback;
  const joined = words.join('');
  if (joined.length <= 6) return joined;
  return words.slice(0, 4).map(word => word[0]).join('').toUpperCase() || fallback;
}

function getRouteIdentity(route) {
  const slug = routeSlug(route);
  return POLAND_ROUTE_IDENTITIES[slug] || acronymFromText(route.title, 'TOOL');
}

function getIdentifierIdentity(route) {
  return acronymFromText(route.metadata?.displayName || route.title, 'ID');
}

function getStandardIdentity(name, fallback = 'STD') {
  const value = String(name || '').toLowerCase();
  if (value.includes('blik')) return 'BLIK';
  if (value.includes('ksef')) return 'KSeF';
  if (value.includes('ceidg')) return 'CEIDG';
  if (value.includes('gus')) return 'GUS';
  if (value.includes('zus')) return 'ZUS';
  if (value.includes('krs')) return 'KRS';
  if (value.includes('poczta')) return 'POST';
  if (value.includes('narodowy bank') || value.includes('nbp')) return 'NBP';
  if (value.includes('iban')) return 'IBAN';
  if (value.includes('nrb')) return 'NRB';
  if (value.includes('swift') || value.includes('bic')) return 'BIC';
  if (value.includes('sepa')) return 'SEPA';
  if (value.includes('split') || value.includes('mpp')) return 'MPP';
  if (value.includes('payment qr') || value.includes('qr')) return 'QR';
  if (value.includes('pln') || value.includes('grosz')) return 'PLN';
  if (value.includes('card')) return 'CARD';
  if (value.includes('bank')) return 'BANK';
  return acronymFromText(name, fallback);
}

const POLAND_ROUTE_DESCRIPTIONS = {
  'pesel-validator': 'Validate PESEL numbers, decode birth date and gender, replay checksum math, and inspect privacy-safe diagnostics offline.',
  'poland-nip-validator': 'Validate Polish tax identifiers, inspect checksum math, mask values for logs, and build safe NIP test cases locally.',
  'poland-regon-validator': 'Check REGON 9- and 14-digit structures, explain weighted checksums, and prepare safe business-register fixtures.',
  'poland-iban-nrb-validator': 'Inspect Polish bank-account numbers, MOD-97 control digits, bank segments, branch hints, and masked account payloads.',
  'poland-vat-validator': 'Validate PL VAT syntax through the local NIP checksum, normalize country prefixes, and prepare VIES-ready test payloads.',
  'poland-krs-inspector': 'Inspect KRS registry numbers, normalize ten-digit records, and separate offline shape checks from official company status.',
  'poland-postal-code-validator': 'Normalize NN-NNN postal codes, batch-check address data, and flag format mistakes before checkout or CRM import.',
  'poland-phone-number-validator': 'Normalize +48 phone numbers, classify mobile, landline, service, and premium ranges, and prepare log-safe contact fixtures.',
  'poland-blik-code-helper': 'Check six-digit BLIK code shape, mask short-lived payment codes, and document what browser-only checks cannot prove.',
  'poland-ksef-invoice-xml-validator': 'Validate KSeF invoice XML readiness, spot required FA(2) fields, and prepare safer e-invoicing payloads before upload.',
  'poland-bdo-number-inspector': 'Inspect BDO registry-shaped numbers for waste and packaging workflows, normalize input, and separate format checks from official status.',
  'poland-driving-licence-inspector': 'Inspect Polish driving licence numbers, normalize document-shaped input, and prepare safe transport or identity fixtures.',
  'poland-eori-inspector': 'Inspect PL EORI syntax, verify NIP-like roots where possible, and separate customs-registration status from offline checks.',
  'poland-id-card-validator': 'Validate Polish ID-card number structure, explain the letter-to-number checksum, and create fictional identity-document fixtures.',
  'poland-license-plate-inspector': 'Inspect Polish license plate structure, region prefixes, serial parts, and fleet-safe masked vehicle fixtures.',
  'poland-mrz-passport-id-parser': 'Parse passport and ID-card MRZ lines, verify check digits, and extract travel-document fields without sending data anywhere.',
  'poland-municipality-code-inspector': 'Inspect municipality and voivodeship code shapes, classify administrative segments, and prepare import-safe geography keys.',
  'poland-passport-number-inspector': 'Normalize Polish passport-number input, check document-shaped syntax, and prepare masked travel-document test values.',
  'poland-vehicle-registration-certificate-helper': 'Inspect Polish vehicle registration certificate fields, normalize serial-style input, and document offline verification boundaries.',
  'poland-teryt-code-inspector': 'Classify Polish TERYT-like administrative codes, identify voivodeship prefixes, and prepare clean geography keys for data imports.',
  'poland-teryt-hierarchy-explorer': 'Explore TERYT hierarchy levels, relate voivodeship, county, and municipality codes, and prepare consistent location keys.',
  'poland-vin-validator': 'Validate VIN structure, split vehicle identity segments, and prepare masked vehicle-data diagnostics for Polish workflows.',
  'poland-ceidg-readiness-checker': 'Check whether sole-proprietor onboarding data is CEIDG-ready, normalize identifiers, and list missing business fields.',
  'poland-jpk-file-validator': 'Inspect JPK file naming and XML readiness, catch common VAT-reporting payload issues, and prepare upload-safe checks.',
  'poland-pkd-code-inspector': 'Inspect PKD activity codes, normalize section and class notation, and prepare company-classification data for onboarding flows.',
  'poland-pkwiu-code-inspector': 'Normalize PKWiU product and service classification codes, inspect dotted segments, and prepare invoice-friendly classification fields.',
  'poland-company-onboarding-auditor': 'Audit Polish company onboarding inputs across NIP, REGON, KRS, VAT, address, and banking fields before CRM import.',
  'poland-invoice-data-auditor': 'Audit Polish invoice fields for buyer, seller, VAT, dates, amounts, and identifier consistency before issuing documents.',
  'poland-invoice-duplicate-risk-detector': 'Detect duplicate-risk patterns in invoice numbers, dates, amounts, and counterparties without exposing accounting data.',
  'poland-invoice-number-helper': 'Normalize invoice-number display, extract year and sequence hints, and build search keys for billing workflows.',
  'poland-ksef-fa2-field-mapper-assistant': 'Map local invoice fields to KSeF FA(2) concepts, highlight required data, and prepare implementation notes.',
  'poland-receipt-paragon-helper': 'Inspect receipt and paragon-style fields, normalize fiscal references, and document what must remain cash-register sourced.',
  'poland-tax-microaccount-calculator': 'Check whether a NIP or PESEL-shaped source value is ready for official Polish tax microaccount workflows.',
  'poland-vat-calculator': 'Calculate Polish VAT net, gross, and tax amounts for common rates while keeping legal and tax-classification boundaries explicit.',
  'poland-pln-amount-formatter': 'Parse Polish money input, normalize PLN display, convert to integer grosz, and produce storage-safe amount fields.',
  'poland-grosz-converter': 'Convert between PLN display values and integer grosz storage values for payment, billing, and accounting payloads.',
  'poland-bank-code-inspector': 'Decode Polish NRB and IBAN bank-routing segments, explain MOD-97 checks, and mask account identifiers for developer workflows.',
  'poland-bank-statement-parser': 'Parse Polish bank-statement-like rows, normalize amounts and dates, and prepare reconciliation-friendly transaction data.',
  'poland-bank-transfer-reconciliation-helper': 'Compare transfer title, amount, account, and reference fields to spot reconciliation mismatches before import.',
  'poland-swift-bic-inspector': 'Inspect BIC/SWIFT syntax for Polish banking workflows, split bank, country, location, and branch segments, and flag non-PL routing.',
  'poland-iban-owner-name-precheck': 'Precheck IBAN and owner-name fields for formatting consistency while separating offline checks from bank ownership verification.',
  'poland-payment-qr-generator': 'Build payment QR payloads from recipient, account, amount, title, and reference fields for offline transfer testing.',
  'poland-sepa-transfer-helper': 'Check whether Polish transfer text contains the core IBAN, BIC, amount, and reference parts needed before bank execution.',
  'poland-split-payment-helper': 'Prepare split-payment MPP fields with VAT amount, gross amount, supplier NIP, and invoice reference consistency checks.',
  'poland-transfer-title-builder': 'Build Polish transfer titles, normalize reference text, and generate copy-safe payment memo variants.',
  'poland-address-formatter': 'Normalize Polish address snippets, detect postal-code and city hints, and mask address fragments before sharing logs.',
  'poland-address-transliteration-normalizer': 'Normalize Polish address text, preserve diacritics where needed, and prepare ASCII-safe variants for legacy systems.',
  'poland-date-locale-formatter': 'Parse ISO and Polish date input, render Europe/Warsaw display, and expose locale-safe date fields for interfaces.',
  'poland-parcel-tracking-inspector': 'Inspect parcel and tracking-number-like input, normalize courier references, and prepare logistics-safe masked examples.',
  'poland-postal-address-parser-pro': 'Parse Polish postal address blocks into recipient, street, building, flat, postal code, city, and country fields.',
  'poland-data-quality-workbench': 'Audit Polish records across identifiers, address, phone, tax, banking, and locale fields for quality and completeness.',
  'poland-pii-masker': 'Detect common Polish PII-like patterns in text, mask identifiers, accounts, phones, and emails, and prepare safer debug snippets.',
  'poland-test-data-generator': 'Generate fictional Polish development fixtures for checkout, identity, address, banking, and contact test scenarios.',
  'poland-compliance-checklist-generator': 'Generate implementation checklists for Polish identifiers, invoices, payments, privacy masking, and official lookup boundaries.',
  'poland-energy-meter-ppe-inspector': 'Inspect Polish PPE energy-meter identifiers, normalize utility-style input, and document offline structure limits.',
  'poland-insurance-policy-number-helper': 'Normalize Polish insurance policy references, prepare masked examples, and separate local formatting from insurer verification.',
  'poland-ocr-postprocessing-fixer': 'Clean OCR output from Polish documents, restore common diacritics and separators, and flag risky recognition artifacts.',
  'poland-payroll-net-gross-sanity-helper': 'Check Polish payroll net/gross sanity, locale decimal formatting, and copy-safe salary examples for HR workflows.',
  'poland-upo-edeklaracje-payload-checker': 'Inspect UPO and e-Deklaracje payload-shaped data, normalize references, and flag missing submission fields.',
  'poland-vies-readiness-helper': 'Prepare Polish VAT IDs for VIES-style checks, normalize PL prefixes, and document what browser-only validation cannot confirm.'
};

function getPolandRouteDescription(route) {
  return POLAND_ROUTE_DESCRIPTIONS[routeSlug(route)] || 'Run a browser-only country validation, formatting, or data-quality workflow tailored to this Polish standard.';
}

const POLAND_IDENTIFIER_DESCRIPTIONS = {
  nip: 'Tax identifier spec for Polish VAT, invoices, company onboarding, and compliance workflows.',
  pesel: 'Personal identity registry spec for PESEL birth-date encoding, gender digit, and checksum behavior.',
  regon: 'Business registry spec for REGON 9- and 14-digit structures, GUS context, and checksum math.'
};

function getPolandIdentifierDescription(route) {
  const slug = routeSlug(route);
  const key = slug || String(route.metadata?.displayName || '').toLowerCase();
  return POLAND_IDENTIFIER_DESCRIPTIONS[key] || route.metadata?.summary || 'Official identifier specification with structure, checksum, and implementation notes.';
}

function createRouteCard(route, description, tags = [], status = 'available') {
  return createInfoCard(
    route.title || 'Interactive Workbench',
    description || 'Run a browser-only country validation, formatting, or data-quality workflow.',
    getRouteIdentity(route),
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
        <small>Browser-only local workbench</small>
      </span>
      <span class="vh-country-row-arrow" aria-hidden="true">→</span>
    </a>
  `).join('\n');

  return `
    <details class="vh-country-route-group" data-country-route-group="${escapeHtml(group.key)}" ${open ? 'open' : ''}>
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
        <strong>Validate personal identifiers</strong>
        <small>Personal IDs, documents, contact and address formats</small>
      </a>
      <a class="vh-country-quick-start" href="${companyPath}">
        <strong>Validate organization identifiers</strong>
        <small>Tax, registry, company and compliance references</small>
      </a>
      <a class="vh-country-quick-start" href="${paymentPath}">
        <strong>Validate payment data</strong>
        <small>Accounts, transfers, payment references and amount formats</small>
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
      ${featured.map(route => createRouteCard(route, getPolandRouteDescription(route))).join('\n')}
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
    return createInfoCard(bank.name, bank.description, getStandardIdentity(bank.name, 'BANK'), bank.status || 'available', bank.tags || [], relatedRoute?.path || null);
  }).join('\n');
  const toolsHtml = toolRoutes.length > 0 ? `
    <div class="vh-country-subsection">
      <h3>Related banking workbenches</h3>
      <div class="vh-country-route-list vh-country-route-list-compact">
        ${toolRoutes.map(route => `
          <a class="vh-country-catalog-row" href="${route.path}">
            <span><strong>${escapeHtml(route.title)}</strong><small>${escapeHtml(getPolandRouteDescription(route))}</small></span>
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
  const countryName = model.displayName || model.name || 'Country';
  const isPoland = model.iso2 === 'PL';
  const sectionTitle = isPoland ? 'Polish account, transfer & clearing standards' : countryName + ' account, transfer & banking standards';
  const sectionDescription = isPoland
    ? 'IBAN, NRB, BIC, SEPA, Elixir-style routing context, and payment-ready developer workflows.'
    : 'IBAN, domestic account context, BIC/SWIFT, SEPA or local clearing notes, and payment-ready developer workflows.';
  return createSection('Banking Standards', sectionTitle, 'country-banking-system', sectionDescription, content);
}

export function renderCountryPaymentSystems(model, routeRegistry = null) {
  if (!model.paymentSystems || model.paymentSystems.length === 0) return '';

  const routes = getCountryValidatorRoutes(model, routeRegistry);
  const toolRoutes = findRoutes(routes, /(blik|split-payment|payment-qr|sepa|transfer-title|tax-microaccount|vat-calculator|grosz|pln-amount|iban|nrb)/).slice(0, 12);

  const cardsHtml = model.paymentSystems.map(pay => {
    const title = pay.title || pay.name;
    const relatedRoute = findCountryStandardRoute(routes, title);
    return createInfoCard(title, pay.text || pay.description, getStandardIdentity(title, 'PAY'), pay.status || 'available', pay.tags || [], relatedRoute?.path || null);
  }).join('\n');
  const toolsHtml = toolRoutes.length > 0 ? `
    <div class="vh-country-subsection">
      <h3>Related payment workbenches</h3>
      <div class="vh-country-route-list vh-country-route-list-compact">
        ${toolRoutes.map(route => `
          <a class="vh-country-catalog-row" href="${route.path}">
            <span><strong>${escapeHtml(route.title)}</strong><small>${escapeHtml(getPolandRouteDescription(route))}</small></span>
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
  const countryName = model.displayName || model.name || 'Country';
  const isPoland = model.iso2 === 'PL';
  const sectionTitle = isPoland ? 'Polish payment rails & offline helpers' : countryName + ' payment rails & offline helpers';
  const sectionDescription = isPoland
    ? 'BLIK, SEPA, split payment, payment QR, PLN amounts, VAT amounts, and transfer-reference workflows.'
    : 'Local payment systems, card context, bank transfer references, currency formatting, and browser-only payment data helpers.';
  return createSection('Payment Networks', sectionTitle, 'country-payment-systems', sectionDescription, content);
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
      getPolandIdentifierDescription(r),
      getIdentifierIdentity(r),
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
            <span><strong>${escapeHtml(route.title)}</strong><small>${escapeHtml(getPolandRouteDescription(route))}</small></span>
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
      getPolandRouteDescription(r),
      getRouteIdentity(r),
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
      getStandardIdentity(res.label || res.title, 'SRC'),
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
        getStandardIdentity(item.name, 'ID'),
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
        getStandardIdentity(item.name, 'PAY'),
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
        getStandardIdentity(item.name, 'STD'),
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
        getStandardIdentity(item.name, 'TOOL'),
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
      getCountryFlag(item.iso2 || item.slug || item.name),
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
