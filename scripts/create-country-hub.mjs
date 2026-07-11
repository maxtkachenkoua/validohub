#!/usr/bin/env node

import { readFile, writeFile, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import { extractElement, buildLocationMap } from './generate-maps.mjs';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const sourcePath = resolve(projectRoot, 'assets/images/countries/world-map-source.svg');
const countriesScript = resolve(projectRoot, 'assets/js/countries.js');

const MAP_WIDTH = 784.077;
const MAP_HEIGHT = 458.627;
const MAP_X_MIN = 30.767;
const MAP_Y_MIN = 241.591;

const X_COEF = 0.55220;
const X_OFFSET = 22.54754;
const Y_COEF = 0.88418;
const Y_OFFSET = 5.29045;

function showHelp() {
  console.log(`
ValidoHub Country Hub Scaffolder V1

Usage:
  node scripts/create-country-hub.mjs [options]

Options:
  --id <id>          Unique lowercase country ID (e.g. germany) [Required]
  --name <name>      Country display name (e.g. Germany) [Required]
  --iso2 <iso2>      ISO 3166-1 alpha-2 code (e.g. DE) [Required]
  --iso3 <iso3>      ISO 3166-1 alpha-3 code (e.g. DEU) [Required]
  --viewbox <crop>   Custom viewBox override for location SVG (e.g. "380 340 160 120") [Optional]
  --theme <colors>   Flag accent colors as comma-separated hex values (primary,secondary,tertiary) [Optional]
  --dry-run          Run validations and print proposed changes without writing files
  --help             Show this help screen
`);
}

function parseArgs(args) {
  const options = { dryRun: false };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--help') {
      options.help = true;
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--id') {
      options.id = args[++i];
    } else if (arg === '--name') {
      options.name = args[++i];
    } else if (arg === '--iso2') {
      options.iso2 = args[++i];
    } else if (arg === '--iso3') {
      options.iso3 = args[++i];
    } else if (arg === '--viewbox') {
      options.viewbox = args[++i];
    } else if (arg === '--theme') {
      options.theme = args[++i];
    }
  }
  return options;
}

// Ray-Casting Point-in-Polygon check
function isPointInPolygon(point, polygon) {
  let inside = false;
  const x = point.x, y = point.y;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x, yi = polygon[i].y;
    const xj = polygon[j].x, yj = polygon[j].y;
    const intersect = ((yi > y) !== (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Shoelace Polygon Area
function getPolygonArea(polygon) {
  let area = 0;
  const n = polygon.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += polygon[i].x * polygon[j].y - polygon[j].x * polygon[i].y;
  }
  return Math.abs(area) * 0.5;
}

// Point-on-Surface math
function getPointOnSurface(polygon) {
  let sumX = 0, sumY = 0;
  for (const p of polygon) {
    sumX += p.x;
    sumY += p.y;
  }
  const centroid = { x: sumX / polygon.length, y: sumY / polygon.length };

  if (isPointInPolygon(centroid, polygon)) {
    return centroid;
  }

  const y = centroid.y;
  const intersections = [];
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const pi = polygon[i], pj = polygon[j];
    if ((pi.y > y) !== (pj.y > y)) {
      const intersectX = pi.x + (y - pi.y) * (pj.x - pi.x) / (pj.y - pi.y);
      intersections.push(intersectX);
    }
  }
  intersections.sort((a, b) => a - b);

  let bestPoint = null;
  let minDistance = Infinity;
  for (let i = 0; i < intersections.length - 1; i++) {
    const midX = (intersections[i] + intersections[i + 1]) / 2;
    const midPoint = { x: midX, y: y };
    if (isPointInPolygon(midPoint, polygon)) {
      const dist = Math.abs(midX - centroid.x);
      if (dist < minDistance) {
        minDistance = dist;
        bestPoint = midPoint;
      }
    }
  }
  return bestPoint || centroid || polygon[0];
}

// Parse SVG paths/polygons
function extractPolygons(element) {
  const dMatches = element.match(/d="([^"]+)"/g) || [];
  const polygons = [];
  for (const match of dMatches) {
    const d = match.slice(3, -1);
    const commands = d.match(/([a-df-z]|[+-]?[0-9]*\.?[0-9]+)/gi) || [];
    let x = 0, y = 0;
    let i = 0;
    let lastCmd = '';
    let currentPolygon = [];
    while (i < commands.length) {
      let cmd = commands[i];
      if (isNaN(Number(cmd))) {
        lastCmd = cmd;
        i++;
      } else {
        cmd = lastCmd;
      }
      if (!cmd) {
        i++;
        continue;
      }
      const lowerCmd = cmd.toLowerCase();
      if (lowerCmd === 'm') {
        if (currentPolygon.length > 2) {
          polygons.push(currentPolygon);
        }
        currentPolygon = [];
        const valX = Number(commands[i++]);
        const valY = Number(commands[i++]);
        if (cmd === 'm') {
          x += valX;
          y += valY;
        } else {
          x = valX;
          y = valY;
        }
        currentPolygon.push({ x, y });
      } else if (lowerCmd === 'l') {
        const valX = Number(commands[i++]);
        const valY = Number(commands[i++]);
        if (cmd === 'l') {
          x += valX;
          y += valY;
        } else {
          x = valX;
          y = valY;
        }
        currentPolygon.push({ x, y });
      } else if (lowerCmd === 'h') {
        const valX = Number(commands[i++]);
        if (cmd === 'h') {
          x += valX;
        } else {
          x = valX;
        }
        currentPolygon.push({ x, y });
      } else if (lowerCmd === 'v') {
        const valY = Number(commands[i++]);
        if (cmd === 'v') {
          y += valY;
        } else {
          y = valY;
        }
        currentPolygon.push({ x, y });
      } else if (lowerCmd === 'c') {
        const dx1 = Number(commands[i++]);
        const dy1 = Number(commands[i++]);
        const dx2 = Number(commands[i++]);
        const dy2 = Number(commands[i++]);
        const dx = Number(commands[i++]);
        const dy = Number(commands[i++]);
        if (cmd === 'c') {
          x += dx;
          y += dy;
        } else {
          x = dx;
          y = dy;
        }
        currentPolygon.push({ x, y });
      } else if (lowerCmd === 'z') {
        if (currentPolygon.length > 0) {
          currentPolygon.push({ ...currentPolygon[0] });
        }
      } else {
        i++;
      }
    }
    if (currentPolygon.length > 2) {
      polygons.push(currentPolygon);
    }
  }
  return polygons;
}

function getBBox(polygon) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const p of polygon) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }
  return { minX, maxX, minY, maxY, w: maxX - minX, h: maxY - minY };
}

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    showHelp();
    process.exit(0);
  }

  // Validations
  const missing = [];
  if (!options.id) missing.push('--id');
  if (!options.name) missing.push('--name');
  if (!options.iso2) missing.push('--iso2');
  if (!options.iso3) missing.push('--iso3');

  if (missing.length > 0) {
    console.error(`Error: Missing required arguments: ${missing.join(', ')}`);
    console.error('Use --help to view usage instructions.');
    process.exit(1);
  }

  // Validate format
  if (options.id !== options.id.toLowerCase()) {
    console.error('Error: Country ID must be lowercase.');
    process.exit(1);
  }
  if (options.iso2 !== options.iso2.toUpperCase() || options.iso2.length !== 2) {
    console.error('Error: ISO2 must be a 2-letter uppercase code.');
    process.exit(1);
  }
  if (options.iso3 !== options.iso3.toUpperCase() || options.iso3.length !== 3) {
    console.error('Error: ISO3 must be a 3-letter uppercase code.');
    process.exit(1);
  }

  // Extract from master SVG
  const sourceSvg = await readFile(sourcePath, 'utf8');
  const targetElement = extractElement(sourceSvg, options.id) || extractElement(sourceSvg, options.iso2.toLowerCase());
  if (!targetElement) {
    console.error(`Error: Geometry for country "${options.id}" (iso2: ${options.iso2}) not found in master world map.`);
    process.exit(1);
  }

  // Parse points and polygons
  const polygons = extractPolygons(targetElement);
  if (polygons.length === 0) {
    console.error(`Error: Failed to parse polygon points for geometry of "${options.id}".`);
    process.exit(1);
  }

  // Identify largest polygon (main landmass)
  let largestPolygon = polygons[0];
  let maxArea = 0;
  for (const poly of polygons) {
    const area = getPolygonArea(poly);
    if (area > maxArea) {
      maxArea = area;
      largestPolygon = poly;
    }
  }

  // Filter out tiny islands to compute bbox of major landmasses (area >= 1% of largest)
  const threshold = maxArea * 0.01;
  const majorPolygons = polygons.filter(p => getPolygonArea(p) >= threshold);
  
  // Calculate BBox of major landmasses
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const poly of majorPolygons) {
    const box = getBBox(poly);
    if (box.minX < minX) minX = box.minX;
    if (box.maxX > maxX) maxX = box.maxX;
    if (box.minY < minY) minY = box.minY;
    if (box.maxY > maxY) maxY = box.maxY;
  }
  const unionBBox = { minX, maxX, minY, maxY, w: maxX - minX, h: maxY - minY };

  // Calculate generic crop viewBox centered on centroid
  const interiorPoint = getPointOnSurface(largestPolygon);
  let viewBoxStr = options.viewbox;
  if (!viewBoxStr) {
    const pad = 2.5;
    const crop_w = Math.max(160, Math.min(400, Math.max(unionBBox.w, unionBBox.h * 4 / 3) * pad));
    const crop_h = crop_w * 3 / 4;
    const x_min = Math.round(interiorPoint.x - crop_w / 2);
    const y_min = Math.round(interiorPoint.y - crop_h / 2);
    viewBoxStr = `${x_min} ${y_min} ${Math.round(crop_w)} ${Math.round(crop_h)}`;
  }

  // Calculate outline transformation matrix
  const largestBBox = getBBox(largestPolygon);
  const s = Math.min(220 / largestBBox.w, 170 / largestBBox.h);
  const tx = 180 - s * interiorPoint.x;
  const ty = 130 - s * interiorPoint.y;

  // Calculate map coordinates using linear regression mapping (residuals documented in guide)
  const rx = (interiorPoint.x - MAP_X_MIN) / MAP_WIDTH * 100;
  const ry = (interiorPoint.y - MAP_Y_MIN) / MAP_HEIGHT * 100;
  const portalX = Math.round(X_COEF * rx + X_OFFSET);
  const portalY = Math.round(Y_COEF * ry + Y_OFFSET);

  // Parse custom viewBox for location marker calculation
  const parsedVB = viewBoxStr.split(/\s+/).map(Number);
  const vbX = parsedVB[0], vbY = parsedVB[1], vbW = parsedVB[2], vbH = parsedVB[3];
  const calloutX = Math.round((interiorPoint.x - vbX) / vbW * 100);
  const calloutY = Math.round((interiorPoint.y - vbY) / vbH * 100);

  // Setup theme
  let themePrimary = '#0f766e';
  let themeSecondary = '#0d9488';
  let themeTertiary = '#14b8a6';
  if (options.theme) {
    const parts = options.theme.split(',');
    if (parts[0]) themePrimary = parts[0];
    if (parts[1]) themeSecondary = parts[1];
    if (parts[2]) themeTertiary = parts[2];
  }

  // Load existing configuration for duplicate check & deep serialization check
  const jsContent = await readFile(countriesScript, 'utf8');
  const sandbox = {
    window: {},
    document: { readyState: 'loading', addEventListener() {} }
  };
  runInNewContext(jsContent.replace('window.ValidoHubCountries = Object.freeze({', 'window.ValidoHubCountriesVisualAssets = COUNTRY_VISUAL_ASSETS;\nwindow.ValidoHubCountries = Object.freeze({'), sandbox);
  const oldCatalog = sandbox.window.ValidoHubCountries.portalCatalog;
  const oldHubs = sandbox.window.ValidoHubCountries.hubs;
  const oldVisual = sandbox.window.ValidoHubCountriesVisualAssets;

  // Duplicate checks
  const dupId = oldCatalog.find(c => c.id === options.id);
  const dupIso2 = oldCatalog.find(c => c.iso2 === options.iso2 && c.id !== options.id);
  const dupIso3 = oldCatalog.find(c => c.iso3 === options.iso3 && c.id !== options.id);

  if (dupId) {
    console.error(`Error: Country ID "${options.id}" is already registered.`);
    process.exit(1);
  }
  if (dupIso2) {
    console.error(`Error: Duplicate ISO2 code "${options.iso2}" is already assigned to "${dupIso2.id}".`);
    process.exit(1);
  }
  if (dupIso3) {
    console.error(`Error: Duplicate ISO3 code "${options.iso3}" is already assigned to "${dupIso3.id}".`);
    process.exit(1);
  }

  // Visual outline content
  const cleanElement = targetElement
    .replace(/class="[^"]*"/g, '')
    .replace(/fill="[^"]*"/g, '')
    .replace(/stroke="[^"]*"/g, '');

  const outlineSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 260" role="img" aria-labelledby="title desc">
  <title id="title">${options.name} country outline</title>
  <desc id="desc">${options.name} country outline centered on canvas, derived from Natural Earth public-domain admin-0 geometry.</desc>
  <rect width="360" height="260" rx="24" fill="#f8fafc"/>
  <defs>
    <linearGradient id="${options.id}Land" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#fff5f5"/>
      <stop offset="0.55" stop-color="#ffe4e6"/>
      <stop offset="1" stop-color="#fecdd3"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#881337" flood-opacity="0.10"/>
    </filter>
  </defs>
  <g transform="translate(${tx.toFixed(3)}, ${ty.toFixed(3)}) scale(${s.toFixed(3)})" fill="url(#${options.id}Land)" stroke="${themePrimary}" stroke-width="${(1.5/s).toFixed(3)}" stroke-linejoin="round" filter="url(#softShadow)">
    ${cleanElement}
  </g>
  <circle cx="180" cy="130" r="4" fill="${themePrimary}"/>
  <text x="181" y="238" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="13" font-weight="760" fill="#475569">${options.name}</text>
</svg>`;

  const locationSvg = buildLocationMap(sourceSvg, options.id, viewBoxStr, themePrimary, themeSecondary);

  // Staged updates in memory
  const yamlContent = `schemaVersion: 1
code: ${options.iso2}
slug: ${options.id}
name:
  en: ${options.name}
region: Europe
languages:
  - ${options.id === 'germany' ? 'de' : 'en'}
currency: EUR
relatedCountries:
  - ES
  - BR
`;

  // Inject Visual Asset
  let updatedJs = jsContent;
  const visualAssetsMarker = '  const COUNTRY_VISUAL_ASSETS = {';
  const visualAssetsEndIdx = updatedJs.indexOf(visualAssetsMarker);
  if (visualAssetsEndIdx === -1) {
    console.error('Error: Could not locate COUNTRY_VISUAL_ASSETS in countries.js');
    process.exit(1);
  }
  
  // Find closing brace of COUNTRY_VISUAL_ASSETS
  let visualClosingBraceIdx = updatedJs.indexOf('  };', visualAssetsEndIdx);
  if (visualClosingBraceIdx === -1) {
    console.error('Error: Could not locate end of COUNTRY_VISUAL_ASSETS in countries.js');
    process.exit(1);
  }

  // Visual definition block
  const newVisualBlock = `    ${options.id}: {
      outlineSrc: '/assets/images/countries/${options.id}-outline.svg',
      outlineAlt: '${options.name} country outline',
      mapSrc: '/assets/images/countries/${options.id}-location.svg',
      mapAlt: 'World map with ${options.name} location marker',
      mapMarker: { x: ${calloutX}, y: ${calloutY}, label: '${options.name}' },
      source: 'Natural Earth geometry'
    },
`;

  // Check if target visual asset already exists in config
  const existingVisualKey = `    ${options.id}: {`;
  const existingVisualIdx = updatedJs.indexOf(existingVisualKey, visualAssetsEndIdx);
  if (existingVisualIdx !== -1 && existingVisualIdx < visualClosingBraceIdx) {
    // replace existing
    const nextItemIdx = updatedJs.indexOf('    }', existingVisualIdx);
    updatedJs = updatedJs.slice(0, existingVisualIdx) + newVisualBlock.trimEnd() + updatedJs.slice(nextItemIdx + 5);
  } else {
    // insert new
    // Check if we need to add a comma before inserting
    let lastCharIdx = visualClosingBraceIdx - 1;
    while (lastCharIdx > visualAssetsEndIdx && /\s/.test(updatedJs[lastCharIdx])) {
      lastCharIdx--;
    }
    if (updatedJs[lastCharIdx] === '}' && updatedJs[lastCharIdx - 1] !== ',') {
      updatedJs = updatedJs.slice(0, lastCharIdx + 1) + ',' + updatedJs.slice(lastCharIdx + 1);
      visualClosingBraceIdx++;
    }
    updatedJs = updatedJs.slice(0, visualClosingBraceIdx) + newVisualBlock + updatedJs.slice(visualClosingBraceIdx);
  }

  // Inject Hub entry (using separate properties assignment at the end of COUNTRY_HUBS)
  const newHubBlock = `  COUNTRY_HUBS.${options.id} = {
    flag: '${options.id === 'germany' ? '🇩🇪' : '🏳️'}',
    name: '${options.name}',
    badge: 'Country hub under construction',
    description: 'Developer intelligence for ${options.name} validation, locale conventions, and official systems.',
    metadata: {
      population: 'Placeholder',
      area: 'Placeholder',
      capital: 'Placeholder',
      largestCity: 'Placeholder',
      continent: 'Europe',
      languages: 'Placeholder',
      currency: 'Euro',
      currencyCode: 'EUR',
      currencySymbol: '€',
      locale: 'Placeholder',
      callingCode: 'Placeholder',
      plugTypes: 'Placeholder',
      timeZone: 'Placeholder'
    },
    stats: [
      { label: 'Population', valueKey: 'population' },
      { label: 'Capital', valueKey: 'capital' },
      { label: 'Languages', valueKey: 'languages' },
      { label: 'Currency', valueKey: 'currencyCode' }
    ],
    visualIdentity: {
      heroAccentPrimary: '${themePrimary}',
      heroAccentSecondary: '${themeSecondary}',
      heroAccentTertiary: '${themeTertiary}'
    },
    quickActions: [],
    cheatSheet: [],
    localizationExamples: [],
    addressExample: {
      format: 'Placeholder',
      fields: []
    },
    phoneExamples: [],
    localFormats: [],
    integrationChecklist: [
      { category: 'Validation', name: 'Placeholder', status: 'planned', description: 'Placeholder description.' }
    ],
    validationRules: [],
    commonMistakes: [],
    payments: [],
    bankingOverview: {
      clearingSystems: [],
      formats: []
    },
    officialResources: [],
    plannedWorkbenches: [
      { name: 'Placeholder Workbench', status: 'planned', category: 'General', tags: ['general'], description: 'Placeholder description.' }
    ]
  };\n\n`;

  const catalogMarker = '  const COUNTRY_PORTAL_CATALOG = [';
  const catalogEndIdx = updatedJs.indexOf(catalogMarker);
  if (catalogEndIdx === -1) {
    console.error('Error: Could not locate COUNTRY_PORTAL_CATALOG in countries.js');
    process.exit(1);
  }

  // Check if target hub assignment already exists in config
  const existingHubKey = `  COUNTRY_HUBS.${options.id} = {`;
  const existingHubIdx = updatedJs.indexOf(existingHubKey);
  if (existingHubIdx !== -1) {
    // replace existing
    let braces = 1;
    let scanIdx = existingHubIdx + existingHubKey.length;
    while (braces > 0 && scanIdx < updatedJs.length) {
      if (updatedJs[scanIdx] === '{') braces++;
      else if (updatedJs[scanIdx] === '}') braces--;
      scanIdx++;
    }
    if (updatedJs[scanIdx] === ';') scanIdx++;
    updatedJs = updatedJs.slice(0, existingHubIdx) + newHubBlock + updatedJs.slice(scanIdx);
  } else {
    // insert right before COUNTRY_PORTAL_CATALOG
    updatedJs = updatedJs.slice(0, catalogEndIdx) + newHubBlock + updatedJs.slice(catalogEndIdx);
  }

  // Inject or update Catalog entry
  const finalCatalogEndIdx = updatedJs.indexOf(catalogMarker);
  if (finalCatalogEndIdx === -1) {
    console.error('Error: Could not locate COUNTRY_PORTAL_CATALOG after hub updates.');
    process.exit(1);
  }
  let catalogClosingBracketIdx = updatedJs.indexOf('  ];', finalCatalogEndIdx);
  if (catalogClosingBracketIdx === -1) {
    console.error('Error: Could not locate end of COUNTRY_PORTAL_CATALOG in countries.js');
    process.exit(1);
  }

  const newCatalogBlock = `    {
      id: '${options.id}',
      flag: '${options.id === 'germany' ? '🇩🇪' : '🏳️'}',
      name: '${options.name}',
      iso2: '${options.iso2}',
      iso3: '${options.iso3}',
      continent: 'Europe',
      region: 'Europe',
      language: 'Placeholder',
      currency: 'EUR',
      currencyName: 'Euro',
      status: 'inProgress',
      summary: 'Future hub for ${options.name} validation rules and locale formats.',
      identifiers: [],
      payments: [],
      features: ['payments', 'identity', 'government', 'banking'],
      availableWorkbenches: [],
      plannedWorkbenches: ['Placeholder Workbench'],
      completion: 20,
      coordinates: { x: ${portalX}, y: ${portalY} }
    }`;

  const existingCatalogKey = `id: '${options.id}'`;
  const existingCatalogIdx = updatedJs.indexOf(existingCatalogKey, finalCatalogEndIdx);
  if (existingCatalogIdx !== -1 && existingCatalogIdx < catalogClosingBracketIdx) {
    // Target the specific block containing this id
    let startIdx = updatedJs.lastIndexOf('{', existingCatalogIdx);
    let braces = 1;
    let scanIdx = startIdx + 1;
    while (braces > 0 && scanIdx < updatedJs.length) {
      if (updatedJs[scanIdx] === '{') braces++;
      else if (updatedJs[scanIdx] === '}') braces--;
      scanIdx++;
    }
    updatedJs = updatedJs.slice(0, startIdx) + newCatalogBlock.trim() + updatedJs.slice(scanIdx);
  } else {
    // Append to catalog list
    let lastCatCharIdx = catalogClosingBracketIdx - 1;
    while (lastCatCharIdx > finalCatalogEndIdx && /\s/.test(updatedJs[lastCatCharIdx])) {
      lastCatCharIdx--;
    }
    if (updatedJs[lastCatCharIdx] === '}') {
      updatedJs = updatedJs.slice(0, lastCatCharIdx + 1) + ',\n' + updatedJs.slice(lastCatCharIdx + 1);
      catalogClosingBracketIdx += 2;
    }
    updatedJs = updatedJs.slice(0, catalogClosingBracketIdx) + newCatalogBlock + '\n' + updatedJs.slice(catalogClosingBracketIdx);
  }

  // Assertions (atomic verification before writing files)
  const assertSandbox = {
    window: {},
    document: { readyState: 'loading', addEventListener() {} }
  };
  try {
    runInNewContext(updatedJs.replace('window.ValidoHubCountries = Object.freeze({', 'window.ValidoHubCountriesVisualAssets = COUNTRY_VISUAL_ASSETS;\nwindow.ValidoHubCountries = Object.freeze({'), assertSandbox);
  } catch (err) {
    console.error('Structural Error: Resulting countries.js has syntax errors:', err);
    process.exit(1);
  }

  const newVisual = assertSandbox.window.ValidoHubCountriesVisualAssets;
  const newHubs = assertSandbox.window.ValidoHubCountries.hubs;
  const newCatalog = assertSandbox.window.ValidoHubCountries.portalCatalog;

  // Visual assertions
  const oldVisualKeys = Object.keys(oldVisual);
  const newVisualKeys = Object.keys(newVisual);
  const expectedVisualCount = oldVisualKeys.includes(options.id) ? oldVisualKeys.length : oldVisualKeys.length + 1;
  if (newVisualKeys.length !== expectedVisualCount) {
    console.error(`Structural Assertion Failed: COUNTRY_VISUAL_ASSETS entry count mismatch. Expected: ${expectedVisualCount}, Got: ${newVisualKeys.length}`);
    process.exit(1);
  }

  const oldHubKeys = Object.keys(oldHubs);
  const newHubKeys = Object.keys(newHubs);
  const expectedHubsCount = oldHubKeys.includes(options.id) ? oldHubKeys.length : oldHubKeys.length + 1;
  if (newHubKeys.length !== expectedHubsCount) {
    console.error(`Structural Assertion Failed: COUNTRY_HUBS entry count mismatch. Expected: ${expectedHubsCount}, Got: ${newHubKeys.length}`);
    process.exit(1);
  }

  const expectedCatalogCount = oldCatalog.find(c => c.id === options.id) ? oldCatalog.length : oldCatalog.length + 1;
  if (newCatalog.length !== expectedCatalogCount) {
    console.error(`Structural Assertion Failed: COUNTRY_PORTAL_CATALOG entry count mismatch. Expected: ${expectedCatalogCount}, Got: ${newCatalog.length}`);
    process.exit(1);
  }

  // Spain, Brazil, Poland identical serialization assert
  const targetCheckCountries = ['spain', 'brazil', 'poland'];
  for (const c of targetCheckCountries) {
    if (JSON.stringify(oldHubs[c]) !== JSON.stringify(newHubs[c])) {
      console.error(`Structural Assertion Failed: COUNTRY_HUBS entry for "${c}" has changed.`);
      process.exit(1);
    }
    if (JSON.stringify(oldVisual[c]) !== JSON.stringify(newVisual[c])) {
      console.error(`Structural Assertion Failed: COUNTRY_VISUAL_ASSETS entry for "${c}" has changed.`);
      process.exit(1);
    }
    const oldC = oldCatalog.find(item => item.id === c);
    const newC = newCatalog.find(item => item.id === c);
    if (JSON.stringify(oldC) !== JSON.stringify(newC)) {
      console.error(`Structural Assertion Failed: COUNTRY_PORTAL_CATALOG entry for "${c}" has changed.`);
      process.exit(1);
    }
  }

  // Duplicate checks in new catalog
  const ids = newCatalog.map(c => c.id);
  const iso2s = newCatalog.map(c => c.iso2.toUpperCase());
  const iso3s = newCatalog.map(c => c.iso3.toUpperCase());
  if (new Set(ids).size !== ids.length) {
    console.error('Structural Assertion Failed: Duplicate IDs detected in catalog.');
    process.exit(1);
  }
  if (new Set(iso2s).size !== iso2s.length) {
    console.error('Structural Assertion Failed: Duplicate ISO2 codes detected in catalog.');
    process.exit(1);
  }
  if (new Set(iso3s).size !== iso3s.length) {
    console.error('Structural Assertion Failed: Duplicate ISO3 codes detected in catalog.');
    process.exit(1);
  }

  // Status defaults to inProgress check
  const addedCat = newCatalog.find(c => c.id === options.id);
  if (addedCat.status !== 'inProgress') {
    console.error(`Structural Assertion Failed: Added country status is "${addedCat.status}" instead of "inProgress".`);
    process.exit(1);
  }

  if (options.dryRun) {
    console.log('=== DRY RUN SUCCESSFUL ===');
    console.log('No files have been modified.');
    console.log(`Calculated coordinates for ${options.name}:`);
    console.log(`  Portal Map Coordinates:  { x: ${portalX}, y: ${portalY} }`);
    console.log(`  Location Crop viewBox:    "${viewBoxStr}"`);
    console.log(`  Location Map Callout:     { x: ${calloutX}, y: ${calloutY} }`);
    console.log(`  Outline Scale & Offset:  s: ${s.toFixed(3)}, tx: ${tx.toFixed(3)}, ty: ${ty.toFixed(3)}`);
    console.log('\nProposed Visual Asset Definition:');
    console.log(newVisualBlock.trim());
    console.log('\nProposed Catalog Entry:');
    console.log(newCatalogBlock.trim());
    console.log('\nProposed Hub Code Entry:');
    console.log(newHubBlock.trim());
    console.log('\nProposed YAML definition (countries/' + options.id + '.yaml):');
    console.log(yamlContent.trim());
    process.exit(0);
  }

  // Atomic/Staged writes
  try {
    const yamlPath = resolve(projectRoot, 'countries', `${options.id}.yaml`);
    const outlinePath = resolve(projectRoot, 'assets/images/countries', `${options.id}-outline.svg`);
    const locationPath = resolve(projectRoot, 'assets/images/countries', `${options.id}-location.svg`);

    await writeFile(yamlPath, yamlContent, 'utf8');
    await writeFile(outlinePath, outlineSvg, 'utf8');
    await writeFile(locationPath, locationSvg, 'utf8');
    await writeFile(countriesScript, updatedJs, 'utf8');

    // Verify written assets exist
    if (!await pathExists(yamlPath)) throw new Error(`YAML asset not created at ${yamlPath}`);
    if (!await pathExists(outlinePath)) throw new Error(`Outline SVG not created at ${outlinePath}`);
    if (!await pathExists(locationPath)) throw new Error(`Location SVG not created at ${locationPath}`);

    console.log(`Successfully scaffolded Country Hub for ${options.name}!`);
    console.log(`- Created countries/${options.id}.yaml`);
    console.log(`- Created assets/images/countries/${options.id}-outline.svg`);
    console.log(`- Created assets/images/countries/${options.id}-location.svg`);
    console.log('- Updated assets/js/countries.js');
  } catch (err) {
    console.error('Error during staged writes:', err);
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
