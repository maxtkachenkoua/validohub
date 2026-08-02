#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');

const defaults = {
  siteDir: resolve(projectRoot, 'generated', 'validohub'),
  measurementIdFile: resolve(projectRoot, 'config', 'google-analytics-measurement-id.txt'),
  measurementId: process.env.VALIDOHUB_GA_MEASUREMENT_ID || '',
  dryRun: false,
  limit: 0,
  progressEvery: 5000,
};

const startMarker = '<!-- validohub-google-analytics:start -->';
const endMarker = '<!-- validohub-google-analytics:end -->';
const existingBlockPattern = new RegExp(`\\n?\\s*${escapeRegExp(startMarker)}[\\s\\S]*?${escapeRegExp(endMarker)}\\s*`, 'g');

function usage() {
  return [
    'Usage:',
    '  node scripts/apply-google-analytics.mjs [--dry-run] [--site-dir generated/validohub]',
    '',
    'Options:',
    '  --measurement-id <id>       GA4 Measurement ID, e.g. G-XXXXXXXXXX.',
    '  --measurement-id-file <path> Default: config/google-analytics-measurement-id.txt.',
    '  --site-dir <path>           Default: generated/validohub.',
    '  --limit <n>                 Process only first n HTML files.',
    '  --progress-every <n>        Default: 5000.',
    '  --dry-run                   Count changes without writing files.',
  ].join('\n');
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const [key, inlineValue] = arg.split('=');
    const nextValue = inlineValue ?? argv[index + 1];
    if (arg === '--dry-run') {
      args.dryRun = true;
    } else if (key === '--site-dir' && nextValue) {
      args.siteDir = resolve(projectRoot, nextValue);
      if (inlineValue === undefined) index += 1;
    } else if (key === '--measurement-id' && nextValue) {
      args.measurementId = nextValue;
      if (inlineValue === undefined) index += 1;
    } else if (key === '--measurement-id-file' && nextValue) {
      args.measurementIdFile = resolve(projectRoot, nextValue);
      if (inlineValue === undefined) index += 1;
    } else if (key === '--limit' && nextValue) {
      args.limit = Number(nextValue);
      if (inlineValue === undefined) index += 1;
    } else if (key === '--progress-every' && nextValue) {
      args.progressEvery = Number(nextValue);
      if (inlineValue === undefined) index += 1;
    } else {
      throw new Error(`Unknown option: ${arg}\n\n${usage()}`);
    }
  }
  args.limit = Number.isFinite(args.limit) && args.limit > 0 ? Math.floor(args.limit) : 0;
  args.progressEvery = Number.isFinite(args.progressEvery) && args.progressEvery > 0 ? Math.floor(args.progressEvery) : 5000;
  return args;
}

async function pathExists(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

async function readMeasurementId(args) {
  const rawId = args.measurementId || (await pathExists(args.measurementIdFile)
    ? await fs.readFile(args.measurementIdFile, 'utf8')
    : '');
  const measurementId = String(rawId).trim();
  if (!measurementId) {
    console.log('[analytics] No GA4 Measurement ID configured; skipping.');
    return '';
  }
  if (!/^G-[A-Z0-9]{6,32}$/.test(measurementId)) {
    throw new Error(`Invalid GA4 Measurement ID: ${measurementId}`);
  }
  return measurementId;
}

function analyticsBlock(measurementId) {
  return [
    startMarker,
    `<script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>`,
    '<script>',
    '  window.dataLayer = window.dataLayer || [];',
    '  function gtag(){dataLayer.push(arguments);}',
    "  gtag('js', new Date());",
    `  gtag('config', '${measurementId}');`,
    '</script>',
    endMarker,
  ].join('\n');
}

async function collectHtmlFiles(rootDir) {
  const files = [];
  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === '.build') continue;
      const fullPath = resolve(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        files.push(fullPath);
      }
    }
  }
  await walk(rootDir);
  files.sort();
  return files;
}

function injectAnalytics(html, measurementId) {
  const stripped = html.replace(existingBlockPattern, '\n');
  const headMatch = stripped.match(/<\/head\s*>/i);
  if (!headMatch || typeof headMatch.index !== 'number') {
    return { html, changed: false, missingHead: true };
  }
  const block = analyticsBlock(measurementId);
  const updated = `${stripped.slice(0, headMatch.index).trimEnd()}\n${block}\n${stripped.slice(headMatch.index)}`;
  return { html: updated, changed: updated !== html, missingHead: false };
}

async function applyToFile(filePath, measurementId, dryRun) {
  const html = await fs.readFile(filePath, 'utf8');
  const result = injectAnalytics(html, measurementId);
  if (result.changed && !dryRun) {
    await fs.writeFile(filePath, result.html, 'utf8');
  }
  return result;
}

export async function applyGoogleAnalyticsToGeneratedSite(options = {}) {
  const args = { ...defaults, ...options };
  const measurementId = await readMeasurementId(args);
  if (!measurementId) return { skipped: true, measurementId: '' };

  const allFiles = await collectHtmlFiles(args.siteDir);
  const files = args.limit > 0 ? allFiles.slice(0, args.limit) : allFiles;
  const stats = {
    measurementId,
    siteDir: args.siteDir,
    files: files.length,
    changed: 0,
    unchanged: 0,
    missingHead: 0,
    dryRun: args.dryRun,
  };

  console.log(`[analytics] Applying GA4 ${measurementId} to ${files.length} HTML file(s)${args.dryRun ? ' (dry run)' : ''}`);
  for (let index = 0; index < files.length; index += 1) {
    const result = await applyToFile(files[index], measurementId, args.dryRun);
    if (result.missingHead) stats.missingHead += 1;
    else if (result.changed) stats.changed += 1;
    else stats.unchanged += 1;
    const processed = index + 1;
    if (processed % args.progressEvery === 0 || processed === files.length) {
      console.log(`[analytics] processed=${processed}/${files.length} changed=${stats.changed} unchanged=${stats.unchanged} missingHead=${stats.missingHead}`);
    }
  }

  console.log(`✓ GA4 tag ${args.dryRun ? 'planned' : 'applied'}: ${stats.changed} changed, ${stats.unchanged} unchanged, ${stats.missingHead} missing </head>`);
  return stats;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  await applyGoogleAnalyticsToGeneratedSite(args);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message || error);
    process.exit(1);
  });
}
