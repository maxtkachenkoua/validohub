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
const hashCache = new Map();

function usage() {
  return [
    'Usage:',
    '  node scripts/build-release-incremental.mjs --locales en --scope changed',
    '  node scripts/build-release-incremental.mjs --locales en --scope portal,tools,identifiers',
    '  node scripts/build-release-incremental.mjs --locales en --countries brazil,poland',
    '  node scripts/build-release-incremental.mjs --locales en --all-countries --limit 10',
    '  node scripts/build-release-incremental.mjs --status',
    '',
    'Resumable release-prep build. It runs the fast static builders in chunks and records completed',
    'steps under generated/validohub/.build/release-incremental.json. It does not run the Java publisher.'
  ].join('\n');
}

function parseList(value) {
  return String(value || '').split(',').map(item => item.trim()).filter(Boolean);
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
    noResume: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--help' || value === '-h') args.help = true;
    else if (value === '--status') args.status = true;
    else if (value === '--reset') args.reset = true;
    else if (value === '--dry-run') args.dryRun = true;
    else if (value === '--no-resume') args.noResume = true;
    else if (value === '--all-countries') args.allCountries = true;
    else if (value === '--locales') args.locales = parseList(argv[++index] || 'en');
    else if (value.startsWith('--locales=')) args.locales = parseList(value.slice('--locales='.length));
    else if (value === '--scope') args.scope = parseList(argv[++index] || '');
    else if (value.startsWith('--scope=')) args.scope = parseList(value.slice('--scope='.length));
    else if (value === '--countries') args.countries = parseList(argv[++index] || '');
    else if (value.startsWith('--countries=')) args.countries = parseList(value.slice('--countries='.length));
    else if (value === '--limit') args.limit = Math.max(0, Number.parseInt(argv[++index] || '0', 10) || 0);
    else if (value.startsWith('--limit=')) args.limit = Math.max(0, Number.parseInt(value.slice('--limit='.length), 10) || 0);
    else if (value === '--offset') args.offset = Math.max(0, Number.parseInt(argv[++index] || '0', 10) || 0);
    else if (value.startsWith('--offset=')) args.offset = Math.max(0, Number.parseInt(value.slice('--offset='.length), 10) || 0);
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
    return { version: 2, completed: {}, failures: {}, runs: [] };
  }
  try {
    const parsed = JSON.parse(await readFile(statePath, 'utf8'));
    return {
      version: 2,
      completed: parsed.completed || {},
      failures: parsed.failures || {},
      runs: parsed.runs || []
    };
  } catch {
    return { version: 2, completed: {}, failures: {}, runs: [] };
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

function applyWindow(steps, args, state) {
  const afterOffset = args.offset ? steps.slice(args.offset) : steps;
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
    console.log(`${index + 1}. ${step.command} ${step.args.join(' ')}`);
    console.log(`   ${step.reason}`);
  });
}

async function runStep(step) {
  const started = Date.now();
  console.log(`\n=== ${step.name} ===`);
  console.log(`${step.command} ${step.args.join(' ')}`);
  return await new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(step.command, step.args, {
      cwd: projectRoot,
      shell: false,
      stdio: 'inherit'
    });
    child.on('error', rejectPromise);
    child.on('close', code => {
      const durationMs = Date.now() - started;
      if (code === 0) resolvePromise({ durationMs });
      else rejectPromise(new Error(`${step.name} failed with exit code ${code}`));
    });
  });
}

function printStatus(state) {
  const completed = Object.keys(state.completed).length;
  const failures = Object.keys(state.failures).length;
  console.log('=== ValidoHub incremental release build status ===');
  console.log(`State: ${statePath}`);
  console.log(`Completed steps: ${completed}`);
  console.log(`Failures: ${failures}`);
  const recent = Object.entries(state.completed).slice(-12);
  if (recent.length) {
    console.log('');
    console.log('Recent completed:');
    for (const [id, meta] of recent) console.log(`- ${id} (${meta.durationMs}ms)`);
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
  console.log(`Skipped by cache: ${plannedSteps.filter(step => isStepCompleted(step, state)).length}`);
  printSteps(args.dryRun ? 'Dry-run pending steps:' : 'Pending steps:', pendingSteps);

  if (args.dryRun || !pendingSteps.length) return;

  const run = {
    startedAt: new Date().toISOString(),
    locales: args.locales,
    planned: plannedSteps.length,
    pending: pendingSteps.length
  };
  state.runs.push(run);
  await writeState(state);

  for (const step of pendingSteps) {
    const startedAt = new Date().toISOString();
    try {
      const result = await runStep(step);
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
      await writeState(state);
      console.log(`✓ ${step.name} completed in ${Math.round(result.durationMs / 1000)}s`);
    } catch (error) {
      state.failures[step.id] = {
        name: step.name,
        command: step.command,
        args: step.args,
        reason: step.reason,
        startedAt,
        failedAt: new Date().toISOString(),
        message: error.message || String(error)
      };
      await writeState(state);
      throw error;
    }
  }

  console.log('\n✓ Incremental release chunk complete.');
  printStatus(state);
}

main().catch(error => {
  console.error(error.message || error);
  process.exit(1);
});
