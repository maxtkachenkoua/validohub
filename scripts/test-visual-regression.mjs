import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');
const baselinesDir = resolve(projectRoot, 'tests', 'visual-baselines');

const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet', width: 900, height: 1000 },
  { name: 'mobile', width: 390, height: 844 }
];

const targetPages = [
  { path: '/en/poland/', name: 'poland' },
  { path: '/en/brazil/', name: 'brazil' },
  { path: '/en/germany/', name: 'germany' },
  { path: '/en/poland/pesel-validator/', name: 'pesel-validator' },
  { path: '/en/identifiers/pesel/', name: 'pesel-spec' },
  { path: '/en/countries/', name: 'countries-portal' }
];

// Simple static server for visual tests
function startServer(port, dir) {
  const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.json': 'application/json'
  };

  const server = http.createServer(async (req, res) => {
    let urlPath = req.url.split('?')[0];
    if (urlPath.endsWith('/')) {
      urlPath += 'index.html';
    }
    const filePath = resolve(dir, urlPath.replace(/^\//, ''));
    try {
      const stat = await fs.stat(filePath);
      if (stat.isFile()) {
        const ext = extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      }
    } catch (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });

  return new Promise((res) => {
    server.listen(port, () => {
      res(server);
    });
  });
}

async function runVisualTests() {
  console.log('=== STARTING PLAYWRIGHT COMPREHENSIVE TESTS ===');
  await fs.mkdir(baselinesDir, { recursive: true });

  const port = 8083;
  const server = await startServer(port, siteRoot);
  console.log(`Local server listening on http://localhost:${port}`);

  const browser = await chromium.launch({ headless: true });
  let hasFailure = false;

  try {
    // Read manifest for CSS hash verification
    const manifest = JSON.parse(await fs.readFile(resolve(siteRoot, 'assets-manifest.json'), 'utf8'));
    console.log(`Loaded Manifest: CSS -> ${manifest.css}, JS -> ${manifest.js}`);

    // Verify Brazil Pix Validator Exclusion (Constraint 1 & 9)
    console.log('\n--- Checking Brazil Pix Exclusion Rule ---');
    const pixHtmlExists = await fs.access(resolve(siteRoot, 'en', 'brazil', 'brazil-pix-validator', 'index.html'))
      .then(() => true).catch(() => false);
    if (pixHtmlExists) {
      console.error('❌ FAIL: Brazil Pix HTML page is generated in target production dir.');
      hasFailure = true;
    } else {
      console.log('✓ Pass: Brazil Pix HTML page is not generated.');
    }

    const sitemapContent = await fs.readFile(resolve(siteRoot, 'sitemap.xml'), 'utf8');
    if (sitemapContent.includes('/brazil-pix-validator/')) {
      console.error('❌ FAIL: Brazil Pix route is linked in sitemap.xml.');
      hasFailure = true;
    } else {
      console.log('✓ Pass: Brazil Pix is absent from sitemap.xml.');
    }

    const searchIndexContent = await fs.readFile(resolve(siteRoot, 'search-index.json'), 'utf8');
    if (searchIndexContent.includes('brazil-pix-validator')) {
      console.error('❌ FAIL: Brazil Pix route is indexed in search-index.json.');
      hasFailure = true;
    } else {
      console.log('✓ Pass: Brazil Pix is absent from search-index.json.');
    }

    for (const pageInfo of targetPages) {
      console.log(`\nTesting page: ${pageInfo.path}`);

      // Verify no generated pages link to the excluded Brazil Pix validator
      const pageFileHtml = await fs.readFile(resolve(siteRoot, pageInfo.path.replace(/^\//, '').replace(/\/$/, '/index.html')), 'utf8');
      if (pageFileHtml.includes('/brazil-pix-validator/')) {
        console.error(`❌ FAIL: Route ${pageInfo.path} contains link to draft Pix route.`);
        hasFailure = true;
      } else {
        console.log(`✓ Pass: Route ${pageInfo.path} does not link to Pix draft.`);
      }

      // Check CSS Delivery (Constraint 3) on the specific pages
      if (['/en/poland/pesel-validator/', '/en/identifiers/pesel/', '/en/poland/', '/en/countries/'].includes(pageInfo.path)) {
        // Assert exactly one bundle CSS link
        const cssLinks = pageFileHtml.match(/<link[^>]*rel="stylesheet"[^>]*>/gi) || [];
        if (cssLinks.length !== 1 || !cssLinks[0].includes(manifest.css)) {
          console.error(`❌ FAIL: CSS bundle delivery missing or multiple links found: ${cssLinks.join(', ')}`);
          hasFailure = true;
        } else {
          console.log(`✓ Pass: Exactly one stylesheet bundle matches ${manifest.css}`);
        }
        // Assert no raw css links
        if (pageFileHtml.includes('href="/assets/css/layout.css"') || pageFileHtml.includes('href="/assets/css/base.css"')) {
          console.error('❌ FAIL: Raw source stylesheets are still linked.');
          hasFailure = true;
        } else {
          console.log('✓ Pass: No individual source CSS links are present.');
        }
        // Assert no inline style tags
        if (/<style[^>]*>/gi.test(pageFileHtml)) {
          console.error('❌ FAIL: Inline <style> tags detected in page.');
          hasFailure = true;
        } else {
          console.log('✓ Pass: No inline style tags block present.');
        }
      }

      for (const vp of viewports) {
        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height }
        });
        const page = await context.newPage();

        const consoleErrors = [];
        page.on('pageerror', err => {
          consoleErrors.push(err.message);
        });

        const failedRequests = [];
        page.on('response', response => {
          const status = response.status();
          const url = response.url();
          if (status >= 400 && !url.includes('favicon.ico')) {
            failedRequests.push(`${url} (Status: ${status})`);
          }
        });

        await page.goto(`http://localhost:${port}${pageInfo.path}`, {
          waitUntil: 'networkidle'
        });

        // Computed style assertions on Desktop
        if (vp.name === 'desktop') {
          // Breadcrumbs check
          const breadcrumbsDisplay = await page.$eval('.breadcrumbs ol, .vh-breadcrumbs ol', el => {
            return getComputedStyle(el).display;
          }).catch(() => 'missing');

          if (breadcrumbsDisplay !== 'flex') {
            console.error(`  ❌ FAIL: Breadcrumbs list does not use horizontal flex layout (computed: ${breadcrumbsDisplay})`);
            hasFailure = true;
          } else {
            console.log(`  ✓ Pass: Breadcrumbs display is flex`);
          }

          // Container constraint check
          const mainWidth = await page.$eval('.container, .vh-container', el => {
            return parseFloat(getComputedStyle(el).width);
          }).catch(() => 0);

          if (mainWidth > 1300) {
            console.error(`  ❌ FAIL: Main content container width is unconstrained (computed: ${mainWidth}px)`);
            hasFailure = true;
          } else {
            console.log(`  ✓ Pass: Site container width is constrained (${mainWidth}px)`);
          }

          // Custom accordion chevron markers verification (Constraint 7 & 8)
          const detailsSelector = 'details.doc-accordion, details.advanced-panel, details.pesel-dev-accordion';
          const detailsElements = await page.$$(detailsSelector);
          for (const det of detailsElements) {
            const isClosed = await page.evaluate(el => !el.open, det);
            if (isClosed) {
              const chevronStyle = await page.evaluate(el => {
                const summary = el.querySelector('summary');
                const before = window.getComputedStyle(summary, '::before');
                return {
                  content: before.content,
                  transform: before.transform
                };
              }, det);
              if (chevronStyle.content === 'none' || chevronStyle.content === '') {
                console.error(`  ❌ FAIL: Details elements lack custom chevron ::before pseudo elements.`);
                hasFailure = true;
              }
            }
          }
          console.log('  ✓ Pass: Details/summary chevron custom indicators verified.');
        }

        // Mobile scroll overflow checks
        if (vp.name === 'mobile') {
          const hasOverflow = await page.evaluate(() => {
            return document.documentElement.scrollWidth > window.innerWidth;
          });
          if (hasOverflow) {
            console.error(`  ❌ FAIL: Horizontal scroll overflow detected on mobile viewport`);
            hasFailure = true;
          } else {
            console.log(`  ✓ Pass: No horizontal scroll overflow on mobile`);
          }
        }

        // 8. PESEL Interactive Runtime Checks (Constraint 8)
        if (pageInfo.name === 'pesel-validator' && vp.name === 'desktop') {
          // Assert H1 is correct statically before interaction
          const h1Text = await page.$eval('h1', el => el.textContent.trim());
          if (h1Text !== 'PESEL Validator & Explainer') {
            console.error(`  ❌ FAIL: Statically loaded H1 is "${h1Text}" (Expected "PESEL Validator & Explainer")`);
            hasFailure = true;
          } else {
            console.log('  ✓ Pass: Static H1 title is correctly "PESEL Validator & Explainer"');
          }

          // Enter valid PESEL and run validation
          await page.fill('input[name="pesel"]', '92082612336');
          await page.click('button[data-action="validate"]');
          await page.waitForTimeout(500); // allow plugin DOM manipulation to complete

          // Open the advanced panel before querying content inside it
          const advPanelDetails = await page.$('details[data-advanced-panel]');
          if (advPanelDetails) {
            await advPanelDetails.evaluate(el => el.open = true);
            await page.waitForTimeout(100);
          }

          // Locate Developer API Preview card
          const apiCard = await page.$('.pesel-api-card');
          if (!apiCard) {
            console.error('  ❌ FAIL: Developer API Preview (.pesel-api-card) not found after validation.');
            hasFailure = true;
          } else {
            console.log('  ✓ Pass: Developer API Preview visible in DOM.');
          }

          // Read visible language tabs, compare with exposed apiSnippets
          const visibleTabs = await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('.pesel-api-tab'));
            return btns.map(b => b.dataset.lang);
          });
          const sourceSnippets = await page.evaluate(() => {
            return Object.keys(window.ValidoWorkbench.plugins['validohub.pesel'].apiSnippets);
          });

          console.log(`  Visible tabs dataset langs: [${visibleTabs.join(', ')}]`);
          console.log(`  Exposed apiSnippets keys:   [${sourceSnippets.join(', ')}]`);

          const tabsMatch = visibleTabs.length === sourceSnippets.length &&
                            visibleTabs.every(t => sourceSnippets.includes(t));
          if (!tabsMatch) {
            console.error('  ❌ FAIL: Visible tabs do not match the apiSnippets keys source of truth.');
            hasFailure = true;
          } else {
            console.log('  ✓ Pass: Rendered visible tabs match languages in the snippet source.');
          }

          // Click every tab and assert non-empty code preview content
          for (const lang of visibleTabs) {
            const tabButton = await page.$(`.pesel-api-tab[data-lang="${lang}"]`);
            await tabButton.click();
            await page.waitForTimeout(50);
            const codeBlockText = await page.$eval('#pesel-api-code-block', el => el.textContent.trim());
            if (!codeBlockText || codeBlockText.includes('$INPUT$')) {
              console.error(`  ❌ FAIL: Code block is empty or not replaced for tab: ${lang}`);
              hasFailure = true;
            } else {
              console.log(`  ✓ Pass: Language tab [${lang}] displays non-empty code snippet.`);
            }
          }

          // Open advanced details panel, capture open/closed screenshots
          const advPanel = await page.$('details.advanced-panel');
          if (advPanel) {
            // closed screenshot
            await page.evaluate(el => el.removeAttribute('open'), advPanel);
            await page.screenshot({ path: resolve(baselinesDir, 'pesel_advanced_closed.png') });
            console.log('  ✓ Captured: tests/visual-baselines/pesel_advanced_closed.png');

            // open it
            await page.evaluate(el => el.setAttribute('open', ''), advPanel);
            await page.screenshot({ path: resolve(baselinesDir, 'pesel_advanced_open.png') });
            console.log('  ✓ Captured: tests/visual-baselines/pesel_advanced_open.png');
          }

          // Also capture open/closed documentation accordions
          const docAccordion = await page.$('details.doc-accordion');
          if (docAccordion) {
            await page.evaluate(el => el.removeAttribute('open'), docAccordion);
            await page.screenshot({ path: resolve(baselinesDir, 'pesel_doc_accordion_closed.png') });

            await page.evaluate(el => el.setAttribute('open', ''), docAccordion);
            await page.screenshot({ path: resolve(baselinesDir, 'pesel_doc_accordion_open.png') });
            console.log('  ✓ Captured closed/open doc accordion screenshots.');
          }
        }

        // Verify console and request failures
        if (consoleErrors.length > 0) {
          console.error(`  ❌ FAIL: Browser console has errors: ${consoleErrors.join(', ')}`);
          hasFailure = true;
        }
        if (failedRequests.length > 0) {
          console.error(`  ❌ FAIL: Failed requests found: ${failedRequests.join(', ')}`);
          hasFailure = true;
        }

        await context.close();
      }
    }
  } catch (err) {
    console.error('FATAL ERROR DURING PLAYWRIGHT SESSION:', err);
    hasFailure = true;
  } finally {
    await browser.close();
    server.close();
    console.log('\nLocal server terminated');
  }

  if (hasFailure) {
    console.error('\n❌ COMPREHENSIVE CHECKS FAILED!');
    process.exit(1);
  } else {
    console.log('\n🎉 ALL COMPREHENSIVE CHECKS PASSED SUCCESSFULLY!');
    process.exit(0);
  }
}

runVisualTests();
