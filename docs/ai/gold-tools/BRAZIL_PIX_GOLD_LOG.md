# Brazil Pix Gold Log

Date: 2026-07-26

Internal AI memory for the bespoke Brazil Pix workbench. This is not user-facing copy.

## Why This Tool Exists

Pix is one of the highest-value Brazil developer workflows. Developers commonly need to validate Pix key shapes, generate static QR payload fixtures, parse BR Code copy-and-paste values, replay CRC, and understand what remains outside browser-only validation.

## Official / Primary Sources

- Banco Central do Brasil Pix portal: `https://www.bcb.gov.br/estabilidadefinanceira/pix`
- Banco Central manuals / data communication documents: `https://www.bcb.gov.br/estabilidadefinanceira/comunicacaodados`
- Banco Central Pix regulation and normative updates: `https://www.bcb.gov.br/estabilidadefinanceira/pix?modalAberto=regulamentacao_pix`

## Implemented Gold Behavior

- Gold is visible in the primary Pix page identity (`Brazil PIX Gold Workbench`, `Gold Browser Lab`) and in a connected status strip near the main controls.
- The Gold status strip is input-driven: empty state explains scope, key input shows type/format/boundary/next action, and BR Code payloads show TLV anatomy, Pix rail evidence, CRC replay, and QR readiness.
- Presets for CPF, CNPJ, email, phone, EVP UUID, valid BR Code, and bad CRC.
- Local CPF/CNPJ checksum validation for Pix keys.
- Email, Brazilian phone, and EVP UUID shape detection.
- Static BR Code generator with Pix key, optional amount, merchant, city, TXID, and description.
- Local SVG QR generation and QR SVG download.
- QR encoder hardening: Reed-Solomon remainder generation and timing-pattern placement were corrected after an independent decode test showed the previous SVG looked QR-like but did not decode.
- BR Code TLV parser with nested paths, offsets, declared lengths, raw TLV, and values.
- CRC16-CCITT-FALSE replay with provided/calculated values and replay input ending in `6304`.
- Safe-fixture diff for payload debugging.
- Implementation lint for payload format, Pix GUI, BRL currency, country, merchant, city, TXID, and CRC.
- Official-source panel and browser-only boundary copy.
- Pix-specific integration traps without ValidoHub marketing copy.
- Developer JSON includes parsed field paths and the local-vs-official boundary.
- Responsive hardening keeps long PIX payloads, QR output, action rows, Gold cards, TLV tables, CRC replay strings, diff tables, source links, and developer JSON inside local wrap/scroll surfaces instead of creating page-level horizontal overflow.
- Product status: Pix is the elite bespoke Gold reference for future tools. Copy the connected-lab model, not Brazil-specific semantics: one state, visible Gold identity, no duplicate sandbox, input-driven evidence, generator/parser/debugger/source/traps from the same input, and strong layout containment.

## Intentionally Unsupported

- The standalone Pix page must not use the shared `gold-tools-lab.js` overlay. Pix owns a bespoke Gold runtime; re-adding the shared overlay creates duplicate input, duplicate traps, and confusing “two tools on one page” behavior.
- No DICT lookup.
- No Pix key ownership or account status proof.
- No payment initiation.
- No settlement proof.
- No dynamic Pix URL fetch.
- No PSP/network reachability claim.

## QA Completed

- `node --check assets/js/tools/pix.js`
- `node --check scripts/build-country-dev.mjs`
- `npm run build:country -- --country brazil --locales en`
- `npm run audit:country-premium -- --country brazil --locales en`
- Browser smoke on `/en/brazil/brazil-pix-validator/`:
  - Page identity shows `Brazil PIX Gold Workbench` and `Gold Browser Lab`.
  - Empty state shows connected Gold scope; BR Code preset changes it to TLV/Pix GUI/CRC/QR readiness.
  - Shared `gold-tools-lab.js` is absent and the `.vh-gold-lab` overlay is absent by design.
  - Exactly one Pix-specific `Integration Traps` block appears after analysis.
  - Valid BR Code preset shows TLV ok, Pix GUI, CRC valid, 15 TLV explorer rows, 8 lint cards, source links, diff rows, and developer JSON boundary.
  - Bad CRC action preserves TLV structure and shows CRC mismatch rather than malformed TLV.
  - Generated QR scenario with long BR Code payload has no page-level horizontal overflow on desktop or narrow viewport.
  - Browser QR decode smoke passed on `/en/brazil/brazil-pix-validator/`: generated SVG rendered to canvas, Chromium `BarcodeDetector` decoded one `qr_code`, and decoded text exactly matched the generated Pix BR Code payload.

## Remaining Deepening Ideas

- Add a dedicated dynamic Pix location URL parser without network fetch.
- Add merchant profile presets.
- Add batch payload validation/import.
- Add PNG QR download if the product approves a browser-only raster export path.
- Add exact manual-section references when stable public deep links are confirmed.
