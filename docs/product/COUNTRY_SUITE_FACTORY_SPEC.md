# Country Suite Factory V1

Country Suite Factory V1 is the additive-only template for future complete country tool suites. It exists so a future prompt such as "make Switzerland fully premium" can start from a reusable Brazil-scale workbench shell instead of inventing another one-off runtime.

Switzerland Premium Country Suite V1 is the first full factory consumer. Germany Premium Country Suite V1 is the second full factory consumer and the benchmark for upgrading an existing generic country utility route into a factory-based suite route. It proves the additive path for future countries while leaving accepted Brazil, Poland, France, and Netherlands runtimes unmigrated.

## Additive-only

- Source runtime: `assets/js/tools/country-suite-factory.js`
- Audit: `scripts/audit-country-suite-factory.mjs`
- Factory namespace: `window.ValidoHubCountrySuiteFactory`
- The factory does not mount by itself.
- A future country suite must explicitly call `ValidoHubCountrySuiteFactory.createSuite(config)` and mount it on its own tool page root.
- Generated pages must load the factory before the country runtime. A factory-based suite is not premium if users can land on, briefly flash, or visually keep the generic "Run the tool" fallback because the country runtime waits for a late dependency or mounts inside the old shell.
- Build/post-processing must collapse factory-based generated workbenches to a minimal `csf-static-host` before scripts run. The country runtime may promote a legacy `.workbench-card` as a fallback, but finished generated pages must not ship `.workbench-heading` or literal `>Run the tool<` for factory-based routes.
- Do not map existing country suites to this factory without a separate user-approved migration task.

## Do Not Migrate Existing Countries

Brazil, Poland, France, and Netherlands are accepted country/tool baselines with their own runtimes. Country Suite Factory V1 must not change those runtimes, script mappings, route rendering, or CSS behavior.

Existing suites may be audited against the standards, but not converted automatically:

- `assets/js/tools/brazil-suite.js`
- `assets/js/tools/poland-suite.js`
- `assets/js/tools/poland-expansion.js`
- `assets/js/tools/poland-baseline.js`
- `assets/js/tools/france-suite.js`
- `assets/js/tools/netherlands-suite.js`

Future countries can use the factory from the start. Existing countries can migrate later only if the user explicitly asks for one country at a time.

## Brazil-scale compact shell

The factory encodes the compact Brazil CPF/CNPJ workbench rhythm:

- compact branded header, not landing-page hero scale
- short mark/code badge
- small uppercase country workbench kicker
- concise title and summary
- short sample selector labels
- input area directly after the header
- immediate result card after input
- validation pipeline
- dedicated field breakdown panel
- named field breakdown data for every tool, including broad text/data tools via detected fields or evidence slices
- quality notes
- expanded advanced analysis/developer payload
- local wrapping/scrolling for long values

Country hub heroes may be large and expressive. Individual country tools must stay dense, premium, and immediately usable.

## Required Tool Config

Every tool config passed to the factory must include:

- `id`: route/tool slug
- `name`: visible tool title
- `code`: compact mark, usually 2-5 characters
- `summary`: tool-specific copy, not generic repeated copy
- `samples`: at least one short-label sample; labels must not be raw payloads
- `qualityNotes`: at least four notes covering privacy, official lookup boundary, fixture safety, and developer handling
- `boundaries`: explicit official/live lookup boundaries
- `i18n` coverage for every supported locale whenever the string is visible in the browser workbench
- analyzer output with `fields`, `breakdownTitle`, `breakdownSummary`, and non-empty `breakdown` slices. A generic result grid without a named breakdown panel is not premium.

Recommended tool config:

```js
{
  id: 'switzerland-uid-validator',
  name: 'Swiss UID Validator & Explainer',
  code: 'UID',
  summary: 'Validate Swiss UID syntax, normalize CHE prefixes, inspect VAT suffixes, and prepare safe test payloads.',
  samples: [
    { label: 'Valid UID VAT', value: 'CHE-123.456.789 MWST' },
    { label: 'Missing suffix', value: 'CHE123456789' }
  ],
  boundaries: [
    'Official registry status requires the responsible Swiss public system.'
  ],
  qualityNotes: [
    { title: 'Privacy boundary', text: 'Input is analyzed locally in this browser.' },
    { title: 'Official lookup boundary', text: 'Official company existence is not proven offline.' },
    { title: 'Fixture safety', text: 'Samples are safe fixtures, not proof of live status.' },
    { title: 'Developer handling', text: 'Use normalized values for forms and masked values for logs.' }
  ],
  analyze(tool, input, suite) {
    return {
      status: 'success',
      headline: 'Swiss UID format looks structurally valid.',
      detail: 'Browser-only checks completed.',
      primary: 'CHE-123.456.789 MWST',
      normalized: 'CHE123456789MWST',
      checks: [],
      fields: [],
      breakdownTitle: 'Swiss UID field breakdown',
      breakdownSummary: 'CHE prefix, numeric body, and VAT suffix.',
      breakdown: [],
      qualityNotes: tool.qualityNotes,
      developerJson: {}
    };
  }
}
```

The fallback analyzer exists only to make an unfinished future suite visibly safe during development. A finished premium country suite must provide tool-specific analyzers and field breakdowns for every tool; broad developer/data helpers should expose detected evidence groups instead of omitting the breakdown.

## Localization Contract

A future prompt such as "make Switzerland fully premium" includes localization by default. This is not limited to route titles, meta descriptions, or static markdown. Factory-based country suites must localize the complete user-facing workbench surface for every supported ValidoHub locale:

- hero kicker, title, summary, chips, and sample/related-tool labels
- input labels, placeholders, buttons, helper text, empty states, and status pills
- validation status, errors, diagnostics, and success/failure headlines
- result card labels, field breakdown labels, pipeline labels, and quality notes
- advanced analysis headings, developer payload labels, copy/download labels, and browser-only boundary copy

Do not hard-code English strings inside a finished country suite runtime unless the string is a protocol name, official abbreviation, sample identifier, code literal, or intentionally untranslated local term. Use a suite-level `i18n`/`localeStrings` dictionary, localized tool config, or another documented localization bridge so the workbench can render the same premium experience on every supported locale route.

Minimum factory-localization shape:

```js
const suite = ValidoHubCountrySuiteFactory.createSuite({
  suiteId: 'switzerland-suite',
  country: { slug: 'switzerland', name: 'Switzerland' },
  i18n: {
    en: {
      validate: 'Validate',
      copyResult: 'Copy result',
      qualityNotes: 'Quality notes'
    },
    de: {
      validate: 'Prufen',
      copyResult: 'Ergebnis kopieren',
      qualityNotes: 'Qualitatshinweise'
    }
  },
  tools: []
});
```

The final implementation must cover all supported locales, not only the examples shown above. If a new country suite cannot localize runtime strings yet, do not call it complete; document the gap and keep it out of the "fully premium" claim.

## Suite Config

```js
const suite = ValidoHubCountrySuiteFactory.createSuite({
  suiteId: 'switzerland-suite',
  country: {
    slug: 'switzerland',
    name: 'Switzerland'
  },
  theme: {
    accent: '#dc2626',
    accent2: '#111827',
    accent3: '#f59e0b'
  },
  tools: [/* country tools */]
});

suite.mount('[data-country-suite-id="switzerland-suite"]');
```

The factory is intentionally framework-free and browser-only. It does not need Valido Engine changes.

## Required Audits

Before calling a future factory-based country complete:

1. Run `node --check assets/js/tools/country-suite-factory.js`.
2. Run `node scripts/audit-country-suite-factory.mjs`.
3. Run `node scripts/audit-country-tool-shell.mjs`.
4. Run `node scripts/audit-country-field-breakdown.mjs`.
5. Build ValidoHub and confirm `Build Integrity Verification: PASSED`.
6. Browser-check every tool in the new factory-based country suite for mounted premium shell blocks: `.csf-hero`, `.csf-result-card`, `.csf-pipeline`, `.csf-breakdown`, `.csf-quality`, and `.csf-advanced`.
7. Confirm generated factory pages do not contain `.workbench-heading`, literal `>Run the tool<`, or a visible generic workbench header above the premium shell.
8. Confirm the country hub has no empty info-card titles or summaries in official sources, ecosystem, localization notes, or similar lower-page card grids.
9. Confirm generated output under `generated/validohub` is not committed.
10. Confirm Valido Engine remains untouched unless a truly generic platform capability was required.

The factory audit also asserts that existing accepted country suites do not import or call the factory, that generated factory country pages keep dependency-first script order, that generated factory country pages do not ship the generic workbench header, and that factory country hubs do not ship empty info cards.
