(function () {
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function normalize(value) {
    return String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[’'`]/g, '')
      .replace(/[^a-z0-9а-яіїєґąćęłńóśźżäöüßçñãõ -]+/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function titleizeSlug(slug) {
    return String(slug || '')
      .split('-')
      .filter(Boolean)
      .map(function (part) {
        if (/^(api|jwt|json|url|uuid|iban|vat|eori|cpf|cnpj|pix|pesel|curp|dni|nie|siret|siren|bsn|kvk|rnokpp|bic|swift|mrz|pii|seo|csv)$/i.test(part)) {
          return part.toUpperCase();
        }
        if (/^(id|nr|nrb|cpf|cnpj)$/i.test(part)) return part.toUpperCase();
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join(' ');
  }

  function currentLocale() {
    var pathLocale = (window.location.pathname.match(/^\/([^/]+)\//) || [])[1];
    return pathLocale || document.documentElement.getAttribute('lang') || 'en';
  }

  function localizedPath(path) {
    var locale = currentLocale();
    return String(path || '/en/').replace(/^\/(en|es|pt-br|de|fr|pl|uk)\//i, '/' + locale + '/');
  }

  var synonymGroups = [
    'pesel песель песел',
    'pix пикс пікс pagamento payment qr',
    'curp курп rfc',
    'iban іban айбан ібан ибан bank banking рахунок счет konto generator validator mod97 mod 97',
    'json джейсон схема schema payload api',
    'jwt token токен oauth jwk',
    'base64 encoder decoder encode decode кодування кодирование',
    'url uri ссылка посилання encoder decoder',
    'regex regexp regular expression регулярні регулярные',
    'uuid guid generator генератор fixture fixtures фикстури фикстуры',
    'vat iva tva btw ust tax налог податок',
    'cpf cnpj nit rut nif nie dni siret siren bsn kvk nip regon rnokpp id identifier identity',
    'phone телефон e164 e 164 contact контакт',
    'postal postcode zip address адреса адрес',
    'swift bic bank code routing sort blz',
    'pii secret secrets privacy redaction mask masker приватність конфиденциальность'
  ];

  var synonymIndex = synonymGroups.reduce(function (index, group) {
    var terms = group.split(/\s+/).map(normalize).filter(Boolean);
    terms.forEach(function (term) {
      index[term] = terms;
    });
    return index;
  }, {});

  function expandQuery(query) {
    var normalized = normalize(query);
    if (!normalized) return [];
    var terms = normalized.split(' ').filter(Boolean);
    var expanded = new Set([normalized]);
    terms.forEach(function (term) {
      expanded.add(term);
      (synonymIndex[term] || []).forEach(function (alias) {
        if (alias) expanded.add(alias);
      });
    });
    return Array.from(expanded);
  }

  function routeMetaFromPath(path) {
    var parts = String(path || '').split('/').filter(Boolean);
    var locale = parts[0] || 'en';
    var isGlobalTool = parts[1] === 'tools';
    var countrySlug = isGlobalTool ? '' : (parts[1] || '');
    var toolSlug = isGlobalTool ? (parts[2] || '') : (parts[2] || '');
    var title = isGlobalTool
      ? titleizeSlug(toolSlug)
      : (toolSlug ? titleizeSlug(toolSlug) : titleizeSlug(countrySlug));
    var meta = isGlobalTool
      ? 'Global tool'
      : (toolSlug ? titleizeSlug(countrySlug) + ' workbench' : 'Country hub');
    return {
      locale: locale,
      title: title || 'ValidoHub',
      meta: meta,
      summary: isGlobalTool
        ? 'Universal browser-only developer utility.'
        : (toolSlug ? 'Local country-aware workbench.' : 'Country developer hub.'),
      terms: normalize([path, title, meta, countrySlug, toolSlug].join(' '))
    };
  }

  function dedupeEntries(entries) {
    var seen = new Map();
    entries.forEach(function (entry) {
      if (!entry || !entry.href) return;
      var href = localizedPath(entry.href);
      var existing = seen.get(href);
      var merged = Object.assign({}, existing || {}, entry, { href: href });
      merged.terms = normalize([merged.title, merged.meta, merged.summary, merged.keywords, merged.href, merged.terms].join(' '));
      seen.set(href, merged);
    });
    return Array.from(seen.values());
  }

  function scoreEntry(entry, queryTerms) {
    var score = 0;
    var title = normalize(entry.title);
    var href = normalize(entry.href);
    var pathParts = String(entry.href || '').split('/').filter(Boolean);
    var isCountryHub = pathParts.length === 2;
    var isCategoryPage = pathParts[1] === 'identifiers' || pathParts[1] === 'categories';
    var isConcreteWorkbench = pathParts.length >= 3 && !isCategoryPage;
    var terms = entry.terms || normalize([entry.title, entry.meta, entry.summary, entry.href].join(' '));
    queryTerms.forEach(function (term) {
      if (!term) return;
      if (title === term) score += 40;
      else if (title.indexOf(term) !== -1) score += 18;
      if (href.indexOf(term) !== -1) score += 12;
      if (new RegExp('/[^/]*' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[^/]*/?$').test(href)) score += 18;
      if (terms.indexOf(term) !== -1) score += 6;
    });
    if (score > 0) {
      if (isConcreteWorkbench) score += 14;
      if (/(validator|generator|inspector|workbench|formatter|decoder|encoder|parser|redactor|auditor|normalizer|helper|tester)/.test(href)) score += 18;
      if (isCategoryPage) score -= 36;
      if (isCountryHub) score -= 18;
      if (/pesel|pix|curp|iban|json|jwt|cpf|cnpj|siret|bsn|rnokpp/.test(title)) score += 5;
      if (entry.featured) score += 8;
    }
    return score;
  }

  ready(function () {
    var root = document.querySelector('.vh-home-portal-page');
    var input = document.querySelector('[data-home-search-input]');
    var status = document.querySelector('[data-home-search-status]');
    var dropdown = document.querySelector('[data-home-search-results]');
    var panel = document.querySelector('[data-home-search]');
    if (!root || !input) return;

    var fallbackCards = Array.prototype.slice.call(document.querySelectorAll('.vh-home-tool-card, .vh-home-country-card, .vh-home-lane'));
    var chips = Array.prototype.slice.call(document.querySelectorAll('[data-home-query]'));
    var activeResults = [];
    var sitemapEntriesPromise = null;

    function readFeaturedEntries() {
      return fallbackCards.map(function (card) {
        return {
          href: card.getAttribute('href') || '',
          title: (card.querySelector('strong') || card).textContent.trim(),
          meta: (card.querySelector('.vh-home-tool-kicker') || card.querySelector('span') || {}).textContent || 'Featured',
          summary: (card.querySelector('em') || card.querySelector('span:last-child') || {}).textContent || '',
          keywords: card.getAttribute('data-search') || '',
          featured: true
        };
      }).filter(function (entry) {
        return entry.href && entry.href.charAt(0) === '/';
      });
    }

    function readSitemapEntries() {
      if (sitemapEntriesPromise) return sitemapEntriesPromise;
      var locale = currentLocale();
      sitemapEntriesPromise = fetch('/sitemap.xml', { credentials: 'same-origin' })
        .then(function (response) {
          if (!response.ok) throw new Error('sitemap unavailable');
          return response.text();
        })
        .then(function (xml) {
          var documentXml = new DOMParser().parseFromString(xml, 'application/xml');
          return Array.prototype.slice.call(documentXml.querySelectorAll('loc'))
            .map(function (node) {
              try {
                return new URL(node.textContent).pathname;
              } catch (error) {
                return '';
              }
            })
            .filter(function (path) {
              return path.indexOf('/' + locale + '/') === 0 && !/\.(css|js|png|jpg|jpeg|webp|svg|xml)$/i.test(path);
            })
            .map(function (path) {
              var meta = routeMetaFromPath(path);
              return {
                href: path,
                title: meta.title,
                meta: meta.meta,
                summary: meta.summary,
                keywords: meta.terms,
                featured: false
              };
            });
        })
        .catch(function () {
          return [];
        });
      return sitemapEntriesPromise;
    }

    function findResults(query, entries) {
      var queryTerms = expandQuery(query);
      if (!queryTerms.length) return [];
      return dedupeEntries(entries)
        .map(function (entry) {
          return Object.assign({}, entry, { score: scoreEntry(entry, queryTerms) });
        })
        .filter(function (entry) {
          return entry.score > 0;
        })
        .sort(function (a, b) {
          return b.score - a.score || a.title.localeCompare(b.title);
        })
        .slice(0, 12);
    }

    function closeDropdown() {
      if (dropdown) {
        dropdown.classList.remove('is-visible');
        dropdown.innerHTML = '';
      }
      if (panel) panel.classList.remove('has-search-results');
    }

    function renderDropdown(results, query, total) {
      activeResults = results;
      if (!dropdown || !query) {
        closeDropdown();
        return;
      }
      if (!results.length) {
        dropdown.innerHTML = '<div class="vh-home-search-empty">No matching tools yet. Try PESEL, IBAN, JSON, PIX, CURP, VAT, phone, or bank.</div>';
        dropdown.classList.add('is-visible');
        if (panel) panel.classList.add('has-search-results');
        return;
      }
      dropdown.innerHTML = results.map(function (entry, index) {
        return [
          '<a class="vh-home-search-result" href="' + escapeHtml(entry.href) + '" role="option" data-home-search-result="' + index + '">',
          '<span class="vh-home-search-result-main">',
          '<strong>' + escapeHtml(entry.title) + '</strong>',
          '<em>' + escapeHtml(entry.meta || 'ValidoHub route') + '</em>',
          '</span>',
          '<small>' + escapeHtml(entry.summary || entry.href) + '</small>',
          '</a>'
        ].join('');
      }).join('');
      dropdown.classList.add('is-visible');
      if (panel) panel.classList.add('has-search-results');
      if (status) {
        status.textContent = total + ' matching routes. Enter opens ' + results[0].title + '.';
      }
    }

    function applySearch() {
      var rawQuery = input.value;
      var query = normalize(rawQuery);
      if (!query) {
        activeResults = [];
        closeDropdown();
        if (status) status.textContent = 'Search every localized country hub and global workbench.';
        return Promise.resolve();
      }
      var featured = readFeaturedEntries();
      var instantResults = findResults(rawQuery, featured);
      renderDropdown(instantResults, query, instantResults.length);
      return readSitemapEntries().then(function (sitemapEntries) {
        var allResults = findResults(rawQuery, featured.concat(sitemapEntries));
        renderDropdown(allResults, query, allResults.length);
      });
    }

    input.addEventListener('input', applySearch);
    input.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeDropdown();
        return;
      }
      if (event.key !== 'Enter') return;
      var first = activeResults[0];
      if (first && first.href) {
        event.preventDefault();
        window.location.href = first.href;
      }
    });

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        input.value = chip.getAttribute('data-home-query') || '';
        input.focus();
        applySearch();
      });
    });

    document.addEventListener('click', function (event) {
      if (panel && panel.contains(event.target)) return;
      closeDropdown();
    });

    applySearch();
  });

  ready(function () {
    var map = document.querySelector('[data-vh-world-map]');
    if (!map) return;

    var popover = map.querySelector('[data-vh-world-popover]');
    var fields = {
      flag: map.querySelector('[data-vh-world-popover-flag]'),
      name: map.querySelector('[data-vh-world-popover-name]'),
      region: map.querySelector('[data-vh-world-popover-region]'),
      iso: map.querySelector('[data-vh-world-popover-iso]'),
      capital: map.querySelector('[data-vh-world-popover-capital]'),
      currency: map.querySelector('[data-vh-world-popover-currency]'),
      tools: map.querySelector('[data-vh-world-popover-tools]'),
      signals: map.querySelector('[data-vh-world-popover-signals]'),
      image: map.querySelector('[data-vh-world-popover-image]')
    };

    function getCountryElement(target) {
      return target && target.closest ? target.closest('[data-vh-world-country]') : null;
    }

    function readCountryData(element) {
      return {
        flag: element.getAttribute('data-country-flag') || '🌍',
        name: element.getAttribute('data-country-name') || 'Country hub',
        region: element.getAttribute('data-country-region') || element.getAttribute('data-country-continent') || 'World coverage',
        iso: element.getAttribute('data-country-iso') || '--',
        capital: element.getAttribute('data-country-capital') || '--',
        currency: element.getAttribute('data-country-currency') || '--',
        tools: element.getAttribute('data-country-workbenches') || '--',
        signals: element.getAttribute('data-country-signals') || 'Local developer formats.',
        outline: element.getAttribute('data-country-outline') || '',
        href: element.getAttribute('data-country-href') || ''
      };
    }

    function positionPopover(element) {
      if (!popover) return;
      var mapRect = map.getBoundingClientRect();
      var rect = element.getBoundingClientRect();
      var x = rect.left + rect.width / 2 - mapRect.left;
      var y = rect.top + rect.height / 2 - mapRect.top;
      var width = popover.offsetWidth || 320;
      var height = popover.offsetHeight || 260;
      var left = Math.max(18, Math.min(mapRect.width - width - 18, x + 18));
      var top = Math.max(18, Math.min(mapRect.height - height - 18, y - 88));
      popover.style.left = left + 'px';
      popover.style.top = top + 'px';
    }

    function showCountry(element) {
      if (!element || !popover) return;
      var data = readCountryData(element);
      if (fields.flag) fields.flag.textContent = data.flag;
      if (fields.name) fields.name.textContent = data.name;
      if (fields.region) fields.region.textContent = data.region;
      if (fields.iso) fields.iso.textContent = data.iso;
      if (fields.capital) fields.capital.textContent = data.capital;
      if (fields.currency) fields.currency.textContent = data.currency;
      if (fields.tools) fields.tools.textContent = data.tools + ' workbenches';
      if (fields.signals) fields.signals.textContent = data.signals;
      if (fields.image && data.outline && fields.image.getAttribute('src') !== data.outline) {
        fields.image.src = data.outline;
        fields.image.alt = data.name + ' country shape';
      }
      map.querySelectorAll('[data-vh-world-country].is-country-active').forEach(function (item) {
        item.classList.remove('is-country-active');
      });
      element.classList.add('is-country-active');
      positionPopover(element);
      popover.classList.add('is-visible');
    }

    function openCountry(element) {
      var data = element ? readCountryData(element) : null;
      if (data && data.href) window.location.href = data.href;
    }

    map.addEventListener('pointerover', function (event) {
      var element = getCountryElement(event.target);
      if (element) showCountry(element);
    });

    map.addEventListener('focusin', function (event) {
      var element = getCountryElement(event.target);
      if (element) showCountry(element);
    });

    map.addEventListener('click', function (event) {
      var element = getCountryElement(event.target);
      if (!element) return;
      event.preventDefault();
      openCountry(element);
    });

    map.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      var element = getCountryElement(event.target);
      if (!element) return;
      event.preventDefault();
      openCountry(element);
    });

    map.addEventListener('pointerleave', function () {
      if (popover) popover.classList.remove('is-visible');
      map.querySelectorAll('[data-vh-world-country].is-country-active').forEach(function (item) {
        item.classList.remove('is-country-active');
      });
    });
  });
})();
