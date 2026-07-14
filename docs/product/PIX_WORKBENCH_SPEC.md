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
