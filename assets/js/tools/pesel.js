(function () {
  'use strict';

  const PESEL_ALGORITHM = 'validohub.pesel';

  const isValidCalendarDate = function (year, month, day) {
    const d = new Date(year, month - 1, day);
    return d.getFullYear() === year && d.getMonth() === (month - 1) && d.getDate() === day;
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
        gap: 24px;
      }
      .pesel-pipeline {
        background: var(--surface-soft);
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 20px;
      }
      .pesel-pipeline-title {
        font-size: 0.95rem;
        font-weight: 700;
        margin: 0 0 12px 0;
        color: var(--text);
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .pesel-pipeline-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .pesel-step {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.88rem;
        font-weight: 500;
        padding: 8px 12px;
        border-radius: 6px;
        background: var(--surface);
        border: 1px solid var(--line);
        transition: all 0.2s;
      }
      .pesel-step.success {
        border-color: rgba(22, 163, 74, 0.4);
        color: #16a34a;
        background: rgba(22, 163, 74, 0.05);
      }
      .pesel-step.failure {
        border-color: rgba(220, 38, 38, 0.4);
        color: #dc2626;
        background: rgba(220, 38, 38, 0.05);
      }
      .pesel-step.pending {
        color: var(--muted);
        opacity: 0.6;
      }
      .pesel-step-label {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .pesel-step-status-text {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
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
      }
      .pesel-result-row .row-label {
        font-size: 0.75rem;
        color: var(--muted);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }
      .pesel-result-row .row-value {
        font-size: 0.95rem;
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
      .pesel-dev-section {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .pesel-dev-card {
        background: var(--surface-soft);
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 16px;
      }
      .pesel-dev-card h4 {
        margin: 0 0 12px 0;
        font-size: 0.85rem;
        color: #f2c94c;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        border-bottom: 1px solid var(--line);
        padding-bottom: 6px;
      }
      .pesel-dev-card pre {
        margin: 0;
        font-family: monospace;
        font-size: 0.8rem;
        line-height: 1.4;
        white-space: pre-wrap;
        color: var(--code-text);
      }
      .pesel-dev-table {
        width: 100%;
        border-collapse: collapse;
        font-family: monospace;
        font-size: 0.8rem;
        margin-top: 8px;
      }
      .pesel-dev-table th, .pesel-dev-table td {
        border: 1px solid var(--line);
        padding: 6px 8px;
        text-align: center;
      }
      .pesel-dev-table th {
        background: var(--surface);
        color: var(--muted);
      }
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

      // Format documentation list items using client-side regexp bold translation
      workbench.form.parentNode.querySelectorAll('.doc-accordion .rich-text').forEach(el => {
        el.querySelectorAll('li').forEach(li => {
          let html = li.innerHTML;
          if (html.includes('**')) {
            html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            li.innerHTML = html;
          }
        });
      });

      // Customize the top introductory details
      const pageIntro = document.querySelector('.page-intro');
      if (pageIntro) {
        const introTitle = pageIntro.querySelector('h1');
        if (introTitle) introTitle.textContent = 'PESEL Validator & Explainer';
        const introDesc = pageIntro.querySelector('p');
        if (introDesc) {
          introDesc.textContent = 'Validate an 11-digit Polish PESEL, decode birth date and gender, and inspect the checksum calculation locally in your browser.';
        }
      }

      // Hide default introductory boilerplate inside the form card
      const headingText = workbench.form.querySelector('.workbench-heading');
      if (headingText) {
        headingText.style.display = 'none';
      }

      // Hide default raw output field label
      const outputField = workbench.form.querySelector('.output-field');
      if (outputField) {
        outputField.style.display = 'none';
      }

      // Hide default action buttons to make validate/clear cleaner
      const copyBtn = workbench.form.querySelector('[data-tool-copy]');
      if (copyBtn) copyBtn.style.display = 'none';
      const downloadBtn = workbench.form.querySelector('[data-tool-download]');
      if (downloadBtn) downloadBtn.style.display = 'none';

      // Insert pipeline and premium outputs elements
      if (!workbench.form.querySelector('.pesel-premium-panel')) {
        const premiumPanel = document.createElement('div');
        premiumPanel.className = 'pesel-premium-panel';
        premiumPanel.innerHTML = `
          <!-- Pipeline Tracker -->
          <div class="pesel-pipeline">
            <div class="pesel-pipeline-title">
              <span>🧭</span> Validation Pipeline
            </div>
            <div class="pesel-pipeline-list">
              <div class="pesel-step pending" data-step="present">
                <div class="pesel-step-label">
                  <span class="pesel-step-icon">○</span> Input Present
                </div>
                <span class="pesel-step-status-text">Pending</span>
              </div>
              <div class="pesel-step pending" data-step="digits">
                <div class="pesel-step-label">
                  <span class="pesel-step-icon">○</span> Digits Only
                </div>
                <span class="pesel-step-status-text">Pending</span>
              </div>
              <div class="pesel-step pending" data-step="length">
                <div class="pesel-step-label">
                  <span class="pesel-step-icon">○</span> Exactly 11 Digits
                </div>
                <span class="pesel-step-status-text">Pending</span>
              </div>
              <div class="pesel-step pending" data-step="month">
                <div class="pesel-step-label">
                  <span class="pesel-step-icon">○</span> Century/Month Offset Valid
                </div>
                <span class="pesel-step-status-text">Pending</span>
              </div>
              <div class="pesel-step pending" data-step="date">
                <div class="pesel-step-label">
                  <span class="pesel-step-icon">○</span> Calendar Date Valid
                </div>
                <span class="pesel-step-status-text">Pending</span>
              </div>
              <div class="pesel-step pending" data-step="checksum">
                <div class="pesel-step-label">
                  <span class="pesel-step-icon">○</span> Checksum Valid
                </div>
                <span class="pesel-step-status-text">Pending</span>
              </div>
            </div>
          </div>

          <!-- Premium Results Section -->
          <div class="pesel-results-container" style="display: none;"></div>

          <!-- Dynamic Action Buttons Row -->
          <div class="pesel-custom-actions button-row" style="display: none; margin-top: 12px; border-top: 1px solid var(--line); padding-top: 16px;"></div>
        `;
        workbench.form.appendChild(premiumPanel);
      }

      // Format documentation accordions
      workbench.form.parentNode.querySelectorAll('.doc-accordion').forEach(acc => {
        acc.style.border = '1px solid var(--line)';
        acc.style.borderRadius = '8px';
        acc.style.marginBottom = '12px';
        acc.style.overflow = 'hidden';
      });

      // Clear duplicate Graph-Powered Discovery sections
      const discoveryBlock = document.querySelector('.related-resources-discovery');
      if (discoveryBlock) {
        discoveryBlock.style.display = 'none';
      }

      // Render the single unified ecosystem block at the bottom related tools section
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

      const setStepStatus = function (stepName, state, errorMsg) {
        if (!premiumPanel) return;
        const step = premiumPanel.querySelector(`[data-step="${stepName}"]`);
        if (!step) return;

        step.className = `pesel-step ${state}`;
        const icon = step.querySelector('.pesel-step-icon');
        if (icon) {
          icon.textContent = state === 'success' ? '✓' : (state === 'failure' ? '✗' : '○');
        }
        const statusText = step.querySelector('.pesel-step-status-text');
        if (statusText) {
          statusText.textContent = state === 'success' ? 'Pass' : (state === 'failure' ? `Fail: ${errorMsg}` : 'Pending');
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
        return;
      }
      setStepStatus('present', 'success');

      // Step 2: Digits only check
      if (/\D/.test(inputVal)) {
        setStepStatus('digits', 'failure', 'Contains non-digits');
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
              <span>✗</span> Validation Failed: Invalid Structure
            </div>
            <div class="pesel-results-grid">
              <div class="pesel-result-row">
                <span class="row-label">Error Code</span>
                <span class="row-value">INVALID_CHARACTERS</span>
              </div>
              <div class="pesel-result-row">
                <span class="row-label">Failure Step</span>
                <span class="row-value">Digits Only Check</span>
              </div>
            </div>
          `;
          resultsContainer.style.display = 'flex';
        }

        workbench.setAdvanced(`
          <div class="pesel-dev-section">
            <div class="pesel-dev-card">
              <h4>Validation Pipeline Logs</h4>
              <pre>✓ Input Present\n✗ Digits Only Check (Failed: non-numeric character found)\n○ Length Check (Skipped)\n○ Month Offset (Skipped)\n○ Date Verification (Skipped)\n○ Checksum Matching (Skipped)</pre>
            </div>
            <div class="pesel-dev-card">
              <h4>Regex Evaluation</h4>
              <pre>Pattern: /^\\d{11}$/\nMatched: false</pre>
            </div>
          </div>
        `);

        if (customActions) customActions.style.display = 'none';
        return;
      }
      setStepStatus('digits', 'success');

      // Step 3: Length check
      if (inputVal.length !== 11) {
        setStepStatus('length', 'failure', `Length is ${inputVal.length} (expected 11)`);
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
            <div class="pesel-dev-card">
              <h4>Validation Pipeline Logs</h4>
              <pre>✓ Input Present\n✓ Digits Only Check\n✗ Exactly 11 Digits Check (Failed: got ${inputVal.length})\n○ Month Offset (Skipped)\n○ Date Verification (Skipped)\n○ Checksum Matching (Skipped)</pre>
            </div>
            <div class="pesel-dev-card">
              <h4>Regex Evaluation</h4>
              <pre>Pattern: /^\\d{11}$/\nMatched: false</pre>
            </div>
          </div>
        `);

        if (customActions) customActions.style.display = 'none';
        return;
      }
      setStepStatus('length', 'success');

      // Math checksum verification
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
          product: product
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
        setStepStatus('month', 'failure', `Parsed month ${parsedMonth} out of bounds`);
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
              <span>✗</span> Validation Failed: Invalid Month Offset
            </div>
            <div class="pesel-results-grid">
              <div class="pesel-result-row">
                <span class="row-label">Error Code</span>
                <span class="row-value">INVALID_MONTH_OFFSET</span>
              </div>
              <div class="pesel-result-row">
                <span class="row-label">Raw Month Digits</span>
                <span class="row-value">${month}</span>
              </div>
            </div>
          `;
          resultsContainer.style.display = 'flex';
        }

        if (customActions) customActions.style.display = 'none';
        return;
      }
      setStepStatus('month', 'success');

      // Step 5: Validate calendar date
      if (!isValidCalendarDate(fullYear, parsedMonth, day)) {
        setStepStatus('date', 'failure', `Date ${fullYear}-${parsedMonth}-${day} doesn't exist`);
        setStepStatus('checksum', 'pending');

        const result = { valid: false, errorCode: 'INVALID_DATE', date: `${fullYear}-${parsedMonth}-${day}`, message: 'Invalid calendar date.' };
        workbench.lastResult = result;
        workbench.setMessage(`Invalid date: ${fullYear}-${String(parsedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')} does not exist.`, 'error');
        workbench.setOutput(`Validation Failed: INVALID_DATE`);
        workbench.setBadge({ label: 'Error', state: 'error' });
        workbench.setStats([['Status', 'Failed'], ['Error Code', 'INVALID_DATE']], [`The parsed calendar date ${fullYear}-${parsedMonth}-${day} is mathematically impossible.`], 'error');

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
        return;
      }
      setStepStatus('date', 'success');

      // Step 6: Check checksum validation status
      if (!isChecksumValid) {
        setStepStatus('checksum', 'failure', `Expected ${expectedChecksum}, calculated ${calculatedChecksum}`);

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
                <span class="row-label">Provided Digit</span>
                <span class="row-value">${expectedChecksum}</span>
              </div>
              <div class="pesel-result-row">
                <span class="row-label">Calculated Digit</span>
                <span class="row-value">${calculatedChecksum}</span>
              </div>
            </div>
          `;
          resultsContainer.style.display = 'flex';
        }

        // Developer Mode
        workbench.setAdvanced(`
          <div class="pesel-dev-section">
            <div class="pesel-dev-card">
              <h4>Validation Pipeline Logs</h4>
              <pre>✓ Input Present\n✓ Digits Only Check\n✓ Exactly 11 Digits Check\n✓ Century/Month Offset Valid\n✓ Calendar Date Valid\n✗ Checksum Valid (Failed: expected ${expectedChecksum}, calculated ${calculatedChecksum})</pre>
            </div>
            <div class="pesel-dev-card">
              <h4>Checksum Multiplication Steps</h4>
              <table class="pesel-dev-table">
                <thead>
                  <tr>
                    <th>Digit Index</th>
                    <th>PESEL Digit</th>
                    <th>Multiplier Weight</th>
                    <th>Weighted Product</th>
                  </tr>
                </thead>
                <tbody>
                  ${checksumSteps.map(s => `
                    <tr>
                      <td>${s.index}</td>
                      <td>${s.digit}</td>
                      <td>${s.weight}</td>
                      <td>${s.product}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
              <pre style="margin-top: 12px;">Sum of Products: ${sum}\nSum % 10 = ${modulo}\n(10 - Modulo) % 10 = ${calculatedChecksum} (Expected: ${expectedChecksum} - MATCH: FALSE)</pre>
            </div>
            <div class="pesel-dev-card">
              <h4>Raw JSON Output</h4>
              <pre>${JSON.stringify(result, null, 2)}</pre>
            </div>
          </div>
        `);

        if (customActions) customActions.style.display = 'none';
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

      // Render the premium result grid cards
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

      // Update Developer Mode subsections
      workbench.setAdvanced(`
        <div class="pesel-dev-section">
          <div class="pesel-dev-card">
            <h4>Validation Pipeline Logs</h4>
            <pre>✓ Input Present\n✓ Digits Only Check\n✓ Exactly 11 Digits Check\n✓ Century/Month Offset Valid\n✓ Calendar Date Valid\n✓ Checksum Valid</pre>
          </div>
          <div class="pesel-dev-card">
            <h4>Checksum Calculations</h4>
            <table class="pesel-dev-table">
              <thead>
                <tr>
                  <th>Digit Index</th>
                  <th>PESEL Digit</th>
                  <th>Multiplier Weight</th>
                  <th>Weighted Product</th>
                </tr>
              </thead>
              <tbody>
                ${checksumSteps.map(s => `
                  <tr>
                    <td>${s.index}</td>
                    <td>${s.digit}</td>
                    <td>${s.weight}</td>
                    <td>${s.product}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <pre style="margin-top: 12px;">Sum of Products: ${sum}\nSum % 10 = ${modulo}\n(10 - Modulo) % 10 = ${calculatedChecksum} (Expected: ${expectedChecksum} - MATCH: TRUE)</pre>
          </div>
          <div class="pesel-dev-card">
            <h4>Regex & Structure</h4>
            <pre>Pattern: /^\\d{11}$/\nMatched: true</pre>
          </div>
          <div class="pesel-dev-card">
            <h4>Decoded Date Internals</h4>
            <pre>Raw Year Digits: ${year}\nRaw Month Digits: ${month}\nRaw Day Digits: ${day}\nCentury Group offset: ${monthOffset}\nParsed Month: ${parsedMonth}\nDecoded Year: ${fullYear}</pre>
          </div>
          <div class="pesel-dev-card">
            <h4>Raw JSON Payload</h4>
            <pre>${JSON.stringify(result, null, 2)}</pre>
          </div>
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
