import { access, readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { countryThemeStyleAttr } from './country-theme-style.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

function cleanSvg(svgContent) {
  let cleaned = svgContent
    .replace(/<\?xml[^>]*\?>/gi, '')
    .replace(/<!DOCTYPE[^>]*>/gi, '')
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

function isRasterAsset(assetPath) {
  return /\.(?:avif|jpe?g|png|webp)$/i.test(String(assetPath || ''));
}

async function pathExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function preferredRasterAssetPath(assetPath) {
  if (!/\.png$/i.test(String(assetPath || ''))) return assetPath;

  const webpPath = assetPath.replace(/\.png$/i, '.webp');
  const fullWebpPath = resolve(projectRoot, webpPath.replace(/^\//, ''));
  return await pathExists(fullWebpPath) ? webpPath : assetPath;
}

async function renderCountryVisualAsset(assetPath, altText) {
  const fullPath = resolve(projectRoot, assetPath.replace(/^\//, ''));
  if (isRasterAsset(assetPath)) {
    if (!(await pathExists(fullPath))) return '';
    const src = await preferredRasterAssetPath(assetPath);
    return `<img src="${escapeHtml(src)}" alt="${escapeHtml(altText)}" loading="lazy" decoding="async">`;
  }

  const rawSvg = await readFile(fullPath, 'utf8');
  return cleanSvg(rawSvg);
}

const HERO_CLOCK_PROFILES = {
  argentina: {
    label: 'Buenos Aires',
    timeZone: 'America/Argentina/Buenos_Aires',
    caption: 'business time'
  },
  brazil: {
    label: 'Sao Paulo',
    timeZone: 'America/Sao_Paulo',
    caption: 'business time'
  },
  canada: {
    label: 'Toronto',
    timeZone: 'America/Toronto',
    caption: 'eastern time'
  },
  chile: {
    label: 'Santiago',
    timeZone: 'America/Santiago',
    caption: 'business time'
  },
  japan: {
    label: 'Tokyo',
    timeZone: 'Asia/Tokyo',
    caption: 'business time'
  },
  mexico: {
    label: 'Mexico City',
    timeZone: 'America/Mexico_City',
    caption: 'central time'
  },
  ukraine: {
    label: 'Kyiv',
    timeZone: 'Europe/Kyiv',
    caption: 'business time'
  },
  'united-kingdom': {
    label: 'London',
    timeZone: 'Europe/London',
    caption: 'business time'
  },
  'united-states': {
    label: 'New York',
    timeZone: 'America/New_York',
    caption: 'eastern time'
  }
};

function renderHeroClock(model) {
  const normalizedZone = normalizeTimeZone(model.timeZones);
  const profile = HERO_CLOCK_PROFILES[model.slug] || {
    label: model.capital || model.displayName,
    timeZone: normalizedZone,
    caption: 'business time'
  };
  if (!profile?.timeZone) return '';
  return `
    <div class="vh-country-hero-clock" data-country-clock data-time-zone="${escapeHtml(profile.timeZone)}" aria-label="${escapeHtml(profile.label)} current time">
      <div class="vh-country-clock-face" aria-hidden="true">
        <span class="vh-country-clock-tick is-12"></span>
        <span class="vh-country-clock-tick is-3"></span>
        <span class="vh-country-clock-tick is-6"></span>
        <span class="vh-country-clock-tick is-9"></span>
        <span class="vh-country-clock-hand is-hour" data-country-clock-hour></span>
        <span class="vh-country-clock-hand is-minute" data-country-clock-minute></span>
        <span class="vh-country-clock-hand is-second" data-country-clock-second></span>
        <span class="vh-country-clock-pin"></span>
      </div>
      <div class="vh-country-clock-copy">
        <span>${escapeHtml(profile.label)}</span>
        <strong data-country-clock-time>--:--:--</strong>
        <small><span data-country-clock-date>${escapeHtml(profile.caption)}</span></small>
      </div>
    </div>
  `;
}

function normalizeTimeZone(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  const match = raw.match(/[A-Za-z]+\/[A-Za-z0-9_+\-]+(?:\/[A-Za-z0-9_+\-]+)?/);
  const timeZone = match ? match[0] : '';
  if (!timeZone) return '';
  try {
    new Intl.DateTimeFormat('en-US', { timeZone }).format(new Date());
    return timeZone;
  } catch {
    return '';
  }
}

function getCountryValidatorRoutes(model, routeRegistry) {
  if (!routeRegistry || typeof routeRegistry.getAll !== 'function') return [];
  return routeRegistry.getAll().filter(route => route.type === 'validator' && route.path.startsWith(`/en/${model.slug}/`));
}

const COUNTRY_SEARCH_HINTS = [
  { label: 'MULTIBANCO', pattern: /multibanco/ },
  { label: 'OGM', pattern: /\bogm\b|structured communication/ },
  { label: 'KID', pattern: /\bkid\b/ },
  { label: 'BANKGIRO', pattern: /bankgiro/ },
  { label: 'PLUSGIRO', pattern: /plusgiro/ },
  { label: 'VIITENUMERO', pattern: /viitenumero|reference number/ },
  { label: 'VARIABLE SYMBOL', pattern: /variable symbol|variabil/ },
  { label: 'FI REFERENCE', pattern: /\bfi\b.*reference|creditor reference/ },
  { label: 'EIRCODE', pattern: /eircode/ },
  { label: 'PPSN', pattern: /ppsn/ },
  { label: 'HETU', pattern: /hetu/ },
  { label: 'Y-TUNNUS', pattern: /y-tunnus|ytunnus/ },
  { label: 'CPR', pattern: /\bcpr\b/ },
  { label: 'CVR', pattern: /\bcvr\b/ },
  { label: 'CNP', pattern: /\bcnp\b/ },
  { label: 'CUI/CIF', pattern: /\bcui\b|\bcif\b/ },
  { label: 'SVNR', pattern: /\bsvnr\b/ },
  { label: 'UID', pattern: /\buid\b|atu/ },
  { label: 'RRN/NISS', pattern: /\brrn\b|\bniss\b/ },
  { label: 'KBO/BCE', pattern: /\bkbo\b|\bbce\b/ },
  { label: 'ICO', pattern: /\bico\b|ičo/ },
  { label: 'DIC', pattern: /\bdic\b|dič/ },
  { label: 'PERSONNUMMER', pattern: /personnummer/ },
  { label: 'ORGNR', pattern: /organisationsnummer|organisasjonsnummer|orgnr/ },
  { label: 'PESEL', pattern: /pesel/ },
  { label: 'NIP', pattern: /\bnip\b/ },
  { label: 'REGON', pattern: /regon/ },
  { label: 'KRS', pattern: /\bkrs\b/ },
  { label: 'BLIK', pattern: /blik/ },
  { label: 'PIX', pattern: /\bpix\b/ },
  { label: 'CPF', pattern: /\bcpf\b/ },
  { label: 'CNPJ', pattern: /cnpj/ },
  { label: 'Boleto', pattern: /boleto|linha digitavel/ },
  { label: 'CEP', pattern: /\bcep\b/ },
  { label: 'CNAE', pattern: /\bcnae\b/ },
  { label: 'RENAVAM', pattern: /renavam/ },
  { label: 'NF-e', pattern: /\bnf-?e\b|nfe|fiscal access/ },
  { label: 'CNAB', pattern: /\bcnab\b/ },
  { label: 'DNI', pattern: /\bdni\b/ },
  { label: 'NIE', pattern: /\bnie\b/ },
  { label: 'NIF', pattern: /\bnif\b/ },
  { label: 'CIF', pattern: /\bcif\b/ },
  { label: 'IBAN/NRB', pattern: /iban.*nrb|nrb.*iban|\bnrb\b/ },
  { label: 'IBAN', pattern: /\biban\b/ },
  { label: 'SWIFT/BIC', pattern: /swift|\bbic\b/ },
  { label: 'SEPA', pattern: /\bsepa\b/ },
  { label: 'VAT', pattern: /\bvat\b|vies/ },
  { label: 'INVOICE', pattern: /invoice|ksef|jpk|paragon|receipt/ },
  { label: 'POSTAL', pattern: /postal|postcode|zip|cep/ },
  { label: 'PHONE', pattern: /phone|telefon/ },
  { label: 'ADDRESS', pattern: /address/ },
  { label: 'VIN', pattern: /\bvin\b/ },
  { label: 'MRZ', pattern: /\bmrz\b/ }
];

const COUNTRY_SEARCH_HINT_ROUTE_ALIASES = {
  afm: /\bvat\b|\btax\b|vies|gr prefix/,
  aade: /\btax\b|e-invoicing|invoice|vat|authority/,
  mydata: /e-invoicing|invoice|tax/
};

function deriveCountrySearchHints(model, routeRegistry) {
  const routes = getCountryValidatorRoutes(model, routeRegistry);
  const routeText = routes
    .map(route => [
      route.title,
      route.path,
      route.href,
      route.text,
      route.description
    ].map(value => String(value || '').toLowerCase()).join(' '))
    .join(' ');

  const routedModelHints = Array.isArray(model.searchHints)
    ? model.searchHints
      .map(hint => String(hint || '').trim())
      .filter(Boolean)
      .filter(hint => {
        const normalized = hint.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
        if (!normalized) return false;
        return normalized.split(/\s+/).some(part => {
          const aliasPattern = COUNTRY_SEARCH_HINT_ROUTE_ALIASES[part];
          return routeText.includes(part) || Boolean(aliasPattern && aliasPattern.test(routeText));
        });
      })
    : [];

  const routeHints = COUNTRY_SEARCH_HINTS
    .filter(item => item.pattern.test(routeText))
    .map(item => item.label);

  const hints = Array.from(new Set([...routedModelHints, ...routeHints])).slice(0, 10);

  if (hints.length === 0) {
    const fallback = routes
      .map(route => String(route.title || '').trim())
      .filter(Boolean)
      .map(title => title.split(/\s+/)[0])
      .filter(Boolean)
      .slice(0, 10);
    if (fallback.length > 0) {
      hints.push(...fallback);
    }
  }

  if (hints.length === 0) {
    hints.push('tool', 'identifier', 'payment');
  }

  return hints;
}

export async function renderCountryOutlineCard(model) {
  const assetPath = model.visualAssets.outlineSrc;
  if (!assetPath) return '';

  const visualAsset = await renderCountryVisualAsset(assetPath, model.visualAssets.outlineAlt || `${model.displayName} country outline`);
  if (!visualAsset) return '';

  const html = `
    <section class="vh-card vh-country-outline" aria-label="${escapeHtml(model.visualAssets.outlineAlt || `${model.displayName} country outline`)}">
      <span class="vh-country-visual-label">Country Shape</span>
      <div class="vh-country-visual-art">
        ${visualAsset}
      </div>
    </section>
  `;
  return cleanHtml(html);
}

export async function renderCountryLocationMapCard(model) {
  const assetPath = model.visualAssets.mapSrc;
  if (!assetPath) return '';

  const visualAsset = await renderCountryVisualAsset(assetPath, model.visualAssets.mapAlt || `${model.displayName} map highlight`);
  if (!visualAsset) return '';

  const html = `
    <section class="vh-card vh-country-location-map" aria-label="${escapeHtml(model.visualAssets.mapAlt || `${model.displayName} map highlight`)}">
      <span class="vh-country-visual-label">Location</span>
      <div class="vh-country-visual-art">
        ${visualAsset}
      </div>
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

export async function renderCountryVisualHero(model, routeRegistry = null) {
  const outlineHtml = await renderCountryOutlineCard(model);
  const locationHtml = await renderCountryLocationMapCard(model);
  const searchHints = deriveCountrySearchHints(model, routeRegistry);
  const placeholder = `Search ${searchHints.join(', ')}...`;
  const searchStatus = `Search across available ${model.displayName} workbenches on this page.`;
  const shortcutButtons = searchHints.map(hint => {
    const shortcut = hint.toLowerCase();
    return `<button class="vh-country-search-chip" type="button" data-country-search-shortcut="${escapeHtml(shortcut)}">${escapeHtml(hint)}</button>`;
  }).join('\n');
  const heroClockHtml = renderHeroClock(model);

  const html = `
    <header class="vh-country-hero vh-country-${model.slug} vh-country-theme--${model.slug}" ${countryThemeStyleAttr(model)}>
      <div class="vh-country-hero-copy">
        <div class="vh-country-hero-kicker">
          <div class="vh-flex vh-align-center vh-gap-sm">
            <span class="vh-flag">${model.flag}</span>
            <span class="vh-eyebrow">Country Hub</span>
          </div>
          ${heroClockHtml}
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
      <form class="vh-country-tool-search" role="search" data-country-tool-search>
        <label for="vh-country-tool-search-${escapeHtml(model.slug)}">Find a country tool</label>
        <div class="vh-country-tool-search-control">
          <input id="vh-country-tool-search-${escapeHtml(model.slug)}" class="vh-country-tool-search-input" type="search" placeholder="${escapeHtml(placeholder)}" autocomplete="off" data-country-tool-search-input>
          <button type="button" data-country-tool-search-clear aria-label="Clear country tool search">Clear</button>
        </div>
        <p class="vh-country-tool-search-status" data-country-tool-search-status>${escapeHtml(searchStatus)}</p>
        <div class="vh-country-search-shortcuts" data-country-search-shortcuts>
          ${shortcutButtons}
        </div>
      </form>
    </header>
  `;
  return cleanHtml(html);
}
