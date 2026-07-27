# Gold Tools Round 1 Implementation Log

Date: 2026-07-26

Purpose: internal AI trace for the first 50-tool Gold browser-lab pass.

## Decision

Implement a shared ValidoHub-owned `gold-tools-lab.js` overlay instead of rewriting 50 pages independently. The overlay mounts only on approved route slugs, keeps existing country suite behavior, and adds a dense browser lab with source links, fixture buttons, local analyzer, anatomy/replay cards, integration traps, batch replay, and developer JSON.

Reason:

- Many countries are currently factory-based and share the same shell.
- Several North America tools exist as generated source routes rather than standalone `tools/*.yaml` files.
- The user wants all 50 started as a coherent system, with logs, without Valido Engine changes.
- Additive overlay limits regression risk and gives a place to deepen algorithms profile by profile.

## Files Changed

- `assets/js/tools/gold-tools-lab.js`
- `scripts/build-all.mjs`
- `scripts/build-country-dev.mjs`
- `scripts/audit-country-premium.mjs`
- `docs/ai/gold-tools/INDEX.md`
- `docs/ai/gold-tools/ROUND1_IMPLEMENTATION_LOG.md`

## Source Discipline

The first pass adds official/primary links in the overlay profiles when a stable authority is obvious: tax authorities, central banks, population registers, payment network owners, official registry portals, or national digital agencies.

Current limitation: several profiles still use broad authority links rather than exact PDF/spec endpoints. Future deepening should replace broad links with exact public algorithm/spec documents where available.

## Capability Baseline Added

Every overlay route receives:

- Success-first valid fixture and invalid fixture.
- Safe fixture generator button.
- Local analyzer button.
- Batch replay for valid vs invalid state.
- Result status that never treats intentional invalid samples as success.
- Anatomy/replay panel.
- Source links panel.
- Integration traps panel without ValidoHub marketing copy.
- Developer JSON export/copy.
- Browser-only and official-boundary statements.

## Per-Tool Risk Notes

- PESEL and Pix already have bespoke rich logic; overlay is mainly source/log discipline and extra source-linked lab shell.
- CPF, CNPJ, CLABE, RUT, ABA, ABN, USCC, Thai ID, IBAN, Luhn-family tools have local checksum replay in the first overlay pass.
- Tools with complex or partially closed national algorithms are deliberately conservative in `overlay-v1`; they show structure/boundary evidence and must be deepened only with source confirmation.
- Payment alias systems such as UPI, PayNow, PromptPay, QRIS, Pix DICT, PayID, and SGQR must not claim account ownership, alias ownership, settlement, or network reachability without official/live systems.
- Business registries such as KVK, KBO/BCE, NZBN, Japan Corporate Number, US EIN, and Canada BN can validate local structure but cannot prove active status without official lookup.

## QA Plan

Completed before calling this round complete:

1. `node --check assets/js/tools/gold-tools-lab.js`
2. `node --check scripts/build-all.mjs`
3. `node --check scripts/build-country-dev.mjs`
4. Sequential scoped country builds with `--locales en` for Brazil, Poland, Argentina, Mexico, and the first 50-Gold target countries in Asia/Europe/Oceania/North America/South America touched by the overlay.
5. Confirmed all overlay route profiles declared in `gold-tools-lab.js` exist under `generated/validohub/en`; Brazil Pix was later removed from the overlay and promoted to a bespoke runtime.
6. Confirmed script injection on representative routes:
   - `/en/poland/pesel-validator/`
   - `/en/india/india-pan-validator/`
   - `/en/china/china-uscc-validator/`
   - `/en/argentina/argentina-cuit-validator/`
   - `/en/japan/japan-corporate-number-validator/`
   - `/en/mexico/mexico-rfc-validator/`
   - `/en/united-states/united-states-ein-validator/`
7. `npm run audit:country-premium -- --country brazil --locales en`
8. `npm run audit:country-premium -- --country poland --locales en`
9. `npm run audit:country-premium -- --country india --locales en`
10. `npm run audit:country-premium -- --country united-states --locales en`
11. Browser smoke through local static server on Poland PESEL and India PAN confirmed the Gold Lab mounts, exposes input controls, sample/generate/batch actions, source links, field output, and developer JSON after Analyze. Brazil Pix is now smoke-tested through its dedicated Pix runtime instead of the shared overlay.

Notes:

- Full build was intentionally not run.
- Valido Engine was not modified.
- Country images were not regenerated or replaced.
- `scripts/build-country-dev.mjs` now injects `gold-tools-lab.js` for country-suite pages and standalone legacy Gold algorithms such as PESEL. Brazil Pix is intentionally excluded because its bespoke runtime owns the full page.
- `scripts/audit-country-premium.mjs` was aligned with existing runtime mappings for `validohub.iban-generator` and `validohub.pesel`; inline YAML capability arrays are now parsed correctly.

## Next Deepening Queue

Prioritize exact public algorithms and source links for:

1. India GSTIN/PAN/Aadhaar Verhoeff.
2. Italy Codice Fiscale and Partita IVA.
3. Sweden/Norway/Denmark/Finland/Estonia personal-number families.
4. Switzerland QR reference and QR-bill payload.
5. UK VAT, France TVA/RIB, Germany Steuer-ID.
6. Singapore NRIC/UEN and Japan My Number/Corporate Number.
