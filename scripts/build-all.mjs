import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile, writeFile, readdir, rm, access, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { buildRouteRegistry } from './route-registry.mjs';
import { compileCountriesPortal } from './build-countries-portal.mjs';
import { compileIdentifiers } from './build-identifiers.mjs';

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

  const manifest = {
    css: `/assets/css/${cssFileName}`,
    js: `/assets/js/${jsFileName}`
  };

  // Write manifest to generated output only
  await writeFile(resolve(siteRoot, 'assets-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

  console.log(`✓ Compiled CSS bundle: ${manifest.css}`);
  console.log(`✓ Compiled JS bundle: ${manifest.js}`);
  return manifest;
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

// 5. Build Validations Checks
async function validateSiteOutput(routeRegistry, assetsManifest) {
  console.log('--- Pass 3: Running Site Integrity Validations ---');
  const htmlFiles = await scanFolderHtmlFiles(siteRoot);
  let totalHtmlSize = 0;
  let emptySectionsPruned = 0;
  let linksValidated = 0;
  let jsonLdGenerated = 0;

  const ALGORITHM_TO_SCRIPT = {
    'validohub.pesel': 'pesel.js',
    'validohub.brazil-pix': 'pix.js',
    'validohub.spain-id': 'spain-id.js',
    'validohub.poland-suite': 'poland-suite.js',
    'validohub.poland-expansion': 'poland-expansion.js',
    'validohub.base64-decoder': 'base64.js',
    'validohub.base64': 'base64.js',
    'validohub.json-formatter': 'json.js',
    'validohub.json-validator': 'json.js',
    'validohub.jwt-decoder': 'jwt.js',
    'validohub.url-decoder': 'url.js',
    'validohub.url-encoder': 'url.js',
    'validohub.case-converter': 'case-converter.js',
    'validohub.html-decoder': 'html.js',
    'validohub.html-encoder': 'html.js',
    'validohub.iban': 'iban.js',
    'validohub.md5': 'md5.js',
    'validohub.regex-tester': 'regex.js',
    'validohub.sha1': 'sha.js',
    'validohub.sha256': 'sha.js',
    'validohub.slug-generator': 'slug.js',
    'validohub.text-diff': 'text-diff.js',
    'validohub.uuid': 'uuid.js'
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

      // Only check for dedicated tool script if the file actually exists in source assets
      const scriptPath = resolve(projectRoot, 'assets', 'js', 'tools', mappedScript);
      const scriptFileExists = await pathExists(scriptPath);
      if (scriptFileExists) {
        const expectedScriptTag = `<script src="/assets/js/tools/${mappedScript}"></script>`;
        if (!content.includes(expectedScriptTag)) {
          throw new Error(`FATAL: Validator page ${relativePath} is missing script tag: ${expectedScriptTag}`);
        }

        const otherScriptRegex = /<script[^>]*src="\/assets\/js\/tools\/([^"]+)"[^>]*>/gi;
        let otherMatch;
        while ((otherMatch = otherScriptRegex.exec(content)) !== null) {
          if (otherMatch[1] !== mappedScript) {
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
    await compileCountriesPortal(routeRegistry, assetsManifest);
    await compileIdentifiers(routeRegistry, assetsManifest);
    await postProcessJavaPages(routeRegistry, assetsManifest);
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
