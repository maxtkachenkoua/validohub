(function () {
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function normalize(value) {
    return String(value || '').toLowerCase().replace(/\s+/g, ' ').trim();
  }

  ready(function () {
    var root = document.querySelector('.vh-home-portal-page');
    var input = document.querySelector('[data-home-search-input]');
    var status = document.querySelector('[data-home-search-status]');
    if (!root || !input) return;

    var cards = Array.prototype.slice.call(document.querySelectorAll('.vh-home-search-card'));
    var chips = Array.prototype.slice.call(document.querySelectorAll('[data-home-query]'));

    function applySearch() {
      var query = normalize(input.value);
      var visible = 0;
      cards.forEach(function (card) {
        var haystack = normalize(card.getAttribute('data-search') || card.textContent);
        var match = !query || haystack.indexOf(query) !== -1;
        card.classList.toggle('is-filtered-out', !match);
        card.setAttribute('aria-hidden', match ? 'false' : 'true');
        if (match) visible += 1;
      });
      if (status) {
        status.textContent = query
          ? visible + ' matching country/tool routes.'
          : cards.length + ' featured routes ready.';
      }
    }

    input.addEventListener('input', applySearch);
    input.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter') return;
      var first = cards.find(function (card) {
        return !card.classList.contains('is-filtered-out');
      });
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
