# PIX Workbench Product Spec

## Primary User Task

Developers working with Brazilian PIX payments need to validate PIX keys, inspect BR Code payloads, generate static PIX QR payloads, verify CRC, and copy/download useful artifacts without sending financial data to a server.

## Related Tool Page

- `tools/brazil-pix-validator.yaml`

## Source Asset

- `assets/js/tools/pix.js`

## Current Quality Target

PIX Workbench should follow the PESEL gold-standard interaction model: tool first, strong local-sandbox reassurance, presets and local history, validation timeline, structured result cards, detailed debugger sections, developer snapshots, and clean responsive behavior.

## Current Actions

- Validate PIX keys.
- Parse BR Code / EMV payloads.
- Explain payload structure.
- Generate static PIX BR Code payloads.
- Generate local SVG QR codes from the payload.
- Format pasted BR Code payloads without destroying valid value spaces.
- Generate a deliberate bad-CRC fixture for debugger testing.
- Diff the current payload against a safe generated fixture.
- Copy result JSON or BR Code payload.
- Download result JSON through the shared framework.
- Download generated QR as SVG.
- Clear input/output.

## Supported PIX Key Types

- CPF key with checksum validation.
- CNPJ key with checksum validation.
- Email key.
- Brazilian phone key normalized to `+55` E.164-style format.
- EVP random key as UUID.

## BR Code / EMV Features

The workbench parses and explains common static PIX BR Code fields:

- Payload Format Indicator.
- Point of Initiation Method.
- Merchant Account Information template.
- `br.gov.bcb.pix` GUI.
- PIX key.
- Description.
- Merchant Category Code.
- Transaction Currency.
- Transaction Amount.
- Country Code.
- Merchant Name.
- Merchant City.
- Additional Data Field Template.
- TXID.
- CRC16.

Gold-level payload analysis must also expose:

- Nested TLV paths such as `26.00`, `26.01`, and `62.05`.
- Tag offset, value offset, declared length, raw TLV segment, and parsed value.
- A tree/explorer view plus a table view.
- Implementation lint for payload format, PIX GUI, currency, country, merchant, city, TXID, and CRC.
- A safe-fixture diff so developers can see which tags changed from a known-good payload.

## Generator Features

The browser-side generator accepts:

- PIX key.
- Optional BRL amount.
- Merchant name.
- Merchant city.
- TXID.
- Optional description.

It creates a static BR Code payload and calculates CRC16-CCITT-FALSE locally.

## QR Features

- QR SVG is generated locally in the browser.
- QR payload can be copied.
- QR SVG can be downloaded.
- QR generation must pass an independent browser decode smoke test: generate a static Pix BR Code QR, render the SVG to a canvas/image, decode it with a browser QR detector when available, and confirm the decoded text equals the generated Pix payload.
- No external QR service is used.

## Validation Diagnostics

Diagnostics should identify:

- Invalid CPF checksum.
- Invalid CNPJ checksum.
- Malformed email key.
- Malformed Brazilian phone key.
- Malformed EVP UUID.
- Unrecognized PIX key input.
- Malformed TLV fields.
- Missing Merchant Account Information.
- Missing PIX GUI.
- Missing PIX key.
- Invalid BRL currency code.
- Invalid country code.
- Missing CRC.
- CRC mismatch.
- Invalid amount format.

## Analysis Panels

The workbench should show:

- Input character counts.
- Normalized key length.
- Detected key type.
- Generator readiness.
- Payload character count.
- Estimated QR byte size.
- Initiation method.
- Amount.
- Currency.
- Country.
- TXID.
- Canonical CRC.
- EMV TLV breakdown table.
- CRC debugger.
- CRC replay input ending in `6304`.
- CRC polynomial/init note: CRC16-CCITT-FALSE, polynomial `0x1021`, initial value `0xFFFF`.
- Payload diff against a safe fixture.
- Implementation lint cards.
- Official source and boundary panel.
- Integration traps panel.
- Developer JSON snapshot.

## Samples

Provide samples for:

- CPF key.
- CNPJ key.
- Email key.
- Phone key.
- EVP random key.
- Valid static BR Code payload.
- BR Code payload with bad CRC.

## Gold V2 Additions

The Pix workbench is now the payment/QR/payload flagship baseline. It must remain a bespoke browser lab rather than falling back to the generic Gold overlay alone.

Gold must be visible inside the primary Pix workbench itself. Do not remove the Gold identity when removing duplicate UI. Do not attach a second independent `gold-tools-lab.js` sandbox to the standalone Pix page; the correct product shape is one connected Pix Gold Workbench where the same input drives key validation, BR Code generation/parsing, TLV anatomy, CRC replay, QR output, developer JSON, official-source boundaries, and integration traps.

Pix is also the current elite reference implementation for future Gold tools. Keep its core pattern intact: tool-first interaction, one state model, connected presets/history/input/generator/actions, immediate Gold evidence, rich parser/debugger panels, official sources near the boundary explanation, and responsive CSS that contains long payloads inside local scroll/wrap surfaces instead of pushing the page horizontally.

Required visible panels:

- PIX key inspector with normalization and CPF/CNPJ checksum boundary.
- Static BR Code generator with amount, merchant, city, TXID, and description fields.
- Connected Gold Browser Lab status near the primary workbench controls, changing with the current input.
- Local QR SVG render and download.
- TLV explorer with nested paths, offsets, declared lengths, raw TLV, and values.
- CRC replay debugger with expected/provided/calculated values.
- Safe-fixture diff.
- Implementation lint.
- Official BCB/source links and clear DICT/payment/settlement boundary.
- Workflow-specific integration traps.

## Accepted Pix Polish Baseline

The accepted Pix page is the layout baseline for the next bespoke Gold tools:

- The page must have one connected Gold workbench. Removing duplicate lower overlays must never remove the visible Gold identity or the input-driven Gold evidence strip.
- The QR generator, parser, CRC replay, safe-fixture diff, implementation lint, official sources, integration traps, and developer snapshot must all reflect the same current input or generated payload.
- `Payload Diff Against Safe Fixture` and `BR Code EMV TLV Explorer` are full-width analysis tables inside their cards. They should not leave unused right-side space, and long payload values must be contained inside table cells or local wrappers.
- Page-level horizontal overflow after QR generation, long payload entry, diff rendering, TLV rendering, or developer JSON rendering is a blocker.
- Integration traps use compact, softer supporting typography. They are important developer warnings, but they should not visually compete with the primary result and parser/debugger panels.
- Official source links and boundary copy should be compact, source-linked, and specific: local Pix checks prove key shape, BR Code/TLV structure, QR rendering, and CRC replay only; DICT ownership, PSP account status, payment initiation, settlement, and live authority state remain out of scope.

## Privacy Requirement

All PIX validation, parsing, QR generation, CRC checks, and downloads must run locally in the browser. No backend, REST API, database, Java execution, network upload, or third-party QR service is allowed.

## Explicit Non-Goals For Version 1

- No live Banco Central lookup.
- No account ownership verification.
- No payment initiation.
- No dynamic PIX location URL fetching.
- No server-side validation.
- No guarantee that a syntactically valid key is registered with a payment institution.

## Future Ideas

- Dynamic PIX URL parser.
- PIX copy-and-paste payload formatter.
- Merchant profile presets.
- Batch QR generation.
- QR scan/import from image if a browser-only decoder is approved.
- PIX payment receipt/reference analyzer.
