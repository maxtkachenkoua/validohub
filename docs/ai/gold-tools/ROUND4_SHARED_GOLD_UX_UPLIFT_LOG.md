# Round 4 Shared Gold UX Uplift Log

Date: 2026-07-27

## Scope

This pass upgrades the shared route-bound country lab in `assets/js/tools/gold-tools-lab.js` from a useful analyzer into a more interactive Pix/CURP-style baseline for every supported non-bespoke profile.

It does not claim that all 281 profiles are finished bespoke Gold pages. It raises the shared floor: pages that still sit below PESEL, Pix, CURP, Spain ID, and Brazil CPF/CNPJ now get better controls, local history, export behavior, batch fixtures, compact typography, and copy feedback while deeper per-format promotion remains the next-value queue.

## Implemented

- Versioned shared runtime to `2026-07-27-country-rich-lab-v4`.
- Replaced static sample chips with a fixture deck: valid, bad, short, wrong-context, generated, and batch replay.
- Added current-result copy/export controls for Developer JSON, normalized value, and downloaded JSON.
- Added route-local input history in `localStorage` with pass/review labels.
- Added copy confirmation popovers anchored above the triggering button.
- Ensured copy/download uses the current textarea value, not a stale previous run.
- Made generated reference fixtures fresh on each explicit generation click.
- Tightened typography, internal padding, card spacing, table wrapping, and mobile behavior for the shared lab shell.
- Cache-busted `gold-tools-lab.js` separately from other country runtime scripts via `gold-tools-lab-v4-20260727`.

## Verification

- `node --check assets/js/tools/gold-tools-lab.js`
- `node --check scripts/build-country-dev.mjs`
- `node --check scripts/build-all.mjs`
- `npm run build:country -- --country greece --locales en`
- `npm run build:country -- --country germany --locales en`
- `npm run build:country -- --country united-states --locales en`
- Playwright smoke on:
  - `/en/greece/greece-vat-id-validator/`
  - `/en/germany/germany-iban-validator/`
  - `/en/united-states/united-states-phone-number-validator/`

Browser smoke confirmed `data-country-rich-lab` mounts, `gold-tools-lab.js?v=gold-tools-lab-v4-20260727` loads, local history/download controls exist, batch replay renders five fixtures, copy popover appears, and desktop/mobile horizontal overflow is `0`.

## Remaining MVP Triage

- Promote the highest-value structured identifiers from shared analyzers to bespoke format labs where public rules allow it.
- Prioritize formats with real checksum/control logic, field anatomy, and developer workflow value over raw country/tool count.
- Keep shared overlay language as broad scaffolding, not a completed Gold claim.
