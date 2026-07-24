import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const sourcePath = resolve(projectRoot, 'assets/images/countries/world-map-source.svg');
const outputDir = resolve(projectRoot, 'validohub_country_maps');
const targetZip = '/Users/maxtkachenko/.gemini/antigravity/brain/c2283cf8-020a-4027-aa8a-e0d3212703e9/validohub_country_maps.zip';

// ISO-2 to Name Map
const COUNTRY_NAMES = {
  af: 'Afghanistan', al: 'Albania', dz: 'Algeria', ad: 'Andorra', ao: 'Angola', ag: 'Antigua and Barbuda',
  ar: 'Argentina', am: 'Armenia', au: 'Australia', at: 'Austria', az: 'Azerbaijan', bs: 'Bahamas',
  bh: 'Bahrain', bd: 'Bangladesh', bb: 'Barbados', by: 'Belarus', be: 'Belgium', bz: 'Belize',
  bj: 'Benin', bt: 'Bhutan', bo: 'Bolivia', ba: 'Bosnia and Herzegovina', bw: 'Botswana', br: 'Brazil',
  bn: 'Brunei', bg: 'Bulgaria', bf: 'Burkina Faso', bi: 'Burundi', kh: 'Cambodia', cm: 'Cameroon',
  ca: 'Canada', cv: 'Cape Verde', cf: 'Central African Republic', td: 'Chad', cl: 'Chile', cn: 'China',
  co: 'Colombia', km: 'Comoros', cg: 'Congo', cd: 'DR Congo', cr: 'Costa Rica', hr: 'Croatia',
  cu: 'Cuba', cy: 'Cyprus', cz: 'Czechia', dk: 'Denmark', dj: 'Djibouti', dm: 'Dominica',
  do: 'Dominican Republic', ec: 'Ecuador', eg: 'Egypt', sv: 'El Salvador', gq: 'Equatorial Guinea',
  er: 'Eritrea', ee: 'Estonia', et: 'Ethiopia', fj: 'Fiji', fi: 'Finland', fr: 'France',
  ga: 'Gabon', gm: 'Gambia', ge: 'Georgia', de: 'Germany', gh: 'Ghana', gr: 'Greece',
  gd: 'Grenada', gt: 'Guatemala', gn: 'Guinea', gw: 'Guinea-Bissau', gy: 'Guyana', ht: 'Haiti',
  hn: 'Honduras', hu: 'Hungary', is: 'Iceland', in: 'India', id: 'Indonesia', ir: 'Iran',
  iq: 'Iraq', ie: 'Ireland', il: 'Israel', it: 'Italy', ci: 'Ivory Coast', jm: 'Jamaica',
  jp: 'Japan', jo: 'Jordan', kz: 'Kazakhstan', ke: 'Kenya', ki: 'Kiribati', kp: 'North Korea',
  kr: 'South Korea', kw: 'Kuwait', kg: 'Kyrgyzstan', la: 'Laos', lv: 'Latvia', lb: 'Lebanon',
  ls: 'Lesotho', lr: 'Liberia', ly: 'Libya', li: 'Liechtenstein', lt: 'Lithuania', lu: 'Luxembourg',
  mk: 'North Macedonia', mg: 'Madagascar', mw: 'Malawi', my: 'Malaysia', mv: 'Maldives', ml: 'Mali',
  mt: 'Malta', mh: 'Marshall Islands', mr: 'Mauritania', mu: 'Mauritius', mx: 'Mexico', fm: 'Micronesia',
  md: 'Moldova', mc: 'Monaco', mn: 'Mongolia', me: 'Montenegro', ma: 'Morocco', mz: 'Mozambique',
  mm: 'Myanmar', na: 'Namibia', nr: 'Nauru', np: 'Nepal', nl: 'Netherlands', nz: 'New Zealand',
  ni: 'Nicaragua', ne: 'Niger', ng: 'Nigeria', no: 'Norway', om: 'Oman', pk: 'Pakistan',
  pw: 'Palau', ps: 'Palestine', pa: 'Panama', pg: 'Papua New Guinea', py: 'Paraguay', pe: 'Peru',
  ph: 'Philippines', pl: 'Poland', pt: 'Portugal', qa: 'Qatar', ro: 'Romania', ru: 'Russia',
  rw: 'Rwanda', kn: 'Saint Kitts and Nevis', lc: 'Saint Lucia', vc: 'Saint Vincent and the Grenadines',
  ws: 'Samoa', sm: 'San Marino', st: 'Sao Tome and Principe', sa: 'Saudi Arabia', sn: 'Senegal',
  rs: 'Serbia', sc: 'Seychelles', sl: 'Sierra Leone', sg: 'Singapore', sk: 'Slovakia', si: 'Slovenia',
  sb: 'Solomon Islands', so: 'Somalia', za: 'South Africa', ss: 'South Sudan', es: 'Spain', lk: 'Sri Lanka',
  sd: 'Sudan', sr: 'Suriname', sz: 'Eswatini', se: 'Sweden', ch: 'Switzerland', sy: 'Syria',
  tw: 'Taiwan', tj: 'Tajikistan', tz: 'Tanzania', th: 'Thailand', tl: 'Timor-Leste', tg: 'Togo',
  to: 'Tonga', tt: 'Trinidad and Tobago', tn: 'Tunisia', tr: 'Turkey', tm: 'Turkmenistan', tv: 'Tuvalu',
  ug: 'Uganda', ua: 'Ukraine', ae: 'United Arab Emirates', gb: 'United Kingdom', us: 'United States',
  uy: 'Uruguay', uz: 'Uzbekistan', vu: 'Vanuatu', va: 'Vatican City', ve: 'Venezuela', vn: 'Vietnam',
  ye: 'Yemen', zm: 'Zambia', zw: 'Zimbabwe'
};

async function main() {
  await mkdir(outputDir, { recursive: true });
  console.log(`Loading master map source from: ${sourcePath}`);
  const sourceSvg = await readFile(sourcePath, 'utf8');

  // Extract all country IDs (paths & groups with 2-letter or word ids)
  const idMatches = [...sourceSvg.matchAll(/<path\s+id="([a-z0-9_-]+)"|<g\s+id="([a-z0-9_-]+)"/g)];
  const countryIds = [...new Set(idMatches.map(m => m[1] || m[2]))].filter(id => !id.startsWith('_') && id !== 'world-map');

  console.log(`Found ${countryIds.length} countries in source map.`);

  let count = 0;
  for (const id of countryIds) {
    const element = extractElement(sourceSvg, id);
    if (!element) continue;

    const name = COUNTRY_NAMES[id] || id.toUpperCase();
    
    // 1. Generate Shape Outline SVG
    const outlineSvg = buildOutlineSvg({ element, name });
    await writeFile(resolve(outputDir, `${id}_shape_outline.svg`), outlineSvg, 'utf8');

    // 2. Generate Location Map SVG
    const locationSvg = buildLocationSvg({ sourceSvg, id, name });
    await writeFile(resolve(outputDir, `${id}_location_map.svg`), locationSvg, 'utf8');

    count++;
  }

  console.log(`Successfully generated ${count * 2} SVG map files for ${count} countries.`);

  // Create Zip Archive
  console.log('Creating ZIP archive...');
  execSync(`cd "${outputDir}" && zip -r "${targetZip}" .`);
  console.log(`Archive created at: ${targetZip}`);
}

function extractElement(svg, id) {
  const pathMatch = svg.match(new RegExp(`<path\\s+id="${id}"\\s+d="[^"]+"\\s*\\/>|<path\\s+d="[^"]+"\\s+id="${id}"\\s*\\/>|<path\\s+id="${id}"\\s+d="[^"]+"\\s*><\\/path>`));
  if (pathMatch) return pathMatch[0];
  const groupMatch = svg.match(new RegExp(`<g\\s+id="${id}"([\\s\\S]*?)<\\/g>`));
  if (groupMatch) return groupMatch[0];
  return null;
}

function cleanGeometry(element) {
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
  if (!values.length) return { minX: 0, minY: 0, width: 100, height: 100, maxX: 100, maxY: 100 };
  const xs = values.map(pair => pair[0]);
  const ys = values.map(pair => pair[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  return { minX, minY, maxX, maxY, width: Math.max(1, maxX - minX), height: Math.max(1, maxY - minY) };
}

function buildOutlineSvg({ element, name }) {
  const clean = cleanGeometry(element);
  const box = geometryBBox(element);
  
  // Calculate tight viewBox with 15% padding so the country fills the card gracefully without text overlap
  const paddingX = Math.max(8, box.width * 0.15);
  const paddingY = Math.max(8, box.height * 0.15);
  const vbMinX = box.minX - paddingX;
  const vbMinY = box.minY - paddingY;
  const vbWidth = box.width + paddingX * 2;
  const vbHeight = box.height + paddingY * 2;

  // Stroke width scales with the size of the bounding box
  const strokeWidth = Math.max(0.4, Math.min(box.width, box.height) * 0.018);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vbMinX.toFixed(2)} ${vbMinY.toFixed(2)} ${vbWidth.toFixed(2)} ${vbHeight.toFixed(2)}" role="img">
  <title>${name} country outline</title>
  <defs>
    <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10B981" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#F59E0B" stop-opacity="0.10"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#059669" flood-opacity="0.20"/>
    </filter>
  </defs>
  <g fill="url(#landGrad)" stroke="#059669" stroke-width="${strokeWidth.toFixed(2)}" stroke-linecap="round" stroke-linejoin="round" filter="url(#shadow)">
    ${clean}
  </g>
</svg>`;
}

function buildLocationSvg({ sourceSvg, id, name }) {
  const activeElement = extractElement(sourceSvg, id);
  const box = geometryBBox(activeElement);
  
  // Zoom viewbox smoothly centered on the active country
  const marginX = Math.max(70, box.width * 1.6);
  const marginY = Math.max(50, box.height * 1.6);
  const vbWidth = Math.max(120, box.width + marginX * 2);
  const vbHeight = Math.max(90, box.height + marginY * 2);
  const vbMinX = (box.minX + box.width / 2) - vbWidth / 2;
  const vbMinY = (box.minY + box.height / 2) - vbHeight / 2;

  const viewBox = [vbMinX, vbMinY, vbWidth, vbHeight].map(v => Number(v.toFixed(2))).join(' ');

  const bodyStart = sourceSvg.indexOf('<g>');
  const bodyEnd = sourceSvg.lastIndexOf('</svg>');
  let body = sourceSvg.slice(bodyStart, bodyEnd)
    .replace(/\sclass="mainland"/g, '')
    .replace(/\sfill="[^"]*"/g, '')
    .replace(/\sstroke="[^"]*"/g, '')
    .replace(/\sstroke-width="[^"]*"/g, '');

  const strokeWidth = Math.max(0.4, Math.min(box.width, box.height) * 0.015);
  const activeAttrs = `fill="#10B981" stroke="#047857" stroke-width="${strokeWidth.toFixed(2)}" stroke-linejoin="round"`;
  
  body = body
    .replace(new RegExp(`<path\\s+id="${id}"\\s+`, 'g'), `<path id="${id}" ${activeAttrs} `)
    .replace(new RegExp(`<path\\s+d="([^"]+)"\\s+id="${id}"\\s*/>`, 'g'), `<path d="$1" id="${id}" ${activeAttrs}/>`)
    .replace(new RegExp(`<g\\s+id="${id}"\\s*>`, 'g'), `<g id="${id}" ${activeAttrs}>`);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img">
  <title>${name} location map</title>
  <rect x="-2000" y="-2000" width="5000" height="5000" fill="#f8fafc"/>
  <g fill="#cbd5e1" stroke="#ffffff" stroke-width="0.6" stroke-linejoin="round">
    ${body}
  </g>
</svg>`;
}

main().catch(console.error);
