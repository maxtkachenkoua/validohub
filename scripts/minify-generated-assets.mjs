#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import { dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { transform } from 'esbuild';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');

function parseArgs(argv) {
  const args = {
    siteDir: resolve(projectRoot, 'generated', 'validohub'),
    concurrency: Math.max(1, Number(process.env.VALIDOHUB_MINIFY_CONCURRENCY || 24)),
    progressEvery: Math.max(10, Number(process.env.VALIDOHUB_MINIFY_PROGRESS_ITEMS || 50)),
    dryRun: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const [key, inlineValue] = arg.split('=');
    const nextValue = inlineValue ?? argv[index + 1];
    if (arg === '--dry-run') {
      args.dryRun = true;
    } else if (key === '--site-dir' && nextValue) {
      args.siteDir = resolve(projectRoot, nextValue);
      if (inlineValue === undefined) index += 1;
    } else if (key === '--concurrency' && nextValue) {
      const parsed = Number(nextValue);
      if (Number.isFinite(parsed) && parsed > 0) args.concurrency = Math.floor(parsed);
      if (inlineValue === undefined) index += 1;
    }
  }

  return args;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB'];
  let value = bytes / 1024;
  for (const unit of units) {
    if (value < 1024) return `${value.toFixed(value >= 10 ? 1 : 2)} ${unit}`;
    value /= 1024;
  }
  return `${value.toFixed(1)} TB`;
}

function formatDuration(ms) {
  const seconds = Math.max(0, Math.round(ms / 1000));
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

async function collectAssetFiles(root) {
  const results = [];

  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const path = resolve(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(path);
        continue;
      }
      if (!entry.isFile()) continue;
      if (entry.name.endsWith('.min.js') || entry.name.endsWith('.min.css')) continue;
      const extension = extname(entry.name);
      if (extension === '.js' || extension === '.css') results.push(path);
    }
  }

  await walk(root);
  return results;
}

async function minifyFile(filePath, dryRun = false) {
  const extension = extname(filePath);
  const loader = extension === '.css' ? 'css' : 'js';
  const source = await fs.readFile(filePath, 'utf8');
  const originalBytes = Buffer.byteLength(source);
  let next = source;
  for (let pass = 0; pass < 3; pass += 1) {
    const result = await transform(next, {
      loader,
      minify: true,
      target: loader === 'css' ? 'chrome100' : 'es2020',
      legalComments: 'none',
    });
    if (result.code === next) break;
    next = result.code;
  }
  const minifiedBytes = Buffer.byteLength(next);

  if (!dryRun && next !== source) {
    await fs.writeFile(filePath, next, 'utf8');
  }

  return {
    changed: next !== source,
    originalBytes,
    minifiedBytes,
    savedBytes: Math.max(0, originalBytes - minifiedBytes),
  };
}

async function runWithConcurrency(items, worker, concurrency, onBatch) {
  let index = 0;
  let completed = 0;

  async function runNext() {
    while (index < items.length) {
      const currentIndex = index;
      index += 1;
      await worker(items[currentIndex], currentIndex);
      completed += 1;
      if (onBatch) onBatch(completed);
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, runNext);
  await Promise.all(workers);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const startedAt = Date.now();
  const files = await collectAssetFiles(args.siteDir);

  console.log(`Minifying generated CSS/JS assets`);
  console.log(`siteDir: ${args.siteDir}`);
  console.log(`files: ${files.length}`);
  console.log(`concurrency: ${args.concurrency}`);
  if (args.dryRun) console.log('Dry run only; files will not be changed.');

  const totals = {
    changed: 0,
    originalBytes: 0,
    minifiedBytes: 0,
    savedBytes: 0,
  };

  await runWithConcurrency(files, async (filePath) => {
    const result = await minifyFile(filePath, args.dryRun);
    totals.originalBytes += result.originalBytes;
    totals.minifiedBytes += result.minifiedBytes;
    totals.savedBytes += result.savedBytes;
    if (result.changed) totals.changed += 1;
  }, args.concurrency, (completed) => {
    if (completed === files.length || completed % args.progressEvery === 0) {
      console.log(`[minify] ${completed}/${files.length} files, ${totals.changed} changed, saved ${formatBytes(totals.savedBytes)}.`);
    }
  });

  console.log('✓ Generated CSS/JS minified');
  console.log(JSON.stringify({
    files: files.length,
    changed: totals.changed,
    originalBytes: totals.originalBytes,
    minifiedBytes: totals.minifiedBytes,
    savedBytes: totals.savedBytes,
    savedPercent: totals.originalBytes > 0 ? Number(((totals.savedBytes / totals.originalBytes) * 100).toFixed(2)) : 0,
    elapsedSeconds: Math.round((Date.now() - startedAt) / 1000),
    elapsed: formatDuration(Date.now() - startedAt),
  }, null, 2));
}

main().catch((error) => {
  console.error(error.stack || error.message || error);
  process.exit(1);
});
