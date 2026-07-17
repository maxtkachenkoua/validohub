(function () {
  const framework = window.ValidoWorkbench;
  if (!framework) return;

  const util = framework.utilities;
  const encoder = new TextEncoder();

  function escape(value) {
    return util.escapeHtml(String(value == null ? "" : value));
  }

  function bytes(value) {
    return encoder.encode(String(value || ""));
  }

  function byteCount(value) {
    return bytes(value).length;
  }

  function firstValue(values) {
    return values.input || values.text || values.value || values.hash || values.pattern || values.uuid || values.iban || "";
  }

  function setField(workbench, name, value) {
    const field = workbench.form.querySelector(`[name="${name}"]`);
    if (field) field.value = value;
  }

  function sampleRow(samples) {
    if (!samples || !samples.length) return "";
    return '<div class="generic-sample-row" aria-label="Samples"><span>Samples</span>' +
      samples.map((sample) => '<button type="button" class="button button-secondary" data-sample="' + escape(sample.id) + '">' + escape(sample.label) + '</button>').join("") +
      '</div>';
  }

  function ensureSamples(workbench, config) {
    if (!config.samples || !config.samples.length || workbench.form.querySelector('.generic-sample-row')) return;
    const actions = workbench.form.querySelector('.button-row');
    if (!actions) return;
    actions.insertAdjacentHTML('beforebegin', sampleRow(config.samples));
  }

  function advancedSection(title, body) {
    return '<section class="generic-analysis-section"><h4>' + escape(title) + '</h4>' + body + '</section>';
  }

  function keyValueGrid(rows) {
    return '<div class="generic-kv-grid">' + rows.map((row) =>
      '<div class="generic-kv-card"><span>' + escape(row[0]) + '</span><strong>' + escape(row[1]) + '</strong>' + (row[2] ? '<small>' + escape(row[2]) + '</small>' : '') + '</div>'
    ).join('') + '</div>';
  }

  function list(items, className) {
    return '<ul class="' + (className || 'generic-check-list') + '">' + items.map((item) => '<li>' + escape(item) + '</li>').join('') + '</ul>';
  }

  function codeBlock(value, language) {
    return '<pre class="generic-code" data-language="' + escape(language || 'text') + '"><code>' + escape(value) + '</code></pre>';
  }

  function statusHtml(status, title, body) {
    return '<div class="generic-status generic-status-' + escape(status || 'info') + '"><strong>' + escape(title) + '</strong><span>' + escape(body || '') + '</span></div>';
  }

  const defaultPremiumChips = ['Browser-only', 'Offline', 'Copy / download', 'Advanced diagnostics'];

  function ensurePremiumChrome(workbench, config) {
    workbench.form.dataset.genericTheme = config.theme || 'utility';
    if (workbench.form.querySelector('.generic-premium-hero')) return;
    const chips = (config.chips || defaultPremiumChips)
      .map((chip) => '<span>' + escape(chip) + '</span>')
      .join('');
    const hero = [
      '<section class="generic-premium-hero" aria-label="' + escape(config.title) + ' workbench overview">',
      '  <div class="generic-premium-mark" aria-hidden="true">' + escape(config.mark || config.title.slice(0, 4).toUpperCase()) + '</div>',
      '  <div class="generic-premium-copy">',
      '    <p class="generic-premium-kicker">' + escape(config.kicker || 'Browser workbench') + '</p>',
      '    <h3>' + escape(config.title) + '</h3>',
      '    <p>' + escape(config.summary || 'Run a private, offline developer workflow directly in this browser.') + '</p>',
      '    <div class="generic-premium-chips">' + chips + '</div>',
      '  </div>',
      '  <div class="generic-premium-boundary">',
      '    <span>Privacy boundary</span>',
      '    <strong>Runs locally</strong>',
      '    <small>No upload, database, runtime API, or server-side execution.</small>',
      '  </div>',
      '</section>'
    ].join('');
    workbench.form.insertAdjacentHTML('afterbegin', hero);
  }

  function enrichResult(config, result) {
    const next = result || {};
    if (!next.previewHtml && next.output) {
      next.previewTitle = config.previewTitle || 'Result preview';
      next.previewHtml = premiumPreviewHtml(config, next);
    }
    return next;
  }

  function premiumPreviewHtml(config, result) {
    const output = String(result.output || '');
    const clipped = output.length > 420 ? output.slice(0, 420) + '...' : output;
    const rows = [
      { label: 'Mode', value: result.mode || config.title },
      { label: 'Characters', value: String(output.length) },
      { label: 'UTF-8 bytes', value: byteCount(output) + ' bytes' },
      { label: 'Execution', value: 'Local browser only' }
    ];
    return [
      '<div class="generic-result-preview">',
      '  <div class="generic-result-preview__grid">',
      rows.map((row) => '<div><span>' + escape(row.label) + '</span><strong>' + escape(row.value) + '</strong></div>').join(''),
      '  </div>',
      '  <pre class="generic-result-preview__code">' + escape(clipped) + '</pre>',
      '</div>'
    ].join('');
  }

  function render(workbench, config, result) {
    result = enrichResult(config, result || {});
    const ok = result.ok !== false;
    const output = result.output == null ? "" : String(result.output);
    workbench.setOutput(output);
    workbench.lastResult = {
      text: result.downloadText || output,
      extension: result.extension || 'txt',
      mime: result.mime || 'text/plain;charset=utf-8'
    };
    workbench.setMessage(result.message || (ok ? config.title + ' completed locally.' : 'Review the highlighted diagnostics.'), ok ? 'success' : 'error');
    workbench.setBadge({ label: result.badge || (ok ? 'Ready locally' : 'Needs review'), state: ok ? 'valid' : 'invalid' });
    workbench.setStats(result.stats || [], result.notes || [], ok ? 'success' : 'error');
    workbench.setPreview(result.previewTitle || '', result.previewHtml || '');
    workbench.setAdvanced(result.advancedHtml || defaultAdvanced(config, result));
  }

  function defaultAdvanced(config, result) {
    const sections = [];
    if (result.pipeline) {
      sections.push(advancedSection('Validation pipeline', '<div class="generic-pipeline">' + result.pipeline.map((step) =>
        '<div class="generic-pipeline-step is-' + (step.ok === false ? 'warn' : 'pass') + '"><em>' + escape(step.ok === false ? 'Review' : 'Pass') + '</em><b>' + escape(step.name) + '</b><span>' + escape(step.detail || (step.ok === false ? 'Review' : 'Pass')) + '</span></div>'
      ).join('') + '</div>'));
    }
    if (result.breakdown) {
      sections.push(advancedSection(result.breakdownTitle || 'Field breakdown', keyValueGrid(result.breakdown)));
    }
    if (result.qualityNotes) {
      sections.push(advancedSection('Quality notes', list(result.qualityNotes)));
    }
    if (result.developerJson) {
      sections.push(advancedSection('Developer snapshot JSON', codeBlock(JSON.stringify(result.developerJson, null, 2), 'json')));
    }
    return sections.join('');
  }

  function runSafely(workbench, config, action, handler) {
    try {
      const output = handler(workbench, action);
      if (output && typeof output.then === 'function') {
        workbench.setMessage('Running locally in this browser...', '');
        output.then((result) => render(workbench, config, result)).catch((error) => render(workbench, config, failure(config, error.message)));
        return;
      }
      render(workbench, config, output);
    } catch (error) {
      render(workbench, config, failure(config, error.message));
    }
  }

  function failure(config, message) {
    return {
      ok: false,
      output: '',
      badge: 'Needs input',
      message: message || 'Input could not be processed.',
      stats: [['Tool', config.title], ['Status', 'Needs review']],
      notes: [message || 'Check the input and run again.'],
      pipeline: [
        { name: 'Input', ok: false, detail: 'Missing or malformed input' },
        { name: 'Browser-only boundary', ok: true, detail: 'No server call was made' }
      ],
      qualityNotes: config.qualityNotes
    };
  }

  function plugin(config, handler) {
    return {
      filePrefix: config.slug,
      detectInputMode(value) {
        return value && String(value).trim() ? { label: config.detectLabel || 'Input ready', state: 'valid' } : { label: 'Waiting for input', state: '' };
      },
      onMount(workbench) {
        workbench.form.classList.add('generic-suite-workbench');
        workbench.form.dataset.genericSuite = config.slug;
        workbench.form.dataset.genericTheme = config.theme || 'utility';
        ensurePremiumChrome(workbench, config);
        ensureSamples(workbench, config);
      },
      applySample(workbench, id) {
        const sample = (config.samples || []).find((item) => item.id === id);
        if (!sample) return;
        Object.keys(sample.values || {}).forEach((name) => setField(workbench, name, sample.values[name]));
        const action = sample.action || config.defaultAction || workbench.form.dataset.capability || 'validate';
        workbench.markActiveAction(action);
        workbench.run(action);
      },
      run(workbench, action) {
        runSafely(workbench, config, action || config.defaultAction, handler);
      }
    };
  }

  function htmlEntities(text) {
    return String(text || '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[char]));
  }

  function decodeEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = String(text || '');
    return textarea.value;
  }

  function htmlHandler(kind) {
    return function (workbench, action) {
      const values = workbench.values();
      const input = firstValue(values);
      if (!input) throw new Error('Enter text or HTML entities first.');
      const decode = action === 'decode' || kind === 'decoder';
      const output = decode ? decodeEntities(input) : htmlEntities(input);
      const entityCount = (output.match(/&(?:[a-z]+|#\d+|#x[0-9a-f]+);/gi) || []).length;
      return {
        output,
        message: decode ? 'HTML entities decoded locally.' : 'Text encoded as HTML entities locally.',
        badge: decode ? 'Decoded entities' : 'Encoded entities',
        stats: [['Input characters', input.length], ['Input UTF-8 bytes', util.formatBytes(byteCount(input))], ['Output characters', output.length], ['Entities', entityCount], ['Boundary', 'Display escaping only']],
        notes: ['Escaping helps render text safely, but context-specific sanitization still belongs in your app.'],
        pipeline: [
          { name: 'Input', detail: input ? 'Received' : 'Missing' },
          { name: decode ? 'Decode' : 'Encode', detail: decode ? 'Entities resolved' : 'Special characters escaped' },
          { name: 'Boundary', detail: 'No HTML sanitizer or policy engine is run' }
        ],
        breakdown: [['Ampersand', (input.match(/&/g) || []).length], ['Angle brackets', (input.match(/[<>]/g) || []).length], ['Quotes', (input.match(/["']/g) || []).length], ['Unicode bytes', util.formatBytes(byteCount(input))]],
        qualityNotes: ['Use contextual escaping for HTML text nodes, attributes, URLs, and JavaScript separately.', 'This tool never executes markup and never uploads input.'],
        developerJson: { tool: kind === 'decoder' ? 'html-decoder' : 'html-encoder', action: decode ? 'decode' : 'encode', inputCharacters: input.length, outputCharacters: output.length, entities: entityCount }
      };
    };
  }

  function slugify(value) {
    return String(value || '')
      .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '').replace(/-{2,}/g, '-');
  }

  function slugHandler(workbench) {
    const input = firstValue(workbench.values());
    if (!input) throw new Error('Enter text to slugify.');
    const slug = slugify(input);
    return {
      output: slug,
      message: 'Slug generated locally.',
      badge: 'Slug ready',
      stats: [['Input characters', input.length], ['Slug characters', slug.length], ['Words detected', (input.trim().match(/\S+/g) || []).length], ['Separator', 'hyphen'], ['ASCII safe', /^[a-z0-9-]*$/.test(slug) ? 'Yes' : 'No']],
      notes: ['Preview routing collisions in your app before publishing duplicate titles.'],
      pipeline: [{ name: 'Normalize', detail: 'Diacritics removed' }, { name: 'Case', detail: 'Lowercase' }, { name: 'Separator', detail: 'Hyphen compacted' }],
      breakdown: [['Original', input], ['Slug', slug], ['URL segment', '/' + slug + '/']],
      qualityNotes: ['Generated slugs are deterministic and privacy-safe.', 'Locale-specific transliteration may need product rules for non-Latin scripts.'],
      developerJson: { input, slug, characters: slug.length }
    };
  }

  function words(value) {
    return String(value || '')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .split(/[^\p{L}\p{N}]+/u)
      .filter(Boolean);
  }

  function titleWord(word) {
    return word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : '';
  }

  function caseHandler(workbench) {
    const input = firstValue(workbench.values());
    if (!input) throw new Error('Enter text to convert.');
    const parts = words(input);
    const lower = parts.map((p) => p.toLowerCase());
    const output = [
      ['camelCase', lower[0] + lower.slice(1).map(titleWord).join('')],
      ['PascalCase', lower.map(titleWord).join('')],
      ['snake_case', lower.join('_')],
      ['kebab-case', lower.join('-')],
      ['CONSTANT_CASE', lower.join('_').toUpperCase()],
      ['Title Case', lower.map(titleWord).join(' ')],
      ['Sentence case', titleWord(lower.join(' '))]
    ].map((row) => row[0] + ': ' + row[1]).join('\n');
    return {
      output,
      message: 'Case variants generated locally.',
      badge: 'Converted',
      stats: [['Input characters', input.length], ['Words', parts.length], ['Output variants', 7], ['Unicode input', /[^\x00-\x7F]/.test(input) ? 'Yes' : 'No']],
      pipeline: [{ name: 'Tokenize', detail: parts.length + ' words' }, { name: 'Normalize case', detail: 'Generated common naming conventions' }, { name: 'Boundary', detail: 'No server call' }],
      breakdown: [['camelCase', lower[0] + lower.slice(1).map(titleWord).join('')], ['snake_case', lower.join('_')], ['kebab-case', lower.join('-')]],
      qualityNotes: ['Useful for API fields, filenames, CSS classes, constants, and database columns.', 'Review acronyms manually when exact casing matters.'],
      developerJson: { words: parts, variants: output.split('\n') }
    };
  }

  function uuidv4() {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    return hexBytes(bytes).replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');
  }

  function uuidv7() {
    const now = Date.now();
    const rand = crypto.getRandomValues(new Uint8Array(10));
    const time = now.toString(16).padStart(12, '0');
    let tail = hexBytes(rand);
    return `${time.slice(0,8)}-${time.slice(8,12)}-7${tail.slice(0,3)}-${((parseInt(tail.slice(3,5),16)&0x3f)|0x80).toString(16).padStart(2,'0')}${tail.slice(5,7)}-${tail.slice(7,19)}`;
  }

  function uuidHandler(workbench, action) {
    const values = workbench.values();
    const input = firstValue(values).trim();
    const generate = action === 'generate' || !input;
    const uuid = generate ? (values.version === 'v7' ? uuidv7() : uuidv4()) : input;
    const match = uuid.match(/^([0-9a-f]{8})-?([0-9a-f]{4})-?([1-8][0-9a-f]{3})-?([89ab][0-9a-f]{3})-?([0-9a-f]{12})$/i);
    const normalized = match ? match.slice(1).join('-').toLowerCase() : uuid;
    const valid = Boolean(match);
    return {
      ok: valid,
      output: normalized,
      message: valid ? (generate ? 'UUID generated locally with browser crypto.' : 'UUID structure is valid.') : 'UUID shape is invalid.',
      badge: valid ? 'UUID valid' : 'Invalid UUID',
      stats: [['Version', valid ? normalized.charAt(14) : 'unknown'], ['Variant', valid ? 'RFC 4122 compatible' : 'invalid'], ['Characters', normalized.length], ['Hyphenated', normalized.includes('-') ? 'Yes' : 'No']],
      pipeline: [{ name: 'Shape', ok: valid, detail: valid ? '32 hex digits' : 'Expected UUID hex format' }, { name: 'Version', ok: valid, detail: valid ? 'v' + normalized.charAt(14) : 'Unknown' }, { name: 'Randomness', detail: generate ? 'Browser crypto' : 'Not testable from value alone' }],
      breakdown: valid ? [['time_low', normalized.slice(0,8)], ['time_mid', normalized.slice(9,13)], ['version', normalized.charAt(14)], ['variant', normalized.charAt(19)], ['node/random', normalized.slice(24)]] : [['Input', uuid], ['Expected', 'xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx']],
      qualityNotes: ['Generated UUID values are fixtures unless your product records them as real IDs.', 'Uniqueness cannot be proven by validating one UUID string.'],
      developerJson: { uuid: normalized, valid, version: valid ? normalized.charAt(14) : null }
    };
  }

  function ibanHandler(workbench) {
    const input = firstValue(workbench.values());
    const normalized = input.replace(/\s+/g, '').toUpperCase();
    if (!normalized) throw new Error('Enter an IBAN to validate.');
    const expectedLengths = { AD: 24, AE: 23, AL: 28, AT: 20, AZ: 28, BA: 20, BE: 16, BG: 22, BH: 22, BR: 29, CH: 21, CR: 22, CY: 28, CZ: 24, DE: 22, DK: 18, EE: 20, ES: 24, FI: 18, FO: 18, FR: 27, GB: 22, GE: 22, GI: 23, GL: 18, GR: 27, GT: 28, HR: 21, HU: 28, IE: 22, IL: 23, IS: 26, IT: 27, JO: 30, KW: 30, KZ: 20, LB: 28, LC: 32, LI: 21, LT: 20, LU: 20, LV: 21, MC: 27, MD: 24, ME: 22, MK: 19, MR: 27, MT: 31, MU: 30, NL: 18, NO: 15, PK: 24, PL: 28, PS: 29, PT: 25, QA: 29, RO: 24, RS: 22, SA: 24, SC: 31, SE: 24, SI: 19, SK: 24, SM: 27, ST: 25, SV: 28, TL: 23, TN: 24, TR: 26, UA: 29, VG: 24, XK: 20 };
    const country = normalized.slice(0, 2);
    const expected = expectedLengths[country];
    const shape = /^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(normalized);
    const lengthOk = expected ? normalized.length === expected : normalized.length >= 15 && normalized.length <= 34;
    const rearranged = normalized.slice(4) + normalized.slice(0, 4);
    const numeric = rearranged.replace(/[A-Z]/g, (c) => String(c.charCodeAt(0) - 55));
    let mod = 0;
    if (/^\d+$/.test(numeric)) {
      for (const char of numeric) mod = (mod * 10 + Number(char)) % 97;
    }
    const valid = shape && lengthOk && mod === 1;
    const grouped = normalized.replace(/(.{4})/g, '$1 ').trim();
    return {
      ok: valid,
      output: grouped,
      message: valid ? 'IBAN passed MOD-97 checks locally.' : 'IBAN needs review.',
      badge: valid ? 'IBAN valid' : 'Invalid IBAN',
      stats: [['Country', country || 'unknown'], ['Expected length', expected || '15-34'], ['Provided length', normalized.length], ['MOD-97', mod], ['Bank lookup', 'Not performed']],
      pipeline: [{ name: 'Country prefix', ok: /^[A-Z]{2}$/.test(country), detail: country }, { name: 'Length', ok: lengthOk, detail: normalized.length + (expected ? '/' + expected : '') }, { name: 'MOD-97', ok: mod === 1, detail: String(mod) }, { name: 'Boundary', detail: 'No ownership lookup' }],
      breakdown: [['Country', country], ['Check digits', normalized.slice(2,4)], ['BBAN', normalized.slice(4)], ['Grouped', grouped]],
      qualityNotes: ['IBAN validation proves syntax and checksum only.', 'Account ownership, status, and bank acceptance require official rails.'],
      developerJson: { iban: normalized, country, expectedLength: expected, mod97: mod, valid }
    };
  }

  function regexHandler(workbench) {
    const values = workbench.values();
    const pattern = values.pattern || values.input || '';
    const test = values.test || values.text || values.value || '';
    if (!pattern) throw new Error('Enter a regular expression pattern.');
    let source = pattern;
    let flags = values.flags || 'g';
    const literal = pattern.match(/^\/(.*)\/([a-z]*)$/i);
    if (literal) { source = literal[1]; flags = literal[2] || flags; }
    if (!flags.includes('g')) flags += 'g';
    const regex = new RegExp(source, flags);
    const matches = [];
    let match;
    while ((match = regex.exec(test)) && matches.length < 100) {
      matches.push({ value: match[0], index: match.index });
      if (match[0] === '') regex.lastIndex += 1;
    }
    const output = matches.length ? matches.map((m, i) => `${i + 1}. [${m.index}] ${m.value}`).join('\n') : 'No matches';
    return {
      output,
      message: 'Regex evaluated locally.',
      badge: matches.length ? matches.length + ' matches' : 'No matches',
      stats: [['Pattern length', pattern.length], ['Flags', flags], ['Input characters', test.length], ['Matches', matches.length], ['Capped', matches.length >= 100 ? 'Yes' : 'No']],
      pipeline: [{ name: 'Compile', detail: 'Pattern compiled' }, { name: 'Execute', detail: matches.length + ' matches' }, { name: 'Boundary', detail: 'Browser RegExp engine only' }],
      breakdown: matches.slice(0, 6).map((m, i) => ['Match ' + (i + 1), m.value, 'index ' + m.index]),
      qualityNotes: ['Performance depends on your pattern; avoid catastrophic backtracking in production.', 'JavaScript RegExp behavior may differ from PCRE, Java, or PostgreSQL.'],
      developerJson: { pattern: source, flags, matches: matches.slice(0, 20) }
    };
  }

  function textDiffHandler(workbench) {
    const values = workbench.values();
    const left = values.original || values.left || values.before || values.input || '';
    const right = values.changed || values.right || values.after || values.output || values.compare || '';
    if (!left && !right) throw new Error('Enter two text values to compare.');
    const a = left.split(/\r?\n/);
    const b = right.split(/\r?\n/);
    const max = Math.max(a.length, b.length);
    let added = 0, removed = 0, same = 0;
    const rows = [];
    for (let i = 0; i < max; i++) {
      if (a[i] === b[i]) { same++; rows.push('  ' + (a[i] || '')); }
      else {
        if (a[i] !== undefined) { removed++; rows.push('- ' + a[i]); }
        if (b[i] !== undefined) { added++; rows.push('+ ' + b[i]); }
      }
    }
    return {
      output: rows.join('\n'),
      message: 'Text diff calculated locally.',
      badge: added || removed ? 'Changes found' : 'No changes',
      stats: [['Original lines', a.length], ['Changed lines', b.length], ['Added lines', added], ['Removed lines', removed], ['Unchanged positions', same]],
      previewTitle: 'Diff preview',
      previewHtml: '<pre class="generic-diff-preview">' + escape(rows.slice(0, 80).join('\n')) + '</pre>',
      pipeline: [{ name: 'Split', detail: 'Line-based comparison' }, { name: 'Compare', detail: (added + removed) + ' changed lines' }, { name: 'Boundary', detail: 'No upload' }],
      breakdown: [['Original chars', left.length], ['Changed chars', right.length], ['Delta', right.length - left.length]],
      qualityNotes: ['This is a lightweight browser line diff for quick review.', 'Use a semantic parser for language-aware diffs.'],
      developerJson: { added, removed, same, originalLines: a.length, changedLines: b.length }
    };
  }

  function hashHandler(kind) {
    return function (workbench, action) {
      const values = workbench.values();
      const input = values.input || values.text || values.value || '';
      const hashValue = values.hash || '';
      if (action === 'validate' && hashValue) {
        const expected = kind === 'md5' ? 32 : kind === 'sha1' ? 40 : 64;
        const valid = new RegExp('^[a-f0-9]{' + expected + '}$', 'i').test(hashValue.trim());
        return Promise.resolve({
          ok: valid,
          output: hashValue.trim().toLowerCase(),
          message: valid ? kind.toUpperCase() + ' digest shape is valid.' : 'Digest shape is invalid.',
          badge: valid ? 'Digest valid' : 'Invalid digest',
          stats: [['Algorithm', kind.toUpperCase()], ['Expected hex chars', expected], ['Provided chars', hashValue.trim().length], ['Security', kind === 'md5' || kind === 'sha1' ? 'Legacy' : 'Modern baseline']],
          pipeline: [{ name: 'Hex shape', ok: valid, detail: hashValue.trim().length + '/' + expected }, { name: 'Cryptographic claim', detail: 'Shape only unless recomputed from known input' }],
          qualityNotes: hashNotes(kind),
          developerJson: { algorithm: kind, digest: hashValue.trim().toLowerCase(), valid }
        });
      }
      if (!input) throw new Error('Enter text to hash.');
      const promise = kind === 'md5' ? Promise.resolve(md5(input)) : digest(kind === 'sha1' ? 'SHA-1' : 'SHA-256', input);
      return promise.then((digestValue) => ({
        output: digestValue,
        message: kind.toUpperCase() + ' digest generated locally.',
        badge: kind.toUpperCase() + ' ready',
        stats: [['Algorithm', kind.toUpperCase()], ['Input characters', input.length], ['Input bytes', util.formatBytes(byteCount(input))], ['Digest chars', digestValue.length], ['Upload', 'None']],
        pipeline: [{ name: 'UTF-8 encode', detail: util.formatBytes(byteCount(input)) }, { name: 'Digest', detail: kind.toUpperCase() }, { name: 'Boundary', detail: 'Browser-only' }],
        breakdown: [['Prefix', digestValue.slice(0, 12)], ['Suffix', digestValue.slice(-12)], ['Length', digestValue.length]],
        qualityNotes: hashNotes(kind),
        developerJson: { algorithm: kind, inputBytes: byteCount(input), digest: digestValue }
      }));
    };
  }

  function hashNotes(kind) {
    if (kind === 'md5') return ['MD5 is useful for legacy checksums, not password storage or security.', 'Never treat an MD5 digest as proof of authenticity.'];
    if (kind === 'sha1') return ['SHA-1 is legacy and collision-prone for security use.', 'Prefer SHA-256 or stronger for new integrity checks.'];
    return ['SHA-256 is suitable for modern integrity workflows.', 'A digest proves byte equality, not source trust or identity.'];
  }

  function digest(name, text) {
    if (!crypto.subtle) throw new Error('WebCrypto digest is unavailable in this browser.');
    return crypto.subtle.digest(name, bytes(text)).then((buffer) => hexBytes(new Uint8Array(buffer)));
  }

  function hexBytes(array) {
    return Array.from(array).map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  function md5(input) {
    function add32(a, b) { return (a + b) & 0xffffffff; }
    function cmn(q, a, b, x, s, t) { a = add32(add32(a, q), add32(x, t)); return add32((a << s) | (a >>> (32 - s)), b); }
    function ff(a, b, c, d, x, s, t) { return cmn((b & c) | ((~b) & d), a, b, x, s, t); }
    function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & (~d)), a, b, x, s, t); }
    function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
    function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | (~d)), a, b, x, s, t); }
    function cycle(x, k) {
      let [a, b, c, d] = x;
      a = ff(a, b, c, d, k[0], 7, -680876936); d = ff(d, a, b, c, k[1], 12, -389564586); c = ff(c, d, a, b, k[2], 17, 606105819); b = ff(b, c, d, a, k[3], 22, -1044525330);
      a = ff(a, b, c, d, k[4], 7, -176418897); d = ff(d, a, b, c, k[5], 12, 1200080426); c = ff(c, d, a, b, k[6], 17, -1473231341); b = ff(b, c, d, a, k[7], 22, -45705983);
      a = ff(a, b, c, d, k[8], 7, 1770035416); d = ff(d, a, b, c, k[9], 12, -1958414417); c = ff(c, d, a, b, k[10], 17, -42063); b = ff(b, c, d, a, k[11], 22, -1990404162);
      a = ff(a, b, c, d, k[12], 7, 1804603682); d = ff(d, a, b, c, k[13], 12, -40341101); c = ff(c, d, a, b, k[14], 17, -1502002290); b = ff(b, c, d, a, k[15], 22, 1236535329);
      a = gg(a, b, c, d, k[1], 5, -165796510); d = gg(d, a, b, c, k[6], 9, -1069501632); c = gg(c, d, a, b, k[11], 14, 643717713); b = gg(b, c, d, a, k[0], 20, -373897302);
      a = gg(a, b, c, d, k[5], 5, -701558691); d = gg(d, a, b, c, k[10], 9, 38016083); c = gg(c, d, a, b, k[15], 14, -660478335); b = gg(b, c, d, a, k[4], 20, -405537848);
      a = gg(a, b, c, d, k[9], 5, 568446438); d = gg(d, a, b, c, k[14], 9, -1019803690); c = gg(c, d, a, b, k[3], 14, -187363961); b = gg(b, c, d, a, k[8], 20, 1163531501);
      a = gg(a, b, c, d, k[13], 5, -1444681467); d = gg(d, a, b, c, k[2], 9, -51403784); c = gg(c, d, a, b, k[7], 14, 1735328473); b = gg(b, c, d, a, k[12], 20, -1926607734);
      a = hh(a, b, c, d, k[5], 4, -378558); d = hh(d, a, b, c, k[8], 11, -2022574463); c = hh(c, d, a, b, k[11], 16, 1839030562); b = hh(b, c, d, a, k[14], 23, -35309556);
      a = hh(a, b, c, d, k[1], 4, -1530992060); d = hh(d, a, b, c, k[4], 11, 1272893353); c = hh(c, d, a, b, k[7], 16, -155497632); b = hh(b, c, d, a, k[10], 23, -1094730640);
      a = hh(a, b, c, d, k[13], 4, 681279174); d = hh(d, a, b, c, k[0], 11, -358537222); c = hh(c, d, a, b, k[3], 16, -722521979); b = hh(b, c, d, a, k[6], 23, 76029189);
      a = hh(a, b, c, d, k[9], 4, -640364487); d = hh(d, a, b, c, k[12], 11, -421815835); c = hh(c, d, a, b, k[15], 16, 530742520); b = hh(b, c, d, a, k[2], 23, -995338651);
      a = ii(a, b, c, d, k[0], 6, -198630844); d = ii(d, a, b, c, k[7], 10, 1126891415); c = ii(c, d, a, b, k[14], 15, -1416354905); b = ii(b, c, d, a, k[5], 21, -57434055);
      a = ii(a, b, c, d, k[12], 6, 1700485571); d = ii(d, a, b, c, k[3], 10, -1894986606); c = ii(c, d, a, b, k[10], 15, -1051523); b = ii(b, c, d, a, k[1], 21, -2054922799);
      a = ii(a, b, c, d, k[8], 6, 1873313359); d = ii(d, a, b, c, k[15], 10, -30611744); c = ii(c, d, a, b, k[6], 15, -1560198380); b = ii(b, c, d, a, k[13], 21, 1309151649);
      a = ii(a, b, c, d, k[4], 6, -145523070); d = ii(d, a, b, c, k[11], 10, -1120210379); c = ii(c, d, a, b, k[2], 15, 718787259); b = ii(b, c, d, a, k[9], 21, -343485551);
      x[0] = add32(a, x[0]); x[1] = add32(b, x[1]); x[2] = add32(c, x[2]); x[3] = add32(d, x[3]);
    }
    function md5blk(s) { const blocks = []; for (let i = 0; i < 64; i += 4) blocks[i >> 2] = s[i] + (s[i+1] << 8) + (s[i+2] << 16) + (s[i+3] << 24); return blocks; }
    const data = Array.from(bytes(input));
    let state = [1732584193, -271733879, -1732584194, 271733878];
    let i;
    for (i = 64; i <= data.length; i += 64) cycle(state, md5blk(data.slice(i - 64, i)));
    const tail = data.slice(i - 64);
    const block = new Array(16).fill(0);
    for (i = 0; i < tail.length; i++) block[i >> 2] |= tail[i] << ((i % 4) << 3);
    block[i >> 2] |= 0x80 << ((i % 4) << 3);
    if (i > 55) { cycle(state, block); block.fill(0); }
    const bitLen = data.length * 8;
    block[14] = bitLen;
    cycle(state, block);
    return state.map((n) => {
      let s = '';
      for (let j = 0; j < 4; j++) s += ((n >> (j * 8)) & 255).toString(16).padStart(2, '0');
      return s;
    }).join('');
  }

  const commonSamples = {
    text: [{ id: 'hello', label: 'Hello', values: { input: 'Hello, ValidoHub!' } }, { id: 'unicode', label: 'Unicode', values: { input: 'Zażółć gęślą jaźń — こんにちは' } }]
  };

  const configs = [
    ['validohub.html-encoder', {
      slug: 'html-encoder', title: 'HTML Encoder', defaultAction: 'encode', theme: 'markup', mark: 'HTML', kicker: 'Markup safety',
      summary: 'Escape unsafe characters for HTML text nodes, attributes, examples, and copy-safe documentation snippets.',
      chips: ['Entity escaping', 'Unicode-safe', 'Copy-ready', 'XSS hygiene'], samples: commonSamples.text
    }, htmlHandler('encoder')],
    ['validohub.html-decoder', {
      slug: 'html-decoder', title: 'HTML Decoder', defaultAction: 'decode', theme: 'markup', mark: 'ENT', kicker: 'Entity inspection',
      summary: 'Decode HTML entities, inspect normalized text, and verify that copied markup examples resolve as expected.',
      chips: ['Named entities', 'Numeric entities', 'Text preview', 'Offline'], samples: [{ label: 'Entities', value: '&lt;strong&gt;Hello&lt;/strong&gt;' }]
    }, htmlHandler('decoder')],
    ['validohub.slug-generator', {
      slug: 'slug-generator', title: 'Slug Generator', defaultAction: 'slug', theme: 'publishing', mark: 'SLUG', kicker: 'URL publishing',
      summary: 'Turn titles into clean URL slugs, remove unsafe punctuation, normalize spacing, and audit SEO-friendly output.',
      chips: ['URL-safe', 'SEO-ready', 'Whitespace cleanup', 'Copy slug'], samples: [{ label: 'Title', value: 'ValidoHub: Premium Developer Tools!' }]
    }, caseHandler('slug')],
    ['validohub.case-converter', {
      slug: 'case-converter', title: 'Case Converter', defaultAction: 'sentence', theme: 'text', mark: 'Aa', kicker: 'Text normalization',
      summary: 'Convert text between sentence, title, upper, lower, camel, snake, kebab, and constant case without leaving the browser.',
      chips: ['8 case modes', 'Unicode input', 'Naming helpers', 'Local only'], samples: [{ label: 'Phrase', value: 'hello world from ValidoHub' }]
    }, caseHandler('case')],
    ['validohub.uuid', {
      slug: 'uuid-generator', title: 'UUID Workbench', defaultAction: 'generate', theme: 'identity', mark: 'UUID', kicker: 'Identifier fixtures',
      summary: 'Generate UUIDs, validate version and variant bits, normalize casing, and copy safe identifier fixtures for tests.',
      chips: ['Generate v4', 'Validate', 'Version bits', 'Fixture-safe'], samples: [{ label: 'UUID v4', value: '550e8400-e29b-41d4-a716-446655440000' }]
    }, uuidHandler],
    ['validohub.iban', {
      slug: 'iban-validator', title: 'IBAN Validator', defaultAction: 'validate', theme: 'finance', mark: 'IBAN', kicker: 'Banking syntax',
      summary: 'Validate IBAN shape and MOD-97 control digits, normalize spacing, and separate offline syntax from bank ownership checks.',
      chips: ['MOD-97', 'Country prefix', 'Masked output', 'No lookup'], samples: [{ label: 'Poland', value: 'PL61109010140000071219812874' }]
    }, ibanHandler],
    ['validohub.regex-tester', {
      slug: 'regex-tester', title: 'Regex Tester', defaultAction: 'test', theme: 'developer', mark: '.*', kicker: 'Pattern debugger',
      summary: 'Test JavaScript regular expressions against text, inspect match counts, flags, and replacement behavior locally.',
      chips: ['Match count', 'Flags', 'Replace mode', 'Pattern audit'], samples: [{ label: 'Pattern demo', value: '/\\b\\w+@\\w+\\.com\\b/g\nhello@example.com nope' }]
    }, regexHandler],
    ['validohub.text-diff', {
      slug: 'text-diff', title: 'Text Diff', defaultAction: 'diff', theme: 'text', mark: 'DIFF', kicker: 'Change review',
      summary: 'Compare two text blocks, count changed lines, and produce copyable local diff diagnostics for docs and payloads.',
      chips: ['Line diff', 'Change count', 'Whitespace visible', 'No upload'], samples: [{ label: 'Diff', value: 'Hello\nWorld\n---\nHello\nValidoHub' }]
    }, textDiffHandler],
    ['validohub.md5', {
      slug: 'md5-generator', title: 'MD5 Generator', defaultAction: 'hash', theme: 'hash', mark: 'MD5', kicker: 'Legacy checksum',
      summary: 'Generate MD5 digests for compatibility checks and clearly label that MD5 is not suitable for password security.',
      chips: ['Hex digest', 'Byte count', 'Legacy warning', 'Offline'], samples: commonSamples.text
    }, hashHandler('MD5')],
    ['validohub.sha1', {
      slug: 'sha1-generator', title: 'SHA-1 Generator', defaultAction: 'hash', theme: 'hash', mark: 'SHA1', kicker: 'Legacy digest',
      summary: 'Generate SHA-1 digests for legacy integrations while keeping collision-risk guidance visible in the analysis panel.',
      chips: ['Hex digest', 'Compatibility', 'Risk note', 'Local only'], samples: commonSamples.text
    }, hashHandler('SHA-1')],
    ['validohub.sha256', {
      slug: 'sha256-generator', title: 'SHA-256 Generator', defaultAction: 'hash', theme: 'hash', mark: 'SHA256', kicker: 'Modern digest',
      summary: 'Generate SHA-256 hashes for payload fingerprints, fixture verification, cache keys, and copy-safe developer output.',
      chips: ['Modern digest', 'Payload fingerprint', 'Hex output', 'Offline'], samples: commonSamples.text
    }, hashHandler('SHA-256')]
  ];

  configs.forEach(([algorithmId, config, handler]) => framework.registerPlugin(algorithmId, plugin(config, handler)));
})();
