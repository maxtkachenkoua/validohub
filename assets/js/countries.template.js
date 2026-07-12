(function () {
  'use strict';

  const RESERVED_TOP_LEVEL = new Set(['tools', 'categories', 'assets', 'countries']);
  const LOCALE_PATTERN = /^[a-z]{2}(?:-[a-z]{2})?$/i;

  const STATUS_LABELS = {
    ready: 'Ready',
    available: 'Available',
    comingSoon: 'Coming soon',
    planned: 'Planned',
    experimental: 'Experimental',
    deprecated: 'Deprecated'
  };

  const SHARED_WORLD_MAP_SRC = '/assets/images/countries/world-map.svg';

  const COUNTRY_VISUAL_ASSETS = /*__COUNTRY_VISUAL_ASSETS__*/;

  const COUNTRY_HUBS = /*__COUNTRY_HUBS__*/;

  const COUNTRY_PORTAL_CATALOG = /*__COUNTRY_PORTAL_CATALOG__*/;

  const WORKBENCH_DISCOVERY = /*__WORKBENCH_DISCOVERY__*/;

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

  function createBrandAsset(brandKey, options) {
    if (!brandKey || !window.ValidoHubBrands || typeof window.ValidoHubBrands.createBrandMark !== 'function') {
      return null;
    }
    return window.ValidoHubBrands.createBrandMark(brandKey, options || {});
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

  function createCodeValue(value, label, copyValue) {
    const wrapper = createElement('span', 'country-code-value');
    const text = createElement('code', null, value);
    wrapper.appendChild(text);
    const copy = createCopyButton(copyValue || value, label);
    if (copy) {
      wrapper.appendChild(copy);
    }
    return wrapper;
  }

  function createMetricCard(country, item, className) {
    const value = valueFor(country, item);
    const card = createElement('article', `country-metric-card ${className || ''}`.trim());
    applyTags(card, item.tags);
    const brandMark = createBrandAsset(item.brandKey, { label: item.brandLabel });
    if (brandMark) {
      card.appendChild(brandMark);
    } else if (item.icon) {
      const icon = createElement('span', 'country-card-icon', item.icon);
      icon.setAttribute('aria-hidden', 'true');
      card.appendChild(icon);
    }
    card.appendChild(createElement('span', 'country-card-label', item.label));
    card.appendChild(createCodeValue(value, item.label, copyValueFor(country, item)));
    if (item.detailKey && country.metadata[item.detailKey]) {
      card.appendChild(createElement('span', 'country-card-detail', country.metadata[item.detailKey]));
    }
    return card;
  }

  function createHero(country) {
    const hero = createElement('header', 'country-hero');
    applyCountryAccent(hero, country);

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

    const visual = createCountryVisual(country);

    hero.append(main, visual, stats);
    return hero;
  }

  function applyCountryAccent(element, country) {
    const visualIdentity = country.visualIdentity || {};
    if (visualIdentity.heroAccentPrimary) {
      element.style.setProperty('--country-accent-1', visualIdentity.heroAccentPrimary);
    }
    if (visualIdentity.heroAccentSecondary) {
      element.style.setProperty('--country-accent-2', visualIdentity.heroAccentSecondary);
    }
    if (visualIdentity.heroAccentTertiary) {
      element.style.setProperty('--country-accent-3', visualIdentity.heroAccentTertiary);
    }
  }

  function createCountryVisual(country) {
    const visual = createElement('aside', 'country-visual-panel');
    visual.setAttribute('aria-label', `${country.name} visual identity`);

    const visualIdentity = country.visualIdentity || {};
    const assets = COUNTRY_VISUAL_ASSETS[visualIdentity.countryId] || {};
    const sourceLabel = assets.source ? createElement('span', 'country-visual-source', assets.source) : null;
    const outline = createVisualCard({
      className: 'country-outline-card',
      title: visualIdentity.outlineLabel || `${country.name} outline`,
      src: assets.outlineSrc,
      alt: assets.outlineAlt || `${country.name} country outline`
    });
    const map = createVisualCard({
      className: 'country-world-map-card',
      title: visualIdentity.mapLabel || `${country.name} location`,
      src: assets.mapSrc,
      alt: assets.mapAlt || `World map highlighting ${country.name}`,
      marker: assets.mapMarker
    });

    const badge = createElement('div', 'country-continent-card');
    badge.append(
      createElement('span', 'country-continent-label', visualIdentity.continentBadge || country.metadata.continent),
      createElement('span', 'country-continent-caption', 'Continent'),
      createElement('span', 'country-continent-flag', country.flag)
    );
    if (sourceLabel) {
      badge.appendChild(sourceLabel);
    }
    visual.append(outline, map, badge);
    return visual;
  }

  function createVisualCard(options) {
    const card = createElement('div', `country-visual-card ${options.className || ''}`.trim());
    const art = createElement('div', 'country-visual-art');
    if (options.src) {
      const image = document.createElement('img');
      image.src = options.src;
      image.alt = options.alt || '';
      image.loading = 'lazy';
      image.decoding = 'async';
      image.className = 'country-visual-image';
      art.appendChild(image);
      if (options.marker) {
        const marker = createElement('span', 'country-location-marker');
        marker.style.setProperty('--marker-x', `${options.marker.x}%`);
        marker.style.setProperty('--marker-y', `${options.marker.y}%`);
        marker.setAttribute('aria-label', `${options.marker.label} location`);
        marker.append(
          createElement('span', 'country-location-pulse'),
          createElement('span', 'country-location-dot'),
          createElement('span', 'country-location-label', options.marker.label)
        );
        art.appendChild(marker);
      }
    } else {
      art.appendChild(createElement('span', 'country-visual-fallback', options.title));
    }
    card.append(
      art,
      createElement('span', 'country-visual-label', options.title)
    );
    return card;
  }

  function createQuickActions(country) {
    const actions = (country.quickActions || [])
      .map((item) => ({ label: item.label, value: country.metadata[item.valueKey] }))
      .filter((item) => item.value);

    if (!actions.length) {
      return null;
    }

    const section = createSection('Quick actions', `Copy common ${country.name} values`, 'country-quick-actions', 'Fast copy controls for identifiers and locale values developers repeatedly need.');
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
    const brandMark = createBrandAsset(item.brandKey, { label: item.brandLabel });
    if (brandMark) {
      title.appendChild(brandMark);
    } else if (item.icon) {
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
    if (item.logoSrc) {
      const logo = document.createElement('img');
      logo.src = item.logoSrc;
      logo.alt = item.logoAlt || `${item.brand || item.label || item.name || item.title} logo`;
      logo.loading = 'lazy';
      logo.decoding = 'async';
      logo.className = 'country-brand-logo';
      card.appendChild(logo);
    } else if (!brandMark && item.brand) {
      card.appendChild(createElement('span', 'country-brand-placeholder', item.brand));
    }
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
    const section = createSection('Local formats', 'Identifiers, addresses, phones, and banking context', 'country-local-formats', `Important ${country.name} formats to account for before building validators or integrations.`);
    const grid = createElement('div', 'country-card-grid');
    country.localFormats.forEach((item) => grid.appendChild(createInfoCard(item, { className: 'country-info-card' })));
    section.appendChild(grid);
    return section;
  }

  function createCountryProfile(country) {
    const section = createSection('Developer Country Profile', `${country.name} implementation profile`, 'country-profile', 'Country metadata that future hubs can reuse as structured data.');
    const grid = createElement('div', 'country-fact-grid');
    country.countryProfile.forEach((item) => grid.appendChild(createMetricCard(country, item)));
    section.appendChild(grid);
    return section;
  }

  function createLocalizationExamples(country) {
    const section = createSection('Localization examples', `${country.name} display examples`, 'country-localization-examples', 'Concrete examples for locale-aware UI formatting.');
    const grid = createElement('div', 'country-fact-grid');
    country.localizationExamples.forEach((item) => {
      const card = createElement('article', 'country-metric-card country-example-card');
      applyTags(card, item.tags);
      card.append(
        createElement('span', 'country-card-label', item.label),
        createCodeValue(item.value, item.label)
      );
      grid.appendChild(card);
    });
    section.appendChild(grid);
    return section;
  }

  function createAddressExample(country) {
    const section = createSection('Address example', `Formatted ${country.name} address`, 'country-address-example', 'A realistic display example plus field-level explanation.');
    const layout = createElement('div', 'country-split-layout');
    const addressCard = createElement('article', 'country-address-card');
    const pre = createElement('pre', 'country-code-block');
    pre.appendChild(createElement('code', null, country.addressExample.formatted.join('\n')));
    addressCard.append(
      createElement('h3', null, 'Display format'),
      pre,
      createCopyButton(country.addressExample.formatted.join('\n'), `${country.name} address example`)
    );

    const fields = createElement('div', 'country-card-grid country-card-grid-compact');
    country.addressExample.fields.forEach((item) => {
      fields.appendChild(createInfoCard({
        icon: '📍',
        name: item.label,
        status: 'available',
        tags: ['addresses'],
        description: `${item.value} — ${item.description}`
      }, { className: 'country-info-card' }));
    });
    layout.append(addressCard, fields);
    section.appendChild(layout);
    return section;
  }

  function createPhoneExamples(country) {
    const section = createSection('Phone number examples', `${country.name} phone formats`, 'country-phone-examples', 'Examples only. Validate phone rules in a future dedicated workbench.');
    const grid = createElement('div', 'country-card-grid country-card-grid-compact');
    country.phoneExamples.forEach((item) => {
      const card = createInfoCard({
        icon: '☎',
        name: item.label,
        status: 'available',
        tags: item.tags,
        description: item.description
      }, { className: 'country-info-card' });
      card.appendChild(createCodeValue(item.value, item.label));
      grid.appendChild(card);
    });
    section.appendChild(grid);
    return section;
  }

  function createIntegrationChecklist(country) {
    const section = createSection('Developer Integration Checklist', `${country.name} integration reminders`, 'country-integration-checklist', 'Informational checklist only; no runtime validation.');
    const list = createElement('ul', 'country-checklist');
    country.integrationChecklist.forEach((item) => {
      const li = createElement('li');
      li.append(
        createElement('span', 'country-check-box', '□'),
        createElement('span', null, item)
      );
      list.appendChild(li);
    });
    section.appendChild(list);
    return section;
  }

  function createValidationRules(country) {
    const section = createSection('Validation rules', `${country.name} implementation expectations`, 'country-validation-rules', 'Rule summaries only. This section does not implement validators.');
    const grid = createElement('div', 'country-card-grid country-card-grid-compact');
    country.validationRules.forEach((item) => {
      const card = createInfoCard({
        icon: '✓',
        name: item.name,
        status: 'planned',
        tags: item.tags,
        description: 'Validation behavior requires a dedicated workbench spec before implementation.'
      }, { className: 'country-info-card' });
      const list = createElement('ul', 'country-compact-list');
      item.points.forEach((point) => list.appendChild(createElement('li', null, point)));
      card.appendChild(list);
      grid.appendChild(card);
    });
    section.appendChild(grid);
    return section;
  }

  function createCommonMistakes(country) {
    const section = createSection('Common integration mistakes', `${country.name} pitfalls to avoid`, 'country-common-mistakes');
    const list = createElement('ul', 'country-highlight-list');
    country.commonMistakes.forEach((note) => list.appendChild(createElement('li', null, note)));
    section.appendChild(list);
    return section;
  }

  function createBankingOverview(country) {
    const section = createSection('Banking overview', `${country.name} payments and banking ecosystem`, 'country-banking-overview', 'Purpose summaries only. No banking or payment validation is implemented.');
    const grid = createElement('div', 'country-card-grid');
    country.bankingOverview.forEach((item) => grid.appendChild(createInfoCard(item, { className: 'country-info-card' })));
    section.appendChild(grid);
    return section;
  }

  function createPayments(country) {
    const section = createSection('Payments & banking', `Developer notes for ${country.name} payment flows`, 'country-payments', 'High-level context only. Payment and banking validators need separate specs before implementation.');
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
        brandKey: item.brandKey,
        brandLabel: item.brandLabel,
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

  function createRelatedResources(country, locale) {
    if (!country.discovery || !country.discovery.relatedResources) return null;
    const res = country.discovery.relatedResources;
    const relCountries = country.discovery.relatedCountries || [];

    const hasIdentifiers = res.identifiers && res.identifiers.length > 0;
    const hasPayments = res.payments && res.payments.length > 0;
    const hasStandards = res.standards && res.standards.length > 0;
    const hasAuthorities = res.authorities && res.authorities.length > 0;
    const hasWorkbenches = res.workbenches && res.workbenches.length > 0;

    if (!hasIdentifiers && !hasPayments && !hasStandards && !hasAuthorities && !hasWorkbenches && relCountries.length === 0) {
      return null;
    }

    const section = createSection('Related resources', 'Graph-powered developer metadata & navigation', 'country-related-resources', 'This navigation index is compiled dynamically from the ValidoHub Knowledge Graph.');
    const grid = createElement('div', 'country-card-grid country-card-grid-compact');

    if (hasIdentifiers) {
      res.identifiers.forEach(item => {
        grid.appendChild(createInfoCard({
          icon: '🆔',
          name: item.name,
          status: 'available',
          tags: ['identifier'],
          description: item.description || 'Official country identifier.'
        }, {
          className: item.link ? 'country-info-card country-link-card' : 'country-info-card country-future-card',
          href: item.link ? countryUrl(locale, item.link) : null
        }));
      });
    }

    if (hasPayments) {
      res.payments.forEach(item => {
        grid.appendChild(createInfoCard({
          icon: '💳',
          name: item.name,
          status: 'available',
          tags: ['payment'],
          description: item.description || 'Supported payment system.'
        }, {
          className: item.link ? 'country-info-card country-link-card' : 'country-info-card country-future-card',
          href: item.link ? countryUrl(locale, item.link) : null
        }));
      });
    }

    if (hasStandards) {
      res.standards.forEach(item => {
        grid.appendChild(createInfoCard({
          icon: '📜',
          name: item.name,
          status: 'available',
          tags: ['standard'],
          description: item.description || 'Banking standard format.'
        }, {
          className: item.link ? 'country-info-card country-link-card' : 'country-info-card country-future-card',
          href: item.link ? countryUrl(locale, item.link) : null
        }));
      });
    }

    if (hasAuthorities) {
      res.authorities.forEach(item => {
        grid.appendChild(createInfoCard({
          icon: '🏛',
          name: item.name,
          status: 'available',
          tags: ['authority'],
          description: item.description || 'Governing authority.'
        }, {
          className: 'country-info-card country-future-card',
          href: null
        }));
      });
    }

    if (hasWorkbenches) {
      res.workbenches.forEach(item => {
        grid.appendChild(createInfoCard({
          icon: '🛠',
          name: item.name,
          status: 'available',
          tags: ['workbench'],
          description: item.description || 'Interactive validation tool.'
        }, {
          className: 'country-info-card country-link-card',
          href: countryUrl(locale, item.link)
        }));
      });
    }

    if (relCountries.length > 0) {
      relCountries.forEach(item => {
        grid.appendChild(createInfoCard({
          icon: '🌍',
          name: item.name,
          status: 'available',
          tags: item.via.slice(0, 2),
          description: `Shares standards: ${item.via.join(', ')}`
        }, {
          className: 'country-info-card country-link-card',
          href: countryUrl(locale, item.slug)
        }));
      });
    }

    section.appendChild(grid);
    return section;
  }

  function enhanceWorkbenchPage() {
    const parts = pathParts(window.location.pathname);
    if (parts.length !== 3 || !LOCALE_PATTERN.test(parts[0])) {
      return;
    }
    const countrySlug = parts[1];
    const workbenchSlug = parts[2];
    const key = `${countrySlug}-${workbenchSlug}`;

    const info = WORKBENCH_DISCOVERY[key] || WORKBENCH_DISCOVERY[workbenchSlug];
    if (!info) return;

    const stack = document.querySelector('.page-stack');
    if (!stack) return;

    const card = createElement('article', 'content-card related-resources-discovery');
    const heading = createElement('div', 'section-heading');
    heading.appendChild(createElement('span', 'eyebrow', 'ValidoHub Knowledge Graph'));
    heading.appendChild(createElement('h2', null, 'Graph-Powered Discovery'));
    card.appendChild(heading);

    const desc = createElement('p', null, 'This metadata is verified against official source registries and updated by active audits.');
    desc.style.color = 'var(--muted)';
    desc.style.marginBottom = '20px';
    card.appendChild(desc);

    const ul = createElement('ul', 'country-highlight-list');
    ul.style.marginTop = '16px';

    if (info.validates && info.validates.length > 0) {
      ul.appendChild(createElement('li', null, `<strong>Validates:</strong> ${info.validates.join(', ')}`));
    }
    if (info.standards && info.standards.length > 0) {
      ul.appendChild(createElement('li', null, `<strong>Related Standards:</strong> ${info.standards.join(', ')}`));
    }
    if (info.authorities && info.authorities.length > 0) {
      ul.appendChild(createElement('li', null, `<strong>Official Authorities:</strong> ${info.authorities.join(', ')}`));
    }
    if (info.countries && info.countries.length > 0) {
      ul.appendChild(createElement('li', null, `<strong>Supported Countries:</strong> ${info.countries.join(', ')}`));
    }

    card.appendChild(ul);

    const wbSection = stack.querySelector('.tool-workbench');
    if (wbSection && wbSection.nextSibling) {
      stack.insertBefore(card, wbSection.nextSibling);
    } else {
      stack.appendChild(card);
    }
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
    const section = createSection('Developer API examples', `Copy-ready ${country.name} API and locale snippets`, 'country-developer-examples', 'Examples only. No runtime execution.');
    const grid = createElement('div', 'country-code-grid');
    country.developerExamples.forEach((item) => {
      const card = createElement('article', 'country-code-card');
      applyTags(card, ['developer', 'locale']);
      const top = createElement('div', 'country-card-top');
      const title = createElement('div', 'country-title-row');
      const brandMark = createBrandAsset(item.brandKey, { label: item.brandLabel });
      if (brandMark) {
        title.appendChild(brandMark);
      }
      title.appendChild(createElement('h3', null, item.title));
      top.append(
        title,
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

  function createJsonExamples(country) {
    const section = createSection('JSON examples', `${country.name} payload examples`, 'country-json-examples', 'Formatting examples only. These are not validation schemas.');
    const grid = createElement('div', 'country-code-grid');
    country.jsonExamples.forEach((item) => {
      const card = createElement('article', 'country-code-card');
      applyTags(card, ['developer', 'json']);
      const top = createElement('div', 'country-card-top');
      top.append(
        createElement('h3', null, item.title),
        createElement('span', 'country-card-meta', 'json')
      );
      const pre = createElement('pre', 'country-code-block');
      pre.appendChild(createElement('code', null, item.code));
      card.append(top, pre, createCopyButton(item.code, `${item.title} JSON example`));
      grid.appendChild(card);
    });
    section.appendChild(grid);
    return section;
  }

  function createLocalizationNotes(country) {
    const section = createSection('Localization notes', `${country.name} locale behavior`, 'country-localization-notes', 'Implementation reminders for text, sorting, calendar, and locale APIs.');
    const grid = createElement('div', 'country-card-grid country-card-grid-compact');
    country.localizationNotes.forEach((item) => {
      grid.appendChild(createInfoCard({
        icon: '🌐',
        name: item.name,
        status: 'available',
        tags: item.tags,
        description: item.description
      }, { className: 'country-info-card' }));
    });
    section.appendChild(grid);
    return section;
  }

  function createCountryEcosystem(country) {
    const section = createSection('Country ecosystem', `${country.name} developer relationships`, 'country-ecosystem', 'How identifiers, payments, banks, government, and addresses connect at a product-design level.');
    const grid = createElement('div', 'country-ecosystem-grid');
    country.ecosystem.forEach((item) => {
      grid.appendChild(createInfoCard({
        icon: '•',
        name: item.name,
        status: 'available',
        tags: item.tags,
        description: item.description
      }, { className: 'country-info-card country-ecosystem-card' }));
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
    
    const elementsToAppend = [];
    const appendSafely = (fn, ...args) => {
      try {
        const el = fn(...args);
        if (el) {
          elementsToAppend.push(el);
        }
      } catch (err) {
        console.error('Error rendering country hub component:', err);
      }
    };

    appendSafely(createHero, country);
    appendSafely(createQuickActions, country);
    appendSafely(createAdSlot, 'country-hub-after-hero');
    appendSafely(createCountryProfile, country);
    appendSafely(createCheatSheet, country);
    appendSafely(createLocalizationExamples, country);
    appendSafely(createAddressExample, country);
    appendSafely(createPhoneExamples, country);
    appendSafely(createLocalFormats, country);
    appendSafely(createIntegrationChecklist, country);
    appendSafely(createValidationRules, country);
    appendSafely(createCommonMistakes, country);
    appendSafely(createPayments, country);
    appendSafely(createBankingOverview, country);
    appendSafely(createOfficialResources, country);
    appendSafely(createAvailableWorkbenches, country, availableLinks);
    appendSafely(createPlannedWorkbenches, country);
    appendSafely(createRelatedGlobalTools, country, locale);
    appendSafely(createRelatedResources, country, locale);
    appendSafely(createDiscoveryLinks, country, locale);
    appendSafely(createHighlights, country);
    appendSafely(createDeveloperNotes, country);
    appendSafely(createDeveloperExamples, country);
    appendSafely(createJsonExamples, country);
    appendSafely(createLocalizationNotes, country);
    appendSafely(createCountryEcosystem, country);
    appendSafely(createAdSlot, 'country-hub-before-footer');
    appendSafely(createCopyAnnouncer);

    stack.append(...elementsToAppend);
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

    const locale = pathParts(window.location.pathname)[0] || 'en';
    if (LOCALE_PATTERN.test(locale)) {
      const portalLink = document.createElement('a');
      portalLink.href = `/${locale}/countries/`;
      portalLink.textContent = 'All Countries';
      portalLink.setAttribute('role', 'listitem');
      portalLink.classList.toggle('is-active', pathParts(window.location.pathname).join('/') === `${locale}/countries`);
      panel.appendChild(portalLink);
    }

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
    enhanceWorkbenchPage();

    if (window.ValidoWorkbench) {
      window.ValidoWorkbench.registerPlugin('validohub.pesel', {
        applySample: function (workbench, name) {
          const input = workbench.primaryInput();
          if (input) {
            if (name === 'valid-male') {
              input.value = '92082612335';
            } else if (name === 'valid-female') {
              input.value = '92082612346';
            } else if (name === 'invalid-checksum') {
              input.value = '92082612345';
            } else if (name === 'invalid-length') {
              input.value = '920826';
            }
          }
        },
        onMount: function (workbench) {
          const heading = workbench.form.querySelector('.workbench-form-heading');
          if (heading) {
            const btnContainer = document.createElement('div');
            btnContainer.className = 'sample-buttons-container';
            btnContainer.style.display = 'flex';
            btnContainer.style.gap = '8px';
            btnContainer.style.marginTop = '8px';

            const samples = [
              { name: 'valid-male', label: 'Valid Male' },
              { name: 'valid-female', label: 'Valid Female' },
              { name: 'invalid-checksum', label: 'Invalid Checksum' },
              { name: 'invalid-length', label: 'Invalid Length' }
            ];

            samples.forEach(s => {
              const btn = document.createElement('button');
              btn.type = 'button';
              btn.className = 'button button-ghost compact';
              btn.style.fontSize = '0.78rem';
              btn.style.padding = '4px 8px';
              btn.style.cursor = 'pointer';
              btn.textContent = s.label;
              btn.setAttribute('data-sample', s.name);
              btnContainer.appendChild(btn);
            });

            heading.after(btnContainer);
          }
        },
        run: function (workbench, action, options) {
          const values = workbench.values();
          const inputVal = (values.pesel || '').trim();

          if (!inputVal) {
            workbench.setMessage('Please enter a PESEL number.', 'error');
            workbench.setOutput('');
            return;
          }

          const regex = /^\d{11}$/;
          if (!regex.test(inputVal)) {
            workbench.setMessage('Invalid structure: Must be exactly 11 digits.', 'error');
            workbench.setOutput('Validation Failed: Regex pattern mismatch.\nExpected: 11 digits.');
            return;
          }

          const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
          let sum = 0;
          const digits = inputVal.split('').map(Number);
          const checksumSteps = [];

          for (let i = 0; i < 10; i++) {
            const product = digits[i] * weights[i];
            sum += product;
            checksumSteps.push(`Digit ${i+1} (${digits[i]}) * Weight ${weights[i]} = ${product}`);
          }

          const checksumVal = (10 - (sum % 10)) % 10;
          const isValidChecksum = checksumVal === digits[10];

          let year = parseInt(inputVal.substring(0, 2), 10);
          let month = parseInt(inputVal.substring(2, 4), 10);
          const day = parseInt(inputVal.substring(4, 6), 10);

          let century = 1900;
          if (month > 80 && month < 93) {
            century = 1800;
            month -= 80;
          } else if (month > 20 && month < 33) {
            century = 2000;
            month -= 20;
          } else if (month > 40 && month < 53) {
            century = 2100;
            month -= 40;
          } else if (month > 60 && month < 73) {
            century = 2200;
            month -= 60;
          }

          const fullYear = century + year;
          const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
          ];
          const monthName = monthNames[month - 1] || 'Unknown';
          const dateStr = `${day} ${monthName} ${fullYear}`;

          const genderDigit = digits[9];
          const gender = (genderDigit % 2 === 0) ? 'Female' : 'Male';

          const result = {
            valid: isValidChecksum,
            input: inputVal,
            length: inputVal.length,
            checksum: {
              calculated: checksumVal,
              expected: digits[10],
              isValid: isValidChecksum,
              formula: 'Sum = (1*d1 + 3*d2 + 7*d3 + 9*d4 + 1*d5 + 3*d6 + 7*d7 + 9*d8 + 1*d9 + 3*d10) % 10',
              steps: checksumSteps
            },
            metadata: {
              birthDate: dateStr,
              gender: gender,
              century: `${century}s`
            }
          };

          workbench.lastResult = result;

          let outputText = `Validation Result: ${isValidChecksum ? 'VALID' : 'INVALID'}\n\n`;
          outputText += `• Input Value: ${inputVal}\n`;
          outputText += `• Length Check: Pass (11 digits)\n`;
          outputText += `• Checksum Check: ${isValidChecksum ? 'Pass' : 'Fail (Expected: ' + digits[10] + ', Calculated: ' + checksumVal + ')'}\n\n`;

          if (isValidChecksum) {
            outputText += `Parsed Metadata:\n`;
            outputText += `• Birth Date: ${dateStr}\n`;
            outputText += `• Gender: ${gender}\n`;
            outputText += `• Century: ${century}s\n`;
          }

          workbench.setOutput(outputText);
          workbench.setMessage(isValidChecksum ? 'PESEL matches checksum formula.' : 'Invalid Checksum: Checksum digit mismatch.', isValidChecksum ? 'success' : 'error');

          const feedback = workbench.form.querySelector('[data-tool-feedback]');
          if (feedback) {
            feedback.innerHTML = `
              <div class="workbench-validation-feedback" style="margin-top: 16px; padding: 16px; border: 1px solid var(--line); border-radius: 6px; background: var(--surface-soft);">
                <h4 style="margin-top: 0; margin-bottom: 12px; font-size: 0.95rem;">Parsed Metadata</h4>
                <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem;">
                  <tr style="border-bottom: 1px solid var(--line);">
                    <td style="padding: 8px 0; color: var(--muted);">Birth Date</td>
                    <td style="padding: 8px 0; font-weight: 600; text-align: right;">${dateStr}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid var(--line);">
                    <td style="padding: 8px 0; color: var(--muted);">Gender</td>
                    <td style="padding: 8px 0; font-weight: 600; text-align: right;">${gender}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid var(--line);">
                    <td style="padding: 8px 0; color: var(--muted);">Century</td>
                    <td style="padding: 8px 0; font-weight: 600; text-align: right;">${century}s</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: var(--muted);">Verification Status</td>
                    <td style="padding: 8px 0; font-weight: 600; text-align: right; color: ${isValidChecksum ? '#16a34a' : '#dc2626'};">${isValidChecksum ? '✓ Verified' : '✗ Failed'}</td>
                  </tr>
                </table>
              </div>
            `;
          }

          const advanced = workbench.form.querySelector('[data-tool-advanced]');
          if (advanced) {
            advanced.innerHTML = `
              <div style="font-family: monospace; font-size: 0.8rem; padding: 12px; border-radius: 4px; background: var(--code-bg); color: var(--code-text); margin-top: 8px; line-height: 1.4;">
                <p style="margin-top: 0; font-weight: 600; color: #f2c94c; font-size: 0.85rem;">[Checksum weighted multiplication steps]</p>
                ${checksumSteps.map(step => `<div>${step}</div>`).join('')}
                <div style="margin-top: 10px; border-top: 1px solid #444; padding-top: 8px; font-weight: 600;">
                  Sum of Products = ${sum}<br>
                  Sum % 10 = ${sum % 10}<br>
                  (10 - Sum % 10) % 10 = ${checksumVal} (Matches last digit ${digits[10]}: ${isValidChecksum})
                </div>
                <p style="margin-top: 12px; font-weight: 600; color: #f2c94c; font-size: 0.85rem;">[Regex match status]</p>
                <div>Pattern: /^\\d{11}$/</div>
                <div>Match: ${regex.test(inputVal)}</div>
                <p style="margin-top: 12px; font-weight: 600; color: #f2c94c; font-size: 0.85rem;">[Raw JSON Output]</p>
                <pre style="margin: 0; white-space: pre-wrap; font-family: monospace;">${JSON.stringify(result, null, 2)}</pre>
              </div>
            `;
          }
        }
      });
    }
  }

  window.ValidoHubCountries = Object.freeze({
    hubs: COUNTRY_HUBS,
    portalCatalog: COUNTRY_PORTAL_CATALOG,
    statusLabels: STATUS_LABELS,
    reservedTopLevel: RESERVED_TOP_LEVEL,
    localePattern: LOCALE_PATTERN,
    createBrandAsset,
    createElement,
    pathParts,
    statusLabel,
    statusClass,
    countryUrl
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCountriesPlatform);
  } else {
    initCountriesPlatform();
  }
}());
