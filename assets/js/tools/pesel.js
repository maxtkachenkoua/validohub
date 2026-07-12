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
      .pesel-pipeline-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 12px;
      }
      .pesel-step {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.85rem;
        font-weight: 500;
        padding: 8px 12px;
        border-radius: 6px;
        background: var(--surface);
        border: 1px solid var(--line);
        transition: all 0.2s;
      }
      .pesel-step.success {
        border-color: #16a34a;
        color: #16a34a;
      }
      .pesel-step.failure {
        border-color: #dc2626;
        color: #dc2626;
      }
      .pesel-step.pending {
        color: var(--muted);
        opacity: 0.6;
      }
      .pesel-step-icon {
        font-size: 1rem;
        line-height: 1;
      }
      .pesel-results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
      }
      .pesel-result-card {
        background: var(--surface-soft);
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 16px;
        position: relative;
        transition: border-color 0.2s;
      }
      .pesel-result-card:hover {
        border-color: var(--muted);
      }
      .pesel-result-card .card-label {
        font-size: 0.75rem;
        text-transform: uppercase;
        color: var(--muted);
        font-weight: 600;
        letter-spacing: 0.05em;
        margin-bottom: 6px;
      }
      .pesel-result-card .card-value {
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--text);
        word-break: break-all;
      }
      .pesel-result-card .card-copy-btn {
        position: absolute;
        top: 12px;
        right: 12px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        font-size: 0.8rem;
        color: var(--muted);
        transition: background 0.2s, color 0.2s;
      }
      .pesel-result-card .card-copy-btn:hover {
        background: var(--line);
        color: var(--text);
      }
      .pesel-dev-section {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .pesel-dev-block {
        border-left: 3px solid var(--muted);
        padding-left: 12px;
        margin-bottom: 12px;
      }
      .pesel-dev-block h5 {
        margin: 0 0 6px 0;
        font-size: 0.85rem;
        color: #f2c94c;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .pesel-dev-block pre {
        margin: 0;
        font-size: 0.8rem;
        line-height: 1.4;
        white-space: pre-wrap;
      }
      .pesel-discovery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
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
      // Fallback
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

      // Trigger input event to run validator
      input.dispatchEvent(new Event('input', { bubbles: true }));
    },
    onMount: function (workbench) {
      injectStyles();

      // Hide the default raw output field label
      const outputField = workbench.form.querySelector('.output-field');
      if (outputField) {
        outputField.style.display = 'none';
      }

      // Add a dynamic container for premium results and pipeline tracker
      if (!workbench.form.querySelector('.pesel-premium-panel')) {
        const premiumPanel = document.createElement('div');
        premiumPanel.className = 'pesel-premium-panel';
        premiumPanel.innerHTML = `
          <!-- Pipeline Tracker -->
          <div class="pesel-pipeline">
            <div class="pesel-pipeline-title">
              <span>🧭</span> Validation Pipeline
            </div>
            <div class="pesel-pipeline-grid">
              <div class="pesel-step pending" data-step="length">
                <span class="pesel-step-icon">○</span> Length Check
              </div>
              <div class="pesel-step pending" data-step="digits">
                <span class="pesel-step-icon">○</span> Digit Check
              </div>
              <div class="pesel-step pending" data-step="month">
                <span class="pesel-step-icon">○</span> Month Range
              </div>
              <div class="pesel-step pending" data-step="date">
                <span class="pesel-step-icon">○</span> Calendar Date
              </div>
              <div class="pesel-step pending" data-step="checksum">
                <span class="pesel-step-icon">○</span> Checksum Digit
              </div>
            </div>
          </div>

          <!-- Premium Results Grid -->
          <div class="pesel-results-grid" style="display: none;"></div>
        `;
        workbench.form.appendChild(premiumPanel);
      }

      // Customize and polish accordion documentation styles
      workbench.form.parentNode.querySelectorAll('.doc-accordion').forEach(acc => {
        acc.style.border = '1px solid var(--line)';
        acc.style.borderRadius = '8px';
        acc.style.marginBottom = '12px';
        acc.style.overflow = 'hidden';
      });

      // Curate Graph-Powered Discovery Section to render beautiful responsive cards
      const discoveryCard = document.querySelector('.related-resources-discovery');
      if (discoveryCard) {
        discoveryCard.innerHTML = `
          <div class="section-heading">
            <span class="eyebrow">ValidoHub Knowledge Graph</span>
            <h2>Curated PESEL Discovery</h2>
          </div>
          <p style="color: var(--muted); font-size: 0.85rem;">Verified semantic resources connected to Polish Identity Registries.</p>
          <div class="pesel-discovery-grid">
            <a href="/en/poland/" class="pesel-discovery-card">
              <div>
                <h4>Poland Compliance Hub <span aria-hidden="true">→</span></h4>
                <p>Verify Polish currency, address formats, locale configurations, and domestic banking standards.</p>
              </div>
              <div class="card-footer">Country Hub</div>
            </a>
            <a href="/en/categories/national-identifiers/" class="pesel-discovery-card">
              <div>
                <h4>National Identifiers <span aria-hidden="true">→</span></h4>
                <p>Core Polish citizen identity formats, covering PESEL numbers, NIP tax codes, and REGON database specs.</p>
              </div>
              <div class="card-footer">Standards Spec</div>
            </a>
            <a href="https://www.gov.pl/web/gov/sprawdz-swoje-dane-w-rejestrze-pesel" target="_blank" rel="noopener" class="pesel-discovery-card">
              <div>
                <h4>Ministry of Digital Affairs <span aria-hidden="true">↗</span></h4>
                <p>Official registry governor administration portal for Polish citizen registrations.</p>
              </div>
              <div class="card-footer">Authority Link</div>
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

      // Setup custom copy operations block
      const buttonRow = workbench.form.querySelector('.button-row');
      if (buttonRow && !buttonRow.querySelector('.custom-copy-btn')) {
        // Copy JSON Button
        const copyJsonBtn = document.createElement('button');
        copyJsonBtn.type = 'button';
        copyJsonBtn.className = 'button button-secondary compact custom-copy-btn';
        copyJsonBtn.style.fontSize = '0.78rem';
        copyJsonBtn.style.padding = '4px 8px';
        copyJsonBtn.style.cursor = 'pointer';
        copyJsonBtn.textContent = 'Copy JSON';
        copyJsonBtn.addEventListener('click', () => {
          if (workbench.lastResult) {
            copyToClipboard(JSON.stringify(workbench.lastResult, null, 2), workbench, 'Copied raw JSON to clipboard.');
          } else {
            workbench.setMessage('No result to copy yet.', 'error');
          }
        });
        buttonRow.appendChild(copyJsonBtn);

        // Copy Normalized Button
        const copyNormBtn = document.createElement('button');
        copyNormBtn.type = 'button';
        copyNormBtn.className = 'button button-secondary compact custom-copy-btn';
        copyNormBtn.style.fontSize = '0.78rem';
        copyNormBtn.style.padding = '4px 8px';
        copyNormBtn.style.cursor = 'pointer';
        copyNormBtn.textContent = 'Copy Normalized';
        copyNormBtn.addEventListener('click', () => {
          const input = workbench.primaryInput();
          if (input) {
            const normalized = input.value.replace(/\s/g, '');
            copyToClipboard(normalized, workbench, `Copied normalized value: ${normalized}`);
          }
        });
        buttonRow.appendChild(copyNormBtn);
      }
    },
    run: function (workbench, action, options) {
      const values = workbench.values();
      const rawInput = values.pesel || '';
      const inputVal = rawInput.replace(/\s/g, '');

      const premiumPanel = workbench.form.querySelector('.pesel-premium-panel');
      const resultsGrid = workbench.form.querySelector('.pesel-results-grid');

      const setStepStatus = function (stepName, state) {
        if (!premiumPanel) return;
        const step = premiumPanel.querySelector(`[data-step="${stepName}"]`);
        if (!step) return;

        step.className = `pesel-step ${state}`;
        const icon = step.querySelector('.pesel-step-icon');
        if (icon) {
          icon.textContent = state === 'success' ? '✓' : (state === 'failure' ? '✗' : '○');
        }
      };

      const resetSteps = () => {
        ['length', 'digits', 'month', 'date', 'checksum'].forEach(s => setStepStatus(s, 'pending'));
      };

      if (!inputVal) {
        workbench.setMessage('Please enter a PESEL number.', 'error');
        workbench.setOutput('');
        workbench.setBadge({ label: 'Waiting for input', state: '' });
        workbench.clearPanels();
        resetSteps();
        if (resultsGrid) resultsGrid.style.display = 'none';
        return;
      }

      // Step 1: Digit check
      if (/\D/.test(inputVal)) {
        resetSteps();
        setStepStatus('digits', 'failure');
        const result = { valid: false, errorCode: 'INVALID_CHARACTERS', message: 'Contains non-digit characters.' };
        workbench.lastResult = result;
        workbench.setMessage('Invalid structure: Must contain digits only.', 'error');
        workbench.setOutput(`Validation Failed: INVALID_CHARACTERS`);
        workbench.setBadge({ label: 'Error', state: 'error' });
        workbench.setStats([['Status', 'Failed'], ['Error Code', 'INVALID_CHARACTERS']], ['Input must contain exactly 11 numeric characters.'], 'error');
        workbench.setAdvanced(`
          <div class="pesel-dev-section">
            <div class="pesel-dev-block">
              <h5>Validation Pipeline</h5>
              <pre>✗ Digit check (Failed: input contains non-numeric characters)\n○ Length check (Skipped)\n○ Month offset (Skipped)\n○ Calendar date (Skipped)\n○ Checksum control (Skipped)</pre>
            </div>
            <div class="pesel-dev-block">
              <h5>Regex Match</h5>
              <pre>Pattern: /^\\d{11}$/\nMatch: false</pre>
            </div>
          </div>
        `);
        if (resultsGrid) resultsGrid.style.display = 'none';
        return;
      }
      setStepStatus('digits', 'success');

      // Step 2: Length check
      if (inputVal.length !== 11) {
        setStepStatus('length', 'failure');
        setStepStatus('month', 'pending');
        setStepStatus('date', 'pending');
        setStepStatus('checksum', 'pending');
        const result = { valid: false, errorCode: 'INVALID_LENGTH', length: inputVal.length, message: 'Must be exactly 11 digits.' };
        workbench.lastResult = result;
        workbench.setMessage(`Invalid structure: Length is ${inputVal.length} (expected 11).`, 'error');
        workbench.setOutput(`Validation Failed: INVALID_LENGTH`);
        workbench.setBadge({ label: 'Error', state: 'error' });
        workbench.setStats([['Status', 'Failed'], ['Error Code', 'INVALID_LENGTH']], [`Expected 11 digits, but got ${inputVal.length}.`], 'error');
        workbench.setAdvanced(`
          <div class="pesel-dev-section">
            <div class="pesel-dev-block">
              <h5>Validation Pipeline</h5>
              <pre>✓ Digit check (Passed)\n✗ Length check (Failed: actual ${inputVal.length})\n○ Month offset (Skipped)\n○ Calendar date (Skipped)\n○ Checksum control (Skipped)</pre>
            </div>
            <div class="pesel-dev-block">
              <h5>Regex Match</h5>
              <pre>Pattern: /^\\d{11}$/\nMatch: false</pre>
            </div>
          </div>
        `);
        if (resultsGrid) resultsGrid.style.display = 'none';
        return;
      }
      setStepStatus('length', 'success');

      // Weights & Digits calculation
      const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
      const digits = inputVal.split('').map(Number);
      let sum = 0;
      const checksumSteps = [];

      for (let i = 0; i < 10; i++) {
        const product = digits[i] * weights[i];
        sum += product;
        checksumSteps.push(`Digit ${i+1} (${digits[i]}) * Weight ${weights[i]} = ${product}`);
      }

      const modulo = sum % 10;
      const calculatedChecksum = (10 - modulo) % 10;
      const expectedChecksum = digits[10];
      const isChecksumValid = calculatedChecksum === expectedChecksum;

      // Extract raw date fields
      let year = parseInt(inputVal.substring(0, 2), 10);
      let month = parseInt(inputVal.substring(2, 4), 10);
      const day = parseInt(inputVal.substring(4, 6), 10);

      // Handle century offsets
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

      // Step 3: Validate month offset range
      if (parsedMonth < 1 || parsedMonth > 12) {
        setStepStatus('month', 'failure');
        setStepStatus('date', 'pending');
        setStepStatus('checksum', 'pending');
        const result = { valid: false, errorCode: 'INVALID_MONTH_OFFSET', rawMonth: month, message: 'Invalid month offset encoded.' };
        workbench.lastResult = result;
        workbench.setMessage('Invalid month: Encoded month range is invalid.', 'error');
        workbench.setOutput(`Validation Failed: INVALID_MONTH_OFFSET`);
        workbench.setBadge({ label: 'Error', state: 'error' });
        workbench.setStats([['Status', 'Failed'], ['Error Code', 'INVALID_MONTH_OFFSET']], ['The birth month digits do not map to any valid century offset range.'], 'error');
        if (resultsGrid) resultsGrid.style.display = 'none';
        return;
      }
      setStepStatus('month', 'success');

      // Step 4: Validate calendar date
      if (!isValidCalendarDate(fullYear, parsedMonth, day)) {
        setStepStatus('date', 'failure');
        setStepStatus('checksum', 'pending');
        const result = { valid: false, errorCode: 'INVALID_DATE', date: `${fullYear}-${parsedMonth}-${day}`, message: 'Invalid calendar date.' };
        workbench.lastResult = result;
        workbench.setMessage(`Invalid date: ${fullYear}-${String(parsedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')} does not exist.`, 'error');
        workbench.setOutput(`Validation Failed: INVALID_DATE`);
        workbench.setBadge({ label: 'Error', state: 'error' });
        workbench.setStats([['Status', 'Failed'], ['Error Code', 'INVALID_DATE']], [`The parsed calendar date ${fullYear}-${parsedMonth}-${day} is mathematically impossible (e.g. Feb 30th).`], 'error');
        if (resultsGrid) resultsGrid.style.display = 'none';
        return;
      }
      setStepStatus('date', 'success');

      // Step 5: Check checksum validation status
      if (!isChecksumValid) {
        setStepStatus('checksum', 'failure');
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

        // Render Developer Mode calculations
        workbench.setAdvanced(`
          <div class="pesel-dev-section">
            <div class="pesel-dev-block">
              <h5>Validation Pipeline</h5>
              <pre>✓ Digit check (Passed)\n✓ Length check (Passed)\n✓ Month offset (Passed)\n✓ Calendar date (Passed)\n✗ Checksum control (Failed: expected ${expectedChecksum}, calculated ${calculatedChecksum})</pre>
            </div>
            <div class="pesel-dev-block">
              <h5>Checksum Multiplication Details</h5>
              <pre>${checksumSteps.join('\n')}\n\nSum: ${sum}\nSum % 10 = ${modulo}\n(10 - Modulo) % 10 = ${calculatedChecksum} (Expected: ${expectedChecksum})</pre>
            </div>
            <div class="pesel-dev-block">
              <h5>Raw JSON Payload</h5>
              <pre>${JSON.stringify(result, null, 2)}</pre>
            </div>
          </div>
        `);
        if (resultsGrid) resultsGrid.style.display = 'none';
        return;
      }
      setStepStatus('checksum', 'success');

      // Valid state! Extract and render parsed results cards
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

      // Update feedback panels
      workbench.setStats([
        ['Birth Date', dateStr],
        ['Gender', gender],
        ['Century', `${century}s`],
        ['Serial Code', serialPart],
        ['Verification Status', '✓ Valid']
      ], [`Length Check: Pass (11 digits)`, `Checksum Check: Pass`], 'success');

      // Build and show the Premium Results Cards
      if (resultsGrid) {
        resultsGrid.innerHTML = `
          <div class="pesel-result-card">
            <div class="card-label">Verification Status</div>
            <div class="card-value" style="color: #16a34a;">✓ Valid</div>
          </div>
          <div class="pesel-result-card">
            <div class="card-label">Normalized PESEL</div>
            <div class="card-value">${inputVal}</div>
            <button type="button" class="card-copy-btn" data-copy-field="${inputVal}" aria-label="Copy Normalized Value">Copy</button>
          </div>
          <div class="pesel-result-card">
            <div class="card-label">Birth Date</div>
            <div class="card-value">${dateStr}</div>
          </div>
          <div class="pesel-result-card">
            <div class="card-label">Gender</div>
            <div class="card-value">${gender}</div>
          </div>
          <div class="pesel-result-card">
            <div class="card-label">Century</div>
            <div class="card-value">${century}s</div>
          </div>
          <div class="pesel-result-card">
            <div class="card-label">Serial Number</div>
            <div class="card-value">${serialPart}</div>
          </div>
          <div class="pesel-result-card">
            <div class="card-label">Control Digit</div>
            <div class="card-value">${expectedChecksum}</div>
          </div>
        `;

        resultsGrid.querySelectorAll('[data-copy-field]').forEach(btn => {
          btn.addEventListener('click', () => {
            copyToClipboard(btn.dataset.copyField, workbench, 'Copied to clipboard.');
          });
        });

        resultsGrid.style.display = 'grid';
      }

      // Update advanced details panel
      workbench.setAdvanced(`
        <div class="pesel-dev-section">
          <div class="pesel-dev-block">
            <h5>Validation Pipeline</h5>
            <pre>✓ Digit check (Passed)\n✓ Length check (Passed)\n✓ Month offset (Passed)\n✓ Calendar date (Passed)\n✓ Checksum control (Passed)</pre>
          </div>
          <div class="pesel-dev-block">
            <h5>Checksum Calculations</h5>
            <pre>${checksumSteps.join('\n')}\n\nSum of products = ${sum}\nSum % 10 = ${modulo}\n(10 - Modulo) % 10 = ${calculatedChecksum} (Expected: ${expectedChecksum} - MATCH: TRUE)</pre>
          </div>
          <div class="pesel-dev-block">
            <h5>Regex Match</h5>
            <pre>Pattern: /^\\d{11}$/\nMatch: true</pre>
          </div>
          <div class="pesel-dev-block">
            <h5>Raw JSON Payload</h5>
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
