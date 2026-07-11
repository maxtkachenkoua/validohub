import { readFile, writeFile } from 'node:fs/promises';
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

  console.log('Map generation completed successfully.');
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
  const body = source.slice(bodyStart, bodyEnd);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="30.767 241.591 784.077 458.627" role="img" aria-labelledby="title desc">
  <title id="title">World map</title>
  <desc id="desc">Web-optimized real-geography world map based on Natural Earth data.</desc>
  <style>
    path {
      fill: #cbd5e1;
      stroke: #ffffff;
      stroke-width: 0.6;
      stroke-linejoin: round;
      transition: fill 150ms ease;
    }
    path:hover {
      fill: #94a3b8;
    }
  </style>
  ${body}
</svg>`;
}

function buildLocationMap(source, activeId, viewBox, fillColor, strokeColor) {
  const bodyStart = source.indexOf('<g>');
  const bodyEnd = source.lastIndexOf('</svg>');
  const body = source.slice(bodyStart, bodyEnd);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-labelledby="title desc">
  <title id="title">Location Map</title>
  <desc id="desc">Web-optimized real-geography location map focused and highlighted.</desc>
  <style>
    path {
      fill: #cbd5e1;
      stroke: #ffffff;
      stroke-width: 0.6;
      stroke-linejoin: round;
    }
    #${activeId} path, path#${activeId} {
      fill: ${fillColor};
      stroke: ${strokeColor};
      stroke-width: 0.8;
    }
  </style>
  ${body}
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

export { extractElement, buildLocationMap, buildWorldMap };

const isMain = process.argv[1] && (resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url)));
if (isMain) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

