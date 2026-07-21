# Country Suite Factory V1

Country Suite Factory V1 is the additive-only template for future complete country tool suites. It exists so a future prompt such as "make Switzerland fully premium" can start from a reusable Brazil-scale workbench shell instead of inventing another one-off runtime.

Switzerland Premium Country Suite V1 is the first full factory consumer. Germany Premium Country Suite V1 is the second full factory consumer and the benchmark for upgrading an existing generic country utility route into a factory-based suite route. Italy Premium Country Suite V1 is the third full factory consumer and proves the same template for a greenfield country with tax, e-invoicing, banking, locale, privacy, and developer-data coverage. These suites prove the additive path for future countries while leaving accepted Brazil, Poland, France, and Netherlands runtimes unmigrated.

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
- clear valid/invalid/edge sample buttons instead of confusing native sample dropdowns
- same-country related links that navigate; no inert related-tool selects
- success/neutral primary action styling; red is reserved for review/error states
- compact/collapsible history, batch, API preview, raw JSON, and related-tool diagnostics

## PESEL-Rich Debug Standard

Factory-based country tools must not stop at a basic result/pipeline/breakdown shell. Poland PESEL is the functional richness reference: future and existing factory suites must provide the strongest domain-appropriate equivalent of that experience.

Every factory-rendered country tool must include:

- success-first presets and recent local validation history
- batch validation for local fixture lists when line-based inputs make sense
- a visible PESEL-depth premium debug layer near the top of the tool with browser history, multi-row diagnostics, API preview, raw JSON/audit output, and country-local related tools
- immediate result cards before the pipeline
- validation pipeline with meaningful pass/review states
- field/evidence breakdown plus a visual token strip for quick scanning
- calculation or parser debugger using the available checks and field slices
- repair suggestions for invalid or edge-case input
- raw JSON/audit output for developer workflows
- developer API preview that reflects the active country/tool route
- quality notes and official/live lookup boundaries

The premium debug layer must be discoverable without swallowing the page. Recent validations, batch diagnostics, API preview, raw JSON, and local related links may live in a compact `<details>`/accordion shell, but they must remain available on every factory-rendered country tool.

Factory sample UX must present multiple purposeful examples: at least one valid sample and, where useful, invalid/short/wrong-prefix samples. Do not use visible labels like `Review sample` in finished tools, and never put raw IBAN/CSV/JSON/payload values in sample labels.

Sample UX is part of validation correctness. The first valid sample must pass; invalid, short, bad-country, wrong-prefix, bad-checksum, and review/edge examples must produce review/error states. The factory must never classify sample labels with a broad `/valid/` check because `Invalid` contains `valid`. Finished factory tools should expose several paste examples through clear chips/buttons with hover, focus, active, and selected affordances.

Field/evidence breakdown rendering must have one clear title hierarchy. Use a single main breakdown heading, optional token-strip subpanel, segment tiles, and detailed cards with enough padding and wrapping. Do not ship duplicate consecutive headings such as `Evidence breakdown` plus `Identifier breakdown` before the same fields.

Quality notes and repair suggestions must be specific and useful for the active country/tool. Repair suggestions should be interactive buttons where possible: load valid fixture, load invalid fixture, try short sample, run sample batch, or copy normalized output. Advanced debug panels should carry one local badge only.

The exact internals must fit the domain. Identifier and banking tools should expose checksum, body, prefix, branch, account, or control-digit evidence. CSV, OCR, API, form-field, checklist, privacy, locale, and data-quality tools should expose detected evidence groups, parser stages, normalized fields, warning classes, and export payloads. A country tool is not premium if it has only a large input, generic buttons, and a short text output.

Factory-based countries must receive this rich layer from `assets/js/tools/country-suite-factory.js` itself, not from one-off per-country patches. The accepted France/Netherlands/Brazil/Poland bespoke suites use `country-legacy-rich-layer.js` as a bridge; factory suites must expose the same user-facing depth natively through `csf-rich-lab`, so Austria, Czechia, Norway, Sweden, Denmark, Finland, and future factory countries all improve together.

The rich shell is not enough. Factory suites must also provide country-aware analyzer intelligence through `COUNTRY_INTELLIGENCE_PROFILES` or a tool-specific analyzer. National ID, social ID, company-register, VAT, EORI, and equivalent structured tools must decode local fields, replay local control/checksum evidence when the format has one, produce named pipeline checks, and fill calculation/debug sections with local vocabulary. The generic fallback labels `identifier evidence`, `tax evidence`, `payment evidence`, and `workflow` are allowed only as an unfinished development fallback for broad text tools; they are a premium blocker for local ID/company/social/tax tools. Czech Rodne cislo is the named regression case: it must show date block, decoded birth date, gender/month evidence, serial/control block, and modulo-11 status rather than generic evidence cards.

Country hub heroes may be large and expressive. Individual country tools must stay dense, premium, and immediately usable.

## Tool Count Contract

Future country suites must optimize for maximum local developer utility, not a fixed tool count. Spain, Italy, Switzerland, and Germany show that roughly 60 tools can be a healthy premium density, but 60 is not a cap and not an artificial requirement.

- Add more than 60 tools when the country has more genuinely useful offline/browser-only local workflows.
- Ship fewer than 60 tools when the country does not honestly support that many strong workbench cases.
- Never pad a suite with generic, duplicate, or low-value tools to hit a number.
- Every accepted tool must have local relevance, specific samples, real analyzer behavior, field breakdown, quality notes, developer payload, localization, and explicit official/live lookup boundaries.

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
- IBAN tooling must include both validator and generator coverage. A full country with IBAN support needs a country-scoped `*-iban-generator` or a documented country route backed by the global `iban-generator`, with generated check digits, BBAN/check-digit breakdown, MOD-97 replay, masked output, and official bank-ownership boundary notes.
- IBAN generators must create a fresh structural fixture on each Generate click. Country-scoped generator routes must infer the local country from the route and local profile instead of falling back to the global default sample.

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

Before calling a future factory-based country complete, the country must also satisfy `docs/product/PREMIUM_COUNTRY_CONTRACT.md` and `npm run audit:country-premium -- --country <slug>`.

1. Run `node --check assets/js/tools/country-suite-factory.js`.
2. Run `node scripts/audit-country-suite-factory.mjs`.
3. Run `node scripts/audit-country-tool-shell.mjs`.
4. Run `node scripts/audit-country-field-breakdown.mjs`.
5. Run `npm run audit:country-premium -- --country <slug>`.
6. Build ValidoHub and confirm `Build Integrity Verification: PASSED`.
7. Browser-check every tool in the new factory-based country suite for mounted premium shell blocks: `.csf-hero`, `.csf-result-card`, `.csf-pipeline`, `.csf-breakdown`, `.csf-quality`, and `.csf-advanced`.
8. Confirm generated factory pages do not contain `.workbench-heading`, literal `>Run the tool<`, or a visible generic workbench header above the premium shell.
9. Confirm the country hub has no empty info-card titles or summaries in official sources, ecosystem, localization notes, or similar lower-page card grids.
10. Confirm generated output under `generated/validohub` is not committed.
11. Confirm Valido Engine remains untouched unless a truly generic platform capability was required.

The factory audit also asserts that existing accepted country suites do not import or call the factory, that generated factory country pages keep dependency-first script order, that generated factory country pages do not ship the generic workbench header, and that factory country hubs do not ship empty info cards.
