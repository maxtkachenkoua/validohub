document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  initGlobalLanguageSwitcher();
  initCountryClocks();

  // 1. Component-Scoped Code Snippets Language Tabs
  const snippetBlock = document.getElementById('vh-code-block-content');
  if (snippetBlock) {
    const snippetsDataElement = document.getElementById('vh-snippets-data');
    if (snippetsDataElement) {
      try {
        const snippets = JSON.parse(snippetsDataElement.textContent);
        const tabs = document.querySelectorAll('.vh-tab');
        tabs.forEach(tab => {
          tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const lang = tab.dataset.lang;
            if (snippets[lang]) {
              snippetBlock.textContent = snippets[lang];
            }
          });
        });
      } catch (err) {
        console.error('Failed to parse code snippets registry:', err);
      }
    }
  }

  // 2. Local Scoped FAQ Accordions Controls
  const faqSection = document.querySelector('.vh-faq-section');
  if (faqSection) {
    const expandBtn = faqSection.querySelector('[data-faq-action="expand"]');
    const collapseBtn = faqSection.querySelector('[data-faq-action="collapse"]');
    
    if (expandBtn && collapseBtn) {
      expandBtn.addEventListener('click', () => {
        faqSection.querySelectorAll('.vh-accordion').forEach(acc => acc.open = true);
      });
      collapseBtn.addEventListener('click', () => {
        faqSection.querySelectorAll('.vh-accordion').forEach(acc => acc.open = false);
      });
    }
  }

  // 3. Dynamic Copy to Clipboard Operations
  const copyBtn = document.getElementById('vh-snippet-copy-btn');
  if (copyBtn && snippetBlock) {
    copyBtn.addEventListener('click', () => {
      const textToCopy = snippetBlock.textContent;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy)
          .then(() => showCopiedStatus(copyBtn))
          .catch(err => console.error('Failed to copy text:', err));
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed'; // Avoid scrolling to bottom
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
          document.execCommand('copy');
          showCopiedStatus(copyBtn);
        } catch (err) {
          console.error('Fallback copy command failed:', err);
        }
        document.body.removeChild(textarea);
      }
    });
  }

  // 4. Country-Level Click-to-Copy Controls
  document.body.addEventListener('click', (event) => {
    const countryCopyBtn = event.target.closest('.vh-country-copy-button, .vh-country-action-button');
    if (!countryCopyBtn) return;

    const value = countryCopyBtn.dataset.copyValue;
    const label = countryCopyBtn.dataset.copyLabel || 'value';
    if (!value) return;

    copyText(value)
      .then(() => showCountryCopiedStatus(countryCopyBtn, label))
      .catch(() => showCountryCopyUnavailable(countryCopyBtn));
  });

  // 5. Country Hub Tool Search
  document.querySelectorAll('[data-country-tool-search]').forEach(searchForm => {
    const input = searchForm.querySelector('[data-country-tool-search-input]');
    const clearButton = searchForm.querySelector('[data-country-tool-search-clear]');
    const status = searchForm.querySelector('[data-country-tool-search-status]');
    const catalog = document.querySelector('.vh-country-workbench-catalog');
    if (!input || !catalog) return;

    const rows = Array.from(catalog.querySelectorAll('.vh-country-catalog-row'));
    const groups = Array.from(catalog.querySelectorAll('.vh-country-route-group'));
    const allCount = rows.length;
    const intentFilters = Array.from(catalog.querySelectorAll('[data-country-intent]'));
    const shortcutsWrap = searchForm.querySelector('[data-country-search-shortcuts]');
    const searchControl = searchForm.querySelector('.vh-country-tool-search-control');
    const suggestions = document.createElement('div');
    suggestions.className = 'vh-country-search-suggestions';
    suggestions.hidden = true;
    suggestions.setAttribute('data-country-search-suggestions', '');
    suggestions.setAttribute('role', 'listbox');
    searchControl?.appendChild(suggestions);

    let activeSuggestionIndex = -1;
    let visibleMatches = [];
    let activeIntent = 'all';
    intentFilters.forEach(button => {
      const isActive = button.classList.contains('is-active');
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      if (isActive) button.setAttribute('aria-current', 'true');
    });

    const countrySearchId = input.id || searchForm.getAttribute('id') || window.location.pathname;
    const recentKey = `validohub.country.search.recent.${countrySearchId}`;
    const initialShortcutEntries = shortcutsWrap
      ? Array.from(shortcutsWrap.querySelectorAll('[data-country-search-shortcut]')).map(chip => {
          const query = normalizeSearchText(chip.getAttribute('data-country-search-shortcut') || chip.textContent || '');
          const label = String(chip.textContent || '').trim();
          return query ? { query, label: label || query } : null;
        }).filter(Boolean)
      : [];
    const popularFallback = initialShortcutEntries.length > 0
      ? initialShortcutEntries
      : [
          { query: 'tool', label: 'tool' },
          { query: 'identifier', label: 'identifier' },
          { query: 'payment', label: 'payment' }
        ];
    const globalSearchText = popularFallback.map(entry => entry.query).join(' ');
    const shortcutLabelByQuery = new Map(popularFallback.map(entry => [entry.query, entry.label]));
    const aliases = new Map([
      ['pasel', 'pesel'],
      ['pesel id', 'pesel'],
      ['vat pl', 'poland vat'],
      ['nrb', 'iban nrb'],
      ['iban', 'iban nrb'],
      ['swift', 'swift bic'],
      ['bic', 'swift bic'],
      ['ksef xml', 'ksef'],
      ['jpk xml', 'jpk'],
      ['regon company', 'regon']
    ]);

    function getRecentTerms() {
      try {
        const parsed = JSON.parse(localStorage.getItem(recentKey) || '[]');
        return Array.isArray(parsed) ? parsed.filter(Boolean).slice(0, 5) : [];
      } catch {
        return [];
      }
    }

    function saveRecentTerm(rawQuery) {
      const value = normalizeSearchText(rawQuery);
      if (!value) return;
      const current = getRecentTerms().filter(item => item !== value);
      current.unshift(value);
      localStorage.setItem(recentKey, JSON.stringify(current.slice(0, 5)));
    }

    function renderShortcutChips() {
      if (!shortcutsWrap) return;
      const recent = getRecentTerms();
      const baseQueries = popularFallback.map(entry => entry.query);
      const terms = Array.from(new Set([...recent, ...baseQueries])).slice(0, 8);
      shortcutsWrap.innerHTML = terms.map(term => {
        const label = shortcutLabelByQuery.get(term) || term;
        return `<button class="vh-country-search-chip" type="button" data-country-search-shortcut="${escapeHtml(term)}">${escapeHtml(label)}</button>`;
      }).join('');
    }

    function canonicalizeQuery(value) {
      const normalized = normalizeSearchText(value);
      return aliases.get(normalized) || normalized;
    }

    function buildSuggestionItem(row, index, rawQuery) {
      const href = row.getAttribute('href') || '#';
      const title = (row.querySelector('strong')?.textContent || '').trim() || (row.textContent || '').trim();
      const meta = (row.querySelector('small')?.textContent || href).trim();
      return `
        <a class="vh-country-search-suggestion" href="${escapeHtml(href)}" role="option" data-suggestion-index="${index}">
          <span class="vh-country-search-suggestion-title">${highlightMatches(title, rawQuery)}</span>
          <span class="vh-country-search-suggestion-meta">${highlightMatches(meta, rawQuery)}</span>
        </a>
      `;
    }

    function renderSuggestions(rawQuery) {
      const query = canonicalizeQuery(rawQuery);
      if (!query) {
        closeSuggestions();
        return;
      }

      visibleMatches = rows.filter(row => !row.hidden);
      const topMatches = visibleMatches.slice(0, 8);
      if (!topMatches.length) {
        closeSuggestions();
        return;
      }

      suggestions.innerHTML = topMatches.map((row, index) => buildSuggestionItem(row, index, query)).join('');
      suggestions.hidden = false;
      activeSuggestionIndex = -1;
    }

    function closeSuggestions() {
      suggestions.hidden = true;
      suggestions.innerHTML = '';
      activeSuggestionIndex = -1;
    }

    function setActiveSuggestion(index) {
      const items = Array.from(suggestions.querySelectorAll('.vh-country-search-suggestion'));
      if (!items.length) {
        activeSuggestionIndex = -1;
        return;
      }
      activeSuggestionIndex = Math.max(0, Math.min(index, items.length - 1));
      items.forEach((item, itemIndex) => item.classList.toggle('is-active', itemIndex === activeSuggestionIndex));
      const activeItem = items[activeSuggestionIndex];
      activeItem?.scrollIntoView({ block: 'nearest' });
    }

    function openActiveSuggestion() {
      const active = suggestions.querySelector('.vh-country-search-suggestion.is-active') || suggestions.querySelector('.vh-country-search-suggestion');
      if (active) {
        window.location.href = active.getAttribute('href');
      }
    }

    searchForm.addEventListener('submit', event => {
      event.preventDefault();
      if (!suggestions.hidden) {
        openActiveSuggestion();
        return;
      }
      const firstMatch = catalog.querySelector('.vh-country-catalog-row.is-tool-search-match') || rows[0];
      if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstMatch.focus({ preventScroll: true });
      }
    });

    input.addEventListener('input', () => updateCountryToolSearch(input.value));
    input.addEventListener('keydown', event => {
      if (suggestions.hidden) return;
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveSuggestion(activeSuggestionIndex + 1);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveSuggestion(activeSuggestionIndex - 1);
      } else if (event.key === 'Enter') {
        event.preventDefault();
        openActiveSuggestion();
      } else if (event.key === 'Escape') {
        closeSuggestions();
      }
    });
    input.addEventListener('blur', () => {
      window.setTimeout(() => {
        if (!searchForm.matches(':focus-within')) closeSuggestions();
      }, 120);
    });
    input.addEventListener('focus', () => {
      if (input.value.trim()) {
        renderSuggestions(input.value);
      }
    });

    suggestions.addEventListener('mousedown', event => {
      event.preventDefault();
      const link = event.target.closest('.vh-country-search-suggestion');
      if (!link) return;
      window.location.href = link.getAttribute('href');
    });

    shortcutsWrap?.addEventListener('click', event => {
      const chip = event.target.closest('[data-country-search-shortcut]');
      if (!chip) return;
      const shortcut = chip.getAttribute('data-country-search-shortcut') || '';
      input.value = shortcut;
      updateCountryToolSearch(shortcut);
      input.focus();
    });

    intentFilters.forEach(button => {
      button.addEventListener('click', () => {
        activeIntent = button.dataset.countryIntent || 'all';
        intentFilters.forEach(item => {
          const isActive = item === button;
          item.classList.toggle('is-active', isActive);
          item.setAttribute('aria-pressed', isActive ? 'true' : 'false');
          if (isActive) item.setAttribute('aria-current', 'true');
          else item.removeAttribute('aria-current');
        });
        updateCountryToolSearch(input.value);
      });
    });

    clearButton?.addEventListener('click', () => {
      input.value = '';
      updateCountryToolSearch('');
      closeSuggestions();
      input.focus();
    });

    document.addEventListener('pointerdown', event => {
      if (suggestions.hidden) return;
      if (searchForm.contains(event.target)) return;
      closeSuggestions();
    });

    document.addEventListener('keydown', event => {
      const key = String(event.key || '').toLowerCase();
      if ((event.metaKey || event.ctrlKey) && key === 'k') {
        event.preventDefault();
        input.focus();
        input.select();
      }
    });

    function updateCountryToolSearch(rawQuery) {
      const query = canonicalizeQuery(rawQuery);
      let matchCount = 0;
      catalog.classList.toggle('is-searching', Boolean(query));
      catalog.dataset.activeIntent = activeIntent;

      rows.forEach(row => {
        const haystack = normalizeSearchText([
          row.textContent || '',
          row.dataset.routeSlug || '',
          row.dataset.searchText || '',
          globalSearchText
        ].join(' '));
        const rowIntent = row.dataset.intentGroup || 'other';
        const matchesIntent = activeIntent === 'all' || activeIntent === rowIntent;
        const matches = matchesIntent && (!query || haystack.includes(query));
        row.hidden = !matches;
        row.classList.toggle('is-tool-search-match', Boolean(query && matches));
        if (matches) matchCount += 1;
      });

      groups.forEach(group => {
        const groupIntent = group.dataset.countryRouteGroup || group.querySelector('.vh-country-catalog-row')?.dataset.intentGroup || 'other';
        const matchesActiveIntent = activeIntent === 'all' || activeIntent === groupIntent;
        const visibleRows = matchesActiveIntent ? group.querySelectorAll('.vh-country-catalog-row:not([hidden])').length : 0;
        const countEl = group.querySelector('.vh-country-group-count');
        if (countEl) {
          const totalRows = group.querySelectorAll('.vh-country-catalog-row').length;
          countEl.textContent = query ? `${visibleRows}/${totalRows}` : String(totalRows);
        }
        const isEmpty = visibleRows === 0;
        const shouldHideGroup = !matchesActiveIntent || isEmpty;
        group.hidden = shouldHideGroup;
        group.classList.toggle('is-tool-search-empty', Boolean(query && isEmpty));
        if (activeIntent !== 'all') {
          group.open = !shouldHideGroup;
        } else if (query && !isEmpty) {
          group.open = true;
        }
      });

      catalog.classList.toggle('is-tool-search-empty', Boolean(query && matchCount === 0));
      if (status) {
        if (query) {
          const matchLabel = matchCount === 1 ? 'match' : 'matches';
          status.textContent = `${matchCount} ${matchLabel} for “${rawQuery.trim()}” · Enter to jump`;
        } else if (activeIntent !== 'all') {
          status.textContent = `${matchCount} tools in ${activeIntent.replace(/-/g, ' ')}`;
        } else {
          status.textContent = `Search ${allCount} country workbenches`;
        }
      }

      if (query) {
        saveRecentTerm(query);
      }
      renderShortcutChips();
      renderSuggestions(rawQuery);
    }

    renderShortcutChips();
  });

  function copyText(value) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(value);
    }
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.style.position = 'fixed';
    textarea.style.top = '-1000px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand('copy');
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    } finally {
      document.body.removeChild(textarea);
    }
  }

  function normalizeSearchText(value) {
    return String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function highlightMatches(text, rawQuery) {
    const source = String(text || '');
    const needle = String(rawQuery || '').trim();
    if (!source || !needle) {
      return escapeHtml(source);
    }

    const sourceLower = source.toLowerCase();
    const needleLower = needle.toLowerCase();
    let from = 0;
    let at = sourceLower.indexOf(needleLower, from);
    if (at === -1) {
      return escapeHtml(source);
    }

    let out = '';
    while (at !== -1) {
      out += escapeHtml(source.slice(from, at));
      out += `<mark class="vh-country-search-highlight">${escapeHtml(source.slice(at, at + needle.length))}</mark>`;
      from = at + needle.length;
      at = sourceLower.indexOf(needleLower, from);
    }
    out += escapeHtml(source.slice(from));
    return out;
  }

  function showCountryCopiedStatus(button, label) {
    button.classList.add('vh-copied');
    let announcer = document.querySelector('.vh-copy-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.className = 'vh-copy-announcer vh-sr-only';
      announcer.setAttribute('aria-live', 'polite');
      document.body.appendChild(announcer);
    }
    announcer.textContent = `${label} copied to clipboard`;
    setTimeout(() => button.classList.remove('vh-copied'), 1300);
  }

  function showCountryCopyUnavailable(button) {
    button.classList.add('vh-copy-unavailable');
    const originalText = button.textContent;
    button.textContent = 'Copy unavailable';
    setTimeout(() => {
      button.classList.remove('vh-copy-unavailable');
      button.textContent = originalText;
    }, 1300);
  }

  function initGlobalLanguageSwitcher() {
    const headerInner = document.querySelector('.site-header .header-inner');
    if (!headerInner) return;

    const nav = headerInner.querySelector('.primary-nav');
    const localeState = resolveLocaleState();
    const panel = createLocaleSwitcher(localeState);
    if (!panel) return;

    headerInner.appendChild(panel);
    const select = panel.querySelector('.vh-locale-switcher-select');
    applyRuntimeUiLocalization(localeState.currentLocale);
    if (!nav) return;

    applyAutoLocale(localeState);
  }

  function initCountryClocks() {
    const clocks = document.querySelectorAll('[data-country-clock][data-time-zone]');
    if (!clocks.length) return;

    const formatters = new Map();
    const getFormatter = (timeZone, options) => {
      const key = `${timeZone}:${JSON.stringify(options)}`;
      if (!formatters.has(key)) {
        formatters.set(key, new Intl.DateTimeFormat('en-US', { timeZone, ...options }));
      }
      return formatters.get(key);
    };

    const readParts = (timeZone) => {
      const parts = getFormatter(timeZone, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).formatToParts(new Date());
      const value = (type) => Number(parts.find(part => part.type === type)?.value || 0);
      return { hour: value('hour') % 24, minute: value('minute'), second: value('second') };
    };

    const updateClock = (clock) => {
      const timeZone = clock.dataset.timeZone;
      const time = readParts(timeZone);
      const hour12 = time.hour % 12;
      const hourTurn = ((hour12 + time.minute / 60) / 12) * 360;
      const minuteTurn = ((time.minute + time.second / 60) / 60) * 360;
      const secondTurn = (time.second / 60) * 360;
      const two = (value) => String(value).padStart(2, '0');

      clock.querySelector('[data-country-clock-hour]')?.style.setProperty('--clock-turn', `${hourTurn}deg`);
      clock.querySelector('[data-country-clock-minute]')?.style.setProperty('--clock-turn', `${minuteTurn}deg`);
      clock.querySelector('[data-country-clock-second]')?.style.setProperty('--clock-turn', `${secondTurn}deg`);

      const timeNode = clock.querySelector('[data-country-clock-time]');
      if (timeNode) timeNode.textContent = `${two(time.hour)}:${two(time.minute)}:${two(time.second)}`;

      const dateNode = clock.querySelector('[data-country-clock-date]');
      if (dateNode) {
        dateNode.textContent = getFormatter(timeZone, {
          weekday: 'short',
          month: 'short',
          day: '2-digit',
          timeZoneName: 'short'
        }).format(new Date());
      }
    };

    const tick = () => clocks.forEach(updateClock);
    tick();
    window.setInterval(tick, 1000);
  }

  function resolveLocaleState() {
    const supportedLocales = [
      { code: 'en', label: 'English', icon: 'US' },
      { code: 'es', label: 'Spanish', icon: 'ES' },
      { code: 'pt-BR', label: 'Portuguese (Brazil)', icon: 'BR' },
      { code: 'de', label: 'German', icon: 'DE' },
      { code: 'fr', label: 'French', icon: 'FR' },
      { code: 'pl', label: 'Polish', icon: 'PL' },
      { code: 'uk', label: 'Ukrainian', icon: 'UA' }
    ];

    const alternates = collectAlternateLocaleLinks();
    const currentLocale = detectCurrentLocale();
    const storageKey = 'validohub.locale';
    const savedLocale = normalizeLocaleTag(localStorage.getItem(storageKey) || '');
    const browserLocale = detectBrowserLocale(supportedLocales);
    const countryLocaleHints = resolveCountryLocaleHints();

    return {
      supportedLocales,
      alternates,
      currentLocale,
      savedLocale,
      browserLocale,
      storageKey,
      countryLocaleHints
    };
  }

  function createLocaleSwitcher(state) {
    const wrap = document.createElement('form');
    wrap.className = 'vh-locale-switcher';
    wrap.setAttribute('data-locale-switcher', '');

    const label = document.createElement('label');
    label.className = 'vh-locale-switcher-label';
    label.setAttribute('for', 'vh-locale-select');
    label.textContent = uiLabel(state.currentLocale, 'language');

    const select = document.createElement('select');
    select.id = 'vh-locale-select';
    select.className = 'vh-locale-switcher-select';
    select.setAttribute('aria-label', uiLabel(state.currentLocale, 'selectLanguage'));

    const selectedLocale = state.currentLocale || state.savedLocale || 'en';
    populateLocaleOptions(select, state, selectedLocale);

    select.addEventListener('change', () => {
      const requested = normalizeLocaleTag(select.value);
      if (!requested) return;
      localStorage.setItem(state.storageKey, requested);
      document.documentElement.lang = requested;
      const switched = navigateToLocaleIfAvailable(state, requested);
      if (!switched) return;
    });

    wrap.append(select);
    return wrap;
  }

  function populateLocaleOptions(select, state, selectedLocale) {
    const orderedCodes = dedupeLocaleList([
      ...(state.countryLocaleHints || []),
      ...state.supportedLocales.map(item => item.code)
    ]);

    orderedCodes.forEach(code => {
      const option = createLocaleOption(state.supportedLocales, code);
      if (!option) return;
      select.appendChild(option);
    });

    const hasSelected = Array.from(select.options).some(option => normalizeLocaleTag(option.value) === normalizeLocaleTag(selectedLocale));
    select.value = hasSelected ? selectedLocale : 'en';
  }

  function createLocaleOption(supportedLocales, code) {
    const normalized = normalizeLocaleTag(code);
    const match = supportedLocales.find(item => normalizeLocaleTag(item.code) === normalized);
    if (!match) return null;
    const option = document.createElement('option');
    option.value = match.code;
    option.textContent = createLocaleOptionLabel(match);
    return option;
  }

  function createCountryLanguageQuickActions(state, select) {
    const row = document.createElement('div');
    row.className = 'vh-country-language-quick';

    const hints = dedupeLocaleList(state.countryLocaleHints || []);
    if (!hints.length) {
      row.hidden = true;
      return row;
    }

    const title = document.createElement('span');
    title.className = 'vh-country-language-quick-title';
    title.textContent = uiLabel(state.currentLocale, 'official');
    row.appendChild(title);

    hints.forEach(code => {
      const localeItem = state.supportedLocales.find(item => normalizeLocaleTag(item.code) === normalizeLocaleTag(code));
      if (!localeItem) return;

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'vh-country-language-pill';
      button.textContent = `${toFlagEmoji(localeItem.icon)} ${localeItem.label}`.trim();
      button.addEventListener('click', () => {
        localStorage.setItem(state.storageKey, localeItem.code);
        if (select) {
          select.value = localeItem.code;
        }
        navigateToLocaleIfAvailable(state, localeItem.code);
      });
      row.appendChild(button);
    });

    return row;
  }

  function mountOfficialLanguageQuickActions(state, select) {
    const breadcrumbs = document.querySelector('.breadcrumbs, nav[aria-label="Breadcrumb"]');
    if (!breadcrumbs) return;

    breadcrumbs.classList.add('breadcrumbs');

    const row = createCountryLanguageQuickActions(state, select);
    if (!row || row.hidden) return;

    row.classList.add('vh-breadcrumb-language-quick');
    breadcrumbs.appendChild(row);
  }

  function createLocaleOptionLabel(item) {
    const icon = toFlagEmoji(item.icon);
    return icon ? `${icon} ${item.label}` : item.label;
  }

  function toFlagEmoji(countryCode) {
    const code = String(countryCode || '').trim().toUpperCase();
    if (!/^[A-Z]{2}$/.test(code)) return '';
    const first = code.codePointAt(0) + 127397;
    const second = code.codePointAt(1) + 127397;
    return String.fromCodePoint(first, second);
  }

  function collectAlternateLocaleLinks() {
    const map = new Map();
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => {
      const locale = normalizeLocaleTag(link.getAttribute('hreflang') || '');
      const href = link.getAttribute('href') || '';
      if (!locale || !href || locale === 'x-default') return;
      map.set(locale, href);
    });
    return map;
  }

  function detectCurrentLocale() {
    const pathLocale = detectPathLocale();
    if (pathLocale) return pathLocale;
    const htmlLang = normalizeLocaleTag(document.documentElement.lang || '');
    if (htmlLang) return htmlLang;
    return 'en';
  }

  function detectPathLocale() {
    const parts = String(window.location.pathname || '/').split('/').filter(Boolean);
    return normalizeLocaleTag(parts[0] || '');
  }

  function detectBrowserLocale(supportedLocales) {
    const browserTags = Array.isArray(navigator.languages) && navigator.languages.length
      ? navigator.languages
      : [navigator.language || ''];

    const supported = supportedLocales.map(item => normalizeLocaleTag(item.code));
    for (const browserTag of browserTags) {
      const normalized = normalizeLocaleTag(browserTag);
      if (!normalized) continue;
      if (supported.includes(normalized)) return normalized;
      const base = normalized.split('-')[0];
      const fallback = supported.find(code => code === base || code.startsWith(`${base}-`));
      if (fallback) return fallback;
    }
    return '';
  }

  function resolveCountryLocaleHints() {
    const parts = String(window.location.pathname || '/').split('/').filter(Boolean);
    const maybeCountry = parts.length >= 2 ? parts[1] : '';
    if (!maybeCountry) return [];

    const countryRegistry = window.ValidoHubCountries && window.ValidoHubCountries.hubs;
    const hub = countryRegistry && countryRegistry[maybeCountry];
    const metadata = hub && hub.metadata ? hub.metadata : null;

    const localeHints = [];
    if (metadata && metadata.locale) {
      localeHints.push(metadata.locale);
    }

    if (!localeHints.length) {
      const countryLocaleFallback = {
        brazil: 'pt-BR',
        poland: 'pl',
        germany: 'de',
        spain: 'es'
      };
      if (countryLocaleFallback[maybeCountry]) {
        localeHints.push(countryLocaleFallback[maybeCountry]);
      }
    }

    // Keep English available as a stable secondary fallback across country hubs.
    localeHints.push('en');

    return dedupeLocaleList(localeHints);
  }

  function applyAutoLocale(state) {
    if (detectPathLocale()) return;
    if (state.savedLocale) return;
    const preferred = state.browserLocale;
    if (!preferred || preferred === state.currentLocale) return;
    const preferredAlternate = state.alternates.get(preferred);
    if (!preferredAlternate) return;

    const targetHref = attachCurrentQueryAndHash(preferredAlternate);
    if (isSameLocation(targetHref)) return;
    window.location.href = targetHref;
  }

  function navigateToLocaleIfAvailable(state, requestedLocale) {
    const normalizedRequested = normalizeLocaleTag(requestedLocale);
    if (!normalizedRequested) return false;

    const directAlternate = state.alternates.get(normalizedRequested);
    if (directAlternate) {
      const targetHref = attachCurrentQueryAndHash(directAlternate);
      if (isSameLocation(targetHref)) return false;
      window.location.href = targetHref;
      return true;
    }

    return false;
  }

  function attachCurrentQueryAndHash(href) {
    const alternateUrl = new URL(href, window.location.origin);
    const localUrl = new URL(alternateUrl.pathname, window.location.origin);
    localUrl.search = alternateUrl.search || window.location.search;
    localUrl.hash = alternateUrl.hash || window.location.hash;
    return localUrl.toString();
  }

  function isSameLocation(href) {
    const target = new URL(href, window.location.origin);
    const current = new URL(window.location.href);
    return target.pathname === current.pathname && target.search === current.search && target.hash === current.hash;
  }

  function normalizeLocaleTag(value) {
    const raw = String(value || '').trim();
    if (!raw) return '';
    const [language, region] = raw.split('-');
    if (!language) return '';
    const base = language.toLowerCase();
    if (!/^[a-z]{2,3}$/.test(base)) return '';
    if (!region) return base;
    const normalizedRegion = region.toUpperCase();
    if (!/^[A-Z]{2}$/.test(normalizedRegion)) return base;
    return `${base}-${normalizedRegion}`;
  }

  function dedupeLocaleList(items) {
    const out = [];
    const seen = new Set();
    items.forEach(item => {
      const normalized = normalizeLocaleTag(item);
      if (!normalized || seen.has(normalized)) return;
      seen.add(normalized);
      out.push(normalized);
    });
    return out;
  }

  function uiLabel(localeCode, key) {
    const locale = normalizeLocaleTag(localeCode || 'en');
    const lang = locale === 'pt-PT' ? 'pt-PT' : locale === 'zh-CN' || locale === 'zh-TW' ? locale : locale.startsWith('pt-') ? 'pt-BR' : (locale.split('-')[0] || 'en');
    const dict = {
      en: { language: 'Language', selectLanguage: 'Select language', official: 'Official' },
      de: { language: 'Sprache', selectLanguage: 'Sprache wählen', official: 'Offiziell' },
      es: { language: 'Idioma', selectLanguage: 'Seleccionar idioma', official: 'Oficial' },
      pl: { language: 'Język', selectLanguage: 'Wybierz język', official: 'Urzędowy' },
      'pt-BR': { language: 'Idioma', selectLanguage: 'Selecionar idioma', official: 'Oficial' },
      'pt-PT': { language: 'Idioma', selectLanguage: 'Selecionar idioma', official: 'Oficial' },
      fr: { language: 'Langue', selectLanguage: 'Choisir la langue', official: 'Officiel' },
      it: { language: 'Lingua', selectLanguage: 'Seleziona lingua', official: 'Ufficiale' },
      nl: { language: 'Taal', selectLanguage: 'Taal kiezen', official: 'Officieel' },
      cs: { language: 'Jazyk', selectLanguage: 'Vybrat jazyk', official: 'Úřední' },
      sk: { language: 'Jazyk', selectLanguage: 'Vybrať jazyk', official: 'Úradné' },
      uk: { language: 'Мова', selectLanguage: 'Виберіть мову', official: 'Офіційна' },
      tr: { language: 'Dil', selectLanguage: 'Dil seç', official: 'Resmî' },
      ro: { language: 'Limbă', selectLanguage: 'Selectează limba', official: 'Oficial' },
      hu: { language: 'Nyelv', selectLanguage: 'Nyelv kiválasztása', official: 'Hivatalos' },
      sv: { language: 'Språk', selectLanguage: 'Välj språk', official: 'Officiellt' },
      no: { language: 'Språk', selectLanguage: 'Velg språk', official: 'Offisiell' },
      fi: { language: 'Kieli', selectLanguage: 'Valitse kieli', official: 'Virallinen' },
      da: { language: 'Sprog', selectLanguage: 'Vælg sprog', official: 'Officiel' },
      ja: { language: '言語', selectLanguage: '言語を選択', official: '公式' },
      ko: { language: '언어', selectLanguage: '언어 선택', official: '공식' },
      'zh-CN': { language: '语言', selectLanguage: '选择语言', official: '官方' },
      'zh-TW': { language: '語言', selectLanguage: '選擇語言', official: '官方' },
      ar: { language: 'اللغة', selectLanguage: 'اختر اللغة', official: 'رسمي' },
      he: { language: 'שפה', selectLanguage: 'בחר שפה', official: 'רשמי' },
      hi: { language: 'भाषा', selectLanguage: 'भाषा चुनें', official: 'आधिकारिक' },
      id: { language: 'Bahasa', selectLanguage: 'Pilih bahasa', official: 'Resmi' },
      vi: { language: 'Ngôn ngữ', selectLanguage: 'Chọn ngôn ngữ', official: 'Chính thức' },
      th: { language: 'ภาษา', selectLanguage: 'เลือกภาษา', official: 'ทางการ' },
      ms: { language: 'Bahasa', selectLanguage: 'Pilih bahasa', official: 'Rasmi' }
    };

    const selected = dict[lang] || dict[locale] || dict.en;
    return selected[key] || dict.en[key] || '';
  }

  function applyRuntimeUiLocalization(localeCode) {
    const locale = normalizeLocaleTag(localeCode || 'en');
    const lang = locale.startsWith('pt-') ? 'pt-BR' : (locale.split('-')[0] || 'en');
    if (!['de', 'es', 'pl', 'pt-BR'].includes(lang)) return;

    const ui = {
      de: {
        home: 'Startseite', countries: 'Länder', identifiers: 'Kennungen',
        tool: 'Werkzeug', runTool: 'Tool ausführen', workbench: 'Werkbank',
        relatedTools: 'Ähnliche Tools', continueWithRelated: 'Mit ähnlichen Tools fortfahren',
        validate: 'Prüfen', copyResult: 'Ergebnis kopieren', downloadResult: 'Ergebnis herunterladen', clear: 'Leeren',
        output: 'Ausgabe', waiting: 'Warte auf Eingabe', advanced: 'Erweiterte Analyse'
      },
      es: {
        home: 'Inicio', countries: 'Países', identifiers: 'Identificadores',
        tool: 'Herramienta', runTool: 'Ejecutar herramienta', workbench: 'Banco de trabajo',
        relatedTools: 'Herramientas relacionadas', continueWithRelated: 'Continuar con herramientas relacionadas',
        validate: 'Validar', copyResult: 'Copiar resultado', downloadResult: 'Descargar resultado', clear: 'Limpiar',
        output: 'Salida', waiting: 'Esperando entrada', advanced: 'Análisis avanzado'
      },
      pl: {
        home: 'Start', countries: 'Kraje', identifiers: 'Identyfikatory',
        tool: 'Narzędzie', runTool: 'Uruchom narzędzie', workbench: 'Workbench',
        relatedTools: 'Powiązane narzędzia', continueWithRelated: 'Przejdź do powiązanych narzędzi',
        validate: 'Sprawdź', copyResult: 'Kopiuj wynik', downloadResult: 'Pobierz wynik', clear: 'Wyczyść',
        output: 'Wynik', waiting: 'Oczekiwanie na dane', advanced: 'Analiza zaawansowana'
      },
      'pt-BR': {
        home: 'Início', countries: 'Países', identifiers: 'Identificadores',
        tool: 'Ferramenta', runTool: 'Executar ferramenta', workbench: 'Workbench',
        relatedTools: 'Ferramentas relacionadas', continueWithRelated: 'Continuar com ferramentas relacionadas',
        validate: 'Validar', copyResult: 'Copiar resultado', downloadResult: 'Baixar resultado', clear: 'Limpar',
        output: 'Saída', waiting: 'Aguardando entrada', advanced: 'Análise avançada'
      }
    }[lang];

    document.querySelectorAll('.primary-nav a').forEach(a => {
      const txt = (a.textContent || '').trim();
      if (txt === 'Home') a.textContent = ui.home;
      if (txt === 'Countries') a.textContent = ui.countries;
      if (txt === 'Identifiers') a.textContent = ui.identifiers;
    });

    document.querySelectorAll('.eyebrow').forEach(el => {
      const txt = (el.textContent || '').trim();
      if (txt === 'Tool') el.textContent = ui.tool;
      if (txt === 'Workbench') el.textContent = ui.workbench;
      if (txt === 'Related tools') el.textContent = ui.relatedTools;
    });

    document.querySelectorAll('h2').forEach(el => {
      const txt = (el.textContent || '').trim();
      if (txt === 'Run the tool') el.textContent = ui.runTool;
      if (txt === 'Continue with related tools') el.textContent = ui.continueWithRelated;
    });

    document.querySelectorAll('button').forEach(btn => {
      const txt = (btn.textContent || '').trim();
      if (txt === 'Validate') btn.textContent = ui.validate;
      if (txt === 'Copy result') btn.textContent = ui.copyResult;
      if (txt === 'Download result') btn.textContent = ui.downloadResult;
      if (txt === 'Clear') btn.textContent = ui.clear;
    });

    document.querySelectorAll('summary').forEach(el => {
      const txt = (el.textContent || '').trim();
      if (txt === 'Advanced analysis') el.textContent = ui.advanced;
    });

    document.querySelectorAll('.output-field > span').forEach(el => {
      if ((el.textContent || '').trim() === 'Output') el.textContent = ui.output;
    });

    document.querySelectorAll('.input-mode-badge').forEach(el => {
      if ((el.textContent || '').trim() === 'Waiting for input') el.textContent = ui.waiting;
    });
  }

  function showCopiedStatus(btn) {
    const originalText = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => {
      btn.textContent = originalText;
    }, 1500);
  }
});
