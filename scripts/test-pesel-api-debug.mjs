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

function startServer(port, dir) {
  const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript'
  };
  const server = http.createServer(async (req, res) => {
    let urlPath = req.url.split('?')[0];
    if (urlPath.endsWith('/')) urlPath += 'index.html';
    const filePath = resolve(dir, urlPath.replace(/^\//, ''));
    try {
      const ext = extname(filePath);
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      createReadStream(filePath).pipe(res);
    } catch {
      res.writeHead(404);
      res.end('Not Found');
    }
  });
  return new Promise(res => server.listen(port, () => res(server)));
}

async function debug() {
  const port = 8083;
  const server = await startServer(port, siteRoot);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

  console.log('Navigating to PESEL validator page...');
  await page.goto(`http://localhost:${port}/en/poland/pesel-validator/`);
  await page.waitForLoadState('networkidle');

  console.log('Selecting Valid Male preset...');
  await page.selectOption('#pesel-presets', 'valid-male');
  await page.click('button[data-action="validate"]');

  console.log('Inspecting advanced analysis...');
  await page.waitForTimeout(500);

  const advancedHtml = await page.evaluate(() => {
    const el = document.querySelector('[data-tool-advanced]');
    return el ? el.innerHTML : 'Not Found';
  });
  console.log('ADVANCED CONTENT HTML:\n', advancedHtml);

  await browser.close();
  server.close();
}

debug();
