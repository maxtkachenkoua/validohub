document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const portal = document.querySelector('.vh-countries-portal-page');
  if (!portal) return;

  const searchInput = portal.querySelector('.vh-countries-search-input');
  const regionSelect = portal.querySelector('select[data-filter="region"]');
  const statusSelect = portal.querySelector('select[data-filter="status"]');
  const featureCheckboxes = portal.querySelectorAll('.vh-countries-feature-chips input');
  
  const cards = portal.querySelectorAll('.vh-countries-card');
  const markers = portal.querySelectorAll('[data-vh-countries-map-item]');
  const worldMap = portal.querySelector('[data-vh-countries-world-map]');
  const mapTooltip = portal.querySelector('[data-vh-countries-map-tooltip]');
  const mapTooltipImage = portal.querySelector('[data-vh-countries-map-tooltip-image]');
  const mapTooltipName = portal.querySelector('[data-vh-countries-map-tooltip-name]');
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

    if (mapTooltip) {
      mapTooltip.classList.remove('is-visible');
    }
    
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
    cards.forEach(c => c.classList.remove('is-country-active'));
    card.classList.add('is-country-active');
    markers.forEach(m => m.classList.remove('is-country-active'));
    const marker = portal.querySelector(`.vh-marker-${card.dataset.countryId}`);
    if (marker) marker.classList.add('is-country-active');
  }

  function getMapItem(target) {
    if (!worldMap || !target || typeof target.closest !== 'function') return null;
    const item = target.closest('[data-vh-countries-map-item]');
    if (!item || !worldMap.contains(item)) return null;
    if (item.classList.contains('is-filtered-out')) return null;
    return item;
  }

  // Bind hover/focus events on cards
  cards.forEach(card => {
    const handleActivate = () => updatePreview(card);
    card.addEventListener('mouseenter', handleActivate);
    card.addEventListener('focus', handleActivate);
  });

  function positionMapTooltip(target, pointerEvent) {
    if (!worldMap || !mapTooltip || !target) return;
    const mapRect = worldMap.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    const name = target.dataset.countryName || 'Country';
    const outlineSrc = target.dataset.countryOutline || '';
    if (mapTooltipName) mapTooltipName.textContent = name;
    if (mapTooltipImage && outlineSrc && mapTooltipImage.getAttribute('src') !== outlineSrc) {
      mapTooltipImage.src = outlineSrc;
      mapTooltipImage.alt = `${name} country shape`;
    }
    mapTooltip.classList.add('is-visible');
    const width = mapTooltip.offsetWidth || 210;
    const height = mapTooltip.offsetHeight || 230;
    const x = pointerEvent ? pointerEvent.clientX - mapRect.left : rect.left + rect.width / 2 - mapRect.left;
    const y = pointerEvent ? pointerEvent.clientY - mapRect.top : rect.top + rect.height / 2 - mapRect.top;
    const gap = 22;
    const preferLeft = x > mapRect.width * 0.58;
    const preferAbove = y > mapRect.height * 0.62;
    const rawLeft = preferLeft ? x - width - gap : x + gap;
    const rawTop = preferAbove ? y - height - gap : y + gap;
    const left = Math.max(12, Math.min(mapRect.width - width - 12, rawLeft));
    const top = Math.max(12, Math.min(mapRect.height - height - 12, rawTop));
    mapTooltip.style.left = `${left}px`;
    mapTooltip.style.top = `${top}px`;
  }

  function openMapCountry(target) {
    const href = target && target.dataset.countryHref;
    if (href) window.location.href = href;
  }

  function activateMapItem(item, pointerEvent) {
    const countryId = item && item.dataset.countryId;
    const correspondingCard = countryId ? portal.querySelector(`.vh-countries-card[data-country-id="${countryId}"]`) : null;
    if (!correspondingCard) return;
    updatePreview(correspondingCard);
    positionMapTooltip(item, pointerEvent);
    markers.forEach(marker => marker.classList.remove('is-country-active'));
    item.classList.add('is-country-active');
  }

  if (worldMap && mapTooltip) {
    worldMap.addEventListener('pointermove', event => {
      const item = getMapItem(event.target);
      if (!item) {
        mapTooltip.classList.remove('is-visible');
        return;
      }
      activateMapItem(item, event);
    });

    worldMap.addEventListener('focusin', event => {
      const item = getMapItem(event.target);
      if (item) activateMapItem(item);
    });

    worldMap.addEventListener('click', event => {
      const item = getMapItem(event.target);
      if (!item) return;
      event.preventDefault();
      openMapCountry(item);
    });

    worldMap.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const item = getMapItem(event.target);
      if (!item) return;
      event.preventDefault();
      openMapCountry(item);
    });

    worldMap.addEventListener('pointerleave', () => {
      mapTooltip.classList.remove('is-visible');
    });
  }

  // Initialize preview panel to the default active hub (e.g. Brazil or Poland)
  const defaultCard = portal.querySelector('.vh-countries-card[data-country-id="brazil"]');
  if (defaultCard) {
    updatePreview(defaultCard);
  }
});
