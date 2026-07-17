(function () {
  'use strict';

  const ALGORITHM_ID = 'validohub.poland-baseline';
  const STORAGE_KEY = 'validohub.polandBaseline.history.v1';
  const MAX_HISTORY = 12;
  const MAX_BATCH = 200;
  const THEMES = {
    finance: ['#0f766e', '#ecfdf5', '#14b8a6'],
    identity: ['#1d4ed8', '#eff6ff', '#2563eb'],
    business: ['#7c3aed', '#f5f3ff', '#8b5cf6'],
    logistics: ['#b45309', '#fffbeb', '#f59e0b'],
    data: ['#be123c', '#fff1f2', '#e11d48']
  };

  const TOOLS = {
    'poland-ksef-invoice-xml-validator': tool('KSeF Invoice XML Validator','KSeF invoice XML','finance','xml-ksef','Inspect Polish KSeF invoice XML structure, invoice fields, and offline readiness before official gateway checks.','<Faktura><Naglowek><KodFormularza>FA</KodFormularza></Naglowek><Podmiot1><DaneIdentyfikacyjne><NIP>5260001246</NIP></DaneIdentyfikacyjne></Podmiot1><Fa><P_1>2026-01-15</P_1><P_2>FV/2026/001</P_2><KodWaluty>PLN</KodWaluty></Fa></Faktura>',['KSeF XML','Invoice fields','NIP hints','Offline gateway prep','No submission']),
    'poland-jpk-file-validator': tool('JPK File Validator','JPK XML','finance','xml-jpk','Inspect Polish JPK XML structure, tax document markers, periods, and common file-readiness issues.','<JPK><Naglowek><KodFormularza>JPK_V7M</KodFormularza><DataWytworzeniaJPK>2026-01-31</DataWytworzeniaJPK></Naglowek><Podmiot1><NIP>5260001246</NIP></Podmiot1></JPK>',['JPK XML','Tax period','NIP hints','Schema boundary','Offline only']),
    'poland-split-payment-helper': tool('Polish Split Payment / MPP Helper','split-payment details','finance','split-payment','Build and audit Polish split-payment transfer data: VAT amount, supplier NIP, invoice reference, and title boundaries.','Amount: 1230,00 PLN\nVAT: 230,00 PLN\nSupplier NIP: 5260001246\nInvoice: FV/2026/001\nTitle: split payment for January services',['MPP','VAT amount','Supplier NIP','Invoice reference','Transfer title']),
    'poland-pkd-code-inspector': tool('PKD Code Inspector','PKD code','business','pkd','Normalize and inspect Polish PKD classification codes with hierarchy and migration notes.','62.01.Z',['PKD','Classification','Section hint','Hierarchy','Registry boundary']),
    'poland-pkwiu-code-inspector': tool('PKWiU Code Inspector','PKWiU code','business','pkwiu','Validate Polish PKWiU syntax locally and explain hierarchical catalogue segments.','62.01.11.0',['PKWiU','Segments','Catalogue key','Hierarchy','Offline syntax']),
    'poland-bdo-number-inspector': tool('BDO Number Inspector','BDO number','identity','bdo','Inspect Polish BDO number formatting, masking, batch lists, and offline data-quality boundaries.','000123456',['BDO','Register number','9 digits','Masked logs','Status boundary']),
    'poland-ceidg-readiness-checker': tool('CEIDG Data Readiness Checker','CEIDG company record','business','company','Audit CEIDG-style company data before registry workflows without official lookup.','Name: Jan Kowalski Studio\nNIP: 5260001246\nREGON: 012345678\nPKD: 62.01.Z\nAddress: ul. Prosta 1, 00-001 Warszawa',['CEIDG prep','NIP / REGON','PKD','Address','No lookup']),
    'poland-company-onboarding-auditor': tool('Polish Company Onboarding Auditor','company onboarding record','business','company','Run a local onboarding checklist for Polish company records: NIP, REGON, KRS, IBAN, address, VAT and evidence fields.','Company: Valido Sp. z o.o.\nNIP 5260001246\nREGON 012345678\nKRS 0000123456\nIBAN PL61109010140000071219812874\nAddress 00-001 Warszawa',['Onboarding','Company KYC','NIP / REGON / KRS','IBAN','Evidence']),
    'poland-invoice-data-auditor': tool('Polish Invoice Data Auditor','invoice data','finance','invoice-data','Inspect Polish invoice snippets for numbering, dates, VAT rates, buyer/seller identifiers, amounts, and consistency risks.','Invoice FV/2026/001\nDate: 2026-01-15\nSeller NIP: 5260001246\nBuyer NIP: 5252248481\nNet 1000.00 VAT 23% Gross 1230.00 PLN',['Invoice QA','VAT math','Seller / buyer','Amount check','Audit JSON']),
    'poland-receipt-paragon-helper': tool('Polish Receipt / Paragon Helper','receipt data','finance','receipt','Check Polish fiscal receipt snippets: NIP-on-receipt readiness, amounts, VAT lines, and audit-safe notes.','PARAGON\nNIP nabywcy: 5252248481\nPTU A 23% 18,70\nSUMA PLN 100,00\nData: 2026-01-15',['Paragon','NIP on receipt','VAT line','Fiscal data','Boundary']),
    'poland-transfer-title-builder': tool('Polish Transfer Title Builder','transfer title','finance','transfer-title','Create and validate clean Polish bank transfer titles for invoices, taxes, deposits, payroll, and internal references.','FV/2026/001 payment for January consulting, NIP 5260001246',['Transfer title','Length','References','Safe text','Banking UX']),
    'poland-payment-qr-generator': tool('Polish Payment QR Generator','payment details','finance','payment-qr','Generate an offline payment QR payload from Polish transfer data and inspect IBAN, amount, recipient, and remittance fields.','Recipient: Valido Sp. z o.o.\nIBAN: PL61109010140000071219812874\nAmount: 123.45\nTitle: FV/2026/001\nReference: 2026-001',['Payment QR','IBAN','Amount','Offline SVG','Scan boundary']),
    'poland-bank-statement-parser': tool('Polish Bank Statement Parser','bank statement rows','finance','statement','Parse pasted Polish bank statement rows locally, detect dates, amounts, IBANs, references, and export an audit summary.','2026-01-15;FV/2026/001;PL61109010140000071219812874;-123.45 PLN\n2026-01-16;Salary;PL27114020040000300201355387;4500.00 PLN',['Statement','Rows','Amounts','IBANs','CSV-ish']),
    'poland-postal-address-parser-pro': tool('Polish Postal Address Parser Pro','postal address','business','address','Parse and normalize Polish postal addresses with street, building, apartment, postal code, city, and voivodeship hints.','ul. Marszałkowska 10/15, 00-590 Warszawa, mazowieckie',['Address','Postal code','Street parts','City hint','Masking']),
    'poland-teryt-hierarchy-explorer': tool('TERYT Hierarchy Explorer','TERYT hierarchy code','business','teryt','Inspect Polish TERYT hierarchy-shaped codes and explain voivodeship, county, municipality, SIMC, and ULIC segments.','1465011',['TERYT','Hierarchy','Voivodeship','County / gmina','Import key']),
    'poland-municipality-code-inspector': tool('Polish Municipality / Voivodeship Code Inspector','municipality or voivodeship code','business','municipality','Inspect Polish local-government code shapes, voivodeship prefixes, municipality levels, and offline hierarchy readiness.','146501',['Municipality','Voivodeship','Local code','Hierarchy','No registry']),
    'poland-mrz-passport-id-parser': tool('Polish MRZ Passport / ID Parser','MRZ lines','identity','mrz','Parse Polish passport or ID MRZ lines locally, verify MRZ check digits where possible, and expose travel-document fields safely.','P<POLKOWALSKI<<JAN<<<<<<<<<<<<<<<<<<<<<<<<\nAA123456<7POL9208261M3001019<<<<<<<<<<<<<<06',['MRZ','Passport / ID','Check digits','Parsed fields','Privacy safe']),
    'poland-passport-number-inspector': tool('Polish Passport Number Inspector','passport number','identity','passport','Normalize and inspect Polish passport-number style input locally with masking, batch checks, and document-boundary warnings.','AA1234567',['Passport','Series + digits','Masked logs','Batch','Status boundary']),
    'poland-driving-licence-inspector': tool('Polish Driving Licence Inspector','driving licence data','identity','driving','Inspect Polish driving-licence style numbers and record snippets locally, including dates, categories, and privacy-safe masking.','PL/123456/2026\nCategories: B, AM\nIssued: 2026-01-15\nExpires: 2041-01-15',['Driving licence','Categories','Dates','Document QA','No lookup']),
    'poland-vehicle-registration-certificate-helper': tool('Polish Vehicle Registration Certificate Helper','vehicle registration record','identity','vehicle-doc','Inspect Polish vehicle-registration certificate snippets locally, including plate, VIN, document number, dates, and data-quality notes.','Plate: WX12345\nVIN: WVGZZZ1TZFW123456\nDocument: DR/ABC123456\nFirst registration: 2020-05-12',['Vehicle doc','Plate','VIN','Dates','Certificate QA']),
    'poland-insurance-policy-number-helper': tool('Polish Insurance / Policy Number Helper','insurance policy data','finance','policy','Audit Polish insurance policy references locally, detect dates, vehicle or person identifiers, and produce masked support-safe summaries.','Policy: OC/2026/00012345\nPlate: WX12345\nVIN: WVGZZZ1TZFW123456\nValid from 2026-01-01 to 2026-12-31',['Insurance','Policy number','Vehicle link','Coverage dates','No status lookup']),
    'poland-parcel-tracking-inspector': tool('Polish Parcel / Tracking Number Inspector','parcel tracking number','logistics','parcel','Inspect Polish parcel tracking numbers locally, detect common courier-like shapes, mask IDs, and prepare support-safe diagnostics.','PL123456789012345678\n5901234123456789012345',['Parcel','Tracking','Support safe','Batch','Carrier boundary']),
    'poland-energy-meter-ppe-inspector': tool('Polish Energy Meter / PPE Number Inspector','PPE energy meter code','identity','ppe','Inspect Polish PPE energy-meter point identifiers locally, normalize long codes, mask safely, and explain offline confidence.','PL003712345678901234',['PPE','Energy meter','Long code','Masked logs','Utility boundary']),
    'poland-vies-readiness-helper': tool('Polish VIES Readiness Helper','VAT payload','business','vies-readiness','Prepare and inspect offline VAT payload readiness for VIES checks: country prefix, VAT number shape, and optional company context.','Country: PL\nVAT: PL5260001246\nCompany: Valido Sp z o.o.\nAddress: Warszawa',['VIES prep','VAT payload','No lookup','EU context','Offline only']),
    'poland-upo-edeklaracje-payload-checker': tool('Polish UPO / e-Deklaracje Payload Checker','e-Deklaracje payload','finance','upo-payload','Validate local payload readiness for UPO and e-Deklaracje workflows without submission: identifiers, form code, period, and contact fields.','Form: PIT-37\nPeriod: 2026\nNIP: 5260001246\nEmail: ksi@gov.example\nOffice: 1471',['UPO prep','e-Deklaracje','Payload','No submit','Offline only']),
    'poland-ksef-fa2-field-mapper-assistant': tool('Polish KSeF FA(2) Field Mapper Assistant','FA(2) fields','finance','ksef-fa2-mapper','Map invoice snippets against common KSeF FA(2) field expectations and highlight missing key fields before schema validation.','<Faktura><Fa><P_1>2026-01-15</P_1><P_2>FV/2026/001</P_2><P_13_1>1000.00</P_13_1><KodWaluty>PLN</KodWaluty></Fa><Podmiot1><DaneIdentyfikacyjne><NIP>5260001246</NIP></DaneIdentyfikacyjne></Podmiot1></Faktura>',['KSeF FA2','Field map','Missing fields','No submission','Offline prep']),
    'poland-payroll-net-gross-sanity-helper': tool('Polish Payroll Net/Gross Sanity Helper','payroll record','finance','payroll-sanity','Run a local payroll sanity check for gross, net, taxes, and deductions with consistency diagnostics for onboarding and QA.','Employee: Jan Kowalski\nGross: 10000.00 PLN\nNet: 7180.00 PLN\nTax: 1200.00 PLN\nSocial: 1620.00 PLN',['Payroll','Net vs gross','Deductions','QA helper','Offline only']),
    'poland-bank-transfer-reconciliation-helper': tool('Polish Bank Transfer Reconciliation Helper','transfer rows','finance','transfer-reconcile','Reconcile pasted transfer rows locally against references and amounts to detect likely unmatched or duplicate entries.','2026-01-10;FV/2026/001;-1230.00 PLN\n2026-01-11;FV/2026/002;-615.00 PLN\n2026-01-12;FV/2026/003;-500.00 PLN',['Reconciliation','Duplicates','Reference match','Amounts','Offline only']),
    'poland-iban-owner-name-precheck': tool('Polish IBAN Owner-Name Precheck','IBAN owner payload','finance','iban-owner-precheck','Perform a local pre-check of IBAN shape and recipient-name consistency hints before manual banking verification.','Owner: Valido Sp z o.o.\nIBAN: PL61109010140000071219812874\nTitle: FV/2026/001 payment to Valido',['IBAN','Owner name','Pre-check','No bank lookup','Offline only']),
    'poland-address-transliteration-normalizer': tool('Polish Address Transliteration & Normalization','Polish address text','business','address-transliteration','Normalize and transliterate Polish address text into ASCII-safe variants for integrations that reject diacritics.','ul. Zolnierska 15/7, 80-001 Gdansk',['Address','Transliteration','ASCII variant','Normalization','Offline only']),
    'poland-ocr-postprocessing-fixer': tool('Polish OCR Post-Processing Fixer','OCR extracted text','data','ocr-fixer','Repair common OCR mistakes in Polish business and document snippets, then emit cleaned and masked output for workflows.','N1P: 526O001246\nREG0N: O12345678\nul. Pr0sta 1, OO-OO1 Warszawa',['OCR','Data cleanup','PL docs','Normalization','Offline only']),
    'poland-invoice-duplicate-risk-detector': tool('Polish Invoice Duplicate-Risk Detector','invoice lines','finance','invoice-duplicate-risk','Detect likely invoice duplicates and replay risk using invoice numbers, dates, parties, and amounts from pasted records.','FV/2026/001;2026-01-15;5260001246;1230.00 PLN\nFV/2026/002;2026-01-16;5252248481;615.00 PLN',['Invoice risk','Duplicates','Replay check','QA','Offline only']),
    'poland-compliance-checklist-generator': tool('Polish Compliance Checklist Generator','compliance context','business','compliance-checklist','Generate an exportable offline compliance checklist for Polish onboarding, invoicing, tax, and payment readiness scenarios.','Scenario: B2B onboarding\nNIP: 5260001246\nInvoice flow: KSeF\nPayment: SEPA + MPP',['Checklist','Compliance','Exportable JSON','Offline only','Readiness']),
    'poland-data-quality-workbench': tool('Polish Data Quality Workbench','Polish dataset','data','data-quality','Audit pasted Polish datasets locally for identifiers, addresses, phones, bank fields, missing values, duplicates, and privacy risks.','name,nip,regon,iban,postal\nValido,5260001246,012345678,PL61109010140000071219812874,00-001\nDemo,1234563218,,PL27114020040000300201355387,31-001',['Data quality','PII patterns','Duplicates','Missing values','Import QA'])
  };

  function edgeFixtureForKind(kind) {
    const map = {
      'transfer-reconcile': '2026-01-10;FV/2026/001;-1230.00 PLN\n2026-01-10;FV/2026/001;-1230.00 PLN',
      'invoice-duplicate-risk': 'FV/2026/001;2026-01-15;1234563218;1230.00 PLN\nFV/2026/001;2026-01-15;1234563218;1230.00 PLN',
      'compliance-checklist': 'Scenario: onboarding',
      'data-quality': 'name,nip\nMissing,'
    };
    return map[kind] || 'invalid / incomplete sample';
  }

  function tool(title, label, theme, kind, summary, sample, badges) {
    return { title, label, theme, kind, summary, sample, samples: [sample, edgeFixtureForKind(kind), 'invalid / incomplete sample'], badges };
  }

  const Plugin = (function (framework) {
    const util = framework.utilities || { escapeHtml: escapeHtml };

    function currentSlug() {
      return window.location.pathname.split('/').filter(Boolean).pop() || 'poland-data-quality-workbench';
    }

    function onMount(workbench) {
      injectStyles();
      const config = TOOLS[currentSlug()] || TOOLS['poland-data-quality-workbench'];
      workbench.form._plbConfig = config;
      workbench.form._plbSlug = currentSlug();
      workbench.form.classList.add('poland-baseline-workbench');
      applyTheme(workbench, config);
      addToolHeader(workbench, config);
      enhanceIntro(config);
      normalizeControls(workbench, config);
      addControls(workbench, config);
      addPanels(workbench, config);
      bindEvents(workbench, config);
      renderEmpty(workbench, config);
      hydrateFromQuery(workbench);
      workbench.updateBadge();
    }

    function run(workbench, action, options) {
      options = options || {};
      const config = workbench.form._plbConfig || TOOLS[currentSlug()] || TOOLS['poland-data-quality-workbench'];
      if (action === 'generate') {
        setInput(workbench, generateFor(config));
        workbench.markActiveAction('validate');
        return run(workbench, 'validate', options);
      }
      const input = workbench.primaryInput();
      const raw = input ? input.value.trim() : '';
      if (!raw) {
        renderEmpty(workbench, config);
        workbench.setOutput('');
        workbench.lastResult = null;
        workbench.setMessage('Paste input or generate a safe fixture.', 'error');
        return;
      }
      const result = analyze(config, raw);
      addHistory(workbench.form._plbSlug, raw, result.type);
      renderResult(workbench, config, result);
      const pretty = JSON.stringify(result.audit, null, 2);
      workbench.setOutput(pretty);
      workbench.lastResult = { type: 'application/json', extension: 'json', content: pretty };
      workbench.form._plbNormalized = result.normalized;
      workbench.form._plbMasked = result.masked;
      workbench.form._plbJson = pretty;
      workbench.form._plbQrSvg = result.qrSvg || '';
      workbench.setMessage(result.valid ? config.title + ' passed offline checks.' : config.title + ' needs review.', result.valid ? 'success' : 'error');
      renderHistory(workbench);
      if (!options.quiet) workbench.updateBadge();
    }

    function detectInputMode(value) {
      const config = TOOLS[currentSlug()] || TOOLS['poland-data-quality-workbench'];
      if (!String(value || '').trim()) return { label: 'Waiting for ' + config.label, state: '' };
      const result = analyze(config, value);
      return { label: result.valid ? 'Looks ready: ' + result.type : 'Needs review: ' + result.type, state: result.valid ? 'text' : 'invalid' };
    }

    function applySample(workbench, id) {
      const config = workbench.form._plbConfig || TOOLS[currentSlug()] || TOOLS['poland-data-quality-workbench'];
      const sample = config.samples[Number(id)] || config.sample;
      setInput(workbench, sample);
      run(workbench, 'validate');
    }

    function addToolHeader(workbench, config) {
      if (workbench.form.querySelector('[data-plb-tool-head]')) return;
      const chips = (config.samples || []).slice(0, 3).map(function(sample, index) { return '<button type="button" data-plb-header-sample="' + index + '">' + util.escapeHtml(labelForSample(sample)) + '</button>'; }).join('');
      const options = (config.samples || []).map(function(sample, index) { return '<option value="' + index + '">' + escapeAttr(labelForSample(sample)) + '</option>'; }).join('');
      const head = document.createElement('section');
      head.className = 'plb-tool-head';
      head.setAttribute('data-plb-tool-head', '');
      head.innerHTML = '<div class="plb-tool-identity"><span class="plb-tool-mark">' + util.escapeHtml(config.label || 'PL') + '</span><div><strong>' + util.escapeHtml(config.title) + '</strong><small>' + util.escapeHtml(config.summary) + '</small></div></div><div class="plb-tool-presets"><label><span>Smart presets</span><select data-plb-preset><option value="">Choose a sample</option>' + options + '</select></label><label><span>Recent local inputs</span><select data-plb-history><option value="">No history yet</option></select></label><div class="plb-tool-samples">' + chips + '</div></div>';
      workbench.form.insertBefore(head, workbench.form.firstChild);
    }

    function enhanceIntro(config) {
      const intro = document.querySelector('.page-intro');
      if (!intro) return;
      const h1 = intro.querySelector('h1');
      const p = intro.querySelector('p');
      if (h1) h1.textContent = config.title;
      if (p) p.textContent = config.summary;
      let row = intro.querySelector('.plb-badge-row');
      if (!row) {
        row = document.createElement('div');
        row.className = 'plb-badge-row';
        intro.appendChild(row);
      }
      row.innerHTML = config.badges.map((b, i) => '<span class="' + (i === 0 ? 'active' : '') + '">' + util.escapeHtml(b) + '</span>').join('');
    }

    function applyTheme(workbench, config) {
      const theme = THEMES[config.theme] || THEMES.data;
      workbench.form.style.setProperty('--plb', theme[0]);
      workbench.form.style.setProperty('--plb-soft', theme[1]);
      workbench.form.style.setProperty('--plb-strong', theme[2]);
    }

    function normalizeControls(workbench, config) {
      const heading = workbench.form.querySelector('.workbench-form-heading h3');
      if (heading) heading.textContent = config.title;
      let input = workbench.primaryInput();
      if (input) {
        if (input.tagName === 'INPUT') {
          const area = document.createElement('textarea');
          area.name = input.name || 'input';
          area.rows = 4;
          area.className = input.className;
          area.placeholder = input.placeholder || '';
          area.value = input.value || '';
          area.autocomplete = 'off';
          area.spellcheck = false;
          input.parentNode.replaceChild(area, input);
          input = area;
        }
        input.placeholder = 'Paste ' + config.label + ' or choose a preset';
        input.autocomplete = 'off';
        input.spellcheck = false;
        if (input.closest('.field')) input.closest('.field').style.gridColumn = '1 / -1';
      }
      const outputField = workbench.form.querySelector('.output-field');
      if (outputField) outputField.style.display = 'none';
      const advanced = workbench.form.querySelector('[data-advanced-panel]');
      if (advanced) advanced.style.display = 'none';
      const row = workbench.form.querySelector('.button-row');
      if (row && !row.querySelector('[data-plb-copy]')) {
        const qrButton = config.kind === 'payment-qr' ? '<button type="button" class="button button-secondary" data-plb-copy="qr">Copy QR SVG</button>' : '';
        row.insertAdjacentHTML('beforeend', '<button type="button" class="button button-secondary" data-plb-copy="normalized">Copy normalized</button><button type="button" class="button button-secondary" data-plb-copy="masked">Copy masked</button><button type="button" class="button button-secondary" data-plb-copy="json">Copy audit JSON</button>' + qrButton);
      }
    }

    function addControls(workbench, config) {
      const grid = workbench.form.querySelector('.field-grid');
      if (!grid) return;
      if (!workbench.form.querySelector('[data-plb-preset]')) {
        const options = config.samples.map((sample, index) => '<option value="' + index + '">' + escapeAttr(labelForSample(sample)) + '</option>').join('');
        grid.insertAdjacentHTML('afterbegin', '<label class="field plb-select"><span>Smart presets</span><select data-plb-preset><option value="">Choose a sample</option>' + options + '</select><small>Realistic local samples for this exact tool.</small></label><label class="field plb-select"><span>Recent local inputs</span><select data-plb-history><option value="">No history yet</option></select><small>Stored only in this browser.</small></label>');
      }
      grid.insertAdjacentHTML('afterend', '<details class="plb-batch" data-plb-batch><summary><strong>Batch review</strong><span>Up to ' + MAX_BATCH + ' rows, offline</span></summary><label class="field"><span>Batch input</span><textarea rows="5" data-plb-batch-input placeholder="Paste one record per line"></textarea></label><div class="plb-actions"><button type="button" class="button button-secondary" data-plb-batch-run>Run batch</button><button type="button" class="button button-secondary" data-plb-batch-copy>Copy batch JSON</button></div><div data-plb-batch-results></div></details>');
      renderHistory(workbench);
    }

    function addPanels(workbench) {
      const feedback = workbench.form.querySelector('[data-tool-feedback]');
      if (!feedback || workbench.form.querySelector('[data-plb-panel]')) return;
      feedback.insertAdjacentHTML('afterend', '<section class="plb-panel" data-plb-panel><div class="plb-empty" data-plb-empty><strong>Paste Polish workflow data or generate a safe fixture.</strong><p>Everything runs in this browser. Official registry status, bank ownership, gateway submission, delivery status, and legal acceptance are deliberately out of scope.</p></div><div data-plb-pipeline></div><div data-plb-summary></div><div data-plb-breakdown></div><div data-plb-special></div><div data-plb-quality></div><div data-plb-dev></div></section>');
    }

    function bindEvents(workbench) {
      const preset = workbench.form.querySelector('[data-plb-preset]');
      if (preset) preset.addEventListener('change', function () { if (preset.value !== '') applySample(workbench, preset.value); });
      const history = workbench.form.querySelector('[data-plb-history]');
      if (history) history.addEventListener('change', function () { if (history.value) { setInput(workbench, history.value); run(workbench, 'validate'); } });
      workbench.form.addEventListener('click', function (event) {
        const sample = event.target.closest('[data-plb-header-sample]');
        if (sample) applySample(workbench, sample.dataset.plbHeaderSample);
        const copy = event.target.closest('[data-plb-copy]');
        if (copy) copySpecial(workbench, copy.dataset.plbCopy);
        if (event.target.closest('[data-plb-batch-run]')) runBatch(workbench);
        if (event.target.closest('[data-plb-batch-copy]')) copyBatch(workbench);
      });
    }

    function hydrateFromQuery(workbench) {
      const value = new URLSearchParams(window.location.search).get('value');
      if (value) {
        setInput(workbench, value);
        run(workbench, 'validate', { quiet: true });
      }
    }

    function renderEmpty(workbench, config) {
      clearPanels(workbench);
      const empty = workbench.form.querySelector('[data-plb-empty]');
      if (empty) empty.style.display = 'block';
      renderPipeline(workbench, config, [step('Input','idle','Waiting'), step('Normalize','idle','Clean'), step('Analyze','idle', config.label), step('Boundary','idle','Offline only')]);
    }

    function renderResult(workbench, config, result) {
      clearPanels(workbench);
      renderPipeline(workbench, config, result.steps);
      renderSummary(workbench, result);
      renderBreakdown(workbench, result);
      renderSpecial(workbench, result);
      renderQuality(workbench, result);
      renderDev(workbench, result);
    }

    function clearPanels(workbench) {
      ['[data-plb-pipeline]','[data-plb-summary]','[data-plb-breakdown]','[data-plb-special]','[data-plb-quality]','[data-plb-dev]'].forEach(function (selector) {
        const el = workbench.form.querySelector(selector);
        if (el) el.innerHTML = '';
      });
      const empty = workbench.form.querySelector('[data-plb-empty]');
      if (empty) empty.style.display = 'none';
    }

    function renderPipeline(workbench, config, steps) {
      const target = workbench.form.querySelector('[data-plb-pipeline]');
      if (!target) return;
      const passed = steps.filter(s => s.state === 'pass').length;
      const width = Math.round((passed / Math.max(steps.length, 1)) * 100);
      target.innerHTML = '<section class="plb-card plb-pipeline"><h4><span>◎</span> Validation pipeline</h4><div class="plb-track"><span style="width:' + width + '%"></span></div><div class="plb-steps">' + steps.map(s => '<article class="' + s.state + '"><div><strong>' + util.escapeHtml(s.label) + '</strong><span>' + util.escapeHtml(s.state) + '</span></div><p>' + util.escapeHtml(s.note) + '</p></article>').join('') + '</div></section>';
    }

    function renderSummary(workbench, result) {
      const target = workbench.form.querySelector('[data-plb-summary]');
      if (!target) return;
      const cards = [
        ['Input characters', String(result.input.length)],
        ['Normalized', result.normalized || 'n/a'],
        ['Masked', result.masked || 'n/a'],
        ['Confidence', result.confidence]
      ];
      target.innerHTML = '<section class="plb-results ' + (result.valid ? '' : 'error') + '"><div class="plb-results-header"><span>' + (result.valid ? '✓' : '!') + '</span><div><strong>' + util.escapeHtml(result.message) + '</strong><em>' + util.escapeHtml(result.type) + '</em></div></div><div class="plb-results-grid">' + cards.map(c => '<article class="' + (String(c[1]).length > 18 ? 'is-long' : '') + '"><span>' + util.escapeHtml(c[0]) + '</span><strong>' + util.escapeHtml(c[1]) + '</strong></article>').join('') + '</div><div class="plb-result-checks">' + result.diagnostics.slice(0, 5).map(d => '<p><span>' + (d.level === 'ok' ? '✓' : d.level === 'warn' ? '!' : '×') + '</span>' + util.escapeHtml(d.text) + '</p>').join('') + '</div></section>';
    }

    function renderBreakdown(workbench, result) {
      const target = workbench.form.querySelector('[data-plb-breakdown]');
      if (!target) return;
      const tokens = tokenise(result.normalized || result.input);
      target.innerHTML = '<section class="plb-card"><h4><span>▦</span> Identifier breakdown</h4><div class="plb-token-row">' + tokens.map((t, i) => '<span class="tone-' + (i % 6) + '"><b>' + util.escapeHtml(t.value) + '</b><em>' + util.escapeHtml(t.label) + '</em></span>').join('') + '</div><div class="plb-fields">' + result.fields.map(f => '<div><span>' + util.escapeHtml(f[0]) + '</span><strong>' + util.escapeHtml(f[1]) + '</strong></div>').join('') + '</div></section>';
    }

    function renderSpecial(workbench, result) {
      const target = workbench.form.querySelector('[data-plb-special]');
      if (!target || (!result.tableRows.length && !result.qrSvg)) return;
      let html = '<section class="plb-card"><h4><span>▣</span> Domain workbench</h4>';
      if (result.qrSvg) html += '<div class="plb-qr-wrap"><div class="plb-qr">' + result.qrSvg + '</div><div><strong>Offline QR payload</strong><p>Generated from local transfer data only. Scan behavior depends on the banking app and final payment confirmation.</p><button type="button" class="button button-secondary" data-plb-copy="qr">Copy QR SVG</button></div></div>';
      if (result.tableRows.length) html += '<div class="plb-table-wrap"><table class="plb-table"><tbody>' + result.tableRows.map(r => '<tr>' + r.map(c => '<td>' + util.escapeHtml(c) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
      html += '</section>';
      target.innerHTML = html;
    }

    function renderQuality(workbench, result) {
      const target = workbench.form.querySelector('[data-plb-quality]');
      if (!target) return;
      const items = result.diagnostics.concat(result.warnings.map(w => ({ level: 'warn', text: w }))).concat(result.recommendations.map(r => ({ level: 'ok', text: r })));
      target.innerHTML = '<section class="plb-card"><h4><span>✦</span> Premium analysis</h4><div class="plb-quality-list">' + items.map(item => '<article class="' + (item.level === 'ok' ? 'ok' : item.level === 'warn' ? 'warn' : 'bad') + '"><strong>' + (item.level === 'ok' ? 'Pass' : item.level === 'warn' ? 'Review' : 'Issue') + '</strong><p>' + util.escapeHtml(item.text) + '</p></article>').join('') + '</div></section>';
    }

    function renderDev(workbench, result) {
      const target = workbench.form.querySelector('[data-plb-dev]');
      if (!target) return;
      target.innerHTML = '<section class="plb-card"><h4><span>⌘</span> Advanced analysis</h4><details class="plb-dev-accordion" open><summary>Validation pipeline logs</summary><div class="plb-dev-content"><button type="button" class="plb-dev-copy" data-plb-copy="json">Copy</button><pre class="plb-code">' + syntaxJson(result.audit) + '</pre></div></details><details class="plb-dev-accordion"><summary>Offline boundary</summary><div class="plb-dev-content"><p>' + util.escapeHtml(result.boundary) + '</p></div></details></section>';
    }

    function analyze(config, raw) {
      const input = String(raw || '').trim();
      let result;
      switch (config.kind) {
        case 'xml-ksef': result = analyzeXml(input, 'Faktura', 'KSeF invoice XML'); break;
        case 'xml-jpk': result = analyzeXml(input, 'JPK', 'JPK XML'); break;
        case 'split-payment': result = analyzePaymentText(input, 'Split payment readiness'); break;
        case 'pkd': result = analyzeCode(input, 'PKD code', /^\d{2}(?:\.\d{2})?(?:\.[A-Z])?$/i, ['section','class','letter']); break;
        case 'pkwiu': result = analyzeCode(input, 'PKWiU code', /^\d{2}(?:\.\d{2}){1,4}$/, ['section','division','group','class']); break;
        case 'bdo': result = analyzeCode(input, 'BDO number', /^\d{9}$/, ['number']); break;
        case 'company': result = analyzeCompany(input, config.title); break;
        case 'invoice-data': result = analyzeInvoiceData(input); break;
        case 'receipt': result = analyzeReceipt(input); break;
        case 'transfer-title': result = analyzeTransferTitle(input); break;
        case 'payment-qr': result = analyzePaymentQr(input); break;
        case 'statement': result = analyzeStatement(input); break;
        case 'address': result = analyzeAddress(input); break;
        case 'teryt': result = analyzeTeryt(input, 'TERYT hierarchy'); break;
        case 'municipality': result = analyzeTeryt(input, 'Municipality / voivodeship code'); break;
        case 'mrz': result = analyzeMrz(input); break;
        case 'passport': result = analyzeCode(input.toUpperCase().replace(/\s+/g, ''), 'Passport number', /^[A-Z]{2}\d{7}$/, ['series','serial']); break;
        case 'driving': result = analyzeDocumentSnippet(input, 'Driving licence record', ['category','issued','expires']); break;
        case 'vehicle-doc': result = analyzeVehicleDoc(input); break;
        case 'policy': result = analyzeDocumentSnippet(input, 'Insurance policy record', ['policy','validity','vehicle']); break;
        case 'parcel': result = analyzeParcel(input); break;
        case 'ppe': result = analyzeCode(input.toUpperCase().replace(/\s+/g, ''), 'PPE energy point', /^PL[A-Z0-9]{12,24}$/, ['country','code']); break;
        case 'vies-readiness': result = analyzeViesReadiness(input); break;
        case 'upo-payload': result = analyzeUpoPayload(input); break;
        case 'ksef-fa2-mapper': result = analyzeKsefFa2Mapper(input); break;
        case 'payroll-sanity': result = analyzePayrollSanity(input); break;
        case 'transfer-reconcile': result = analyzeTransferReconcile(input); break;
        case 'iban-owner-precheck': result = analyzeIbanOwnerPrecheck(input); break;
        case 'address-transliteration': result = analyzeAddressTransliteration(input); break;
        case 'ocr-fixer': result = analyzeOcrFixer(input); break;
        case 'invoice-duplicate-risk': result = analyzeInvoiceDuplicateRisk(input); break;
        case 'compliance-checklist': result = analyzeComplianceChecklist(input); break;
        case 'data-quality': result = analyzeDataQuality(input); break;
        default: result = makeResult(input, input, false, config.title, 'Generic Polish record');
      }
      result.audit = makeAudit(config, result);
      return result;
    }

    function makeResult(input, normalized, valid, message, type, extras) {
      extras = extras || {};
      const diagnostics = extras.diagnostics || [];
      if (!diagnostics.length) diagnostics.push({ level: valid ? 'ok' : 'error', text: valid ? 'Offline structural checks passed.' : 'Offline structural checks found issues.' });
      const result = {
        input,
        normalized: normalized || input,
        masked: extras.masked || maskGeneric(normalized || input),
        valid,
        message,
        type,
        confidence: extras.confidence || (valid ? 'High offline confidence' : 'Needs review'),
        fields: extras.fields || [],
        diagnostics,
        warnings: extras.warnings || [],
        recommendations: extras.recommendations || ['Keep official verification separate from local format checks.'],
        boundary: extras.boundary || 'This workbench does not perform official registry, bank, tax, court, utility, courier, or government lookups.',
        steps: extras.steps || defaultSteps(valid),
        tableRows: extras.tableRows || [],
        qrSvg: extras.qrSvg || ''
      };
      return result;
    }

    function defaultSteps(valid) {
      return [step('Input', 'pass', 'Input captured locally'), step('Normalize', 'pass', 'Whitespace and separators normalized'), step('Structure', valid ? 'pass' : 'fail', valid ? 'Expected shape found' : 'Expected shape was not found'), step('Boundary', 'pass', 'No network lookup performed')];
    }
    function step(label, state, note) { return { label, state, note }; }

    function analyzeXml(input, expectedRoot, type) {
      const fields = [];
      const diagnostics = [];
      const warnings = [];
      let valid = false;
      let normalized = input.replace(/>\s+</g, '><').trim();
      if (!/^\s*</.test(input)) diagnostics.push({ level:'error', text:'Input does not start like XML.' });
      try {
        const doc = new DOMParser().parseFromString(input, 'application/xml');
        const err = doc.querySelector('parsererror');
        if (err) diagnostics.push({ level:'error', text:'XML parser reported malformed markup.' });
        const root = doc.documentElement ? doc.documentElement.nodeName : 'n/a';
        const nip = textFrom(doc, 'NIP');
        const code = textFrom(doc, 'KodFormularza');
        const date = textFrom(doc, 'P_1') || textFrom(doc, 'DataWytworzeniaJPK');
        fields.push(['Root', root], ['Document marker', code || 'n/a'], ['NIP hint', nip || 'n/a'], ['Date hint', date || 'n/a'], ['Elements', String(doc.getElementsByTagName('*').length)]);
        valid = !err && root.toLowerCase().includes(expectedRoot.toLowerCase());
        diagnostics.push({ level: valid ? 'ok' : 'error', text: valid ? expectedRoot + ' root marker detected.' : 'Expected ' + expectedRoot + ' root marker was not detected.' });
        if (!nip) warnings.push('No NIP element was detected in common locations.');
      } catch (e) {
        diagnostics.push({ level:'error', text:'Could not parse XML in this browser.' });
      }
      return makeResult(input, normalized, valid, valid ? type + ' looks structurally ready.' : type + ' needs XML review.', type, { fields, diagnostics, warnings, masked: input.slice(0, 24) + '…', boundary:'This is local XML readiness only. It does not validate official schema versions or submit to KSeF/JPK gateways.' });
    }

    function textFrom(doc, tag) { const el = doc.getElementsByTagName(tag)[0]; return el ? el.textContent.trim() : ''; }

    function analyzeCode(input, type, regex, labels) {
      const normalized = input.toUpperCase().replace(/\s+/g, '').replace(/-/g, '.');
      const valid = regex.test(normalized);
      const parts = normalized.split('.');
      const fields = parts.map((part, index) => [labels[index] || ('Segment ' + (index + 1)), part]);
      if (type === 'BDO number') fields.splice(0, fields.length, ['Digits', normalized], ['Length', String(normalized.length)], ['Masked', maskDigits(normalized, 3, 2)]);
      return makeResult(input, normalized, valid, valid ? type + ' matches offline syntax.' : type + ' does not match expected syntax.', type, { fields, masked: type === 'BDO number' ? maskDigits(normalized, 3, 2) : normalized, diagnostics:[{ level: valid ? 'ok':'error', text: valid ? 'Syntax matches expected local pattern.' : 'Syntax does not match expected local pattern.' }], boundary:'This validates local shape only, not official classification, registration, or status.' });
    }

    function analyzePaymentText(input, type) {
      const amount = parseAmount(input);
      const vat = parseVat(input);
      const nip = (input.match(/\b\d{10}\b/) || [''])[0];
      const invoice = (input.match(/[A-Z]{1,4}[\/\-]\d{4}[^\s,]*/i) || [''])[0];
      const valid = Number.isFinite(amount) && Number.isFinite(vat) && nip.length === 10 && invoice;
      const fields = [['Amount', Number.isFinite(amount) ? formatPln(amount) : 'missing'], ['VAT amount', Number.isFinite(vat) ? formatPln(vat) : 'missing'], ['Supplier NIP', nip || 'missing'], ['Invoice', invoice || 'missing'], ['Payment title length', String(input.length)]];
      return makeResult(input, ['/VAT', Number.isFinite(vat) ? vat.toFixed(2) : '', '/IDC', nip, '/INV', invoice].filter(Boolean).join('/'), !!valid, valid ? type + ' is locally complete.' : type + ' needs required fields.', type, { fields, masked: maskPii(input), diagnostics: fields.map(f => ({ level: /missing/.test(f[1]) ? 'error':'ok', text: f[0] + ': ' + f[1] })), recommendations:['Keep VAT amount, supplier NIP, and invoice number explicit in payment notes.'], boundary:'The tool prepares MPP data locally; it does not execute or certify bank transfers.' });
    }

    function analyzeCompany(input, type) {
      const found = findCommon(input);
      const fields = [['NIP', found.nip || 'missing'], ['REGON', found.regon || 'missing'], ['KRS', found.krs || 'missing'], ['IBAN/NRB', found.iban || 'missing'], ['Postal code', found.postal || 'missing'], ['PKD', found.pkd || 'missing']];
      const hits = fields.filter(f => f[1] !== 'missing').length;
      return makeResult(input, maskPii(input), hits >= 3, hits >= 3 ? type + ' has enough offline onboarding evidence.' : type + ' is missing core evidence.', type, { fields, masked: maskPii(input), diagnostics: fields.map(f => ({ level: f[1] === 'missing' ? 'warn':'ok', text: f[0] + ': ' + f[1] })), recommendations:['Use this as an intake checklist, then confirm official status in the appropriate registry.'], boundary:'No CEIDG, KRS, VAT, bank, or sanctions lookup is performed.' });
    }

    function analyzeInvoiceData(input) {
      const amount = parseAmount(input);
      const vatRate = (input.match(/\b(23|8|5|0)\s*%/) || [''])[0];
      const nips = input.match(/\b\d{10}\b/g) || [];
      const invoice = (input.match(/[A-Z]{1,4}[\/\-]\d{4}[^\s,]*/i) || [''])[0];
      const valid = invoice && nips.length >= 1 && Number.isFinite(amount);
      return makeResult(input, invoice || input, !!valid, valid ? 'Invoice data has the core offline fields.' : 'Invoice data is missing core fields.', 'Invoice data', { fields:[['Invoice number', invoice || 'missing'], ['NIP count', String(nips.length)], ['VAT rate', vatRate || 'missing'], ['Amount hint', Number.isFinite(amount) ? formatPln(amount) : 'missing']], masked: maskPii(input), diagnostics:[{level:invoice?'ok':'error',text:'Invoice number marker'}, {level:nips.length?'ok':'warn',text:'Seller/buyer NIP markers'}, {level:Number.isFinite(amount)?'ok':'warn',text:'Amount marker'}], boundary:'This does not confirm invoice issuance, KSeF acceptance, tax treatment, or counterparty status.' });
    }

    function analyzeReceipt(input) {
      const amount = parseAmount(input);
      const nip = (input.match(/\b\d{10}\b/) || [''])[0];
      const hasVatLine = /PTU|VAT|23%|8%|5%/i.test(input);
      const valid = Number.isFinite(amount) && hasVatLine;
      return makeResult(input, maskPii(input), valid, valid ? 'Receipt data has fiscal-line structure.' : 'Receipt data needs fiscal-line review.', 'Receipt / paragon', { fields:[['NIP on receipt', nip || 'not detected'], ['VAT/fiscal line', hasVatLine ? 'detected' : 'missing'], ['Amount', Number.isFinite(amount) ? formatPln(amount) : 'missing']], masked: maskPii(input), diagnostics:[{level:hasVatLine?'ok':'warn',text:'VAT/PTU line'}, {level:Number.isFinite(amount)?'ok':'error',text:'Total amount'}], boundary:'The tool does not validate fiscal-printer signatures or tax deductibility.' });
    }

    function analyzeTransferTitle(input) {
      const normalized = input.replace(/\s+/g, ' ').trim();
      const tooLong = normalized.length > 140;
      const suspicious = /[\r\n<>{}]/.test(normalized);
      return makeResult(input, normalized, !tooLong && !suspicious && normalized.length > 2, !tooLong && !suspicious ? 'Transfer title is clean for local use.' : 'Transfer title needs cleanup.', 'Transfer title', { fields:[['Characters', String(normalized.length)], ['Recommended max', '140'], ['Invoice/ref hint', /\d/.test(normalized) ? 'yes' : 'missing'], ['Unsafe chars', suspicious ? 'yes' : 'no']], masked: normalized, diagnostics:[{level:tooLong?'error':'ok',text:'Length check'}, {level:suspicious?'error':'ok',text:'Unsafe character check'}], recommendations:['Keep titles short, stable, and searchable; include invoice or agreement reference when useful.'], boundary:'Bank-specific title acceptance and payment execution are not checked.' });
    }

    function analyzePaymentQr(input) {
      const found = findCommon(input);
      const amount = parseAmount(input);
      const recipient = pickLineValue(input, /recipient|odbiorca|name/i) || 'Valido Demo Recipient';
      const title = pickLineValue(input, /title|tytuł|remittance|reference/i) || (input.match(/[A-Z]{1,4}[\/\-]\d{4}[^\s,]*/i) || ['Payment'])[0];
      const iban = found.iban || '';
      const valid = Boolean(iban && Number.isFinite(amount));
      const payload = ['BCD','002','1','SCT','',recipient,iban,Number.isFinite(amount) ? 'PLN' + amount.toFixed(2) : '',title].join('\n');
      const qrSvg = valid ? makeQrSvg(payload) : '';
      return makeResult(input, payload, valid, valid ? 'Payment QR payload generated offline.' : 'Payment QR needs IBAN and amount.', 'Payment QR payload', { fields:[['Recipient', recipient], ['IBAN/NRB', iban || 'missing'], ['Amount', Number.isFinite(amount) ? formatPln(amount) : 'missing'], ['Title', title], ['Payload chars', String(payload.length)]], masked: maskPii(input), qrSvg, diagnostics:[{level:iban?'ok':'error',text:'IBAN/NRB detected'}, {level:Number.isFinite(amount)?'ok':'error',text:'Amount detected'}], recommendations:['Always confirm details inside the banking app before sending money.'], boundary:'This generates an offline QR payload helper only; it does not execute, authorize, or certify payments.' });
    }

    function analyzeStatement(input) {
      const lines = input.split(/\r?\n/).filter(Boolean);
      const rows = lines.map(line => line.split(/[;\t,]/).map(c => c.trim())).slice(0, 12);
      const amounts = input.match(/-?\d+[,.]\d{2}\s*(?:PLN|zł)?/gi) || [];
      const ibans = input.match(/PL\d{26}|\b\d{26}\b/gi) || [];
      const dates = input.match(/\b\d{4}-\d{2}-\d{2}\b|\b\d{2}\.\d{2}\.\d{4}\b/g) || [];
      const valid = lines.length > 0 && amounts.length > 0;
      return makeResult(input, lines.length + ' rows', valid, valid ? 'Statement rows parsed locally.' : 'Statement rows need amount/date review.', 'Bank statement rows', { fields:[['Rows', String(lines.length)], ['Amounts', String(amounts.length)], ['IBAN/NRB values', String(ibans.length)], ['Dates', String(dates.length)]], masked: maskPii(input), tableRows: rows, diagnostics:[{level:lines.length?'ok':'error',text:'Rows detected'}, {level:amounts.length?'ok':'warn',text:'Amount values detected'}, {level:dates.length?'ok':'warn',text:'Date values detected'}], boundary:'This parser is format assistance only; it does not reconcile balances or confirm bank authenticity.' });
    }

    function analyzeAddress(input) {
      const postal = (input.match(/\b\d{2}-?\d{3}\b/) || [''])[0];
      const city = input.replace(postal, '').split(',').map(s => s.trim()).filter(Boolean).pop() || '';
      const street = input.split(',')[0] || '';
      const normalizedPostal = postal ? postal.replace(/\D/g, '').replace(/^(\d{2})(\d{3})$/, '$1-$2') : '';
      const valid = !!normalizedPostal && street.length > 3;
      return makeResult(input, input.replace(/\s+/g, ' '), valid, valid ? 'Address has a usable Polish postal structure.' : 'Address needs postal-code or street review.', 'Postal address', { fields:[['Street line', street || 'missing'], ['Postal code', normalizedPostal || 'missing'], ['City hint', city || 'missing'], ['Apartment marker', /\/\d+|m\.\s*\d+/i.test(input) ? 'yes' : 'unknown']], masked: maskAddress(input), diagnostics:[{level:normalizedPostal?'ok':'error',text:'Postal code'}, {level:street.length>3?'ok':'warn',text:'Street line'}], boundary:'Deliverability and official address registry status are not checked.' });
    }

    function analyzeTeryt(input, type) {
      const d = digits(input);
      const voivodeships = { '02':'Dolnoslaskie','04':'Kujawsko-pomorskie','06':'Lubelskie','08':'Lubuskie','10':'Lodzkie','12':'Malopolskie','14':'Mazowieckie','16':'Opolskie','18':'Podkarpackie','20':'Podlaskie','22':'Pomorskie','24':'Slaskie','26':'Swietokrzyskie','28':'Warminsko-mazurskie','30':'Wielkopolskie','32':'Zachodniopomorskie' };
      const validLengths = [2,4,6,7,10];
      const valid = validLengths.includes(d.length) && !!voivodeships[d.slice(0,2)];
      return makeResult(input, d, valid, valid ? type + ' has recognized local hierarchy shape.' : type + ' needs hierarchy review.', type, { fields:[['Voivodeship prefix', d.slice(0,2) || 'missing'], ['Voivodeship hint', voivodeships[d.slice(0,2)] || 'unknown'], ['County segment', d.slice(2,4) || 'n/a'], ['Gmina segment', d.slice(4,7) || 'n/a'], ['Code length', String(d.length)]], masked: d, diagnostics:[{level:validLengths.includes(d.length)?'ok':'error',text:'Supported hierarchy length'}, {level:voivodeships[d.slice(0,2)]?'ok':'warn',text:'Voivodeship prefix'}], boundary:'Official TERYT names, active status, and territorial changes are not checked.' });
    }

    function analyzeMrz(input) {
      const lines = input.toUpperCase().split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      const validShape = (lines.length === 2 && lines.every(l => l.length >= 30)) || (lines.length === 3 && lines.every(l => l.length >= 24));
      const checks = mrzChecks(lines);
      const okChecks = checks.filter(c => c.ok).length;
      return makeResult(input, lines.join('\n'), validShape && okChecks === checks.length && checks.length > 0, validShape ? 'MRZ parsed with local check-digit analysis.' : 'MRZ shape needs review.', 'MRZ travel document', { fields:[['Lines', String(lines.length)], ['Line lengths', lines.map(l => l.length).join(', ')], ['Check digits', checks.length ? okChecks + '/' + checks.length + ' pass' : 'not enough data'], ['Document type', lines[0] ? lines[0][0] : 'n/a']], masked: lines.map(l => l.slice(0,6) + '…' + l.slice(-4)).join('\n'), diagnostics:[{level:validShape?'ok':'error',text:'MRZ line shape'}, {level:okChecks===checks.length&&checks.length?'ok':'warn',text:'Check digit review'}], tableRows: checks.map(c => [c.label, c.expected, c.actual, c.ok ? 'pass':'review']), boundary:'This does not confirm document authenticity, validity, border eligibility, or government records.' });
    }

    function analyzeDocumentSnippet(input, type) {
      const dates = input.match(/\b\d{4}-\d{2}-\d{2}\b|\b\d{2}\.\d{2}\.\d{4}\b/g) || [];
      const categories = (input.match(/\b(A|AM|A1|A2|B|B1|BE|C|CE|D|DE|T)\b/g) || []).join(', ');
      const refs = input.match(/[A-Z]{1,4}[\/\-]?[A-Z0-9]{4,}/gi) || [];
      const valid = refs.length > 0 || dates.length > 0 || categories;
      return makeResult(input, maskPii(input), !!valid, valid ? type + ' has parseable local fields.' : type + ' needs more structured fields.', type, { fields:[['Reference hints', refs.slice(0,3).join(', ') || 'missing'], ['Dates', dates.join(', ') || 'missing'], ['Categories', categories || 'n/a'], ['Characters', String(input.length)]], masked: maskPii(input), diagnostics:[{level:refs.length?'ok':'warn',text:'Reference marker'}, {level:dates.length?'ok':'warn',text:'Date marker'}], boundary:'Official document status, categories, insurance, and legal entitlement are not checked.' });
    }

    function analyzeVehicleDoc(input) {
      const vin = (input.match(/\b[A-HJ-NPR-Z0-9]{17}\b/i) || [''])[0].toUpperCase();
      const plate = (input.match(/\b[A-Z]{1,3}\s?[A-Z0-9]{4,6}\b/i) || [''])[0].toUpperCase();
      const dates = input.match(/\b\d{4}-\d{2}-\d{2}\b|\b\d{2}\.\d{2}\.\d{4}\b/g) || [];
      const valid = !!vin || !!plate;
      return makeResult(input, maskPii(input), valid, valid ? 'Vehicle document fields detected.' : 'Vehicle document needs plate or VIN.', 'Vehicle registration document', { fields:[['Plate', plate || 'missing'], ['VIN', vin || 'missing'], ['Dates', dates.join(', ') || 'missing'], ['VIN length', vin ? String(vin.length) : 'n/a']], masked: maskGeneric(input), diagnostics:[{level:plate?'ok':'warn',text:'Plate marker'}, {level:vin?'ok':'warn',text:'VIN marker'}], boundary:'Vehicle ownership, registration status, technical inspection, and insurance are not checked.' });
    }

    function analyzeParcel(input) {
      const ids = input.split(/\s+/).map(s => s.trim()).filter(Boolean);
      const candidates = ids.filter(s => /^[A-Z0-9]{10,30}$/i.test(s));
      return makeResult(input, candidates.join('\n'), candidates.length > 0, candidates.length ? 'Tracking-like identifiers detected.' : 'No tracking-like identifier found.', 'Parcel tracking identifiers', { fields:[['Candidates', String(candidates.length)], ['Longest', candidates.sort((a,b)=>b.length-a.length)[0] || 'n/a'], ['Rows', String(ids.length)]], masked: candidates.map(v => maskGeneric(v)).join('\n') || maskGeneric(input), diagnostics:[{level:candidates.length?'ok':'error',text:'Courier-like tracking shape'}], boundary:'Carrier, delivery status, route events, ownership, and label authenticity are not checked.' });
    }

    function analyzeDataQuality(input) {
      const rows = input.split(/\r?\n/).filter(Boolean).map(line => line.split(/[;\t,]/).map(c => c.trim()));
      const header = rows[0] || [];
      const body = rows.slice(1);
      const missing = body.reduce((sum,row)=>sum + row.filter(c => !c).length, 0);
      const duplicates = new Set(body.map(r => r.join('|'))).size !== body.length;
      const found = findCommon(input);
      const valid = rows.length > 1 && header.length > 1;
      return makeResult(input, rows.length + ' rows / ' + header.length + ' columns', valid, valid ? 'Dataset parsed for Polish quality signals.' : 'Dataset needs tabular structure.', 'Polish data quality audit', { fields:[['Rows', String(Math.max(body.length,0))], ['Columns', String(header.length)], ['Missing cells', String(missing)], ['Duplicate rows', duplicates ? 'yes' : 'no'], ['PII hints', [found.nip&&'NIP',found.regon&&'REGON',found.iban&&'IBAN',found.postal&&'postal'].filter(Boolean).join(', ') || 'none']], masked: maskPii(input), tableRows: rows.slice(0,8), diagnostics:[{level:valid?'ok':'error',text:'Tabular input'}, {level:missing?'warn':'ok',text:'Missing cells'}, {level:duplicates?'warn':'ok',text:'Duplicate rows'}], recommendations:['Use masked output for QA tickets and keep raw imports local.'], boundary:'This is data-quality linting only. It does not certify legal correctness or official record status.' });
    }

    function analyzeViesReadiness(input) {
      const vatRaw = (input.match(/\b[A-Z]{2}\s*\d{8,12}\b/i) || [''])[0].replace(/\s+/g, '').toUpperCase();
      const country = vatRaw.slice(0, 2) || pickLineValue(input, /country|kraj/i).toUpperCase();
      const vatBody = vatRaw.slice(2) || (input.match(/\b\d{8,12}\b/) || [''])[0];
      const company = pickLineValue(input, /company|firma|name/i) || 'n/a';
      const address = pickLineValue(input, /address|adres/i) || 'n/a';
      const valid = /^[A-Z]{2}$/.test(country) && /^\d{8,12}$/.test(vatBody);
      const payload = JSON.stringify({ countryCode: country || 'PL', vatNumber: vatBody || '', companyName: company === 'n/a' ? '' : company, address: address === 'n/a' ? '' : address }, null, 2);
      return makeResult(input, payload, valid, valid ? 'VIES payload is ready for manual/official lookup.' : 'VIES payload needs country code and VAT shape review.', 'VIES readiness payload', { fields:[['Country code', country || 'missing'], ['VAT body', vatBody || 'missing'], ['Company hint', company], ['Address hint', address]], masked: maskPii(payload), diagnostics:[{ level: /^[A-Z]{2}$/.test(country) ? 'ok':'error', text:'Country code shape' }, { level: /^\d{8,12}$/.test(vatBody) ? 'ok':'error', text:'VAT digits shape' }], recommendations:['Use this payload for readiness only, then run official VIES checks in approved systems.'], boundary:'No VIES request is sent. Company validity and VAT status are not checked online.' });
    }

    function analyzeUpoPayload(input) {
      const form = pickLineValue(input, /form|deklarac|pit|cit|vat/i) || (input.match(/\b(PIT|CIT|VAT)-?[0-9A-Z]+\b/i) || [''])[0];
      const period = pickLineValue(input, /period|rok|month|miesiac|year/i) || (input.match(/\b20\d{2}\b/) || [''])[0];
      const nip = (input.match(/\b\d{10}\b/) || [''])[0];
      const pesel = (input.match(/\b\d{11}\b/) || [''])[0];
      const email = (input.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i) || [''])[0];
      const office = pickLineValue(input, /office|urzad|urząd/i) || (input.match(/\b\d{4}\b/) || [''])[0];
      const valid = !!form && !!period && (!!nip || !!pesel);
      return makeResult(input, JSON.stringify({ form, period, taxId: nip || '', pesel: pesel || '', email: email || '', office: office || '' }, null, 2), valid, valid ? 'UPO/e-Deklaracje payload is structurally ready.' : 'UPO/e-Deklaracje payload is missing required fields.', 'UPO/e-Deklaracje payload', { fields:[['Form', form || 'missing'], ['Period', period || 'missing'], ['NIP', nip || 'missing'], ['PESEL', pesel || 'missing'], ['Email', email || 'missing'], ['Office code', office || 'missing']], masked: maskPii(input), diagnostics:[{level:form?'ok':'error',text:'Form marker'}, {level:period?'ok':'error',text:'Period marker'}, {level:(nip||pesel)?'ok':'error',text:'Taxpayer identifier'}], boundary:'No declaration is submitted. UPO generation, signatures, and legal acceptance are out of scope.' });
    }

    function analyzeKsefFa2Mapper(input) {
      const required = [
        ['P_1', /<P_1>|\bP_1\b/i],
        ['P_2', /<P_2>|\bP_2\b/i],
        ['P_13_1', /<P_13_1>|\bP_13_1\b/i],
        ['KodWaluty', /<KodWaluty>|\bKodWaluty\b/i],
        ['NIP', /<NIP>|\bNIP\b/i]
      ];
      const rows = required.map(function (r) { return [r[0], r[1].test(input) ? 'present' : 'missing']; });
      const present = rows.filter(function (r) { return r[1] === 'present'; }).length;
      const valid = present >= 4;
      return makeResult(input, 'FA2 fields present: ' + present + '/' + required.length, valid, valid ? 'KSeF FA(2) mapping looks structurally ready.' : 'KSeF FA(2) mapping has missing key fields.', 'KSeF FA(2) field map', { fields:[['Detected fields', String(present)], ['Expected core fields', String(required.length)], ['Root marker', /<Faktura|\bFaktura\b/i.test(input) ? 'detected':'missing']], tableRows: rows, masked: maskPii(input), diagnostics:[{level:valid?'ok':'warn',text:'Core FA(2) field coverage'}], recommendations:['Use this map as pre-check before full schema/XSD and KSeF environment validation.'], boundary:'No FA(2) schema validation or KSeF submission is performed.' });
    }

    function analyzePayrollSanity(input) {
      const gross = parseNumberByLabel(input, /gross|brutto/i);
      const net = parseNumberByLabel(input, /net|netto/i);
      const tax = parseNumberByLabel(input, /tax|pit|zaliczka/i);
      const social = parseNumberByLabel(input, /social|zus|deduction|skladk|składk/i);
      const totalCuts = (Number.isFinite(tax) ? tax : 0) + (Number.isFinite(social) ? social : 0);
      const gap = Number.isFinite(gross) && Number.isFinite(net) ? gross - net : NaN;
      const valid = Number.isFinite(gross) && Number.isFinite(net) && gross >= net;
      return makeResult(input, JSON.stringify({ gross, net, tax, social, grossMinusNet: Number.isFinite(gap) ? Number(gap.toFixed(2)) : null }, null, 2), valid, valid ? 'Payroll amounts are internally consistent at sanity level.' : 'Payroll sanity check found missing or inconsistent amounts.', 'Payroll sanity check', { fields:[['Gross', Number.isFinite(gross) ? formatPln(gross) : 'missing'], ['Net', Number.isFinite(net) ? formatPln(net) : 'missing'], ['Tax', Number.isFinite(tax) ? formatPln(tax) : 'missing'], ['Social/deductions', Number.isFinite(social) ? formatPln(social) : 'missing'], ['Gross - net', Number.isFinite(gap) ? formatPln(gap) : 'missing'], ['Declared deductions', Number.isFinite(totalCuts) ? formatPln(totalCuts) : 'n/a']], masked: maskPii(input), diagnostics:[{level:Number.isFinite(gross)?'ok':'error',text:'Gross amount present'}, {level:Number.isFinite(net)?'ok':'error',text:'Net amount present'}, {level:valid?'ok':'error',text:'Gross >= net sanity'}], recommendations:['Treat this as sanity linting only. Payroll legal/tax correctness requires full payroll engine rules.'], boundary:'No ZUS, PIT, employer policy, contract type, or legal payroll compliance determination is performed.' });
    }

    function analyzeTransferReconcile(input) {
      let lines = input.split(/\r?\n/).filter(Boolean);
      if (lines.length <= 1) {
        const inferred = String(input).match(/\d{4}-\d{2}-\d{2}[^\n]*?(?:PLN|zł)/gi) || [];
        if (inferred.length > 1) lines = inferred.map(function (v) { return v.trim(); });
      }
      const refs = lines.map(function (line) { return (line.match(/[A-Z]{1,4}[\/\-]\d{4}[^\s,;]*/i) || [''])[0] || 'n/a'; });
      const amounts = lines.map(function (line) { return parseAmount(line); });
      const keyCount = {};
      lines.forEach(function (line, idx) {
        const key = refs[idx] + '|' + (Number.isFinite(amounts[idx]) ? amounts[idx].toFixed(2) : 'n/a');
        keyCount[key] = (keyCount[key] || 0) + 1;
      });
      const duplicates = Object.keys(keyCount).filter(function (k) { return keyCount[k] > 1; });
      const missingRefs = refs.filter(function (r) { return r === 'n/a'; }).length;
      const valid = lines.length > 0 && missingRefs === 0;
      const tableRows = lines.slice(0, 20).map(function (line, idx) {
        const key = refs[idx] + '|' + (Number.isFinite(amounts[idx]) ? amounts[idx].toFixed(2) : 'n/a');
        return [String(idx + 1), refs[idx], Number.isFinite(amounts[idx]) ? formatPln(amounts[idx]) : 'missing', keyCount[key] > 1 ? 'duplicate-risk' : 'unique'];
      });
      return makeResult(input, JSON.stringify({ rows: lines.length, duplicates: duplicates.length, missingReferences: missingRefs }, null, 2), valid && duplicates.length === 0, duplicates.length === 0 ? 'Reconciliation rows look unique at local pre-check level.' : 'Potential duplicate transfer rows detected.', 'Transfer reconciliation', { fields:[['Rows', String(lines.length)], ['Duplicate keys', String(duplicates.length)], ['Rows without refs', String(missingRefs)], ['Amount rows', String(amounts.filter(Number.isFinite).length)]], tableRows: tableRows, masked: maskPii(input), diagnostics:[{level:missingRefs ? 'warn':'ok',text:'Reference coverage'}, {level:duplicates.length ? 'warn':'ok',text:'Duplicate reference+amount keys'}], boundary:'No bank ledger matching, settlement confirmation, or statement authenticity verification is performed.' });
    }

    function analyzeIbanOwnerPrecheck(input) {
      const found = findCommon(input);
      const owner = pickLineValue(input, /owner|recipient|beneficiary|odbiorca|nazwa/i) || '';
      const title = pickLineValue(input, /title|tytul|tytuł|reference/i) || '';
      const ownerTokens = owner.toLowerCase().split(/\s+/).filter(function (t) { return t.length >= 3; });
      const overlap = ownerTokens.filter(function (t) { return title.toLowerCase().includes(t); }).length;
      const valid = Boolean(found.iban && owner);
      return makeResult(input, JSON.stringify({ iban: found.iban || '', owner: owner || '', title: title || '', titleOwnerTokenOverlap: overlap }, null, 2), valid, valid ? 'IBAN and owner fields are present for manual verification.' : 'IBAN owner pre-check needs IBAN and recipient name.', 'IBAN owner-name pre-check', { fields:[['IBAN/NRB', found.iban || 'missing'], ['Owner/recipient', owner || 'missing'], ['Title', title || 'missing'], ['Owner token overlap in title', String(overlap)]], masked: maskPii(input), diagnostics:[{level:found.iban?'ok':'error',text:'IBAN/NRB present'}, {level:owner?'ok':'error',text:'Recipient name present'}, {level:overlap?'ok':'warn',text:'Name/title consistency hint'}], recommendations:['Always verify beneficiary ownership in approved banking channels before payment release.'], boundary:'No bank owner-name confirmation, account status, or sanctions screening is performed.' });
    }

    function analyzeAddressTransliteration(input) {
      const collapsed = input.replace(/\s+/g, ' ').trim();
      const ascii = transliteratePolish(collapsed);
      const upper = ascii.toUpperCase();
      const canonical = upper.replace(/[^A-Z0-9\-\/,. ]+/g, '').replace(/\s+/g, ' ').trim();
      const changed = ascii !== collapsed;
      return makeResult(input, ascii, canonical.length >= 5, canonical.length >= 5 ? 'Address transliteration and normalization generated.' : 'Address transliteration needs more text.', 'Address transliteration', { fields:[['Original length', String(collapsed.length)], ['ASCII length', String(ascii.length)], ['Changed by transliteration', changed ? 'yes' : 'no'], ['Postal code', (collapsed.match(/\b\d{2}-?\d{3}\b/) || ['missing'])[0]]], tableRows:[['Original', collapsed || 'n/a'], ['ASCII', ascii || 'n/a'], ['Uppercase canonical', canonical || 'n/a']], masked: maskAddress(ascii), diagnostics:[{level:changed ? 'ok':'warn',text:'Polish diacritics transliterated'}, {level:/\b\d{2}-?\d{3}\b/.test(collapsed) ? 'ok':'warn',text:'Postal code marker'}], boundary:'This is formatting assistance only. It does not validate official address registries or deliverability.' });
    }

    function analyzeOcrFixer(input) {
      const lines = input.split(/\r?\n/);
      const replacements = [];
      const fixed = lines.map(function (line) {
        let out = line;
        const ops = [
          [/\bN1P\b/gi, 'NIP'],
          [/\bREG0N\b/gi, 'REGON'],
          [/\bOO-OO1\b/g, '00-001'],
          [/\bO(\d{2,})\b/g, '0$1'],
          [/(\d)O(\d)/g, '$10$2'],
          [/(\d)l(\d)/g, '$11$2']
        ];
        ops.forEach(function (op) {
          const before = out;
          out = out.replace(op[0], op[1]);
          if (before !== out) replacements.push(op[0].toString());
        });
        return out;
      }).join('\n');
      const valid = fixed.length >= 5;
      return makeResult(input, fixed, valid, valid ? 'OCR post-processing generated a cleaned variant.' : 'OCR post-processing needs more text.', 'OCR post-processing', { fields:[['Input chars', String(input.length)], ['Output chars', String(fixed.length)], ['Replacement groups', String(replacements.length)]], tableRows:[['Original', input.slice(0, 160) || 'n/a'], ['Cleaned', fixed.slice(0, 160) || 'n/a']], masked: maskPii(fixed), diagnostics:[{level:replacements.length ? 'ok':'warn',text:'OCR correction patterns applied'}], recommendations:['Review corrected output manually before legal, tax, or payment usage.'], boundary:'This is text cleanup assistance only. It does not certify OCR accuracy or document authenticity.' });
    }

    function analyzeInvoiceDuplicateRisk(input) {
      let lines = input.split(/\r?\n/).filter(Boolean);
      if (lines.length <= 1) {
        const inferred = String(input).match(/[A-Z]{1,4}[\/\-]\d{4}[^\n]*?(?:PLN|zł)/gi) || [];
        if (inferred.length > 1) lines = inferred.map(function (v) { return v.trim(); });
      }
      const parsed = lines.map(function (line, idx) {
        const invoice = (line.match(/[A-Z]{1,4}[\/\-]\d{4}[^\s,;]*/i) || [''])[0] || 'n/a';
        const date = (line.match(/\b\d{4}-\d{2}-\d{2}\b|\b\d{2}\.\d{2}\.\d{4}\b/) || [''])[0] || 'n/a';
        const nip = (line.match(/\b\d{10}\b/) || [''])[0] || 'n/a';
        const amount = parseAmount(line);
        return { row: idx + 1, invoice: invoice, date: date, nip: nip, amount: Number.isFinite(amount) ? amount.toFixed(2) : 'n/a' };
      });
      const bucket = {};
      parsed.forEach(function (p) {
        const key = [p.invoice, p.date, p.nip, p.amount].join('|');
        bucket[key] = (bucket[key] || 0) + 1;
      });
      const duplicates = Object.keys(bucket).filter(function (k) { return bucket[k] > 1; });
      const risk = duplicates.length ? 'high' : parsed.length > 3 ? 'medium' : 'low';
      const valid = risk !== 'high';
      const tableRows = parsed.slice(0, 25).map(function (p) {
        const key = [p.invoice, p.date, p.nip, p.amount].join('|');
        return [String(p.row), p.invoice, p.date, p.amount, bucket[key] > 1 ? 'duplicate-risk' : 'ok'];
      });
      return makeResult(input, JSON.stringify({ rows: parsed.length, duplicateKeys: duplicates.length, risk: risk }, null, 2), valid, valid ? 'No high duplicate risk was detected in pasted rows.' : 'High duplicate-risk signals detected.', 'Invoice duplicate risk', { fields:[['Rows', String(parsed.length)], ['Duplicate keys', String(duplicates.length)], ['Risk level', risk], ['Rows with invoice ref', String(parsed.filter(function (p) { return p.invoice !== 'n/a'; }).length)]], tableRows: tableRows, masked: maskPii(input), diagnostics:[{level:duplicates.length ? 'warn':'ok',text:'Exact duplicate key detection'}, {level:parsed.length ? 'ok':'error',text:'Rows detected'}], recommendations:['Use risk output to prioritize manual review before posting invoices or payment batches.'], boundary:'No legal duplicate determination or accounting-system state is checked.' });
    }

    function analyzeComplianceChecklist(input) {
      const lower = input.toLowerCase();
      const checks = [
        ['NIP present', /\b\d{10}\b/.test(input)],
        ['REGON present', /\b\d{9}(?:\d{5})?\b/.test(input)],
        ['IBAN/NRB present', /PL\d{26}|\b\d{26}\b/i.test(input)],
        ['Invoice reference present', /[A-Z]{1,4}[\/\-]\d{4}/i.test(input)],
        ['KSeF context present', /ksef|fa\(2\)|faktura/i.test(lower)],
        ['UPO/e-Deklaracje context present', /upo|e-deklarac|pit|cit|vat-7/i.test(lower)],
        ['Address/postal marker present', /\b\d{2}-?\d{3}\b/.test(input)],
        ['Contact email present', /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(input)]
      ];
      const passed = checks.filter(function (c) { return c[1]; }).length;
      const checklist = checks.map(function (c) { return { item: c[0], status: c[1] ? 'ready' : 'review' }; });
      const valid = passed >= 4;
      return makeResult(input, JSON.stringify({ checklist: checklist, passed: passed, total: checks.length }, null, 2), valid, valid ? 'Compliance checklist generated with enough readiness evidence.' : 'Compliance checklist generated; additional evidence is recommended.', 'Compliance checklist', { fields:[['Passed checks', String(passed)], ['Total checks', String(checks.length)], ['Readiness score', Math.round((passed / checks.length) * 100) + '%']], tableRows: checklist.map(function (c) { return [c.item, c.status]; }), masked: maskPii(input), diagnostics: checklist.map(function (c) { return { level: c.status === 'ready' ? 'ok' : 'warn', text: c.item + ': ' + c.status }; }), recommendations:['Export checklist JSON as an audit attachment and track unresolved review items explicitly.'], boundary:'This checklist is advisory only and does not replace legal, tax, AML, or regulatory review.' });
    }

    function findCommon(input) {
      return {
        nip: (input.match(/\b\d{10}\b/) || [''])[0],
        regon: (input.match(/\b\d{9}(?:\d{5})?\b/) || [''])[0],
        krs: (input.match(/\b\d{10}\b/) || [''])[0],
        iban: (input.match(/PL\d{26}|\b\d{26}\b/i) || [''])[0],
        postal: (input.match(/\b\d{2}-?\d{3}\b/) || [''])[0],
        pkd: (input.match(/\b\d{2}\.\d{2}\.[A-Z]\b/i) || [''])[0]
      };
    }

    function makeAudit(config, result) {
      return { kind:'poland-baseline-suite', version:1, tool:config.title, valid:result.valid, type:result.type, normalized:result.normalized, masked:result.masked, fields:Object.fromEntries(result.fields), diagnostics:result.diagnostics, warnings:result.warnings, recommendations:result.recommendations, boundary:result.boundary, generatedAt:new Date().toISOString() };
    }

    function runBatch(workbench) {
      const config = workbench.form._plbConfig;
      const input = workbench.form.querySelector('[data-plb-batch-input]');
      const target = workbench.form.querySelector('[data-plb-batch-results]');
      const rows = (input ? input.value : '').split(/\r?\n/).map(v => v.trim()).filter(Boolean).slice(0, MAX_BATCH).map((value, index) => ({ index:index+1, value, result: analyze(config, value) }));
      if (!rows.length) { target.innerHTML = '<p class="plb-muted">Paste at least one row.</p>'; workbench.setMessage('Batch input is empty.', 'error'); return; }
      const payload = { kind:'poland-baseline-batch', tool:config.title, total:rows.length, valid:rows.filter(r => r.result.valid).length, review:rows.filter(r => !r.result.valid).length, rows:rows.map(r => ({ index:r.index, input:r.value, valid:r.result.valid, normalized:r.result.normalized, masked:r.result.masked, type:r.result.type })) };
      workbench.form._plbBatchJson = JSON.stringify(payload, null, 2);
      target.innerHTML = '<div class="plb-batch-summary"><strong>' + payload.valid + ' ready</strong><strong>' + payload.review + ' review</strong><span>' + payload.total + ' total</span></div><div class="plb-batch-table">' + rows.map(r => '<div class="' + (r.result.valid ? 'pass':'fail') + '"><span>#' + r.index + '</span><code>' + util.escapeHtml(r.value) + '</code><strong>' + (r.result.valid ? 'ready':'review') + '</strong><em>' + util.escapeHtml(r.result.normalized) + '</em></div>').join('') + '</div>';
      workbench.setMessage('Batch checked ' + rows.length + ' rows.', payload.review ? 'error' : 'success');
    }

    function copyBatch(workbench) {
      const value = workbench.form._plbBatchJson;
      if (!value) { workbench.setMessage('Run a batch first.', 'error'); return; }
      copyText(value).then(() => workbench.setMessage('Copied batch JSON.', 'success'));
    }

    function copySpecial(workbench, kind) {
      let value = kind === 'json' ? workbench.form._plbJson : kind === 'masked' ? workbench.form._plbMasked : kind === 'qr' ? workbench.form._plbQrSvg : workbench.form._plbNormalized;
      if (kind === 'qr' && !value) { workbench.setMessage('This result has no QR SVG yet.', 'error'); return; }
      if (!value) { workbench.setMessage('Nothing to copy yet.', 'error'); return; }
      copyText(value).then(() => workbench.setMessage(kind === 'qr' ? 'Copied QR SVG.' : kind === 'json' ? 'Copied audit JSON.' : kind === 'masked' ? 'Copied masked value.' : 'Copied normalized value.', 'success'));
    }

    function generateFor(config) { return safeFixture(config.kind); }
    function safeFixture(kind) {
      const map = {
        'xml-ksef':'<Faktura><Naglowek><KodFormularza>FA</KodFormularza></Naglowek><Podmiot1><DaneIdentyfikacyjne><NIP>1234563218</NIP></DaneIdentyfikacyjne></Podmiot1><Fa><P_1>2026-01-15</P_1><P_2>FV/2026/SAFE</P_2><KodWaluty>PLN</KodWaluty></Fa></Faktura>',
        'xml-jpk':'<JPK><Naglowek><KodFormularza>JPK_V7M</KodFormularza></Naglowek><Podmiot1><NIP>1234563218</NIP></Podmiot1></JPK>',
        'split-payment':'Amount: 615,00 PLN\nVAT: 115,00 PLN\nSupplier NIP: 1234563218\nInvoice: FV/2026/SAFE',
        'pkd':'62.01.Z','pkwiu':'62.01.11.0','bdo':'000123456','company':'Company: Demo Sp. z o.o.\nNIP 1234563218\nREGON 123456785\nKRS 0000123456\nIBAN PL61109010140000071219812874\nPKD 62.01.Z',
        'invoice-data':'Invoice FV/2026/SAFE\nSeller NIP: 1234563218\nNet 500.00 VAT 23% Gross 615.00 PLN','receipt':'PARAGON\nNIP nabywcy: 1234563218\nPTU A 23% 18,70\nSUMA PLN 100,00','transfer-title':'FV/2026/SAFE payment for local development fixture','payment-qr':'Recipient: Demo Sp. z o.o.\nIBAN: PL61109010140000071219812874\nAmount: 123.45\nTitle: FV/2026/SAFE','statement':'2026-01-15;Fixture;PL61109010140000071219812874;-123.45 PLN','address':'ul. Prosta 1/2, 00-001 Warszawa','teryt':'1465011','municipality':'146501','mrz':'P<POLKOWALSKI<<JAN<<<<<<<<<<<<<<<<<<<<<<<<\nAA123456<7POL9208261M3001019<<<<<<<<<<<<<<06','passport':'AA1234567','driving':'PL/123456/2026\nCategories: B\nIssued: 2026-01-15','vehicle-doc':'Plate: WX12345\nVIN: WVGZZZ1TZFW123456\nDocument: DR/ABC123456','policy':'Policy: OC/2026/00012345\nPlate: WX12345\nValid from 2026-01-01 to 2026-12-31','parcel':'PL123456789012345678','ppe':'PL003712345678901234','vies-readiness':'Country: PL\nVAT: PL1234563218\nCompany: Demo Sp. z o.o.\nAddress: Warszawa','upo-payload':'Form: PIT-37\nPeriod: 2026\nNIP: 1234563218\nEmail: dev@example.com\nOffice: 1471','ksef-fa2-mapper':'<Faktura><Fa><P_1>2026-01-15</P_1><P_2>FV/2026/SAFE</P_2><P_13_1>500.00</P_13_1><KodWaluty>PLN</KodWaluty></Fa><Podmiot1><DaneIdentyfikacyjne><NIP>1234563218</NIP></DaneIdentyfikacyjne></Podmiot1></Faktura>','payroll-sanity':'Gross: 10000.00 PLN\nNet: 7180.00 PLN\nTax: 1200.00 PLN\nSocial: 1620.00 PLN','transfer-reconcile':'2026-01-10;FV/2026/001;-1230.00 PLN\n2026-01-11;FV/2026/002;-615.00 PLN\n2026-01-12;FV/2026/003;-500.00 PLN','iban-owner-precheck':'Owner: Demo Sp. z o.o.\nIBAN: PL61109010140000071219812874\nTitle: payment to Demo Sp. z o.o. for FV/2026/SAFE','address-transliteration':'ul. Zolnierska 15/7, 80-001 Gdansk','ocr-fixer':'N1P: 1234563218\nREG0N: O12345678\nul. Pr0sta 1, OO-OO1 Warszawa','invoice-duplicate-risk':'FV/2026/001;2026-01-15;1234563218;1230.00 PLN\nFV/2026/002;2026-01-16;5252248481;615.00 PLN','compliance-checklist':'Scenario: B2B onboarding\nNIP: 1234563218\nInvoice flow: KSeF\nPayment: SEPA + MPP','data-quality':'name,nip,regon,iban,postal\nDemo,1234563218,123456785,PL61109010140000071219812874,00-001'
      };
      return map[kind] || 'Polish fixture';
    }
    function parseAmount(input) {
      const m = String(input).match(/-?\d+(?:[\s.]\d{3})*(?:[,.]\d{2})|-?\d+(?:[,.]\d+)?/);
      if (!m) return NaN;
      let s = m[0].replace(/\s/g, '');
      if (s.lastIndexOf(',') > s.lastIndexOf('.')) s = s.replace(/\./g, '').replace(',', '.');
      else s = s.replace(/,/g, '');
      return Number(s);
    }
    function parseNumberByLabel(input, labelPattern) {
      const value = pickLineValue(input, labelPattern);
      if (value) {
        const num = parseAmount(value);
        if (Number.isFinite(num)) return num;
      }
      return parseAmount(String(input));
    }
    function parseVat(input) { const m = String(input).match(/VAT[^\d-]*(-?\d+(?:[,.]\d{2})?)/i); return m ? Number(m[1].replace(',', '.')) : NaN; }
    function transliteratePolish(value) {
      const map = {
        'ą':'a','ć':'c','ę':'e','ł':'l','ń':'n','ó':'o','ś':'s','ź':'z','ż':'z',
        'Ą':'A','Ć':'C','Ę':'E','Ł':'L','Ń':'N','Ó':'O','Ś':'S','Ź':'Z','Ż':'Z'
      };
      return String(value || '').replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, function (ch) { return map[ch] || ch; });
    }
    function formatPln(amount) { return new Intl.NumberFormat('pl-PL', { style:'currency', currency:'PLN' }).format(amount); }
    function digits(value) { return String(value || '').replace(/\D/g, ''); }
    function maskDigits(value, start, end) { const d = String(value || ''); return d.length <= start + end ? d[0] + '*'.repeat(Math.max(0, d.length - 1)) : d.slice(0, start) + '*'.repeat(Math.min(12, d.length - start - end)) + d.slice(-end); }
    function maskGeneric(value) { const s = String(value || ''); return s.length <= 8 ? maskDigits(s, 2, 2) : s.slice(0, 4) + '…' + s.slice(-4); }
    function maskAddress(value) { return String(value || '').replace(/\b\d{2}-?\d{3}\b/g, '**-***').replace(/\b\d+[A-Za-z]?(?:\/\d+)?\b/g, '**'); }
    function maskPii(value) { return String(value || '').replace(/PL\d{26}|\b\d{26}\b/gi, m => m.slice(0,4) + ' **** **** **** ' + m.slice(-4)).replace(/\b\d{11}\b/g, m => maskDigits(m, 3, 3)).replace(/\b\d{10}\b/g, m => maskDigits(m, 3, 3)); }
    function labelForSample(sample) { return String(sample).split(/\r?\n/)[0].slice(0, 44); }
    function setInput(workbench, value) { const input = workbench.primaryInput(); if (input) { input.value = value; input.dispatchEvent(new Event('input', { bubbles:true })); } }
    function pickLineValue(input, pattern) {
      const text = String(input || '');
      const labelRegex = /([A-Za-z0-9\/_()\- ]{2,32})\s*:\s*/g;
      let match;
      while ((match = labelRegex.exec(text))) {
        const label = String(match[1] || '').trim();
        if (!pattern.test(label)) continue;
        const start = labelRegex.lastIndex;
        const nextRegex = /[A-Za-z0-9\/_()\- ]{2,32}\s*:\s*/g;
        nextRegex.lastIndex = start;
        const next = nextRegex.exec(text);
        const end = next ? next.index : text.length;
        return text.slice(start, end).replace(/^[\s,;|]+|[\s,;|]+$/g, '').trim();
      }
      return '';
    }
    function copyText(value) { if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(value); const el = document.createElement('textarea'); el.value = value; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el); return Promise.resolve(); }
    function escapeAttr(value) { return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
    function escapeHtml(value) { return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
    function tokenise(value) { return String(value || '').split(/([\s\/\-.,;:]+)/).filter(Boolean).slice(0, 36).map((v, i) => ({ value: v.length > 10 ? v.slice(0, 9) + '…' : v, label: /\d/.test(v) ? 'num' : /^[A-Z]+$/i.test(v) ? 'text' : 'sep' })); }
    function syntaxJson(obj) { return util.escapeHtml(JSON.stringify(obj, null, 2)).replace(/(&quot;[^&]*?&quot;)(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?/g, (m, s, c) => s && c ? '<span class="plb-json-key">' + s + '</span>' + c : s ? '<span class="plb-json-string">' + s + '</span>' : /true|false/.test(m) ? '<span class="plb-json-bool">' + m + '</span>' : /null/.test(m) ? '<span class="plb-json-null">' + m + '</span>' : '<span class="plb-json-number">' + m + '</span>'); }
    function addHistory(slug, value, label) { const all = readHistory(); const list = (all[slug] || []).filter(i => i.value !== value); list.unshift({ value, label, at: Date.now() }); all[slug] = list.slice(0, MAX_HISTORY); localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); }
    function readHistory() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (e) { return {}; } }
    function renderHistory(workbench) { const sel = workbench.form.querySelector('[data-plb-history]'); if (!sel) return; const list = (readHistory()[workbench.form._plbSlug] || []); sel.innerHTML = list.length ? '<option value="">Choose recent input</option>' + list.map(i => '<option value="' + escapeAttr(i.value) + '">' + escapeAttr(i.label + ' - ' + i.value.slice(0, 34)) + '</option>').join('') : '<option value="">No history yet</option>'; }

    function mrzValue(ch) { if (/\d/.test(ch)) return Number(ch); if (/[A-Z]/.test(ch)) return ch.charCodeAt(0) - 55; return 0; }
    function mrzDigit(text) { const w = [7,3,1]; return String(text.split('').reduce((s,ch,i)=>s + mrzValue(ch) * w[i % 3], 0) % 10); }
    function mrzChecks(lines) { const rows = []; if (lines.length >= 2 && lines[1].length > 10) rows.push({ label:'Document number', expected:mrzDigit(lines[1].slice(0,9)), actual:lines[1][9], ok:mrzDigit(lines[1].slice(0,9)) === lines[1][9] }); if (lines.length >= 2 && lines[1].length > 20) rows.push({ label:'Birth date', expected:mrzDigit(lines[1].slice(13,19)), actual:lines[1][19], ok:mrzDigit(lines[1].slice(13,19)) === lines[1][19] }); return rows; }

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


    function makeQrSvg(text) { return createQrSvg(text).svg; }

    function injectStyles() {
      if (document.getElementById('poland-baseline-styles')) return;
      const style = document.createElement('style');
      style.id = 'poland-baseline-styles';
      style.textContent = '.poland-baseline-workbench{--plb:#0f766e;--plb-soft:#ecfdf5;--plb-strong:#14b8a6}.plb-tool-head{display:grid;grid-template-columns:minmax(0,1fr) minmax(300px,420px);gap:18px;align-items:stretch;border:1px solid color-mix(in srgb,var(--plb) 20%,var(--line));border-radius:16px;padding:18px;margin-bottom:20px;background:linear-gradient(110deg,#fff 0%,var(--plb-soft) 52%,rgba(255,255,255,.92) 100%);box-shadow:0 18px 42px rgba(15,23,42,.06);position:relative;overflow:hidden}.plb-tool-head:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(220,38,38,.10),rgba(255,255,255,.52) 45%,rgba(15,23,42,.045));pointer-events:none}.plb-tool-identity,.plb-tool-presets{position:relative;z-index:1}.plb-tool-identity{display:grid;grid-template-columns:auto minmax(0,1fr);gap:14px;align-items:start}.plb-tool-mark{display:inline-grid;place-items:center;min-width:58px;height:48px;border-radius:12px;border:1px solid color-mix(in srgb,var(--plb) 24%,var(--line));background:linear-gradient(135deg,#fff,var(--plb-soft));color:var(--plb);font-weight:950;letter-spacing:.08em;font-size:.72rem;text-transform:uppercase;box-shadow:0 8px 20px rgba(15,23,42,.05);padding:0 10px}.plb-tool-identity strong{display:block;font-size:1.05rem;line-height:1.2;color:var(--text)}.plb-tool-identity small{display:block;margin-top:6px;max-width:780px;color:var(--muted);line-height:1.45}.plb-tool-presets{display:grid;gap:10px;align-content:start}.plb-tool-presets label span{display:block;font-size:.66rem;font-weight:950;text-transform:uppercase;letter-spacing:.09em;color:var(--muted);margin-bottom:5px}.plb-tool-presets select{width:100%;border:1px solid var(--line);border-radius:10px;background:#fff;color:var(--text);font-weight:850;padding:10px 12px}.plb-tool-samples{display:flex;flex-wrap:wrap;gap:8px}.plb-tool-samples button{border:1px solid color-mix(in srgb,var(--plb) 24%,var(--line));border-radius:999px;background:#fff;color:var(--plb);font-weight:850;font-size:.74rem;padding:7px 10px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer}.plb-tool-samples button:hover{background:var(--plb-soft);transform:translateY(-1px)}.plb-badge-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}.plb-badge-row span{font-size:.72rem;font-weight:900;text-transform:uppercase;letter-spacing:.055em;border:1px solid color-mix(in srgb,var(--plb) 22%,var(--line));border-radius:999px;padding:6px 11px;background:#fff;color:var(--muted)}.plb-badge-row span.active{background:var(--plb-soft);color:var(--plb);border-color:color-mix(in srgb,var(--plb) 40%,var(--line))}.plb-panel{margin-top:24px;display:flex;flex-direction:column;gap:24px}.plb-empty,.plb-card,.plb-batch,.plb-results{border:1px solid var(--line);border-radius:12px;background:#fff;padding:20px;overflow:hidden;box-shadow:0 10px 28px rgba(15,23,42,.035)}.plb-empty{background:linear-gradient(135deg,var(--plb-soft),#fff);border-color:color-mix(in srgb,var(--plb) 24%,var(--line));color:var(--muted)}.plb-card h4{font-size:.9rem;font-weight:900;text-transform:uppercase;letter-spacing:.07em;border-bottom:1px solid var(--line);padding-bottom:14px;margin:0 0 18px;display:flex;align-items:center;gap:10px}.plb-card h4 span{color:var(--plb)}.plb-track{height:3px;background:#e5e7eb;margin:8px 24px 22px;border-radius:999px;overflow:hidden}.plb-track span{display:block;height:100%;max-width:100%;background:linear-gradient(90deg,var(--plb),#16a34a)}.plb-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}.plb-steps article{border:1px solid var(--line);border-radius:10px;padding:14px;background:#fff;min-width:0}.plb-steps article.pass{border-color:rgba(22,163,74,.24);background:linear-gradient(135deg,rgba(22,163,74,.055),#fff)}.plb-steps article.fail{border-color:rgba(220,38,38,.24);background:linear-gradient(135deg,rgba(220,38,38,.055),#fff)}.plb-steps article.idle{background:var(--surface-soft)}.plb-steps article>div{display:flex;justify-content:space-between;gap:10px}.plb-steps strong{font-size:.9rem;color:var(--text)}.plb-steps span{font-size:.68rem;font-weight:900;letter-spacing:.08em;border-radius:8px;padding:4px 8px;background:var(--plb-soft);color:var(--plb)}.plb-steps p{margin:12px 0 0;color:var(--muted);font-size:.86rem;line-height:1.45;overflow-wrap:anywhere}.plb-results{background:linear-gradient(135deg,rgba(22,163,74,.055),#fff);border-color:rgba(22,163,74,.22)}.plb-results.error{background:linear-gradient(135deg,rgba(220,38,38,.055),#fff);border-color:rgba(220,38,38,.22)}.plb-results-header{display:flex;align-items:center;gap:12px;margin-bottom:14px}.plb-results-header span{width:32px;height:32px;border-radius:999px;display:grid;place-items:center;background:rgba(22,163,74,.12);color:#16a34a;font-weight:900}.plb-results.error .plb-results-header span{background:rgba(220,38,38,.12);color:#dc2626}.plb-results-header strong{font-size:1rem;color:var(--text)}.plb-results-header em{display:block;font-style:normal;color:var(--muted);font-size:.82rem}.plb-results-grid,.plb-fields{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.plb-results-grid article,.plb-fields>div{border:1px solid var(--line);border-radius:10px;background:#fff;padding:16px;min-width:0;overflow:hidden}.plb-results-grid span,.plb-fields span{display:block;color:var(--muted);font-size:.68rem;font-weight:900;letter-spacing:.07em;text-transform:uppercase;margin-bottom:8px}.plb-results-grid strong,.plb-fields strong{display:block;max-width:100%;overflow-wrap:anywhere;word-break:break-word;line-height:1.28}.plb-results-grid article.is-long strong{font-size:clamp(.72rem,1.2vw,.95rem)}.plb-result-checks{margin-top:16px;border-top:1px solid var(--line);padding-top:12px}.plb-result-checks p{display:flex;align-items:flex-start;gap:10px;margin:8px 0;color:var(--muted)}.plb-result-checks span{color:#16a34a;font-weight:900}.plb-token-row{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:10px 0 18px}.plb-token-row span{border:1px solid var(--line);border-radius:10px;min-width:42px;max-width:140px;padding:10px 9px;text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;background:#fff;font-weight:900;box-shadow:0 8px 18px rgba(15,23,42,.045);overflow:hidden}.plb-token-row b{display:block;font-size:1.02rem;overflow:hidden;text-overflow:ellipsis}.plb-token-row em{display:block;font-style:normal;font-size:.58rem;color:var(--muted);margin-top:2px}.plb-token-row .tone-0{border-color:rgba(47,128,237,.36);color:#2f80ed}.plb-token-row .tone-1{border-color:rgba(16,185,129,.36);color:#10b981}.plb-token-row .tone-2{border-color:rgba(245,158,11,.4);color:#d97706}.plb-token-row .tone-3{border-color:rgba(139,92,246,.36);color:#7c3aed}.plb-token-row .tone-4{border-color:rgba(236,72,153,.36);color:#db2777}.plb-token-row .tone-5{border-color:rgba(14,165,233,.36);color:#0284c7}.plb-quality-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.plb-quality-list article{border:1px solid var(--line);border-radius:10px;padding:14px;background:var(--surface-soft)}.plb-quality-list .ok{border-color:rgba(22,163,74,.25);background:rgba(22,163,74,.06)}.plb-quality-list .bad{border-color:rgba(220,38,38,.3);background:rgba(220,38,38,.06)}.plb-quality-list .warn{border-color:rgba(217,119,6,.28);background:rgba(217,119,6,.06)}.plb-quality-list p{margin:.4rem 0 0;color:var(--muted);line-height:1.45}.plb-code{margin:0;overflow:auto;padding:14px;border-radius:8px;background:#0f172a;color:#dbeafe;font-size:.78rem}.plb-json-key{color:#93c5fd}.plb-json-string{color:#86efac}.plb-json-number{color:#fbbf24}.plb-json-bool{color:#f0abfc}.plb-json-null{color:#cbd5e1}.plb-dev-accordion{border:1px solid var(--line);border-radius:10px;background:#fff;overflow:hidden;margin-top:10px}.plb-dev-accordion summary{cursor:pointer;list-style:none;padding:16px 18px;font-weight:900;text-transform:uppercase;letter-spacing:.06em;display:flex;justify-content:space-between;gap:12px}.plb-dev-accordion summary::-webkit-details-marker{display:none}.plb-dev-content{border-top:1px solid var(--line);padding:16px;position:relative;background:var(--surface-soft)}.plb-dev-copy{position:absolute;right:14px;top:14px;border:1px solid var(--line);border-radius:8px;background:#fff;padding:5px 10px;color:var(--muted);font-weight:800}.plb-batch{margin:16px 0}.plb-batch summary{cursor:pointer;display:flex;justify-content:space-between;gap:12px}.plb-actions{display:flex;flex-wrap:wrap;gap:10px;margin:12px 0}.plb-batch-summary{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}.plb-batch-summary>*{border:1px solid var(--line);border-radius:999px;padding:6px 10px;background:var(--surface-soft)}.plb-batch-table{display:grid;gap:6px}.plb-batch-table>div{display:grid;grid-template-columns:44px minmax(0,1fr) 80px minmax(0,1fr);gap:8px;align-items:center;border:1px solid var(--line);border-radius:8px;padding:8px}.plb-batch-table code,.plb-batch-table em{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.plb-batch-table .pass strong{color:#16a34a}.plb-batch-table .fail strong{color:#dc2626}.plb-table-wrap{overflow:auto;border:1px solid var(--line);border-radius:10px}.plb-table{width:100%;border-collapse:collapse;font-size:.85rem}.plb-table td{border-bottom:1px solid var(--line);padding:9px 10px;vertical-align:top}.plb-qr-wrap{display:grid;grid-template-columns:180px minmax(0,1fr);gap:18px;align-items:center;margin-bottom:16px}.plb-qr{background:#fff;border:1px solid var(--line);border-radius:12px;padding:12px}.plb-qr svg{display:block;width:100%;height:auto}.plb-muted{color:var(--muted)}@media(max-width:900px){.plb-tool-head{grid-template-columns:1fr}.plb-tool-identity{grid-template-columns:1fr}.plb-tool-mark{width:max-content}.plb-tool-samples button{white-space:normal;text-align:left}.plb-results-grid,.plb-fields,.plb-quality-list,.plb-qr-wrap{grid-template-columns:1fr}.plb-track{display:none}.plb-batch-table>div{grid-template-columns:36px minmax(0,1fr)}.plb-batch-table em{grid-column:2}.plb-results-header{align-items:flex-start;flex-direction:column}.plb-token-row{justify-content:flex-start}.plb-badge-row{gap:6px}.plb-card,.plb-results,.plb-batch{padding:16px}}';
      document.head.appendChild(style);
      if (document.getElementById('poland-baseline-styles-hardening')) return;
      const hardening = document.createElement('style');
      hardening.id = 'poland-baseline-styles-hardening';
      hardening.textContent = '.poland-baseline-workbench .field-grid,.poland-baseline-workbench .button-row{min-width:0}.poland-baseline-workbench textarea,.poland-baseline-workbench input,.poland-baseline-workbench select{max-width:100%;min-width:0}.poland-baseline-workbench [name="input"]{resize:vertical;line-height:1.4}.poland-baseline-workbench .button-row{display:flex;flex-wrap:wrap;gap:10px}.poland-baseline-workbench .button-row .button{max-width:100%}.poland-baseline-workbench .plb-results-grid strong,.poland-baseline-workbench .plb-fields strong,.poland-baseline-workbench .plb-table td,.poland-baseline-workbench .plb-dev-content p,.poland-baseline-workbench .plb-batch-table code,.poland-baseline-workbench .plb-batch-table em{overflow-wrap:anywhere;word-break:break-word;white-space:normal}.poland-baseline-workbench .plb-token-row span,.poland-baseline-workbench .plb-token-row b,.poland-baseline-workbench .plb-token-row em{max-width:100%;overflow-wrap:anywhere;word-break:break-word}.poland-baseline-workbench .plb-code{white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;max-height:420px}.poland-baseline-workbench .plb-dev-content{overflow:auto}@media(max-width:900px){.poland-baseline-workbench .field,.poland-baseline-workbench .plb-select{min-width:0}.poland-baseline-workbench [name="input"]{min-height:120px}}';
      document.head.appendChild(hardening);
    }

    return { filePrefix: 'poland-baseline', onMount, run, applySample, detectInputMode };
  })(window.ValidoWorkbench || { utilities: {} });

  if (window.ValidoWorkbench) {
    window.ValidoWorkbench.registerPlugin(ALGORITHM_ID, Plugin);
    window.ValidoWorkbench.mountAll();
  }
})();
