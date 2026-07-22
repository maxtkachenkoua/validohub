(() => {
  const root = document.querySelector('[data-tools-search]');
  if (!root) return;

  const input = root.querySelector('[data-tools-search-input]');
  const cards = Array.from(root.querySelectorAll('[data-tool-card]'));
  const count = root.querySelector('[data-tools-count]');
  const empty = root.querySelector('[data-tools-empty]');
  const chips = Array.from(root.querySelectorAll('[data-tools-query]'));

  function normalize(value) {
    return String(value || '').trim().toLowerCase();
  }

  function applyFilter(query) {
    const needle = normalize(query);
    let visible = 0;
    for (const card of cards) {
      const haystack = normalize(card.dataset.search);
      const isVisible = !needle || haystack.includes(needle);
      card.hidden = !isVisible;
      if (isVisible) visible += 1;
    }
    if (count) count.textContent = String(visible);
    if (empty) empty.hidden = visible !== 0;
  }

  if (input) {
    input.addEventListener('input', () => applyFilter(input.value));
  }

  for (const chip of chips) {
    chip.addEventListener('click', () => {
      const query = chip.dataset.toolsQuery || '';
      if (input) input.value = query;
      applyFilter(query);
      input?.focus();
    });
  }
})();
