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
const bespokeCountryTools = {
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

async function walk(dir, out = []) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, out);
    } else if (entry.name === 'index.html') {
      out.push(full);
    }
  }
  return out;
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
  if (!isCountryToolPage(filePath)) return { html, changed: false, reason: 'not-country-tool' };
  const [, countrySlug, toolSlug] = generatedParts(filePath);
  const bespoke = bespokeCountryTools[toolSlug];
  if (bespoke && html.includes(`data-algorithm-id="${bespoke.algorithmId}"`)) {
    let next = stripIntermediateShell(html);
    next = removeLegacyWorkbenchHeading(next);
    next = removeFakeApiBlocks(next);
    next = ensureSingleRuntimeScript(next, bespoke.runtime, bespoke.version);
    return { html: next, changed: next !== html, reason: next !== html ? 'bespoke-cleaned' : 'bespoke-country-tool' };
  }
  if (legacyRichCountries.has(countrySlug)) {
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

  const next = collapseWorkbenchToFactoryHost(html, countrySlug);
  return { html: next, changed: next !== html, reason: next !== html ? 'collapsed' : 'already-premium' };
}

async function main() {
  if (!(await exists(generatedRoot))) {
    throw new Error(`Generated root does not exist: ${generatedRoot}`);
  }

  const files = await walk(generatedRoot);
  const stats = {
    scannedCountryTools: 0,
    collapsed: 0,
    legacyCleaned: 0,
    bespokeCleaned: 0,
    alreadyPremium: 0,
    legacySkipped: 0,
    otherSkipped: 0,
  };

  for (const filePath of files) {
    if (!isCountryToolPage(filePath)) continue;
    stats.scannedCountryTools += 1;
    const html = await fs.readFile(filePath, 'utf8');
    const result = repairHtml(html, filePath);
    if (result.changed) {
      await fs.writeFile(filePath, result.html, 'utf8');
      if (result.reason === 'legacy-cleaned') stats.legacyCleaned += 1;
      else if (result.reason === 'bespoke-cleaned') stats.bespokeCleaned += 1;
      else stats.collapsed += 1;
    } else if (result.reason === 'already-premium') {
      stats.alreadyPremium += 1;
    } else if (result.reason === 'legacy-rich-country') {
      stats.legacySkipped += 1;
    } else {
      stats.otherSkipped += 1;
    }
  }

  console.log('✓ Country suite fallback repair complete');
  console.log(JSON.stringify(stats, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
