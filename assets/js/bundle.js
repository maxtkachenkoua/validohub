document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  initGlobalLanguageSwitcher();
  initMegaNavigation();
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
    let rankedMatches = [];
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
      ['polish pesel', 'pesel'],
      ['cpf brazil', 'cpf'],
      ['cnpj brazil', 'cnpj'],
      ['pix brazil', 'pix'],
      ['curp mexico', 'curp'],
      ['rut chile', 'rut'],
      ['vat pl', 'poland vat'],
      ['nrb', 'iban nrb'],
      ['iban', 'iban nrb'],
      ['swift', 'swift bic'],
      ['bic', 'swift bic'],
      ['ksef xml', 'ksef'],
      ['jpk xml', 'jpk'],
      ['regon company', 'regon'],
      ['песель', 'pesel'],
      ['песел', 'pesel'],
      ['пэсель', 'pesel'],
      ['пікс', 'pix'],
      ['пикс', 'pix'],
      ['цурп', 'curp'],
      ['курп', 'curp'],
      ['рут', 'rut'],
      ['рун', 'run'],
      ['ібан', 'iban nrb'],
      ['ибан', 'iban nrb'],
      ['нрб', 'iban nrb'],
      ['свіфт', 'swift bic'],
      ['свифт', 'swift bic'],
      ['бік', 'swift bic'],
      ['бик', 'swift bic'],
      ['ват', 'vat'],
      ['ндс', 'vat'],
      ['еорі', 'eori'],
      ['еори', 'eori'],
      ['мрз', 'mrz'],
      ['паспорт', 'passport'],
      ['документ', 'id card'],
      ['документы', 'id card'],
      ['документи', 'id card'],
      ['пошта', 'postal code'],
      ['почта', 'postal code'],
      ['поштовий код', 'postal code'],
      ['почтовый код', 'postal code'],
      ['телефон', 'phone'],
      ['адреса', 'address'],
      ['адрес', 'address'],
      ['банк', 'bank iban'],
      ['рахунок', 'bank account'],
      ['счет', 'bank account'],
      ['рахунок банк', 'bank account'],
      ['счет банк', 'bank account'],
      ['податок', 'tax vat'],
      ['налог', 'tax vat'],
      ['інвойс', 'invoice'],
      ['инвойс', 'invoice'],
      ['рахунок фактура', 'invoice'],
      ['счет фактура', 'invoice'],
      ['секрет', 'pii masker'],
      ['маска', 'pii masker'],
      ['персональні дані', 'pii masker'],
      ['персональные данные', 'pii masker']
    ]);

    const searchCopy = {
      en: { match: 'match', matches: 'matches', for: 'for', enter: 'Enter to jump', toolsIn: 'tools in', search: 'Search', countryWorkbenches: 'country workbenches' },
      es: { match: 'resultado', matches: 'resultados', for: 'para', enter: 'Enter para abrir', toolsIn: 'herramientas en', search: 'Buscar', countryWorkbenches: 'workbenches del país' },
      'pt-BR': { match: 'resultado', matches: 'resultados', for: 'para', enter: 'Enter para abrir', toolsIn: 'ferramentas em', search: 'Buscar', countryWorkbenches: 'workbenches do país' },
      de: { match: 'Treffer', matches: 'Treffer', for: 'für', enter: 'Enter zum Öffnen', toolsIn: 'Tools in', search: 'Suche', countryWorkbenches: 'Länder-Workbenches' },
      fr: { match: 'résultat', matches: 'résultats', for: 'pour', enter: 'Entrée pour ouvrir', toolsIn: 'outils dans', search: 'Rechercher', countryWorkbenches: 'workbenches pays' },
      pl: { match: 'wynik', matches: 'wyniki', for: 'dla', enter: 'Enter, aby otworzyć', toolsIn: 'narzędzi w', search: 'Szukaj', countryWorkbenches: 'workbenche kraju' },
      uk: { match: 'збіг', matches: 'збігів', for: 'для', enter: 'Enter, щоб відкрити', toolsIn: 'інструментів у', search: 'Пошук', countryWorkbenches: 'воркбенчах країни' }
    };

    function localeCode() {
      return detectPathLocale() || normalizeLocaleTag(document.documentElement.lang || '') || 'en';
    }

    function searchLabel(key) {
      const locale = localeCode();
      return (searchCopy[locale] && searchCopy[locale][key]) || searchCopy.en[key] || key;
    }

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
      const terms = Array.from(new Set([...recent, ...baseQueries])).slice(0, 10);
      shortcutsWrap.innerHTML = terms.map(term => {
        const label = shortcutLabelByQuery.get(term) || term;
        return `<button class="vh-country-search-chip" type="button" data-country-search-shortcut="${escapeHtml(term)}">${escapeHtml(label)}</button>`;
      }).join('');
    }

    function canonicalizeQuery(value) {
      const normalized = normalizeSearchText(value);
      return aliases.get(normalized) || normalized;
    }

    function setCountrySearchParam(rawQuery) {
      if (!window.history?.replaceState) return;
      const value = String(rawQuery || '').trim();
      const url = new URL(window.location.href);
      if (value) url.searchParams.set('q', value);
      else url.searchParams.delete('q');
      window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
    }

    function queryTokens(query) {
      return normalizeSearchText(query).split(' ').filter(Boolean);
    }

    function routeTierBoost(row) {
      const tier = row.dataset.routeTier || '';
      if (tier === 'primary') return 90;
      if (tier === 'secondary') return 45;
      if (tier === 'reference') return -20;
      return 0;
    }

    function rowSearchScore(row, query) {
      const normalizedQuery = normalizeSearchText(query);
      if (!normalizedQuery) return 0;
      const tokens = queryTokens(normalizedQuery);
      const title = normalizeSearchText(row.querySelector('strong')?.textContent || '');
      const slug = normalizeSearchText(row.dataset.routeSlug || '');
      const meta = normalizeSearchText(row.querySelector('small')?.textContent || '');
      const haystack = normalizeSearchText([
        title,
        slug,
        row.dataset.searchText || '',
        row.textContent || ''
      ].join(' '));
      let score = routeTierBoost(row);
      if (slug === normalizedQuery || title === normalizedQuery) score += 1400;
      if (tokens.length === 1 && slug.includes(`${tokens[0]} validator`)) score += 700;
      if (slug.includes(normalizedQuery) || title.includes(normalizedQuery)) score += 850;
      if (tokens.length && tokens.every(token => slug.split(' ').includes(token))) score += 760;
      if (tokens.length && tokens.every(token => title.split(' ').includes(token))) score += 720;
      if (tokens.length && tokens.every(token => haystack.includes(token))) score += 220;
      if (haystack.includes(normalizedQuery)) score += 140;
      if (meta.includes('reference')) score -= 35;
      if (/personal identifiers|documents, contacts|country developer|data quality|tool intelligence/.test(title) && !tokens.some(token => slug.split(' ').includes(token))) {
        score -= 180;
      }
      return score;
    }

    function buildSuggestionItem(row, index, rawQuery) {
      const href = row.getAttribute('href') || '#';
      const slug = row.dataset.routeSlug || '';
      const baseTitle = (row.querySelector('strong')?.textContent || '').trim() || (row.textContent || '').trim();
      const title = routeSearchTitle(slug, baseTitle);
      const meta = routeSearchMeta(slug, row, href);
      return `
        <a class="vh-country-search-suggestion" href="${escapeHtml(href)}" role="option" data-suggestion-index="${index}">
          <span class="vh-country-search-suggestion-title">${highlightMatches(title, rawQuery)}</span>
          <span class="vh-country-search-suggestion-meta">${highlightMatches(meta, rawQuery)}</span>
        </a>
      `;
    }

    function routeSearchTitle(slug, title) {
      if (/pix-copy-paste-decoder|pix-copy.*decoder/.test(slug)) return 'Pix Copy-and-Paste Decoder';
      if (/pix-qr-payload-generator|pix.*qr.*payload.*generator/.test(slug)) return 'Pix QR Payload Generator';
      return title;
    }

    function routeSearchMeta(slug, row, href) {
      if (/pix-validator/.test(slug)) return 'Pix key and BR Code validation';
      if (/pix-copy-paste-decoder|pix-copy.*decoder/.test(slug)) return 'Decode copy-and-paste BR Code payloads';
      if (/pix-qr-payload-generator|pix.*qr.*payload.*generator/.test(slug)) return 'Generate Pix QR payload fixtures';
      return (row.querySelector('small')?.textContent || href).trim();
    }

    function renderSuggestions(rawQuery) {
      const query = canonicalizeQuery(rawQuery);
      if (!query) {
        closeSuggestions();
        return;
      }

      visibleMatches = rankedMatches.length ? rankedMatches : rows.filter(row => !row.hidden);
      const topMatches = visibleMatches.slice(0, 8);
      if (!topMatches.length) {
        const fallback = popularFallback.slice(0, 6).map((entry, index) => `
          <button class="vh-country-search-suggestion" type="button" role="option" data-country-search-shortcut="${escapeHtml(entry.query)}" data-suggestion-index="${index}">
            <span class="vh-country-search-suggestion-title">${escapeHtml(entry.label)}</span>
            <span class="vh-country-search-suggestion-meta">${escapeHtml(searchLabel('search'))}</span>
          </button>
        `).join('');
        suggestions.innerHTML = fallback;
        suggestions.hidden = !fallback;
        activeSuggestionIndex = -1;
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
      if (active?.matches('[data-country-search-shortcut]')) {
        const query = active.getAttribute('data-country-search-shortcut') || '';
        input.value = query;
        updateCountryToolSearch(query);
        input.focus();
      } else if (active) {
        window.location.href = active.getAttribute('href');
      }
    }

    searchForm.addEventListener('submit', event => {
      event.preventDefault();
      if (!suggestions.hidden) {
        openActiveSuggestion();
        return;
      }
      const firstMatch = rankedMatches[0] || catalog.querySelector('.vh-country-catalog-row.is-tool-search-match') || rows[0];
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
      if (link.matches('[data-country-search-shortcut]')) {
        const query = link.getAttribute('data-country-search-shortcut') || '';
        input.value = query;
        updateCountryToolSearch(query);
        input.focus();
        return;
      }
      window.location.href = link.getAttribute('href');
    });

    shortcutsWrap?.addEventListener('click', event => {
      const chip = event.target.closest('[data-country-search-shortcut]');
      if (!chip) return;
      const shortcut = chip.getAttribute('data-country-search-shortcut') || '';
      input.value = shortcut;
      updateCountryToolSearch(shortcut);
      setCountrySearchParam(shortcut);
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
      setCountrySearchParam('');
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
        const score = query ? rowSearchScore(row, query) : routeTierBoost(row);
        const matches = matchesIntent && (!query || score > 0 || haystack.includes(query));
        row.dataset.searchScore = String(score);
        row.hidden = !matches;
        row.classList.toggle('is-tool-search-match', Boolean(query && matches));
        if (matches) matchCount += 1;
      });

      rankedMatches = rows
        .filter(row => !row.hidden)
        .sort((a, b) => Number(b.dataset.searchScore || 0) - Number(a.dataset.searchScore || 0));

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
          const matchLabel = matchCount === 1 ? searchLabel('match') : searchLabel('matches');
          status.textContent = `${matchCount} ${matchLabel} ${searchLabel('for')} “${rawQuery.trim()}” · ${searchLabel('enter')}`;
        } else if (activeIntent !== 'all') {
          status.textContent = `${matchCount} ${searchLabel('toolsIn')} ${activeIntent.replace(/-/g, ' ')}`;
        } else {
          status.textContent = `${searchLabel('search')} ${allCount} ${searchLabel('countryWorkbenches')}`;
        }
      }

      if (query) {
        saveRecentTerm(query);
      }
      renderShortcutChips();
      renderSuggestions(rawQuery);
      setCountrySearchParam(rawQuery);
    }

    renderShortcutChips();
    const initialQuery = new URLSearchParams(window.location.search).get('q') || '';
    if (initialQuery) {
      input.value = initialQuery;
      updateCountryToolSearch(initialQuery);
    } else {
      updateCountryToolSearch('');
    }
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

  function initMegaNavigation() {
    const header = document.querySelector('.site-header');
    const nav = header?.querySelector('.primary-nav');
    if (!header || !nav || header.dataset.megaReady === 'true') return;
    header.dataset.megaReady = 'true';

    const localeMatch = window.location.pathname.match(/^\/(en|es|de|fr|pl|uk|pt-BR)(?:\/|$)/);
    const locale = localeMatch?.[1] || 'en';
    const href = (path) => `/${locale}${path}`;
    const megaText = (value) => localizeMegaNavigationText(locale, value);
    const megaCountryName = (label, path) => localizeMegaCountryName(locale, label, path);
    const navLinks = Array.from(nav.querySelectorAll('a'));
    const linkFor = (key) => navLinks.find((link) => {
      const url = link.getAttribute('href') || '';
      const text = (link.textContent || '').toLowerCase();
      if (key === 'tools') return /\/tools\/?$/.test(url) || text.includes('tools') || text.includes('outils') || text.includes('werkzeuge') || text.includes('narz') || text.includes('інстру');
      if (key === 'countries') return /\/countries\/?$/.test(url) || text.includes('countr') || text.includes('pays') || text.includes('país') || text.includes('länder') || text.includes('kraje') || text.includes('країн');
      return /national-identifiers/.test(url) || text.includes('identifier') || text.includes('identifi') || text.includes('kennung') || text.includes('ідентиф');
    });

    const menuData = {
      tools: {
        kicker: 'Global Tools',
        title: 'Browser utilities by workflow',
        columns: [
          {
            title: 'Payloads & APIs',
            preview: '5 shown',
            allLabel: 'See all Payloads & APIs',
            allPath: '/tools/#data-api-contracts',
            links: [
              ['JSON Formatter', '/tools/json-formatter/'],
              ['JSON Validator', '/tools/json-validator/'],
              ['JSON Schema Workbench', '/tools/json-schema-workbench/'],
              ['OpenAPI / Swagger Inspector', '/tools/openapi-inspector/'],
              ['GraphQL Workbench', '/tools/graphql-workbench/']
            ]
          },
          {
            title: 'Security & Web',
            preview: '5 shown',
            allLabel: 'See all Security & Web',
            allPath: '/tools/#security-trust',
            links: [
              ['HTTP Security Headers', '/tools/http-security-headers-inspector/'],
              ['Webhook Signature Verifier', '/tools/webhook-signature-verifier/'],
              ['Secret & PII Redactor', '/tools/secret-pii-redactor/'],
              ['CSP Builder / Auditor', '/tools/csp-builder-auditor/'],
              ['CORS Policy Workbench', '/tools/cors-policy-workbench/']
            ]
          },
          {
            title: 'Encoding & Text',
            preview: '5 shown',
            allLabel: 'See all Encoding & Text',
            allPath: '/tools/#text-time-utilities',
            links: [
              ['Base64 Encoder', '/tools/base64-encoder/'],
              ['Base64 Decoder', '/tools/base64-decoder/'],
              ['URL Encoder', '/tools/url-encoder/'],
              ['Regex Tester', '/tools/regex-tester/'],
              ['Text Diff', '/tools/text-diff/']
            ]
          },
          {
            title: 'Banking & Test Data',
            preview: '5 shown',
            allLabel: 'See all Banking & Test Data',
            allPath: '/tools/#regulated-formats',
            links: [
              ['IBAN Generator', '/tools/iban-generator/'],
              ['IBAN Validator', '/tools/iban-validator/'],
              ['SWIFT / BIC Workbench', '/tools/swift-bic-workbench/'],
              ['UUID Generator', '/tools/uuid-generator/'],
              ['Locale Test Data Generator', '/tools/locale-test-data-generator/']
            ]
          }
        ],
        actions: [['Open all global tools', '/tools/'], ['IBAN generator', '/tools/iban-generator/']]
      },
      countries: {
        kicker: 'Countries',
        title: 'Coverage by continent',
        columns: [
          {
            title: 'Americas',
            preview: '8 shown',
            allLabel: 'See all Americas',
            allPath: '/countries/#americas',
            countries: [
              ['🇧🇷', 'Brazil', '/brazil/'], ['🇦🇷', 'Argentina', '/argentina/'], ['🇨🇱', 'Chile', '/chile/'],
              ['🇨🇴', 'Colombia', '/colombia/'], ['🇲🇽', 'Mexico', '/mexico/'], ['🇺🇸', 'United States', '/united-states/'],
              ['🇨🇦', 'Canada', '/canada/'], ['🇵🇪', 'Peru', '/peru/']
            ]
          },
          {
            title: 'Europe',
            preview: '8 shown',
            allLabel: 'See all Europe',
            allPath: '/countries/#europe',
            countries: [
              ['🇵🇱', 'Poland', '/poland/'], ['🇫🇷', 'France', '/france/'], ['🇩🇪', 'Germany', '/germany/'],
              ['🇳🇱', 'Netherlands', '/netherlands/'], ['🇪🇸', 'Spain', '/spain/'], ['🇮🇹', 'Italy', '/italy/'],
              ['🇨🇭', 'Switzerland', '/switzerland/'], ['🇨🇿', 'Czechia', '/czechia/']
            ]
          },
          {
            title: 'Asia Pacific',
            preview: '8 shown',
            allLabel: 'See all Asia Pacific',
            allPath: '/countries/#asia-pacific',
            countries: [
              ['🇯🇵', 'Japan', '/japan/'], ['🇮🇳', 'India', '/india/'], ['🇸🇬', 'Singapore', '/singapore/'],
              ['🇦🇺', 'Australia', '/australia/'], ['🇮🇩', 'Indonesia', '/indonesia/'], ['🇵🇭', 'Philippines', '/philippines/'],
              ['🇹🇷', 'Turkey', '/turkey/'], ['🇰🇿', 'Kazakhstan', '/kazakhstan/']
            ]
          },
          {
            title: 'Africa & Middle East',
            preview: '7 shown',
            allLabel: 'See all Africa & Middle East',
            allPath: '/countries/#africa-middle-east',
            countries: [
              ['🇿🇦', 'South Africa', '/south-africa/'], ['🇪🇬', 'Egypt', '/egypt/'], ['🇳🇬', 'Nigeria', '/nigeria/'],
              ['🇰🇪', 'Kenya', '/kenya/'], ['🇲🇦', 'Morocco', '/morocco/'], ['🇮🇱', 'Israel', '/israel/'],
              ['🇦🇪', 'United Arab Emirates', '/united-arab-emirates/']
            ]
          }
        ],
        actions: [['Open country directory', '/countries/'], ['Brazil hub', '/brazil/'], ['Poland hub', '/poland/']]
      },
      identifiers: {
        kicker: 'Identifiers',
        title: 'Local ID systems worth checking first',
        columns: [
          {
            title: 'Personal IDs',
            preview: '5 shown',
            allLabel: 'See all personal identifiers',
            allPath: '/categories/national-identifiers/',
            links: [
              ['PESEL', '/poland/pesel-validator/'],
              ['CURP', '/mexico/mexico-curp-validator/'],
              ['Brazil CPF', '/brazil/brazil-cpf-validator/'],
              ['France NIR', '/france/france-nir-key-validator/'],
              ['Netherlands BSN', '/netherlands/netherlands-bsn-validator/']
            ]
          },
          {
            title: 'Business & Tax',
            preview: '5 shown',
            allLabel: 'See all business IDs',
            allPath: '/categories/national-identifiers/',
            links: [
              ['Brazil CNPJ', '/brazil/brazil-cnpj-validator/'],
              ['France SIRET', '/france/france-siret-validator/'],
              ['EU VAT Number', '/tools/eu-vat-number-workbench/'],
              ['Poland REGON', '/poland/poland-regon-validator/'],
              ['EORI Inspector', '/poland/poland-eori-inspector/']
            ]
          },
          {
            title: 'Payments & Banking',
            preview: '5 shown',
            allLabel: 'See all payment IDs',
            allPath: '/tools/#regulated-formats',
            links: [
              ['Brazil Pix', '/brazil/brazil-pix-validator/'],
              ['IBAN Validator', '/tools/iban-validator/'],
              ['IBAN Generator', '/tools/iban-generator/'],
              ['SWIFT / BIC', '/tools/swift-bic-workbench/'],
              ['Boleto Barcode', '/brazil/brazil-boleto-barcode-validator/']
            ]
          },
          {
            title: 'Documents & Mobility',
            preview: '4 shown',
            allLabel: 'See all document tools',
            allPath: '/countries/',
            links: [
              ['MRZ Passport Workbench', '/tools/mrz-passport-workbench/'],
              ['VIN Validator', '/poland/poland-vin-validator/'],
              ['License Plate Inspector', '/poland/poland-license-plate-inspector/'],
              ['ID Card Validator', '/poland/poland-id-card-validator/']
            ]
          }
        ],
        actions: [['Open identifier library', '/categories/national-identifiers/'], ['PESEL guide', '/identifiers/pesel/']]
      }
    };

    const menu = document.createElement('div');
    menu.className = 'vh-mega-menu';
    menu.hidden = true;
    header.appendChild(menu);

    let activeKey = null;
    let closeTimer = null;

    const render = (key) => {
      const data = menuData[key];
      if (!data) return;
      activeKey = key;
      menu.innerHTML = `
        <div class="vh-mega-shell" role="dialog" aria-label="${escapeHtml(megaText(data.title))}">
          <div class="vh-mega-head">
            <span>${escapeHtml(megaText(data.kicker))}</span>
            <strong>${escapeHtml(megaText(data.title))}</strong>
          </div>
          <div class="vh-mega-grid">
            ${data.columns.map((column) => `
              <section class="vh-mega-column">
                <h3>${escapeHtml(megaText(column.title))}</h3>
                <div class="${column.countries ? 'vh-mega-country-list' : 'vh-mega-link-list'}">
                  ${(column.countries || column.links).map((item) => {
                    const label = column.countries ? megaCountryName(item[1], item[2]) : megaText(item[0]);
                    const icon = column.countries ? `<span class="vh-mega-flag">${item[0]}</span>` : '<span class="vh-mega-dot"></span>';
                    const path = column.countries ? item[2] : item[1];
                    return `<a class="vh-mega-item" href="${href(path)}">${icon}<span>${escapeHtml(label)}</span></a>`;
                  }).join('')}
                </div>
                ${column.allLabel && column.allPath ? `
                  <div class="vh-mega-column-foot">
                    <span>${escapeHtml(megaText(column.preview || 'Preview'))}</span>
                    <a href="${href(column.allPath)}">${escapeHtml(megaText(column.allLabel))}</a>
                  </div>
                ` : ''}
              </section>
            `).join('')}
          </div>
          <div class="vh-mega-actions">
            ${data.actions.map(([label, path]) => `<a href="${href(path)}">${escapeHtml(megaText(label))}</a>`).join('')}
          </div>
        </div>`;
    };

    const open = (key) => {
      window.clearTimeout(closeTimer);
      render(key);
      menu.hidden = false;
      navLinks.forEach((link) => link.setAttribute('aria-expanded', String(link === linkFor(key))));
    };

    const close = () => {
      menu.hidden = true;
      activeKey = null;
      navLinks.forEach((link) => link.removeAttribute('aria-expanded'));
    };

    const scheduleClose = () => {
      window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(close, 140);
    };

    ['tools', 'countries', 'identifiers'].forEach((key) => {
      const link = linkFor(key);
      if (!link) return;
      link.classList.add('vh-mega-trigger');
      link.setAttribute('aria-haspopup', 'dialog');
      link.addEventListener('mouseenter', () => open(key));
      link.addEventListener('mouseover', () => open(key));
      link.addEventListener('pointerenter', () => open(key));
      link.addEventListener('focus', () => open(key));
      link.addEventListener('click', (event) => {
        if (window.matchMedia('(max-width: 860px)').matches && activeKey !== key) {
          event.preventDefault();
          open(key);
        }
      });
    });

    nav.addEventListener('mouseleave', scheduleClose);
    nav.addEventListener('mousemove', (event) => {
      const trigger = event.target.closest?.('.vh-mega-trigger');
      if (!trigger) return;
      if (trigger === linkFor('tools')) open('tools');
      if (trigger === linkFor('countries')) open('countries');
      if (trigger === linkFor('identifiers')) open('identifiers');
    });
    menu.addEventListener('mouseenter', () => window.clearTimeout(closeTimer));
    menu.addEventListener('mouseleave', scheduleClose);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close();
    });
    document.addEventListener('pointerdown', (event) => {
      if (!menu.hidden && !header.contains(event.target)) close();
    });
  }

  function localizeMegaNavigationText(locale, value) {
    const text = String(value || '');
    const dictionaries = {
      es: {
        'Global Tools': 'Herramientas globales',
        'Browser utilities by workflow': 'Utilidades de navegador por flujo',
        'Payloads & APIs': 'Payloads y APIs',
        'See all Payloads & APIs': 'Ver Payloads y APIs',
        'Security & Web': 'Seguridad y web',
        'See all Security & Web': 'Ver seguridad y web',
        'Encoding & Text': 'Codificacion y texto',
        'See all Encoding & Text': 'Ver codificacion y texto',
        'Banking & Test Data': 'Banca y datos de prueba',
        'See all Banking & Test Data': 'Ver banca y datos de prueba',
        'Open all global tools': 'Abrir todas las herramientas globales',
        'IBAN generator': 'Generador IBAN',
        'Countries': 'Paises',
        'Coverage by continent': 'Cobertura por continente',
        'Americas': 'Americas',
        'Europe': 'Europa',
        'Asia Pacific': 'Asia Pacifico',
        'Africa & Middle East': 'Africa y Oriente Medio',
        'See all Americas': 'Ver Americas',
        'See all Europe': 'Ver Europa',
        'See all Asia Pacific': 'Ver Asia Pacifico',
        'See all Africa & Middle East': 'Ver Africa y Oriente Medio',
        'Open country directory': 'Abrir directorio de paises',
        'Brazil hub': 'Hub de Brasil',
        'Poland hub': 'Hub de Polonia',
        'Identifiers': 'Identificadores',
        'Local ID systems worth checking first': 'Sistemas de ID locales que conviene revisar primero',
        'Personal IDs': 'IDs personales',
        'Business & Tax': 'Empresa e impuestos',
        'Payments & Banking': 'Pagos y banca',
        'Documents & Mobility': 'Documentos y movilidad',
        'See all personal identifiers': 'Ver identificadores personales',
        'See all business IDs': 'Ver IDs de empresa',
        'See all payment IDs': 'Ver IDs de pago',
        'See all document tools': 'Ver herramientas de documentos',
        'Open identifier library': 'Abrir biblioteca de identificadores',
        'PESEL guide': 'Guia PESEL',
        'JSON Formatter': 'Formateador JSON',
        'JSON Validator': 'Validador JSON',
        'JSON Schema Workbench': 'Workbench JSON Schema',
        'OpenAPI / Swagger Inspector': 'Inspector OpenAPI / Swagger',
        'GraphQL Workbench': 'Workbench GraphQL',
        'HTTP Security Headers': 'Cabeceras de seguridad HTTP',
        'Webhook Signature Verifier': 'Verificador de firmas webhook',
        'Secret & PII Redactor': 'Redactor de secretos y PII',
        'CSP Builder / Auditor': 'Constructor/auditor CSP',
        'CORS Policy Workbench': 'Workbench de politica CORS',
        'Base64 Encoder': 'Codificador Base64',
        'Base64 Decoder': 'Decodificador Base64',
        'URL Encoder': 'Codificador URL',
        'Regex Tester': 'Probador regex',
        'Text Diff': 'Diff de texto',
        'IBAN Generator': 'Generador IBAN',
        'IBAN Validator': 'Validador IBAN',
        'SWIFT / BIC Workbench': 'Workbench SWIFT / BIC',
        'UUID Generator': 'Generador UUID',
        'Locale Test Data Generator': 'Generador de datos de prueba locales',
        'Brazil CPF': 'CPF de Brasil',
        'France NIR': 'NIR de Francia',
        'Netherlands BSN': 'BSN de Paises Bajos',
        'Brazil CNPJ': 'CNPJ de Brasil',
        'France SIRET': 'SIRET de Francia',
        'EU VAT Number': 'Numero IVA UE',
        'Poland REGON': 'REGON de Polonia',
        'EORI Inspector': 'Inspector EORI',
        'Brazil Pix': 'Pix de Brasil',
        'Boleto Barcode': 'Codigo de barras Boleto',
        'MRZ Passport Workbench': 'Workbench pasaporte MRZ',
        'VIN Validator': 'Validador VIN',
        'License Plate Inspector': 'Inspector de matriculas',
        'ID Card Validator': 'Validador de documento ID'
      },
      'pt-BR': {
        'Global Tools': 'Ferramentas globais',
        'Browser utilities by workflow': 'Utilitarios de navegador por fluxo',
        'Payloads & APIs': 'Payloads e APIs',
        'See all Payloads & APIs': 'Ver Payloads e APIs',
        'Security & Web': 'Seguranca e web',
        'See all Security & Web': 'Ver seguranca e web',
        'Encoding & Text': 'Codificacao e texto',
        'See all Encoding & Text': 'Ver codificacao e texto',
        'Banking & Test Data': 'Bancos e dados de teste',
        'See all Banking & Test Data': 'Ver bancos e dados de teste',
        'Open all global tools': 'Abrir todas as ferramentas globais',
        'IBAN generator': 'Gerador IBAN',
        'Countries': 'Paises',
        'Coverage by continent': 'Cobertura por continente',
        'Americas': 'Americas',
        'Europe': 'Europa',
        'Asia Pacific': 'Asia Pacifico',
        'Africa & Middle East': 'Africa e Oriente Medio',
        'See all Americas': 'Ver Americas',
        'See all Europe': 'Ver Europa',
        'See all Asia Pacific': 'Ver Asia Pacifico',
        'See all Africa & Middle East': 'Ver Africa e Oriente Medio',
        'Open country directory': 'Abrir diretorio de paises',
        'Brazil hub': 'Hub do Brasil',
        'Poland hub': 'Hub da Polonia',
        'Identifiers': 'Identificadores',
        'Local ID systems worth checking first': 'Sistemas de ID locais para verificar primeiro',
        'Personal IDs': 'IDs pessoais',
        'Business & Tax': 'Empresas e impostos',
        'Payments & Banking': 'Pagamentos e bancos',
        'Documents & Mobility': 'Documentos e mobilidade',
        'See all personal identifiers': 'Ver identificadores pessoais',
        'See all business IDs': 'Ver IDs empresariais',
        'See all payment IDs': 'Ver IDs de pagamento',
        'See all document tools': 'Ver ferramentas de documentos',
        'Open identifier library': 'Abrir biblioteca de identificadores',
        'PESEL guide': 'Guia PESEL',
        'JSON Formatter': 'Formatador JSON',
        'JSON Validator': 'Validador JSON',
        'JSON Schema Workbench': 'Workbench JSON Schema',
        'OpenAPI / Swagger Inspector': 'Inspetor OpenAPI / Swagger',
        'GraphQL Workbench': 'Workbench GraphQL',
        'HTTP Security Headers': 'Cabecalhos de seguranca HTTP',
        'Webhook Signature Verifier': 'Verificador de assinatura webhook',
        'Secret & PII Redactor': 'Redator de segredos e PII',
        'CSP Builder / Auditor': 'Construtor/auditor CSP',
        'CORS Policy Workbench': 'Workbench de politica CORS',
        'Base64 Encoder': 'Codificador Base64',
        'Base64 Decoder': 'Decodificador Base64',
        'URL Encoder': 'Codificador URL',
        'Regex Tester': 'Testador regex',
        'Text Diff': 'Diff de texto',
        'IBAN Generator': 'Gerador IBAN',
        'IBAN Validator': 'Validador IBAN',
        'SWIFT / BIC Workbench': 'Workbench SWIFT / BIC',
        'UUID Generator': 'Gerador UUID',
        'Locale Test Data Generator': 'Gerador de dados de teste locais',
        'Brazil CPF': 'CPF do Brasil',
        'France NIR': 'NIR da Franca',
        'Netherlands BSN': 'BSN dos Paises Baixos',
        'Brazil CNPJ': 'CNPJ do Brasil',
        'France SIRET': 'SIRET da Franca',
        'EU VAT Number': 'Numero de IVA da UE',
        'Poland REGON': 'REGON da Polonia',
        'EORI Inspector': 'Inspetor EORI',
        'Brazil Pix': 'Pix do Brasil',
        'Boleto Barcode': 'Codigo de barras Boleto',
        'MRZ Passport Workbench': 'Workbench de passaporte MRZ',
        'VIN Validator': 'Validador VIN',
        'License Plate Inspector': 'Inspetor de placas',
        'ID Card Validator': 'Validador de documento ID'
      },
      de: {
        'Global Tools': 'Globale Tools',
        'Browser utilities by workflow': 'Browser-Utilities nach Workflow',
        'Payloads & APIs': 'Payloads und APIs',
        'See all Payloads & APIs': 'Alle Payloads und APIs anzeigen',
        'Security & Web': 'Sicherheit und Web',
        'See all Security & Web': 'Alle Sicherheits- und Webtools anzeigen',
        'Encoding & Text': 'Kodierung und Text',
        'See all Encoding & Text': 'Alle Kodierungs- und Texttools anzeigen',
        'Banking & Test Data': 'Banking und Testdaten',
        'See all Banking & Test Data': 'Alle Banking- und Testdaten-Tools anzeigen',
        'Open all global tools': 'Alle globalen Tools offnen',
        'IBAN generator': 'IBAN-Generator',
        'Countries': 'Lander',
        'Coverage by continent': 'Abdeckung nach Kontinent',
        'Americas': 'Amerika',
        'Europe': 'Europa',
        'Asia Pacific': 'Asien-Pazifik',
        'Africa & Middle East': 'Afrika und Naher Osten',
        'See all Americas': 'Alle Amerika-Lander anzeigen',
        'See all Europe': 'Alle Europa-Lander anzeigen',
        'See all Asia Pacific': 'Alle Asien-Pazifik-Lander anzeigen',
        'See all Africa & Middle East': 'Alle Afrika- und Nahost-Lander anzeigen',
        'Open country directory': 'Landerverzeichnis offnen',
        'Brazil hub': 'Brasilien-Hub',
        'Poland hub': 'Polen-Hub',
        'Identifiers': 'Kennungen',
        'Local ID systems worth checking first': 'Lokale ID-Systeme, die zuerst gepruft werden sollten',
        'Personal IDs': 'Personenkennungen',
        'Business & Tax': 'Unternehmen und Steuern',
        'Payments & Banking': 'Zahlungen und Banking',
        'Documents & Mobility': 'Dokumente und Mobilitat',
        'See all personal identifiers': 'Alle Personenkennungen anzeigen',
        'See all business IDs': 'Alle Unternehmenskennungen anzeigen',
        'See all payment IDs': 'Alle Zahlungskennungen anzeigen',
        'See all document tools': 'Alle Dokumenttools anzeigen',
        'Open identifier library': 'Kennungsbibliothek offnen',
        'PESEL guide': 'PESEL-Leitfaden',
        'JSON Formatter': 'JSON-Formatierer',
        'JSON Validator': 'JSON-Validator',
        'JSON Schema Workbench': 'JSON-Schema-Workbench',
        'OpenAPI / Swagger Inspector': 'OpenAPI-/Swagger-Inspektor',
        'GraphQL Workbench': 'GraphQL-Workbench',
        'HTTP Security Headers': 'HTTP-Sicherheitsheader',
        'Webhook Signature Verifier': 'Webhook-Signaturprufer',
        'Secret & PII Redactor': 'Secret- und PII-Redaktor',
        'CSP Builder / Auditor': 'CSP-Builder/Auditor',
        'CORS Policy Workbench': 'CORS-Policy-Workbench',
        'Base64 Encoder': 'Base64-Encoder',
        'Base64 Decoder': 'Base64-Decoder',
        'URL Encoder': 'URL-Encoder',
        'Regex Tester': 'Regex-Tester',
        'Text Diff': 'Text-Diff',
        'IBAN Generator': 'IBAN-Generator',
        'IBAN Validator': 'IBAN-Validator',
        'SWIFT / BIC Workbench': 'SWIFT-/BIC-Workbench',
        'UUID Generator': 'UUID-Generator',
        'Locale Test Data Generator': 'Generator fur Locale-Testdaten',
        'Brazil CPF': 'Brasilianische CPF',
        'France NIR': 'Franzosische NIR',
        'Netherlands BSN': 'Niederlandische BSN',
        'Brazil CNPJ': 'Brasilianische CNPJ',
        'France SIRET': 'Franzosische SIRET',
        'EU VAT Number': 'EU-USt-IdNr.',
        'Poland REGON': 'Polnische REGON',
        'EORI Inspector': 'EORI-Inspektor',
        'Brazil Pix': 'Brasilianisches Pix',
        'Boleto Barcode': 'Boleto-Barcode',
        'MRZ Passport Workbench': 'MRZ-Pass-Workbench',
        'VIN Validator': 'VIN-Validator',
        'License Plate Inspector': 'Kennzeichen-Inspektor',
        'ID Card Validator': 'Ausweis-Validator'
      },
      fr: {
        'Global Tools': 'Outils globaux',
        'Browser utilities by workflow': 'Utilitaires navigateur par workflow',
        'Payloads & APIs': 'Payloads et API',
        'See all Payloads & APIs': 'Voir tous les payloads et API',
        'Security & Web': 'Securite et web',
        'See all Security & Web': 'Voir securite et web',
        'Encoding & Text': 'Encodage et texte',
        'See all Encoding & Text': 'Voir encodage et texte',
        'Banking & Test Data': 'Banque et donnees de test',
        'See all Banking & Test Data': 'Voir banque et donnees de test',
        'Open all global tools': 'Ouvrir tous les outils globaux',
        'IBAN generator': 'Generateur IBAN',
        'Countries': 'Pays',
        'Coverage by continent': 'Couverture par continent',
        'Americas': 'Ameriques',
        'Europe': 'Europe',
        'Asia Pacific': 'Asie-Pacifique',
        'Africa & Middle East': 'Afrique et Moyen-Orient',
        'See all Americas': 'Voir toutes les Ameriques',
        'See all Europe': 'Voir toute l Europe',
        'See all Asia Pacific': 'Voir Asie-Pacifique',
        'See all Africa & Middle East': 'Voir Afrique et Moyen-Orient',
        'Open country directory': 'Ouvrir le repertoire des pays',
        'Brazil hub': 'Hub Bresil',
        'Poland hub': 'Hub Pologne',
        'Identifiers': 'Identifiants',
        'Local ID systems worth checking first': 'Systemes ID locaux a verifier en premier',
        'Personal IDs': 'IDs personnels',
        'Business & Tax': 'Entreprise et fiscalite',
        'Payments & Banking': 'Paiements et banque',
        'Documents & Mobility': 'Documents et mobilite',
        'See all personal identifiers': 'Voir les identifiants personnels',
        'See all business IDs': 'Voir les IDs entreprise',
        'See all payment IDs': 'Voir les IDs de paiement',
        'See all document tools': 'Voir les outils documentaires',
        'Open identifier library': 'Ouvrir la bibliotheque d identifiants',
        'PESEL guide': 'Guide PESEL',
        'JSON Formatter': 'Formateur JSON',
        'JSON Validator': 'Validateur JSON',
        'JSON Schema Workbench': 'Workbench JSON Schema',
        'OpenAPI / Swagger Inspector': 'Inspecteur OpenAPI / Swagger',
        'GraphQL Workbench': 'Workbench GraphQL',
        'HTTP Security Headers': 'En-tetes de securite HTTP',
        'Webhook Signature Verifier': 'Verificateur de signature webhook',
        'Secret & PII Redactor': 'Redacteur secrets et PII',
        'CSP Builder / Auditor': 'Constructeur/auditeur CSP',
        'CORS Policy Workbench': 'Workbench de politique CORS',
        'Base64 Encoder': 'Encodeur Base64',
        'Base64 Decoder': 'Decodeur Base64',
        'URL Encoder': 'Encodeur URL',
        'Regex Tester': 'Testeur regex',
        'Text Diff': 'Diff texte',
        'IBAN Generator': 'Generateur IBAN',
        'IBAN Validator': 'Validateur IBAN',
        'SWIFT / BIC Workbench': 'Workbench SWIFT / BIC',
        'UUID Generator': 'Generateur UUID',
        'Locale Test Data Generator': 'Generateur de donnees de test locales',
        'Brazil CPF': 'CPF Bresil',
        'France NIR': 'NIR France',
        'Netherlands BSN': 'BSN Pays-Bas',
        'Brazil CNPJ': 'CNPJ Bresil',
        'France SIRET': 'SIRET France',
        'EU VAT Number': 'Numero TVA UE',
        'Poland REGON': 'REGON Pologne',
        'EORI Inspector': 'Inspecteur EORI',
        'Brazil Pix': 'Pix Bresil',
        'Boleto Barcode': 'Code-barres Boleto',
        'MRZ Passport Workbench': 'Workbench passeport MRZ',
        'VIN Validator': 'Validateur VIN',
        'License Plate Inspector': 'Inspecteur de plaques',
        'ID Card Validator': 'Validateur de carte ID'
      },
      pl: {
        'Global Tools': 'Globalne narzedzia',
        'Browser utilities by workflow': 'Narzedzia przegladarkowe wedlug workflow',
        'Payloads & APIs': 'Payloady i API',
        'See all Payloads & APIs': 'Zobacz payloady i API',
        'Security & Web': 'Bezpieczenstwo i web',
        'See all Security & Web': 'Zobacz bezpieczenstwo i web',
        'Encoding & Text': 'Kodowanie i tekst',
        'See all Encoding & Text': 'Zobacz kodowanie i tekst',
        'Banking & Test Data': 'Bankowosc i dane testowe',
        'See all Banking & Test Data': 'Zobacz bankowosc i dane testowe',
        'Open all global tools': 'Otworz wszystkie globalne narzedzia',
        'IBAN generator': 'Generator IBAN',
        'Countries': 'Kraje',
        'Coverage by continent': 'Pokrycie wedlug kontynentu',
        'Americas': 'Ameryki',
        'Europe': 'Europa',
        'Asia Pacific': 'Azja i Pacyfik',
        'Africa & Middle East': 'Afryka i Bliski Wschod',
        'See all Americas': 'Zobacz Ameryki',
        'See all Europe': 'Zobacz Europe',
        'See all Asia Pacific': 'Zobacz Azje i Pacyfik',
        'See all Africa & Middle East': 'Zobacz Afryke i Bliski Wschod',
        'Open country directory': 'Otworz katalog krajow',
        'Brazil hub': 'Hub Brazylii',
        'Poland hub': 'Hub Polski',
        'Identifiers': 'Identyfikatory',
        'Local ID systems worth checking first': 'Lokalne systemy ID warte sprawdzenia najpierw',
        'Personal IDs': 'Identyfikatory osobiste',
        'Business & Tax': 'Firmy i podatki',
        'Payments & Banking': 'Platnosci i bankowosc',
        'Documents & Mobility': 'Dokumenty i mobilnosc',
        'See all personal identifiers': 'Zobacz identyfikatory osobiste',
        'See all business IDs': 'Zobacz identyfikatory firmowe',
        'See all payment IDs': 'Zobacz identyfikatory platnosci',
        'See all document tools': 'Zobacz narzedzia dokumentow',
        'Open identifier library': 'Otworz biblioteke identyfikatorow',
        'PESEL guide': 'Przewodnik PESEL',
        'JSON Formatter': 'Formatter JSON',
        'JSON Validator': 'Walidator JSON',
        'JSON Schema Workbench': 'Workbench JSON Schema',
        'OpenAPI / Swagger Inspector': 'Inspektor OpenAPI / Swagger',
        'GraphQL Workbench': 'Workbench GraphQL',
        'HTTP Security Headers': 'Naglowki bezpieczenstwa HTTP',
        'Webhook Signature Verifier': 'Weryfikator podpisu webhook',
        'Secret & PII Redactor': 'Redaktor sekretow i PII',
        'CSP Builder / Auditor': 'Builder/audytor CSP',
        'CORS Policy Workbench': 'Workbench polityki CORS',
        'Base64 Encoder': 'Enkoder Base64',
        'Base64 Decoder': 'Dekoder Base64',
        'URL Encoder': 'Enkoder URL',
        'Regex Tester': 'Tester regex',
        'Text Diff': 'Diff tekstu',
        'IBAN Generator': 'Generator IBAN',
        'IBAN Validator': 'Walidator IBAN',
        'SWIFT / BIC Workbench': 'Workbench SWIFT / BIC',
        'UUID Generator': 'Generator UUID',
        'Locale Test Data Generator': 'Generator lokalnych danych testowych',
        'Brazil CPF': 'CPF Brazylii',
        'France NIR': 'NIR Francji',
        'Netherlands BSN': 'BSN Holandii',
        'Brazil CNPJ': 'CNPJ Brazylii',
        'France SIRET': 'SIRET Francji',
        'EU VAT Number': 'Numer VAT UE',
        'Poland REGON': 'REGON Polski',
        'EORI Inspector': 'Inspektor EORI',
        'Brazil Pix': 'Pix Brazylii',
        'Boleto Barcode': 'Kod kreskowy Boleto',
        'MRZ Passport Workbench': 'Workbench paszportu MRZ',
        'VIN Validator': 'Walidator VIN',
        'License Plate Inspector': 'Inspektor tablic rejestracyjnych',
        'ID Card Validator': 'Walidator dowodu ID'
      },
      uk: {
        'Global Tools': 'Глобальні інструменти',
        'Browser utilities by workflow': 'Браузерні утиліти за workflow',
        'Payloads & APIs': 'Payloads та API',
        'See all Payloads & APIs': 'Усі Payloads та API',
        'Security & Web': 'Безпека та web',
        'See all Security & Web': 'Усі інструменти безпеки та web',
        'Encoding & Text': 'Кодування і текст',
        'See all Encoding & Text': 'Усі інструменти кодування і тексту',
        'Banking & Test Data': 'Банкінг і тестові дані',
        'See all Banking & Test Data': 'Усі інструменти банкінгу і тестових даних',
        'Open all global tools': 'Відкрити всі глобальні інструменти',
        'IBAN generator': 'Генератор IBAN',
        'Countries': 'Країни',
        'Coverage by continent': 'Покриття за континентами',
        'Americas': 'Америки',
        'Europe': 'Європа',
        'Asia Pacific': 'Азійсько-Тихоокеанський регіон',
        'Africa & Middle East': 'Африка та Близький Схід',
        'See all Americas': 'Усі країни Америк',
        'See all Europe': 'Уся Європа',
        'See all Asia Pacific': 'Увесь Азійсько-Тихоокеанський регіон',
        'See all Africa & Middle East': 'Уся Африка та Близький Схід',
        'Open country directory': 'Відкрити каталог країн',
        'Brazil hub': 'Хаб Бразилії',
        'Poland hub': 'Хаб Польщі',
        'Identifiers': 'Ідентифікатори',
        'Local ID systems worth checking first': 'Локальні ID-системи, які варто перевірити першими',
        'Personal IDs': 'Персональні ID',
        'Business & Tax': 'Бізнес і податки',
        'Payments & Banking': 'Платежі та банкінг',
        'Documents & Mobility': 'Документи й мобільність',
        'See all personal identifiers': 'Усі персональні ідентифікатори',
        'See all business IDs': 'Усі бізнес-ID',
        'See all payment IDs': 'Усі платіжні ID',
        'See all document tools': 'Усі інструменти документів',
        'Open identifier library': 'Відкрити бібліотеку ідентифікаторів',
        'PESEL guide': 'Гайд PESEL',
        'JSON Formatter': 'Форматер JSON',
        'JSON Validator': 'Валідатор JSON',
        'JSON Schema Workbench': 'Workbench JSON Schema',
        'OpenAPI / Swagger Inspector': 'Інспектор OpenAPI / Swagger',
        'GraphQL Workbench': 'Workbench GraphQL',
        'HTTP Security Headers': 'HTTP security headers',
        'Webhook Signature Verifier': 'Перевірка webhook-підпису',
        'Secret & PII Redactor': 'Редактор секретів і PII',
        'CSP Builder / Auditor': 'CSP builder/auditor',
        'CORS Policy Workbench': 'Workbench CORS policy',
        'Base64 Encoder': 'Base64 encoder',
        'Base64 Decoder': 'Base64 decoder',
        'URL Encoder': 'URL encoder',
        'Regex Tester': 'Regex tester',
        'Text Diff': 'Text diff',
        'IBAN Generator': 'Генератор IBAN',
        'IBAN Validator': 'Валідатор IBAN',
        'SWIFT / BIC Workbench': 'Workbench SWIFT / BIC',
        'UUID Generator': 'Генератор UUID',
        'Locale Test Data Generator': 'Генератор локальних тестових даних',
        'Brazil CPF': 'CPF Бразилії',
        'France NIR': 'NIR Франції',
        'Netherlands BSN': 'BSN Нідерландів',
        'Brazil CNPJ': 'CNPJ Бразилії',
        'France SIRET': 'SIRET Франції',
        'EU VAT Number': 'VAT номер ЄС',
        'Poland REGON': 'REGON Польщі',
        'EORI Inspector': 'Інспектор EORI',
        'Brazil Pix': 'Pix Бразилії',
        'Boleto Barcode': 'Boleto barcode',
        'MRZ Passport Workbench': 'Workbench MRZ паспорта',
        'VIN Validator': 'Валідатор VIN',
        'License Plate Inspector': 'Інспектор номерних знаків',
        'ID Card Validator': 'Валідатор ID-картки'
      }
    };
    const translated = dictionaries[locale]?.[text];
    if (translated) return translated;
    const shown = text.match(/^(\d+) shown$/i);
    if (shown) {
      const count = shown[1];
      if (locale === 'es') return `${count} visibles`;
      if (locale === 'pt-BR') return `${count} exibidos`;
      if (locale === 'de') return `${count} angezeigt`;
      if (locale === 'fr') return `${count} affiches`;
      if (locale === 'pl') return `${count} pokazanych`;
      if (locale === 'uk') return `${count} показано`;
    }
    return text;
  }

  function localizeMegaCountryName(locale, label, path) {
    const countryCodes = {
      '/brazil/': 'BR',
      '/argentina/': 'AR',
      '/chile/': 'CL',
      '/colombia/': 'CO',
      '/mexico/': 'MX',
      '/united-states/': 'US',
      '/canada/': 'CA',
      '/peru/': 'PE',
      '/poland/': 'PL',
      '/france/': 'FR',
      '/germany/': 'DE',
      '/netherlands/': 'NL',
      '/spain/': 'ES',
      '/italy/': 'IT',
      '/switzerland/': 'CH',
      '/czechia/': 'CZ',
      '/japan/': 'JP',
      '/india/': 'IN',
      '/singapore/': 'SG',
      '/australia/': 'AU',
      '/indonesia/': 'ID',
      '/philippines/': 'PH',
      '/turkey/': 'TR',
      '/kazakhstan/': 'KZ',
      '/south-africa/': 'ZA',
      '/egypt/': 'EG',
      '/nigeria/': 'NG',
      '/kenya/': 'KE',
      '/morocco/': 'MA',
      '/israel/': 'IL',
      '/united-arab-emirates/': 'AE'
    };
    const code = countryCodes[path];
    if (!code || locale === 'en') return label;
    try {
      const localized = new Intl.DisplayNames([locale], { type: 'region' }).of(code);
      return localized || label;
    } catch {
      return label;
    }
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
      { code: 'uk', label: 'Ukrainian', icon: 'UA' },
      { code: 'pl', label: 'Polish', icon: 'PL' }
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

    const routeHref = buildLocaleRouteHref(state, normalizedRequested);
    if (routeHref) {
      const targetHref = attachCurrentQueryAndHash(routeHref);
      if (isSameLocation(targetHref)) return false;
      window.location.href = targetHref;
      return true;
    }

    return false;
  }

  function buildLocaleRouteHref(state, requestedLocale) {
    const normalizedRequested = normalizeLocaleTag(requestedLocale);
    const supported = new Set((state.supportedLocales || []).map(item => normalizeLocaleTag(item.code)));
    if (!supported.has(normalizedRequested)) return '';

    const pathname = String(window.location.pathname || '/');
    const parts = pathname.split('/').filter(Boolean);
    const first = normalizeLocaleTag(parts[0] || '');
    const suffixParts = supported.has(first) ? parts.slice(1) : parts;
    if (!suffixParts.length) return `/${normalizedRequested}/`;

    const suffix = suffixParts.join('/');
    const trailingSlash = pathname.endsWith('/') ? '/' : '';
    return `/${normalizedRequested}/${suffix}${trailingSlash}`;
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
