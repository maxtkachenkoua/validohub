(function () {
  'use strict';

  const FALLBACK_LOCALE = 'en';
  const FEATURE_LABELS = {
    payments: 'Payments',
    identity: 'Identity',
    government: 'Government',
    banking: 'Banking'
  };
  const STATUS_LABELS = {
    available: 'Available',
    inProgress: 'In Progress',
    planned: 'Planned'
  };
  const CONTINENT_ORDER = ['South America', 'Europe', 'North America', 'Asia', 'Africa', 'Oceania'];
  const CONTINENT_ICONS = {
    'South America': 'South America',
    Europe: 'Europe',
    'North America': 'North America',
    Asia: 'Asia',
    Africa: 'Africa',
    Oceania: 'Oceania'
  };
  const BRAND_KEYS = {
    pix: 'pix',
    iban: 'iban',
    swift: 'swift',
    sepa: 'sepa',
    bizum: 'bizum',
    vies: 'vies'
  };

  function helpers() {
    return window.ValidoHubCountries || {};
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

  function normalize(value) {
    return String(value || '').trim().toLowerCase();
  }

  function slugFromPath(pathname) {
    const pathParts = helpers().pathParts || ((href) => {
      try {
        return new URL(href, window.location.origin).pathname.split('/').filter(Boolean);
      } catch (error) {
        return [];
      }
    });
    const parts = pathParts(pathname);
    if (parts.length !== 2) {
      return '';
    }
    const reserved = helpers().reservedTopLevel || new Set(['tools', 'categories', 'assets', 'countries']);
    return reserved.has(parts[1]) ? '' : parts[1];
  }

  function discoverAvailableHubs() {
    const hubs = new Map();
    document.querySelectorAll('a[href]').forEach((link) => {
      const slug = slugFromPath(link.getAttribute('href') || '');
      if (!slug || hubs.has(slug)) {
        return;
      }
      const href = new URL(link.getAttribute('href'), window.location.origin).pathname;
      hubs.set(slug, href);
    });
    return hubs;
  }

  function localeFromPath() {
    const parts = window.location.pathname.split('/').filter(Boolean);
    const localePattern = helpers().localePattern || /^[a-z]{2}(?:-[a-z]{2})?$/i;
    return parts.length && localePattern.test(parts[0]) ? parts[0] : FALLBACK_LOCALE;
  }

  function enrichCountries(catalog, availableHubs, locale) {
    return catalog.map((country) => {
      const hubPath = availableHubs.get(country.id);
      const available = Boolean(hubPath);
      const status = available ? (country.status === 'planned' ? 'available' : country.status) : country.status;
      return {
        ...country,
        href: hubPath || `/${locale}/${country.id}/`,
        hasHub: available,
        status,
        searchable: [
          country.name,
          country.nativeName,
          country.iso2,
          country.iso3,
          country.currency,
          country.currencyName,
          country.language,
          country.continent,
          country.region,
          ...(country.identifiers || []),
          ...(country.payments || []),
          ...(country.features || [])
        ].map(normalize).join(' ')
      };
    });
  }

  function createBadge(text, className) {
    return createElement('span', `country-status-badge ${className || ''}`.trim(), text);
  }

  function createBrandChip(label) {
    const key = BRAND_KEYS[normalize(label)];
    if (key && window.ValidoHubBrands && typeof window.ValidoHubBrands.createBrandMark === 'function') {
      return window.ValidoHubBrands.createBrandMark(key, { label });
    }
    return createElement('span', 'country-mini-chip', label);
  }

  function progressValue(country) {
    const raw = Number(country.completion);
    if (Number.isFinite(raw)) {
      return Math.max(0, Math.min(100, raw));
    }
    const available = (country.availableWorkbenches || []).length;
    const planned = (country.plannedWorkbenches || []).length;
    return available + planned ? Math.round((available / (available + planned)) * 100) : 0;
  }

  function progressLabel(country) {
    const value = progressValue(country);
    return `${value}%`;
  }

  function createProgress(country) {
    const value = progressValue(country);
    const wrapper = createElement('div', 'countries-progress');
    const meta = createElement('div', 'countries-progress-meta');
    meta.append(createElement('span', null, 'Completion'), createElement('strong', null, `${value}%`));
    const bar = createElement('div', 'countries-progress-bar');
    const fill = createElement('span');
    fill.style.width = `${value}%`;
    bar.appendChild(fill);
    wrapper.append(meta, bar);
    return wrapper;
  }

  function createCountryCard(country) {
    const tagName = country.hasHub ? 'a' : 'article';
    const card = createElement(tagName, `countries-card status-${country.status}`);
    card.dataset.countryId = country.id;
    card.dataset.region = country.region;
    card.dataset.status = country.status;
    card.dataset.features = (country.features || []).join(' ');
    card.dataset.search = country.searchable;
    card.dataset.accent = country.id;
    if (country.hasHub) {
      card.href = country.href;
      card.setAttribute('aria-label', `Open ${country.name} country hub`);
    } else {
      card.tabIndex = 0;
      card.setAttribute('aria-label', `${country.name} country hub coming soon`);
    }

    const top = createElement('div', 'countries-card-top');
    const identity = createElement('div', 'countries-card-identity');
    identity.append(createElement('span', 'countries-flag', country.flag), createElement('h3', null, country.name));
    const badges = createElement('div', 'countries-card-badges');
    badges.append(createBadge(country.iso2, 'countries-code-badge'));
    badges.append(createBadge(STATUS_LABELS[country.status] || country.status, `country-status-${country.status === 'inProgress' ? 'experimental' : country.status}`));
    if (country.reference) {
      badges.append(createBadge('⭐ Reference Implementation', 'country-status-ready countries-reference-badge'));
    } else if (country.status !== 'available') {
      badges.append(createBadge('Future', 'country-status-planned'));
    }
    top.append(identity, badges);

    const facts = createElement('dl', 'countries-card-facts');
    [
      ['Language', country.language],
      ['Currency', `${country.currency} · ${country.currencyName}`],
      ['Region', country.region]
    ].forEach(([label, value]) => {
      const item = createElement('div');
      item.append(createElement('dt', null, label), createElement('dd', null, value));
      facts.appendChild(item);
    });

    const metrics = createElement('div', 'countries-card-metrics');
    metrics.append(
      createElement('span', null, `${(country.availableWorkbenches || []).length} available`),
      createElement('span', null, `${(country.plannedWorkbenches || []).length} planned`)
    );

    const chips = createElement('div', 'countries-chip-row');
    (country.identifiers || []).slice(0, 4).forEach((item) => chips.appendChild(createElement('span', 'country-mini-chip', item)));
    (country.payments || []).slice(0, 3).forEach((item) => chips.appendChild(createBrandChip(item)));

    card.append(
      top,
      createElement('p', null, country.summary),
      facts,
      metrics,
      createProgress(country),
      chips
    );
    return card;
  }

  function createPreview(country) {
    const preview = createElement('aside', 'countries-preview-panel');
    preview.dataset.previewCountry = country.id;
    preview.append(
      createElement('span', 'eyebrow', 'Country Preview'),
      createElement('div', 'countries-preview-flag', country.flag),
      createElement('h2', null, country.name),
      createElement('p', null, country.summary)
    );

    const facts = createElement('dl', 'countries-preview-list');
    [
      ['ISO', `${country.iso2} / ${country.iso3}`],
      ['Language', country.language],
      ['Currency', `${country.currency} · ${country.currencyName}`],
      ['Identifiers', (country.identifiers || []).join(', ') || 'Planned'],
      ['Payments', (country.payments || []).join(', ') || 'Planned'],
      ['Available tools', (country.availableWorkbenches || []).join(', ') || 'None yet']
    ].forEach(([label, value]) => {
      const row = createElement('div');
      row.append(createElement('dt', null, label), createElement('dd', null, value));
      facts.appendChild(row);
    });

    const action = country.hasHub
      ? createElement('a', 'countries-preview-action', `Open ${country.name}`)
      : createElement('span', 'countries-preview-action is-muted', 'Coming Soon');
    if (country.hasHub) {
      action.href = country.href;
    }

    preview.append(facts, createProgress(country), action);
    return preview;
  }

  function createHero(countries) {
    const available = countries.filter((country) => country.hasHub).length;
    const planned = countries.filter((country) => !country.hasHub).length;
    const workbenchCount = countries.reduce((total, country) => total + (country.availableWorkbenches || []).length + (country.plannedWorkbenches || []).length, 0);
    const identifiersCount = new Set(countries.flatMap((country) => country.identifiers || [])).size;
    const paymentCount = new Set(countries.flatMap((country) => country.payments || [])).size;
    const brandCount = window.ValidoHubBrands && window.ValidoHubBrands.registry
      ? Object.keys(window.ValidoHubBrands.registry).length
      : 0;
    const hero = createElement('header', 'countries-portal-hero');
    const copy = createElement('div', 'countries-portal-hero-copy');
    copy.append(
      createElement('span', 'eyebrow', 'Countries'),
      createElement('h1', null, 'Build country-aware software with confidence.'),
      createElement('p', null, 'Developer intelligence for validation, localization, identifiers, payments, banking standards, and country-specific implementation guidance.')
    );
    const stats = createElement('div', 'countries-hero-stats');
    [
      [String(countries.length), 'Countries'],
      [String(workbenchCount), 'Workbenches'],
      [String(identifiersCount), 'Identifier rules'],
      [String(paymentCount), 'Payment systems'],
      [String(available), 'Developer guides'],
      [String(brandCount), 'Brand assets']
    ].forEach(([value, label]) => {
      const item = createElement('div');
      item.append(createElement('strong', null, value), createElement('span', null, label));
      stats.appendChild(item);
    });
    const badges = createElement('div', 'country-badge-row');
    badges.append(
      createBadge('Browser-first', 'country-status-ready'),
      createBadge(`${planned} roadmap countries`, 'country-status-planned'),
      createBadge('ValidoHub-owned UX', 'country-status-available')
    );
    copy.append(badges);
    hero.append(copy, stats);
    return hero;
  }

  function createControls(countries) {
    const panel = createElement('section', 'countries-controls');
    const searchLabel = createElement('label', 'countries-search');
    searchLabel.append(
      createElement('span', null, 'Search countries'),
      createElement('input')
    );
    const input = searchLabel.querySelector('input');
    input.type = 'search';
    input.placeholder = 'Search name, ISO, currency, language, identifier, payment system...';
    input.autocomplete = 'off';
    input.dataset.countriesSearch = 'true';

    const filters = createElement('div', 'countries-filter-grid');
    filters.append(createSelectFilter('Region', 'region', ['All Regions', ...CONTINENT_ORDER.filter((region) => countries.some((country) => country.region === region))]));
    filters.append(createSelectFilter('Status', 'status', ['All Statuses', 'Available', 'In Progress', 'Planned']));
    filters.append(createFeatureFilters());
    panel.append(searchLabel, filters);
    return panel;
  }

  function createSelectFilter(label, name, options) {
    const wrapper = createElement('label', 'countries-select-filter');
    const select = document.createElement('select');
    select.dataset.countriesFilter = name;
    options.forEach((option) => {
      const item = document.createElement('option');
      item.value = normalize(option).replace(/\s+/g, '-').replace('all-', 'all');
      item.textContent = option;
      select.appendChild(item);
    });
    wrapper.append(createElement('span', null, label), select);
    return wrapper;
  }

  function createFeatureFilters() {
    const fieldset = createElement('fieldset', 'countries-feature-filter');
    fieldset.appendChild(createElement('legend', null, 'Developer Features'));
    Object.entries(FEATURE_LABELS).forEach(([value, label]) => {
      const chip = createElement('label', 'countries-feature-chip');
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.value = value;
      input.dataset.countriesFeature = 'true';
      chip.append(input, createElement('span', null, label));
      fieldset.appendChild(chip);
    });
    return fieldset;
  }

  function createWorldMap(countries) {
    const section = createElement('section', 'countries-map-section');
    const heading = createElement('div', 'section-heading');
    heading.append(
      createElement('span', 'eyebrow', 'World Map'),
      createElement('h2', null, 'Explore country coverage'),
      createElement('p', null, 'Hover a marker to preview a country. Click available countries to open the hub; planned countries remain clearly marked as coming soon.')
    );
    const map = createElement('div', 'countries-world-map');
    map.setAttribute('aria-label', 'Interactive ValidoHub country map');
    map.appendChild(createWorldMapSvg());
    const focusLine = createElement('span', 'countries-map-focus-line');
    focusLine.setAttribute('aria-hidden', 'true');
    map.appendChild(focusLine);
    countries.forEach((country) => {
      const marker = country.hasHub ? createElement('a', 'countries-map-marker') : createElement('button', 'countries-map-marker');
      if (country.hasHub) {
        marker.href = country.href;
      } else {
        marker.type = 'button';
      }
      marker.dataset.countryId = country.id;
      marker.dataset.status = country.status;
      marker.style.left = `${country.coordinates.x}%`;
      marker.style.top = `${country.coordinates.y}%`;
      marker.setAttribute('aria-label', country.hasHub ? `Open ${country.name}` : `${country.name} coming soon`);
      marker.innerHTML = `<span>${country.flag}</span>`;
      map.appendChild(marker);
    });
    section.append(heading, map);
    return section;
  }

  function createWorldMapSvg() {
    const wrapper = createElement('div', 'countries-world-map-art');
    wrapper.innerHTML = [
      '<svg viewBox="0 0 960 420" role="img" aria-label="Stylized world map">',
      '<path class="map-land" d="M78 128c32-58 96-76 150-48 30 16 62 14 96 7 35-7 69 5 83 34 17 36-12 63-45 77-42 18-83 3-121 16-37 13-54 53-96 47-45-6-72-49-67-133Z"/>',
      '<path class="map-land" d="M220 252c38-23 83-7 103 35 25 52-7 102-42 126-44-29-82-71-92-119-4-19 8-31 31-42Z"/>',
      '<path class="map-land" d="M423 86c44-37 124-38 171-5 29 21 31 56 7 82-32 35-83 19-128 28-40 8-74 37-108 10-29-23 12-77 58-115Z"/>',
      '<path class="map-land" d="M500 190c52-18 99 2 116 45 18 46 2 105-45 126-39 18-70-5-86-41-20-44-40-112 15-130Z"/>',
      '<path class="map-land" d="M620 91c77-32 182-4 233 53 37 41 26 88-24 106-48 17-87-17-130-8-51 10-91 60-141 28-49-32-13-147 62-179Z"/>',
      '<path class="map-land" d="M745 287c44-23 103-11 126 23 19 29 0 62-39 68-46 8-94-7-118-35-19-22-7-38 31-56Z"/>',
      '</svg>'
    ].join('');
    return wrapper;
  }

  function createFeatured(country) {
    const section = createElement('section', 'countries-featured');
    const card = createCountryCard(country);
    card.classList.add('countries-card-featured');
    section.append(
      createElement('span', 'eyebrow', 'Featured Country'),
      createElement('h2', null, 'Brazil is the reference country'),
      createElement('p', null, 'Brazil currently defines the Country Hub quality bar for visual identity, metadata depth, developer snippets, copy controls, official resource structure, and future-workbench discovery.'),
      card
    );
    return section;
  }

  function createGroupedCountries(countries) {
    const section = createElement('section', 'countries-directory');
    const heading = createElement('div', 'section-heading');
    heading.append(
      createElement('span', 'eyebrow', 'Country Directory'),
      createElement('h2', null, 'Browse by continent'),
      createElement('p', null, 'Country cards combine live hubs and planned coverage while keeping unfinished countries visibly marked.')
    );
    const groups = createElement('div', 'countries-groups');
    CONTINENT_ORDER.forEach((continent) => {
      const groupCountries = countries.filter((country) => country.continent === continent);
      if (!groupCountries.length) {
        return;
      }
      const group = createElement('section', 'countries-continent-group');
      group.dataset.continent = continent;
      const header = createElement('div', 'countries-continent-heading');
      const title = createElement('h3');
      title.append(createElement('span', 'countries-continent-icon', CONTINENT_ICONS[continent] || continent), createElement('span', null, continent));
      header.append(title, createElement('span', null, `${groupCountries.length} countries`));
      const grid = createElement('div', 'countries-grid');
      groupCountries
        .slice()
        .sort((left, right) => left.name.localeCompare(right.name))
        .forEach((country) => grid.appendChild(createCountryCard(country)));
      group.append(header, grid);
      groups.appendChild(group);
    });
    section.append(heading, groups, createElement('p', 'countries-empty-state', 'No countries match the current filters.'));
    return section;
  }

  function renderPortal(root, countries) {
    const featured = countries.find((country) => country.reference) || countries[0];
    root.textContent = '';
    root.classList.add('countries-portal-page');
    root.append(
      createHero(countries),
      createControls(countries),
      createWorldMap(countries),
      createFeatured(featured),
      createElement('div', 'countries-portal-layout')
    );
    const layout = root.querySelector('.countries-portal-layout');
    layout.append(createGroupedCountries(countries), createPreview(featured));
  }

  function selectedFilters(root) {
    const region = root.querySelector('[data-countries-filter="region"]')?.value || 'allregions';
    const status = root.querySelector('[data-countries-filter="status"]')?.value || 'allstatuses';
    const features = Array.from(root.querySelectorAll('[data-countries-feature]:checked')).map((item) => item.value);
    const query = normalize(root.querySelector('[data-countries-search]')?.value || '');
    return { region, status, features, query };
  }

  function countryMatches(country, filters) {
    const region = normalize(country.region).replace(/\s+/g, '-');
    const status = country.status === 'inProgress' ? 'in-progress' : country.status;
    const matchesRegion = filters.region === 'allregions' || filters.region === region;
    const matchesStatus = filters.status === 'allstatuses' || filters.status === status;
    const matchesFeatures = filters.features.every((feature) => (country.features || []).includes(feature));
    const matchesQuery = !filters.query || country.searchable.includes(filters.query);
    return matchesRegion && matchesStatus && matchesFeatures && matchesQuery;
  }

  function updateVisibility(root, countries) {
    const filters = selectedFilters(root);
    let visible = 0;
    countries.forEach((country) => {
      const matches = countryMatches(country, filters);
      root.querySelectorAll(`[data-country-id="${country.id}"]`).forEach((element) => {
        element.classList.toggle('is-filtered-out', !matches);
      });
      if (matches) {
        visible += 1;
      }
    });
    root.querySelectorAll('.countries-continent-group').forEach((group) => {
      const hasVisibleCard = Array.from(group.querySelectorAll('.countries-card')).some((card) => !card.classList.contains('is-filtered-out'));
      group.classList.toggle('is-filtered-out', !hasVisibleCard);
    });
    const empty = root.querySelector('.countries-empty-state');
    if (empty) {
      empty.classList.toggle('is-visible', visible === 0);
    }
  }

  function setActiveCountry(root, countries, countryId) {
    const country = countries.find((item) => item.id === countryId);
    if (!country) {
      return;
    }
    root.querySelectorAll('[data-country-id]').forEach((element) => {
      element.classList.toggle('is-country-active', element.dataset.countryId === countryId);
    });
    const map = root.querySelector('.countries-world-map');
    const marker = map?.querySelector(`.countries-map-marker[data-country-id="${countryId}"]`);
    const line = map?.querySelector('.countries-map-focus-line');
    if (map && marker && line) {
      const mapBox = map.getBoundingClientRect();
      const markerBox = marker.getBoundingClientRect();
      const x = markerBox.left + markerBox.width / 2 - mapBox.left;
      const y = markerBox.top + markerBox.height / 2 - mapBox.top;
      line.style.setProperty('--focus-x', `${x}px`);
      line.style.setProperty('--focus-y', `${y}px`);
      line.classList.add('is-visible');
    }
    const oldPreview = root.querySelector('.countries-preview-panel');
    if (oldPreview) {
      oldPreview.replaceWith(createPreview(country));
    }
  }

  function bindPortal(root, countries) {
    root.addEventListener('input', (event) => {
      if (event.target.matches('[data-countries-search], [data-countries-filter], [data-countries-feature]')) {
        updateVisibility(root, countries);
      }
    });
    root.addEventListener('change', (event) => {
      if (event.target.matches('[data-countries-filter], [data-countries-feature]')) {
        updateVisibility(root, countries);
      }
    });
    root.addEventListener('pointerover', (event) => {
      const target = event.target.closest('[data-country-id]');
      if (target && root.contains(target)) {
        setActiveCountry(root, countries, target.dataset.countryId);
      }
    });
    root.addEventListener('focusin', (event) => {
      const target = event.target.closest('[data-country-id]');
      if (target && root.contains(target)) {
        setActiveCountry(root, countries, target.dataset.countryId);
      }
    });
    root.addEventListener('click', (event) => {
      const marker = event.target.closest('.countries-map-marker');
      if (!marker || marker.tagName.toLowerCase() === 'a') {
        return;
      }
      event.preventDefault();
      setActiveCountry(root, countries, marker.dataset.countryId);
    });
    updateVisibility(root, countries);
  }

  function initCountriesPortal() {
    const root = document.querySelector('[data-countries-portal]');
    if (!root || root.dataset.countriesPortalRendered === 'true') {
      return;
    }
    const catalog = helpers().portalCatalog || [];
    if (!catalog.length) {
      root.appendChild(createElement('p', 'countries-empty-state is-visible', 'Country metadata is unavailable.'));
      return;
    }
    const countries = enrichCountries(catalog, discoverAvailableHubs(), localeFromPath());
    renderPortal(root, countries);
    bindPortal(root, countries);
    root.dataset.countriesPortalRendered = 'true';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCountriesPortal);
  } else {
    initCountriesPortal();
  }
}());
