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

const factoryGeneratedSuites = [
  { slug: 'switzerland', runtime: 'switzerland-suite.js', label: 'Swiss' },
  { slug: 'germany', runtime: 'germany-suite.js', label: 'German' }
];

for (const suite of factoryGeneratedSuites) {
  const generatedDir = 'generated/validohub/en/' + suite.slug;
  const generatedHub = generatedDir + '/index.html';
  if (fs.existsSync(generatedHub)) {
    const hubHtml = fs.readFileSync(generatedHub, 'utf8');
    if (/class="[^"]*vh-country-info-card[^"]*"[\s\S]*?<h3>\s*<\/h3>/.test(hubHtml)) {
      failures.push(suite.label + ' hub must not render empty country info-card titles');
    }
    if (/class="[^"]*vh-country-info-card[^"]*"[\s\S]*?<p class="vh-(?:mt-xs vh-mb-xs|mb-xs vh-mt-xs)">\s*<\/p>/.test(hubHtml)) {
      failures.push(suite.label + ' hub must not render empty country info-card summaries');
    }
  }
  if (fs.existsSync(generatedDir)) {
    const entries = fs.readdirSync(generatedDir)
      .filter((entry) => entry.startsWith(suite.slug + '-'))
      .filter((entry) => fs.existsSync(generatedDir + '/' + entry + '/index.html'));
    for (const entry of entries) {
      const html = fs.readFileSync(generatedDir + '/' + entry + '/index.html', 'utf8');
      const factoryIndex = html.search(/<script src="\/assets\/js\/tools\/country-suite-factory\.js(?:\?[^"]*)?"><\/script>/);
      const runtimeEsc = suite.runtime.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const suitePattern = new RegExp('<script src="/assets/js/tools/' + runtimeEsc + '(?:\\?[^"]*)?"></script>');
      const suiteIndex = html.search(suitePattern);
      if (factoryIndex === -1) failures.push(entry + ': missing country-suite-factory.js in generated factory page');
      if (suiteIndex === -1) failures.push(entry + ': missing ' + suite.runtime + ' in generated factory page');
      if (factoryIndex !== -1 && suiteIndex !== -1 && factoryIndex > suiteIndex) {
        failures.push(entry + ': ' + suite.runtime + ' loads before country-suite-factory.js');
      }
      if (html.includes('class="workbench-heading"') || html.includes('>Run the tool<')) {
        failures.push(entry + ': generated factory page must not ship the generic Run the tool shell');
      }
    }
  }
}

if (failures.length) {
  console.error('Country Suite Factory audit failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Country Suite Factory audit passed.');
