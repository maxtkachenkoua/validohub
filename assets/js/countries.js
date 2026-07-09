(function () {
  'use strict';

  const RESERVED_TOP_LEVEL = new Set(['tools', 'categories', 'assets']);
  const LOCALE_PATTERN = /^[a-z]{2}(?:-[a-z]{2})?$/i;

  const STATUS_LABELS = {
    ready: 'Ready',
    available: 'Available',
    comingSoon: 'Coming soon',
    planned: 'Planned',
    experimental: 'Experimental',
    deprecated: 'Deprecated'
  };

  const COUNTRY_HUBS = {
    brazil: {
      flag: '🇧🇷',
      name: 'Brazil',
      badge: 'Reference country hub',
      description: 'Developer intelligence for Brazilian identifiers, payments, banking formats, locale conventions, and official systems.',
      metadata: {
        population: '203M+',
        capital: 'Brasilia',
        largestCity: 'Sao Paulo',
        continent: 'South America',
        languages: 'Portuguese',
        currency: 'Brazilian real',
        currencyCode: 'BRL',
        currencySymbol: 'R$',
        callingCode: '+55',
        internetTld: '.br',
        drivingSide: 'Right',
        iso2: 'BR',
        iso3: 'BRA',
        isoNumeric: '076',
        locale: 'pt-BR',
        icuLocale: 'pt_BR',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '24-hour, HH:mm',
        decimalSeparator: 'Comma (,)',
        thousandsSeparator: 'Dot (.)',
        addressFormat: 'Street, number, district, city, state, CEP',
        postalCodeFormat: 'NNNNN-NNN',
        primaryTimeZone: 'UTC-03',
        utcRange: 'UTC-02 to UTC-05'
      },
      stats: [
        { icon: '👥', label: 'Population', valueKey: 'population', tags: ['people'] },
        { icon: '🏛', label: 'Capital', valueKey: 'capital', tags: ['government'] },
        { icon: '🏙', label: 'Largest city', valueKey: 'largestCity', tags: ['locale'] },
        { icon: '🌎', label: 'Continent', valueKey: 'continent', tags: ['locale'] },
        { icon: '🗣', label: 'Official language', valueKey: 'languages', tags: ['locale'] },
        { icon: '💳', label: 'Currency', valueKey: 'currencyCode', detailKey: 'currency', tags: ['currency', 'payments'] },
        { icon: '☎', label: 'Calling code', valueKey: 'callingCode', tags: ['phone'] },
        { icon: '🌐', label: 'Internet TLD', valueKey: 'internetTld', tags: ['developer'] },
        { icon: '🚗', label: 'Driving side', valueKey: 'drivingSide', tags: ['locale'] },
        { icon: '🧭', label: 'UTC range', valueKey: 'utcRange', tags: ['time'] }
      ],
      quickActions: [
        { label: 'Copy Locale', valueKey: 'locale' },
        { label: 'Copy Currency Code', valueKey: 'currencyCode' },
        { label: 'Copy Phone Code', valueKey: 'callingCode' },
        { label: 'Copy ISO2', valueKey: 'iso2' },
        { label: 'Copy ISO3', valueKey: 'iso3' },
        { label: 'Copy Numeric ISO', valueKey: 'isoNumeric' },
        { label: 'Copy Internet TLD', valueKey: 'internetTld' },
        { label: 'Copy Date Format', valueKey: 'dateFormat' },
        { label: 'Copy Postal Code Format', valueKey: 'postalCodeFormat' },
        { label: 'Copy Primary Time Zone', valueKey: 'primaryTimeZone' }
      ],
      cheatSheet: [
        { label: 'ISO2', valueKey: 'iso2', icon: '🏷', tags: ['developer', 'locale'] },
        { label: 'ISO3', valueKey: 'iso3', icon: '🏷', tags: ['developer', 'locale'] },
        { label: 'Numeric ISO', valueKey: 'isoNumeric', icon: '🏷', tags: ['developer', 'locale'] },
        { label: 'Locale', valueKey: 'locale', icon: '🌐', tags: ['locale', 'developer'] },
        { label: 'ICU locale', valueKey: 'icuLocale', icon: '🌐', tags: ['locale', 'developer'] },
        { label: 'Language', valueKey: 'languages', icon: '🗣', tags: ['locale'] },
        { label: 'Currency', value: 'Brazilian real (BRL)', copyValueKey: 'currencyCode', icon: '💳', tags: ['currency', 'payments'] },
        { label: 'Currency symbol', valueKey: 'currencySymbol', icon: '💵', tags: ['currency'] },
        { label: 'Phone country code', valueKey: 'callingCode', icon: '☎', tags: ['phone'] },
        { label: 'Internet TLD', valueKey: 'internetTld', icon: '🌐', tags: ['developer'] },
        { label: 'Date format', valueKey: 'dateFormat', icon: '📅', tags: ['locale', 'date'] },
        { label: 'Time format', valueKey: 'timeFormat', icon: '⏱', tags: ['locale', 'time'] },
        { label: 'Decimal separator', valueKey: 'decimalSeparator', copyValue: 'comma decimal separator', icon: '🔢', tags: ['locale', 'currency'] },
        { label: 'Thousands separator', valueKey: 'thousandsSeparator', copyValue: 'dot thousands separator', icon: '🔢', tags: ['locale', 'currency'] },
        { label: 'Address format', valueKey: 'addressFormat', icon: '📍', tags: ['addresses'] },
        { label: 'Postal code format', valueKey: 'postalCodeFormat', icon: '✉', tags: ['postal', 'addresses'] },
        { label: 'Primary time zone', valueKey: 'primaryTimeZone', icon: '🕒', tags: ['time'] },
        { label: 'Time zones', valueKey: 'utcRange', icon: '🕒', tags: ['time'] }
      ],
      localFormats: [
        { icon: '🧾', name: 'CPF', status: 'planned', category: 'Tax identifier', tags: ['identifiers', 'tax'], description: 'Individual taxpayer identifier. CPF numbers have 11 digits and checksum rules.', related: ['CPF Validator'] },
        { icon: '🏢', name: 'CNPJ', status: 'planned', category: 'Business identifier', tags: ['identifiers', 'tax'], description: 'Company taxpayer identifier. CNPJ numbers have 14 digits and checksum rules.', related: ['CNPJ Validator'] },
        { icon: '✉', name: 'CEP', status: 'planned', category: 'Postal', tags: ['postal', 'addresses'], description: 'Postal code format with 8 digits, commonly displayed as NNNNN-NNN.', related: ['CEP Lookup'] },
        { icon: '⚡', name: 'PIX', status: 'comingSoon', category: 'Payments', tags: ['payments', 'banking'], description: 'Instant payment ecosystem. Keys can be CPF, CNPJ, email, phone, random key, or QR payload.', related: ['PIX Workbench'] },
        { icon: '🪪', name: 'RG', status: 'planned', category: 'Identity', tags: ['identifiers', 'government'], description: 'State-issued identity document. Formats vary by issuing state.' },
        { icon: '🚗', name: 'CNH', status: 'planned', category: 'Identity', tags: ['identifiers', 'government'], description: 'Brazilian driver license identifier used in identity and mobility workflows.' },
        { icon: '🚙', name: 'RENAVAM', status: 'planned', category: 'Vehicle', tags: ['identifiers', 'government'], description: 'Vehicle registry identifier used for Brazilian vehicle records.' },
        { icon: '☎', name: 'Brazilian phone numbers', status: 'planned', category: 'Phone', tags: ['phone'], description: 'Phone numbers use country code +55, area codes, mobile prefixes, and local formatting rules.', related: ['Brazil Phone Validator'] },
        { icon: '🏦', name: 'Brazil IBAN / banking notes', status: 'ready', category: 'Banking', tags: ['banking', 'payments'], description: 'Brazil is not an IBAN-first domestic transfer market; bank, branch, account, PIX, and SWIFT/BIC context matters.' }
      ],
      payments: [
        { icon: '⚡', title: 'PIX', status: 'comingSoon', tags: ['payments', 'banking'], text: 'PIX is the central instant-payment system developers encounter in Brazilian payment flows. It can use keys or QR payloads.' },
        { icon: '🏦', title: 'Bank codes', status: 'planned', tags: ['banking'], text: 'Brazilian banking integrations often require bank code, agency/branch, account number, account type, and check digit handling.' },
        { icon: '💳', title: 'Currency', status: 'ready', tags: ['currency', 'payments'], text: 'Use BRL and display values with comma decimals and dot thousands separators for pt-BR user interfaces.' },
        { icon: '🔑', title: 'Payment identifiers', status: 'planned', tags: ['payments', 'identifiers'], text: 'CPF, CNPJ, email, phone numbers, random keys, and QR payloads can all appear in payment-related workflows.' },
        { icon: '▦', title: 'QR payments', status: 'planned', tags: ['payments'], text: 'PIX QR flows may contain static or dynamic payloads. Treat parsing and validation as separate future workbench tasks.' },
        { icon: '🌍', title: 'SWIFT/BIC notes', status: 'ready', tags: ['banking'], text: 'International transfers may involve SWIFT/BIC details, but domestic Brazilian payment UX is usually not IBAN-first.' }
      ],
      officialResources: [
        { icon: '🏦', label: 'Banco Central do Brasil', status: 'available', tags: ['government', 'payments'], note: 'Central bank and PIX ecosystem authority. Confirm the exact documentation URL before linking deep references.' },
        { icon: '🧾', label: 'Receita Federal', status: 'available', tags: ['government', 'tax', 'identifiers'], note: 'Federal tax authority for CPF and CNPJ context. Confirm exact service URLs before linking.' },
        { icon: '✉', label: 'Correios', status: 'available', tags: ['government', 'postal', 'addresses'], note: 'Postal authority for CEP-related address information. Confirm official lookup URL before linking.' },
        { icon: '🏛', label: 'Gov.br', status: 'available', tags: ['government'], note: 'Brazilian government services portal. Use as a starting point for official references.' },
        { icon: '⚡', label: 'PIX documentation', status: 'planned', tags: ['payments', 'banking'], note: 'Use official Banco Central documentation when a future PIX Workbench spec is approved.' }
      ],
      plannedWorkbenches: [
        { name: 'PIX Workbench', status: 'comingSoon', tags: ['payments', 'banking'], description: 'Inspect PIX keys and QR payloads after a dedicated product spec is approved.' },
        { name: 'CPF Validator', status: 'planned', tags: ['identifiers', 'tax'], description: 'Validate and explain CPF structure and checksum rules.' },
        { name: 'CNPJ Validator', status: 'planned', tags: ['identifiers', 'tax'], description: 'Validate and explain CNPJ structure and checksum rules.' },
        { name: 'CEP Lookup', status: 'planned', tags: ['postal', 'addresses'], description: 'Parse and explain CEP postal-code format without implying live lookup until specified.' },
        { name: 'Brazil Phone Validator', status: 'planned', tags: ['phone'], description: 'Validate Brazilian country code, area code, and local number patterns.' },
        { name: 'Brazil Banking Tools', status: 'planned', tags: ['banking', 'payments'], description: 'Developer utilities for bank code, branch, account, and check digit workflows.' }
      ],
      relatedGlobalTools: [
        { label: 'JSON Formatter', path: 'tools/json-formatter/', icon: '▣', tags: ['developer'] },
        { label: 'JWT Decoder', path: 'tools/jwt-decoder/', icon: '🔐', tags: ['developer'] },
        { label: 'Base64 Encoder', path: 'tools/base64-encoder/', icon: '⟲', tags: ['developer'] },
        { label: 'URL Encoder', path: 'tools/url-encoder/', icon: '🔗', tags: ['developer'] },
        { label: 'Regex Tester', path: 'tools/regex-tester/', icon: '.*', tags: ['developer'] },
        { label: 'IBAN Validator', path: 'tools/iban-validator/', icon: '🏦', tags: ['banking'] }
      ],
      relatedCategories: [
        { label: 'Finance', path: 'categories/finance/', tags: ['payments', 'banking'] },
        { label: 'National Identifiers', path: 'categories/national-identifiers/', tags: ['identifiers'] },
        { label: 'Developer Tools', path: 'categories/developer-tools/', tags: ['developer'] }
      ],
      futureCountryPages: [
        { label: 'Poland', status: 'available', path: 'poland/' },
        { label: 'Spain', status: 'planned' },
        { label: 'Germany', status: 'planned' },
        { label: 'France', status: 'planned' },
        { label: 'Italy', status: 'planned' },
        { label: 'United Kingdom', status: 'planned' },
        { label: 'United States', status: 'planned' },
        { label: 'Netherlands', status: 'planned' }
      ],
      highlights: [
        'Brazil commonly uses the pt-BR locale.',
        'Dates are commonly written as DD/MM/YYYY.',
        'The decimal separator is comma and the thousands separator is dot.',
        'CPF has 11 digits and CNPJ has 14 digits.',
        'CEP has 8 digits and is commonly displayed as NNNNN-NNN.',
        'PIX is the primary instant payment system.',
        'PIX keys can be CPF, CNPJ, email, phone, random key, or QR payload.',
        'Brazil is not an IBAN-first domestic transfer market.',
        'Brazilian banking integrations often require bank code, branch, account, account type, and check digit.'
      ],
      developerNotes: [
        'Use pt-BR formatting for user-facing currency, date, time, and number display.',
        'Store normalized identifiers separately from display masks when validation specs are available.',
        'Treat CPF, CNPJ, CEP, phone, and PIX payload validation as separate workflows; do not mix format checks with business verification.',
        'Confirm official references before deep-linking regulatory or government documentation.'
      ],
      developerExamples: [
        {
          title: 'Java Locale',
          language: 'java',
          code: 'Locale.forLanguageTag("pt-BR")',
          note: 'Use BCP 47 locale tags for Java formatting APIs.'
        },
        {
          title: 'JavaScript Intl Currency',
          language: 'javascript',
          code: 'new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })',
          note: 'Formats BRL values with pt-BR separators and currency display.'
        },
        {
          title: 'JavaScript Date',
          language: 'javascript',
          code: 'new Intl.DateTimeFormat("pt-BR")',
          note: 'Uses the browser Intl implementation for localized Brazilian date display.'
        },
        {
          title: 'Python locale',
          language: 'python',
          code: 'locale.setlocale(locale.LC_ALL, "pt_BR.UTF-8")',
          note: 'Requires the pt_BR locale to be installed on the host operating system.'
        },
        {
          title: 'ICU locale',
          language: 'text',
          code: 'pt_BR',
          note: 'Common ICU locale identifier for Brazilian Portuguese.'
        },
        {
          title: 'PostgreSQL formatting note',
          language: 'sql',
          code: "to_char(amount, 'FM999G999G990D00')",
          note: 'Database formatting depends on locale/session settings; prefer app-layer Intl formatting when possible.'
        },
        {
          title: 'Currency formatting note',
          language: 'text',
          code: 'BRL uses comma decimals and dot thousands separators in pt-BR display.',
          note: 'Keep stored numeric values separate from localized display strings.'
        },
        {
          title: 'Date formatting note',
          language: 'text',
          code: 'DD/MM/YYYY',
          note: 'Validate machine-readable dates separately from localized presentation.'
        }
      ],
      availableWorkbenches: {
        'Brazil Pix Validator': {
          status: 'experimental',
          tags: ['payments', 'banking'],
          description: 'Discovery page only. The PIX validator workbench is not implemented in this phase.'
        }
      }
    }
  };

  function pathParts(href) {
    try {
      const url = new URL(href, window.location.origin);
      return url.pathname.split('/').filter(Boolean);
    } catch (error) {
      return [];
    }
  }

  function isCountryHubLink(link) {
    const parts = pathParts(link.getAttribute('href') || '');
    if (parts.length !== 2 || !LOCALE_PATTERN.test(parts[0])) {
      return false;
    }
    return !RESERVED_TOP_LEVEL.has(parts[1]);
  }

  function isCurrentLink(link) {
    const target = pathParts(link.getAttribute('href') || '').join('/');
    const current = pathParts(window.location.pathname).join('/');
    return target && (current === target || current.startsWith(target + '/'));
  }

  function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    if (text !== undefined && text !== null) {
      element.textContent = text;
    }
    return element;
  }

  function createSection(eyebrow, title, className, description) {
    const section = createElement('section', `country-section ${className || ''}`.trim());
    const heading = createElement('header', 'section-heading');
    heading.append(
      createElement('span', 'eyebrow', eyebrow),
      createElement('h2', null, title)
    );
    if (description) {
      heading.appendChild(createElement('p', null, description));
    }
    section.appendChild(heading);
    return section;
  }

  function valueFor(country, item) {
    if (item.value !== undefined) {
      return item.value;
    }
    return country.metadata[item.valueKey] || '';
  }

  function copyValueFor(country, item) {
    if (item.copyValue !== undefined) {
      return item.copyValue;
    }
    if (item.copyValueKey) {
      return country.metadata[item.copyValueKey] || '';
    }
    return valueFor(country, item);
  }

  function normalizeStatus(status) {
    return status || 'planned';
  }

  function statusClass(status) {
    return normalizeStatus(status).replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`).toLowerCase();
  }

  function statusLabel(status) {
    return STATUS_LABELS[normalizeStatus(status)] || normalizeStatus(status);
  }

  function countryUrl(locale, path) {
    return `/${locale}/${path}`;
  }

  function tagsValue(tags) {
    return (tags || []).join(' ');
  }

  function applyTags(element, tags) {
    if (tags && tags.length) {
      element.dataset.countryTags = tagsValue(tags);
    }
  }

  function createStatusBadge(status) {
    const badge = createElement('span', `country-status-badge country-status-${statusClass(status)}`, statusLabel(status));
    badge.dataset.status = statusClass(status);
    return badge;
  }

  function createCopyButton(value, label) {
    if (!value) {
      return null;
    }
    const button = createElement('button', 'country-copy-button', 'Copy');
    button.type = 'button';
    button.dataset.copyValue = value;
    button.setAttribute('aria-label', `Copy ${label || value}`);
    return button;
  }

  function createCodeValue(value, label) {
    const wrapper = createElement('span', 'country-code-value');
    const text = createElement('code', null, value);
    wrapper.appendChild(text);
    const copy = createCopyButton(value, label);
    if (copy) {
      wrapper.appendChild(copy);
    }
    return wrapper;
  }

  function createMetricCard(country, item, className) {
    const value = valueFor(country, item);
    const card = createElement('article', `country-metric-card ${className || ''}`.trim());
    applyTags(card, item.tags);
    if (item.icon) {
      const icon = createElement('span', 'country-card-icon', item.icon);
      icon.setAttribute('aria-hidden', 'true');
      card.appendChild(icon);
    }
    card.appendChild(createElement('span', 'country-card-label', item.label));
    card.appendChild(createCodeValue(value, item.label));
    if (item.detailKey && country.metadata[item.detailKey]) {
      card.appendChild(createElement('span', 'country-card-detail', country.metadata[item.detailKey]));
    }
    return card;
  }

  function createHero(country) {
    const hero = createElement('header', 'country-hero');

    const main = createElement('div', 'country-hero-main');
    const flag = createElement('span', 'country-flag', country.flag);
    flag.setAttribute('aria-hidden', 'true');

    const copy = createElement('div', 'country-hero-copy');
    copy.append(
      createElement('span', 'eyebrow', 'Country Intelligence'),
      createElement('h1', null, country.name),
      createElement('p', null, country.description)
    );

    const badges = createElement('div', 'country-badge-row');
    badges.append(
      createStatusBadge('ready'),
      createStatusBadge('available'),
      createElement('span', 'country-status-badge', country.badge)
    );
    copy.appendChild(badges);
    main.append(flag, copy);

    const stats = createElement('div', 'country-summary-grid country-stats-grid');
    country.stats.forEach((item) => stats.appendChild(createMetricCard(country, item, 'country-stat-card')));

    hero.append(main, stats);
    return hero;
  }

  function createQuickActions(country) {
    const actions = (country.quickActions || [])
      .map((item) => ({ label: item.label, value: country.metadata[item.valueKey] }))
      .filter((item) => item.value);

    if (!actions.length) {
      return null;
    }

    const section = createSection('Quick actions', 'Copy common Brazil values', 'country-quick-actions', 'Fast copy controls for identifiers and locale values developers repeatedly need.');
    const bar = createElement('div', 'country-action-bar');
    actions.forEach((item) => {
      const button = createElement('button', 'country-action-button', item.label);
      button.type = 'button';
      button.dataset.copyValue = item.value;
      button.dataset.copyLabel = item.label;
      bar.appendChild(button);
    });
    section.appendChild(bar);
    return section;
  }

  function createCheatSheet(country) {
    const section = createSection('Developer cheat sheet', `${country.name} at a glance`, 'country-cheat-sheet', 'Copy-ready codes, locale formats, and implementation constants.');
    const grid = createElement('div', 'country-fact-grid');
    country.cheatSheet.forEach((item) => grid.appendChild(createMetricCard(country, item)));
    section.appendChild(grid);
    return section;
  }

  function createInfoCard(item, options) {
    const card = createElement(options.href ? 'a' : 'article', options.className || 'country-info-card');
    if (options.href) {
      card.href = options.href;
    }
    if (options.disabled) {
      card.setAttribute('aria-disabled', 'true');
      card.classList.add('is-disabled');
    }
    applyTags(card, item.tags);

    const top = createElement('div', 'country-card-top');
    const title = createElement('div', 'country-title-row');
    if (item.icon) {
      const icon = createElement('span', 'country-card-icon', item.icon);
      icon.setAttribute('aria-hidden', 'true');
      title.appendChild(icon);
    }
    title.appendChild(createElement('h3', null, item.name || item.title || item.label));
    top.appendChild(title);
    if (item.status) {
      top.appendChild(createStatusBadge(item.status));
    }
    card.appendChild(top);
    if (item.category) {
      card.appendChild(createElement('span', 'country-card-meta', item.category));
    }
    card.appendChild(createElement('p', null, item.description || item.text || item.note || options.fallbackText || ''));
    if (item.related && item.related.length) {
      const related = createElement('div', 'country-related-inline');
      item.related.forEach((label) => related.appendChild(createElement('span', 'country-mini-chip', label)));
      card.appendChild(related);
    }
    return card;
  }

  function createLocalFormats(country) {
    const section = createSection('Local formats', 'Identifiers, addresses, phones, and banking context', 'country-local-formats', 'Important Brazilian formats to account for before building validators or integrations.');
    const grid = createElement('div', 'country-card-grid');
    country.localFormats.forEach((item) => grid.appendChild(createInfoCard(item, { className: 'country-info-card' })));
    section.appendChild(grid);
    return section;
  }

  function createPayments(country) {
    const section = createSection('Payments & banking', 'Developer notes for Brazilian payment flows', 'country-payments', 'High-level context only. PIX and banking validators need separate specs before implementation.');
    const grid = createElement('div', 'country-card-grid country-card-grid-compact');
    country.payments.forEach((item) => grid.appendChild(createInfoCard(item, { className: 'country-info-card' })));
    section.appendChild(grid);
    return section;
  }

  function createOfficialResources(country) {
    const section = createSection('Official resources', 'Reference sources to confirm before implementation', 'country-resources', 'Label-only references avoid broken or guessed links while keeping the implementation path clear.');
    const grid = createElement('div', 'country-card-grid country-card-grid-compact');
    country.officialResources.forEach((item) => {
      const card = createInfoCard(item, { className: 'country-resource-card' });
      card.appendChild(createElement('span', 'country-resource-note', 'Label-only reference'));
      grid.appendChild(card);
    });
    section.appendChild(grid);
    return section;
  }

  function collectAvailableWorkbenches(stack) {
    const links = Array.from(stack.querySelectorAll('.related-section .link-card'));
    return links.map((link) => ({
      label: link.textContent.replace(/→/g, '').trim(),
      href: link.getAttribute('href') || '#'
    }));
  }

  function createAvailableWorkbenches(country, availableLinks) {
    const section = createSection('Available workbenches', `${country.name}-related pages currently in ValidoHub`, 'country-available-workbenches', 'Generated country routes that exist today. Scaffolded pages are marked clearly.');
    const grid = createElement('div', 'country-card-grid country-card-grid-compact');

    if (availableLinks.length === 0) {
      const empty = createInfoCard({
        icon: '🧭',
        name: 'No country workbenches yet',
        status: 'planned',
        description: 'Country intelligence is available now; interactive country-specific validators require their own future specs.'
      }, { className: 'country-info-card' });
      grid.appendChild(empty);
    }

    availableLinks.forEach((item) => {
      const metadata = country.availableWorkbenches[item.label] || {
        status: 'available',
        description: 'Country-related page generated from ValidoHub content.',
        tags: ['workbench']
      };
      grid.appendChild(createInfoCard({
        icon: '🧪',
        name: item.label,
        status: metadata.status,
        tags: metadata.tags || ['workbench'],
        description: metadata.description
      }, {
        className: 'country-info-card country-link-card',
        href: item.href
      }));
    });

    section.appendChild(grid);
    return section;
  }

  function createPlannedWorkbenches(country) {
    const section = createSection('Planned workbenches', `Future ${country.name} tools that need their own specs`, 'country-planned-workbenches', 'These cards are discovery markers, not inactive buttons. They do not link until a tool exists.');
    const grid = createElement('div', 'country-card-grid country-card-grid-compact');
    country.plannedWorkbenches.forEach((item) => {
      grid.appendChild(createInfoCard({
        icon: '🧩',
        name: item.name,
        status: item.status,
        tags: item.tags,
        description: item.description
      }, {
        className: 'country-info-card country-future-card',
        disabled: true
      }));
    });
    section.appendChild(grid);
    return section;
  }

  function createRelatedGlobalTools(country, locale) {
    const section = createSection('Related global tools', `Useful general-purpose tools for ${country.name} integrations`, 'country-related-global');
    const grid = createElement('div', 'country-card-grid country-card-grid-compact');
    country.relatedGlobalTools.forEach((item) => {
      grid.appendChild(createInfoCard({
        icon: item.icon,
        name: item.label,
        status: 'available',
        tags: item.tags,
        description: 'Open the global tool.'
      }, {
        className: 'country-info-card country-link-card',
        href: countryUrl(locale, item.path)
      }));
    });
    section.appendChild(grid);
    return section;
  }

  function createDiscoveryLinks(country, locale) {
    const section = createSection('Discovery links', 'Related categories and future country hubs', 'country-discovery-links', 'Internal paths are linked only when they exist; future country hubs stay as non-link cards.');
    const grid = createElement('div', 'country-card-grid country-card-grid-compact');

    country.relatedCategories.forEach((item) => {
      grid.appendChild(createInfoCard({
        icon: '🏷',
        name: item.label,
        status: 'available',
        tags: item.tags,
        description: 'Browse related ValidoHub category.'
      }, {
        className: 'country-info-card country-link-card',
        href: countryUrl(locale, item.path)
      }));
    });

    country.futureCountryPages.forEach((item) => {
      grid.appendChild(createInfoCard({
        icon: '🌍',
        name: item.label,
        status: item.status,
        tags: ['country'],
        description: item.status === 'available' ? 'Open the country hub.' : 'Future country hub candidate.'
      }, {
        className: item.path ? 'country-info-card country-link-card' : 'country-info-card country-future-card',
        href: item.path ? countryUrl(locale, item.path) : null,
        disabled: !item.path
      }));
    });

    section.appendChild(grid);
    return section;
  }

  function createHighlights(country) {
    const section = createSection('Things developers should know', `${country.name} implementation highlights`, 'country-highlights');
    const list = createElement('ul', 'country-highlight-list');
    country.highlights.forEach((note) => list.appendChild(createElement('li', null, note)));
    section.appendChild(list);
    return section;
  }

  function createDeveloperNotes(country) {
    const section = createSection('Developer notes', `Practical ${country.name} implementation reminders`, 'country-developer-notes');
    const list = createElement('ul', 'country-note-list');
    country.developerNotes.forEach((note) => list.appendChild(createElement('li', null, note)));
    section.appendChild(list);
    return section;
  }

  function createDeveloperExamples(country) {
    const section = createSection('Developer examples', `Copy-ready ${country.name} locale snippets`, 'country-developer-examples', 'Examples only. No runtime execution.');
    const grid = createElement('div', 'country-code-grid');
    country.developerExamples.forEach((item) => {
      const card = createElement('article', 'country-code-card');
      applyTags(card, ['developer', 'locale']);
      const top = createElement('div', 'country-card-top');
      top.append(
        createElement('h3', null, item.title),
        createElement('span', 'country-card-meta', item.language)
      );
      const pre = createElement('pre', 'country-code-block');
      const code = createElement('code', null, item.code);
      pre.appendChild(code);
      const copy = createCopyButton(item.code, item.title);
      card.append(top, pre);
      if (copy) {
        card.appendChild(copy);
      }
      card.appendChild(createElement('p', null, item.note));
      grid.appendChild(card);
    });
    section.appendChild(grid);
    return section;
  }

  function createAdSlot(name) {
    const slot = createElement('aside', 'country-ad-slot country-ad-slot-disabled');
    slot.hidden = true;
    slot.setAttribute('aria-hidden', 'true');
    slot.dataset.adSlot = name;
    return slot;
  }

  function createCopyAnnouncer() {
    const announcer = createElement('div', 'country-copy-announcer');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('role', 'status');
    return announcer;
  }

  function copyText(value) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(value);
    }
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-1000px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    return Promise.resolve();
  }

  function bindCopyControls(root) {
    const announcer = root.querySelector('.country-copy-announcer');
    root.addEventListener('click', (event) => {
      const button = event.target.closest('[data-copy-value]');
      if (!button || !root.contains(button)) {
        return;
      }
      const value = button.dataset.copyValue || '';
      if (!value) {
        return;
      }
      copyText(value)
        .then(() => {
          const original = button.textContent;
          button.textContent = 'Copied';
          if (announcer) {
            announcer.textContent = `Copied ${button.dataset.copyLabel || value}`;
          }
          window.setTimeout(() => {
            button.textContent = original;
          }, 1300);
        })
        .catch(() => {
          if (announcer) {
            announcer.textContent = 'Copy failed. Select the value manually.';
          }
        });
    });
  }

  function renderCountryHub(stack, locale, country) {
    if (!stack || stack.dataset.countryHubRendered === 'true') {
      return;
    }

    const availableLinks = collectAvailableWorkbenches(stack);
    const breadcrumbs = stack.querySelector('.breadcrumbs');
    Array.from(stack.children).forEach((child) => {
      if (child !== breadcrumbs) {
        child.remove();
      }
    });

    stack.classList.add('country-hub-page');
    stack.append(
      createHero(country),
      createQuickActions(country),
      createAdSlot('country-hub-after-hero'),
      createCheatSheet(country),
      createLocalFormats(country),
      createPayments(country),
      createOfficialResources(country),
      createAvailableWorkbenches(country, availableLinks),
      createPlannedWorkbenches(country),
      createRelatedGlobalTools(country, locale),
      createDiscoveryLinks(country, locale),
      createHighlights(country),
      createDeveloperNotes(country),
      createDeveloperExamples(country),
      createAdSlot('country-hub-before-footer'),
      createCopyAnnouncer()
    );
    bindCopyControls(stack);
    stack.dataset.countryHubRendered = 'true';
  }

  function enhanceCountryHubPage() {
    const parts = pathParts(window.location.pathname);
    if (parts.length !== 2 || !LOCALE_PATTERN.test(parts[0])) {
      return;
    }

    const country = COUNTRY_HUBS[parts[1]];
    if (!country) {
      return;
    }

    renderCountryHub(document.querySelector('.page-stack'), parts[0], country);
  }

  function enhanceCountriesNavigation(nav) {
    if (!nav || nav.dataset.countriesEnhanced === 'true') {
      return;
    }

    const countryLinks = Array.from(nav.querySelectorAll('a')).filter(isCountryHubLink);
    if (countryLinks.length === 0) {
      return;
    }

    const menu = document.createElement('details');
    menu.className = 'countries-menu';
    menu.dataset.countryCount = String(countryLinks.length);

    const summary = document.createElement('summary');
    summary.textContent = 'Countries';
    summary.setAttribute('aria-label', 'Browse country tools');

    if (countryLinks.some(isCurrentLink)) {
      summary.classList.add('is-active');
    }

    const panel = document.createElement('div');
    panel.className = 'countries-menu-panel';
    panel.setAttribute('role', 'list');

    countryLinks
      .map((link) => {
        const cloned = link.cloneNode(true);
        cloned.classList.toggle('is-active', isCurrentLink(cloned));
        cloned.setAttribute('role', 'listitem');
        return { original: link, cloned };
      })
      .sort((left, right) => left.cloned.textContent.trim().localeCompare(right.cloned.textContent.trim()))
      .forEach(({ original, cloned }) => {
        panel.appendChild(cloned);
        original.remove();
      });

    menu.append(summary, panel);

    const homeLink = Array.from(nav.querySelectorAll('a')).find((link) => {
      const parts = pathParts(link.getAttribute('href') || '');
      return parts.length === 1 && LOCALE_PATTERN.test(parts[0]);
    });

    if (homeLink && homeLink.nextSibling) {
      nav.insertBefore(menu, homeLink.nextSibling);
    } else {
      nav.appendChild(menu);
    }

    nav.dataset.countriesEnhanced = 'true';

    document.addEventListener('click', (event) => {
      if (!menu.contains(event.target)) {
        menu.removeAttribute('open');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        menu.removeAttribute('open');
        summary.focus();
      }
    });
  }

  function initCountriesPlatform() {
    document.querySelectorAll('.primary-nav').forEach(enhanceCountriesNavigation);
    enhanceCountryHubPage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCountriesPlatform);
  } else {
    initCountriesPlatform();
  }
}());
