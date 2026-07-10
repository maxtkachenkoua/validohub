import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');
const locale = 'en';
const sourcePage = resolve(siteRoot, locale, 'index.html');
const targetPage = resolve(siteRoot, locale, 'countries', 'index.html');
const countriesScript = resolve(projectRoot, 'assets', 'js', 'countries.js');

function portalContent(availableCountrySlugs, hubs) {
  const availabilityLinks = availableCountrySlugs
    .map((slug) => `          <a href="/${locale}/${slug}/">${escapeHtml(hubs[slug]?.name || slug)}</a>`)
    .join('\n');
  return `
        <nav class="breadcrumbs" aria-label="Breadcrumbs">
          <a href="/en/">Home</a>
          <span aria-hidden="true">/</span>
          <span>Countries</span>
        </nav>
        <div data-countries-portal></div>
        <div hidden data-materialized-country-hubs>
${availabilityLinks}
        </div>
`;
}

function countryContent(slug, country) {
  return `
        <nav class="breadcrumbs" aria-label="Breadcrumbs">
          <a href="/${locale}/">Home</a>
          <span aria-hidden="true">/</span>
          <span>${escapeHtml(country.name || slug)}</span>
        </nav>
        <header class="page-intro">
          <span class="eyebrow">Country</span>
          <h1>${escapeHtml(country.name || slug)}</h1>
          <p>${escapeHtml(country.description || `Tools and developer notes for ${country.name || slug}.`)}</p>
        </header>
        <section class="related-section">
          <h2>Country workbenches</h2>
          <div class="card-grid"></div>
        </section>
`;
}

function replaceBetween(html, startMarker, endMarker, replacement) {
  const start = html.indexOf(startMarker);
  const end = html.indexOf(endMarker, start);
  if (start === -1 || end === -1) {
    throw new Error(`Could not find page section between ${startMarker} and ${endMarker}`);
  }
  return `${html.slice(0, start + startMarker.length)}${replacement}${html.slice(end)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function loadCountryHubs(source) {
  const sandbox = {
    window: {},
    document: {
      readyState: 'loading',
      addEventListener() {}
    }
  };
  runInNewContext(source, sandbox, { filename: 'assets/js/countries.js' });
  return sandbox.window.ValidoHubCountries?.hubs || {};
}

function updatePortalHead(html) {
  return html
    .replace(/<title>.*?<\/title>/s, '<title>Countries | ValidoHub</title>')
    .replace(
      /<meta name="description" content=".*?">/s,
      '<meta name="description" content="Explore ValidoHub country hubs, local identifiers, payment systems, banking notes, locale conventions, and country-specific developer tool roadmaps.">'
    )
    .replace(/<link rel="canonical" href=".*?">/s, '<link rel="canonical" href="https://validohub.com/en/countries/">')
    .replace(/<link rel="alternate" hreflang="en" href=".*?">/s, '<link rel="alternate" hreflang="en" href="https://validohub.com/en/countries/">');
}

function updateCountryHead(html, slug, country) {
  const name = escapeHtml(country.name || slug);
  const description = escapeHtml(country.description || `Developer tools and country intelligence for ${name}.`);
  return html
    .replace(/<title>.*?<\/title>/s, `<title>${name}</title>`)
    .replace(/<meta name="description" content=".*?">/s, `<meta name="description" content="${description}">`)
    .replace(/<link rel="canonical" href=".*?">/s, `<link rel="canonical" href="https://validohub.com/${locale}/${slug}/">`)
    .replace(/<link rel="alternate" hreflang="en" href=".*?">/s, `<link rel="alternate" hreflang="en" href="https://validohub.com/${locale}/${slug}/">`);
}

function updatePortalNav(html) {
  return html
    .replace('href="/en/"\n           class="is-active"', 'href="/en/"')
    .replace(
      '</nav>',
      '<a href="/en/countries/" class="is-active">Countries</a>\n      </nav>'
    );
}

function ensurePortalScript(html) {
  if (html.includes('/assets/js/portal-countries.js')) {
    return html;
  }
  return html.replace('</body>', '  <script src="/assets/js/portal-countries.js"></script>\n</body>');
}

const source = await readFile(sourcePage, 'utf8');
const hubs = loadCountryHubs(await readFile(countriesScript, 'utf8'));
const availableCountrySlugs = [];
const materializedCountrySlugs = [];

for (const [slug, country] of Object.entries(hubs)) {
  const countryPage = resolve(siteRoot, locale, slug, 'index.html');
  const exists = await pathExists(countryPage);
  if (!exists) {
    let page = updateCountryHead(source, slug, country);
    page = replaceBetween(
      page,
      '<div class="container page-stack">',
      '      </div>\n    </section>',
      countryContent(slug, country)
    );
    await mkdir(dirname(countryPage), { recursive: true });
    await writeFile(countryPage, page, 'utf8');
    materializedCountrySlugs.push(slug);
  }
  availableCountrySlugs.push(slug);
}

let page = updatePortalHead(source);
page = updatePortalNav(page);
page = replaceBetween(
  page,
  '<div class="container page-stack">',
  '      </div>\n    </section>',
  portalContent(availableCountrySlugs, hubs)
);
page = ensurePortalScript(page);

await mkdir(dirname(targetPage), { recursive: true });
await writeFile(targetPage, page, 'utf8');

console.log(`Countries Portal written to ${targetPage}`);
if (materializedCountrySlugs.length) {
  console.log(`Country hub routes materialized: ${materializedCountrySlugs.map((slug) => `/${locale}/${slug}/`).join(', ')}`);
}
