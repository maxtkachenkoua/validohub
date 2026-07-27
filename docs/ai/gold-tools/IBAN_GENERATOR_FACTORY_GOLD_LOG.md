# Factory IBAN Generator Gold Pass

Date: 2026-07-27

## Why This Exists

Country-scoped IBAN generator routes looked like generic validators: oversized blank areas, weak field layout, and a primary `Validate` action even when the user expected generation. The product direction is to promote country tools toward the Pix/CURP/Spain ID standard wherever the public format allows it.

## Scope

- Runtime: `assets/js/tools/country-suite-factory.js`.
- Build wiring: `scripts/build-all.mjs`, `scripts/build-country-dev.mjs`.
- Coverage: 44 factory country IBAN generator profiles, including Albania, Germany, Spain, Switzerland, Poland, Netherlands, France, Italy, United Kingdom, Ukraine, and other IBAN markets present in the generated factory suites.

## Implemented Capabilities

- Route-locked country code and expected IBAN length per country profile.
- Local BBAN anatomy slices where the IBAN registry format gives meaningful fields.
- Fresh structural IBAN generation on every normal `Generate` click.
- MOD-97 check digit generation and replay.
- Grouped, compact, and masked outputs.
- Current-result developer JSON copy next to the raw JSON block.
- Compact IBAN generator fixture bar for route country, expected length, and generation mode.
- Stable hover/focus states without vertical layout jumps in dense factory controls.
- Review preservation for invalid, short, and wrong-prefix fixtures.

## Boundaries

- Generated IBANs are structural fixtures only.
- Bank existence, account ownership, payment acceptance, sanctions/tax status, and live registry state are official-system checks.
- Some countries have additional domestic BBAN rules beyond MOD-97 and length. Those remain candidates for bespoke banking labs when the local public specification supports richer browser replay.

## QA

- `node --check assets/js/tools/country-suite-factory.js`
- `node --check scripts/build-all.mjs`
- `node --check scripts/build-country-dev.mjs`
- `node --check scripts/build-tools-dev.mjs`
- `npm run build:country -- --country albania --locales en`
- `npm run build:country -- --country germany --locales en`
- `npm run build:country -- --country spain --locales en`
- `npm run build:country -- --country switzerland --locales en`
- Browser smoke on:
  - `/en/albania/albania-iban-generator/`
  - `/en/germany/germany-iban-generator/`
  - `/en/spain/spain-iban-generator/`
  - `/en/switzerland/switzerland-iban-generator/`

Browser smoke confirmed route kind `ibangenerator`, fixture bar, `Generate` CTA, fresh generated value per click, exact route-country length, review samples preserved, developer JSON copy button, textarea compactness, and zero horizontal overflow.

## Open Risks

- `scripts/audit-country-suite-factory.mjs` still reports broader generated-state backlog unrelated to this pass, including legacy mapping assumptions and stale generated South America preview pages. Do not treat that audit failure as caused by the IBAN generator fix.
- Full build was intentionally not run.
