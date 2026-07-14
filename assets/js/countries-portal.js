document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const portal = document.querySelector('.vh-countries-portal-page');
  if (!portal) return;

  const searchInput = portal.querySelector('.vh-countries-search-input');
  const regionSelect = portal.querySelector('select[data-filter="region"]');
  const statusSelect = portal.querySelector('select[data-filter="status"]');
  const featureCheckboxes = portal.querySelectorAll('.vh-countries-feature-chips input');
  
  const cards = portal.querySelectorAll('.vh-countries-card');
  const markers = portal.querySelectorAll('.vh-countries-map-marker');
  const continentGroups = portal.querySelectorAll('.vh-countries-continent-group');
  const emptyState = portal.querySelector('.vh-countries-empty-state');

  // Preview panel selectors
  const previewPanel = portal.querySelector('[data-preview-panel]');
  const previewFlag = portal.querySelector('[data-preview-flag]');
  const previewName = portal.querySelector('[data-preview-name]');
  const previewSummary = portal.querySelector('[data-preview-summary]');
  const previewIso = portal.querySelector('[data-preview-iso]');
  const previewLang = portal.querySelector('[data-preview-lang]');
  const previewCurrency = portal.querySelector('[data-preview-currency]');
  const previewRegion = portal.querySelector('[data-preview-region]');
  const previewPercent = portal.querySelector('[data-preview-percent]');
  const previewProgress = portal.querySelector('[data-preview-progress]');
  const previewLink = portal.querySelector('[data-preview-link]');

  // 1. Filtering Logic
  function applyFilters() {
    const searchVal = searchInput.value.toLowerCase().trim();
    const regionVal = regionSelect.value;
    const statusVal = statusSelect.value;
    
    const checkedFeatures = [];
    featureCheckboxes.forEach(cb => {
      if (cb.checked) {
        checkedFeatures.push(cb.value);
      }
    });

    let visibleCardsCount = 0;

    cards.forEach(card => {
      const searchData = card.dataset.search || '';
      const regionData = card.dataset.continent || '';
      const statusData = card.dataset.status || '';
      const featuresData = (card.dataset.features || '').split(/\s+/);

      // Check search match
      const matchesSearch = !searchVal || searchData.includes(searchVal);
      // Check region/continent match
      const matchesRegion = regionVal === 'all' || regionData === regionVal;
      // Check status match
      const matchesStatus = statusVal === 'all' || statusData === statusVal;
      // Check features match
      const matchesFeatures = checkedFeatures.every(f => featuresData.includes(f));

      if (matchesSearch && matchesRegion && matchesStatus && matchesFeatures) {
        card.classList.remove('is-filtered-out');
        visibleCardsCount++;
        // Sync map marker
        const countryId = card.dataset.countryId;
        const marker = portal.querySelector(`.vh-marker-${countryId}`);
        if (marker) marker.classList.remove('is-filtered-out');
      } else {
        card.classList.add('is-filtered-out');
        // Sync map marker
        const countryId = card.dataset.countryId;
        const marker = portal.querySelector(`.vh-marker-${countryId}`);
        if (marker) marker.classList.add('is-filtered-out');
      }
    });

    // Toggle continent groups visibility
    continentGroups.forEach(group => {
      const visibleInGroup = group.querySelectorAll('.vh-countries-card:not(.is-filtered-out)').length;
      if (visibleInGroup === 0) {
        group.classList.add('is-filtered-out');
      } else {
        group.classList.remove('is-filtered-out');
      }
    });

    // Toggle empty state
    if (visibleCardsCount === 0) {
      emptyState.classList.remove('is-filtered-out');
    } else {
      emptyState.classList.add('is-filtered-out');
    }
  }

  // Bind filter events
  searchInput.addEventListener('input', applyFilters);
  regionSelect.addEventListener('change', applyFilters);
  statusSelect.addEventListener('change', applyFilters);
  featureCheckboxes.forEach(cb => cb.addEventListener('change', applyFilters));

  // 2. Preview Panel Updater
  function updatePreview(card) {
    if (!card) return;
    const flag = card.dataset.flag || '🌍';
    const name = card.dataset.name || '';
    const summary = card.dataset.summary || '';
    const iso = card.dataset.iso || '';
    const lang = card.dataset.lang || '';
    const currency = card.dataset.currency || '';
    const continent = card.dataset.continent || '';
    const status = card.dataset.status || 'planned';
    
    // Progress calculation
    const progressEl = card.querySelector('progress');
    const percent = progressEl ? progressEl.value : 0;

    previewFlag.textContent = flag;
    previewName.textContent = name;
    previewSummary.textContent = summary;
    previewIso.textContent = iso;
    previewLang.textContent = lang;
    previewCurrency.textContent = currency;
    previewRegion.textContent = continent;
    previewPercent.textContent = `${percent}%`;
    previewProgress.value = percent;

    if (status === 'available') {
      previewLink.textContent = `Open ${name} Hub`;
      previewLink.href = card.getAttribute('href');
      previewLink.classList.remove('is-muted');
      previewLink.removeAttribute('tabindex');
    } else {
      previewLink.textContent = `${name} Portal (Roadmap)`;
      previewLink.href = '#';
      previewLink.classList.add('is-muted');
      previewLink.setAttribute('tabindex', '-1');
    }

    // Highlight active map marker
    markers.forEach(m => m.classList.remove('is-active'));
    const marker = portal.querySelector(`.vh-marker-${card.dataset.countryId}`);
    if (marker) marker.classList.add('is-active');
  }

  // Bind hover/focus events on cards
  cards.forEach(card => {
    const handleActivate = () => updatePreview(card);
    card.addEventListener('mouseenter', handleActivate);
    card.addEventListener('focus', handleActivate);
  });

  // Bind hover/focus events on map markers
  markers.forEach(marker => {
    const countryId = marker.dataset.countryId;
    const correspondingCard = portal.querySelector(`.vh-countries-card[data-country-id="${countryId}"]`);
    
    if (correspondingCard) {
      const handleActivate = () => {
        updatePreview(correspondingCard);
        markers.forEach(m => m.classList.remove('is-active'));
        marker.classList.add('is-active');
      };
      marker.addEventListener('mouseenter', handleActivate);
      marker.addEventListener('focus', handleActivate);
    }
  });

  // Initialize preview panel to the default active hub (e.g. Brazil or Poland)
  const defaultCard = portal.querySelector('.vh-countries-card[data-country-id="brazil"]');
  if (defaultCard) {
    updatePreview(defaultCard);
  }
});
