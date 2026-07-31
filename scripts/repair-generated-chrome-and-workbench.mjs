import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');

const LABELS = {
  en: { home: 'Home', tools: 'Tools', countries: 'Countries', identifiers: 'Identifiers', navigation: 'Main navigation', homeAria: 'ValidoHub home', workbench: 'Workbench', heading: 'Interactive workbench', text: 'Start with a sample, run the check locally, and copy the highlighted result.' },
  fr: { home: 'Accueil', tools: 'Outils', countries: 'Pays', identifiers: 'Identifiants', navigation: 'Navigation principale', homeAria: 'Accueil ValidoHub', workbench: 'Atelier', heading: 'Atelier interactif', text: 'Commencez par un exemple, lancez le contrôle localement, puis copiez le résultat mis en évidence.' },
  uk: { home: 'Головна', tools: 'Інструменти', countries: 'Країни', identifiers: 'Ідентифікатори', navigation: 'Головна навігація', homeAria: 'Головна ValidoHub', workbench: 'Воркбенч', heading: 'Інтерактивний воркбенч', text: 'Почніть із прикладу, запустіть локальну перевірку й скопіюйте виділений результат.' },
  de: { home: 'Startseite', tools: 'Tools', countries: 'Länder', identifiers: 'Kennungen', navigation: 'Hauptnavigation', homeAria: 'ValidoHub Startseite', workbench: 'Workbench', heading: 'Interaktive Workbench', text: 'Beginnen Sie mit einem Beispiel, führen Sie die lokale Prüfung aus und kopieren Sie das hervorgehobene Ergebnis.' },
  es: { home: 'Inicio', tools: 'Herramientas', countries: 'Países', identifiers: 'Identificadores', navigation: 'Navegación principal', homeAria: 'Inicio de ValidoHub', workbench: 'Banco de trabajo', heading: 'Banco de trabajo interactivo', text: 'Empieza con un ejemplo, ejecuta la comprobación local y copia el resultado destacado.' },
  pl: { home: 'Start', tools: 'Narzędzia', countries: 'Kraje', identifiers: 'Identyfikatory', navigation: 'Nawigacja główna', homeAria: 'Strona główna ValidoHub', workbench: 'Workbench', heading: 'Interaktywny workbench', text: 'Zacznij od przykładu, uruchom lokalne sprawdzenie i skopiuj wyróżniony wynik.' },
  'pt-BR': { home: 'Início', tools: 'Ferramentas', countries: 'Países', identifiers: 'Identificadores', navigation: 'Navegação principal', homeAria: 'Início ValidoHub', workbench: 'Workbench', heading: 'Workbench interativo', text: 'Comece com um exemplo, execute a verificação localmente e copie o resultado em destaque.' }
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function localeFromPath(filePath) {
  const parts = filePath.split(sep);
  const marker = parts.lastIndexOf('validohub');
  return marker >= 0 ? parts[marker + 1] || 'en' : 'en';
}

function routeFromPath(filePath) {
  const parts = filePath.split(sep);
  const marker = parts.lastIndexOf('validohub');
  const routeParts = marker >= 0 ? parts.slice(marker + 1, -1) : [];
  return `/${routeParts.join('/')}/`;
}

function activeFor(route) {
  const isGlobalTool = route.includes('/tools/');
  const isIdentifier = route.includes('/identifiers/') || route.includes('/categories/national-identifiers/');
  const isCountriesDirectory = route.includes('/countries/');
  const routeParts = route.split('/').filter(Boolean);
  const isCountryArea = isCountriesDirectory || (!isGlobalTool && !isIdentifier && routeParts.length >= 2);
  return {
    home: routeParts.length === 1,
    tools: isGlobalTool,
    countries: isCountryArea,
    identifiers: isIdentifier
  };
}

function renderHeader(locale, route) {
  const labels = LABELS[locale] || LABELS.en;
  const prefix = `/${locale}/`;
  const active = activeFor(route);
  const link = (href, label, isActive) => `<a href="${href}"${isActive ? ' aria-current="page" class="is-active"' : ''}>${escapeHtml(label)}</a>`;
  return `<header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="${prefix}" aria-label="${escapeHtml(labels.homeAria)}">
        <span class="brand-mark">V</span>
        <span class="brand-text">ValidoHub</span>
      </a>
      <nav class="primary-nav" aria-label="${escapeHtml(labels.navigation)}">
        ${link(prefix, labels.home, active.home)}
        ${link(`${prefix}tools/`, labels.tools, active.tools)}
        ${link(`${prefix}countries/`, labels.countries, active.countries)}
        ${link(`${prefix}categories/national-identifiers/`, labels.identifiers, active.identifiers)}
      </nav>
    </div>
  </header>`;
}

async function scanHtmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) out.push(...await scanHtmlFiles(full));
    else if (entry.isFile() && entry.name === 'index.html') out.push(full);
  }
  return out;
}

function repairHeader(content, locale, route) {
  return content.replace(/<header class="site-header">[\s\S]*?<\/header>/, renderHeader(locale, route));
}

function removeLegacyWorkbenchHeading(content) {
  return content.replace(
    /\s*<div class="workbench-heading(?: workbench-heading-compact)?">[\s\S]*?<\/div>\s*(?=<div class="workbench-list">)/giu,
    '\n          '
  );
}

function removeGeneratedFooterText(content) {
  return content.replace(/\s*<p>[^<]*Valido Engine\.?[^<]*<\/p>/giu, '');
}

function removeFakeApiPreview(content) {
  let next = content;
  next = next.replace(/\s*<section[^>]*>\s*(?=[\s\S]{0,3000}(?:Developer API Preview|api\.validohub|curl -X|Endpoint shape|example contract only))[\s\S]*?(?:<\/details>\s*)?<\/section>/giu, '');
  next = next.replace(/\s*<details[^>]*>\s*(?=[\s\S]{0,2000}(?:Developer API Preview|api\.validohub|curl -X|Endpoint shape|example contract only))[\s\S]*?<\/details>/giu, '');
  return next;
}

function repairContent(content, filePath) {
  const locale = localeFromPath(filePath);
  const route = routeFromPath(filePath);
  let next = content;
  next = repairHeader(next, locale, route);
  next = removeLegacyWorkbenchHeading(next);
  next = removeGeneratedFooterText(next);
  next = removeFakeApiPreview(next);
  return next;
}

const htmlFiles = await scanHtmlFiles(siteRoot);
let updated = 0;
let scanned = 0;

for (const filePath of htmlFiles) {
  scanned++;
  const current = await readFile(filePath, 'utf8');
  const next = repairContent(current, filePath);
  if (next !== current) {
    await writeFile(filePath, next, 'utf8');
    updated++;
  }
  if (scanned % 10000 === 0) {
    console.log(`...scanned ${scanned}, updated ${updated}`);
  }
}

console.log(`✓ Repaired generated chrome/workbench/API copy on ${updated}/${scanned} pages`);
