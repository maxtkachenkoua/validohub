import { access, cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDevRouteRegistry } from "./route-registry.mjs";
import { compileToolsPortal } from "./build-countries-portal.mjs";
import { applyFinalLocalizationPass } from "./localization-pass.mjs";
import { updateBundleAssetLinks } from "./dev-asset-links.mjs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "..");
const siteRoot = resolve(projectRoot, "generated", "validohub");
const CORE_PRODUCTION_LOCALES = ["en", "es", "pt-BR", "de", "fr", "pl", "uk"];
const HEADER_LABELS = {
  en: { home: "Home", tools: "Tools", countries: "Countries", identifiers: "Identifiers", aria: "Main navigation" },
  es: { home: "Inicio", tools: "Herramientas", countries: "Países", identifiers: "Identificadores", aria: "Navegación principal" },
  "pt-BR": { home: "Início", tools: "Ferramentas", countries: "Países", identifiers: "Identificadores", aria: "Navegação principal" },
  de: { home: "Start", tools: "Werkzeuge", countries: "Länder", identifiers: "Kennungen", aria: "Hauptnavigation" },
  fr: { home: "Accueil", tools: "Outils", countries: "Pays", identifiers: "Identifiants", aria: "Navigation principale" },
  pl: { home: "Start", tools: "Narzędzia", countries: "Kraje", identifiers: "Identyfikatory", aria: "Nawigacja główna" },
  uk: { home: "Головна", tools: "Інструменти", countries: "Країни", identifiers: "Ідентифікатори", aria: "Головна навігація" }
};

function usage() {
  return [
    "Usage: node scripts/build-tools-dev.mjs [--slugs slug-a,slug-b] [--locales en,pl]",
    "",
    "Fast global-tools materializer. It recompiles shared CSS/JS assets, renders /en/tools/ from source,",
    "syncs browser runtimes, refreshes selected generated /tools/<slug>/ pages, and localizes the portal plus selected pages.",
    "It does not run the Java publisher; new YAML routes still require a release/full build once."
  ].join("\n");
}

function parseArgs(argv) {
  const args = { slugs: [], locales: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--slugs" || arg === "-s") args.slugs = String(argv[++i] || "").split(",").map(s => s.trim()).filter(Boolean);
    else if (arg.startsWith("--slugs=")) args.slugs = arg.slice("--slugs=".length).split(",").map(s => s.trim()).filter(Boolean);
    else if (arg === "--locales" || arg === "-l") args.locales = String(argv[++i] || "").split(",").map(s => s.trim()).filter(Boolean);
    else if (arg.startsWith("--locales=")) args.locales = arg.slice("--locales=".length).split(",").map(s => s.trim()).filter(Boolean);
    else if (arg === "--help" || arg === "-h") args.help = true;
  }
  return args;
}

async function pathExists(filePath) {
  try { await access(filePath); return true; } catch { return false; }
}

async function configuredLocales() {
  const siteConfig = await readFile(resolve(projectRoot, "site.yaml"), "utf8");
  const inline = siteConfig.match(/^locales:\s*\[(.*?)\]\s*$/m);
  if (!inline) return CORE_PRODUCTION_LOCALES;
  const values = inline[1].split(",").map(item => item.trim()).filter(Boolean);
  return values.length ? values : CORE_PRODUCTION_LOCALES;
}

async function compileDesignAssets() {
  const cssSourceFiles = [
    "variables.css", "reset.css", "base.css", "typography.css", "layout.css", "components.css",
    "country.css", "countries-portal.css", "workbench.css", "tables.css", "code.css", "accordion.css",
    "graph.css", "utilities.css", "validohub.css"
  ];
  let cssContent = "";
  for (const filename of cssSourceFiles) {
    const content = await readFile(resolve(projectRoot, "assets", "css", filename), "utf8");
    cssContent += "/* --- " + filename + " --- */\n" + content.replace(/@import\s+[^;]+;/g, "") + "\n";
  }
  const jsContent = await readFile(resolve(projectRoot, "assets", "js", "bundle.js"), "utf8");
  const cssHash = createHash("sha256").update(cssContent).digest("hex").slice(0, 6);
  const jsHash = createHash("sha256").update(jsContent).digest("hex").slice(0, 6);
  const cssFileName = "bundle." + cssHash + ".css";
  const jsFileName = "bundle." + jsHash + ".js";
  const srcCssDir = resolve(projectRoot, "assets", "css");
  const destCssDir = resolve(siteRoot, "assets", "css");
  const destJsDir = resolve(siteRoot, "assets", "js");
  await mkdir(destCssDir, { recursive: true });
  await mkdir(destJsDir, { recursive: true });
  await writeFile(resolve(srcCssDir, cssFileName), cssContent, "utf8");
  await writeFile(resolve(destCssDir, cssFileName), cssContent, "utf8");
  await writeFile(resolve(destJsDir, jsFileName), jsContent, "utf8");
  const manifest = { css: "/assets/css/" + cssFileName, js: "/assets/js/" + jsFileName };
  await writeFile(resolve(projectRoot, "assets", "assets-manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
  await writeFile(resolve(siteRoot, "assets-manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
  return manifest;
}

async function syncRuntimeAssets() {
  const destJsDir = resolve(siteRoot, "assets", "js");
  await mkdir(destJsDir, { recursive: true });
  for (const file of ["portal-home.js", "portal-tools.js", "countries-portal.js", "countries.js", "brand-assets.js"]) {
    const source = resolve(projectRoot, "assets", "js", file);
    if (await pathExists(source)) await cp(source, resolve(destJsDir, file));
  }
  const sourceTools = resolve(projectRoot, "assets", "js", "tools");
  const destTools = resolve(destJsDir, "tools");
  if (await pathExists(sourceTools)) await cp(sourceTools, destTools, { recursive: true });
  const sourceWorkbench = resolve(projectRoot, "assets", "js", "workbench");
  const destWorkbench = resolve(destJsDir, "workbench");
  if (await pathExists(sourceWorkbench)) await cp(sourceWorkbench, destWorkbench, { recursive: true });
}



const WORKBENCH_SCRIPT_VERSION = "country-premium-clickfix-20260730";
const GENERIC_SUITE_SCRIPT_VERSION = "generic-suite-clickfix-mount-20260730";

const GENERIC_SUITE_ALGORITHMS = new Set([
  // BEGIN global premium batch v4 algorithms
  "validohub.oauth-oidc-flow",
  "validohub.jwt-risk-scanner",
  "validohub.jwks-rotation",
  "validohub.openapi-breaking-diff",
  "validohub.json-patch-builder",
  "validohub.json-merge-patch-builder",
  "validohub.rest-pagination-contract",
  "validohub.api-error-catalog",
  "validohub.webhook-replay-payload",
  "validohub.idempotency-collision-lab",
  "validohub.robots-txt-tester",
  "validohub.xml-sitemap-inspector",
  "validohub.canonical-hreflang-auditor",
  "validohub.search-snippet-preview",
  "validohub.structured-data-jsonld",
  "validohub.csv-schema-inferencer",
  "validohub.duplicate-row-detector",
  "validohub.unicode-confusable-scanner",
  "validohub.locale-number-parser",
  "validohub.locale-date-parser",
  "validohub.luhn-card-fixture-generator",
  "validohub.bin-iin-shape-inspector",
  "validohub.currency-minor-units",
  "validohub.sepa-pain001-fixture",
  "validohub.payment-reference-generator",
  "validohub.password-policy-tester",
  "validohub.csp-nonce-hash-helper",
  "validohub.cookie-samesite-lab",
  "validohub.email-header-auth-inspector",
  "validohub.log-redaction-rule-tester",
  // END global premium batch v4 algorithms
  "validohub.json-schema", "validohub.openapi", "validohub.yaml-toml", "validohub.xml-xpath",
  "validohub.csv-profiler", "validohub.sql-inspector", "validohub.cron", "validohub.regex-explainer",
  "validohub.datetime", "validohub.color-contrast", "validohub.markdown-mdx", "validohub.graphql",
  "validohub.email-domain", "validohub.user-agent", "validohub.http-headers",
  "validohub.kubernetes-yaml",
  "validohub.dockerfile-auditor",
  "validohub.github-actions",
  "validohub.terraform-hcl",
  "validohub.webserver-config",
  "validohub.prompt-injection",
  "validohub.rag-chunking",
  "validohub.vector-metadata",
  "validohub.jsonl-finetune",
  "validohub.eval-dataset",
  "validohub.rest-error-contract",
  "validohub.idempotency-key",
  "validohub.rate-limit-headers",
  "validohub.cors-policy",
  "validohub.websocket-sse",
  "validohub.html-meta-seo",
  "validohub.accessibility-snapshot",
  "validohub.design-token",
  "validohub.stack-trace",
  "validohub.browser-storage",
  "validohub.jwt-jwk-oauth", "validohub.csp-auditor", "validohub.cookie-security",
  "validohub.url-redirect-utm", "validohub.http-message-diff", "validohub.jsonpath-jmespath",
  "validohub.avro-protobuf", "validohub.ndjson-log-parser", "validohub.diff-patch",
  "validohub.base64-binary", "validohub.secret-scanner", "validohub.tls-certificate",
  "validohub.dns-records", "validohub.spf-dmarc", "validohub.sri-hash",
  "validohub.phone-e164", "validohub.postal-code", "validohub.swift-bic", "validohub.mrz-passport",
  "validohub.csv-repair", "validohub.eu-vat", "validohub.iso20022-sepa", "validohub.secret-pii",
  "validohub.locale-test-data", "validohub.webhook-signature", "validohub.case-converter",
  "validohub.html-decoder", "validohub.html-encoder", "validohub.iban", "validohub.iban-generator",
  "validohub.md5", "validohub.regex-tester", "validohub.sha1", "validohub.sha256",
  "validohub.slug-generator", "validohub.text-diff", "validohub.uuid"
]);

function ensureRegExp(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function ensureScriptTag(content, src) {
  const version = src.endsWith("/generic-suite.js") ? GENERIC_SUITE_SCRIPT_VERSION : WORKBENCH_SCRIPT_VERSION;
  const tag = '<script src="' + src + '?v=' + version + '"></script>';
  const escaped = ensureRegExp(src);
  let next = content.replace(new RegExp('<script src="' + escaped + '(?:\\?[^"\\n]*)?"></script>', "g"), "");
  return next.replace("</body>", tag + "\n</body>");
}
function ensureGenericSuiteScripts(content) {
  const match = content.match(/data-algorithm-id="([^"]+)"/);
  if (!match || !GENERIC_SUITE_ALGORITHMS.has(match[1])) return content;
  const helperSrcs = [
    "/assets/js/workbench/clipboard.js",
    "/assets/js/workbench/download.js",
    "/assets/js/workbench/file.js",
    "/assets/js/workbench/keyboard.js",
    "/assets/js/workbench/preview.js",
    "/assets/js/workbench/stats.js",
    "/assets/js/workbench/utf8.js",
    "/assets/js/workbench/hex.js",
    "/assets/js/workbench/framework.js",
    "/assets/js/tools/generic-suite.js"
  ];
  return helperSrcs.reduce((next, src) => ensureScriptTag(next, src), content);
}

function updateAssetLinks(content, assetsManifest) {
  return updateBundleAssetLinks(content, assetsManifest);
}

async function refreshToolPageAssets(slugs, locales, assetsManifest) {
  let checked = 0;
  let updated = 0;
  const missing = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      const filePath = resolve(siteRoot, locale, "tools", slug, "index.html");
      if (!(await pathExists(filePath))) {
        missing.push("/" + locale + "/tools/" + slug + "/");
        continue;
      }
      checked += 1;
      const content = await readFile(filePath, "utf8");
      const next = ensureGenericSuiteScripts(updateAssetLinks(content, assetsManifest));
      if (next !== content) {
        await writeFile(filePath, next, "utf8");
        updated += 1;
      }
    }
  }
  return { checked, updated, missing };
}

function globalToolSlugs(routeRegistry) {
  return routeRegistry.getAll()
    .filter(route => route.path.startsWith("/en/tools/") && route.path !== "/en/tools/")
    .map(route => route.path.replace(/^\/en\/tools\//, "").replace(/\/$/, ""))
    .sort();
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderToolHeader(locale) {
  const labels = HEADER_LABELS[locale] || HEADER_LABELS.en;
  return [
    '<header class="site-header">',
    '  <div class="container header-inner">',
    '    <a class="brand" href="/' + locale + '/" aria-label="ValidoHub home">',
    '      <span class="brand-mark">V</span>',
    '      <span class="brand-text">ValidoHub</span>',
    '    </a>',
    '    <nav class="primary-nav" aria-label="' + escapeHtml(labels.aria) + '">',
    '      <a href="/' + locale + '/">' + escapeHtml(labels.home) + '</a>',
    '      <a href="/' + locale + '/tools/" aria-current="page" class="is-active">' + escapeHtml(labels.tools) + '</a>',
    '      <a href="/' + locale + '/countries/">' + escapeHtml(labels.countries) + '</a>',
    '      <a href="/' + locale + '/categories/national-identifiers/">' + escapeHtml(labels.identifiers) + '</a>',
    '    </nav>',
    '  </div>',
    '</header>'
  ].join("\n");
}

async function repairGlobalToolHeaders(slugs, locales) {
  let checked = 0;
  let updated = 0;
  for (const locale of locales) {
    for (const slug of slugs) {
      const filePath = resolve(siteRoot, locale, "tools", slug, "index.html");
      if (!(await pathExists(filePath))) continue;
      checked += 1;
      const content = await readFile(filePath, "utf8");
      const next = content.replace(/<header class="site-header">[\s\S]*?<\/header>/, renderToolHeader(locale));
      if (next !== content) {
        await writeFile(filePath, next, "utf8");
        updated += 1;
      }
    }
  }
  return { checked, updated };
}

async function repairGlobalWorkbenchHeadings(slugs, locales) {
  let checked = 0;
  let updated = 0;
  for (const locale of locales) {
    for (const slug of slugs) {
      const filePath = resolve(siteRoot, locale, "tools", slug, "index.html");
      if (!(await pathExists(filePath))) continue;
      checked += 1;
      const content = await readFile(filePath, "utf8");
      const next = content.replace(
        /\s*<div class="workbench-heading(?: workbench-heading-compact)?">[\s\S]*?<\/div>\s*(?=<div class="workbench-list">)/giu,
        "\n          "
      );
      if (next !== content) {
        await writeFile(filePath, next, "utf8");
        updated += 1;
      }
    }
  }
  return { checked, updated };
}

function renderUuidGeneratorForm() {
  return [
    '<form class="tool-workbench browser-workbench generic-suite-workbench global-tool-form uuid-generator-form" id="tool-uuid-generator-generate" data-algorithm-id="validohub.uuid" data-capability="generate" data-default-action="generate" data-generic-suite="uuid-generator" data-generic-theme="identity">',
    '  <div class="workbench-form-heading">',
    '    <h3>Generate</h3>',
    '    <span class="input-mode-badge" data-input-mode-badge>Ready to generate</span>',
    '  </div>',
    '  <div class="generic-sample-row uuid-samples-first" aria-label="Samples">',
    '    <span>Samples</span>',
    '    <button type="button" class="button button-secondary" data-sample="generate-v4">Generate v4</button>',
    '    <button type="button" class="button button-secondary" data-sample="batch-v7">Batch v7</button>',
    '    <button type="button" class="button button-secondary" data-sample="uuid-v4">Validate v4</button>',
    '    <button type="button" class="button button-secondary" data-sample="uuid-v7">Validate v7</button>',
    '    <button type="button" class="button button-secondary" data-sample="compact">Compact UUID</button>',
    '    <button type="button" class="button button-secondary" data-sample="invalid">Invalid</button>',
    '  </div>',
    '  <div class="field-grid uuid-generator-grid">',
    '    <label class="field uuid-version-field">',
    '      <span>UUID version</span>',
    '      <select name="version">',
    '        <option value="v4" selected>v4 random</option>',
    '        <option value="v7">v7 timestamp</option>',
    '      </select>',
    '    </label>',
    '    <label class="field uuid-count-field">',
    '      <span>How many</span>',
    '      <select name="count">',
    '        <option value="1" selected>1</option>',
    '        <option value="5">5</option>',
    '        <option value="10">10</option>',
    '        <option value="25">25</option>',
    '        <option value="50">50</option>',
    '        <option value="100">100</option>',
    '      </select>',
    '    </label>',
    '    <label class="field uuid-input-field">',
    '      <span>Existing UUID to validate or parse</span>',
    '      <input type="text" name="uuid" value="" placeholder="Optional: paste a UUID or URN to inspect">',
    '    </label>',
    '  </div>',
    '  <div class="button-row">',
    '    <button type="button" class="button button-primary" data-action="generate">Generate</button>',
    '    <button type="button" class="button button-secondary" data-action="validate">Validate</button>',
    '    <button type="button" class="button button-secondary" data-action="parse">Parse</button>',
    '    <button type="button" class="button button-secondary" data-action="explain">Explain</button>',
    '    <button type="button" class="button button-secondary" data-tool-copy>Copy result</button>',
    '    <button type="button" class="button button-secondary" data-tool-download>Download result</button>',
    '    <button type="button" class="button button-ghost" data-tool-clear>Clear</button>',
    '  </div>',
    '  <p class="tool-message" aria-live="polite" data-tool-message></p>',
    '  <div class="tool-feedback" data-tool-feedback></div>',
    '  <div class="preview-panel" data-tool-preview></div>',
    '  <label class="field output-field">',
    '    <span>Developer JSON</span>',
    '    <textarea class="tool-output" readonly data-tool-output></textarea>',
    '  </label>',
    '  <details class="advanced-panel" data-advanced-panel>',
    '    <summary>Advanced analysis</summary>',
    '    <div data-tool-advanced></div>',
    '  </details>',
    '</form>'
  ].join("\n");
}

function renderUuidDocumentation() {
  return [
    '<article class="content-card">',
    '  <div class="section-heading">',
    '    <span class="eyebrow">Documentation</span>',
    '    <h2>UUID reference notes</h2>',
    '  </div>',
    '  <details class="doc-accordion" open>',
    '    <summary>What this generator creates</summary>',
    '    <div class="rich-text"><p>Generate browser-local UUID v4 fixtures for random identifiers or UUID v7 fixtures when time ordering matters. Values are created in the browser and are ready for tests, demos, imports, and QA payloads.</p></div>',
    '  </details>',
    '  <details class="doc-accordion">',
    '    <summary>Validation and parsing</summary>',
    '    <div class="rich-text"><p>Paste an existing UUID to normalize casing, detect compact or hyphenated form, inspect version and variant bits, and export a structured JSON summary without sending the value anywhere.</p></div>',
    '  </details>',
    '  <details class="doc-accordion">',
    '    <summary>Batch fixtures</summary>',
    '    <div class="rich-text"><p>Use the count selector to generate up to 100 UUIDs at once. Batch output stays intentionally capped so it remains copyable and browser-safe.</p></div>',
    '  </details>',
    '  <details class="doc-accordion">',
    '    <summary>Production boundary</summary>',
    '    <div class="rich-text"><p>A UUID parser can prove shape and metadata only. It cannot prove uniqueness across your database, ownership, authorization, or whether an ID is safe to expose publicly.</p></div>',
    '  </details>',
    '</article>'
  ].join("\n");
}

async function repairUuidGeneratorPage(locales) {
  let checked = 0;
  let updated = 0;
  for (const locale of locales) {
    const filePath = resolve(siteRoot, locale, "tools", "uuid-generator", "index.html");
    if (!(await pathExists(filePath))) continue;
    checked += 1;
    const content = await readFile(filePath, "utf8");
    const next = content
      .replace(/<h2>Interactive workbench<\/h2>\s*<p>Start with a sample, run the check locally, and copy the highlighted result\.<\/p>/, '<h2>Generate UUID fixtures</h2>\n            <p>Create one UUID or a copy-ready batch, then validate or parse existing values locally.</p>')
      .replace(/<h2>Run the tool<\/h2>\s*<p>Paste input, choose an action, and copy the result directly in your browser\.<\/p>/, '<h2>Generate UUID fixtures</h2>\n            <p>Create one UUID or a copy-ready batch, then validate or parse existing values locally.</p>')
      .replace(/<form class="tool-workbench" id="tool-uuid-generator-validate" data-algorithm-id="validohub\.uuid" data-capability="validate">[\s\S]*?<\/form>/, renderUuidGeneratorForm())
      .replace(/<article class="content-card">\s*<div class="section-heading">\s*<span class="eyebrow">Documentation<\/span>[\s\S]*?<\/article>/, renderUuidDocumentation());
    if (next !== content) {
      await writeFile(filePath, next, "utf8");
      updated += 1;
    }
  }
  return { checked, updated };
}

const IBAN_GENERATOR_COUNTRIES = [
  ["DE", "Germany", 22],
  ["FR", "France", 27],
  ["PL", "Poland", 28],
  ["ES", "Spain", 24],
  ["GB", "United Kingdom", 22],
  ["IT", "Italy", 27],
  ["NL", "Netherlands", 18],
  ["BE", "Belgium", 16],
  ["PT", "Portugal", 25],
  ["IE", "Ireland", 22],
  ["SE", "Sweden", 24],
  ["NO", "Norway", 15],
  ["RO", "Romania", 24],
  ["UA", "Ukraine", 29],
  ["CZ", "Czechia", 24],
  ["AT", "Austria", 20],
  ["CH", "Switzerland", 21],
  ["DK", "Denmark", 18],
  ["FI", "Finland", 18],
  ["GR", "Greece", 27]
];

function renderIbanCountryOptions() {
  return IBAN_GENERATOR_COUNTRIES.map(([code, country, length], index) =>
    '        <option value="' + code + '"' + (index === 0 ? " selected" : "") + ">" + country + " (" + code + ") - " + length + " chars</option>"
  ).join("\n");
}

function renderIbanGeneratorForm() {
  return [
    '<form class="tool-workbench browser-workbench generic-suite-workbench global-tool-form iban-generator-form" id="tool-iban-generator-generate" data-algorithm-id="validohub.iban-generator" data-capability="generate" data-default-action="generate" data-generic-suite="iban-generator" data-generic-theme="finance">',
    '  <div class="workbench-form-heading">',
    '    <h3>Generate</h3>',
    '    <span class="input-mode-badge" data-input-mode-badge>Ready to generate</span>',
    '  </div>',
    '  <div class="generic-sample-row iban-samples-first" aria-label="Samples">',
    '    <span>Samples</span>',
    '    <button type="button" class="button button-secondary" data-sample="germany-random">Germany random</button>',
    '    <button type="button" class="button button-secondary" data-sample="france-random">France random</button>',
    '    <button type="button" class="button button-secondary" data-sample="poland-random">Poland random</button>',
    '    <button type="button" class="button button-secondary" data-sample="spain-random">Spain random</button>',
    '    <button type="button" class="button button-secondary" data-sample="uk-random">UK random</button>',
    '    <button type="button" class="button button-secondary" data-sample="custom-bban">Custom BBAN</button>',
    '    <button type="button" class="button button-secondary" data-sample="bad-country">Bad country prefix</button>',
    '    <button type="button" class="button button-secondary" data-sample="repair-existing">Repair existing</button>',
    '  </div>',
    '  <div class="field-grid iban-generator-grid">',
    '    <label class="field iban-country-field">',
    '      <span>Country</span>',
    '      <select name="country" class="vh-iban-country-select" aria-label="IBAN country">',
    renderIbanCountryOptions(),
    '      </select>',
    '    </label>',
    '    <label class="field iban-bban-field">',
    '      <span>BBAN / account body</span>',
    '      <input type="text" name="bban" value="" placeholder="Leave blank to generate a random BBAN for the selected country">',
    '      <small class="vh-iban-field-hint">Optional for Generate. Paste a BBAN only when you need to repair or replay your own body.</small>',
    '    </label>',
    '    <label class="field iban-existing-field">',
    '      <span>Existing IBAN to repair or inspect</span>',
    '      <input type="text" name="iban" value="" placeholder="Optional: paste an IBAN to inspect or repair check digits">',
    '    </label>',
    '  </div>',
    '  <div class="button-row">',
    '    <button type="button" class="button button-primary" data-action="generate">Generate</button>',
    '    <button type="button" class="button button-secondary" data-action="validate">Validate</button>',
    '    <button type="button" class="button button-secondary" data-action="explain">Explain</button>',
    '    <button type="button" class="button button-secondary" data-tool-copy>Copy result</button>',
    '    <button type="button" class="button button-secondary" data-tool-download>Download result</button>',
    '    <button type="button" class="button button-ghost" data-tool-clear>Clear</button>',
    '  </div>',
    '  <p class="tool-message" aria-live="polite" data-tool-message></p>',
    '  <div class="tool-feedback" data-tool-feedback></div>',
    '  <div class="preview-panel" data-tool-preview></div>',
    '  <label class="field output-field">',
    '    <span>Developer JSON</span>',
    '    <textarea class="tool-output" readonly data-tool-output></textarea>',
    '  </label>',
    '  <details class="advanced-panel" data-advanced-panel>',
    '    <summary>Advanced analysis</summary>',
    '    <div data-tool-advanced></div>',
    '  </details>',
    '</form>'
  ].join("\n");
}

function renderIbanDocumentation() {
  return [
    '<article class="content-card">',
    '  <div class="section-heading">',
    '    <span class="eyebrow">Documentation</span>',
    '    <h2>IBAN generator notes</h2>',
    '  </div>',
    '  <details class="doc-accordion" open>',
    '    <summary>Generate random fixtures</summary>',
    '    <div class="rich-text"><p>Select a country and leave BBAN blank to create a fresh browser-local IBAN fixture. The workbench derives check digits and immediately replays MOD-97 so the result is copy-ready.</p></div>',
    '  </details>',
    '  <details class="doc-accordion">',
    '    <summary>Repair or inspect a value</summary>',
    '    <div class="rich-text"><p>Paste a BBAN when you need deterministic check digits, or paste an existing IBAN to inspect country prefix, length, grouped display, masked display, and checksum evidence.</p></div>',
    '  </details>',
    '  <details class="doc-accordion">',
    '    <summary>Batch generation</summary>',
    '    <div class="rich-text"><p>Use batch generation for QA fixtures, demos, and parser tests. Values are generated locally and capped so output stays fast and easy to copy.</p></div>',
    '  </details>',
    '  <details class="doc-accordion">',
    '    <summary>Official boundary</summary>',
    '    <div class="rich-text"><p>Generated IBANs prove structure and checksum only. Bank account existence, ownership, payment acceptance, and compliance status remain official-system checks.</p></div>',
    '  </details>',
    '</article>'
  ].join("\n");
}

async function repairIbanGeneratorPage(locales) {
  let checked = 0;
  let updated = 0;
  for (const locale of locales) {
    const filePath = resolve(siteRoot, locale, "tools", "iban-generator", "index.html");
    if (!(await pathExists(filePath))) continue;
    checked += 1;
    const content = await readFile(filePath, "utf8");
    const next = content
      .replace(/<h2>Browser workbench<\/h2>\s*<p>Use the samples above or paste your own data; results stay local and copy-ready\.<\/p>/, '<h2>Generate IBAN fixtures</h2>\n            <p>Select a country, generate one or a batch, then copy the result without leaving the browser.</p>')
      .replace(/<h2>Interactive workbench<\/h2>\s*<p>Start with a sample, run the check locally, and copy the highlighted result\.<\/p>/, '<h2>Generate IBAN fixtures</h2>\n            <p>Select a country, generate one or a batch, then copy the result without leaving the browser.</p>')
      .replace(/<h2>Run the tool<\/h2>\s*<p>Paste input, choose an action, and copy the result directly in your browser\.<\/p>/, '<h2>Generate IBAN fixtures</h2>\n            <p>Select a country, generate one or a batch, then copy the result without leaving the browser.</p>')
      .replace(/<form class="tool-workbench[^"]*" id="tool-iban-generator-generate"[\s\S]*?<\/form>/, renderIbanGeneratorForm())
      .replace(/<article class="content-card">\s*<div class="section-heading">\s*<span class="eyebrow">Documentation<\/span>[\s\S]*?<\/article>/, renderIbanDocumentation());
    if (next !== content) {
      await writeFile(filePath, next, "utf8");
      updated += 1;
    }
  }
  return { checked, updated };
}

function titleFromSlug(slug) {
  return String(slug || "")
    .split("-")
    .filter(Boolean)
    .map(word => word.length <= 4 ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function yamlScalar(content, keyPath) {
  const parts = keyPath.split(".");
  if (parts.length === 1) {
    const match = content.match(new RegExp("^" + parts[0] + ":\\s*(.+?)\\s*$", "m"));
    return match ? match[1].replace(/^['"]|['"]$/g, "").trim() : "";
  }
  const lines = content.split("\n");
  const parentIndex = lines.findIndex(line => line.trim() === parts[0] + ":");
  if (parentIndex < 0) return "";
  for (let i = parentIndex + 1; i < lines.length; i += 1) {
    if (/^\S/.test(lines[i])) break;
    const match = lines[i].match(new RegExp("^\\s+" + parts[1] + ":\\s*(.+?)\\s*$"));
    if (match) return match[1].replace(/^['"]|['"]$/g, "").trim();
  }
  return "";
}

function yamlExplicitRelated(content) {
  const inline = content.match(/^\s*explicit:\s*\[(.*?)\]\s*$/m);
  if (inline) {
    return inline[1].split(",").map(item => item.trim().replace(/^['"]|['"]$/g, "")).filter(Boolean);
  }
  const block = content.match(/^\s*explicit:\s*\n((?:\s*-\s+.+\n?)+)/m);
  if (!block) return [];
  return block[1]
    .split("\n")
    .map(line => line.match(/^\s*-\s+(.+?)\s*$/)?.[1])
    .filter(Boolean)
    .map(item => item.replace(/^['"]|['"]$/g, ""));
}

function tokenizeToolRecord(record) {
  return new Set([
    record.slug,
    record.category,
    record.title,
    record.summary
  ].join(" ").toLowerCase().split(/[^a-z0-9]+/).filter(token => token.length > 2));
}

async function readGlobalToolRecord(slug, routeRegistry) {
  const route = routeRegistry.get("/en/tools/" + slug + "/");
  const yamlPath = resolve(projectRoot, "tools", slug + ".yaml");
  let yaml = "";
  if (await pathExists(yamlPath)) yaml = await readFile(yamlPath, "utf8");
  const title = yamlScalar(yaml, "name.en") || route?.title || titleFromSlug(slug);
  const summary = yamlScalar(yaml, "summary.en") || route?.metadata?.summary || "";
  const category = yamlScalar(yaml, "category") || route?.metadata?.category || "global";
  return {
    slug,
    title,
    summary,
    category,
    explicit: yamlExplicitRelated(yaml)
  };
}

async function globalToolRecords(routeRegistry) {
  const records = await Promise.all(globalToolSlugs(routeRegistry).map(slug => readGlobalToolRecord(slug, routeRegistry)));
  return new Map(records.map(record => [record.slug, { ...record, tokens: tokenizeToolRecord(record) }]));
}

function relatedGlobalToolsFor(record, recordsBySlug) {
  const selected = [];
  const add = slug => {
    const candidate = recordsBySlug.get(slug);
    if (!candidate || candidate.slug === record.slug || selected.some(item => item.slug === candidate.slug)) return;
    selected.push(candidate);
  };

  record.explicit.forEach(add);
  const scored = [...recordsBySlug.values()]
    .filter(candidate => candidate.slug !== record.slug && !selected.some(item => item.slug === candidate.slug))
    .map(candidate => {
      let score = candidate.category === record.category ? 8 : 0;
      for (const token of candidate.tokens) if (record.tokens.has(token)) score += 1;
      if (candidate.slug.includes(record.slug.split("-")[0])) score += 2;
      return { candidate, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || a.candidate.title.localeCompare(b.candidate.title));
  scored.forEach(item => add(item.candidate.slug));

  [
    "json-formatter",
    "json-schema-workbench",
    "regex-tester",
    "uuid-generator",
    "iban-generator",
    "iban-validator",
    "webhook-signature-verifier-generator",
    "secret-pii-scanner-redactor"
  ].forEach(add);
  return selected.slice(0, 8);
}

const RELATED_LABELS = {
  en: {
    eyebrow: "Related tools",
    title: "Continue with focused global tools",
    allTools: "All global tools",
    countries: "Countries directory"
  },
  es: {
    eyebrow: "Herramientas relacionadas",
    title: "Continúa con herramientas globales relevantes",
    allTools: "Todas las herramientas globales",
    countries: "Directorio de países"
  },
  "pt-BR": {
    eyebrow: "Ferramentas relacionadas",
    title: "Continue com ferramentas globais relevantes",
    allTools: "Todas as ferramentas globais",
    countries: "Diretório de países"
  },
  de: {
    eyebrow: "Verwandte Tools",
    title: "Mit passenden globalen Tools fortfahren",
    allTools: "Alle globalen Tools",
    countries: "Länderverzeichnis"
  },
  fr: {
    eyebrow: "Outils liés",
    title: "Continuer avec des outils globaux ciblés",
    allTools: "Tous les outils globaux",
    countries: "Répertoire des pays"
  },
  pl: {
    eyebrow: "Powiązane narzędzia",
    title: "Kontynuuj z dopasowanymi narzędziami globalnymi",
    allTools: "Wszystkie narzędzia globalne",
    countries: "Katalog krajów"
  },
  uk: {
    eyebrow: "Пов'язані інструменти",
    title: "Продовжуйте з релевантними глобальними інструментами",
    allTools: "Усі глобальні інструменти",
    countries: "Каталог країн"
  }
};

function renderGlobalRelatedSection(locale, relatedRecords) {
  const labels = RELATED_LABELS[locale] || RELATED_LABELS.en;
  const cards = relatedRecords.map(record => [
    '      <a href="/' + locale + "/tools/" + record.slug + '/" class="link-card">',
    "        <span>" + escapeHtml(record.title) + "</span>",
    "        <span aria-hidden=\"true\">→</span>",
    "      </a>"
  ].join("\n")).join("\n");
  return [
    '<section class="related-section global-related-section">',
    '  <div class="section-heading">',
    '    <span class="eyebrow">' + escapeHtml(labels.eyebrow) + "</span>",
    "    <h2>" + escapeHtml(labels.title) + "</h2>",
    "  </div>",
    '  <div class="card-grid">',
    cards,
    "  </div>",
    '  <div class="related-actions">',
    '    <a class="related-action" href="/' + locale + '/tools/">' + escapeHtml(labels.allTools) + "</a>",
    '    <a class="related-action" href="/' + locale + '/countries/">' + escapeHtml(labels.countries) + "</a>",
    "  </div>",
    "</section>"
  ].join("\n");
}

async function repairGlobalToolRelatedSections(slugs, locales, routeRegistry) {
  const recordsBySlug = await globalToolRecords(routeRegistry);
  let checked = 0;
  let updated = 0;
  for (const locale of locales) {
    for (const slug of slugs) {
      const record = recordsBySlug.get(slug);
      if (!record) continue;
      const filePath = resolve(siteRoot, locale, "tools", slug, "index.html");
      if (!(await pathExists(filePath))) continue;
      checked += 1;
      const content = await readFile(filePath, "utf8");
      const related = relatedGlobalToolsFor(record, recordsBySlug);
      const replacement = renderGlobalRelatedSection(locale, related);
      const next = content.replace(/<section class="related-section(?: global-related-section)?">[\s\S]*?<\/section>/, replacement);
      if (next !== content) {
        await writeFile(filePath, next, "utf8");
        updated += 1;
      }
    }
  }
  return { checked, updated };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) { console.log(usage()); return; }
  const routeRegistry = await buildDevRouteRegistry();
  const toolsPortalRoute = routeRegistry.get("/en/tools/");
  if (toolsPortalRoute) toolsPortalRoute.sourceOwner = "node";
  const selectedSlugs = args.slugs.length ? [...new Set(args.slugs)] : globalToolSlugs(routeRegistry);
  const locales = args.locales.length ? args.locales : ["en"];
  if (!locales.includes("en")) locales.unshift("en");

  console.log("=== ValidoHub tools dev build ===");
  console.log("Tools: " + (args.slugs.length ? selectedSlugs.join(", ") : "all global tools"));
  console.log("Locales: " + locales.join(", "));
  const assetsManifest = await compileDesignAssets();
  console.log("✓ Compiled assets: " + assetsManifest.css + ", " + assetsManifest.js);
  await syncRuntimeAssets();
  console.log("✓ Synced global tool runtime assets");
  await compileToolsPortal(routeRegistry, assetsManifest);

  const allLocales = await configuredLocales();
  const portalLocales = locales.length ? locales : allLocales;
  const localizedSuffixes = ["/tools/"].concat(selectedSlugs.map(slug => "/tools/" + slug + "/"));
  await applyFinalLocalizationPass(routeRegistry, siteRoot, portalLocales, {
    includeSuffixes: localizedSuffixes,
    forceRefresh: true
  });
  console.log("✓ Localized tools portal and " + selectedSlugs.length + " selected tool pages for " + portalLocales.join(", "));

  const result = await refreshToolPageAssets(selectedSlugs, locales, assetsManifest);
  console.log("✓ Refreshed current CSS/JS bundle links on " + result.updated + " selected tool pages (checked " + result.checked + ")");
  const headerResult = await repairGlobalToolHeaders(selectedSlugs, locales);
  console.log("✓ Repaired global tool headers on " + headerResult.updated + " selected tool pages (checked " + headerResult.checked + ")");
  const headingResult = await repairGlobalWorkbenchHeadings(selectedSlugs, locales);
  console.log("✓ Repaired global workbench headings on " + headingResult.updated + " selected tool pages (checked " + headingResult.checked + ")");
  if (selectedSlugs.includes("uuid-generator")) {
    const uuidResult = await repairUuidGeneratorPage(locales);
    console.log("✓ Repaired UUID generator workbench on " + uuidResult.updated + " pages (checked " + uuidResult.checked + ")");
  }
  if (selectedSlugs.includes("iban-generator")) {
    const ibanResult = await repairIbanGeneratorPage(locales);
    console.log("✓ Repaired IBAN generator workbench on " + ibanResult.updated + " pages (checked " + ibanResult.checked + ")");
  }
  const relatedResult = await repairGlobalToolRelatedSections(selectedSlugs, locales, routeRegistry);
  console.log("✓ Pruned global tool related links on " + relatedResult.updated + " pages (checked " + relatedResult.checked + ")");
  if (result.missing.length) {
    console.log("WARN: Missing generated pages skipped: " + result.missing.slice(0, 8).join(", ") + (result.missing.length > 8 ? " ..." : ""));
    console.log("  New YAML tools need one release/full build before build:tools can refresh their generated pages.");
  }
  console.log("Note: this is a dev accelerator. Run npm run build before release.");
}

main().catch(error => {
  console.error(error.message || error);
  process.exit(1);
});
