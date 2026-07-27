# Round 4 Route-Bound Rich Lab Primary Log

Date: 2026-07-27

## Goal

Promote the 281 route-bound country tool profiles so they no longer feel like a weak lower-page overlay. The route should open with a useful browser lab in the main workbench host, following the Pix/CURP direction as far as each format family allows.

## Implementation

- Updated `assets/js/tools/gold-tools-lab.js` to version `2026-07-27-country-rich-lab-v3`.
- The runtime now replaces the country-suite route host contents with a connected rich lab instead of appending a separate block below the factory workbench.
- Added a primary page flow: source links, valid/invalid/generate/batch samples, input, local result, evidence pipeline, anatomy fields, full-width anatomy table, replay table, implementation lint, official sources/boundary, integration traps, and developer snapshot.
- Added family-specific copy and traps for IBAN, BIC/SWIFT, phone, postal, passport-like document numbers, vehicle plates, invoice references, payment references, and bank/account references.
- Corrected broad tax/business classification so AFM/NIF/PIN-style profiles use tax/business language instead of identity-proof language.
- Fixed route-generated titles so `united-states-phone-number-validator` becomes `United States Phone Number Validator` instead of an over-trimmed generic title.

## Verification

- `node --check assets/js/tools/gold-tools-lab.js`
- `npm run build:country -- --country greece --locales en`
- Confirmed generated runtime sync:
  - `assets/js/tools/gold-tools-lab.js`
  - `generated/validohub/assets/js/tools/gold-tools-lab.js`
- Playwright DOM smoke on local static preview:
  - `/en/greece/greece-vat-id-validator/`
  - `/en/germany/germany-iban-validator/`
  - `/en/united-states/united-states-phone-number-validator/`
- Checked that each page has `[data-country-rich-lab]`, visible rich sections, corrected titles, and no page-level horizontal overflow.

## Local Preview URLs

- `http://127.0.0.1:8134/en/greece/greece-vat-id-validator/`
- `http://127.0.0.1:8134/en/germany/germany-iban-validator/`
- `http://127.0.0.1:8134/en/united-states/united-states-phone-number-validator/`

## Remaining Risk

This pass upgrades the shared route-bound runtime and gives all 281 profiles a much richer primary page. It is still a family-driven implementation. Future tool-specific work should keep deepening individual formats where official/public algorithms support more than the shared family analyzer currently exposes.
