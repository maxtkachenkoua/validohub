import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');
const locale = 'en';
const sourcePage = resolve(siteRoot, locale, 'index.html');
const targetPage = resolve(siteRoot, locale, 'countries', 'index.html');

const portalContent = `
        <nav class="breadcrumbs" aria-label="Breadcrumbs">
          <a href="/en/">Home</a>
          <span aria-hidden="true">/</span>
          <span>Countries</span>
        </nav>
        <div data-countries-portal></div>
`;

function replaceBetween(html, startMarker, endMarker, replacement) {
  const start = html.indexOf(startMarker);
  const end = html.indexOf(endMarker, start);
  if (start === -1 || end === -1) {
    throw new Error(`Could not find page section between ${startMarker} and ${endMarker}`);
  }
  return `${html.slice(0, start + startMarker.length)}${replacement}${html.slice(end)}`;
}

function updateHead(html) {
  return html
    .replace(/<title>.*?<\/title>/s, '<title>Countries | ValidoHub</title>')
    .replace(
      /<meta name="description" content=".*?">/s,
      '<meta name="description" content="Explore ValidoHub country hubs, local identifiers, payment systems, banking notes, locale conventions, and country-specific developer tool roadmaps.">'
    )
    .replace(/<link rel="canonical" href=".*?">/s, '<link rel="canonical" href="https://validohub.com/en/countries/">')
    .replace(/<link rel="alternate" hreflang="en" href=".*?">/s, '<link rel="alternate" hreflang="en" href="https://validohub.com/en/countries/">');
}

function updateNav(html) {
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
let page = updateHead(source);
page = updateNav(page);
page = replaceBetween(
  page,
  '<div class="container page-stack">',
  '      </div>\n    </section>',
  portalContent
);
page = ensurePortalScript(page);

await mkdir(dirname(targetPage), { recursive: true });
await writeFile(targetPage, page, 'utf8');

console.log(`Countries Portal written to ${targetPage}`);
