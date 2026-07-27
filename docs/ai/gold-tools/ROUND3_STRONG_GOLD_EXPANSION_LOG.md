# Gold Tools Round 3 Strong Expansion Log

Date: 2026-07-27

Purpose: expand the shared Gold browser-lab overlay beyond the flagship identifiers into the next tier of high-value local developer tools: tax/company references, bank/payment references, BIC/SWIFT, phone, postal, passport, vehicle, invoice, customs, procurement, and logistics formats.

## Decision

Use the shared `assets/js/tools/gold-tools-lab.js` overlay for this broad tier. These tools are intentionally not all bespoke Pix/CURP-level labs, but they must still provide real developer utility:

- Normalize and parse visible local structure.
- Generate safe fixtures.
- Mask output for logs.
- Separate display punctuation from storage keys.
- Provide developer JSON.
- Link to official or standards context where a direct country registry source is not appropriate.
- Keep official status, ownership, identity, deliverability, account reachability, and settlement boundaries explicit.

## Coverage

The shared Gold profile matrix now contains 281 route-bound profiles.

Round 3 added 171 profiles on top of the Round 2 matrix.

New covered families include:

- Postal-code workbenches.
- Phone / E.164 formatting workbenches.
- BIC/SWIFT inspectors.
- Passport and MRZ-adjacent number helpers.
- Vehicle-plate inspectors.
- Invoice-number and e-invoicing readiness helpers.
- Bank-account and domestic-account references.
- Payment-reference helpers.
- Postal-tracking references.
- Customs-importer references.
- Procurement identifiers.

## New Shared Analyzers

Round 3 added browser-side analyzers for:

- `bic`: ISO 9362-style BIC/SWIFT anatomy with bank, country, location, and branch segments.
- `phone-local`: country calling-code, normalized digits, E.164 length boundary, and masked preview.
- `postal-local`: country context, sample pattern, normalized display, and length evidence.
- `passport-lite`: document-number shape, country context, length, and official document-status boundary.
- `vehicle-plate`: normalized display form, compact key, country context, and registration/owner boundary.
- Reference-family analyzers for invoice, payment, tracking, customs, procurement, and bank/account references.

## Build Wiring

Updated:

- `scripts/build-country-dev.mjs`
- `scripts/build-all.mjs`

Five older standalone/legacy routes needed route-specific Gold overlay overrides because their algorithm IDs are not country-suite IDs:

- `/en/poland/poland-invoice-number-helper/`
- `/en/poland/poland-mrz-passport-id-parser/`
- `/en/poland/poland-passport-number-inspector/`
- `/en/poland/poland-swift-bic-inspector/`
- `/en/brazil/brazil-iban-validator/`

These overrides are route-specific on purpose. Do not broaden them to whole legacy algorithm classes unless the affected pages are audited.

## QA Completed

- `node --check assets/js/tools/gold-tools-lab.js`
- `node --check scripts/build-country-dev.mjs`
- `node --check scripts/build-all.mjs`
- VM replay of all 281 profile samples:
  - 281 / 281 valid fixtures pass.
  - 281 / 281 invalid fixtures review/fail.
- Route resolution check:
  - 281 / 281 profile slugs resolve to generated English routes.
- Script injection check:
  - 281 / 281 profile routes have the expected Gold runtime behavior.
- Generated runtime asset matches source.
- Scoped sequential country builds with `--locales en` were run for Poland and Brazil to refresh older standalone routes. No full build was run.

## Boundaries

- This round is a strong broad Gold layer, not a claim that every page is a bespoke flagship.
- Use this overlay for high-value normalization/parsing/debugging where local structure is useful.
- Promote individual tools to bespoke runtimes only when the format supports a richer Pix/CURP/Spain-level experience.
- Never present local format success as proof of official registration, document validity, bank-account ownership, postal deliverability, payment settlement, or identity.
