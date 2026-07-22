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
})();
