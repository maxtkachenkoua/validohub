(function () {
  'use strict';

  const RESERVED_TOP_LEVEL = new Set(['tools', 'categories', 'assets']);
  const LOCALE_PATTERN = /^[a-z]{2}(?:-[a-z]{2})?$/i;

  const COUNTRY_HUBS = {
    brazil: {
      flag: '🇧🇷',
      name: 'Brazil',
      badge: 'Reference country hub',
      description: 'Developer intelligence for Brazilian identifiers, payments, banking formats, locale conventions, and official systems.',
      summary: [
        { label: 'Locale', value: 'pt-BR' },
        { label: 'Currency', value: 'BRL' },
        { label: 'Phone code', value: '+55' },
        { label: 'Primary zone', value: 'UTC-03' }
      ],
      cheatSheet: [
        { label: 'ISO2', value: 'BR' },
        { label: 'ISO3', value: 'BRA' },
        { label: 'Numeric ISO', value: '076' },
        { label: 'Locale', value: 'pt-BR' },
        { label: 'Language', value: 'Portuguese (Brazil)' },
        { label: 'Currency', value: 'Brazilian real (BRL)' },
        { label: 'Currency symbol', value: 'R$' },
        { label: 'Phone country code', value: '+55' },
        { label: 'Internet TLD', value: '.br' },
        { label: 'Date format', value: 'DD/MM/YYYY' },
        { label: 'Time format', value: '24-hour, HH:mm' },
        { label: 'Decimal separator', value: 'Comma (,)' },
        { label: 'Thousands separator', value: 'Dot (.)' },
        { label: 'Address format', value: 'Street, number, district, city, state, CEP' },
        { label: 'Postal code format', value: 'NNNNN-NNN' },
        { label: 'Time zones', value: 'UTC-02, UTC-03, UTC-04, UTC-05' }
      ],
      localFormats: [
        { name: 'CPF', status: 'Planned', description: 'Individual taxpayer identifier. CPF numbers have 11 digits and checksum rules.' },
        { name: 'CNPJ', status: 'Planned', description: 'Company taxpayer identifier. CNPJ numbers have 14 digits and checksum rules.' },
        { name: 'CEP', status: 'Planned', description: 'Postal code format with 8 digits, commonly displayed as NNNNN-NNN.' },
        { name: 'PIX', status: 'Coming soon', description: 'Instant payment ecosystem. Keys can be CPF, CNPJ, email, phone, random key, or QR payload.' },
        { name: 'RG', status: 'Planned', description: 'State-issued identity document. Formats vary by issuing state.' },
        { name: 'CNH', status: 'Planned', description: 'Brazilian driver license identifier used in identity and mobility workflows.' },
        { name: 'RENAVAM', status: 'Planned', description: 'Vehicle registry identifier used for Brazilian vehicle records.' },
        { name: 'Brazilian phone numbers', status: 'Planned', description: 'Phone numbers use country code +55, area codes, mobile prefixes, and local formatting rules.' },
        { name: 'Brazil IBAN / banking notes', status: 'Ready', description: 'Brazil is not an IBAN-first domestic transfer market; bank, branch, account, PIX, and SWIFT/BIC context matters.' }
      ],
      payments: [
        { title: 'PIX', text: 'PIX is the central instant-payment system developers encounter in Brazilian payment flows. It can use keys or QR payloads.' },
        { title: 'Bank codes', text: 'Brazilian banking integrations often require bank code, agency/branch, account number, account type, and check digit handling.' },
        { title: 'Currency', text: 'Use BRL and display values with comma decimals and dot thousands separators for pt-BR user interfaces.' },
        { title: 'Payment identifiers', text: 'CPF, CNPJ, email, phone numbers, random keys, and QR payloads can all appear in payment-related workflows.' },
        { title: 'QR payments', text: 'PIX QR flows may contain static or dynamic payloads. Treat parsing and validation as separate future workbench tasks.' },
        { title: 'SWIFT/BIC notes', text: 'International transfers may involve SWIFT/BIC details, but domestic Brazilian payment UX is usually not IBAN-first.' }
      ],
      officialResources: [
        { label: 'Banco Central do Brasil', note: 'Central bank and PIX ecosystem authority. Confirm the exact documentation URL before linking deep references.' },
        { label: 'Receita Federal', note: 'Federal tax authority for CPF and CNPJ context. Confirm exact service URLs before linking.' },
        { label: 'Correios', note: 'Postal authority for CEP-related address information. Confirm official lookup URL before linking.' },
        { label: 'Gov.br', note: 'Brazilian government services portal. Use as a starting point for official references.' },
        { label: 'PIX documentation', note: 'Use official Banco Central documentation when a future PIX Workbench spec is approved.' }
      ],
      plannedWorkbenches: [
        'PIX Workbench',
        'CPF Validator',
        'CNPJ Validator',
        'CEP Lookup',
        'Brazil Phone Validator',
        'Brazil Banking Tools'
      ],
      relatedGlobalTools: [
        { label: 'JSON Formatter', path: 'tools/json-formatter/' },
        { label: 'JWT Decoder', path: 'tools/jwt-decoder/' },
        { label: 'Base64 Encoder', path: 'tools/base64-encoder/' },
        { label: 'URL Encoder', path: 'tools/url-encoder/' },
        { label: 'Regex Tester', path: 'tools/regex-tester/' },
        { label: 'IBAN Validator', path: 'tools/iban-validator/' }
      ],
      developerNotes: [
        'Brazil commonly uses the pt-BR locale.',
        'Dates are commonly written as DD/MM/YYYY.',
        'The decimal separator is comma and the thousands separator is dot.',
        'CPF has 11 digits and CNPJ has 14 digits.',
        'CEP has 8 digits and is commonly displayed as NNNNN-NNN.',
        'PIX keys can be CPF, CNPJ, email, phone number, random key, or QR payload.'
      ],
      availableWorkbenches: {
        'Brazil Pix Validator': {
          status: 'Content scaffold',
          description: 'The page exists for Brazil discovery, but the PIX validator workbench is not implemented in this phase.'
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

  function createSection(eyebrow, title, className) {
    const section = createElement('section', `country-section ${className || ''}`.trim());
    const heading = createElement('div', 'section-heading');
    heading.append(
      createElement('span', 'eyebrow', eyebrow),
      createElement('h2', null, title)
    );
    section.appendChild(heading);
    return section;
  }

  function statusClass(status) {
    return status.toLowerCase().replace(/\s+/g, '-');
  }

  function countryUrl(locale, path) {
    return `/${locale}/${path}`;
  }

  function createMetricCard(item) {
    const card = createElement('article', 'country-metric-card');
    card.append(
      createElement('span', 'country-card-label', item.label),
      createElement('strong', null, item.value)
    );
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
      createElement('span', 'country-status-badge country-status-ready', country.badge),
      createElement('span', 'country-status-badge', 'Locale-first routes'),
      createElement('span', 'country-status-badge', 'Browser-only platform')
    );
    copy.appendChild(badges);
    main.append(flag, copy);

    const summary = createElement('div', 'country-summary-grid');
    country.summary.forEach((item) => summary.appendChild(createMetricCard(item)));

    hero.append(main, summary);
    return hero;
  }

  function createCheatSheet(country) {
    const section = createSection('Developer cheat sheet', 'Brazil at a glance', 'country-cheat-sheet');
    const grid = createElement('div', 'country-fact-grid');
    country.cheatSheet.forEach((item) => grid.appendChild(createMetricCard(item)));
    section.appendChild(grid);
    return section;
  }

  function createLocalFormats(country) {
    const section = createSection('Local formats', 'Identifiers, addresses, phones, and banking context', 'country-local-formats');
    const grid = createElement('div', 'country-card-grid');
    country.localFormats.forEach((item) => {
      const card = createElement('article', 'country-info-card');
      const top = createElement('div', 'country-card-top');
      top.append(
        createElement('h3', null, item.name),
        createElement('span', `country-status-badge country-status-${statusClass(item.status)}`, item.status)
      );
      card.append(top, createElement('p', null, item.description));
      grid.appendChild(card);
    });
    section.appendChild(grid);
    return section;
  }

  function createPayments(country) {
    const section = createSection('Payments & banking', 'Developer notes for Brazilian payment flows', 'country-payments');
    const grid = createElement('div', 'country-card-grid country-card-grid-compact');
    country.payments.forEach((item) => {
      const card = createElement('article', 'country-info-card');
      card.append(createElement('h3', null, item.title), createElement('p', null, item.text));
      grid.appendChild(card);
    });
    section.appendChild(grid);
    return section;
  }

  function createOfficialResources(country) {
    const section = createSection('Official resources', 'Reference sources to confirm before implementation', 'country-resources');
    const grid = createElement('div', 'country-card-grid country-card-grid-compact');
    country.officialResources.forEach((item) => {
      const card = createElement('article', 'country-resource-card');
      card.append(
        createElement('h3', null, item.label),
        createElement('p', null, item.note),
        createElement('span', 'country-resource-note', 'Label-only reference')
      );
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
    const section = createSection('Available workbenches', 'Brazil-related pages currently in ValidoHub', 'country-available-workbenches');
    const grid = createElement('div', 'country-card-grid country-card-grid-compact');

    if (availableLinks.length === 0) {
      const empty = createElement('article', 'country-info-card');
      empty.append(
        createElement('h3', null, 'No country workbenches yet'),
        createElement('p', null, 'Country intelligence is available now; interactive country-specific validators require their own future specs.')
      );
      grid.appendChild(empty);
    }

    availableLinks.forEach((item) => {
      const metadata = country.availableWorkbenches[item.label] || {
        status: 'Available',
        description: 'Country-related page generated from ValidoHub content.'
      };
      const card = createElement('a', 'country-info-card country-link-card');
      card.href = item.href;
      const top = createElement('div', 'country-card-top');
      top.append(
        createElement('h3', null, item.label),
        createElement('span', 'country-status-badge country-status-coming-soon', metadata.status)
      );
      card.append(top, createElement('p', null, metadata.description));
      grid.appendChild(card);
    });

    section.appendChild(grid);
    return section;
  }

  function createPlannedWorkbenches(country) {
    const section = createSection('Planned workbenches', 'Future Brazil tools that need their own specs', 'country-planned-workbenches');
    const list = createElement('div', 'country-pill-grid');
    country.plannedWorkbenches.forEach((name) => {
      const item = createElement('span', 'country-plan-pill', name);
      list.appendChild(item);
    });
    section.appendChild(list);
    return section;
  }

  function createRelatedGlobalTools(country, locale) {
    const section = createSection('Related global tools', 'Useful general-purpose tools for Brazil integrations', 'country-related-global');
    const grid = createElement('div', 'country-card-grid country-card-grid-compact');
    country.relatedGlobalTools.forEach((item) => {
      const link = createElement('a', 'country-info-card country-link-card');
      link.href = countryUrl(locale, item.path);
      link.append(createElement('h3', null, item.label), createElement('p', null, 'Open the global tool.'));
      grid.appendChild(link);
    });
    section.appendChild(grid);
    return section;
  }

  function createDeveloperNotes(country) {
    const section = createSection('Developer notes', 'Practical Brazil implementation reminders', 'country-developer-notes');
    const list = createElement('ul', 'country-note-list');
    country.developerNotes.forEach((note) => list.appendChild(createElement('li', null, note)));
    section.appendChild(list);
    return section;
  }

  function createAdSlot(name) {
    const slot = createElement('aside', 'country-ad-slot country-ad-slot-disabled');
    slot.hidden = true;
    slot.setAttribute('aria-hidden', 'true');
    slot.dataset.adSlot = name;
    return slot;
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
      createAdSlot('country-hub-after-hero'),
      createCheatSheet(country),
      createLocalFormats(country),
      createPayments(country),
      createOfficialResources(country),
      createAvailableWorkbenches(country, availableLinks),
      createPlannedWorkbenches(country),
      createRelatedGlobalTools(country, locale),
      createDeveloperNotes(country),
      createAdSlot('country-hub-before-footer')
    );
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
