document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Component-Scoped Code Snippets Card
  document.querySelectorAll('.vh-code-card').forEach(card => {
    const dataElement = card.querySelector('.vh-snippets-data');
    const codeBlock = card.querySelector('.vh-code');
    const copyButton = card.querySelector('.vh-copy-button');
    const tabs = card.querySelectorAll('.vh-tab');
    const liveStatus = card.querySelector('.vh-aria-live-status');

    if (!dataElement || !codeBlock) return;

    try {
      const snippets = JSON.parse(dataElement.textContent);

      // Setup tablist container properties
      const tablist = card.querySelector('.vh-code-tabs');
      if (tablist) {
        tablist.setAttribute('role', 'tablist');
      }

      // Initialize tabs
      tabs.forEach((tab, index) => {
        const lang = tab.dataset.lang;
        tab.setAttribute('role', 'tab');
        tab.setAttribute('id', `vh-tab-${lang}-${index}`);
        tab.setAttribute('aria-selected', tab.classList.contains('active') ? 'true' : 'false');
        tab.setAttribute('tabindex', tab.classList.contains('active') ? '0' : '-1');

        tab.addEventListener('click', () => {
          selectTab(tab);
        });

        // Keyboard arrow navigation support
        tab.addEventListener('keydown', (e) => {
          let targetIndex = -1;
          if (e.key === 'ArrowRight' || e.key === 'Right') {
            targetIndex = (index + 1) % tabs.length;
          } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
            targetIndex = (index - 1 + tabs.length) % tabs.length;
          }

          if (targetIndex !== -1) {
            e.preventDefault();
            tabs[targetIndex].focus();
            selectTab(tabs[targetIndex]);
          }
        });
      });

      // Bind accessible link from panel to tab
      codeBlock.setAttribute('role', 'tabpanel');
      const activeTab = card.querySelector('.vh-tab.active');
      if (activeTab) {
        codeBlock.setAttribute('aria-labelledby', activeTab.id);
      }

      function selectTab(tab) {
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
          t.setAttribute('tabindex', '-1');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        tab.setAttribute('tabindex', '0');
        codeBlock.setAttribute('aria-labelledby', tab.id);

        const lang = tab.dataset.lang;
        if (snippets[lang]) {
          codeBlock.textContent = snippets[lang];
        }
      }

      // Clipboard logic
      if (copyButton) {
        copyButton.addEventListener('click', () => {
          const textToCopy = codeBlock.textContent;
          const langLabel = card.querySelector('.vh-tab.active')?.textContent || 'Code';

          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textToCopy)
              .then(() => announceCopied(langLabel))
              .catch(err => console.error('Failed to copy text:', err));
          } else {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = textToCopy;
            textarea.style.position = 'fixed';
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            try {
              document.execCommand('copy');
              announceCopied(langLabel);
            } catch (err) {
              console.error('Fallback copy command failed:', err);
            }
            document.body.removeChild(textarea);
          }
        });
      }

      function announceCopied(label) {
        if (copyButton) {
          const originalText = copyButton.textContent;
          copyButton.textContent = 'Copied!';
          setTimeout(() => {
            copyButton.textContent = originalText;
          }, 1500);
        }
        if (liveStatus) {
          liveStatus.textContent = `${label} snippet copied to clipboard`;
          setTimeout(() => {
            liveStatus.textContent = '';
          }, 3000);
        }
      }

    } catch (err) {
      console.error('Failed to initialize vh-code-card component:', err);
    }
  });

  // 2. Component-Scoped FAQ Section Controls
  document.querySelectorAll('.vh-faq-section').forEach(section => {
    const expandBtn = section.querySelector('[data-faq-action="expand"]');
    const collapseBtn = section.querySelector('[data-faq-action="collapse"]');
    const accordions = section.querySelectorAll('.vh-accordion');

    if (expandBtn && collapseBtn) {
      expandBtn.addEventListener('click', () => {
        accordions.forEach(acc => acc.open = true);
      });
      collapseBtn.addEventListener('click', () => {
        accordions.forEach(acc => acc.open = false);
      });
    }
  });

  // 3. Country-Level Click-to-Copy Handler
  document.body.addEventListener('click', (event) => {
    const copyBtn = event.target.closest('.vh-country-copy-button, .vh-country-action-button');
    if (!copyBtn) return;

    const value = copyBtn.dataset.copyValue;
    const label = copyBtn.dataset.copyLabel || 'value';
    if (!value) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value)
        .then(() => announceCopied(copyBtn, label))
        .catch(err => console.error('Failed to copy value:', err));
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.style.position = 'fixed';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
        announceCopied(copyBtn, label);
      } catch (err) {
        console.error('Fallback copy command failed:', err);
      }
      document.body.removeChild(textarea);
    }
  });

  function announceCopied(button, label) {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('vh-copied');
    
    // Find or create global announcer
    let announcer = document.querySelector('.vh-copy-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.className = 'vh-copy-announcer vh-sr-only';
      announcer.setAttribute('aria-live', 'polite');
      document.body.appendChild(announcer);
    }
    announcer.textContent = `${label} copied to clipboard`;

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('vh-copied');
    }, 1500);
  }
});
