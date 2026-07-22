import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile, writeFile, readdir, rm, access, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { buildRouteRegistry } from './route-registry.mjs';
import { compileCountriesPortal, compileHomePortal, compileToolsPortal } from './build-countries-portal.mjs';
import { compileIdentifiers } from './build-identifiers.mjs';
import { applyFinalLocalizationPass } from './localization-pass.mjs';

const execAsync = promisify(exec);
const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');
const locale = 'en';

async function runCommand(command, cwd) {
  console.log(`Running: ${command} in ${cwd}`);
  const { stdout, stderr } = await execAsync(command, { cwd });
  if (stdout) console.log(stdout);
  if (stderr) console.warn(stderr);
}

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

// 1. Build and fingerprinted assets compiler
async function compileAssets() {
  const cssSourceFiles = [
    'variables.css',
    'reset.css',
    'base.css',
    'typography.css',
    'layout.css',
    'components.css',
    'country.css',
    'countries-portal.css',
    'workbench.css',
    'tables.css',
    'code.css',
    'accordion.css',
    'graph.css',
    'utilities.css',
    'validohub.css'
  ];

  // Concatenate CSS
  let cssContent = '';
  for (const filename of cssSourceFiles) {
    const filePath = resolve(projectRoot, 'assets', 'css', filename);
    const content = await readFile(filePath, 'utf8');
    // Strip native browser @import statements
    const cleanContent = content.replace(/@import\s+[^;]+;/g, '');
    cssContent += `/* --- ${filename} --- */\n${cleanContent}\n`;
  }

  // Read JS bundle
  const jsSourcePath = resolve(projectRoot, 'assets', 'js', 'bundle.js');
  const jsContent = await readFile(jsSourcePath, 'utf8');

  // Compute 6-character SHA-256 hashes
  const cssHash = createHash('sha256').update(cssContent).digest('hex').substring(0, 6);
  const jsHash = createHash('sha256').update(jsContent).digest('hex').substring(0, 6);

  const srcCssDir = resolve(projectRoot, 'assets', 'css');
  const srcJsDir = resolve(projectRoot, 'assets', 'js');
  const destCssDir = resolve(siteRoot, 'assets', 'css');
  const destJsDir = resolve(siteRoot, 'assets', 'js');

  // Clean obsolete fingerprinted CSS from source assets/css/ and generated output dirs
  // Only delete hashed bundles (bundle.[6-char hex].ext), NOT source bundle.js
  const hashedBundlePattern = /^bundle\.[a-f0-9]{6}\.(css|js)$/;
  for (const dir of [srcCssDir, destCssDir, destJsDir]) {
    if (await pathExists(dir)) {
      const files = await readdir(dir);
      for (const file of files) {
        if (hashedBundlePattern.test(file)) {
          await rm(resolve(dir, file));
        }
      }
    }
  }


  // Write new hashed assets to generated output only (NOT back to source assets/)
  const cssFileName = `bundle.${cssHash}.css`;
  const jsFileName = `bundle.${jsHash}.js`;

  await mkdir(destCssDir, { recursive: true });
  await mkdir(destJsDir, { recursive: true });

  // Write hashed CSS to source assets/css/ so the Java publisher picks it up via siteAssetPaths()
  // Write hashed JS only to generated output (Java publisher excludes js/bundle.js from copy)
  await writeFile(resolve(srcCssDir, cssFileName), cssContent, 'utf8');
  await writeFile(resolve(destCssDir, cssFileName), cssContent, 'utf8');
  await writeFile(resolve(destJsDir, jsFileName), jsContent, 'utf8');

  for (const file of ['portal-home.js', 'portal-tools.js', 'countries-portal.js', 'countries.js', 'brand-assets.js']) {
    const source = resolve(srcJsDir, file);
    if (await pathExists(source)) {
      const content = await readFile(source, 'utf8');
      await writeFile(resolve(destJsDir, file), content, 'utf8');
    }
  }

  const manifest = {
    css: `/assets/css/${cssFileName}`,
    js: `/assets/js/${jsFileName}`
  };

  // Keep source and generated manifests in sync so every pipeline stage reads the same bundle hashes.
  await writeFile(resolve(projectRoot, 'assets', 'assets-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
  await writeFile(resolve(siteRoot, 'assets-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

  console.log(`✓ Compiled CSS bundle: ${manifest.css}`);
  console.log(`✓ Compiled JS bundle: ${manifest.js}`);
  return manifest;
}



const TOOL_SCRIPT_BY_ALGORITHM = {
  'validohub.pesel': 'pesel.js',
  'validohub.brazil-pix': 'pix.js',
  'validohub.brazil-suite': ['country-legacy-rich-layer.js', 'brazil-suite.js'],
  'validohub.spain-id': 'spain-id.js',
  'validohub.spain-suite': ['country-suite-factory.js', 'spain-suite.js'],
  'validohub.poland-suite': ['country-legacy-rich-layer.js', 'poland-suite.js'],
  'validohub.poland-expansion': 'poland-expansion.js',
  'validohub.poland-baseline': 'poland-baseline.js',
  'validohub.france-suite': ['country-legacy-rich-layer.js', 'france-suite.js'],
  'validohub.netherlands-suite': ['country-legacy-rich-layer.js', 'netherlands-suite.js'],
  'validohub.switzerland-suite': ['country-suite-factory.js', 'switzerland-suite.js'],
  'validohub.germany-suite': ['country-suite-factory.js', 'germany-suite.js'],
  'validohub.italy-suite': ['country-suite-factory.js', 'italy-suite.js'],
  'validohub.vatican-city-suite': ['country-suite-factory.js', 'vatican-city-suite.js'],
  'validohub.united-kingdom-suite': ['country-suite-factory.js', 'united-kingdom-suite.js'],
  'validohub.ukraine-suite': ['country-suite-factory.js', 'ukraine-suite.js'],
  'validohub.slovenia-suite': ['country-suite-factory.js', 'slovenia-suite.js'],
  'validohub.slovakia-suite': ['country-suite-factory.js', 'slovakia-suite.js'],
  'validohub.serbia-suite': ['country-suite-factory.js', 'serbia-suite.js'],
  'validohub.san-marino-suite': ['country-suite-factory.js', 'san-marino-suite.js'],
  'validohub.north-macedonia-suite': ['country-suite-factory.js', 'north-macedonia-suite.js'],
  'validohub.montenegro-suite': ['country-suite-factory.js', 'montenegro-suite.js'],
  'validohub.monaco-suite': ['country-suite-factory.js', 'monaco-suite.js'],
  'validohub.moldova-suite': ['country-suite-factory.js', 'moldova-suite.js'],
  'validohub.malta-suite': ['country-suite-factory.js', 'malta-suite.js'],
  'validohub.luxembourg-suite': ['country-suite-factory.js', 'luxembourg-suite.js'],
  'validohub.lithuania-suite': ['country-suite-factory.js', 'lithuania-suite.js'],
  'validohub.liechtenstein-suite': ['country-suite-factory.js', 'liechtenstein-suite.js'],
  'validohub.latvia-suite': ['country-suite-factory.js', 'latvia-suite.js'],
  'validohub.iceland-suite': ['country-suite-factory.js', 'iceland-suite.js'],
  'validohub.hungary-suite': ['country-suite-factory.js', 'hungary-suite.js'],
  'validohub.greece-suite': ['country-suite-factory.js', 'greece-suite.js'],
  'validohub.estonia-suite': ['country-suite-factory.js', 'estonia-suite.js'],
  'validohub.cyprus-suite': ['country-suite-factory.js', 'cyprus-suite.js'],
  'validohub.croatia-suite': ['country-suite-factory.js', 'croatia-suite.js'],
  'validohub.bulgaria-suite': ['country-suite-factory.js', 'bulgaria-suite.js'],
  'validohub.bosnia-and-herzegovina-suite': ['country-suite-factory.js', 'bosnia-and-herzegovina-suite.js'],
  'validohub.andorra-suite': ['country-suite-factory.js', 'andorra-suite.js'],
  'validohub.albania-suite': ['country-suite-factory.js', 'albania-suite.js'],
  'validohub.portugal-suite': ['country-suite-factory.js', 'portugal-suite.js'],
  'validohub.austria-suite': ['country-suite-factory.js', 'austria-suite.js'],
  'validohub.belgium-suite': ['country-suite-factory.js', 'belgium-suite.js'],
  'validohub.ireland-suite': ['country-suite-factory.js', 'ireland-suite.js'],
  'validohub.czechia-suite': ['country-suite-factory.js', 'czechia-suite.js'],
  'validohub.sweden-suite': ['country-suite-factory.js', 'sweden-suite.js'],
  'validohub.norway-suite': ['country-suite-factory.js', 'norway-suite.js'],
  'validohub.denmark-suite': ['country-suite-factory.js', 'denmark-suite.js'],
  'validohub.finland-suite': ['country-suite-factory.js', 'finland-suite.js'],
  'validohub.romania-suite': ['country-suite-factory.js', 'romania-suite.js'],
  'validohub.json-schema': 'generic-suite.js',
  'validohub.openapi': 'generic-suite.js',
  'validohub.yaml-toml': 'generic-suite.js',
  'validohub.xml-xpath': 'generic-suite.js',
  'validohub.csv-profiler': 'generic-suite.js',
  'validohub.sql-inspector': 'generic-suite.js',
  'validohub.cron': 'generic-suite.js',
  'validohub.regex-explainer': 'generic-suite.js',
  'validohub.datetime': 'generic-suite.js',
  'validohub.color-contrast': 'generic-suite.js',
  'validohub.markdown-mdx': 'generic-suite.js',
  'validohub.graphql': 'generic-suite.js',
  'validohub.email-domain': 'generic-suite.js',
  'validohub.user-agent': 'generic-suite.js',
  'validohub.http-headers': 'generic-suite.js',
  'validohub.phone-e164': 'generic-suite.js',
  'validohub.postal-code': 'generic-suite.js',
  'validohub.swift-bic': 'generic-suite.js',
  'validohub.mrz-passport': 'generic-suite.js',
  'validohub.csv-repair': 'generic-suite.js',
  'validohub.eu-vat': 'generic-suite.js',
  'validohub.iso20022-sepa': 'generic-suite.js',
  'validohub.secret-pii': 'generic-suite.js',
  'validohub.locale-test-data': 'generic-suite.js',
  'validohub.webhook-signature': 'generic-suite.js',
  'validohub.case-converter': 'generic-suite.js',
  'validohub.html-decoder': 'generic-suite.js',
  'validohub.html-encoder': 'generic-suite.js',
  'validohub.iban': 'generic-suite.js',
  'validohub.iban-generator': 'generic-suite.js',
  'validohub.md5': 'generic-suite.js',
  'validohub.regex-tester': 'generic-suite.js',
  'validohub.sha1': 'generic-suite.js',
  'validohub.sha256': 'generic-suite.js',
  'validohub.slug-generator': 'generic-suite.js',
  'validohub.text-diff': 'generic-suite.js',
  'validohub.uuid': 'generic-suite.js'
};

const FACTORY_TOOL_ALGORITHMS = new Set([
  'validohub.switzerland-suite',
  'validohub.spain-suite',
  'validohub.germany-suite',
  'validohub.italy-suite',
  'validohub.vatican-city-suite',
  'validohub.united-kingdom-suite',
  'validohub.ukraine-suite',
  'validohub.slovenia-suite',
  'validohub.slovakia-suite',
  'validohub.serbia-suite',
  'validohub.san-marino-suite',
  'validohub.north-macedonia-suite',
  'validohub.montenegro-suite',
  'validohub.monaco-suite',
  'validohub.moldova-suite',
  'validohub.malta-suite',
  'validohub.luxembourg-suite',
  'validohub.lithuania-suite',
  'validohub.liechtenstein-suite',
  'validohub.latvia-suite',
  'validohub.iceland-suite',
  'validohub.hungary-suite',
  'validohub.greece-suite',
  'validohub.estonia-suite',
  'validohub.cyprus-suite',
  'validohub.croatia-suite',
  'validohub.bulgaria-suite',
  'validohub.bosnia-and-herzegovina-suite',
  'validohub.andorra-suite',
  'validohub.albania-suite',
  'validohub.romania-suite',
  'validohub.portugal-suite',
  'validohub.austria-suite',
  'validohub.belgium-suite',
  'validohub.ireland-suite',
  'validohub.czechia-suite',
  'validohub.sweden-suite',
  'validohub.norway-suite',
  'validohub.denmark-suite',
  'validohub.finland-suite',
  'validohub.romania-suite'
]);

const WORKBENCH_SCRIPT_VERSION = 'country-premium-20260719';

function ensureToolScript(content) {
  const match = content.match(/data-algorithm-id="([^"]+)"/);
  if (!match) return content;
  const mapped = TOOL_SCRIPT_BY_ALGORITHM[match[1]];
  if (!mapped) return content;
  if (Array.isArray(mapped)) {
    return ensureOrderedWorkbenchScripts(content, mapped);
  }
  return ensureWorkbenchScripts(content, mapped);
}

function ensureOrderedWorkbenchScripts(content, mappedScripts) {
  let next = mappedScripts.reduce((current, script) => ensureWorkbenchScripts(current, script), content);
  const tags = [];
  for (const script of mappedScripts) {
    const src = '/assets/js/tools/' + script;
    const oldTag = new RegExp('<script src="' + src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?:\\?[^"]*)?"></script>', 'g');
    next = next.replace(oldTag, '');
    tags.push('<script src="' + src + '?v=' + WORKBENCH_SCRIPT_VERSION + '"></script>');
  }
  return next.replace('</body>', tags.join('') + '\n</body>');
}

function ensureWorkbenchScripts(content, mapped) {
  const scriptTag = (src) => '<script src="' + src + '?v=' + WORKBENCH_SCRIPT_VERSION + '"></script>';
  const helperSrcs = [
    '/assets/js/workbench/clipboard.js',
    '/assets/js/workbench/download.js',
    '/assets/js/workbench/file.js',
    '/assets/js/workbench/keyboard.js',
    '/assets/js/workbench/preview.js',
    '/assets/js/workbench/stats.js',
    '/assets/js/workbench/utf8.js',
    '/assets/js/workbench/hex.js'
  ];
  const frameworkSrc = '/assets/js/workbench/framework.js';
  const toolSrc = '/assets/js/tools/' + mapped;
  let next = content;
  for (const src of helperSrcs) {
    const oldTag = new RegExp('<script src="' + src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?:\\?[^"]*)?"></script>', 'g');
    next = next.replace(oldTag, scriptTag(src));
    if (!next.includes(scriptTag(src))) {
      next = next.replace('</body>', scriptTag(src) + '\n</body>');
    }
  }
  const frameworkOldTag = /<script src="\/assets\/js\/workbench\/framework\.js(?:\?[^"]*)?"><\/script>/g;
  next = next.replace(frameworkOldTag, scriptTag(frameworkSrc));
  if (!next.includes(scriptTag(frameworkSrc))) {
    next = next.replace('</body>', scriptTag(frameworkSrc) + '\n</body>');
  }
  const toolOldTag = new RegExp('<script src="' + toolSrc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?:\\?[^"]*)?"></script>', 'g');
  next = next.replace(toolOldTag, scriptTag(toolSrc));
  if (!next.includes(scriptTag(toolSrc))) {
    next = next.replace('</body>', scriptTag(toolSrc) + '\n</body>');
  }
  return next;
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function stripHtml(value) {
  return String(value || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

const GENERIC_UTILITY_WORKBENCHES = {
  'json-schema-workbench': { id: 'json-schema-workbench', algorithmId: 'validohub.json-schema', capability: 'analyze', forms: [{ capability: 'analyze', title: 'Analyze', fields: [{ type: 'textarea', name: 'input', label: 'JSON payload' }, { type: 'textarea', name: 'schema', label: 'JSON Schema' }, { type: 'number', name: 'count', label: 'Fixture count', value: "2", min: '1', max: '25' }], actions: ["analyze","validate","generate","explain"] }] },
  'openapi-inspector': { id: 'openapi-inspector', algorithmId: 'validohub.openapi', capability: 'inspect', forms: [{ capability: 'inspect', title: 'Inspect', fields: [{ type: 'textarea', name: 'input', label: 'OpenAPI JSON or YAML' }, { type: 'select', name: 'profile', label: 'Profile', options: ["auto","openapi-3","swagger-2"], value: "auto" }], actions: ["inspect","validate","generate","explain"] }] },
  'yaml-toml-workbench': { id: 'yaml-toml-workbench', algorithmId: 'validohub.yaml-toml', capability: 'inspect', forms: [{ capability: 'inspect', title: 'Inspect', fields: [{ type: 'select', name: 'format', label: 'Format', options: ["auto","yaml","toml"], value: "auto" }, { type: 'textarea', name: 'input', label: 'YAML or TOML config' }], actions: ["inspect","validate","format","explain"] }] },
  'xml-xpath-workbench': { id: 'xml-xpath-workbench', algorithmId: 'validohub.xml-xpath', capability: 'parse', forms: [{ capability: 'parse', title: 'Parse', fields: [{ type: 'textarea', name: 'input', label: 'XML document' }, { type: 'text', name: 'xpath', label: 'XPath expression', value: "//*[local-name()='invoice']" }], actions: ["parse","validate","generate","explain"] }] },
  'csv-profiler': { id: 'csv-profiler', algorithmId: 'validohub.csv-profiler', capability: 'profile', forms: [{ capability: 'profile', title: 'Profile', fields: [{ type: 'textarea', name: 'input', label: 'CSV data' }, { type: 'select', name: 'delimiter', label: 'Delimiter', options: ["auto","comma","semicolon","tab"], value: "auto" }], actions: ["profile","validate","normalize","explain"] }] },
  'sql-query-inspector': { id: 'sql-query-inspector', algorithmId: 'validohub.sql-inspector', capability: 'inspect', forms: [{ capability: 'inspect', title: 'Inspect', fields: [{ type: 'select', name: 'dialect', label: 'Dialect', options: ["generic","postgres","mysql","sqlite","sqlserver"], value: "postgres" }, { type: 'textarea', name: 'input', label: 'SQL query' }], actions: ["inspect","format","validate","explain"] }] },
  'cron-expression-workbench': { id: 'cron-expression-workbench', algorithmId: 'validohub.cron', capability: 'inspect', forms: [{ capability: 'inspect', title: 'Inspect', fields: [{ type: 'text', name: 'input', label: 'Cron expression', value: "*/15 9-17 * * MON-FRI" }, { type: 'text', name: 'timezone', label: 'Timezone', value: "Europe/Kiev" }, { type: 'select', name: 'profile', label: 'Profile', options: ["unix-5","quartz-6"], value: "unix-5" }], actions: ["inspect","validate","generate","explain"] }] },
  'regex-explainer-generator': { id: 'regex-explainer-generator', algorithmId: 'validohub.regex-explainer', capability: 'explain', forms: [{ capability: 'explain', title: 'Explain', fields: [{ type: 'text', name: 'pattern', label: 'Regex pattern', value: "/^(?<prefix>[A-Z]{2})-\\d{4}$/" }, { type: 'select', name: 'intent', label: 'Generate intent', options: ["email","slug","uuid","iso-date","invoice-id"], value: "invoice-id" }, { type: 'textarea', name: 'input', label: 'Test corpus' }], actions: ["explain","generate","validate","parse"] }] },
  'date-timezone-workbench': { id: 'date-timezone-workbench', algorithmId: 'validohub.datetime', capability: 'convert', forms: [{ capability: 'convert', title: 'Convert', fields: [{ type: 'text', name: 'input', label: 'Date, time, or timestamp', value: "2026-07-23T09:30:00Z" }, { type: 'text', name: 'timezone', label: 'Target timezone', value: "Europe/Kiev" }, { type: 'select', name: 'locale', label: 'Locale', options: ["en-US","en-GB","de-DE","fr-FR","pl-PL","uk-UA","pt-BR"], value: "uk-UA" }], actions: ["convert","validate","generate","explain"] }] },
  'color-contrast-token-workbench': { id: 'color-contrast-token-workbench', algorithmId: 'validohub.color-contrast', capability: 'inspect', forms: [{ capability: 'inspect', title: 'Inspect', fields: [{ type: 'text', name: 'foreground', label: 'Foreground color', value: "#0f172a" }, { type: 'text', name: 'background', label: 'Background color', value: "#ffffff" }, { type: 'text', name: 'token', label: 'Token name', value: "color-text-primary" }], actions: ["inspect","validate","generate","explain"] }] },
  'markdown-mdx-inspector': { id: 'markdown-mdx-inspector', algorithmId: 'validohub.markdown-mdx', capability: 'inspect', forms: [{ capability: 'inspect', title: 'Inspect', fields: [{ type: 'textarea', name: 'input', label: 'Markdown or MDX' }, { type: 'select', name: 'profile', label: 'Profile', options: ["github","mdx","commonmark"], value: "github" }], actions: ["inspect","validate","format","explain"] }] },
  'graphql-workbench': { id: 'graphql-workbench', algorithmId: 'validohub.graphql', capability: 'inspect', forms: [{ capability: 'inspect', title: 'Inspect', fields: [{ type: 'textarea', name: 'query', label: 'GraphQL query or SDL' }, { type: 'textarea', name: 'variables', label: 'Variables JSON' }], actions: ["inspect","validate","generate","explain"] }] },
  'email-domain-workbench': { id: 'email-domain-workbench', algorithmId: 'validohub.email-domain', capability: 'validate', forms: [{ capability: 'validate', title: 'Validate', fields: [{ type: 'text', name: 'input', label: 'Email address or domain', value: "billing+test@example.com" }, { type: 'number', name: 'count', label: 'Generate count', value: "3", min: '1', max: '50' }], actions: ["validate","generate","parse","explain"] }] },
  'user-agent-client-hints-parser': { id: 'user-agent-client-hints-parser', algorithmId: 'validohub.user-agent', capability: 'parse', forms: [{ capability: 'parse', title: 'Parse', fields: [{ type: 'textarea', name: 'input', label: 'User-Agent and optional headers' }, { type: 'select', name: 'profile', label: 'Profile', options: ["auto","browser","bot","mobile"], value: "auto" }], actions: ["parse","validate","generate","explain"] }] },
  'http-security-headers-inspector': { id: 'http-security-headers-inspector', algorithmId: 'validohub.http-headers', capability: 'inspect', forms: [{ capability: 'inspect', title: 'Inspect', fields: [{ type: 'textarea', name: 'input', label: 'HTTP response headers' }, { type: 'select', name: 'profile', label: 'Profile', options: ["web-app","api","static-site"], value: "web-app" }], actions: ["inspect","validate","generate","explain"] }] },
  'phone-e164-workbench': { id: 'phone-e164-workbench', algorithmId: 'validohub.phone-e164', capability: 'validate', forms: [{ capability: 'validate', title: 'Validate or generate', fields: [{ type: 'select', name: 'country', label: 'Country profile', options: ['US','GB','DE','FR','PL','BR','UA','FI','CZ','AT'], value: 'US' }, { type: 'text', name: 'input', label: 'Phone number' }, { type: 'number', name: 'count', label: 'Generate count', value: '1', min: '1', max: '50' }], actions: ['validate','generate','parse','explain'] }] },
  'postal-code-workbench': { id: 'postal-code-workbench', algorithmId: 'validohub.postal-code', capability: 'validate', forms: [{ capability: 'validate', title: 'Validate or generate', fields: [{ type: 'select', name: 'country', label: 'Country profile', options: ['DE','GB','FR','PL','BR','UA','FI','CZ','AT','NL','IE'], value: 'DE' }, { type: 'text', name: 'input', label: 'Postal code' }, { type: 'number', name: 'count', label: 'Generate count', value: '1', min: '1', max: '50' }], actions: ['validate','generate','parse','explain'] }] },
  'swift-bic-workbench': { id: 'swift-bic-workbench', algorithmId: 'validohub.swift-bic', capability: 'validate', forms: [{ capability: 'validate', title: 'Validate or generate', fields: [{ type: 'select', name: 'country', label: 'Country code', options: ['DE','GB','FR','PL','FI','CZ','AT','NL','IE'], value: 'DE' }, { type: 'text', name: 'input', label: 'SWIFT / BIC' }, { type: 'number', name: 'count', label: 'Generate count', value: '1', min: '1', max: '50' }], actions: ['validate','generate','parse','explain'] }] },
  'mrz-passport-workbench': { id: 'mrz-passport-workbench', algorithmId: 'validohub.mrz-passport', capability: 'validate', forms: [{ capability: 'validate', title: 'Parse or generate', fields: [{ type: 'text', name: 'country', label: 'Issuing country ISO-3', value: 'DEU' }, { type: 'textarea', name: 'input', label: 'MRZ TD3 lines' }], actions: ['validate','generate','parse','explain'] }] },
  'csv-locale-normalizer': { id: 'csv-locale-normalizer', algorithmId: 'validohub.csv-repair', capability: 'normalize', forms: [{ capability: 'normalize', title: 'Normalize', fields: [{ type: 'textarea', name: 'input', label: 'CSV payload' }, { type: 'select', name: 'delimiter', label: 'Output delimiter', options: ['comma','semicolon','tab'], value: 'comma' }], actions: ['normalize','validate','parse','explain'] }] },
  'eu-vat-number-workbench': { id: 'eu-vat-number-workbench', algorithmId: 'validohub.eu-vat', capability: 'validate', forms: [{ capability: 'validate', title: 'Validate or generate', fields: [{ type: 'select', name: 'country', label: 'EU country prefix', options: ['DE','FR','PL','ES','IT','NL','IE','FI','CZ','AT'], value: 'DE' }, { type: 'text', name: 'input', label: 'VAT number' }, { type: 'number', name: 'count', label: 'Generate count', value: '1', min: '1', max: '50' }], actions: ['validate','generate','parse','explain'] }] },
  'iso20022-sepa-inspector': { id: 'iso20022-sepa-inspector', algorithmId: 'validohub.iso20022-sepa', capability: 'inspect', forms: [{ capability: 'inspect', title: 'Inspect XML', fields: [{ type: 'select', name: 'profile', label: 'Profile', options: ['auto','pain.001','pain.008','camt.053'], value: 'auto' }, { type: 'textarea', name: 'input', label: 'ISO 20022 XML' }], actions: ['inspect','validate','parse','explain'] }] },
  'secret-pii-redactor': { id: 'secret-pii-redactor', algorithmId: 'validohub.secret-pii', capability: 'inspect', forms: [{ capability: 'inspect', title: 'Scan and redact', fields: [{ type: 'select', name: 'mode', label: 'Redaction mode', options: ['balanced','strict'], value: 'balanced' }, { type: 'textarea', name: 'input', label: 'Payload, log, or text' }], actions: ['inspect','redact','validate','explain'] }] },
  'locale-test-data-generator': { id: 'locale-test-data-generator', algorithmId: 'validohub.locale-test-data', capability: 'generate', forms: [{ capability: 'generate', title: 'Generate fixtures', fields: [{ type: 'select', name: 'country', label: 'Country profile', options: ['DE','FR','GB','PL','BR','UA','FI','CZ','AT'], value: 'DE' }, { type: 'select', name: 'format', label: 'Output format', options: ['json','csv'], value: 'json' }, { type: 'number', name: 'count', label: 'Rows', value: '3', min: '1', max: '50' }], actions: ['generate','validate','explain'] }] },
  'webhook-signature-verifier': { id: 'webhook-signature-verifier', algorithmId: 'validohub.webhook-signature', capability: 'validate', forms: [{ capability: 'validate', title: 'Verify or generate', fields: [{ type: 'textarea', name: 'payload', label: 'Raw payload' }, { type: 'text', name: 'secret', label: 'Signing secret', value: 'whsec_demo_secret' }, { type: 'text', name: 'signature', label: 'Signature header' }, { type: 'text', name: 'prefix', label: 'Header prefix', value: 'sha256=' }], actions: ['validate','generate','explain'] }] },
  'html-encoder': {
    id: 'html-encoder',
    algorithmId: 'validohub.html-encoder',
    capability: 'encode',
    forms: [{
      capability: 'encode',
      title: 'Encode',
      fields: [{ type: 'textarea', name: 'input', label: 'Text', required: true }],
      actions: ['encode', 'decode', 'validate', 'explain']
    }]
  },
  'html-decoder': {
    id: 'html-decoder',
    algorithmId: 'validohub.html-decoder',
    capability: 'decode',
    forms: [{
      capability: 'decode',
      title: 'Decode',
      fields: [{ type: 'textarea', name: 'input', label: 'HTML entity text', required: true }],
      actions: ['decode', 'encode', 'validate', 'explain']
    }]
  },
  'slug-generator': {
    id: 'slug-generator',
    algorithmId: 'validohub.slug-generator',
    capability: 'generate',
    forms: [{
      capability: 'generate',
      title: 'Generate',
      fields: [
        { type: 'text', name: 'title', label: 'Title', required: true },
        { type: 'checkbox', name: 'lowercase', label: 'Lowercase', checked: true }
      ],
      actions: ['generate', 'format', 'explain']
    }]
  },
  'case-converter': {
    id: 'case-converter',
    algorithmId: 'validohub.case-converter',
    capability: 'convert',
    forms: [{
      capability: 'convert',
      title: 'Convert',
      fields: [
        { type: 'textarea', name: 'input', label: 'Text', required: true },
        { type: 'select', name: 'style', label: 'Case style', options: ['lowercase', 'uppercase', 'title', 'sentence', 'camel', 'snake', 'kebab'], value: 'sentence' }
      ],
      actions: ['convert', 'format', 'explain']
    }]
  },
  'uuid-generator': {
    id: 'uuid-generator',
    algorithmId: 'validohub.uuid',
    capability: 'generate',
    forms: [{
      capability: 'generate',
      title: 'Generate or validate',
      fields: [
        { type: 'select', name: 'version', label: 'UUID version', options: ['v4', 'v7'], value: 'v4' },
        { type: 'number', name: 'count', label: 'Count', value: '1', min: '1', max: '100' },
        { type: 'text', name: 'uuid', label: 'UUID to validate' }
      ],
      actions: ['generate', 'validate', 'parse', 'explain']
    }]
  },
  'iban-validator': {
    id: 'iban-validator',
    algorithmId: 'validohub.iban',
    capability: 'validate',
    forms: [{
      capability: 'validate',
      title: 'Validate',
      fields: [{ type: 'text', name: 'iban', label: 'IBAN', required: true }],
      actions: ['validate', 'parse', 'explain']
    }]
  },
  'iban-generator': {
    id: 'iban-generator',
    algorithmId: 'validohub.iban-generator',
    capability: 'generate',
    forms: [{
      capability: 'generate',
      title: 'Generate IBAN',
      fields: [
        { type: 'text', name: 'country', label: 'Country code', value: 'DE', required: true },
        { type: 'text', name: 'bban', label: 'BBAN / account body', value: '370400440532013000', required: true },
        { type: 'text', name: 'iban', label: 'Existing IBAN to repair or inspect' }
      ],
      actions: ['generate', 'validate', 'explain']
    }]
  },
  'brazil-iban-validator': {
    id: 'brazil-iban-validator',
    algorithmId: 'validohub.iban',
    capability: 'validate',
    forms: [{
      capability: 'validate',
      title: 'Validate Brazilian IBAN',
      fields: [{ type: 'text', name: 'iban', label: 'Brazilian IBAN', required: true }],
      actions: ['validate', 'parse', 'explain']
    }]
  },
  'germany-iban-validator': {
    id: 'germany-iban-validator',
    algorithmId: 'validohub.iban',
    capability: 'validate',
    forms: [{
      capability: 'validate',
      title: 'Validate German IBAN',
      fields: [{ type: 'text', name: 'iban', label: 'German IBAN', required: true }],
      actions: ['validate', 'parse', 'explain']
    }]
  },
  'spain-iban-validator': {
    id: 'spain-iban-validator',
    algorithmId: 'validohub.iban',
    capability: 'validate',
    forms: [{
      capability: 'validate',
      title: 'Validate Spanish IBAN',
      fields: [{ type: 'text', name: 'iban', label: 'Spanish IBAN', required: true }],
      actions: ['validate', 'parse', 'explain']
    }]
  },
  'regex-tester': {
    id: 'regex-tester',
    algorithmId: 'validohub.regex-tester',
    capability: 'validate',
    forms: [{
      capability: 'validate',
      title: 'Test pattern',
      fields: [
        { type: 'text', name: 'pattern', label: 'Pattern', required: true },
        { type: 'textarea', name: 'input', label: 'Test text', required: true }
      ],
      actions: ['validate', 'explain']
    }]
  },
  'text-diff': {
    id: 'text-diff',
    algorithmId: 'validohub.text-diff',
    capability: 'calculate',
    forms: [{
      capability: 'calculate',
      title: 'Compare',
      fields: [
        { type: 'textarea', name: 'original', label: 'Original text', required: true },
        { type: 'textarea', name: 'changed', label: 'Changed text', required: true }
      ],
      actions: ['calculate', 'explain']
    }]
  },
  'md5-generator': {
    id: 'md5-generator',
    algorithmId: 'validohub.md5',
    capability: 'generate',
    forms: [{
      capability: 'generate',
      title: 'Generate or validate',
      fields: [
        { type: 'textarea', name: 'input', label: 'Input text' },
        { type: 'text', name: 'hash', label: 'MD5 hash to validate' }
      ],
      actions: ['generate', 'validate', 'explain']
    }]
  },
  'sha1-generator': {
    id: 'sha1-generator',
    algorithmId: 'validohub.sha1',
    capability: 'generate',
    forms: [{
      capability: 'generate',
      title: 'Generate or validate',
      fields: [
        { type: 'textarea', name: 'input', label: 'Input text' },
        { type: 'text', name: 'hash', label: 'SHA-1 hash to validate' }
      ],
      actions: ['generate', 'validate', 'explain']
    }]
  },
  'sha256-generator': {
    id: 'sha256-generator',
    algorithmId: 'validohub.sha256',
    capability: 'generate',
    forms: [{
      capability: 'generate',
      title: 'Generate or validate',
      fields: [
        { type: 'textarea', name: 'input', label: 'Input text' },
        { type: 'text', name: 'hash', label: 'SHA-256 hash to validate' }
      ],
      actions: ['generate', 'validate', 'explain']
    }]
  }
};

const COUNTRY_IBAN_GENERATOR_PROFILES = {
  brazil: { code: 'BR', name: 'Brazil', bban: '00000000000010932840814P2' },
  france: { code: 'FR', name: 'France', bban: '1420041010050500013M02606' },
  germany: { code: 'DE', name: 'Germany', bban: '370400440532013000' },
  italy: { code: 'IT', name: 'Italy', bban: 'X0542811101000000123456' },
  netherlands: { code: 'NL', name: 'Netherlands', bban: 'ABNA0417164300' },
  poland: { code: 'PL', name: 'Poland', bban: '61109010140000071219812874'.slice(2) },
  spain: { code: 'ES', name: 'Spain', bban: '21000418450200051332' },
  switzerland: { code: 'CH', name: 'Switzerland', bban: '9300762011623852957' }
};

function countryIbanGeneratorWorkbench(slug, countrySlug) {
  if (!/-iban-generator$/.test(slug || '')) return null;
  const profile = COUNTRY_IBAN_GENERATOR_PROFILES[countrySlug || ''];
  if (!profile) return null;
  return {
    id: slug,
    algorithmId: 'validohub.iban-generator',
    capability: 'generate',
    forms: [{
      capability: 'generate',
      title: 'Generate ' + profile.name + ' IBAN',
      fields: [
        { type: 'text', name: 'country', label: 'Country code', value: profile.code, required: true },
        { type: 'text', name: 'bban', label: profile.name + ' BBAN / account body', value: profile.bban, required: true },
        { type: 'text', name: 'iban', label: 'Existing IBAN to repair or inspect' }
      ],
      actions: ['generate', 'validate', 'explain']
    }]
  };
}

function renderGenericField(field) {
  const required = field.required ? ' required="required"' : '';
  if (field.type === 'textarea') {
    return [
      '<label class="field">',
      '<span>' + escapeHtml(field.label) + '</span>',
      '<textarea name="' + escapeHtml(field.name) + '"' + required + '></textarea>',
      '</label>'
    ].join('');
  }
  if (field.type === 'select') {
    return [
      '<label class="field">',
      '<span>' + escapeHtml(field.label) + '</span>',
      '<select name="' + escapeHtml(field.name) + '">',
      field.options.map(option => '<option value="' + escapeHtml(option) + '"' + (option === field.value ? ' selected' : '') + '>' + escapeHtml(option) + '</option>').join(''),
      '</select>',
      '</label>'
    ].join('');
  }
  if (field.type === 'checkbox') {
    return [
      '<label class="field field-checkbox">',
      '<input type="checkbox" name="' + escapeHtml(field.name) + '"' + (field.checked ? ' checked' : '') + '>',
      '<span>' + escapeHtml(field.label) + '</span>',
      '</label>'
    ].join('');
  }
  return [
    '<label class="field">',
    '<span>' + escapeHtml(field.label) + '</span>',
    '<input type="' + escapeHtml(field.type || 'text') + '" name="' + escapeHtml(field.name) + '" value="' + escapeHtml(field.value || '') + '"' + (field.min ? ' min="' + escapeHtml(field.min) + '"' : '') + (field.max ? ' max="' + escapeHtml(field.max) + '"' : '') + required + '>',
    '</label>'
  ].join('');
}

function renderGenericUtilityWorkbench(config) {
  const forms = config.forms.map(form => [
    '<form class="tool-workbench" id="tool-' + escapeHtml(config.id) + '-' + escapeHtml(form.capability) + '" data-algorithm-id="' + escapeHtml(config.algorithmId) + '" data-capability="' + escapeHtml(form.capability) + '">',
    '<div class="workbench-form-heading">',
    '<h3>' + escapeHtml(form.title) + '</h3>',
    '<span class="input-mode-badge" data-input-mode-badge>Waiting for input</span>',
    '</div>',
    '<div class="field-grid">',
    form.fields.map(renderGenericField).join(''),
    '</div>',
    '<div class="button-row">',
    form.actions.map((action, index) => '<button type="button" class="button ' + (index === 0 ? 'button-primary' : 'button-secondary') + '" data-action="' + escapeHtml(action) + '">' + escapeHtml(action.charAt(0).toUpperCase() + action.slice(1)) + '</button>').join(''),
    '<button type="button" class="button button-secondary" data-tool-copy>Copy result</button>',
    '<button type="button" class="button button-secondary" data-tool-download>Download result</button>',
    '<button type="button" class="button button-ghost" data-tool-clear>Clear</button>',
    '</div>',
    '<label class="field output-field">',
    '<span>Output</span>',
    '<textarea class="tool-output" readonly data-tool-output></textarea>',
    '</label>',
    '<p class="tool-message" aria-live="polite" data-tool-message></p>',
    '<div class="tool-feedback" data-tool-feedback></div>',
    '<div class="preview-panel" data-tool-preview></div>',
    '<details class="advanced-panel" data-advanced-panel>',
    '<summary>Advanced analysis</summary>',
    '<div data-tool-advanced></div>',
    '</details>',
    '</form>'
  ].join('')).join('');
  return [
    '<section class="workbench-card" aria-label="Tool input and output">',
    '<div class="workbench-heading">',
    '<span class="eyebrow">Workbench</span>',
    '<h2>Run the tool</h2>',
    '<p>Paste input, choose an action, and copy the result directly in your browser.</p>',
    '</div>',
    '<div class="workbench-list">',
    forms,
    '</div>',
    '</section>'
  ].join('');
}

function ensureGenericUtilityWorkbench(content, route) {
  const path = String(route.path || '');
  const slug = path.match(/^\/en\/tools\/([^/]+)\//)?.[1] || path.match(/^\/en\/[^/]+\/([^/]+)\//)?.[1];
  const countrySlug = path.match(/^\/en\/([^/]+)\/[^/]+\//)?.[1] || '';
  const algorithmMatch = content.match(/data-algorithm-id="([^"]+)"/);
  const config = slug
    ? GENERIC_UTILITY_WORKBENCHES[slug] || (algorithmMatch && algorithmMatch[1] === 'validohub.iban-generator' ? countryIbanGeneratorWorkbench(slug, countrySlug) || GENERIC_UTILITY_WORKBENCHES['iban-generator'] : null)
    : null;
  if (algorithmMatch && FACTORY_TOOL_ALGORITHMS.has(algorithmMatch[1])) return content;
  if (!config) return content;
  const workbench = renderGenericUtilityWorkbench(config);
  let next = content;
  if (/<section class="workbench-card"[\s\S]*?<\/section>\s*<article class="content-card">/.test(next)) {
    next = next.replace(/<section class="workbench-card"[\s\S]*?<\/section>\s*<article class="content-card">/, workbench + '\n\n        <article class="content-card">');
  } else {
    next = next.replace(/<\/header>\s*<article class="content-card">/, '</header>\n\n        ' + workbench + '\n\n        <article class="content-card">');
  }
  return ensureWorkbenchScripts(next, 'generic-suite.js');
}

function collapseFactoryWorkbenchShell(content) {
  const match = content.match(/data-algorithm-id="([^"]+)"/);
  const algorithmId = match && match[1];
  if (!algorithmId || !FACTORY_TOOL_ALGORITHMS.has(algorithmId)) return content;
  const staticHost = [
    '<section class="workbench-card csf-static-host" aria-label="Premium country workbench" data-algorithm-id="' + escapeHtml(algorithmId) + '">',
    '</section>'
  ].join('');
  return content.replace(
    /<section class="workbench-card" aria-label="Tool input and output">[\s\S]*?<\/section>\s*(?=<(?:article|section) class="(?:content-card|related-section)")/,
    staticHost + '\n\n        '
  );
}

async function getConfiguredLocales() {
  const siteConfig = await readFile(resolve(projectRoot, 'site.yaml'), 'utf8');
  const inline = siteConfig.match(/^locales:\s*\[(.*?)\]\s*$/m);
  if (!inline) return ['en'];
  const values = inline[1]
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);
  return values.length > 0 ? values : ['en'];
}

async function pruneGeneratedLocaleDirectories(configuredLocales) {
  if (!(await pathExists(siteRoot))) return;
  const keep = new Set(configuredLocales);
  const localeDirPattern = /^[a-z]{2}(?:-[A-Z]{2})?$/;
  const entries = await readdir(siteRoot, { withFileTypes: true });
  const pruned = [];

  for (const entry of entries) {
    if (!entry.isDirectory() || !localeDirPattern.test(entry.name) || keep.has(entry.name)) continue;
    await rm(resolve(siteRoot, entry.name), { recursive: true, force: true });
    pruned.push(entry.name);
  }

  if (pruned.length) {
    console.log('✓ Pruned stale generated locale directories: ' + pruned.join(', '));
  } else {
    console.log('✓ No stale generated locale directories found');
  }
}

async function validateConfiguredLocaleSwitcher(configuredLocales) {
  const bundleSource = await readFile(resolve(projectRoot, 'assets', 'js', 'bundle.js'), 'utf8');
  const blockMatch = bundleSource.match(/const supportedLocales = \[([\s\S]*?)\];/);
  if (!blockMatch) {
    throw new Error('FATAL: Global language switcher supportedLocales block not found in assets/js/bundle.js');
  }

  const switcherLocales = Array.from(blockMatch[1].matchAll(/code:\s*['"]([^'"]+)['"]/g)).map(match => match[1]);
  const configured = [...configuredLocales];
  const extra = switcherLocales.filter(localeCode => !configured.includes(localeCode));
  const missing = configured.filter(localeCode => !switcherLocales.includes(localeCode));
  if (extra.length || missing.length) {
    throw new Error('FATAL: Language switcher locales must match site.yaml. Extra: ' + (extra.join(', ') || 'none') + '; missing: ' + (missing.join(', ') || 'none'));
  }
}

function splitRouteLocale(pathname) {
  const parts = String(pathname || '/').split('/').filter(Boolean);
  if (!parts.length) return { locale: 'en', suffix: '/' };
  const localeCode = parts[0];
  const suffixParts = parts.slice(1);
  const suffix = suffixParts.length ? `/${suffixParts.join('/')}/` : '/';
  return { locale: localeCode, suffix };
}

function routeForLocale(localeCode, suffix) {
  if (suffix === '/') {
    return `/${localeCode}/`;
  }
  return `/${localeCode}${suffix}`;
}

function localizedOutputPath(localePath) {
  return resolve(siteRoot, localePath.replace(/^\//, ''), 'index.html');
}

function rewriteHrefLocale(content, localeCode, routeRegistry) {
  return content.replace(/href="\/en\/([^"]*)"/g, (match, target) => {
    const normalizedTarget = String(target || '').replace(/^\/+/, '');
    const localizedCandidate = `/${localeCode}/${normalizedTarget}`;
    const normalizedLocalized = localizedCandidate.endsWith('/') ? localizedCandidate : `${localizedCandidate}/`;
    if (!routeRegistry.has(normalizedLocalized)) return match;
    return `href="${localizedCandidate}"`;
  });
}

function injectAlternateLinks(content, currentPath, routeRegistry, locales) {
  const { locale: currentLocale, suffix } = splitRouteLocale(currentPath);
  const alternateTags = [];
  for (const localeCode of locales) {
    const candidatePath = routeForLocale(localeCode, suffix);
    if (routeRegistry.has(candidatePath)) {
      alternateTags.push(`<link rel="alternate" hreflang="${localeCode}" href="https://validohub.com${candidatePath}">`);
    }
  }
  const englishPath = routeForLocale('en', suffix);
  if (routeRegistry.has(englishPath)) {
    alternateTags.push(`<link rel="alternate" hreflang="x-default" href="https://validohub.com${englishPath}">`);
  }

  let next = content.replace(/<link rel="alternate" hreflang="[^"]+" href="[^"]+">\s*/gi, '');
  const alternatesBlock = alternateTags.join('\n  ');
  if (alternatesBlock) {
    next = next.replace('</head>', `  ${alternatesBlock}\n</head>`);
  }

  // Keep the document language attribute in sync with route locale.
  next = next.replace(/<html\s+lang="[^"]+">/i, `<html lang="${currentLocale}">`);
  return next;
}

function normalizeUiLocale(localeCode) {
  const normalized = String(localeCode || '').toLowerCase();
  if (normalized.startsWith('pt-')) return 'pt-BR';
  if (normalized === 'de') return 'de';
  if (normalized === 'es') return 'es';
  if (normalized === 'pl') return 'pl';
  return 'en';
}

function applyUiLocaleTranslations(content, localeCode) {
  const uiLocale = normalizeUiLocale(localeCode);
  if (uiLocale === 'en') return content;

  const dictionary = {
    de: {
      home: 'Startseite',
      countries: 'Laender',
      identifiers: 'Kennungen',
      developerTools: 'Entwicklertools',
      finance: 'Finanzen',
      text: 'Text',
      tool: 'Werkzeug',
      runTool: 'Tool ausfuehren',
      relatedTools: 'Aehnliche Tools',
      continueWithRelated: 'Mit aehnlichen Tools fortfahren',
      validate: 'Pruefen',
      copyResult: 'Ergebnis kopieren',
      downloadResult: 'Ergebnis herunterladen',
      clear: 'Leeren',
      output: 'Ausgabe',
      waitingForInput: 'Warte auf Eingabe',
      advancedAnalysis: 'Erweiterte Analyse',
      faq: 'FAQ',
      expandAll: 'Alle ausklappen',
      collapseAll: 'Alle einklappen',
      references: 'Referenzen',
      officialSources: 'Offizielle Quellen',
      quickFacts: 'Kurzinfos',
      overview: 'Ueberblick',
      visualization: 'Visualisierung',
      implementation: 'Implementierung',
      summary: 'Zusammenfassung',
      testCases: 'Testfaelle',
      developers: 'Entwickler',
      frequentlyAskedQuestions: 'Haeufig gestellte Fragen',
      officialSourcesPlain: 'Offizielle Quellen',
      implementationGuidance: 'Implementierungshinweise',
      validationExamples: 'Validierungsbeispiele',
      visualStructureBreakdown: 'Visuelle Strukturaufteilung',
      moduloChecksumDetails: 'Modulo-Pruefsummen-Details',
      whatIs: 'Was ist',
      verificationMath: 'Pruefmathematik',
      issuingAuthority: 'Ausstellende Behoerde',
      developerGuidelines: 'Entwickler-Richtlinien',
      languageCodeSnippets: 'Sprach-Codebeispiele',
      field: 'Feld',
      positions: 'Positionen',
      description: 'Beschreibung',
      sampleInput: 'Beispieleingabe',
      status: 'Status',
      regionJurisdiction: 'Region / Gerichtsbarkeit',
      identifierCategory: 'Kennungskategorie',
      formatLength: 'Format und Laenge',
      statusBadge: 'Statusabzeichen',
      reviewed: 'Geprueft',
      localSpec: 'Lokale Spezifikation',
      draftSpecification: 'Entwurfsspezifikation',
      privacyAssured: 'Datenschutz zugesichert',
      serial: 'Seriennummer',
      region: 'Region',
      checksum: 'Pruefsumme',
      controlDigitComputed: 'Die Pruefziffer wird wie folgt berechnet:',
      multipliersFirst9: 'Multiplikatoren werden auf die ersten 9 Ziffern angewendet:',
      multipliersFirst10: 'Multiplikatoren werden auf die ersten 10 Ziffern angewendet:',
      firstChecksumDigit: 'Erste Pruefziffer (Ziffer 10)',
      secondChecksumDigit: 'Zweite Pruefziffer (Ziffer 11)',
      standardCpfStructure: 'Standard-CPF-Nummern bestehen aus genau 11 Ziffern und sind wie folgt aufgebaut:',
      whenImplementingCpf: 'Bei der Implementierung der CPF-Validierung:',
      officialPortal: 'Offizielles Portal',
      workbench: 'Werkbank',
      findCountryTool: 'Landes-Tool finden',
      clearCountryToolSearch: 'Suche leeren',
      mainNavigation: 'Hauptnavigation',
      breadcrumb: 'Pfadnavigation'
    },
    es: {
      home: 'Inicio',
      countries: 'Paises',
      identifiers: 'Identificadores',
      developerTools: 'Herramientas para desarrolladores',
      finance: 'Finanzas',
      text: 'Texto',
      tool: 'Herramienta',
      runTool: 'Ejecutar herramienta',
      relatedTools: 'Herramientas relacionadas',
      continueWithRelated: 'Continuar con herramientas relacionadas',
      validate: 'Validar',
      copyResult: 'Copiar resultado',
      downloadResult: 'Descargar resultado',
      clear: 'Limpiar',
      output: 'Salida',
      waitingForInput: 'Esperando entrada',
      advancedAnalysis: 'Analisis avanzado',
      faq: 'Preguntas frecuentes',
      expandAll: 'Expandir todo',
      collapseAll: 'Contraer todo',
      references: 'Referencias',
      officialSources: 'Fuentes oficiales',
      quickFacts: 'Datos rapidos',
      overview: 'Resumen',
      visualization: 'Visualizacion',
      implementation: 'Implementacion',
      summary: 'Resumen',
      testCases: 'Casos de prueba',
      developers: 'Desarrolladores',
      frequentlyAskedQuestions: 'Preguntas frecuentes',
      officialSourcesPlain: 'Fuentes oficiales',
      implementationGuidance: 'Guia de implementacion',
      validationExamples: 'Ejemplos de validacion',
      visualStructureBreakdown: 'Desglose de estructura visual',
      moduloChecksumDetails: 'Detalles de checksum modulo',
      whatIs: 'Que es',
      verificationMath: 'Matematica de verificacion',
      issuingAuthority: 'Autoridad emisora',
      developerGuidelines: 'Guia para desarrolladores',
      languageCodeSnippets: 'Fragmentos de codigo por lenguaje',
      field: 'Campo',
      positions: 'Posiciones',
      description: 'Descripcion',
      sampleInput: 'Entrada de ejemplo',
      status: 'Estado',
      regionJurisdiction: 'Region / Jurisdiccion',
      identifierCategory: 'Categoria del identificador',
      formatLength: 'Formato y longitud',
      statusBadge: 'Insignia de estado',
      reviewed: 'Revisado',
      localSpec: 'Especificacion local',
      draftSpecification: 'Especificacion en borrador',
      privacyAssured: 'Privacidad garantizada',
      serial: 'serie',
      region: 'region',
      checksum: 'checksum',
      controlDigitComputed: 'El digito de control se calcula de la siguiente forma:',
      multipliersFirst9: 'Los multiplicadores se aplican a los primeros 9 digitos:',
      multipliersFirst10: 'Los multiplicadores se aplican a los primeros 10 digitos:',
      firstChecksumDigit: 'Primer digito de control (Digito 10)',
      secondChecksumDigit: 'Segundo digito de control (Digito 11)',
      standardCpfStructure: 'Los numeros CPF estandar constan de exactamente 11 digitos estructurados asi:',
      whenImplementingCpf: 'Al implementar la validacion de CPF:',
      officialPortal: 'Portal oficial',
      workbench: 'Banco de trabajo',
      findCountryTool: 'Buscar herramienta del pais',
      clearCountryToolSearch: 'Limpiar busqueda',
      mainNavigation: 'Navegacion principal',
      breadcrumb: 'Ruta de navegacion'
    },
    pl: {
      home: 'Start',
      countries: 'Kraje',
      identifiers: 'Identyfikatory',
      developerTools: 'Narzedzia deweloperskie',
      finance: 'Finanse',
      text: 'Tekst',
      tool: 'Narzedzie',
      runTool: 'Uruchom narzedzie',
      relatedTools: 'Powiazane narzedzia',
      continueWithRelated: 'Przejdz do powiazanych narzedzi',
      validate: 'Sprawdz',
      copyResult: 'Kopiuj wynik',
      downloadResult: 'Pobierz wynik',
      clear: 'Wyczysc',
      output: 'Wynik',
      waitingForInput: 'Oczekiwanie na dane',
      advancedAnalysis: 'Analiza zaawansowana',
      faq: 'FAQ',
      expandAll: 'Rozwin wszystko',
      collapseAll: 'Zwin wszystko',
      references: 'Zrodla',
      officialSources: 'Oficjalne zrodla',
      quickFacts: 'Szybkie fakty',
      overview: 'Przeglad',
      visualization: 'Wizualizacja',
      implementation: 'Implementacja',
      summary: 'Podsumowanie',
      testCases: 'Przypadki testowe',
      developers: 'Deweloperzy',
      frequentlyAskedQuestions: 'Najczesciej zadawane pytania',
      officialSourcesPlain: 'Oficjalne zrodla',
      implementationGuidance: 'Wskazowki implementacyjne',
      validationExamples: 'Przyklady walidacji',
      visualStructureBreakdown: 'Podzial struktury wizualnej',
      moduloChecksumDetails: 'Szczegoly sumy kontrolnej modulo',
      whatIs: 'Czym jest',
      verificationMath: 'Matematyka weryfikacji',
      issuingAuthority: 'Organ wydajacy',
      developerGuidelines: 'Wytyczne dla deweloperow',
      languageCodeSnippets: 'Fragmenty kodu jezykow',
      field: 'Pole',
      positions: 'Pozycje',
      description: 'Opis',
      sampleInput: 'Przykladowe dane',
      status: 'Status',
      regionJurisdiction: 'Region / Jurysdykcja',
      identifierCategory: 'Kategoria identyfikatora',
      formatLength: 'Format i dlugosc',
      statusBadge: 'Odznaka statusu',
      reviewed: 'Sprawdzone',
      localSpec: 'Lokalna specyfikacja',
      draftSpecification: 'Wersja robocza specyfikacji',
      privacyAssured: 'Prywatnosc zapewniona',
      serial: 'seria',
      region: 'region',
      checksum: 'suma kontrolna',
      controlDigitComputed: 'Cyfra kontrolna jest obliczana nastepujaco:',
      multipliersFirst9: 'Mnozniki stosuje sie do pierwszych 9 cyfr:',
      multipliersFirst10: 'Mnozniki stosuje sie do pierwszych 10 cyfr:',
      firstChecksumDigit: 'Pierwsza cyfra kontrolna (Cyfra 10)',
      secondChecksumDigit: 'Druga cyfra kontrolna (Cyfra 11)',
      standardCpfStructure: 'Standardowe numery CPF skladaja sie dokladnie z 11 cyfr o strukturze:',
      whenImplementingCpf: 'Podczas wdrazania walidacji CPF:',
      officialPortal: 'Portal oficjalny',
      workbench: 'Workbench',
      findCountryTool: 'Znajdz narzedzie kraju',
      clearCountryToolSearch: 'Wyczysc wyszukiwanie',
      mainNavigation: 'Nawigacja glowna',
      breadcrumb: 'Okruszki'
    },
    'pt-BR': {
      home: 'Inicio',
      countries: 'Paises',
      identifiers: 'Identificadores',
      developerTools: 'Ferramentas para desenvolvedores',
      finance: 'Financas',
      text: 'Texto',
      tool: 'Ferramenta',
      runTool: 'Executar ferramenta',
      relatedTools: 'Ferramentas relacionadas',
      continueWithRelated: 'Continuar com ferramentas relacionadas',
      validate: 'Validar',
      copyResult: 'Copiar resultado',
      downloadResult: 'Baixar resultado',
      clear: 'Limpar',
      output: 'Saida',
      waitingForInput: 'Aguardando entrada',
      advancedAnalysis: 'Analise avancada',
      faq: 'Perguntas frequentes',
      expandAll: 'Expandir tudo',
      collapseAll: 'Recolher tudo',
      references: 'Referencias',
      officialSources: 'Fontes oficiais',
      quickFacts: 'Resumo rapido',
      overview: 'Visao geral',
      visualization: 'Visualizacao',
      implementation: 'Implementacao',
      summary: 'Resumo',
      testCases: 'Casos de teste',
      developers: 'Desenvolvedores',
      frequentlyAskedQuestions: 'Perguntas frequentes',
      officialSourcesPlain: 'Fontes oficiais',
      implementationGuidance: 'Guia de implementacao',
      validationExamples: 'Exemplos de validacao',
      visualStructureBreakdown: 'Quebra da estrutura visual',
      moduloChecksumDetails: 'Detalhes do checksum modulo',
      whatIs: 'O que e',
      verificationMath: 'Matematica de verificacao',
      issuingAuthority: 'Autoridade emissora',
      developerGuidelines: 'Diretrizes para desenvolvedores',
      languageCodeSnippets: 'Trechos de codigo por linguagem',
      field: 'Campo',
      positions: 'Posicoes',
      description: 'Descricao',
      sampleInput: 'Entrada de exemplo',
      status: 'Status',
      regionJurisdiction: 'Regiao / Jurisdicao',
      identifierCategory: 'Categoria do identificador',
      formatLength: 'Formato e comprimento',
      statusBadge: 'Selo de status',
      reviewed: 'Revisado',
      localSpec: 'Especificacao local',
      draftSpecification: 'Especificacao em rascunho',
      privacyAssured: 'Privacidade assegurada',
      serial: 'serie',
      region: 'regiao',
      checksum: 'checksum',
      controlDigitComputed: 'O digito de controle e calculado da seguinte forma:',
      multipliersFirst9: 'Os multiplicadores sao aplicados aos primeiros 9 digitos:',
      multipliersFirst10: 'Os multiplicadores sao aplicados aos primeiros 10 digitos:',
      firstChecksumDigit: 'Primeiro digito de controle (Digito 10)',
      secondChecksumDigit: 'Segundo digito de controle (Digito 11)',
      standardCpfStructure: 'Os numeros CPF padrao consistem em exatamente 11 digitos estruturados assim:',
      whenImplementingCpf: 'Ao implementar a validacao de CPF:',
      officialPortal: 'Portal oficial',
      workbench: 'Workbench',
      findCountryTool: 'Encontrar ferramenta do pais',
      clearCountryToolSearch: 'Limpar busca',
      mainNavigation: 'Navegacao principal',
      breadcrumb: 'Trilha de navegacao'
    }
  };

  const t = dictionary[uiLocale];
  let next = content;

  const replacements = [
    ['>Home<', `>${t.home}<`],
    ['>Countries<', `>${t.countries}<`],
    ['>Identifiers<', `>${t.identifiers}<`],
    ['>Developer Tools<', `>${t.developerTools}<`],
    ['>Finance<', `>${t.finance}<`],
    ['>Text<', `>${t.text}<`],
    ['>Tool<', `>${t.tool}<`],
    ['>Run the tool<', `>${t.runTool}<`],
    ['>Related tools<', `>${t.relatedTools}<`],
    ['>Continue with related tools<', `>${t.continueWithRelated}<`],
    ['>Validate<', `>${t.validate}<`],
    ['>Copy result<', `>${t.copyResult}<`],
    ['>Download result<', `>${t.downloadResult}<`],
    ['>Clear<', `>${t.clear}<`],
    ['>Output<', `>${t.output}<`],
    ['>Waiting for input<', `>${t.waitingForInput}<`],
    ['>Advanced analysis<', `>${t.advancedAnalysis}<`],
    ['>FAQ<', `>${t.faq}<`],
    ['>Expand All<', `>${t.expandAll}<`],
    ['>Collapse All<', `>${t.collapseAll}<`],
    ['>References<', `>${t.references}<`],
    ['>Official Registry Sources<', `>${t.officialSources}<`],
    ['>Official Sources<', `>${t.officialSourcesPlain}<`],
    ['>Quick Facts<', `>${t.quickFacts}<`],
    ['>Overview<', `>${t.overview}<`],
    ['>Summary<', `>${t.summary}<`],
    ['>Visualization<', `>${t.visualization}<`],
    ['>Implementation<', `>${t.implementation}<`],
    ['>Test cases<', `>${t.testCases}<`],
    ['>Developers<', `>${t.developers}<`],
    ['>Frequently Asked Questions<', `>${t.frequentlyAskedQuestions}<`],
    ['>Implementation Guidance<', `>${t.implementationGuidance}<`],
    ['>Validation Examples<', `>${t.validationExamples}<`],
    ['>Visual Structure Breakdown<', `>${t.visualStructureBreakdown}<`],
    ['>Modulo Checksum Details<', `>${t.moduloChecksumDetails}<`],
    ['>Verification Math<', `>${t.verificationMath}<`],
    ['>Issuing Authority<', `>${t.issuingAuthority}<`],
    ['>Developer Guidelines<', `>${t.developerGuidelines}<`],
    ['>Language Code Snippets<', `>${t.languageCodeSnippets}<`],
    ['>Field<', `>${t.field}<`],
    ['>Positions<', `>${t.positions}<`],
    ['>Description<', `>${t.description}<`],
    ['>Sample Input<', `>${t.sampleInput}<`],
    ['>Status<', `>${t.status}<`],
    ['>Region / Jurisdiction<', `>${t.regionJurisdiction}<`],
    ['>Identifier Category<', `>${t.identifierCategory}<`],
    ['>Format & Length<', `>${t.formatLength}<`],
    ['>Status Badge<', `>${t.statusBadge}<`],
    ['>Reviewed:<', `>${t.reviewed}:<`],
    ['>Local Spec<', `>${t.localSpec}<`],
    ['>Draft specification<', `>${t.draftSpecification}<`],
    ['>Privacy Assured<', `>${t.privacyAssured}<`],
    ['>serial<', `>${t.serial}<`],
    ['>region<', `>${t.region}<`],
    ['>checksum<', `>${t.checksum}<`],
    ['The control digit is computed as:', t.controlDigitComputed],
    ['Multipliers are applied to the first 9 digits:', t.multipliersFirst9],
    ['Multipliers are applied to the first 10 digits:', t.multipliersFirst10],
    ['First Checksum Digit (Digit 10)', t.firstChecksumDigit],
    ['Second Checksum Digit (Digit 11)', t.secondChecksumDigit],
    ['Standard CPF numbers consist of exactly 11 digits structured as:', t.standardCpfStructure],
    ['When implementing CPF validation:', t.whenImplementingCpf],
    ['>Official portal<', `>${t.officialPortal}<`],
    ['>What is ', `>${t.whatIs} `],
    ['>Workbench<', `>${t.workbench}<`],
    ['>Find a country tool<', `>${t.findCountryTool}<`],
    ['>Clear country tool search<', `>${t.clearCountryToolSearch}<`],
    ['aria-label="Main navigation"', `aria-label="${t.mainNavigation}"`],
    ['aria-label="Breadcrumb"', `aria-label="${t.breadcrumb}"`]
  ];

  for (const [from, to] of replacements) {
    next = next.split(from).join(to);
  }
  return next;
}

function localizeSeoUrls(content, localeCode) {
  const locale = String(localeCode || 'en');
  if (locale === 'en') return content;

  return content
    .replace(
      /<link rel="canonical" href="https:\/\/validohub\.com\/en\//g,
      `<link rel="canonical" href="https://validohub.com/${locale}/`
    )
    .replace(/("url"\s*:\s*")https:\/\/validohub\.com\/en\//g, `$1https://validohub.com/${locale}/`)
    .replace(/("url"\s*:\s*")https:\\\/\\\/validohub\.com\\\/en\\\//g, `$1https:\/\/validohub.com\/${locale}\/`)
    .replace(/content="\/en\//g, `content="/${locale}/`);
}

async function ensureLocalizedRouteFallbacks(routeRegistry, assetsManifest) {
  const locales = await getConfiguredLocales();
  const englishRoutes = routeRegistry.getAll().filter(route => route.path.startsWith('/en/'));

  // Register missing locale routes for every English route.
  for (const localeCode of locales) {
    if (localeCode === 'en') continue;

    for (const englishRoute of englishRoutes) {
      const { suffix } = splitRouteLocale(englishRoute.path);
      const localizedPath = routeForLocale(localeCode, suffix);
      if (routeRegistry.has(localizedPath)) continue;

      routeRegistry.register(localizedPath, {
        type: englishRoute.type,
        title: englishRoute.title,
        sourceOwner: 'node',
        outputPath: localizedOutputPath(localizedPath),
        metadata: {
          fallback: true,
          sourcePath: englishRoute.path,
          locale: localeCode
        }
      });
    }
  }

  // Materialize any route that is still missing output by cloning the English equivalent.
  for (const route of routeRegistry.getAll()) {
    const { locale: routeLocale, suffix } = splitRouteLocale(route.path);
    if (routeLocale === 'en') continue;
    if (await pathExists(route.outputPath)) continue;

    const englishPath = routeForLocale('en', suffix);
    const englishRoute = routeRegistry.get(englishPath);
    if (!englishRoute || !(await pathExists(englishRoute.outputPath))) {
      continue;
    }

    let localizedContent = await readFile(englishRoute.outputPath, 'utf8');
    localizedContent = rewriteHrefLocale(localizedContent, routeLocale, routeRegistry);
    localizedContent = localizedContent.replace(/<html\s+lang="[^"]+">/i, `<html lang="${routeLocale}">`);
    localizedContent = localizedContent.replace(/"inLanguage"\s*:\s*"en"/g, `"inLanguage":"${routeLocale}"`);
    localizedContent = localizeSeoUrls(localizedContent, routeLocale);

    await mkdir(dirname(route.outputPath), { recursive: true });
    await writeFile(route.outputPath, localizedContent, 'utf8');
    console.log(`✓ Generated localized route fallback: ${route.path}`);
  }

  // Normalize alternate locale links and locale-pinned internal hrefs on every route.
  for (const route of routeRegistry.getAll()) {
    if (!(await pathExists(route.outputPath))) continue;
    const { locale: routeLocale } = splitRouteLocale(route.path);
    let content = await readFile(route.outputPath, 'utf8');
    if (routeLocale !== 'en') {
      content = rewriteHrefLocale(content, routeLocale, routeRegistry);
      content = localizeSeoUrls(content, routeLocale);
      content = applyUiLocaleTranslations(content, routeLocale);
    }
    content = injectAlternateLinks(content, route.path, routeRegistry, locales);
    await writeFile(route.outputPath, content, 'utf8');
  }
}

function pageTitleForDocumentation(content, route) {
  if (route.title && route.title !== 'Java Component') return route.title;
  const match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (match) return stripHtml(match[1]);
  const slug = route.path.split('/').filter(Boolean).pop() || 'tool';
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function humanizeDocumentationSections(content, route) {
  if (!/<summary>(developer-examples|examples|explanation|faq|references)<\/summary>/i.test(content)) {
    return content;
  }
  const title = pageTitleForDocumentation(content, route);
  const safeTitle = escapeHtml(title);
  const labels = {
    'developer-examples': safeTitle + ' developer examples',
    examples: safeTitle + ' practical examples',
    explanation: 'How ' + safeTitle + ' works',
    faq: safeTitle + ' questions and edge cases',
    references: safeTitle + ' references and limits'
  };
  let next = content.replace(/<h2>Reference notes<\/h2>/g, '<h2>' + safeTitle + ' guide</h2>');
  for (const [raw, label] of Object.entries(labels)) {
    next = next.replace(new RegExp('<summary>' + raw + '<\/summary>', 'g'), '<summary>' + label + '</summary>');
  }
  return next;
}

function keepCountrySuiteRelatedLinksLocal(content, route) {
  const routePath = String(route.path || '');
  const match = routePath.match(/^\/en\/([^/]+)\/([^/]+)\/?$/);
  if (!match) return content;
  const countrySlug = match[1];
  const toolSlug = match[2];
  const isCountryTool = toolSlug.startsWith(`${countrySlug}-`) || (countrySlug === 'germany' && toolSlug.startsWith('german-'));
  if (!isCountryTool) return content;
  if (!content.includes('class="related-section"')) return content;
  const normalizedPath = routePath.endsWith('/') ? routePath : `${routePath}/`;
  const allowedPrefix = `/en/${countrySlug}/`;

  return content.replace(/<section class="related-section">([\s\S]*?)<\/section>/g, (section) => {
    return section.replace(/<a href="([^"]+)" class="link-card">[\s\S]*?<\/a>/g, (card, href) => {
      const normalizedHref = href.endsWith('/') ? href : `${href}/`;
      return normalizedHref.startsWith(allowedPrefix) && normalizedHref !== normalizedPath ? card : '';
    });
  });
}

// 2. Post-process Java-owned pages to use hashed assets, strip inline styles, and inject schema JSON-LD
async function postProcessJavaPages(routeRegistry, assetsManifest) {
  const javaRoutes = routeRegistry.getAll().filter(r => r.sourceOwner === 'java');
  
  for (const route of javaRoutes) {
    const filePath = route.outputPath;
    if (await pathExists(filePath)) {
      let content = await readFile(filePath, 'utf8');

      // Safely sanitize markdown leakage in public text nodes using placeholders
      const placeholders = [];
      content = content
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, (match) => {
          placeholders.push(match);
          return `<!--__PLACEHOLDER_${placeholders.length - 1}__-->`;
        })
        .replace(/<pre[^>]*>[\s\S]*?<\/pre>/gi, (match) => {
          placeholders.push(match);
          return `<!--__PLACEHOLDER_${placeholders.length - 1}__-->`;
        })
        .replace(/<code[^>]*>[\s\S]*?<\/code>/gi, (match) => {
          placeholders.push(match);
          return `<!--__PLACEHOLDER_${placeholders.length - 1}__-->`;
        });

      // Perform markdown corrections
      content = content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code>$1</code>');

      // Restore placeholders
      content = content.replace(/<!--__PLACEHOLDER_(\d+)__-->/g, (match, index) => {
        return placeholders[parseInt(index)];
      });

      content = humanizeDocumentationSections(content, route);
      content = ensureGenericUtilityWorkbench(content, route);
      content = collapseFactoryWorkbenchShell(content);
      content = ensureToolScript(content);
      content = keepCountrySuiteRelatedLinksLocal(content, route);

      // Force current hashed bundles on Java-owned pages to avoid stale hash drift across publish stages.
      content = content.replace(/<link rel="stylesheet" href="\/assets\/css\/bundle\.[a-f0-9]{6}\.css">/gi, `<link rel="stylesheet" href="${assetsManifest.css}">`);
      content = content.replace(/<script src="\/assets\/js\/bundle\.[a-f0-9]{6}\.js"><\/script>/gi, `<script src="${assetsManifest.js}"></script>`);

      // Determine proper JSON-LD schema
      let type = 'WebPage';
      let title = route.title || 'ValidoHub';
      let description = 'Validation, generation, parsing, encoding, and conversion tools.';
      
      if (route.path.includes('/tools/') || route.path.includes('validator')) {
        type = 'SoftwareApplication';
        const toolName = route.path.split('/').filter(Boolean).pop();
        title = toolName.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        description = `Run interactive ${title} checks and validations.`;
      } else if (route.path.includes('/categories/')) {
        type = 'CollectionPage';
        const catName = route.path.split('/').filter(Boolean).pop();
        title = catName.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) + ' Tools';
        description = `Explore utility tools for ${title.toLowerCase()}.`;
      }

      const jsonLd = {
        "@context": "https://schema.org",
        "@type": type,
        "name": title,
        "description": description,
        "url": `https://validohub.com${route.path}`
      };

      if (type === 'SoftwareApplication') {
        jsonLd.applicationCategory = "DeveloperApplication";
        jsonLd.operatingSystem = "All";
      }

      const escapedJson = JSON.stringify(jsonLd)
        .replace(/&/g, '\\u0026')
        .replace(/</g, '\\u003c')
        .replace(/>/g, '\\u003e');

      const jsonLdScript = `<script type="application/ld+json">${escapedJson}</script>`;
      content = content.replace('</head>', `${jsonLdScript}\n</head>`);

      await writeFile(filePath, content, 'utf8');
      console.log(`✓ Post-processed Java page: ${route.path}`);
    }
  }
}

// 3. Write final unified sitemap.xml
async function writeSitemap(routeRegistry) {
  const urls = routeRegistry.getAll()
    .sort((a, b) => a.path.localeCompare(b.path))
    .map(route => `  <url><loc>https://validohub.com${route.path}</loc></url>`)
    .join('\n');
    
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  await writeFile(resolve(siteRoot, 'sitemap.xml'), sitemapContent, 'utf8');
  console.log(`✓ Wrote sitemap.xml with ${routeRegistry.getAll().length} routes`);
}

// 4. Recursive folder scanner
async function scanFolderHtmlFiles(dir) {
  const results = [];
  const list = await readdir(dir, { withFileTypes: true });
  for (const item of list) {
    const res = resolve(dir, item.name);
    if (item.isDirectory()) {
      results.push(...(await scanFolderHtmlFiles(res)));
    } else if (item.isFile() && item.name === 'index.html') {
      results.push(res);
    }
  }
  return results;
}

async function normalizeWorkbenchScriptVersions() {
  const htmlFiles = await scanFolderHtmlFiles(siteRoot);
  const scriptRegex = /<script src="(\/assets\/js\/(?:workbench|tools)\/[^"?]+)(?:\?[^"]*)?"><\/script>/g;
  for (const filePath of htmlFiles) {
    const content = await readFile(filePath, 'utf8');
    const next = content.replace(scriptRegex, (match, src) => {
      return `<script src="${src}?v=${WORKBENCH_SCRIPT_VERSION}"></script>`;
    });
    if (next !== content) {
      await writeFile(filePath, next, 'utf8');
    }
  }
}

async function ensureGeneratedToolScripts() {
  const htmlFiles = await scanFolderHtmlFiles(siteRoot);
  let updated = 0;
  for (const filePath of htmlFiles) {
    const content = await readFile(filePath, 'utf8');
    const next = ensureToolScript(content);
    if (next !== content) {
      await writeFile(filePath, next, 'utf8');
      updated++;
    }
  }
  console.log(`✓ Ensured tool script dependencies on ${updated} generated pages`);
}

async function pruneCountrySuiteRelatedLinksToCountry() {
  const htmlFiles = await scanFolderHtmlFiles(siteRoot);
  let updated = 0;
  for (const filePath of htmlFiles) {
    const normalizedFilePath = filePath.replace(/\\/g, '/');
    const match = normalizedFilePath.match(/\/generated\/validohub\/([^/]+)\/([^/]+)\/([^/]+)\/index\.html$/);
    if (!match) continue;

    const localeCode = match[1];
    const countrySlug = match[2];
    const toolSlug = match[3];
    const isCountryTool = toolSlug.startsWith(`${countrySlug}-`) || (countrySlug === 'germany' && toolSlug.startsWith('german-'));
    if (!isCountryTool) continue;
    const relativePagePath = '/' + normalizedFilePath
      .slice(normalizedFilePath.indexOf('/generated/validohub/') + '/generated/validohub/'.length)
      .replace(/index\.html$/, '');
    const allowedPrefix = `/${localeCode}/${countrySlug}/`;
    const pagePath = relativePagePath.endsWith('/') ? relativePagePath : `${relativePagePath}/`;
    const content = await readFile(filePath, 'utf8');
    if (!content.includes('class="related-section"')) continue;

    const next = content.replace(/<section class="related-section">[\s\S]*?<\/section>/g, (section) => {
      return section.replace(/<a href="([^"]+)" class="link-card">[\s\S]*?<\/a>/g, (card, href) => {
        const normalizedHref = href.endsWith('/') ? href : `${href}/`;
        return normalizedHref.startsWith(allowedPrefix) && normalizedHref !== pagePath ? card : '';
      });
    });

    if (next !== content) {
      await writeFile(filePath, next, 'utf8');
      updated++;
    }
  }
  console.log(`✓ Pruned country suite related links to same-country routes on ${updated} pages`);
}

// 5. Build Validations Checks
async function validateSiteOutput(routeRegistry, assetsManifest) {
  console.log('--- Pass 3: Running Site Integrity Validations ---');
  const htmlFiles = await scanFolderHtmlFiles(siteRoot);
  let totalHtmlSize = 0;
  let emptySectionsPruned = 0;
  let linksValidated = 0;
  let jsonLdGenerated = 0;

  const ALGORITHM_TO_SCRIPT = {
    ...TOOL_SCRIPT_BY_ALGORITHM,
    'validohub.base64-decoder': 'base64.js',
    'validohub.base64': 'base64.js',
    'validohub.json-formatter': 'json.js',
    'validohub.json-validator': 'json.js',
    'validohub.jwt-decoder': 'jwt.js',
    'validohub.url-decoder': 'url.js',
    'validohub.url-encoder': 'url.js'
  };

  const forbiddenPhrases = [
    'Draft editorial scaffold',
    'This block will describe',
    'This block will contain',
    'This block will answer',
    'This block will list',
    'This block will include'
  ];

  for (const filePath of htmlFiles) {
    const content = await readFile(filePath, 'utf8');
    totalHtmlSize += Buffer.byteLength(content, 'utf8');
    const relativePath = '/' + filePath.replace(siteRoot, '').replace(/index\.html$/, '').replace(/^\//, '');

    // 1. Placeholder Content Guard — Node-owned pages only (Constraint 6)
    // Java-owned tool documentation sections are editorially managed separately
    const isNodeOwned = relativePath.startsWith('/en/countries') ||
                        relativePath.startsWith('/en/identifiers/') ||
                        /^\/en\/[a-z]+\/$/.test(relativePath); // country hub paths
    if (isNodeOwned) {
      for (const phrase of forbiddenPhrases) {
        const regex = new RegExp('\\b' + phrase.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\b', 'i');
        if (regex.test(content)) {
          throw new Error(`FATAL: Forbidden placeholder phrase "${phrase}" detected in route: ${relativePath}`);
        }
      }
    }

    if (content.includes('[object Object]')) {
      throw new Error(`FATAL: JavaScript object serialization artifact "[object Object]" detected in route: ${relativePath}`);
    }

    const isCountryHubOutput = /^\/[a-z]{2}(?:-[A-Z]{2})?\/[a-z-]+\/$/.test(relativePath) && !relativePath.includes('/categories/') && !relativePath.includes('/identifiers/');
    if (isCountryHubOutput) {
      if (/class="[^"]*vh-country-info-card[^"]*"[\s\S]*?<h3>\s*<\/h3>/.test(content)) {
        throw new Error(`FATAL: Empty country info-card title detected in route: ${relativePath}`);
      }
      if (/class="[^"]*vh-country-info-card[^"]*"[\s\S]*?<p class="vh-(?:mt-xs vh-mb-xs|mb-xs vh-mt-xs)">\s*<\/p>/.test(content)) {
        throw new Error(`FATAL: Empty country info-card summary detected in route: ${relativePath}`);
      }
    }

    // 2. CSS Delivery Guard (Constraint 3)
    const cssLinks = content.match(/<link[^>]*rel="stylesheet"[^>]*>/gi) || [];
    if (cssLinks.length !== 1) {
      throw new Error(`FATAL: Route ${relativePath} has ${cssLinks.length} stylesheet link(s) (Expected exactly 1)`);
    }
    const expectedLink = `<link rel="stylesheet" href="${assetsManifest.css}">`;
    if (!content.includes(expectedLink)) {
      throw new Error(`FATAL: Route ${relativePath} is missing link to current CSS bundle: ${assetsManifest.css}`);
    }
    if (content.includes('href="/assets/css/layout.css"') || content.includes('href="/assets/css/base.css"') || content.includes('href="/assets/css/reset.css"')) {
      throw new Error(`FATAL: Route ${relativePath} contains links to individual CSS source files`);
    }
    if (/<style[^>]*>[\s\S]*?<\/style>/gi.test(content)) {
      throw new Error(`FATAL: Route ${relativePath} contains forbidden inline <style> blocks`);
    }

    // 3. Javascript Delivery & Dynamic Mapping (Constraint 4)
    const algoMatch = content.match(/data-algorithm-id="([^"]+)"/);
    if (algoMatch) {
      const algoId = algoMatch[1];
      const mappedScript = ALGORITHM_TO_SCRIPT[algoId];
      if (!mappedScript) {
        throw new Error(`FATAL: Missing active script mapping or handler for algorithm ID: ${algoId} on route ${relativePath}`);
      }

      const mappedScripts = Array.isArray(mappedScript) ? mappedScript : [mappedScript];
      const expectedScripts = [];
      for (const scriptName of mappedScripts) {
        const scriptPath = resolve(projectRoot, 'assets', 'js', 'tools', scriptName);
        if (await pathExists(scriptPath)) expectedScripts.push(scriptName);
      }
      if (expectedScripts.length > 0) {
        for (const scriptName of expectedScripts) {
          const expectedScriptRegex = new RegExp(`<script src="/assets/js/tools/${scriptName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:\\?[^"]*)?"></script>`);
          if (!expectedScriptRegex.test(content)) {
            throw new Error(`FATAL: Validator page ${relativePath} is missing script tag for /assets/js/tools/${scriptName}`);
          }
        }
        for (let i = 1; i < expectedScripts.length; i++) {
          const previousScript = expectedScripts[i - 1];
          const currentScript = expectedScripts[i];
          const previousScriptRegex = new RegExp(`<script src="/assets/js/tools/${previousScript.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:\\?[^"]*)?"></script>`);
          const currentScriptRegex = new RegExp(`<script src="/assets/js/tools/${currentScript.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:\\?[^"]*)?"></script>`);
          const previousIndex = content.search(previousScriptRegex);
          const currentIndex = content.search(currentScriptRegex);
          if (previousIndex === -1 || currentIndex === -1 || previousIndex > currentIndex) {
            throw new Error(`FATAL: Validator page ${relativePath} loads ${currentScript} before required dependency ${previousScript}`);
          }
        }

        const allowedScripts = new Set(expectedScripts);
        const otherScriptRegex = /<script[^>]*src="\/assets\/js\/tools\/([^"?]+)(?:\?[^"]*)?"[^>]*>/gi;
        let otherMatch;
        while ((otherMatch = otherScriptRegex.exec(content)) !== null) {
          if (!allowedScripts.has(otherMatch[1])) {
            throw new Error(`FATAL: Validator page ${relativePath} loaded duplicate/unrelated script: ${otherMatch[1]}`);
          }
        }
      }
      // Tools without a dedicated script file use the workbench bundle for their logic
    } else {
      // Non-interactive pages must not load workbench or tool-specific scripts
      if (content.includes('/assets/js/tools/') || content.includes('/assets/js/workbench/')) {
        throw new Error(`FATAL: Non-interactive page ${relativePath} loaded workbench/tool scripts unnecessarily`);
      }
    }

    // A. Single visible H1 Check
    const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/gi;
    let h1Matches = [];
    let match;
    while ((match = h1Regex.exec(content)) !== null) {
      h1Matches.push(match[1]);
    }
    if (h1Matches.length > 1) {
      throw new Error(`FATAL: Multiple H1 elements found in ${relativePath}: "${h1Matches.join('", "')}"`);
    }
    if (h1Matches.length === 0) {
      throw new Error(`FATAL: Missing H1 header tag in route ${relativePath}`);
    }

    // C. Markdown Leakage check
    const cleanText = content
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<pre[^>]*>[\s\S]*?<\/pre>/gi, '')
      .replace(/<code[^>]*>[\s\S]*?<\/code>/gi, '')
      .replace(/<textarea[^>]*>[\s\S]*?<\/textarea>/gi, '')
      .replace(/<[^>]+>/g, ' ');

    if (cleanText.includes('**')) {
      throw new Error(`FATAL: Markdown leakage '**' detected in text nodes of route ${relativePath}`);
    }
    if (cleanText.includes('`')) {
      throw new Error(`FATAL: Markdown leakage '\`' detected in text nodes of route ${relativePath}`);
    }

    // D. Empty Sections Check
    if (content.includes('class="card-grid"')) {
      const emptyGridRegex = /<div class="[^"]*card-grid[^"]*">\s*<\/div>/g;
      if (emptyGridRegex.test(content)) {
        throw new Error(`FATAL: Empty card grid container detected in route ${relativePath}`);
      }
    }
    if (content.includes('vh-graph')) {
      const emptyGraphRegex = /<div class="[^"]*vh-graph[^"]*">\s*<\/div>/g;
      if (emptyGraphRegex.test(content)) {
        throw new Error(`FATAL: Empty knowledge graph container detected in route ${relativePath}`);
      }
    }

    // E. JSON-LD Verification
    const jsonLdRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
    let jsonLdMatch;
    while ((jsonLdMatch = jsonLdRegex.exec(content)) !== null) {
      try {
        const payload = JSON.parse(jsonLdMatch[1]);
        if (!payload['@context'] || !payload['@type']) {
          throw new Error(`Missing context or type attributes in JSON-LD of route ${relativePath}`);
        }
        jsonLdGenerated++;
      } catch (err) {
        throw new Error(`FATAL: Invalid JSON-LD block syntax in route ${relativePath}: ${err.message}`);
      }
    }

    // F. Validate Internal Links
    const hrefRegex = /href\s*=\s*['"]([^'"]+)['"]/gi;
    let hrefMatch;
    while ((hrefMatch = hrefRegex.exec(content)) !== null) {
      const href = hrefMatch[1];
      
      if (/^(https?:|mailto:|tel:)/i.test(href)) {
        continue;
      }

      if (href.startsWith('#')) {
        const fragId = href.substring(1);
        if (fragId && !content.includes(`id="${fragId}"`) && !content.includes(`id='${fragId}'`)) {
          throw new Error(`FATAL: Broken fragment identifier link "${href}" in route ${relativePath}`);
        }
        continue;
      }

      if (href.startsWith('/assets/')) {
        const assetPath = resolve(siteRoot, href.replace(/^\//, ''));
        if (!(await pathExists(assetPath))) {
          throw new Error(`FATAL: Broken static asset path "${href}" referenced in route ${relativePath}`);
        }
        linksValidated++;
        continue;
      }

      const linkPath = href.split('#')[0];
      if (!routeRegistry.has(linkPath)) {
        throw new Error(`FATAL: Broken internal route link "${href}" found in page ${relativePath}`);
      }
      linksValidated++;
    }
  }

  // 4. Brazil Pix Draft Exclusion check (Constraint 1 & 9)
  const pixToolConfig = await readFile(resolve(projectRoot, 'tools', 'brazil-pix-validator.yaml'), 'utf8');
  const pixToolIsDraft = /^\s*status:\s*draft\s*$/m.test(pixToolConfig);
  if (pixToolIsDraft) {
    const pixRoutePath = resolve(siteRoot, 'en', 'brazil', 'brazil-pix-validator', 'index.html');
    if (await pathExists(pixRoutePath)) {
      throw new Error(`FATAL: Brazil Pix draft route is generated at: `);
    }
    const sitemapContent = await readFile(resolve(siteRoot, 'sitemap.xml'), 'utf8');
    if (sitemapContent.includes('/brazil-pix-validator/')) {
      throw new Error(`FATAL: Brazil Pix draft route found in sitemap.xml`);
    }
    const searchIndexContent = await readFile(resolve(siteRoot, 'search-index.json'), 'utf8');
    if (searchIndexContent.includes('brazil-pix-validator')) {
      throw new Error(`FATAL: Brazil Pix draft route found in search-index.json`);
    }
  }

  return {
    totalHtmlSize,
    linksValidated,
    jsonLdGenerated
  };
}


async function main() {
  const startTime = Date.now();
  try {
    console.log('=== STARTING PRODUCTION VALIDO-HUB BUILD PIPELINE ===');

    // 1. Compile Graph/Search Indexes
    console.log('\n[Step 1/5] Compiling Knowledge Graph & Search Indexes...');
    await runCommand('node scripts/compile-countries-registry.mjs', projectRoot);

    // 2. Asset Concatenation, Fingerprinting and Manifest writing
    console.log('\n[Step 2/5] Compiling Design-System Hashed Assets...');
    const assetsManifest = await compileAssets();
    const configuredLocales = await getConfiguredLocales();
    await validateConfiguredLocaleSwitcher(configuredLocales);
    await pruneGeneratedLocaleDirectories(configuredLocales);

    // 3. Publish/Materialize Static Site via Maven
    console.log('\n[Step 3/5] Executing Maven Site Publisher...');
    const engineDir = '/Users/maxtkachenko/work/valido-engine';
    await runCommand('mvn -pl valido-cli exec:java -Dexec.mainClass="com.validoengine.cli.EngineMain" -Dexec.args="publish --site /Users/maxtkachenko/work/validohub/site.yaml"', engineDir);

    // 4. Pass 1: Build Registry & Assert Ownership Integrity
    console.log('\n[Step 4/5] Loading Canonical Route Registry...');
    const routeRegistry = await buildRouteRegistry();
    console.log(`Registry loaded successfully: ${routeRegistry.getAll().length} routes discovered.`);

    // 5. Pass 2: Generators Materialization
    console.log('\n[Step 5/5] Re-compiling Template Archetypes...');
    const homeRoute = routeRegistry.get('/en/');
    if (homeRoute) homeRoute.sourceOwner = 'node';
    await compileHomePortal(routeRegistry, assetsManifest);
    await compileToolsPortal(routeRegistry, assetsManifest);
    await compileCountriesPortal(routeRegistry, assetsManifest);
    await compileIdentifiers(routeRegistry, assetsManifest);
    await ensureLocalizedRouteFallbacks(routeRegistry, assetsManifest);
    await postProcessJavaPages(routeRegistry, assetsManifest);
    await applyFinalLocalizationPass(routeRegistry, siteRoot, configuredLocales);
    await pruneCountrySuiteRelatedLinksToCountry();
    await normalizeWorkbenchScriptVersions();
    await ensureGeneratedToolScripts();
    await writeSitemap(routeRegistry);

    // 6. Site Integrity Verification & Metrics
    const metrics = await validateSiteOutput(routeRegistry, assetsManifest);

    // Build duration
    const buildDuration = Date.now() - startTime;

    // Print Build Summary Report
    const totalRoutes = routeRegistry.getAll().length;
    const countries = routeRegistry.getAll().filter(r => r.type === 'country').length;
    const identifiers = routeRegistry.getAll().filter(r => r.type === 'identifier').length;
    const validators = routeRegistry.getAll().filter(r => r.type === 'validator').length;
    const categories = routeRegistry.getAll().filter(r => r.type === 'category').length;
    const javaOwned = routeRegistry.getAll().filter(r => r.sourceOwner === 'java').length;
    const nodeOwned = routeRegistry.getAll().filter(r => r.sourceOwner === 'node').length;

    console.log('\n==================================================');
    console.log('          VALIDOHUB BUILD SUMMARY REPORT          ');
    console.log('==================================================');
    console.log(`Total Registered Routes:       ${totalRoutes}`);
    console.log(`  Java-Owned Routes:           ${javaOwned}`);
    console.log(`  Node-Owned Routes:           ${nodeOwned}`);
    console.log(`  Country Pages:               ${countries}`);
    console.log(`  Identifier Pages:            ${identifiers}`);
    console.log(`  Validator Pages:             ${validators}`);
    console.log(`  Category Pages:              ${categories}`);
    console.log(`Hashed CSS Bundle:             ${assetsManifest.css}`);
    console.log(`Hashed JS Bundle:              ${assetsManifest.js}`);
    console.log(`Internal Links Validated:      ${metrics.linksValidated}`);
    console.log(`JSON-LD Payloads Generated:    ${metrics.jsonLdGenerated}`);
    console.log(`Total HTML Size:               ${metrics.totalHtmlSize} bytes`);
    console.log(`Build Duration:                ${buildDuration} ms`);
    console.log('Build Integrity Verification:  PASSED');
    console.log('==================================================');

    // Write a JSON build stats report for CI determinism check
    const reportData = {
      totalRegisteredRoutes: totalRoutes,
      javaOwned,
      nodeOwned,
      countryPagesCount: countries,
      identifierPagesCount: identifiers,
      validatorPagesCount: validators,
      categoryPagesCount: categories,
      cssBundle: assetsManifest.css,
      jsBundle: assetsManifest.js,
      linksValidated: metrics.linksValidated,
      jsonLdGenerated: metrics.jsonLdGenerated,
      totalHtmlSize: metrics.totalHtmlSize,
      buildDuration
    };
    await writeFile(resolve(siteRoot, 'build-report.json'), JSON.stringify(reportData, null, 2), 'utf8');

  } catch (error) {
    console.error('\n!!! BUILD PIPELINE FAILED !!!');
    console.error(error.message || error);
    process.exit(1);
  }
}

main();
