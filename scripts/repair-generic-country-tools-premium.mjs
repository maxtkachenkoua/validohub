#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const generatedRoot = path.join(root, 'generated', 'validohub');
const locales = new Set(['en', 'es', 'pt-BR', 'de', 'fr', 'pl', 'uk']);
const nonCountrySections = new Set(['tools', 'countries', 'categories', 'identifiers']);
const legacyRichCountries = new Set(['brazil', 'poland', 'france', 'netherlands']);
const factoryVersion = 'country-suite-factory-rail-preview-fix-20260727';
const countryRuntimeVersion = 'country-premium-clickfix-20260730';
const legacyVersion = 'country-legacy-rich-layer-v1-20260729';
const progressEvery = Math.max(0, Number(process.env.VALIDOHUB_REPAIR_PROGRESS_ITEMS || 5000));
const repairConcurrency = Math.max(1, Number(process.env.VALIDOHUB_REPAIR_CONCURRENCY || 48));
const bespokeCountryTools = {
  'brazil-cpf-validator': { algorithmId: 'validohub.brazil-tax-id', runtime: 'brazil-tax-id.js', version: 'brazil-tax-id-gold-20260727', removeScripts: ['country-legacy-rich-layer.js', 'brazil-suite.js', 'gold-tools-lab.js'] },
  'brazil-cnpj-validator': { algorithmId: 'validohub.brazil-tax-id', runtime: 'brazil-tax-id.js', version: 'brazil-tax-id-gold-20260727', removeScripts: ['country-legacy-rich-layer.js', 'brazil-suite.js', 'gold-tools-lab.js'] },
  'spain-id-validator': { algorithmId: 'validohub.spain-id', runtime: 'spain-id.js', version: 'spain-id-gold-v1-20260730' },
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function createScheduler(concurrency) {
  const active = new Set();
  let firstError = null;

  async function schedule(task) {
    if (firstError) throw firstError;
    const promise = Promise.resolve()
      .then(task)
      .catch((error) => {
        if (!firstError) firstError = error;
        throw error;
      })
      .finally(() => active.delete(promise));
    active.add(promise);
    if (active.size >= concurrency) {
      await Promise.race(active);
    }
    if (firstError) throw firstError;
  }

  async function drain() {
    await Promise.all(active);
    if (firstError) throw firstError;
  }

  return { schedule, drain };
}

async function walkHtmlFiles(dir, onFile, scheduler) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkHtmlFiles(full, onFile, scheduler);
    } else if (entry.name === 'index.html') {
      await scheduler.schedule(() => onFile(full));
    }
  }
}

function generatedParts(filePath) {
  return path.relative(generatedRoot, filePath).split(path.sep);
}

function isCountryToolPage(filePath) {
  const parts = generatedParts(filePath);
  return (
    parts.length === 4 &&
    parts[3] === 'index.html' &&
    locales.has(parts[0]) &&
    !nonCountrySections.has(parts[1])
  );
}

function isGlobalToolPage(filePath) {
  const parts = generatedParts(filePath);
  return (
    parts.length === 4 &&
    parts[3] === 'index.html' &&
    locales.has(parts[0]) &&
    parts[1] === 'tools'
  );
}

function stripIntermediateShell(html) {
  return html
    .replace(/\s*<section class="vh-generic-country-hero"[\s\S]*?<\/section>\s*/g, '\n')
    .replace(/\s*<section class="vh-generic-country-summary"[\s\S]*?<\/section>\s*/g, '\n')
    .replace(/\s*<section class="vh-generic-country-traps"[\s\S]*?<\/section>\s*/g, '\n')
    .replace(/\s*<div class="vh-generic-country-samples"[\s\S]*?<\/div>\s*/g, '\n')
    .replace(/\s*<script>\s*\(\(\) => \{\s*if \(window\.__vhGenericCountrySamples\)[\s\S]*?<\/script>\s*/g, '\n')
    .replace(/\s+vh-generic-country-workbench/g, '')
    .replace(/<body class="vh-generic-country-page">/g, '<body>');
}

function removeLegacyWorkbenchHeading(html) {
  return html.replace(
    /\s*<div class="workbench-heading(?: workbench-heading-compact)?">[\s\S]*?<\/div>\s*(?=<div class="workbench-list">)/giu,
    '\n          ',
  );
}

function removeFakeApiBlocks(html) {
  return html
    .replace(/\s*<section[^>]*>\s*(?=[\s\S]{0,3000}(?:Developer API Preview|api\.validohub|curl -X|Endpoint shape|example contract only))[\s\S]*?(?:<\/details>\s*)?<\/section>/giu, '')
    .replace(/\s*<details[^>]*>\s*(?=[\s\S]{0,2000}(?:Developer API Preview|api\.validohub|curl -X|Endpoint shape|example contract only))[\s\S]*?<\/details>/giu, '');
}

function hasFakeApiMarker(html) {
  return (
    html.includes('Developer API Preview') ||
    html.includes('api.validohub') ||
    html.includes('curl -X') ||
    html.includes('Endpoint shape') ||
    html.includes('example contract only')
  );
}

function hasIntermediateShellMarker(html) {
  return (
    html.includes('vh-generic-country-') ||
    html.includes('vh-generic-country-workbench') ||
    html.includes('vh-generic-country-page')
  );
}

function needsWorkbenchShellCleanup(html) {
  return html.includes('workbench-heading') || hasFakeApiMarker(html) || hasIntermediateShellMarker(html);
}

function ensureFactoryScripts(html, countrySlug) {
  const factorySrc = '/assets/js/tools/country-suite-factory.js';
  const runtimeSrc = `/assets/js/tools/${countrySlug}-suite.js`;
  let next = html;
  const factoryTag = `<script src="${factorySrc}?v=${factoryVersion}"></script>`;
  const runtimeTag = `<script src="${runtimeSrc}?v=${countryRuntimeVersion}"></script>`;

  if (!next.includes(factorySrc)) {
    const runtimePattern = new RegExp(`<script src="${escapeRegExp(runtimeSrc)}(?:\\?[^"]*)?"><\\/script>`);
    if (runtimePattern.test(next)) {
      next = next.replace(runtimePattern, `${factoryTag}$&`);
    } else {
      next = next.replace(/\s*<\/body>/, `${factoryTag}${runtimeTag}\n</body>`);
    }
  }
  return next;
}

function ensureLegacyScripts(html, countrySlug) {
  const legacySrc = '/assets/js/tools/country-legacy-rich-layer.js';
  const runtimeSrc = `/assets/js/tools/${countrySlug}-suite.js`;
  let next = html;
  const legacyTag = `<script src="${legacySrc}?v=${legacyVersion}"></script>`;
  const runtimeTag = `<script src="${runtimeSrc}?v=${countryRuntimeVersion}"></script>`;

  if (!next.includes(legacySrc)) {
    const runtimePattern = new RegExp(`<script src="${escapeRegExp(runtimeSrc)}(?:\\?[^"]*)?"><\\/script>`);
    if (runtimePattern.test(next)) {
      next = next.replace(runtimePattern, `${legacyTag}$&`);
    } else {
      next = next.replace(/\s*<\/body>/, `${legacyTag}${runtimeTag}\n</body>`);
    }
  }
  return next;
}

function ensureSingleRuntimeScript(html, script, version) {
  const src = `/assets/js/tools/${script}`;
  if (html.includes(src)) return html;
  return html.replace(/\s*<\/body>/, `<script src="${src}?v=${version}"></script>\n</body>`);
}

function removeToolScript(html, script) {
  const src = `/assets/js/tools/${script}`;
  const pattern = new RegExp(`\\s*<script src="${escapeRegExp(src)}(?:\\?[^"]*)?"><\\/script>`, 'g');
  return String(html || '').replace(pattern, '');
}

function algorithmIdFromHtml(html) {
  const match = String(html || '').match(/data-algorithm-id="([^"]+)"/);
  return match ? match[1] : '';
}

function cleanCountryUtilityTool(html, countrySlug) {
  let next = stripIntermediateShell(html);
  next = removeLegacyWorkbenchHeading(next);
  next = removeFakeApiBlocks(next);
  next = removeToolScript(next, 'country-legacy-rich-layer.js');
  next = removeToolScript(next, `${countrySlug}-suite.js`);
  return next;
}

function collapseWorkbenchToFactoryHost(html, countrySlug) {
  const algorithmId = `validohub.${countrySlug}-suite`;
  const staticHost = `<section class="workbench-card csf-static-host" aria-label="Premium country workbench" data-algorithm-id="${escapeHtml(algorithmId)}"></section>`;
  let next = stripIntermediateShell(html);
  next = removeLegacyWorkbenchHeading(next);
  next = removeFakeApiBlocks(next);

  const workbenchPattern = /<section class="workbench-card[^"]*"[^>]*>[\s\S]*?<\/section>\s*(?=<(?:article|section) class="(?:content-card|related-section|vh-tool-related-footer)|\s*<section class="related-section)/;
  if (workbenchPattern.test(next)) {
    next = next.replace(workbenchPattern, `${staticHost}\n\n        `);
  } else if (!next.includes('csf-static-host')) {
    next = next.replace(/(<header class="page-intro">[\s\S]*?<\/header>)/, `$1\n\n        ${staticHost}`);
  }

  return ensureFactoryScripts(next, countrySlug);
}

function repairHtml(html, filePath) {
  if (isGlobalToolPage(filePath)) {
    if (!html.includes('workbench-heading') && !hasFakeApiMarker(html)) {
      return { html, changed: false, reason: 'global-tool' };
    }
    let next = removeLegacyWorkbenchHeading(html);
    next = removeFakeApiBlocks(next);
    return { html: next, changed: next !== html, reason: next !== html ? 'global-cleaned' : 'global-tool' };
  }
  if (!isCountryToolPage(filePath)) return { html, changed: false, reason: 'not-country-tool' };
  const [, countrySlug, toolSlug] = generatedParts(filePath);
  const bespoke = bespokeCountryTools[toolSlug];
  if (bespoke && html.includes(`data-algorithm-id="${bespoke.algorithmId}"`)) {
    const hasUnexpectedScript = (bespoke.removeScripts || []).some((script) => html.includes(`/assets/js/tools/${script}`));
    if (!hasUnexpectedScript && html.includes(`/assets/js/tools/${bespoke.runtime}`) && !needsWorkbenchShellCleanup(html)) {
      return { html, changed: false, reason: 'bespoke-country-tool' };
    }
    let next = stripIntermediateShell(html);
    next = removeLegacyWorkbenchHeading(next);
    next = removeFakeApiBlocks(next);
    for (const script of bespoke.removeScripts || []) {
      next = removeToolScript(next, script);
    }
    next = ensureSingleRuntimeScript(next, bespoke.runtime, bespoke.version);
    return { html: next, changed: next !== html, reason: next !== html ? 'bespoke-cleaned' : 'bespoke-country-tool' };
  }
  if (legacyRichCountries.has(countrySlug)) {
    const algorithmId = algorithmIdFromHtml(html);
    if (algorithmId !== `validohub.${countrySlug}-suite`) {
      const hasLegacyRuntime = html.includes('/assets/js/tools/country-legacy-rich-layer.js') || html.includes(`/assets/js/tools/${countrySlug}-suite.js`);
      if (!hasLegacyRuntime && !needsWorkbenchShellCleanup(html)) {
        return { html, changed: false, reason: 'country-utility-tool' };
      }
      const next = cleanCountryUtilityTool(html, countrySlug);
      return { html: next, changed: next !== html, reason: next !== html ? 'country-utility-cleaned' : 'country-utility-tool' };
    }
    if (
      html.includes('/assets/js/tools/country-legacy-rich-layer.js') &&
      html.includes(`/assets/js/tools/${countrySlug}-suite.js`) &&
      !needsWorkbenchShellCleanup(html)
    ) {
      return { html, changed: false, reason: 'legacy-rich-country' };
    }
    let next = stripIntermediateShell(html);
    next = removeLegacyWorkbenchHeading(next);
    next = removeFakeApiBlocks(next);
    next = ensureLegacyScripts(next, countrySlug);
    return { html: next, changed: next !== html, reason: next !== html ? 'legacy-cleaned' : 'legacy-rich-country' };
  }

  const algorithmId = `validohub.${countrySlug}-suite`;
  if (!html.includes(`data-algorithm-id="${algorithmId}"`)) {
    return { html, changed: false, reason: 'not-country-suite' };
  }

  if (
    html.includes('csf-static-host') &&
    html.includes('/assets/js/tools/country-suite-factory.js') &&
    html.includes(`/assets/js/tools/${countrySlug}-suite.js`) &&
    !needsWorkbenchShellCleanup(html)
  ) {
    return { html, changed: false, reason: 'already-premium' };
  }

  const next = collapseWorkbenchToFactoryHost(html, countrySlug);
  return { html: next, changed: next !== html, reason: next !== html ? 'collapsed' : 'already-premium' };
}

async function main() {
  if (!(await exists(generatedRoot))) {
    throw new Error(`Generated root does not exist: ${generatedRoot}`);
  }

  console.log(`[repair-premium] Scanning generated HTML under ${generatedRoot}`);
  console.log(`[repair-premium] concurrency: ${repairConcurrency}`);
  const started = Date.now();
  const stats = {
    scannedHtml: 0,
    scannedGlobalTools: 0,
    scannedCountryTools: 0,
    globalCleaned: 0,
    collapsed: 0,
    legacyCleaned: 0,
    bespokeCleaned: 0,
    countryUtilityCleaned: 0,
    alreadyPremium: 0,
    globalSkipped: 0,
    legacySkipped: 0,
    countryUtilitySkipped: 0,
    otherSkipped: 0,
  };

  const scheduler = createScheduler(repairConcurrency);
  await walkHtmlFiles(generatedRoot, async (filePath) => {
    stats.scannedHtml += 1;
    if (progressEvery && stats.scannedHtml % progressEvery === 0) {
      const elapsedSeconds = Math.round((Date.now() - started) / 1000);
      console.log(`[repair-premium] scanned ${stats.scannedHtml} HTML files in ${elapsedSeconds}s; updated ${stats.globalCleaned + stats.collapsed + stats.legacyCleaned + stats.bespokeCleaned + stats.countryUtilityCleaned}`);
    }

    if (!isCountryToolPage(filePath) && !isGlobalToolPage(filePath)) return;
    if (isCountryToolPage(filePath)) stats.scannedCountryTools += 1;
    if (isGlobalToolPage(filePath)) stats.scannedGlobalTools += 1;
    const html = await fs.readFile(filePath, 'utf8');
    const result = repairHtml(html, filePath);
    if (result.changed) {
      await fs.writeFile(filePath, result.html, 'utf8');
      if (result.reason === 'global-cleaned') stats.globalCleaned += 1;
      else if (result.reason === 'legacy-cleaned') stats.legacyCleaned += 1;
      else if (result.reason === 'bespoke-cleaned') stats.bespokeCleaned += 1;
      else if (result.reason === 'country-utility-cleaned') stats.countryUtilityCleaned += 1;
      else stats.collapsed += 1;
    } else if (result.reason === 'already-premium') {
      stats.alreadyPremium += 1;
    } else if (result.reason === 'global-tool') {
      stats.globalSkipped += 1;
    } else if (result.reason === 'legacy-rich-country') {
      stats.legacySkipped += 1;
    } else if (result.reason === 'country-utility-tool') {
      stats.countryUtilitySkipped += 1;
    } else {
      stats.otherSkipped += 1;
    }
  }, scheduler);
  await scheduler.drain();

  console.log('✓ Generated premium shell repair complete');
  console.log(JSON.stringify(stats, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
