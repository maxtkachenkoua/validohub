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
  
  const statusBadge = status 
    ? `<span class="vh-country-status-badge vh-country-status-${status.toLowerCase() === 'ready' ? 'ready' : (status.toLowerCase() === 'available' ? 'ready' : 'in-progress')}">${escapeHtml(status)}</span>`
    : '';

  const iconBlock = icon ? `<span class="vh-country-card-icon" aria-hidden="true">${icon}</span>` : '';
  
  const relatedChips = related.length > 0
    ? `<div class="vh-country-badge-row">${related.map(r => `<span class="vh-country-status-badge vh-custom-badge">${escapeHtml(r)}</span>`).join('')}</div>`
    : '';

  const html = `
    <${tag} class="vh-country-info-card ${disabledClass}" ${hrefAttr}>
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
    { label: 'Locale', val: model.locale },
    { label: 'ISO-2', val: model.iso2 },
    { label: 'Calling Code', val: model.callingCode },
    { label: 'TLD', val: model.internetTld },
    { label: 'Postal Pattern', val: model.postalCode }
  ].filter(i => i.val);

  if (items.length === 0) return '';

  const buttonsHtml = items.map(item => `
    <button class="vh-country-action-button" type="button" data-copy-value="${escapeHtml(item.val)}" data-copy-label="${escapeHtml(item.label)}">
      Copy ${escapeHtml(item.label)}
    </button>
  `).join('\n');

  const content = `
    <div class="vh-country-action-bar">
      ${buttonsHtml}
    </div>
  `;
  return createSection('Developer Actions', 'Copy common developer values', 'country-quick-actions', 'Fast one-click copy buttons for constants and configurations.', content);
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
  return createSection('Address Standards', 'Structured address formatting', 'country-address-format', 'Polish display guidelines, fields sequence, and postal layout regulations.', content);
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

export function renderCountryBankingSystem(model) {
  if (!model.bankingSystem || model.bankingSystem.length === 0) return '';

  const cardsHtml = model.bankingSystem.map(bank => createInfoCard(bank.name, bank.description, '🏦', bank.status || 'available', bank.tags || [])).join('\n');

  const content = `
    <div class="vh-country-card-grid-compact">
      ${cardsHtml}
    </div>
  `;
  return createSection('Banking Standards', 'National banking routing structures', 'country-banking-system', 'Clearance rails, SWIFT transfers, and account layouts.', content);
}

export function renderCountryPaymentSystems(model) {
  if (!model.paymentSystems || model.paymentSystems.length === 0) return '';

  const cardsHtml = model.paymentSystems.map(pay => createInfoCard(pay.title || pay.name, pay.text || pay.description, '💳', pay.status || 'available', pay.tags || [])).join('\n');

  const content = `
    <div class="vh-country-card-grid-compact">
      ${cardsHtml}
    </div>
  `;
  return createSection('Payment Networks', 'Supported payment networks and tools', 'country-payment-systems', 'Instant mobile tokens, clearing loops, and card network parameters.', content);
}

// 7. National Identifiers & Validators
export function renderCountryIdentifiers(model, routeRegistry) {
  if (!model.identifiers || model.identifiers.length === 0) return '';

  const idRoutes = routeRegistry.getAll().filter(r => r.type === 'identifier' && r.metadata.countryCode === model.iso2);
  if (idRoutes.length === 0) return '';

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

  const content = `
    <div class="vh-country-card-grid-compact">
      ${cardsHtml}
    </div>
  `;
  return createSection('National Identifiers', 'National Identifiers Registry Specs', 'country-identifiers-specs', 'Detailed checksum formulas and format rules for official country identifiers.', content);
}

export function renderCountryValidators(model, routeRegistry) {
  if (!model.validators || model.validators.length === 0) return '';

  const valRoutes = routeRegistry.getAll().filter(r => r.type === 'validator' && r.path.startsWith(`/en/${model.slug}/`));

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
    const badge = `<span class="vh-country-visual-caption">Label-only reference source</span>`;
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
