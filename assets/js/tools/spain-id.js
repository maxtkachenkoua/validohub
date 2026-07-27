(function () {
  'use strict';

  const ALGORITHM_ID = 'validohub.spain-id';
  const STORAGE_KEY = 'validohub.spainId.history.v1';
  const MAX_HISTORY = 8;
  const DNI_LETTERS = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const CIF_CONTROL_LETTERS = 'JABCDEFGHI';
  const CIF_DIGIT_ONLY = new Set(['A', 'B', 'E', 'H']);
  const CIF_LETTER_ONLY = new Set(['K', 'P', 'Q', 'R', 'S', 'W']);
  const DEFAULT_SAFE_FIXTURE = '00000000T';
  const OFFICIAL_SOURCES = [
    { label: 'Agencia Tributaria NIF overview', href: 'https://sede.agenciatributaria.gob.es/' },
    { label: 'Ministerio del Interior DNI context', href: 'https://www.interior.gob.es/' },
    { label: 'EU VIES VAT boundary', href: 'https://ec.europa.eu/taxation_customs/vies/' }
  ];

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
      workbench.form.setAttribute('data-gold-lab', 'spain-id');
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
      if (title) title.textContent = 'Spain ID Gold Workbench';
      if (summary) summary.textContent = 'Validate DNI, NIE, NIF, legacy CIF, and ES VAT-style identifiers with local checksum replay, anatomy, safe fixtures, and official-boundary notes.';
      if (!intro.querySelector('.spain-badge-row')) {
        intro.insertAdjacentHTML('beforeend', `<div class="spain-badge-row"><span class="spain-pill active">Gold Browser Lab</span><span class="spain-pill">DNI / NIE</span><span class="spain-pill">NIF / CIF</span><span class="spain-pill">VAT Prefix</span><span class="spain-pill">Checksum Replay</span><span class="spain-pill">No Lookup</span></div>`);
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
        buttonRow.insertAdjacentHTML('beforeend', '<button type="button" class="button button-secondary" data-spain-action="batch">Batch replay</button><button type="button" class="button button-secondary" data-spain-copy="normalized">Copy normalized</button>');
      }
    }

    function addControls(workbench) {
      const grid = workbench.form.querySelector('.field-grid');
      if (!grid || grid.querySelector('[data-spain-preset]')) return;
      grid.insertAdjacentHTML('afterbegin', `<div class="spain-sample-deck"><div class="spain-sample-row"><button type="button" data-spain-sample="dni-valid">Valid DNI</button><button type="button" data-spain-sample="dni-invalid">Bad DNI letter</button><button type="button" data-spain-sample="nie-valid">Valid NIE</button><button type="button" data-spain-sample="nie-invalid">Bad NIE letter</button><button type="button" data-spain-sample="cif-valid">CIF/NIF entity</button><button type="button" data-spain-sample="vat-valid">ES VAT syntax</button></div><div class="spain-source-row">${OFFICIAL_SOURCES.map(function (source) { return `<a href="${source.href}" target="_blank" rel="noopener">${util.escapeHtml(source.label)}</a>`; }).join('')}</div></div><label class="field spain-select-field"><span>Presets</span><select data-spain-preset><option value="">Choose a Spanish ID sample</option><option value="dni-valid">Valid DNI fixture</option><option value="dni-invalid">Invalid DNI letter</option><option value="nie-valid">Valid NIE fixture</option><option value="nie-invalid">Invalid NIE letter</option><option value="cif-valid">Legal entity CIF/NIF fixture</option><option value="vat-valid">ES VAT-style fixture</option></select><small>Samples run entirely in this browser.</small></label><label class="field spain-select-field"><span>Recent local inputs</span><select data-spain-history><option value="">No history yet</option></select><small>Stored only in this browser.</small></label>`);
      const input = workbench.primaryInput();
      if (input && input.closest('.field')) input.closest('.field').style.gridColumn = '1 / -1';
      renderHistory(workbench);
    }

    function addPanels(workbench) {
      const feedback = workbench.form.querySelector('[data-tool-feedback]');
      if (!feedback || workbench.form.querySelector('[data-spain-panel]')) return;
      feedback.insertAdjacentHTML('afterend', `<section class="spain-panel" data-spain-panel><div class="spain-empty-state" data-spain-empty><div class="spain-empty-icon">ES</div><div><strong>Paste a Spanish identifier or generate a safe fixture.</strong><p>DNI, NIE, personal NIF, legacy CIF-style entity NIF, and ES-prefixed VAT syntax are inspected locally with no identity, tax-status, VIES, or registry lookup.</p></div></div><div class="spain-timeline" data-spain-timeline></div><div class="spain-summary-grid" data-spain-summary></div><div class="spain-breakdown" data-spain-breakdown></div><div class="spain-debugger" data-spain-debugger></div><div class="spain-batch-panel" data-spain-batch></div><div class="spain-sources-panel" data-spain-sources></div><div class="spain-dev-panel" data-spain-dev></div></section>`);
    }

    function bindEvents(workbench) {
      const preset = workbench.form.querySelector('[data-spain-preset]');
      if (preset) preset.addEventListener('change', function () { if (preset.value) applySample(workbench, preset.value); });
      workbench.form.querySelectorAll('[data-spain-sample]').forEach(function (button) {
        button.addEventListener('click', function () { applySample(workbench, button.dataset.spainSample); });
      });
      const history = workbench.form.querySelector('[data-spain-history]');
      if (history) history.addEventListener('change', function () { if (history.value) { setInput(workbench, history.value); run(workbench, 'validate'); } });
      workbench.form.addEventListener('click', function (event) {
        const action = event.target.closest('[data-spain-action]');
        if (action && action.dataset.spainAction === 'batch') { renderBatch(workbench, workbench.form._spainLastResult || analyze(DEFAULT_SAFE_FIXTURE, normalize(DEFAULT_SAFE_FIXTURE))); return; }
        if (action) { generateFixture(workbench, action.dataset.spainAction.replace('generate-', '')); return; }
        const copy = event.target.closest('[data-spain-copy]');
        if (copy) copySpecial(workbench, copy.dataset.spainCopy, copy);
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
      workbench.form._spainLastResult = result;
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
      ['[data-spain-summary]', '[data-spain-breakdown]', '[data-spain-debugger]', '[data-spain-batch]', '[data-spain-sources]', '[data-spain-dev]'].forEach(function (selector) { const el = workbench.form.querySelector(selector); if (el) el.innerHTML = ''; });
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
      renderBatch(workbench, result, true);
      renderSources(workbench);
      renderDev(workbench, devHtml(result));
      workbench.form._spainNormalized = result.normalized;
      workbench.form._spainJson = JSON.stringify(publicJson(result), null, 2);
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
    function renderBatchPanel(workbench, html) { const target = workbench.form.querySelector('[data-spain-batch]'); if (target) target.innerHTML = html; }
    function renderSourcesPanel(workbench, html) { const target = workbench.form.querySelector('[data-spain-sources]'); if (target) target.innerHTML = html; }
    function renderDev(workbench, html) { const target = workbench.form.querySelector('[data-spain-dev]'); if (target) target.innerHTML = html; }

    function breakdownHtml(result) {
      const chars = Array.from(result.body || '').map(function (char, index) {
        const role = index === 0 && /^[A-Z]/.test(result.body) ? 'Prefix' : index === result.body.length - 1 ? 'Control' : 'Body';
        return `<span title="${role} position ${index + 1}"><b>${util.escapeHtml(char)}</b><em>${role}</em></span>`;
      }).join('');
      const anatomyRows = [
        ['Raw input', result.raw || 'empty', 'As pasted before local normalization.'],
        ['Normalized storage form', result.normalized || 'empty', 'Uppercase letters and separators removed; keep this separate from display punctuation.'],
        ['Local Spanish body', result.body || 'empty', 'Identifier body after optional ES VAT prefix.'],
        ['Display form', result.formatted || 'n/a', 'Human-facing grouped form; not the safest database key.'],
        ['Mask for logs', maskIdentifier(result.body || result.normalized), 'Safe preview for analytics, support, and screenshots.'],
        ['Official boundary', 'Local syntax only', 'No identity, taxpayer status, VIES, registry, or ownership lookup is attempted.']
      ];
      return `<section class="spain-section-card"><div class="spain-section-title">Identifier Anatomy</div><div class="spain-token-row">${chars}</div><div class="spain-anatomy-table"><table><thead><tr><th>Field</th><th>Value</th><th>Developer note</th></tr></thead><tbody>${anatomyRows.map(function (row) { return `<tr><td>${util.escapeHtml(row[0])}</td><td><code>${util.escapeHtml(row[1])}</code></td><td>${util.escapeHtml(row[2])}</td></tr>`; }).join('')}</tbody></table></div></section>`;
    }

    function debuggerHtml(result) {
      return `<section class="spain-section-card"><div class="spain-section-title">Checksum Replay</div><div class="spain-detail-grid"><div><span>Formula</span><strong>${util.escapeHtml(result.formula || 'n/a')}</strong></div><div><span>Expected</span><strong>${util.escapeHtml(result.expected || 'n/a')}</strong></div><div><span>Provided</span><strong>${util.escapeHtml(result.provided || 'n/a')}</strong></div><div><span>Status</span><strong class="${result.valid ? 'spain-ok' : 'spain-bad'}">${result.valid ? 'Match' : 'Mismatch'}</strong></div></div>${result.steps.length ? '<ol class="spain-step-list">' + result.steps.map(function (item) { return '<li>' + util.escapeHtml(item) + '</li>'; }).join('') + '</ol>' : ''}${result.diagnostics.length ? '<ul class="spain-diagnostic-list">' + result.diagnostics.map(function (item) { return '<li>' + util.escapeHtml(item) + '</li>'; }).join('') + '</ul>' : '<p class="spain-muted">No structural issues found. This is checksum evidence only, not identity or company verification.</p>'}</section>`;
    }

    function devHtml(result) {
      return `<section class="spain-section-card spain-dev-card"><div class="spain-section-title"><span>Developer Snapshot</span><button type="button" class="spain-mini-copy" data-spain-copy="json">Copy developer JSON</button></div><pre class="spain-code"><code>${syntaxHighlightJson(publicJson(result))}</code></pre></section>`;
    }

    function renderBatch(workbench, result, compact) {
      const rows = Object.keys(SAMPLES).map(function (key) {
        const sample = SAMPLES[key];
        const analyzed = analyze(normalize(sample.value).body, normalize(sample.value));
        return [sample.value, analyzed.type, analyzed.valid ? 'pass' : 'review', analyzed.expected || 'n/a'];
      });
      renderBatchPanel(workbench, `<section class="spain-section-card ${compact ? 'spain-compact-section' : ''}"><div class="spain-section-title">Batch Replay</div><div class="spain-anatomy-table"><table><thead><tr><th>Fixture</th><th>Detected type</th><th>Status</th><th>Expected control</th></tr></thead><tbody>${rows.map(function (row) { return `<tr><td><code>${util.escapeHtml(row[0])}</code></td><td>${util.escapeHtml(row[1])}</td><td class="${row[2] === 'pass' ? 'spain-ok' : 'spain-bad'}">${row[2]}</td><td>${util.escapeHtml(row[3])}</td></tr>`; }).join('')}</tbody></table></div><p class="spain-muted">Batch replay is intentionally local and fixture-safe. Paste real production lists only after applying your own privacy policy.</p></section>`);
    }

    function renderSources(workbench) {
      const traps = [
        'Do not treat a valid DNI/NIE/NIF/CIF checksum as proof that a person, company, tax record, or VIES record exists.',
        'Normalize storage separately from display punctuation; ES VAT prefixes are context, not part of every local database key.',
        'DNI and NIE use the same modulo-23 table, but NIE must map X/Y/Z to 0/1/2 before replay.',
        'Legal-entity NIF values often appear as legacy CIF in datasets; prefix families decide whether a digit, letter, or either control symbol is acceptable.',
        'Keep bad-letter, bad-prefix, short, grouped, and ES-prefixed fixtures in automated tests; happy-path DNI alone misses common production bugs.',
        'Mask real identifiers in logs, analytics, screenshots, support tickets, and exported debug JSON.'
      ];
      renderSourcesPanel(workbench, `<section class="spain-section-card spain-sources-card"><div class="spain-section-title">Official Sources And Boundary</div><div class="spain-source-grid">${OFFICIAL_SOURCES.map(function (source) { return `<a href="${source.href}" target="_blank" rel="noopener">${util.escapeHtml(source.label)}</a>`; }).join('')}</div><p>This browser lab validates local shape, normalization, control-character math, entity-prefix context, and ES VAT syntax. It does not verify identity, document authenticity, taxpayer status, company registration, VIES registration, or live official assignment.</p></section><section class="spain-section-card spain-traps-card"><div class="spain-section-title">Integration Traps</div><ul>${traps.map(function (trap) { return '<li>' + util.escapeHtml(trap) + '</li>'; }).join('')}</ul></section>`);
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

    function copySpecial(workbench, kind, button) {
      const value = kind === 'json' ? (workbench.form._spainJson || workbench.outputValue()) : (workbench.form._spainNormalized || workbench.outputValue());
      if (!value) { workbench.setMessage('Nothing to copy yet.', 'error'); return; }
      copyText(value).then(function () {
        workbench.setMessage(kind === 'json' ? 'Copied developer JSON.' : 'Copied normalized identifier.', 'success');
        if (button) flashButton(button, 'Copied');
      });
    }

    function flashButton(button, text) {
      const original = button.textContent;
      button.textContent = text;
      window.setTimeout(function () { button.textContent = original; }, 1200);
    }

    function maskIdentifier(value) {
      const text = String(value || '');
      if (text.length <= 6) return text ? text[0] + '...' : '';
      return text.slice(0, 3) + '...' + text.slice(-3);
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
      style.textContent += `.spain-id-workbench{max-width:100%;overflow-x:hidden}.spain-id-workbench .field-grid{grid-template-columns:repeat(2,minmax(0,1fr));align-items:start}.spain-id-workbench .button-row{gap:10px;margin-top:18px}.spain-id-workbench button,.spain-id-workbench .button,.spain-source-row a,.spain-source-grid a,.spain-mini-copy{transition:border-color .16s ease,background-color .16s ease,color .16s ease,box-shadow .16s ease;transform:none!important}.spain-id-workbench button:hover,.spain-id-workbench .button:hover,.spain-source-row a:hover,.spain-source-grid a:hover,.spain-mini-copy:hover{border-color:rgba(193,18,31,.36);background:rgba(193,18,31,.06);box-shadow:inset 0 0 0 1px rgba(193,18,31,.12),0 8px 22px rgba(15,23,42,.06)}.spain-id-workbench button:focus-visible,.spain-id-workbench .button:focus-visible,.spain-source-row a:focus-visible,.spain-source-grid a:focus-visible,.spain-mini-copy:focus-visible{outline:none;box-shadow:inset 0 0 0 3px rgba(37,99,235,.22)}.spain-sample-deck{grid-column:1/-1;border:1px solid rgba(193,18,31,.14);background:linear-gradient(135deg,rgba(193,18,31,.04),rgba(245,158,11,.035));border-radius:14px;padding:16px;margin-bottom:4px}.spain-sample-row{display:flex;flex-wrap:wrap;gap:10px}.spain-sample-row button{border:1px solid rgba(15,23,42,.12);background:#fff;color:#334155;border-radius:999px;padding:9px 13px;font-weight:800;cursor:pointer}.spain-source-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.spain-source-row a,.spain-source-grid a{display:inline-flex;align-items:center;min-height:38px;padding:8px 12px;border-radius:999px;border:1px solid #dbeafe;background:#f8fbff;color:#1d4ed8;text-decoration:none;font-weight:800;font-size:.82rem}.spain-summary-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.spain-summary-card{min-height:92px;background:linear-gradient(180deg,#fff,#fbfdff);box-shadow:0 12px 28px rgba(15,23,42,.04)}.spain-section-card{max-width:100%;overflow:hidden;box-shadow:0 10px 26px rgba(15,23,42,.035)}.spain-section-title{display:flex;align-items:center;justify-content:space-between;gap:12px}.spain-anatomy-table{width:100%;overflow-x:auto}.spain-anatomy-table table{width:100%;min-width:0;border-collapse:collapse;table-layout:fixed;font-size:.86rem}.spain-anatomy-table th{background:#f5f7fb;color:#0f172a;text-align:left;font-weight:900}.spain-anatomy-table th,.spain-anatomy-table td{border-bottom:1px solid #e2e8f0;padding:10px 12px;vertical-align:top;overflow-wrap:anywhere}.spain-anatomy-table code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;white-space:normal;overflow-wrap:anywhere;color:#0f172a}.spain-source-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.spain-sources-card p{margin:12px 0 0;color:#64748b;font-size:.92rem;line-height:1.45}.spain-traps-card ul{margin:0;padding-left:18px;color:#64748b;font-size:.8rem;line-height:1.4}.spain-traps-card li+li{margin-top:4px}.spain-mini-copy{border:1px solid #dbeafe;background:#f8fbff;color:#1d4ed8;border-radius:999px;padding:7px 11px;font-weight:900;font-size:.78rem;cursor:pointer}.spain-code{white-space:pre;max-width:100%;max-height:520px}.spain-dev-card{margin-bottom:6px}.spain-compact-section{margin-top:2px}@media (max-width:980px){.spain-summary-grid,.spain-source-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.spain-id-workbench .field-grid{grid-template-columns:1fr}}@media (max-width:640px){.spain-summary-grid,.spain-source-grid{grid-template-columns:1fr}.spain-section-title{align-items:flex-start;flex-direction:column}.spain-sample-row button{width:100%}}`;
      document.head.appendChild(style);
    }

    function createStandaloneWorkbench(host) {
      host.innerHTML = `<form class="browser-workbench spain-standalone-shell" novalidate><div class="workbench-form-heading"><h3>Spain ID Gold Workbench</h3><p>Local DNI, NIE, NIF, legacy CIF, and ES VAT syntax lab.</p></div><div class="field-grid"><label class="field"><span>ID input</span><textarea name="input" rows="3" placeholder="00000000T"></textarea></label></div><div class="button-row"><button type="button" class="button button-primary" data-spain-run="validate">Validate</button><button type="button" class="button button-secondary" data-spain-copy="normalized">Copy normalized</button><button type="button" class="button button-secondary" data-spain-copy="json">Copy developer JSON</button><button type="button" class="button button-secondary" data-spain-run="clear">Clear</button></div><div class="tool-feedback" data-tool-feedback></div><textarea class="output-field" aria-hidden="true"></textarea><div data-advanced-panel></div></form>`;
      const form = host.querySelector('form');
      const feedback = form.querySelector('[data-tool-feedback]');
      const output = form.querySelector('.output-field');
      const workbench = {
        form: form,
        lastResult: null,
        primaryInput: function () { return form.querySelector('textarea[name="input"]'); },
        markActiveAction: function () {},
        updateBadge: function () {},
        outputValue: function () { return output.value || ''; },
        setOutput: function (value) { output.value = value || ''; },
        setStats: function () {},
        setPreview: function () {},
        setAdvanced: function () {},
        setMessage: function (message, state) {
          feedback.textContent = message || '';
          feedback.className = 'tool-feedback ' + (state || '');
        }
      };
      onMount(workbench);
      form.addEventListener('click', function (event) {
        const runner = event.target.closest('[data-spain-run]');
        if (!runner) return;
        if (runner.dataset.spainRun === 'clear') {
          workbench.primaryInput().value = '';
          workbench.setOutput('');
          workbench.form._spainJson = '';
          workbench.form._spainNormalized = '';
          renderEmpty(workbench);
          workbench.setMessage('Cleared local Spanish ID input.', 'success');
          return;
        }
        run(workbench, 'validate');
      });
      return workbench;
    }

    function mountStandaloneRoute() {
      if (!/\/spain\/spain-id-validator\/?/.test(window.location.pathname)) return;
      if (document.querySelector('.spain-standalone-shell')) return;
      const host = document.querySelector('[data-algorithm-id="validohub.spain-suite"], [data-algorithm-id="validohub.spain-id"], .csf-static-host');
      if (!host) return;
      host.setAttribute('data-algorithm-id', 'validohub.spain-id');
      createStandaloneWorkbench(host);
    }

    function scheduleStandaloneRoute() {
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountStandaloneRoute, { once: true });
      else window.setTimeout(mountStandaloneRoute, 0);
    }

    scheduleStandaloneRoute();

    return { filePrefix: 'spain-id', onMount: onMount, run: run, applySample: applySample, detectInputMode: detectInputMode };
  })(window.ValidoWorkbench || { utilities: {} });

  if (window.ValidoWorkbench) window.ValidoWorkbench.registerPlugin(ALGORITHM_ID, SpanishIdPlugin);
})();
