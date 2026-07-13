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

  function showCopiedStatus(btn) {
    const originalText = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => {
      btn.textContent = originalText;
    }, 1500);
  }
});
