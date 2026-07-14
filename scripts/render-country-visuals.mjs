import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

function cleanSvg(svgContent) {
  let cleaned = svgContent
    .replace(/<\?xml[^>]*\?>/gi, '')
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .trim();

  // Normalize duplicate spacing and newlines
  cleaned = cleaned.replace(/\s+/g, ' ');

  // Parse and alphabetically sort outer SVG tag attributes for deterministic builds
  const svgOpenMatch = cleaned.match(/<svg([^>]*)>/i);
  if (svgOpenMatch) {
    const attrsStr = svgOpenMatch[1];
    const attrRegex = /([a-z0-9:-]+)\s*=\s*(['"])(.*?)\2/gi;
    const attrs = [];
    let match;
    while ((match = attrRegex.exec(attrsStr)) !== null) {
      attrs.push({ name: match[1], value: match[3] });
    }
    // Remove duplicates if any
    const uniqueAttrs = [];
    const seen = new Set();
    for (const attr of attrs) {
      if (!seen.has(attr.name)) {
        seen.add(attr.name);
        uniqueAttrs.push(attr);
      }
    }
    // Sort attributes by name
    uniqueAttrs.sort((a, b) => a.name.localeCompare(b.name));
    const sortedAttrsStr = uniqueAttrs.map(a => `${a.name}="${a.value}"`).join(' ');
    cleaned = cleaned.replace(svgOpenMatch[0], `<svg ${sortedAttrsStr}>`);
  }

  return cleaned;
}

function cleanHtml(html) {
  // Sort classes alphabetically on all HTML elements for byte-identical determinism
  return html.replace(/class=["']([^"']+)["']/g, (match, classList) => {
    const sorted = classList.split(/\s+/).filter(Boolean).sort().join(' ');
    return `class="${sorted}"`;
  });
}

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export async function renderCountryOutlineCard(model) {
  const assetPath = model.visualAssets.outlineSrc;
  if (!assetPath) return '';

  const fullPath = resolve(projectRoot, assetPath.replace(/^\//, ''));
  const rawSvg = await readFile(fullPath, 'utf8');
  const cleanedSvg = cleanSvg(rawSvg);

  const html = `
    <section class="vh-card vh-country-outline">
      <div class="section-heading">
        <span class="vh-eyebrow">Country Shape</span>
        <h3>Official administrative outline</h3>
      </div>
      <div class="vh-country-visual-art">
        ${cleanedSvg}
      </div>
      <p class="vh-country-visual-caption">${escapeHtml(model.displayName)} Shape Outline</p>
    </section>
  `;
  return cleanHtml(html);
}

export async function renderCountryLocationMapCard(model) {
  const assetPath = model.visualAssets.mapSrc;
  if (!assetPath) return '';

  const fullPath = resolve(projectRoot, assetPath.replace(/^\//, ''));
  const rawSvg = await readFile(fullPath, 'utf8');
  const cleanedSvg = cleanSvg(rawSvg);

  const html = `
    <section class="vh-card vh-country-location-map">
      <div class="section-heading">
        <span class="vh-eyebrow">Location</span>
        <h3>Geographic position in ${escapeHtml(model.region)}</h3>
      </div>
      <div class="vh-country-visual-art">
        ${cleanedSvg}
      </div>
      <p class="vh-country-visual-caption">${escapeHtml(model.displayName)} Map Highlight</p>
    </section>
  `;
  return cleanHtml(html);
}

export function renderCountryCompletionCard(model) {
  const percent = Number(model.completionStatus) || 0;
  
  const statusLabel = percent >= 80 
    ? 'Reference Hub' 
    : (percent >= 30 ? 'Available' : 'In Progress');
  
  const badgeClass = percent >= 80 
    ? 'vh-country-status-ready' 
    : (percent >= 30 ? 'vh-country-status-in-progress' : 'vh-country-status-badge vh-custom-badge');

  const html = `
    <article class="vh-card vh-country-progress">
      <div class="section-heading">
        <span class="vh-eyebrow">Development Status</span>
        <h3>Platform Roadmap Coverage</h3>
      </div>
      <div class="vh-flex vh-align-center vh-justify-between vh-mb-xs">
        <span class="${badgeClass}">${statusLabel}</span>
        <strong>${percent}% Complete</strong>
      </div>
      <progress class="vh-progress-bar" max="100" value="${percent}"></progress>
    </article>
  `;
  return cleanHtml(html);
}

export async function renderCountryVisualHero(model) {
  const outlineHtml = await renderCountryOutlineCard(model);
  const locationHtml = await renderCountryLocationMapCard(model);

  const html = `
    <header class="vh-country-hero vh-country-${model.slug} vh-country-theme--${model.slug}">
      <div class="vh-country-hero-copy">
        <div class="vh-flex vh-align-center vh-gap-sm vh-mb-xs">
          <span class="vh-flag">${model.flag}</span>
          <span class="vh-eyebrow">Country Hub</span>
        </div>
        <h1>${escapeHtml(model.displayName)} Developer Portal</h1>
        <p>Developer intelligence for local identifiers, regional payment protocols, bank routing details, and locale conventions.</p>
        <div class="vh-country-badge-row">
          <span class="vh-country-status-badge vh-country-status-ready">Static V2 Compiled</span>
          <span class="vh-country-status-badge vh-country-status-badge vh-custom-badge">${escapeHtml(model.region)}</span>
        </div>
      </div>
      <div class="vh-country-visual-grid">
        ${outlineHtml}
        ${locationHtml}
      </div>
    </header>
  `;
  return cleanHtml(html);
}
