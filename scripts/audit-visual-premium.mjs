#!/usr/bin/env node

import { chromium } from 'playwright';
import http from 'node:http';
import { createReadStream } from 'node:fs';
import { access, readFile, readdir, stat } from 'node:fs/promises';
import { extname, relative, resolve } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');

const defaultKnownRoutes = [
  '/en/bahrain/bahrain-customs-importer-code-helper/',
  '/en/belgium/belgium-driving-licence-format-helper/',
  '/en/spain/spain-id-validator/',
  '/en/argentina/argentina-cuit-validator/',
  '/en/poland/poland-iban-nrb-validator/',
  '/en/netherlands/netherlands-iban-validator/',
  '/en/brazil/brazil-address-formatter/',
  '/en/tools/uuid-generator/',
  '/en/tools/iban-generator/',
  '/en/tools/json-schema-workbench/'
];

const countryNeedles = [
  'customs-importer',
  'driving-licence',
  'passport',
  'iban',
  'tax',
  'vat',
  'eori',
  'phone',
  'postal',
  'address',
  'privacy',
  'data-quality',
  'currency',
  'bank-account',
  'invoice',
  'vehicle'
];

const globalNeedles = [
  'json',
  'jwt',
  'base64',
  'url',
  'iban',
  'uuid',
  'regex',
  'schema',
  'sitemap',
  'redaction',
  'oauth',
  'webhook',
  'luhn',
  'unicode'
];

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    baseUrl: '',
    limit: 120,
    mobileLimit: 40,
    locales: ['en'],
    shards: 1,
    shardIndex: 0,
    port: 8179,
    timeoutMs: 15000
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    const next = args[index + 1];
    if (arg === '--base-url') options.baseUrl = next || '';
    if (arg === '--limit') options.limit = Number(next || options.limit);
    if (arg === '--mobile-limit') options.mobileLimit = Number(next || options.mobileLimit);
    if (arg === '--locales') options.locales = String(next || 'en').split(',').map(item => item.trim()).filter(Boolean);
    if (arg === '--shards') options.shards = Math.max(1, Number(next || 1));
    if (arg === '--shard-index') options.shardIndex = Math.max(0, Number(next || 0));
    if (arg === '--port') options.port = Number(next || options.port);
    if (arg === '--timeout-ms') options.timeoutMs = Number(next || options.timeoutMs);
    if (arg.startsWith('--') && next && !next.startsWith('--')) index += 1;
  }

  if (!Number.isFinite(options.limit) || options.limit < 1) options.limit = 120;
  if (!Number.isFinite(options.mobileLimit) || options.mobileLimit < 0) options.mobileLimit = 40;
  if (!Number.isFinite(options.shards) || options.shards < 1) options.shards = 1;
  if (!Number.isFinite(options.shardIndex) || options.shardIndex < 0) options.shardIndex = 0;
  options.shardIndex = options.shardIndex % options.shards;
  return options;
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walkHtml(dir, out = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'assets') continue;
    const entryPath = resolve(dir, entry.name);
    if (entry.isDirectory()) await walkHtml(entryPath, out);
    else if (entry.isFile() && entry.name === 'index.html') out.push(entryPath);
  }
  return out;
}

function routeForFile(filePath) {
  const rel = relative(siteRoot, filePath).split('\\').join('/');
  return `/${rel.replace(/index\.html$/, '')}`;
}

function isPremiumToolHtml(route, html, locales) {
  const parts = route.split('/').filter(Boolean);
  if (!locales.includes(parts[0])) return false;
  const isGlobalTool = parts.length === 3 && parts[1] === 'tools';
  const isCountryTool = parts.length === 3 && !['tools', 'countries', 'categories', 'identifiers', 'guides'].includes(parts[1]);
  if (!isGlobalTool && !isCountryTool) return false;
  return /csf-static-host|spain-id\.js|gold-tools-lab|generic-suite|browser-workbench|country-legacy-rich-layer|global-premium/.test(html);
}

function routeKind(route) {
  const parts = route.split('/').filter(Boolean);
  if (parts[1] === 'tools') return 'global';
  return 'country';
}

async function collectCandidates(options) {
  const files = await walkHtml(siteRoot);
  const candidates = [];
  for (const file of files) {
    const route = routeForFile(file);
    const html = await readFile(file, 'utf8');
    if (!isPremiumToolHtml(route, html, options.locales)) continue;
    const parts = route.split('/').filter(Boolean);
    candidates.push({
      route,
      locale: parts[0],
      country: routeKind(route) === 'country' ? parts[1] : '',
      slug: routeKind(route) === 'country' ? parts[2] : parts[2],
      kind: routeKind(route),
      html
    });
  }
  return candidates.sort((a, b) => a.route.localeCompare(b.route));
}

function chooseRoutes(candidates, options) {
  const picked = [];
  const routeSet = new Set(candidates.map(item => item.route));
  const add = route => {
    if (route && routeSet.has(route) && !picked.includes(route)) picked.push(route);
  };

  defaultKnownRoutes.forEach(add);

  const byCountry = new Map();
  const global = [];
  for (const item of candidates) {
    if (item.kind === 'global') global.push(item);
    else {
      const group = byCountry.get(item.country) || [];
      group.push(item);
      byCountry.set(item.country, group);
    }
  }

  let countryOffset = 0;
  for (const country of Array.from(byCountry.keys()).sort()) {
    const group = byCountry.get(country);
    const needle = countryNeedles[countryOffset % countryNeedles.length];
    const route =
      group.find(item => item.slug.includes(needle)) ||
      group.find(item => countryNeedles.some(candidate => item.slug.includes(candidate))) ||
      group[0];
    add(route && route.route);
    countryOffset += 1;
  }

  for (const needle of globalNeedles) {
    const hit = global.find(item => item.slug.includes(needle));
    add(hit && hit.route);
  }

  for (const item of candidates) {
    if (picked.length >= Math.max(options.limit * options.shards, options.limit)) break;
    add(item.route);
  }

  return picked
    .filter((_, index) => index % options.shards === options.shardIndex)
    .slice(0, options.limit);
}

function startServer(port, dir) {
  const mime = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.avif': 'image/avif'
  };
  const server = http.createServer(async (request, response) => {
    let urlPath = (request.url || '/').split('?')[0];
    if (urlPath.endsWith('/')) urlPath += 'index.html';
    const filePath = resolve(dir, urlPath.replace(/^\/+/, ''));
    if (!filePath.startsWith(dir)) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }
    try {
      const fileStat = await stat(filePath);
      if (!fileStat.isFile()) throw new Error('Not a file');
      response.writeHead(200, { 'Content-Type': mime[extname(filePath)] || 'application/octet-stream' });
      createReadStream(filePath).pipe(response);
    } catch {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Not found');
    }
  });
  return new Promise((resolveServer, reject) => {
    server.on('error', reject);
    server.listen(port, '127.0.0.1', () => resolveServer(server));
  });
}

async function withServer(options, callback) {
  if (options.baseUrl) return callback(options.baseUrl.replace(/\/$/, ''));
  let port = options.port;
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      const server = await startServer(port, siteRoot);
      try {
        return await callback(`http://127.0.0.1:${port}`);
      } finally {
        await new Promise(resolveClose => server.close(resolveClose));
      }
    } catch (error) {
      if (error.code !== 'EADDRINUSE') throw error;
      port += 1;
    }
  }
  throw new Error('Could not start local visual audit server.');
}

function emptyAggregate() {
  return {
    pages: 0,
    errors: 0,
    overflow: 0,
    oldMarker: 0,
    missingWorkbench: 0,
    missingRelated: 0,
    fewTopSamples: 0,
    missingBoundary: 0,
    missingDeveloper: 0,
    largeTextarea: 0,
    mobileOverflow: 0
  };
}

function addAggregate(aggregate, weak) {
  aggregate.pages += 1;
  for (const item of weak) {
    if (item === 'js-error') aggregate.errors += 1;
    if (item === 'overflow') aggregate.overflow += 1;
    if (item === 'old-marker') aggregate.oldMarker += 1;
    if (item === 'missing-workbench') aggregate.missingWorkbench += 1;
    if (item === 'related-footer') aggregate.missingRelated += 1;
    if (item === 'few-top-samples') aggregate.fewTopSamples += 1;
    if (item === 'no-boundary') aggregate.missingBoundary += 1;
    if (item === 'no-dev-output') aggregate.missingDeveloper += 1;
    if (item === 'large-textarea') aggregate.largeTextarea += 1;
    if (item === 'mobile-overflow') aggregate.mobileOverflow += 1;
  }
}

async function auditRoute(page, baseUrl, route, index, options) {
  const errors = [];
  page.removeAllListeners('pageerror');
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${baseUrl}${route}?audit=visual-premium`, {
    waitUntil: 'domcontentloaded',
    timeout: options.timeoutMs
  }).catch(error => errors.push(`goto: ${error.message}`));
  await page.waitForTimeout(450);

  const desktop = await page.evaluate(() => {
    const text = document.body ? document.body.innerText || '' : '';
    const rectOf = selector => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return {
        top: Math.round(rect.top),
        bottom: Math.round(rect.bottom),
        h: Math.round(rect.height),
        w: Math.round(rect.width)
      };
    };
    const buttons = Array.from(document.querySelectorAll('button, [role="button"], a'));
    const topSampleLike = buttons
      .filter(element => {
        const label = (element.textContent || '').trim();
        const rect = element.getBoundingClientRect();
        return rect.top < 900 && /(sample|fixture|example|valid|invalid|random|generate|copy|dni|nie|iban|cuit|cpf|cep)/i.test(label);
      })
      .map(element => (element.textContent || '').trim().replace(/\s+/g, ' '))
      .filter(Boolean)
      .slice(0, 8);
    const isCountry = /^\/[a-z-]+\/(?!tools\/|countries\/|categories\/|identifiers\/|guides\/)[^/]+\/[^/]+\//.test(location.pathname);
    return {
      isCountry,
      title: document.querySelector('h1')?.textContent?.trim() || '',
      overflow: Math.ceil(document.documentElement.scrollWidth - document.documentElement.clientWidth),
      oldMarker: /Run the tool|Paste input, choose an action|Developer API Preview|api\.validohub\.com|\/v1\/tools\/|API handoff preview/i.test(text),
      workbench: rectOf('.browser-workbench, .csf-static-host, .generic-suite-workbench, .spain-id-workbench, .global-premium-workbench, .workbench-card'),
      textarea: rectOf('textarea[name="input"], textarea'),
      relatedFooter: !isCountry || Boolean(document.querySelector('.vh-tool-related-footer')),
      relatedLinks: document.querySelectorAll('.vh-tool-related-footer a').length,
      boundary: /Integration traps|Boundary|Official boundary|No lookup|Runs locally|Browser-only boundary/i.test(text),
      developer: /Developer Snapshot|developer JSON|Raw JSON|Copy developer JSON|raw output|Download result/i.test(text),
      topSampleLikeCount: topSampleLike.length,
      topSampleLike
    };
  });

  let mobile = { overflow: 0 };
  if (index < options.mobileLimit) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(100);
    mobile = await page.evaluate(() => ({
      overflow: Math.ceil(document.documentElement.scrollWidth - document.documentElement.clientWidth)
    }));
    await page.setViewportSize({ width: 1440, height: 900 });
  }

  const weak = [];
  if (errors.length) weak.push('js-error');
  if (desktop.overflow > 0) weak.push('overflow');
  if (desktop.oldMarker) weak.push('old-marker');
  if (!desktop.workbench) weak.push('missing-workbench');
  if (desktop.isCountry && (!desktop.relatedFooter || desktop.relatedLinks < 4)) weak.push('related-footer');
  if (desktop.topSampleLikeCount < (desktop.isCountry ? 3 : 2)) weak.push('few-top-samples');
  if (!desktop.boundary) weak.push('no-boundary');
  if (!desktop.developer) weak.push('no-dev-output');
  if (desktop.textarea && desktop.textarea.h > 180) weak.push('large-textarea');
  if (mobile.overflow > 0) weak.push('mobile-overflow');

  return { route, weak, errors, desktop, mobile };
}

async function main() {
  const options = parseArgs();
  if (!(await exists(siteRoot))) {
    throw new Error(`Generated site root does not exist: ${siteRoot}`);
  }

  const candidates = await collectCandidates(options);
  const routes = chooseRoutes(candidates, options);
  if (!routes.length) throw new Error('No premium tool routes found for visual audit.');

  await withServer(options, async baseUrl => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const aggregate = emptyAggregate();
    const weakRows = [];

    try {
      for (let index = 0; index < routes.length; index += 1) {
        const result = await auditRoute(page, baseUrl, routes[index], index, options);
        addAggregate(aggregate, result.weak);
        if (result.weak.length) weakRows.push(result);
      }
    } finally {
      await browser.close();
    }

    const report = {
      baseUrl,
      checked: routes.length,
      candidates: candidates.length,
      locales: options.locales,
      shards: options.shards,
      shardIndex: options.shardIndex,
      mobileChecked: Math.min(routes.length, options.mobileLimit),
      weakCount: weakRows.length,
      aggregate,
      weakRows: weakRows.slice(0, 40)
    };

    if (weakRows.length) {
      console.error('✗ Premium visual audit failed');
      console.error(JSON.stringify(report, null, 2));
      process.exit(1);
    }

    console.log('✓ Premium visual audit passed');
    console.log(JSON.stringify(report, null, 2));
  });
}

main().catch(error => {
  console.error(error.message || error);
  process.exit(1);
});
