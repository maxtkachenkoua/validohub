(function (root) {
  'use strict';

  const VERSION = '1.0.0';
  const STYLE_ID = 'country-suite-factory-styles-v1';

  function text(value) {
    return String(value == null ? '' : value);
  }

  function esc(value) {
    return text(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function currentLocale() {
    if (typeof location === 'undefined') return 'en';
    const first = location.pathname.split('/').filter(Boolean)[0] || 'en';
    return first;
  }

  const DEFAULT_LABELS = {
    workbench: '{country} workbench',
    browserOnly: 'Browser-only',
    offlineChecks: 'Offline checks',
    countrySpecific: '{country}-specific',
    fieldBreakdown: 'Field breakdown',
    qualityNotes: 'Quality notes',
    samplesAndRelated: 'Samples and related tools',
    validate: 'Validate',
    waiting: 'Waiting for local data',
    offlinePassed: 'Offline checks passed',
    reviewNeeded: 'Review needed',
    copyResult: 'Copy result',
    downloadResult: 'Download result',
    clear: 'Clear',
    copyNormalized: 'Copy normalized',
    validationPipeline: 'Validation pipeline',
    localChecksCompleted: 'Local checks completed in this browser.',
    pass: 'PASS',
    review: 'REVIEW',
    privacyBoundary: 'Privacy boundary',
    officialLookupBoundary: 'Official lookup boundary',
    fixtureSafety: 'Fixture safety',
    developerHandling: 'Developer handling',
    qualityNote: 'Quality note',
    qualityNotesSummary: 'What this tool proves locally and what must stay outside the browser.',
    advancedAnalysis: 'Advanced analysis',
    localStructuralSlices: 'Local structural slices.'
  };

  function formatLabel(template, suite) {
    return text(template).replace(/\{country\}/g, suite.country.name);
  }

  function labelsFor(suite) {
    const locale = currentLocale();
    return Object.assign({}, DEFAULT_LABELS, (suite.i18n && (suite.i18n[locale] || suite.i18n.en)) || {});
  }

  function localizeTool(suite, tool) {
    const locale = currentLocale();
    const suiteToolStrings = suite.i18n && suite.i18n[locale] && suite.i18n[locale].tools
      ? suite.i18n[locale].tools[tool.id]
      : null;
    const toolStrings = (tool.i18n && (tool.i18n[locale] || tool.i18n.en)) || suiteToolStrings || {};
    const samples = Array.isArray(toolStrings.samples)
      ? tool.samples.map((sample, index) => Object.assign({}, sample, { label: toolStrings.samples[index] || sample.label }))
      : tool.samples;
    return Object.assign({}, tool, toolStrings, { samples });
  }

  function firstNonEmpty(values, fallback) {
    for (const value of values) {
      if (value != null && text(value).trim()) return value;
    }
    return fallback;
  }

  function validateSuiteConfig(config) {
    const errors = [];
    if (!config || typeof config !== 'object') {
      return ['config must be an object'];
    }
    if (!config.suiteId) errors.push('suiteId is required');
    if (!config.country || !config.country.slug || !config.country.name) {
      errors.push('country.slug and country.name are required');
    }
    if (!config.theme || !config.theme.accent || !config.theme.accent2) {
      errors.push('theme.accent and theme.accent2 are required');
    }
    if (!Array.isArray(config.tools) || config.tools.length === 0) {
      errors.push('tools must contain at least one tool');
    }

    const ids = new Set();
    for (const tool of asArray(config.tools)) {
      if (!tool.id) errors.push('each tool requires id');
      if (tool.id && ids.has(tool.id)) errors.push(`duplicate tool id: ${tool.id}`);
      if (tool.id) ids.add(tool.id);
      if (!tool.name) errors.push(`${tool.id || 'tool'} requires name`);
      if (!tool.code) errors.push(`${tool.id || 'tool'} requires code`);
      if (!tool.summary) errors.push(`${tool.id || 'tool'} requires summary`);
      if (!Array.isArray(tool.samples) || tool.samples.length === 0) errors.push(`${tool.id || 'tool'} requires short-label samples`);
      if (!Array.isArray(tool.qualityNotes) || tool.qualityNotes.length < 4) errors.push(`${tool.id || 'tool'} requires at least four quality notes`);
      if (!Array.isArray(tool.boundaries) || tool.boundaries.length === 0) errors.push(`${tool.id || 'tool'} requires explicit official-lookup boundaries`);
      for (const sample of asArray(tool.samples)) {
        if (!sample.label || !sample.value) errors.push(`${tool.id || 'tool'} sample requires label and value`);
        if (sample.label && text(sample.label).length > 48) errors.push(`${tool.id || 'tool'} sample label is too long: ${sample.label}`);
        if (sample.label && /[\r\n\t{}[\],;]/.test(sample.label)) errors.push(`${tool.id || 'tool'} sample label looks like raw payload: ${sample.label}`);
      }
    }
    return errors;
  }

  function defaultAnalyze(tool, input) {
    const normalized = text(input).trim();
    const present = normalized.length > 0;
    return {
      status: present ? 'success' : 'review',
      headline: present ? `${tool.name} completed local checks.` : `${tool.name} needs input.`,
      detail: present ? 'Browser-only structural analysis completed.' : 'Paste a value or choose a sample fixture.',
      primary: normalized || 'No input',
      normalized,
      checks: [
        { label: 'Input present', pass: present, text: present ? 'Input is available for local inspection.' : 'Provide input before validation.' },
        { label: 'Browser scope', pass: true, text: 'No upload, database, or live registry call is made.' },
        { label: 'Official boundary', pass: true, text: asArray(tool.boundaries)[0] || 'Official existence remains outside the browser.' }
      ],
      fields: [
        { label: 'Tool', value: tool.name },
        { label: 'Kind', value: tool.code },
        { label: 'Input chars', value: String(normalized.length) },
        { label: 'Offline scope', value: tool.scope || 'Local format evidence' }
      ],
      breakdownTitle: `${tool.code} field breakdown`,
      breakdownSummary: 'Future suite tools should replace this fallback with domain-specific structure slices.',
      breakdown: [
        { label: 'Raw input', value: normalized || 'empty', note: 'Original browser value.', tone: 'green' },
        { label: 'Normalized', value: normalized || 'empty', note: 'Trimmed local value.', tone: 'blue' },
        { label: 'Boundary', value: 'offline', note: asArray(tool.boundaries)[0] || 'No official lookup.', tone: 'red' }
      ],
      qualityNotes: tool.qualityNotes,
      suggestions: present ? ['Copy the normalized value into test fixtures.'] : ['Load a sample fixture or paste local data.'],
      developerJson: {
        suite: tool.suiteId,
        tool: tool.id,
        status: present ? 'success' : 'review',
        normalized
      }
    };
  }

  function normalizeResult(tool, result) {
    const next = result || defaultAnalyze(tool, '');
    next.status = next.status === 'success' ? 'success' : 'review';
    next.headline = firstNonEmpty([next.headline], tool.name);
    next.detail = firstNonEmpty([next.detail], 'Local browser analysis completed.');
    next.primary = firstNonEmpty([next.primary, next.normalized], '');
    next.normalized = firstNonEmpty([next.normalized, next.primary], '');
    next.checks = asArray(next.checks);
    next.fields = asArray(next.fields);
    next.breakdown = asArray(next.breakdown);
    next.qualityNotes = asArray(next.qualityNotes).length ? next.qualityNotes : tool.qualityNotes;
    next.suggestions = asArray(next.suggestions);
    next.developerJson = next.developerJson || { tool: tool.id, status: next.status, normalized: next.normalized };
    return next;
  }

  function injectStyles() {
    if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .csf-shell {
        --csf-accent: #0f766e;
        --csf-accent-2: #2563eb;
        --csf-accent-3: #f59e0b;
        --csf-success: #047857;
        --csf-success-2: #0891b2;
        --csf-review: #dc2626;
        --csf-review-soft: #fef2f2;
        --csf-line: #d8e2ef;
        --csf-ink: #0f172a;
        --csf-muted: #64748b;
        color: var(--csf-ink);
      }
      .workbench-card.csf-shell {
        padding: clamp(1rem, 2vw, 1.35rem);
      }
      .csf-shell * { box-sizing: border-box; }
      .csf-hero,
      .csf-panel,
      .csf-result-card,
      .csf-quality,
      .csf-advanced,
      .csf-mini,
      .csf-step,
      .csf-segment,
      .csf-primary,
      .csf-samples,
      .csf-textarea {
        min-width: 0;
        max-width: 100%;
      }
      .csf-hero {
        border: 1px solid var(--csf-line);
        border-top: 4px solid var(--csf-accent);
        border-radius: .95rem;
        background:
          linear-gradient(125deg, color-mix(in srgb, var(--csf-accent) 9%, #fff), #fff 46%, color-mix(in srgb, var(--csf-accent-2) 7%, #fff));
        padding: 1rem 1.25rem 1.1rem;
        margin: .9rem 0 1.05rem;
        box-shadow: 0 18px 44px rgba(15, 23, 42, .065);
      }
      .csf-hero-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.25fr) minmax(16rem, .75fr);
        gap: 1.25rem;
        align-items: center;
      }
      .csf-kicker,
      .csf-label,
      .csf-step span,
      .csf-segment span {
        color: var(--csf-muted);
        font-size: .68rem;
        font-weight: 900;
        letter-spacing: .13em;
        text-transform: uppercase;
      }
      .csf-mark {
        display: flex;
        width: 3.25rem;
        height: 3.25rem;
        align-items: center;
        justify-content: center;
        border: 1px solid color-mix(in srgb, var(--csf-accent-2) 25%, var(--csf-line));
        border-left: 5px solid var(--csf-accent);
        border-right: 5px solid var(--csf-accent-2);
        border-radius: .68rem;
        background: #fff;
        font-size: .95rem;
        font-weight: 950;
        margin: .45rem 0 .38rem;
      }
      .csf-title {
        margin: .05rem 0;
        font-size: clamp(1.32rem, 1.75vw, 1.68rem);
        line-height: 1.16;
        letter-spacing: 0;
      }
      .csf-summary {
        max-width: 44rem;
        margin: .35rem 0 0;
        color: var(--csf-muted);
        font-size: .88rem;
        line-height: 1.42;
      }
      .csf-chips {
        display: flex;
        flex-wrap: wrap;
        gap: .42rem;
        margin-top: .7rem;
      }
      .csf-chip,
      .csf-pill {
        border: 1px solid var(--csf-line);
        border-radius: 999px;
        background: #fff;
        padding: .28rem .58rem;
        color: var(--csf-ink);
        font-size: .78rem;
        font-weight: 850;
      }
      .csf-pill[data-state="success"] {
        border-color: color-mix(in srgb, var(--csf-success) 28%, var(--csf-line));
        background: color-mix(in srgb, var(--csf-success) 8%, #fff);
        color: var(--csf-success);
      }
      .csf-pill[data-state="review"] {
        border-color: #fecaca;
        background: var(--csf-review-soft);
        color: var(--csf-review);
      }
      .csf-samples span {
        display: block;
        margin-bottom: .42rem;
        font-size: .98rem;
        font-weight: 900;
      }
      .csf-select,
      .csf-textarea {
        width: 100%;
        border: 1px solid var(--csf-line);
        border-radius: .75rem;
        background: #fff;
        padding: .72rem .85rem;
        color: var(--csf-ink);
        font: inherit;
        font-size: .92rem;
        font-weight: 760;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .csf-textarea {
        min-height: 8.25rem;
        resize: vertical;
      }
      .csf-input { padding: 1.05rem 0; }
      .csf-row,
      .csf-actions,
      .csf-section-head,
      .csf-result-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: .8rem;
        flex-wrap: wrap;
      }
      .csf-row h2 {
        margin: 0;
        font-size: 1.25rem;
        line-height: 1.2;
      }
      .csf-actions {
        justify-content: flex-start;
        margin-top: .85rem;
      }
      .csf-button {
        border: 1px solid var(--csf-line);
        border-radius: .78rem;
        background: #fff;
        padding: .68rem .9rem;
        color: var(--csf-ink);
        font-size: .9rem;
        font-weight: 900;
        cursor: pointer;
      }
      .csf-button-primary {
        background: var(--csf-accent);
        border-color: var(--csf-accent);
        color: #fff;
        box-shadow: 0 10px 24px color-mix(in srgb, var(--csf-accent) 22%, transparent);
      }
      .csf-button-ghost {
        border: 0;
        color: var(--csf-muted);
      }
      .csf-results {
        display: grid;
        gap: 1rem;
      }
      .csf-panel,
      .csf-result-card,
      .csf-quality {
        border: 1px solid var(--csf-line);
        border-radius: .95rem;
        background: #fff;
        padding: 1.15rem;
        box-shadow: 0 20px 50px rgba(15, 23, 42, .06);
      }
      .csf-result-card.is-success {
        border-color: color-mix(in srgb, var(--csf-success) 28%, var(--csf-line));
        background: linear-gradient(125deg, color-mix(in srgb, var(--csf-success) 8%, #fff), #fff 50%, color-mix(in srgb, var(--csf-success-2) 5%, #fff));
      }
      .csf-result-card.is-review {
        border-color: #fecaca;
        background: linear-gradient(125deg, color-mix(in srgb, var(--csf-review) 7%, #fff), #fff 54%, color-mix(in srgb, var(--csf-accent-2) 5%, #fff));
      }
      .csf-status {
        display: grid;
        place-items: center;
        width: 3.2rem;
        height: 3.2rem;
        border-radius: .78rem;
        background: color-mix(in srgb, var(--csf-success) 12%, #fff);
        color: var(--csf-success);
        font-size: 1.55rem;
        font-weight: 950;
      }
      .is-review .csf-status {
        background: color-mix(in srgb, var(--csf-review) 10%, #fff);
        color: var(--csf-review);
      }
      .csf-headline {
        margin: 0;
        font-size: 1.3rem;
      }
      .csf-detail {
        margin: .2rem 0 0;
        color: var(--csf-muted);
        font-size: .92rem;
        font-weight: 750;
      }
      .csf-primary {
        margin: .95rem 0;
        padding: .82rem;
        border: 1px solid var(--csf-line);
        border-radius: .75rem;
        background: #f8fafc;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: .95rem;
        font-weight: 900;
        overflow: auto;
        overflow-wrap: anywhere;
        white-space: pre-wrap;
      }
      .csf-grid,
      .csf-pipeline {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr));
        gap: .72rem;
        margin: .8rem 0;
      }
      .csf-mini,
      .csf-step {
        border: 1px solid var(--csf-line);
        border-radius: .78rem;
        padding: .82rem;
        background: #fff;
      }
      .csf-step.is-pass {
        border-color: color-mix(in srgb, var(--csf-success) 28%, var(--csf-line));
        background: color-mix(in srgb, var(--csf-success) 7%, #fff);
      }
      .csf-step.is-review {
        border-color: #fecaca;
        background: var(--csf-review-soft);
      }
      .csf-mini strong,
      .csf-step strong,
      .csf-segment strong {
        display: block;
        margin: .28rem 0;
        font-size: .98rem;
        overflow-wrap: anywhere;
      }
      .csf-mini small,
      .csf-note,
      .csf-step small {
        display: block;
        color: var(--csf-muted);
        font-size: .82rem;
        line-height: 1.4;
        overflow-wrap: anywhere;
      }
      .csf-bar {
        height: .36rem;
        border-radius: 999px;
        background: linear-gradient(90deg, var(--csf-success), var(--csf-success-2), var(--csf-accent-2));
        margin: .82rem 0 1rem;
      }
      .csf-panel.is-review .csf-bar {
        background: linear-gradient(90deg, var(--csf-review), var(--csf-accent-3), var(--csf-accent-2));
      }
      .csf-section-head {
        justify-content: flex-start;
        margin-bottom: .8rem;
      }
      .csf-section-head h3 {
        margin: 0;
        font-size: .94rem;
        letter-spacing: .11em;
        text-transform: uppercase;
      }
      .csf-section-head p {
        margin: .2rem 0 0;
        color: var(--csf-muted);
        font-size: .9rem;
        font-weight: 700;
      }
      .csf-icon {
        display: grid;
        place-items: center;
        min-width: 3.1rem;
        height: 3.1rem;
        border: 1px solid color-mix(in srgb, var(--csf-accent) 24%, var(--csf-line));
        border-radius: .72rem;
        background: color-mix(in srgb, var(--csf-accent) 9%, #fff);
        color: var(--csf-accent);
        font-weight: 950;
      }
      .csf-panel.is-success .csf-icon {
        border-color: color-mix(in srgb, var(--csf-success) 24%, var(--csf-line));
        background: color-mix(in srgb, var(--csf-success) 9%, #fff);
        color: var(--csf-success);
      }
      .csf-panel.is-review .csf-icon {
        border-color: color-mix(in srgb, var(--csf-review) 24%, var(--csf-line));
        background: color-mix(in srgb, var(--csf-review) 9%, #fff);
        color: var(--csf-review);
      }
      .csf-breakdown {
        background: linear-gradient(120deg, #fff, #f8fafc 55%, color-mix(in srgb, var(--csf-accent-2) 6%, #fff));
      }
      .csf-segments {
        display: flex;
        flex-wrap: wrap;
        gap: .6rem;
        justify-content: center;
        margin: .8rem 0 1rem;
      }
      .csf-segment {
        min-width: min(10.5rem, 100%);
        border: 1px solid color-mix(in srgb, var(--csf-accent-2) 25%, var(--csf-line));
        border-radius: .78rem;
        background: #fff;
        padding: .78rem;
        text-align: center;
      }
      .csf-segment strong {
        color: var(--csf-accent-2);
        font-size: 1.08rem;
      }
      .csf-quality {
        background: linear-gradient(120deg, #fff, color-mix(in srgb, var(--csf-accent-3) 8%, #fff));
      }
      .csf-advanced {
        border: 1px solid var(--csf-line);
        border-radius: .95rem;
        background: #fff;
        overflow: hidden;
      }
      .csf-advanced summary {
        padding: .82rem 1rem;
        font-size: .95rem;
        font-weight: 950;
        cursor: pointer;
      }
      .csf-advanced pre {
        margin: 0;
        background: #0f172a;
        color: #e5eefc;
        padding: .9rem;
        font-size: .78rem;
        line-height: 1.5;
        overflow: auto;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
      }
      @media (max-width: 760px) {
        .csf-hero-grid { grid-template-columns: 1fr; }
        .csf-title { font-size: 1.42rem; }
        .csf-panel,
        .csf-result-card,
        .csf-quality { padding: .95rem; }
        .csf-segments { justify-content: stretch; }
        .csf-segment { width: 100%; }
      }
    `;
    document.head.appendChild(style);
  }

  function renderHero(suite, tool) {
    const labels = labelsFor(suite);
    const chips = asArray(tool.chips).length ? tool.chips : [labels.browserOnly, labels.offlineChecks, formatLabel(labels.countrySpecific, suite), labels.fieldBreakdown, labels.qualityNotes];
    const related = suite.tools
      .filter((item) => item.id !== tool.id)
      .slice(0, 8)
      .map((item) => localizeTool(suite, item));
    return `
      <section class="csf-hero">
        <div class="csf-hero-grid">
          <div>
            <span class="csf-kicker">${esc(formatLabel(labels.workbench, suite))}</span>
            <div class="csf-mark">${esc(tool.code)}</div>
            <h2 class="csf-title">${esc(tool.name)}</h2>
            <p class="csf-summary">${esc(tool.summary)}</p>
            <div class="csf-chips">${chips.map((chip) => `<span class="csf-chip">${esc(chip)}</span>`).join('')}</div>
          </div>
          <label class="csf-samples">
            <span>${esc(labels.samplesAndRelated)}</span>
            <select class="csf-select" data-csf-select>
              ${tool.samples.map((sample, index) => `<option value="sample:${index}">${esc(sample.label)}</option>`).join('')}
              ${related.map((item) => `<option value="tool:${esc(item.id)}">${esc(item.name)}</option>`).join('')}
            </select>
          </label>
        </div>
      </section>
    `;
  }

  function renderInput(suite, tool) {
    const labels = labelsFor(suite);
    return `
      <section class="csf-input">
        <div class="csf-row">
          <h2>${esc(tool.actionLabel || labels.validate)}</h2>
          <span class="csf-pill" data-state="waiting" data-csf-state>${esc(labels.waiting)}</span>
        </div>
        <textarea class="csf-textarea" spellcheck="false" data-csf-input>${esc(tool.samples[0].value)}</textarea>
        <div class="csf-actions">
          <button class="csf-button csf-button-primary" type="button" data-csf-run>${esc(tool.buttonLabel || tool.actionLabel || labels.validate)}</button>
          <button class="csf-button" type="button" data-csf-copy>${esc(labels.copyResult)}</button>
          <button class="csf-button" type="button" data-csf-download>${esc(labels.downloadResult)}</button>
          <button class="csf-button csf-button-ghost" type="button" data-csf-clear>${esc(labels.clear)}</button>
        </div>
      </section>
    `;
  }

  function cardGrid(items) {
    return `<div class="csf-grid">${asArray(items).map((item) => `
      <article class="csf-mini">
        <span class="csf-label">${esc(item.label)}</span>
        <strong>${esc(item.value)}</strong>
        ${item.note ? `<small class="csf-note">${esc(item.note)}</small>` : ''}
      </article>
    `).join('')}</div>`;
  }

  function renderPipeline(suite, result) {
    const labels = labelsFor(suite);
    return `
      <section class="csf-panel is-${result.status}">
        <div class="csf-section-head">
          <span class="csf-icon">✓</span>
          <div><h3>${esc(labels.validationPipeline)}</h3><p>${esc(labels.localChecksCompleted)}</p></div>
        </div>
        <div class="csf-bar"></div>
        <div class="csf-pipeline">${result.checks.map((check) => `
          <article class="csf-step ${check.pass ? 'is-pass' : 'is-review'}">
            <span>${esc(check.pass ? labels.pass : labels.review)}</span>
            <strong>${esc(check.label)}</strong>
            <small>${esc(check.text)}</small>
          </article>
        `).join('')}</div>
      </section>
    `;
  }

  function renderResult(suite, result) {
    const labels = labelsFor(suite);
    return `
      <section class="csf-result-card is-${result.status}">
        <div class="csf-result-top">
          <span class="csf-status">${result.status === 'success' ? '✓' : '!'}</span>
          <div><h2 class="csf-headline">${esc(result.headline)}</h2><p class="csf-detail">${esc(result.detail)}</p></div>
          <button class="csf-button" type="button" data-csf-copy-value="${esc(result.normalized)}">${esc(labels.copyNormalized)}</button>
        </div>
        <div class="csf-primary">${esc(result.primary)}</div>
        ${cardGrid(result.fields)}
      </section>
    `;
  }

  function renderBreakdown(suite, result) {
    const labels = labelsFor(suite);
    return `
      <section class="csf-panel csf-breakdown">
        <div class="csf-section-head">
          <span class="csf-icon">▥</span>
          <div><h3>${esc(result.breakdownTitle || labels.fieldBreakdown)}</h3><p>${esc(result.breakdownSummary || labels.localStructuralSlices)}</p></div>
        </div>
        <div class="csf-segments">${result.breakdown.map((part) => `
          <article class="csf-segment">
            <strong>${esc(part.value)}</strong>
            <span>${esc(part.label)}</span>
          </article>
        `).join('')}</div>
        ${cardGrid(result.breakdown)}
      </section>
    `;
  }

  function renderQuality(suite, result) {
    const labels = labelsFor(suite);
    const notes = asArray(result.qualityNotes).slice(0, 4);
    const noteLabels = [labels.privacyBoundary, labels.officialLookupBoundary, labels.fixtureSafety, labels.developerHandling];
    return `
      <section class="csf-quality">
        <div class="csf-section-head">
          <span class="csf-icon">◇</span>
          <div><h3>${esc(labels.qualityNotes)}</h3><p>${esc(labels.qualityNotesSummary)}</p></div>
        </div>
        <div class="csf-grid">${notes.map((note, index) => `
          <article class="csf-mini">
            <span class="csf-label">${esc(noteLabels[index] || labels.qualityNote)}</span>
            <strong>${esc(note.title || noteLabels[index] || labels.qualityNote)}</strong>
            <small class="csf-note">${esc(note.text || note)}</small>
          </article>
        `).join('')}</div>
      </section>
    `;
  }

  function renderAdvanced(suite, result) {
    const labels = labelsFor(suite);
    return `
      <details class="csf-advanced" open>
        <summary>${esc(labels.advancedAnalysis)}</summary>
        <pre>${esc(JSON.stringify(result.developerJson || result, null, 2))}</pre>
      </details>
    `;
  }

  function renderResultBlocks(suite, result) {
    return `<section class="csf-results">${renderPipeline(suite, result)}${renderResult(suite, result)}${renderBreakdown(suite, result)}${renderQuality(suite, result)}${renderAdvanced(suite, result)}</section>`;
  }

  function createSuite(config) {
    const errors = validateSuiteConfig(config);
    if (errors.length) {
      throw new Error(`Country Suite Factory config invalid:\n- ${errors.join('\n- ')}`);
    }

    const suite = Object.assign({}, config);
    suite.tools = config.tools.map((tool) => Object.assign({ suiteId: config.suiteId }, tool));
    suite.toolById = new Map(suite.tools.map((tool) => [tool.id, tool]));

    function analyze(tool, input) {
      const handler = tool.analyze || config.analyze || defaultAnalyze;
      return normalizeResult(tool, handler(tool, input, suite));
    }

    function mount(target, options) {
      if (typeof document === 'undefined') return null;
      injectStyles();
      const requestedElement = typeof target === 'string' ? document.querySelector(target) : target;
      if (!requestedElement) return null;
      const rootElement = requestedElement.closest && requestedElement.closest('.workbench-card')
        ? requestedElement.closest('.workbench-card')
        : requestedElement;
      if (rootElement.dataset.csfMounted === suite.suiteId) return rootElement;

      const toolId = options && options.toolId
        ? options.toolId
        : requestedElement.dataset.toolId || rootElement.dataset.toolId || location.pathname.split('/').filter(Boolean).pop();
      const rawTool = suite.toolById.get(toolId) || suite.tools[0];
      const tool = localizeTool(suite, rawTool);
      const labels = labelsFor(suite);
      rootElement.dataset.csfMounted = suite.suiteId;
      rootElement.classList.add('csf-shell');
      if (rootElement !== requestedElement) rootElement.classList.add('csf-promoted-shell');
      rootElement.style.setProperty('--csf-accent', suite.theme.accent);
      rootElement.style.setProperty('--csf-accent-2', suite.theme.accent2);
      rootElement.style.setProperty('--csf-accent-3', suite.theme.accent3 || '#f59e0b');
      rootElement.innerHTML = `${renderHero(suite, tool)}${renderInput(suite, tool)}<div data-csf-output></div>`;

      const input = rootElement.querySelector('[data-csf-input]');
      const output = rootElement.querySelector('[data-csf-output]');
      const state = rootElement.querySelector('[data-csf-state]');
      const select = rootElement.querySelector('[data-csf-select]');
      let lastResult = null;

      function run() {
        lastResult = analyze(rawTool, input.value);
        output.innerHTML = renderResultBlocks(suite, lastResult);
        state.textContent = lastResult.status === 'success' ? labels.offlinePassed : labels.reviewNeeded;
        state.dataset.state = lastResult.status;
      }

      rootElement.querySelector('[data-csf-run]').addEventListener('click', run);
      rootElement.querySelector('[data-csf-clear]').addEventListener('click', () => {
        input.value = '';
        output.innerHTML = '';
        state.textContent = labels.waiting;
        state.dataset.state = 'waiting';
      });
      rootElement.querySelector('[data-csf-copy]').addEventListener('click', () => {
        const value = lastResult ? lastResult.normalized : input.value;
        if (navigator.clipboard && value != null) navigator.clipboard.writeText(text(value));
      });
      rootElement.querySelector('[data-csf-download]').addEventListener('click', () => {
        const value = lastResult ? JSON.stringify(lastResult.developerJson || lastResult, null, 2) : input.value;
        const blob = new Blob([value], { type: 'application/json;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${tool.id}-analysis.json`;
        link.click();
        URL.revokeObjectURL(link.href);
      });
      rootElement.addEventListener('click', (event) => {
        const copy = event.target.closest('[data-csf-copy-value]');
        if (copy && navigator.clipboard) navigator.clipboard.writeText(copy.dataset.csfCopyValue || '');
      });
      select.addEventListener('change', () => {
        const value = select.value;
        if (value.startsWith('sample:')) {
          const sample = tool.samples[Number(value.split(':')[1])] || tool.samples[0];
          input.value = sample.value;
          run();
          return;
        }
        if (value.startsWith('tool:')) {
          const related = suite.toolById.get(value.slice(5));
          if (related && related.samples[0]) {
            input.value = related.samples[0].value;
            run();
          }
        }
      });
      run();
      return rootElement;
    }

    return {
      version: VERSION,
      config: suite,
      validate: () => validateSuiteConfig(suite),
      analyze,
      mount
    };
  }

  root.ValidoHubCountrySuiteFactory = {
    version: VERSION,
    validateSuiteConfig,
    createSuite
  };
})(typeof globalThis !== 'undefined' ? globalThis : window);
