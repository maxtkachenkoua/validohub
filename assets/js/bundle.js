document.addEventListener('DOMContentLoaded', () => {
  'use strict';

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

    searchForm.addEventListener('submit', event => {
      event.preventDefault();
      const firstMatch = catalog.querySelector('.vh-country-catalog-row.is-tool-search-match') || rows[0];
      if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstMatch.focus({ preventScroll: true });
      }
    });

    input.addEventListener('input', () => updateCountryToolSearch(input.value));
    clearButton?.addEventListener('click', () => {
      input.value = '';
      updateCountryToolSearch('');
      input.focus();
    });

    function updateCountryToolSearch(rawQuery) {
      const query = normalizeSearchText(rawQuery);
      let matchCount = 0;
      catalog.classList.toggle('is-searching', Boolean(query));

      rows.forEach(row => {
        const haystack = normalizeSearchText(row.textContent || '');
        const matches = !query || haystack.includes(query);
        row.hidden = !matches;
        row.classList.toggle('is-tool-search-match', Boolean(query && matches));
        if (matches) matchCount += 1;
      });

      groups.forEach(group => {
        const visibleRows = group.querySelectorAll('.vh-country-catalog-row:not([hidden])').length;
        const isEmpty = visibleRows === 0;
        group.classList.toggle('is-tool-search-empty', Boolean(query && isEmpty));
        if (query && !isEmpty) {
          group.open = true;
        }
      });

      catalog.classList.toggle('is-tool-search-empty', Boolean(query && matchCount === 0));
      if (status) {
        status.textContent = query
          ? `${matchCount} of ${allCount} workbenches match “${rawQuery.trim()}”. Press Enter to jump to the first result.`
          : `Search across ${allCount} available workbenches on this page.`;
      }
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

  function showCopiedStatus(btn) {
    const originalText = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => {
      btn.textContent = originalText;
    }, 1500);
  }
});
