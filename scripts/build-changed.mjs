#!/usr/bin/env node
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { spawn } from 'node:child_process';
import { dirname, basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile, readdir } from 'node:fs/promises';

const execFileAsync = promisify(execFile);
const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');

function usage() {
  return [
    'Usage: node scripts/build-changed.mjs [--since HEAD] [--locales en,fr] [--dry-run]',
    '',
    'Plans a fast, targeted rebuild from the current git diff.',
    'It never runs the Java site publisher and never starts a full build.'
  ].join('\n');
}

function parseArgs(argv) {
  const args = {
    since: 'HEAD',
    locales: ['en'],
    dryRun: false,
    help: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--help' || value === '-h') args.help = true;
    else if (value === '--dry-run') args.dryRun = true;
    else if (value === '--since') args.since = argv[++index] || args.since;
    else if (value === '--locales') {
      args.locales = String(argv[++index] || 'en').split(',').map(item => item.trim()).filter(Boolean);
    }
  }

  if (!args.locales.includes('en')) args.locales.unshift('en');
  return args;
}

async function gitLines(args) {
  try {
    const { stdout } = await execFileAsync('git', args, {
      cwd: projectRoot,
      maxBuffer: 20 * 1024 * 1024
    });
    return stdout.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  } catch (error) {
    throw new Error(`git ${args.join(' ')} failed: ${error.message}`);
  }
}

async function changedFiles(since) {
  const unstagedAndStaged = await gitLines(['diff', '--name-only', '--diff-filter=ACMRTUXB', since]);
  const untracked = await gitLines(['ls-files', '--others', '--exclude-standard']);
  return [...new Set([...unstagedAndStaged, ...untracked])].sort();
}

async function readCountrySlugs() {
  const slugs = new Set();
  try {
    const dataFiles = await readdir(resolve(projectRoot, 'countries', 'data'));
    for (const file of dataFiles) {
      if (file.endsWith('.json') && file !== 'schema.json') slugs.add(basename(file, '.json'));
    }
  } catch {
    // The planner remains useful even if generated country data is unavailable.
  }
  try {
    const yamlFiles = await readdir(resolve(projectRoot, 'countries'));
    for (const file of yamlFiles) {
      if (file.endsWith('.yaml')) slugs.add(basename(file, '.yaml'));
    }
  } catch {
    // Same fallback as above.
  }
  return [...slugs].sort((a, b) => b.length - a.length);
}

function yamlSlug(file) {
  if (!file.startsWith('tools/') || !file.endsWith('.yaml')) return '';
  return basename(file, '.yaml');
}

function countryFromPath(file, countrySlugs) {
  if (file.startsWith('countries/data/') && file.endsWith('.json')) {
    return basename(file, '.json');
  }
  if (file.startsWith('countries/') && file.endsWith('.yaml')) {
    return basename(file, '.yaml');
  }
  const suite = file.match(/^assets\/js\/tools\/(.+)-suite\.js$/);
  if (suite && countrySlugs.includes(suite[1])) return suite[1];
  return countrySlugs.find(slug => file.includes(`/${slug}.`) || file.includes(`/${slug}/`)) || '';
}

function globalToolSlug(file) {
  const slug = yamlSlug(file);
  if (!slug) return '';
  return slug;
}

function hasAnyPrefix(file, prefixes) {
  return prefixes.some(prefix => file.startsWith(prefix));
}

function hasAnyExact(file, names) {
  return names.includes(file);
}

async function toolHasGlobalPath(slug) {
  try {
    const content = await readFile(resolve(projectRoot, 'tools', `${slug}.yaml`), 'utf8');
    return /path:\s*\/en\/tools\//.test(content) || /href:\s*\/en\/tools\//.test(content);
  } catch {
    return false;
  }
}

async function countryFromToolYaml(file, countrySlugs) {
  const slug = yamlSlug(file);
  if (!slug) return '';
  const inferred = countrySlugs.find(country => slug === country || slug.startsWith(`${country}-`));
  if (inferred) return inferred;
  try {
    const content = await readFile(resolve(projectRoot, file), 'utf8');
    const routeMatch = content.match(/\/en\/([^/\s"']+)\//);
    const routeCountry = routeMatch?.[1] || '';
    if (countrySlugs.includes(routeCountry)) return routeCountry;
  } catch {
    // Leave unresolved; the notes section will tell us to target manually if needed.
  }
  return '';
}

async function plan(files, locales) {
  const countrySlugs = await readCountrySlugs();
  const countryTargets = new Set();
  const toolTargets = new Set();
  const notes = [];
  let portal = false;
  let toolsAll = false;
  let identifiers = false;

  for (const file of files) {
    const country = countryFromPath(file, countrySlugs) || await countryFromToolYaml(file, countrySlugs);
    if (country) countryTargets.add(country);

    const toolSlug = globalToolSlug(file);
    if (toolSlug) {
      if (await toolHasGlobalPath(toolSlug)) toolTargets.add(toolSlug);
    }

    if (hasAnyExact(file, [
      'site.yaml',
      'templates/layout.html',
      'assets/js/bundle.js',
      'assets/js/brand-assets.js',
      'assets/js/portal-home.js',
      'assets/js/portal-tools.js',
      'assets/js/portal-countries.js',
      'assets/js/countries-portal.js',
      'assets/js/countries.js',
      'scripts/build-portal-dev.mjs',
      'scripts/build-countries-portal.mjs'
    ]) || hasAnyPrefix(file, ['assets/css/'])) {
      portal = true;
    }

    if (hasAnyExact(file, [
      'scripts/build-tools-dev.mjs',
      'scripts/render-generic-tool-page.mjs',
      'assets/js/tools/generic-suite.js'
    ]) || file.startsWith('assets/js/workbench/')) {
      toolsAll = true;
    }

    if (hasAnyExact(file, [
      'templates/identifier.template.html',
      'templates/identifier.html',
      'scripts/build-identifiers.mjs'
    ]) || file.startsWith('identifiers/') || file.startsWith('content/identifiers/')) {
      identifiers = true;
    }

    if (file.includes('localization-pass.mjs') || file.startsWith('locales/') || file.startsWith('i18n/')) {
      notes.push('Localization core changed: run targeted pages during dev, then build:full only for release verification.');
      portal = true;
    }

    if (file.startsWith('assets/js/tools/') && !country && !file.includes('generic-suite')) {
      notes.push(`Shared or unknown tool runtime changed: ${file}. Add targeted --country/--slugs if a page needs visual QA.`);
    }
  }

  const steps = [];
  if (portal) {
    steps.push({
      name: 'portal',
      command: 'node',
      args: ['scripts/build-portal-dev.mjs'],
      reason: 'home/tools/countries portals, shared layout, CSS, or portal runtime changed'
    });
  }

  if (toolsAll || toolTargets.size) {
    const args = ['scripts/build-tools-dev.mjs', '--locales', locales.join(',')];
    if (!toolsAll && toolTargets.size) args.push('--slugs', [...toolTargets].sort().join(','));
    steps.push({
      name: 'global-tools',
      command: 'node',
      args,
      reason: toolsAll ? 'shared global tool runtime changed' : 'global tool YAML changed'
    });
  }

  for (const country of [...countryTargets].sort()) {
    steps.push({
      name: `country:${country}`,
      command: 'node',
      args: ['scripts/build-country-dev.mjs', '--country', country, '--locales', locales.join(',')],
      reason: `country data/runtime changed for ${country}`
    });
  }

  if (identifiers) {
    steps.push({
      name: 'identifiers',
      command: 'node',
      args: ['scripts/build-identifiers.mjs'],
      reason: 'identifier template or content changed'
    });
  }

  return { steps, notes: [...new Set(notes)] };
}

function printPlan(files, steps, notes) {
  console.log('=== ValidoHub changed-build planner ===');
  console.log(`Changed files: ${files.length}`);
  if (files.length) {
    for (const file of files.slice(0, 40)) console.log(`- ${file}`);
    if (files.length > 40) console.log(`- ...and ${files.length - 40} more`);
  }
  console.log('');
  if (!steps.length) {
    console.log('No targeted build step detected. This is probably docs-only or generated-output-only.');
  } else {
    console.log('Planned steps:');
    steps.forEach((step, index) => {
      console.log(`${index + 1}. ${step.command} ${step.args.join(' ')}`);
      console.log(`   reason: ${step.reason}`);
    });
  }
  if (notes.length) {
    console.log('');
    console.log('Notes:');
    for (const note of notes) console.log(`- ${note}`);
  }
}

async function runStep(step) {
  console.log(`\n=== Running ${step.name}: ${step.command} ${step.args.join(' ')} ===`);
  await new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(step.command, step.args, {
      cwd: projectRoot,
      stdio: 'inherit'
    });
    child.on('error', rejectPromise);
    child.on('close', code => {
      if (code === 0) resolvePromise();
      else rejectPromise(new Error(`${step.name} failed with code ${code}`));
    });
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    return;
  }

  const files = await changedFiles(args.since);
  const { steps, notes } = await plan(files, args.locales);
  printPlan(files, steps, notes);
  if (args.dryRun || !steps.length) return;

  for (const step of steps) {
    await runStep(step);
  }
  console.log('\n✓ Targeted changed-build complete.');
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
