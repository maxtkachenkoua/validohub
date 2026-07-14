(function () {
  'use strict';

  const ALGORITHM_ID = 'validohub.spain-id';
  const STORAGE_KEY = 'validohub.spainId.history.v1';
  const MAX_HISTORY = 8;
  const DNI_LETTERS = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const CIF_CONTROL_LETTERS = 'JABCDEFGHI';
  const CIF_DIGIT_ONLY = new Set(['A', 'B', 'E', 'H']);
  const CIF_LETTER_ONLY = new Set(['K', 'P', 'Q', 'R', 'S', 'W']);

  const SpanishIdPlugin = (function (framework) {
    const util = framework.utilities;

    const SAMPLES = {
      'dni-valid': { value: '00000000T', action: 'validate' },
      'dni-invalid': { value: '00000000A', action: 'validate' },
      'nie-valid': { value: 'X1234567L', action: 'validate' },
      'nie-invalid': { value: 'Y1234567L', action: 'validate' },
      'cif-valid': { value: 'B12345674', action: 'validate' },
      'vat-valid': { value: 'ESX1234567L', action: 'validate' }
    };

    function onMount(workbench) {
      injectStyles();
      workbench.form.classList.add('spain-id-workbench');
      workbench.form._workbench = workbench;
      enhanceIntro();
      normalizeControls(workbench);
      addControls(workbench);
      addPanels(workbench);
      bindEvents(workbench);
      hydrateFromQuery(workbench);
      renderEmpty(workbench);
      workbench.updateBadge();
    }

    function enhanceIntro() {
      const intro = document.querySelector('.page-intro');
      if (!intro) return;
      const title = intro.querySelector('h1');
      const summary = intro.querySelector('p');
      if (title) title.textContent = 'Spain DNI/NIE/NIF/CIF Workbench';
      if (summary) summary.textContent = 'Validate, normalize, generate, and explain Spanish identity and tax identifiers locally with checksum diagnostics.';
      if (!intro.querySelector('.spain-badge-row')) {
        intro.insertAdjacentHTML('beforeend', `<div class="spain-badge-row"><span class="spain-pill active">Local Sandbox</span><span class="spain-pill">DNI / NIE</span><span class="spain-pill">NIF / CIF</span><span class="spain-pill">VAT Prefix</span><span class="spain-pill">Checksum Debugger</span></div>`);
      }
    }

    function normalizeControls(workbench) {
      const heading = workbench.form.querySelector('.workbench-form-heading h3');
      if (heading) heading.textContent = 'Spain ID Workbench';
      const input = workbench.primaryInput();
      if (input) {
        input.placeholder = 'Paste DNI, NIE, NIF, CIF, or ES-prefixed VAT identifier';
        input.autocomplete = 'off';
        input.spellcheck = false;
      }
      const outputField = workbench.form.querySelector('.output-field');
      if (outputField) outputField.style.display = 'none';
      const advanced = workbench.form.querySelector('[data-advanced-panel]');
      if (advanced) advanced.style.display = 'none';
      const buttonRow = workbench.form.querySelector('.button-row');
      if (buttonRow && !buttonRow.querySelector('[data-spain-action="generate-dni"]')) {
        buttonRow.insertAdjacentHTML('afterbegin', '<button type="button" class="button button-primary" data-spain-action="generate-dni">Generate DNI</button><button type="button" class="button button-secondary" data-spain-action="generate-nie">Generate NIE</button><button type="button" class="button button-secondary" data-spain-action="generate-cif">Generate CIF/NIF</button>');
        buttonRow.insertAdjacentHTML('beforeend', '<button type="button" class="button button-secondary" data-spain-copy="normalized">Copy normalized</button>');
      }
    }

    function addControls(workbench) {
      const grid = workbench.form.querySelector('.field-grid');
      if (!grid || grid.querySelector('[data-spain-preset]')) return;
      grid.insertAdjacentHTML('afterbegin', `<label class="field spain-select-field"><span>Presets</span><select data-spain-preset><option value="">Choose a Spanish ID sample</option><option value="dni-valid">Valid DNI fixture</option><option value="dni-invalid">Invalid DNI letter</option><option value="nie-valid">Valid NIE fixture</option><option value="nie-invalid">Invalid NIE letter</option><option value="cif-valid">Legal entity CIF/NIF fixture</option><option value="vat-valid">ES VAT-style fixture</option></select><small>Samples run entirely in this browser.</small></label><label class="field spain-select-field"><span>Recent local inputs</span><select data-spain-history><option value="">No history yet</option></select><small>Stored only in this browser.</small></label>`);
      const input = workbench.primaryInput();
      if (input && input.closest('.field')) input.closest('.field').style.gridColumn = '1 / -1';
      renderHistory(workbench);
    }

    function addPanels(workbench) {
      const feedback = workbench.form.querySelector('[data-tool-feedback]');
      if (!feedback || workbench.form.querySelector('[data-spain-panel]')) return;
      feedback.insertAdjacentHTML('afterend', `<section class="spain-panel" data-spain-panel><div class="spain-empty-state" data-spain-empty><div class="spain-empty-icon">ES</div><div><strong>Paste a Spanish identifier or generate a safe fixture.</strong><p>DNI, NIE, NIF, legacy CIF-style identifiers, and ES-prefixed VAT syntax are inspected locally with no lookup or upload.</p></div></div><div class="spain-timeline" data-spain-timeline></div><div class="spain-summary-grid" data-spain-summary></div><div class="spain-breakdown" data-spain-breakdown></div><div class="spain-debugger" data-spain-debugger></div><div class="spain-dev-panel" data-spain-dev></div></section>`);
    }

    function bindEvents(workbench) {
      const preset = workbench.form.querySelector('[data-spain-preset]');
      if (preset) preset.addEventListener('change', function () { if (preset.value) applySample(workbench, preset.value); });
      const history = workbench.form.querySelector('[data-spain-history]');
      if (history) history.addEventListener('change', function () { if (history.value) { setInput(workbench, history.value); run(workbench, 'validate'); } });
      workbench.form.addEventListener('click', function (event) {
        const action = event.target.closest('[data-spain-action]');
        if (action) { generateFixture(workbench, action.dataset.spainAction.replace('generate-', '')); return; }
        const copy = event.target.closest('[data-spain-copy]');
        if (copy) copySpecial(workbench, copy.dataset.spainCopy);
      });
    }

    function hydrateFromQuery(workbench) {
      const params = new URLSearchParams(window.location.search);
      const value = params.get('value') || params.get('id') || params.get('nif');
      if (value) { setInput(workbench, value); run(workbench, 'validate', { quiet: true }); }
    }

    function detectInputMode(value) {
      const normalized = normalize(value || '').body;
      if (!normalized) return { label: 'Waiting for Spanish ID', state: '' };
      const result = analyze(normalized);
      if (result.valid) return { label: 'Looks like ' + result.type, state: 'text' };
      return { label: result.type === 'Unknown' ? 'Needs Spanish ID review' : 'Invalid ' + result.type, state: 'invalid' };
    }

    function applySample(workbench, sampleId) {
      const sample = SAMPLES[sampleId];
      if (!sample) return;
      setInput(workbench, sample.value);
      workbench.markActiveAction(sample.action);
      run(workbench, sample.action);
    }

    function run(workbench, action, options) {
      options = options || {};
      const input = workbench.primaryInput();
      const raw = input ? input.value.trim() : '';
      if (action === 'generate') return generateFixture(workbench, currentFixtureType(workbench));
      if (!raw) {
        renderEmpty(workbench);
        workbench.setOutput('');
        workbench.lastResult = null;
        workbench.setMessage('Paste a Spanish identifier or generate a fixture.', 'error');
        return;
      }
      const normalized = normalize(raw);
      const result = analyze(normalized.body, normalized);
      addHistory(raw, result.valid ? result.type : 'Invalid ' + result.type);
      renderResult(workbench, result);
      const json = publicJson(result);
      workbench.setOutput(JSON.stringify(json, null, 2));
      workbench.lastResult = { type: 'application/json', extension: 'json', content: JSON.stringify(json, null, 2) };
      workbench.setMessage(result.valid ? 'Spanish identifier checksum is valid.' : 'Spanish identifier has validation issues.', result.valid ? 'success' : 'error');
      renderHistory(workbench);
      if (!options.quiet) workbench.updateBadge();
    }

    function currentFixtureType(workbench) {
      const field = workbench.form.querySelector('select[name="fixtureType"]');
      return field ? field.value : 'dni';
    }

    function generateFixture(workbench, type) {
      let value;
      if (type === 'nie') value = generateNie();
      else if (type === 'cif') value = generateCif();
      else value = generateDni();
      workbench.markActiveAction('validate');
      setInput(workbench, value);
      run(workbench, 'validate');
      workbench.setMessage('Generated a fictional Spanish test identifier.', 'success');
    }

    function setInput(workbench, value) {
      const input = workbench.primaryInput();
      if (input) { input.value = value; input.dispatchEvent(new Event('input', { bubbles: true })); }
    }

    function normalize(raw) {
      const input = String(raw || '').trim().toUpperCase();
      const stripped = input.replace(/[\s.\-_\/]/g, '');
      const vatPrefixed = stripped.startsWith('ES');
      return { raw: input, normalized: stripped, body: vatPrefixed ? stripped.slice(2) : stripped, vatPrefixed: vatPrefixed };
    }

    function analyze(body, normalizedInput) {
      const source = normalizedInput || { raw: body, normalized: body, body: body, vatPrefixed: false };
      if (!body) return failure('Unknown', source, ['Input is empty.']);
      if (!/^[A-Z0-9]+$/.test(body)) return failure('Unknown', source, ['Only letters and digits are supported after normalization.']);
      if (/^\d{8}[A-Z]$/.test(body)) return analyzeDni(body, source);
      if (/^[XYZ]\d{7}[A-Z]$/.test(body)) return analyzeNie(body, source);
      if (/^[A-Z]\d{7}[A-Z0-9]$/.test(body)) return analyzeCif(body, source);
      const diagnostics = ['Identifier does not match DNI, NIE, or legal-entity NIF/CIF structure.'];
      if (/^\d/.test(body) && body.length !== 9) diagnostics.push('DNI values use 8 digits plus one control letter.');
      if (/^[XYZ]/.test(body) && body.length !== 9) diagnostics.push('NIE values use X/Y/Z, 7 digits, and one control letter.');
      if (/^[A-Z]/.test(body) && body.length !== 9) diagnostics.push('Legal entity NIF/CIF values use one prefix letter, 7 digits, and one control symbol.');
      return failure('Unknown', source, diagnostics);
    }

    function analyzeDni(body, source) {
      const number = Number(body.slice(0, 8));
      const expected = DNI_LETTERS[number % 23];
      const provided = body[8];
      return resultBase('DNI / personal NIF', body, source, expected === provided, expected, provided, 'Modulo 23 control letter', [String(number), 'mod 23 = ' + (number % 23), 'letter = ' + expected], expected === provided ? [] : ['DNI control letter mismatch. Expected ' + expected + ' for ' + body.slice(0, 8) + '.']);
    }

    function analyzeNie(body, source) {
      const prefixMap = { X: '0', Y: '1', Z: '2' };
      const numericText = prefixMap[body[0]] + body.slice(1, 8);
      const number = Number(numericText);
      const expected = DNI_LETTERS[number % 23];
      const provided = body[8];
      return resultBase('NIE / foreigner NIF', body, source, expected === provided, expected, provided, 'Prefix X/Y/Z maps to 0/1/2, then modulo 23', [body[0] + ' -> ' + prefixMap[body[0]], numericText + ' mod 23 = ' + (number % 23), 'letter = ' + expected], expected === provided ? [] : ['NIE control letter mismatch. Expected ' + expected + '.']);
    }

    function analyzeCif(body, source) {
      const prefix = body[0];
      const digits = body.slice(1, 8);
      const provided = body[8];
      if (!/^\d{7}$/.test(digits)) return failure('Legal entity NIF / legacy CIF', source, ['Legal entity body must contain seven digits after the prefix.']);
      const calc = cifControl(digits);
      const acceptsDigit = !CIF_LETTER_ONLY.has(prefix);
      const acceptsLetter = !CIF_DIGIT_ONLY.has(prefix);
      const expectedSymbols = [];
      if (acceptsDigit) expectedSymbols.push(String(calc.digit));
      if (acceptsLetter) expectedSymbols.push(calc.letter);
      const valid = expectedSymbols.includes(provided);
      const diagnostics = [];
      if (!valid) diagnostics.push('Legal entity control mismatch. Expected ' + expectedSymbols.join(' or ') + ' for prefix ' + prefix + '.');
      if (!CIF_DIGIT_ONLY.has(prefix) && !CIF_LETTER_ONLY.has(prefix) && !'ABCDEFGHJKLMNPQRSUVW'.includes(prefix)) diagnostics.push('Prefix ' + prefix + ' is uncommon for supported legal-entity NIF/CIF validation.');
      return resultBase('Legal entity NIF / legacy CIF', body, source, valid, expectedSymbols.join(' or '), provided, 'Weighted odd/even digit sum with digit/letter control', calc.steps, diagnostics, entityFamily(prefix), acceptsDigit, acceptsLetter);
    }

    function failure(type, source, diagnostics) {
      return { raw: source.raw, normalized: source.normalized, body: source.body, vatPrefixed: source.vatPrefixed, type: type, valid: false, expected: '', provided: '', formula: '', steps: [], diagnostics: diagnostics, entityFamily: '', acceptsDigit: false, acceptsLetter: false, formatted: source.body };
    }

    function resultBase(type, body, source, valid, expected, provided, formula, steps, diagnostics, family, acceptsDigit, acceptsLetter) {
      return { raw: source.raw, normalized: source.normalized, body: body, vatPrefixed: source.vatPrefixed, type: type, valid: valid, expected: expected, provided: provided, formula: formula, steps: steps, diagnostics: diagnostics, entityFamily: family || (type.includes('DNI') ? 'Spanish citizen personal identifier' : type.includes('NIE') ? 'Foreigner identifier' : ''), acceptsDigit: Boolean(acceptsDigit), acceptsLetter: Boolean(acceptsLetter), formatted: formatDisplay(type, body, source.vatPrefixed) };
    }

    function cifControl(digits) {
      let odd = 0;
      let even = 0;
      const steps = [];
      for (let i = 0; i < digits.length; i++) {
        const n = Number(digits[i]);
        if (i % 2 === 0) {
          const doubled = n * 2;
          const collapsed = Math.floor(doubled / 10) + (doubled % 10);
          odd += collapsed;
          steps.push('Position ' + (i + 1) + ': ' + n + ' x 2 = ' + doubled + ', digit sum = ' + collapsed);
        } else {
          even += n;
          steps.push('Position ' + (i + 1) + ': ' + n + ' added as even-position digit');
        }
      }
      const total = odd + even;
      const digit = (10 - (total % 10)) % 10;
      steps.push('Odd sum ' + odd + ' + even sum ' + even + ' = ' + total);
      steps.push('Control digit = (10 - (' + total + ' mod 10)) mod 10 = ' + digit);
      steps.push('Control letter = ' + CIF_CONTROL_LETTERS[digit]);
      return { odd: odd, even: even, total: total, digit: digit, letter: CIF_CONTROL_LETTERS[digit], steps: steps };
    }

    function entityFamily(prefix) {
      const labels = { A: 'Public limited company', B: 'Limited liability company', C: 'General partnership', D: 'Limited partnership', E: 'Community of goods', F: 'Cooperative', G: 'Association', H: 'Owners community', J: 'Civil company', K: 'Legacy Spanish under-14 format', L: 'Legacy Spanish resident abroad format', M: 'Legacy foreigner format', N: 'Foreign entity', P: 'Local corporation', Q: 'Public body', R: 'Religious institution', S: 'State / public administration body', U: 'Temporary business union', V: 'Other legal type', W: 'Permanent establishment of non-resident entity' };
      return labels[prefix] || 'Legal entity / organization prefix';
    }

    function formatDisplay(type, body, vatPrefixed) {
      const prefix = vatPrefixed ? 'ES ' : '';
      if (type.includes('DNI')) return prefix + body.slice(0, 8) + '-' + body[8];
      if (type.includes('NIE')) return prefix + body[0] + '-' + body.slice(1, 8) + '-' + body[8];
      return prefix + body[0] + '-' + body.slice(1, 8) + '-' + body[8];
    }

    function publicJson(result) {
      return { kind: 'spain-id', valid: result.valid, type: result.type, raw: result.raw, normalized: result.normalized, localBody: result.body, formatted: result.formatted, vatPrefixed: result.vatPrefixed, expectedControl: result.expected || null, providedControl: result.provided || null, formula: result.formula || null, entityFamily: result.entityFamily || null, diagnostics: result.diagnostics };
    }

    function renderEmpty(workbench) {
      clearPanels(workbench);
      const empty = workbench.form.querySelector('[data-spain-empty]');
      if (empty) empty.style.display = 'flex';
      renderTimeline(workbench, [stage('Input', 'idle', 'Waiting'), stage('Type', 'idle', 'Detect'), stage('Format', 'idle', 'Normalize'), stage('Checksum', 'idle', 'Calculate'), stage('Context', 'idle', 'Explain'), stage('Result', 'idle', 'Ready')]);
    }

    function clearPanels(workbench) {
      ['[data-spain-summary]', '[data-spain-breakdown]', '[data-spain-debugger]', '[data-spain-dev]'].forEach(function (selector) { const el = workbench.form.querySelector(selector); if (el) el.innerHTML = ''; });
      workbench.setStats([], [], '');
      workbench.setPreview('', '');
      workbench.setAdvanced('');
    }

    function renderResult(workbench, result) {
      clearPanels(workbench);
      const empty = workbench.form.querySelector('[data-spain-empty]');
      if (empty) empty.style.display = 'none';
      renderTimeline(workbench, [stage('Input', 'pass', 'Received'), stage('Type', result.type === 'Unknown' ? 'fail' : 'pass', result.type.split('/')[0].trim()), stage('Format', result.body ? 'pass' : 'fail', result.vatPrefixed ? 'ES prefix' : 'Local'), stage('Checksum', result.valid ? 'pass' : 'fail', result.expected || 'n/a'), stage('Context', result.entityFamily ? 'pass' : 'idle', result.entityFamily || 'n/a'), stage('Result', result.valid ? 'pass' : 'fail', result.valid ? 'Valid' : 'Fix')]);
      workbench.setStats([
        ['Input characters', String(Array.from(result.raw || '').length)], ['Normalized characters', String(Array.from(result.normalized || '').length)], ['Detected type', result.type], ['VAT prefix', result.vatPrefixed ? 'Yes' : 'No'], ['Expected control', result.expected || 'n/a'], ['Provided control', result.provided || 'n/a']
      ], result.diagnostics, result.valid ? 'success' : 'error');
      renderSummary(workbench, [card('Detected type', result.type, result.valid ? 'success' : 'error'), card('Formatted', result.formatted || 'n/a', 'mono'), card('Checksum', result.valid ? 'Pass' : 'Mismatch', result.valid ? 'success' : 'error'), card('Context', result.entityFamily || 'Review manually', '')]);
      renderBreakdown(workbench, breakdownHtml(result));
      renderDebugger(workbench, debuggerHtml(result));
      renderDev(workbench, devHtml(result));
      workbench.form._spainNormalized = result.normalized;
    }

    function renderTimeline(workbench, stages) {
      const target = workbench.form.querySelector('[data-spain-timeline]');
      if (!target) return;
      const complete = stages.filter(function (item) { return item.state === 'pass'; }).length;
      const width = stages.length > 1 ? Math.max(0, Math.min(100, ((complete - 1) / (stages.length - 1)) * 100)) : 0;
      target.innerHTML = `<div class="spain-timeline-track"><span style="width:${width}%"></span></div><div class="spain-timeline-steps">${stages.map(function (item) { return `<div class="spain-step ${item.state}"><span></span><strong>${util.escapeHtml(item.label)}</strong><em>${util.escapeHtml(item.note)}</em></div>`; }).join('')}</div>`;
    }

    function renderSummary(workbench, cards) {
      const target = workbench.form.querySelector('[data-spain-summary]');
      if (!target) return;
      target.innerHTML = cards.map(function (item) { return `<article class="spain-summary-card ${item.state || ''}"><span>${util.escapeHtml(item.label)}</span><strong>${util.escapeHtml(item.value)}</strong></article>`; }).join('');
    }

    function renderBreakdown(workbench, html) { const target = workbench.form.querySelector('[data-spain-breakdown]'); if (target) target.innerHTML = html; }
    function renderDebugger(workbench, html) { const target = workbench.form.querySelector('[data-spain-debugger]'); if (target) target.innerHTML = html; }
    function renderDev(workbench, html) { const target = workbench.form.querySelector('[data-spain-dev]'); if (target) target.innerHTML = html; }

    function breakdownHtml(result) {
      const chars = Array.from(result.body || '').map(function (char, index) {
        const role = index === 0 && /^[A-Z]/.test(result.body) ? 'Prefix' : index === result.body.length - 1 ? 'Control' : 'Body';
        return `<span title="${role} position ${index + 1}"><b>${util.escapeHtml(char)}</b><em>${role}</em></span>`;
      }).join('');
      return `<section class="spain-section-card"><div class="spain-section-title">Identifier Breakdown</div><div class="spain-token-row">${chars}</div><div class="spain-detail-grid"><div><span>Raw</span><strong>${util.escapeHtml(result.raw)}</strong></div><div><span>Normalized</span><strong>${util.escapeHtml(result.normalized)}</strong></div><div><span>Local body</span><strong>${util.escapeHtml(result.body)}</strong></div><div><span>VAT syntax</span><strong>${result.vatPrefixed ? 'ES prefix present' : 'No ES prefix'}</strong></div></div></section>`;
    }

    function debuggerHtml(result) {
      return `<section class="spain-section-card"><div class="spain-section-title">Checksum Debugger</div><div class="spain-detail-grid"><div><span>Formula</span><strong>${util.escapeHtml(result.formula || 'n/a')}</strong></div><div><span>Expected</span><strong>${util.escapeHtml(result.expected || 'n/a')}</strong></div><div><span>Provided</span><strong>${util.escapeHtml(result.provided || 'n/a')}</strong></div><div><span>Status</span><strong class="${result.valid ? 'spain-ok' : 'spain-bad'}">${result.valid ? 'Match' : 'Mismatch'}</strong></div></div>${result.steps.length ? '<ol class="spain-step-list">' + result.steps.map(function (item) { return '<li>' + util.escapeHtml(item) + '</li>'; }).join('') + '</ol>' : ''}${result.diagnostics.length ? '<ul class="spain-diagnostic-list">' + result.diagnostics.map(function (item) { return '<li>' + util.escapeHtml(item) + '</li>'; }).join('') + '</ul>' : '<p class="spain-muted">No structural issues found. This is not identity verification.</p>'}</section>`;
    }

    function devHtml(result) {
      return `<section class="spain-section-card"><div class="spain-section-title">Developer Snapshot</div><pre class="spain-code"><code>${syntaxHighlightJson(publicJson(result))}</code></pre></section>`;
    }

    function syntaxHighlightJson(obj) {
      return util.escapeHtml(JSON.stringify(obj, null, 2)).replace(/(&quot;[^&]*?&quot;)(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?/g, function (match, str, colon) {
        if (str && colon) return '<span class="spain-json-key">' + str + '</span>' + colon;
        if (str) return '<span class="spain-json-string">' + str + '</span>';
        if (/true|false/.test(match)) return '<span class="spain-json-bool">' + match + '</span>';
        if (/null/.test(match)) return '<span class="spain-json-null">' + match + '</span>';
        return '<span class="spain-json-number">' + match + '</span>';
      });
    }

    function copySpecial(workbench) {
      const value = workbench.form._spainNormalized || workbench.outputValue();
      if (!value) { workbench.setMessage('Nothing to copy yet.', 'error'); return; }
      copyText(value).then(function () { workbench.setMessage('Copied normalized identifier.', 'success'); });
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

    function generateDni() { const n = Math.floor(Math.random() * 100000000); return String(n).padStart(8, '0') + DNI_LETTERS[n % 23]; }
    function generateNie() { const prefix = ['X', 'Y', 'Z'][Math.floor(Math.random() * 3)]; const n = Math.floor(Math.random() * 10000000); const digits = String(n).padStart(7, '0'); const map = { X: '0', Y: '1', Z: '2' }; const letter = DNI_LETTERS[Number(map[prefix] + digits) % 23]; return prefix + digits + letter; }
    function generateCif() { const prefix = ['A', 'B', 'G', 'P', 'Q', 'S'][Math.floor(Math.random() * 6)]; const digits = String(Math.floor(Math.random() * 10000000)).padStart(7, '0'); const calc = cifControl(digits); const control = CIF_LETTER_ONLY.has(prefix) ? calc.letter : String(calc.digit); return prefix + digits + control; }

    function addHistory(value, label) { if (!value) return; const current = readHistory().filter(function (item) { return item.value !== value; }); current.unshift({ value: value, label: label, at: Date.now() }); localStorage.setItem(STORAGE_KEY, JSON.stringify(current.slice(0, MAX_HISTORY))); }
    function readHistory() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch (error) { return []; } }
    function renderHistory(workbench) { const select = workbench.form.querySelector('[data-spain-history]'); if (!select) return; const history = readHistory(); select.innerHTML = history.length ? '<option value="">Choose recent input</option>' + history.map(function (item) { return `<option value="${util.escapeHtml(item.value)}">${util.escapeHtml(item.label)} - ${util.escapeHtml(item.value.slice(0, 48))}</option>`; }).join('') : '<option value="">No history yet</option>'; }
    function stage(label, state, note) { return { label: label, state: state, note: note }; }
    function card(label, value, state) { return { label: label, value: value, state: state }; }

    function injectStyles() {
      if (document.getElementById('spain-id-workbench-styles')) return;
      const style = document.createElement('style');
      style.id = 'spain-id-workbench-styles';
      style.textContent = `.spain-id-workbench{--spain-red:#c1121f;--spain-gold:#d97706;--spain-green:#16a34a;--spain-blue:#2563eb;--spain-bad:#dc2626}.spain-badge-row,.spain-detail-grid,.spain-summary-grid{display:flex;flex-wrap:wrap;gap:8px}.spain-pill{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;padding:5px 10px;border-radius:999px;border:1px solid var(--line);background:var(--surface-soft);color:var(--muted)}.spain-pill.active{color:var(--spain-red);border-color:rgba(193,18,31,.25);background:rgba(193,18,31,.07)}.spain-select-field{min-width:220px}.spain-panel{margin-top:22px;display:flex;flex-direction:column;gap:18px}.spain-empty-state{border:1px dashed var(--line);border-radius:10px;padding:24px;background:var(--surface-soft);display:flex;align-items:center;gap:14px;color:var(--muted)}.spain-empty-icon{width:54px;height:54px;border-radius:16px;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,#c1121f,#f59e0b);font-weight:900}.spain-empty-state strong{color:var(--text);display:block;margin-bottom:4px}.spain-empty-state p{margin:0;max-width:620px}.spain-timeline{border:1px solid var(--line);border-radius:10px;padding:18px;background:#fff;overflow:hidden}.spain-timeline-track{height:3px;background:#e5e7eb;margin:16px 28px 0;position:relative}.spain-timeline-track span{display:block;height:100%;max-width:100%;background:var(--spain-green);transition:width .2s ease}.spain-timeline-steps{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:6px;margin-top:-13px}.spain-step{min-width:0;text-align:center;color:var(--muted)}.spain-step span{width:24px;height:24px;border-radius:999px;display:block;margin:0 auto 9px;background:#d1d5db;border:4px solid #fff;box-shadow:0 0 0 1px var(--line)}.spain-step.pass span{background:var(--spain-green);box-shadow:0 0 0 5px rgba(22,163,74,.12)}.spain-step.fail span{background:var(--spain-bad);box-shadow:0 0 0 5px rgba(220,38,38,.11)}.spain-step strong{display:block;font-size:.72rem;letter-spacing:.04em;text-transform:uppercase;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.spain-step em{display:block;font-size:.68rem;font-style:normal;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.spain-summary-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr))}.spain-summary-card{border:1px solid var(--line);border-radius:10px;background:#fff;padding:14px;min-width:0}.spain-summary-card span,.spain-detail-grid span{display:block;color:var(--muted);font-size:.68rem;font-weight:800;letter-spacing:.07em;text-transform:uppercase;margin-bottom:6px}.spain-summary-card strong,.spain-detail-grid strong{color:var(--text);font-size:.92rem;overflow-wrap:anywhere}.spain-summary-card.success strong,.spain-ok{color:var(--spain-green)}.spain-summary-card.error strong,.spain-bad{color:var(--spain-bad)}.spain-summary-card.mono strong{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.82rem}.spain-section-card{border:1px solid var(--line);border-radius:10px;background:#fff;padding:16px}.spain-section-title{font-size:.82rem;font-weight:900;letter-spacing:.06em;text-transform:uppercase;color:var(--text);border-bottom:1px solid var(--line);padding-bottom:10px;margin-bottom:12px}.spain-token-row{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}.spain-token-row span{border:1px solid var(--line);border-radius:8px;min-width:42px;padding:7px 8px;text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;background:var(--surface-soft)}.spain-token-row b{display:block}.spain-token-row em{display:block;font-style:normal;font-family:inherit;font-size:.58rem;color:var(--muted);text-transform:uppercase;margin-top:2px}.spain-detail-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr))}.spain-detail-grid>div{border:1px solid var(--line);border-radius:8px;padding:12px;min-width:0}.spain-step-list{margin:12px 0 0;padding-left:22px;color:var(--muted);font-size:.84rem}.spain-diagnostic-list{margin:12px 0 0;padding-left:18px;color:var(--muted)}.spain-muted{color:var(--muted);margin:12px 0 0}.spain-code{margin:0;overflow:auto;padding:14px;border-radius:8px;background:#0f172a;color:#dbeafe;font-size:.78rem}.spain-json-key{color:#93c5fd}.spain-json-string{color:#86efac}.spain-json-number{color:#fbbf24}.spain-json-bool{color:#f0abfc}.spain-json-null{color:#cbd5e1}@media (max-width:800px){.spain-summary-grid,.spain-detail-grid{grid-template-columns:1fr}.spain-empty-state{align-items:flex-start}.spain-timeline{padding:14px 10px}.spain-timeline-track{display:none}.spain-timeline-steps{grid-template-columns:repeat(3,minmax(0,1fr));margin-top:0;row-gap:14px}.spain-step strong,.spain-step em{white-space:normal}.spain-token-row span{min-width:36px}}`;
      document.head.appendChild(style);
    }

    return { filePrefix: 'spain-id', onMount: onMount, run: run, applySample: applySample, detectInputMode: detectInputMode };
  })(window.ValidoWorkbench || { utilities: {} });

  if (window.ValidoWorkbench) window.ValidoWorkbench.registerPlugin(ALGORITHM_ID, SpanishIdPlugin);
})();
