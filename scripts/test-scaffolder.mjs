#!/usr/bin/env node

import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const execAsync = promisify(exec);
const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const scaffolderPath = resolve(projectRoot, 'scripts', 'create-country-hub.mjs');

let failedTests = 0;
let passedTests = 0;

async function runTest(name, commandArgs, expectedExitCode, matchPatterns = [], avoidPatterns = []) {
  console.log(`Running test: ${name}...`);
  try {
    const { stdout, stderr } = await execAsync(`node "${scaffolderPath}" ${commandArgs}`, { cwd: projectRoot });
    const output = stdout + '\n' + stderr;

    if (expectedExitCode !== 0) {
      console.error(`FAIL: Expected exit code ${expectedExitCode}, but command succeeded.`);
      failedTests++;
      return;
    }

    for (const pattern of matchPatterns) {
      if (!output.includes(pattern)) {
        console.error(`FAIL: Output did not contain expected pattern "${pattern}".`);
        console.error('Output was:\n', output);
        failedTests++;
        return;
      }
    }

    for (const pattern of avoidPatterns) {
      if (output.includes(pattern)) {
        console.error(`FAIL: Output contained forbidden pattern "${pattern}".`);
        console.error('Output was:\n', output);
        failedTests++;
        return;
      }
    }

    console.log(`PASS: ${name}`);
    passedTests++;
  } catch (err) {
    const exitCode = err.code || 1;
    const output = err.stdout + '\n' + err.stderr;

    if (exitCode !== expectedExitCode) {
      console.error(`FAIL: Expected exit code ${expectedExitCode}, got ${exitCode}. Error:\n`, output);
      failedTests++;
      return;
    }

    for (const pattern of matchPatterns) {
      if (!output.includes(pattern)) {
        console.error(`FAIL: Output did not contain expected pattern "${pattern}".`);
        console.error('Output was:\n', output);
        failedTests++;
        return;
      }
    }

    for (const pattern of avoidPatterns) {
      if (output.includes(pattern)) {
        console.error(`FAIL: Output contained forbidden pattern "${pattern}".`);
        console.error('Output was:\n', output);
        failedTests++;
        return;
      }
    }

    console.log(`PASS: ${name}`);
    passedTests++;
  }
}

async function main() {
  console.log('=== STARTING SCAFFOLDER TEST SUITE ===\n');

  // Test 1: Valid dry-run for Germany
  await runTest(
    'Valid dry-run for Sweden',
    '--id sweden --name Sweden --iso2 SE --iso3 SWE --dry-run',
    0,
    [
      '=== DRY RUN SUCCESSFUL ===',
      'Portal Map Coordinates:  { x: 51, y: 26 }',
      'Location Crop viewBox:    "360 290 163 123"',
      'sweden-outline.svg',
      'sweden-location.svg'
    ]
  );

  // Test 2: Point-on-surface dry-run for Greece (island/multi-polygon country)
  await runTest(
    'Point-on-surface dry-run for Greece (islands)',
    '--id greece --name Greece --iso2 GR --iso3 GRC --dry-run',
    0,
    [
      '=== DRY RUN SUCCESSFUL ===',
      'greece-outline.svg',
      'greece-location.svg'
    ]
  );

  // Test 3: Point-on-surface dry-run for Indonesia (crossing map edges / large archipelagic country)
  await runTest(
    'Point-on-surface dry-run for Indonesia',
    '--id indonesia --name Indonesia --iso2 ID --iso3 IDN --dry-run',
    0,
    [
      '=== DRY RUN SUCCESSFUL ===',
      'indonesia-outline.svg',
      'indonesia-location.svg'
    ]
  );

  // Test 4: Duplicate ID validation
  await runTest(
    'Duplicate ID validation (spain)',
    '--id spain --name Spain --iso2 ES --iso3 ESP --dry-run',
    1,
    [
      'Error: Country ID "spain" is already registered.'
    ]
  );

  // Test 5: Duplicate ISO2 validation
  await runTest(
    'Duplicate ISO2 validation',
    '--id newcountry --name NewCountry --iso2 ES --iso3 NEW --dry-run',
    1,
    [
      'Error: Duplicate ISO2 code "ES" is already assigned to "spain".'
    ]
  );

  // Test 6: Duplicate ISO3 validation
  await runTest(
    'Duplicate ISO3 validation',
    '--id newcountry --name NewCountry --iso2 SE --iso3 ESP --dry-run',
    1,
    [
      'Error: Duplicate ISO3 code "ESP" is already assigned to "spain".'
    ]
  );

  // Test 7: Unknown ISO geometry in world-map-source.svg
  await runTest(
    'Unknown ISO geometry validation',
    '--id nonexistent --name Nonexistent --iso2 XX --iso3 XXX --dry-run',
    1,
    [
      'Error: Geometry for country "nonexistent" (iso2: XX) not found in master world map.'
    ]
  );

  // Test 8: Missing required arguments
  await runTest(
    'Missing id validation',
    '--name Germany --iso2 DE --iso3 DEU --dry-run',
    1,
    [
      'Error: Missing required arguments: --id'
    ]
  );

  // Test 9: Malformed arguments
  await runTest(
    'Malformed ID validation',
    '--id Germany --name Germany --iso2 DE --iso3 DEU --dry-run',
    1,
    [
      'Error: Country ID must be lowercase.'
    ]
  );

  console.log(`\n=== TEST SUITE RESULTS ===`);
  console.log(`Passed: ${passedTests}`);
  console.log(`Failed: ${failedTests}`);

  if (failedTests > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main().catch(console.error);
