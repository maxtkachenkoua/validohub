(() => {
  const root = document.querySelector('[data-tools-search]');
  if (!root) return;

  const input = root.querySelector('[data-tools-search-input]');
  const cards = Array.from(root.querySelectorAll('[data-tool-card]'));
  const groups = Array.from(root.querySelectorAll('[data-tools-group]'));
  const count = root.querySelector('[data-tools-count]');
  const empty = root.querySelector('[data-tools-empty]');
  const chips = Array.from(root.querySelectorAll('[data-tools-query]'));
  const searchShell = input?.closest('.vh-tools-search');
  const locale = (document.documentElement.lang || 'en').split('-')[0];
  const messages = {
    en: { matches: 'matches', empty: 'No global tools match this search.', enter: 'Press Enter to open the top result.', try: 'Try' },
    es: { matches: 'coincidencias', empty: 'Ninguna herramienta global coincide con esta busqueda.', enter: 'Pulsa Enter para abrir el primer resultado.', try: 'Prueba' },
    pt: { matches: 'resultados', empty: 'Nenhuma ferramenta global corresponde a esta busca.', enter: 'Pressione Enter para abrir o primeiro resultado.', try: 'Tente' },
    de: { matches: 'Treffer', empty: 'Keine globalen Tools passen zu dieser Suche.', enter: 'Enter offnet den besten Treffer.', try: 'Versuche' },
    fr: { matches: 'resultats', empty: 'Aucun outil global ne correspond a cette recherche.', enter: 'Entree ouvre le meilleur resultat.', try: 'Essayez' },
    pl: { matches: 'wynikow', empty: 'Brak globalnych narzedzi pasujacych do wyszukiwania.', enter: 'Enter otwiera najlepszy wynik.', try: 'Sprobuj' },
    uk: { matches: 'збігів', empty: 'Немає глобальних інструментів для цього пошуку.', enter: 'Enter відкриє найкращий результат.', try: 'Спробуйте' }
  };
  const copy = messages[locale] || messages.en;
  const searchStatus = document.createElement('p');
  searchStatus.className = 'vh-tools-search-status';
  searchStatus.setAttribute('aria-live', 'polite');
  const dropdown = document.createElement('div');
  dropdown.className = 'vh-tools-search-dropdown';
  dropdown.setAttribute('data-tools-search-results', '');
  dropdown.setAttribute('role', 'listbox');
  dropdown.hidden = true;

  if (searchShell) {
    searchShell.append(dropdown);
    searchShell.insertAdjacentElement('afterend', searchStatus);
  } else if (input) {
    input.insertAdjacentElement('afterend', dropdown);
    dropdown.insertAdjacentElement('afterend', searchStatus);
  }

  function normalize(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\p{L}\p{N}]+/gu, ' ')
      .trim()
      .toLowerCase();
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  const aliases = new Map([
    ['песель', 'pesel'],
    ['пэсель', 'pesel'],
    ['песел', 'pesel'],
    ['пікс', 'pix'],
    ['пикс', 'pix'],
    ['піксель', 'pix'],
    ['цурп', 'curp'],
    ['курп', 'curp'],
    ['рут', 'rut'],
    ['рун', 'run'],
    ['сирет', 'siret'],
    ['сирен', 'siren'],
    ['ват', 'vat'],
    ['ндс', 'vat'],
    ['еорі', 'eori'],
    ['еори', 'eori'],
    ['ібан', 'iban'],
    ['ибан', 'iban'],
    ['свіфт', 'swift'],
    ['свифт', 'swift'],
    ['бік', 'bic'],
    ['бик', 'bic'],
    ['джейсон', 'json'],
    ['жсон', 'json'],
    ['джсон', 'json'],
    ['регекс', 'regex'],
    ['регулярка', 'regex'],
    ['юуид', 'uuid'],
    ['уид', 'uuid'],
    ['урл', 'url'],
    ['ссп', 'csp'],
    ['корс', 'cors'],
    ['секрет', 'secret'],
    ['піі', 'pii'],
    ['пии', 'pii'],
    ['персональні', 'pii'],
    ['персональные', 'pii'],
    ['мрз', 'mrz'],
    ['мrz', 'mrz'],
    ['сепа', 'sepa'],
    ['опенапи', 'openapi'],
    ['сваггер', 'swagger'],
    ['вебхук', 'webhook'],
    ['хедер', 'headers'],
    ['заголовки', 'headers'],
    ['схема', 'schema'],
    ['схема json', 'json schema'],
    ['схема джейсон', 'json schema'],
    ['токен', 'jwt'],
    ['токени', 'jwt'],
    ['оаут', 'oauth'],
    ['безпека', 'security'],
    ['безопасность', 'security'],
    ['захист', 'security'],
    ['секьюрити', 'security'],
    ['пошта', 'email'],
    ['почта', 'email'],
    ['дата', 'date'],
    ['час', 'time'],
    ['время', 'time'],
    ['карта сайту', 'sitemap'],
    ['карта сайта', 'sitemap'],
    ['мета', 'meta'],
    ['сео', 'seo'],
    ['хрефланг', 'hreflang'],
    ['канонікал', 'canonical'],
    ['каноникал', 'canonical'],
    ['докер', 'docker'],
    ['кубернетес', 'kubernetes'],
    ['кубер', 'kubernetes'],
    ['тераформ', 'terraform'],
    ['графкл', 'graphql'],
    ['графкуель', 'graphql'],
    ['редактор', 'redactor'],
    ['маска', 'redactor'],
    ['маскування', 'redactor'],
    ['маскирование', 'redactor'],
    ['подпись', 'signature'],
    ['підпис', 'signature'],
    ['веб сокет', 'websocket'],
    ['вебсокет', 'websocket']
  ]);

  const expansions = {
    api: ['api', 'openapi', 'swagger', 'graphql', 'json', 'schema'],
    bank: ['bank', 'iban', 'bban', 'swift', 'bic', 'sepa', 'iso20022'],
    encode: ['encode', 'encoder', 'decode', 'decoder', 'base64', 'url', 'html'],
    id: ['id', 'identifier', 'uuid', 'mrz', 'vat', 'iban'],
    pii: ['pii', 'secret', 'redactor', 'scanner', 'privacy'],
    security: ['security', 'jwt', 'headers', 'csp', 'cors', 'tls', 'cookie', 'webhook', 'secret'],
    seo: ['seo', 'meta', 'html', 'hreflang', 'canonical', 'robots'],
    sitemap: ['sitemap', 'seo', 'html', 'meta'],
    email: ['email', 'domain', 'dns', 'spf', 'dmarc'],
    signature: ['signature', 'webhook', 'secret', 'headers'],
    websocket: ['websocket', 'sse', 'message', 'http'],
    token: ['token', 'jwt', 'jwk', 'oauth'],
    yaml: ['yaml', 'toml', 'kubernetes', 'docker', 'terraform']
  };
  const fallbackQueries = ['json', 'jwt', 'iban', 'seo', 'regex', 'base64', 'webhook', 'pii'];

  const cardModels = cards.map((card, index) => {
    const title = normalize(card.querySelector('strong')?.textContent || '');
    const category = normalize(card.dataset.category || '');
    const search = normalize(`${card.dataset.search || ''} ${card.textContent || ''}`);
    const href = normalize(card.getAttribute('href') || '');
    return { card, index, title, category, search, href };
  });

  function queryTokens(query) {
    const base = normalize(query).split(/\s+/).filter(Boolean);
    const phrase = normalize(query);
    const canonicalPhrase = aliases.get(phrase);
    const canonical = canonicalPhrase ? canonicalPhrase.split(/\s+/) : base.map(token => aliases.get(token) || token);
    return Array.from(new Set(canonical.flatMap(token => [token, ...(expansions[token] || [])])));
  }

  function setQueryParam(rawQuery) {
    if (!window.history?.replaceState) return;
    const query = String(rawQuery || '').trim();
    const url = new URL(window.location.href);
    if (query) url.searchParams.set('q', query);
    else url.searchParams.delete('q');
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  }

  function renderEmptyState() {
    if (!empty) return;
    const buttons = fallbackQueries
      .map(query => `<button type="button" data-tools-query="${query}">${query.toUpperCase()}</button>`)
      .join('');
    empty.innerHTML = `<span>${copy.empty}</span><span class="vh-tools-empty-actions">${copy.try}: ${buttons}</span>`;
  }

  function scoreModel(model, rawQuery, tokens) {
    const query = normalize(rawQuery);
    if (!query) return 1_000_000 - model.index;

    let score = 0;
    if (model.title === query) score += 900;
    if (model.title.startsWith(query)) score += 520;
    if (model.href.includes(` ${query} `) || model.href.includes(query)) score += 420;
    if (model.search.includes(query)) score += 260;
    if (model.category.includes(query)) score += 150;

    let matched = 0;
    for (const token of tokens) {
      if (!token) continue;
      if (model.title.includes(token)) {
        score += 180;
        matched += 1;
      } else if (model.href.includes(token)) {
        score += 140;
        matched += 1;
      } else if (model.category.includes(token)) {
        score += 90;
        matched += 1;
      } else if (model.search.includes(token)) {
        score += 55;
        matched += 1;
      }
    }

    if (matched >= Math.max(1, Math.min(3, tokens.length))) score += matched * 35;
    return score ? score - model.index / 1000 : 0;
  }

  function resultSubtitle(model) {
    const category = model.card.dataset.category || '';
    const summary = model.card.querySelector('span:last-child')?.textContent?.trim() || '';
    return [category, summary].filter(Boolean).join(' · ');
  }

  function renderDropdown(ranked, query) {
    if (!dropdown) return;
    const hasQuery = Boolean(normalize(query));
    const results = hasQuery ? ranked.filter(model => model.score > 0).slice(0, 12) : [];
    dropdown.hidden = results.length === 0;
    if (!results.length) {
      dropdown.innerHTML = '';
      return;
    }
    dropdown.innerHTML = results.map((model, index) => {
      const title = model.card.querySelector('strong')?.textContent?.trim() || model.card.textContent.trim();
      const href = model.card.getAttribute('href') || '#';
      const subtitle = resultSubtitle(model);
      return `
        <a class="vh-tools-search-result${index === 0 ? ' is-top-result' : ''}" href="${escapeHtml(href)}" role="option">
          <span>
            <strong>${escapeHtml(title)}</strong>
            ${subtitle ? `<em>${escapeHtml(subtitle)}</em>` : ''}
          </span>
          <small>${index === 0 ? 'Enter' : 'Open'}</small>
        </a>
      `;
    }).join('');
  }

  function applyFilter(query) {
    const tokens = queryTokens(query);
    const ranked = cardModels
      .map(model => ({ ...model, score: scoreModel(model, query, tokens) }))
      .sort((a, b) => b.score - a.score || a.index - b.index);
    let visible = 0;
    let lead = null;

    for (const model of ranked) {
      const isVisible = model.score > 0;
      model.card.hidden = !isVisible;
      model.card.classList.remove('is-search-lead');
      model.card.style.order = isVisible ? String(Math.max(0, 100000 - Math.round(model.score * 100))) : '';
      if (isVisible) {
        visible += 1;
        lead ||= model.card;
      }
    }

    if (lead && normalize(query)) lead.classList.add('is-search-lead');
    if (count) count.textContent = String(visible);
    if (empty) {
      empty.hidden = visible !== 0;
      if (!visible) renderEmptyState();
    }
    if (searchStatus) {
      const label = normalize(query) ? `${visible} ${copy.matches} · ${copy.enter}` : '';
      searchStatus.textContent = label;
    }
    for (const group of groups) {
      const visibleCards = Array.from(group.querySelectorAll('[data-tool-card]')).some((card) => !card.hidden);
      group.hidden = !visibleCards;
    }
    renderDropdown(ranked, query);
    return lead;
  }

  function applyChipQuery(chip) {
    const searchQuery = chip.dataset.toolsQuery || '';
    const displayQuery = searchQuery ? (chip.textContent || searchQuery).trim() : '';
    if (input) {
      input.value = displayQuery;
      input.dataset.searchQuery = searchQuery;
    }
    applyFilter(searchQuery);
    setQueryParam(searchQuery);
    input?.focus();
  }

  if (input) {
    input.addEventListener('input', () => {
      input.dataset.searchQuery = '';
      applyFilter(input.value);
      setQueryParam(input.value);
    });
    input.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;
      const lead = applyFilter(input.dataset.searchQuery || input.value);
      if (!lead || lead.hidden) return;
      event.preventDefault();
      lead.click();
    });
    const initialQuery = new URLSearchParams(window.location.search).get('q') || '';
    if (initialQuery) {
      input.value = initialQuery;
      applyFilter(initialQuery);
    }
  }

  for (const chip of chips) {
    chip.addEventListener('click', () => {
      applyChipQuery(chip);
    });
  }

  root.addEventListener('click', (event) => {
    const button = event.target.closest('[data-tools-query]');
    if (!button || chips.includes(button)) return;
    applyChipQuery(button);
  });

  document.addEventListener('click', (event) => {
    if (!root.contains(event.target)) dropdown.hidden = true;
  });

  input?.addEventListener('focus', () => {
    if (normalize(input.dataset.searchQuery || input.value)) applyFilter(input.dataset.searchQuery || input.value);
  });

  document.addEventListener('keydown', (event) => {
    const key = String(event.key || '').toLowerCase();
    if ((event.metaKey || event.ctrlKey) && key === 'k') {
      event.preventDefault();
      input?.focus();
      input?.select();
    }
  });

  applyFilter(input?.value || '');
})();
