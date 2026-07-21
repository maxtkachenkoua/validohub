(function () {
  'use strict';

  const LEGACY = {
    'validohub.brazil-suite': { country: 'Brazil', slug: 'brazil', code: 'BR', accent: '#15803d', soft: '#ecfdf5', endpoint: '/v1/br/workbench/inspect', sampleHint: 'CPF, CNPJ, PIX, boleto, CEP, NF-e, BRL' },
    'validohub.poland-suite': { country: 'Poland', slug: 'poland', code: 'PL', accent: '#9f1239', soft: '#fff1f2', endpoint: '/v1/pl/workbench/inspect', sampleHint: 'PESEL, NIP, REGON, KRS, BLIK, NRB' },
    'validohub.france-suite': { country: 'France', slug: 'france', code: 'FR', accent: '#0055a4', soft: '#eff6ff', endpoint: '/v1/fr/workbench/inspect', sampleHint: 'SIREN, SIRET, TVA, RIB, IBAN, INSEE' },
    'validohub.netherlands-suite': { country: 'Netherlands', slug: 'netherlands', code: 'NL', accent: '#21468b', soft: '#eff6ff', endpoint: '/v1/nl/workbench/inspect', sampleHint: 'BSN, KVK, BTW, iDEAL, IBAN, postcode' }
  };

  const escape = (value) => String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const compact = (value) => String(value || '').replace(/\s+/g, ' ').trim();
  const pathParts = () => window.location.pathname.split('/').filter(Boolean);
  const currentToolSlug = () => pathParts().pop() || '';
  const currentLocale = () => pathParts()[0] || 'en';
  const storageKey = (meta) => 'validohub.legacyRich.' + meta.slug + '.' + currentToolSlug() + '.v1';

  function injectStyles() {
    if (document.getElementById('country-legacy-rich-layer-styles')) return;
    const style = document.createElement('style');
    style.id = 'country-legacy-rich-layer-styles';
    style.textContent = `
      .legacy-rich-enhanced { --lrp-accent: #0f766e; --lrp-soft: #ecfdf5; }
      .lrp-lab { border: 1px solid color-mix(in srgb, var(--lrp-accent) 22%, var(--line)); border-radius: 16px; background: linear-gradient(135deg, #fff, var(--lrp-soft)); padding: 16px; margin: 18px 0; box-shadow: 0 18px 42px rgba(15, 23, 42, .045); }
      .lrp-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding-bottom: 12px; border-bottom: 1px solid color-mix(in srgb, var(--lrp-accent) 16%, var(--line)); }
      .lrp-kicker, .lrp-label { display: block; color: var(--muted); font-size: .66rem; font-weight: 950; letter-spacing: .1em; text-transform: uppercase; }
      .lrp-head h3 { margin: 4px 0 0; font-size: 1.02rem; line-height: 1.2; letter-spacing: 0; }
      .lrp-head p { margin: 5px 0 0; color: var(--muted); font-size: .86rem; line-height: 1.45; }
      .lrp-badge { flex: 0 0 auto; border: 1px solid color-mix(in srgb, var(--lrp-accent) 30%, var(--line)); border-radius: 999px; background: #fff; color: var(--lrp-accent); font-weight: 900; padding: 7px 11px; }
      .lrp-grid { display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); gap: 12px; margin-top: 14px; }
      .lrp-card { border: 1px solid var(--line); border-radius: 12px; background: rgba(255, 255, 255, .9); padding: 12px; min-width: 0; }
      .lrp-card h4 { margin: 4px 0 9px; font-size: .9rem; letter-spacing: 0; }
      .lrp-card p { margin: 0; color: var(--muted); font-size: .82rem; line-height: 1.45; }
      .lrp-row { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      .lrp-input, .lrp-select, .lrp-textarea { width: 100%; border: 1px solid var(--line); border-radius: 10px; background: #fff; color: var(--text); font-weight: 750; padding: 10px 12px; }
      .lrp-textarea { min-height: 94px; resize: vertical; font: 650 .86rem/1.45 ui-monospace, SFMono-Regular, Menlo, monospace; }
      .lrp-button { border: 1px solid color-mix(in srgb, var(--lrp-accent) 28%, var(--line)); border-radius: 10px; background: #fff; color: var(--lrp-accent); font-weight: 900; padding: 8px 11px; cursor: pointer; }
      .lrp-button.primary { background: var(--lrp-accent); color: #fff; box-shadow: 0 12px 28px color-mix(in srgb, var(--lrp-accent) 18%, transparent); }
      .lrp-output { display: grid; gap: 8px; margin-top: 10px; max-height: 260px; overflow: auto; }
      .lrp-line { display: grid; grid-template-columns: 42px minmax(0, 1fr) 82px minmax(0, .7fr); gap: 8px; align-items: center; border: 1px solid var(--line); border-radius: 10px; background: #fff; padding: 8px 10px; }
      .lrp-line strong, .lrp-line code, .lrp-line span { min-width: 0; overflow-wrap: anywhere; }
      .lrp-pass { color: #16a34a; font-weight: 950; }
      .lrp-review { color: #b45309; font-weight: 950; }
      .lrp-tabs { display: flex; flex-wrap: wrap; gap: 8px; margin: 14px 0 10px; }
      .lrp-tab { border: 1px solid var(--line); border-radius: 999px; background: #fff; color: var(--text); font-weight: 900; padding: 7px 11px; cursor: pointer; }
      .lrp-tab[aria-selected="true"] { border-color: color-mix(in srgb, var(--lrp-accent) 40%, var(--line)); background: var(--lrp-soft); color: var(--lrp-accent); }
      .lrp-panel[hidden] { display: none; }
      .lrp-code { position: relative; margin: 0; border-radius: 12px; background: #111827; color: #dbeafe; padding: 14px; overflow: auto; max-height: 360px; font: 650 .78rem/1.55 ui-monospace, SFMono-Regular, Menlo, monospace; }
      .lrp-related { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
      .lrp-related a { display: inline-flex; align-items: center; max-width: 100%; border: 1px solid var(--line); border-radius: 999px; background: #fff; color: var(--text); font-weight: 850; font-size: .78rem; padding: 7px 10px; text-decoration: none; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .legacy-rich-enhanced .related-section .link-grid, .legacy-rich-enhanced .related-section > p { max-width: 100%; overflow-wrap: anywhere; }
      @media (max-width: 820px) { .lrp-grid { grid-template-columns: 1fr; } .lrp-head { flex-direction: column; } .lrp-line { grid-template-columns: 34px minmax(0, 1fr); } .lrp-line span:last-child { grid-column: 2; } }
    `;
    document.head.appendChild(style);
  }

  function readHistory(meta) {
    try {
      return JSON.parse(localStorage.getItem(storageKey(meta)) || '[]').slice(0, 12);
    } catch (_) {
      return [];
    }
  }

  function writeHistory(meta, value, status) {
    const clean = compact(value).slice(0, 220);
    if (!clean) return;
    const list = readHistory(meta).filter((item) => item.value !== clean);
    list.unshift({ value: clean, label: status || 'local analysis', at: new Date().toISOString() });
    localStorage.setItem(storageKey(meta), JSON.stringify(list.slice(0, 12)));
  }

  function parseJson(value) {
    try { return JSON.parse(value); } catch (_) { return null; }
  }

  function resultSnapshot(workbench, meta) {
    const output = workbench && typeof workbench.outputValue === 'function' ? workbench.outputValue() : '';
    const last = workbench && workbench.lastResult ? workbench.lastResult : null;
    const content = last && typeof last.content === 'string' ? last.content : '';
    const json = parseJson(content) || parseJson(output) || null;
    return {
      country: meta.country,
      toolSlug: currentToolSlug(),
      route: window.location.pathname,
      primaryOutput: output || (json && (json.normalized || json.primary || json.generated)) || '',
      result: json,
      offlineOnly: true,
      capturedAt: new Date().toISOString()
    };
  }

  function apiSnippet(meta, sample) {
    const body = JSON.stringify({ input: sample || '<local-input>', tool: currentToolSlug(), locale: currentLocale(), offline: true }, null, 2);
    return [
      'curl -X POST https://api.validohub.com' + meta.endpoint + ' \\',
      '  -H "Content-Type: application/json" \\',
      "  -d '" + body.replace(/'/g, "'\\''") + "'"
    ].join('\n');
  }

  function relatedLinks(meta) {
    const section = document.querySelector('.related-section');
    if (!section) return '';
    const anchors = Array.from(section.querySelectorAll('a[href]'))
      .filter((a) => a.getAttribute('href').startsWith('/' + currentLocale() + '/' + meta.slug + '/'))
      .slice(0, 10);
    if (!anchors.length) return '';
    return '<div class="lrp-related">' + anchors.map((a) => '<a href="' + escape(a.getAttribute('href')) + '">' + escape(compact(a.textContent)) + '</a>').join('') + '</div>';
  }

  function installForWorkbench(form, workbench, meta) {
    if (!form || form.dataset.legacyRichMounted === 'true') return;
    injectStyles();
    form.dataset.legacyRichMounted = 'true';
    form.classList.add('legacy-rich-enhanced');
    form.style.setProperty('--lrp-accent', meta.accent);
    form.style.setProperty('--lrp-soft', meta.soft);

    const input = workbench && typeof workbench.primaryInput === 'function' ? workbench.primaryInput() : form.querySelector('textarea,input[type="text"]');
    const anchor = form.querySelector('.br-tool-head,.poland-tool-head,.frs-hero') || form.firstElementChild;
    const lab = document.createElement('section');
    lab.className = 'lrp-lab';
    lab.innerHTML = [
      '<div class="lrp-head"><div><span class="lrp-kicker">Premium debug layer</span><h3>' + escape(meta.country) + ' tool intelligence</h3><p>Shared PESEL-depth controls for history, batch checks, API handoff preview, raw JSON, and local related workflows.</p></div><span class="lrp-badge">' + escape(meta.code) + ' local</span></div>',
      '<div class="lrp-grid">',
      '  <article class="lrp-card"><span class="lrp-label">Recent validations</span><h4>Browser history</h4><select class="lrp-select" data-lrp-history><option value="">No recent inputs yet</option></select><div class="lrp-row" style="margin-top:8px"><button class="lrp-button" type="button" data-lrp-clear-history>Clear history</button></div></article>',
      '  <article class="lrp-card"><span class="lrp-label">Batch diagnostics</span><h4>Multi-row validator</h4><textarea class="lrp-textarea" data-lrp-batch placeholder="Paste one ' + escape(meta.sampleHint) + ' sample per line"></textarea><div class="lrp-row" style="margin-top:8px"><button class="lrp-button primary" type="button" data-lrp-run-batch>Run batch</button><button class="lrp-button" type="button" data-lrp-load-current>Use current input</button></div></article>',
      '</div>',
      '<div class="lrp-tabs" role="tablist"><button class="lrp-tab" type="button" aria-selected="true" data-lrp-tab="batch">Batch result</button><button class="lrp-tab" type="button" aria-selected="false" data-lrp-tab="api">API preview</button><button class="lrp-tab" type="button" aria-selected="false" data-lrp-tab="json">Raw JSON</button><button class="lrp-tab" type="button" aria-selected="false" data-lrp-tab="related">Related local tools</button></div>',
      '<div class="lrp-panel" data-lrp-panel="batch"><div class="lrp-output" data-lrp-batch-output><p>Run batch to compare pass/review states without leaving this page.</p></div></div>',
      '<div class="lrp-panel" data-lrp-panel="api" hidden><pre class="lrp-code" data-lrp-api></pre></div>',
      '<div class="lrp-panel" data-lrp-panel="json" hidden><pre class="lrp-code" data-lrp-json>{}</pre></div>',
      '<div class="lrp-panel" data-lrp-panel="related" hidden>' + (relatedLinks(meta) || '<p>Country-local related tools appear here after build pruning.</p>') + '</div>'
    ].join('');
    if (anchor && anchor.parentNode) anchor.insertAdjacentElement('afterend', lab);
    else form.insertAdjacentElement('afterbegin', lab);

    const history = lab.querySelector('[data-lrp-history]');
    const batch = lab.querySelector('[data-lrp-batch]');
    const batchOut = lab.querySelector('[data-lrp-batch-output]');
    const api = lab.querySelector('[data-lrp-api]');
    const json = lab.querySelector('[data-lrp-json]');

    function refreshHistory() {
      const list = readHistory(meta);
      history.innerHTML = list.length
        ? '<option value="">Choose recent local input</option>' + list.map((item) => '<option value="' + escape(item.value) + '">' + escape(item.label + ' - ' + item.value.slice(0, 52)) + '</option>').join('')
        : '<option value="">No recent inputs yet</option>';
    }

    function refreshPanels() {
      const value = input ? input.value : '';
      const snap = resultSnapshot(workbench, meta);
      api.textContent = apiSnippet(meta, value || meta.sampleHint);
      json.textContent = JSON.stringify(snap, null, 2);
      if (value) writeHistory(meta, value, snap.result && snap.result.valid === false ? 'review' : 'checked');
      refreshHistory();
    }

    history.addEventListener('change', () => {
      if (!history.value || !input) return;
      input.value = history.value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      if (workbench && typeof workbench.run === 'function') workbench.run(form.dataset.activeAction || 'validate');
      window.setTimeout(refreshPanels, 60);
    });

    lab.querySelector('[data-lrp-clear-history]').addEventListener('click', () => {
      localStorage.removeItem(storageKey(meta));
      refreshHistory();
    });
    lab.querySelector('[data-lrp-load-current]').addEventListener('click', () => {
      if (batch && input) batch.value = input.value || '';
    });
    lab.querySelector('[data-lrp-run-batch]').addEventListener('click', () => {
      const original = input ? input.value : '';
      const rows = String(batch.value || '').split(/\n+/).map(compact).filter(Boolean).slice(0, 25);
      if (!rows.length) {
        batchOut.innerHTML = '<p>Paste one value per line first.</p>';
        return;
      }
      const results = [];
      rows.forEach((row, index) => {
        if (input) input.value = row;
        if (workbench && typeof workbench.run === 'function') workbench.run(form.dataset.activeAction || 'validate', { quiet: true });
        const snap = resultSnapshot(workbench, meta);
        const ok = !(snap.result && snap.result.valid === false) && !/review|invalid|error/i.test(String(snap.primaryOutput));
        results.push({ index: index + 1, row, ok, output: snap.primaryOutput || 'local analysis complete' });
        writeHistory(meta, row, ok ? 'pass' : 'review');
      });
      if (input) input.value = original;
      if (input) input.dispatchEvent(new Event('input', { bubbles: true }));
      batchOut.innerHTML = results.map((item) => '<div class="lrp-line"><strong>#' + item.index + '</strong><code>' + escape(item.row) + '</code><span class="' + (item.ok ? 'lrp-pass' : 'lrp-review') + '">' + (item.ok ? 'PASS' : 'REVIEW') + '</span><span>' + escape(item.output) + '</span></div>').join('');
      refreshPanels();
    });

    lab.querySelectorAll('[data-lrp-tab]').forEach((tab) => {
      tab.addEventListener('click', () => {
        const id = tab.dataset.lrpTab;
        lab.querySelectorAll('[data-lrp-tab]').forEach((item) => item.setAttribute('aria-selected', item === tab ? 'true' : 'false'));
        lab.querySelectorAll('[data-lrp-panel]').forEach((panel) => { panel.hidden = panel.dataset.lrpPanel !== id; });
        refreshPanels();
      });
    });

    form.addEventListener('click', (event) => {
      if (event.target.closest('[data-action]')) window.setTimeout(refreshPanels, 80);
    });
    if (input) input.addEventListener('input', () => window.setTimeout(refreshPanels, 260));
    refreshHistory();
    refreshPanels();
  }

  function enhancePlugin(algorithmId, plugin) {
    const meta = LEGACY[algorithmId];
    if (!meta || !plugin || plugin.__legacyRichEnhanced) return plugin;
    const originalOnMount = plugin.onMount;
    const originalRun = plugin.run;
    const originalApplySample = plugin.applySample;
    plugin.onMount = function (workbench) {
      if (typeof originalOnMount === 'function') originalOnMount.call(plugin, workbench);
      installForWorkbench(workbench && workbench.form, workbench, meta);
    };
    if (typeof originalRun === 'function') {
      plugin.run = function (workbench, action, options) {
        const result = originalRun.call(plugin, workbench, action, options);
        window.setTimeout(() => installForWorkbench(workbench && workbench.form, workbench, meta), 40);
        return result;
      };
    }
    if (typeof originalApplySample === 'function') {
      plugin.applySample = function (workbench, sample) {
        const result = originalApplySample.call(plugin, workbench, sample);
        window.setTimeout(() => installForWorkbench(workbench && workbench.form, workbench, meta), 40);
        return result;
      };
    }
    plugin.__legacyRichEnhanced = true;
    return plugin;
  }

  function patchWorkbenchRegistry() {
    const wb = window.ValidoWorkbench;
    if (!wb || wb.__legacyRichPatched || typeof wb.registerPlugin !== 'function') return false;
    const originalRegister = wb.registerPlugin;
    wb.registerPlugin = function (algorithmId, plugin) {
      return originalRegister.call(wb, algorithmId, enhancePlugin(algorithmId, plugin));
    };
    if (wb.plugins) {
      Object.keys(LEGACY).forEach((id) => {
        if (wb.plugins[id]) wb.plugins[id] = enhancePlugin(id, wb.plugins[id]);
      });
    }
    wb.__legacyRichPatched = true;
    return true;
  }

  function enhanceStandaloneNetherlands() {
    const root = document.querySelector('.nls-shell');
    if (!root || !root.querySelector('.nls-hero')) return;
    if (root.dataset.legacyRichMounted === 'true' && root.querySelector('.lrp-lab')) return;
    const meta = LEGACY['validohub.netherlands-suite'];
    injectStyles();
    root.dataset.legacyRichMounted = 'true';
    root.classList.add('legacy-rich-enhanced');
    root.style.setProperty('--lrp-accent', meta.accent);
    root.style.setProperty('--lrp-soft', meta.soft);
    const textarea = root.querySelector('.nls-textarea, textarea');
    const lab = document.createElement('section');
    lab.className = 'lrp-lab';
    lab.innerHTML = '<div class="lrp-head"><div><span class="lrp-kicker">Premium debug layer</span><h3>Netherlands tool intelligence</h3><p>History, batch diagnostics, API preview, raw DOM/result capture, and local related workflows.</p></div><span class="lrp-badge">NL local</span></div><div class="lrp-grid"><article class="lrp-card"><span class="lrp-label">Recent validations</span><h4>Browser history</h4><select class="lrp-select" data-lrp-history><option value="">No recent inputs yet</option></select></article><article class="lrp-card"><span class="lrp-label">Batch diagnostics</span><h4>Multi-row validator</h4><textarea class="lrp-textarea" data-lrp-batch placeholder="Paste BSN, KVK, BTW, iDEAL, IBAN, postcode rows"></textarea><div class="lrp-row" style="margin-top:8px"><button class="lrp-button primary" type="button" data-lrp-run-batch>Run batch</button><button class="lrp-button" type="button" data-lrp-load-current>Use current input</button></div></article></div><div class="lrp-tabs"><button class="lrp-tab" aria-selected="true" type="button" data-lrp-tab="batch">Batch result</button><button class="lrp-tab" aria-selected="false" type="button" data-lrp-tab="api">API preview</button><button class="lrp-tab" aria-selected="false" type="button" data-lrp-tab="json">Raw JSON</button><button class="lrp-tab" aria-selected="false" type="button" data-lrp-tab="related">Related local tools</button></div><div class="lrp-panel" data-lrp-panel="batch"><div class="lrp-output" data-lrp-batch-output><p>Run batch to compare pass/review states.</p></div></div><div class="lrp-panel" data-lrp-panel="api" hidden><pre class="lrp-code" data-lrp-api></pre></div><div class="lrp-panel" data-lrp-panel="json" hidden><pre class="lrp-code" data-lrp-json>{}</pre></div><div class="lrp-panel" data-lrp-panel="related" hidden>' + (relatedLinks(meta) || '<p>Country-local related tools appear here after build pruning.</p>') + '</div>';
    const anchor = root.querySelector('.nls-hero') || root.firstElementChild;
    anchor.insertAdjacentElement('afterend', lab);
    const history = lab.querySelector('[data-lrp-history]');
    const batch = lab.querySelector('[data-lrp-batch]');
    const batchOut = lab.querySelector('[data-lrp-batch-output]');
    const api = lab.querySelector('[data-lrp-api]');
    const json = lab.querySelector('[data-lrp-json]');
    function refreshHistory() {
      const list = readHistory(meta);
      history.innerHTML = list.length ? '<option value="">Choose recent local input</option>' + list.map((item) => '<option value="' + escape(item.value) + '">' + escape(item.label + ' - ' + item.value.slice(0, 52)) + '</option>').join('') : '<option value="">No recent inputs yet</option>';
    }
    function capture() {
      const value = textarea ? textarea.value : '';
      api.textContent = apiSnippet(meta, value || meta.sampleHint);
      json.textContent = JSON.stringify({ country: meta.country, toolSlug: currentToolSlug(), route: location.pathname, input: value, textResult: compact((root.querySelector('.nls-output') || {}).textContent || '').slice(0, 2000), offlineOnly: true, capturedAt: new Date().toISOString() }, null, 2);
      if (value) writeHistory(meta, value, 'checked');
      refreshHistory();
    }
    history.addEventListener('change', () => { if (history.value && textarea) { textarea.value = history.value; root.querySelector('.nls-run')?.click(); window.setTimeout(capture, 80); } });
    lab.querySelector('[data-lrp-load-current]').addEventListener('click', () => { if (textarea) batch.value = textarea.value || ''; });
    lab.querySelector('[data-lrp-run-batch]').addEventListener('click', () => {
      const original = textarea ? textarea.value : '';
      const rows = String(batch.value || '').split(/\n+/).map(compact).filter(Boolean).slice(0, 25);
      const run = root.querySelector('.nls-run');
      const out = [];
      rows.forEach((row, index) => { if (textarea) textarea.value = row; run?.click(); const text = compact((root.querySelector('.nls-output') || {}).textContent || 'local analysis complete'); const ok = !/review|invalid|error|needs/i.test(text); out.push({ index: index + 1, row, ok, text: text.slice(0, 120) }); writeHistory(meta, row, ok ? 'pass' : 'review'); });
      if (textarea) textarea.value = original;
      batchOut.innerHTML = out.map((item) => '<div class="lrp-line"><strong>#' + item.index + '</strong><code>' + escape(item.row) + '</code><span class="' + (item.ok ? 'lrp-pass' : 'lrp-review') + '">' + (item.ok ? 'PASS' : 'REVIEW') + '</span><span>' + escape(item.text) + '</span></div>').join('') || '<p>Paste one value per line first.</p>';
      capture();
    });
    lab.querySelectorAll('[data-lrp-tab]').forEach((tab) => tab.addEventListener('click', () => { const id = tab.dataset.lrpTab; lab.querySelectorAll('[data-lrp-tab]').forEach((item) => item.setAttribute('aria-selected', item === tab ? 'true' : 'false')); lab.querySelectorAll('[data-lrp-panel]').forEach((panel) => { panel.hidden = panel.dataset.lrpPanel !== id; }); capture(); }));
    root.addEventListener('click', () => window.setTimeout(capture, 80));
    if (textarea) textarea.addEventListener('input', () => window.setTimeout(capture, 220));
    refreshHistory();
    capture();
  }

  function boot() {
    patchWorkbenchRegistry();
    enhanceStandaloneNetherlands();
  }

  boot();
  const timer = window.setInterval(() => {
    const patched = patchWorkbenchRegistry();
    enhanceStandaloneNetherlands();
    if (patched && document.readyState === 'complete' && document.querySelector('.nls-shell .lrp-lab')) window.clearInterval(timer);
  }, 80);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else window.setTimeout(boot, 0);
})();
