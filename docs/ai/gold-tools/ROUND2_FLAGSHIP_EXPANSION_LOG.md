# Gold Tools Round 2 Flagship Expansion Log

Date: 2026-07-27

Purpose: expand the shared Gold browser-lab coverage from the initial 50 target list into a broader flagship matrix while preserving the Pix / CURP / Spain bespoke baselines.

## Decision

Keep the shared `assets/js/tools/gold-tools-lab.js` overlay as the broad rollout layer, but deepen its local analyzers where public structure/checksum logic is stable enough to run in the browser.

This round intentionally does not claim that every profile is Pix-level bespoke. The overlay is now a high-value triage layer:

- Full local replay where public checksum/control logic is straightforward.
- Rich structure/anatomy/boundary evidence where a format is useful but official assignment/status is external.
- No fake official existence, ownership, settlement, identity, or tax-registration status.

## Coverage

The shared Gold profile matrix now contains 110 route-bound profiles. Every profile slug resolves to a generated English route.

Spain ID remains a deliberate exception to shared overlay injection because it is a bespoke Gold runtime (`assets/js/tools/spain-id.js`) and marks itself with `data-gold-lab`.

## Deepened Local Replay Families

Round 2 added browser-side analyzers for:

- South Africa ID number: encoded birth-date/gender/citizenship anatomy plus Luhn-style check replay.
- Turkey TCKN: digit 10 and digit 11 weighted replay.
- Israel Teudat Zehut: 9-digit padded alternating-weight replay.
- Portugal NIF: 9-digit weighted check digit.
- Croatia OIB: ISO 7064 MOD 11,10 replay.
- Czech ICO: 8-digit weighted control replay.
- Greece AFM: binary-weight control replay.
- Ecuador cedula: province/third-digit checks plus modulo-10 replay.
- Uruguay cedula: padded body plus weighted local replay.
- Kenya KRA PIN: prefix/body/suffix structure and boundary copy.

Round 2 also separated shape/boundary handlers for PAN, GSTIN, Aadhaar, payment aliases, date-coded national IDs, and structured tax/registry identifiers so their output is no longer a single generic field.

## Added Flagship Countries / Profiles

New overlay profiles were added across Africa, Asia, Europe, and the Americas, including South Africa, Turkey, South Korea, Vietnam, Philippines, Israel, Saudi Arabia, UAE, Portugal, Ireland, Austria, Czechia, Slovakia, Slovenia, Croatia, Romania, Hungary, Greece, Luxembourg, Iceland, Lithuania, Latvia, Malta, Cyprus, Uruguay, Paraguay, Ecuador, Costa Rica, Dominican Republic, Panama, Ghana, Nigeria, Kenya, Morocco, and Egypt.

## Build / Route Wiring

Updated:

- `scripts/build-country-dev.mjs`
- `scripts/build-all.mjs`

Scoped country builds now inject `gold-tools-lab.js` for the new flagship country list. Full build wiring mirrors the same country-suite script injection so release builds do not drop the overlay.

## QA Completed

- `node --check assets/js/tools/gold-tools-lab.js`
- `node --check scripts/build-country-dev.mjs`
- `node --check scripts/build-all.mjs`
- VM replay of all 110 profile samples:
  - 110 / 110 valid fixtures pass.
  - 110 / 110 invalid fixtures review/fail.
- Route resolution check:
  - 110 / 110 profile slugs resolve to generated English routes.
- Script injection check:
  - 109 / 110 profiles have `gold-tools-lab.js` in generated HTML.
  - The only missing script is `spain-id-validator`, intentionally handled by bespoke `spain-id.js`.
- Scoped sequential country builds with `--locales en` completed for all newly wired countries in this round. No full build was run.

## Important Boundaries

- This round is not a claim that 110 tools are all bespoke Pix-quality experiences.
- Bespoke promotion still requires a dedicated runtime/spec/log when a tool deserves Pix/CURP/Spain-level UX.
- Boundary-only profiles must stay honest: they help developers normalize, inspect, fixture, and avoid integration mistakes; they do not prove official records.
- Do not use the count as a quota. The product rule remains value over volume.
