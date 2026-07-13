import { chromium } from 'playwright';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import crypto from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');
const identifiers = ['pesel', 'nip', 'regon', 'cpf', 'cnpj', 'steuer-id'];

// Map correct metadata targets for breadcrumb assertions
const expectedMetadata = {
  'pesel': { country: 'Poland', label: 'PESEL', slug: 'poland' },
  'nip': { country: 'Poland', label: 'NIP', slug: 'poland' },
  'regon': { country: 'Poland', label: 'REGON', slug: 'poland' },
  'cpf': { country: 'Brazil', label: 'CPF', slug: 'brazil' },
  'cnpj': { country: 'Brazil', label: 'CNPJ', slug: 'brazil' },
  'steuer-id': { country: 'Germany', label: 'Steuer-IdNr', slug: 'germany' }
};

function getSha256(filePath) {
  const data = readFileSync(filePath);
  return crypto.createHash('sha256').update(data).digest('hex');
}

async function runTests() {
  console.log('=== STARTING VALIDO-ENGINE V2 AUTOMATED INTEGRATION TESTS ===');

  let browser;
  let hasFailed = false;

  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Catch console errors and page exceptions
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', err => {
      consoleErrors.push(err.message);
    });

    for (const id of identifiers) {
      console.log(`\n--------------------------------------------`);
      console.log(`Testing Route: /en/identifiers/${id}/`);
      console.log(`--------------------------------------------`);

      const filePath = resolve(siteRoot, 'en', 'identifiers', id, 'index.html');
      if (!existsSync(filePath)) {
        console.error(`❌ FAIL: Output file does not exist: ${filePath}`);
        hasFailed = true;
        continue;
      }

      const html = readFileSync(filePath, 'utf8');

      // 1. Structure assertions
      const doctypeCount = (html.match(/<!doctype html>/gi) || []).length;
      if (doctypeCount !== 1) {
        console.error(`❌ FAIL: Expected exactly one <!doctype html> but found ${doctypeCount}`);
        hasFailed = true;
      } else {
        console.log(`✓ OK: Exactly one <!doctype html>`);
      }

      const htmlTagCount = (html.match(/<html\b/gi) || []).length;
      const headTagCount = (html.match(/<head\b/gi) || []).length;
      const bodyTagCount = (html.match(/<body\b/gi) || []).length;
      if (htmlTagCount !== 1 || headTagCount !== 1 || bodyTagCount !== 1) {
        console.error(`❌ FAIL: Structure tags duplicate checks failed (html:${htmlTagCount}, head:${headTagCount}, body:${bodyTagCount})`);
        hasFailed = true;
      } else {
        console.log(`✓ OK: Clean HTML root structures`);
      }

      // 2. CSS / JavaScript embed checks
      if (html.includes('<style')) {
        console.error(`❌ FAIL: Page contains inline <style> blocks!`);
        hasFailed = true;
      } else {
        console.log(`✓ OK: Zero inline <style> tag blocks`);
      }

      if (html.includes('style="') || html.includes("style='")) {
        console.error(`❌ FAIL: Page contains forbidden inline style attributes!`);
        hasFailed = true;
      } else {
        console.log(`✓ OK: Zero inline style attributes`);
      }

      // Assert no inline executable script tags
      const scriptBlocks = html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi) || [];
      let hasInlineExecutableJs = false;
      for (const block of scriptBlocks) {
        // Skip JSON definitions
        if (block.includes('type="application/json"') || block.includes("type='application/json'")) {
          continue;
        }
        const innerContent = block.replace(/<script\b[^>]*>/i, '').replace(/<\/script>/i, '').trim();
        if (innerContent.length > 0) {
          console.error(`❌ FAIL: Page contains inline executable JavaScript:`, innerContent.substring(0, 100));
          hasInlineExecutableJs = true;
          hasFailed = true;
        }
      }
      if (!hasInlineExecutableJs) {
        console.log(`✓ OK: Zero inline executable script blocks`);
      }

      // 3. Class and DOM ID namespace checks
      const badPatterns = [/class="[^"]*\b(pesel|nip|regon|cpf|cnpj|steuer)-/i, /id="[^"]*\b(pesel|nip|regon|cpf|cnpj|steuer)-/i];
      let hasBadNamespace = false;
      for (const pattern of badPatterns) {
        if (pattern.test(html)) {
          const match = html.match(pattern);
          console.error(`❌ FAIL: Found forbidden legacy prefix in layout: "${match[0]}"`);
          hasBadNamespace = true;
          hasFailed = true;
        }
      }
      if (!hasBadNamespace) {
        console.log(`✓ OK: Zero legacy identifier prefix class/ID names`);
      }

      // 4. Duplicate DOM IDs check
      const idMatches = html.match(/id="([^"]+)"/g) || [];
      const idList = idMatches.map(m => m.match(/id="([^"]+)"/)[1]);
      const uniqueIds = new Set(idList);
      if (idList.length !== uniqueIds.size) {
        const duplicates = idList.filter((item, index) => idList.indexOf(item) !== index);
        console.error(`❌ FAIL: Page contains duplicate DOM IDs: ${[...new Set(duplicates)].join(', ')}`);
        hasFailed = true;
      } else {
        console.log(`✓ OK: Zero duplicate DOM IDs`);
      }

      // 5. Unresolved template placeholders
      if (/\{\{[A-Z_]+\}\}/.test(html)) {
        const placeholderMatch = html.match(/\{\{[A-Z_]+\}\}/);
        console.error(`❌ FAIL: Page contains unresolved placeholder: ${placeholderMatch[0]}`);
        hasFailed = true;
      } else {
        console.log(`✓ OK: All layout slots correctly populated`);
      }

      // 6. Check for stray markdown rendering backticks
      if (html.includes('<code></code>`')) {
        console.error(`❌ FAIL: Page contains stray markdown parsing artifacts (<code></code>\`)`);
        hasFailed = true;
      } else {
        console.log(`✓ OK: Zero stray markdown backticks`);
      }

      // 7. Verify local links and assets resolution
      const hrefMatches = html.match(/href="([^"]+)"/g) || [];
      const srcMatches = html.match(/src="([^"]+)"/g) || [];
      const links = [
        ...hrefMatches.map(m => m.match(/href="([^"]+)"/)[1]),
        ...srcMatches.map(m => m.match(/src="([^"]+)"/)[1])
      ];

      for (const link of links) {
        if (link.startsWith('http') || link.startsWith('mailto:')) continue;
        if (link === '#') {
          console.error(`❌ FAIL: Forbidden link href="#" found!`);
          hasFailed = true;
          continue;
        }

        // Clean link trailing slash/hashes
        const pathPart = link.split('#')[0];
        if (pathPart === '') continue;

        let checkPath;
        if (pathPart.startsWith('/')) {
          checkPath = resolve(siteRoot, pathPart.substring(1));
        } else {
          checkPath = resolve(dirname(filePath), pathPart);
        }

        // Handle index directories fallback
        if (existsSync(checkPath) && checkPath.endsWith('/')) {
          checkPath = resolve(checkPath, 'index.html');
        } else if (!existsSync(checkPath) && !checkPath.includes('.')) {
          checkPath = resolve(checkPath, 'index.html');
        }

        if (!existsSync(checkPath)) {
          console.error(`❌ FAIL: Broken local reference: "${link}" resolves to non-existent path: ${checkPath}`);
          hasFailed = true;
        }
      }
      console.log(`✓ OK: All local links and assets successfully resolved`);

      // 8. Visual Browser verification via Playwright
      consoleErrors.length = 0; // Reset error queue
      await page.goto(`http://localhost:8083/en/identifiers/${id}/`, { waitUntil: 'domcontentloaded' });

      if (consoleErrors.length > 0) {
        console.error(`❌ FAIL: Browser console errors detected:`, consoleErrors);
        hasFailed = true;
      } else {
        console.log(`✓ OK: Zero browser console script errors`);
      }

      // Verify breadcrumbs elements
      const targetMeta = expectedMetadata[id];
      const breadcrumbText = await page.locator('.vh-breadcrumbs').textContent();
      if (!breadcrumbText.includes(targetMeta.country) || !breadcrumbText.includes(targetMeta.label)) {
        console.error(`❌ FAIL: Breadcrumbs incorrect. Text: "${breadcrumbText}"`);
        hasFailed = true;
      } else {
        console.log(`✓ OK: Breadcrumbs resolved: Home / ${targetMeta.country} / ${targetMeta.label}`);
      }

      // Verify NIP governing authority text
      if (id === 'nip') {
        const bodyText = await page.locator('body').textContent();
        if (bodyText.includes('ZUS') && bodyText.includes('governed by ZUS')) {
          console.error(`❌ FAIL: NIP governed authority remains mapped to ZUS!`);
          hasFailed = true;
        } else {
          console.log(`✓ OK: NIP correctly mapped to Ministry of Finance`);
        }
      }

      // Verify Code Tab triggers switching
      const activeTabBefore = await page.locator('.vh-tab.active').textContent();
      const initialCodeText = await page.locator('#vh-code-block-content').textContent();
      
      const pythonTab = page.locator('.vh-tab[data-lang="python"]');
      await pythonTab.click();
      
      const activeTabAfter = await page.locator('.vh-tab.active').textContent();
      const pythonCodeText = await page.locator('#vh-code-block-content').textContent();

      if (activeTabAfter.trim() !== 'Python' || initialCodeText === pythonCodeText) {
        console.error(`❌ FAIL: Code snippets tab language switching failed!`);
        hasFailed = true;
      } else {
        console.log(`✓ OK: Snippet tabs switched successfully from ${activeTabBefore.trim()} to Python`);
      }

      // Verify FAQ Expand/Collapse scopes
      const detailsCount = await page.locator('.vh-accordion').count();
      if (detailsCount > 0) {
        const firstDetails = page.locator('.vh-accordion').first();
        
        // Expand All
        await page.locator('[data-faq-action="expand"]').click();
        const firstDetailsOpen = await firstDetails.evaluate(el => el.open);
        
        // Collapse All
        await page.locator('[data-faq-action="collapse"]').click();
        const firstDetailsClosed = await firstDetails.evaluate(el => !el.open);

        if (!firstDetailsOpen || !firstDetailsClosed) {
          console.error(`❌ FAIL: Scoped FAQ expand/collapse controls failed!`);
          hasFailed = true;
        } else {
          console.log(`✓ OK: Scoped FAQ controls verified successfully`);
        }
      }
    }

    // 9. Verify Determinism
    console.log(`\n--------------------------------------------`);
    console.log(`Verifying Build Determinism`);
    console.log(`--------------------------------------------`);

    const hashesBefore = identifiers.map(id => ({
      id,
      hash: getSha256(resolve(siteRoot, 'en', 'identifiers', id, 'index.html'))
    }));

    console.log('Recompiling pipeline...');
    execSync('node scripts/build-identifiers.mjs', { cwd: projectRoot });

    for (const item of hashesBefore) {
      const hashAfter = getSha256(resolve(siteRoot, 'en', 'identifiers', item.id, 'index.html'));
      if (item.hash !== hashAfter) {
        console.error(`❌ FAIL: Output build non-deterministic for: ${item.id}`);
        hasFailed = true;
      } else {
        console.log(`✓ OK: Deterministic byte-for-byte check passed: ${item.id}`);
      }
    }

  } catch (err) {
    console.error('Fatal testing error:', err);
    hasFailed = true;
  } finally {
    if (browser) await browser.close();
  }

  console.log(`\n============================================`);
  if (hasFailed) {
    console.error('❌ SOME INTEGRATION TESTS FAILED!');
    process.exit(1);
  } else {
    console.log('🎉 ALL VALIDO-ENGINE V2 INTEGRATION TESTS PASSED!');
    process.exit(0);
  }
}

runTests();
