(function () {
  'use strict';

  const ROUTES = new Set(['brazil-cpf-validator', 'brazil-cnpj-validator']);
  const STORAGE_KEY = 'validohub.brazilTaxId.history.v1';
  const MAX_HISTORY = 8;
  const CPF_WEIGHTS = [
    [10, 9, 8, 7, 6, 5, 4, 3, 2],
    [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
  ];
  const CNPJ_WEIGHTS = [
    [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  ];
  const SOURCES = [
    ['Receita Federal CPF services', 'https://www.gov.br/receitafederal/pt-br/servicos/cadastro/cidadao'],
    ['CPF consultation service', 'https://www.gov.br/pt-br/servicos/consultar-cadastro-de-pessoas-fisicas'],
    ['Receita Federal CNPJ services', 'https://www.gov.br/receitafederal/pt-br/servicos/cadastro/cnpj'],
    ['CNPJ registration service', 'https://www.gov.br/pt-br/servicos/inscrever-no-cnpj']
  ];
  const SAMPLES = {
    'cpf-valid': '529.982.247-25',
    'cpf-invalid': '529.982.247-24',
    'cpf-repeated': '111.111.111-11',
    'cpf-short': '529.982.247',
    'cnpj-valid': '11.222.333/0001-81',
    'cnpj-invalid': '11.222.333/0001-82',
    'cnpj-branch': '04.252.011/0001-10',
    'cnpj-short': '11.222.333/0001'
  };

  function currentRoute() {
    const parts = window.location.pathname.split('/').filter(Boolean);
    return parts[parts.length - 1] || '';
  }

  function routeMode() {
    return currentRoute().includes('cnpj') ? 'cnpj' : 'cpf';
  }

  function esc(value) {
    const text = String(value == null ? '' : value);
    return text.replace(/[&<>"']/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
    });
  }

  function digits(value) {
    return String(value || '').replace(/\D/g, '');
  }

  function formatCpf(value) {
    const d = digits(value).padEnd(11, ' ').slice(0, 11);
    return (d.slice(0, 3) + '.' + d.slice(3, 6) + '.' + d.slice(6, 9) + '-' + d.slice(9, 11)).trim();
  }

  function formatCnpj(value) {
    const d = digits(value).padEnd(14, ' ').slice(0, 14);
    return (d.slice(0, 2) + '.' + d.slice(2, 5) + '.' + d.slice(5, 8) + '/' + d.slice(8, 12) + '-' + d.slice(12, 14)).trim();
  }

  function mask(value) {
    const d = digits(value);
    if (d.length === 11) return d.slice(0, 3) + '.***.***-' + d.slice(-2);
    if (d.length === 14) return d.slice(0, 2) + '.***.***/' + d.slice(8, 12) + '-' + d.slice(-2);
    return d.length > 6 ? d.slice(0, 3) + '...' + d.slice(-2) : d;
  }

  function calcDigit(source, weights) {
    let sum = 0;
    const rows = [];
    for (let index = 0; index < weights.length; index += 1) {
      const digit = Number(source[index] || 0);
      const product = digit * weights[index];
      sum += product;
      rows.push({ position: index + 1, digit: digit, weight: weights[index], product: product });
    }
    const remainder = sum % 11;
    const expected = remainder < 2 ? 0 : 11 - remainder;
    return { sum: sum, remainder: remainder, expected: expected, rows: rows };
  }

  function analyzeCpf(raw) {
    const d = digits(raw);
    const repeated = /^(\d)\1+$/.test(d);
    const first = calcDigit(d.slice(0, 9), CPF_WEIGHTS[0]);
    const second = calcDigit(d.slice(0, 9) + String(first.expected), CPF_WEIGHTS[1]);
    const provided = d.slice(9, 11);
    const valid = d.length === 11 && !repeated && first.expected === Number(d[9]) && second.expected === Number(d[10]);
    return makeReport({
      mode: 'cpf',
      raw: raw,
      digits: d,
      valid: valid,
      type: 'CPF',
      title: 'Brazil CPF Gold Workbench',
      formatted: d.length === 11 ? formatCpf(d) : d,
      expected: String(first.expected) + String(second.expected),
      provided: provided,
      checks: [
        check('Input present', d.length > 0, 'A CPF value must be present before local replay.'),
        check('Eleven digits', d.length === 11, 'CPF uses exactly eleven digits after punctuation is removed.'),
        check('Non-repeated sequence', d.length === 11 && !repeated, 'Repeated placeholders such as 111.111.111-11 are rejected.'),
        check('First check digit', d.length === 11 && first.expected === Number(d[9]), 'Weights 10 through 2 replay the first verifier digit.'),
        check('Second check digit', d.length === 11 && second.expected === Number(d[10]), 'Weights 11 through 2 replay the second verifier digit.')
      ],
      fields: [
        field('Block 1', d.slice(0, 3), 'First public display block. Preserve leading zeros.'),
        field('Block 2', d.slice(3, 6), 'Second public display block.'),
        field('Block 3', d.slice(6, 9), 'Third public display block before check digits.'),
        field('Verifier digits', provided, 'Two modulo-11 digits replayed locally.'),
        field('Storage form', d, 'Keep digits-only storage separate from display punctuation.'),
        field('Masked log form', mask(d), 'Use masked output in logs, tickets, and analytics.')
      ],
      replay: [
        replay('First CPF digit', first, d[9]),
        replay('Second CPF digit', second, d[10])
      ]
    });
  }

  function analyzeCnpj(raw) {
    const d = digits(raw);
    const repeated = /^(\d)\1+$/.test(d);
    const first = calcDigit(d.slice(0, 12), CNPJ_WEIGHTS[0]);
    const second = calcDigit(d.slice(0, 12) + String(first.expected), CNPJ_WEIGHTS[1]);
    const provided = d.slice(12, 14);
    const valid = d.length === 14 && !repeated && first.expected === Number(d[12]) && second.expected === Number(d[13]);
    return makeReport({
      mode: 'cnpj',
      raw: raw,
      digits: d,
      valid: valid,
      type: 'CNPJ',
      title: 'Brazil CNPJ Gold Workbench',
      formatted: d.length === 14 ? formatCnpj(d) : d,
      expected: String(first.expected) + String(second.expected),
      provided: provided,
      checks: [
        check('Input present', d.length > 0, 'A CNPJ value must be present before local replay.'),
        check('Fourteen digits', d.length === 14, 'CNPJ uses exactly fourteen digits after punctuation is removed.'),
        check('Non-repeated sequence', d.length === 14 && !repeated, 'Repeated placeholders such as 00.000.000/0000-00 are rejected.'),
        check('First check digit', d.length === 14 && first.expected === Number(d[12]), 'First verifier uses the 5-4-3-2-9-8-7-6-5-4-3-2 weight row.'),
        check('Second check digit', d.length === 14 && second.expected === Number(d[13]), 'Second verifier uses the 6-5-4-3-2-9-8-7-6-5-4-3-2 weight row.')
      ],
      fields: [
        field('Root prefix', d.slice(0, 2), 'First company-root digits.'),
        field('Company root', d.slice(0, 8), 'Eight-digit base shared by matriz/filial registrations.'),
        field('Establishment order', d.slice(8, 12), 'Four-digit establishment block; 0001 is commonly the matriz fixture.'),
        field('Verifier digits', provided, 'Two modulo-11 digits replayed locally.'),
        field('Storage form', d, 'Keep digits-only storage separate from display punctuation.'),
        field('Masked log form', mask(d), 'Use masked output in logs, tickets, and analytics.')
      ],
      replay: [
        replay('First CNPJ digit', first, d[12]),
        replay('Second CNPJ digit', second, d[13])
      ]
    });
  }

  function makeReport(config) {
    const failures = config.checks.filter(function (item) { return !item.pass; }).map(function (item) { return item.label; });
    return {
      mode: config.mode,
      type: config.type,
      title: config.title,
      raw: String(config.raw || ''),
      normalized: config.digits,
      formatted: config.formatted,
      masked: mask(config.digits),
      expected: config.expected,
      provided: config.provided,
      valid: config.valid,
      status: config.valid ? 'pass' : 'review',
      checks: config.checks,
      fields: config.fields,
      replay: config.replay,
      diagnostics: failures.length ? failures : ['All browser-checkable CPF/CNPJ structure and check-digit rules passed.']
    };
  }

  function check(label, pass, note) {
    return { label: label, pass: Boolean(pass), note: note };
  }

  function field(label, value, note) {
    return { label: label, value: value || '-', note: note };
  }

  function replay(label, calc, provided) {
    return {
      label: label,
      sum: calc.sum,
      remainder: calc.remainder,
      expected: calc.expected,
      provided: provided == null || provided === '' ? '-' : String(provided),
      rows: calc.rows
    };
  }

  function analyze(raw, mode) {
    return mode === 'cnpj' ? analyzeCnpj(raw) : analyzeCpf(raw);
  }

  function randomDigits(length) {
    let value = '';
    const randomSource = window.crypto || window.msCrypto;
    if (randomSource && randomSource.getRandomValues) {
      const bytes = new Uint8Array(length);
      randomSource.getRandomValues(bytes);
      for (let index = 0; index < length; index += 1) value += String(bytes[index] % 10);
      return value;
    }
    for (let index = 0; index < length; index += 1) value += String(Math.floor(Math.random() * 10));
    return value;
  }

  function generateCpf() {
    let base = randomDigits(9);
    if (/^(\d)\1+$/.test(base)) base = '529982247';
    const first = calcDigit(base, CPF_WEIGHTS[0]).expected;
    const second = calcDigit(base + String(first), CPF_WEIGHTS[1]).expected;
    return formatCpf(base + String(first) + String(second));
  }

  function generateCnpj() {
    let root = randomDigits(8);
    if (/^(\d)\1+$/.test(root)) root = '11222333';
    const base = root + '0001';
    const first = calcDigit(base, CNPJ_WEIGHTS[0]).expected;
    const second = calcDigit(base + String(first), CNPJ_WEIGHTS[1]).expected;
    return formatCnpj(base + String(first) + String(second));
  }

  function setInput(value) {
    const input = document.querySelector('[data-br-tax-input]');
    if (!input) return;
    input.value = value;
    input.focus();
  }

  function addHistory(value, label) {
    if (!value) return;
    const current = readHistory().filter(function (item) { return item.value !== value; });
    current.unshift({ value: value, label: label, at: Date.now() });
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(current.slice(0, MAX_HISTORY))); } catch (error) {}
  }

  function readHistory() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch (error) { return []; }
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

  function flash(button, message) {
    if (!button) return;
    const note = document.createElement('span');
    note.className = 'br-tax-copy-popover';
    note.textContent = message || 'Copied';
    button.appendChild(note);
    window.setTimeout(function () { note.remove(); }, 1300);
  }

  function developerJson(report) {
    return {
      tool: currentRoute(),
      profileStandard: 'bespoke-gold-v1',
      country: 'Brazil',
      type: report.type,
      valid: report.valid,
      normalized: report.normalized,
      formatted: report.formatted,
      masked: report.masked,
      expectedCheckDigits: report.expected,
      providedCheckDigits: report.provided,
      checks: report.checks,
      fields: report.fields,
      replay: report.replay.map(function (item) {
        return {
          label: item.label,
          sum: item.sum,
          remainder: item.remainder,
          expected: item.expected,
          provided: item.provided
        };
      }),
      officialBoundary: 'Local browser pass does not prove identity, company existence, Receita status, ownership, tax standing, or authorization to transact.'
    };
  }

  function renderHistory() {
    const select = document.querySelector('[data-br-tax-history]');
    if (!select) return;
    const history = readHistory();
    select.innerHTML = history.length
      ? '<option value="">Recent local inputs</option>' + history.map(function (item) { return '<option value="' + esc(item.value) + '">' + esc(item.label + ' - ' + item.value.slice(0, 48)) + '</option>'; }).join('')
      : '<option value="">No local history yet</option>';
  }

  function renderReport(report) {
    const json = developerJson(report);
    const replayRows = report.replay.map(function (item) {
      return item.rows.map(function (row) {
        return '<tr><td>' + esc(item.label) + '</td><td>' + row.position + '</td><td><code>' + row.digit + '</code></td><td>' + row.weight + '</td><td>' + row.product + '</td></tr>';
      }).join('') + '<tr class="br-tax-total-row"><td>' + esc(item.label) + '</td><td colspan="2">sum ' + item.sum + ', remainder ' + item.remainder + '</td><td>expected <code>' + item.expected + '</code></td><td>provided <code>' + esc(item.provided) + '</code></td></tr>';
    }).join('');
    return '<section class="br-tax-result ' + (report.valid ? 'is-valid' : 'is-review') + '">' +
      '<div class="br-tax-status"><span>' + (report.valid ? 'Local pass' : 'Needs review') + '</span><strong>' + esc(report.type) + ' ' + (report.valid ? 'check digits match' : 'fixture failed locally') + '</strong><p>' + esc(report.diagnostics.join(' ')) + '</p></div>' +
      '<div class="br-tax-card-grid">' +
        card('Formatted', report.formatted, true) +
        card('Digits only', report.normalized, true) +
        card('Masked', report.masked, true) +
        card('Expected check digits', report.expected, true) +
      '</div>' +
      '<section class="br-tax-panel"><h3>Validation pipeline</h3><div class="br-tax-pipeline">' + report.checks.map(function (item) {
        return '<div class="' + (item.pass ? 'pass' : 'fail') + '"><span>' + (item.pass ? 'Pass' : 'Review') + '</span><strong>' + esc(item.label) + '</strong><p>' + esc(item.note) + '</p></div>';
      }).join('') + '</div></section>' +
      '<section class="br-tax-panel"><h3>' + esc(report.type) + ' field breakdown</h3><div class="br-tax-fields">' + report.fields.map(function (item) {
        return '<div><span>' + esc(item.label) + '</span><strong>' + esc(item.value) + '</strong><p>' + esc(item.note) + '</p></div>';
      }).join('') + '</div></section>' +
      '<section class="br-tax-panel"><h3>Modulo-11 replay table</h3><div class="br-tax-table"><table><thead><tr><th>Digit</th><th>Position</th><th>Value</th><th>Weight</th><th>Product</th></tr></thead><tbody>' + replayRows + '</tbody></table></div></section>' +
      '<section class="br-tax-panel br-tax-boundary"><h3>Official sources and boundary</h3><div class="br-tax-source-row">' + SOURCES.map(function (source) {
        return '<a href="' + esc(source[1]) + '" target="_blank" rel="noopener">' + esc(source[0]) + '</a>';
      }).join('') + '</div><p>ValidoHub proves only browser-checkable shape, repeated-placeholder rejection, formatting, masking, and public check-digit math. Receita Federal status, existence, ownership, tax standing, identity proof, and company registration state remain official-system checks.</p></section>' +
      '<section class="br-tax-panel br-tax-traps"><h3>Integration traps</h3><ul><li>Store digits-only values, but preserve display punctuation at the form boundary.</li><li>Keep leading zeros; numeric database columns will corrupt valid fixtures.</li><li>Do not log raw CPF values in analytics or validation errors.</li><li>Checksum success is not a Receita lookup and does not prove active status.</li><li>Keep invalid and repeated-number fixtures in automated tests.</li><li>Do not reuse CNPJ branch block <code>0001</code> as proof of a matriz registration.</li></ul></section>' +
      '<section class="br-tax-panel br-tax-dev"><h3><span>Developer Snapshot</span><button type="button" data-br-tax-copy="json">Copy developer JSON</button></h3><pre><code>' + esc(JSON.stringify(json, null, 2)) + '</code></pre></section>' +
    '</section>';
  }

  function card(label, value, mono) {
    return '<div class="br-tax-mini-card"><span>' + esc(label) + '</span><strong' + (mono ? ' class="mono"' : '') + '>' + esc(value || '-') + '</strong></div>';
  }

  function run(mode) {
    const input = document.querySelector('[data-br-tax-input]');
    const output = document.querySelector('[data-br-tax-output]');
    const feedback = document.querySelector('[data-br-tax-feedback]');
    if (!input || !output) return null;
    const report = analyze(input.value, mode || routeMode());
    output.innerHTML = renderReport(report);
    feedback.textContent = report.valid ? 'Brazilian ' + report.type + ' passed local checksum replay.' : 'Brazilian ' + report.type + ' needs review.';
    feedback.className = 'br-tax-feedback ' + (report.valid ? 'success' : 'error');
    output._lastReport = report;
    addHistory(input.value, report.valid ? report.type + ' pass' : report.type + ' review');
    renderHistory();
    return report;
  }

  function renderShell(host, mode) {
    const isCnpj = mode === 'cnpj';
    const title = isCnpj ? 'Brazil CNPJ Gold Workbench' : 'Brazil CPF Gold Workbench';
    const summary = isCnpj
      ? 'Validate CNPJ company identifiers with branch anatomy, two check-digit replays, safe fictional fixtures, and Receita boundary notes.'
      : 'Validate CPF identifiers with display/storage normalization, two check-digit replays, safe fictional fixtures, masking, and Receita boundary notes.';
    const defaultValue = isCnpj ? SAMPLES['cnpj-valid'] : SAMPLES['cpf-valid'];
    host.innerHTML = '<form class="br-tax-shell" data-gold-lab="brazil-tax-id" novalidate>' +
      '<section class="br-tax-hero"><div><span class="br-tax-eyebrow">Gold Browser Lab</span><h2>' + esc(title) + '</h2><p>' + esc(summary) + '</p><div class="br-tax-badges"><span>Browser-only</span><span>Modulo-11 replay</span><span>Safe fixtures</span><span>No Receita lookup</span></div></div><strong class="br-tax-mark">' + (isCnpj ? 'CNPJ' : 'CPF') + '</strong></section>' +
      '<section class="br-tax-context"><strong>What this checks locally</strong><p>Paste a formatted or digits-only Brazilian tax identifier. The lab normalizes punctuation, rejects repeated placeholders, replays both public check digits, shows anatomy, builds developer JSON, and keeps official Receita status outside the browser result.</p></section>' +
      '<div class="br-tax-samples">' +
        sampleButton(isCnpj ? 'cnpj-valid' : 'cpf-valid', 'Valid sample') +
        sampleButton(isCnpj ? 'cnpj-invalid' : 'cpf-invalid', 'Bad check digit') +
        sampleButton(isCnpj ? 'cnpj-short' : 'cpf-short', 'Short sample') +
        sampleButton(isCnpj ? 'cnpj-branch' : 'cpf-repeated', isCnpj ? 'Branch fixture' : 'Repeated digits') +
        '<button type="button" data-br-tax-generate="' + esc(mode) + '">Generate safe ' + (isCnpj ? 'CNPJ' : 'CPF') + '</button>' +
      '</div>' +
      '<label class="br-tax-input-label"><span>' + (isCnpj ? 'CNPJ input' : 'CPF input') + '</span><textarea data-br-tax-input rows="3" spellcheck="false">' + esc(defaultValue) + '</textarea></label>' +
      '<div class="br-tax-actions"><button type="button" class="primary" data-br-tax-action="validate">Validate</button><button type="button" data-br-tax-copy="normalized">Copy normalized</button><button type="button" data-br-tax-copy="json">Copy developer JSON</button><select data-br-tax-history><option value="">No local history yet</option></select></div>' +
      '<div class="br-tax-feedback" data-br-tax-feedback></div><div data-br-tax-output></div>' +
    '</form>';
    renderHistory();
    run(mode);
  }

  function sampleButton(id, label) {
    return '<button type="button" data-br-tax-sample="' + esc(id) + '">' + esc(label) + '</button>';
  }

  function bind(mode) {
    document.addEventListener('click', function (event) {
      const sample = event.target.closest('[data-br-tax-sample]');
      if (sample) {
        setInput(SAMPLES[sample.dataset.brTaxSample] || '');
        run(mode);
        return;
      }
      const generator = event.target.closest('[data-br-tax-generate]');
      if (generator) {
        setInput(generator.dataset.brTaxGenerate === 'cnpj' ? generateCnpj() : generateCpf());
        run(mode);
        return;
      }
      const action = event.target.closest('[data-br-tax-action]');
      if (action) {
        run(mode);
        return;
      }
      const copy = event.target.closest('[data-br-tax-copy]');
      if (copy) {
        const report = document.querySelector('[data-br-tax-output]')?._lastReport || run(mode);
        if (!report) return;
        const value = copy.dataset.brTaxCopy === 'json' ? JSON.stringify(developerJson(report), null, 2) : report.normalized;
        copyText(value).then(function () { flash(copy, 'Copied'); });
      }
    });
    document.addEventListener('change', function (event) {
      const history = event.target.closest('[data-br-tax-history]');
      if (!history || !history.value) return;
      setInput(history.value);
      run(mode);
    });
  }

  function injectStyles() {
    if (document.getElementById('brazil-tax-id-styles')) return;
    const style = document.createElement('style');
    style.id = 'brazil-tax-id-styles';
    style.textContent = `.br-tax-shell{--br-green:#169b62;--br-yellow:#f5c542;--br-blue:#2246a8;--br-red:#dc2626;display:flex;flex-direction:column;gap:16px;max-width:100%;overflow:hidden}.br-tax-shell button,.br-tax-shell select{transition:border-color .16s ease,background-color .16s ease,color .16s ease,box-shadow .16s ease;transform:none!important}.br-tax-hero{display:flex;justify-content:space-between;gap:18px;align-items:center;border:1px solid rgba(22,155,98,.18);border-radius:14px;padding:22px;background:linear-gradient(135deg,rgba(22,155,98,.12),rgba(245,197,66,.12) 48%,rgba(34,70,168,.09));overflow:hidden}.br-tax-eyebrow{display:inline-flex;font-size:.72rem;font-weight:900;text-transform:uppercase;letter-spacing:.08em;color:var(--br-blue);margin-bottom:7px}.br-tax-hero h2{margin:0;color:#0f172a;font-size:clamp(1.35rem,2vw,2rem);line-height:1.08;letter-spacing:0}.br-tax-hero p,.br-tax-context p,.br-tax-boundary p{margin:.55rem 0 0;color:#475569;line-height:1.45;max-width:780px}.br-tax-mark{flex:0 0 auto;display:grid;place-items:center;min-width:86px;height:86px;border-radius:18px;background:linear-gradient(135deg,var(--br-green),var(--br-blue));color:#fff;font-size:1rem;letter-spacing:.04em;box-shadow:0 18px 44px rgba(15,23,42,.14)}.br-tax-badges,.br-tax-samples,.br-tax-source-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.br-tax-badges span,.br-tax-samples button,.br-tax-source-row a{border:1px solid rgba(15,23,42,.12);background:#fff;color:#334155;border-radius:999px;padding:8px 11px;font-weight:850;font-size:.8rem;text-decoration:none}.br-tax-samples button:hover,.br-tax-source-row a:hover,.br-tax-actions button:hover,.br-tax-actions select:hover,.br-tax-dev button:hover{border-color:rgba(22,155,98,.42);background:rgba(22,155,98,.06);box-shadow:inset 0 0 0 1px rgba(22,155,98,.12)}.br-tax-shell button:focus-visible,.br-tax-shell select:focus-visible,.br-tax-source-row a:focus-visible{outline:none;box-shadow:inset 0 0 0 3px rgba(34,70,168,.24)}.br-tax-context,.br-tax-panel{border:1px solid #e2e8f0;border-radius:12px;background:#fff;padding:16px;box-shadow:0 10px 28px rgba(15,23,42,.04);max-width:100%;overflow:hidden}.br-tax-context strong,.br-tax-panel h3{display:block;margin:0;color:#0f172a;font-size:.86rem;font-weight:950;letter-spacing:.05em;text-transform:uppercase}.br-tax-input-label{display:flex;flex-direction:column;gap:8px;font-weight:850;color:#0f172a}.br-tax-input-label textarea{width:100%;box-sizing:border-box;border:1px solid #cbd5e1;border-radius:12px;padding:15px;min-height:96px;font:850 .98rem/1.45 ui-monospace,SFMono-Regular,Menlo,monospace;color:#0f172a;resize:vertical}.br-tax-actions{display:flex;flex-wrap:wrap;align-items:center;gap:10px}.br-tax-actions button,.br-tax-actions select,.br-tax-dev button{position:relative;border:1px solid #cbd5e1;background:#fff;color:#0f172a;border-radius:999px;padding:10px 13px;font-weight:900;min-height:42px}.br-tax-actions .primary{background:linear-gradient(135deg,var(--br-green),#0f7a51);color:#fff;border-color:transparent}.br-tax-actions select{max-width:260px}.br-tax-feedback{min-height:22px;color:#64748b;font-weight:800}.br-tax-feedback.success{color:#15803d}.br-tax-feedback.error{color:#b91c1c}.br-tax-result{display:flex;flex-direction:column;gap:16px}.br-tax-status{border:1px solid rgba(22,155,98,.22);border-radius:12px;padding:16px;background:linear-gradient(135deg,rgba(22,155,98,.08),rgba(245,197,66,.06))}.br-tax-result.is-review .br-tax-status{border-color:rgba(220,38,38,.24);background:rgba(254,242,242,.86)}.br-tax-status span{font-size:.72rem;font-weight:950;text-transform:uppercase;letter-spacing:.08em;color:#15803d}.br-tax-result.is-review .br-tax-status span{color:#b91c1c}.br-tax-status strong{display:block;margin-top:5px;color:#0f172a;font-size:1.08rem}.br-tax-status p{margin:.35rem 0 0;color:#475569}.br-tax-card-grid,.br-tax-fields,.br-tax-pipeline{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.br-tax-mini-card,.br-tax-fields>div,.br-tax-pipeline>div{border:1px solid #e2e8f0;border-radius:10px;background:#fff;padding:13px;min-width:0}.br-tax-mini-card span,.br-tax-fields span,.br-tax-pipeline span{display:block;color:#64748b;font-size:.68rem;font-weight:950;letter-spacing:.07em;text-transform:uppercase;margin-bottom:7px}.br-tax-mini-card strong,.br-tax-fields strong{display:block;color:#0f172a;overflow-wrap:anywhere}.br-tax-mini-card .mono,.br-tax-fields strong{font-family:ui-monospace,SFMono-Regular,Menlo,monospace}.br-tax-fields p,.br-tax-pipeline p{margin:.35rem 0 0;color:#64748b;font-size:.84rem;line-height:1.42}.br-tax-pipeline .pass{border-color:rgba(22,155,98,.24);background:rgba(240,253,244,.72)}.br-tax-pipeline .fail{border-color:rgba(220,38,38,.24);background:rgba(254,242,242,.72)}.br-tax-pipeline .pass span{color:#15803d}.br-tax-pipeline .fail span{color:#b91c1c}.br-tax-table{max-width:100%;overflow:auto;border:1px solid #e2e8f0;border-radius:10px;margin-top:12px}.br-tax-table table{width:100%;border-collapse:collapse;table-layout:fixed;font-size:.84rem}.br-tax-table th,.br-tax-table td{border-bottom:1px solid #e2e8f0;padding:10px;text-align:left;vertical-align:top;overflow-wrap:anywhere}.br-tax-table th{background:#f8fafc;color:#0f172a;font-weight:950}.br-tax-table code{white-space:normal;overflow-wrap:anywhere;color:#0f172a}.br-tax-total-row td{background:#f8fafc;font-weight:850}.br-tax-traps ul{margin:10px 0 0;padding-left:18px;color:#475569;font-size:.8rem;line-height:1.4}.br-tax-dev h3{display:flex;align-items:center;justify-content:space-between;gap:12px}.br-tax-dev pre{margin:12px 0 0;max-height:520px;overflow:auto;border-radius:10px;background:#0f172a;color:#dbeafe;padding:14px;font-size:.8rem}.br-tax-copy-popover{position:absolute;left:50%;bottom:calc(100% + 7px);transform:translateX(-50%);background:#0f172a;color:#fff;border-radius:999px;padding:5px 9px;font-size:.72rem;white-space:nowrap;z-index:4}@media(max-width:960px){.br-tax-card-grid,.br-tax-fields,.br-tax-pipeline{grid-template-columns:repeat(2,minmax(0,1fr))}.br-tax-hero{align-items:flex-start}.br-tax-mark{min-width:72px;height:72px}}@media(max-width:640px){.br-tax-card-grid,.br-tax-fields,.br-tax-pipeline{grid-template-columns:1fr}.br-tax-hero{flex-direction:column}.br-tax-mark{width:100%;height:58px}.br-tax-actions button,.br-tax-actions select,.br-tax-samples button{width:100%}.br-tax-dev h3{align-items:flex-start;flex-direction:column}.br-tax-table table{min-width:620px}}`;
    style.textContent += `.br-tax-shell{gap:14px;font-size:15px;letter-spacing:0;padding:18px 20px 24px;box-sizing:border-box}.br-tax-shell *{letter-spacing:0}.br-tax-hero,.br-tax-context,.br-tax-samples,.br-tax-input-label,.br-tax-actions,.br-tax-feedback,.br-tax-result{max-width:100%;box-sizing:border-box}.br-tax-samples{gap:7px;margin:4px 0 2px;padding-top:2px}.br-tax-badges span,.br-tax-samples button,.br-tax-source-row a{min-height:34px;padding:7px 12px;font-size:.82rem;line-height:1.1;font-weight:760;box-shadow:0 1px 1px rgba(15,23,42,.02)}.br-tax-input-label{gap:8px;font-size:.92rem;font-weight:820;margin-top:4px}.br-tax-input-label>span{font-size:.92rem;line-height:1.2}.br-tax-input-label textarea{min-height:76px;padding:14px 16px;font:760 .92rem/1.38 ui-monospace,SFMono-Regular,Menlo,monospace;border-color:#d6e0ec;box-shadow:inset 0 1px 0 rgba(15,23,42,.025)}.br-tax-actions{gap:9px;margin-top:8px;margin-bottom:2px}.br-tax-actions button,.br-tax-actions select,.br-tax-dev button{min-height:38px;padding:8px 12px;font-size:.86rem;line-height:1.1;font-weight:790}.br-tax-actions .primary{padding-inline:14px}.br-tax-actions select{max-width:230px;color:#1f2937}.br-tax-feedback{min-height:20px;margin:4px 0 8px;font-size:.9rem;line-height:1.35;font-weight:760}.br-tax-result{gap:14px}.br-tax-status{padding:15px 16px}.br-tax-status span,.br-tax-mini-card span,.br-tax-fields span,.br-tax-pipeline span,.br-tax-context strong,.br-tax-panel h3{letter-spacing:0;font-weight:860}.br-tax-status span{font-size:.72rem}.br-tax-status strong{font-size:1rem;line-height:1.22}.br-tax-status p{font-size:.91rem;line-height:1.42;max-width:820px}.br-tax-card-grid,.br-tax-fields,.br-tax-pipeline{gap:10px}.br-tax-mini-card,.br-tax-fields>div,.br-tax-pipeline>div{padding:12px 13px;border-color:#dfe7f1}.br-tax-mini-card strong,.br-tax-fields strong{font-size:.95rem;line-height:1.25}.br-tax-context,.br-tax-panel{padding:15px 16px;border-color:#dfe7f1}.br-tax-boundary p{font-size:.94rem;line-height:1.5;max-width:980px}.br-tax-source-row{gap:8px;margin-top:13px}.br-tax-source-row a{font-size:.82rem;white-space:normal;text-align:left}.br-tax-traps ul{font-size:.8rem;line-height:1.4}.br-tax-dev pre{font-size:.78rem;line-height:1.45}@media(max-width:640px){.br-tax-shell{padding:14px 12px 18px}.br-tax-input-label textarea{min-height:88px}.br-tax-source-row a{width:100%}}`;
    document.head.appendChild(style);
  }

  function mount() {
    const route = currentRoute();
    if (!ROUTES.has(route)) return;
    const host = document.querySelector('[data-algorithm-id="validohub.brazil-suite"], .workbench-card, .csf-static-host');
    if (!host || host.querySelector('[data-gold-lab="brazil-tax-id"]')) return;
    injectStyles();
    host.setAttribute('data-algorithm-id', 'validohub.brazil-tax-id');
    const mode = route.includes('cnpj') ? 'cnpj' : 'cpf';
    renderShell(host, mode);
    bind(mode);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else window.setTimeout(mount, 0);
})();
