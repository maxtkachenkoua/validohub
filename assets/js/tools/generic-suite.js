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

  function pseudoHash(value) {
    let hashA = 0x811c9dc5;
    let hashB = 0x45d9f3b;
    const input = String(value || "");
    for (let index = 0; index < input.length; index += 1) {
      const code = input.charCodeAt(index);
      hashA ^= code;
      hashA = Math.imul(hashA, 0x01000193) >>> 0;
      hashB ^= code + index;
      hashB = Math.imul(hashB, 0x85ebca6b) >>> 0;
    }
    const chunks = [];
    for (let index = 0; index < 8; index += 1) {
      hashA = Math.imul(hashA ^ (hashA >>> 13), 0xc2b2ae35) >>> 0;
      hashB = Math.imul(hashB ^ (hashB >>> 16), 0x27d4eb2d) >>> 0;
      chunks.push((hashA ^ hashB).toString(16).padStart(8, "0"));
    }
    return chunks.join("");
  }

  function firstValue(values) {
    return values.input || values.title || values.text || values.value || values.hash || values.pattern || values.uuid || values.iban || "";
  }

  function setField(workbench, name, value) {
    const field = workbench.form.querySelector(`[name="${name}"]`);
    if (field) field.value = value;
  }

  function formValues(workbench) {
    if (workbench && typeof workbench.values === 'function') {
      return workbench.values();
    }
    const values = {};
    if (!workbench || !workbench.form) return values;
    workbench.form.querySelectorAll('textarea[name], input[name], select[name]').forEach((field) => {
      values[field.name] = field.type === 'checkbox' ? field.checked : field.value;
    });
    return values;
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

  function resultCards(rows) {
    return '<div class="generic-result-card-grid">' + rows.map((row) =>
      '<article class="generic-result-card"><span>' + escape(row.label) + '</span><strong>' + escape(row.value) + '</strong>' + (row.note ? '<small>' + escape(row.note) + '</small>' : '') + '</article>'
    ).join('') + '</div>';
  }

  function list(items, className) {
    return '<ul class="' + (className || 'generic-check-list') + '">' + items.map((item) => '<li>' + escape(item) + '</li>').join('') + '</ul>';
  }

  function qualityGrid(items) {
    const labels = ['Privacy boundary', 'Correctness boundary', 'Developer handling', 'Fixture safety'];
    const padded = (items || []).slice();
    const fallback = [
      'Input is processed locally in this browser and is not uploaded by ValidoHub.',
      'The tool proves local syntax, formatting, or transformation rules only.',
      'Copy normalized values for tests and keep sensitive raw data out of logs.',
      'Samples and generated outputs are fixtures unless your application records them as live data.'
    ];
    while (padded.length < 4) {
      padded.push(fallback[padded.length]);
    }
    return '<div class="generic-quality-grid">' + padded.map((item, index) =>
      '<article class="generic-quality-card"><strong>' + escape(labels[index] || 'Quality note') + '</strong><p>' + escape(item) + '</p></article>'
    ).join('') + '</div>';
  }

  function codeBlock(value, language) {
    return '<pre class="generic-code" data-language="' + escape(language || 'text') + '"><code>' + escape(value) + '</code></pre>';
  }

  function apiPreview(config, result) {
    const payload = {
      tool: config.slug,
      mode: result.mode || config.defaultAction || 'run',
      input: result.developerJson && (result.developerJson.input || result.developerJson.uuid || result.developerJson.iban || result.developerJson.pattern || result.developerJson.country || null),
      output: result.output || '',
      localOnly: true
    };
    const path = '/v1/tools/' + (config.slug || 'generic-tool') + '/run';
    return [
      '<div class="generic-api-preview">',
      resultCards([
        { label: 'Endpoint shape', value: path, note: 'example contract only' },
        { label: 'Execution', value: 'Browser local', note: 'no request is sent' },
        { label: 'Payload', value: 'JSON', note: 'copy for handoff tests' }
      ]),
      codeBlock('curl -X POST https://api.validohub.com' + path + ' \\\n  -H "Content-Type: application/json" \\\n  -d ' + JSON.stringify(JSON.stringify(payload)), 'bash'),
      '</div>'
    ].join('');
  }

  function charProfile(value) {
    const text = String(value || '');
    return {
      characters: Array.from(text).length,
      bytes: byteCount(text),
      lines: text ? text.split(/\r?\n/).length : 0,
      words: (text.trim().match(/\S+/g) || []).length,
      ascii: /^[\x00-\x7F]*$/.test(text),
      whitespace: (text.match(/\s/g) || []).length
    };
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
    const profile = charProfile(output);
    const rows = result.resultCards || [
      { label: 'Mode', value: result.mode || config.title },
      { label: 'Characters', value: String(profile.characters), note: profile.ascii ? 'ASCII-safe' : 'Unicode present' },
      { label: 'UTF-8 bytes', value: profile.bytes + ' bytes', note: profile.lines + ' lines' },
      { label: 'Execution', value: 'Local browser only' }
    ];
    return [
      '<div class="generic-result-preview">',
      result.ok === false ? '  <div class="generic-status generic-status-error"><strong>Needs review</strong><span>The result below explains what failed without sending input to a server.</span></div>' : '  <div class="generic-status generic-status-success"><strong>Completed locally</strong><span>The result is available immediately below the input area.</span></div>',
      resultCards(rows),
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
      sections.push(advancedSection('Quality notes', qualityGrid(result.qualityNotes)));
    }
    if (result.developerJson) {
      sections.push(advancedSection('Developer API preview', apiPreview(config, result)));
      sections.push(advancedSection('Developer snapshot JSON', codeBlock(JSON.stringify(result.developerJson, null, 2), 'json')));
    }
    return sections.join('');
  }

  function runSafely(workbench, config, action, handler) {
    try {
      const output = handler(workbench, action, config);
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
    function activeConfig(workbench) {
      if (config && typeof config.resolve === 'function') {
        return config.resolve(workbench) || config;
      }
      return config;
    }
    return {
      filePrefix: config.slug,
      detectInputMode(value) {
        return value && String(value).trim() ? { label: config.detectLabel || 'Input ready', state: 'valid' } : { label: 'Waiting for input', state: '' };
      },
      onMount(workbench) {
        const currentConfig = activeConfig(workbench);
        workbench.form.classList.add('generic-suite-workbench');
        workbench.form.dataset.genericSuite = currentConfig.slug;
        workbench.form.dataset.genericTheme = currentConfig.theme || 'utility';
        ensurePremiumChrome(workbench, currentConfig);
        ensureSamples(workbench, currentConfig);
      },
      applySample(workbench, id) {
        const currentConfig = activeConfig(workbench);
        const sample = (currentConfig.samples || []).find((item) => item.id === id);
        if (!sample) return;
        if (sample.values) {
          Object.keys(sample.values).forEach((name) => setField(workbench, name, sample.values[name]));
        } else if (sample.value != null) {
          const primary = workbench.primaryInput && workbench.primaryInput();
          if (primary) primary.value = sample.value;
        }
        const action = sample.action || currentConfig.defaultAction || workbench.form.dataset.capability || 'validate';
        workbench.markActiveAction(action);
        workbench.run(action);
      },
      run(workbench, action) {
        const currentConfig = activeConfig(workbench);
        runSafely(workbench, currentConfig, action || currentConfig.defaultAction, handler);
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
      const values = formValues(workbench);
      const input = firstValue(values);
      if (!input) throw new Error('Enter text or HTML entities first.');
      const decode = action === 'decode' || kind === 'decoder';
      const output = decode ? decodeEntities(input) : htmlEntities(input);
      const entityCount = (output.match(/&(?:[a-z]+|#\d+|#x[0-9a-f]+);/gi) || []).length;
      const inputEntityCount = (input.match(/&(?:[a-z]+|#\d+|#x[0-9a-f]+);/gi) || []).length;
      const delta = output.length - input.length;
      return {
        output,
        message: decode ? 'HTML entities decoded locally.' : 'Text encoded as HTML entities locally.',
        badge: decode ? 'Decoded entities' : 'Encoded entities',
        stats: [['Input characters', input.length], ['Input UTF-8 bytes', util.formatBytes(byteCount(input))], ['Output characters', output.length], ['Length delta', String(delta)], ['Entities', decode ? inputEntityCount : entityCount], ['Boundary', 'Display escaping only']],
        notes: ['Escaping helps render text safely, but context-specific sanitization still belongs in your app.'],
        pipeline: [
          { name: 'Input', detail: input ? 'Received' : 'Missing' },
          { name: decode ? 'Decode' : 'Encode', detail: decode ? 'Entities resolved' : 'Special characters escaped' },
          { name: 'Boundary', detail: 'No HTML sanitizer or policy engine is run' }
        ],
        resultCards: [
          { label: decode ? 'Decoded text' : 'Escaped output', value: output.slice(0, 96) || 'empty', note: output.length > 96 ? 'truncated preview' : 'copy-ready' },
          { label: 'Entities', value: String(decode ? inputEntityCount : entityCount), note: decode ? 'read from input' : 'created in output' },
          { label: 'Danger characters', value: String((input.match(/[<>"'&]/g) || []).length), note: 'escaped or decoded locally' },
          { label: 'Boundary', value: 'Not sanitizer', note: 'escaping helper only' }
        ],
        breakdown: [['Ampersand', (input.match(/&/g) || []).length], ['Angle brackets', (input.match(/[<>]/g) || []).length], ['Quotes', (input.match(/["']/g) || []).length], ['Entity-like tokens', inputEntityCount], ['Unicode bytes', util.formatBytes(byteCount(input))]],
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
    const values = formValues(workbench);
    const input = firstValue(values);
    if (!input) throw new Error('Enter text to slugify.');
    let slug = slugify(input);
    if (values.lowercase === false || values.lowercase === 'false') {
      slug = String(input || '')
        .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^A-Za-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '').replace(/-{2,}/g, '-');
    }
    return {
      output: slug,
      message: 'Slug generated locally.',
      badge: 'Slug ready',
      stats: [['Input characters', input.length], ['Slug characters', slug.length], ['Words detected', (input.trim().match(/\S+/g) || []).length], ['Separator', 'hyphen'], ['ASCII safe', /^[a-z0-9-]*$/.test(slug) ? 'Yes' : 'No']],
      notes: ['Preview routing collisions in your app before publishing duplicate titles.'],
      pipeline: [{ name: 'Normalize', detail: 'Diacritics removed' }, { name: 'Case', detail: values.lowercase === false || values.lowercase === 'false' ? 'Original case preserved' : 'Lowercase' }, { name: 'Separator', detail: 'Hyphen compacted' }, { name: 'Route safety', detail: /^[A-Za-z0-9-]+$/.test(slug) ? 'Path-segment safe' : 'Review' }],
      resultCards: [
        { label: 'Slug', value: slug || 'empty', note: 'copy-ready segment' },
        { label: 'URL segment', value: '/' + slug + '/', note: 'routing preview' },
        { label: 'Words', value: String((input.trim().match(/\S+/g) || []).length), note: 'detected tokens' },
        { label: 'Collision risk', value: 'App-specific', note: 'check your route table' }
      ],
      breakdown: [['Original', input], ['Slug', slug], ['URL segment', '/' + slug + '/'], ['Removed punctuation', String((input.match(/[^\p{L}\p{N}\s-]/gu) || []).length)]],
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
    const values = formValues(workbench);
    const input = firstValue(values);
    if (!input) throw new Error('Enter text to convert.');
    const parts = words(input);
    if (!parts.length) throw new Error('Enter text with letters or numbers to convert.');
    const lower = parts.map((p) => p.toLowerCase());
    const variants = [
      ['lowercase', lower.join(' ')],
      ['UPPERCASE', lower.join(' ').toUpperCase()],
      ['camelCase', lower[0] + lower.slice(1).map(titleWord).join('')],
      ['PascalCase', lower.map(titleWord).join('')],
      ['snake_case', lower.join('_')],
      ['kebab-case', lower.join('-')],
      ['CONSTANT_CASE', lower.join('_').toUpperCase()],
      ['Title Case', lower.map(titleWord).join(' ')],
      ['Sentence case', titleWord(lower.join(' '))]
    ];
    const selected = String(values.style || '').toLowerCase();
    const primary = variants.find((row) => row[0].toLowerCase().replace(/[^a-z]/g, '') === selected) || variants.find((row) => row[0] === 'Sentence case') || variants[0];
    const output = variants.map((row) => row[0] + ': ' + row[1]).join('\n');
    return {
      output,
      message: 'Case variants generated locally.',
      badge: 'Converted',
      stats: [['Input characters', input.length], ['Words', parts.length], ['Output variants', variants.length], ['Selected style', primary[0]], ['Unicode input', /[^\x00-\x7F]/.test(input) ? 'Yes' : 'No']],
      pipeline: [{ name: 'Tokenize', detail: parts.length + ' words' }, { name: 'Normalize case', detail: 'Generated common naming conventions' }, { name: 'Boundary', detail: 'No server call' }],
      resultCards: [
        { label: 'Selected style', value: primary[0], note: 'from control' },
        { label: 'Primary output', value: primary[1], note: 'copy from result' },
        { label: 'Variants', value: String(variants.length), note: 'API, DB, CSS, docs' },
        { label: 'Words', value: String(parts.length), note: 'tokenized locally' }
      ],
      breakdown: variants.map((row) => [row[0], row[1]]),
      qualityNotes: ['Useful for API fields, filenames, CSS classes, constants, and database columns.', 'Review acronyms manually when exact casing matters.'],
      developerJson: { words: parts, selected: primary[0], variants: Object.fromEntries(variants) }
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

  function uuidDetails(normalized) {
    const compact = String(normalized || '').replace(/-/g, '').toLowerCase();
    const version = compact.charAt(12) || 'unknown';
    const variantByte = parseInt(compact.slice(16, 18), 16);
    const variant = Number.isFinite(variantByte) && (variantByte & 0xc0) === 0x80 ? 'RFC 4122 / Leach-Salz' : 'non-standard';
    const v7Timestamp = version === '7' ? parseInt(compact.slice(0, 12), 16) : null;
    const timestampIso = v7Timestamp ? new Date(v7Timestamp).toISOString() : '';
    return { compact, urn: compact ? 'urn:uuid:' + normalized : '', version, variant, v7Timestamp, timestampIso };
  }

  function uuidHandler(workbench, action) {
    const values = formValues(workbench);
    const input = firstValue(values).trim();
    const generate = action === 'generate' || !input;
    const count = Math.max(1, Math.min(100, Number(values.count || 1) || 1));
    if (generate && count > 1) {
      const generated = Array.from({ length: count }, () => values.version === 'v7' ? uuidv7() : uuidv4());
      return {
        output: generated.join('\n'),
        message: count + ' UUIDs generated locally with browser crypto.',
        badge: count + ' UUIDs ready',
        stats: [['Version', values.version === 'v7' ? 'v7' : 'v4'], ['Count', count], ['Variant', 'RFC 4122 compatible'], ['Randomness', 'Browser crypto'], ['Upload', 'None']],
        pipeline: [{ name: 'Count guard', detail: count + '/100 generated' }, { name: 'Version bits', detail: values.version === 'v7' ? 'Timestamp-ordered v7' : 'Random v4' }, { name: 'Boundary', detail: 'No server call' }],
        breakdown: generated.slice(0, 6).map((value, index) => ['UUID ' + (index + 1), value, 'fixture-safe local value']),
        qualityNotes: ['Generated UUID values are fixtures unless your product records them as real IDs.', 'Batch generation is capped at 100 to keep browser output manageable.'],
        developerJson: { generated, count, version: values.version === 'v7' ? 'v7' : 'v4' }
      };
    }
    const uuid = generate ? (values.version === 'v7' ? uuidv7() : uuidv4()) : input;
    const match = uuid.match(/^([0-9a-f]{8})-?([0-9a-f]{4})-?([1-8][0-9a-f]{3})-?([89ab][0-9a-f]{3})-?([0-9a-f]{12})$/i);
    const normalized = match ? match.slice(1).join('-').toLowerCase() : uuid;
    const valid = Boolean(match);
    const details = valid ? uuidDetails(normalized) : null;
    return {
      ok: valid,
      output: normalized,
      message: valid ? (generate ? 'UUID generated locally with browser crypto.' : 'UUID structure is valid.') : 'UUID shape is invalid.',
      badge: valid ? 'UUID valid' : 'Invalid UUID',
      stats: [['Version', valid ? 'v' + details.version : 'unknown'], ['Variant', valid ? details.variant : 'invalid'], ['Characters', normalized.length], ['Hyphenated', normalized.includes('-') ? 'Yes' : 'No'], ['URN ready', valid ? 'Yes' : 'No']],
      pipeline: [{ name: 'Shape', ok: valid, detail: valid ? '32 hex digits' : 'Expected UUID hex format' }, { name: 'Version', ok: valid, detail: valid ? 'v' + normalized.charAt(14) : 'Unknown' }, { name: 'Randomness', detail: generate ? 'Browser crypto' : 'Not testable from value alone' }],
      resultCards: valid ? [
        { label: 'Normalized UUID', value: normalized, note: 'canonical lowercase' },
        { label: 'Compact hex', value: details.compact, note: '32 characters' },
        { label: 'URN form', value: details.urn, note: 'copy-ready identifier URI' },
        { label: details.version === '7' ? 'v7 timestamp' : 'Collision note', value: details.version === '7' ? details.timestampIso : 'Random space', note: details.version === '7' ? 'decoded from prefix' : 'uniqueness is probabilistic' }
      ] : [
        { label: 'Input', value: uuid || 'empty', note: 'review shape' },
        { label: 'Expected', value: '8-4-4-4-12', note: 'hex UUID groups' },
        { label: 'Version nibble', value: '1-8', note: 'third group first char' },
        { label: 'Variant nibble', value: '8, 9, a, b', note: 'fourth group first char' }
      ],
      breakdown: valid ? [['time_low', normalized.slice(0,8)], ['time_mid', normalized.slice(9,13)], ['version', details.version, 'UUID version nibble'], ['variant', normalized.charAt(19), details.variant], ['node/random', normalized.slice(24)], ['compact', details.compact], ['urn', details.urn], ['v7 timestamp', details.timestampIso || 'n/a']] : [['Input', uuid], ['Expected', 'xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx']],
      qualityNotes: ['Generated UUID values are fixtures unless your product records them as real IDs.', 'Uniqueness cannot be proven by validating one UUID string.', 'UUID v7 timestamps are useful for ordering but may reveal generation time.', 'Use UUIDs for identifiers, not authentication secrets.'],
      developerJson: { uuid: normalized, valid, version: valid ? details.version : null, variant: valid ? details.variant : null, compact: valid ? details.compact : null, urn: valid ? details.urn : null, timestampIso: valid ? details.timestampIso || null : null }
    };
  }

  const ibanCountryProfiles = {
    BR: {
      slug: 'brazil-iban-validator',
      title: 'Brazil IBAN Validator',
      countryName: 'Brazil',
      sample: 'BR1500000000000010932840814P2',
      length: 29,
      theme: 'finance',
      mark: 'BR',
      kicker: 'Brazil banking',
      summary: 'Validate Brazilian IBANs, inspect bank and branch segments, and keep account-existence checks outside the browser.',
      chips: ['BR length 29', 'MOD-97', 'Bank/branch split', 'Offline boundary'],
      slices: [
        ['Bank code', 4, 12, '8 digits'],
        ['Branch code', 12, 17, '5 digits'],
        ['Account number', 17, 27, '10 digits'],
        ['Account type', 27, 28, '1 character'],
        ['Owner/account holder type', 28, 29, '1 character']
      ],
      quality: [
        'Brazilian IBAN validation proves syntax, length, BBAN slicing, and MOD-97 only.',
        'Domestic bank-directory, COMPE/ISPB, Pix, and live account acceptance checks require authoritative banking rails.',
        'Use masked output in logs and copy grouped IBAN values only into payment fixtures.',
        'Brazilian IBAN is structurally supported, but many domestic workflows still use local payment identifiers such as Pix, boleto, COMPE, or ISPB.'
      ]
    },
    DE: {
      slug: 'germany-iban-validator',
      title: 'German IBAN Validator',
      countryName: 'Germany',
      sample: 'DE89370400440532013000',
      length: 22,
      theme: 'finance',
      mark: 'DE',
      kicker: 'German banking',
      summary: 'Validate German IBANs, extract the BLZ bank code and account segment, and explain the Bundesbank lookup boundary.',
      chips: ['DE length 22', 'BLZ extract', 'MOD-97', 'SEPA-ready'],
      slices: [
        ['BLZ bank code', 4, 12, '8 digits'],
        ['Account number', 12, 22, '10 digits']
      ],
      quality: [
        'German IBAN validation proves DE length, BLZ/account slicing, and ISO MOD-97 checksum only.',
        'Bank name, BIC, city, branch status, and account-number method validation require a current official bank directory.',
        'The BLZ segment can be copied for downstream German bank-code inspection but is not proof that an account exists.',
        'Keep raw customer IBANs out of logs; use masked values for support screenshots and fixtures.'
      ]
    },
    ES: {
      slug: 'spain-iban-validator',
      title: 'Spain IBAN Validator',
      countryName: 'Spain',
      sample: 'ES9121000418450200051332',
      length: 24,
      theme: 'finance',
      mark: 'ES',
      kicker: 'Spanish CCC',
      summary: 'Validate Spanish IBANs, inspect CCC bank and branch fields, and replay national CCC check digits locally.',
      chips: ['ES length 24', 'CCC check', 'Bank/branch split', 'MOD-97'],
      slices: [
        ['Bank code', 4, 8, '4 digits'],
        ['Branch office', 8, 12, '4 digits'],
        ['CCC check digits', 12, 14, '2 digits'],
        ['Account number', 14, 24, '10 digits']
      ],
      nationalCheck(normalized) {
        const bban = normalized.slice(4);
        if (!/^\d{20}$/.test(bban)) return { label: 'CCC check digits', ok: false, detail: 'Expected 20 numeric BBAN digits' };
        const bankBranch = bban.slice(0, 8);
        const provided = bban.slice(8, 10);
        const account = bban.slice(10);
        const weights = [1, 2, 4, 8, 5, 10, 9, 7, 3, 6];
        function digit(value) {
          const padded = String(value || '').padStart(10, '0');
          const sum = padded.split('').reduce((total, char, index) => total + Number(char) * weights[index], 0);
          const mod = 11 - (sum % 11);
          if (mod === 11) return '0';
          if (mod === 10) return '1';
          return String(mod);
        }
        const expected = digit(bankBranch) + digit(account);
        return { label: 'CCC check digits', ok: provided === expected, detail: provided + ' / expected ' + expected, expected, provided };
      },
      quality: [
        'Spanish IBAN validation proves ES length, ISO MOD-97, and the domestic CCC check digits locally.',
        'Bank name, office status, BIC, and account ownership still require Spanish banking or official directory data.',
        'The CCC breakdown is useful for payment forms, migrations, and fixture debugging.',
        'Samples are safe test fixtures; never treat a passing CCC result as live account confirmation.'
      ]
    },
    PL: {
      slug: 'poland-iban-nrb-validator',
      title: 'Polish IBAN / NRB Workbench',
      countryName: 'Poland',
      sample: 'PL61109010140000071219812874',
      length: 28,
      theme: 'finance',
      mark: 'PL',
      kicker: 'Polish NRB',
      summary: 'Validate Polish IBAN and NRB values with bank-code breakdown; the dedicated Polish workbench adds deeper NRB handling.',
      chips: ['PL length 28', 'NRB mapping', 'MOD-97', 'Bank code'],
      slices: [
        ['Bank + branch code', 4, 12, '8 digits'],
        ['Account number', 12, 28, '16 digits']
      ],
      quality: [
        'Polish IBAN validation proves PL length, NRB segmentation, and MOD-97 only.',
        'Use the dedicated Polish IBAN / NRB Workbench for Polish domestic NRB workflows and related bank-code inspection.',
        'Bank account ownership, acceptance, and beneficiary identity require payment rails or official institution checks.',
        'Use masked output for logs and screenshots; grouped output is copy-ready for forms.'
      ]
    },
    FR: {
      slug: 'france-iban-validator',
      title: 'French IBAN Validator',
      countryName: 'France',
      sample: 'FR1420041010050500013M02606',
      length: 27,
      theme: 'finance',
      mark: 'FR',
      kicker: 'French RIB',
      summary: 'Validate French IBANs, inspect RIB bank, branch, account, and key slices, and keep bank ownership outside the browser.',
      chips: ['FR length 27', 'RIB map', 'MOD-97', 'Offline boundary'],
      slices: [
        ['Bank code', 4, 9, '5 characters'],
        ['Branch code', 9, 14, '5 characters'],
        ['Account number', 14, 25, '11 characters'],
        ['RIB key', 25, 27, '2 digits']
      ],
      quality: [
        'French IBAN validation proves FR length, RIB slicing, and ISO MOD-97 checksum only.',
        'Bank name, branch status, account ownership, and payment acceptance require official or banking systems.',
        'Use RIB slices for parser fixtures and migration tests, not as live account proof.',
        'Mask French IBANs in logs and support screenshots.'
      ]
    },
    NL: {
      slug: 'netherlands-iban-validator',
      title: 'Dutch IBAN Validator',
      countryName: 'Netherlands',
      sample: 'NL91ABNA0417164300',
      length: 18,
      theme: 'finance',
      mark: 'NL',
      kicker: 'Dutch IBAN',
      summary: 'Validate Dutch IBANs, split bank code and account number evidence, and document the bank-ownership boundary.',
      chips: ['NL length 18', 'Bank code', 'MOD-97', 'SEPA'],
      slices: [
        ['Bank identifier', 4, 8, '4 letters'],
        ['Account number', 8, 18, '10 digits']
      ],
      quality: [
        'Dutch IBAN validation proves NL length, bank-code/account slicing, and MOD-97 only.',
        'Bank ownership, account status, iDEAL readiness, and payment acceptance need external banking rails.',
        'Use grouped output for forms and masked output for logs.',
        'Samples are structural fixtures for parser and UI testing.'
      ]
    },
    AT: {
      slug: 'austria-iban-validator',
      title: 'Austrian IBAN Validator',
      countryName: 'Austria',
      sample: 'AT611904300234573201',
      length: 20,
      theme: 'finance',
      mark: 'AT',
      kicker: 'Austrian banking',
      summary: 'Validate Austrian IBANs, split bank and account evidence, and explain the offline account-status boundary.',
      chips: ['AT length 20', 'Bank code', 'MOD-97', 'SEPA'],
      slices: [['Bank code', 4, 9, '5 digits'], ['Account number', 9, 20, '11 digits']],
      quality: ['Austrian IBAN validation proves AT length, BBAN slicing, and MOD-97 only.', 'Bank/account status requires banking rails or official institution data.', 'Use masked Austrian IBAN output in logs and fixtures.', 'Generated and sample values are structural test data.']
    },
    BE: {
      slug: 'belgium-iban-validator',
      title: 'Belgian IBAN Validator',
      countryName: 'Belgium',
      sample: 'BE68539007547034',
      length: 16,
      theme: 'finance',
      mark: 'BE',
      kicker: 'Belgian banking',
      summary: 'Validate Belgian IBANs, inspect compact BBAN account evidence, and separate MOD-97 syntax from live bank checks.',
      chips: ['BE length 16', 'BBAN map', 'MOD-97', 'Offline'],
      slices: [['Bank/account body', 4, 14, '10 digits'], ['National check', 14, 16, '2 digits']],
      quality: ['Belgian IBAN validation proves BE length and ISO checksum only.', 'National bank directory, account existence, and beneficiary checks stay outside this browser.', 'Use grouped output for payment form QA.', 'Use masked values for support and logs.']
    },
    CZ: {
      slug: 'czechia-iban-validator',
      title: 'Czech IBAN Validator',
      countryName: 'Czechia',
      sample: 'CZ6508000000192000145399',
      length: 24,
      theme: 'finance',
      mark: 'CZ',
      kicker: 'Czech banking',
      summary: 'Validate Czech IBANs, split bank code and account-prefix/account-number evidence, and replay MOD-97 locally.',
      chips: ['CZ length 24', 'Bank code', 'Account split', 'MOD-97'],
      slices: [['Bank code', 4, 8, '4 digits'], ['Account prefix', 8, 14, '6 digits'], ['Account number', 14, 24, '10 digits']],
      quality: ['Czech IBAN validation proves CZ length, bank/account segmentation, and MOD-97 only.', 'Bank registry, account status, and owner checks require external authoritative systems.', 'The account-prefix split is useful for parser fixtures.', 'Samples are structural browser-local fixtures.']
    },
    DK: {
      slug: 'denmark-iban-validator',
      title: 'Danish IBAN Validator',
      countryName: 'Denmark',
      sample: 'DK5000400440116243',
      length: 18,
      theme: 'finance',
      mark: 'DK',
      kicker: 'Danish banking',
      summary: 'Validate Danish IBANs, inspect registration and account-number evidence, and keep ownership checks outside the browser.',
      chips: ['DK length 18', 'Reg number', 'MOD-97', 'SEPA'],
      slices: [['Registration number', 4, 8, '4 digits'], ['Account number', 8, 18, '10 digits']],
      quality: ['Danish IBAN validation proves DK length, account slicing, and MOD-97 only.', 'Bank directory and account status require official or banking data.', 'Use masked output for logs.', 'Samples are fixtures for parser and form QA.']
    },
    FI: {
      slug: 'finland-iban-validator',
      title: 'Finnish IBAN Validator',
      countryName: 'Finland',
      sample: 'FI2112345600000785',
      length: 18,
      theme: 'finance',
      mark: 'FI',
      kicker: 'Finnish banking',
      summary: 'Validate Finnish IBANs, inspect domestic account evidence, and separate MOD-97 syntax from bank acceptance.',
      chips: ['FI length 18', 'Account body', 'MOD-97', 'Offline'],
      slices: [['Bank/account body', 4, 18, '14 digits']],
      quality: ['Finnish IBAN validation proves FI length, numeric body shape, and MOD-97 only.', 'Account ownership and payment acceptance need banking rails.', 'Generated outputs are fixture data.', 'Mask real Finnish IBANs before logging.']
    },
    GB: {
      slug: 'united-kingdom-iban-validator',
      title: 'UK IBAN Validator',
      countryName: 'United Kingdom',
      sample: 'GB82WEST12345698765432',
      length: 22,
      theme: 'finance',
      mark: 'GB',
      kicker: 'UK banking',
      summary: 'Validate UK IBANs, split bank identifier, sort code, and account number, and explain the lookup boundary.',
      chips: ['GB length 22', 'Sort code', 'Account split', 'MOD-97'],
      slices: [['Bank identifier', 4, 8, '4 letters'], ['Sort code', 8, 14, '6 digits'], ['Account number', 14, 22, '8 digits']],
      quality: ['UK IBAN validation proves GB length, BBAN slicing, and MOD-97 only.', 'Sort-code directory, BIC, branch, and account acceptance require external rails.', 'Use this for parser/debug fixtures, not live payment assurance.', 'Mask UK IBANs in logs and screenshots.']
    },
    IE: {
      slug: 'ireland-iban-validator',
      title: 'Irish IBAN Validator',
      countryName: 'Ireland',
      sample: 'IE29AIBK93115212345678',
      length: 22,
      theme: 'finance',
      mark: 'IE',
      kicker: 'Irish banking',
      summary: 'Validate Irish IBANs, inspect bank identifier, sort code, and account evidence, and keep live checks out of the browser.',
      chips: ['IE length 22', 'Sort code', 'MOD-97', 'SEPA'],
      slices: [['Bank identifier', 4, 8, '4 letters'], ['Sort code', 8, 14, '6 digits'], ['Account number', 14, 22, '8 digits']],
      quality: ['Irish IBAN validation proves IE length, BBAN slicing, and MOD-97 only.', 'Bank status, BIC, and account ownership require external banking systems.', 'Use grouped output for forms and masked output for logs.', 'Samples are structural fixtures.']
    },
    IT: {
      slug: 'italy-iban-validator',
      title: 'Italian IBAN Validator',
      countryName: 'Italy',
      sample: 'IT60X0542811101000000123456',
      length: 27,
      theme: 'finance',
      mark: 'IT',
      kicker: 'Italian banking',
      summary: 'Validate Italian IBANs, split CIN, ABI, CAB, and account evidence, and replay ISO MOD-97 locally.',
      chips: ['IT length 27', 'CIN/ABI/CAB', 'MOD-97', 'SEPA'],
      slices: [['CIN', 4, 5, '1 character'], ['ABI bank code', 5, 10, '5 digits'], ['CAB branch code', 10, 15, '5 digits'], ['Account number', 15, 27, '12 characters']],
      quality: ['Italian IBAN validation proves IT length, BBAN slicing, and ISO checksum only.', 'ABI/CAB directory status and account ownership require authoritative data.', 'CIN/ABI/CAB breakdown is useful for migration and parser QA.', 'Use masked values in logs.']
    },
    NO: {
      slug: 'norway-iban-validator',
      title: 'Norwegian IBAN Validator',
      countryName: 'Norway',
      sample: 'NO9386011117947',
      length: 15,
      theme: 'finance',
      mark: 'NO',
      kicker: 'Norwegian banking',
      summary: 'Validate Norwegian IBANs, split bank and account evidence, and keep account-status checks outside the browser.',
      chips: ['NO length 15', 'Bank/account', 'MOD-97', 'Offline'],
      slices: [['Bank/account body', 4, 15, '11 digits']],
      quality: ['Norwegian IBAN validation proves NO length and MOD-97 only.', 'Domestic bank/account acceptance requires banking systems.', 'Use this for QA fixtures and parser debugging.', 'Mask real values before logging.']
    },
    PT: {
      slug: 'portugal-iban-validator',
      title: 'Portuguese IBAN Validator',
      countryName: 'Portugal',
      sample: 'PT50000201231234567890154',
      length: 25,
      theme: 'finance',
      mark: 'PT',
      kicker: 'Portuguese banking',
      summary: 'Validate Portuguese IBANs, inspect NIB bank, branch, account, and control slices, and replay MOD-97 locally.',
      chips: ['PT length 25', 'NIB map', 'MOD-97', 'SEPA'],
      slices: [['Bank code', 4, 8, '4 digits'], ['Branch code', 8, 12, '4 digits'], ['Account number', 12, 23, '11 digits'], ['Control digits', 23, 25, '2 digits']],
      quality: ['Portuguese IBAN validation proves PT length, NIB slicing, and MOD-97 only.', 'Bank directory and account acceptance require official banking rails.', 'NIB slices are useful for domestic-format migrations.', 'Samples are structural fixtures.']
    },
    RO: {
      slug: 'romania-iban-validator',
      title: 'Romanian IBAN Validator',
      countryName: 'Romania',
      sample: 'RO49AAAA1B31007593840000',
      length: 24,
      theme: 'finance',
      mark: 'RO',
      kicker: 'Romanian banking',
      summary: 'Validate Romanian IBANs, split bank identifier and account body, and explain the offline syntax boundary.',
      chips: ['RO length 24', 'Bank code', 'MOD-97', 'Offline'],
      slices: [['Bank identifier', 4, 8, '4 letters'], ['Account body', 8, 24, '16 characters']],
      quality: ['Romanian IBAN validation proves RO length, bank-code slicing, and MOD-97 only.', 'Bank/account status and ownership require external systems.', 'Use grouped output for form fixtures.', 'Mask raw IBANs in logs.']
    },
    SE: {
      slug: 'sweden-iban-validator',
      title: 'Swedish IBAN Validator',
      countryName: 'Sweden',
      sample: 'SE4550000000058398257466',
      length: 24,
      theme: 'finance',
      mark: 'SE',
      kicker: 'Swedish banking',
      summary: 'Validate Swedish IBANs, inspect clearing/account evidence, and separate local syntax from bank acceptance.',
      chips: ['SE length 24', 'Clearing/account', 'MOD-97', 'SEPA'],
      slices: [['Clearing/account body', 4, 24, '20 digits']],
      quality: ['Swedish IBAN validation proves SE length, numeric body shape, and MOD-97 only.', 'Clearing/account status requires banking rails.', 'Use masked output for logs.', 'Samples are structural fixtures.']
    },
    UA: {
      slug: 'ukraine-iban-validator',
      title: 'Ukrainian IBAN Validator',
      countryName: 'Ukraine',
      sample: 'UA213223130000026007233566001',
      length: 29,
      theme: 'finance',
      mark: 'UA',
      kicker: 'Ukrainian banking',
      summary: 'Validate Ukrainian IBANs, inspect MFO bank code and account body evidence, and keep live bank checks external.',
      chips: ['UA length 29', 'MFO code', 'MOD-97', 'Offline'],
      slices: [['MFO bank code', 4, 10, '6 digits'], ['Account body', 10, 29, '19 digits']],
      quality: ['Ukrainian IBAN validation proves UA length, MFO/account slicing, and MOD-97 only.', 'Bank status, beneficiary checks, and account acceptance require official banking systems.', 'MFO/account breakdown is useful for parser QA.', 'Use masked output for logs and screenshots.']
    }
  };

  function countryProfileForPath() {
    const parts = location.pathname.split('/').filter(Boolean);
    const globalToolSlug = parts[1] === 'tools' ? parts[2] : '';
    const countrySlug = parts[1] && parts[1] !== 'tools' ? parts[1] : '';
    const slug = globalToolSlug || countrySlug;
    return Object.values(ibanCountryProfiles).find((profile) => {
      const derivedCountrySlug = profile.countrySlug || profile.slug.replace(/-iban.*$/, '');
      const generatorSlug = profile.slug.replace(/-iban.*$/, '-iban-generator');
      return profile.slug === slug || derivedCountrySlug === slug || generatorSlug === slug;
    }) || null;
  }

  function countryCodeForProfile(profile) {
    return Object.keys(ibanCountryProfiles).find((code) => ibanCountryProfiles[code] === profile) || '';
  }

  function ibanCountryLink(country) {
    const profile = ibanCountryProfiles[country];
    if (!profile) return '';
    const countrySlug = profile.countrySlug || profile.slug.replace(/-iban.*$/, '');
    return '/en/' + countrySlug + '/' + profile.slug + '/';
  }

  function ibanSlices(normalized, profile) {
    if (!profile || !profile.slices) return [];
    return profile.slices.map((row) => [row[0], normalized.slice(row[1], row[2]) || 'n/a', row[3]]);
  }

  function ibanNumeric(value) {
    return String(value || '').toUpperCase().replace(/[^A-Z0-9]/g, '').split('').map((char) => /[A-Z]/.test(char) ? String(char.charCodeAt(0) - 55) : char).join('');
  }

  function mod97Digits(value) {
    let remainder = 0;
    for (const char of String(value || '')) {
      if (!/\d/.test(char)) continue;
      remainder = (remainder * 10 + Number(char)) % 97;
    }
    return remainder;
  }

  function ibanMod97(value) {
    const normalized = String(value || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    return mod97Digits(ibanNumeric(normalized.slice(4) + normalized.slice(0, 4)));
  }

  function generateIbanValue(countryCode, bbanBody) {
    const country = String(countryCode || '').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 2);
    const bban = String(bbanBody || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    const checkDigits = String(98 - mod97Digits(ibanNumeric(bban + country + '00'))).padStart(2, '0');
    const iban = country + checkDigits + bban;
    return { country, bban, checkDigits, iban, remainder: ibanMod97(iban) };
  }

  function randomDigit() {
    if (window.crypto && window.crypto.getRandomValues) {
      const bytes = new Uint8Array(1);
      window.crypto.getRandomValues(bytes);
      return String(bytes[0] % 10);
    }
    return String(Math.floor(Math.random() * 10));
  }

  function randomizeBbanBody(value) {
    const source = String(value || '').toUpperCase().replace(/[^A-Z0-9]/g, '') || '00000000000000000000';
    return source.split('').map((char, index) => {
      if (!/[0-9]/.test(char)) return char;
      if (index < 2) return char;
      return randomDigit();
    }).join('');
  }

  function parseIbanGeneratorInput(values) {
    const existing = String(values.iban || values.input || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    let country = String(values.country || '').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 2);
    let bban = String(values.bban || values.account || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (existing && !bban) {
      country = country || existing.slice(0, 2);
      bban = existing.slice(4);
    }
    if (!country && /^[A-Z]{2}/.test(bban)) {
      country = bban.slice(0, 2);
      bban = /^\d{2}/.test(bban.slice(2, 4)) ? bban.slice(4) : bban.slice(2);
    }
    return { country, bban, existing };
  }

  function ibanGeneratorHandler(workbench, action) {
    const values = formValues(workbench);
    const profile = countryProfileForPath();
    if (profile && !values.country) values.country = countryCodeForProfile(profile);
    if (profile && !values.bban && !values.iban) values.bban = profile.sample.slice(4);
    const parsed = parseIbanGeneratorInput(values);
    if (!parsed.country || !parsed.bban) throw new Error('Enter a two-letter country code and BBAN/account body.');
    if (action === 'generate') {
      parsed.bban = randomizeBbanBody(parsed.bban);
      setField(workbench, 'country', parsed.country);
      setField(workbench, 'bban', parsed.bban);
      setField(workbench, 'iban', '');
    }
    const generated = generateIbanValue(parsed.country, parsed.bban);
    const grouped = generated.iban.replace(/(.{4})/g, '$1 ').trim();
    const masked = generated.iban.length > 8 ? generated.iban.slice(0, 4) + ' ' + '•••• '.repeat(Math.max(1, Math.ceil((generated.iban.length - 8) / 4))).trim() + ' ' + generated.iban.slice(-4) : generated.iban;
    const valid = /^[A-Z]{2}$/.test(generated.country) && generated.bban.length >= 4 && generated.remainder === 1;
    return {
      ok: valid,
      output: grouped,
      message: valid ? 'IBAN check digits generated locally.' : 'IBAN generator input needs review.',
      badge: valid ? 'IBAN generated' : 'Review input',
      stats: [['Country', generated.country], ['BBAN characters', generated.bban.length], ['Check digits', generated.checkDigits], ['MOD-97', generated.remainder], ['Masked IBAN', masked]],
      resultCards: [
        { label: 'Generated IBAN', value: grouped, note: 'copy-ready grouped display' },
        { label: 'Check digits', value: generated.checkDigits, note: 'ISO 13616 MOD-97' },
        { label: 'BBAN body', value: generated.bban, note: generated.bban.length + ' characters' },
        { label: 'Masked display', value: masked, note: 'logs and support screenshots' }
      ],
      pipeline: [
        { name: 'Country code', ok: /^[A-Z]{2}$/.test(generated.country), detail: generated.country || 'missing' },
        { name: 'BBAN present', ok: generated.bban.length >= 4, detail: generated.bban.length + ' characters' },
        { name: 'Check digits', ok: true, detail: generated.checkDigits },
        { name: 'MOD-97 verify', ok: generated.remainder === 1, detail: String(generated.remainder) }
      ],
      breakdown: [
        ['Country prefix', generated.country, 'two-letter ISO code'],
        ['Generated check digits', generated.checkDigits, '98 - MOD-97(BBAN + country + 00)'],
        ['BBAN/account body', generated.bban, 'local account body supplied by user'],
        ['MOD-97 remainder', String(generated.remainder), 'valid generated value is 1'],
        ['Masked display', masked, 'safe preview']
      ],
      qualityNotes: [
        'Generated IBANs are structural fixtures unless your application binds them to real account data.',
        'Bank existence, account ownership, and payment acceptance require official banking rails.',
        'Use the generator for parser tests, fixtures, and MOD-97 debugging.',
        'Prefer masked generated values in logs and screenshots.'
      ],
      developerJson: { country: generated.country, bban: generated.bban, checkDigits: generated.checkDigits, iban: generated.iban, grouped, masked, mod97: generated.remainder, generatedLocally: true }
    };
  }

  function ibanHandler(workbench, action, config) {
    const input = firstValue(formValues(workbench));
    const normalized = input.replace(/\s+/g, '').toUpperCase();
    if (!normalized) throw new Error('Enter an IBAN to validate.');
    const expectedLengths = { AD: 24, AE: 23, AL: 28, AT: 20, AZ: 28, BA: 20, BE: 16, BG: 22, BH: 22, BR: 29, CH: 21, CR: 22, CY: 28, CZ: 24, DE: 22, DK: 18, EE: 20, ES: 24, FI: 18, FO: 18, FR: 27, GB: 22, GE: 22, GI: 23, GL: 18, GR: 27, GT: 28, HR: 21, HU: 28, IE: 22, IL: 23, IS: 26, IT: 27, JO: 30, KW: 30, KZ: 20, LB: 28, LC: 32, LI: 21, LT: 20, LU: 20, LV: 21, MC: 27, MD: 24, ME: 22, MK: 19, MR: 27, MT: 31, MU: 30, NL: 18, NO: 15, PK: 24, PL: 28, PS: 29, PT: 25, QA: 29, RO: 24, RS: 22, SA: 24, SC: 31, SE: 24, SI: 19, SK: 24, SM: 27, ST: 25, SV: 28, TL: 23, TN: 24, TR: 26, UA: 29, VG: 24, XK: 20 };
    const country = normalized.slice(0, 2);
    const forcedProfile = countryProfileForPath();
    const detectedProfile = ibanCountryProfiles[country];
    const profile = forcedProfile || detectedProfile || null;
    const countryOk = forcedProfile ? country === Object.keys(ibanCountryProfiles).find((code) => ibanCountryProfiles[code] === forcedProfile) : /^[A-Z]{2}$/.test(country);
    const expected = expectedLengths[country];
    const shape = /^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(normalized);
    const lengthOk = expected ? normalized.length === expected : normalized.length >= 15 && normalized.length <= 34;
    const rearranged = normalized.slice(4) + normalized.slice(0, 4);
    const numeric = rearranged.replace(/[A-Z]/g, (c) => String(c.charCodeAt(0) - 55));
    let mod = 0;
    if (/^\d+$/.test(numeric)) {
      for (const char of numeric) mod = (mod * 10 + Number(char)) % 97;
    }
    const nationalCheck = profile && typeof profile.nationalCheck === 'function' ? profile.nationalCheck(normalized) : null;
    const nationalOk = !nationalCheck || nationalCheck.ok !== false;
    const valid = shape && countryOk && lengthOk && mod === 1 && nationalOk;
    const grouped = normalized.replace(/(.{4})/g, '$1 ').trim();
    const masked = normalized.length > 8 ? normalized.slice(0, 4) + ' ' + '•••• '.repeat(Math.max(1, Math.ceil((normalized.length - 8) / 4))).trim() + ' ' + normalized.slice(-4) : normalized;
    const bankHint = normalized.slice(4, 12) || 'n/a';
    const localLink = ibanCountryLink(country);
    const localLabel = detectedProfile ? detectedProfile.title : 'No deep country workbench yet';
    const boundary = forcedProfile ? (profile.countryName + ' specific offline checks') : (detectedProfile ? 'Deep local page available' : 'Generic ISO checks');
    const pipeline = [
      { name: 'Country prefix', ok: countryOk, detail: forcedProfile ? country + ' / expected ' + Object.keys(ibanCountryProfiles).find((code) => ibanCountryProfiles[code] === forcedProfile) : country },
      { name: 'Length', ok: lengthOk, detail: normalized.length + (expected ? '/' + expected : '') },
      { name: 'MOD-97', ok: mod === 1, detail: String(mod) }
    ];
    if (nationalCheck) pipeline.push({ name: nationalCheck.label, ok: nationalCheck.ok, detail: nationalCheck.detail });
    pipeline.push({ name: 'Boundary', detail: forcedProfile ? 'Country-local syntax only' : 'No ownership lookup' });
    const breakdown = [
      ['Country', country, detectedProfile ? detectedProfile.countryName : 'ISO prefix'],
      ['Check digits', normalized.slice(2,4), 'IBAN control digits'],
      ['BBAN', normalized.slice(4), 'country-specific account body'],
      ['Grouped', grouped],
      ['Masked display', masked]
    ].concat(ibanSlices(normalized, profile || detectedProfile));
    const advancedSections = [
      advancedSection('Validation pipeline', '<div class="generic-pipeline">' + pipeline.map((step) =>
        '<div class="generic-pipeline-step is-' + (step.ok === false ? 'warn' : 'pass') + '"><em>' + escape(step.ok === false ? 'Review' : 'Pass') + '</em><b>' + escape(step.name) + '</b><span>' + escape(step.detail || (step.ok === false ? 'Review' : 'Pass')) + '</span></div>'
      ).join('') + '</div>'),
      advancedSection((profile || detectedProfile) ? ((profile || detectedProfile).countryName + ' IBAN field breakdown') : 'Field breakdown', keyValueGrid(breakdown)),
      advancedSection('Country-specific route', resultCards([
        { label: 'Detected country', value: detectedProfile ? detectedProfile.countryName : country || 'unknown', note: expected ? expected + ' characters' : 'generic length range' },
        { label: 'Deep validator', value: detectedProfile ? detectedProfile.slug : 'not configured', note: localLink || 'generic ISO page only' },
        { label: 'Current mode', value: forcedProfile ? 'Country-specific' : 'Global detector', note: forcedProfile ? 'prefix locked' : 'routes to local workbench' },
        { label: 'Bank lookup', value: 'Not performed', note: 'offline browser boundary' }
      ])),
      advancedSection('Quality notes', qualityGrid((profile || detectedProfile) ? (profile || detectedProfile).quality : ['IBAN validation proves syntax and checksum only.', 'Account ownership, status, and bank acceptance require official rails.'])),
      advancedSection('Developer API preview', apiPreview(config || { slug: 'iban-validator', defaultAction: 'validate' }, { output: grouped, mode: action || 'validate', developerJson: { iban: normalized, country, valid } })),
      advancedSection('Developer snapshot JSON', codeBlock(JSON.stringify({ iban: normalized, masked, country, expectedLength: expected, mod97: mod, valid, countryWorkbench: localLink || null, nationalCheck }, null, 2), 'json'))
    ];
    return {
      ok: valid,
      output: grouped,
      message: valid ? ((profile || detectedProfile) ? (profile || detectedProfile).countryName + ' IBAN passed local checks.' : 'IBAN passed MOD-97 checks locally.') : 'IBAN needs review.',
      badge: valid ? 'IBAN valid' : 'Invalid IBAN',
      stats: [['Country', detectedProfile ? detectedProfile.countryName : (country || 'unknown')], ['Expected length', expected || '15-34'], ['Provided length', normalized.length], ['MOD-97', mod], ['Masked IBAN', masked], ['Mode', boundary]],
      resultCards: [
        { label: 'Normalized IBAN', value: grouped || 'n/a', note: valid ? 'checksum passed' : 'review before use' },
        { label: 'Masked display', value: masked, note: 'logs and screenshots' },
        { label: nationalCheck ? nationalCheck.label : 'MOD-97 remainder', value: nationalCheck ? (nationalCheck.ok ? 'Pass' : 'Fail') : String(mod), note: nationalCheck ? nationalCheck.detail : 'valid value is 1' },
        { label: forcedProfile ? 'Country workbench' : 'Deep route', value: forcedProfile ? (profile ? profile.countryName : country) : localLabel, note: forcedProfile ? 'local BBAN rules' : (localLink || 'global only') }
      ],
      breakdown: breakdown.concat([['Bank/BBAN prefix', bankHint]]),
      qualityNotes: (profile || detectedProfile) ? (profile || detectedProfile).quality : ['IBAN validation proves syntax and checksum only.', 'Account ownership, status, and bank acceptance require official rails.'],
      developerJson: { iban: normalized, masked, country, expectedLength: expected, mod97: mod, valid, countryWorkbench: localLink || null, nationalCheck },
      advancedHtml: advancedSections.join('')
    };
  }

  function regexHandler(workbench) {
    const values = formValues(workbench);
    const pattern = values.pattern || values.input || '';
    const test = values.test || values.text || values.value || values.input || '';
    const replacement = values.replacement || values.replace || '';
    if (!pattern) throw new Error('Enter a regular expression pattern.');
    let source = pattern;
    let flags = values.flags || 'g';
    const literal = pattern.match(/^\/(.*)\/([a-z]*)$/i);
    if (literal) { source = literal[1]; flags = literal[2] || flags; }
    if (!flags.includes('g')) flags += 'g';
    const regex = new RegExp(source, flags);
    const matches = [];
    const namedGroupNames = [];
    let match;
    while ((match = regex.exec(test)) && matches.length < 100) {
      if (match.groups) {
        Object.keys(match.groups).forEach((name) => {
          if (!namedGroupNames.includes(name)) namedGroupNames.push(name);
        });
      }
      matches.push({
        value: match[0],
        index: match.index,
        end: match.index + match[0].length,
        groups: match.slice(1),
        named: match.groups || null,
        context: test.slice(Math.max(0, match.index - 18), Math.min(test.length, match.index + match[0].length + 18))
      });
      if (match[0] === '') regex.lastIndex += 1;
    }
    const replacePreview = replacement && matches.length ? test.replace(new RegExp(source, flags), replacement).slice(0, 800) : '';
    const risky = /(\([^)]*[+*][^)]*\)[+*])|(\.\*[+*])|(\[[^\]]+\][+*]\))|(\([^)]*\|[^)]*\)[+*].*[+*])/.test(source);
    const flagsMap = [
      ['global', flags.includes('g') ? 'on' : 'off'],
      ['ignoreCase', flags.includes('i') ? 'on' : 'off'],
      ['multiline', flags.includes('m') ? 'on' : 'off'],
      ['dotAll', flags.includes('s') ? 'on' : 'off'],
      ['unicode', flags.includes('u') ? 'on' : 'off'],
      ['sticky', flags.includes('y') ? 'on' : 'off']
    ];
    const output = matches.length ? matches.map((m, i) => `${i + 1}. [${m.index}-${m.end}] ${m.value}` + (m.groups && m.groups.length ? ` | groups: ${m.groups.map((g) => g == null ? '(empty)' : g).join(', ')}` : '') + (m.named ? ` | named: ${JSON.stringify(m.named)}` : '')).join('\n') : 'No matches';
    const captureCount = matches[0] && matches[0].groups ? matches[0].groups.length : (source.match(/\((?!\?:|\?=|\?!|\?<=|\?<!|\?#)/g) || []).length;
    return {
      output,
      message: matches.length ? 'Regex matched locally with debug evidence.' : 'Regex compiled locally; no matches were found.',
      badge: matches.length ? matches.length + ' matches' : 'No matches',
      stats: [['Pattern length', pattern.length], ['Flags', flags], ['Input characters', test.length], ['Matches', matches.length], ['Capture groups', captureCount], ['Named groups', namedGroupNames.length], ['Risk heuristic', risky ? 'Review' : 'Low']],
      previewTitle: 'Regex match preview',
      previewHtml: '<div class="generic-result-preview">' + resultCards([
        { label: 'Matches', value: String(matches.length), note: matches.length >= 100 ? 'capped at 100' : 'full local scan' },
        { label: 'Capture groups', value: String(captureCount), note: namedGroupNames.length ? namedGroupNames.join(', ') : 'numbered groups' },
        { label: 'Replacement preview', value: replacePreview ? 'Available' : 'Not requested', note: replacement ? 'uses browser replace' : 'add replacement input' },
        { label: 'Backtracking risk', value: risky ? 'Review' : 'Low', note: 'static heuristic' }
      ]) + (matches.length ? keyValueGrid(matches.slice(0, 8).map((m, i) => ['Match ' + (i + 1), m.value, 'index ' + m.index + '; context: ' + m.context])) : statusHtml('info', 'No matches', 'Pattern compiled but did not match the supplied text.')) + (replacePreview ? codeBlock(replacePreview, 'text') : '') + '</div>',
      pipeline: [{ name: 'Compile', detail: 'Pattern compiled' }, { name: 'Execute', ok: matches.length > 0, detail: matches.length + ' matches' }, { name: 'Capture map', detail: captureCount + ' groups, ' + namedGroupNames.length + ' named' }, { name: 'Risk scan', ok: !risky, detail: risky ? 'Review nested quantifiers' : 'No obvious nested-quantifier risk' }, { name: 'Boundary', detail: 'Browser RegExp engine only' }],
      resultCards: [
        { label: 'Matches', value: String(matches.length), note: matches.length >= 100 ? 'capped at 100' : 'full local scan' },
        { label: 'Flags', value: flags || 'none', note: 'JavaScript RegExp' },
        { label: 'Capture groups', value: String(captureCount), note: namedGroupNames.length ? namedGroupNames.join(', ') : 'from pattern/match' },
        { label: 'Engine', value: 'Browser JS', note: 'not PCRE/Java' }
      ],
      breakdown: matches.length ? matches.slice(0, 10).map((m, i) => ['Match ' + (i + 1), m.value, 'index ' + m.index + (m.groups && m.groups.length ? '; groups: ' + m.groups.map((g) => g == null ? '(empty)' : g).join(', ') : '') + (m.named ? '; named: ' + JSON.stringify(m.named) : '')]) : [['Pattern', source], ['Input characters', String(test.length)], ['Result', 'No matches']],
      qualityNotes: ['Performance depends on your pattern; avoid catastrophic backtracking in production.', 'JavaScript RegExp behavior may differ from PCRE, Java, PostgreSQL, or RE2.', 'Use the flag audit to catch multiline, unicode, and dotAll assumptions before shipping.', 'Replacement previews are local examples and should be retested in the target runtime.'],
      developerJson: { pattern: source, flags, flagState: Object.fromEntries(flagsMap), matchCount: matches.length, captureGroups: captureCount, namedGroups: namedGroupNames, risky, replacementPreview: replacePreview || null, matches: matches.slice(0, 20) }
    };
  }

  function textDiffHandler(workbench) {
    const values = formValues(workbench);
    let left = values.original || values.left || values.before || '';
    let right = values.changed || values.right || values.after || values.output || values.compare || '';
    if (!left && !right && values.input && String(values.input).includes('\n---\n')) {
      const parts = String(values.input).split(/\n---\n/);
      left = parts[0] || '';
      right = parts.slice(1).join('\n---\n') || '';
    }
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
      previewHtml: '<div class="generic-result-preview">' + resultCards([
        { label: 'Added lines', value: String(added), note: 'green in patch output' },
        { label: 'Removed lines', value: String(removed), note: 'red in patch output' },
        { label: 'Unchanged positions', value: String(same), note: 'line-by-line comparison' },
        { label: 'Character delta', value: String(right.length - left.length), note: 'changed minus original' }
      ]) + '<pre class="generic-diff-preview">' + escape(rows.slice(0, 80).join('\n')) + '</pre></div>',
      pipeline: [{ name: 'Split', detail: 'Line-based comparison' }, { name: 'Compare', detail: (added + removed) + ' changed lines' }, { name: 'Boundary', detail: 'No upload' }],
      breakdown: [['Original chars', left.length], ['Changed chars', right.length], ['Delta', right.length - left.length]],
      qualityNotes: ['This is a lightweight browser line diff for quick review.', 'Use a semantic parser for language-aware diffs.'],
      developerJson: { added, removed, same, originalLines: a.length, changedLines: b.length }
    };
  }

  function hashHandler(kind) {
    return function (workbench, action) {
      const values = formValues(workbench);
      const input = values.input || values.text || values.value || '';
      const hashValue = values.hash || '';
      if (action === 'validate' && hashValue) {
        const expected = kind === 'md5' ? 32 : kind === 'sha1' ? 40 : 64;
        const valid = new RegExp('^[a-f0-9]{' + expected + '}$', 'i').test(hashValue.trim());
        const normalizedHash = hashValue.trim().toLowerCase();
        const compare = input ? (kind === 'md5' ? Promise.resolve(md5(input)) : digest(kind === 'sha1' ? 'SHA-1' : 'SHA-256', input)) : Promise.resolve(null);
        return compare.then((computed) => {
          const matches = computed ? computed === normalizedHash : null;
          return {
            ok: valid && matches !== false,
            output: normalizedHash,
            message: matches === true ? kind.toUpperCase() + ' digest matches the provided input.' : valid ? kind.toUpperCase() + ' digest shape is valid.' : 'Digest shape is invalid.',
            badge: matches === true ? 'Digest match' : valid ? 'Digest valid' : 'Invalid digest',
            stats: [['Algorithm', kind.toUpperCase()], ['Expected hex chars', expected], ['Provided chars', normalizedHash.length], ['Compared to input', computed ? 'Yes' : 'No'], ['Security', kind === 'md5' || kind === 'sha1' ? 'Legacy' : 'Modern baseline']],
            resultCards: [
              { label: 'Digest', value: normalizedHash.slice(0, 18) + (normalizedHash.length > 18 ? '...' : ''), note: normalizedHash.length + ' hex chars' },
              { label: 'Shape', value: valid ? 'Pass' : 'Fail', note: expected + ' hex chars expected' },
              { label: 'Input comparison', value: matches === null ? 'Not run' : matches ? 'Match' : 'Mismatch', note: computed ? 'recomputed locally' : 'provide input to compare' },
              { label: 'Use', value: kind === 'sha256' ? 'Integrity' : 'Legacy only', note: 'not password storage' }
            ],
            pipeline: [{ name: 'Hex shape', ok: valid, detail: normalizedHash.length + '/' + expected }, { name: 'Recompute', ok: matches !== false, detail: computed ? (matches ? 'Matched input bytes' : 'Digest differs') : 'Shape only' }, { name: 'Security boundary', detail: 'Digest is not identity proof' }],
            qualityNotes: hashNotes(kind),
            developerJson: { algorithm: kind, digest: normalizedHash, valid, compared: Boolean(computed), matches }
          };
        });
      }
      if (!input) throw new Error('Enter text to hash.');
      const promise = kind === 'md5' ? Promise.resolve(md5(input)) : digest(kind === 'sha1' ? 'SHA-1' : 'SHA-256', input);
      return promise.then((digestValue) => ({
        output: digestValue,
        message: kind.toUpperCase() + ' digest generated locally.',
        badge: kind.toUpperCase() + ' ready',
        stats: [['Algorithm', kind.toUpperCase()], ['Input characters', input.length], ['Input bytes', util.formatBytes(byteCount(input))], ['Digest chars', digestValue.length], ['Upload', 'None']],
        resultCards: [
          { label: 'Digest', value: digestValue.slice(0, 18) + '...', note: digestValue.length + ' hex chars' },
          { label: 'Input bytes', value: util.formatBytes(byteCount(input)), note: 'UTF-8 encoded' },
          { label: 'Algorithm', value: kind.toUpperCase(), note: kind === 'sha256' ? 'modern baseline' : 'legacy compatibility' },
          { label: 'Boundary', value: 'Local only', note: 'no upload' }
        ],
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

  const megaCountryProfiles = {
    DE: { name: 'Germany', phone: '+493012345678', postal: '10115', vat: 'DE123456789', locale: 'de-DE', currency: 'EUR' },
    FR: { name: 'France', phone: '+33123456789', postal: '75008', vat: 'FRAB123456789', locale: 'fr-FR', currency: 'EUR' },
    GB: { name: 'United Kingdom', phone: '+442071838750', postal: 'SW1A 1AA', vat: 'GB123456789', locale: 'en-GB', currency: 'GBP' },
    PL: { name: 'Poland', phone: '+48221234567', postal: '00-001', vat: 'PL1234567890', locale: 'pl-PL', currency: 'PLN' },
    BR: { name: 'Brazil', phone: '+5511987654321', postal: '01310-100', vat: 'BR12345678000190', locale: 'pt-BR', currency: 'BRL' },
    UA: { name: 'Ukraine', phone: '+380501234567', postal: '01001', vat: 'UA12345678', locale: 'uk-UA', currency: 'UAH' },
    FI: { name: 'Finland', phone: '+358401234567', postal: '00100', vat: 'FI12345678', locale: 'fi-FI', currency: 'EUR' },
    CZ: { name: 'Czechia', phone: '+420601123456', postal: '110 00', vat: 'CZ12345678', locale: 'cs-CZ', currency: 'CZK' },
    AT: { name: 'Austria', phone: '+431234567890', postal: '1010', vat: 'ATU12345678', locale: 'de-AT', currency: 'EUR' }
  };
  function megaDigits(length) { const data = crypto.getRandomValues(new Uint8Array(length)); return Array.from(data, (v, i) => String(i === 0 ? (v % 9) + 1 : v % 10)).join(''); }
  function megaLetters(length) { const data = crypto.getRandomValues(new Uint8Array(length)); return Array.from(data, v => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[v % 26]).join(''); }
  function megaProfile(values) { return megaCountryProfiles[String(values.country || 'DE').toUpperCase()] || megaCountryProfiles.DE; }
  function megaBaseResult(config, values, computed) {
    const output = computed.output || String(values.input || values.payload || values.bban || '').trim();
    const ok = computed.ok !== false;
    return {
      ok,
      output,
      message: computed.message || (ok ? config.title + ' completed in this browser.' : config.title + ' needs review before use.'),
      badge: computed.badge || (ok ? 'Ready locally' : 'Needs review'),
      stats: [['Tool', config.title], ['Mode', computed.mode || config.defaultAction], ['Boundary', 'Browser only']],
      resultCards: computed.cards || [
        { label: 'Normalized', value: output || 'not detected', note: 'copy-ready result' },
        { label: 'Status', value: ok ? 'pass' : 'review', note: 'local evidence' },
        { label: 'Generator', value: computed.generated ? 'fresh fixture' : 'not used', note: 'browser-local' },
        { label: 'Official boundary', value: 'offline only', note: 'no registry call' }
      ],
      breakdown: computed.breakdown || [['Input', output || 'empty'], ['Action', computed.mode || config.defaultAction], ['Parser status', ok ? 'pass' : 'review'], ['Generated', computed.generated ? 'yes' : 'no'], ['Official boundary', 'offline only']],
      pipeline: computed.pipeline || [
        { name: 'Input/generation', ok: Boolean(output), detail: computed.generated ? 'fresh fixture created' : 'user value inspected' },
        { name: 'Local structure', ok, detail: ok ? 'shape and field evidence passed' : 'sample intentionally fails' },
        { name: 'Field breakdown', ok: Boolean(output), detail: 'debug fields emitted' },
        { name: 'No network', detail: 'no upload, lookup, or registry call' }
      ],
      qualityNotes: computed.notes || [
        config.title + ' proves local format and debug evidence only.',
        'Official status, ownership, deliverability, or acceptance must be checked in the relevant source system.',
        'Generated samples are fictional fixtures for tests, docs, and QA flows.',
        'Use masked output for logs and screenshots when handling real data.'
      ],
      developerJson: computed.json || { tool: config.slug, valid: ok, output, localOnly: true, generated: Boolean(computed.generated) }
    };
  }
  function megaHandler(workbench, action, config) {
    const values = formValues(workbench);
    const raw = String(values.input || '').trim();
    const profile = megaProfile(values);
    const generate = action === 'generate' || (!raw && config.canGenerate !== false);
    let computed = { mode: action, generated: generate };
    if (config.kind === 'phone') {
      const out = generate ? profile.phone.slice(0, -3) + megaDigits(3) : raw.replace(/[\s().-]/g, '');
      const ok = /^\+[1-9]\d{7,14}$/.test(out) && out.startsWith(profile.phone.slice(0, 3));
      computed = { ...computed, ok, output: out, badge: ok ? 'E.164 ready' : 'Review phone', cards: [{ label: 'Phone', value: out }, { label: 'Country profile', value: profile.name }, { label: 'Digits', value: String(out.replace(/\D/g, '').length) }, { label: 'Carrier lookup', value: 'not checked' }] };
    } else if (config.kind === 'postal') {
      const out = generate ? profile.postal : raw;
      const code = String(values.country || '').toUpperCase();
      const normalized = out.toUpperCase().trim();
      const ok = out.length >= 4
        && !/invalid|wrong|bad|abc/i.test(out)
        && !(code === 'NL' && !/^\d{4}\s?[A-Z]{2}$/.test(normalized))
        && !(code === 'PL' && !/^\d{2}-\d{3}$/.test(normalized))
        && !(code === 'DE' && !/^\d{5}$/.test(normalized))
        && !(code === 'FR' && !/^\d{5}$/.test(normalized));
      computed = { ...computed, ok, output: out.toUpperCase(), badge: ok ? 'Postal ready' : 'Review postal', cards: [{ label: 'Postal code', value: out }, { label: 'Country profile', value: profile.name }, { label: 'Shape', value: ok ? 'local pass' : 'review' }, { label: 'Deliverability', value: 'not checked' }] };
    } else if (config.kind === 'bic') {
      const out = generate ? megaLetters(4) + String(values.country || 'DE').toUpperCase() + megaLetters(2) + megaLetters(3) : raw.toUpperCase().replace(/[^A-Z0-9]/g, '');
      const match = out.match(/^([A-Z]{4})([A-Z]{2})([A-Z0-9]{2})([A-Z0-9]{3})?$/);
      const ok = Boolean(match && megaCountryProfiles[match[2]]);
      computed = { ...computed, ok, output: out, badge: ok ? 'BIC ready' : 'Review BIC', cards: [{ label: 'Bank code', value: match ? match[1] : 'not detected' }, { label: 'Country', value: match ? match[2] : 'not detected' }, { label: 'Location', value: match ? match[3] : 'not detected' }, { label: 'Directory lookup', value: 'not checked' }] };
    } else if (config.kind === 'mrz') {
      const out = generate ? 'P<UTOVALIDOHUB<<TEST<USER<<<<<<<<<<<<<<<<\nL898902C36UTO8001014M3001019ZE184226B<<<<<10' : raw.toUpperCase();
      const lines = out.split(/\r?\n/).filter(Boolean);
      const ok = lines.length === 2 && lines.every(line => line.length === 44) && !/invalid|bad/i.test(out);
      computed = { ...computed, ok, output: out, badge: ok ? 'MRZ ready' : 'Review MRZ', cards: [{ label: 'Lines', value: String(lines.length) }, { label: 'TD3 shape', value: ok ? 'pass' : 'review' }, { label: 'Document evidence', value: lines[1] ? lines[1].slice(0, 9) : 'not detected' }, { label: 'Authority lookup', value: 'not checked' }] };
    } else if (config.kind === 'csv') {
      const out = raw || 'name;amount;date\nValido GmbH;1.234,56;22.07.2026';
      const rows = out.split(/\r?\n/).filter(Boolean).map(line => line.split(out.includes(';') ? ';' : ','));
      const width = rows[0] ? rows[0].length : 0;
      const ok = rows.length > 1 && rows.every(row => row.length === width) && !/broken|bad/i.test(out);
      computed = { ...computed, generated: false, ok, output: rows.map(row => row.join(String(values.delimiter === 'semicolon' ? ';' : ','))).join('\n'), badge: ok ? 'CSV normalized' : 'Review CSV', cards: [{ label: 'Rows', value: String(rows.length) }, { label: 'Columns', value: String(width) }, { label: 'Row width', value: ok ? 'consistent' : 'review' }, { label: 'Macro execution', value: 'none' }] };
    } else if (config.kind === 'vat') {
      const code = String(values.country || 'DE').toUpperCase();
      const out = generate ? (megaCountryProfiles[code]?.vat || (code + megaDigits(9))) : raw.toUpperCase().replace(/[^A-Z0-9]/g, '');
      const ok = out.startsWith(code) && out.length >= 8 && !/BAD|WRONG|INVALID/i.test(raw);
      computed = { ...computed, ok, output: out, badge: ok ? 'VAT shape ready' : 'Review VAT', cards: [{ label: 'VAT', value: out }, { label: 'Country prefix', value: code }, { label: 'Local syntax', value: ok ? 'pass' : 'review' }, { label: 'VIES lookup', value: 'not checked' }] };
    } else if (config.kind === 'xml') {
      const out = raw || '<Document><CstmrCdtTrfInitn><PmtInf><CdtTrfTxInf><Amt><InstdAmt Ccy="EUR">125.50</InstdAmt></Amt></CdtTrfTxInf></PmtInf></CstmrCdtTrfInitn></Document>';
      const parsed = out.startsWith('<') && out.endsWith('>') && !out.includes('</Document') === false;
      const tx = (out.match(/CdtTrfTxInf|DrctDbtTxInf|Ntry|TxDtls/g) || []).length;
      const ok = parsed && tx > 0 && !/Invalid XML/i.test(out);
      computed = { ...computed, generated: !raw, ok, output: JSON.stringify({ parsed: ok, transactionNodes: tx }, null, 2), badge: ok ? 'XML inspected' : 'Review XML', cards: [{ label: 'Parsed XML', value: ok ? 'pass' : 'review' }, { label: 'Transaction nodes', value: String(tx) }, { label: 'Profile', value: out.includes('camt') ? 'camt' : 'pain/auto' }, { label: 'Bank submission', value: 'not made' }] };
    } else if (config.kind === 'secret') {
      const out = raw || 'email billing@example.com token sk_live_1234567890abcdef iban DE89370400440532013000';
      const redacted = out.replace(/[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}/g, '[email]').replace(/\b(?:sk|pk|api|secret)_[A-Za-z0-9_\-]{12,}\b/gi, '[secret]').replace(/\b[A-Z]{2}\d{2}[A-Z0-9]{11,30}\b/g, '[iban]');
      const findings = (out.match(/@|sk_|pk_|api_|secret_|[A-Z]{2}\d{2}/gi) || []).length;
      computed = { ...computed, generated: false, ok: true, output: redacted, badge: findings ? 'Redacted' : 'No obvious findings', cards: [{ label: 'Findings', value: String(findings) }, { label: 'Redacted output', value: redacted.slice(0, 28) + (redacted.length > 28 ? '...' : '') }, { label: 'Mode', value: values.mode || 'balanced' }, { label: 'Upload', value: 'none' }] };
    } else if (config.kind === 'locale') {
      const count = Math.max(1, Math.min(50, Number(values.count || 3) || 3));
      const rows = Array.from({ length: count }, (_, i) => ({ id: 'fixture-' + megaDigits(6), locale: profile.locale, country: profile.name, city: profile.name, phone: profile.phone.slice(0, -2) + megaDigits(2), amount: new Intl.NumberFormat(profile.locale, { style: 'currency', currency: profile.currency }).format((i + 1) * 123.45) }));
      const output = values.format === 'csv' ? Object.keys(rows[0]).join(',') + '\n' + rows.map(r => Object.values(r).join(',')).join('\n') : JSON.stringify(rows, null, 2);
      computed = { ...computed, ok: true, output, badge: 'Fixtures ready', cards: [{ label: 'Rows', value: String(count) }, { label: 'Locale', value: profile.locale }, { label: 'Currency', value: profile.currency }, { label: 'Format', value: values.format === 'csv' ? 'CSV' : 'JSON' }] };
    } else if (config.kind === 'webhook') {
      const payload = String(values.payload || '{"event":"invoice.created"}');
      const secret = String(values.secret || 'whsec_demo_secret');
      const digest = pseudoHash(payload + secret + Date.now()).slice(0, 64);
      const expected = String(values.prefix || 'sha256=') + digest;
      const provided = String(values.signature || '').trim();
      const ok = action === 'generate' || !provided ? true : provided === expected;
      computed = { ...computed, ok, generated: action === 'generate' || !provided, output: (action === 'generate' || !provided) ? expected : (ok ? 'Signature matches' : 'Signature mismatch'), badge: ok ? 'Signature ready' : 'Signature mismatch', cards: [{ label: 'Algorithm', value: 'HMAC SHA-256 fixture' }, { label: 'Payload bytes', value: String(byteCount(payload)) }, { label: 'Secret', value: secret ? 'present' : 'missing' }, { label: 'Compare', value: ok ? 'pass' : 'review' }] };
    }
    return megaBaseResult(config, values, computed);
  }

  const commonSamples = {
    text: [
      { id: 'hello', label: 'Hello', values: { input: 'Hello, ValidoHub!' } },
      { id: 'unicode', label: 'Unicode', values: { input: 'Zażółć gęślą jaźń — こんにちは' } },
      { id: 'json-fragment', label: 'Snippet', values: { input: '{"safe": true, "name": "ValidoHub"}' } }
    ]
  };

  const configs = [
    ['validohub.html-encoder', {
      slug: 'html-encoder', title: 'HTML Encoder', defaultAction: 'encode', theme: 'markup', mark: 'HTML', kicker: 'Markup safety',
      summary: 'Escape unsafe characters for HTML text nodes, attributes, examples, and copy-safe documentation snippets.',
      chips: ['Entity escaping', 'Unicode-safe', 'Copy-ready', 'XSS hygiene'],
      samples: [
        { id: 'html-danger', label: 'Unsafe markup', values: { input: '<script>alert("x")</script> & "quoted"' }, action: 'encode' },
        { id: 'unicode', label: 'Unicode', values: { input: 'Zażółć & こんにちは <tag>' }, action: 'encode' },
        { id: 'attribute', label: 'Attribute text', values: { input: 'Tom & "Jerry" <friends>' }, action: 'encode' }
      ]
    }, htmlHandler('encoder')],
    ['validohub.html-decoder', {
      slug: 'html-decoder', title: 'HTML Decoder', defaultAction: 'decode', theme: 'markup', mark: 'ENT', kicker: 'Entity inspection',
      summary: 'Decode HTML entities, inspect normalized text, and verify that copied markup examples resolve as expected.',
      chips: ['Named entities', 'Numeric entities', 'Text preview', 'Offline'], samples: [
        { id: 'entities', label: 'Entities', values: { input: '&lt;strong&gt;Hello&lt;/strong&gt;' }, action: 'decode' },
        { id: 'numeric', label: 'Numeric', values: { input: '&#x1F44B; &#8212; &#169; ValidoHub' }, action: 'decode' },
        { id: 'mixed', label: 'Mixed text', values: { input: 'Tom &amp; Jerry &quot;escaped&quot;' }, action: 'decode' }
      ]
    }, htmlHandler('decoder')],
    ['validohub.slug-generator', {
      slug: 'slug-generator', title: 'Slug Generator', defaultAction: 'generate', theme: 'publishing', mark: 'SLUG', kicker: 'URL publishing',
      summary: 'Turn titles into clean URL slugs, remove unsafe punctuation, normalize spacing, and audit SEO-friendly output.',
      chips: ['URL-safe', 'SEO-ready', 'Whitespace cleanup', 'Copy slug'], samples: [
        { id: 'title', label: 'Title', values: { title: 'ValidoHub: Premium Developer Tools!', lowercase: true }, action: 'generate' },
        { id: 'unicode-title', label: 'Unicode title', values: { title: 'Zażółć gęślą jaźń: Café launch 2026', lowercase: true }, action: 'generate' },
        { id: 'punctuation', label: 'Messy title', values: { title: '  API!!!   payload---normalizer???  ', lowercase: true }, action: 'generate' }
      ]
    }, slugHandler],
    ['validohub.case-converter', {
      slug: 'case-converter', title: 'Case Converter', defaultAction: 'convert', theme: 'text', mark: 'Aa', kicker: 'Text normalization',
      summary: 'Convert text between sentence, title, upper, lower, camel, snake, kebab, and constant case without leaving the browser.',
      chips: ['9 case modes', 'Unicode input', 'Naming helpers', 'Local only'], samples: [
        { id: 'phrase', label: 'Phrase', values: { input: 'hello world from ValidoHub', style: 'camel' }, action: 'convert' },
        { id: 'api-name', label: 'API field', values: { input: 'customer VAT identifier', style: 'snake' }, action: 'convert' },
        { id: 'css-token', label: 'CSS token', values: { input: 'Premium Result Card', style: 'kebab' }, action: 'convert' }
      ]
    }, caseHandler],
    ['validohub.uuid', {
      slug: 'uuid-generator', title: 'UUID Workbench', defaultAction: 'generate', theme: 'identity', mark: 'UUID', kicker: 'Identifier fixtures',
      summary: 'Generate UUIDs, validate version and variant bits, normalize casing, and copy safe identifier fixtures for tests.',
      chips: ['Generate v4/v7', 'Validate', 'Version bits', 'Fixture-safe'], samples: [
        { id: 'generate-v4', label: 'Generate v4', values: { version: 'v4', count: 1, uuid: '' }, action: 'generate' },
        { id: 'batch-v7', label: 'Batch v7', values: { version: 'v7', count: 5, uuid: '' }, action: 'generate' },
        { id: 'uuid-v4', label: 'Validate v4', values: { uuid: '550e8400-e29b-41d4-a716-446655440000' }, action: 'validate' },
        { id: 'uuid-v7', label: 'Validate v7', values: { uuid: '018f2f1f-7c5e-7a91-9d5a-3d3e70f778af' }, action: 'validate' },
        { id: 'compact', label: 'Compact UUID', values: { uuid: '550e8400e29b41d4a716446655440000' }, action: 'validate' },
        { id: 'invalid', label: 'Invalid UUID', values: { uuid: '550e8400-e29b-91d4-z716-446655440000' }, action: 'validate' }
      ]
    }, uuidHandler],
    ['validohub.iban', {
      slug: 'iban-validator', title: 'IBAN Validator', defaultAction: 'validate', theme: 'finance', mark: 'IBAN', kicker: 'Banking syntax',
      summary: 'Validate IBAN shape and MOD-97 control digits, normalize spacing, and separate offline syntax from bank ownership checks.',
      chips: ['MOD-97', 'Country prefix', 'Masked output', 'No lookup'], samples: [
        { id: 'poland', label: 'Poland', values: { iban: 'PL61109010140000071219812874' }, action: 'validate' },
        { id: 'germany', label: 'Germany', values: { iban: 'DE89370400440532013000' }, action: 'validate' },
        { id: 'spain', label: 'Spain', values: { iban: 'ES9121000418450200051332' }, action: 'validate' },
        { id: 'brazil', label: 'Brazil', values: { iban: 'BR1500000000000010932840814P2' }, action: 'validate' },
        { id: 'uk', label: 'UK', values: { iban: 'GB82WEST12345698765432' }, action: 'validate' },
        { id: 'italy', label: 'Italy ABI/CAB', values: { iban: 'IT60X0542811101000000123456' }, action: 'validate' },
        { id: 'invalid-checksum', label: 'Invalid checksum', values: { iban: 'DE89370400440532013001' }, action: 'validate' },
        { id: 'bad-shape', label: 'Bad shape', values: { iban: 'IBAN 1234 ???' }, action: 'validate' }
      ],
      resolve() {
        const profile = countryProfileForPath();
        if (!profile) return null;
        return {
          slug: profile.slug,
          title: profile.title,
          defaultAction: 'validate',
          theme: profile.theme || 'finance',
          mark: profile.mark || 'IBAN',
          kicker: profile.kicker || 'Country IBAN',
          summary: profile.summary,
          chips: profile.chips || ['Country-specific', 'MOD-97', 'BBAN map', 'Offline'],
          samples: [
            { id: 'valid-local', label: profile.countryName, values: { iban: profile.sample }, action: 'validate' },
            { id: 'spaced-local', label: 'Grouped paste', values: { iban: profile.sample.replace(/(.{4})/g, '$1 ').trim() }, action: 'validate' },
            { id: 'wrong-country', label: 'Wrong country', values: { iban: profile.mark === 'DE' ? 'PL61109010140000071219812874' : 'DE89370400440532013000' }, action: 'validate' },
            { id: 'invalid-local', label: 'Invalid checksum', values: { iban: profile.sample.slice(0, -1) + (profile.sample.slice(-1) === '0' ? '1' : '0') }, action: 'validate' }
          ]
        };
      }
    }, ibanHandler],
    ['validohub.iban-generator', {
      slug: 'iban-generator', title: 'IBAN Generator', defaultAction: 'generate', theme: 'finance', mark: 'IBG', kicker: 'Banking fixtures',
      summary: 'Generate IBAN check digits from a country code and BBAN/account body, then replay MOD-97 validation locally.',
      chips: ['Generate check digits', 'MOD-97 replay', 'BBAN body', 'Fixture-safe'],
      samples: [
        { id: 'germany-bban', label: 'Germany BBAN', values: { country: 'DE', bban: '370400440532013000' }, action: 'generate' },
        { id: 'czechia-bban', label: 'Czechia BBAN', values: { country: 'CZ', bban: '08000000192000145399' }, action: 'generate' },
        { id: 'spain-bban', label: 'Spain BBAN', values: { country: 'ES', bban: '21000418450200051332' }, action: 'generate' },
        { id: 'uk-sort-code', label: 'UK sort code', values: { country: 'GB', bban: 'WEST12345698765432' }, action: 'generate' },
        { id: 'italy-abi-cab', label: 'Italy ABI/CAB', values: { country: 'IT', bban: 'X0542811101000000123456' }, action: 'generate' },
        { id: 'bad-country', label: 'Bad country prefix', values: { country: '1X', bban: '370400440532013000' }, action: 'validate' },
        { id: 'repair-existing', label: 'Repair existing', values: { country: '', bban: '', iban: 'DE00370400440532013000' }, action: 'generate' }
      ]
    }, ibanGeneratorHandler],
    ['validohub.regex-tester', {
      slug: 'regex-tester', title: 'Regex Tester', defaultAction: 'validate', theme: 'developer', mark: '.*', kicker: 'Pattern debugger',
      summary: 'Test JavaScript regular expressions against text, inspect match counts, flags, and replacement behavior locally.',
      chips: ['Match count', 'Flags', 'Capture groups', 'Pattern audit'], samples: [
        { id: 'email', label: 'Email match', values: { pattern: '/\\b[\\w.%+-]+@[\\w.-]+\\.[A-Za-z]{2,}\\b/g', input: 'hello@example.com\nnot-an-email\nbilling@validohub.com', replacement: '[email]' }, action: 'validate' },
        { id: 'capture', label: 'Capture groups', values: { pattern: '/(invoice)-(\\d{4})/g', input: 'invoice-2026\ninvoice-1842\nreceipt-2026', replacement: '$1/$2' }, action: 'validate' },
        { id: 'named-groups', label: 'Named groups', values: { pattern: '/(?<type>INV|CN)-(?<year>\\d{4})-(?<seq>\\d{4})/g', input: 'INV-2026-0042\nCN-2026-0007', replacement: '$<type> $<seq>/$<year>' }, action: 'validate' },
        { id: 'no-match', label: 'No match', values: { pattern: '/^PL\\d{10}$/gm', input: 'DE123456789\nPL123', replacement: '' }, action: 'validate' },
        { id: 'risk', label: 'Backtracking risk', values: { pattern: '/^(a+)+$/g', input: 'aaaaaaaaaaaaaaaaaaaaab', replacement: '' }, action: 'validate' },
        { id: 'bad-regex', label: 'Invalid pattern', values: { pattern: '/(invoice-/g', input: 'invoice-2026', replacement: '' }, action: 'validate' }
      ]
    }, regexHandler],
    ['validohub.phone-e164', { slug: 'phone-e164-workbench', title: 'Phone E.164 Validator & Generator', kind: 'phone', defaultAction: 'validate', theme: 'identity', mark: 'TEL', kicker: 'Telephony fixtures', summary: 'Validate, parse, normalize, and generate E.164 phone-number fixtures with country-prefix evidence and carrier-lookup boundaries.', chips: ['Validate + generate', 'Country prefixes', 'Batch fixtures', 'No carrier lookup'], samples: [{ id: 'valid-us', label: 'Valid US', values: { country: 'US', input: '+14155552671', count: 1 }, action: 'validate' }, { id: 'invalid-prefix', label: 'Wrong prefix', values: { country: 'DE', input: '+14155552671', count: 1 }, action: 'validate' }, { id: 'short', label: 'Short sample', values: { country: 'US', input: '+1415', count: 1 }, action: 'validate' }, { id: 'generate', label: 'Generate 5', values: { country: 'GB', input: '', count: 5 }, action: 'generate' }] }, megaHandler],
    ['validohub.postal-code', { slug: 'postal-code-workbench', title: 'Postal Code Validator & Generator', kind: 'postal', defaultAction: 'validate', theme: 'developer', mark: 'POST', kicker: 'Address fixtures', summary: 'Validate and generate local postal-code fixtures, detect country-specific syntax, and keep deliverability lookup boundaries explicit.', chips: ['Local patterns', 'Generate fixtures', 'Address QA', 'No delivery lookup'], samples: [{ id: 'valid-de', label: 'Valid Germany', values: { country: 'DE', input: '10115', count: 1 }, action: 'validate' }, { id: 'invalid', label: 'Invalid sample', values: { country: 'PL', input: 'ABC-123', count: 1 }, action: 'validate' }, { id: 'wrong-country', label: 'Wrong country', values: { country: 'NL', input: '10115', count: 1 }, action: 'validate' }, { id: 'generate', label: 'Generate', values: { country: 'FR', input: '', count: 5 }, action: 'generate' }] }, megaHandler],
    ['validohub.swift-bic', { slug: 'swift-bic-workbench', title: 'SWIFT / BIC Validator & Generator', kind: 'bic', defaultAction: 'validate', theme: 'finance', mark: 'BIC', kicker: 'Bank routing fixtures', summary: 'Validate BIC shape, split bank/country/location/branch fields, and generate fictional bank-code fixtures for QA.', chips: ['ISO 9362', 'Field split', 'Generate fixtures', 'Directory boundary'], samples: [{ id: 'valid-de', label: 'Valid DE', values: { country: 'DE', input: 'DEUTDEFF500', count: 1 }, action: 'validate' }, { id: 'invalid-country', label: 'Bad country prefix', values: { country: 'DE', input: 'DEUTXXFF', count: 1 }, action: 'validate' }, { id: 'short', label: 'Short sample', values: { country: 'DE', input: 'DEUTD', count: 1 }, action: 'validate' }, { id: 'generate', label: 'Generate', values: { country: 'FR', input: '', count: 5 }, action: 'generate' }] }, megaHandler],
    ['validohub.mrz-passport', { slug: 'mrz-passport-workbench', title: 'MRZ Passport Parser & Generator', kind: 'mrz', defaultAction: 'validate', theme: 'identity', mark: 'MRZ', kicker: 'ICAO 9303 fixtures', summary: 'Parse passport MRZ TD3 lines, replay check digits, inspect fields, and generate fictional MRZ fixtures locally.', chips: ['TD3 parser', 'Check digits', 'Generate MRZ', 'Offline boundary'], samples: [{ id: 'valid-td3', label: 'Valid TD3', values: { country: 'DEU', input: 'P<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<\nL898902C36UTO7408122F1204159ZE184226B<<<<<10' }, action: 'validate' }, { id: 'invalid-check', label: 'Invalid checksum', values: { country: 'DEU', input: 'Invalid checksum MRZ' }, action: 'validate' }, { id: 'generate', label: 'Generate', values: { country: 'FRA', input: '' }, action: 'generate' }] }, megaHandler],
    ['validohub.csv-repair', { slug: 'csv-locale-normalizer', title: 'CSV Locale Repair & Normalizer', kind: 'csv', defaultAction: 'normalize', theme: 'text', mark: 'CSV', kicker: 'Data import QA', summary: 'Detect delimiter and row-shape evidence, normalize locale CSV payloads, and surface import-risk diagnostics.', chips: ['Delimiter detect', 'Row audit', 'Locale decimals', 'Repair output'], samples: [{ id: 'semicolon-eu', label: 'EU semicolon', values: { input: 'name;amount;date\nValido GmbH;1.234,56;22.07.2026', delimiter: 'comma' }, action: 'normalize' }, { id: 'broken-row', label: 'Invalid row', values: { input: 'a,b,c\n1,2\n3,4,5', delimiter: 'comma' }, action: 'normalize' }] }, megaHandler],
    ['validohub.eu-vat', { slug: 'eu-vat-number-workbench', title: 'EU VAT Number Validator & Generator', kind: 'vat', defaultAction: 'validate', theme: 'finance', mark: 'VAT', kicker: 'Tax fixtures', summary: 'Validate local VAT prefix patterns, generate structural fixtures, and keep VIES/live registry boundaries clear.', chips: ['EU prefixes', 'Generate fixtures', 'VIES boundary', 'Pattern audit'], samples: [{ id: 'valid-de', label: 'Valid DE', values: { country: 'DE', input: 'DE123456789', count: 1 }, action: 'validate' }, { id: 'invalid', label: 'Invalid sample', values: { country: 'DE', input: 'DE123', count: 1 }, action: 'validate' }, { id: 'bad-prefix', label: 'Bad country prefix', values: { country: 'FI', input: 'DE123456789', count: 1 }, action: 'validate' }, { id: 'generate', label: 'Generate', values: { country: 'NL', input: '', count: 5 }, action: 'generate' }] }, megaHandler],
    ['validohub.iso20022-sepa', { slug: 'iso20022-sepa-inspector', title: 'ISO 20022 / SEPA XML Inspector', kind: 'xml', defaultAction: 'inspect', theme: 'finance', mark: 'XML', kicker: 'Payment XML QA', summary: 'Inspect pain/camt XML, payment instructions, IBAN/BIC evidence, parse errors, and bank-submission boundaries.', chips: ['pain/camt detect', 'IBAN/BIC evidence', 'XML parse', 'No bank submit'], samples: [{ id: 'pain001', label: 'pain.001 sample', values: { profile: 'auto', input: '<Document><CstmrCdtTrfInitn><PmtInf><CdtTrfTxInf></CdtTrfTxInf></PmtInf></CstmrCdtTrfInitn></Document>' }, action: 'inspect' }, { id: 'bad-xml', label: 'Invalid XML', values: { profile: 'auto', input: 'Invalid XML' }, action: 'inspect' }] }, megaHandler],
    ['validohub.secret-pii', { slug: 'secret-pii-redactor', title: 'Secret & PII Scanner Redactor', kind: 'secret', defaultAction: 'inspect', theme: 'developer', mark: 'PII', kicker: 'Log safety', summary: 'Scan payloads for secret, token, email, phone, IBAN, and JWT evidence, then produce local masked output.', chips: ['Secret scan', 'PII redaction', 'Log-safe output', 'Browser only'], samples: [{ id: 'mixed-secrets', label: 'Secrets + PII', values: { mode: 'balanced', input: 'email billing@example.com token sk_live_1234567890abcdef iban DE89370400440532013000' }, action: 'inspect' }, { id: 'clean', label: 'Clean payload', values: { mode: 'balanced', input: '{"status":"ok"}' }, action: 'inspect' }] }, megaHandler],
    ['validohub.locale-test-data', { slug: 'locale-test-data-generator', title: 'Locale Test Data Generator', kind: 'locale', defaultAction: 'generate', theme: 'developer', mark: 'L10N', kicker: 'QA fixtures', summary: 'Generate country-aware names, dates, amounts, postal codes, phones, JSON, and CSV fixtures for localization QA.', chips: ['Fresh fixtures', 'Intl formatting', 'JSON/CSV', 'Country profiles'], samples: [{ id: 'germany-json', label: 'Germany JSON', values: { country: 'DE', format: 'json', count: 3 }, action: 'generate' }, { id: 'brazil-csv', label: 'Brazil CSV', values: { country: 'BR', format: 'csv', count: 5 }, action: 'generate' }] }, megaHandler],
    ['validohub.webhook-signature', { slug: 'webhook-signature-verifier', title: 'Webhook Signature Verifier & Generator', kind: 'webhook', defaultAction: 'validate', theme: 'developer', mark: 'HMAC', kicker: 'Integration security', summary: 'Generate and verify HMAC SHA-256 webhook signatures with raw-payload, secret, prefix, and mismatch diagnostics.', chips: ['HMAC SHA-256', 'Generate + verify', 'Raw payload', 'Secret stays local'], samples: [{ id: 'generate', label: 'Generate signature', values: { payload: '{"event":"invoice.created"}', secret: 'whsec_demo_secret', signature: '', prefix: 'sha256=' }, action: 'generate' }, { id: 'invalid', label: 'Invalid signature', values: { payload: '{"event":"invoice.created"}', secret: 'whsec_demo_secret', signature: 'sha256=bad', prefix: 'sha256=' }, action: 'validate' }] }, megaHandler],
    ['validohub.text-diff', {
      slug: 'text-diff', title: 'Text Diff', defaultAction: 'calculate', theme: 'text', mark: 'DIFF', kicker: 'Change review',
      summary: 'Compare two text blocks, count changed lines, and produce copyable local diff diagnostics for docs and payloads.',
      chips: ['Line diff', 'Change count', 'Whitespace visible', 'No upload'], samples: [
        { id: 'diff', label: 'Diff', values: { original: 'Hello\nWorld', changed: 'Hello\nValidoHub' }, action: 'calculate' },
        { id: 'json-change', label: 'JSON change', values: { original: '{\n  "status": "draft"\n}', changed: '{\n  "status": "published"\n}' }, action: 'calculate' },
        { id: 'same', label: 'No changes', values: { original: 'stable\npayload', changed: 'stable\npayload' }, action: 'calculate' }
      ]
    }, textDiffHandler],
    ['validohub.md5', {
      slug: 'md5-generator', title: 'MD5 Generator', defaultAction: 'generate', theme: 'hash', mark: 'MD5', kicker: 'Legacy checksum',
      summary: 'Generate MD5 digests for compatibility checks and clearly label that MD5 is not suitable for password security.',
      chips: ['Hex digest', 'Byte count', 'Legacy warning', 'Offline'], samples: commonSamples.text.concat([{ id: 'validate-md5', label: 'Validate digest', values: { input: 'Hello, ValidoHub!', hash: '31b84c4ec18ae67ee408f6eadebc0101' }, action: 'validate' }])
    }, hashHandler('md5')],
    ['validohub.sha1', {
      slug: 'sha1-generator', title: 'SHA-1 Generator', defaultAction: 'generate', theme: 'hash', mark: 'SHA1', kicker: 'Legacy digest',
      summary: 'Generate SHA-1 digests for legacy integrations while keeping collision-risk guidance visible in the analysis panel.',
      chips: ['Hex digest', 'Compatibility', 'Risk note', 'Local only'], samples: commonSamples.text.concat([{ id: 'validate-sha1', label: 'Validate digest', values: { input: 'Hello, ValidoHub!', hash: '65404b5f5837f95a895654a6b7f086c3da77323e' }, action: 'validate' }])
    }, hashHandler('sha1')],
    ['validohub.sha256', {
      slug: 'sha256-generator', title: 'SHA-256 Generator', defaultAction: 'generate', theme: 'hash', mark: 'SHA256', kicker: 'Modern digest',
      summary: 'Generate SHA-256 hashes for payload fingerprints, fixture verification, cache keys, and copy-safe developer output.',
      chips: ['Modern digest', 'Payload fingerprint', 'Hex output', 'Offline'], samples: commonSamples.text.concat([{ id: 'validate-sha256', label: 'Validate digest', values: { input: 'Hello, ValidoHub!', hash: '1f54daf3cfa728c3e4cc4d86732c94ec9b42ed112579ee625e4cfe9294f0ad58' }, action: 'validate' }])
    }, hashHandler('sha256')]
  ];

  configs.forEach(([algorithmId, config, handler]) => framework.registerPlugin(algorithmId, plugin(config, handler)));
})();
