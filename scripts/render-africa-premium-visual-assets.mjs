#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const SOURCE_DIR = path.join(ROOT, 'validohub_country_maps');
const TARGET_DIR = path.join(ROOT, 'assets/images/countries');
const SIZE = 1254;

const ISO_BY_SLUG = new Map([
  ['algeria', 'DZ'], ['angola', 'AO'], ['benin', 'BJ'], ['botswana', 'BW'],
  ['burkina-faso', 'BF'], ['burundi', 'BI'], ['cabo-verde', 'CV'], ['cameroon', 'CM'],
  ['central-african-republic', 'CF'], ['chad', 'TD'], ['comoros', 'KM'], ['congo', 'CG'],
  ['cote-d-ivoire', 'CI'], ['democratic-republic-of-the-congo', 'CD'], ['djibouti', 'DJ'],
  ['egypt', 'EG'], ['equatorial-guinea', 'GQ'], ['eritrea', 'ER'], ['eswatini', 'SZ'],
  ['ethiopia', 'ET'], ['gabon', 'GA'], ['gambia', 'GM'], ['ghana', 'GH'], ['guinea', 'GN'],
  ['guinea-bissau', 'GW'], ['kenya', 'KE'], ['lesotho', 'LS'], ['liberia', 'LR'],
  ['libya', 'LY'], ['madagascar', 'MG'], ['malawi', 'MW'], ['mali', 'ML'],
  ['mauritania', 'MR'], ['mauritius', 'MU'], ['morocco', 'MA'], ['mozambique', 'MZ'],
  ['namibia', 'NA'], ['niger', 'NE'], ['nigeria', 'NG'], ['rwanda', 'RW'],
  ['sao-tome-and-principe', 'ST'], ['senegal', 'SN'], ['seychelles', 'SC'],
  ['sierra-leone', 'SL'], ['somalia', 'SO'], ['south-africa', 'ZA'], ['south-sudan', 'SS'],
  ['sudan', 'SD'], ['tanzania', 'TZ'], ['togo', 'TG'], ['tunisia', 'TN'], ['uganda', 'UG'],
  ['zambia', 'ZM'], ['zimbabwe', 'ZW']
]);

const AFRICA_IDS = [...ISO_BY_SLUG.values()].map((iso) => iso.toLowerCase());

function readCountryData(slug) {
  const rel = path.join(ROOT, 'countries/data', `${slug}.json`);
  return JSON.parse(fs.readFileSync(rel, 'utf8'));
}

function rgbString(value) {
  return `rgb(${String(value || '17 24 39').replace(/,/g, ' ')})`;
}

function countryColors(slug) {
  const data = readCountryData(slug);
  const identity = data.hub?.visualIdentity || {};
  const colors = [
    rgbString(identity.heroAccentPrimary),
    rgbString(identity.heroAccentSecondary),
    rgbString(identity.heroAccentTertiary)
  ];
  return colors.some((color) => color.includes('255 255 255'))
    ? colors
    : [colors[0], colors[1], colors[2]];
}

function sourcePath(iso, suffix) {
  return path.join(SOURCE_DIR, `${iso.toLowerCase()}_${suffix}.svg`);
}

function countrySlugsFromArgs() {
  const requested = process.argv.slice(2).filter((arg) => !arg.startsWith('--'));
  const includeKenya = process.argv.includes('--include-kenya');
  const slugs = requested.length ? requested : [...ISO_BY_SLUG.keys()];
  return slugs.filter((slug) => includeKenya || slug !== 'kenya');
}

async function setSvg(page, svgText) {
  await page.setContent(`<!doctype html>
<html>
  <head>
    <style>
      html, body { margin: 0; width: ${SIZE}px; height: ${SIZE}px; background: #fff6e7; }
      svg { width: ${SIZE}px; height: ${SIZE}px; display: block; }
    </style>
  </head>
  <body>${svgText}</body>
</html>`);
}

async function cropToBBox(page, selectorIds, padRatio) {
  await page.evaluate(({ selectorIds, padRatio }) => {
    const svg = document.querySelector('svg');
    const nodes = selectorIds.length
      ? selectorIds.flatMap((id) => Array.from(svg.querySelectorAll(`#${CSS.escape(id)}, g#${CSS.escape(id)} path, g#${CSS.escape(id)} polygon, g#${CSS.escape(id)} polyline`)))
      : Array.from(svg.querySelectorAll('path, polygon, polyline, circle, ellipse'));
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const node of nodes) {
      try {
        const box = node.getBBox();
        if (!Number.isFinite(box.x) || !Number.isFinite(box.y) || box.width <= 0 || box.height <= 0) continue;
        minX = Math.min(minX, box.x);
        minY = Math.min(minY, box.y);
        maxX = Math.max(maxX, box.x + box.width);
        maxY = Math.max(maxY, box.y + box.height);
      } catch {
        // Ignore non-renderable map groups.
      }
    }
    if (!Number.isFinite(minX)) return;
    const width = maxX - minX;
    const height = maxY - minY;
    const pad = Math.max(width, height) * padRatio;
    svg.setAttribute('viewBox', `${minX - pad} ${minY - pad} ${width + pad * 2} ${height + pad * 2}`);
  }, { selectorIds, padRatio });
}

async function renderOutline(page, slug, iso) {
  const svgText = fs.readFileSync(sourcePath(iso, 'shape_outline'), 'utf8');
  const colors = countryColors(slug);
  await setSvg(page, svgText);
  await cropToBBox(page, [], 0.18);
  await page.evaluate((colors) => {
    const svg = document.querySelector('svg');
    const ns = 'http://www.w3.org/2000/svg';
    const originals = Array.from(svg.querySelectorAll('path, polygon, polyline, circle, ellipse')).map((node) => node.cloneNode(true));
    const vb = svg.viewBox.baseVal;
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const defs = document.createElementNS(ns, 'defs');
    defs.innerHTML = `
      <filter id="cardShadow" x="-20%" y="-20%" width="145%" height="145%">
        <feDropShadow dx="9" dy="15" stdDeviation="9" flood-color="#3d2f1f" flood-opacity="0.24"/>
      </filter>
      <filter id="surfaceTexture" x="-8%" y="-8%" width="116%" height="116%">
        <feTurbulence type="fractalNoise" baseFrequency="0.86" numOctaves="3" seed="17" result="noise"/>
        <feColorMatrix in="noise" type="saturate" values="0"/>
        <feComponentTransfer>
          <feFuncA type="table" tableValues="0 0.11"/>
        </feComponentTransfer>
        <feBlend in="SourceGraphic" mode="multiply"/>
      </filter>
      <linearGradient id="cardBg" x1="0%" x2="100%" y1="0%" y2="100%">
        <stop offset="0%" stop-color="#fff8ea"/>
        <stop offset="100%" stop-color="#eadfc9"/>
      </linearGradient>
      <clipPath id="countryClip" clipPathUnits="userSpaceOnUse"></clipPath>
    `;
    const clip = defs.querySelector('#countryClip');
    for (const node of originals) {
      const clone = node.cloneNode(true);
      clone.removeAttribute('filter');
      clone.removeAttribute('style');
      clip.appendChild(clone);
    }
    svg.appendChild(defs);

    const bg = document.createElementNS(ns, 'rect');
    bg.setAttribute('x', vb.x);
    bg.setAttribute('y', vb.y);
    bg.setAttribute('width', vb.width);
    bg.setAttribute('height', vb.height);
    bg.setAttribute('fill', 'url(#cardBg)');
    svg.appendChild(bg);

    const shadow = document.createElementNS(ns, 'g');
    shadow.setAttribute('filter', 'url(#cardShadow)');
    for (const node of originals) {
      const clone = node.cloneNode(true);
      clone.setAttribute('fill', '#4a4035');
      clone.setAttribute('stroke', '#2f281f');
      clone.setAttribute('stroke-width', Math.max(vb.width, vb.height) / 160);
      shadow.appendChild(clone);
    }
    svg.appendChild(shadow);

    const stripes = document.createElementNS(ns, 'g');
    stripes.setAttribute('clip-path', 'url(#countryClip)');
    stripes.setAttribute('filter', 'url(#surfaceTexture)');
    colors.forEach((color, index) => {
      const stripe = document.createElementNS(ns, 'rect');
      stripe.setAttribute('x', vb.x);
      stripe.setAttribute('y', vb.y + (vb.height / colors.length) * index);
      stripe.setAttribute('width', vb.width);
      stripe.setAttribute('height', vb.height / colors.length + 2);
      stripe.setAttribute('fill', color);
      stripes.appendChild(stripe);
    });
    svg.appendChild(stripes);

    const bevel = document.createElementNS(ns, 'g');
    for (const node of originals) {
      const clone = node.cloneNode(true);
      clone.removeAttribute('filter');
      clone.removeAttribute('style');
      clone.setAttribute('fill', 'none');
      clone.setAttribute('stroke', 'rgba(30,24,18,0.48)');
      clone.setAttribute('stroke-width', Math.max(vb.width, vb.height) / 150);
      clone.setAttribute('stroke-linejoin', 'round');
      clone.setAttribute('stroke-linecap', 'round');
      bevel.appendChild(clone);
    }
    svg.appendChild(bevel);
  }, colors);
  await page.locator('svg').screenshot({
    path: path.join(TARGET_DIR, `${slug}-outline.png`),
    omitBackground: false
  });
}

async function renderLocation(page, slug, iso) {
  const svgText = fs.readFileSync(sourcePath(iso, 'location_map'), 'utf8');
  const colors = countryColors(slug);
  const activeId = iso.toLowerCase();
  await setSvg(page, svgText);
  await cropToBBox(page, AFRICA_IDS, 0.12);
  await page.evaluate(({ colors, activeId }) => {
    const svg = document.querySelector('svg');
    const ns = 'http://www.w3.org/2000/svg';
    const vb = svg.viewBox.baseVal;
    const rects = Array.from(svg.querySelectorAll('rect'));
    for (const rect of rects) rect.remove();

    let activeMinX = Infinity;
    let activeMinY = Infinity;
    let activeMaxX = -Infinity;
    let activeMaxY = -Infinity;

    const defs = document.createElementNS(ns, 'defs');
    defs.innerHTML = `
      <filter id="pinShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="4" dy="6" stdDeviation="3" flood-color="#3d2f1f" flood-opacity="0.34"/>
      </filter>
      <clipPath id="activeClip" clipPathUnits="userSpaceOnUse"></clipPath>
      <linearGradient id="mapBg" x1="0%" x2="100%" y1="0%" y2="100%">
        <stop offset="0%" stop-color="#fff8eb"/>
        <stop offset="100%" stop-color="#e7dbc5"/>
      </linearGradient>
    `;
    const activeClip = defs.querySelector('#activeClip');
    svg.insertBefore(defs, svg.firstChild);

    const bg = document.createElementNS(ns, 'rect');
    bg.setAttribute('x', vb.x);
    bg.setAttribute('y', vb.y);
    bg.setAttribute('width', vb.width);
    bg.setAttribute('height', vb.height);
    bg.setAttribute('fill', 'url(#mapBg)');
    svg.insertBefore(bg, defs);

    const activeNodes = [];
    const shapes = Array.from(svg.querySelectorAll('path, polygon, polyline'));
    for (const node of shapes) {
      node.removeAttribute('style');
      node.removeAttribute('filter');
      node.setAttribute('fill', '#cec7b8');
      node.setAttribute('stroke', '#fff8ec');
      node.setAttribute('stroke-width', Math.max(vb.width, vb.height) / 520);
      node.setAttribute('stroke-linejoin', 'round');
      const id = node.id || node.closest('g[id]')?.id || '';
      if (id === activeId) {
        activeNodes.push(node.cloneNode(true));
        const clone = node.cloneNode(true);
        clone.removeAttribute('filter');
        activeClip.appendChild(clone);
        try {
          const box = node.getBBox();
          activeMinX = Math.min(activeMinX, box.x);
          activeMinY = Math.min(activeMinY, box.y);
          activeMaxX = Math.max(activeMaxX, box.x + box.width);
          activeMaxY = Math.max(activeMaxY, box.y + box.height);
        } catch {
          // Keep active highlight without pin if bbox is unavailable.
        }
      }
    }

    const active = document.createElementNS(ns, 'g');
    for (const node of activeNodes) {
      const clone = node.cloneNode(true);
      clone.removeAttribute('filter');
      clone.removeAttribute('style');
      clone.setAttribute('fill', colors[0]);
      clone.setAttribute('stroke', '#3b342b');
      clone.setAttribute('stroke-width', Math.max(vb.width, vb.height) / 330);
      clone.setAttribute('stroke-linejoin', 'round');
      active.appendChild(clone);
    }
    svg.appendChild(active);

    for (const node of activeNodes) {
      const outline = node.cloneNode(true);
      outline.removeAttribute('filter');
      outline.setAttribute('fill', 'none');
      outline.setAttribute('stroke', '#3b342b');
      outline.setAttribute('stroke-width', Math.max(vb.width, vb.height) / 360);
      outline.setAttribute('stroke-linejoin', 'round');
      svg.appendChild(outline);
    }

    if (Number.isFinite(activeMinX)) {
      const cx = (activeMinX + activeMaxX) / 2;
      const cy = (activeMinY + activeMaxY) / 2;
      const pinSize = Math.max(activeMaxX - activeMinX, activeMaxY - activeMinY, Math.max(vb.width, vb.height) * 0.034) * 0.42;
      const pin = document.createElementNS(ns, 'g');
      pin.setAttribute('filter', 'url(#pinShadow)');
      pin.setAttribute('transform', `translate(${cx} ${cy - pinSize * 0.18}) scale(${pinSize / 100})`);
      pin.innerHTML = `
        <path d="M0,-56 C-27,-56 -48,-35 -48,-8 C-48,28 -11,56 0,72 C11,56 48,28 48,-8 C48,-35 27,-56 0,-56 Z" fill="#c89423" stroke="#fff4d6" stroke-width="7"/>
        <circle cx="0" cy="-10" r="19" fill="#7a1f18" stroke="#fff4d6" stroke-width="6"/>
      `;
      svg.appendChild(pin);
    }
  }, { colors, activeId });
  await page.locator('svg').screenshot({
    path: path.join(TARGET_DIR, `${slug}-location.png`),
    omitBackground: false
  });
}

async function main() {
  const slugs = countrySlugsFromArgs();
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: SIZE, height: SIZE },
    deviceScaleFactor: 1
  });
  let rendered = 0;
  for (const slug of slugs) {
    const iso = ISO_BY_SLUG.get(slug);
    if (!iso) throw new Error(`Unknown Africa country slug: ${slug}`);
    if (!fs.existsSync(sourcePath(iso, 'shape_outline')) || !fs.existsSync(sourcePath(iso, 'location_map'))) {
      throw new Error(`Missing source SVG assets for ${slug} (${iso})`);
    }
    await renderOutline(page, slug, iso);
    await renderLocation(page, slug, iso);
    rendered += 1;
    if (rendered % 10 === 0 || rendered === slugs.length) {
      console.log(`Rendered ${rendered}/${slugs.length} Africa visual asset pairs`);
    }
  }
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
