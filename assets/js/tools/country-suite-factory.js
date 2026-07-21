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
    samplesAndRelated: 'Examples',
    relatedTools: 'Related tools',
    validate: 'Validate',
    generate: 'Generate',
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
    localStructuralSlices: 'Local structural slices.',
    presets: 'Examples',
    validSample: 'Valid sample',
    groupedValidSample: 'Grouped valid sample',
    invalidSample: 'Invalid sample',
    shortSample: 'Short sample',
    badCountrySample: 'Bad country prefix',
    recentValidations: 'Recent validations',
    noHistory: 'No recent validations yet',
    batchValidation: 'Batch validation',
    batchSummary: 'Run up to 100 local checks, one value per line.',
    runBatch: 'Run batch',
    copyBatchJson: 'Copy batch JSON',
    clearBatch: 'Clear batch',
    identifierBreakdown: 'Identifier breakdown',
    hoverBreakdown: 'Inspect each detected field group and its local meaning.',
    calculationDebugger: 'Calculation debugger',
    replayCalculation: 'Replay calculation',
    developerApiPreview: 'Developer API preview',
    repairSuggestions: 'Repair suggestions',
    rawJsonOutput: 'Raw JSON output',
    validationLog: 'Validation pipeline logs',
    regexDetails: 'Regex & structure details',
    browserBoundary: 'Browser-only boundary',
    premiumDebugLayer: 'Premium debug layer',
    toolIntelligence: '{country} tool intelligence',
    toolIntelligenceSummary: 'History, batch checks, API handoff, raw JSON, and local related workflows stay available without taking over the main workflow.',
    localBadge: '{code} local',
    browserHistory: 'Browser history',
    multiRowValidator: 'Multi-row validator',
    useCurrentInput: 'Use current input',
    batchResult: 'Batch result',
    apiPreview: 'API preview',
    rawJson: 'Raw JSON',
    relatedLocalTools: 'Related local tools',
    batchEmpty: 'Run batch to compare pass/review states without leaving this page.',
    pasteOnePerLine: 'Paste one value per line first.',
    relatedLocalFallback: 'Country-local related tools appear here after build pruning.',
    advancedTools: 'Advanced tools',
    advancedToolsSummary: 'History, batch diagnostics, API preview, raw JSON, and local related links.',
    ibanGenerator: 'IBAN generator',
    ibanGeneratorSummary: 'Generate a structurally valid IBAN from a country code and BBAN/account body.',
    generatedIban: 'Generated IBAN',
    bbanBody: 'BBAN body',
    mod97CheckDigits: 'MOD-97 check digits'
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
    const translatedSamples = Array.isArray(toolStrings.samples)
      ? tool.samples.map((sample, index) => Object.assign({}, sample, { label: toolStrings.samples[index] || sample.label }))
      : tool.samples;
    const localized = Object.assign({}, tool, toolStrings, { samples: translatedSamples });
    return Object.assign({}, localized, { samples: normalizeSamples(suite, localized) });
  }

  function storageKey(suite, tool) {
    return `validohub.countrySuite.${suite.suiteId}.${tool.id}.history.v1`;
  }

  function readHistory(suite, tool) {
    if (typeof localStorage === 'undefined') return [];
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey(suite, tool)) || '[]');
      return Array.isArray(parsed) ? parsed.slice(0, 10).filter(Boolean) : [];
    } catch (error) {
      return [];
    }
  }

  function writeHistory(suite, tool, value) {
    if (typeof localStorage === 'undefined') return;
    const nextValue = text(value).trim();
    if (!nextValue) return;
    const next = [nextValue, ...readHistory(suite, tool).filter((item) => item !== nextValue)].slice(0, 10);
    localStorage.setItem(storageKey(suite, tool), JSON.stringify(next));
  }

  function shortValue(value, limit) {
    const raw = text(value).replace(/\s+/g, ' ').trim();
    if (raw.length <= limit) return raw;
    return `${raw.slice(0, Math.max(0, limit - 1))}…`;
  }

  function incrementLastDigit(value) {
    const raw = text(value);
    const chars = raw.split('');
    for (let index = chars.length - 1; index >= 0; index -= 1) {
      if (/\d/.test(chars[index])) {
        chars[index] = String((Number(chars[index]) + 1) % 10);
        return chars.join('');
      }
    }
    return raw ? `${raw}0` : '0';
  }

  function makeShortSample(value) {
    const raw = text(value).trim();
    if (!raw) return '123';
    return raw.slice(0, Math.max(3, Math.ceil(raw.length * 0.55)));
  }

  function makeBadCountrySample(suite, value) {
    const raw = text(value).trim();
    const iso = text(suite.country && suite.country.iso2 || suite.country && suite.country.slug || '').slice(0, 2).toUpperCase();
    if (iso && raw.toUpperCase().startsWith(iso)) return `ZZ${raw.slice(2)}`;
    return incrementLastDigit(raw);
  }

  function labelLooksRaw(label, value) {
    const rawLabel = text(label).trim();
    const rawValue = text(value).trim();
    return !rawLabel || rawLabel === rawValue || rawLabel.length > 34 || /[\n{}[\];=]/.test(rawLabel);
  }

  function normalizeSamples(suite, tool) {
    const labels = labelsFor(suite);
    const source = asArray(tool.samples).filter((sample) => text(sample && sample.value).trim());
    const firstValue = text(source[0] && source[0].value).trim();
    const firstCompact = alnumOnly(firstValue);
    const normalized = source.map((sample, index) => {
      const placeholderReview = /^review\s+/i.test(text(sample.label)) || /^review\s+/i.test(text(sample.value));
      const value = placeholderReview ? incrementLastDigit(firstValue || sample.value) : sample.value;
      let label = sample.label;
      if (index === 0 || /valid/i.test(text(label))) label = labels.validSample;
      if (placeholderReview || /review|invalid|bad|missing|short/i.test(text(label))) label = labels.invalidSample;
      if (labelLooksRaw(label, value)) label = index === 0 ? labels.validSample : labels.invalidSample;
      return Object.assign({}, sample, { label, value, tone: index === 0 ? 'success' : 'review' });
    });
    if (firstCompact && /iban/i.test(`${tool.id} ${tool.name} ${tool.kind}`) && normalized.length < 4) {
      normalized.push({ label: labels.groupedValidSample, value: firstCompact.replace(/(.{4})/g, '$1 ').trim(), tone: 'success' });
    }
    if (firstValue && normalized.length < 3) {
      normalized.push({ label: labels.invalidSample, value: incrementLastDigit(firstValue), tone: 'review' });
      normalized.push({ label: labels.shortSample, value: makeShortSample(firstValue), tone: 'review' });
    }
    if (firstValue && /iban/i.test(`${tool.id} ${tool.name} ${tool.kind}`) && normalized.length < 4) {
      normalized.push({ label: labels.badCountrySample, value: makeBadCountrySample(suite, firstValue), tone: 'review' });
    }
    const seen = new Set();
    return normalized.filter((sample) => {
      const key = `${sample.label}::${sample.value}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 4);
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

  function digitsOnly(value) {
    return text(value).replace(/\D/g, '');
  }

  function alnumOnly(value) {
    return text(value).toUpperCase().replace(/[^A-Z0-9]/g, '');
  }

  function isValidDateParts(year, month, day) {
    if (!year || !month || !day) return false;
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
  }

  function inferYear(twoDigitYear) {
    const yy = Number(twoDigitYear);
    return yy >= 40 ? 1900 + yy : 2000 + yy;
  }

  function luhnCheckDigit(body) {
    const digits = digitsOnly(body).split('').map(Number);
    const sum = digits.reduce((total, digit, index) => {
      let value = digit;
      if (index % 2 === 0) value *= 2;
      return total + Math.floor(value / 10) + (value % 10);
    }, 0);
    return (10 - (sum % 10)) % 10;
  }

  function weightedMod11Check(body, weights) {
    const ds = digitsOnly(body).split('').map(Number);
    const sum = weights.reduce((total, weight, index) => total + (ds[index] || 0) * weight, 0);
    const value = 11 - (sum % 11);
    return value === 11 ? 0 : value;
  }

  function weightedMod10Check(body, weights) {
    const ds = digitsOnly(body).split('').map(Number);
    const sum = weights.reduce((total, weight, index) => total + (ds[index] || 0) * weight, 0);
    return (11 - (sum % 11)) % 10;
  }

  function ibanToNumeric(value) {
    return alnumOnly(value).split('').map((char) => /[A-Z]/.test(char) ? String(char.charCodeAt(0) - 55) : char).join('');
  }

  function mod97NumberString(value) {
    let remainder = 0;
    for (const digit of text(value)) {
      if (!/\d/.test(digit)) continue;
      remainder = (remainder * 10 + Number(digit)) % 97;
    }
    return remainder;
  }

  function ibanRemainder(iban) {
    const normalized = alnumOnly(iban);
    return mod97NumberString(ibanToNumeric(normalized.slice(4) + normalized.slice(0, 4)));
  }

  function generateIban(countryCode, bbanBody) {
    const country = alnumOnly(countryCode).slice(0, 2);
    const bban = alnumOnly(bbanBody);
    const probe = `${bban}${country}00`;
    const checkDigits = String(98 - mod97NumberString(ibanToNumeric(probe))).padStart(2, '0');
    const iban = `${country}${checkDigits}${bban}`;
    return { country, bban, checkDigits, iban, remainder: ibanRemainder(iban) };
  }

  const FACTORY_IBAN_COUNTRIES = {
    austria: 'AT',
    belgium: 'BE',
    czechia: 'CZ',
    denmark: 'DK',
    finland: 'FI',
    france: 'FR',
    germany: 'DE',
    ireland: 'IE',
    italy: 'IT',
    netherlands: 'NL',
    norway: 'NO',
    poland: 'PL',
    portugal: 'PT',
    romania: 'RO',
    spain: 'ES',
    sweden: 'SE',
    switzerland: 'CH'
  };

  function countryCodeForSuite(suite, tool, input) {
    const explicit = alnumOnly(tool.countryCode || '');
    if (explicit.length === 2) return explicit;
    const fromInput = alnumOnly(input).match(/^[A-Z]{2}/);
    if (fromInput) return fromInput[0];
    return FACTORY_IBAN_COUNTRIES[suite.country.slug] || alnumOnly(suite.country.name).slice(0, 2);
  }

  function spanishIdLetter(number) {
    return 'TRWAGMYFPDXBNJZSQVHLCKE'[Number(number) % 23] || '';
  }

  function germanIso7064Mod11_10(body) {
    let product = 10;
    for (const digit of digitsOnly(body).slice(0, 10)) {
      let sum = (Number(digit) + product) % 10;
      if (sum === 0) sum = 10;
      product = (sum * 2) % 11;
    }
    return (11 - product) % 10;
  }

  function italianVatCheck(body) {
    const ds = digitsOnly(body);
    let sum = 0;
    for (let index = 0; index < 10; index += 1) {
      let value = Number(ds[index] || 0);
      if (index % 2 === 1) {
        value *= 2;
        value = Math.floor(value / 10) + (value % 10);
      }
      sum += value;
    }
    return (10 - (sum % 10)) % 10;
  }

  function italianCodiceFiscaleCheck(value) {
    const normalized = alnumOnly(value);
    const odd = {
      0: 1, 1: 0, 2: 5, 3: 7, 4: 9, 5: 13, 6: 15, 7: 17, 8: 19, 9: 21,
      A: 1, B: 0, C: 5, D: 7, E: 9, F: 13, G: 15, H: 17, I: 19, J: 21,
      K: 2, L: 4, M: 18, N: 20, O: 11, P: 3, Q: 6, R: 8, S: 12, T: 14,
      U: 16, V: 10, W: 22, X: 25, Y: 24, Z: 23
    };
    const even = {
      0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9,
      A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J: 9,
      K: 10, L: 11, M: 12, N: 13, O: 14, P: 15, Q: 16, R: 17, S: 18, T: 19,
      U: 20, V: 21, W: 22, X: 23, Y: 24, Z: 25
    };
    const sum = normalized.slice(0, 15).split('').reduce((total, char, index) => {
      return total + (index % 2 === 0 ? odd[char] : even[char]);
    }, 0);
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[sum % 26] || '';
  }

  function ean13CheckDigit(body) {
    const ds = digitsOnly(body).slice(0, 12);
    const sum = ds.split('').reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 1 : 3), 0);
    return (10 - (sum % 10)) % 10;
  }

  function fieldSlice(label, value, note, tone) {
    const detail = note || '';
    return { label, value: value == null || value === '' ? 'not detected' : String(value), note: detail, detail, tone: tone || 'blue' };
  }

  function statusCheck(label, ok, passText, reviewText) {
    return { label, pass: !!ok, text: ok ? passText : reviewText };
  }

  const COUNTRY_INTELLIGENCE_PROFILES = {
    switzerland: {
      personalLabel: 'AHV / AVS',
      companyLabel: 'UID',
      taxLabel: 'MWST / TVA / IVA',
      kindLabels: { ahv: 'AHV / AVS', uid: 'UID' },
      parsers: {
        ahv(raw) {
          const ds = digitsOnly(raw);
          const expected = ean13CheckDigit(ds.slice(0, 12));
          const checksumOk = ds.length === 13 && Number(ds[12]) === expected;
          const prefixOk = ds.startsWith('756');
          return { normalized: ds.length === 13 ? `${ds.slice(0, 3)}.${ds.slice(3, 7)}.${ds.slice(7, 11)}.${ds.slice(11)}` : ds, ok: prefixOk && checksumOk, slices: [
            fieldSlice('country prefix', ds.slice(0, 3), 'Swiss AHV/AVS values use the 756 GS1 country prefix.', prefixOk ? 'green' : 'red'),
            fieldSlice('personal body', ds.slice(3, 12), 'Nine-digit personal body used before the EAN-style control digit.'),
            fieldSlice('check digit', `${ds.slice(12)} / expected ${expected}`, 'EAN-13 style AHV/AVS control digit.', checksumOk ? 'green' : 'red'),
            fieldSlice('official boundary', 'offline only', 'AHV identity/status requires official Swiss systems.', 'red')
          ], checks: [
            statusCheck('Thirteen digits', ds.length === 13, 'AHV/AVS has thirteen digits.', 'Expected thirteen digits.'),
            statusCheck('756 prefix', prefixOk, 'Swiss 756 prefix detected.', 'Expected 756 prefix.'),
            statusCheck('EAN control digit', checksumOk, 'Control digit matches.', 'Control digit needs review.')
          ] };
        },
        uid(raw) {
          const value = alnumOnly(raw);
          const ds = digitsOnly(value);
          const prefixOk = value.startsWith('CHE');
          const ok = prefixOk && ds.length === 9;
          return { normalized: ds.length === 9 ? `CHE-${ds.slice(0, 3)}.${ds.slice(3, 6)}.${ds.slice(6)}` : value, ok, slices: [
            fieldSlice('CHE prefix', prefixOk ? 'CHE' : 'not detected', 'Swiss UID display prefix.', prefixOk ? 'green' : 'red'),
            fieldSlice('block 1', ds.slice(0, 3), 'First UID numeric block.'),
            fieldSlice('block 2', ds.slice(3, 6), 'Second UID numeric block.'),
            fieldSlice('block 3', ds.slice(6, 9), 'Third UID numeric block; official status remains a registry concern.')
          ], checks: [
            statusCheck('CHE prefix', prefixOk, 'CHE prefix detected.', 'Expected CHE prefix.'),
            statusCheck('Nine UID digits', ds.length === 9, 'UID has nine digits.', 'Expected nine UID digits.')
          ] };
        }
      },
      parsePersonal(raw) { return this.parsers.ahv(raw); },
      parseCompany(raw) { return this.parsers.uid(raw); }
    },
    spain: {
      personalLabel: 'DNI / NIE / NIF',
      companyLabel: 'CIF / legal NIF',
      taxLabel: 'NIF-IVA',
      kindLabels: { id: 'Spanish ID', dni: 'DNI', nie: 'NIE', nif: 'NIF', cif: 'CIF' },
      parsers: {
        id(raw) {
          const value = alnumOnly(raw);
          if (/^[XYZ]\d{7}[A-Z]$/.test(value)) return this.nie(raw);
          if (/^\d{8}[A-Z]$/.test(value)) return this.dni(raw);
          return this.cif(raw);
        },
        nif(raw) { return this.id(raw); },
        dni(raw) {
          const value = alnumOnly(raw);
          const match = value.match(/^(\d{8})([A-Z])$/);
          const expected = match ? spanishIdLetter(match[1]) : '';
          const ok = !!match && match[2] === expected;
          return { normalized: value, ok, slices: [
            fieldSlice('DNI body', match && match[1], 'Eight-digit DNI body.'),
            fieldSlice('control letter', match ? `${match[2]} / expected ${expected}` : 'not detected', 'Modulo-23 DNI control letter.', ok ? 'green' : 'red')
          ], checks: [
            statusCheck('DNI shape', !!match, 'DNI shape detected.', 'Expected eight digits plus letter.'),
            statusCheck('Modulo-23', ok, 'Control letter matches.', 'Control letter needs review.')
          ] };
        },
        nie(raw) {
          const value = alnumOnly(raw);
          const match = value.match(/^([XYZ])(\d{7})([A-Z])$/);
          const mapped = match ? ({ X: '0', Y: '1', Z: '2' }[match[1]] + match[2]) : '';
          const expected = match ? spanishIdLetter(mapped) : '';
          const ok = !!match && match[3] === expected;
          return { normalized: value, ok, slices: [
            fieldSlice('NIE prefix', match && match[1], 'X/Y/Z foreigner prefix mapped to 0/1/2.'),
            fieldSlice('numeric body', mapped, 'Mapped body used for modulo-23.'),
            fieldSlice('control letter', match ? `${match[3]} / expected ${expected}` : 'not detected', 'Modulo-23 NIE control letter.', ok ? 'green' : 'red')
          ], checks: [
            statusCheck('NIE shape', !!match, 'NIE shape detected.', 'Expected X/Y/Z plus seven digits and letter.'),
            statusCheck('Modulo-23', ok, 'Control letter matches.', 'Control letter needs review.')
          ] };
        },
        cif(raw) {
          const value = alnumOnly(raw);
          const match = value.match(/^([ABCDEFGHJNPQRSUVW])(\d{7})([0-9A-J])$/);
          let control = '';
          if (match) {
            const digits = match[2].split('').map(Number);
            const sum = digits.reduce((total, digit, index) => {
              if (index % 2 === 0) {
                const doubled = digit * 2;
                return total + Math.floor(doubled / 10) + (doubled % 10);
              }
              return total + digit;
            }, 0);
            control = String((10 - (sum % 10)) % 10);
          }
          const ok = !!match && (match[3] === control || match[3] === 'JABCDEFGHI'[Number(control)]);
          return { normalized: value, ok, slices: [
            fieldSlice('entity prefix', match && match[1], 'Legal entity type prefix.'),
            fieldSlice('company body', match && match[2], 'Seven-digit CIF body.'),
            fieldSlice('control', match ? `${match[3]} / expected ${control}` : 'not detected', 'Spanish legal-entity checksum.', ok ? 'green' : 'red')
          ], checks: [
            statusCheck('CIF shape', !!match, 'CIF shape detected.', 'Expected entity prefix, seven digits, control.'),
            statusCheck('Weighted control', ok, 'Control value matches.', 'Control value needs review.')
          ] };
        }
      },
      parsePersonal(raw) { return this.parsers.id.call(this.parsers, raw); },
      parseCompany(raw) { return this.parsers.cif(raw); }
    },
    germany: {
      personalLabel: 'IdNr',
      companyLabel: 'Handelsregister',
      taxLabel: 'USt-IdNr',
      kindLabels: { taxid: 'German IdNr', steuernummer: 'Steuernummer', register: 'Handelsregister' },
      parsers: {
        taxid(raw) {
          const ds = digitsOnly(raw);
          const expected = germanIso7064Mod11_10(ds.slice(0, 10));
          const ok = ds.length === 11 && Number(ds[10]) === expected;
          return { normalized: ds, ok, slices: [
            fieldSlice('IdNr body', ds.slice(0, 10), 'First ten Steueridentifikationsnummer digits.'),
            fieldSlice('check digit', `${ds.slice(10)} / expected ${expected}`, 'ISO 7064 MOD 11,10 control digit.', ok ? 'green' : 'red'),
            fieldSlice('identity boundary', 'offline only', 'BZSt identity/status requires official systems.', 'red')
          ], checks: [
            statusCheck('Eleven digits', ds.length === 11, 'IdNr has eleven digits.', 'Expected eleven digits.'),
            statusCheck('ISO 7064', ok, 'Control digit matches.', 'Control digit needs review.')
          ] };
        },
        steuernummer(raw) {
          const value = text(raw).trim();
          const segments = value.split(/[\/\s-]+/).filter(Boolean);
          const ds = digitsOnly(value);
          const ok = ds.length >= 10 && ds.length <= 13;
          return { normalized: value, ok, slices: [
            fieldSlice('regional segments', segments.join(' / '), 'Bundesland/Finanzamt-style separated parts.'),
            fieldSlice('digits', ds, 'Digits available for ELSTER/tax-form normalization.'),
            fieldSlice('official boundary', 'offline only', 'Tax-office assignment and status require official systems.', 'red')
          ], checks: [
            statusCheck('Digit envelope', ok, 'Steuernummer digit count is plausible.', 'Steuernummer digit count needs review.')
          ] };
        },
        register(raw) {
          const value = text(raw).toUpperCase();
          const match = value.match(/\b(HRB|HRA)\s*([0-9]{1,8})\b/);
          return { normalized: match ? `${match[1]} ${match[2]}` : value.trim(), ok: !!match, slices: [
            fieldSlice('register type', match && match[1], 'HRB/HRA commercial-register type.'),
            fieldSlice('register number', match && match[2], 'Local court register number.'),
            fieldSlice('court handoff', /AMTSGERICHT|AG\b/.test(value) ? 'court evidence detected' : 'court not detected', 'Commercial-register status requires official lookup.')
          ], checks: [
            statusCheck('HR shape', !!match, 'Handelsregister reference detected.', 'Expected HRB/HRA reference.')
          ] };
        }
      },
      parsePersonal(raw) { return this.parsers.taxid(raw); },
      parseCompany(raw) { return this.parsers.register(raw); }
    },
    italy: {
      personalLabel: 'Codice fiscale',
      companyLabel: 'Partita IVA',
      taxLabel: 'IVA',
      kindLabels: { codicefiscale: 'Codice fiscale', piva: 'Partita IVA' },
      parsers: {
        codicefiscale(raw) {
          const value = alnumOnly(raw);
          const match = value.match(/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/);
          const expected = match ? italianCodiceFiscaleCheck(value) : '';
          const ok = !!match && value[15] === expected;
          return { normalized: value, ok, slices: [
            fieldSlice('surname/name code', value.slice(0, 6), 'First six letters encode surname/name consonant blocks.'),
            fieldSlice('date/gender code', value.slice(6, 11), 'YY month-letter day(+40 for female) block.'),
            fieldSlice('place code', value.slice(11, 15), 'Comune/foreign place Belfiore code.'),
            fieldSlice('control character', `${value.slice(15)} / expected ${expected}`, 'Italian codice fiscale checksum character.', ok ? 'green' : 'red')
          ], checks: [
            statusCheck('CF shape', !!match, 'Codice fiscale shape detected.', 'Expected 16-character CF shape.'),
            statusCheck('Control character', ok, 'Control character matches.', 'Control character needs review.')
          ] };
        },
        piva(raw) {
          const ds = digitsOnly(raw);
          const expected = italianVatCheck(ds.slice(0, 10));
          const ok = ds.length === 11 && Number(ds[10]) === expected;
          return { normalized: ds, ok, slices: [
            fieldSlice('VAT body', ds.slice(0, 10), 'First ten Partita IVA digits.'),
            fieldSlice('control digit', `${ds.slice(10)} / expected ${expected}`, 'Italian VAT control digit.', ok ? 'green' : 'red'),
            fieldSlice('Agenzia boundary', 'offline only', 'VAT existence/status requires official systems.', 'red')
          ], checks: [
            statusCheck('Eleven digits', ds.length === 11, 'Partita IVA has eleven digits.', 'Expected eleven digits.'),
            statusCheck('Checksum', ok, 'Control digit matches.', 'Control digit needs review.')
          ] };
        }
      },
      parsePersonal(raw) { return this.parsers.codicefiscale(raw); },
      parseCompany(raw) { return this.parsers.piva(raw); }
    },
    austria: {
      personalLabel: 'SVNR',
      companyLabel: 'Firmenbuchnummer',
      taxLabel: 'UID / USt',
      parsePersonal(raw) {
        const ds = digitsOnly(raw);
        const serial = ds.slice(0, 3);
        const checkDigit = ds.slice(3, 4);
        const datePart = ds.slice(4, 10);
        const day = Number(datePart.slice(0, 2));
        const month = Number(datePart.slice(2, 4));
        const year = inferYear(datePart.slice(4, 6));
        const weights = [3, 7, 9, 5, 8, 4, 2, 1, 6];
        const body = ds.slice(0, 3) + ds.slice(4, 10);
        const expected = weightedMod11Check(body, weights);
        const checksumOk = expected < 10 && Number(checkDigit) === expected;
        const dateOk = isValidDateParts(year, month, day);
        return { normalized: ds, ok: ds.length === 10 && dateOk && checksumOk, slices: [
          fieldSlice('serial block', serial, 'First three digits identify the local SVNR serial block.', 'blue'),
          fieldSlice('check digit', `${checkDigit} / expected ${expected}`, 'Weighted Austrian SVNR control digit.', checksumOk ? 'green' : 'red'),
          fieldSlice('birth date', dateOk ? `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}` : datePart, 'Encoded DDMMYY date section.', dateOk ? 'green' : 'red'),
          fieldSlice('official boundary', 'offline only', 'Insurance/person status requires the official Austrian system.', 'red')
        ], checks: [
          statusCheck('Ten digits', ds.length === 10, 'SVNR has ten digits.', 'Expected ten SVNR digits.'),
          statusCheck('Date section', dateOk, 'Encoded date is calendar-valid.', 'Encoded date needs review.'),
          statusCheck('Weighted check digit', checksumOk, 'SVNR check digit matches local formula.', 'SVNR check digit does not match.')
        ] };
      },
      parseCompany(raw) {
        const match = text(raw).toUpperCase().match(/\bFN\s*([0-9]{1,7})\s*([A-Z])\b/);
        return { normalized: match ? `FN ${match[1]}${match[2].toLowerCase()}` : text(raw).trim(), ok: !!match, slices: [
          fieldSlice('registry prefix', match ? 'FN' : 'not detected', 'Firmenbuch number prefix.', match ? 'green' : 'red'),
          fieldSlice('number body', match && match[1], 'Company registry numeric body.'),
          fieldSlice('suffix letter', match && match[2], 'Registry suffix letter.')
        ] };
      }
    },
    belgium: {
      personalLabel: 'RRN / NISS',
      companyLabel: 'KBO / BCE',
      taxLabel: 'BTW / TVA',
      parsePersonal(raw) {
        const ds = digitsOnly(raw);
        const base = ds.slice(0, 9);
        const provided = Number(ds.slice(9, 11));
        const check1900 = 97 - (Number(base) % 97);
        const check2000 = 97 - (Number(`2${base}`) % 97);
        const checksumOk = provided === check1900 || provided === check2000;
        const year = provided === check2000 ? 2000 + Number(ds.slice(0, 2)) : inferYear(ds.slice(0, 2));
        const month = Number(ds.slice(2, 4));
        const day = Number(ds.slice(4, 6));
        const dateOk = isValidDateParts(year, month, day);
        return { normalized: ds, ok: ds.length === 11 && dateOk && checksumOk, slices: [
          fieldSlice('birth date', dateOk ? `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}` : ds.slice(0, 6), 'YYMMDD date section.'),
          fieldSlice('sequence', ds.slice(6, 9), 'Birth-day sequence block.'),
          fieldSlice('check digits', `${ds.slice(9, 11)} / expected ${check1900} or ${check2000}`, 'Belgian modulo-97 control digits.', checksumOk ? 'green' : 'red'),
          fieldSlice('official boundary', 'offline only', 'National Register/BIS status requires official systems.', 'red')
        ], checks: [
          statusCheck('Eleven digits', ds.length === 11, 'RRN/NISS has eleven digits.', 'Expected eleven digits.'),
          statusCheck('Calendar date', dateOk, 'Date section is valid.', 'Date section needs review.'),
          statusCheck('Modulo-97', checksumOk, 'Control digits match.', 'Control digits do not match.')
        ] };
      },
      parseCompany(raw) {
        const ds = digitsOnly(raw);
        const body = ds.slice(0, 8);
        const provided = Number(ds.slice(8, 10));
        const expected = 97 - (Number(body) % 97);
        const ok = ds.length === 10 && provided === expected;
        return { normalized: ds ? `BE${ds}` : text(raw).trim(), ok, slices: [
          fieldSlice('country prefix', /^BE/i.test(text(raw)) ? 'BE' : 'implicit BE', 'Belgian VAT/KBO display prefix.'),
          fieldSlice('enterprise body', body, 'KBO/BCE enterprise body.'),
          fieldSlice('check digits', `${ds.slice(8, 10)} / expected ${expected}`, 'Modulo-97 company control digits.', ok ? 'green' : 'red')
        ] };
      }
    },
    czechia: {
      personalLabel: 'Rodne cislo',
      companyLabel: 'ICO',
      taxLabel: 'DIC / DPH',
      parsePersonal(raw) {
        const ds = digitsOnly(raw);
        const yy = ds.slice(0, 2);
        const encodedMonth = Number(ds.slice(2, 4));
        const day = Number(ds.slice(4, 6));
        const gender = encodedMonth > 50 ? 'female month offset' : 'male/no month offset';
        const month = encodedMonth > 50 ? encodedMonth - 50 : encodedMonth;
        const year = inferYear(yy);
        const dateOk = isValidDateParts(year, month, day);
        const checksumOk = ds.length === 10 ? Number(ds) % 11 === 0 : ds.length === 9;
        return { normalized: ds.length > 6 ? `${ds.slice(0, 6)}/${ds.slice(6)}` : ds, ok: (ds.length === 9 || ds.length === 10) && dateOk && checksumOk, slices: [
          fieldSlice('date block', ds.slice(0, 6), 'YYMMDD with +50 month offset for female numbers.', dateOk ? 'green' : 'red'),
          fieldSlice('decoded birth date', dateOk ? `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}` : 'not detected', 'Calendar interpretation of the first six digits.'),
          fieldSlice('gender/month evidence', gender, `Encoded month ${String(encodedMonth).padStart(2, '0')}.`),
          fieldSlice('serial/control block', ds.slice(6), ds.length === 10 ? 'Post-1954 body; whole number must be divisible by 11.' : 'Legacy nine-digit shape.', checksumOk ? 'green' : 'red')
        ], checks: [
          statusCheck('Length', ds.length === 9 || ds.length === 10, 'Rodne cislo has legacy or modern length.', 'Expected 9 or 10 digits.'),
          statusCheck('Calendar date', dateOk, 'Birth-date section is valid.', 'Birth-date section needs review.'),
          statusCheck('Modulo-11 rule', checksumOk, 'Modern checksum/legacy rule passes.', 'Modulo-11 rule does not pass.')
        ] };
      },
      parseCompany(raw) {
        const ds = digitsOnly(raw);
        const expected = weightedMod10Check(ds.slice(0, 7), [8, 7, 6, 5, 4, 3, 2]);
        const ok = ds.length === 8 && Number(ds[7]) === expected;
        return { normalized: ds, ok, slices: [
          fieldSlice('ICO body', ds.slice(0, 7), 'First seven registration digits.'),
          fieldSlice('control digit', `${ds.slice(7)} / expected ${expected}`, 'Czech ICO weighted checksum.', ok ? 'green' : 'red'),
          fieldSlice('registry boundary', 'offline only', 'ARES/company existence is outside browser-only checks.', 'red')
        ] };
      }
    },
    denmark: {
      personalLabel: 'CPR',
      companyLabel: 'CVR',
      taxLabel: 'Moms / VAT',
      parsePersonal(raw) {
        const ds = digitsOnly(raw);
        const day = Number(ds.slice(0, 2));
        const month = Number(ds.slice(2, 4));
        const year = inferYear(ds.slice(4, 6));
        const dateOk = isValidDateParts(year, month, day);
        const gender = Number(ds.slice(-1)) % 2 ? 'male odd serial' : 'female even serial';
        return { normalized: ds.length > 6 ? `${ds.slice(0, 6)}-${ds.slice(6)}` : ds, ok: ds.length === 10 && dateOk, slices: [
          fieldSlice('birth date', dateOk ? `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}` : ds.slice(0, 6), 'DDMMYY date block.', dateOk ? 'green' : 'red'),
          fieldSlice('serial block', ds.slice(6), 'Individual serial block.'),
          fieldSlice('gender evidence', gender, 'Final digit parity convention.'),
          fieldSlice('checksum note', 'not universal', 'Modern CPR values are not reliably checksum-constrained offline.')
        ], checks: [
          statusCheck('Ten digits', ds.length === 10, 'CPR has ten digits.', 'Expected ten digits.'),
          statusCheck('Calendar date', dateOk, 'Date section is valid.', 'Date section needs review.'),
          statusCheck('No network', true, 'No CPR registry lookup is made.', 'No browser lookup allowed.')
        ] };
      },
      parseCompany(raw) {
        const ds = digitsOnly(raw);
        const sum = ds.slice(0, 8).split('').reduce((total, digit, index) => total + Number(digit) * [2, 7, 6, 5, 4, 3, 2, 1][index], 0);
        const ok = ds.length === 8 && sum % 11 === 0;
        return { normalized: ds, ok, slices: [
          fieldSlice('CVR body', ds, 'Eight-digit Danish company number.'),
          fieldSlice('weighted sum', String(sum), 'Weights 2,7,6,5,4,3,2,1.'),
          fieldSlice('modulo-11 status', ok ? 'passes' : 'review', 'Valid CVR values have sum divisible by 11.', ok ? 'green' : 'red')
        ] };
      }
    },
    finland: {
      personalLabel: 'HETU',
      companyLabel: 'Y-tunnus',
      taxLabel: 'ALV / VAT',
      parsePersonal(raw) {
        const normalized = text(raw).toUpperCase().replace(/\s+/g, '');
        const match = normalized.match(/^(\d{2})(\d{2})(\d{2})([+\-A])(\d{3})([0-9A-Z])$/);
        const checksumChars = '0123456789ABCDEFHJKLMNPRSTUVWXY';
        const yearBase = match && match[4] === '+' ? 1800 : match && match[4] === '-' ? 1900 : 2000;
        const day = match ? Number(match[1]) : 0;
        const month = match ? Number(match[2]) : 0;
        const year = match ? yearBase + Number(match[3]) : 0;
        const dateOk = !!match && isValidDateParts(year, month, day);
        const expected = match ? checksumChars[Number(match[1] + match[2] + match[3] + match[5]) % 31] : '';
        const checksumOk = !!match && match[6] === expected;
        return { normalized, ok: !!match && dateOk && checksumOk, slices: [
          fieldSlice('birth date', dateOk ? `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}` : 'not detected', 'DDMMYY plus century sign.'),
          fieldSlice('century sign', match && match[4], '+ 1800s, - 1900s, A 2000s.'),
          fieldSlice('individual number', match && match[5], 'Three-digit individual block.'),
          fieldSlice('checksum', match ? `${match[6]} / expected ${expected}` : 'not detected', 'Modulo-31 HETU checksum.', checksumOk ? 'green' : 'red')
        ], checks: [
          statusCheck('HETU shape', !!match, 'HETU shape detected.', 'Expected DDMMYYCZZZQ shape.'),
          statusCheck('Calendar date', dateOk, 'Date section is valid.', 'Date section needs review.'),
          statusCheck('Modulo-31', checksumOk, 'Checksum character matches.', 'Checksum character does not match.')
        ] };
      },
      parseCompany(raw) {
        const ds = digitsOnly(raw);
        const expected = weightedMod11Check(ds.slice(0, 7), [7, 9, 10, 5, 8, 4, 2]);
        const ok = ds.length === 8 && expected < 10 && Number(ds[7]) === expected;
        return { normalized: ds.length >= 8 ? `${ds.slice(0, 7)}-${ds.slice(7, 8)}` : ds, ok, slices: [
          fieldSlice('business body', ds.slice(0, 7), 'Y-tunnus body.'),
          fieldSlice('check digit', `${ds.slice(7, 8)} / expected ${expected}`, 'Weighted modulo-11 control digit.', ok ? 'green' : 'red')
        ] };
      }
    },
    ireland: {
      personalLabel: 'PPSN',
      companyLabel: 'CRO number',
      taxLabel: 'VAT / Revenue',
      parsePersonal(raw) {
        const value = alnumOnly(raw);
        const match = value.match(/^(\d{7})([A-W])([A-Z])?$/);
        const letters = 'WABCDEFGHIJKLMNOPQRSTUV';
        const bodySum = match ? match[1].split('').reduce((total, digit, index) => total + Number(digit) * (8 - index), 0) : 0;
        const expected = match ? letters[bodySum % 23] : '';
        const checksumOk = !!match && match[2] === expected;
        return { normalized: value, ok: !!match && checksumOk, slices: [
          fieldSlice('numeric body', match && match[1], 'Seven-digit PPSN body.'),
          fieldSlice('check letter', match ? `${match[2]} / expected ${expected}` : 'not detected', 'PPSN weighted check letter.', checksumOk ? 'green' : 'red'),
          fieldSlice('suffix', match && (match[3] || 'none'), 'Optional second letter for older/extended cases.')
        ], checks: [
          statusCheck('PPSN shape', !!match, 'PPSN shape detected.', 'Expected seven digits plus check letter.'),
          statusCheck('Check letter', checksumOk, 'Check letter matches.', 'Check letter needs review.')
        ] };
      },
      parseCompany(raw) {
        const value = alnumOnly(raw);
        const ok = /^\d{5,7}[A-Z]?$/.test(value);
        return { normalized: value, ok, slices: [
          fieldSlice('CRO body', value.replace(/[A-Z]$/, ''), 'Irish company registration number body.'),
          fieldSlice('suffix', (value.match(/[A-Z]$/) || [])[0] || 'none', 'Optional company suffix.'),
          fieldSlice('registry boundary', 'offline only', 'CRO status requires official lookup.', 'red')
        ] };
      }
    },
    norway: {
      personalLabel: 'Fodselsnummer',
      companyLabel: 'Organisasjonsnummer',
      taxLabel: 'MVA',
      parsePersonal(raw) {
        const ds = digitsOnly(raw);
        const day = Number(ds.slice(0, 2));
        const month = Number(ds.slice(2, 4));
        const year = inferYear(ds.slice(4, 6));
        const dateOk = isValidDateParts(year, month, day);
        const k1 = 11 - (ds.slice(0, 9).split('').reduce((total, digit, index) => total + Number(digit) * [3, 7, 6, 1, 8, 9, 4, 5, 2][index], 0) % 11);
        const check1 = k1 === 11 ? 0 : k1;
        const k2 = 11 - (ds.slice(0, 10).split('').reduce((total, digit, index) => total + Number(digit) * [5, 4, 3, 2, 7, 6, 5, 4, 3, 2][index], 0) % 11);
        const check2 = k2 === 11 ? 0 : k2;
        const checksumOk = ds.length === 11 && check1 < 10 && check2 < 10 && Number(ds[9]) === check1 && Number(ds[10]) === check2;
        return { normalized: ds, ok: ds.length === 11 && dateOk && checksumOk, slices: [
          fieldSlice('birth date', dateOk ? `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}` : ds.slice(0, 6), 'DDMMYY date block.'),
          fieldSlice('individual number', ds.slice(6, 9), 'Individual/person serial block.'),
          fieldSlice('check digit 1', `${ds.slice(9, 10)} / expected ${check1}`, 'First Norwegian control digit.', Number(ds[9]) === check1 ? 'green' : 'red'),
          fieldSlice('check digit 2', `${ds.slice(10, 11)} / expected ${check2}`, 'Second Norwegian control digit.', Number(ds[10]) === check2 ? 'green' : 'red')
        ], checks: [
          statusCheck('Eleven digits', ds.length === 11, 'Fodselsnummer has eleven digits.', 'Expected eleven digits.'),
          statusCheck('Calendar date', dateOk, 'Date section is valid.', 'Date section needs review.'),
          statusCheck('Two check digits', checksumOk, 'Both check digits match.', 'Check digits need review.')
        ] };
      },
      parseCompany(raw) {
        const ds = digitsOnly(raw);
        const expected = weightedMod11Check(ds.slice(0, 8), [3, 2, 7, 6, 5, 4, 3, 2]);
        const ok = ds.length === 9 && expected < 10 && Number(ds[8]) === expected;
        return { normalized: ds, ok, slices: [
          fieldSlice('organization body', ds.slice(0, 8), 'Norwegian organization number body.'),
          fieldSlice('check digit', `${ds.slice(8)} / expected ${expected}`, 'Modulo-11 organization control digit.', ok ? 'green' : 'red')
        ] };
      }
    },
    portugal: {
      personalLabel: 'NIF',
      companyLabel: 'NIPC',
      taxLabel: 'IVA',
      parsePersonal(raw) {
        const ds = digitsOnly(raw);
        const expected = weightedMod11Check(ds.slice(0, 8), [9, 8, 7, 6, 5, 4, 3, 2]);
        const ok = ds.length === 9 && expected < 10 && Number(ds[8]) === expected;
        return { normalized: ds, ok, slices: [
          fieldSlice('NIF body', ds.slice(0, 8), 'First eight fiscal identifier digits.'),
          fieldSlice('check digit', `${ds.slice(8)} / expected ${expected}`, 'Portuguese weighted modulo-11 control digit.', ok ? 'green' : 'red'),
          fieldSlice('fiscal boundary', 'offline only', 'Taxpayer existence/status requires official systems.', 'red')
        ], checks: [
          statusCheck('Nine digits', ds.length === 9, 'NIF has nine digits.', 'Expected nine digits.'),
          statusCheck('Checksum', ok, 'NIF checksum matches.', 'NIF checksum needs review.')
        ] };
      },
      parseCompany(raw) { return this.parsePersonal(raw); }
    },
    romania: {
      personalLabel: 'CNP',
      companyLabel: 'CUI / CIF',
      taxLabel: 'TVA',
      parsePersonal(raw) {
        const ds = digitsOnly(raw);
        const century = { 1: 1900, 2: 1900, 3: 1800, 4: 1800, 5: 2000, 6: 2000 }[Number(ds[0])] || 1900;
        const year = century + Number(ds.slice(1, 3));
        const month = Number(ds.slice(3, 5));
        const day = Number(ds.slice(5, 7));
        const dateOk = isValidDateParts(year, month, day);
        const weights = '279146358279'.split('').map(Number);
        const sum = ds.slice(0, 12).split('').reduce((total, digit, index) => total + Number(digit) * weights[index], 0);
        const expected = sum % 11 === 10 ? 1 : sum % 11;
        const checksumOk = ds.length === 13 && Number(ds[12]) === expected;
        return { normalized: ds, ok: ds.length === 13 && dateOk && checksumOk, slices: [
          fieldSlice('sex/century digit', ds[0], 'First digit encodes sex and century.'),
          fieldSlice('birth date', dateOk ? `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}` : ds.slice(1, 7), 'YYMMDD date block.'),
          fieldSlice('county code', ds.slice(7, 9), 'Romanian county code block.'),
          fieldSlice('check digit', `${ds.slice(12)} / expected ${expected}`, 'CNP weighted checksum.', checksumOk ? 'green' : 'red')
        ], checks: [
          statusCheck('Thirteen digits', ds.length === 13, 'CNP has thirteen digits.', 'Expected thirteen digits.'),
          statusCheck('Calendar date', dateOk, 'Date section is valid.', 'Date section needs review.'),
          statusCheck('Checksum', checksumOk, 'CNP checksum matches.', 'CNP checksum needs review.')
        ] };
      },
      parseCompany(raw) {
        const value = alnumOnly(raw);
        const ds = digitsOnly(value);
        const ok = ds.length >= 2 && ds.length <= 10;
        return { normalized: /^RO/.test(value) ? value : ds, ok, slices: [
          fieldSlice('VAT prefix', /^RO/.test(value) ? 'RO' : 'none', 'Romanian VAT prefix when present.'),
          fieldSlice('CUI/CIF body', ds, 'Company tax identifier body.'),
          fieldSlice('official boundary', 'offline only', 'ANAF/ONRC status requires official systems.', 'red')
        ] };
      }
    },
    sweden: {
      personalLabel: 'Personnummer',
      companyLabel: 'Organisationsnummer',
      taxLabel: 'Moms',
      parsePersonal(raw) {
        const ds = digitsOnly(raw).slice(-10);
        const yy = ds.slice(0, 2);
        const month = Number(ds.slice(2, 4));
        const day = Number(ds.slice(4, 6));
        const year = inferYear(yy);
        const dateOk = isValidDateParts(year, month, day);
        const expected = luhnCheckDigit(ds.slice(0, 9));
        const checksumOk = ds.length === 10 && Number(ds[9]) === expected;
        return { normalized: ds.length === 10 ? `${ds.slice(0, 6)}-${ds.slice(6)}` : ds, ok: ds.length === 10 && dateOk && checksumOk, slices: [
          fieldSlice('birth date', dateOk ? `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}` : ds.slice(0, 6), 'YYMMDD date block.'),
          fieldSlice('birth number', ds.slice(6, 9), 'Individual number block.'),
          fieldSlice('gender evidence', Number(ds[8]) % 2 ? 'male odd digit' : 'female even digit', 'Penultimate digit parity convention.'),
          fieldSlice('check digit', `${ds.slice(9)} / expected ${expected}`, 'Luhn control digit.', checksumOk ? 'green' : 'red')
        ], checks: [
          statusCheck('Ten digits', ds.length === 10, 'Personnummer short form has ten digits.', 'Expected ten digits.'),
          statusCheck('Calendar date', dateOk, 'Date section is valid.', 'Date section needs review.'),
          statusCheck('Luhn checksum', checksumOk, 'Luhn checksum matches.', 'Luhn checksum needs review.')
        ] };
      },
      parseCompany(raw) {
        const ds = digitsOnly(raw).slice(-10);
        const expected = luhnCheckDigit(ds.slice(0, 9));
        const ok = ds.length === 10 && Number(ds[9]) === expected;
        return { normalized: ds.length === 10 ? `${ds.slice(0, 6)}-${ds.slice(6)}` : ds, ok, slices: [
          fieldSlice('organization body', ds.slice(0, 9), 'Swedish organization number body.'),
          fieldSlice('check digit', `${ds.slice(9)} / expected ${expected}`, 'Luhn control digit.', ok ? 'green' : 'red')
        ] };
      }
    }
  };

  function profileFor(suite) {
    return COUNTRY_INTELLIGENCE_PROFILES[suite && suite.country && suite.country.slug] || null;
  }

  function buildProfileResult(suite, tool, input, baseResult) {
    const profile = profileFor(suite);
    if (!profile) return null;
    const kind = text(tool.kind).toLowerCase();
    let parsed = null;
    let label = tool.name;
    const exactParser = profile.parsers && profile.parsers[kind];
    if (exactParser) {
      parsed = exactParser.call(profile.parsers, input);
      label = (profile.kindLabels && profile.kindLabels[kind]) || label;
    } else if ((kind === 'personal' || kind === 'social') && profile.parsePersonal) {
      parsed = profile.parsePersonal.call(profile, input);
      label = profile.personalLabel || label;
    } else if ((kind === 'company' || kind === 'register') && profile.parseCompany) {
      parsed = profile.parseCompany.call(profile, input);
      label = profile.companyLabel || label;
    } else if (kind === 'vat' || kind === 'eori') {
      const normalizedTax = alnumOnly(input);
      const detectedPrefix = (normalizedTax.match(/^[A-Z]{2}/) || [''])[0];
      const body = normalizedTax.replace(/^[A-Z]{2}U?/, '');
      const prefixOk = /^[A-Z]{2}/.test(normalizedTax);
      const bodyOk = /^[A-Z0-9]{6,16}$/.test(body);
      parsed = {
        normalized: normalizedTax || text(input).trim(),
        ok: prefixOk && bodyOk,
        slices: [
          fieldSlice(kind === 'eori' ? 'EORI country prefix' : 'VAT country prefix', detectedPrefix || 'not detected', 'Country prefix / VIES or customs handoff evidence.', prefixOk ? 'green' : 'red'),
          fieldSlice(kind === 'eori' ? 'customs body' : 'tax body', body, 'Local tax/customs identifier body retained for official handoff.'),
          fieldSlice('local tax vocabulary', profile.taxLabel || tool.code, 'Country-local tax label used by this suite.'),
          fieldSlice('official boundary', 'offline only', 'Tax, customs, and VIES status remain outside browser-only checks.', 'red')
        ],
        checks: [
          statusCheck('Country prefix', prefixOk, 'Country prefix detected.', 'Expected country prefix.'),
          statusCheck('Body envelope', bodyOk, 'Identifier body has a plausible local handoff shape.', 'Identifier body needs review.')
        ]
      };
      label = profile.taxLabel || label;
    }
    if (!parsed) return null;
    const status = parsed.ok ? 'success' : 'review';
    const result = Object.assign({}, baseResult, {
      status,
      headline: `${tool.code}: ${parsed.ok ? 'local structure verified' : 'local structure needs review'}`,
      detail: parsed.ok
        ? `${label} parser replayed local structure and control evidence in this browser.`
        : `${label} parser found a shape or control issue; compare with the valid preset.`,
      primary: parsed.normalized || text(input).trim(),
      normalized: parsed.normalized || text(input).trim(),
      breakdownTitle: `${label} field breakdown`,
      breakdownSummary: `Decoded ${suite.country.name} ${label} blocks, local control evidence, and official-boundary notes.`,
      breakdown: parsed.slices,
      checks: [
        statusCheck('Input present', text(input).trim().length > 0, 'Input is available locally.', 'Paste a value or load a sample.'),
        ...asArray(parsed.checks),
        statusCheck('Official boundary', true, 'No official registry, identity, tax, or banking lookup is made.', 'No official lookup is made.')
      ],
      suggestions: parsed.ok
        ? ['Copy the normalized value for fixtures.', 'Use the field breakdown to document parser assumptions.', 'Use official systems for regulated status.']
        : ['Load the valid preset and compare each decoded block.', 'Check digit length, date block, country prefix, and control digit.', 'Do not treat offline review as official rejection.']
    });
    result.fields = [
      fieldSlice('normalized', result.normalized, 'Parser-normalized local value.'),
      fieldSlice('masked', text(result.normalized).length > 8 ? `${text(result.normalized).slice(0, 3)}...${text(result.normalized).slice(-4)}` : `${text(result.normalized).slice(0, 1)}...`, 'Log-safe preview.'),
      fieldSlice('tool', tool.name, tool.category),
      fieldSlice('official boundary', 'offline only', 'Official status requires the responsible local system.')
    ];
    result.developerJson = Object.assign({}, baseResult && baseResult.developerJson, {
      suite: suite.suiteId,
      tool: tool.id,
      country: suite.country.slug,
      status: result.status,
      normalized: result.normalized,
      checks: result.checks,
      breakdown: result.breakdown
    });
    return result;
  }

  function buildIbanGeneratorResult(suite, tool, input) {
    const labels = labelsFor(suite);
    const raw = text(input || (tool.samples && tool.samples[0] && tool.samples[0].value) || '').trim();
    const compact = alnumOnly(raw);
    const country = countryCodeForSuite(suite, tool, compact);
    let bban = compact;
    if (country && bban.startsWith(country)) {
      bban = /^\d{2}/.test(bban.slice(2, 4)) ? bban.slice(4) : bban.slice(2);
    }
    const generated = generateIban(country, bban);
    const present = bban.length >= 4 && /^[A-Z]{2}$/.test(country);
    const valid = present && generated.remainder === 1;
    const grouped = generated.iban.replace(/(.{4})/g, '$1 ').trim();
    const masked = generated.iban.length > 8 ? `${generated.iban.slice(0, 4)} ${'•••• '.repeat(Math.max(1, Math.ceil((generated.iban.length - 8) / 4))).trim()} ${generated.iban.slice(-4)}` : generated.iban;
    return {
      status: valid ? 'success' : 'review',
      headline: valid ? `${labels.ibanGenerator}: ${labels.offlinePassed}` : `${labels.ibanGenerator}: ${labels.reviewNeeded}`,
      detail: valid ? `${suite.country.name} IBAN check digits were generated locally from BBAN/account body evidence.` : 'Enter a country code and BBAN/account body, or load a sample.',
      primary: grouped,
      normalized: generated.iban,
      checks: [
        statusCheck('Country code', /^[A-Z]{2}$/.test(country), `${country} country prefix ready.`, 'Expected a two-letter ISO country code.'),
        statusCheck('BBAN/account body', bban.length >= 4, `${bban.length} BBAN characters detected.`, 'Provide the local account body after the country/check digits.'),
        statusCheck('Check digits', generated.checkDigits.length === 2, `Generated ${generated.checkDigits}.`, 'Could not generate check digits.'),
        statusCheck('MOD-97 verification', generated.remainder === 1, 'Generated IBAN verifies to remainder 1.', `Generated remainder is ${generated.remainder}.`)
      ],
      fields: [
        fieldSlice(labels.generatedIban, grouped, 'Copy-ready grouped display.', valid ? 'green' : 'red'),
        fieldSlice(labels.mod97CheckDigits, generated.checkDigits, 'ISO 13616 check digits computed locally.'),
        fieldSlice(labels.bbanBody, generated.bban, 'Local account body used before country/check digits.'),
        fieldSlice('Masked display', masked, 'Log-safe generated preview.')
      ],
      breakdownTitle: `${tool.name} field breakdown`,
      breakdownSummary: 'Generated IBAN slices for payment fixtures, parser tests, and MOD-97 debugging.',
      breakdown: [
        fieldSlice('country prefix', generated.country, 'Two-letter ISO country prefix.'),
        fieldSlice('generated check digits', generated.checkDigits, '98 - MOD-97(BBAN + country + 00).', valid ? 'green' : 'red'),
        fieldSlice('BBAN/account body', generated.bban, 'Country-specific account body supplied by the user.'),
        fieldSlice('MOD-97 remainder', String(generated.remainder), 'A valid generated IBAN has remainder 1.', generated.remainder === 1 ? 'green' : 'red'),
        fieldSlice('official boundary', 'offline only', 'Generated values are structural fixtures, not live account ownership proof.', 'red')
      ],
      qualityNotes: asArray(tool.qualityNotes).length ? tool.qualityNotes : [
        { title: 'Fixture only', text: 'Generated IBANs are structural fixtures unless your app binds them to real account data.' },
        { title: 'No lookup', text: 'Bank existence, account ownership, and payment acceptance are never proven in this browser.' },
        { title: 'Debug value', text: 'Use generated values for parser tests, UI fixtures, and MOD-97 debugging.' },
        { title: 'Privacy', text: 'Prefer masked generated examples in logs and support screenshots.' }
      ],
      suggestions: valid ? ['Copy the generated IBAN into test fixtures.', 'Use the paired country IBAN validator to verify downstream parsing.'] : ['Paste a BBAN/account body or full IBAN-like value.', 'Check country prefix and BBAN length.'],
      developerJson: {
        suite: suite.suiteId,
        tool: tool.id,
        country,
        bban,
        checkDigits: generated.checkDigits,
        iban: generated.iban,
        grouped,
        masked,
        mod97: generated.remainder,
        generatedLocally: true,
        officialBoundary: 'offline only'
      }
    };
  }

  function isWeakFactoryResult(result) {
    const breakdownText = asArray(result && result.breakdown)
      .map((part) => `${part.label || ''} ${part.value || ''} ${part.note || part.detail || ''}`)
      .join(' ')
      .toLowerCase();
    return breakdownText.includes('identifier evidence') || breakdownText.includes('tax evidence') || breakdownText.includes('payment evidence') || breakdownText.includes('workflow');
  }

  function enhanceAnalyzerResult(suite, tool, input, result) {
    if (tool.kind === 'ibangenerator' || /iban-generator/i.test(`${tool.id} ${tool.name}`)) {
      return buildIbanGeneratorResult(suite, tool, input);
    }
    const profileResult = buildProfileResult(suite, tool, input, result);
    if (profileResult) return profileResult;
    if (!isWeakFactoryResult(result)) return result;
    const raw = text(input).trim();
    const normalized = raw.replace(/\s+/g, ' ');
    const localTerms = [tool.code, tool.name, suite.country.name].filter(Boolean).join(' / ');
    return Object.assign({}, result, {
      breakdownTitle: `${tool.name} evidence breakdown`,
      breakdownSummary: `Detected ${suite.country.name} parser evidence groups for debugging and handoff.`,
      breakdown: [
        fieldSlice('source payload', shortValue(normalized, 120), 'Browser-local source value.'),
        fieldSlice('local vocabulary', localTerms, 'Country/tool-specific labels used for this workflow.'),
        fieldSlice('line count', String(raw ? raw.split(/\r?\n/).length : 0), 'Parser input shape.'),
        fieldSlice('official boundary', 'offline only', 'Live status remains outside this browser workbench.', 'red')
      ]
    });
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
      .csf-related-links {
        display: flex;
        flex-wrap: wrap;
        gap: .42rem;
      }
      .csf-related-links a {
        display: inline-flex;
        max-width: 100%;
        border: 1px solid var(--csf-line);
        border-radius: 999px;
        background: rgba(255, 255, 255, .9);
        color: var(--csf-ink);
        padding: .34rem .58rem;
        font-size: .76rem;
        font-weight: 850;
        text-decoration: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .csf-presets-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: .72rem;
      }
      .csf-presets-grid label {
        min-width: 0;
      }
      .csf-presets-grid span {
        display: block;
        margin-bottom: .32rem;
        color: var(--csf-muted);
        font-size: .68rem;
        font-weight: 900;
        letter-spacing: .12em;
        text-transform: uppercase;
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
      .csf-sample-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: .45rem;
      }
      .csf-sample-button {
        border: 1px solid var(--csf-line);
        border-radius: 999px;
        background: #fff;
        color: var(--csf-ink);
        padding: .42rem .68rem;
        font-size: .82rem;
        font-weight: 900;
        cursor: pointer;
      }
      .csf-sample-button[data-tone="success"] {
        border-color: color-mix(in srgb, var(--csf-success) 26%, var(--csf-line));
        background: color-mix(in srgb, var(--csf-success) 7%, #fff);
        color: var(--csf-success);
      }
      .csf-sample-button[data-tone="review"] {
        border-color: color-mix(in srgb, #b45309 22%, var(--csf-line));
        background: #fffbeb;
        color: #92400e;
      }
      .csf-input { padding: 1.05rem 0; }
      .csf-batch {
        margin-top: .9rem;
        border: 1px solid var(--csf-line);
        border-radius: .9rem;
        background: #fff;
        overflow: hidden;
      }
      .csf-batch summary {
        padding: .78rem .9rem;
        color: var(--csf-ink);
        font-size: .9rem;
        font-weight: 950;
        cursor: pointer;
      }
      .csf-batch-body {
        border-top: 1px solid var(--csf-line);
        padding: .9rem;
      }
      .csf-batch textarea {
        min-height: 5.5rem;
      }
      .csf-batch-results {
        display: grid;
        gap: .5rem;
        margin-top: .72rem;
      }
      .csf-batch-item {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: .7rem;
        align-items: center;
        border: 1px solid var(--csf-line);
        border-radius: .68rem;
        padding: .58rem .7rem;
        background: #f8fafc;
        font-size: .82rem;
        font-weight: 800;
      }
      .csf-batch-item.is-success {
        border-color: color-mix(in srgb, var(--csf-success) 24%, var(--csf-line));
        background: color-mix(in srgb, var(--csf-success) 6%, #fff);
      }
      .csf-batch-item.is-review {
        border-color: #fecaca;
        background: var(--csf-review-soft);
      }
      .csf-rich-lab {
        border: 1px solid color-mix(in srgb, var(--csf-accent) 22%, var(--csf-line));
        border-radius: .95rem;
        background: linear-gradient(135deg, #fff, color-mix(in srgb, var(--csf-accent) 7%, #fff), color-mix(in srgb, var(--csf-accent-2) 5%, #fff));
        padding: .78rem .9rem;
        margin: 0 0 1.05rem;
        box-shadow: 0 18px 42px rgba(15, 23, 42, .045);
      }
      .csf-rich-lab summary {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: .9rem;
        cursor: pointer;
        list-style: none;
      }
      .csf-rich-lab summary::-webkit-details-marker {
        display: none;
      }
      .csf-rich-summary-title {
        display: grid;
        gap: .18rem;
        min-width: 0;
      }
      .csf-rich-summary-title strong {
        font-size: .95rem;
        line-height: 1.2;
      }
      .csf-rich-summary-title small {
        color: var(--csf-muted);
        font-size: .78rem;
        font-weight: 720;
        line-height: 1.35;
      }
      .csf-rich-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: .9rem;
        padding: .75rem 0;
        border-bottom: 1px solid color-mix(in srgb, var(--csf-accent) 16%, var(--csf-line));
      }
      .csf-rich-head h3 {
        margin: .18rem 0 0;
        font-size: 1.02rem;
        line-height: 1.22;
      }
      .csf-rich-head p {
        margin: .25rem 0 0;
        color: var(--csf-muted);
        font-size: .84rem;
        line-height: 1.45;
        font-weight: 720;
      }
      .csf-rich-badge {
        flex: 0 0 auto;
        border: 1px solid color-mix(in srgb, var(--csf-accent) 32%, var(--csf-line));
        border-radius: 999px;
        background: #fff;
        color: var(--csf-accent);
        font-size: .78rem;
        font-weight: 950;
        padding: .42rem .66rem;
      }
      .csf-rich-grid {
        display: grid;
        grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr);
        gap: .75rem;
        margin-top: .75rem;
      }
      .csf-rich-card {
        border: 1px solid var(--csf-line);
        border-radius: .78rem;
        background: rgba(255, 255, 255, .9);
        padding: .68rem;
        min-width: 0;
      }
      .csf-rich-card .csf-textarea {
        min-height: 4.8rem;
      }
      .csf-rich-card h4 {
        margin: .2rem 0 .55rem;
        font-size: .9rem;
      }
      .csf-rich-tabs {
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
        margin: .85rem 0 .65rem;
      }
      .csf-rich-tab {
        border: 1px solid var(--csf-line);
        border-radius: 999px;
        background: #fff;
        color: var(--csf-ink);
        font-size: .78rem;
        font-weight: 900;
        padding: .45rem .66rem;
        cursor: pointer;
      }
      .csf-rich-tab[aria-selected="true"] {
        border-color: color-mix(in srgb, var(--csf-accent) 42%, var(--csf-line));
        background: color-mix(in srgb, var(--csf-accent) 10%, #fff);
        color: var(--csf-accent);
      }
      .csf-rich-panel[hidden] {
        display: none;
      }
      .csf-rich-output {
        display: grid;
        gap: .5rem;
        max-height: 16rem;
        overflow: auto;
      }
      .csf-rich-line {
        display: grid;
        grid-template-columns: 2.4rem minmax(0, 1fr) 4.9rem minmax(0, .72fr);
        gap: .5rem;
        align-items: center;
        border: 1px solid var(--csf-line);
        border-radius: .68rem;
        background: #fff;
        padding: .5rem .6rem;
        font-size: .8rem;
        font-weight: 800;
      }
      .csf-rich-line code,
      .csf-rich-line span {
        min-width: 0;
        overflow-wrap: anywhere;
      }
      .csf-rich-pass {
        color: var(--csf-success);
        font-weight: 950;
      }
      .csf-rich-review {
        color: #b45309;
        font-weight: 950;
      }
      .csf-rich-code {
        margin: 0;
        border-radius: .78rem;
        background: #111827;
        color: #dbeafe;
        padding: .85rem;
        overflow: auto;
        max-height: 22rem;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        font: 650 .78rem/1.55 ui-monospace, SFMono-Regular, Menlo, monospace;
      }
      .csf-rich-related {
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
      }
      .csf-rich-related a {
        display: inline-flex;
        align-items: center;
        max-width: 100%;
        border: 1px solid var(--csf-line);
        border-radius: 999px;
        background: #fff;
        color: var(--csf-ink);
        font-size: .78rem;
        font-weight: 850;
        padding: .42rem .62rem;
        text-decoration: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
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
        background: var(--csf-success);
        border-color: var(--csf-success);
        color: #fff;
        box-shadow: 0 10px 24px color-mix(in srgb, var(--csf-success) 22%, transparent);
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
      .csf-strip {
        display: flex;
        flex-wrap: wrap;
        gap: .42rem;
        justify-content: center;
        margin: .85rem 0;
      }
      .csf-token {
        display: grid;
        min-width: 3.3rem;
        min-height: 3.3rem;
        place-items: center;
        border: 1px solid color-mix(in srgb, var(--csf-accent-2) 28%, var(--csf-line));
        border-radius: .55rem;
        background: #fff;
        color: var(--csf-accent-2);
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 1.05rem;
        font-weight: 950;
        box-shadow: 0 8px 18px rgba(15, 23, 42, .045);
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
      .csf-debug-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.25fr) minmax(0, .75fr);
        gap: .85rem;
      }
      .csf-debug-table {
        width: 100%;
        border-collapse: collapse;
        overflow: hidden;
        border-radius: .72rem;
        background: #fff;
      }
      .csf-debug-table th,
      .csf-debug-table td {
        border-bottom: 1px solid var(--csf-line);
        padding: .55rem .6rem;
        text-align: left;
        font-size: .8rem;
        overflow-wrap: anywhere;
      }
      .csf-debug-table th {
        color: var(--csf-muted);
        font-size: .68rem;
        font-weight: 950;
        letter-spacing: .11em;
        text-transform: uppercase;
      }
      .csf-suggestions {
        display: grid;
        gap: .55rem;
      }
      .csf-suggestion {
        border: 1px solid var(--csf-line);
        border-radius: .7rem;
        background: #fff;
        padding: .65rem .75rem;
        color: var(--csf-muted);
        font-size: .84rem;
        font-weight: 780;
      }
      .csf-api-tabs {
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
        margin: .75rem 0;
      }
      .csf-api-tabs span {
        border: 1px solid var(--csf-line);
        border-radius: .6rem;
        padding: .42rem .62rem;
        background: #fff;
        font-size: .82rem;
        font-weight: 900;
      }
      .csf-api-tabs span:first-child {
        border-color: color-mix(in srgb, var(--csf-accent) 35%, var(--csf-line));
        background: color-mix(in srgb, var(--csf-accent) 10%, #fff);
        color: var(--csf-accent);
      }
      @media (max-width: 760px) {
        .csf-hero-grid { grid-template-columns: 1fr; }
        .csf-presets-grid { grid-template-columns: 1fr; }
        .csf-rich-grid { grid-template-columns: 1fr; }
        .csf-rich-head { flex-direction: column; }
        .csf-rich-line { grid-template-columns: 2.1rem minmax(0, 1fr); }
        .csf-rich-line span:last-child { grid-column: 2; }
        .csf-debug-grid { grid-template-columns: 1fr; }
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
          <div class="csf-samples">
            <span>${esc(labels.samplesAndRelated)}</span>
            <div class="csf-related-links" aria-label="${esc(labels.relatedTools)}">
              ${related.slice(0, 5).map((item) => `<a href="${esc(`${localePrefix()}${suite.country.slug}/${item.id}/`)}">${esc(shortValue(item.name, 34))}</a>`).join('')}
            </div>
          </div>
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
        <div class="csf-presets-grid">
          <label>
            <span>${esc(labels.presets)}</span>
            <div class="csf-sample-buttons" data-csf-samples>
              ${tool.samples.map((sample, index) => `<button class="csf-sample-button" type="button" data-csf-sample="${index}" data-tone="${esc(sample.tone || (index === 0 ? 'success' : 'review'))}">${esc(sample.label)}</button>`).join('')}
            </div>
          </label>
        </div>
        <textarea class="csf-textarea" spellcheck="false" data-csf-input>${esc(tool.samples[0].value)}</textarea>
        <div class="csf-actions">
          <button class="csf-button csf-button-primary" type="button" data-csf-run>${esc(tool.buttonLabel || tool.actionLabel || labels.validate)}</button>
          <button class="csf-button" type="button" data-csf-copy>${esc(labels.copyResult)}</button>
          <button class="csf-button" type="button" data-csf-download>${esc(labels.downloadResult)}</button>
          <button class="csf-button csf-button-ghost" type="button" data-csf-clear>${esc(labels.clear)}</button>
        </div>
        <details class="csf-batch">
          <summary>${esc(labels.batchValidation)} <small>${esc(labels.batchSummary)}</small></summary>
          <div class="csf-batch-body">
            <textarea class="csf-textarea" spellcheck="false" data-csf-batch-input placeholder="${esc(tool.samples.map((sample) => sample.value).slice(0, 3).join('\n'))}"></textarea>
            <div class="csf-actions">
              <button class="csf-button" type="button" data-csf-batch-run>${esc(labels.runBatch)}</button>
              <button class="csf-button" type="button" data-csf-batch-copy>${esc(labels.copyBatchJson)}</button>
              <button class="csf-button csf-button-ghost" type="button" data-csf-batch-clear>${esc(labels.clearBatch)}</button>
            </div>
            <div class="csf-batch-results" data-csf-batch-results></div>
          </div>
        </details>
      </section>
    `;
  }

  function routePath() {
    if (typeof location === 'undefined') return '/en/';
    return location.pathname || '/en/';
  }

  function localePrefix() {
    const locale = currentLocale();
    return `/${locale}/`;
  }

  function renderRichRelatedLinks(suite, tool) {
    const locale = localePrefix();
    const countryPath = `${locale}${suite.country.slug}/`;
    const related = suite.tools
      .filter((item) => item.id !== tool.id)
      .slice(0, 12)
      .map((item) => localizeTool(suite, item));
    if (!related.length) return '';
    return `<div class="csf-rich-related">${related.map((item) => `
      <a href="${esc(countryPath + item.id + '/')}">${esc(item.name)}</a>
    `).join('')}</div>`;
  }

  function renderRichLayer(suite, tool) {
    const labels = labelsFor(suite);
    const history = readHistory(suite, tool);
    const badge = formatLabel(labels.localBadge, {
      country: suite.country,
      code: tool.code
    }).replace(/\{code\}/g, tool.code);
    return `
      <details class="csf-rich-lab" data-csf-rich-layer>
        <summary>
          <span class="csf-rich-summary-title">
            <strong>${esc(labels.advancedTools)}</strong>
            <small>${esc(labels.advancedToolsSummary)}</small>
          </span>
          <span class="csf-rich-badge">${esc(badge)}</span>
        </summary>
        <div class="csf-rich-head">
          <div>
            <span class="csf-kicker">${esc(labels.premiumDebugLayer)}</span>
            <h3>${esc(formatLabel(labels.toolIntelligence, suite))}</h3>
            <p>${esc(labels.toolIntelligenceSummary)}</p>
          </div>
          <span class="csf-rich-badge">${esc(badge)}</span>
        </div>
        <div class="csf-rich-grid">
          <article class="csf-rich-card">
            <span class="csf-label">${esc(labels.recentValidations)}</span>
            <h4>${esc(labels.browserHistory)}</h4>
            <select class="csf-select" data-csf-rich-history>
              <option value="">${esc(labels.noHistory)}</option>
              ${history.map((item) => `<option value="${esc(item)}">${esc(shortValue(item, 52))}</option>`).join('')}
            </select>
          </article>
          <article class="csf-rich-card">
            <span class="csf-label">${esc(labels.batchDiagnostics || labels.batchValidation)}</span>
            <h4>${esc(labels.multiRowValidator)}</h4>
            <textarea class="csf-textarea" spellcheck="false" data-csf-rich-batch-input placeholder="${esc(tool.samples.map((sample) => sample.value).slice(0, 3).join('\n'))}"></textarea>
            <div class="csf-actions">
              <button class="csf-button csf-button-primary" type="button" data-csf-rich-batch-run>${esc(labels.runBatch)}</button>
              <button class="csf-button" type="button" data-csf-rich-load-current>${esc(labels.useCurrentInput)}</button>
            </div>
          </article>
        </div>
        <div class="csf-rich-tabs" role="tablist">
          <button class="csf-rich-tab" type="button" aria-selected="true" data-csf-rich-tab="batch">${esc(labels.batchResult)}</button>
          <button class="csf-rich-tab" type="button" aria-selected="false" data-csf-rich-tab="api">${esc(labels.apiPreview)}</button>
          <button class="csf-rich-tab" type="button" aria-selected="false" data-csf-rich-tab="json">${esc(labels.rawJson)}</button>
          <button class="csf-rich-tab" type="button" aria-selected="false" data-csf-rich-tab="related">${esc(labels.relatedLocalTools)}</button>
        </div>
        <div class="csf-rich-panel" data-csf-rich-panel="batch"><div class="csf-rich-output" data-csf-rich-batch-output><p>${esc(labels.batchEmpty)}</p></div></div>
        <div class="csf-rich-panel" data-csf-rich-panel="api" hidden><pre class="csf-rich-code" data-csf-rich-api></pre></div>
        <div class="csf-rich-panel" data-csf-rich-panel="json" hidden><pre class="csf-rich-code" data-csf-rich-json>{}</pre></div>
        <div class="csf-rich-panel" data-csf-rich-panel="related" hidden>${renderRichRelatedLinks(suite, tool) || `<p>${esc(labels.relatedLocalFallback)}</p>`}</div>
      </details>
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

  function renderTokenStrip(result) {
    const parts = asArray(result.breakdown).filter((part) => text(part.value).trim()).slice(0, 16);
    if (!parts.length) return '';
    return `<div class="csf-strip">${parts.map((part) => `
      <span class="csf-token" title="${esc(part.label || '')}: ${esc(part.note || '')}">${esc(shortValue(part.value, 12))}</span>
    `).join('')}</div>`;
  }

  function debuggerRows(result) {
    const rows = [];
    for (const check of asArray(result.checks)) {
      rows.push({ step: check.label, evidence: check.pass ? 'Pass' : 'Review', detail: check.text || '' });
    }
    for (const part of asArray(result.breakdown).slice(0, 8)) {
      rows.push({ step: part.label, evidence: part.value, detail: part.note || '' });
    }
    return rows.slice(0, 12);
  }

  function apiPreview(suite, tool, result) {
    const country = suite.country.slug;
    const endpoint = `https://api.validohub.com/v1/${country}/${tool.id}/analyze`;
    const body = JSON.stringify({ input: result.normalized || result.primary || '' });
    return [
      `curl -X POST ${endpoint} \\`,
      `  -H "Content-Type: application/json" \\`,
      `  -d '${body.replace(/'/g, "\\'")}'`
    ].join('\n');
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
        <div class="csf-section-head">
          <span class="csf-icon">▦</span>
          <div><h3>${esc(labels.identifierBreakdown)}</h3><p>${esc(labels.hoverBreakdown)}</p></div>
        </div>
        ${renderTokenStrip(result)}
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
    const tool = suite.toolById && suite.toolById.get(result.developerJson && result.developerJson.tool) ? suite.toolById.get(result.developerJson.tool) : { id: result.developerJson && result.developerJson.tool || 'tool' };
    const rows = debuggerRows(result);
    const suggestions = asArray(result.suggestions).length ? result.suggestions : [
      result.status === 'success' ? 'Use the normalized value in test fixtures and masked values in logs.' : 'Load a valid preset and compare the field breakdown against your input.',
      'Keep official status, ownership, filing, delivery, and legal decisions outside this browser-only check.'
    ];
    return `
      <section class="csf-results">
        <details class="csf-advanced" open>
          <summary>${esc(labels.calculationDebugger)}</summary>
          <div class="csf-debug-grid">
            <div>
              <div class="csf-section-head"><span class="csf-icon">▶</span><div><h3>${esc(labels.replayCalculation)}</h3><p>${esc(labels.validationLog)}</p></div></div>
              <table class="csf-debug-table">
                <thead><tr><th>Step</th><th>Evidence</th><th>Detail</th></tr></thead>
                <tbody>${rows.map((row) => `<tr><td>${esc(row.step)}</td><td>${esc(row.evidence)}</td><td>${esc(row.detail)}</td></tr>`).join('')}</tbody>
              </table>
            </div>
            <div>
              <div class="csf-section-head"><span class="csf-icon">✦</span><div><h3>${esc(labels.repairSuggestions)}</h3><p>${esc(labels.regexDetails)}</p></div></div>
              <div class="csf-suggestions">${suggestions.map((item) => `<div class="csf-suggestion">${esc(item)}</div>`).join('')}</div>
            </div>
          </div>
        </details>
        <details class="csf-advanced" open>
          <summary>${esc(labels.developerApiPreview)}</summary>
          <div class="csf-api-tabs"><span>cURL</span><span>JavaScript</span><span>Python</span><span>Go</span></div>
          <pre>${esc(apiPreview(suite, tool, result))}</pre>
        </details>
        <details class="csf-advanced" open>
          <summary>${esc(labels.rawJsonOutput)}</summary>
          <pre>${esc(JSON.stringify(result.developerJson || result, null, 2))}</pre>
        </details>
      </section>
    `;
  }

  function renderResultBlocks(suite, result) {
    return `<section class="csf-results">${renderResult(suite, result)}${renderPipeline(suite, result)}${renderBreakdown(suite, result)}${renderQuality(suite, result)}${renderAdvanced(suite, result)}</section>`;
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
      const rawResult = handler(tool, input, suite);
      return normalizeResult(tool, enhanceAnalyzerResult(suite, tool, input, rawResult));
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
      rootElement.innerHTML = `${renderHero(suite, tool)}${renderRichLayer(suite, tool)}${renderInput(suite, tool)}<div data-csf-output></div>`;

      const input = rootElement.querySelector('[data-csf-input]');
      const output = rootElement.querySelector('[data-csf-output]');
      const state = rootElement.querySelector('[data-csf-state]');
      const historySelect = rootElement.querySelector('[data-csf-history]');
      const batchInput = rootElement.querySelector('[data-csf-batch-input]');
      const batchResults = rootElement.querySelector('[data-csf-batch-results]');
      const richHistorySelect = rootElement.querySelector('[data-csf-rich-history]');
      const richBatchInput = rootElement.querySelector('[data-csf-rich-batch-input]');
      const richBatchResults = rootElement.querySelector('[data-csf-rich-batch-output]');
      const richApi = rootElement.querySelector('[data-csf-rich-api]');
      const richJson = rootElement.querySelector('[data-csf-rich-json]');
      let lastResult = null;
      let lastBatch = [];

      function refreshHistory() {
        const history = readHistory(suite, tool);
        const options = `<option value="">${esc(labels.noHistory)}</option>${history.map((item) => `<option value="${esc(item)}">${esc(shortValue(item, 52))}</option>`).join('')}`;
        if (historySelect) historySelect.innerHTML = options;
        if (richHistorySelect) richHistorySelect.innerHTML = options;
      }

      function richSnapshot() {
        const result = lastResult || analyze(rawTool, input.value);
        return {
          country: suite.country.name,
          countrySlug: suite.country.slug,
          tool: tool.id,
          route: routePath(),
          input: input.value,
          status: result.status,
          normalized: result.normalized,
          headline: result.headline,
          fields: result.fields,
          checks: result.checks,
          breakdown: result.breakdown,
          offlineOnly: true,
          capturedAt: new Date().toISOString()
        };
      }

      function refreshRichPanels() {
        const result = lastResult || analyze(rawTool, input.value);
        if (richApi) richApi.textContent = apiPreview(suite, tool, result);
        if (richJson) richJson.textContent = JSON.stringify(richSnapshot(), null, 2);
      }

      function run() {
        lastResult = analyze(rawTool, input.value);
        output.innerHTML = renderResultBlocks(suite, lastResult);
        state.textContent = lastResult.status === 'success' ? labels.offlinePassed : labels.reviewNeeded;
        state.dataset.state = lastResult.status;
        writeHistory(suite, tool, input.value);
        refreshHistory();
        refreshRichPanels();
      }

      function runBatch() {
        const values = text(batchInput && batchInput.value).split(/\r?\n/).map((item) => item.trim()).filter(Boolean).slice(0, 100);
        lastBatch = values.map((value) => {
          const result = analyze(rawTool, value);
          return {
            input: value,
            status: result.status,
            normalized: result.normalized,
            headline: result.headline,
            checks: result.checks
          };
        });
        if (batchResults) {
          batchResults.innerHTML = lastBatch.map((item) => `
            <div class="csf-batch-item is-${esc(item.status)}">
              <span>${esc(shortValue(item.input, 72))}</span>
              <strong>${esc(item.status === 'success' ? labels.pass : labels.review)}</strong>
            </div>
          `).join('');
        }
      }

      function runRichBatch() {
        const values = text(richBatchInput && richBatchInput.value).split(/\r?\n/).map((item) => item.trim()).filter(Boolean).slice(0, 100);
        if (!values.length) {
          if (richBatchResults) richBatchResults.innerHTML = `<p>${esc(labels.pasteOnePerLine)}</p>`;
          return;
        }
        const previous = input.value;
        const rows = values.map((value, index) => {
          const result = analyze(rawTool, value);
          writeHistory(suite, tool, value);
          return {
            index: index + 1,
            input: value,
            status: result.status,
            output: result.primary || result.normalized || result.headline
          };
        });
        input.value = previous;
        if (richBatchResults) {
          richBatchResults.innerHTML = rows.map((item) => `
            <div class="csf-rich-line">
              <strong>#${esc(item.index)}</strong>
              <code>${esc(shortValue(item.input, 90))}</code>
              <span class="${item.status === 'success' ? 'csf-rich-pass' : 'csf-rich-review'}">${esc(item.status === 'success' ? labels.pass : labels.review)}</span>
              <span>${esc(shortValue(item.output, 120))}</span>
            </div>
          `).join('');
        }
        lastBatch = rows;
        refreshHistory();
        refreshRichPanels();
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
      rootElement.querySelectorAll('[data-csf-sample]').forEach((button) => {
        button.addEventListener('click', () => {
          const sample = tool.samples[Number(button.dataset.csfSample)] || tool.samples[0];
          input.value = sample.value;
          run();
        });
      });
      if (historySelect) historySelect.addEventListener('change', () => {
        if (historySelect.value) {
          input.value = historySelect.value;
          run();
        }
      });
      if (richHistorySelect) richHistorySelect.addEventListener('change', () => {
        if (richHistorySelect.value) {
          input.value = richHistorySelect.value;
          run();
        }
      });
      const batchRun = rootElement.querySelector('[data-csf-batch-run]');
      if (batchRun) batchRun.addEventListener('click', runBatch);
      const richBatchRun = rootElement.querySelector('[data-csf-rich-batch-run]');
      if (richBatchRun) richBatchRun.addEventListener('click', runRichBatch);
      const richLoadCurrent = rootElement.querySelector('[data-csf-rich-load-current]');
      if (richLoadCurrent) richLoadCurrent.addEventListener('click', () => {
        if (richBatchInput) richBatchInput.value = input.value || '';
      });
      rootElement.querySelectorAll('[data-csf-rich-tab]').forEach((tab) => {
        tab.addEventListener('click', () => {
          const id = tab.dataset.csfRichTab;
          rootElement.querySelectorAll('[data-csf-rich-tab]').forEach((item) => item.setAttribute('aria-selected', item === tab ? 'true' : 'false'));
          rootElement.querySelectorAll('[data-csf-rich-panel]').forEach((panel) => { panel.hidden = panel.dataset.csfRichPanel !== id; });
          refreshRichPanels();
        });
      });
      const batchCopy = rootElement.querySelector('[data-csf-batch-copy]');
      if (batchCopy) batchCopy.addEventListener('click', () => {
        if (navigator.clipboard) navigator.clipboard.writeText(JSON.stringify(lastBatch, null, 2));
      });
      const batchClear = rootElement.querySelector('[data-csf-batch-clear]');
      if (batchClear) batchClear.addEventListener('click', () => {
        if (batchInput) batchInput.value = '';
        if (batchResults) batchResults.innerHTML = '';
        lastBatch = [];
      });
      run();
      refreshRichPanels();
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
