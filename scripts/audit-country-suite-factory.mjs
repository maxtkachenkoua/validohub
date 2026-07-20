import fs from 'node:fs';

const requiredFiles = [
  'assets/js/tools/country-suite-factory.js',
  'docs/product/COUNTRY_SUITE_FACTORY_SPEC.md'
];

const failures = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) failures.push(`missing required factory file: ${file}`);
}

if (fs.existsSync('assets/js/tools/country-suite-factory.js')) {
  const factory = fs.readFileSync('assets/js/tools/country-suite-factory.js', 'utf8');
  const requiredTokens = [
    'ValidoHubCountrySuiteFactory',
    'validateSuiteConfig',
    'createSuite',
    'csf-hero',
    'csf-result-card',
    'csf-breakdown',
    'csf-quality',
    'csf-advanced',
    'csf-promoted-shell',
    "closest('.workbench-card')",
    'font-size: clamp(1.32rem, 1.75vw, 1.68rem)',
    'min-height: 8.25rem'
  ];
  for (const token of requiredTokens) {
    if (!factory.includes(token)) failures.push(`factory is missing token: ${token}`);
  }
}

const existingSuites = [
  'assets/js/tools/brazil-suite.js',
  'assets/js/tools/poland-suite.js',
  'assets/js/tools/poland-expansion.js',
  'assets/js/tools/poland-baseline.js',
  'assets/js/tools/france-suite.js',
  'assets/js/tools/netherlands-suite.js'
];

for (const file of existingSuites) {
  if (!fs.existsSync(file)) continue;
  const text = fs.readFileSync(file, 'utf8');
  if (text.includes('ValidoHubCountrySuiteFactory') || text.includes('country-suite-factory')) {
    failures.push(`${file} must not import or call the additive Country Suite Factory without an explicit migration task`);
  }
}

if (fs.existsSync('scripts/build-all.mjs')) {
  const build = fs.readFileSync('scripts/build-all.mjs', 'utf8');
  for (const token of ['FACTORY_TOOL_ALGORITHMS', 'collapseFactoryWorkbenchShell', 'csf-static-host']) {
    if (!build.includes(token)) failures.push(`build pipeline missing factory shell guard token: ${token}`);
  }
  const forbiddenMappings = [
    "'validohub.brazil-suite': 'country-suite-factory.js'",
    "'validohub.poland-suite': 'country-suite-factory.js'",
    "'validohub.france-suite': 'country-suite-factory.js'",
    "'validohub.netherlands-suite': 'country-suite-factory.js'"
  ];
  for (const token of forbiddenMappings) {
    if (build.includes(token)) failures.push(`existing country suite must not be remapped to factory: ${token}`);
  }
}

if (fs.existsSync('docs/product/COUNTRY_SUITE_FACTORY_SPEC.md')) {
  const spec = fs.readFileSync('docs/product/COUNTRY_SUITE_FACTORY_SPEC.md', 'utf8');
  for (const token of ['Additive-only', 'Do Not Migrate Existing Countries', 'Brazil-scale compact shell', 'Required Tool Config']) {
    if (!spec.includes(token)) failures.push(`factory spec missing section/token: ${token}`);
  }
}

const generatedSwissDir = 'generated/validohub/en/switzerland';
const generatedSwissHub = 'generated/validohub/en/switzerland/index.html';
if (fs.existsSync(generatedSwissHub)) {
  const hubHtml = fs.readFileSync(generatedSwissHub, 'utf8');
  if (/class="[^"]*vh-country-info-card[^"]*"[\s\S]*?<h3>\s*<\/h3>/.test(hubHtml)) {
    failures.push('Swiss hub must not render empty country info-card titles');
  }
  if (/class="[^"]*vh-country-info-card[^"]*"[\s\S]*?<p class="vh-(?:mt-xs vh-mb-xs|mb-xs vh-mt-xs)">\s*<\/p>/.test(hubHtml)) {
    failures.push('Swiss hub must not render empty country info-card summaries');
  }
}

if (fs.existsSync(generatedSwissDir)) {
  const entries = fs.readdirSync(generatedSwissDir)
    .filter((entry) => entry.startsWith('switzerland-'))
    .filter((entry) => fs.existsSync(`${generatedSwissDir}/${entry}/index.html`));
  for (const entry of entries) {
    const html = fs.readFileSync(`${generatedSwissDir}/${entry}/index.html`, 'utf8');
    const factoryIndex = html.search(/<script src="\/assets\/js\/tools\/country-suite-factory\.js(?:\?[^"]*)?"><\/script>/);
    const suiteIndex = html.search(/<script src="\/assets\/js\/tools\/switzerland-suite\.js(?:\?[^"]*)?"><\/script>/);
    if (factoryIndex === -1) failures.push(`${entry}: missing country-suite-factory.js in generated Swiss page`);
    if (suiteIndex === -1) failures.push(`${entry}: missing switzerland-suite.js in generated Swiss page`);
    if (factoryIndex !== -1 && suiteIndex !== -1 && factoryIndex > suiteIndex) {
      failures.push(`${entry}: switzerland-suite.js loads before country-suite-factory.js`);
    }
    if (html.includes('class="workbench-heading"') || html.includes('>Run the tool<')) {
      failures.push(`${entry}: generated Swiss factory page must not ship the generic Run the tool shell`);
    }
  }
}

if (failures.length) {
  console.error('Country Suite Factory audit failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Country Suite Factory audit passed.');
