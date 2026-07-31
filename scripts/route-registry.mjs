import { readFile, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');

function decodeHtmlEntities(value) {
  return String(value || '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function titleizeSlug(slug) {
  return String(slug || '')
    .split('-')
    .filter(Boolean)
    .map(part => part.length <= 3 ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function yamlScalar(yaml, key) {
  const inlineMatch = yaml.match(new RegExp(`^\\s*${key}:\\s*["']?(.+?)["']?\\s*$`, 'm'));
  if (inlineMatch?.[1]) return decodeHtmlEntities(inlineMatch[1]);
  const nestedMatch = yaml.match(new RegExp(`^\\s*${key}:\\s*\\n(?:\\s+[^\\n]+\\n)*?\\s+en:\\s*["']?(.+?)["']?\\s*$`, 'm'));
  return nestedMatch?.[1] ? decodeHtmlEntities(nestedMatch[1]) : '';
}

async function readToolMetadata(slug) {
  try {
    const yaml = await readFile(resolve(projectRoot, 'tools', `${slug}.yaml`), 'utf8');
    const name = yamlScalar(yaml, 'name') || yamlScalar(yaml, 'title') || titleizeSlug(slug);
    const summary = yamlScalar(yaml, 'summary');
    const category = yamlScalar(yaml, 'category') || '';
    return { slug, name, summary, category };
  } catch {
    return { slug, name: titleizeSlug(slug), summary: '', category: '' };
  }
}

async function discoverSourceTitle(routePath) {
  if (routePath === '/en/') return 'ValidoHub';
  const parts = routePath.split('/').filter(Boolean);
  if (parts.length === 3 && parts[0] === 'en' && parts[1] === 'tools') {
    const slug = parts[2];
    return (await readToolMetadata(slug)).name;
  }
  if (parts.length === 3 && parts[0] === 'en' && !['categories', 'identifiers', 'tools'].includes(parts[1])) {
    return titleizeSlug(parts[2]);
  }
  if (parts.length >= 3 && parts[0] === 'en' && parts[1] === 'categories') {
    return titleizeSlug(parts[2]);
  }
  return '';
}

async function discoverGeneratedTitle(routePath) {
  const sourceTitle = await discoverSourceTitle(routePath);
  if (sourceTitle) return sourceTitle;
  if (routePath === '/en/') return 'ValidoHub';
  const outputPath = resolve(siteRoot, routePath.replace(/^\//, ''), 'index.html');
  try {
    const html = await readFile(outputPath, 'utf8');
    const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (h1 && h1[1]) return decodeHtmlEntities(h1[1].replace(/<[^>]+>/g, ''));
    const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    if (title && title[1]) return decodeHtmlEntities(title[1].replace(/\s*\|\s*ValidoHub\s*$/i, ''));
  } catch (err) {
    // Keep registry construction resilient; integrity validation catches missing files later.
  }
  return 'Interactive Validator';
}

const NEW_GLOBAL_TOOL_SLUGS = [
  'api-error-code-catalog-builder',
  'bin-iin-shape-inspector',
  'canonical-hreflang-auditor',
  'cookie-samesite-lab',
  'csp-nonce-hash-helper',
  'csv-schema-inferencer',
  'currency-minor-units-checker',
  'duplicate-row-detector',
  'email-header-auth-inspector',
  'idempotency-collision-lab',
  'json-merge-patch-builder',
  'json-patch-builder',
  'jwks-rotation-inspector',
  'jwt-risk-scanner',
  'locale-date-parser',
  'locale-number-parser',
  'log-redaction-rule-tester',
  'luhn-card-fixture-generator',
  'oauth-oidc-flow-debugger',
  'openapi-breaking-change-diff',
  'password-policy-tester',
  'payment-reference-generator',
  'rest-pagination-contract-tester',
  'robots-txt-tester',
  'search-snippet-preview',
  'sepa-pain001-fixture-helper',
  'structured-data-json-ld-validator',
  'unicode-confusable-scanner',
  'webhook-replay-payload-builder',
  'xml-sitemap-inspector'
];

export class RouteRegistry {
  constructor() {
    this.routes = new Map();
  }

  register(path, info) {
    // Normalize trailing slashes
    if (!path.endsWith('/')) {
      path += '/';
    }
    
    if (this.routes.has(path)) {
      const existing = this.routes.get(path);
      throw new Error(`FATAL: Duplicate route registration detected for path "${path}". Existing owner: ${existing.sourceOwner}, New owner: ${info.sourceOwner}`);
    }

    this.routes.set(path, {
      path,
      type: info.type,
      title: info.title,
      canonicalUrl: info.canonicalUrl || `https://validohub.com${path}`,
      sourceOwner: info.sourceOwner, // 'node' | 'java'
      metadata: info.metadata || {},
      outputPath: info.outputPath || resolve(projectRoot, 'generated', 'validohub', path.replace(/^\//, ''), 'index.html')
    });
  }

  has(path) {
    if (!path.endsWith('/')) {
      path += '/';
    }
    return this.routes.has(path);
  }

  get(path) {
    if (!path.endsWith('/')) {
      path += '/';
    }
    return this.routes.get(path);
  }

  getAll() {
    return Array.from(this.routes.values());
  }
}

async function registerCountriesFromSource(registry) {
  const countriesDataDir = resolve(projectRoot, 'countries/data');
  const files = await readdir(countriesDataDir);
  for (const file of files) {
    if (!file.endsWith('.json') || file === 'schema.json') continue;
    const countryContent = await readFile(resolve(countriesDataDir, file), 'utf8');
    const countryData = JSON.parse(countryContent);
    if (!countryData.catalog || !countryData.hub) continue;

    const slug = countryData.id;
    const routePath = `/en/${slug}/`;
    if (!registry.has(routePath)) {
      registry.register(routePath, {
        type: 'country',
        title: `${countryData.catalog.name} Developer Tools & Identifiers | ValidoHub`,
        sourceOwner: 'node',
        metadata: countryData
      });
    }

    for (const toolRoute of countryData.hub.routes || []) {
      const toolPath = toolRoute.href || '';
      if (!toolPath.startsWith(`/en/${slug}/`) || registry.has(toolPath)) continue;
      registry.register(toolPath, {
        type: 'validator',
        title: toolRoute.title || `${countryData.catalog.name} Workbench`,
        sourceOwner: 'node',
        metadata: {
          country: slug,
          countryCode: countryData.catalog.iso2,
          category: toolRoute.category || 'country',
          summary: toolRoute.text || toolRoute.summary || '',
          algorithmId: `validohub.${slug}-suite`
        }
      });
    }
  }
}

async function registerIdentifierRoutes(registry) {
  const identifiersDir = resolve(projectRoot, 'content/identifiers');
  const idDirs = await readdir(identifiersDir);
  for (const id of idDirs) {
    const metaPath = resolve(identifiersDir, id, 'metadata.json');
    try {
      const metaContent = await readFile(metaPath, 'utf8');
      const metadata = JSON.parse(metaContent);

      const countryCodeMap = {
        'pesel': 'PL',
        'nip': 'PL',
        'regon': 'PL',
        'cpf': 'BR',
        'cnpj': 'BR',
        'steuer-id': 'DE'
      };

      metadata.countryCode = countryCodeMap[id] || 'PL';
      metadata.displayName = metadata.name;

      const routePath = `/en/identifiers/${id}/`;
      if (!registry.has(routePath)) {
        registry.register(routePath, {
          type: 'identifier',
          title: `${metadata.name} (${metadata.countryCode}) Specification & Schema | ValidoHub`,
          sourceOwner: 'node',
          metadata
        });
      }
    } catch {
      // Not a directory or missing metadata.json
    }
  }
}

async function registerGlobalToolRoutesFromSitemap(registry) {
  const sitemapPath = resolve(projectRoot, 'generated', 'validohub', 'sitemap.xml');
  let sitemapContent = '';
  try {
    sitemapContent = await readFile(sitemapPath, 'utf8');
  } catch {
    sitemapContent = '';
  }

  const slugs = new Set(NEW_GLOBAL_TOOL_SLUGS);
  const locRegex = /<loc>https:\/\/validohub\.com\/en\/tools\/([^/<]+)\/<\/loc>/g;
  let match;
  while ((match = locRegex.exec(sitemapContent)) !== null) {
    slugs.add(match[1]);
  }

  for (const slug of [...slugs].sort()) {
    const tool = await readToolMetadata(slug);
    const routePath = `/en/tools/${slug}/`;
    if (registry.has(routePath)) continue;
    registry.register(routePath, {
      type: 'validator',
      title: tool.name,
      sourceOwner: 'java',
      metadata: {
        category: tool.category || 'global',
        summary: tool.summary,
        algorithmId: `validohub.${slug}`
      }
    });
  }
}

export async function buildDevRouteRegistry() {
  const registry = new RouteRegistry();

  registry.register('/en/', {
    type: 'home',
    title: 'ValidoHub',
    sourceOwner: 'node'
  });
  registry.register('/en/tools/', {
    type: 'tools',
    title: 'Global Tools | ValidoHub',
    sourceOwner: 'node'
  });
  registry.register('/en/countries/', {
    type: 'countries',
    title: 'Countries | ValidoHub',
    sourceOwner: 'node'
  });
  registry.register('/en/categories/national-identifiers/', {
    type: 'category',
    title: 'National Identifiers | ValidoHub',
    sourceOwner: 'node'
  });

  await registerCountriesFromSource(registry);
  await registerIdentifierRoutes(registry);
  await registerGlobalToolRoutesFromSitemap(registry);

  return registry;
}

export async function buildRouteRegistry() {
  const registry = new RouteRegistry();

  // 1. Load Java-owned routes from target sitemap.xml
  const sitemapPath = resolve(projectRoot, 'generated', 'validohub', 'sitemap.xml');
  let sitemapContent = '';
  try {
    sitemapContent = await readFile(sitemapPath, 'utf8');
  } catch (err) {
    throw new Error(`FATAL: Could not read sitemap.xml to discover Java-owned routes. Make sure the Java publisher has run. Error: ${err.message}`);
  }

  const locRegex = /<loc>https:\/\/validohub\.com([^<]+)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(sitemapContent)) !== null) {
    let routePath = match[1];
    if (!routePath.endsWith('/')) {
      routePath += '/';
    }

    // Determine type
    let type = 'validator';
    if (routePath === '/en/') {
      type = 'home';
    } else if (routePath.includes('/categories/')) {
      type = 'category';
    } else if (routePath.includes('/tools/')) {
      type = 'validator';
    } else {
      // Skip country routes from Java ownership (they are owned by Node)
      const parts = routePath.split('/').filter(Boolean);
      if (parts.length === 2 && parts[0] === 'en') {
        continue;
      }
    }

    registry.register(routePath, {
      type,
      title: await discoverGeneratedTitle(routePath),
      sourceOwner: 'java'
    });
  }

  // 2. Load Node-owned country routes from countries/data/*.json
  await registerCountriesFromSource(registry);

  // 3. Load Node-owned Countries Portal Route
  registry.register('/en/countries/', {
    type: 'countries',
    title: 'Countries | ValidoHub',
    sourceOwner: 'node'
  });

  // 4. Load Node-owned identifier routes from content/identifiers/*/metadata.json
  await registerIdentifierRoutes(registry);

  return registry;
}
