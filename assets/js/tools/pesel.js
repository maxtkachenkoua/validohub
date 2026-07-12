(function () {
  'use strict';

  const PESEL_ALGORITHM = 'validohub.pesel';

  const isValidCalendarDate = function (year, month, day) {
    const d = new Date(year, month - 1, day);
    return d.getFullYear() === year && d.getMonth() === (month - 1) && d.getDate() === day;
  };

  // Helper to colorize JSON output like a real IDE/debugger
  const syntaxHighlightJson = function (jsonObj) {
    let jsonStr = JSON.stringify(jsonObj, null, 2);
    jsonStr = jsonStr.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return jsonStr.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
      let cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="json-' + cls + '">' + match + '</span>';
    });
  };

  const injectStyles = function () {
    if (document.getElementById('pesel-premium-styles')) return;
    const style = document.createElement('style');
    style.id = 'pesel-premium-styles';
    style.textContent = `
      .pesel-premium-panel {
        margin-top: 24px;
        display: flex;
        flex-direction: column;
        gap: 28px;
      }
      .pesel-badge-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 12px;
      }
      .pesel-pill {
        font-size: 0.72rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 4px 10px;
        border-radius: 9999px;
        background: var(--surface-soft);
        border: 1px solid var(--line);
        color: var(--muted);
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .pesel-pill.active {
        background: rgba(47, 128, 237, 0.1);
        border-color: rgba(47, 128, 237, 0.3);
        color: #2f80ed;
      }
      .pesel-pipeline {
        background: var(--surface-soft);
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 20px;
      }
      .pesel-section-title {
        font-size: 0.95rem;
        font-weight: 700;
        margin: 0 0 16px 0;
        color: var(--text);
        display: flex;
        align-items: center;
        gap: 8px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        border-bottom: 1px solid var(--line);
        padding-bottom: 8px;
      }
      .pesel-pipeline-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .pesel-step {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        font-size: 0.88rem;
        font-weight: 500;
        padding: 10px 14px;
        border-radius: 6px;
        background: var(--surface);
        border: 1px solid var(--line);
        transition: all 0.2s;
      }
      .pesel-step.success {
        border-color: rgba(22, 163, 74, 0.3);
        color: var(--text);
        background: rgba(22, 163, 74, 0.02);
      }
      .pesel-step.failure {
        border-color: rgba(220, 38, 38, 0.3);
        color: var(--text);
        background: rgba(220, 38, 38, 0.02);
      }
      .pesel-step.pending {
        color: var(--muted);
        opacity: 0.6;
      }
      .pesel-step-left {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .pesel-step-label {
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .pesel-step-desc {
        font-size: 0.78rem;
        color: var(--muted);
        padding-left: 20px;
      }
      .pesel-step-badge {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        padding: 2px 6px;
        border-radius: 4px;
        letter-spacing: 0.05em;
      }
      .pesel-step.success .pesel-step-badge {
        background: rgba(22, 163, 74, 0.1);
        color: #16a34a;
      }
      .pesel-step.failure .pesel-step-badge {
        background: rgba(220, 38, 38, 0.1);
        color: #dc2626;
      }
      .pesel-step.pending .pesel-step-badge {
        background: var(--line);
        color: var(--muted);
      }
      .pesel-results-container {
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--surface-soft);
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .pesel-results-header {
        font-size: 1.1rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .pesel-results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 12px;
      }
      .pesel-result-row {
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 6px;
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        position: relative;
        transition: border-color 0.2s;
      }
      .pesel-result-row:hover {
        border-color: var(--muted);
      }
      .pesel-result-row .row-label {
        font-size: 0.72rem;
        color: var(--muted);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .pesel-result-row .row-value {
        font-size: 0.98rem;
        font-weight: 700;
        color: var(--text);
      }
      .pesel-row-copy-btn {
        position: absolute;
        top: 8px;
        right: 8px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        font-size: 0.75rem;
        color: var(--muted);
        transition: background 0.2s, color 0.2s;
      }
      .pesel-row-copy-btn:hover {
        background: var(--line);
        color: var(--text);
      }

      /* Premium PESEL Breakdown Visualization */
      .pesel-breakdown {
        background: var(--surface-soft);
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 20px;
      }
      .pesel-breakdown-digits {
        display: flex;
        gap: 6px;
        justify-content: center;
        margin: 16px 0;
      }
      .pesel-digit-box {
        font-family: monospace;
        font-size: 1.4rem;
        font-weight: 700;
        width: 36px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--line);
        border-radius: 6px;
        background: var(--surface);
      }
      .pesel-digit-box.year { border-color: #2f80ed; color: #2f80ed; background: rgba(47, 128, 237, 0.03); }
      .pesel-digit-box.month { border-color: #10b981; color: #10b981; background: rgba(16, 185, 129, 0.03); }
      .pesel-digit-box.day { border-color: #f59e0b; color: #f59e0b; background: rgba(245, 158, 11, 0.03); }
      .pesel-digit-box.serial { border-color: #8b5cf6; color: #8b5cf6; background: rgba(139, 92, 246, 0.03); }
      .pesel-digit-box.checksum { border-color: #ec4899; color: #ec4899; background: rgba(236, 72, 153, 0.03); }

      .pesel-breakdown-legend {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        justify-content: center;
        margin-top: 12px;
      }
      .pesel-legend-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.78rem;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 4px;
        border: 1px solid var(--line);
        background: var(--surface);
      }
      .pesel-legend-item::before {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 2px;
      }
      .pesel-legend-item.year::before { background: #2f80ed; }
      .pesel-legend-item.month::before { background: #10b981; }
      .pesel-legend-item.day::before { background: #f59e0b; }
      .pesel-legend-item.serial::before { background: #8b5cf6; }
      .pesel-legend-item.checksum::before { background: #ec4899; }

      /* Checksum Debugger */
      .pesel-checksum-debugger {
        background: var(--surface-soft);
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 20px;
      }
      .pesel-debugger-table-container {
        overflow-x: auto;
        border: 1px solid var(--line);
        border-radius: 6px;
        background: var(--surface);
      }
      .pesel-dev-table {
        width: 100%;
        border-collapse: collapse;
        font-family: monospace;
        font-size: 0.8rem;
      }
      .pesel-dev-table th, .pesel-dev-table td {
        border-bottom: 1px solid var(--line);
        padding: 8px 10px;
        text-align: center;
      }
      .pesel-dev-table th {
        background: var(--surface-soft);
        color: var(--muted);
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.72rem;
      }
      .pesel-formula-summary {
        margin-top: 16px;
        padding: 14px;
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 6px;
        font-family: monospace;
        font-size: 0.85rem;
        line-height: 1.5;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .pesel-formula-step {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px dashed var(--line);
        padding-bottom: 6px;
      }
      .pesel-formula-step:last-child {
        border-bottom: none;
        padding-bottom: 0;
        font-weight: 700;
      }

      /* Collapsible DevTools Accordions */
      .pesel-dev-accordion {
        border: 1px solid var(--line);
        border-radius: 6px;
        background: var(--surface-soft);
        margin-bottom: 8px;
        overflow: hidden;
      }
      .pesel-dev-accordion summary {
        font-size: 0.82rem;
        font-weight: 700;
        padding: 10px 14px;
        cursor: pointer;
        background: var(--surface);
        border-bottom: 1px solid var(--line);
        user-select: none;
        color: var(--text);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .pesel-dev-accordion[open] summary {
        border-bottom-color: var(--line);
      }
      .pesel-dev-accordion-content {
        padding: 14px;
        background: var(--surface);
      }

      /* Pretty JSON syntax classes */
      .json-key { color: #f2c94c; font-weight: 600; }
      .json-string { color: #10b981; }
      .json-number { color: #2f80ed; }
      .json-boolean { color: #eb5757; }
      .json-null { color: #828282; }

      .pesel-discovery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 16px;
        margin-top: 16px;
      }
      .pesel-discovery-card {
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 16px;
        background: var(--surface-soft);
        text-decoration: none;
        color: inherit;
        transition: transform 0.2s, border-color 0.2s;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .pesel-discovery-card:hover {
        transform: translateY(-2px);
        border-color: var(--muted);
      }
      .pesel-discovery-card h4 {
        margin: 0 0 8px 0;
        font-size: 0.95rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .pesel-discovery-card p {
        margin: 0 0 12px 0;
        font-size: 0.82rem;
        color: var(--muted);
        line-height: 1.4;
      }
      .pesel-discovery-card .card-footer {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--text);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .doc-accordion summary {
        font-weight: 600;
        padding: 12px;
        cursor: pointer;
        border-radius: 6px;
        transition: background 0.2s;
      }
      .doc-accordion summary:hover {
        background: var(--surface-soft);
      }
    `;
    document.head.appendChild(style);
  };

  const copyToClipboard = function (text, workbench, message) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => workbench.setMessage(message, 'success'))
        .catch(() => workbench.setMessage('Copy failed.', 'error'));
    } else {
      const el = document.createElement('textarea');
      el.value = text;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      workbench.setMessage(message, 'success');
    }
  };

  const PeselPlugin = {
    filePrefix: 'pesel-validation',
    applySample: function (workbench, name) {
      const input = workbench.primaryInput();
      if (!input) return;

      if (name === 'valid-male') {
        input.value = '92082612336';
      } else if (name === 'valid-female') {
        input.value = '92082612343';
      } else if (name === 'invalid-checksum') {
        input.value = '92082612335';
      } else if (name === 'invalid-length') {
        input.value = '920826';
      } else if (name === 'invalid-date') {
        input.value = '92023012346';
      } else if (name === 'non-digits') {
        input.value = '9208261234a';
      }

      input.dispatchEvent(new Event('input', { bubbles: true }));
    },
    onMount: function (workbench) {
      injectStyles();

      // Format documentation accordions dynamically on client side
      document.querySelectorAll('.doc-accordion .rich-text').forEach(el => {
        el.querySelectorAll('li').forEach(li => {
          let html = li.innerHTML;
          if (html.includes('**')) {
            html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            li.innerHTML = html;
          }
        });
      });

      // Refine the page intro header to Stripe-quality aesthetics
      const pageIntro = document.querySelector('.page-intro');
      if (pageIntro) {
        const introTitle = pageIntro.querySelector('h1');
        if (introTitle) introTitle.textContent = 'PESEL Validator & Explainer';
        const introDesc = pageIntro.querySelector('p');
        if (introDesc) {
          introDesc.textContent = 'Validate an 11-digit Polish PESEL, decode birth date and gender, and inspect the checksum calculation locally in your browser.';
        }

        // Inject Stripe-style trust badges
        if (!pageIntro.querySelector('.pesel-badge-row')) {
          const badgeRow = document.createElement('div');
          badgeRow.className = 'pesel-badge-row';
          badgeRow.innerHTML = `
            <span class="pesel-pill active">🔒 Local Sandbox</span>
            <span class="pesel-pill">✓ Privacy Guaranteed</span>
            <span class="pesel-pill">📅 Centuries 1800-2200</span>
            <span class="pesel-pill">⚡ Live Parser</span>
          `;
          pageIntro.appendChild(badgeRow);
        }
      }

      // Hide default generic workbench text
      const headingText = workbench.form.querySelector('.workbench-heading');
      if (headingText) {
        headingText.style.display = 'none';
      }

      // Hide legacy Output text area completely
      const outputField = workbench.form.querySelector('.output-field');
      if (outputField) {
        outputField.style.display = 'none';
      }

      // Hide framework default copy and download buttons
      const copyBtn = workbench.form.querySelector('[data-tool-copy]');
      if (copyBtn) copyBtn.style.display = 'none';
      const downloadBtn = workbench.form.querySelector('[data-tool-download]');
      if (downloadBtn) downloadBtn.style.display = 'none';

      // Build out final DOM elements tree
      if (!workbench.form.querySelector('.pesel-premium-panel')) {
        const premiumPanel = document.createElement('div');
        premiumPanel.className = 'pesel-premium-panel';
        premiumPanel.innerHTML = `
          <!-- Premium Results summary block -->
          <div class="pesel-results-container" style="display: none;"></div>

          <!-- Dynamic Action Buttons Row -->
          <div class="pesel-custom-actions button-row" style="display: none; margin-bottom: 8px;"></div>

          <!-- Live Pipeline progress indicator -->
          <div class="pesel-pipeline">
            <div class="pesel-section-title">
              <span>🧭</span> Validation Pipeline
            </div>
            <div class="pesel-pipeline-list">
              <div class="pesel-step pending" data-step="present">
                <div class="pesel-step-left">
                  <div class="pesel-step-label">Input Present</div>
                  <div class="pesel-step-desc">Ensures the input value is not blank.</div>
                </div>
                <span class="pesel-step-badge">Pending</span>
              </div>
              <div class="pesel-step pending" data-step="digits">
                <div class="pesel-step-left">
                  <div class="pesel-step-label">Digits Only</div>
                  <div class="pesel-step-desc">Ensures no alphabetic or special characters.</div>
                </div>
                <span class="pesel-step-badge">Pending</span>
              </div>
              <div class="pesel-step pending" data-step="length">
                <div class="pesel-step-left">
                  <div class="pesel-step-label">Length Validation</div>
                  <div class="pesel-step-desc">Ensures the value is exactly 11 digits.</div>
                </div>
                <span class="pesel-step-badge">Pending</span>
              </div>
              <div class="pesel-step pending" data-step="month">
                <div class="pesel-step-left">
                  <div class="pesel-step-label">Century Offset</div>
                  <div class="pesel-step-desc">Validates birth century month offset encoding.</div>
                </div>
                <span class="pesel-step-badge">Pending</span>
              </div>
              <div class="pesel-step pending" data-step="date">
                <div class="pesel-step-left">
                  <div class="pesel-step-label">Calendar Validation</div>
                  <div class="pesel-step-desc">Verifies day existence in the calendar.</div>
                </div>
                <span class="pesel-step-badge">Pending</span>
              </div>
              <div class="pesel-step pending" data-step="checksum">
                <div class="pesel-step-left">
                  <div class="pesel-step-label">Checksum Verification</div>
                  <div class="pesel-step-desc">Verifies Polish registry weight control digit.</div>
                </div>
                <span class="pesel-step-badge">Pending</span>
              </div>
            </div>
          </div>

          <!-- PESEL Digit Breakdown segment -->
          <div class="pesel-breakdown" style="display: none;"></div>

          <!-- Checksum step by step debugger matrix -->
          <div class="pesel-checksum-debugger" style="display: none;"></div>
        `;
        workbench.form.appendChild(premiumPanel);
      }

      // Add border outlines to accordions
      workbench.form.parentNode.querySelectorAll('.doc-accordion').forEach(acc => {
        acc.style.border = '1px solid var(--line)';
        acc.style.borderRadius = '8px';
        acc.style.marginBottom = '12px';
        acc.style.overflow = 'hidden';
      });

      // Delete duplicate discovery sections
      const discoveryBlock = document.querySelector('.related-resources-discovery');
      if (discoveryBlock) {
        discoveryBlock.remove();
      }

      // Set bottom related section
      const relatedSection = document.querySelector('.related-section');
      if (relatedSection) {
        relatedSection.innerHTML = `
          <div class="section-heading">
            <span class="eyebrow">Discovery</span>
            <h2>PESEL Ecosystem & Related Resources</h2>
          </div>
          <p style="color: var(--muted); font-size: 0.85rem; margin-bottom: 20px;">Curated developer references and official registers for Polish compliance.</p>
          <div class="pesel-discovery-grid">
            <a href="/en/poland/" class="pesel-discovery-card">
              <div>
                <h4>Poland Country Hub <span aria-hidden="true">→</span></h4>
                <p>Access domestic addresses, banking templates, payment networks, and compliance checklists.</p>
              </div>
              <div class="card-footer">Country Hub</div>
            </a>
            <a href="/en/categories/national-identifiers/" class="pesel-discovery-card">
              <div>
                <h4>National Identifiers Spec <span aria-hidden="true">→</span></h4>
                <p>Standard data structure specifications mapping PESEL, NIP, and REGON format rules.</p>
              </div>
              <div class="card-footer">Standards Spec</div>
            </a>
            <a href="https://www.gov.pl/web/cyfryzacja" target="_blank" rel="noopener" class="pesel-discovery-card">
              <div>
                <h4>Ministry of Digital Affairs <span aria-hidden="true">↗</span></h4>
                <p>Governing public registry authority managing the central PESEL register of citizens.</p>
              </div>
              <div class="card-footer">Official Authority</div>
            </a>
          </div>
        `;
      }

      // Add samples trigger panel
      const heading = workbench.form.querySelector('.workbench-form-heading');
      if (heading && !workbench.form.querySelector('.sample-buttons-container')) {
        const btnContainer = document.createElement('div');
        btnContainer.className = 'sample-buttons-container';
        btnContainer.style.display = 'flex';
        btnContainer.style.flexWrap = 'wrap';
        btnContainer.style.gap = '6px';
        btnContainer.style.marginTop = '12px';

        const samples = [
          { name: 'valid-male', label: 'Valid Male' },
          { name: 'valid-female', label: 'Valid Female' },
          { name: 'invalid-checksum', label: 'Invalid Checksum' },
          { name: 'invalid-length', label: 'Invalid Length' },
          { name: 'invalid-date', label: 'Invalid Date' },
          { name: 'non-digits', label: 'Non-Digits' }
        ];

        samples.forEach(s => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'button button-ghost compact';
          btn.style.fontSize = '0.78rem';
          btn.style.padding = '4px 8px';
          btn.style.cursor = 'pointer';
          btn.textContent = s.label;
          btn.setAttribute('data-sample', s.name);
          btnContainer.appendChild(btn);
        });

        heading.after(btnContainer);
      }
    },
    run: function (workbench, action, options) {
      const values = workbench.values();
      const rawInput = values.pesel || '';
      const inputVal = rawInput.replace(/\s/g, '');

      const premiumPanel = workbench.form.querySelector('.pesel-premium-panel');
      const resultsContainer = workbench.form.querySelector('.pesel-results-container');
      const customActions = workbench.form.querySelector('.pesel-custom-actions');
      const breakdownPanel = workbench.form.querySelector('.pesel-breakdown');
      const checksumDebugger = workbench.form.querySelector('.pesel-checksum-debugger');

      const setStepStatus = function (stepName, state, errorMsg) {
        if (!premiumPanel) return;
        const step = premiumPanel.querySelector(`[data-step="${stepName}"]`);
        if (!step) return;

        step.className = `pesel-step ${state}`;
        const badge = step.querySelector('.pesel-step-badge');
        if (badge) {
          badge.textContent = state === 'success' ? 'Pass' : (state === 'failure' ? `Fail` : 'Pending');
        }
        const desc = step.querySelector('.pesel-step-desc');
        if (desc) {
          desc.textContent = state === 'failure' ? `Failed: ${errorMsg}` : (state === 'success' ? 'Validation check passed.' : 'Verification pending.');
        }
      };

      const resetSteps = () => {
        ['present', 'digits', 'length', 'month', 'date', 'checksum'].forEach(s => setStepStatus(s, 'pending'));
      };

      if (!inputVal) {
        workbench.setMessage('Please enter a PESEL number.', 'error');
        workbench.setOutput('');
        workbench.setBadge({ label: 'Waiting for input', state: '' });
        workbench.clearPanels();
        resetSteps();
        if (resultsContainer) resultsContainer.style.display = 'none';
        if (customActions) customActions.style.display = 'none';
        if (breakdownPanel) breakdownPanel.style.display = 'none';
        if (checksumDebugger) checksumDebugger.style.display = 'none';
        return;
      }
      setStepStatus('present', 'success');

      // Step 2: Digits only check
      if (/\D/.test(inputVal)) {
        setStepStatus('digits', 'failure', 'Contains non-numeric characters.');
        setStepStatus('length', 'pending');
        setStepStatus('month', 'pending');
        setStepStatus('date', 'pending');
        setStepStatus('checksum', 'pending');

        const result = { valid: false, errorCode: 'INVALID_CHARACTERS', message: 'Contains non-digit characters.' };
        workbench.lastResult = result;
        workbench.setMessage('Invalid structure: Must contain digits only.', 'error');
        workbench.setOutput(`Validation Failed: INVALID_CHARACTERS`);
        workbench.setBadge({ label: 'Error', state: 'error' });
        workbench.setStats([['Status', 'Failed'], ['Error Code', 'INVALID_CHARACTERS']], ['Input must contain exactly 11 numeric characters.'], 'error');

        if (resultsContainer) {
          resultsContainer.innerHTML = `
            <div class="pesel-results-header" style="color: #dc2626;">
              <span>✗</span> Validation Failed: Non-Digits Present
            </div>
            <div class="pesel-results-grid">
              <div class="pesel-result-row">
                <span class="row-label">Error Code</span>
                <span class="row-value">INVALID_CHARACTERS</span>
              </div>
              <div class="pesel-result-row">
                <span class="row-label">Failed Step</span>
                <span class="row-value">Digits Only Check</span>
              </div>
            </div>
          `;
          resultsContainer.style.display = 'flex';
        }

        // Chrome DevTools style advanced accordions
        workbench.setAdvanced(`
          <div class="pesel-dev-section">
            <details class="pesel-dev-accordion" open>
              <summary>Validation Pipeline Logs</summary>
              <div class="pesel-dev-accordion-content">
                <pre>✓ Input Present\n✗ Digits Only Check (Failed: non-numeric character found)\n○ Length Check (Skipped)\n○ Month Offset (Skipped)\n○ Date Verification (Skipped)\n○ Checksum Matching (Skipped)</pre>
              </div>
            </details>
            <details class="pesel-dev-accordion">
              <summary>Regex Details</summary>
              <div class="pesel-dev-accordion-content">
                <pre>Pattern: /^\\d{11}$/\nMatched: false</pre>
              </div>
            </details>
          </div>
        `);

        if (customActions) customActions.style.display = 'none';
        if (breakdownPanel) breakdownPanel.style.display = 'none';
        if (checksumDebugger) checksumDebugger.style.display = 'none';
        return;
      }
      setStepStatus('digits', 'success');

      // Step 3: Length check
      if (inputVal.length !== 11) {
        setStepStatus('length', 'failure', `Expected 11 characters, got ${inputVal.length}`);
        setStepStatus('month', 'pending');
        setStepStatus('date', 'pending');
        setStepStatus('checksum', 'pending');

        const result = { valid: false, errorCode: 'INVALID_LENGTH', length: inputVal.length, message: 'Must be exactly 11 digits.' };
        workbench.lastResult = result;
        workbench.setMessage(`Invalid structure: Length is ${inputVal.length} (expected 11).`, 'error');
        workbench.setOutput(`Validation Failed: INVALID_LENGTH`);
        workbench.setBadge({ label: 'Error', state: 'error' });
        workbench.setStats([['Status', 'Failed'], ['Error Code', 'INVALID_LENGTH']], [`Expected 11 digits, but got ${inputVal.length}.`], 'error');

        if (resultsContainer) {
          resultsContainer.innerHTML = `
            <div class="pesel-results-header" style="color: #dc2626;">
              <span>✗</span> Validation Failed: Invalid Length
            </div>
            <div class="pesel-results-grid">
              <div class="pesel-result-row">
                <span class="row-label">Error Code</span>
                <span class="row-value">INVALID_LENGTH</span>
              </div>
              <div class="pesel-result-row">
                <span class="row-label">Actual Length</span>
                <span class="row-value">${inputVal.length} characters</span>
              </div>
            </div>
          `;
          resultsContainer.style.display = 'flex';
        }

        workbench.setAdvanced(`
          <div class="pesel-dev-section">
            <details class="pesel-dev-accordion" open>
              <summary>Validation Pipeline Logs</summary>
              <div class="pesel-dev-accordion-content">
                <pre>✓ Input Present\n✓ Digits Only Check\n✗ Length Check (Failed: got ${inputVal.length})\n○ Month Offset (Skipped)\n○ Date Verification (Skipped)\n○ Checksum Matching (Skipped)</pre>
              </div>
            </details>
            <details class="pesel-dev-accordion">
              <summary>Regex Details</summary>
              <div class="pesel-dev-accordion-content">
                <pre>Pattern: /^\\d{11}$/\nMatched: false</pre>
              </div>
            </details>
          </div>
        `);

        if (customActions) customActions.style.display = 'none';
        if (breakdownPanel) breakdownPanel.style.display = 'none';
        if (checksumDebugger) checksumDebugger.style.display = 'none';
        return;
      }
      setStepStatus('length', 'success');

      // Math calculations variables
      const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
      const digits = inputVal.split('').map(Number);
      let sum = 0;
      const checksumSteps = [];

      for (let i = 0; i < 10; i++) {
        const product = digits[i] * weights[i];
        sum += product;
        checksumSteps.push({
          index: i + 1,
          digit: digits[i],
          weight: weights[i],
          product: product,
          runningSum: sum
        });
      }

      const modulo = sum % 10;
      const calculatedChecksum = (10 - modulo) % 10;
      const expectedChecksum = digits[10];
      const isChecksumValid = calculatedChecksum === expectedChecksum;

      // Extract raw date fields
      let year = parseInt(inputVal.substring(0, 2), 10);
      let month = parseInt(inputVal.substring(2, 4), 10);
      const day = parseInt(inputVal.substring(4, 6), 10);

      // Century offsets
      let century = 1900;
      let monthOffset = 0;
      if (month > 80 && month < 93) {
        century = 1800;
        monthOffset = 80;
      } else if (month > 20 && month < 33) {
        century = 2000;
        monthOffset = 20;
      } else if (month > 40 && month < 53) {
        century = 2100;
        monthOffset = 40;
      } else if (month > 60 && month < 73) {
        century = 2200;
        monthOffset = 60;
      }

      const parsedMonth = month - monthOffset;
      const fullYear = century + year;

      // Step 4: Validate month offset range
      if (parsedMonth < 1 || parsedMonth > 12) {
        setStepStatus('month', 'failure', `Month digits ${month} do not map to standard century offsets.`);
        setStepStatus('date', 'pending');
        setStepStatus('checksum', 'pending');

        const result = { valid: false, errorCode: 'INVALID_MONTH_OFFSET', rawMonth: month, message: 'Invalid month offset encoded.' };
        workbench.lastResult = result;
        workbench.setMessage('Invalid month: Encoded month range is invalid.', 'error');
        workbench.setOutput(`Validation Failed: INVALID_MONTH_OFFSET`);
        workbench.setBadge({ label: 'Error', state: 'error' });
        workbench.setStats([['Status', 'Failed'], ['Error Code', 'INVALID_MONTH_OFFSET']], ['The birth month digits do not map to any valid century offset range.'], 'error');

        if (resultsContainer) {
          resultsContainer.innerHTML = `
            <div class="pesel-results-header" style="color: #dc2626;">
              <span>✗</span> Validation Failed: Invalid Month Range
            </div>
            <div class="pesel-results-grid">
              <div class="pesel-result-row">
                <span class="row-label">Error Code</span>
                <span class="row-value">INVALID_MONTH_OFFSET</span>
              </div>
              <div class="pesel-result-row">
                <span class="row-label">Raw Month Value</span>
                <span class="row-value">${month}</span>
              </div>
            </div>
          `;
          resultsContainer.style.display = 'flex';
        }

        if (customActions) customActions.style.display = 'none';
        if (breakdownPanel) breakdownPanel.style.display = 'none';
        if (checksumDebugger) checksumDebugger.style.display = 'none';
        return;
      }
      setStepStatus('month', 'success');

      // Step 5: Validate calendar date
      if (!isValidCalendarDate(fullYear, parsedMonth, day)) {
        setStepStatus('date', 'failure', `Date ${fullYear}-${parsedMonth}-${day} does not exist in calendar.`);
        setStepStatus('checksum', 'pending');

        const result = { valid: false, errorCode: 'INVALID_DATE', date: `${fullYear}-${parsedMonth}-${day}`, message: 'Invalid calendar date.' };
        workbench.lastResult = result;
        workbench.setMessage(`Invalid date: ${fullYear}-${String(parsedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')} does not exist.`, 'error');
        workbench.setOutput(`Validation Failed: INVALID_DATE`);
        workbench.setBadge({ label: 'Error', state: 'error' });
        workbench.setStats([['Status', 'Failed'], ['Error Code', 'INVALID_DATE']], [`The parsed calendar date ${fullYear}-${parsedMonth}-${day} is mathematically impossible (e.g. Feb 30th).`], 'error');

        if (resultsContainer) {
          resultsContainer.innerHTML = `
            <div class="pesel-results-header" style="color: #dc2626;">
              <span>✗</span> Validation Failed: Invalid Calendar Date
            </div>
            <div class="pesel-results-grid">
              <div class="pesel-result-row">
                <span class="row-label">Error Code</span>
                <span class="row-value">INVALID_DATE</span>
              </div>
              <div class="pesel-result-row">
                <span class="row-label">Parsed Date</span>
                <span class="row-value">${fullYear}-${String(parsedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}</span>
              </div>
            </div>
          `;
          resultsContainer.style.display = 'flex';
        }

        if (customActions) customActions.style.display = 'none';
        if (breakdownPanel) breakdownPanel.style.display = 'none';
        if (checksumDebugger) checksumDebugger.style.display = 'none';
        return;
      }
      setStepStatus('date', 'success');

      // Step 6: Check checksum validation status
      if (!isChecksumValid) {
        setStepStatus('checksum', 'failure', `Provided check digit ${expectedChecksum} does not match expected ${calculatedChecksum}`);

        const result = {
          valid: false,
          errorCode: 'INVALID_CHECKSUM',
          expected: expectedChecksum,
          calculated: calculatedChecksum
        };
        workbench.lastResult = result;
        workbench.setMessage('Invalid checksum control digit.', 'error');
        workbench.setOutput(`Validation Failed: INVALID_CHECKSUM`);
        workbench.setBadge({ label: 'Error', state: 'error' });
        workbench.setStats([
          ['Status', 'Failed'],
          ['Error Code', 'INVALID_CHECKSUM'],
          ['Provided Checksum', String(expectedChecksum)],
          ['Calculated Checksum', String(calculatedChecksum)]
        ], ['The last control digit does not match Polish population registration checksum formula.'], 'error');

        if (resultsContainer) {
          resultsContainer.innerHTML = `
            <div class="pesel-results-header" style="color: #dc2626;">
              <span>✗</span> Validation Failed: Checksum Mismatch
            </div>
            <div class="pesel-results-grid">
              <div class="pesel-result-row">
                <span class="row-label">Error Code</span>
                <span class="row-value">INVALID_CHECKSUM</span>
              </div>
              <div class="pesel-result-row">
                <span class="row-label">Expected Check Digit</span>
                <span class="row-value">${calculatedChecksum}</span>
              </div>
              <div class="pesel-result-row">
                <span class="row-label">Actual Check Digit</span>
                <span class="row-value">${expectedChecksum}</span>
              </div>
            </div>
          `;
          resultsContainer.style.display = 'flex';
        }

        // Render Checksum Debugger even for failed checksums so they can learn why
        if (checksumDebugger) {
          checksumDebugger.innerHTML = `
            <div class="pesel-section-title" style="color: #dc2626;">
              <span>🧮</span> Checksum Debugger (Failed)
            </div>
            <p style="color: var(--muted); font-size: 0.8rem; margin: -8px 0 16px 0;">Formula: (1·d1 + 3·d2 + 7·d3 + 9·d4 + 1·d5 + 3·d6 + 7·d7 + 9·d8 + 1·d9 + 3·d10) % 10</p>
            <div class="pesel-debugger-table-container">
              <table class="pesel-dev-table">
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Digit</th>
                    <th>Weight</th>
                    <th>Product</th>
                    <th>Running Sum</th>
                  </tr>
                </thead>
                <tbody>
                  ${checksumSteps.map(s => `
                    <tr>
                      <td>d${s.index}</td>
                      <td style="font-weight: 700; color: var(--text);">${s.digit}</td>
                      <td>${s.weight}</td>
                      <td style="font-weight: 700;">${s.product}</td>
                      <td style="color: var(--muted);">${s.runningSum}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            <div class="pesel-formula-summary">
              <div class="pesel-formula-step">
                <span>Sum of Products</span>
                <span>${sum}</span>
              </div>
              <div class="pesel-formula-step">
                <span>Modulo Operation (Sum % 10)</span>
                <span>${modulo}</span>
              </div>
              <div class="pesel-formula-step">
                <span>Calculated Check Digit ((10 - Modulo) % 10)</span>
                <span style="color: #dc2626; font-weight: 700;">${calculatedChecksum}</span>
              </div>
              <div class="pesel-formula-step">
                <span>Provided Check Digit (d11)</span>
                <span style="font-weight: 700;">${expectedChecksum}</span>
              </div>
              <div class="pesel-formula-step">
                <span>Status</span>
                <span style="color: #dc2626; font-weight: 700;">✗ Checksum Mismatch</span>
              </div>
            </div>
          `;
          checksumDebugger.style.display = 'block';
        }

        workbench.setAdvanced(`
          <div class="pesel-dev-section">
            <details class="pesel-dev-accordion" open>
              <summary>Validation Pipeline Logs</summary>
              <div class="pesel-dev-accordion-content">
                <pre>✓ Input Present\n✓ Digits Only Check\n✓ Exactly 11 Digits Check\n✓ Century/Month Offset Valid\n✓ Calendar Date Valid\n✗ Checksum Valid (Failed: expected ${expectedChecksum}, calculated ${calculatedChecksum})</pre>
              </div>
            </details>
            <details class="pesel-dev-accordion">
              <summary>Raw JSON Output</summary>
              <div class="pesel-dev-accordion-content">
                <pre>${syntaxHighlightJson(result)}</pre>
              </div>
            </details>
          </div>
        `);

        if (customActions) customActions.style.display = 'none';
        if (breakdownPanel) breakdownPanel.style.display = 'none';
        return;
      }
      setStepStatus('checksum', 'success');

      // Valid state! Extract metadata
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const dateStr = `${day} ${monthNames[parsedMonth - 1]} ${fullYear}`;
      const genderDigit = digits[9];
      const gender = (genderDigit % 2 === 0) ? 'Female' : 'Male';
      const serialPart = inputVal.substring(6, 10);

      const result = {
        valid: true,
        normalized: inputVal,
        metadata: {
          birthDate: dateStr,
          birthYear: fullYear,
          century: `${century}s`,
          gender: gender,
          serial: serialPart,
          providedChecksum: expectedChecksum,
          calculatedChecksum: calculatedChecksum
        }
      };

      workbench.lastResult = result;

      // Update feedback stats
      workbench.setStats([
        ['Birth Date', dateStr],
        ['Gender', gender],
        ['Century', `${century}s`],
        ['Serial Code', serialPart],
        ['Verification Status', '✓ Valid']
      ], [`Length Check: Pass (11 digits)`, `Checksum Check: Pass`], 'success');

      // Render the single premium summary card
      if (resultsContainer) {
        resultsContainer.innerHTML = `
          <div class="pesel-results-header" style="color: #16a34a;">
            <span>✓</span> Validation Success: Verified PESEL
          </div>
          <div class="pesel-results-grid">
            <div class="pesel-result-row">
              <span class="row-label">Normalized PESEL</span>
              <span class="row-value">${inputVal}</span>
              <button type="button" class="pesel-row-copy-btn" data-copy-val="${inputVal}" aria-label="Copy Normalized Value">Copy</button>
            </div>
            <div class="pesel-result-row">
              <span class="row-label">Birth Date</span>
              <span class="row-value">${dateStr}</span>
            </div>
            <div class="pesel-result-row">
              <span class="row-label">Gender</span>
              <span class="row-value">${gender}</span>
            </div>
            <div class="pesel-result-row">
              <span class="row-label">Century</span>
              <span class="row-value">${century}s</span>
            </div>
            <div class="pesel-result-row">
              <span class="row-label">Serial Code</span>
              <span class="row-value">${serialPart}</span>
            </div>
            <div class="pesel-result-row">
              <span class="row-label">Control Digit</span>
              <span class="row-value">${expectedChecksum} (Passed)</span>
            </div>
          </div>
        `;

        resultsContainer.querySelectorAll('[data-copy-val]').forEach(btn => {
          btn.addEventListener('click', () => {
            copyToClipboard(btn.dataset.copyVal, workbench, 'Copied normalized value.');
          });
        });

        resultsContainer.style.display = 'flex';
      }

      // Render custom copy JSON and download button row
      if (customActions) {
        customActions.innerHTML = `
          <button type="button" class="button button-secondary compact" id="custom-copy-json">Copy JSON</button>
          <button type="button" class="button button-secondary compact" id="custom-download-json">Download JSON</button>
        `;
        customActions.querySelector('#custom-copy-json').addEventListener('click', () => {
          copyToClipboard(JSON.stringify(result, null, 2), workbench, 'Copied raw JSON to clipboard.');
        });
        customActions.querySelector('#custom-download-json').addEventListener('click', () => {
          const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `pesel-validator-output-${inputVal}.json`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          workbench.setMessage('Downloaded result file.', 'success');
        });
        customActions.style.display = 'flex';
      }

      // Render the PESEL breakdown visualization card
      if (breakdownPanel) {
        breakdownPanel.innerHTML = `
          <div class="pesel-section-title">
            <span>📊</span> Identifier Breakdown
          </div>
          <div class="pesel-breakdown-digits">
            <span class="pesel-digit-box year" title="Year of Birth: ${inputVal.substring(0, 2)}">${inputVal.substring(0, 1)}</span>
            <span class="pesel-digit-box year" title="Year of Birth: ${inputVal.substring(0, 2)}">${inputVal.substring(1, 2)}</span>
            <span class="pesel-digit-box month" title="Month of Birth: ${inputVal.substring(2, 4)}">${inputVal.substring(2, 3)}</span>
            <span class="pesel-digit-box month" title="Month of Birth: ${inputVal.substring(2, 4)}">${inputVal.substring(3, 4)}</span>
            <span class="pesel-digit-box day" title="Day of Birth: ${inputVal.substring(4, 6)}">${inputVal.substring(4, 5)}</span>
            <span class="pesel-digit-box day" title="Day of Birth: ${inputVal.substring(4, 6)}">${inputVal.substring(5, 6)}</span>
            <span class="pesel-digit-box serial" title="Sequence Code: ${inputVal.substring(6, 10)}">${inputVal.substring(6, 7)}</span>
            <span class="pesel-digit-box serial" title="Sequence Code: ${inputVal.substring(6, 10)}">${inputVal.substring(7, 8)}</span>
            <span class="pesel-digit-box serial" title="Sequence Code: ${inputVal.substring(6, 10)}">${inputVal.substring(8, 9)}</span>
            <span class="pesel-digit-box serial" title="Sequence Code & Gender: ${inputVal.substring(6, 10)}">${inputVal.substring(9, 10)}</span>
            <span class="pesel-digit-box checksum" title="Control Checksum Digit">${inputVal.substring(10, 11)}</span>
          </div>
          <div class="pesel-breakdown-legend">
            <span class="pesel-legend-item year">YY (Year)</span>
            <span class="pesel-legend-item month">MM (Month)</span>
            <span class="pesel-legend-item day">DD (Day)</span>
            <span class="pesel-legend-item serial">Sequence & Gender</span>
            <span class="pesel-legend-item checksum">Check Digit</span>
          </div>
        `;
        breakdownPanel.style.display = 'block';
      }

      // Render Checksum Debugger matrix
      if (checksumDebugger) {
        checksumDebugger.innerHTML = `
          <div class="pesel-section-title" style="color: #16a34a;">
            <span>🧮</span> Checksum Debugger
          </div>
          <p style="color: var(--muted); font-size: 0.8rem; margin: -8px 0 16px 0;">Formula: (1·d1 + 3·d2 + 7·d3 + 9·d4 + 1·d5 + 3·d6 + 7·d7 + 9·d8 + 1·d9 + 3·d10) % 10</p>
          <div class="pesel-debugger-table-container">
            <table class="pesel-dev-table">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Digit</th>
                  <th>Weight</th>
                  <th>Product</th>
                  <th>Running Sum</th>
                </tr>
              </thead>
              <tbody>
                ${checksumSteps.map(s => `
                  <tr>
                    <td>d${s.index}</td>
                    <td style="font-weight: 700; color: var(--text);">${s.digit}</td>
                    <td>${s.weight}</td>
                    <td style="font-weight: 700;">${s.product}</td>
                    <td style="color: var(--muted);">${s.runningSum}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <div class="pesel-formula-summary">
            <div class="pesel-formula-step">
              <span>Sum of Products</span>
              <span>${sum}</span>
            </div>
            <div class="pesel-formula-step">
              <span>Modulo Operation (Sum % 10)</span>
              <span>${modulo}</span>
            </div>
            <div class="pesel-formula-step">
              <span>Calculated Check Digit ((10 - Modulo) % 10)</span>
              <span style="color: #16a34a; font-weight: 700;">${calculatedChecksum}</span>
            </div>
            <div class="pesel-formula-step">
              <span>Provided Check Digit (d11)</span>
              <span style="font-weight: 700;">${expectedChecksum}</span>
            </div>
            <div class="pesel-formula-step">
              <span>Status</span>
              <span style="color: #16a34a; font-weight: 700;">✓ Checksum Matches</span>
            </div>
          </div>
        `;
        checksumDebugger.style.display = 'block';
      }

      // Update DevTools structured accordions
      workbench.setAdvanced(`
        <div class="pesel-dev-section">
          <details class="pesel-dev-accordion" open>
            <summary>Validation Pipeline Logs</summary>
            <div class="pesel-dev-accordion-content">
              <pre>✓ Input Present\n✓ Digits Only Check\n✓ Exactly 11 Digits Check\n✓ Century/Month Offset Valid\n✓ Calendar Date Valid\n✓ Checksum Valid</pre>
            </div>
          </details>
          <details class="pesel-dev-accordion">
            <summary>Regex & Structure Details</summary>
            <div class="pesel-dev-accordion-content">
              <pre>Pattern: /^\\d{11}$/\nMatched: true</pre>
            </div>
          </details>
          <details class="pesel-dev-accordion">
            <summary>Decoded Date Internals</summary>
            <div class="pesel-dev-accordion-content">
              <pre>Raw Year Digits: ${year}\nRaw Month Digits: ${month}\nRaw Day Digits: ${day}\nCentury Group Offset: ${monthOffset}\nParsed Month: ${parsedMonth}\nDecoded Year: ${fullYear}</pre>
            </div>
          </details>
          <details class="pesel-dev-accordion">
            <summary>Raw JSON Output</summary>
            <div class="pesel-dev-accordion-content" style="background: var(--code-bg); padding: 12px; border-radius: 6px;">
              <pre style="margin: 0; font-family: monospace;">${syntaxHighlightJson(result)}</pre>
            </div>
          </details>
        </div>
      `);

      let outputText = `Validation Result: VALID\n\n`;
      outputText += `• Normalized PESEL: ${inputVal}\n`;
      outputText += `• Birth Date: ${dateStr}\n`;
      outputText += `• Century: ${century}s\n`;
      outputText += `• Gender: ${gender}\n`;
      outputText += `• Serial Code: ${serialPart}\n`;
      outputText += `• Checksum Control: ${expectedChecksum} (Passed)`;

      workbench.setOutput(outputText);
      workbench.setMessage('PESEL matches checksum formula.', 'success');
      workbench.setBadge({ label: 'Valid', state: 'success' });
    }
  };

  if (window.ValidoWorkbench) {
    window.ValidoWorkbench.registerPlugin(PESEL_ALGORITHM, PeselPlugin);
  }
}());
