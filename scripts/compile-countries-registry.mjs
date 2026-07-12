#!/usr/bin/env node

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const dataDir = resolve(projectRoot, 'countries/data');
const templateScript = resolve(projectRoot, 'assets/js/countries.template.js');
const outputScript = resolve(projectRoot, 'assets/js/countries.js');

// Lightweight Schema Assertion helper
function assertType(path, val, expectedType, nullable = false) {
  if (nullable && val === null) return;
  const actualType = Array.isArray(val) ? 'array' : typeof val;
  if (actualType !== expectedType) {
    throw new Error(`Schema Violation at [${path}]: Expected type "${expectedType}", got "${actualType}"`);
  }
}

function validateCountryData(data) {
  const path = data.id || 'unknown';
  assertType(`${path}.id`, data.id, 'string');
  if (!/^[a-z-]+$/.test(data.id)) {
    throw new Error(`Schema Violation: id "${data.id}" must be lowercase alphanumeric and hyphens only.`);
  }

  // 1. Visual Assets
  assertType(`${path}.visualAssets`, data.visualAssets, 'object', true);
  if (data.visualAssets) {
    const va = data.visualAssets;
    assertType(`${path}.visualAssets.outlineSrc`, va.outlineSrc, 'string');
    assertType(`${path}.visualAssets.outlineAlt`, va.outlineAlt, 'string');
    assertType(`${path}.visualAssets.mapSrc`, va.mapSrc, 'string');
    assertType(`${path}.visualAssets.mapAlt`, va.mapAlt, 'string');
    assertType(`${path}.visualAssets.source`, va.source, 'string');
    
    assertType(`${path}.visualAssets.mapMarker`, va.mapMarker, 'object');
    assertType(`${path}.visualAssets.mapMarker.x`, va.mapMarker.x, 'number');
    assertType(`${path}.visualAssets.mapMarker.y`, va.mapMarker.y, 'number');
    assertType(`${path}.visualAssets.mapMarker.label`, va.mapMarker.label, 'string');
  }

  // 2. Catalog Entry
  assertType(`${path}.catalog`, data.catalog, 'object');
  const cat = data.catalog;
  assertType(`${path}.catalog.id`, cat.id, 'string');
  assertType(`${path}.catalog.flag`, cat.flag, 'string');
  assertType(`${path}.catalog.name`, cat.name, 'string');
  assertType(`${path}.catalog.iso2`, cat.iso2, 'string');
  assertType(`${path}.catalog.iso3`, cat.iso3, 'string');
  assertType(`${path}.catalog.continent`, cat.continent, 'string');
  assertType(`${path}.catalog.region`, cat.region, 'string');
  assertType(`${path}.catalog.language`, cat.language, 'string');
  assertType(`${path}.catalog.currency`, cat.currency, 'string');
  assertType(`${path}.catalog.currencyName`, cat.currencyName, 'string');
  assertType(`${path}.catalog.status`, cat.status, 'string');
  assertType(`${path}.catalog.summary`, cat.summary, 'string');
  assertType(`${path}.catalog.identifiers`, cat.identifiers, 'array');
  assertType(`${path}.catalog.payments`, cat.payments, 'array');
  assertType(`${path}.catalog.features`, cat.features, 'array');
  assertType(`${path}.catalog.availableWorkbenches`, cat.availableWorkbenches, 'array');
  assertType(`${path}.catalog.plannedWorkbenches`, cat.plannedWorkbenches, 'array');
  assertType(`${path}.catalog.completion`, cat.completion, 'number');
  
  assertType(`${path}.catalog.coordinates`, cat.coordinates, 'object');
  assertType(`${path}.catalog.coordinates.x`, cat.coordinates.x, 'number');
  assertType(`${path}.catalog.coordinates.y`, cat.coordinates.y, 'number');

  if (!['available', 'inProgress', 'planned', 'comingSoon'].includes(cat.status)) {
    throw new Error(`Schema Violation at [${path}.catalog.status]: Invalid status "${cat.status}"`);
  }

  // 3. Hub
  assertType(`${path}.hub`, data.hub, 'object', true);
  if (data.hub) {
    const hub = data.hub;
    assertType(`${path}.hub.flag`, hub.flag, 'string');
    assertType(`${path}.hub.name`, hub.name, 'string');
    assertType(`${path}.hub.badge`, hub.badge, 'string');
    assertType(`${path}.hub.description`, hub.description, 'string');
    assertType(`${path}.hub.metadata`, hub.metadata, 'object');
    assertType(`${path}.hub.stats`, hub.stats, 'array');
    assertType(`${path}.hub.countryProfile`, hub.countryProfile, 'array');
    assertType(`${path}.hub.visualIdentity`, hub.visualIdentity, 'object');

    const vi = hub.visualIdentity;
    assertType(`${path}.hub.visualIdentity.countryId`, vi.countryId, 'string');
    assertType(`${path}.hub.visualIdentity.outlineLabel`, vi.outlineLabel, 'string');
    assertType(`${path}.hub.visualIdentity.mapLabel`, vi.mapLabel, 'string');
    assertType(`${path}.hub.visualIdentity.continentBadge`, vi.continentBadge, 'string');
    assertType(`${path}.hub.visualIdentity.flagLabel`, vi.flagLabel, 'string');
    assertType(`${path}.hub.visualIdentity.heroAccentPrimary`, vi.heroAccentPrimary, 'string');
    assertType(`${path}.hub.visualIdentity.heroAccentSecondary`, vi.heroAccentSecondary, 'string');
    assertType(`${path}.hub.visualIdentity.heroAccentTertiary`, vi.heroAccentTertiary, 'string');
  }
}

async function main() {
  console.log('--- RUNNING COUNTRY DATA AGGREGATION & SCHEMA VALIDATION ---');
  
  // 1. Read all JSON files
  const files = await readdir(dataDir);
  const jsonFiles = files.filter(f => f.endsWith('.json') && f !== 'schema.json');
  
  // Deterministic sort by filename (country slug)
  jsonFiles.sort();

  const visualAssets = {};
  const hubs = {};
  const catalog = [];

  for (const file of jsonFiles) {
    const content = await readFile(resolve(dataDir, file), 'utf8');
    let data;
    try {
      data = JSON.parse(content);
    } catch (err) {
      throw new Error(`Syntax Error: Failed to parse JSON in ${file}: ${err.message}`);
    }

    // Run structural validations
    validateCountryData(data);

    // Add to collections
    if (data.visualAssets) {
      visualAssets[data.id] = data.visualAssets;
    }
    if (data.hub) {
      hubs[data.id] = data.hub;
    }
    catalog.push(data.catalog);
  }

  // 2. Load template
  const template = await readFile(templateScript, 'utf8');

  // Indented JSON helper
  const indent = (obj, spaces = 2) => {
    return JSON.stringify(obj, null, spaces)
      .split('\n')
      .map((line, idx) => idx === 0 ? line : ' '.repeat(spaces) + line)
      .join('\n');
  };

  // 3. Inject compiled structures
  const compiledJs = template
    .replace('/*__COUNTRY_VISUAL_ASSETS__*/', indent(visualAssets, 2))
    .replace('/*__COUNTRY_HUBS__*/', indent(hubs, 2))
    .replace('/*__COUNTRY_PORTAL_CATALOG__*/', indent(catalog, 2));

  // 4. Output compiled file
  await writeFile(outputScript, compiledJs, 'utf8');
  console.log(`PASS: Validated and compiled ${jsonFiles.length} countries successfully to assets/js/countries.js`);
}

main().catch(err => {
  console.error('Compilation failed:', err);
  process.exit(1);
});
