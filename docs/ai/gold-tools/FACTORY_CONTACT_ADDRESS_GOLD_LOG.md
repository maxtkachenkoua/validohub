# Factory Contact Address Gold Floor Log

Date: 2026-07-27

Scope:

- Runtime: `assets/js/tools/country-suite-factory.js`.
- Targeted generated tool kinds: `phone`, `postal`, and `address`.
- Count at implementation time: 834 tools across 190 country suites.
- Breakdown: 380 phone tools, 191 postal tools, 263 address tools.

What changed:

- Added a narrow contact/address analyzer that runs after the base suite analyzer and before the generic factory output is rendered.
- Phone tools now infer the expected calling code from the success sample, split calling code and national number evidence, generate an E.164-style preview, reject missing/too-short/placeholder input, and keep carrier/ownership/live reachability outside local claims.
- Postal/address tools now extract postal/address tokens, compare route sample shape against the current input shape, expose locality/street evidence when present, normalize whitespace, and keep official deliverability/geocoding outside local claims.
- Developer JSON now carries `parts`, `routeSample`, `masked`, checks, fields, and official-boundary notes for this family.
- The input surface now gets a compact route-context rail: calling code/postal shape/address sample, local sample, replay mode, and official boundary.
- Rail CSS was hardened to avoid collapsed cards and vertical text: full-width auto-fit grids, stable minimum card widths, local wrapping, and mobile one-column fallback.

Explicit boundaries:

- This is a factory floor, not a claim that every phone/postal/address route is bespoke Gold.
- It does not claim official postal deliverability, geocode existence, phone number ownership, carrier assignment, portability, identity, or live reachability.
- It intentionally skips region, municipality, transliteration, date, amount, tax, payment, document, and other non-contact/address tools.
- Richer route-bound Gold Lab tools continue to own their page when present; for example Canada postal is served by `assets/js/tools/gold-tools-lab.js`, not this factory rail.

Representative QA:

- `node --check assets/js/tools/country-suite-factory.js`
- Scoped builds, sequential only:
  - `npm run build:country -- --country algeria --locales en`
  - `npm run build:country -- --country japan --locales en`
  - `npm run build:country -- --country canada --locales en`
- Generated runtime sync:
  - `cmp -s assets/js/tools/country-suite-factory.js generated/validohub/assets/js/tools/country-suite-factory.js`
- Browser smoke on `http://127.0.0.1:8136`:
  - `/en/algeria/algeria-phone-number-validator/`
  - `/en/algeria/algeria-postal-code-validator/`
  - `/en/japan/japan-address-normalizer/`
  - `/en/algeria/algeria-region-code-mapper/`
  - `/en/canada/canada-postal-code-validator/`

Observed QA results:

- Algeria phone, Algeria postal, and Japan address render the contact/address rail with 4 cards and zero horizontal overflow.
- Valid samples stay success/offline-pass, invalid samples move to review.
- Developer output contains structured parts/breakdown evidence.
- Algeria region mapper does not receive the contact/address rail.
- Canada postal remains a dedicated Gold Lab route with zero overflow.

Build notes:

- Do not run multiple `build:country` commands in parallel. Scoped country builds share generated asset copy paths and can race on `generated/validohub/assets/js/workbench/*`.
- Full build was not run for this pass.
