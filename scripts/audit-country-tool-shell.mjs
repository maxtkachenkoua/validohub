import fs from 'node:fs';

const checks = [
  {
    file: 'assets/js/tools/france-suite.js',
    mustInclude: [
      'font-size:clamp(1.32rem,1.75vw,1.72rem)',
      'min-width:56px;height:56px',
      'font:650 .92rem/1.42',
      'padding:16px;box-shadow'
    ],
    mustNotInclude: [
      'font-size:clamp(1.7rem,3vw,2.7rem)',
      'min-width:74px;height:74px',
      'padding:30px;margin:0 0 28px',
      'width:54px;height:54px'
    ]
  },
  {
    file: 'assets/js/tools/netherlands-suite.js',
    mustInclude: [
      'font-size: clamp(1.32rem, 1.75vw, 1.68rem)',
      'min-height: 8.25rem',
      'padding: 1.15rem'
    ],
    mustNotInclude: [
      'font-size:clamp(2rem,4vw,4rem)',
      'font-size: clamp(2rem, 4vw, 4rem)',
      'min-height:12rem',
      'min-height: 12rem'
    ]
  },
  {
    file: 'assets/css/workbench.css',
    mustInclude: [
      'grid-template-columns: minmax(3.65rem, auto) minmax(0, 1fr) minmax(13rem, 0.32fr);',
      'font-size: clamp(1.22rem, 1.6vw, 1.62rem);',
      'min-width: 3.65rem;',
      'font-size: clamp(0.88rem, 1vw, 0.96rem);'
    ],
    mustNotInclude: [
      'grid-template-columns: minmax(4.75rem, auto) minmax(0, 1fr) minmax(14rem, 0.34fr);',
      'font-size: clamp(1.35rem, 2vw, 2.05rem);',
      'min-width: 4.75rem;'
    ]
  },
  {
    file: 'docs/product/COUNTRY_SUITE_GENERATION_GUARDRAILS.md',
    mustInclude: [
      'compact Brazil workbench rhythm',
      'Compare at least one identifier/tax tool against a Brazil CPF/CNPJ workbench',
      'Netherlands initially shipped country tool headers and tool-shell typography too large'
    ],
    mustNotInclude: []
  }
];

const failures = [];

for (const check of checks) {
  const text = fs.readFileSync(check.file, 'utf8');
  for (const token of check.mustInclude) {
    if (!text.includes(token)) {
      failures.push(`${check.file}: missing required compact-shell token: ${token}`);
    }
  }
  for (const token of check.mustNotInclude) {
    if (text.includes(token)) {
      failures.push(`${check.file}: contains oversized/regression token: ${token}`);
    }
  }
}

if (failures.length) {
  console.error('Country tool shell audit failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Country tool shell audit passed.');
