# Factory Tax Business Identifier Gold Pass

Date: 2026-07-27

## Why This Exists

Many generated country tools in the VAT/EORI/company/register class looked like generic validators with weak `tax evidence` cards. The user asked to promote country tools toward the Pix/CURP/Spain ID level wherever the public format allows useful local behavior.

## Scope

- Runtime: `assets/js/tools/country-suite-factory.js`.
- Targeted generated tool kinds: `company`, `vat`, `register`, `eori`.
- Count at implementation time: 629 targeted identifier tools across 190 generated country suites.
- Explicitly excluded from this pass: tax-rate, tax-return, invoice, onboarding, audit, company suffix, payroll, document, amount, date, and remittance workflows.

## Implemented Capabilities

- Route-prefix inference for VAT/EORI/company evidence.
- Valid-sample prefix fallback for generated suites that mount only `country.slug` and `country.name`.
- Local type-marker preservation for bodies such as `U`, `MVA`, branch/type letters, or customs markers.
- Tax/business body, registry/root block, entity/body block, and control/check-hint slicing.
- Repeated-placeholder rejection.
- Stronger parser replay where existing profile-backed company/tax logic is safe to reuse.
- Masked developer JSON fields with expected/detected prefix evidence.
- Compact tax/business input rail: route prefix, local label, replay mode, and official boundary.
- Negative scope guard so non-identifier tax workflows keep their own analyzer behavior.

## Boundaries

- Passing local structure is not live VAT validity, EORI authorization, tax filing status, company existence, company ownership, or registry standing.
- Official systems remain the source of truth for regulated status and live lookup.
- This is a factory floor, not a claim that every local VAT/company format now has a fully bespoke national checksum lab.

## QA

- `node --check assets/js/tools/country-suite-factory.js`
- `node --check scripts/build-all.mjs`
- `node --check scripts/build-country-dev.mjs`
- `node --check scripts/build-tools-dev.mjs`
- Targeted count script confirmed 629 `company/vat/register/eori` tools across 190 suites.
- `npm run build:country -- --country germany --locales en`
- `npm run build:country -- --country austria --locales en`
- `npm run build:country -- --country belgium --locales en`
- `npm run build:country -- --country algeria --locales en`

Browser smoke confirmed:

- Germany VAT: rail present, `DE` expected/detected prefix in JSON, valid sample passes, wrong-prefix sample reviews, no horizontal overflow.
- Austria EORI: rail present, `AT` expected/detected prefix in JSON, valid sample passes, wrong-prefix sample reviews, no horizontal overflow.
- Belgium VAT: rail present, `BE` expected/detected prefix in JSON, valid sample passes, wrong-prefix sample reviews, no horizontal overflow.
- Algeria generic tax: rail present, `DZ` expected/detected prefix in JSON, valid sample passes, wrong-prefix sample reviews, no horizontal overflow.
- Algeria tax-rate sanity helper: no tax/business identifier rail, confirming the matcher does not swallow adjacent tax workflows.

## Open Risks

- Some countries still need bespoke local checksum/control algorithms beyond route prefix and structural body analysis.
- Full build was intentionally not run.
- Existing broad generated-state audit backlog remains separate from this targeted pass.
