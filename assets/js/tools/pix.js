(function () {
  'use strict';

  const PIX_ALGORITHM = 'validohub.brazil-pix';
  const STORAGE_KEY = 'validohub.pix.history.v1';
  const MAX_HISTORY = 8;

  const PixPlugin = (function (framework) {
    const util = framework.utilities;

    const SAMPLES = {
      'pix-cpf': { value: '123.456.789-09', action: 'validate' },
      'pix-cnpj': { value: '11.222.333/0001-81', action: 'validate' },
      'pix-email': { value: 'payments@example.com', action: 'validate' },
      'pix-phone': { value: '+55 11 91234-5678', action: 'validate' },
      'pix-evp': { value: '123e4567-e89b-12d3-a456-426614174000', action: 'validate' },
      'pix-brcode': { value: samplePayload(), action: 'parse' },
      'pix-bad-crc': { value: samplePayload().replace(/6304[A-F0-9]{4}$/, '63040000'), action: 'parse' }
    };

    function onMount(workbench) {
      injectStyles();
      workbench.form.classList.add('pix-workbench');
      workbench.form._workbench = workbench;
      enhanceIntro();
      normalizeNativeControls(workbench);
      addPixControls(workbench);
      addCustomPanels(workbench);
      bindPixEvents(workbench);
      hydrateFromQuery(workbench);
      renderEmpty(workbench);
      workbench.updateBadge();
    }

    function normalizeNativeControls(workbench) {
      const heading = workbench.form.querySelector('.workbench-form-heading h3');
      if (heading) heading.textContent = 'PIX Workbench';
      const input = workbench.primaryInput();
      if (input) {
        input.placeholder = 'Paste a PIX key, CPF/CNPJ, phone, email, EVP UUID, or BR Code payload';
        input.autocomplete = 'off';
        input.spellcheck = false;
        input.classList.add('pix-main-input');
      }
      const outputField = workbench.form.querySelector('.output-field');
      if (outputField) outputField.style.display = 'none';
      const advanced = workbench.form.querySelector('[data-advanced-panel]');
      if (advanced) advanced.style.display = 'none';
      const buttonRow = workbench.form.querySelector('.button-row');
      if (buttonRow && !buttonRow.querySelector('[data-pix-action="generate"]')) {
        buttonRow.insertAdjacentHTML('afterbegin', '<button type="button" class="button button-primary" data-pix-action="generate">Generate PIX QR</button>');
        buttonRow.insertAdjacentHTML('beforeend', '<button type="button" class="button button-secondary" data-pix-copy="payload">Copy payload</button><button type="button" class="button button-secondary" data-pix-download="qr">Download QR SVG</button>');
      }
    }

    function enhanceIntro() {
      const intro = document.querySelector('.page-intro');
      if (!intro) return;
      const title = intro.querySelector('h1');
      const summary = intro.querySelector('p');
      if (title) title.textContent = 'Brazil PIX Workbench';
      if (summary) summary.textContent = 'Validate PIX keys, parse BR Code payloads, generate static PIX QR codes, inspect EMV fields, and debug CRC locally in your browser.';
      if (!intro.querySelector('.pix-badge-row')) {
        intro.insertAdjacentHTML('beforeend', `
          <div class="pix-badge-row">
            <span class="pix-pill active">Local Sandbox</span>
            <span class="pix-pill">Brazil PIX</span>
            <span class="pix-pill">BR Code EMV</span>
            <span class="pix-pill">CRC16 Debugger</span>
            <span class="pix-pill">QR Offline</span>
          </div>
        `);
      }
    }

    function addPixControls(workbench) {
      const grid = workbench.form.querySelector('.field-grid');
      if (!grid || grid.querySelector('[data-pix-generator]')) return;
      grid.insertAdjacentHTML('afterbegin', `
        <label class="field pix-select-field">
          <span>Presets</span>
          <select data-pix-preset>
            <option value="">Choose a PIX sample</option>
            <option value="pix-cpf">CPF key</option>
            <option value="pix-cnpj">CNPJ key</option>
            <option value="pix-email">Email key</option>
            <option value="pix-phone">Phone key</option>
            <option value="pix-evp">EVP random key</option>
            <option value="pix-brcode">Static BR Code payload</option>
            <option value="pix-bad-crc">BR Code with bad CRC</option>
          </select>
          <small>Samples fill the input and run locally.</small>
        </label>
        <label class="field pix-select-field">
          <span>Recent local inputs</span>
          <select data-pix-history>
            <option value="">No history yet</option>
          </select>
          <small>Stored only in this browser.</small>
        </label>
      `);
      const input = workbench.primaryInput();
      if (input && input.closest('.field')) input.closest('.field').style.gridColumn = '1 / -1';
      grid.insertAdjacentHTML('beforeend', `
        <section class="pix-generator" data-pix-generator>
          <div class="pix-generator-head">
            <div>
              <span class="pix-mini-eyebrow">PIX QR Generator</span>
              <h3>Build a static BR Code payload</h3>
            </div>
            <span class="pix-generator-note">No network. No upload.</span>
          </div>
          <div class="pix-generator-grid">
            <label><span>PIX key</span><input data-pix-gen="key" placeholder="email, phone, CPF, CNPJ, or EVP UUID"></label>
            <label><span>Amount (BRL)</span><input data-pix-gen="amount" inputmode="decimal" placeholder="Optional, e.g. 49.90"></label>
            <label><span>Merchant name</span><input data-pix-gen="merchant" maxlength="25" placeholder="VALIDOHUB DEMO"></label>
            <label><span>Merchant city</span><input data-pix-gen="city" maxlength="15" placeholder="SAO PAULO"></label>
            <label><span>TXID</span><input data-pix-gen="txid" maxlength="25" placeholder="VALHUB123"></label>
            <label><span>Description</span><input data-pix-gen="description" maxlength="72" placeholder="Optional payment note"></label>
          </div>
        </section>
      `);
      renderHistory(workbench);
    }

    function addCustomPanels(workbench) {
      const feedback = workbench.form.querySelector('[data-tool-feedback]');
      if (!feedback || workbench.form.querySelector('[data-pix-panel]')) return;
      feedback.insertAdjacentHTML('afterend', `
        <section class="pix-panel" data-pix-panel>
          <div class="pix-empty-state" data-pix-empty>
            <div class="pix-empty-icon">PIX</div>
            <div>
              <strong>Paste a PIX key or BR Code payload.</strong>
              <p>Everything runs locally. Use the generator to create a static PIX QR payload with CRC and downloadable SVG.</p>
            </div>
          </div>
          <div class="pix-timeline" data-pix-timeline aria-label="PIX validation pipeline"></div>
          <div class="pix-summary-grid" data-pix-summary></div>
          <div class="pix-qr-layout" data-pix-qr></div>
          <div class="pix-breakdown" data-pix-breakdown></div>
          <div class="pix-debugger" data-pix-debugger></div>
          <div class="pix-dev-panel" data-pix-dev></div>
        </section>
      `);
    }

    function bindPixEvents(workbench) {
      const preset = workbench.form.querySelector('[data-pix-preset]');
      if (preset) {
        preset.addEventListener('change', function () {
          if (preset.value) applySample(workbench, preset.value);
        });
      }
      const history = workbench.form.querySelector('[data-pix-history]');
      if (history) {
        history.addEventListener('change', function () {
          if (!history.value) return;
          setInput(workbench, history.value);
          run(workbench, detectBrCode(history.value) ? 'parse' : 'validate');
        });
      }
      workbench.form.addEventListener('click', function (event) {
        const customAction = event.target.closest('[data-pix-action]');
        if (customAction) {
          workbench.markActiveAction(customAction.dataset.pixAction);
          run(workbench, customAction.dataset.pixAction);
          return;
        }
        const copyButton = event.target.closest('[data-pix-copy]');
        if (copyButton) {
          copySpecial(workbench, copyButton.dataset.pixCopy);
          return;
        }
        const downloadButton = event.target.closest('[data-pix-download]');
        if (downloadButton) {
          downloadSpecial(workbench, downloadButton.dataset.pixDownload);
        }
      });
      workbench.form.querySelectorAll('[data-pix-gen]').forEach(function (field) {
        field.addEventListener('keydown', function (event) {
          if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
            event.preventDefault();
            run(workbench, 'generate');
          }
        });
      });
    }

    function hydrateFromQuery(workbench) {
      const params = new URLSearchParams(window.location.search);
      const value = params.get('value') || params.get('pix') || params.get('payload');
      if (value) {
        setInput(workbench, value);
        run(workbench, detectBrCode(value) ? 'parse' : 'validate', { quiet: true });
      }
    }

    function detectInputMode(value) {
      const raw = (value || '').trim();
      if (!raw) return { label: 'Waiting for PIX input', state: '' };
      if (detectBrCode(raw)) return { label: 'Looks like BR Code', state: 'base64' };
      const key = analyzeKey(raw);
      if (key.valid) return { label: 'Looks like ' + key.type, state: 'text' };
      if (/^[\x00\x1d]/.test(raw)) return { label: 'Invalid control data', state: 'invalid' };
      return { label: 'Needs PIX review', state: 'invalid' };
    }

    function applySample(workbench, sampleId) {
      const sample = SAMPLES[sampleId];
      if (!sample) return;
      setInput(workbench, sample.value);
      workbench.markActiveAction(sample.action);
      run(workbench, sample.action);
    }

    function run(workbench, action, options) {
      const input = workbench.primaryInput();
      const raw = input ? input.value.trim() : '';
      const mode = action || 'validate';
      if (mode === 'generate') return generateFromFields(workbench);
      if (!raw) {
        renderEmpty(workbench);
        workbench.setOutput('');
        workbench.lastResult = null;
        workbench.setMessage('Paste a PIX key or BR Code payload, or use the generator.', 'error');
        return;
      }
      if (detectBrCode(raw)) return analyzePayload(workbench, raw, mode, options || {});
      return analyzeKeyInput(workbench, raw, mode, options || {});
    }

    function setInput(workbench, value) {
      const input = workbench.primaryInput();
      if (input) {
        input.value = value;
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }

    function analyzeKeyInput(workbench, raw, action, options) {
      options = options || {};
      const analysis = analyzeKey(raw);
      const output = { kind: 'pix-key', valid: analysis.valid, type: analysis.type, normalized: analysis.normalized, diagnostics: analysis.diagnostics, suggestions: analysis.suggestions };
      addHistory(raw, analysis.valid ? analysis.type : 'Invalid key');
      renderKeyResult(workbench, analysis, action);
      workbench.setOutput(JSON.stringify(output, null, 2));
      workbench.lastResult = { type: 'application/json', extension: 'json', content: JSON.stringify(output, null, 2) };
      workbench.setMessage(analysis.valid ? 'PIX key shape is valid locally.' : 'PIX key has validation issues.', analysis.valid ? 'success' : 'error');
      renderHistory(workbench);
      if (!options.quiet) workbench.updateBadge();
    }

    function analyzePayload(workbench, payload, action, options) {
      options = options || {};
      const parsed = parseBrCode(payload);
      const report = buildPayloadReport(payload, parsed);
      addHistory(payload.slice(0, 96), report.valid ? 'BR Code payload' : 'Invalid BR Code');
      renderPayloadResult(workbench, report, action);
      workbench.setOutput(JSON.stringify(report.publicJson, null, 2));
      workbench.lastResult = { type: 'application/json', extension: 'json', content: JSON.stringify(report.publicJson, null, 2) };
      workbench.setMessage(report.valid ? 'BR Code payload parsed and CRC verified.' : 'BR Code payload parsed with issues.', report.valid ? 'success' : 'error');
      renderHistory(workbench);
      if (!options.quiet) workbench.updateBadge();
    }

    function generateFromFields(workbench) {
      const fields = generatorValues(workbench);
      const key = analyzeKey(fields.key);
      const diagnostics = [];
      if (!key.valid) diagnostics.push.apply(diagnostics, key.diagnostics.length ? key.diagnostics : ['Enter a valid PIX key before generating a payload.']);
      const amount = normalizeAmount(fields.amount);
      if (fields.amount && !amount.valid) diagnostics.push(amount.message);
      const merchant = sanitizeEmvText(fields.merchant || 'VALIDOHUB DEMO', 25);
      const city = sanitizeEmvText(fields.city || 'SAO PAULO', 15);
      const txid = sanitizeTxid(fields.txid || 'VALHUB123');
      if (!merchant) diagnostics.push('Merchant name is required for BR Code.');
      if (!city) diagnostics.push('Merchant city is required for BR Code.');
      if (!txid) diagnostics.push('TXID must contain at least one allowed character.');
      if (diagnostics.length > 0) {
        renderKeyResult(workbench, { valid: false, type: key.type || 'PIX key', normalized: key.normalized || fields.key, diagnostics: diagnostics, suggestions: ['Fix the generator fields and run Generate PIX QR again.'] }, 'generate');
        workbench.setOutput('');
        workbench.lastResult = null;
        workbench.setMessage('PIX QR cannot be generated yet.', 'error');
        return;
      }
      const payload = buildPixPayload({ key: key.normalized, amount: amount.value, merchant: merchant, city: city, txid: txid, description: sanitizeEmvText(fields.description || '', 72) });
      setInput(workbench, payload);
      analyzePayload(workbench, payload, 'generate');
    }

    function generatorValues(workbench) {
      const values = {};
      workbench.form.querySelectorAll('[data-pix-gen]').forEach(function (field) { values[field.dataset.pixGen] = field.value.trim(); });
      return values;
    }

    function renderEmpty(workbench) {
      clearCustom(workbench);
      const empty = workbench.form.querySelector('[data-pix-empty]');
      if (empty) empty.style.display = 'flex';
      renderTimeline(workbench, [stage('Input', 'idle', 'Waiting'), stage('Type', 'idle', 'Detect'), stage('Syntax', 'idle', 'Validate'), stage('EMV/QR', 'idle', 'Parse'), stage('CRC', 'idle', 'Check'), stage('Result', 'idle', 'Ready')]);
    }

    function clearCustom(workbench) {
      ['[data-pix-summary]', '[data-pix-qr]', '[data-pix-breakdown]', '[data-pix-debugger]', '[data-pix-dev]'].forEach(function (selector) {
        const el = workbench.form.querySelector(selector);
        if (el) el.innerHTML = '';
      });
      workbench.setStats([], [], '');
      workbench.setPreview('', '');
      workbench.setAdvanced('');
    }

    function renderKeyResult(workbench, analysis) {
      clearCustom(workbench);
      const empty = workbench.form.querySelector('[data-pix-empty]');
      if (empty) empty.style.display = 'none';
      renderTimeline(workbench, [stage('Input', 'pass', 'Received'), stage('Type', analysis.type === 'Unknown' ? 'fail' : 'pass', analysis.type), stage('Syntax', analysis.valid ? 'pass' : 'fail', analysis.valid ? 'Valid' : 'Issue'), stage('EMV/QR', 'idle', 'Optional'), stage('CRC', 'idle', 'N/A'), stage('Result', analysis.valid ? 'pass' : 'fail', analysis.valid ? 'Ready' : 'Fix')]);
      workbench.setStats([
        ['Input characters', String(Array.from(analysis.raw || analysis.normalized || '').length)], ['Normalized characters', String(Array.from(analysis.normalized || '').length)], ['Detected type', analysis.type], ['PIX key valid', analysis.valid ? 'Yes' : 'No'], ['Generator ready', analysis.valid ? 'Yes' : 'No']
      ], analysis.diagnostics.concat(analysis.suggestions || []), analysis.valid ? 'success' : 'error');
      renderSummary(workbench, [card('Detected type', analysis.type, analysis.valid ? 'success' : 'error'), card('Normalized key', analysis.normalized || 'n/a', 'mono'), card('Validation', analysis.valid ? 'Pass' : 'Needs repair', analysis.valid ? 'success' : 'error'), card('Use case', 'Key validation and QR generator input', '')]);
      renderBreakdown(workbench, keyBreakdownHtml(analysis));
      renderDebugger(workbench, diagnosticsHtml(analysis.diagnostics, analysis.suggestions));
      renderDevPanel(workbench, devPanelHtml(analysis, null));
    }

    function renderPayloadResult(workbench, report) {
      clearCustom(workbench);
      const empty = workbench.form.querySelector('[data-pix-empty]');
      if (empty) empty.style.display = 'none';
      renderTimeline(workbench, [stage('Input', 'pass', 'Payload'), stage('Type', 'pass', report.kind), stage('Syntax', report.syntaxValid ? 'pass' : 'fail', report.syntaxValid ? 'TLV ok' : 'TLV issue'), stage('EMV/QR', report.hasPixGui ? 'pass' : 'fail', report.hasPixGui ? 'PIX GUI' : 'Missing'), stage('CRC', report.crc.valid ? 'pass' : 'fail', report.crc.label), stage('Result', report.valid ? 'pass' : 'fail', report.valid ? 'Ready' : 'Fix')]);
      workbench.setStats([
        ['Payload characters', String(report.payload.length)], ['Estimated QR bytes', util.formatBytes(util.utf8Bytes(report.payload).length)], ['Initiation method', report.initiationMethod || 'Unknown'], ['Amount', report.amount ? 'BRL ' + report.amount : 'Not fixed'], ['Currency', report.currency || 'Unknown'], ['Country', report.country || 'Unknown'], ['TXID', report.txid || 'Not provided'], ['Canonical CRC', report.crc.calculated || 'n/a']
      ], report.diagnostics.concat(report.warnings), report.valid ? 'success' : 'error');
      renderSummary(workbench, [card('Merchant', report.merchantName || 'Unknown', ''), card('PIX key', report.pixKey || 'Missing', 'mono'), card('Amount', report.amount ? 'BRL ' + report.amount : 'Open amount', ''), card('CRC', report.crc.valid ? 'Valid' : 'Mismatch', report.crc.valid ? 'success' : 'error')]);
      renderQr(workbench, report);
      renderBreakdown(workbench, tlvTableHtml(report));
      renderDebugger(workbench, crcDebuggerHtml(report));
      renderDevPanel(workbench, devPanelHtml(null, report));
    }

    function renderTimeline(workbench, stages) {
      const target = workbench.form.querySelector('[data-pix-timeline]');
      if (!target) return;
      const complete = stages.filter(function (item) { return item.state === 'pass'; }).length;
      const width = stages.length > 1 ? Math.max(0, Math.min(100, ((complete - 1) / (stages.length - 1)) * 100)) : 0;
      target.innerHTML = `<div class="pix-timeline-track"><span style="width:${width}%"></span></div><div class="pix-timeline-steps">${stages.map(function (item) { return `<div class="pix-step ${item.state}"><span></span><strong>${util.escapeHtml(item.label)}</strong><em>${util.escapeHtml(item.note)}</em></div>`; }).join('')}</div>`;
    }

    function renderSummary(workbench, cards) {
      const target = workbench.form.querySelector('[data-pix-summary]');
      if (!target) return;
      target.innerHTML = cards.map(function (item) { return `<article class="pix-summary-card ${item.state || ''}"><span>${util.escapeHtml(item.label)}</span><strong>${util.escapeHtml(item.value)}</strong></article>`; }).join('');
    }

    function renderQr(workbench, report) {
      const target = workbench.form.querySelector('[data-pix-qr]');
      if (!target) return;
      let qr = null;
      try { qr = createQrSvg(report.payload); } catch (error) { qr = { svg: '', error: error.message }; }
      workbench.form._pixQrSvg = qr.svg || '';
      workbench.form._pixPayload = report.payload;
      target.innerHTML = `<section class="pix-qr-card"><div class="pix-qr-visual">${qr.svg || '<div class="pix-qr-error">QR could not be generated for this payload.</div>'}</div><div class="pix-qr-copy"><span class="pix-mini-eyebrow">Static PIX QR</span><h3>BR Code payload</h3><p>${qr.error ? util.escapeHtml(qr.error) : 'Scannable SVG generated locally from the current payload.'}</p><textarea readonly>${util.escapeHtml(report.payload)}</textarea></div></section>`;
    }

    function renderBreakdown(workbench, html) { const target = workbench.form.querySelector('[data-pix-breakdown]'); if (target) target.innerHTML = html; }
    function renderDebugger(workbench, html) { const target = workbench.form.querySelector('[data-pix-debugger]'); if (target) target.innerHTML = html; }
    function renderDevPanel(workbench, html) { const target = workbench.form.querySelector('[data-pix-dev]'); if (target) target.innerHTML = html; }

    function copySpecial(workbench, kind) {
      const value = kind === 'payload' ? (workbench.form._pixPayload || workbench.outputValue()) : workbench.outputValue();
      if (!value) { workbench.setMessage('Nothing to copy yet.', 'error'); return; }
      copyText(value).then(function () { workbench.setMessage(kind === 'payload' ? 'Copied PIX payload.' : 'Copied result.', 'success'); });
    }

    function downloadSpecial(workbench, kind) {
      if (kind === 'qr') {
        const svg = workbench.form._pixQrSvg;
        if (!svg) { workbench.setMessage('Generate or parse a valid payload before downloading QR SVG.', 'error'); return; }
        downloadBlob('validohub-pix-qr.svg', 'image/svg+xml', svg);
        workbench.setMessage('Downloaded QR SVG.', 'success');
      }
    }

    function copyText(value) {
      if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(value);
      const el = document.createElement('textarea');
      el.value = value;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      return Promise.resolve();
    }

    function downloadBlob(filename, type, content) {
      const blob = new Blob([content], { type: type });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    function analyzeKey(raw) {
      const value = (raw || '').trim();
      const digits = value.replace(/\D/g, '');
      const diagnostics = [];
      const suggestions = [];
      let type = 'Unknown';
      let normalized = value;
      let valid = false;
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 77) { type = 'Email key'; normalized = value.toLowerCase(); valid = true; }
      else if (/^\+?55\d{10,11}$/.test(value.replace(/[\s().-]/g, '')) || /^\d{10,11}$/.test(digits)) { type = 'Phone key'; normalized = digits.startsWith('55') ? '+' + digits : '+55' + digits; valid = /^\+55\d{10,11}$/.test(normalized); if (!valid) diagnostics.push('Phone keys should use Brazilian E.164 format such as +5511912345678.'); }
      else if (digits.length === 11) { type = 'CPF key'; normalized = digits; valid = isValidCpf(digits); if (!valid) diagnostics.push('CPF checksum digits do not match.'); }
      else if (digits.length === 14) { type = 'CNPJ key'; normalized = digits; valid = isValidCnpj(digits); if (!valid) diagnostics.push('CNPJ checksum digits do not match.'); }
      else if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)) { type = 'EVP random key'; normalized = value.toLowerCase(); valid = true; }
      else if (/^[0-9a-f-]{32,36}$/i.test(value)) { type = 'EVP random key'; diagnostics.push('EVP keys should be UUID strings with hyphens and a valid version/variant.'); }
      else if (value.indexOf('@') !== -1) { type = 'Email key'; diagnostics.push('Email key is malformed. Check spaces, missing domain, or missing top-level domain.'); }
      else if (/^\+?\d/.test(value)) { type = 'Numeric key'; diagnostics.push('Numeric input is not a valid CPF, CNPJ, or Brazilian phone key.'); }
      else { diagnostics.push('Input is not recognized as a PIX key or BR Code payload.'); }
      if (!valid) suggestions.push('Use CPF/CNPJ with valid check digits, an email, a Brazilian +55 phone, or an EVP UUID.');
      return { raw: value, valid: valid, type: type, normalized: normalized, diagnostics: diagnostics, suggestions: suggestions };
    }

    function isValidCpf(value) {
      if (!/^\d{11}$/.test(value) || /^(\d)\1{10}$/.test(value)) return false;
      let sum = 0;
      for (let i = 0; i < 9; i++) sum += Number(value[i]) * (10 - i);
      let d1 = 11 - (sum % 11); if (d1 >= 10) d1 = 0;
      sum = 0;
      for (let i = 0; i < 10; i++) sum += Number(value[i]) * (11 - i);
      let d2 = 11 - (sum % 11); if (d2 >= 10) d2 = 0;
      return d1 === Number(value[9]) && d2 === Number(value[10]);
    }

    function isValidCnpj(value) {
      if (!/^\d{14}$/.test(value) || /^(\d)\1{13}$/.test(value)) return false;
      const calc = function (base, weights) { const sum = weights.reduce(function (acc, weight, index) { return acc + Number(base[index]) * weight; }, 0); const mod = sum % 11; return mod < 2 ? 0 : 11 - mod; };
      return calc(value, [5,4,3,2,9,8,7,6,5,4,3,2]) === Number(value[12]) && calc(value, [6,5,4,3,2,9,8,7,6,5,4,3,2]) === Number(value[13]);
    }

    function detectBrCode(value) { return /^000201/.test((value || '').trim()) || /br\.gov\.bcb\.pix/i.test(value || ''); }

    function parseBrCode(payload) {
      const clean = (payload || '').trim().replace(/\s+/g, '');
      const result = { payload: clean, fields: [], errors: [] };
      result.fields = parseTlv(clean, 0, clean.length, result.errors, 'root');
      return result;
    }

    function parseTlv(text, start, end, errors, scope) {
      const fields = [];
      let cursor = start;
      while (cursor < end) {
        if (cursor + 4 > end) { errors.push('Incomplete TLV header at position ' + (cursor + 1) + '.'); break; }
        const id = text.slice(cursor, cursor + 2);
        const lenText = text.slice(cursor + 2, cursor + 4);
        if (!/^\d{2}$/.test(id) || !/^\d{2}$/.test(lenText)) { errors.push('Invalid TLV tag or length at position ' + (cursor + 1) + '.'); break; }
        const length = Number(lenText);
        const valueStart = cursor + 4;
        const valueEnd = valueStart + length;
        if (valueEnd > end) { errors.push('Tag ' + id + ' declares length ' + length + ' but payload ends early.'); break; }
        const value = text.slice(valueStart, valueEnd);
        const field = { id: id, name: tagName(id, scope), length: length, value: value, offset: cursor };
        if ((id === '26' || id === '62') && length >= 4) field.children = parseTlv(value, 0, value.length, errors, id);
        fields.push(field);
        cursor = valueEnd;
      }
      return fields;
    }

    function findField(fields, id) { return (fields || []).find(function (field) { return field.id === id; }); }
    function childValue(field, id) { const child = findField(field && field.children, id); return child ? child.value : ''; }
    function fieldValue(fields, id) { const field = findField(fields, id); return field ? field.value : ''; }

    function buildPayloadReport(payload, parsed) {
      const fields = parsed.fields;
      const mai = findField(fields, '26');
      const add = findField(fields, '62');
      const crcField = findField(fields, '63');
      const gui = childValue(mai, '00');
      const key = childValue(mai, '01');
      const description = childValue(mai, '02');
      const currency = fieldValue(fields, '53');
      const country = fieldValue(fields, '58');
      const amount = fieldValue(fields, '54');
      const crcExpected = crcField ? crcField.value.toUpperCase() : '';
      const crcActual = computePayloadCrc(payload);
      const diagnostics = parsed.errors.slice();
      const warnings = [];
      if (!mai) diagnostics.push('Missing Merchant Account Information template tag 26.');
      if (gui !== 'br.gov.bcb.pix') diagnostics.push('Merchant Account GUI should be br.gov.bcb.pix.');
      if (!key) diagnostics.push('PIX key tag 26.01 is missing.');
      if (currency && currency !== '986') diagnostics.push('Currency tag 53 should be 986 for BRL.');
      if (country && country !== 'BR') diagnostics.push('Country tag 58 should be BR.');
      if (!crcField) diagnostics.push('CRC tag 63 is missing.');
      if (amount && !/^\d{1,10}(\.\d{2})?$/.test(amount)) diagnostics.push('Amount tag 54 should use decimal BRL format such as 49.90.');
      if (description && description.length > 72) warnings.push('Description is longer than common PIX QR recommendations.');
      const keyAnalysis = key ? analyzeKey(key) : null;
      if (keyAnalysis && !keyAnalysis.valid) warnings.push('Embedded PIX key shape needs manual review: ' + keyAnalysis.diagnostics.join(' '));
      const crcValid = Boolean(crcField && crcActual === crcExpected);
      const syntaxValid = parsed.errors.length === 0;
      const publicJson = { kind: 'pix-brcode', valid: syntaxValid && diagnostics.length === 0 && crcValid, pixKey: key, pixKeyType: keyAnalysis ? keyAnalysis.type : 'Unknown', amount: amount || null, currency: currency || null, country: country || null, merchantName: fieldValue(fields, '59') || null, merchantCity: fieldValue(fields, '60') || null, txid: childValue(add, '05') || null, description: description || null, crc: { expected: crcExpected || null, calculated: crcActual || null, valid: crcValid }, diagnostics: diagnostics, warnings: warnings };
      return { kind: 'BR Code', payload: payload.trim().replace(/\s+/g, ''), fields: fields, syntaxValid: syntaxValid, hasPixGui: gui === 'br.gov.bcb.pix', valid: publicJson.valid, pixKey: key, pixKeyType: keyAnalysis ? keyAnalysis.type : 'Unknown', initiationMethod: fieldValue(fields, '01') === '12' ? 'Dynamic' : fieldValue(fields, '01') === '11' ? 'Static' : 'Unspecified', amount: amount, currency: currency === '986' ? 'BRL (986)' : currency, country: country, merchantName: fieldValue(fields, '59'), merchantCity: fieldValue(fields, '60'), txid: childValue(add, '05'), crc: { expected: crcExpected, calculated: crcActual, valid: crcValid, label: crcField ? (crcValid ? 'Valid' : 'Mismatch') : 'Missing' }, diagnostics: diagnostics, warnings: warnings, publicJson: publicJson };
    }

    function computePayloadCrc(payload) { return crc16Ccitt((payload || '').trim().replace(/\s+/g, '').replace(/6304[0-9A-Fa-f]{4}$/, '6304')); }

    function buildPixPayload(options) {
      const mai = tlv('00', 'br.gov.bcb.pix') + tlv('01', options.key) + (options.description ? tlv('02', options.description) : '');
      const fields = [tlv('00', '01'), tlv('01', '11'), tlv('26', mai), tlv('52', '0000'), tlv('53', '986')];
      if (options.amount) fields.push(tlv('54', options.amount));
      fields.push(tlv('58', 'BR'), tlv('59', options.merchant), tlv('60', options.city), tlv('62', tlv('05', options.txid)));
      const body = fields.join('') + '6304';
      return body + crc16Ccitt(body);
    }

    function tlv(id, value) { const text = String(value || ''); return id + String(text.length).padStart(2, '0') + text; }

    function crc16Ccitt(value) {
      let crc = 0xFFFF;
      for (let i = 0; i < value.length; i++) {
        crc ^= value.charCodeAt(i) << 8;
        for (let bit = 0; bit < 8; bit++) { crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1); crc &= 0xFFFF; }
      }
      return crc.toString(16).toUpperCase().padStart(4, '0');
    }

    function normalizeAmount(value) {
      const raw = (value || '').trim().replace(',', '.');
      if (!raw) return { valid: true, value: '' };
      if (!/^\d{1,10}(\.\d{1,2})?$/.test(raw)) return { valid: false, message: 'Amount must be a positive BRL value such as 49.90.' };
      return { valid: true, value: Number(raw).toFixed(2) };
    }

    function sanitizeEmvText(value, max) { return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z0-9 .,&+\-\/]/g, '').trim().toUpperCase().slice(0, max); }
    function sanitizeTxid(value) { return String(value || '').replace(/[^A-Za-z0-9._-]/g, '').slice(0, 25); }

    function tagName(id, scope) {
      const root = { '00': 'Payload Format Indicator', '01': 'Point of Initiation Method', '26': 'Merchant Account Information - PIX', '52': 'Merchant Category Code', '53': 'Transaction Currency', '54': 'Transaction Amount', '58': 'Country Code', '59': 'Merchant Name', '60': 'Merchant City', '61': 'Postal Code', '62': 'Additional Data Field Template', '63': 'CRC16' };
      const merchant = { '00': 'Globally Unique Identifier', '01': 'PIX Key', '02': 'Description', '25': 'Payment URL' };
      const additional = { '05': 'TXID' };
      if (scope === '26') return merchant[id] || 'Merchant subfield ' + id;
      if (scope === '62') return additional[id] || 'Additional subfield ' + id;
      return root[id] || 'Tag ' + id;
    }

    function keyBreakdownHtml(analysis) {
      return `<section class="pix-section-card"><div class="pix-section-title">PIX Key Inspector</div><div class="pix-token-row">${Array.from(analysis.normalized || analysis.raw || '').slice(0, 96).map(function (char, index) { return `<span title="Position ${index + 1}">${util.escapeHtml(char)}</span>`; }).join('')}</div><div class="pix-detail-grid"><div><span>Type</span><strong>${util.escapeHtml(analysis.type)}</strong></div><div><span>Normalized</span><strong>${util.escapeHtml(analysis.normalized || 'n/a')}</strong></div><div><span>Checksum</span><strong>${analysis.type.indexOf('CPF') !== -1 || analysis.type.indexOf('CNPJ') !== -1 ? (analysis.valid ? 'Valid' : 'Invalid') : 'Not applicable'}</strong></div><div><span>PIX QR Ready</span><strong>${analysis.valid ? 'Yes' : 'No'}</strong></div></div></section>`;
    }

    function diagnosticsHtml(diagnostics, suggestions) {
      const all = (diagnostics || []).concat(suggestions || []);
      return `<section class="pix-section-card"><div class="pix-section-title">Diagnostics</div>${all.length ? '<ul class="pix-diagnostic-list">' + all.map(function (item) { return '<li>' + util.escapeHtml(item) + '</li>'; }).join('') + '</ul>' : '<p class="pix-muted">No issues found.</p>'}</section>`;
    }

    function tlvTableHtml(report) {
      const rows = [];
      function push(field, depth) { rows.push({ field: field, depth: depth || 0 }); (field.children || []).forEach(function (child) { push(child, (depth || 0) + 1); }); }
      report.fields.forEach(function (field) { push(field, 0); });
      return `<section class="pix-section-card"><div class="pix-section-title">BR Code EMV Breakdown</div><div class="pix-table-wrap"><table class="pix-table"><thead><tr><th>Tag</th><th>Name</th><th>Length</th><th>Value</th></tr></thead><tbody>${rows.map(function (row) { return `<tr><td><code>${row.field.id}</code></td><td style="padding-left:${12 + row.depth * 18}px">${util.escapeHtml(row.field.name)}</td><td>${row.field.length}</td><td><code>${util.escapeHtml(row.field.value).slice(0, 120)}</code></td></tr>`; }).join('')}</tbody></table></div></section>`;
    }

    function crcDebuggerHtml(report) {
      return `<section class="pix-section-card"><div class="pix-section-title">CRC16-CCITT Debugger</div><div class="pix-detail-grid"><div><span>Expected</span><strong>${util.escapeHtml(report.crc.expected || 'missing')}</strong></div><div><span>Calculated</span><strong>${util.escapeHtml(report.crc.calculated || 'n/a')}</strong></div><div><span>Status</span><strong class="${report.crc.valid ? 'pix-ok' : 'pix-bad'}">${report.crc.valid ? 'Match' : 'Mismatch'}</strong></div><div><span>Algorithm</span><strong>CRC16-CCITT-FALSE</strong></div></div>${diagnosticsHtml(report.diagnostics, report.warnings)}</section>`;
    }

    function devPanelHtml(keyAnalysis, report) {
      const json = report ? report.publicJson : keyAnalysis;
      return `<section class="pix-section-card"><div class="pix-section-title">Developer Snapshot</div><pre class="pix-code"><code>${syntaxHighlightJson(json)}</code></pre></section>`;
    }

    function syntaxHighlightJson(obj) {
      return util.escapeHtml(JSON.stringify(obj, null, 2)).replace(/(&quot;[^&]*?&quot;)(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?/g, function (match, str, colon) {
        if (str && colon) return '<span class="pix-json-key">' + str + '</span>' + colon;
        if (str) return '<span class="pix-json-string">' + str + '</span>';
        if (/true|false/.test(match)) return '<span class="pix-json-bool">' + match + '</span>';
        if (/null/.test(match)) return '<span class="pix-json-null">' + match + '</span>';
        return '<span class="pix-json-number">' + match + '</span>';
      });
    }

    function stage(label, state, note) { return { label: label, state: state, note: note }; }
    function card(label, value, state) { return { label: label, value: value, state: state }; }

    function addHistory(value, label) {
      if (!value) return;
      const current = readHistory().filter(function (item) { return item.value !== value; });
      current.unshift({ value: value, label: label, at: Date.now() });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current.slice(0, MAX_HISTORY)));
    }

    function readHistory() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch (error) { return []; } }

    function renderHistory(workbench) {
      const select = workbench.form.querySelector('[data-pix-history]');
      if (!select) return;
      const history = readHistory();
      select.innerHTML = history.length ? '<option value="">Choose recent input</option>' + history.map(function (item) { return `<option value="${util.escapeHtml(item.value)}">${util.escapeHtml(item.label)} - ${util.escapeHtml(item.value.slice(0, 48))}</option>`; }).join('') : '<option value="">No history yet</option>';
    }

    function samplePayload() { return buildPixPayload({ key: 'payments@example.com', amount: '19.90', merchant: 'VALIDOHUB DEMO', city: 'SAO PAULO', txid: 'VALHUB123', description: 'PIX sample' }); }

    function createQrSvg(text) {
      const qr = makeQr(text);
      const scale = 5;
      const border = 4;
      const size = qr.size + border * 2;
      let path = '';
      for (let y = 0; y < qr.size; y++) for (let x = 0; x < qr.size; x++) if (qr.modules[y][x]) path += `M${x + border},${y + border}h1v1h-1z`;
      return { svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size * scale}" height="${size * scale}" role="img" aria-label="PIX QR code"><rect width="100%" height="100%" fill="#fff"/><path d="${path}" fill="#111827"/></svg>` };
    }

    function makeQr(text) {
      const bytes = Array.from(new TextEncoder().encode(text));
      const rsBlocks = [null, [1,26,19], [1,44,34], [1,70,55], [1,100,80], [1,134,108], [2,86,68], [2,98,78], [2,121,97], [2,146,116], [2,86,68,2,87,69]];
      let version = 1;
      for (; version < rsBlocks.length; version++) if (4 + (version <= 9 ? 8 : 16) + bytes.length * 8 <= totalDataCodewords(rsBlocks[version]) * 8) break;
      if (version >= rsBlocks.length) throw new Error('Payload is too large for the local QR generator. Shorten merchant fields or description.');
      const size = version * 4 + 17;
      const modules = Array.from({ length: size }, function () { return Array(size).fill(false); });
      const reserved = Array.from({ length: size }, function () { return Array(size).fill(false); });
      drawFunctionPatterns(modules, reserved, version);
      const data = buildQrData(bytes, version, totalDataCodewords(rsBlocks[version]));
      const codewords = addErrorCorrection(data, rsBlocks[version]);
      drawCodewords(modules, reserved, codewords);
      applyMask(modules, reserved, 0);
      drawFormatBits(modules, reserved, 0);
      if (version >= 7) drawVersionBits(modules, reserved, version);
      return { size: size, modules: modules };
    }

    function totalDataCodewords(blockSpec) { let total = 0; for (let i = 0; i < blockSpec.length; i += 3) total += blockSpec[i] * blockSpec[i + 2]; return total; }
    function buildQrData(bytes, version, dataCodewords) { const bits = []; appendBits(bits, 0x4, 4); appendBits(bits, bytes.length, version <= 9 ? 8 : 16); bytes.forEach(function (byte) { appendBits(bits, byte, 8); }); const capacity = dataCodewords * 8; appendBits(bits, 0, Math.min(4, capacity - bits.length)); while (bits.length % 8 !== 0) bits.push(0); const result = []; for (let i = 0; i < bits.length; i += 8) result.push(parseInt(bits.slice(i, i + 8).join(''), 2)); let pad = 0; while (result.length < dataCodewords) result.push((pad++ % 2) ? 0x11 : 0xEC); return result; }
    function appendBits(bits, value, count) { for (let i = count - 1; i >= 0; i--) bits.push((value >>> i) & 1); }

    function addErrorCorrection(data, blockSpec) {
      const blocks = [];
      let offset = 0;
      for (let i = 0; i < blockSpec.length; i += 3) {
        const count = blockSpec[i], total = blockSpec[i + 1], dataCount = blockSpec[i + 2], eccCount = total - dataCount, generator = rsGenerator(eccCount);
        for (let block = 0; block < count; block++) { const dat = data.slice(offset, offset + dataCount); offset += dataCount; blocks.push({ data: dat, ecc: rsRemainder(dat, generator) }); }
      }
      const result = [];
      const maxData = Math.max.apply(null, blocks.map(function (b) { return b.data.length; }));
      const maxEcc = Math.max.apply(null, blocks.map(function (b) { return b.ecc.length; }));
      for (let i = 0; i < maxData; i++) blocks.forEach(function (b) { if (i < b.data.length) result.push(b.data[i]); });
      for (let i = 0; i < maxEcc; i++) blocks.forEach(function (b) { if (i < b.ecc.length) result.push(b.ecc[i]); });
      return result;
    }

    const GF_EXP = (function () { const exp = Array(512).fill(0); let x = 1; for (let i = 0; i < 255; i++) { exp[i] = x; x <<= 1; if (x & 0x100) x ^= 0x11D; } for (let i = 255; i < 512; i++) exp[i] = exp[i - 255]; return exp; })();
    const GF_LOG = (function () { const log = Array(256).fill(0); for (let i = 0; i < 255; i++) log[GF_EXP[i]] = i; return log; })();
    function gfMul(a, b) { return a && b ? GF_EXP[GF_LOG[a] + GF_LOG[b]] : 0; }
    function rsGenerator(degree) { let poly = [1]; for (let i = 0; i < degree; i++) { const next = Array(poly.length + 1).fill(0); for (let j = 0; j < poly.length; j++) { next[j] ^= gfMul(poly[j], GF_EXP[i]); next[j + 1] ^= poly[j]; } poly = next; } return poly; }
    function rsRemainder(data, generator) { const degree = generator.length - 1; const result = Array(degree).fill(0); data.forEach(function (byte) { const factor = byte ^ result.shift(); result.push(0); for (let i = 0; i < degree; i++) result[i] ^= gfMul(generator[i], factor); }); return result; }

    function drawFunctionPatterns(modules, reserved, version) {
      const size = modules.length;
      drawFinder(modules, reserved, 0, 0); drawFinder(modules, reserved, size - 7, 0); drawFinder(modules, reserved, 0, size - 7);
      for (let i = 0; i < size; i++) { setFunction(modules, reserved, 6, i, i % 2 === 0); setFunction(modules, reserved, i, 6, i % 2 === 0); }
      const positions = alignmentPositions(version);
      positions.forEach(function (y) { positions.forEach(function (x) { if ((x === 6 && y === 6) || (x === 6 && y === size - 7) || (x === size - 7 && y === 6)) return; drawAlignment(modules, reserved, x, y); }); });
      setFunction(modules, reserved, 8, size - 8, true);
      for (let i = 0; i < 9; i++) { setReserved(reserved, 8, i); setReserved(reserved, i, 8); }
      for (let i = 0; i < 8; i++) { setReserved(reserved, size - 1 - i, 8); setReserved(reserved, 8, size - 1 - i); }
    }

    function drawFinder(modules, reserved, x, y) { for (let dy = -1; dy <= 7; dy++) for (let dx = -1; dx <= 7; dx++) { const xx = x + dx, yy = y + dy; if (yy < 0 || yy >= modules.length || xx < 0 || xx >= modules.length) continue; const dark = dx >= 0 && dx <= 6 && dy >= 0 && dy <= 6 && (dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4)); setFunction(modules, reserved, xx, yy, dark); } }
    function drawAlignment(modules, reserved, cx, cy) { for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) setFunction(modules, reserved, cx + dx, cy + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1); }
    function alignmentPositions(version) { const table = { 2:[6,18],3:[6,22],4:[6,26],5:[6,30],6:[6,34],7:[6,22,38],8:[6,24,42],9:[6,26,46],10:[6,28,50] }; return table[version] || []; }
    function setFunction(modules, reserved, x, y, dark) { modules[y][x] = dark; reserved[y][x] = true; }
    function setReserved(reserved, x, y) { reserved[y][x] = true; }
    function drawCodewords(modules, reserved, codewords) { const bits = []; codewords.forEach(function (byte) { appendBits(bits, byte, 8); }); let bitIndex = 0, upward = true, size = modules.length; for (let right = size - 1; right >= 1; right -= 2) { if (right === 6) right--; for (let vert = 0; vert < size; vert++) { const y = upward ? size - 1 - vert : vert; for (let j = 0; j < 2; j++) { const x = right - j; if (!reserved[y][x] && bitIndex < bits.length) modules[y][x] = Boolean(bits[bitIndex++]); } } upward = !upward; } }
    function applyMask(modules, reserved, mask) { const size = modules.length; for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (!reserved[y][x] && maskFormula(mask, x, y)) modules[y][x] = !modules[y][x]; }
    function maskFormula(mask, x, y) { return mask === 0 ? ((x + y) % 2 === 0) : false; }
    function drawFormatBits(modules, reserved, mask) { const size = modules.length; const data = (1 << 3) | mask; let rem = data << 10; const poly = 0x537; for (let i = 14; i >= 10; i--) if ((rem >>> i) & 1) rem ^= poly << (i - 10); const bits = (((data << 10) | rem) ^ 0x5412) & 0x7FFF; const coords1 = [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,7],[8,8],[7,8],[5,8],[4,8],[3,8],[2,8],[1,8],[0,8]]; const coords2 = [[size-1,8],[size-2,8],[size-3,8],[size-4,8],[size-5,8],[size-6,8],[size-7,8],[8,size-8],[8,size-7],[8,size-6],[8,size-5],[8,size-4],[8,size-3],[8,size-2],[8,size-1]]; for (let i = 0; i < 15; i++) { const dark = Boolean((bits >>> i) & 1); setFunction(modules, reserved, coords1[i][0], coords1[i][1], dark); setFunction(modules, reserved, coords2[i][0], coords2[i][1], dark); } }
    function drawVersionBits(modules, reserved, version) { const size = modules.length; let rem = version; for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1F25); const bits = (version << 12) | rem; for (let i = 0; i < 18; i++) { const dark = Boolean((bits >>> i) & 1); const a = size - 11 + (i % 3), b = Math.floor(i / 3); setFunction(modules, reserved, a, b, dark); setFunction(modules, reserved, b, a, dark); } }

    function injectStyles() {
      if (document.getElementById('pix-workbench-styles')) return;
      const style = document.createElement('style');
      style.id = 'pix-workbench-styles';
      style.textContent = `.pix-workbench{--pix-green:#16a34a;--pix-blue:#2563eb;--pix-red:#dc2626;--pix-amber:#b45309;--pix-soft:#f8fafc}.pix-badge-row,.pix-generator-head,.pix-detail-grid,.pix-summary-grid{display:flex;flex-wrap:wrap;gap:8px}.pix-pill{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;padding:5px 10px;border-radius:999px;border:1px solid var(--line);background:var(--surface-soft);color:var(--muted)}.pix-pill.active{color:var(--pix-blue);border-color:rgba(37,99,235,.28);background:rgba(37,99,235,.08)}.pix-select-field{min-width:220px}.pix-generator{grid-column:1/-1;border:1px solid var(--line);border-radius:10px;padding:16px;background:linear-gradient(180deg,#fff,var(--surface-soft))}.pix-generator-head{align-items:flex-start;justify-content:space-between;margin-bottom:12px}.pix-generator-head h3{margin:2px 0 0;font-size:1rem}.pix-mini-eyebrow{color:var(--muted);font-size:.68rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.pix-generator-note{font-size:.72rem;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:4px 8px}.pix-generator-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.pix-generator-grid label{display:flex;flex-direction:column;gap:5px;font-size:.75rem;font-weight:700;color:var(--muted)}.pix-generator-grid input{border:1px solid var(--line);border-radius:8px;padding:10px 11px;color:var(--text);background:#fff;font:inherit}.pix-panel{margin-top:22px;display:flex;flex-direction:column;gap:18px}.pix-empty-state{border:1px dashed var(--line);border-radius:10px;padding:24px;background:var(--surface-soft);align-items:center;gap:14px;color:var(--muted)}.pix-empty-icon{width:54px;height:54px;border-radius:16px;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,#16a34a,#06b6d4);font-weight:900}.pix-empty-state strong{color:var(--text);display:block;margin-bottom:4px}.pix-empty-state p{margin:0;max-width:560px}.pix-timeline{border:1px solid var(--line);border-radius:10px;padding:18px;background:#fff;overflow:hidden}.pix-timeline-track{height:3px;background:#e5e7eb;margin:16px 28px 0;position:relative}.pix-timeline-track span{display:block;height:100%;max-width:100%;background:var(--pix-green);transition:width .2s ease}.pix-timeline-steps{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:6px;margin-top:-13px}.pix-step{min-width:0;text-align:center;color:var(--muted)}.pix-step span{width:24px;height:24px;border-radius:999px;display:block;margin:0 auto 9px;background:#d1d5db;border:4px solid #fff;box-shadow:0 0 0 1px var(--line)}.pix-step.pass span{background:var(--pix-green);box-shadow:0 0 0 5px rgba(22,163,74,.12)}.pix-step.fail span{background:var(--pix-red);box-shadow:0 0 0 5px rgba(220,38,38,.11)}.pix-step strong{display:block;font-size:.72rem;letter-spacing:.04em;text-transform:uppercase;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pix-step em{display:block;font-size:.68rem;font-style:normal;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pix-summary-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr))}.pix-summary-card{border:1px solid var(--line);border-radius:10px;background:#fff;padding:14px;min-width:0}.pix-summary-card span,.pix-detail-grid span{display:block;color:var(--muted);font-size:.68rem;font-weight:800;letter-spacing:.07em;text-transform:uppercase;margin-bottom:6px}.pix-summary-card strong,.pix-detail-grid strong{color:var(--text);font-size:.92rem;overflow-wrap:anywhere}.pix-summary-card.success strong,.pix-ok{color:var(--pix-green)}.pix-summary-card.error strong,.pix-bad{color:var(--pix-red)}.pix-summary-card.mono strong{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.82rem}.pix-qr-card{display:grid;grid-template-columns:minmax(180px,260px) 1fr;gap:18px;border:1px solid var(--line);border-radius:12px;padding:18px;background:linear-gradient(180deg,#fff,#f8fafc)}.pix-qr-visual{display:grid;place-items:center;background:#fff;border:1px solid var(--line);border-radius:12px;padding:14px;min-height:220px}.pix-qr-visual svg{width:min(100%,220px);height:auto;display:block}.pix-qr-copy textarea{width:100%;min-height:150px;resize:vertical;border:1px solid var(--line);border-radius:8px;padding:10px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.75rem}.pix-qr-copy h3{margin:.2rem 0 .4rem}.pix-qr-copy p{color:var(--muted);margin:.2rem 0 .8rem}.pix-section-card{border:1px solid var(--line);border-radius:10px;background:#fff;padding:16px}.pix-section-title{font-size:.82rem;font-weight:900;letter-spacing:.06em;text-transform:uppercase;color:var(--text);border-bottom:1px solid var(--line);padding-bottom:10px;margin-bottom:12px}.pix-token-row{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:14px}.pix-token-row span{border:1px solid var(--line);border-radius:6px;min-width:24px;padding:5px 6px;text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;background:var(--surface-soft)}.pix-detail-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr))}.pix-detail-grid>div{border:1px solid var(--line);border-radius:8px;padding:12px;min-width:0}.pix-table-wrap{overflow-x:auto}.pix-table{width:100%;border-collapse:collapse;font-size:.78rem}.pix-table th,.pix-table td{border-bottom:1px solid var(--line);padding:9px;text-align:left;vertical-align:top}.pix-table code,.pix-code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace}.pix-diagnostic-list{margin:0;padding-left:18px;color:var(--muted)}.pix-muted{color:var(--muted);margin:0}.pix-code{margin:0;overflow:auto;padding:14px;border-radius:8px;background:#0f172a;color:#dbeafe;font-size:.78rem}.pix-json-key{color:#93c5fd}.pix-json-string{color:#86efac}.pix-json-number{color:#fbbf24}.pix-json-bool{color:#f0abfc}.pix-json-null{color:#cbd5e1}.pix-qr-error{color:var(--pix-red);font-weight:700;text-align:center}@media (max-width:800px){.pix-generator-grid,.pix-summary-grid,.pix-detail-grid,.pix-qr-card{grid-template-columns:1fr}.pix-timeline{padding:14px 10px}.pix-timeline-track{display:none}.pix-timeline-steps{grid-template-columns:repeat(3,minmax(0,1fr));margin-top:0;row-gap:14px}.pix-step strong,.pix-step em{white-space:normal}.pix-qr-visual{min-height:180px}}`;
      document.head.appendChild(style);
    }

    return { filePrefix: 'brazil-pix', onMount: onMount, run: run, applySample: applySample, detectInputMode: detectInputMode };
  })(window.ValidoWorkbench || { utilities: {} });

  if (window.ValidoWorkbench) window.ValidoWorkbench.registerPlugin(PIX_ALGORITHM, PixPlugin);
})();
