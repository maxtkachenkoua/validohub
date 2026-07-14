(function () {
  'use strict';

  const ALGORITHM_ID = 'validohub.poland-suite';
  const STORAGE_KEY = 'validohub.polandSuite.history.v1';
  const MAX_HISTORY = 8;

  let TOOLS;

  const BANKS = {
    '1010': 'Narodowy Bank Polski', '1020': 'PKO Bank Polski', '1030': 'Bank Handlowy', '1050': 'ING Bank Slaski', '1090': 'Santander Bank Polska', '1140': 'mBank', '1160': 'Bank Millennium', '1240': 'Bank Pekao', '1320': 'Bank Pocztowy', '1540': 'BOS Bank', '1870': 'Nest Bank', '1940': 'Credit Agricole Bank Polska', '2030': 'BNP Paribas Bank Polska', '2120': 'Santander Consumer Bank', '2490': 'Alior Bank'
  };
  const PLATE_PREFIXES = { W: 'Mazowieckie / Warsaw region', WA: 'Warsaw', WB: 'Warsaw Bemowo', KR: 'Krakow', PO: 'Poznan', GD: 'Gdansk', DW: 'Wroclaw', EL: 'Lodz', SK: 'Katowice', LU: 'Lublin', RZ: 'Rzeszow', BI: 'Bialystok', ZS: 'Szczecin', CB: 'Bydgoszcz' };

  const Plugin = (function (framework) {
    const util = framework.utilities;
    TOOLS = {
    'poland-nip-validator': { title: 'NIP Validator & Explainer', label: 'NIP', samples: ['1234563218','123-456-32-18','1234563210'], generator: generateNip, analyze: analyzeNip, family: 'Tax identifier' },
    'poland-regon-validator': { title: 'REGON Validator & Explainer', label: 'REGON', samples: ['123456785','12345678512347','123456789'], generator: generateRegon9, analyze: analyzeRegon, family: 'Business register' },
    'poland-iban-nrb-validator': { title: 'Polish IBAN / NRB Workbench', label: 'IBAN / NRB', samples: ['PL61109010140000071219812874','61109010140000071219812874','PL00109010140000071219812874'], generator: generateNrb, analyze: analyzeIbanNrb, family: 'Banking' },
    'poland-tax-microaccount-calculator': { title: 'Polish Tax Microaccount Calculator', label: 'PESEL or NIP', samples: ['44051401458','1234563218','1234563210'], generator: generateNip, analyze: analyzeTaxMicro, family: 'Tax payment' },
    'poland-postal-code-validator': { title: 'Polish Postal Code Validator', label: 'Postal code', samples: ['00-001','00001','0A-001'], generator: generatePostal, analyze: analyzePostal, family: 'Address' },
    'poland-phone-number-validator': { title: 'Polish Phone Number Workbench', label: 'Phone number', samples: ['+48 501 234 567','22 123 45 67','801 234 567','12345'], generator: generatePhone, analyze: analyzePhone, family: 'Telecom' },
    'poland-license-plate-inspector': { title: 'Polish License Plate Inspector', label: 'License plate', samples: ['WA12345','KR 1A234','PO1234A','ZZ99999'], generator: generatePlate, analyze: analyzePlate, family: 'Vehicle' },
    'poland-krs-inspector': { title: 'KRS Number Inspector', label: 'KRS number', samples: ['0000123456','1234567890','12345'], generator: generateKrs, analyze: analyzeKrs, family: 'Company register' },
    'poland-vat-validator': { title: 'Polish VAT / EU VAT Syntax Workbench', label: 'VAT number', samples: ['PL1234563218','1234563218','PL1234563210'], generator: () => 'PL' + generateNip(), analyze: analyzeVat, family: 'EU VAT syntax' },
    'poland-bank-code-inspector': { title: 'Polish Bank Code / NRB Inspector', label: 'IBAN / NRB', samples: ['PL61109010140000071219812874','61109010140000071219812874','PL00109010140000071219812874'], generator: generateNrb, analyze: analyzeBankCode, family: 'Banking' }
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
      if (summary) summary.textContent = 'Validate, normalize, generate safe fixtures, and inspect Polish data locally with PESEL-grade diagnostics.';
      if (!intro.querySelector('.poland-badge-row')) {
        intro.insertAdjacentHTML('beforeend', '<div class="poland-badge-row"><span class="poland-pill active">Local Sandbox</span><span class="poland-pill">Poland Suite</span><span class="poland-pill">Checksum Debugger</span><span class="poland-pill">Developer JSON</span><span class="poland-pill">No Lookup</span></div>');
      }
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
        buttonRow.insertAdjacentHTML('beforeend', '<button type="button" class="button button-secondary" data-poland-copy="normalized">Copy normalized</button><button type="button" class="button button-secondary" data-poland-copy="json">Copy JSON</button>');
      }
    }

    function addControls(workbench, config) {
      const grid = workbench.form.querySelector('.field-grid');
      if (!grid || grid.querySelector('[data-poland-preset]')) return;
      grid.insertAdjacentHTML('afterbegin', `<label class="field poland-select-field"><span>Presets</span><select data-poland-preset><option value="">Choose a ${escapeAttr(config.label)} sample</option>${config.samples.map((sample, index) => `<option value="${index}">${escapeAttr(sample)}</option>`).join('')}</select><small>Valid, formatted, and failing cases.</small></label><label class="field poland-select-field"><span>Recent local inputs</span><select data-poland-history><option value="">No history yet</option></select><small>Stored only in this browser.</small></label>`);
      const input = workbench.primaryInput();
      if (input && input.closest('.field')) input.closest('.field').style.gridColumn = '1 / -1';
      renderHistory(workbench);
    }

    function addPanels(workbench) {
      const feedback = workbench.form.querySelector('[data-tool-feedback]');
      if (!feedback || workbench.form.querySelector('[data-poland-panel]')) return;
      feedback.insertAdjacentHTML('afterend', '<section class="poland-panel" data-poland-panel><div class="poland-empty-state" data-poland-empty><div class="poland-empty-icon">PL</div><div><strong>Paste a Polish value or generate a safe fixture.</strong><p>Validation runs locally. Registry, bank, phone, vehicle, and tax-status lookups are intentionally outside this browser-only tool.</p></div></div><div class="poland-timeline" data-poland-timeline></div><div class="poland-summary-grid" data-poland-summary></div><div class="poland-breakdown" data-poland-breakdown></div><div class="poland-debugger" data-poland-debugger></div><div class="poland-dev-panel" data-poland-dev></div></section>');
    }

    function bindEvents(workbench, config) {
      const preset = workbench.form.querySelector('[data-poland-preset]');
      if (preset) preset.addEventListener('change', () => { if (preset.value !== '') { setInput(workbench, config.samples[Number(preset.value)]); run(workbench, 'validate'); } });
      const history = workbench.form.querySelector('[data-poland-history]');
      if (history) history.addEventListener('change', () => { if (history.value) { setInput(workbench, history.value); run(workbench, 'validate'); } });
      workbench.form.addEventListener('click', event => {
        const copy = event.target.closest('[data-poland-copy]');
        if (copy) copySpecial(workbench, copy.dataset.polandCopy);
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
      addHistory(workbench.form._polandSlug, raw, result.type);
      renderResult(workbench, config, result);
      const json = publicJson(config, result);
      workbench.setOutput(JSON.stringify(json, null, 2));
      workbench.lastResult = { type: 'application/json', extension: 'json', content: JSON.stringify(json, null, 2) };
      workbench.form._polandNormalized = result.normalized || result.input;
      workbench.form._polandJson = JSON.stringify(json, null, 2);
      workbench.setMessage(result.valid ? config.title + ' passed offline checks.' : config.title + ' found issues.', result.valid ? 'success' : 'error');
      renderHistory(workbench);
      if (!options.quiet) workbench.updateBadge();
    }

    function renderEmpty(workbench, config) {
      clearPanels(workbench);
      const empty = workbench.form.querySelector('[data-poland-empty]');
      if (empty) empty.style.display = 'flex';
      renderTimeline(workbench, [stage('Input','idle','Waiting'),stage('Normalize','idle','Clean'),stage('Type','idle',config.family),stage('Checksum','idle','Calculate'),stage('Context','idle','Explain'),stage('Result','idle','Ready')]);
    }

    function clearPanels(workbench) {
      ['[data-poland-summary]','[data-poland-breakdown]','[data-poland-debugger]','[data-poland-dev]'].forEach(sel => { const el = workbench.form.querySelector(sel); if (el) el.innerHTML = ''; });
      workbench.setStats([], [], ''); workbench.setPreview('', ''); workbench.setAdvanced('');
    }

    function renderResult(workbench, config, result) {
      clearPanels(workbench);
      const empty = workbench.form.querySelector('[data-poland-empty]');
      if (empty) empty.style.display = 'none';
      renderTimeline(workbench, [stage('Input','pass','Received'),stage('Normalize',result.normalized ? 'pass':'fail',result.normalized || 'n/a'),stage('Type',result.type === 'Unknown' ? 'fail':'pass',result.type),stage('Checksum',result.checksumStatus,result.expected || 'n/a'),stage('Context','pass',config.family),stage('Result',result.valid ? 'pass':'fail',result.valid ? 'Valid':'Fix')]);
      workbench.setStats([['Input characters', String(Array.from(result.input || '').length)],['Normalized', result.normalized || 'n/a'],['Detected type', result.type],['Valid offline', result.valid ? 'Yes':'No'],['What this proves', 'Syntax / checksum only'],['What it does not prove', result.boundary || 'Official status']], result.diagnostics.concat(result.warnings || []), result.valid ? 'success':'error');
      renderSummary(workbench, [card('Type', result.type, result.valid ? 'success':'error'), card('Normalized', result.normalized || 'n/a', 'mono'), card('Control', result.expected || 'n/a', result.valid ? 'success':'error'), card('Context', result.context || config.family, '')]);
      renderBreakdown(workbench, breakdownHtml(result));
      renderDebugger(workbench, debuggerHtml(result));
      renderDev(workbench, devHtml(config, result));
    }

    function renderTimeline(workbench, stages) {
      const target = workbench.form.querySelector('[data-poland-timeline]'); if (!target) return;
      const complete = stages.filter(s => s.state === 'pass').length;
      const width = Math.max(0, Math.min(100, ((complete - 1) / (stages.length - 1)) * 100));
      target.innerHTML = `<div class="poland-timeline-track"><span style="width:${width}%"></span></div><div class="poland-timeline-steps">${stages.map(s => `<div class="poland-step ${s.state}"><span></span><strong>${util.escapeHtml(s.label)}</strong><em>${util.escapeHtml(s.note)}</em></div>`).join('')}</div>`;
    }
    function renderSummary(workbench, cards) { const target = workbench.form.querySelector('[data-poland-summary]'); if (target) target.innerHTML = cards.map(c => `<article class="poland-summary-card ${c.state || ''}"><span>${util.escapeHtml(c.label)}</span><strong>${util.escapeHtml(c.value)}</strong></article>`).join(''); }
    function renderBreakdown(workbench, html) { const target = workbench.form.querySelector('[data-poland-breakdown]'); if (target) target.innerHTML = html; }
    function renderDebugger(workbench, html) { const target = workbench.form.querySelector('[data-poland-debugger]'); if (target) target.innerHTML = html; }
    function renderDev(workbench, html) { const target = workbench.form.querySelector('[data-poland-dev]'); if (target) target.innerHTML = html; }

    function resultBase(input, normalized, valid, type, expected, provided, steps, diagnostics, context, boundary, warnings) {
      return { input: input, normalized: normalized, valid: valid, type: type, expected: expected || '', provided: provided || '', steps: steps || [], diagnostics: diagnostics || [], warnings: warnings || [], context: context || '', boundary: boundary || 'Registry/live status is not checked.', checksumStatus: expected ? (valid ? 'pass':'fail') : 'idle' };
    }

    function analyzeNip(raw) { const d = digits(raw); const steps=[]; if (!/^\d{10}$/.test(d)) return resultBase(raw,d,false,'NIP','', '', [], ['NIP must contain exactly 10 digits.'],'Polish tax identifier'); const w=[6,5,7,2,3,4,5,6,7]; const sum=w.reduce((a,x,i)=>{ const p=x*Number(d[i]); steps.push(`${d[i]} x ${x} = ${p}`); return a+p; },0); const c=sum%11; steps.push(`sum ${sum} mod 11 = ${c}`); const valid=c!==10 && c===Number(d[9]); return resultBase(raw,d,valid,'NIP', c===10?'invalid checksum state':String(c), d[9], steps, valid?[]:[c===10?'Checksum result 10 is invalid for NIP.':`Expected check digit ${c}.`], 'Tax identifier / VAT base'); }
    function generateNip(){ for(;;){ const first=String(Math.floor(Math.random()*1e9)).padStart(9,'0'); const w=[6,5,7,2,3,4,5,6,7]; const c=w.reduce((a,x,i)=>a+x*Number(first[i]),0)%11; if(c!==10) return first+c; } }

    function analyzeRegon(raw){ const d=digits(raw); if(!/^\d{9}(\d{5})?$/.test(d)) return resultBase(raw,d,false,'REGON','', '', [], ['REGON must contain 9 or 14 digits.'],'Business register'); if(d.length===9) return regon9(raw,d); const first=regon9(raw,d.slice(0,9)); const w=[2,4,8,5,0,9,7,3,6,1,2,4,8]; const steps=[]; const sum=w.reduce((a,x,i)=>{const p=x*Number(d[i]); steps.push(`${d[i]} x ${x} = ${p}`); return a+p;},0); let c=sum%11; if(c===10)c=0; steps.push(`sum ${sum} mod 11 => ${c}`); const valid=first.valid && c===Number(d[13]); return resultBase(raw,d,valid,'REGON 14',String(c),d[13],first.steps.concat(steps),valid?[]:[!first.valid?'First 9-digit REGON segment is invalid.':'14-digit REGON check digit mismatch.'],'Business branch/entity identifier'); }
    function regon9(raw,d){ const w=[8,9,2,3,4,5,6,7]; const steps=[]; const sum=w.reduce((a,x,i)=>{const p=x*Number(d[i]); steps.push(`${d[i]} x ${x} = ${p}`); return a+p;},0); let c=sum%11; if(c===10)c=0; steps.push(`sum ${sum} mod 11 => ${c}`); return resultBase(raw,d,c===Number(d[8]),'REGON 9',String(c),d[8],steps,c===Number(d[8])?[]:[`Expected check digit ${c}.`],'Business entity identifier'); }
    function generateRegon9(){ for(;;){ const b=String(Math.floor(Math.random()*1e8)).padStart(8,'0'); const r=regon9(b,b+'0'); if(r.expected) return b+r.expected; } }

    function analyzeIbanNrb(raw){ const n=normalizeIban(raw); if(!n.body) return resultBase(raw,n.normalized,false,'IBAN / NRB','', '', [], ['Enter a PL IBAN or 26-digit domestic NRB.'],'Bank account'); const nrb=n.nrb; const diag=[]; if(!/^\d{26}$/.test(nrb)) diag.push('Polish NRB must contain exactly 26 digits.'); const mod=ibanMod('PL'+nrb); const valid=diag.length===0 && mod===1; const bank=nrb.slice(2,10); const context=`Bank code ${bank.slice(0,4)}${BANKS[bank.slice(0,4)]?' - '+BANKS[bank.slice(0,4)]:''}`; return resultBase(raw,n.normalized,valid,n.prefixed?'PL IBAN':'Domestic NRB','MOD97 = 1','MOD97 = '+mod,[`NRB: ${nrb}`,`IBAN rearranged numeric stream processed with MOD-97.`,`Bank/branch segment: ${bank}`,`Account segment: ${nrb.slice(10)}`],diag.concat(valid?[]:['IBAN/NRB MOD-97 checksum failed.']),context,'Account existence and ownership are not checked.'); }
    function normalizeIban(raw){ const s=String(raw||'').toUpperCase().replace(/\s/g,''); const pref=s.startsWith('PL'); return { normalized:s, prefixed:pref, body:s, nrb:pref?s.slice(2):s }; }
    function ibanMod(value){ const s=value.toUpperCase().replace(/\s/g,''); const moved=s.slice(4)+s.slice(0,4); let rem=0; for(const ch of moved){ const part=/[A-Z]/.test(ch)?String(ch.charCodeAt(0)-55):ch; for(const digit of part) rem=(rem*10+Number(digit))%97; } return rem; }
    function generateNrb(){ const bank='10901014'; const acct=String(Math.floor(Math.random()*1e16)).padStart(16,'0'); const base='00'+bank+acct; const check=98-ibanMod('PL'+base); return 'PL'+String(check).padStart(2,'0')+bank+acct; }

    function analyzeTaxMicro(raw){ const d=digits(raw); const nip=analyzeNip(d); const pesel=/^\d{11}$/.test(d); const valid=nip.valid||pesel; const type=nip.valid?'NIP input':pesel?'PESEL-shaped input':'Unsupported input'; const candidate=valid?'10100071222 + '+d:'n/a'; return resultBase(raw,d,valid,'Tax microaccount input',candidate,d,[`Accepted source identifier: ${type}`, 'Offline helper validates whether the identifier is suitable for official tax microaccount workflows.', 'Full official account generation/status should be verified with the Ministry of Finance generator.'],valid?[]:['Use a valid NIP or an 11-digit PESEL-shaped value.'],'Tax payment identifier','This page does not claim official tax account assignment.'); }

    function analyzePostal(raw){ const d=digits(raw); const valid=/^\d{5}$/.test(d); const formatted=valid?d.slice(0,2)+'-'+d.slice(2):d; return resultBase(raw,formatted,valid,'Postal code','NN-NNN',formatted,[`Digits: ${d}`, valid?`Formatted as ${formatted}`:'Polish postal codes use two digits, hyphen, three digits.'],valid?[]:['Postal code must contain exactly five digits.'],'Address formatting','Address deliverability is not checked.'); }
    function generatePostal(){ return String(Math.floor(Math.random()*100)).padStart(2,'0')+'-'+String(Math.floor(Math.random()*1000)).padStart(3,'0'); }

    function analyzePhone(raw){ let d=digits(raw); if(d.startsWith('48')&&d.length===11)d=d.slice(2); const valid=/^\d{9}$/.test(d); const prefix=d.slice(0,2); let cat='Unknown'; if(['45','50','51','53','57','60','66','69','72','73','78','79','88'].includes(prefix)) cat='Mobile range'; else if(['12','22','32','42','58','61','71','81','91'].includes(prefix)) cat='Landline area code'; else if(d.startsWith('800')||d.startsWith('801')) cat='Toll-free/shared-cost service'; else if(d.startsWith('70')) cat='Premium-rate range'; const formatted=valid?'+48 '+d.slice(0,3)+' '+d.slice(3,6)+' '+d.slice(6):d; return resultBase(raw,formatted,valid,'Polish phone number','9 national digits',d,[`National digits: ${d}`,`Classification: ${cat}`,`E.164 display: ${formatted}`],valid?[]:['Polish national phone numbers usually contain 9 digits after +48.'],cat,'Line activity and subscriber ownership are not checked.'); }
    function generatePhone(){ return '+48 501 '+String(Math.floor(Math.random()*1000)).padStart(3,'0')+' '+String(Math.floor(Math.random()*1000)).padStart(3,'0'); }

    function analyzePlate(raw){ const s=String(raw||'').toUpperCase().replace(/[\s-]/g,''); const valid=/^[A-Z]{1,3}[A-Z0-9]{4,5}$/.test(s); const prefix=Object.keys(PLATE_PREFIXES).sort((a,b)=>b.length-a.length).find(p=>s.startsWith(p)); const context=prefix?PLATE_PREFIXES[prefix]:'Unknown prefix'; return resultBase(raw,s,valid,'License plate','Polish plate-like pattern',s,[`Normalized plate: ${s}`,`Detected prefix: ${prefix||'n/a'}`,`Region hint: ${context}`],valid?[]:['Plate does not match the supported Polish plate-like structural pattern.'],'Vehicle registration format','Registration status and vehicle ownership are not checked.'); }
    function generatePlate(){ return 'WA'+String(Math.floor(Math.random()*90000)+10000); }

    function analyzeKrs(raw){ const d=digits(raw); const valid=/^\d{10}$/.test(d); return resultBase(raw,d,valid,'KRS number','10 digits',d,[`KRS normalized value: ${d}`, 'KRS is a registry identifier; this offline inspector checks shape only.'],valid?[]:['KRS number should contain exactly 10 digits.'],'National Court Register','Company existence/status is not checked.'); }
    function generateKrs(){ return String(Math.floor(Math.random()*1e10)).padStart(10,'0'); }

    function analyzeVat(raw){ const s=String(raw||'').toUpperCase().replace(/[\s-]/g,''); const body=s.startsWith('PL')?s.slice(2):s; const r=analyzeNip(body); r.type='Polish VAT syntax'; r.normalized='PL'+body; r.context='EU VAT syntax backed by local NIP checksum'; r.boundary='VIES active VAT status is not checked.'; if(!s.startsWith('PL')) r.warnings.push('No PL prefix was provided; normalized VAT display adds PL.'); return r; }

    function analyzeBankCode(raw){ const r=analyzeIbanNrb(raw); const nrb=normalizeIban(raw).nrb; if(/^\d{26}$/.test(nrb)){ const bank=nrb.slice(2,6), branch=nrb.slice(6,10); r.type='Polish bank code / NRB'; r.expected='Bank '+bank; r.context=(BANKS[bank]||'Unknown bank code')+' / branch '+branch; r.steps.push(`Bank institution code: ${bank}`); r.steps.push(`Branch / routing segment: ${branch}`); } return r; }

    function digits(v){return String(v||'').replace(/\D/g,'');}
    function escapeAttr(v){return String(v).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');}
    function setInput(workbench,value){ const input=workbench.primaryInput(); if(input){input.value=value; input.dispatchEvent(new Event('input',{bubbles:true}));}}
    function copySpecial(workbench, kind){ const value=kind==='json'?workbench.form._polandJson:workbench.form._polandNormalized; if(!value){workbench.setMessage('Nothing to copy yet.','error');return;} copyText(value).then(()=>workbench.setMessage(kind==='json'?'Copied JSON.':'Copied normalized value.','success')); }
    function copyText(value){ if(navigator.clipboard&&navigator.clipboard.writeText)return navigator.clipboard.writeText(value); const el=document.createElement('textarea'); el.value=value; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el); return Promise.resolve(); }
    function publicJson(config,result){ return {kind:'poland-premium-suite', tool:config.title, valid:result.valid, type:result.type, input:result.input, normalized:result.normalized, expected:result.expected||null, provided:result.provided||null, context:result.context||null, boundary:result.boundary, diagnostics:result.diagnostics, warnings:result.warnings};}
    function breakdownHtml(r){ const chars=Array.from(r.normalized||'').map((c,i)=>`<span title="Position ${i+1}"><b>${util.escapeHtml(c)}</b><em>${i+1}</em></span>`).join(''); return `<section class="poland-section-card"><div class="poland-section-title">Field Breakdown</div><div class="poland-token-row">${chars}</div><div class="poland-detail-grid"><div><span>Input</span><strong>${util.escapeHtml(r.input)}</strong></div><div><span>Normalized</span><strong>${util.escapeHtml(r.normalized||'n/a')}</strong></div><div><span>Type</span><strong>${util.escapeHtml(r.type)}</strong></div><div><span>Boundary</span><strong>${util.escapeHtml(r.boundary||'Offline only')}</strong></div></div></section>`;}
    function debuggerHtml(r){ return `<section class="poland-section-card"><div class="poland-section-title">Debugger</div><div class="poland-detail-grid"><div><span>Expected</span><strong>${util.escapeHtml(r.expected||'n/a')}</strong></div><div><span>Provided</span><strong>${util.escapeHtml(r.provided||'n/a')}</strong></div><div><span>Status</span><strong class="${r.valid?'poland-ok':'poland-bad'}">${r.valid?'Pass':'Review'}</strong></div><div><span>Scope</span><strong>Offline</strong></div></div>${r.steps.length?'<ol class="poland-step-list">'+r.steps.map(s=>'<li>'+util.escapeHtml(s)+'</li>').join('')+'</ol>':''}${r.diagnostics.length?'<ul class="poland-diagnostic-list">'+r.diagnostics.map(s=>'<li>'+util.escapeHtml(s)+'</li>').join('')+'</ul>':'<p class="poland-muted">No offline structural issues found.</p>'}</section>`;}
    function devHtml(config,r){ return `<section class="poland-section-card"><div class="poland-section-title">Developer Snapshot</div><pre class="poland-code"><code>${syntaxHighlightJson(publicJson(config,r))}</code></pre></section>`;}
    function syntaxHighlightJson(obj){ return util.escapeHtml(JSON.stringify(obj,null,2)).replace(/(&quot;[^&]*?&quot;)(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?/g,(m,s,c)=>s&&c?'<span class="poland-json-key">'+s+'</span>'+c:s?'<span class="poland-json-string">'+s+'</span>':/true|false/.test(m)?'<span class="poland-json-bool">'+m+'</span>':/null/.test(m)?'<span class="poland-json-null">'+m+'</span>':'<span class="poland-json-number">'+m+'</span>');}
    function addHistory(slug,value,label){ const all=readAllHistory(); const list=(all[slug]||[]).filter(i=>i.value!==value); list.unshift({value,label,at:Date.now()}); all[slug]=list.slice(0,MAX_HISTORY); localStorage.setItem(STORAGE_KEY,JSON.stringify(all)); }
    function readAllHistory(){ try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');}catch(e){return{};} }
    function renderHistory(workbench){ const sel=workbench.form.querySelector('[data-poland-history]'); if(!sel)return; const list=(readAllHistory()[workbench.form._polandSlug]||[]); sel.innerHTML=list.length?'<option value="">Choose recent input</option>'+list.map(i=>`<option value="${escapeAttr(i.value)}">${escapeAttr(i.label)} - ${escapeAttr(i.value.slice(0,44))}</option>`).join(''):'<option value="">No history yet</option>'; }
    function stage(label,state,note){return{label,state,note};} function card(label,value,state){return{label,value,state};}

    function injectStyles(){ if(document.getElementById('poland-suite-styles'))return; const style=document.createElement('style'); style.id='poland-suite-styles'; style.textContent=`.poland-suite-workbench{--pl-red:#9f1239;--pl-green:#16a34a;--pl-bad:#dc2626}.poland-badge-row,.poland-detail-grid,.poland-summary-grid{display:flex;flex-wrap:wrap;gap:8px}.poland-pill{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;padding:5px 10px;border-radius:999px;border:1px solid var(--line);background:var(--surface-soft);color:var(--muted)}.poland-pill.active{color:var(--pl-red);border-color:rgba(159,18,57,.25);background:rgba(159,18,57,.07)}.poland-select-field{min-width:220px}.poland-panel{margin-top:22px;display:flex;flex-direction:column;gap:18px}.poland-empty-state{border:1px dashed var(--line);border-radius:10px;padding:24px;background:var(--surface-soft);display:flex;align-items:center;gap:14px;color:var(--muted)}.poland-empty-icon{width:54px;height:54px;border-radius:16px;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,#9f1239,#ef4444);font-weight:900}.poland-empty-state strong{color:var(--text);display:block;margin-bottom:4px}.poland-timeline{border:1px solid var(--line);border-radius:10px;padding:18px;background:#fff;overflow:hidden}.poland-timeline-track{height:3px;background:#e5e7eb;margin:16px 28px 0}.poland-timeline-track span{display:block;height:100%;max-width:100%;background:var(--pl-green)}.poland-timeline-steps{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:6px;margin-top:-13px}.poland-step{text-align:center;color:var(--muted);min-width:0}.poland-step span{width:24px;height:24px;border-radius:999px;display:block;margin:0 auto 9px;background:#d1d5db;border:4px solid #fff;box-shadow:0 0 0 1px var(--line)}.poland-step.pass span{background:var(--pl-green);box-shadow:0 0 0 5px rgba(22,163,74,.12)}.poland-step.fail span{background:var(--pl-bad);box-shadow:0 0 0 5px rgba(220,38,38,.11)}.poland-step strong{display:block;font-size:.72rem;letter-spacing:.04em;text-transform:uppercase;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.poland-step em{display:block;font-size:.68rem;font-style:normal;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.poland-summary-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr))}.poland-summary-card{border:1px solid var(--line);border-radius:10px;background:#fff;padding:14px;min-width:0}.poland-summary-card span,.poland-detail-grid span{display:block;color:var(--muted);font-size:.68rem;font-weight:800;letter-spacing:.07em;text-transform:uppercase;margin-bottom:6px}.poland-summary-card strong,.poland-detail-grid strong{overflow-wrap:anywhere}.poland-summary-card.success strong,.poland-ok{color:var(--pl-green)}.poland-summary-card.error strong,.poland-bad{color:var(--pl-bad)}.poland-summary-card.mono strong{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.82rem}.poland-section-card{border:1px solid var(--line);border-radius:10px;background:#fff;padding:16px}.poland-section-title{font-size:.82rem;font-weight:900;letter-spacing:.06em;text-transform:uppercase;border-bottom:1px solid var(--line);padding-bottom:10px;margin-bottom:12px}.poland-token-row{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}.poland-token-row span{border:1px solid var(--line);border-radius:8px;min-width:34px;padding:7px 8px;text-align:center;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;background:var(--surface-soft)}.poland-token-row b,.poland-token-row em{display:block}.poland-token-row em{font-style:normal;font-size:.58rem;color:var(--muted)}.poland-detail-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr))}.poland-detail-grid>div{border:1px solid var(--line);border-radius:8px;padding:12px;min-width:0}.poland-step-list,.poland-diagnostic-list{color:var(--muted);font-size:.84rem}.poland-muted{color:var(--muted)}.poland-code{margin:0;overflow:auto;padding:14px;border-radius:8px;background:#0f172a;color:#dbeafe;font-size:.78rem}.poland-json-key{color:#93c5fd}.poland-json-string{color:#86efac}.poland-json-number{color:#fbbf24}.poland-json-bool{color:#f0abfc}.poland-json-null{color:#cbd5e1}@media(max-width:800px){.poland-summary-grid,.poland-detail-grid{grid-template-columns:1fr}.poland-timeline-track{display:none}.poland-timeline-steps{grid-template-columns:repeat(3,minmax(0,1fr));margin-top:0;row-gap:14px}.poland-step strong,.poland-step em{white-space:normal}.poland-empty-state{align-items:flex-start}}`; document.head.appendChild(style); }

    return { filePrefix:'poland-suite', onMount, run, applySample, detectInputMode };
  })(window.ValidoWorkbench || { utilities: {} });

  if (window.ValidoWorkbench) window.ValidoWorkbench.registerPlugin(ALGORITHM_ID, Plugin);
})();
