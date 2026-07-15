(function () {
  'use strict';

  const ALGORITHM_ID = 'validohub.poland-expansion';
  const STORAGE_KEY = 'validohub.polandExpansion.history.v1';
  const MAX_HISTORY = 10;
  const MAX_BATCH = 200;

  const PL_VAT_RATES = [23, 8, 5, 0];
  const BIC_BANKS = { BPKO: 'PKO Bank Polski', PKOP: 'Bank Pekao', WBKP: 'Santander Bank Polska', BREX: 'mBank', INGB: 'ING Bank Slaski', BIGB: 'Bank Millennium', ALBP: 'Alior Bank', PPAB: 'BNP Paribas Bank Polska', CITIPLPX: 'Bank Handlowy / Citi Handlowy' };
  const VOIVODESHIPS = { '02': 'Dolnoslaskie', '04': 'Kujawsko-pomorskie', '06': 'Lubelskie', '08': 'Lubuskie', '10': 'Lodzkie', '12': 'Malopolskie', '14': 'Mazowieckie', '16': 'Opolskie', '18': 'Podkarpackie', '20': 'Podlaskie', '22': 'Pomorskie', '24': 'Slaskie', '26': 'Swietokrzyskie', '28': 'Warminsko-mazurskie', '30': 'Wielkopolskie', '32': 'Zachodniopomorskie' };
  const VIN_TRANSLIT = { A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,J:1,K:2,L:3,M:4,N:5,P:7,R:9,S:2,T:3,U:4,V:5,W:6,X:7,Y:8,Z:9 };
  const VIN_WEIGHTS = [8,7,6,5,4,3,2,10,0,9,8,7,6,5,4,3,2];

  let TOOLS;

  const Plugin = (function (framework) {
    const util = framework.utilities || { escapeHtml: value => String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;') };

    TOOLS = {
      'poland-id-card-validator': { title:'Polish ID Card Validator', label:'ID card number', samples:['ABA300000','ABC123456','aba 300000'], family:'Identity document', generator: generateIdCard, analyze: analyzeIdCard, mask: maskGeneric },
      'poland-swift-bic-inspector': { title:'Polish BIC / SWIFT Inspector', label:'BIC / SWIFT', samples:['BPKOPLPW','WBKPPLPPXXX','DEUTDEFF'], family:'Banking', generator: () => 'BPKOPLPW', analyze: analyzeBic, mask: v => String(v||'').toUpperCase() },
      'poland-teryt-code-inspector': { title:'TERYT Code Inspector', label:'TERYT code', samples:['14','1465','1465011','0918123'], family:'Administrative code', generator: () => '1465011', analyze: analyzeTeryt, mask: v => String(v||'') },
      'poland-blik-code-helper': { title:'BLIK Code Helper', label:'BLIK code', samples:['123456','12 34 56','12345A'], family:'Payment code', generator: generateBlik, analyze: analyzeBlik, mask: v => maskDigits(digits(v), 2, 2) },
      'poland-pln-amount-formatter': { title:'PLN Amount Formatter', label:'Amount', samples:['1 234,56 zł','1234.56','-99,90 PLN'], family:'Money', generator: () => '1 234,56 zł', analyze: analyzePlnAmount, mask: v => String(v||'') },
      'poland-vat-calculator': { title:'Polish VAT Calculator', label:'Amount and VAT rate', samples:['1234.56 23%','gross 123,00 23%','1000 8%'], family:'Tax calculation', generator: () => '1234.56 23%', analyze: analyzeVatCalc, mask: v => String(v||'') },
      'poland-date-locale-formatter': { title:'Polish Date / Locale Formatter', label:'Date or timestamp', samples:['2026-07-15T10:30:00Z','15.07.2026','2026-12-24'], family:'Localization', generator: () => new Date().toISOString(), analyze: analyzeDateLocale, mask: v => String(v||'') },
      'poland-address-formatter': { title:'Polish Address Formatter', label:'Address', samples:['ul. Marszalkowska 1/2, 00-001 Warszawa','Krakowskie Przedmiescie 15, 00-071 Warszawa','00-001 Warszawa'], family:'Address', generator: () => 'ul. Marszalkowska 1/2, 00-001 Warszawa', analyze: analyzeAddress, mask: maskAddress },
      'poland-vin-validator': { title:'VIN Validator for Poland Workflows', label:'VIN', samples:['1HGCM82633A004352','WVWZZZ1JZXW000001','INVALIDVIN1234567'], family:'Vehicle', generator: () => '1HGCM82633A004352', analyze: analyzeVin, mask: v => maskGeneric(String(v||'').toUpperCase()) },
      'poland-eori-inspector': { title:'Polish EORI Inspector', label:'EORI', samples:['PL1234563218','PL123456321800000','DE1234567890'], family:'Customs', generator: () => 'PL' + generateNip(), analyze: analyzeEori, mask: v => maskGeneric(String(v||'').toUpperCase()) },
      'poland-pii-masker': { title:'Polish PII Masker', label:'Text containing Polish PII', samples:['NIP 1234563218, phone +48 501 234 567','IBAN PL61109010140000071219812874','email anna@example.pl'], family:'Data privacy', generator: () => 'NIP 1234563218, phone +48 501 234 567', analyze: analyzePii, mask: v => maskPii(String(v||'')) },
      'poland-test-data-generator': { title:'Polish Test Data Generator', label:'Generation seed or profile', samples:['company checkout fixture','person address fixture','banking fixture'], family:'Developer fixtures', generator: () => 'company checkout fixture', analyze: analyzeTestData, mask: v => String(v||'') },
      'poland-invoice-number-helper': { title:'Polish Invoice Number Helper', label:'Invoice number', samples:['FV/2026/07/00123','2026/1/PL','invoice 123'], family:'Billing', generator: generateInvoice, analyze: analyzeInvoice, mask: v => String(v||'') },
      'poland-grosz-converter': { title:'PLN Grosz Converter', label:'PLN or grosz amount', samples:['1234,56 zł','123456 grosz','99.90'], family:'Money', generator: () => '1234,56 zł', analyze: analyzeGrosz, mask: v => String(v||'') },
      'poland-sepa-transfer-helper': { title:'Polish SEPA Transfer Helper', label:'Transfer details', samples:['PL61109010140000071219812874 BPKOPLPW 123,45 PLN Invoice FV/1/2026','61109010140000071219812874 100 PLN','BPKOPLPW'], family:'SEPA banking', generator: () => 'PL61109010140000071219812874 BPKOPLPW 123,45 PLN Invoice FV/1/2026', analyze: analyzeSepa, mask: maskPii }
    };

    function currentSlug() { return window.location.pathname.split('/').filter(Boolean).pop() || 'poland-id-card-validator'; }

    function onMount(workbench) {
      injectStyles();
      const config = TOOLS[currentSlug()] || TOOLS['poland-id-card-validator'];
      workbench.form._polandExpansionConfig = config;
      workbench.form._polandExpansionSlug = currentSlug();
      workbench.form.classList.add('poland-expansion-workbench');
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
      if (summary) summary.textContent = 'Run premium Polish developer checks locally: normalize, batch-validate, mask, generate fixtures, and copy audit JSON without a backend.';
      if (!intro.querySelector('.poland-expansion-badge-row')) intro.insertAdjacentHTML('beforeend','<div class="poland-expansion-badge-row"><span>Browser only</span><span>Batch</span><span>Masking</span><span>Audit JSON</span><span>No lookup</span></div>');
    }

    function normalizeControls(workbench, config) {
      const heading = workbench.form.querySelector('.workbench-form-heading h3');
      if (heading) heading.textContent = config.title;
      const input = workbench.primaryInput();
      if (input) { input.placeholder = 'Paste ' + config.label + ' or use a preset'; input.autocomplete = 'off'; input.spellcheck = false; }
      const outputField = workbench.form.querySelector('.output-field');
      if (outputField) outputField.style.display = 'none';
      const advanced = workbench.form.querySelector('[data-advanced-panel]');
      if (advanced) advanced.style.display = 'none';
      const row = workbench.form.querySelector('.button-row');
      if (row && !row.querySelector('[data-plx-copy]')) row.insertAdjacentHTML('beforeend','<button type="button" class="button button-secondary" data-plx-copy="normalized">Copy normalized</button><button type="button" class="button button-secondary" data-plx-copy="masked">Copy masked</button><button type="button" class="button button-secondary" data-plx-copy="json">Copy audit JSON</button>');
    }

    function addControls(workbench, config) {
      const grid = workbench.form.querySelector('.field-grid');
      if (!grid || grid.querySelector('[data-plx-preset]')) return;
      grid.insertAdjacentHTML('afterbegin', `<label class="field plx-select"><span>Presets</span><select data-plx-preset><option value="">Choose a ${escapeAttr(config.label)} sample</option>${config.samples.map((s,i)=>`<option value="${i}">${escapeAttr(s)}</option>`).join('')}</select><small>Valid, formatted, and edge-case samples.</small></label><label class="field plx-select"><span>Recent local inputs</span><select data-plx-history><option value="">No history yet</option></select><small>Stored only in this browser.</small></label>`);
      const input = workbench.primaryInput();
      if (input && input.closest('.field')) input.closest('.field').style.gridColumn = '1 / -1';
      grid.insertAdjacentHTML('afterend', `<details class="plx-batch" data-plx-batch><summary><strong>Batch validation</strong><span>Up to ${MAX_BATCH} local rows</span></summary><label class="field"><span>Batch input</span><textarea rows="5" data-plx-batch-input placeholder="Paste one ${escapeAttr(config.label)} per line"></textarea></label><div class="plx-actions"><button type="button" class="button button-secondary" data-plx-batch-run>Run batch</button><button type="button" class="button button-secondary" data-plx-batch-copy>Copy batch JSON</button></div><div data-plx-batch-results></div></details>`);
      renderHistory(workbench);
    }

    function addPanels(workbench) {
      const feedback = workbench.form.querySelector('[data-tool-feedback]');
      if (!feedback || workbench.form.querySelector('[data-plx-panel]')) return;
      feedback.insertAdjacentHTML('afterend','<section class="plx-panel" data-plx-panel><div class="plx-empty" data-plx-empty><strong>Paste a Polish workflow value or generate a safe fixture.</strong><p>All checks run offline. Live official status, registry ownership, payment authorization, customs status, and legal verification are intentionally out of scope.</p></div><div class="plx-timeline" data-plx-timeline></div><div class="plx-summary" data-plx-summary></div><div data-plx-breakdown></div><div data-plx-quality></div><div data-plx-dev></div></section>');
    }

    function bindEvents(workbench, config) {
      const preset = workbench.form.querySelector('[data-plx-preset]');
      if (preset) preset.addEventListener('change', () => { if (preset.value !== '') { setInput(workbench, config.samples[Number(preset.value)]); run(workbench, 'validate'); } });
      const history = workbench.form.querySelector('[data-plx-history]');
      if (history) history.addEventListener('change', () => { if (history.value) { setInput(workbench, history.value); run(workbench, 'validate'); } });
      workbench.form.addEventListener('click', event => {
        const copy = event.target.closest('[data-plx-copy]');
        if (copy) copySpecial(workbench, copy.dataset.plxCopy);
        if (event.target.closest('[data-plx-batch-run]')) runBatch(workbench);
        if (event.target.closest('[data-plx-batch-copy]')) copyBatch(workbench);
      });
    }

    function hydrateFromQuery(workbench) { const value = new URLSearchParams(window.location.search).get('value'); if (value) { setInput(workbench, value); run(workbench, 'validate', { quiet:true }); } }
    function detectInputMode(value) { const config = TOOLS[currentSlug()] || TOOLS['poland-id-card-validator']; if (!String(value||'').trim()) return { label:'Waiting for ' + config.label, state:'' }; const result = config.analyze(value); return { label: result.valid ? 'Looks valid: ' + result.type : 'Needs review: ' + result.type, state: result.valid ? 'text':'invalid' }; }
    function applySample(workbench, id) { const config = workbench.form._polandExpansionConfig; const sample = config && config.samples[Number(id)]; if (sample) { setInput(workbench, sample); run(workbench, 'validate'); } }

    function run(workbench, action, options) {
      options = options || {};
      const config = workbench.form._polandExpansionConfig || TOOLS[currentSlug()] || TOOLS['poland-id-card-validator'];
      if (action === 'generate') { workbench.markActiveAction('validate'); setInput(workbench, config.generator()); return run(workbench, 'validate', options); }
      const input = workbench.primaryInput();
      const raw = input ? input.value.trim() : '';
      if (!raw) { renderEmpty(workbench, config); workbench.setOutput(''); workbench.lastResult = null; workbench.setMessage('Paste input or generate a safe fixture.', 'error'); return; }
      const result = config.analyze(raw);
      result.masked = config.mask(result.normalized || result.input);
      result.audit = audit(config, result);
      addHistory(workbench.form._polandExpansionSlug, raw, result.type);
      renderResult(workbench, config, result);
      const pretty = JSON.stringify(result.audit, null, 2);
      workbench.setOutput(pretty);
      workbench.lastResult = { type:'application/json', extension:'json', content:pretty };
      workbench.form._plxNormalized = result.normalized || result.input;
      workbench.form._plxMasked = result.masked;
      workbench.form._plxJson = pretty;
      workbench.setMessage(result.valid ? config.title + ' passed offline checks.' : config.title + ' found issues.', result.valid ? 'success':'error');
      renderHistory(workbench);
      if (!options.quiet) workbench.updateBadge();
    }

    function runBatch(workbench) {
      const config = workbench.form._polandExpansionConfig || TOOLS[currentSlug()] || TOOLS['poland-id-card-validator'];
      const input = workbench.form.querySelector('[data-plx-batch-input]');
      const target = workbench.form.querySelector('[data-plx-batch-results]');
      const rows = (input ? input.value : '').split(/\r?\n/).map(v=>v.trim()).filter(Boolean).slice(0, MAX_BATCH).map((value,index) => { const result = config.analyze(value); result.masked = config.mask(result.normalized || result.input); return { index:index+1, value, result }; });
      if (!rows.length) { target.innerHTML = '<p class="plx-muted">Paste at least one row.</p>'; workbench.setMessage('Batch input is empty.', 'error'); return; }
      const payload = { kind:'poland-expansion-batch', tool:config.title, count:rows.length, valid:rows.filter(r=>r.result.valid).length, invalid:rows.filter(r=>!r.result.valid).length, rows:rows.map(r=>({ index:r.index, input:r.value, valid:r.result.valid, type:r.result.type, normalized:r.result.normalized, masked:r.result.masked, diagnostics:r.result.diagnostics })) };
      workbench.form._plxBatchJson = JSON.stringify(payload, null, 2);
      target.innerHTML = `<div class="plx-batch-summary"><strong>${payload.valid} valid</strong><strong>${payload.invalid} review</strong><span>${payload.count} total</span></div><div class="plx-batch-table">${rows.map(r=>`<div class="${r.result.valid?'pass':'fail'}"><span>#${r.index}</span><code>${util.escapeHtml(r.value)}</code><strong>${r.result.valid?'valid':'review'}</strong><em>${util.escapeHtml(r.result.normalized||'n/a')}</em></div>`).join('')}</div>`;
      workbench.setMessage(`Batch checked ${rows.length} rows.`, payload.invalid ? 'error':'success');
    }
    function copyBatch(workbench) { const json = workbench.form._plxBatchJson; if (!json) { workbench.setMessage('Run a batch first.', 'error'); return; } copyText(json).then(()=>workbench.setMessage('Copied batch JSON.', 'success')); }

    function renderEmpty(workbench, config) { clearPanels(workbench); const empty = workbench.form.querySelector('[data-plx-empty]'); if (empty) empty.style.display='block'; renderTimeline(workbench, [['Input','idle','Waiting'],['Normalize','idle','Clean'],['Analyze','idle',config.family],['Boundary','idle','Offline'],['Result','idle','Ready']]); }
    function clearPanels(workbench) { ['[data-plx-summary]','[data-plx-breakdown]','[data-plx-quality]','[data-plx-dev]'].forEach(sel=>{ const el=workbench.form.querySelector(sel); if(el)el.innerHTML=''; }); workbench.setStats([], [], ''); workbench.setPreview('', ''); workbench.setAdvanced(''); }
    function renderResult(workbench, config, result) { clearPanels(workbench); const empty=workbench.form.querySelector('[data-plx-empty]'); if(empty)empty.style.display='none'; renderTimeline(workbench, [['Input','pass','Received'],['Normalize',result.normalized?'pass':'fail',result.normalized||'n/a'],['Analyze',result.valid?'pass':'fail',result.type],['Boundary','pass','Offline'],['Result',result.valid?'pass':'fail',result.valid?'Valid':'Review']]); workbench.setStats([['Normalized', result.normalized || 'n/a'], ['Masked', result.masked || 'n/a'], ['Type', result.type], ['Valid offline', result.valid?'Yes':'No'], ['Scope', result.boundary]], result.diagnostics.concat(result.warnings||[]), result.valid?'success':'error'); renderSummary(workbench, result); renderBreakdown(workbench, result); renderQuality(workbench, result); renderDev(workbench, result.audit); }
    function renderTimeline(workbench, stages) { const target=workbench.form.querySelector('[data-plx-timeline]'); if(!target)return; const pass=stages.filter(s=>s[1]==='pass').length; const width=Math.max(0,Math.min(100,((pass-1)/(stages.length-1))*100)); target.innerHTML=`<div class="plx-track"><span style="width:${width}%"></span></div><div class="plx-steps">${stages.map(s=>`<div class="${s[1]}"><span></span><strong>${util.escapeHtml(s[0])}</strong><em>${util.escapeHtml(s[2])}</em></div>`).join('')}</div>`; }
    function renderSummary(workbench, r) { const target=workbench.form.querySelector('[data-plx-summary]'); if(target)target.innerHTML=[['Type',r.type],['Normalized',r.normalized||'n/a'],['Masked',r.masked||'n/a'],['Confidence',r.valid?'offline valid':'review']].map(([a,b])=>`<article><span>${util.escapeHtml(a)}</span><strong>${util.escapeHtml(b)}</strong></article>`).join(''); }
    function renderBreakdown(workbench, r) { const target=workbench.form.querySelector('[data-plx-breakdown]'); if(!target)return; target.innerHTML=`<section class="plx-card"><h4>Field Breakdown</h4><div class="plx-fields">${(r.fields||[]).map(f=>`<div><span>${util.escapeHtml(f[0])}</span><strong>${util.escapeHtml(f[1])}</strong></div>`).join('') || '<p class="plx-muted">No structured fields were detected.</p>'}</div>${r.steps&&r.steps.length?'<ol>'+r.steps.map(s=>`<li>${util.escapeHtml(s)}</li>`).join('')+'</ol>':''}</section>`; }
    function renderQuality(workbench, r) { const target=workbench.form.querySelector('[data-plx-quality]'); if(!target)return; const items=[].concat((r.diagnostics||[]).map(x=>['Diagnostic',x,'bad']),(r.warnings||[]).map(x=>['Warning',x,'warn']),(r.recommendations||[]).map(x=>['Suggestion',x,'tip'])); if(!items.length)items.push(['Status','No offline structural issues found.','ok']); target.innerHTML=`<section class="plx-card"><h4>Quality Notes</h4><div class="plx-quality-list">${items.map(i=>`<article class="${i[2]}"><span>${util.escapeHtml(i[0])}</span><p>${util.escapeHtml(i[1])}</p></article>`).join('')}</div></section>`; }
    function renderDev(workbench, auditPayload) { const target=workbench.form.querySelector('[data-plx-dev]'); if(target)target.innerHTML=`<section class="plx-card"><h4>Developer Snapshot</h4><pre class="plx-code"><code>${syntaxHighlightJson(auditPayload)}</code></pre></section>`; }

    function base(input, normalized, valid, type, fields, diagnostics, warnings, recommendations, boundary, steps) { return { input, normalized, valid, type, fields:fields||[], diagnostics:diagnostics||[], warnings:warnings||[], recommendations:recommendations||[], boundary:boundary||'Official live status is not checked.', steps:steps||[] }; }

    function analyzeIdCard(raw) { const s=String(raw||'').toUpperCase().replace(/[^A-Z0-9]/g,''); const diag=[]; if(!/^[A-Z]{3}\d{6}$/.test(s)) return base(raw,s,false,'Polish ID card number',[],['Expected three letters followed by six digits.'],[],['Use display form ABC123456.'],'Identity document existence and holder identity are not checked.'); const weights=[7,3,1,7,3,1,7,3]; const values=[charVal(s[0]),charVal(s[1]),charVal(s[2]),Number(s[4]),Number(s[5]),Number(s[6]),Number(s[7]),Number(s[8])]; const sum=values.reduce((a,v,i)=>a+v*weights[i],0); const expected=sum%10; const valid=expected===Number(s[3]); if(!valid)diag.push(`Expected control digit ${expected}, got ${s[3]}.`); return base(raw,s,valid,'Polish ID card number',[['Letters',s.slice(0,3)],['Control digit',s[3]],['Serial',s.slice(4)],['Checksum sum',String(sum)]],diag,[],valid?[]:[`For a safe fixture use ${s.slice(0,3)}${expected}${s.slice(4)}.`],'Document existence, expiry, and holder identity are not checked.',values.map((v,i)=>`${v} x ${weights[i]} = ${v*weights[i]}`)); }
    function generateIdCard(){ const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ'; for(;;){ const l=Array.from({length:3},()=>letters[Math.floor(Math.random()*letters.length)]).join(''); const tail=String(Math.floor(Math.random()*1e5)).padStart(5,'0'); const weights=[7,3,1,7,3,1,7,3]; const vals=[charVal(l[0]),charVal(l[1]),charVal(l[2]),...tail.split('').map(Number)]; const check=vals.reduce((a,v,i)=>a+v*weights[i],0)%10; return l+check+tail; } }
    function charVal(c){ return c.charCodeAt(0)-55; }

    function analyzeBic(raw){ const s=String(raw||'').toUpperCase().replace(/[^A-Z0-9]/g,''); const valid=/^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(s); const fields=[['Bank code',s.slice(0,4)||'n/a'],['Country',s.slice(4,6)||'n/a'],['Location',s.slice(6,8)||'n/a'],['Branch',s.slice(8)||'primary / none'],['Bank hint',BIC_BANKS[s.slice(0,4)]||BIC_BANKS[s]||'unknown offline']]; const diag=[]; if(!valid)diag.push('BIC must be 8 or 11 characters: bank(4) + country(2) + location(2) + optional branch(3).'); if(valid&&s.slice(4,6)!=='PL') diag.push('BIC syntax is valid but country code is not PL.'); return base(raw,s,valid&&s.slice(4,6)==='PL','BIC / SWIFT',fields,diag,[],['Use bank APIs or SWIFT directory data for live institution status.'],'Institution existence and routing availability are not checked.'); }
    function analyzeTeryt(raw){ const s=digits(raw); let type='Unknown TERYT-like code'; if(s.length===2)type='Voivodeship code'; else if(s.length===4)type='County code'; else if(s.length===7)type='Gmina/SIMC-like code'; else if(s.length===5)type='ULIC-like street code'; const valid=[2,4,5,7].includes(s.length); return base(raw,s,valid,type,[['Length',String(s.length)],['Voivodeship prefix',s.slice(0,2)||'n/a'],['Voivodeship hint',VOIVODESHIPS[s.slice(0,2)]||'unknown offline'],['Code family',type]],valid?[]:[`Unsupported TERYT-like length ${s.length}.`],[],['Use official TERYT/SIMC/ULIC datasets for authoritative names and hierarchy.'],'Official administrative registry names and status are not checked.'); }
    function analyzeBlik(raw){ const d=digits(raw); const valid=/^\d{6}$/.test(d); return base(raw,d,valid,'BLIK code',[['Digits',d],['Length',`${d.length}/6`],['Lifecycle','short-lived authorization code']],valid?[]:['BLIK code shape is six digits.'],[],['Never log real BLIK codes; treat them as short-lived secrets.'],'Payment authorization, expiry, and bank approval are not checked.'); }
    function generateBlik(){ return String(Math.floor(Math.random()*1e6)).padStart(6,'0'); }

    function analyzePlnAmount(raw){ const amount=parseAmount(raw); const valid=Number.isFinite(amount); const grosz=valid?Math.round(amount*100):NaN; return base(raw,valid?formatPln(amount):String(raw||''),valid,'PLN amount',[['Decimal PLN',valid?amount.toFixed(2):'n/a'],['Grosz',valid?String(grosz):'n/a'],['pl-PL display',valid?formatPln(amount):'n/a'],['JSON number',valid?amount.toFixed(2):'n/a']],valid?[]:['Could not parse a decimal PLN amount.'],[],['Store money in integer grosz where possible.'],'Currency conversion and accounting policy are not checked.'); }
    function analyzeGrosz(raw){ const s=String(raw||''); const looksGrosz=/grosz|gr/i.test(s); const amount=looksGrosz?Number(digits(s))/100:parseAmount(s); const valid=Number.isFinite(amount); return base(raw,valid?formatPln(amount):s,valid,'PLN grosz conversion',[['PLN',valid?amount.toFixed(2):'n/a'],['Grosz',valid?String(Math.round(amount*100)):'n/a'],['Display',valid?formatPln(amount):'n/a']],valid?[]:['Could not parse PLN or grosz amount.'],[],['Use integer grosz for storage and decimal display only at boundaries.'],'Accounting policy and currency conversion are not checked.'); }
    function analyzeVatCalc(raw){ const amount=parseAmount(raw); const rateMatch=String(raw||'').match(/(23|8|5|0)\s*%/); const rate=rateMatch?Number(rateMatch[1]):23; const grossMode=/gross|brutto/i.test(String(raw||'')); const valid=Number.isFinite(amount)&&PL_VAT_RATES.includes(rate); const net=valid?(grossMode?amount/(1+rate/100):amount):NaN; const vat=valid?net*rate/100:NaN; const gross=valid?net+vat:NaN; return base(raw,valid?`${formatPln(net)} net / ${formatPln(gross)} gross`:String(raw||''),valid,'Polish VAT calculation',[['Rate',rate+'%'],['Input mode',grossMode?'gross/brutto':'net'],['Net',valid?formatPln(net):'n/a'],['VAT',valid?formatPln(vat):'n/a'],['Gross',valid?formatPln(gross):'n/a']],valid?[]:['Provide an amount and one of common VAT rates: 23%, 8%, 5%, or 0%.'],['VAT rates and exemptions can depend on goods/services and law changes.'],['Verify production tax treatment with accounting/legal sources.'],'Tax classification, exemptions, and official interpretation are not checked.'); }

    function analyzeDateLocale(raw){ const s=String(raw||'').trim(); let date=new Date(s); if(Number.isNaN(date.getTime())){ const m=s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/); if(m)date=new Date(Date.UTC(Number(m[3]),Number(m[2])-1,Number(m[1]))); } const valid=!Number.isNaN(date.getTime()); const pl=new Intl.DateTimeFormat('pl-PL',{dateStyle:'full',timeStyle:'short',timeZone:'Europe/Warsaw'}); return base(raw,valid?date.toISOString():s,valid,'pl-PL date / locale',[['ISO',valid?date.toISOString():'n/a'],['Europe/Warsaw display',valid?pl.format(date):'n/a'],['Locale','pl-PL'],['Time zone','Europe/Warsaw'],['Week start','Monday']],valid?[]:['Could not parse date. Try ISO or DD.MM.YYYY.'],[],['Store ISO timestamps and format for pl-PL at display boundaries.'],'Business calendars, holidays, and legal deadlines are not checked.'); }
    function analyzeAddress(raw){ const s=String(raw||'').trim(); const postal=(s.match(/\b\d{2}-?\d{3}\b/)||[''])[0]; const normalizedPostal=postal?postal.replace(/\D/g,'').replace(/^(\d{2})(\d{3})$/,'$1-$2'):''; const city=s.replace(postal,'').split(',').pop().trim(); const valid=!!normalizedPostal && s.length>5; return base(raw,s.replace(/\s+/g,' '),valid,'Polish address',[['Postal code',normalizedPostal||'n/a'],['City hint',city||'n/a'],['Street line',s.split(',')[0]||'n/a'],['Contains apartment marker',/[\/m.]\s*\d+/i.test(s)?'yes':'unknown']],valid?[]:['Address should include a Polish postal code in NN-NNN format.'],[],['Keep structured fields for street, building, apartment, postal code, and city.'],'Deliverability and official address registry status are not checked.'); }

    function analyzeVin(raw){ const s=String(raw||'').toUpperCase().replace(/[^A-Z0-9]/g,''); const diag=[]; if(!/^[A-HJ-NPR-Z0-9]{17}$/.test(s)) diag.push('VIN must contain 17 characters and exclude I, O, and Q.'); const expected=vinCheck(s); const check=s[8]; const valid=diag.length===0 && expected===check; if(diag.length===0&&!valid)diag.push(`Expected VIN check digit ${expected}, got ${check}.`); return base(raw,s,valid,'VIN',[['WMI',s.slice(0,3)||'n/a'],['Check digit',check||'n/a'],['Expected check',expected||'n/a'],['Model year code',s[9]||'n/a'],['Serial',s.slice(11)||'n/a']],diag,[],['Use official vehicle sources for make/model/title/insurance status.'],'Vehicle registration, ownership, recalls, and insurance status are not checked.'); }
    function vinCheck(s){ if(!/^[A-HJ-NPR-Z0-9]{17}$/.test(s))return ''; const sum=Array.from(s).reduce((a,ch,i)=>a+(Number(ch)||VIN_TRANSLIT[ch]||0)*VIN_WEIGHTS[i],0); const rem=sum%11; return rem===10?'X':String(rem); }
    function analyzeEori(raw){ const s=String(raw||'').toUpperCase().replace(/[^A-Z0-9]/g,''); const pl=s.startsWith('PL'); const body=pl?s.slice(2):s; const nip=analyzeNipLike(body); const valid=pl && /^\d{10}(\d{5})?$/.test(body) && (body.length!==10 || nip.valid); return base(raw,s,valid,'PL EORI',[['Country prefix',pl?'PL':'missing / non-PL'],['Body',body||'n/a'],['NIP-like root',body.slice(0,10)||'n/a'],['NIP checksum',body.length>=10?(nip.valid?'pass':'review'):'n/a']],valid?[]:['Expected PL prefix followed by a NIP-like root, commonly PL + NIP for local workflows.'],[],['Use official customs systems for real EORI status.'],'Customs registration status is not checked.'); }
    function analyzePii(raw){ const input=String(raw||''); const masked=maskPii(input); const findings=[]; if(/\b\d{11}\b/.test(input))findings.push('PESEL-like 11-digit value'); if(/\b\d{10}\b/.test(input))findings.push('NIP/KRS-like 10-digit value'); if(/PL\d{26}|\b\d{26}\b/i.test(input))findings.push('IBAN/NRB-like account'); if(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(input))findings.push('Email'); if(/\+?48[\s-]?\d{3}/.test(input))findings.push('Polish phone-like value'); return base(raw,masked,findings.length>0,'Polish PII mask',[['Findings',findings.join(', ')||'none'],['Masked text',masked],['Length',String(input.length)]],findings.length?[]:['No obvious supported Polish PII pattern was detected.'],[],['Review masked output before sharing logs externally.'],'This is pattern masking, not full DLP classification.'); }
    function analyzeTestData(raw){ const nip=generateNip(); const id=generateIdCard(); const postal='00-001'; const phone='+48 501 '+String(Math.floor(Math.random()*1000)).padStart(3,'0')+' '+String(Math.floor(Math.random()*1000)).padStart(3,'0'); const fixture={ profile:String(raw||'polish fixture'), nip, idCard:id, postalCode:postal, phone, bic:'BPKOPLPW', amount:'123,45 zł' }; return base(raw,JSON.stringify(fixture),true,'Polish test data fixture',Object.entries(fixture),[],['Generated values are fictional and for development only.'],['Never use generated fixtures as real identities, companies, accounts, or payment credentials.'],'Official existence is not claimed.'); }
    function analyzeInvoice(raw){ const s=String(raw||'').trim(); const year=(s.match(/20\d{2}/)||[''])[0]; const seq=(s.match(/\d{2,}$/)||[''])[0]; const valid=s.length>=3 && /\d/.test(s); return base(raw,s.toUpperCase().replace(/\s+/g,''),valid,'Invoice number',[['Year hint',year||'n/a'],['Sequence hint',seq||'n/a'],['Separators',(/[\/\-]/.test(s)?'yes':'no')],['Search key',s.toUpperCase().replace(/[^A-Z0-9]/g,'')]],valid?[]:['Invoice number should contain a stable sequence or document identifier.'],[],['Store raw display number and normalized search key separately.'],'Official invoice issuance and accounting compliance are not checked.'); }
    function generateInvoice(){ const d=new Date(); return `FV/${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(Math.floor(Math.random()*99999)+1).padStart(5,'0')}`; }
    function analyzeSepa(raw){ const s=String(raw||''); const iban=(s.match(/PL\d{26}|\b\d{26}\b/i)||[''])[0]; const bic=(s.match(/\b[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}(?:[A-Z0-9]{3})?\b/i)||[''])[0]; const amount=parseAmount(s); const valid=!!iban && !!bic && Number.isFinite(amount); return base(raw,maskPii(s),valid,'Polish SEPA readiness',[['IBAN/NRB detected',iban||'missing'],['BIC detected',bic||'missing'],['Amount',Number.isFinite(amount)?formatPln(amount):'missing'],['Reference present',s.length>40?'likely':'unknown']],valid?[]:['Provide Polish IBAN/NRB, BIC, and transfer amount.'],[],['Validate account ownership and payment rails with banking systems before sending money.'],'Payment execution, account ownership, sanctions, and bank availability are not checked.'); }

    function analyzeNipLike(d){ d=digits(d).slice(0,10); if(!/^\d{10}$/.test(d))return{valid:false}; const w=[6,5,7,2,3,4,5,6,7]; const c=w.reduce((a,x,i)=>a+x*Number(d[i]),0)%11; return { valid:c!==10&&c===Number(d[9]), expected:c }; }
    function generateNip(){ for(;;){ const first=String(Math.floor(Math.random()*1e9)).padStart(9,'0'); const w=[6,5,7,2,3,4,5,6,7]; const c=w.reduce((a,x,i)=>a+x*Number(first[i]),0)%11; if(c!==10)return first+c; } }
    function parseAmount(raw){ let s=String(raw||'').replace(/zł|PLN|gross|brutto|netto|net|grosz|gr/gi,' ').replace(/\s/g,''); const comma=s.lastIndexOf(','), dot=s.lastIndexOf('.'); if(comma>dot)s=s.replace(/\./g,'').replace(',','.'); else s=s.replace(/,/g,''); const match=s.match(/-?\d+(?:\.\d+)?/); return match?Number(match[0]):NaN; }
    function formatPln(amount){ return new Intl.NumberFormat('pl-PL',{style:'currency',currency:'PLN'}).format(amount); }
    function digits(v){ return String(v||'').replace(/\D/g,''); }
    function maskDigits(d,start,end){ if(!d)return''; return d.slice(0,start)+'*'.repeat(Math.max(0,d.length-start-end))+d.slice(Math.max(start,d.length-end)); }
    function maskGeneric(v){ const s=String(v||''); return s.length<=6?maskDigits(s,2,1):s.slice(0,3)+'*'.repeat(Math.min(8,s.length-6))+s.slice(-3); }
    function maskAddress(v){ return String(v||'').replace(/\b(\d{2})-?(\d{3})\b/g,'$1-***').replace(/\b\d+[A-Za-z]?(?:\/\d+)?\b/g,'**'); }
    function maskPii(v){ return String(v||'').replace(/PL\d{26}|\b\d{26}\b/gi,m=>m.slice(0,4)+' **** **** **** '+m.slice(-4)).replace(/\b\d{11}\b/g,m=>maskDigits(m,3,3)).replace(/\b\d{10}\b/g,m=>maskDigits(m,3,3)).replace(/\+?48[\s-]?\d{3}[\s-]?\d{3}[\s-]?\d{3}/g,m=>'+48 *** *** '+digits(m).slice(-3)).replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,m=>m[0]+'***@'+m.split('@')[1]); }
    function escapeAttr(v){ return String(v).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;'); }
    function setInput(workbench,value){ const input=workbench.primaryInput(); if(input){input.value=value; input.dispatchEvent(new Event('input',{bubbles:true}));} }
    function copySpecial(workbench,kind){ const val=kind==='json'?workbench.form._plxJson:kind==='masked'?workbench.form._plxMasked:workbench.form._plxNormalized; if(!val){workbench.setMessage('Nothing to copy yet.','error');return;} copyText(val).then(()=>workbench.setMessage(kind==='json'?'Copied audit JSON.':kind==='masked'?'Copied masked value.':'Copied normalized value.','success')); }
    function copyText(value){ if(navigator.clipboard&&navigator.clipboard.writeText)return navigator.clipboard.writeText(value); const el=document.createElement('textarea'); el.value=value; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el); return Promise.resolve(); }
    function audit(config,r){ return { kind:'poland-expansion-suite', version:1, tool:config.title, valid:r.valid, type:r.type, input:r.input, normalized:r.normalized, masked:r.masked, fields:r.fields, diagnostics:r.diagnostics, warnings:r.warnings, recommendations:r.recommendations, boundary:r.boundary, generatedAt:new Date().toISOString() }; }
    function syntaxHighlightJson(obj){ return util.escapeHtml(JSON.stringify(obj,null,2)).replace(/(&quot;[^&]*?&quot;)(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?/g,(m,s,c)=>s&&c?'<span class="plx-json-key">'+s+'</span>'+c:s?'<span class="plx-json-string">'+s+'</span>':/true|false/.test(m)?'<span class="plx-json-bool">'+m+'</span>':/null/.test(m)?'<span class="plx-json-null">'+m+'</span>':'<span class="plx-json-number">'+m+'</span>'); }
    function addHistory(slug,value,label){ const all=readAllHistory(); const list=(all[slug]||[]).filter(i=>i.value!==value); list.unshift({value,label,at:Date.now()}); all[slug]=list.slice(0,MAX_HISTORY); localStorage.setItem(STORAGE_KEY,JSON.stringify(all)); }
    function readAllHistory(){ try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');}catch(e){return{};} }
    function renderHistory(workbench){ const sel=workbench.form.querySelector('[data-plx-history]'); if(!sel)return; const list=(readAllHistory()[workbench.form._polandExpansionSlug]||[]); sel.innerHTML=list.length?'<option value="">Choose recent input</option>'+list.map(i=>`<option value="${escapeAttr(i.value)}">${escapeAttr(i.label)} - ${escapeAttr(i.value.slice(0,44))}</option>`).join(''):'<option value="">No history yet</option>'; }

    function injectStyles(){ if(document.getElementById('poland-expansion-styles'))return; const style=document.createElement('style'); style.id='poland-expansion-styles'; style.textContent=`.poland-expansion-workbench{--plx:#0f766e;--plx-bad:#dc2626;--plx-ok:#16a34a}.poland-expansion-badge-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}.poland-expansion-badge-row span{font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.05em;border:1px solid var(--line);border-radius:999px;padding:5px 10px;background:rgba(15,118,110,.07);color:var(--plx)}.plx-select{min-width:220px}.plx-panel{margin-top:22px;display:flex;flex-direction:column;gap:18px}.plx-empty,.plx-card,.plx-batch{border:1px solid var(--line);border-radius:10px;background:#fff;padding:16px}.plx-empty{background:var(--surface-soft);color:var(--muted)}.plx-timeline{border:1px solid var(--line);border-radius:10px;padding:18px;background:#fff;overflow:hidden}.plx-track{height:3px;background:#e5e7eb;margin:16px 28px 0}.plx-track span{display:block;height:100%;max-width:100%;background:var(--plx-ok)}.plx-steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px;margin-top:-13px}.plx-steps>div{text-align:center;color:var(--muted);min-width:0}.plx-steps span{width:24px;height:24px;border-radius:999px;display:block;margin:0 auto 9px;background:#d1d5db;border:4px solid #fff;box-shadow:0 0 0 1px var(--line)}.plx-steps .pass span{background:var(--plx-ok);box-shadow:0 0 0 5px rgba(22,163,74,.12)}.plx-steps .fail span{background:var(--plx-bad);box-shadow:0 0 0 5px rgba(220,38,38,.11)}.plx-steps strong{display:block;font-size:.72rem;text-transform:uppercase;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.plx-steps em{display:block;font-size:.68rem;font-style:normal;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.plx-summary,.plx-fields{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}.plx-summary article,.plx-fields>div{border:1px solid var(--line);border-radius:10px;background:#fff;padding:14px;min-width:0}.plx-summary span,.plx-fields span{display:block;color:var(--muted);font-size:.68rem;font-weight:900;letter-spacing:.07em;text-transform:uppercase;margin-bottom:6px}.plx-summary strong,.plx-fields strong{overflow-wrap:anywhere}.plx-card h4{font-size:.82rem;text-transform:uppercase;letter-spacing:.06em;border-bottom:1px solid var(--line);padding-bottom:10px;margin:0 0 12px}.plx-quality-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.plx-quality-list article{border:1px solid var(--line);border-radius:8px;padding:12px;background:var(--surface-soft)}.plx-quality-list .ok{border-color:rgba(22,163,74,.25);background:rgba(22,163,74,.06)}.plx-quality-list .bad{border-color:rgba(220,38,38,.3);background:rgba(220,38,38,.06)}.plx-quality-list .warn{border-color:rgba(217,119,6,.28);background:rgba(217,119,6,.06)}.plx-code{margin:0;overflow:auto;padding:14px;border-radius:8px;background:#0f172a;color:#dbeafe;font-size:.78rem}.plx-json-key{color:#93c5fd}.plx-json-string{color:#86efac}.plx-json-number{color:#fbbf24}.plx-json-bool{color:#f0abfc}.plx-json-null{color:#cbd5e1}.plx-batch{margin:16px 0}.plx-batch summary{cursor:pointer;display:flex;justify-content:space-between;gap:12px}.plx-actions{display:flex;flex-wrap:wrap;gap:10px;margin:12px 0}.plx-batch-summary{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}.plx-batch-summary>*{border:1px solid var(--line);border-radius:999px;padding:6px 10px;background:var(--surface-soft)}.plx-batch-table{display:grid;gap:6px}.plx-batch-table>div{display:grid;grid-template-columns:44px minmax(0,1fr) 80px minmax(0,1fr);gap:8px;align-items:center;border:1px solid var(--line);border-radius:8px;padding:8px}.plx-batch-table code,.plx-batch-table em{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.plx-batch-table .pass strong{color:var(--plx-ok)}.plx-batch-table .fail strong{color:var(--plx-bad)}.plx-muted{color:var(--muted)}@media(max-width:800px){.plx-summary,.plx-fields,.plx-quality-list{grid-template-columns:1fr}.plx-track{display:none}.plx-steps{grid-template-columns:repeat(2,minmax(0,1fr));margin-top:0;row-gap:14px}.plx-steps strong,.plx-steps em{white-space:normal}.plx-batch-table>div{grid-template-columns:36px minmax(0,1fr)}.plx-batch-table em{grid-column:2}}`; document.head.appendChild(style); }

    return { filePrefix:'poland-expansion', onMount, run, applySample, detectInputMode };
  })(window.ValidoWorkbench || { utilities: {} });

  if (window.ValidoWorkbench) {
    window.ValidoWorkbench.registerPlugin(ALGORITHM_ID, Plugin);
    window.ValidoWorkbench.mountAll();
  }
})();
