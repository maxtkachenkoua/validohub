import { readdir, readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRouteRegistry } from './route-registry.mjs';
import { CountryPageModel, normalizeCountryData, validateCountryPageModel } from './country-page-model.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const dataDir = resolve(projectRoot, 'countries/data');

async function testDeterministicOrdering() {
  console.log('Testing deterministic ordering checks...');
  const badData = new CountryPageModel({
    slug: 'testland',
    displayName: 'Testland',
    iso2: 'TL',
    iso3: 'TLS',
    region: 'Europe',
    identifiers: ['REGON', 'PESEL'] // Out of alphabetical order!
  });

  try {
    await validateCountryPageModel(badData);
    throw new Error('Test Fail: Model with unsorted identifiers did not trigger validation error');
  } catch (err) {
    if (err.message.includes('sorted alphabetically')) {
      console.log('✓ OK: Unsorted array was correctly caught');
    } else {
      throw err;
    }
  }
}

async function testDuplicateDetections() {
  console.log('Testing duplicate checks...');
  const badData = new CountryPageModel({
    slug: 'testland',
    displayName: 'Testland',
    iso2: 'TL',
    iso3: 'TLS',
    region: 'Europe',
    identifiers: ['PESEL', 'PESEL'] // Duplicate!
  });

  try {
    await validateCountryPageModel(badData);
    throw new Error('Test Fail: Model with duplicate identifiers did not trigger validation error');
  } catch (err) {
    if (err.message.includes('Duplicate identifiers')) {
      console.log('✓ OK: Duplicates were correctly caught');
    } else {
      throw err;
    }
  }
}

async function testInvalidIsoCodes() {
  console.log('Testing invalid ISO codes checks...');
  const badData1 = new CountryPageModel({
    slug: 'testland',
    displayName: 'Testland',
    iso2: 'tl', // Lowercase!
    iso3: 'TLS',
    region: 'Europe'
  });
  const badData2 = new CountryPageModel({
    slug: 'testland',
    displayName: 'Testland',
    iso2: 'TL',
    iso3: 'TL', // Too short!
    region: 'Europe'
  });

  try {
    await validateCountryPageModel(badData1);
    throw new Error('Test Fail: Lowercase ISO2 did not trigger validation error');
  } catch (err) {
    if (err.message.includes('Invalid ISO-2 code')) {
      console.log('✓ OK: Lowercase ISO2 caught');
    } else {
      throw err;
    }
  }

  try {
    await validateCountryPageModel(badData2);
    throw new Error('Test Fail: Invalid length ISO3 did not trigger validation error');
  } catch (err) {
    if (err.message.includes('Invalid ISO-3 code')) {
      console.log('✓ OK: Invalid length ISO3 caught');
    } else {
      throw err;
    }
  }
}

async function testVisualAssetValidation() {
  console.log('Testing visual assets files checking...');
  const badData = new CountryPageModel({
    slug: 'testland',
    displayName: 'Testland',
    iso2: 'TL',
    iso3: 'TLS',
    region: 'Europe',
    visualAssets: {
      outlineSrc: '/assets/images/countries/nonexistent-outline.svg'
    }
  });

  try {
    await validateCountryPageModel(badData);
    throw new Error('Test Fail: Missing visual asset file did not trigger validation error');
  } catch (err) {
    if (err.message.includes('file does not exist on disk')) {
      console.log('✓ OK: Non-existent asset file caught');
    } else {
      throw err;
    }
  }
}

async function testExternalUrlsValidation() {
  console.log('Testing external URLs validation...');
  const badData = new CountryPageModel({
    slug: 'testland',
    displayName: 'Testland',
    iso2: 'TL',
    iso3: 'TLS',
    region: 'Europe',
    officialResources: [
      { title: 'Bad Resource', url: 'ftp://badsite.com' } // Invalid protocol!
    ]
  });

  try {
    await validateCountryPageModel(badData);
    throw new Error('Test Fail: Invalid URL protocol did not trigger validation');
  } catch (err) {
    if (err.message.includes('invalid URL')) {
      console.log('✓ OK: Invalid URL protocol caught');
    } else {
      throw err;
    }
  }
}

async function main() {
  console.log('=== STARTING COUNTRY MODEL UNIT TESTS ===');

  const routeRegistry = await buildRouteRegistry();
  const files = await readdir(dataDir);
  const jsonFiles = files.filter(f => f.endsWith('.json') && f !== 'schema.json');

  for (const file of jsonFiles) {
    const raw = JSON.parse(await readFile(resolve(dataDir, file), 'utf8'));
    console.log(`Testing dataset: ${file}`);
    const model = normalizeCountryData(raw);

    // Validate using structural assertions
    await validateCountryPageModel(model, routeRegistry);
    console.log(`✓ Passed: ${file} normalizes and validates perfectly.`);
  }

  // Run error capture tests
  console.log('\n--- Running Failure Assertion Tests ---');
  await testDeterministicOrdering();
  await testDuplicateDetections();
  await testInvalidIsoCodes();
  await testVisualAssetValidation();
  await testExternalUrlsValidation();

  console.log('\n🎉 ALL MODEL TESTS PASSED SUCCESSFULLY!');
}

main().catch(err => {
  console.error('\n❌ UNIT TEST SUITE FAILED:');
  console.error(err.message || err);
  process.exit(1);
});
