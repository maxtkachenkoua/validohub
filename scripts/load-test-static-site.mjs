#!/usr/bin/env node

import { createHash } from 'node:crypto';

const DEFAULT_PATHS = [
  '/',
  '/en/',
  '/en/tools/',
  '/en/countries/',
  '/en/brazil/',
  '/en/brazil/brazil-cpf-validator/',
  '/en/brazil/brazil-cnpj-validator/',
  '/en/mexico/mexico-curp-validator/',
  '/en/spain/spain-id-validator/',
  '/en/tools/json-schema-workbench/',
  '/en/tools/jwt-risk-scanner/',
  '/en/guides/',
];

function parseArgs(argv) {
  const args = {
    baseUrl: process.env.VALIDOHUB_LOAD_BASE_URL || 'http://137.74.173.107',
    durationSeconds: Number(process.env.VALIDOHUB_LOAD_DURATION_SECONDS || 60),
    rate: Number(process.env.VALIDOHUB_LOAD_RATE || 100),
    maxInflight: Number(process.env.VALIDOHUB_LOAD_MAX_INFLIGHT || 500),
    timeoutMs: Number(process.env.VALIDOHUB_LOAD_TIMEOUT_MS || 10_000),
    paths: DEFAULT_PATHS,
    noCache: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const [key, inlineValue] = arg.split('=');
    const nextValue = inlineValue ?? argv[index + 1];
    if (arg === '--no-cache') {
      args.noCache = true;
    } else if (key === '--base-url' && nextValue) {
      args.baseUrl = nextValue.replace(/\/+$/, '');
      if (inlineValue === undefined) index += 1;
    } else if (key === '--duration-seconds' && nextValue) {
      args.durationSeconds = Number(nextValue);
      if (inlineValue === undefined) index += 1;
    } else if (key === '--rate' && nextValue) {
      args.rate = Number(nextValue);
      if (inlineValue === undefined) index += 1;
    } else if (key === '--max-inflight' && nextValue) {
      args.maxInflight = Number(nextValue);
      if (inlineValue === undefined) index += 1;
    } else if (key === '--timeout-ms' && nextValue) {
      args.timeoutMs = Number(nextValue);
      if (inlineValue === undefined) index += 1;
    } else if (key === '--paths' && nextValue) {
      args.paths = nextValue.split(',').map(path => path.trim()).filter(Boolean);
      if (inlineValue === undefined) index += 1;
    }
  }

  args.durationSeconds = clampInteger(args.durationSeconds, 1, 3600, 60);
  args.rate = clampInteger(args.rate, 1, 5000, 100);
  args.maxInflight = clampInteger(args.maxInflight, 1, 20_000, Math.max(500, args.rate * 5));
  args.timeoutMs = clampInteger(args.timeoutMs, 500, 120_000, 10_000);
  if (!args.paths.length) args.paths = DEFAULT_PATHS;

  return args;
}

function clampInteger(value, min, max, fallback) {
  if (!Number.isFinite(value)) return fallback;
  return Math.max(min, Math.min(max, Math.floor(value)));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function percentile(sortedValues, percentileValue) {
  if (!sortedValues.length) return 0;
  const index = Math.min(sortedValues.length - 1, Math.ceil((percentileValue / 100) * sortedValues.length) - 1);
  return sortedValues[index];
}

function pickPath(paths, counter) {
  const hash = createHash('sha1').update(String(counter)).digest();
  return paths[hash[0] % paths.length];
}

function buildUrl(args, counter) {
  const path = pickPath(args.paths, counter);
  const url = new URL(path, `${args.baseUrl}/`);
  if (args.noCache) url.searchParams.set('_lt', `${Date.now()}-${counter}`);
  return url;
}

async function requestOnce(args, counter, stats) {
  const url = buildUrl(args, counter);
  const startedAt = process.hrtime.bigint();
  stats.started += 1;
  stats.inflight += 1;

  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Accept-Encoding': 'gzip',
        'User-Agent': 'ValidoHub-load-test/1.0',
      },
      signal: AbortSignal.timeout(args.timeoutMs),
    });
    await response.arrayBuffer();
    const elapsedMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
    stats.latencies.push(elapsedMs);
    stats.completed += 1;
    stats.statuses.set(response.status, (stats.statuses.get(response.status) || 0) + 1);
    if (!response.ok) stats.failed += 1;
  } catch (error) {
    const elapsedMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
    stats.latencies.push(elapsedMs);
    stats.completed += 1;
    stats.failed += 1;
    const name = error?.name || 'Error';
    stats.errors.set(name, (stats.errors.get(name) || 0) + 1);
  } finally {
    stats.inflight -= 1;
  }
}

function summarize(args, stats, startedAt, endedAt) {
  const sorted = [...stats.latencies].sort((a, b) => a - b);
  const elapsedSeconds = (endedAt - startedAt) / 1000;
  const ok = stats.completed - stats.failed;
  return {
    baseUrl: args.baseUrl,
    durationSeconds: Number(elapsedSeconds.toFixed(2)),
    configuredRate: args.rate,
    attempted: stats.started,
    completed: stats.completed,
    ok,
    failed: stats.failed,
    requestsPerSecond: Number((stats.completed / elapsedSeconds).toFixed(2)),
    latencyMs: {
      min: Number((sorted[0] || 0).toFixed(1)),
      p50: Number(percentile(sorted, 50).toFixed(1)),
      p95: Number(percentile(sorted, 95).toFixed(1)),
      p99: Number(percentile(sorted, 99).toFixed(1)),
      max: Number((sorted[sorted.length - 1] || 0).toFixed(1)),
    },
    statuses: Object.fromEntries([...stats.statuses.entries()].sort((a, b) => a[0] - b[0])),
    errors: Object.fromEntries([...stats.errors.entries()].sort((a, b) => a[0].localeCompare(b[0]))),
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const stats = {
    started: 0,
    completed: 0,
    failed: 0,
    inflight: 0,
    latencies: [],
    statuses: new Map(),
    errors: new Map(),
  };
  const startedAt = Date.now();
  let counter = 0;

  console.log('ValidoHub static load test');
  console.log(JSON.stringify({
    baseUrl: args.baseUrl,
    durationSeconds: args.durationSeconds,
    rate: args.rate,
    maxInflight: args.maxInflight,
    timeoutMs: args.timeoutMs,
    paths: args.paths,
    noCache: args.noCache,
  }, null, 2));

  for (let second = 1; second <= args.durationSeconds; second += 1) {
    const tickStart = Date.now();
    let launched = 0;
    for (let i = 0; i < args.rate; i += 1) {
      if (stats.inflight >= args.maxInflight) break;
      counter += 1;
      launched += 1;
      requestOnce(args, counter, stats);
    }
    const sorted = [...stats.latencies].sort((a, b) => a - b);
    console.log(`[load] ${second}/${args.durationSeconds}s launched=${launched} completed=${stats.completed} failed=${stats.failed} inflight=${stats.inflight} p95=${percentile(sorted, 95).toFixed(1)}ms`);
    await sleep(Math.max(0, 1000 - (Date.now() - tickStart)));
  }

  while (stats.inflight > 0) {
    console.log(`[load] draining inflight=${stats.inflight} completed=${stats.completed} failed=${stats.failed}`);
    await sleep(1000);
  }

  const summary = summarize(args, stats, startedAt, Date.now());
  console.log('✓ Load test complete');
  console.log(JSON.stringify(summary, null, 2));
  if (summary.failed > 0) process.exitCode = 2;
}

main().catch((error) => {
  console.error(error.stack || error.message || error);
  process.exit(1);
});
