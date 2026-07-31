#!/usr/bin/env node
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const projectRoot = resolve(dirname(new URL(import.meta.url).pathname), '..');
const siteRoot = resolve(projectRoot, 'generated/validohub');
const assetsManifestPath = resolve(projectRoot, 'assets/assets-manifest.json');
const sitemapPath = resolve(siteRoot, 'sitemap.xml');

const slugs = [
  'oauth-oidc-flow-debugger',
  'jwt-risk-scanner',
  'jwks-rotation-inspector',
  'openapi-breaking-change-diff',
  'json-patch-builder',
  'json-merge-patch-builder',
  'rest-pagination-contract-tester',
  'api-error-code-catalog-builder',
  'webhook-replay-payload-builder',
  'idempotency-collision-lab',
  'robots-txt-tester',
  'xml-sitemap-inspector',
  'canonical-hreflang-auditor',
  'search-snippet-preview',
  'structured-data-json-ld-validator',
  'csv-schema-inferencer',
  'duplicate-row-detector',
  'unicode-confusable-scanner',
  'locale-number-parser',
  'locale-date-parser',
  'luhn-card-fixture-generator',
  'bin-iin-shape-inspector',
  'currency-minor-units-checker',
  'sepa-pain001-fixture-helper',
  'payment-reference-generator',
  'password-policy-tester',
  'csp-nonce-hash-helper',
  'cookie-samesite-lab',
  'email-header-auth-inspector',
  'log-redaction-rule-tester'
];

const themeByNeedle = [
  ['finance', ['iban', 'luhn', 'bin-iin', 'currency', 'sepa', 'payment']],
  ['security', ['oauth', 'jwt', 'jwks', 'password', 'csp', 'cookie', 'email-header', 'log-redaction']],
  ['publishing', ['robots', 'sitemap', 'canonical', 'hreflang', 'snippet', 'structured-data']],
  ['data', ['csv', 'duplicate', 'unicode', 'locale', 'json-patch', 'json-merge']],
  ['developer', ['openapi', 'rest', 'api-error', 'webhook', 'idempotency']]
];

const groupLabels = {
  data: 'Payload contracts',
  developer: 'API workflow',
  finance: 'Payment fixtures',
  publishing: 'Search & metadata',
  security: 'Security review'
};

const chipsByTheme = {
  data: ['Schema-safe', 'Diff-ready', 'Fixture export'],
  developer: ['Contract review', 'Replay evidence', 'Client-safe'],
  finance: ['Fixture-safe', 'Offline math', 'Copy-ready'],
  publishing: ['SEO boundary', 'Rich-result review', 'No crawler calls'],
  security: ['No upload', 'PII-safe', 'Local evidence']
};

function yamlScalar(block, key) {
  const localized = block.match(new RegExp('^[ \\t]*' + key + ':[ \\t]*\\n[ \\t]+en:[ \\t]*(.+)$', 'm'));
  if (localized) return localized[1].trim().replace(/^["']|["']$/g, '');
  const direct = block.match(new RegExp('^[ \\t]*' + key + ':[ \\t]*(.+)$', 'm'));
  if (direct) return direct[1].trim().replace(/^["']|["']$/g, '');
  return '';
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function plainJson(value) {
  return value.replace(/</g, '\\u003c');
}

async function pathExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function currentAssetHref() {
  if (await pathExists(assetsManifestPath)) {
    const manifest = JSON.parse(await readFile(assetsManifestPath, 'utf8'));
    if (manifest && manifest.css) return manifest.css;
  }
  return '/assets/css/bundle.690810.css';
}

function prettifySlug(slug) {
  return slug
    .split('-')
    .map(part => /^(api|jwt|jwks|json|ld|xml|url|csv|iban|uuid|csp|seo|bin|iin|sepa)$/i.test(part) ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
    .replace(/\bJson\b/g, 'JSON')
    .replace(/\bLd\b/g, 'LD');
}

function markForTitle(title) {
  const words = String(title || '')
    .replace(/[^a-z0-9 ]/gi, ' ')
    .split(/\s+/)
    .filter(word => word && !['and', 'the', 'for', 'with', 'rule'].includes(word.toLowerCase()));
  return (words.slice(0, 3).map(word => word[0]).join('') || 'VH').toUpperCase();
}

function themeForSlug(slug) {
  for (const [theme, needles] of themeByNeedle) {
    if (needles.some(needle => slug.includes(needle))) return theme;
  }
  return 'developer';
}

function parseActions(yaml) {
  const match = yaml.match(/actions:\s*\[([^\]]+)\]/);
  if (!match) return ['validate', 'generate', 'explain', 'parse'];
  const actions = match[1].split(',').map(action => action.trim()).filter(Boolean);
  return actions.length ? actions : ['validate', 'generate', 'explain', 'parse'];
}

function parseInputs(yaml) {
  const inputsMatch = yaml.match(/inputs:\s*\n([\s\S]*?)\n\s*actions:/);
  if (!inputsMatch) {
    return [
      { type: 'textarea', name: 'input', label: 'Input' },
      { type: 'select', name: 'profile', label: 'Profile', options: ['strict', 'review', 'fixture'], value: 'strict' }
    ];
  }
  const blocks = ('\n' + inputsMatch[1]).split(/\n\s*-\s+type:\s*/).slice(1);
  const fields = blocks.map(block => {
    const firstLine = block.split('\n')[0].trim();
    const type = firstLine || 'textarea';
    const name = yamlScalar(block, 'name') || 'input';
    const label = yamlScalar(block, 'label') || prettifySlug(name);
    const defaultValue = yamlScalar(block, 'default') || yamlScalar(block, 'value') || '';
    const optionsMatch = block.match(/options:\s*\n([\s\S]*?)(?:\n\s{4,}\w|\n\s*-\s+type:|$)/);
    const options = optionsMatch
      ? [...optionsMatch[1].matchAll(/^\s*-\s+(.+)$/gm)].map(match => match[1].trim().replace(/^["']|["']$/g, ''))
      : [];
    return { type, name, label, value: defaultValue, options };
  });
  return fields.length ? fields : [{ type: 'textarea', name: 'input', label: 'Input' }];
}

function relatedSlugs(yaml) {
  const explicit = yaml.match(/explicit:\s*\[([^\]]+)\]/);
  if (!explicit) return [];
  return explicit[1].split(',').map(item => item.trim()).filter(Boolean).slice(0, 6);
}

async function readToolMeta(slug) {
  const yamlPath = resolve(projectRoot, 'tools', slug + '.yaml');
  const yaml = await readFile(yamlPath, 'utf8');
  const title = yamlScalar(yaml, 'name') || yamlScalar(yaml, 'title') || prettifySlug(slug);
  const summary = yamlScalar(yaml, 'summary') || yamlScalar(yaml, 'description') || `Run interactive ${title} checks and validations.`;
  const algorithmMatch = yaml.match(/algorithmId:\s*([^\s]+)/);
  return {
    slug,
    yaml,
    title,
    summary,
    theme: themeForSlug(slug),
    algorithmId: algorithmMatch ? algorithmMatch[1].trim() : `validohub.${slug}`,
    actions: parseActions(yaml),
    fields: parseInputs(yaml),
    related: relatedSlugs(yaml)
  };
}

async function readTitleForSlug(slug) {
  const filePath = resolve(projectRoot, 'tools', slug + '.yaml');
  if (!(await pathExists(filePath))) return prettifySlug(slug);
  const yaml = await readFile(filePath, 'utf8');
  return yamlScalar(yaml, 'name') || yamlScalar(yaml, 'title') || prettifySlug(slug);
}

function renderField(field) {
  const label = escapeHtml(field.label || prettifySlug(field.name));
  const name = escapeHtml(field.name);
  if (field.type === 'select') {
    const options = field.options.length ? field.options : ['strict', 'review', 'fixture'];
    return `<label class="field global-premium-field">
                  <span>${label}</span>
                  <select name="${name}">
                    ${options.map(option => `<option value="${escapeHtml(option)}"${option === field.value ? ' selected="selected"' : ''}>${escapeHtml(option)}</option>`).join('\n                    ')}
                  </select>
                </label>`;
  }
  if (field.type === 'checkbox') {
    return `<label class="field-inline global-premium-field">
                  <input type="checkbox" name="${name}"${field.value === 'true' ? ' checked="checked"' : ''}>
                  <span>${label}</span>
                </label>`;
  }
  if (field.type === 'input' || field.type === 'text') {
    return `<label class="field global-premium-field">
                  <span>${label}</span>
                  <input type="text" name="${name}" value="${escapeHtml(field.value || '')}">
                </label>`;
  }
  return `<label class="field global-premium-field">
                  <span>${label}</span>
                  <textarea name="${name}">${escapeHtml(field.value || '')}</textarea>
                </label>`;
}

function renderActionButtons(actions) {
  const labels = {
    calculate: 'Calculate',
    convert: 'Convert',
    explain: 'Explain',
    format: 'Format',
    generate: 'Generate',
    parse: 'Parse',
    validate: 'Analyze locally'
  };
  return actions.map((action, index) => {
    const className = index === 0 ? 'button button-primary' : 'button button-secondary';
    return `<button type="button" class="${className}" data-action="${escapeHtml(action)}">${escapeHtml(labels[action] || prettifySlug(action))}</button>`;
  }).join('\n                ');
}

async function renderRelated(meta) {
  const related = [];
  for (const slug of meta.related) {
    related.push({ slug, title: await readTitleForSlug(slug) });
  }
  related.push({ slug: 'json-schema-workbench', title: 'JSON Schema Workbench' });
  related.push({ slug: 'secret-pii-redactor', title: 'Secret & PII Scanner Redactor' });
  related.push({ slug: 'iban-generator', title: 'IBAN Generator' });
  const unique = related.filter((item, index, list) => item.slug !== meta.slug && list.findIndex(candidate => candidate.slug === item.slug) === index).slice(0, 6);
  return `<section class="global-premium-related" aria-labelledby="related-global-tools">
          <div class="section-heading">
            <span class="eyebrow">Related tools</span>
            <h2 id="related-global-tools">Continue with focused global workflows</h2>
          </div>
          <div class="global-premium-related-grid">
            ${unique.map(item => `<a href="/en/tools/${escapeHtml(item.slug)}/" class="link-card">
              <span>${escapeHtml(item.title)}</span>
              <span aria-hidden="true">→</span>
            </a>`).join('\n            ')}
            <a href="/en/tools/" class="link-card global-premium-all-tools">
              <span>All global tools</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>`;
}

function renderHead(meta, cssHref) {
  const structuredData = plainJson(JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: meta.title,
    description: meta.summary,
    url: `https://validohub.com/en/tools/${meta.slug}/`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All'
  }));
  return `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeHtml(meta.summary)}">
  <link rel="canonical" href="https://validohub.com/en/tools/${escapeHtml(meta.slug)}/">
  <link rel="stylesheet" href="${escapeHtml(cssHref)}">
  <script>
    window.MathJax = {
      tex: { inlineMath: [['$','$']], displayMath: [['$$','$$']] },
      options: { skipHtmlTags: ['script','noscript','style','textarea','pre'] }
    };
  </script>
  <script defer src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
  <script type="application/ld+json">${structuredData}</script>
  <meta property="og:title" content="${escapeHtml(meta.title)}">
  <meta property="og:description" content="${escapeHtml(meta.summary)}">
  <meta property="og:url" content="https://validohub.com/en/tools/${escapeHtml(meta.slug)}/">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escapeHtml(meta.title)}">
  <meta name="twitter:description" content="${escapeHtml(meta.summary)}">
  <link rel="alternate" hreflang="en" href="https://validohub.com/en/tools/${escapeHtml(meta.slug)}/">
  <link rel="alternate" hreflang="es" href="https://validohub.com/es/tools/${escapeHtml(meta.slug)}/">
  <link rel="alternate" hreflang="pt-BR" href="https://validohub.com/pt-BR/tools/${escapeHtml(meta.slug)}/">
  <link rel="alternate" hreflang="de" href="https://validohub.com/de/tools/${escapeHtml(meta.slug)}/">
  <link rel="alternate" hreflang="fr" href="https://validohub.com/fr/tools/${escapeHtml(meta.slug)}/">
  <link rel="alternate" hreflang="pl" href="https://validohub.com/pl/tools/${escapeHtml(meta.slug)}/">
  <link rel="alternate" hreflang="uk" href="https://validohub.com/uk/tools/${escapeHtml(meta.slug)}/">
  <link rel="alternate" hreflang="x-default" href="https://validohub.com/en/tools/${escapeHtml(meta.slug)}/">
</head>`;
}

function renderHeader() {
  return `<header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="/en/" aria-label="Home">
        <span class="brand-mark">V</span>
        <span class="brand-text">ValidoHub</span>
      </a>
      <nav class="primary-nav" aria-label="Main navigation"><a href="/en/">Home</a><a href="/en/tools/" aria-current="page" class="is-active">Tools</a><a href="/en/countries/">Countries</a><a href="/en/categories/national-identifiers/">Identifiers</a></nav>
    </div>
  </header>`;
}

function renderFooter() {
  return `<footer class="site-footer">
    <div class="container footer-inner">
      <a class="brand" href="/en/" aria-label="ValidoHub home">
        <span class="brand-mark">V</span>
        <span class="brand-text">ValidoHub</span>
      </a>
      <nav class="footer-links" aria-label="Footer navigation"><a href="/en/tools/">Tools</a><a href="/en/countries/">Countries</a><a href="/en/categories/national-identifiers/">Identifiers</a><a href="/sitemap.xml">Sitemap</a></nav>
    </div>
  </footer>`;
}

async function renderPage(meta, cssHref) {
  const groupLabel = groupLabels[meta.theme] || 'Developer utility';
  const chips = chipsByTheme[meta.theme] || chipsByTheme.developer;
  const activeAction = meta.actions[0] || 'validate';
  const fields = meta.fields.map(renderField).join('\n                ');
  const related = await renderRelated(meta);
  return `<!doctype html>
<html lang="en">
${renderHead(meta, cssHref)}
<body>
  ${renderHeader()}
  <main class="site-main global-premium-tool-page">
    <section class="page-shell">
      <div class="container page-stack">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li><a href="/en/">Home</a></li>
            <li><a href="/en/tools/">Developer Tools</a></li>
            <li><span>${escapeHtml(meta.title)}</span></li>
          </ol>
        </nav>

        <section class="global-premium-tool-hero browser-workbench" data-generic-theme="${escapeHtml(meta.theme)}" data-algorithm-id="${escapeHtml(meta.algorithmId)}">
          <div class="global-premium-tool-copy">
            <span class="global-premium-tool-mark">${escapeHtml(markForTitle(meta.title))}</span>
            <div>
              <p class="global-premium-kicker">${escapeHtml(groupLabel)}</p>
              <h1>${escapeHtml(meta.title)}</h1>
              <p>${escapeHtml(meta.summary)}</p>
            </div>
            <div class="generic-premium-chips">
              ${chips.map(chip => `<span>${escapeHtml(chip)}</span>`).join('\n              ')}
            </div>
          </div>
          <aside class="generic-premium-boundary">
            <span>Privacy boundary</span>
            <strong>Runs locally</strong>
            <small>No upload, no database writes, no server-side execution for input payloads.</small>
          </aside>
        </section>

        <section class="workbench-card global-premium-workbench-card" aria-label="Tool input and output">
          <div class="workbench-list">
            <form class="tool-workbench browser-workbench generic-suite-workbench" id="tool-${escapeHtml(meta.slug)}-${escapeHtml(activeAction)}" data-algorithm-id="${escapeHtml(meta.algorithmId)}" data-capability="${escapeHtml(activeAction)}" data-generic-theme="${escapeHtml(meta.theme)}">
              <div class="workbench-form-heading">
                <h3>${escapeHtml(activeAction === 'validate' ? 'Analyze' : prettifySlug(activeAction))}</h3>
                <span class="input-mode-badge" data-input-mode-badge>Waiting for input</span>
              </div>
              <div class="field-grid global-premium-field-grid">
                ${fields}
              </div>
              <div class="button-row">
                ${renderActionButtons(meta.actions)}
                <button type="button" class="button button-secondary" data-tool-copy>Copy result</button>
                <button type="button" class="button button-secondary" data-tool-download>Download result</button>
                <button type="button" class="button button-ghost" data-tool-clear>Clear</button>
              </div>
              <label class="field output-field">
                <span>Output</span>
                <textarea class="tool-output" readonly data-tool-output></textarea>
              </label>
              <p class="tool-message" aria-live="polite" data-tool-message></p>
              <div class="tool-feedback" data-tool-feedback></div>
              <div class="preview-panel" data-tool-preview></div>
              <details class="advanced-panel" data-advanced-panel>
                <summary>Advanced analysis</summary>
                <div data-tool-advanced></div>
              </details>
            </form>
          </div>
        </section>

        ${related}
      </div>
    </section>
  </main>
  ${renderFooter()}
  <script src="/assets/js/bundle.1f2dae.js" defer></script>
  <script src="/assets/js/workbench/clipboard.js?v=country-premium-clickfix-20260730"></script>
  <script src="/assets/js/workbench/download.js?v=country-premium-clickfix-20260730"></script>
  <script src="/assets/js/workbench/file.js?v=country-premium-clickfix-20260730"></script>
  <script src="/assets/js/workbench/keyboard.js?v=country-premium-clickfix-20260730"></script>
  <script src="/assets/js/workbench/preview.js?v=country-premium-clickfix-20260730"></script>
  <script src="/assets/js/workbench/stats.js?v=country-premium-clickfix-20260730"></script>
  <script src="/assets/js/workbench/utf8.js?v=country-premium-clickfix-20260730"></script>
  <script src="/assets/js/workbench/hex.js?v=country-premium-clickfix-20260730"></script>
  <script src="/assets/js/workbench/framework.js?v=country-premium-clickfix-20260730"></script>
  <script src="/assets/js/tools/generic-suite.js?v=generic-suite-clickfix-mount-20260730"></script>
</body>
</html>
`;
}

async function ensureSitemapRoutes(metas) {
  let sitemap = await readFile(sitemapPath, 'utf8');
  const additions = [];
  for (const meta of metas) {
    const loc = `https://validohub.com/en/tools/${meta.slug}/`;
    if (!sitemap.includes(loc)) {
      additions.push(`  <url><loc>${loc}</loc></url>`);
    }
  }
  if (additions.length) {
    sitemap = sitemap.replace('</urlset>', additions.join('\n') + '\n</urlset>');
    await writeFile(sitemapPath, sitemap, 'utf8');
  }
  return additions.length;
}

async function main() {
  const cssHref = await currentAssetHref();
  const metas = [];
  for (const slug of slugs) {
    const meta = await readToolMeta(slug);
    metas.push(meta);
    const outputPath = resolve(siteRoot, 'en/tools', slug, 'index.html');
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, await renderPage(meta, cssHref), 'utf8');
  }
  const sitemapAdded = await ensureSitemapRoutes(metas);
  console.log(`Materialized ${metas.length} premium global tool pages; added ${sitemapAdded} sitemap routes.`);
}

main().catch(error => {
  console.error(error.message || error);
  process.exit(1);
});
