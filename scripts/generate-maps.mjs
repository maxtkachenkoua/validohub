import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const sourcePath = resolve(projectRoot, 'assets/images/countries/world-map-source.svg');

async function main() {
  console.log(`Loading master geographic source from: ${sourcePath}`);
  const sourceSvg = await readFile(sourcePath, 'utf8');

  // 1. Extract paths and groups
  const esElement = extractElement(sourceSvg, 'es');
  const brElement = extractElement(sourceSvg, 'br');
  const plElement = extractElement(sourceSvg, 'pl');

  if (!esElement || !brElement || !plElement) {
    throw new Error('Failed to extract Spain, Brazil, or Poland geometries from the master SVG source.');
  }

  // 2. Generate clean, styled world-map.svg
  const worldMapSvg = buildWorldMap(sourceSvg);
  await writeFile(resolve(projectRoot, 'assets/images/countries/world-map.svg'), worldMapSvg, 'utf8');
  console.log('Generated: world-map.svg');

  // 3. Generate spain-location.svg
  const spainLocationSvg = buildLocationMap(sourceSvg, 'es', '320 330 200 150', '#b91c1c', '#991b1b');
  await writeFile(resolve(projectRoot, 'assets/images/countries/spain-location.svg'), spainLocationSvg, 'utf8');
  console.log('Generated: spain-location.svg');

  // 4. Generate brazil-location.svg
  const brazilLocationSvg = buildLocationMap(sourceSvg, 'br', '190 470 160 170', '#15803d', '#166534');
  await writeFile(resolve(projectRoot, 'assets/images/countries/brazil-location.svg'), brazilLocationSvg, 'utf8');
  console.log('Generated: brazil-location.svg');

  // 4b. Generate poland-location.svg
  const polandLocationSvg = buildLocationMap(sourceSvg, 'pl', '380 340 160 120', '#b91c1c', '#991b1b');
  await writeFile(resolve(projectRoot, 'assets/images/countries/poland-location.svg'), polandLocationSvg, 'utf8');
  console.log('Generated: poland-location.svg');

  // 5. Generate spain-outline.svg
  const spainOutlineSvg = buildSpainOutline(esElement);
  await writeFile(resolve(projectRoot, 'assets/images/countries/spain-outline.svg'), spainOutlineSvg, 'utf8');
  console.log('Generated: spain-outline.svg');

  // 6. Generate brazil-outline.svg
  const brazilOutlineSvg = buildBrazilOutline(brElement);
  await writeFile(resolve(projectRoot, 'assets/images/countries/brazil-outline.svg'), brazilOutlineSvg, 'utf8');
  console.log('Generated: brazil-outline.svg');

  // 6b. Generate poland-outline.svg
  const polandOutlineSvg = buildPolandOutline(plElement);
  await writeFile(resolve(projectRoot, 'assets/images/countries/poland-outline.svg'), polandOutlineSvg, 'utf8');
  console.log('Generated: poland-outline.svg');

  await generatePremiumCountryVisuals();

  console.log('Map generation completed successfully.');
}

async function generatePremiumCountryVisuals() {
  console.log(`Loading master geographic source from: ${sourcePath}`);
  const sourceSvg = await readFile(sourcePath, 'utf8');
  const countriesDir = resolve(projectRoot, 'countries', 'data');
  const files = (await readdir(countriesDir)).filter(file => file.endsWith('.json') && file !== 'schema.json').sort();
  let generated = 0;
  const skipped = [];

  for (const file of files) {
    const data = JSON.parse(await readFile(resolve(countriesDir, file), 'utf8'));
    if (!data?.catalog || !data?.hub) continue;
    const slug = data.id;
    const iso2 = String(data.catalog.iso2 || data.hub?.metadata?.iso2 || '').toLowerCase();
    const countryId = WORLD_MAP_ID_BY_SLUG[slug] || iso2;
    const element = extractElement(sourceSvg, countryId);
    if (!element) {
      skipped.push(`${slug}:${countryId}`);
      continue;
    }

    const colors = countryVisualColors(data);
    const name = data.catalog.name || data.hub.name || slug;
    const outlineSvg = buildPremiumOutline({ element, name, id: countryId, colors });
    const locationSvg = buildPremiumLocation({ sourceSvg, name, id: countryId, colors });
    await writeFile(resolve(projectRoot, 'assets', 'images', 'countries', `${slug}-outline.svg`), outlineSvg, 'utf8');
    await writeFile(resolve(projectRoot, 'assets', 'images', 'countries', `${slug}-location.svg`), locationSvg, 'utf8');
    generated += 1;
  }

  console.log(`Generated premium country visuals: ${generated}`);
  if (skipped.length) {
    console.warn(`Skipped missing geometries: ${skipped.join(', ')}`);
  }
}

const WORLD_MAP_ID_BY_SLUG = {
  czechia: 'cz',
  'united-kingdom': 'gb'
};

function countryVisualColors(data) {
  const identity = data.hub?.visualIdentity || {};
  const primary = rgbTripletToHex(identity.heroAccentPrimary) || '#15803d';
  const secondary = rgbTripletToHex(identity.heroAccentSecondary) || lightenHex(primary, 0.86);
  const tertiary = rgbTripletToHex(identity.heroAccentTertiary) || darkenHex(primary, 0.16);
  return {
    primary,
    secondary,
    tertiary,
    landStart: mixHex(primary, '#ffffff', 0.86),
    landMid: mixHex(secondary, '#ffffff', 0.78),
    landEnd: mixHex(tertiary, '#ffffff', 0.72),
    shadow: darkenHex(primary, 0.28)
  };
}

function rgbTripletToHex(value) {
  const parts = String(value || '').trim().split(/\s+/).map(Number);
  if (parts.length !== 3 || parts.some(part => !Number.isFinite(part))) return '';
  return '#' + parts.map(part => Math.max(0, Math.min(255, Math.round(part))).toString(16).padStart(2, '0')).join('');
}

function mixHex(a, b, amount) {
  const ca = parseHex(a);
  const cb = parseHex(b);
  const t = Math.max(0, Math.min(1, amount));
  return toHex([
    ca[0] * (1 - t) + cb[0] * t,
    ca[1] * (1 - t) + cb[1] * t,
    ca[2] * (1 - t) + cb[2] * t
  ]);
}

function lightenHex(hex, amount) {
  return mixHex(hex, '#ffffff', amount);
}

function darkenHex(hex, amount) {
  return mixHex(hex, '#000000', amount);
}

function parseHex(hex) {
  const clean = String(hex || '#000000').replace('#', '');
  return [0, 2, 4].map(index => parseInt(clean.slice(index, index + 2), 16) || 0);
}

function toHex(parts) {
  return '#' + parts.map(part => Math.max(0, Math.min(255, Math.round(part))).toString(16).padStart(2, '0')).join('');
}

function cleanGeometryElement(element) {
  return element
    .replace(/class="[^"]*"/g, '')
    .replace(/fill="[^"]*"/g, '')
    .replace(/stroke="[^"]*"/g, '')
    .replace(/style="[^"]*"/g, '');
}

function geometryBBox(element) {
  const values = [];
  for (const match of element.matchAll(/\sd="([^"]+)"/g)) {
    const nums = [...match[1].matchAll(/-?\d+(?:\.\d+)?/g)].map(item => Number(item[0]));
    for (let i = 0; i < nums.length - 1; i += 2) {
      values.push([nums[i], nums[i + 1]]);
    }
  }
  if (!values.length) {
    return { minX: 0, minY: 0, maxX: 1, maxY: 1, width: 1, height: 1 };
  }
  const xs = values.map(pair => pair[0]);
  const ys = values.map(pair => pair[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  return { minX, minY, maxX, maxY, width: Math.max(1, maxX - minX), height: Math.max(1, maxY - minY) };
}

function outlineTransform(element) {
  const box = geometryBBox(element);
  const width = 360;
  const height = 260;
  const padding = 42;
  const scale = Math.min((width - padding * 2) / box.width, (height - padding * 2) / box.height);
  const tx = (width - box.width * scale) / 2 - box.minX * scale;
  const ty = (height - box.height * scale) / 2 - box.minY * scale;
  return { tx, ty, scale, stroke: Math.max(0.32, 1.7 / scale) };
}

function locationViewBox(element) {
  const box = geometryBBox(element);
  const marginX = Math.max(90, box.width * 1.4);
  const marginY = Math.max(70, box.height * 1.5);
  const width = Math.max(150, box.width + marginX * 2);
  const height = Math.max(120, box.height + marginY * 2);
  return [
    (box.minX + box.maxX) / 2 - width / 2,
    (box.minY + box.maxY) / 2 - height / 2,
    width,
    height
  ].map(value => Number(value.toFixed(3))).join(' ');
}

function gradientId(name, suffix) {
  return `${String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${suffix}`;
}

function buildPremiumOutline({ element, name, colors }) {
  const cleanElement = cleanGeometryElement(element);
  const transform = outlineTransform(element);
  const landId = gradientId(name, 'land');
  const shadowId = gradientId(name, 'shadow');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 260" role="img" aria-labelledby="title desc">
  <title id="title">${name} country outline</title>
  <desc id="desc">${name} country outline centered on canvas, derived from Natural Earth public-domain admin-0 geometry.</desc>
  <rect width="360" height="260" rx="24" fill="#f8fafc"/>
  <defs>
    <linearGradient id="${landId}" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="${colors.landStart}"/>
      <stop offset="0.55" stop-color="${colors.landMid}"/>
      <stop offset="1" stop-color="${colors.landEnd}"/>
    </linearGradient>
    <filter id="${shadowId}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="${colors.shadow}" flood-opacity="0.12"/>
    </filter>
  </defs>
  <g transform="translate(${transform.tx.toFixed(3)}, ${transform.ty.toFixed(3)}) scale(${transform.scale.toFixed(6)})" fill="url(#${landId})" stroke="${colors.primary}" stroke-width="${transform.stroke.toFixed(3)}" stroke-linejoin="round" filter="url(#${shadowId})">
    ${cleanElement}
  </g>
  <g fill="none" stroke="${colors.tertiary}" stroke-width="1.1" opacity="0.18">
    <path d="M94 112 C130 98 172 104 214 94 C238 89 260 98 279 116"/>
    <path d="M112 145 C148 132 188 136 224 126 C242 121 260 126 274 139"/>
  </g>
  <circle cx="180" cy="132" r="4" fill="${colors.shadow}"/>
  <text x="181" y="238" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="13" font-weight="760" fill="#475569">${name}</text>
</svg>`;
}

function buildPremiumLocation({ sourceSvg, name, id, colors }) {
  const activeElement = extractElement(sourceSvg, id);
  const bodyStart = sourceSvg.indexOf('<g>');
  const bodyEnd = sourceSvg.lastIndexOf('</svg>');
  const body = paintActiveMapElement(stripSvgPaintAttributes(sourceSvg.slice(bodyStart, bodyEnd)), id, {
    fill: colors.primary,
    stroke: colors.tertiary,
    strokeWidth: '0.9',
  });
  const viewBox = locationViewBox(activeElement);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-labelledby="title desc">
  <title id="title">${name} location map</title>
  <desc id="desc">Web-optimized real-geography location map focused on ${name}.</desc>
  <g fill="#cbd5e1" stroke="#ffffff" stroke-width="0.6" stroke-linejoin="round">
    ${body}
  </g>
</svg>`;
}

function stripSvgPaintAttributes(svg) {
  return svg
    .replace(/\sclass="mainland"/g, '')
    .replace(/\sfill="[^"]*"/g, '')
    .replace(/\sstroke="[^"]*"/g, '')
    .replace(/\sstroke-width="[^"]*"/g, '')
    .replace(/\sstroke-linejoin="[^"]*"/g, '');
}

function paintActiveMapElement(svg, id, { fill, stroke, strokeWidth }) {
  const paintAttrs = `fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linejoin="round"`;
  return svg
    .replace(new RegExp(`<path\\s+id="${id}"\\s+`, 'g'), `<path id="${id}" ${paintAttrs} `)
    .replace(new RegExp(`<path\\s+d="([^"]+)"\\s+id="${id}"\\s*/>`, 'g'), `<path d="$1" id="${id}" ${paintAttrs}/>`)
    .replace(new RegExp(`<path\\s+d="([^"]+)"\\s+id="${id}"\\s*>`, 'g'), `<path d="$1" id="${id}" ${paintAttrs}>`)
    .replace(new RegExp(`<g\\s+id="${id}"\\s*>`, 'g'), `<g id="${id}" ${paintAttrs}>`);
}

function extractElement(svg, id) {
  // Extract path with id
  const pathMatch = svg.match(new RegExp(`<path\\s+id="${id}"\\s+d="[^"]+"\\s*\\/>|<path\\s+d="[^"]+"\\s+id="${id}"\\s*\\/>|<path\\s+id="${id}"\\s+d="[^"]+"\\s*><\\/path>`));
  if (pathMatch) return pathMatch[0];

  // Extract group with id
  const groupMatch = svg.match(new RegExp(`<g\\s+id="${id}"([\\s\\S]*?)<\\/g>`));
  if (groupMatch) return groupMatch[0];

  return null;
}

function buildWorldMap(source) {
  // Extract inner contents of master map (between first <g> and </svg>)
  const bodyStart = source.indexOf('<g>');
  const bodyEnd = source.lastIndexOf('</svg>');
  const body = stripSvgPaintAttributes(source.slice(bodyStart, bodyEnd));

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="30.767 241.591 784.077 458.627" role="img" aria-labelledby="title desc">
  <title id="title">World map</title>
  <desc id="desc">Web-optimized real-geography world map based on Natural Earth data.</desc>
  <g fill="#cbd5e1" stroke="#ffffff" stroke-width="0.6" stroke-linejoin="round">
    ${body}
  </g>
</svg>`;
}

function buildLocationMap(source, activeId, viewBox, fillColor, strokeColor) {
  const bodyStart = source.indexOf('<g>');
  const bodyEnd = source.lastIndexOf('</svg>');
  const body = paintActiveMapElement(stripSvgPaintAttributes(source.slice(bodyStart, bodyEnd)), activeId, {
    fill: fillColor,
    stroke: strokeColor,
    strokeWidth: '0.8',
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-labelledby="title desc">
  <title id="title">Location Map</title>
  <desc id="desc">Web-optimized real-geography location map focused and highlighted.</desc>
  <g fill="#cbd5e1" stroke="#ffffff" stroke-width="0.6" stroke-linejoin="round">
    ${body}
  </g>
</svg>`;
}

function buildSpainOutline(esElement) {
  // Clean Spain element from existing classes/styles
  const cleanEs = esElement
    .replace(/class="mainland"/g, '')
    .replace(/fill="[^"]+"/g, '')
    .replace(/stroke="[^"]+"/g, '');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 260" role="img" aria-labelledby="title desc">
  <title id="title">Spain country outline</title>
  <desc id="desc">Spain country outline centered on canvas, derived from Natural Earth public-domain admin-0 geometry.</desc>
  <rect width="360" height="260" rx="24" fill="#f8fafc"/>
  <defs>
    <linearGradient id="spainLand" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#fff7ed"/>
      <stop offset="0.55" stop-color="#fdecc8"/>
      <stop offset="1" stop-color="#f4d2b5"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#7f1d1d" flood-opacity="0.10"/>
    </filter>
  </defs>
  <g transform="translate(-1284.901, -1517.590) scale(3.762)" fill="url(#spainLand)" stroke="#9f3a2c" stroke-width="1.0" stroke-linejoin="round" filter="url(#softShadow)">
    ${cleanEs}
  </g>
  <g fill="none" stroke="#c2410c" stroke-width="1.1" opacity="0.20">
    <path d="M94 112 C130 98 172 104 214 94 C238 89 260 98 279 116"/>
    <path d="M112 145 C148 132 188 136 224 126 C242 121 260 126 274 139"/>
  </g>
  <circle cx="182" cy="122" r="4" fill="#991b1b"/>
  <text x="181" y="238" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="13" font-weight="760" fill="#475569">Spain</text>
</svg>`;
}

function buildBrazilOutline(brElement) {
  // Clean Brazil element
  const cleanBr = brElement
    .replace(/class="mainland"/g, '')
    .replace(/fill="[^"]+"/g, '')
    .replace(/stroke="[^"]+"/g, '');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 260" role="img" aria-labelledby="title desc">
  <title id="title">Brazil country outline</title>
  <desc id="desc">Brazil country outline centered on canvas, derived from Natural Earth public-domain admin-0 geometry.</desc>
  <rect width="360" height="260" rx="24" fill="#f8fafc"/>
  <defs>
    <linearGradient id="brazilLand" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#f0fdf4"/>
      <stop offset="0.55" stop-color="#dcfce7"/>
      <stop offset="1" stop-color="#bbf7d0"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#14532d" flood-opacity="0.10"/>
    </filter>
  </defs>
  <g transform="translate(-295.520, -854.310) scale(1.729)" fill="url(#brazilLand)" stroke="#15803d" stroke-width="2.1" stroke-linejoin="round" filter="url(#softShadow)">
    ${cleanBr}
  </g>
  <g fill="none" stroke="#16a34a" stroke-width="1.1" opacity="0.20">
    <path d="M94 112 C130 98 172 104 214 94 C238 89 260 98 279 116"/>
    <path d="M112 145 C148 132 188 136 224 126 C242 121 260 126 274 139"/>
  </g>
  <circle cx="192" cy="142" r="4" fill="#14532d"/>
  <text x="181" y="238" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="13" font-weight="760" fill="#475569">Brazil</text>
</svg>`;
}

function buildPolandOutline(plElement) {
  // Clean Poland element
  const cleanPl = plElement
    .replace(/class="mainland"/g, '')
    .replace(/fill="[^"]+"/g, '')
    .replace(/stroke="[^"]+"/g, '');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 260" role="img" aria-labelledby="title desc">
  <title id="title">Poland country outline</title>
  <desc id="desc">Poland country outline centered on canvas, derived from Natural Earth public-domain admin-0 geometry.</desc>
  <rect width="360" height="260" rx="24" fill="#f8fafc"/>
  <defs>
    <linearGradient id="polandLand" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#fff5f5"/>
      <stop offset="0.55" stop-color="#ffe4e6"/>
      <stop offset="1" stop-color="#fecdd3"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#881337" flood-opacity="0.10"/>
    </filter>
  </defs>
  <g transform="translate(-4018.228, -3513.293) scale(9.373)" fill="url(#polandLand)" stroke="#be123c" stroke-width="0.4" stroke-linejoin="round" filter="url(#softShadow)">
    ${cleanPl}
  </g>
  <g fill="none" stroke="#e11d48" stroke-width="1.1" opacity="0.20">
    <path d="M94 112 C130 98 172 104 214 94 C238 89 260 98 279 116"/>
    <path d="M112 145 C148 132 188 136 224 126 C242 121 260 126 274 139"/>
  </g>
  <circle cx="180" cy="130" r="4" fill="#be123c"/>
  <text x="181" y="238" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="13" font-weight="760" fill="#475569">Poland</text>
</svg>`;
}

export { extractElement, buildLocationMap, buildWorldMap, generatePremiumCountryVisuals };

const isMain = process.argv[1] && (resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url)));
if (isMain) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
