#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { access, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const statePath = resolve(projectRoot, 'generated', 'validohub', '.build', 'release-incremental.json');
const CORE_PRODUCTION_LOCALES = ['en', 'es', 'pt-BR', 'de', 'fr', 'pl', 'uk'];
const DEFAULT_STEP_TIMEOUT_MINUTES = 90;
const DEFAULT_PROGRESS_SECONDS = 60;
const DEFAULT_MAX_SILENT_SECONDS = 900;
const hashCache = new Map();

function usage() {
  return [
    'Usage:',
    '  node scripts/build-release-incremental.mjs --locales en --scope changed',
    '  node scripts/build-release-incremental.mjs --locales en --scope portal,tools,identifiers',
    '  node scripts/build-release-incremental.mjs --locales en --countries brazil,poland',
    '  node scripts/build-release-incremental.mjs --locales en --all-countries --limit 10',
    '  node scripts/build-release-incremental.mjs --plan --locales en --all-countries --limit 10',
    '  node scripts/build-release-incremental.mjs --resume-from country:spain --all-countries --limit 10',
    '  node scripts/build-release-incremental.mjs --status',
    '',
    'Resumable release-prep build. It runs the fast static builders in chunks and records completed',
    'steps under generated/validohub/.build/release-incremental.json. It does not run the Java publisher.',
    '',
    'Safety flags:',
    '  --plan / --dry-run              Print the pending work without running it.',
    '  --resume-from <step-name|id>    Ignore earlier planned steps and resume at this step.',
    '  --limit <n> --offset <n>        Run a small deterministic window.',
    '  --step-timeout-minutes <n>      Stop one stuck step after this many minutes; 0 disables.',
    '  --max-silent-seconds <n>        Stop one stuck step after this many seconds with no output; 0 disables.',
    '  --progress-seconds <n>          Print a heartbeat while a step is running; 0 disables.',
    '  --no-resume                    Re-run matching completed fingerprints intentionally.'
  ].join('\n');
}

function parseList(value) {
  return String(value || '').split(',').map(item => item.trim()).filter(Boolean);
}

function parseNonNegativeInteger(value, fallback = 0) {
  const parsed = Number.parseInt(String(value || ''), 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function parseArgs(argv) {
  const args = {
    locales: ['en'],
    scope: [],
    countries: [],
    allCountries: false,
    limit: 0,
    offset: 0,
    dryRun: false,
    status: false,
    reset: false,
    help: false,
    noResume: false,
    resumeFrom: '',
    stepTimeoutMinutes: DEFAULT_STEP_TIMEOUT_MINUTES,
    progressSeconds: DEFAULT_PROGRESS_SECONDS,
    maxSilentSeconds: DEFAULT_MAX_SILENT_SECONDS
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--help' || value === '-h') args.help = true;
    else if (value === '--status') args.status = true;
    else if (value === '--reset') args.reset = true;
    else if (value === '--dry-run' || value === '--plan') args.dryRun = true;
    else if (value === '--skip-existing') args.noResume = false;
    else if (value === '--no-resume') args.noResume = true;
    else if (value === '--all-countries') args.allCountries = true;
    else if (value === '--locales') args.locales = parseList(argv[++index] || 'en');
    else if (value.startsWith('--locales=')) args.locales = parseList(value.slice('--locales='.length));
    else if (value === '--scope') args.scope = parseList(argv[++index] || '');
    else if (value.startsWith('--scope=')) args.scope = parseList(value.slice('--scope='.length));
    else if (value === '--countries') args.countries = parseList(argv[++index] || '');
    else if (value.startsWith('--countries=')) args.countries = parseList(value.slice('--countries='.length));
    else if (value === '--limit') args.limit = parseNonNegativeInteger(argv[++index], 0);
    else if (value.startsWith('--limit=')) args.limit = parseNonNegativeInteger(value.slice('--limit='.length), 0);
    else if (value === '--offset') args.offset = parseNonNegativeInteger(argv[++index], 0);
    else if (value.startsWith('--offset=')) args.offset = parseNonNegativeInteger(value.slice('--offset='.length), 0);
    else if (value === '--resume-from') args.resumeFrom = String(argv[++index] || '').trim();
    else if (value.startsWith('--resume-from=')) args.resumeFrom = value.slice('--resume-from='.length).trim();
    else if (value === '--step-timeout-minutes') args.stepTimeoutMinutes = parseNonNegativeInteger(argv[++index], DEFAULT_STEP_TIMEOUT_MINUTES);
    else if (value.startsWith('--step-timeout-minutes=')) args.stepTimeoutMinutes = parseNonNegativeInteger(value.slice('--step-timeout-minutes='.length), DEFAULT_STEP_TIMEOUT_MINUTES);
    else if (value === '--progress-seconds') args.progressSeconds = parseNonNegativeInteger(argv[++index], DEFAULT_PROGRESS_SECONDS);
    else if (value.startsWith('--progress-seconds=')) args.progressSeconds = parseNonNegativeInteger(value.slice('--progress-seconds='.length), DEFAULT_PROGRESS_SECONDS);
    else if (value === '--max-silent-seconds') args.maxSilentSeconds = parseNonNegativeInteger(argv[++index], DEFAULT_MAX_SILENT_SECONDS);
    else if (value.startsWith('--max-silent-seconds=')) args.maxSilentSeconds = parseNonNegativeInteger(value.slice('--max-silent-seconds='.length), DEFAULT_MAX_SILENT_SECONDS);
  }

  if (!args.locales.length) args.locales = ['en'];
  if (!args.locales.includes('en')) args.locales.unshift('en');
  if (!args.scope.length && !args.countries.length && !args.allCountries) args.scope = ['changed'];
  return args;
}

async function pathExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readState() {
  if (!(await pathExists(statePath))) {
    return { version: 3, completed: {}, failures: {}, runs: [], active: null };
  }
  try {
    const parsed = JSON.parse(await readFile(statePath, 'utf8'));
    return {
      version: 3,
      completed: parsed.completed || {},
      failures: parsed.failures || {},
      runs: parsed.runs || [],
      active: parsed.active || null
    };
  } catch {
    return { version: 3, completed: {}, failures: {}, runs: [], active: null };
  }
}

async function writeState(state) {
  await mkdir(dirname(statePath), { recursive: true });
  await writeFile(statePath, JSON.stringify(state, null, 2), 'utf8');
}

async function readCountrySlugs() {
  const slugs = new Set();
  for (const dir of [resolve(projectRoot, 'countries', 'data'), resolve(projectRoot, 'countries')]) {
    if (!(await pathExists(dir))) continue;
    const files = await readdir(dir);
    for (const file of files) {
      if (file.endsWith('.json') && file !== 'schema.json') slugs.add(basename(file, '.json'));
      if (file.endsWith('.yaml')) slugs.add(basename(file, '.yaml'));
    }
  }
  return [...slugs].sort();
}

async function readDirRecursive(dir, predicate = () => true) {
  if (!(await pathExists(dir))) return [];
  const output = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const absolute = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      output.push(...await readDirRecursive(absolute, predicate));
    } else if (entry.isFile() && predicate(absolute)) {
      output.push(absolute);
    }
  }
  return output;
}

function toProjectPath(filePath) {
  return filePath.startsWith(projectRoot) ? filePath.slice(projectRoot.length + 1) : filePath;
}

async function hashFile(filePath) {
  if (hashCache.has(filePath)) return hashCache.get(filePath);
  if (!(await pathExists(filePath))) {
    const missing = `missing:${toProjectPath(filePath)}`;
    hashCache.set(filePath, missing);
    return missing;
  }
  const digest = createHash('sha256')
    .update(await readFile(filePath))
    .digest('hex');
  hashCache.set(filePath, digest);
  return digest;
}

async function hashFiles(files, salt = '') {
  const normalized = [...new Set(files.map(file => resolve(projectRoot, file)))].sort();
  const hash = createHash('sha256');
  hash.update(`salt:${salt}\n`);
  for (const file of normalized) {
    hash.update(`${toProjectPath(file)}\0${await hashFile(file)}\n`);
  }
  return hash.digest('hex');
}

async function sharedSourceFiles() {
  const explicit = [
    'package.json',
    'site.yaml',
    'templates/layout.html',
    'scripts/route-registry.mjs',
    'scripts/localization-pass.mjs',
    'scripts/dev-asset-links.mjs',
    'scripts/build-release-incremental.mjs'
  ];
  const css = await readDirRecursive(resolve(projectRoot, 'assets', 'css'), file => file.endsWith('.css'));
  return [...explicit, ...css.map(toProjectPath)];
}

async function portalSourceFiles() {
  const explicit = [
    'scripts/build-portal-dev.mjs',
    'scripts/build-countries-portal.mjs',
    'assets/js/bundle.js',
    'assets/js/brand-assets.js',
    'assets/js/portal-home.js',
    'assets/js/portal-tools.js',
    'assets/js/countries-portal.js'
  ];
  return [...await sharedSourceFiles(), ...explicit];
}

async function identifiersSourceFiles() {
  const explicit = [
    'scripts/build-identifiers.mjs',
    'templates/identifier.template.html',
    'templates/identifier.html'
  ];
  const contentDirs = ['content', 'identifiers'].map(dir => resolve(projectRoot, dir));
  const contentFiles = [];
  for (const dir of contentDirs) {
    contentFiles.push(...await readDirRecursive(dir, file => /\.(html|md|json|yaml|yml)$/i.test(file)));
  }
  return [...await sharedSourceFiles(), ...explicit, ...contentFiles.map(toProjectPath)];
}

function selectedSlugsFromArgs(args) {
  const index = args.indexOf('--slugs');
  if (index === -1) return [];
  return String(args[index + 1] || '').split(',').map(item => item.trim()).filter(Boolean);
}

async function globalToolsSourceFiles(stepArgs) {
  const explicit = [
    'scripts/build-tools-dev.mjs',
    'scripts/render-generic-tool-page.mjs',
    'assets/js/tools/generic-suite.js'
  ];
  const slugs = selectedSlugsFromArgs(stepArgs);
  const toolFiles = slugs.length
    ? slugs.map(slug => `tools/${slug}.yaml`)
    : (await readDirRecursive(resolve(projectRoot, 'tools'), file => /\.(yaml|yml)$/i.test(file))).map(toProjectPath);
  const runtimeFiles = await readDirRecursive(resolve(projectRoot, 'assets', 'js', 'tools'), file => file.endsWith('.js'));
  return [...await sharedSourceFiles(), ...explicit, ...toolFiles, ...runtimeFiles.map(toProjectPath)];
}

async function countrySourceFiles(country) {
  const explicit = [
    'scripts/build-country-dev.mjs',
    'scripts/build-countries-portal.mjs',
    'scripts/render-country-sections.mjs',
    'scripts/render-country-visuals.mjs',
    'assets/js/tools/country-suite-factory.js',
    'assets/js/tools/country-legacy-rich-layer.js',
    `assets/js/tools/${country}-suite.js`,
    `countries/data/${country}.json`,
    `countries/${country}.yaml`
  ];
  const countryToolYaml = await readDirRecursive(resolve(projectRoot, 'tools'), file => {
    const name = basename(file);
    return name.startsWith(`${country}-`) && /\.(yaml|yml)$/i.test(name);
  });
  return [...await sharedSourceFiles(), ...explicit, ...countryToolYaml.map(toProjectPath)];
}

async function stepFingerprint(step, locales) {
  let sources = await sharedSourceFiles();
  if (step.name === 'portal') sources = await portalSourceFiles();
  else if (step.name === 'identifiers') sources = await identifiersSourceFiles();
  else if (step.name === 'global-tools') sources = await globalToolsSourceFiles(step.args);
  else if (step.name.startsWith('country:')) sources = await countrySourceFiles(step.name.slice('country:'.length));
  else if (step.name === 'changed') sources = [...await sharedSourceFiles(), 'scripts/build-changed.mjs'];
  return hashFiles(sources, JSON.stringify({ name: step.name, args: step.args, locales }));
}

function stepId(name, args) {
  return `${name}:${args.join(' ')}`;
}

function buildStaticSteps(args, countrySlugs) {
  const steps = [];
  const scopes = new Set(args.scope);
  const localesArg = args.locales.join(',');

  if (scopes.has('changed')) {
    steps.push({
      name: 'changed',
      command: 'node',
      args: ['scripts/build-changed.mjs', '--locales', localesArg],
      reason: 'git-diff targeted rebuild'
    });
  }

  if (scopes.has('portal')) {
    steps.push({
      name: 'portal',
      command: 'node',
      args: ['scripts/build-portal-dev.mjs'],
      reason: 'home/tools/countries/identifier portal pages'
    });
  }

  if (scopes.has('tools')) {
    steps.push({
      name: 'global-tools',
      command: 'node',
      args: ['scripts/build-tools-dev.mjs', '--locales', localesArg],
      reason: 'all global tool pages and tools directory'
    });
  }

  if (scopes.has('identifiers')) {
    steps.push({
      name: 'identifiers',
      command: 'node',
      args: ['scripts/build-identifiers.mjs'],
      reason: 'identifier article and category pages'
    });
  }

  const selectedCountries = args.allCountries ? countrySlugs : args.countries;
  for (const country of selectedCountries) {
    steps.push({
      name: `country:${country}`,
      command: 'node',
      args: ['scripts/build-country-dev.mjs', '--country', country, '--locales', localesArg],
      reason: `country hub and local tool shell for ${country}`
    });
  }

  return steps.map(step => ({ ...step, id: stepId(step.name, step.args) }));
}

function matchesResumeToken(step, token) {
  if (!token) return false;
  return step.name === token || step.id === token || step.id.includes(token);
}

function applyWindow(steps, args, state) {
  let windowed = steps;
  if (args.resumeFrom) {
    const resumeIndex = steps.findIndex(step => matchesResumeToken(step, args.resumeFrom));
    if (resumeIndex === -1) {
      throw new Error(`Cannot find --resume-from step "${args.resumeFrom}". Use --plan to inspect planned step names.`);
    }
    windowed = steps.slice(resumeIndex);
  }
  const afterOffset = args.offset ? windowed.slice(args.offset) : windowed;
  const pending = args.noResume ? afterOffset : afterOffset.filter(step => {
    const completed = state.completed[step.id];
    return !completed || completed.fingerprint !== step.fingerprint;
  });
  return args.limit ? pending.slice(0, args.limit) : pending;
}

function isStepCompleted(step, state) {
  const completed = state.completed[step.id];
  return Boolean(completed && completed.fingerprint === step.fingerprint);
}

function printSteps(title, steps) {
  console.log(title);
  if (!steps.length) {
    console.log('No pending steps.');
    return;
  }
  steps.forEach((step, index) => {
    console.log(`${index + 1}. ${step.name}`);
    console.log(`   ${step.command} ${step.args.join(' ')}`);
    console.log(`   ${step.reason}`);
    console.log(`   id: ${step.id}`);
  });
}

function formatDuration(durationMs) {
  const totalSeconds = Math.max(0, Math.round(durationMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

function killChild(child, signal) {
  if (!child.killed) child.kill(signal);
}

async function runStep(step, options = {}) {
  const started = Date.now();
  let lastOutputAt = started;
  const timeoutMs = options.stepTimeoutMinutes > 0 ? options.stepTimeoutMinutes * 60 * 1000 : 0;
  const progressMs = options.progressSeconds > 0 ? options.progressSeconds * 1000 : 0;
  const maxSilentMs = options.maxSilentSeconds > 0 ? options.maxSilentSeconds * 1000 : 0;
  console.log(`\n=== ${step.name} ===`);
  console.log(`${step.command} ${step.args.join(' ')}`);
  console.log([
    `Step timeout: ${timeoutMs ? `${options.stepTimeoutMinutes}m` : 'disabled'}`,
    `silent watchdog: ${maxSilentMs ? `${options.maxSilentSeconds}s` : 'disabled'}`,
    `progress: ${progressMs ? `${options.progressSeconds}s` : 'disabled'}`
  ].join(' | '));
  return await new Promise((resolvePromise, rejectPromise) => {
    let finished = false;
    let terminating = false;
    let progressTimer = null;
    let timeoutTimer = null;
    let silentTimer = null;

    function clearTimers() {
      if (progressTimer) clearInterval(progressTimer);
      if (timeoutTimer) clearTimeout(timeoutTimer);
      if (silentTimer) clearInterval(silentTimer);
    }

    function failForWatchdog(message) {
      if (finished || terminating) return;
      terminating = true;
      console.error(`\n[build:release:incremental] ${message}`);
      killChild(child, 'SIGINT');
      setTimeout(() => killChild(child, 'SIGTERM'), 5000).unref();
    }

    const child = spawn(step.command, step.args, {
      cwd: projectRoot,
      shell: false,
      stdio: ['ignore', 'pipe', 'pipe']
    });

    function handleOutput(stream, chunk) {
      lastOutputAt = Date.now();
      if (options.onActiveUpdate) {
        options.onActiveUpdate({
          lastOutputAt: new Date(lastOutputAt).toISOString(),
          lastHeartbeatAt: new Date().toISOString()
        });
      }
      stream.write(chunk);
    }

    child.stdout.on('data', chunk => handleOutput(process.stdout, chunk));
    child.stderr.on('data', chunk => handleOutput(process.stderr, chunk));

    if (progressMs) {
      progressTimer = setInterval(() => {
        const now = Date.now();
        const elapsed = formatDuration(now - started);
        const silent = formatDuration(now - lastOutputAt);
        console.log(`[build:release:incremental] still running ${step.name}; elapsed ${elapsed}; no output ${silent}`);
        if (options.onActiveUpdate) {
          options.onActiveUpdate({
            lastHeartbeatAt: new Date(now).toISOString(),
            lastOutputAt: new Date(lastOutputAt).toISOString()
          });
        }
      }, progressMs);
      progressTimer.unref();
    }

    if (timeoutMs) {
      timeoutTimer = setTimeout(() => {
        failForWatchdog(`${step.name} exceeded --step-timeout-minutes ${options.stepTimeoutMinutes}`);
      }, timeoutMs);
      timeoutTimer.unref();
    }

    if (maxSilentMs) {
      silentTimer = setInterval(() => {
        const silentForMs = Date.now() - lastOutputAt;
        if (silentForMs >= maxSilentMs) {
          failForWatchdog(`${step.name} produced no output for ${formatDuration(silentForMs)}; max is ${options.maxSilentSeconds}s`);
        }
      }, Math.min(maxSilentMs, 30_000));
      silentTimer.unref();
    }

    child.on('error', error => {
      finished = true;
      clearTimers();
      rejectPromise(error);
    });
    child.on('close', code => {
      finished = true;
      clearTimers();
      const durationMs = Date.now() - started;
      if (code === 0) resolvePromise({ durationMs });
      else if (terminating) rejectPromise(new Error(`${step.name} stopped by timeout/watchdog with exit code ${code}`));
      else rejectPromise(new Error(`${step.name} failed with exit code ${code}`));
    });
  });
}

function printStatus(state) {
  const completed = Object.keys(state.completed).length;
  const failures = Object.keys(state.failures).length;
  console.log('=== ValidoHub incremental release build status ===');
  console.log(`State: ${statePath}`);
  if (state.active) {
    const startedAt = Date.parse(state.active.startedAt);
    const elapsed = Number.isFinite(startedAt) ? ` (${formatDuration(Date.now() - startedAt)} elapsed)` : '';
    console.log('');
    console.log('Active step:');
    console.log(`- ${state.active.name}${elapsed}`);
    console.log(`  ${state.active.command} ${(state.active.args || []).join(' ')}`);
    if (state.active.lastOutputAt) console.log(`  last output: ${state.active.lastOutputAt}`);
    if (state.active.lastHeartbeatAt) console.log(`  last heartbeat: ${state.active.lastHeartbeatAt}`);
  }
  console.log(`Completed steps: ${completed}`);
  console.log(`Failures: ${failures}`);
  const recent = Object.entries(state.completed).slice(-12);
  if (recent.length) {
    console.log('');
    console.log('Recent completed:');
    for (const [id, meta] of recent) console.log(`- ${id} (${formatDuration(meta.durationMs || 0)})`);
  }
  const failed = Object.entries(state.failures).slice(-8);
  if (failed.length) {
    console.log('');
    console.log('Recent failures:');
    for (const [id, meta] of failed) {
      console.log(`- ${id} at ${meta.failedAt || 'unknown time'}`);
      console.log(`  ${meta.message || 'No failure message recorded.'}`);
    }
  }
  const runs = (state.runs || []).slice(-5);
  if (runs.length) {
    console.log('');
    console.log('Recent runs:');
    for (const run of runs) {
      const parts = [`started ${run.startedAt}`, `pending ${run.pending}`];
      if (run.completedAt) parts.push(`completed ${run.completedAt}`);
      console.log(`- ${parts.join('; ')}`);
    }
  }
}

async function annotateFingerprints(steps, locales) {
  for (const step of steps) {
    step.fingerprint = await stepFingerprint(step, locales);
  }
  return steps;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    return;
  }

  if (args.reset) {
    await rm(statePath, { force: true });
    console.log(`Reset incremental state: ${statePath}`);
    return;
  }

  const state = await readState();
  if (args.status) {
    printStatus(state);
    return;
  }

  const countrySlugs = await readCountrySlugs();
  const unknownCountries = args.countries.filter(country => !countrySlugs.includes(country));
  if (unknownCountries.length) {
    throw new Error(`Unknown country slug(s): ${unknownCountries.join(', ')}`);
  }

  const plannedSteps = await annotateFingerprints(buildStaticSteps(args, countrySlugs), args.locales);
  const pendingSteps = applyWindow(plannedSteps, args, state);

  console.log('=== ValidoHub incremental release build ===');
  console.log(`Locales: ${args.locales.join(', ')}`);
  console.log(`Planned steps: ${plannedSteps.length}`);
  if (args.resumeFrom) console.log(`Resume from: ${args.resumeFrom}`);
  if (args.offset) console.log(`Offset: ${args.offset}`);
  if (args.limit) console.log(`Limit: ${args.limit}`);
  console.log(`Skipped by cache: ${plannedSteps.filter(step => isStepCompleted(step, state)).length}`);
  console.log(`Step timeout: ${args.stepTimeoutMinutes ? `${args.stepTimeoutMinutes}m` : 'disabled'}`);
  console.log(`Silent watchdog: ${args.maxSilentSeconds ? `${args.maxSilentSeconds}s` : 'disabled'}`);
  printSteps(args.dryRun ? 'Dry-run pending steps:' : 'Pending steps:', pendingSteps);

  if (args.dryRun || !pendingSteps.length) return;

  const run = {
    startedAt: new Date().toISOString(),
    locales: args.locales,
    planned: plannedSteps.length,
    pending: pendingSteps.length,
    resumeFrom: args.resumeFrom || null,
    limit: args.limit || null,
    offset: args.offset || null,
    stepTimeoutMinutes: args.stepTimeoutMinutes,
    maxSilentSeconds: args.maxSilentSeconds
  };
  state.runs.push(run);
  state.runs = state.runs.slice(-30);
  await writeState(state);

  for (const step of pendingSteps) {
    const startedAt = new Date().toISOString();
    let activeWriteChain = Promise.resolve();
    let lastActiveWriteAt = 0;
    function updateActive(partial, force = false) {
      if (!state.active || state.active.id !== step.id) return;
      Object.assign(state.active, partial);
      const now = Date.now();
      if (!force && now - lastActiveWriteAt < 15_000) return;
      lastActiveWriteAt = now;
      activeWriteChain = activeWriteChain
        .catch(() => {})
        .then(() => writeState(state))
        .catch(error => {
          console.warn(`[build:release:incremental] could not persist active status: ${error.message || error}`);
        });
    }

    try {
      state.active = {
        id: step.id,
        name: step.name,
        command: step.command,
        args: step.args,
        reason: step.reason,
        fingerprint: step.fingerprint,
        startedAt,
        lastHeartbeatAt: startedAt,
        lastOutputAt: null
      };
      await writeState(state);

      const result = await runStep(step, {
        stepTimeoutMinutes: args.stepTimeoutMinutes,
        progressSeconds: args.progressSeconds,
        maxSilentSeconds: args.maxSilentSeconds,
        onActiveUpdate: updateActive
      });
      await activeWriteChain;
      state.completed[step.id] = {
        name: step.name,
        command: step.command,
        args: step.args,
        reason: step.reason,
        fingerprint: step.fingerprint,
        startedAt,
        completedAt: new Date().toISOString(),
        durationMs: result.durationMs
      };
      delete state.failures[step.id];
      state.active = null;
      await writeState(state);
      console.log(`✓ ${step.name} completed in ${Math.round(result.durationMs / 1000)}s`);
    } catch (error) {
      await activeWriteChain;
      state.failures[step.id] = {
        name: step.name,
        command: step.command,
        args: step.args,
        reason: step.reason,
        fingerprint: step.fingerprint,
        startedAt,
        failedAt: new Date().toISOString(),
        message: error.message || String(error)
      };
      state.active = null;
      await writeState(state);
      throw error;
    }
  }

  run.completedAt = new Date().toISOString();
  await writeState(state);
  console.log('\n✓ Incremental release chunk complete.');
  printStatus(state);
}

main().catch(error => {
  console.error(error.message || error);
  process.exit(1);
});
