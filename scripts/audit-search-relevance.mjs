import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');

function decodeHtml(value) {
  return String(value || '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function stripTags(value) {
  return decodeHtml(value).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .toLowerCase();
}

function attr(block, name) {
  const match = block.match(new RegExp(`${name}="([^"]*)"`));
  return decodeHtml(match?.[1] || '');
}

const aliases = new Map([
  ['песель', 'pesel'],
  ['песел', 'pesel'],
  ['пикс', 'pix'],
  ['пікс', 'pix'],
  ['ибан', 'iban'],
  ['ібан', 'iban'],
  ['регекс', 'regex'],
  ['джейсон', 'json'],
  ['свифт', 'swift'],
  ['сео', 'seo'],
  ['ват', 'vat'],
  ['пии', 'pii'],
  ['піі', 'pii']
]);

const expansions = {
  seo: ['seo', 'meta', 'html', 'hreflang', 'canonical', 'robots'],
  api: ['api', 'openapi', 'swagger', 'graphql', 'json', 'schema'],
  bank: ['bank', 'iban', 'swift', 'bic', 'sepa'],
  security: ['security', 'jwt', 'headers', 'csp', 'cors', 'tls', 'webhook', 'secret'],
  token: ['token', 'jwt', 'jwk', 'oauth']
};

function tokensFor(query) {
  const normalized = normalize(query);
  const canonical = aliases.get(normalized) || normalized;
  return Array.from(new Set(canonical.split(/\s+/).filter(Boolean).flatMap(token => [token, ...(expansions[token] || [])])));
}

function scoreItem(item, query) {
  const normalizedQuery = normalize(aliases.get(normalize(query)) || query);
  const tokens = tokensFor(query);
  let score = 0;
  if (item.title === normalizedQuery) score += 1000;
  if (item.title.startsWith(normalizedQuery)) score += 620;
  if (item.slug === normalizedQuery) score += 900;
  if (tokens.length === 1 && item.slug.includes(`${tokens[0]} validator`)) score += 700;
  if (item.slug.includes(normalizedQuery)) score += 520;
  if (item.href.includes(normalizedQuery)) score += 420;
  if (item.search.includes(normalizedQuery)) score += 260;
  for (const token of tokens) {
    if (item.title.includes(token)) score += 180;
    else if (item.slug.includes(token)) score += 160;
    else if (item.href.includes(token)) score += 130;
    else if (item.search.includes(token)) score += 55;
  }
  if (item.tier === 'primary') score += 90;
  if (item.tier === 'secondary') score += 45;
  if (item.tier === 'reference') score -= 20;
  return score;
}

function rank(items, query) {
  return items
    .map((item, index) => ({ ...item, score: scoreItem(item, query), index }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index);
}

async function parseGlobalTools(locale = 'en') {
  const html = await readFile(resolve(siteRoot, locale, 'tools', 'index.html'), 'utf8');
  const items = [];
  for (const match of html.matchAll(/<a class="vh-tool-card"([\s\S]*?)<\/a>/g)) {
    const block = match[0];
    const href = attr(block, 'href');
    const title = stripTags(block.match(/<strong>([\s\S]*?)<\/strong>/)?.[1] || '');
    items.push({
      href,
      title: normalize(title),
      slug: normalize(href.split('/').filter(Boolean).pop() || ''),
      search: normalize(`${attr(block, 'data-search')} ${stripTags(block)}`),
      tier: ''
    });
  }
  return items;
}

async function parseCountryRows(route) {
  const file = resolve(siteRoot, route.replace(/^\/+/, ''), 'index.html');
  const html = await readFile(file, 'utf8');
  const items = [];
  for (const match of html.matchAll(/<a class="vh-country-catalog-row"([\s\S]*?)<\/a>/g)) {
    const block = match[0];
    const href = attr(block, 'href');
    const title = stripTags(block.match(/<strong>([\s\S]*?)<\/strong>/)?.[1] || '');
    items.push({
      href,
      title: normalize(title),
      slug: normalize(attr(block, 'data-route-slug') || href.split('/').filter(Boolean).pop() || ''),
      search: normalize(`${attr(block, 'data-search-text')} ${stripTags(block)}`),
      tier: attr(block, 'data-route-tier')
    });
  }
  return items;
}

const cases = [
  { scope: 'tools', query: 'json schema', expect: ['/en/tools/json-schema-workbench/'] },
  { scope: 'tools', query: 'jwt', expect: ['/en/tools/jwt-decoder/', '/en/tools/jwt-jwk-oauth-inspector/'] },
  { scope: 'tools', query: 'сео', expect: ['/en/tools/html-meta-seo-inspector/'] },
  { scope: 'tools', query: 'регекс', expect: ['/en/tools/regex-tester/', '/en/tools/regex-explainer-generator/'] },
  { scope: 'tools', query: 'iban generator', expect: ['/en/tools/iban-generator/'] },
  { scope: 'tools', query: 'пии', expect: ['/en/tools/secret-pii-redactor/', '/en/tools/secret-scanner-workbench/'] },
  { scope: 'country', route: '/en/poland/', query: 'песель', expect: ['/en/poland/pesel-validator/'] },
  { scope: 'country', route: '/en/poland/', query: 'iban generator', expect: ['/en/poland/poland-iban-generator/'] },
  { scope: 'country', route: '/en/brazil/', query: 'pix', expect: ['/en/brazil/brazil-pix-validator/'] },
  { scope: 'country', route: '/en/mexico/', query: 'curp', expect: ['/en/mexico/mexico-curp-validator/'] },
  { scope: 'country', route: '/en/spain/', query: 'dni', expect: ['/en/spain/spain-id-validator/', '/en/spain/spain-dni-validator/'] }
];

async function main() {
  const failures = [];
  const cache = new Map();

  for (const testCase of cases) {
    const key = testCase.scope === 'tools' ? 'tools:en' : `country:${testCase.route}`;
    if (!cache.has(key)) {
      cache.set(key, testCase.scope === 'tools' ? await parseGlobalTools('en') : await parseCountryRows(testCase.route));
    }
    const ranked = rank(cache.get(key), testCase.query);
    const top = ranked[0]?.href || '';
    if (!testCase.expect.includes(top)) {
      failures.push(`${testCase.scope} ${testCase.route || '/en/tools/'} query "${testCase.query}" expected ${testCase.expect.join(' or ')}, got ${top || 'no result'}`);
    }
  }

  if (failures.length) {
    console.error(`Search relevance audit failed on ${failures.length} issue(s):`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log(`✓ Search relevance audit passed for ${cases.length} high-signal query case(s).`);
}

main().catch(error => {
  console.error(error.message || error);
  process.exit(1);
});
