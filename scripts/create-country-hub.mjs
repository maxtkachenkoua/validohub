#!/usr/bin/env node

import { readFile, writeFile, access, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { extractElement, buildLocationMap } from './generate-maps.mjs';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const sourcePath = resolve(projectRoot, 'assets/images/countries/world-map-source.svg');
const dataDir = resolve(projectRoot, 'countries/data');

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
ValidoHub Country Hub Scaffolder V1 (Platform V2 Decoupled Data Edition)

Usage:
  node scripts/create-country-hub.mjs [options]

Options:
  --id <id>            Unique lowercase country ID (e.g. italy) [Required]
  --name <name>        Country display name (e.g. Italy) [Required]
  --iso2 <iso2>        ISO 3166-1 alpha-2 code (e.g. IT) [Required]
  --iso3 <iso3>        ISO 3166-1 alpha-3 code (e.g. ITA) [Required]
  --viewbox <crop>     Custom viewBox override for location SVG (e.g. "380 340 160 120") [Optional]
  --theme <colors>     Flag accent colors as comma-separated hex values (primary,secondary,tertiary) [Optional]
  --capital <coords>   Raw SVG coordinates for the capital/marker (e.g. "435.833,388.684") [Optional]
  --portal-marker <xy> Custom portal map coordinates (e.g. "50,35") [Optional]
  --dry-run            Run validations and print proposed changes without writing files
  --help               Show this help screen
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
    } else if (arg === '--capital') {
      options.capital = args[++i];
    } else if (arg === '--portal-marker') {
      options.portalMarker = args[++i];
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

function formatRgbAccent(color) {
  if (color.startsWith('#')) {
    const cleanHex = color.substring(1);
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `${r} ${g} ${b}`;
  }
  return color;
}

function lightenColor(color, factor = 0.90) {
  if (!color.startsWith('#')) return color;
  const cleanHex = color.substring(1);
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  const rSoft = Math.round(r * (1 - factor) + 255 * factor);
  const gSoft = Math.round(g * (1 - factor) + 255 * factor);
  const bSoft = Math.round(b * (1 - factor) + 255 * factor);

  return '#' + [rSoft, gSoft, bSoft].map(x => x.toString(16).padStart(2, '0')).join('');
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

  // Parse capital coords if provided
  let capitalPoint = interiorPoint;
  if (options.capital) {
    const parts = options.capital.split(',').map(Number);
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      capitalPoint = { x: parts[0], y: parts[1] };
    } else {
      console.error('Error: Invalid format for --capital. Expected x,y (e.g. "435.833,388.684")');
      process.exit(1);
    }
  }

  let viewBoxStr = options.viewbox;
  if (!viewBoxStr) {
    const pad = 2.5;
    const crop_w = Math.max(160, Math.min(400, Math.max(unionBBox.w, unionBBox.h * 4 / 3) * pad));
    const crop_h = crop_w * 3 / 4;
    const x_min = Math.round(capitalPoint.x - crop_w / 2);
    const y_min = Math.round(capitalPoint.y - crop_h / 2);
    viewBoxStr = `${x_min} ${y_min} ${Math.round(crop_w)} ${Math.round(crop_h)}`;
  }

  // Calculate outline transformation matrix
  const largestBBox = getBBox(largestPolygon);
  const s = Math.min(220 / largestBBox.w, 170 / largestBBox.h);
  const tx = 180 - s * capitalPoint.x;
  const ty = 130 - s * capitalPoint.y;

  // Calculate map coordinates using linear regression mapping (residuals documented in guide)
  let portalX, portalY;
  if (options.portalMarker) {
    const parts = options.portalMarker.split(',').map(Number);
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      portalX = parts[0];
      portalY = parts[1];
    } else {
      console.error('Error: Invalid format for --portal-marker. Expected x,y (e.g. "50,35")');
      process.exit(1);
    }
  } else {
    const rx = (capitalPoint.x - MAP_X_MIN) / MAP_WIDTH * 100;
    const ry = (capitalPoint.y - MAP_Y_MIN) / MAP_HEIGHT * 100;
    portalX = Math.round(X_COEF * rx + X_OFFSET);
    portalY = Math.round(Y_COEF * ry + Y_OFFSET);
  }

  // Parse custom viewBox for location marker calculation
  const parsedVB = viewBoxStr.split(/\s+/).map(Number);
  const vbX = parsedVB[0], vbY = parsedVB[1], vbW = parsedVB[2], vbH = parsedVB[3];
  const calloutX = Math.round((capitalPoint.x - vbX) / vbW * 100);
  const calloutY = Math.round((capitalPoint.y - vbY) / vbH * 100);

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

  const rgbPrimary = formatRgbAccent(themePrimary);
  const rgbSecondary = formatRgbAccent(themeSecondary);
  const rgbTertiary = formatRgbAccent(themeTertiary);

  const stop0 = lightenColor(themePrimary, 0.93);
  const stop55 = lightenColor(themeSecondary, 0.92);
  const stop100 = lightenColor(themeTertiary, 0.90);
  const shadowColor = themeSecondary;

  // Duplicate checks in decoupled JSON files
  const files = await readdir(dataDir);
  const jsonFiles = files.filter(f => f.endsWith('.json') && f !== 'schema.json');
  const existingCountries = [];
  for (const file of jsonFiles) {
    const content = await readFile(resolve(dataDir, file), 'utf8');
    existingCountries.push(JSON.parse(content));
  }

  const dupId = existingCountries.find(c => c.id === options.id);
  const dupIso2 = existingCountries.find(c => c.catalog.iso2 === options.iso2 && c.id !== options.id);
  const dupIso3 = existingCountries.find(c => c.catalog.iso3 === options.iso3 && c.id !== options.id);

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
      <stop offset="0" stop-color="${stop0}"/>
      <stop offset="0.55" stop-color="${stop55}"/>
      <stop offset="1" stop-color="${stop100}"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="${shadowColor}" flood-opacity="0.10"/>
    </filter>
  </defs>
  <g transform="translate(${tx.toFixed(3)}, ${ty.toFixed(3)}) scale(${s.toFixed(3)})" fill="url(#${options.id}Land)" stroke="${themePrimary}" stroke-width="${(1.5/s).toFixed(3)}" stroke-linejoin="round" filter="url(#softShadow)">
    ${cleanElement}
  </g>
  <circle cx="180" cy="130" r="4" fill="${themePrimary}"/>
  <text x="181" y="238" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="13" font-weight="760" fill="#475569">${options.name}</text>
</svg>`;

  const locationSvg = buildLocationMap(sourceSvg, options.id, viewBoxStr, themePrimary, themeSecondary);

  // Decoupled Country Data Document
  const countryData = {
    id: options.id,
    visualAssets: {
      outlineSrc: `/assets/images/countries/${options.id}-outline.svg`,
      outlineAlt: `${options.name} country outline`,
      mapSrc: `/assets/images/countries/${options.id}-location.svg`,
      mapAlt: `World map with ${options.name} location marker`,
      mapMarker: { x: calloutX, y: calloutY, label: options.name },
      source: 'Natural Earth geometry'
    },
    catalog: {
      id: options.id,
      flag: options.id === 'germany' ? '🇩🇪' : '🏳️',
      name: options.name,
      iso2: options.iso2,
      iso3: options.iso3,
      continent: 'Europe',
      region: 'Europe',
      language: 'Placeholder',
      currency: 'EUR',
      currencyName: 'Euro',
      status: 'inProgress',
      summary: `Future hub for ${options.name} validation rules and locale formats.`,
      identifiers: [],
      payments: [],
      features: ['payments', 'identity', 'government', 'banking'],
      availableWorkbenches: [],
      plannedWorkbenches: ['Placeholder Workbench'],
      completion: 20,
      coordinates: { x: portalX, y: portalY }
    },
    hub: {
      flag: options.id === 'germany' ? '🇩🇪' : '🏳️',
      name: options.name,
      badge: 'Country hub under construction',
      description: `Developer intelligence for ${options.name} validation, locale conventions, and official systems.`,
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
        countryId: options.id,
        outlineLabel: `${options.name} outline`,
        mapLabel: `${options.name} in the world`,
        continentBadge: 'Europe',
        flagLabel: `${options.name} flag`,
        heroAccentPrimary: rgbPrimary,
        heroAccentSecondary: rgbSecondary,
        heroAccentTertiary: rgbTertiary
      },
      quickActions: [],
      cheatSheet: [],
      localizationExamples: [],
      addressExample: {
        formatted: [],
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
      bankingOverview: [],
      officialResources: [],
      plannedWorkbenches: [
        { name: 'Placeholder Workbench', status: 'planned', category: 'General', tags: ['general'], description: 'Placeholder description.' }
      ]
    }
  };

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

  if (options.dryRun) {
    console.log('=== DRY RUN SUCCESSFUL ===');
    console.log('No files have been modified.');
    console.log(`Calculated coordinates for ${options.name}:`);
    console.log(`  Portal Map Coordinates:  { x: ${portalX}, y: ${portalY} }`);
    console.log(`  Location Crop viewBox:    "${viewBoxStr}"`);
    console.log(`  Location Map Callout:     { x: ${calloutX}, y: ${calloutY} }`);
    console.log(`  Outline Scale & Offset:  s: ${s.toFixed(3)}, tx: ${tx.toFixed(3)}, ty: ${ty.toFixed(3)}`);
    console.log('\nProposed JSON Data Payload (countries/data/' + options.id + '.json):');
    console.log(JSON.stringify(countryData, null, 2));
    process.exit(0);
  }

  // Atomic/Staged writes
  try {
    const yamlPath = resolve(projectRoot, 'countries', `${options.id}.yaml`);
    const outlinePath = resolve(projectRoot, 'assets/images/countries', `${options.id}-outline.svg`);
    const locationPath = resolve(projectRoot, 'assets/images/countries', `${options.id}-location.svg`);
    const jsonPath = resolve(dataDir, `${options.id}.json`);
    const entityPath = resolve(projectRoot, 'knowledge/entities/country', `${options.id}.json`);

    const entityData = {
      id: `country:${options.id}`,
      type: 'country',
      name: options.name,
      shortDefinition: '',
      aliases: [],
      stableReferences: []
    };

    await writeFile(yamlPath, yamlContent, 'utf8');
    await writeFile(outlinePath, outlineSvg, 'utf8');
    await writeFile(locationPath, locationSvg, 'utf8');
    await writeFile(jsonPath, JSON.stringify(countryData, null, 2) + '\n', 'utf8');
    await writeFile(entityPath, JSON.stringify(entityData, null, 2) + '\n', 'utf8');

    // Run compile-countries-registry compiler to update assets/js/countries.js
    console.log('Running compile-countries-registry.mjs...');
    execSync('node scripts/compile-countries-registry.mjs', { cwd: projectRoot, stdio: 'inherit' });

    console.log(`Successfully scaffolded Country Hub for ${options.name}!`);
    console.log(`- Created countries/${options.id}.yaml`);
    console.log(`- Created assets/images/countries/${options.id}-outline.svg`);
    console.log(`- Created assets/images/countries/${options.id}-location.svg`);
    console.log(`- Created countries/data/${options.id}.json`);
    console.log(`- Created knowledge/entities/country/${options.id}.json`);
    console.log('- Recompiled assets/js/countries.js');
  } catch (err) {
    console.error('Error during staged writes:', err);
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
