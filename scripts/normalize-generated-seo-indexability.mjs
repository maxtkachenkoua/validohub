import { access, readdir, readFile, writeFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';

function splitRouteLocale(pathname) {
  const parts = String(pathname || '/').split('/').filter(Boolean);
  if (!parts.length) return { locale: 'en', suffix: '/' };
  const locale = parts[0];
  const suffixParts = parts.slice(1);
  return { locale, suffix: suffixParts.length ? `/${suffixParts.join('/')}/` : '/' };
}

function routeForLocale(localeCode, suffix) {
  return suffix === '/' ? `/${localeCode}/` : `/${localeCode}${suffix}`;
}

function parseLocaleList(value) {
  return String(value || '')
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);
}

function getSeoIndexableLocales(configuredLocales) {
  const configured = new Set(configuredLocales);
  const requested = parseLocaleList(process.env.VALIDOHUB_SEO_LOCALES || 'en')
    .filter(localeCode => configured.has(localeCode));
  if (!requested.includes('en') && configured.has('en')) requested.unshift('en');
  return new Set(requested.length > 0 ? requested : ['en']);
}

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function outputPathForRoute(siteRoot, routePath) {
  return resolve(siteRoot, routePath.replace(/^\//, ''), 'index.html');
}

async function injectAlternateLinks(content, currentPath, siteRoot, locales) {
  const { locale: currentLocale, suffix } = splitRouteLocale(currentPath);
  const alternateTags = [];
  for (const localeCode of locales) {
    const candidatePath = routeForLocale(localeCode, suffix);
    if (await pathExists(outputPathForRoute(siteRoot, candidatePath))) {
      alternateTags.push(`<link rel="alternate" hreflang="${localeCode}" href="https://validohub.com${candidatePath}">`);
    }
  }
  const englishPath = routeForLocale('en', suffix);
  if (await pathExists(outputPathForRoute(siteRoot, englishPath))) {
    alternateTags.push(`<link rel="alternate" hreflang="x-default" href="https://validohub.com${englishPath}">`);
  }

  let next = content.replace(/<link rel="alternate" hreflang="[^"]+" href="[^"]+">\s*/gi, '');
  const alternatesBlock = alternateTags.join('\n  ');
  if (alternatesBlock) {
    next = next.replace('</head>', `  ${alternatesBlock}\n</head>`);
  }
  return next.replace(/<html\s+lang="[^"]+">/i, `<html lang="${currentLocale}">`);
}

function normalizeSeoIndexabilityMeta(content, routePath, indexableLocales) {
  const { locale: routeLocale } = splitRouteLocale(routePath);
  const shouldIndex = indexableLocales.has(routeLocale);
  let next = content.replace(/<meta\s+name=["']robots["']\s+content=["'][^"']*["']\s*>\s*/gi, '');
  if (!shouldIndex) {
    next = next.replace(/<\/head>/i, '  <meta name="robots" content="noindex, follow">\n</head>');
  }
  return next;
}

async function collectIndexHtmlFiles(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      await collectIndexHtmlFiles(fullPath, files);
    } else if (entry.isFile() && entry.name === 'index.html') {
      files.push(fullPath);
    }
  }
  return files;
}

function routePathForOutput(siteRoot, outputPath) {
  const rel = relative(siteRoot, outputPath).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  const withoutIndex = rel.replace(/\/index\.html$/i, '/');
  return `/${withoutIndex}`;
}

async function main() {
  const siteRoot = resolve('generated/validohub');
  const configuredLocales = ['en', 'es', 'pt-BR', 'de', 'fr', 'uk', 'pl'];
  const indexableLocales = getSeoIndexableLocales(configuredLocales);
  const files = await collectIndexHtmlFiles(siteRoot);
  let checked = 0;
  let changed = 0;

  for (const file of files) {
    const routePath = routePathForOutput(siteRoot, file);
    const content = await readFile(file, 'utf8');
    let next = await injectAlternateLinks(content, routePath, siteRoot, indexableLocales);
    next = normalizeSeoIndexabilityMeta(next, routePath, indexableLocales);
    checked += 1;
    if (next !== content) {
      await writeFile(file, next, 'utf8');
      changed += 1;
    }
    if (checked % 5000 === 0) {
      console.log(`[seo-indexability] ${checked} checked, ${changed} changed`);
    }
  }

  console.log(`✓ Normalized SEO indexability on ${checked} generated pages; changed ${changed}`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
