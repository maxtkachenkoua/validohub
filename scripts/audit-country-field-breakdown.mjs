import fs from 'node:fs';

const failures = [];

const suiteChecks = [
  {
    country: 'Brazil',
    files: ['assets/js/tools/brazil-suite.js'],
    tokens: ['buildBreakdown', 'r.breakdown', 'br-breakdown', 'br-token-strip', 'breakdown:r.breakdown']
  },
  {
    country: 'Poland',
    files: [
      'assets/js/tools/poland-suite.js',
      'assets/js/tools/poland-expansion.js',
      'assets/js/tools/poland-baseline.js'
    ],
    fileTokens: {
      'assets/js/tools/poland-suite.js': ['breakdownHtml', 'Identifier Breakdown', 'poland-breakdown-card', 'poland-field-table'],
      'assets/js/tools/poland-expansion.js': ['data-plx-breakdown', 'renderBreakdown', 'Field Breakdown', 'plx-fields'],
      'assets/js/tools/poland-baseline.js': ['data-plb-breakdown', 'renderBreakdown', 'Identifier breakdown', 'plb-fields']
    }
  },
  {
    country: 'France',
    files: ['assets/js/tools/france-suite.js'],
    tokens: ['breakdownFor', 'breakdownTitle', 'breakdownSummary', 'frs-breakdown', 'frs-segments', 'Field breakdown']
  },
  {
    country: 'Netherlands',
    files: ['assets/js/tools/netherlands-suite.js'],
    tokens: ['addBreakdown', 'breakdownTitle', 'breakdownSummary', 'nls-breakdown', 'nls-segments', 'Field breakdown']
  },
  {
    country: 'Switzerland',
    files: ['assets/js/tools/country-suite-factory.js', 'assets/js/tools/switzerland-suite.js'],
    fileTokens: {
      'assets/js/tools/country-suite-factory.js': ['csf-breakdown', 'csf-segments', 'breakdownTitle', 'breakdownSummary', 'fieldBreakdown'],
      'assets/js/tools/switzerland-suite.js': ['result.breakdown', 'breakdownTitle', 'breakdownSummary', 'fieldBreakdown', 'localStructuralSlices']
    }
  }
];

const countryToolChecks = [
  {
    country: 'Germany',
    file: 'assets/js/tools/generic-suite.js',
    tokens: ["DE: {", "slug: 'germany-iban-validator'", "countryName: 'Germany'", "['BLZ bank code'", "countryName + ' IBAN field breakdown'", 'breakdown: breakdown.concat']
  },
  {
    country: 'Spain',
    file: 'assets/js/tools/generic-suite.js',
    tokens: ["ES: {", "slug: 'spain-iban-validator'", "countryName: 'Spain'", "['CCC check digits'", "countryName + ' IBAN field breakdown'", 'breakdown: breakdown.concat']
  },
  {
    country: 'Spain',
    file: 'assets/js/tools/spain-id.js',
    tokens: ['data-spain-breakdown', 'renderBreakdown', 'breakdownHtml', 'Identifier Breakdown', 'spain-token-row', 'spain-detail-grid']
  }
];

function requireToken(file, text, token, country) {
  if (!text.includes(token)) failures.push(`${country}: ${file} missing field-breakdown token: ${token}`);
}

for (const suite of suiteChecks) {
  for (const file of suite.files) {
    if (!fs.existsSync(file)) {
      failures.push(`${suite.country}: missing suite file: ${file}`);
      continue;
    }
    const text = fs.readFileSync(file, 'utf8');
    const tokens = suite.fileTokens ? suite.fileTokens[file] : suite.tokens;
    for (const token of tokens || []) requireToken(file, text, token, suite.country);
  }
}

for (const check of countryToolChecks) {
  if (!fs.existsSync(check.file)) {
    failures.push(`${check.country}: missing country tool file: ${check.file}`);
    continue;
  }
  const text = fs.readFileSync(check.file, 'utf8');
  for (const token of check.tokens) requireToken(check.file, text, token, check.country);
}

const guardrailFile = 'docs/product/COUNTRY_SUITE_GENERATION_GUARDRAILS.md';
if (fs.existsSync(guardrailFile)) {
  const guardrails = fs.readFileSync(guardrailFile, 'utf8');
  for (const token of [
    'Dedicated field breakdown is mandatory',
    'A country suite is not Brazil-level premium if it only has generic result cards',
    'Run `npm run audit:country-suite`'
  ]) {
    requireToken(guardrailFile, guardrails, token, 'Guardrails');
  }
}

const factorySpec = 'docs/product/COUNTRY_SUITE_FACTORY_SPEC.md';
if (fs.existsSync(factorySpec)) {
  const spec = fs.readFileSync(factorySpec, 'utf8');
  for (const token of [
    'dedicated field breakdown panel',
    'breakdownTitle',
    'breakdownSummary',
    'breakdown'
  ]) {
    requireToken(factorySpec, spec, token, 'Factory spec');
  }
}

if (failures.length) {
  console.error('Country field breakdown audit failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Country field breakdown audit passed.');
