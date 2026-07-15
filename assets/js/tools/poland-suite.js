(function () {
  'use strict';

  const ALGORITHM_ID = 'validohub.poland-suite';
  const STORAGE_KEY = 'validohub.polandSuite.history.v2';
  const MAX_HISTORY = 10;
  const MAX_BATCH = 250;

  const BANKS = {
    '1010': 'Narodowy Bank Polski',
    '1020': 'PKO Bank Polski',
    '1030': 'Bank Handlowy',
    '1050': 'ING Bank Slaski',
    '1090': 'Santander Bank Polska',
    '1130': 'Bank Gospodarstwa Krajowego',
    '1140': 'mBank',
    '1160': 'Bank Millennium',
    '1240': 'Bank Pekao',
    '1320': 'Bank Pocztowy',
    '1540': 'BOS Bank',
    '1580': 'Mercedes-Benz Bank Polska',
    '1600': 'BNP Paribas Bank Polska',
    '1680': 'Plus Bank',
    '1840': 'Societe Generale Poland',
    '1870': 'Nest Bank',
    '1940': 'Credit Agricole Bank Polska',
    '2030': 'BNP Paribas Bank Polska',
    '2120': 'Santander Consumer Bank',
    '2160': 'Toyota Bank Polska',
    '2190': 'DNB Bank Polska',
    '2490': 'Alior Bank',
    '2710': 'FCE Bank Polska'
  };

  const PLATE_PREFIXES = {
    W: 'Mazowieckie / Warsaw region', WA: 'Warsaw', WB: 'Warsaw Bemowo', WD: 'Warsaw Bielany', WE: 'Warsaw Mokotow', WF: 'Warsaw Praga-Poludnie', WH: 'Warsaw Praga-Polnoc', WI: 'Warsaw Srodmiescie', WN: 'Warsaw Ursynow', WT: 'Warsaw Wawer', WW: 'Warsaw Wola', WX: 'Warsaw Zoliborz',
    KR: 'Krakow', KK: 'Krakow county', KRA: 'Krakow county', KLI: 'Limanowa county', KMY: 'Myslenice county', KNT: 'Nowy Targ county', KOS: 'Oswiecim county', KTA: 'Tarnow county',
    PO: 'Poznan', PZ: 'Poznan county', PGN: 'Gniezno county', PKA: 'Kalisz county', PKS: 'Koscian county', PLE: 'Leszno county',
    GD: 'Gdansk', GA: 'Gdynia', GSP: 'Sopot', GKA: 'Kartuzy county', GWE: 'Wejherowo county',
    DW: 'Wroclaw', DWR: 'Wroclaw county', DBL: 'Boleslawiec county', DKL: 'Klodzko county', DLE: 'Legnica county',
    EL: 'Lodz', ELW: 'Lodz East county', EWI: 'Wielun county', EP: 'Piotrkow Trybunalski',
    SK: 'Katowice', SO: 'Sosnowiec', SB: 'Bielsko-Biala', SG: 'Gliwice', SR: 'Rybnik', ST: 'Tychy',
    LU: 'Lublin', LUB: 'Lublin county', LKR: 'Krasnik county', LSW: 'Swidnik county',
    RZ: 'Rzeszow', RZE: 'Rzeszow county', RKR: 'Krosno county', RLU: 'Lubaczow county',
    BI: 'Bialystok', BIA: 'Bialystok county', BKL: 'Kolno county', BLM: 'Lomza county',
    ZS: 'Szczecin', ZST: 'Stargard county', ZGL: 'Goleniow county',
    CB: 'Bydgoszcz', CT: 'Torun', CG: 'Grudziadz', CW: 'Wloclawek',
    FZ: 'Zielona Gora', FG: 'Gorzow Wielkopolski',
    NO: 'Olsztyn', NE: 'Elblag',
    OP: 'Opole',
    TK: 'Kielce'
  };

  const PHONE_AREAS = {
    '12': 'Krakow area', '13': 'Krosno area', '14': 'Tarnow area', '15': 'Tarnobrzeg area', '16': 'Przemysl area', '17': 'Rzeszow area', '18': 'Nowy Sacz area',
    '22': 'Warsaw area', '23': 'Ciechanow area', '24': 'Plock area', '25': 'Siedlce area', '29': 'Ostroleka area',
    '32': 'Katowice area', '33': 'Bielsko-Biala area', '34': 'Czestochowa area', '41': 'Kielce area', '42': 'Lodz area', '43': 'Sieradz area', '44': 'Piotrkow Trybunalski area', '46': 'Skierniewice area',
    '52': 'Bydgoszcz area', '54': 'Wloclawek area', '55': 'Elblag area', '56': 'Torun area', '58': 'Gdansk area', '59': 'Slupsk area',
    '61': 'Poznan area', '62': 'Kalisz area', '63': 'Konin area', '65': 'Leszno area', '67': 'Pila area', '68': 'Zielona Gora area',
    '71': 'Wroclaw area', '74': 'Walbrzych area', '75': 'Jelenia Gora area', '76': 'Legnica area', '77': 'Opole area',
    '81': 'Lublin area', '82': 'Chelm area', '83': 'Biala Podlaska area', '84': 'Zamosc area', '85': 'Bialystok area', '86': 'Lomza area', '87': 'Suwalki area', '89': 'Olsztyn area',
    '91': 'Szczecin area', '94': 'Koszalin area', '95': 'Gorzow Wielkopolski area'
  };

  const MOBILE_PREFIXES = new Set(['45', '50', '51', '53', '57', '60', '66', '69', '72', '73', '78', '79', '88']);

  let TOOLS;

  const Plugin = (function (framework) {
    const util = framework.utilities || fallbackUtilities();

    TOOLS = {
      'poland-nip-validator': {
        title: 'NIP Validator & Explainer', label: 'NIP', samples: ['1234563218', '123-456-32-18', '1234563210'], generator: generateNip, analyze: analyzeNip, family: 'Tax identifier', mask: maskPolishNumber, fieldLabel: 'NIP digits',
        summary: 'Validate Polish tax identifiers, inspect checksum math, mask values for logs, and build safe NIP test cases locally.',
        badges: ['Tax ID', 'Checksum', 'VAT base', 'Safe fixtures', 'Masked logs'], theme: ['#9f1239', '#fff1f2', '#be123c']
      },
      'poland-regon-validator': {
        title: 'REGON Validator & Explainer', label: 'REGON', samples: ['123456785', '12345678512347', '123456789'], generator: generateRegon9, analyze: analyzeRegon, family: 'Business register', mask: maskPolishNumber, fieldLabel: 'REGON digits',
        summary: 'Check REGON 9- and 14-digit structures, explain weighted checksums, and prepare safe business-register fixtures.',
        badges: ['Business ID', '9 / 14 digits', 'GUS shape', 'Checksum trace', 'Fixture ready'], theme: ['#7c3aed', '#f5f3ff', '#6d28d9']
      },
      'poland-iban-nrb-validator': {
        title: 'Polish IBAN / NRB Workbench', label: 'IBAN / NRB', samples: ['PL61109010140000071219812874', '61109010140000071219812874', 'PL00109010140000071219812874'], generator: generateNrb, analyze: analyzeIbanNrb, family: 'Banking', mask: maskIban, fieldLabel: 'Account number',
        summary: 'Inspect Polish bank-account numbers, MOD-97 control digits, bank segments, branch hints, and masked account payloads.',
        badges: ['IBAN / NRB', 'MOD-97', 'Bank code', 'Masked account', 'SEPA prep'], theme: ['#047857', '#ecfdf5', '#059669']
      },
      'poland-tax-microaccount-calculator': {
        title: 'Polish Tax Microaccount Calculator', label: 'PESEL or NIP', samples: ['44051401458', '1234563218', '1234563210'], generator: generateNip, analyze: analyzeTaxMicro, family: 'Tax payment', mask: maskPolishNumber, fieldLabel: 'Source identifier',
        summary: 'Check whether a NIP or PESEL-shaped source value is ready for official Polish tax microaccount workflows.',
        badges: ['Tax payment', 'NIP source', 'PESEL source', 'Official check note', 'Payment boundary'], theme: ['#b45309', '#fffbeb', '#d97706']
      },
      'poland-postal-code-validator': {
        title: 'Polish Postal Code Validator', label: 'Postal code', samples: ['00-001', '00001', '0A-001'], generator: generatePostal, analyze: analyzePostal, family: 'Address', mask: value => value, fieldLabel: 'Postal code',
        summary: 'Normalize NN-NNN postal codes, batch-check address data, and flag format mistakes before checkout or CRM import.',
        badges: ['Address data', 'NN-NNN', 'Batch cleanup', 'CRM import', 'Delivery boundary'], theme: ['#0f766e', '#f0fdfa', '#14b8a6']
      },
      'poland-phone-number-validator': {
        title: 'Polish Phone Number Workbench', label: 'Phone number', samples: ['+48 501 234 567', '22 123 45 67', '801 234 567', '12345'], generator: generatePhone, analyze: analyzePhone, family: 'Telecom', mask: maskPhone, fieldLabel: 'Phone number',
        summary: 'Normalize +48 phone numbers, classify mobile, landline, service, and premium ranges, and prepare log-safe contact fixtures.',
        badges: ['+48 format', 'Mobile ranges', 'Area codes', 'Service numbers', 'Log safe'], theme: ['#2563eb', '#eff6ff', '#3b82f6']
      },
      'poland-license-plate-inspector': {
        title: 'Polish License Plate Inspector', label: 'License plate', samples: ['WA12345', 'KR 1A234', 'PO1234A', 'ZZ99999'], generator: generatePlate, analyze: analyzePlate, family: 'Vehicle', mask: maskPlate, fieldLabel: 'License plate',
        summary: 'Inspect Polish license plate structure, region prefixes, serial parts, and fleet-safe masked vehicle fixtures.',
        badges: ['Vehicle', 'Region prefix', 'Fleet logs', 'Serial split', 'Offline dictionary'], theme: ['#334155', '#f8fafc', '#475569']
      },
      'poland-krs-inspector': {
        title: 'KRS Number Inspector', label: 'KRS number', samples: ['0000123456', '1234567890', '12345'], generator: generateKrs, analyze: analyzeKrs, family: 'Company register', mask: maskPolishNumber, fieldLabel: 'KRS digits',
        summary: 'Inspect KRS registry numbers, normalize ten-digit records, and separate offline shape checks from official company status.',
        badges: ['Company registry', '10 digits', 'Search key', 'Status boundary', 'Safe logs'], theme: ['#4338ca', '#eef2ff', '#4f46e5']
      },
      'poland-vat-validator': {
        title: 'Polish VAT / EU VAT Syntax Workbench', label: 'VAT number', samples: ['PL1234563218', '1234563218', 'PL1234563210'], generator: () => 'PL' + generateNip(), analyze: analyzeVat, family: 'EU VAT syntax', mask: maskVat, fieldLabel: 'VAT syntax',
        summary: 'Validate PL VAT syntax through the local NIP checksum, normalize country prefixes, and prepare VIES-ready test payloads.',
        badges: ['PL VAT', 'NIP checksum', 'VIES-ready', 'EU prefix', 'Tax boundary'], theme: ['#0e7490', '#ecfeff', '#0891b2']
      },
      'poland-bank-code-inspector': {
        title: 'Polish Bank Code / NRB Inspector', label: 'IBAN / NRB', samples: ['PL61109010140000071219812874', '61109010140000071219812874', 'PL00109010140000071219812874'], generator: generateNrb, analyze: analyzeBankCode, family: 'Banking', mask: maskIban, fieldLabel: 'Bank account',
        summary: 'Decode Polish NRB and IBAN bank-routing segments, explain MOD-97 checks, and mask account identifiers for developer workflows.',
        badges: ['Bank routing', 'NRB control', 'Branch segment', 'MOD-97', 'Masked export'], theme: ['#0369a1', '#f0f9ff', '#0284c7']
      }
    };

    function currentSlug() {
      return window.location.pathname.split('/').filter(Boolean).pop() || 'poland-nip-validator';
    }

    function onMount(workbench) {
      injectStyles();
      const slug = currentSlug();
      const config = TOOLS[slug] || TOOLS['poland-nip-validator'];
      workbench.form._polandConfig = config;
      workbench.form._polandSlug = slug;
      workbench.form.classList.add('poland-suite-workbench');
      applyToolTheme(workbench, config);
      enhanceIntro(config);
      normalizeControls(workbench, config);
      addControls(workbench, config);
      addPanels(workbench);
      bindEvents(workbench, config);
      hydrateFromQuery(workbench);
      renderEmpty(workbench, config);
      workbench.updateBadge();
    }

    function enhanceIntro(config) {
      const intro = document.querySelector('.page-intro');
      if (!intro) return;
      const title = intro.querySelector('h1');
      const summary = intro.querySelector('p');
      if (title) title.textContent = config.title;
      if (summary) summary.textContent = config.summary;
      const badges = (config.badges || []).map((badge, index) => '<span class="poland-pill ' + (index === 0 ? 'active' : '') + '">' + util.escapeHtml(badge) + '</span>').join('');
      const existing = intro.querySelector('.poland-badge-row');
      if (existing) existing.innerHTML = badges;
      else intro.insertAdjacentHTML('beforeend', '<div class="poland-badge-row">' + badges + '</div>');
    }

    function applyToolTheme(workbench, config) {
      const theme = config.theme || ['#9f1239', '#fff1f2', '#be123c'];
      workbench.form.style.setProperty('--pl-accent', theme[0]);
      workbench.form.style.setProperty('--pl-soft', theme[1]);
      workbench.form.style.setProperty('--pl-accent-strong', theme[2] || theme[0]);
    }

    function normalizeControls(workbench, config) {
      const heading = workbench.form.querySelector('.workbench-form-heading h3');
      if (heading) heading.textContent = config.title;
      const input = workbench.primaryInput();
      if (input) {
        input.placeholder = 'Paste ' + config.label + ' or use a preset';
        input.autocomplete = 'off';
        input.spellcheck = false;
      }
      const outputField = workbench.form.querySelector('.output-field');
      if (outputField) outputField.style.display = 'none';
      const advanced = workbench.form.querySelector('[data-advanced-panel]');
      if (advanced) advanced.style.display = 'none';
      const buttonRow = workbench.form.querySelector('.button-row');
      if (buttonRow && !buttonRow.querySelector('[data-poland-copy="normalized"]')) {
        buttonRow.insertAdjacentHTML('beforeend', [
          '<button type="button" class="button button-secondary" data-poland-copy="normalized">Copy normalized</button>',
          '<button type="button" class="button button-secondary" data-poland-copy="masked">Copy masked</button>',
          '<button type="button" class="button button-secondary" data-poland-copy="testcase">Copy test case</button>',
          '<button type="button" class="button button-secondary" data-poland-copy="json">Copy audit JSON</button>'
        ].join(''));
      }
    }

    function addControls(workbench, config) {
      const grid = workbench.form.querySelector('.field-grid');
      if (!grid || grid.querySelector('[data-poland-preset]')) return;
      grid.insertAdjacentHTML('afterbegin', `<label class="field poland-select-field"><span>Presets</span><select data-poland-preset><option value="">Choose a ${escapeAttr(config.label)} sample</option>${config.samples.map((sample, index) => `<option value="${index}">${escapeAttr(sample)}</option>`).join('')}</select><small>Valid, formatted, and failing cases.</small></label><label class="field poland-select-field"><span>Recent local inputs</span><select data-poland-history><option value="">No history yet</option></select><small>Stored only in this browser.</small></label>`);
      const input = workbench.primaryInput();
      if (input && input.closest('.field')) input.closest('.field').style.gridColumn = '1 / -1';
      const afterGrid = grid.parentElement;
      if (afterGrid && !workbench.form.querySelector('[data-poland-batch]')) {
        grid.insertAdjacentHTML('afterend', `<details class="poland-batch-card" data-poland-batch><summary><span>Batch validation</span><em>Validate up to ${MAX_BATCH} values locally, one per line</em></summary><label class="field"><span>Batch input</span><textarea data-poland-batch-input rows="5" placeholder="Paste one ${escapeAttr(config.label)} per line"></textarea><small>Blank lines are ignored. Nothing leaves the browser.</small></label><div class="poland-batch-actions"><button type="button" class="button button-secondary" data-poland-batch-run>Run batch</button><button type="button" class="button button-secondary" data-poland-batch-copy>Copy batch JSON</button><button type="button" class="button button-ghost" data-poland-batch-clear>Clear batch</button></div><div class="poland-batch-results" data-poland-batch-results></div></details>`);
      }
      renderHistory(workbench);
    }

    function addPanels(workbench) {
      const feedback = workbench.form.querySelector('[data-tool-feedback]');
      if (!feedback || workbench.form.querySelector('[data-poland-panel]')) return;
      feedback.insertAdjacentHTML('afterend', '<section class="poland-panel" data-poland-panel><div class="poland-empty-state" data-poland-empty><div class="poland-empty-icon">PL</div><div><strong>Paste a Polish value or generate a safe fixture.</strong><p>Validation runs locally. Registry, bank, phone, vehicle, and tax-status lookups are intentionally outside this browser-only tool.</p></div></div><div class="poland-timeline" data-poland-timeline></div><div class="poland-summary-grid" data-poland-summary></div><div class="poland-breakdown" data-poland-breakdown></div><div class="poland-quality" data-poland-quality></div><div class="poland-debugger" data-poland-debugger></div><div class="poland-dev-panel" data-poland-dev></div></section>');
    }

    function bindEvents(workbench, config) {
      const preset = workbench.form.querySelector('[data-poland-preset]');
      if (preset) preset.addEventListener('change', () => { if (preset.value !== '') { setInput(workbench, config.samples[Number(preset.value)]); run(workbench, 'validate'); } });
      const history = workbench.form.querySelector('[data-poland-history]');
      if (history) history.addEventListener('change', () => { if (history.value) { setInput(workbench, history.value); run(workbench, 'validate'); } });
      workbench.form.addEventListener('click', event => {
        const copy = event.target.closest('[data-poland-copy]');
        if (copy) copySpecial(workbench, copy.dataset.polandCopy);
        if (event.target.closest('[data-poland-batch-run]')) runBatch(workbench);
        if (event.target.closest('[data-poland-batch-copy]')) copyBatch(workbench);
        if (event.target.closest('[data-poland-batch-clear]')) clearBatch(workbench);
      });
    }

    function hydrateFromQuery(workbench) {
      const value = new URLSearchParams(window.location.search).get('value');
      if (value) { setInput(workbench, value); run(workbench, 'validate', { quiet: true }); }
    }

    function detectInputMode(value) {
      const config = TOOLS[currentSlug()] || TOOLS['poland-nip-validator'];
      if (!String(value || '').trim()) return { label: 'Waiting for ' + config.label, state: '' };
      const result = config.analyze(value);
      return { label: result.valid ? 'Looks valid: ' + result.type : 'Needs review: ' + result.type, state: result.valid ? 'text' : 'invalid' };
    }

    function applySample(workbench, id) {
      const config = workbench.form._polandConfig;
      if (!config) return;
      const index = Number(id);
      if (!Number.isNaN(index) && config.samples[index]) { setInput(workbench, config.samples[index]); run(workbench, 'validate'); }
    }

    function run(workbench, action, options) {
      options = options || {};
      const config = workbench.form._polandConfig || TOOLS[currentSlug()] || TOOLS['poland-nip-validator'];
      if (action === 'generate') {
        workbench.markActiveAction('validate');
        const value = config.generator();
        setInput(workbench, value);
        return run(workbench, 'validate', options);
      }
      const input = workbench.primaryInput();
      const raw = input ? input.value.trim() : '';
      if (!raw) { renderEmpty(workbench, config); workbench.setOutput(''); workbench.lastResult = null; workbench.setMessage('Paste input or generate a safe fixture.', 'error'); return; }
      const result = config.analyze(raw);
      result.masked = config.mask(result.normalized || result.input);
      addHistory(workbench.form._polandSlug, raw, result.type);
      renderResult(workbench, config, result);
      const json = publicJson(config, result);
      const prettyJson = JSON.stringify(json, null, 2);
      workbench.setOutput(prettyJson);
      workbench.lastResult = { type: 'application/json', extension: 'json', content: prettyJson };
      workbench.form._polandNormalized = result.normalized || result.input;
      workbench.form._polandMasked = result.masked;
      workbench.form._polandJson = prettyJson;
      workbench.form._polandTestCase = testCaseText(config, result);
      workbench.setMessage(result.valid ? config.title + ' passed offline checks.' : config.title + ' found issues.', result.valid ? 'success' : 'error');
      renderHistory(workbench);
      if (!options.quiet) workbench.updateBadge();
    }

    function runBatch(workbench) {
      const config = workbench.form._polandConfig || TOOLS[currentSlug()] || TOOLS['poland-nip-validator'];
      const input = workbench.form.querySelector('[data-poland-batch-input]');
      const target = workbench.form.querySelector('[data-poland-batch-results]');
      if (!input || !target) return;
      const values = input.value.split(/\r?\n/).map(v => v.trim()).filter(Boolean).slice(0, MAX_BATCH);
      if (values.length === 0) {
        target.innerHTML = '<p class="poland-muted">Paste at least one value to run a batch check.</p>';
        workbench.setMessage('Batch input is empty.', 'error');
        return;
      }
      const rows = values.map((value, index) => {
        const result = config.analyze(value);
        result.masked = config.mask(result.normalized || result.input);
        return { index: index + 1, value, result };
      });
      workbench.form._polandBatchJson = JSON.stringify({ kind: 'poland-premium-suite-batch', tool: config.title, count: rows.length, valid: rows.filter(r => r.result.valid).length, invalid: rows.filter(r => !r.result.valid).length, rows: rows.map(r => ({ index: r.index, input: r.value, valid: r.result.valid, type: r.result.type, normalized: r.result.normalized, masked: r.result.masked, diagnostics: r.result.diagnostics, warnings: r.result.warnings })) }, null, 2);
      target.innerHTML = batchHtml(rows);
      workbench.setMessage(`Batch checked ${rows.length} value${rows.length === 1 ? '' : 's'}.`, rows.every(r => r.result.valid) ? 'success' : 'error');
    }

    function copyBatch(workbench) {
      const json = workbench.form._polandBatchJson;
      if (!json) { workbench.setMessage('Run a batch first.', 'error'); return; }
      copyText(json).then(() => workbench.setMessage('Copied batch JSON.', 'success'));
    }

    function clearBatch(workbench) {
      const input = workbench.form.querySelector('[data-poland-batch-input]');
      const target = workbench.form.querySelector('[data-poland-batch-results]');
      if (input) input.value = '';
      if (target) target.innerHTML = '';
      workbench.form._polandBatchJson = '';
      workbench.setMessage('Batch cleared.', 'success');
    }

    function renderEmpty(workbench, config) {
      clearPanels(workbench);
      const empty = workbench.form.querySelector('[data-poland-empty]');
      if (empty) empty.style.display = 'flex';
      renderTimeline(workbench, [stage('Input','idle','Waiting'),stage('Normalize','idle','Clean'),stage('Type','idle',config.family),stage('Rules','idle','Inspect'),stage('Context','idle','Explain'),stage('Result','idle','Ready')]);
    }

    function clearPanels(workbench) {
      ['[data-poland-summary]','[data-poland-breakdown]','[data-poland-quality]','[data-poland-debugger]','[data-poland-dev]'].forEach(sel => { const el = workbench.form.querySelector(sel); if (el) el.innerHTML = ''; });
      workbench.setStats([], [], ''); workbench.setPreview('', ''); workbench.setAdvanced('');
    }

    function renderResult(workbench, config, result) {
      clearPanels(workbench);
      const empty = workbench.form.querySelector('[data-poland-empty]');
      if (empty) empty.style.display = 'none';
      renderTimeline(workbench, [stage('Input','pass','Received'),stage('Normalize',result.normalized ? 'pass':'fail',result.normalized || 'n/a'),stage('Type',result.type === 'Unknown' ? 'fail':'pass',result.type),stage('Rules',result.checksumStatus,result.expected || 'n/a'),stage('Context','pass',config.family),stage('Result',result.valid ? 'pass':'fail',result.valid ? 'Valid':'Fix')]);
      workbench.setStats([['Input characters', String(Array.from(result.input || '').length)],['Normalized', result.normalized || 'n/a'],['Masked', result.masked || 'n/a'],['Detected type', result.type],['Valid offline', result.valid ? 'Yes':'No'],['What this proves', result.proves || 'Syntax / checksum only'],['What it does not prove', result.boundary || 'Official status']], result.diagnostics.concat(result.warnings || []), result.valid ? 'success':'error');
      renderSummary(workbench, [card('Type', result.type, result.valid ? 'success':'error'), card('Normalized', result.normalized || 'n/a', 'mono'), card('Masked', result.masked || 'n/a', 'mono'), card('Context', result.context || config.family, '')]);
      renderBreakdown(workbench, breakdownHtml(result));
      renderQuality(workbench, qualityHtml(result));
      renderDebugger(workbench, debuggerHtml(result));
      renderDev(workbench, devHtml(config, result));
    }

    function renderTimeline(workbench, stages) {
      const target = workbench.form.querySelector('[data-poland-timeline]'); if (!target) return;
      const complete = stages.filter(s => s.state === 'pass').length;
      const width = Math.max(0, Math.min(100, ((complete - 1) / (stages.length - 1)) * 100));
      target.innerHTML = `<div class="poland-timeline-track"><span style="width:${width}%"></span></div><div class="poland-timeline-steps">${stages.map(s => `<div class="poland-step ${s.state}"><span></span><strong>${util.escapeHtml(s.label)}</strong><em>${util.escapeHtml(s.note)}</em></div>`).join('')}</div>`;
    }
    function renderSummary(workbench, cards) { const target = workbench.form.querySelector('[data-poland-summary]'); if (target) target.innerHTML = cards.map(c => { const value = String(c.value || ''); const long = value.length > 18 ? ' is-long' : ''; return '<article class="poland-summary-card ' + (c.state || '') + long + '"><span>' + util.escapeHtml(c.label) + '</span><strong>' + util.escapeHtml(value) + '</strong></article>'; }).join(''); }
    function renderBreakdown(workbench, html) { const target = workbench.form.querySelector('[data-poland-breakdown]'); if (target) target.innerHTML = html; }
    function renderQuality(workbench, html) { const target = workbench.form.querySelector('[data-poland-quality]'); if (target) target.innerHTML = html; }
    function renderDebugger(workbench, html) { const target = workbench.form.querySelector('[data-poland-debugger]'); if (target) target.innerHTML = html; }
    function renderDev(workbench, html) { const target = workbench.form.querySelector('[data-poland-dev]'); if (target) target.innerHTML = html; }

    function resultBase(input, normalized, valid, type, expected, provided, steps, diagnostics, context, boundary, warnings, extra) {
      extra = extra || {};
      return Object.assign({ input, normalized, valid, type, expected: expected || '', provided: provided || '', steps: steps || [], diagnostics: diagnostics || [], warnings: warnings || [], recommendations: [], fields: [], stats: [], problemIndexes: [], context: context || '', boundary: boundary || 'Registry/live status is not checked.', proves: 'Syntax / checksum only', checksumStatus: expected ? (valid ? 'pass':'fail') : 'idle' }, extra);
    }

    function analyzeNip(raw) {
      const d = digits(raw); const steps=[]; const diag=[]; const rec=[];
      if (hasLetters(raw)) diag.push('NIP accepts digits only; letters were removed during normalization.');
      if (d.length !== 10) { rec.push('Use exactly 10 digits. Common display groups are 123-456-32-18 or 1234563218.'); return resultBase(raw,d,false,'NIP','10 digits',String(d.length),[],[`NIP must contain exactly 10 digits; got ${d.length}.`].concat(diag),'Polish tax identifier','Taxpayer existence and status are not checked.',[],{ recommendations: rec, problemIndexes: allIndexes(d), fields: [['Length', `${d.length}/10`], ['Display', formatNip(d) || 'n/a']] }); }
      const w=[6,5,7,2,3,4,5,6,7]; const sum=w.reduce((a,x,i)=>{ const p=x*Number(d[i]); steps.push(`Position ${i+1}: ${d[i]} x weight ${x} = ${p}`); return a+p; },0); const c=sum%11; steps.push(`Weighted sum ${sum} mod 11 = ${c}`); const valid=c!==10 && c===Number(d[9]);
      if (c === 10) { diag.push('Checksum result 10 is forbidden for NIP.'); rec.push('Change one of the first nine digits; NIP check digit cannot represent remainder 10.'); }
      else if (!valid) { diag.push(`Expected check digit ${c}, but input ends with ${d[9]}.`); rec.push(`Use ${d.slice(0,9)}${c} if this is only a test fixture and not a real taxpayer identifier.`); }
      return resultBase(raw,d,valid,'NIP', c===10?'invalid checksum state':String(c), d[9], steps, diag, 'Tax identifier / VAT base', 'Taxpayer registry status and VAT activity are not checked.', [], { recommendations: rec, problemIndexes: valid?[]:[9], fields: [['Digits', d], ['Display', formatNip(d)], ['Weights', w.join(', ')], ['Weighted sum', String(sum)], ['Remainder', String(c)]], proves: '10-digit syntax and NIP checksum' });
    }
    function generateNip(){ for(;;){ const first=String(Math.floor(Math.random()*1e9)).padStart(9,'0'); const w=[6,5,7,2,3,4,5,6,7]; const c=w.reduce((a,x,i)=>a+x*Number(first[i]),0)%11; if(c!==10) return first+c; } }

    function analyzeRegon(raw){
      const d=digits(raw); const rec=[]; if(!/^\d{9}(\d{5})?$/.test(d)){ rec.push('Use 9 digits for a main REGON or 14 digits for a local unit/subdivision REGON.'); return resultBase(raw,d,false,'REGON','9 or 14 digits',String(d.length),[],[`REGON must contain 9 or 14 digits; got ${d.length}.`],'Business register','GUS registry status is not checked.',[],{ recommendations: rec, problemIndexes: allIndexes(d), fields: [['Length', String(d.length)], ['Allowed lengths', '9, 14']] }); }
      if(d.length===9) return regon9(raw,d);
      const first=regon9(raw,d.slice(0,9)); const w=[2,4,8,5,0,9,7,3,6,1,2,4,8]; const steps=[]; const sum=w.reduce((a,x,i)=>{const p=x*Number(d[i]); steps.push(`Position ${i+1}: ${d[i]} x weight ${x} = ${p}`); return a+p;},0); let c=sum%11; if(c===10)c=0; steps.push(`Weighted sum ${sum} mod 11 => ${c}`); const valid=first.valid && c===Number(d[13]); const diag=[];
      if(!first.valid) diag.push('The first 9-digit REGON segment is invalid.');
      if(c!==Number(d[13])) diag.push(`Expected 14-digit REGON check digit ${c}, but got ${d[13]}.`);
      return resultBase(raw,d,valid,'REGON 14',String(c),d[13],first.steps.concat(steps),diag,'Business branch/entity identifier','GUS existence, company status, and local-unit assignment are not checked.',[],{ recommendations: valid?[]:['Fix the first 9-digit segment first, then recompute the 14th digit.'], problemIndexes: valid?[]:[13], fields: [['Main REGON segment', d.slice(0,9)], ['Local unit segment', d.slice(9,13)], ['Check digit', d[13]], ['Weighted sum', String(sum)]], proves: 'REGON length and checksum' });
    }
    function regon9(raw,d){ const w=[8,9,2,3,4,5,6,7]; const steps=[]; const sum=w.reduce((a,x,i)=>{const p=x*Number(d[i]); steps.push(`Position ${i+1}: ${d[i]} x weight ${x} = ${p}`); return a+p;},0); let c=sum%11; if(c===10)c=0; steps.push(`Weighted sum ${sum} mod 11 => ${c}`); const valid=c===Number(d[8]); return resultBase(raw,d,valid,'REGON 9',String(c),d[8],steps,valid?[]:[`Expected REGON check digit ${c}, but got ${d[8]}.`],'Business entity identifier','GUS existence and business status are not checked.',[],{ recommendations: valid?[]:[`For a test fixture, use ${d.slice(0,8)}${c}.`], problemIndexes: valid?[]:[8], fields: [['Entity segment', d.slice(0,8)], ['Check digit', d[8]], ['Weights', w.join(', ')], ['Weighted sum', String(sum)]], proves: 'REGON 9-digit checksum' }); }
    function generateRegon9(){ for(;;){ const b=String(Math.floor(Math.random()*1e8)).padStart(8,'0'); const r=regon9(b,b+'0'); if(r.expected) return b+r.expected; } }

    function analyzeIbanNrb(raw){ const n=normalizeIban(raw); if(!n.body) return resultBase(raw,n.normalized,false,'IBAN / NRB','PL IBAN or 26-digit NRB','empty',[],['Enter a PL IBAN or 26-digit domestic NRB.'],'Bank account','Account existence and ownership are not checked.',[],{ recommendations:['Paste either PL + 26 NRB digits or the 26 domestic NRB digits.'] }); const nrb=n.nrb; const diag=[]; const warnings=[]; const rec=[]; if(n.prefixed && !/^PL/.test(n.normalized)) diag.push('Polish IBAN must use PL country prefix.'); if(!/^\d{26}$/.test(nrb)) { diag.push(`Polish NRB must contain exactly 26 digits; got ${nrb.length}.`); rec.push('Remove spaces and keep PL plus 26 digits, or use a 26-digit domestic NRB.'); }
      const mod=/^\d{26}$/.test(nrb)?ibanMod('PL'+nrb):NaN; const valid=diag.length===0 && mod===1; const bank=nrb.slice(2,6); const branch=nrb.slice(6,10); const bankName=BANKS[bank]||'Unknown bank code'; if(valid && !BANKS[bank]) warnings.push('Checksum is valid, but the four-digit bank code is not in the local offline dictionary.'); if(!valid && Number.isFinite(mod)) { diag.push(`IBAN/NRB MOD-97 result is ${mod}; expected 1.`); rec.push('Recheck the first two control digits or regenerate a safe test fixture.'); }
      return resultBase(raw,n.normalized,valid,n.prefixed?'PL IBAN':'Domestic NRB','MOD97 = 1',Number.isFinite(mod)?'MOD97 = '+mod:'n/a',[`NRB: ${nrb}`,`Control digits: ${nrb.slice(0,2)}`,`Bank code: ${bank}`,`Branch / routing segment: ${branch}`,`Account segment: ${nrb.slice(10)}`,`IBAN rearranged numeric stream processed with MOD-97.`],diag,`Bank code ${bank} - ${bankName}`,'Account existence, ownership, and bank dictionary completeness are not checked.',warnings,{ recommendations: rec, problemIndexes: valid?[]:[0,1], fields: [['IBAN display', n.prefixed?n.normalized:'PL'+nrb], ['NRB', nrb], ['Control digits', nrb.slice(0,2)], ['Bank code', bank], ['Bank name', bankName], ['Branch segment', branch], ['Account segment', nrb.slice(10)]], proves: 'PL IBAN/NRB length and MOD-97 checksum' }); }
    function normalizeIban(raw){ const s=String(raw||'').toUpperCase().replace(/[^A-Z0-9]/g,''); const pref=s.startsWith('PL'); return { normalized:s, prefixed:pref, body:s, nrb:pref?s.slice(2):s }; }
    function ibanMod(value){ const s=value.toUpperCase().replace(/\s/g,''); const moved=s.slice(4)+s.slice(0,4); let rem=0; for(const ch of moved){ const part=/[A-Z]/.test(ch)?String(ch.charCodeAt(0)-55):ch; for(const digit of part) rem=(rem*10+Number(digit))%97; } return rem; }
    function generateNrb(){ const bank='10901014'; const acct=String(Math.floor(Math.random()*1e16)).padStart(16,'0'); const base='00'+bank+acct; const check=98-ibanMod('PL'+base); return 'PL'+String(check).padStart(2,'0')+bank+acct; }

    function analyzeTaxMicro(raw){ const d=digits(raw); const nip=analyzeNip(d); const pesel=analyzePeselShape(d); const valid=nip.valid||pesel.valid; const source=nip.valid?'Valid NIP':pesel.valid?'PESEL-shaped identifier':'Unsupported input'; const candidate=valid?'10100071222 + '+d:'n/a'; const diag=valid?[]:['Use a valid NIP or an 11-digit PESEL-shaped value.']; const rec=valid?['Verify the final official microaccount with the Ministry of Finance generator before payment.']:['Do not construct a tax microaccount from an invalid source identifier.']; return resultBase(raw,d,valid,'Tax microaccount input',candidate,d,[`Accepted source identifier: ${source}`,`Offline source validation: ${valid ? 'passed' : 'failed'}`,'The official generator defines the final account assignment and should be used for payment-critical workflows.'],diag,'Tax payment identifier','This browser-only page does not claim official tax account assignment.',[],{ recommendations: rec, fields: [['Source type', source], ['Source identifier', d], ['Offline candidate core', candidate], ['Official check required', 'Yes']], proves: 'Source identifier readiness for official microaccount workflows' }); }

    function analyzePostal(raw){ const d=digits(raw); const valid=/^\d{5}$/.test(d); const formatted=valid?d.slice(0,2)+'-'+d.slice(2):d; const zone=d.slice(0,2); return resultBase(raw,formatted,valid,'Postal code','NN-NNN',formatted,[`Digits: ${d}`, valid?`Formatted as ${formatted}`:'Polish postal codes use two digits, hyphen, three digits.',`Postal zone prefix: ${zone || 'n/a'}`],valid?[]:[`Postal code must contain exactly five digits; got ${d.length}.`],'Address formatting','Address deliverability, street assignment, and Poczta Polska database status are not checked.',[],{ recommendations: valid?[]:['Use NN-NNN display format, for example 00-001.'], problemIndexes: valid?[]:allIndexes(d), fields: [['Canonical format', formatted], ['Digits', d], ['Postal zone prefix', zone || 'n/a'], ['Display mask', 'NN-NNN']], proves: 'Polish postal-code shape' }); }
    function generatePostal(){ return String(Math.floor(Math.random()*100)).padStart(2,'0')+'-'+String(Math.floor(Math.random()*1000)).padStart(3,'0'); }

    function analyzePhone(raw){ let d=digits(raw); const had48=d.startsWith('48')&&d.length===11; if(had48)d=d.slice(2); const valid=/^\d{9}$/.test(d); const prefix=d.slice(0,2); let cat='Unknown range'; if(MOBILE_PREFIXES.has(prefix)) cat='Mobile range'; else if(PHONE_AREAS[prefix]) cat=PHONE_AREAS[prefix]; else if(d.startsWith('800')) cat='Toll-free service'; else if(d.startsWith('801')) cat='Shared-cost service'; else if(d.startsWith('70')) cat='Premium-rate range'; const formatted=valid?'+48 '+d.slice(0,3)+' '+d.slice(3,6)+' '+d.slice(6):d; const diag=valid?[]:[`Polish national phone numbers usually contain 9 digits after +48; got ${d.length}.`]; const warnings=[]; if(valid && cat==='Unknown range') warnings.push('The number has valid national length, but the prefix is not recognized by the offline dictionary.'); return resultBase(raw,formatted,valid,'Polish phone number','9 national digits',d,[`National digits: ${d}`,`Input included +48/country prefix: ${had48 ? 'yes' : 'no'}`,`Classification: ${cat}`,`E.164 display: ${formatted}`],diag,cat,'Line activity, portability, subscriber ownership, and premium-rate billing status are not checked.',warnings,{ recommendations: valid?['Store canonical E.164 display when possible.']:['Keep only digits and optional +48, then verify there are 9 national digits.'], fields: [['E.164', formatted], ['National digits', d], ['Prefix', prefix || 'n/a'], ['Classification', cat]], proves: 'Polish phone length and offline prefix classification' }); }
    function generatePhone(){ return '+48 501 '+String(Math.floor(Math.random()*1000)).padStart(3,'0')+' '+String(Math.floor(Math.random()*1000)).padStart(3,'0'); }

    function analyzePlate(raw){ const s=String(raw||'').toUpperCase().replace(/[^A-Z0-9]/g,''); const valid=/^[A-Z]{1,3}[A-Z0-9]{4,5}$/.test(s); const prefix=Object.keys(PLATE_PREFIXES).sort((a,b)=>b.length-a.length).find(p=>s.startsWith(p)); const context=prefix?PLATE_PREFIXES[prefix]:'Unknown prefix'; const warnings=[]; if(valid && !prefix) warnings.push('Plate-like format is valid, but the prefix is not in the local offline dictionary.'); return resultBase(raw,s,valid,'License plate','Polish plate-like pattern',s,[`Normalized plate: ${s}`,`Detected prefix: ${prefix||'n/a'}`,`Region hint: ${context}`,`Serial part: ${prefix?s.slice(prefix.length):'n/a'}`],valid?[]:['Plate does not match the supported Polish plate-like structural pattern.'],'Vehicle registration format','Registration status, vehicle ownership, insurance, and inspection status are not checked.',warnings,{ recommendations: valid?[]:['Use uppercase letters/digits and remove spaces or hyphens before validation.'], fields: [['Normalized plate', s], ['Prefix', prefix || 'n/a'], ['Region hint', context], ['Serial part', prefix?s.slice(prefix.length):'n/a']], proves: 'Polish plate-like structure and prefix hint' }); }
    function generatePlate(){ return 'WA'+String(Math.floor(Math.random()*90000)+10000); }

    function analyzeKrs(raw){ const d=digits(raw); const valid=/^\d{10}$/.test(d); return resultBase(raw,d,valid,'KRS number','10 digits',d,[`KRS normalized value: ${d}`,'KRS is a registry identifier; this offline inspector checks shape only.'],valid?[]:[`KRS number should contain exactly 10 digits; got ${d.length}.`],'National Court Register','Company existence, court file, legal form, and active status are not checked.',[],{ recommendations: valid?['Use official KRS lookup for legal status before relying on the company record.']:['Pad or trim only if you have an authoritative source; do not guess missing KRS digits.'], problemIndexes: valid?[]:allIndexes(d), fields: [['Digits', d], ['Length', `${d.length}/10`], ['Registry', 'KRS']], proves: 'KRS 10-digit shape' }); }
    function generateKrs(){ return String(Math.floor(Math.random()*1e10)).padStart(10,'0'); }

    function analyzeVat(raw){ const s=String(raw||'').toUpperCase().replace(/[^A-Z0-9]/g,''); const body=s.startsWith('PL')?s.slice(2):s; const r=analyzeNip(body); r.type='Polish VAT syntax'; r.normalized='PL'+body; r.context='EU VAT syntax backed by local NIP checksum'; r.boundary='VIES active VAT status and taxpayer registration are not checked.'; r.proves='PL VAT syntax and local NIP checksum'; r.fields = [['VAT display', r.normalized], ['Country prefix', 'PL'], ['NIP body', body], ['Checksum status', r.valid?'pass':'review']].concat(r.fields || []); if(!s.startsWith('PL')) r.warnings.push('No PL prefix was provided; normalized VAT display adds PL.'); if(r.valid) r.recommendations.push('Use VIES or official tax systems for live VAT activity status.'); return r; }

    function analyzeBankCode(raw){ const r=analyzeIbanNrb(raw); const nrb=normalizeIban(raw).nrb; if(/^\d{26}$/.test(nrb)){ const bank=nrb.slice(2,6), branch=nrb.slice(6,10); r.type='Polish bank code / NRB'; r.expected='Bank '+bank; r.context=(BANKS[bank]||'Unknown bank code')+' / branch '+branch; r.fields = [['Bank institution code', bank], ['Bank name', BANKS[bank] || 'Unknown bank code'], ['Branch / routing segment', branch], ['NRB control digits', nrb.slice(0,2)], ['Account segment', nrb.slice(10)]].concat(r.fields || []); r.steps.push(`Bank institution code: ${bank}`); r.steps.push(`Branch / routing segment: ${branch}`); r.proves='NRB/IBAN checksum and bank-code extraction'; } return r; }

    function analyzePeselShape(d) { return { valid: /^\d{11}$/.test(d), type: 'PESEL-shaped input' }; }

    function digits(v){return String(v||'').replace(/\D/g,'');}
    function hasLetters(v){return /[A-Za-z]/.test(String(v||''));}
    function allIndexes(v){return Array.from(String(v||''),(_,i)=>i);}
    function formatNip(d){return /^\d{10}$/.test(d)?`${d.slice(0,3)}-${d.slice(3,6)}-${d.slice(6,8)}-${d.slice(8)}`:'';}
    function escapeAttr(v){return String(v).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');}
    function setInput(workbench,value){ const input=workbench.primaryInput(); if(input){input.value=value; input.dispatchEvent(new Event('input',{bubbles:true}));}}
    function maskPolishNumber(value){ const s=String(value||''); if(s.length<=4)return s.replace(/.(?=.)/g,'*'); return s.slice(0,3)+'*'.repeat(Math.max(3,s.length-6))+s.slice(-3); }
    function maskIban(value){ const s=String(value||'').replace(/\s/g,''); if(s.length<=8)return maskPolishNumber(s); return s.slice(0,4)+' '+s.slice(4,8)+' **** **** **** '+s.slice(-4); }
    function maskPhone(value){ const d=digits(value); if(d.length<6)return maskPolishNumber(d); const national=d.startsWith('48')&&d.length===11?d.slice(2):d; return '+48 '+national.slice(0,3)+' *** '+national.slice(-3); }
    function maskPlate(value){ const s=String(value||'').toUpperCase().replace(/[^A-Z0-9]/g,''); return s.length>3?s.slice(0,2)+'***'+s.slice(-2):s; }
    function maskVat(value){ const s=String(value||'').toUpperCase().replace(/[^A-Z0-9]/g,''); return (s.startsWith('PL')?'PL':'PL') + maskPolishNumber(s.startsWith('PL')?s.slice(2):s); }

    function copySpecial(workbench, kind){ const map={json:workbench.form._polandJson, normalized:workbench.form._polandNormalized, masked:workbench.form._polandMasked, testcase:workbench.form._polandTestCase}; const value=map[kind]; if(!value){workbench.setMessage('Nothing to copy yet.','error');return;} copyText(value).then(()=>workbench.setMessage(kind==='json'?'Copied audit JSON.':kind==='masked'?'Copied masked value.':kind==='testcase'?'Copied test case.':'Copied normalized value.','success')); }
    function copyText(value){ if(navigator.clipboard&&navigator.clipboard.writeText)return navigator.clipboard.writeText(value); const el=document.createElement('textarea'); el.value=value; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el); return Promise.resolve(); }
    function publicJson(config,result){ return {kind:'poland-premium-suite', version:2, tool:config.title, valid:result.valid, type:result.type, input:result.input, normalized:result.normalized, masked:result.masked, expected:result.expected||null, provided:result.provided||null, context:result.context||null, proves:result.proves, boundary:result.boundary, fields:result.fields, diagnostics:result.diagnostics, warnings:result.warnings, recommendations:result.recommendations, generatedAt:new Date().toISOString()};}
    function testCaseText(config,result){ return JSON.stringify({ name: `${config.title} ${result.valid?'valid':'invalid'} fixture`, input: result.input, expectedValid: result.valid, normalized: result.normalized, masked: result.masked, type: result.type, notes: result.diagnostics.concat(result.warnings).concat(result.recommendations) }, null, 2); }

    function breakdownHtml(r){ const bad=new Set(r.problemIndexes||[]); const chars=Array.from(r.normalized||'').map((c,i)=>`<span class="${bad.has(i)?'is-problem':''}" title="Position ${i+1}"><b>${util.escapeHtml(c)}</b><em>${i+1}</em></span>`).join(''); return `<section class="poland-section-card"><div class="poland-section-title">Field Breakdown</div><div class="poland-token-row">${chars || '<p class="poland-muted">No normalized value yet.</p>'}</div><div class="poland-detail-grid"><div><span>Input</span><strong>${util.escapeHtml(r.input)}</strong></div><div><span>Normalized</span><strong>${util.escapeHtml(r.normalized||'n/a')}</strong></div><div><span>Masked</span><strong>${util.escapeHtml(r.masked||'n/a')}</strong></div><div><span>Boundary</span><strong>${util.escapeHtml(r.boundary||'Offline only')}</strong></div></div>${r.fields&&r.fields.length?'<div class="poland-field-table">'+r.fields.map(f=>`<div><span>${util.escapeHtml(f[0])}</span><strong>${util.escapeHtml(f[1])}</strong></div>`).join('')+'</div>':''}</section>`;}
    function qualityHtml(r){ const items=[].concat(r.warnings.map(w=>['Warning',w,'warn']),r.recommendations.map(w=>['Suggestion',w,'tip'])); if(items.length===0&&r.valid)items.push(['Status','No offline structural issues found.','ok']); return `<section class="poland-section-card"><div class="poland-section-title">Quality Notes</div><div class="poland-quality-list">${items.map(i=>`<article class="${i[2]}"><span>${util.escapeHtml(i[0])}</span><p>${util.escapeHtml(i[1])}</p></article>`).join('')}</div></section>`;}
    function debuggerHtml(r){ const steps = r.steps.length ? '<div class="poland-step-cards">' + r.steps.map((step,index)=>'<article><span>'+(index+1)+'</span><p>'+util.escapeHtml(step)+'</p></article>').join('') + '</div>' : ''; const diagnostics = r.diagnostics.length ? '<div class="poland-diagnostic-cards">' + r.diagnostics.map(s=>'<article>'+util.escapeHtml(s)+'</article>').join('') + '</div>' : '<p class="poland-muted">No offline structural issues found.</p>'; return '<section class="poland-section-card"><div class="poland-section-title">Debugger</div><div class="poland-detail-grid"><div><span>Expected</span><strong>'+util.escapeHtml(r.expected||'n/a')+'</strong></div><div><span>Provided</span><strong>'+util.escapeHtml(r.provided||'n/a')+'</strong></div><div><span>Status</span><strong class="'+(r.valid?'poland-ok':'poland-bad')+'">'+(r.valid?'Pass':'Review')+'</strong></div><div><span>Scope</span><strong>Offline structural check</strong></div></div>'+steps+diagnostics+'</section>';}
    function devHtml(config,r){ return `<section class="poland-section-card"><div class="poland-section-title">Developer Snapshot</div><pre class="poland-code"><code>${syntaxHighlightJson(publicJson(config,r))}</code></pre></section>`;}
    function batchHtml(rows){ const valid=rows.filter(r=>r.result.valid).length; const invalid=rows.length-valid; return `<div class="poland-batch-summary"><strong>${valid} valid</strong><strong>${invalid} need review</strong><span>${rows.length} total</span></div><div class="poland-batch-table">${rows.map(r=>`<div class="${r.result.valid?'pass':'fail'}"><span>#${r.index}</span><code>${util.escapeHtml(r.value)}</code><strong>${r.result.valid?'valid':'review'}</strong><em>${util.escapeHtml(r.result.normalized||'n/a')}</em></div>`).join('')}</div>`;}
    function syntaxHighlightJson(obj){ return util.escapeHtml(JSON.stringify(obj,null,2)).replace(/(&quot;[^&]*?&quot;)(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?/g,(m,s,c)=>s&&c?'<span class="poland-json-key">'+s+'</span>'+c:s?'<span class="poland-json-string">'+s+'</span>':/true|false/.test(m)?'<span class="poland-json-bool">'+m+'</span>':/null/.test(m)?'<span class="poland-json-null">'+m+'</span>':'<span class="poland-json-number">'+m+'</span>');}
    function addHistory(slug,value,label){ const all=readAllHistory(); const list=(all[slug]||[]).filter(i=>i.value!==value); list.unshift({value,label,at:Date.now()}); all[slug]=list.slice(0,MAX_HISTORY); localStorage.setItem(STORAGE_KEY,JSON.stringify(all)); }
    function readAllHistory(){ try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');}catch(e){return{};} }
    function renderHistory(workbench){ const sel=workbench.form.querySelector('[data-poland-history]'); if(!sel)return; const list=(readAllHistory()[workbench.form._polandSlug]||[]); sel.innerHTML=list.length?'<option value="">Choose recent input</option>'+list.map(i=>`<option value="${escapeAttr(i.value)}">${escapeAttr(i.label)} - ${escapeAttr(i.value.slice(0,44))}</option>`).join(''):'<option value="">No history yet</option>'; }
    function stage(label,state,note){return{label,state,note};} function card(label,value,state){return{label,value,state};}
    function fallbackUtilities(){ return { escapeHtml(value){ return String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); } }; }

    function injectStyles(){ if(document.getElementById('poland-suite-styles'))return; const style=document.createElement('style'); style.id='poland-suite-styles'; style.textContent=".poland-suite-workbench{--pl-accent:#9f1239;--pl-soft:#fff1f2;--pl-accent-strong:#be123c;--pl-green:#16a34a;--pl-bad:#dc2626;--pl-amber:#d97706}.poland-badge-row,.poland-detail-grid,.poland-summary-grid{display:flex;flex-wrap:wrap;gap:8px}.poland-badge-row{margin-top:16px}.poland-pill{font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.055em;padding:6px 11px;border-radius:999px;border:1px solid color-mix(in srgb,var(--pl-accent) 22%,var(--line));background:var(--surface-soft);color:var(--muted)}.poland-pill.active{color:var(--pl-accent-strong);border-color:color-mix(in srgb,var(--pl-accent) 36%,var(--line));background:var(--pl-soft)}.poland-select-field{min-width:220px}.poland-panel{margin-top:22px;display:flex;flex-direction:column;gap:18px}.poland-empty-state{border:1px dashed color-mix(in srgb,var(--pl-accent) 28%,var(--line));border-radius:10px;padding:24px;background:linear-gradient(135deg,var(--pl-soft),#fff);display:flex;align-items:center;gap:14px;color:var(--muted)}.poland-empty-icon{width:54px;height:54px;border-radius:16px;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,var(--pl-accent),var(--pl-accent-strong));font-weight:900}.poland-empty-state strong{color:var(--text);display:block;margin-bottom:4px}.poland-batch-card{border:1px solid var(--line);border-radius:10px;background:#fff;margin:16px 0;padding:0;overflow:hidden}.poland-batch-card summary{cursor:pointer;padding:14px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px;font-weight:900}.poland-batch-card summary em{font-style:normal;color:var(--muted);font-weight:700;font-size:.78rem}.poland-batch-card .field,.poland-batch-actions,.poland-batch-results{margin:0 16px 16px}.poland-batch-actions{display:flex;flex-wrap:wrap;gap:10px}.poland-batch-summary{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px}.poland-batch-summary>*{border:1px solid var(--line);border-radius:999px;padding:6px 10px;background:var(--surface-soft)}.poland-batch-table{display:grid;gap:6px}.poland-batch-table>div{display:grid;grid-template-columns:44px minmax(0,1fr) 80px minmax(0,1fr);gap:8px;align-items:center;border:1px solid var(--line);border-radius:8px;padding:8px}.poland-batch-table code,.poland-batch-table em{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.poland-batch-table .pass strong{color:var(--pl-green)}.poland-batch-table .fail strong{color:var(--pl-bad)}.poland-timeline{border:1px solid var(--line);border-radius:10px;padding:18px;background:#fff;overflow:hidden}.poland-timeline-track{height:3px;background:#e5e7eb;margin:16px 28px 0}.poland-timeline-track span{display:block;height:100%;max-width:100%;background:var(--pl-green)}.poland-timeline-steps{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:6px;margin-top:-13px}.poland-step{text-align:center;color:var(--muted);min-width:0}.poland-step span{width:24px;height:24px;border-radius:999px;display:block;margin:0 auto 9px;background:#d1d5db;border:4px solid #fff;box-shadow:0 0 0 1px var(--line)}.poland-step.pass span{background:var(--pl-green);box-shadow:0 0 0 5px rgba(22,163,74,.12)}.poland-step.fail span{background:var(--pl-bad);box-shadow:0 0 0 5px rgba(220,38,38,.11)}.poland-step strong{display:block;font-size:.72rem;letter-spacing:.04em;text-transform:uppercase;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.poland-step em{display:block;font-size:.68rem;font-style:normal;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.poland-summary-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr))}.poland-summary-card{border:1px solid var(--line);border-radius:10px;background:#fff;padding:14px;min-width:0;overflow:hidden}.poland-summary-card span,.poland-detail-grid span,.poland-field-table span{display:block;color:var(--muted);font-size:.68rem;font-weight:800;letter-spacing:.07em;text-transform:uppercase;margin-bottom:6px}.poland-summary-card strong,.poland-detail-grid strong,.poland-field-table strong{display:block;max-width:100%;min-width:0;overflow-wrap:anywhere;word-break:break-word;line-height:1.28}.poland-summary-card.is-long strong{font-size:clamp(.72rem,1.3vw,.94rem)}.poland-summary-card.success strong,.poland-ok{color:var(--pl-green)}.poland-summary-card.error strong,.poland-bad{color:var(--pl-bad)}.poland-summary-card.mono strong{font-family:ui-monospace,SFMono-Regular,Menlo,monospace}.poland-section-card{border:1px solid var(--line);border-radius:10px;background:#fff;padding:16px;overflow:hidden}.poland-section-title{font-size:.82rem;font-weight:900;letter-spacing:.06em;text-transform:uppercase;border-bottom:1px solid var(--line);padding-bottom:10px;margin-bottom:12px}.poland-token-row{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}.poland-token-row span{border:1px solid var(--line);border-radius:8px;min-width:34px;padding:7px 8px;text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;background:var(--surface-soft)}.poland-token-row span.is-problem{border-color:rgba(220,38,38,.45);background:rgba(220,38,38,.08)}.poland-token-row b,.poland-token-row em{display:block}.poland-token-row em{font-style:normal;font-size:.58rem;color:var(--muted)}.poland-detail-grid,.poland-field-table{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}.poland-field-table{margin-top:10px}.poland-detail-grid>div,.poland-field-table>div{border:1px solid var(--line);border-radius:8px;padding:12px;min-width:0;overflow:hidden}.poland-quality-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.poland-quality-list article{border:1px solid var(--line);border-radius:8px;padding:12px;background:var(--surface-soft)}.poland-quality-list article.ok{border-color:rgba(22,163,74,.25);background:rgba(22,163,74,.06)}.poland-quality-list article.warn{border-color:rgba(217,119,6,.25);background:rgba(217,119,6,.06)}.poland-quality-list article.tip{border-color:rgba(37,99,235,.2);background:rgba(37,99,235,.05)}.poland-quality-list span{font-size:.68rem;font-weight:900;letter-spacing:.07em;text-transform:uppercase;color:var(--muted)}.poland-quality-list p{margin:.35rem 0 0;color:var(--text)}.poland-step-cards,.poland-diagnostic-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:8px;margin-top:12px}.poland-step-cards article,.poland-diagnostic-cards article{display:grid;grid-template-columns:28px minmax(0,1fr);gap:10px;align-items:start;border:1px solid var(--line);border-radius:10px;background:var(--surface-soft);padding:10px}.poland-step-cards article span{display:grid;place-items:center;width:24px;height:24px;border-radius:999px;background:var(--pl-soft);color:var(--pl-accent-strong);font-size:.72rem;font-weight:900}.poland-step-cards p{margin:0;color:var(--muted);font-size:.8rem;line-height:1.4;overflow-wrap:anywhere}.poland-diagnostic-cards article{grid-template-columns:1fr;border-color:rgba(220,38,38,.25);background:rgba(220,38,38,.05);color:#991b1b;font-size:.84rem}.poland-muted{color:var(--muted)}.poland-code{margin:0;overflow:auto;padding:14px;border-radius:8px;background:#0f172a;color:#dbeafe;font-size:.78rem}.poland-json-key{color:#93c5fd}.poland-json-string{color:#86efac}.poland-json-number{color:#fbbf24}.poland-json-bool{color:#f0abfc}.poland-json-null{color:#cbd5e1}@media(max-width:800px){.poland-summary-grid,.poland-detail-grid,.poland-field-table,.poland-quality-list{grid-template-columns:1fr}.poland-timeline-track{display:none}.poland-timeline-steps{grid-template-columns:repeat(3,minmax(0,1fr));margin-top:0;row-gap:14px}.poland-step strong,.poland-step em{white-space:normal}.poland-empty-state{align-items:flex-start}.poland-batch-card summary{align-items:flex-start;flex-direction:column}.poland-batch-table>div{grid-template-columns:36px minmax(0,1fr);}.poland-batch-table em{grid-column:2}.poland-step-cards,.poland-diagnostic-cards{grid-template-columns:1fr}}"; document.head.appendChild(style); }

    return { filePrefix:'poland-suite', onMount, run, applySample, detectInputMode };
  })(window.ValidoWorkbench || { utilities: {} });

  if (window.ValidoWorkbench) window.ValidoWorkbench.registerPlugin(ALGORITHM_ID, Plugin);
})();
