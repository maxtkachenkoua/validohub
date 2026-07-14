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

async function discoverGeneratedTitle(routePath) {
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
  const countriesDataDir = resolve(projectRoot, 'countries/data');
  const files = await readdir(countriesDataDir);
  for (const file of files) {
    if (file.endsWith('.json') && file !== 'schema.json') {
      const countryContent = await readFile(resolve(countriesDataDir, file), 'utf8');
      const countryData = JSON.parse(countryContent);
      if (countryData.catalog && countryData.hub) {
        const slug = countryData.id;
        const routePath = `/en/${slug}/`;
        registry.register(routePath, {
          type: 'country',
          title: `${countryData.catalog.name} Developer Tools & Identifiers | ValidoHub`,
          sourceOwner: 'node',
          metadata: countryData
        });
      }
    }
  }

  // 3. Load Node-owned Countries Portal Route
  registry.register('/en/countries/', {
    type: 'countries',
    title: 'Countries | ValidoHub',
    sourceOwner: 'node'
  });

  // 4. Load Node-owned identifier routes from content/identifiers/*/metadata.json
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
      registry.register(routePath, {
        type: 'identifier',
        title: `${metadata.name} (${metadata.countryCode}) Specification & Schema | ValidoHub`,
        sourceOwner: 'node',
        metadata: metadata
      });
    } catch (e) {
      // Not a directory or missing metadata.json
    }
  }

  return registry;
}
