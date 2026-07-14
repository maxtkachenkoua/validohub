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
    '.js': 'text/javascript',
    '.svg': 'image/svg+xml'
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

  const targets = [
    '/en/poland/pesel-validator/',
    '/en/identifiers/pesel/'
  ];

  for (const path of targets) {
    console.log(`\n=== DEBUGGING OVERFLOW FOR: ${path} ===`);
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto(`http://localhost:${port}${path}`);
    await page.waitForLoadState('networkidle');

    const overflows = await page.evaluate(() => {
      const results = [];
      const winWidth = window.innerWidth;
      
      document.querySelectorAll('*').forEach(el => {
        const rect = el.getBoundingClientRect();
        // Check if element is wider than window, or right edge exceeds window
        const isWiderThanWindow = rect.width > winWidth;
        const rightEdgeExceeds = rect.right > winWidth;
        const hasScroll = el.scrollWidth > el.clientWidth && el.scrollWidth > winWidth;
        
        if (isWiderThanWindow || rightEdgeExceeds) {
          // Filter out html, body, main, section wrappers that just stretch to match the overflowing child
          const classes = el.className || '';
          if (el.tagName !== 'HTML' && el.tagName !== 'BODY' && el.tagName !== 'MAIN' && el.tagName !== 'SECTION' && !classes.includes('vh-page-shell') && !classes.includes('site-main') && !classes.includes('vh-container') && !classes.includes('page-stack')) {
            results.push({
              tag: el.tagName,
              id: el.id,
              classes: el.className,
              width: rect.width,
              right: rect.right,
              scrollWidth: el.scrollWidth,
              clientWidth: el.clientWidth
            });
          }
        }
      });
      return results;
    });

    console.log(`Found ${overflows.length} overflowing elements:`);
    overflows.forEach(o => {
      console.log(`  - <${o.tag} id="${o.id}" class="${o.classes}"> width: ${o.width}px, right: ${o.right}px, scroll: ${o.scrollWidth}px`);
    });
    
    await context.close();
  }

  await browser.close();
  server.close();
}

debug();
