import { access, cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildRouteRegistry } from "./route-registry.mjs";
import { compileToolsPortal } from "./build-countries-portal.mjs";
import { applyFinalLocalizationPass } from "./localization-pass.mjs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "..");
const siteRoot = resolve(projectRoot, "generated", "validohub");
const CORE_PRODUCTION_LOCALES = ["en", "es", "pt-BR", "de", "fr", "pl", "uk"];

function usage() {
  return [
    "Usage: node scripts/build-tools-dev.mjs [--slugs slug-a,slug-b] [--locales en,pl]",
    "",
    "Fast global-tools materializer. It recompiles shared CSS/JS assets, renders /en/tools/ from source,",
    "syncs browser runtimes, refreshes selected generated /tools/<slug>/ pages, and localizes only /tools/.",
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



const WORKBENCH_SCRIPT_VERSION = "country-premium-20260719";

const GENERIC_SUITE_ALGORITHMS = new Set([
  "validohub.json-schema", "validohub.openapi", "validohub.yaml-toml", "validohub.xml-xpath",
  "validohub.csv-profiler", "validohub.sql-inspector", "validohub.cron", "validohub.regex-explainer",
  "validohub.datetime", "validohub.color-contrast", "validohub.markdown-mdx", "validohub.graphql",
  "validohub.email-domain", "validohub.user-agent", "validohub.http-headers",
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
  const tag = '<script src="' + src + '?v=' + WORKBENCH_SCRIPT_VERSION + '"></script>';
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
  let next = content;
  next = next.replace(/<link rel="stylesheet" href="\/assets\/css\/bundle\.[a-f0-9]{6}\.css">/gi, "<link rel=\"stylesheet\" href=\"" + assetsManifest.css + "\">");
  next = next.replace(/<script src="\/assets\/js\/bundle\.[a-f0-9]{6}\.js"( defer)?><\/script>/gi, "<script src=\"" + assetsManifest.js + "\" defer></script>");
  if (!next.includes("href=\"" + assetsManifest.css + "\"")) next = next.replace("</head>", "  <link rel=\"stylesheet\" href=\"" + assetsManifest.css + "\">\n</head>");
  if (!next.includes("src=\"" + assetsManifest.js + "\"")) next = next.replace("</body>", "<script src=\"" + assetsManifest.js + "\" defer></script>\n</body>");
  return next;
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

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) { console.log(usage()); return; }
  const routeRegistry = await buildRouteRegistry();
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
  await applyFinalLocalizationPass(routeRegistry, siteRoot, portalLocales, { includeSuffixes: ["/tools/"] });
  console.log("✓ Localized tools portal only: " + portalLocales.map(locale => "/" + locale + "/tools/").join(", "));

  const result = await refreshToolPageAssets(selectedSlugs, locales, assetsManifest);
  console.log("✓ Refreshed current CSS/JS bundle links on " + result.updated + " selected tool pages (checked " + result.checked + ")");
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
