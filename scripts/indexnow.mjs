#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');

const defaults = {
  command: 'prepare',
  siteDir: resolve(projectRoot, 'generated', 'validohub'),
  keyFile: resolve(projectRoot, 'config', 'indexnow-key.txt'),
  host: 'validohub.com',
  endpoint: 'https://api.indexnow.org/indexnow',
  dryRun: false,
  limit: 0,
  batchSize: 10_000,
  timeoutMs: 30_000,
};

function usage() {
  return [
    'Usage:',
    '  node scripts/indexnow.mjs prepare [--site-dir generated/validohub]',
    '  node scripts/indexnow.mjs submit [--dry-run] [--limit <n>] [--endpoint <url>]',
    '',
    'Commands:',
    '  prepare  Copy config/indexnow-key.txt to generated site root as <key>.txt.',
    '  submit   Read generated sitemap URLs and submit indexable URLs to IndexNow.',
    '',
    'Options:',
    '  --site-dir <path>     Default: generated/validohub',
    '  --key-file <path>     Default: config/indexnow-key.txt',
    '  --host <host>         Default: validohub.com',
    '  --endpoint <url>      Default: https://api.indexnow.org/indexnow',
    '  --limit <n>           Submit only the first n sitemap URLs.',
    '  --batch-size <n>      Default/max: 10000',
    '  --timeout-ms <n>      Default: 30000',
    '  --dry-run             Print planned batches without network submission.',
  ].join('\n');
}

function parseArgs(argv) {
  const args = { ...defaults };
  if (argv[0] && !argv[0].startsWith('--')) {
    args.command = argv[0];
    argv = argv.slice(1);
  }

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const [key, inlineValue] = arg.split('=');
    const nextValue = inlineValue ?? argv[index + 1];
    if (arg === '--dry-run') {
      args.dryRun = true;
    } else if (key === '--site-dir' && nextValue) {
      args.siteDir = resolve(projectRoot, nextValue);
      if (inlineValue === undefined) index += 1;
    } else if (key === '--key-file' && nextValue) {
      args.keyFile = resolve(projectRoot, nextValue);
      if (inlineValue === undefined) index += 1;
    } else if (key === '--host' && nextValue) {
      args.host = new URL(`https://${nextValue.replace(/^https?:\/\//, '').replace(/\/+$/, '')}`).host;
      if (inlineValue === undefined) index += 1;
    } else if (key === '--endpoint' && nextValue) {
      args.endpoint = nextValue;
      if (inlineValue === undefined) index += 1;
    } else if (key === '--limit' && nextValue) {
      args.limit = Number(nextValue);
      if (inlineValue === undefined) index += 1;
    } else if (key === '--batch-size' && nextValue) {
      args.batchSize = Number(nextValue);
      if (inlineValue === undefined) index += 1;
    } else if (key === '--timeout-ms' && nextValue) {
      args.timeoutMs = Number(nextValue);
      if (inlineValue === undefined) index += 1;
    } else {
      throw new Error(`Unknown option: ${arg}\n\n${usage()}`);
    }
  }

  args.batchSize = Math.max(1, Math.min(10_000, Number.isFinite(args.batchSize) ? Math.floor(args.batchSize) : 10_000));
  args.limit = Number.isFinite(args.limit) && args.limit > 0 ? Math.floor(args.limit) : 0;
  args.timeoutMs = Number.isFinite(args.timeoutMs) && args.timeoutMs > 0 ? Math.floor(args.timeoutMs) : 30_000;
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

async function readIndexNowKey(keyFile) {
  const key = (await fs.readFile(keyFile, 'utf8')).trim();
  if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) {
    throw new Error(`Invalid IndexNow key in ${keyFile}. Use 8-128 letters, digits, or dashes.`);
  }
  return key;
}

export async function materializeIndexNowKey(options = {}) {
  const args = { ...defaults, ...options };
  const key = await readIndexNowKey(args.keyFile);
  await fs.mkdir(args.siteDir, { recursive: true });
  const outputPath = resolve(args.siteDir, `${key}.txt`);
  await fs.writeFile(outputPath, key, 'utf8');
  console.log(`✓ Wrote IndexNow key file: ${outputPath}`);
  return { key, outputPath };
}

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map(match => match[1].trim());
}

async function readSitemapUrls(siteDir, sitemapName = 'sitemap.xml', seen = new Set()) {
  const sitemapPath = resolve(siteDir, sitemapName);
  if (seen.has(sitemapPath)) return [];
  seen.add(sitemapPath);

  const xml = await fs.readFile(sitemapPath, 'utf8');
  const locs = extractLocs(xml);
  const childSitemaps = locs.filter(loc => /\/sitemap-[^/]+\.xml$/i.test(loc));
  if (!childSitemaps.length) return locs.filter(loc => !/\/sitemap[^/]*\.xml$/i.test(loc));

  const urls = [];
  for (const loc of childSitemaps) {
    const childName = new URL(loc).pathname.replace(/^\/+/, '');
    if (await pathExists(resolve(siteDir, childName))) {
      urls.push(...await readSitemapUrls(siteDir, childName, seen));
    }
  }
  return urls;
}

function filterHostUrls(urls, host) {
  const seen = new Set();
  const accepted = [];
  for (const raw of urls) {
    let parsed;
    try {
      parsed = new URL(raw);
    } catch {
      continue;
    }
    if (parsed.protocol !== 'https:' || parsed.host !== host) continue;
    const normalized = parsed.href;
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    accepted.push(normalized);
  }
  return accepted;
}

async function submitBatch(args, key, urlList, batchIndex, batchTotal) {
  const payload = {
    host: args.host,
    key,
    keyLocation: `https://${args.host}/${key}.txt`,
    urlList,
  };
  if (args.dryRun) {
    console.log(`[indexnow] dry-run batch ${batchIndex}/${batchTotal}: ${urlList.length} URL(s)`);
    return { status: 0, accepted: true };
  }

  const response = await fetch(args.endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(args.timeoutMs),
  });
  const text = await response.text();
  const accepted = response.status === 200 || response.status === 202;
  console.log(`[indexnow] batch ${batchIndex}/${batchTotal}: HTTP ${response.status}${text ? ` ${text.slice(0, 200)}` : ''}`);
  if (!accepted) {
    throw new Error(`IndexNow rejected batch ${batchIndex}/${batchTotal}: HTTP ${response.status}${text ? ` ${text}` : ''}`);
  }
  return { status: response.status, accepted };
}

export async function submitIndexNow(options = {}) {
  const args = { ...defaults, ...options };
  const { key } = await materializeIndexNowKey(args);
  const sitemapUrls = await readSitemapUrls(args.siteDir);
  let urls = filterHostUrls(sitemapUrls, args.host);
  if (args.limit > 0) urls = urls.slice(0, args.limit);
  if (!urls.length) throw new Error(`No indexable URLs found for host ${args.host} in ${args.siteDir}/sitemap.xml`);

  const batches = [];
  for (let index = 0; index < urls.length; index += args.batchSize) {
    batches.push(urls.slice(index, index + args.batchSize));
  }

  console.log(`[indexnow] host=${args.host} urls=${urls.length} batches=${batches.length} endpoint=${args.endpoint}`);
  for (let index = 0; index < batches.length; index += 1) {
    await submitBatch(args, key, batches[index], index + 1, batches.length);
  }
  console.log(`✓ IndexNow submission complete: ${urls.length} URL(s)`);
  return { key, urlsSubmitted: urls.length, batches: batches.length };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.command === 'prepare') {
    await materializeIndexNowKey(args);
  } else if (args.command === 'submit') {
    await submitIndexNow(args);
  } else {
    throw new Error(usage());
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message || error);
    process.exit(1);
  });
}
