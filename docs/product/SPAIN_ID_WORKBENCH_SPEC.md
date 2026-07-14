# Spain ID Workbench Product Spec

## Primary User Task

Developers working with Spanish user, tax, and business data need to validate, normalize, inspect, explain, and generate safe test fixtures for common Spanish identifiers without sending data to a server.

## Related Tool Page

- `tools/spain-id-validator.yaml`

## Source Asset

- `assets/js/tools/spain-id.js`

## Current Quality Target

Spain ID Workbench should follow the PESEL and PIX gold-standard interaction model: tool first, local sandbox reassurance, presets and local history, validation timeline, structured summary cards, checksum debugger, developer JSON snapshot, copy/download, and responsive mobile behavior.

## Current Actions

- Validate DNI, NIE, NIF, CIF-style legal-entity identifiers, and `ES` VAT-prefixed identifiers.
- Parse and explain identifier type, normalization, checksum/control letter, and entity context.
- Generate safe fictional test identifiers for DNI, NIE, and CIF/NIF legal-entity patterns.
- Explain DNI/NIE modulo-23 letter calculation.
- Explain CIF/NIF legal-entity control digit or control letter calculation.
- Copy result JSON.
- Download result JSON through the shared framework.
- Clear input/output.

## Supported Identifier Types

- DNI: 8 digits plus control letter.
- NIE: X/Y/Z prefix, 7 digits, plus control letter.
- NIF personal context: DNI/NIE-style identifiers used as tax identifiers.
- Legal entity NIF / legacy CIF-style identifiers: leading entity letter, seven digits, plus digit or letter control.
- Spanish VAT syntax context: optional `ES` prefix plus a supported Spanish identifier.

## Diagnostics

Diagnostics should identify:

- Empty input.
- Unsupported characters.
- Invalid length.
- Unknown prefix.
- DNI/NIE checksum letter mismatch.
- CIF/NIF legal-entity control mismatch.
- Whether an entity type expects digit-only, letter-only, or either control symbol.
- VAT prefix normalization.
- Formatting normalization.

## Analysis Panels

The workbench should show:

- Detected type.
- Normalized identifier.
- Formatted display value.
- VAT display value when applicable.
- Control character expected and provided.
- Checksum formula.
- Entity family.
- Input and normalized character counts.
- Whether the identifier is a safe generated test fixture.
- Developer JSON snapshot.

## Samples

Provide samples for:

- Valid DNI.
- Invalid DNI.
- Valid NIE.
- Invalid NIE.
- Legal entity NIF / legacy CIF.
- VAT-prefixed Spanish identifier.

## Privacy Requirement

All validation, parsing, fixture generation, and explanation must run locally in the browser. No backend, REST API, database, Java execution, identity verification, tax-status lookup, or VIES network call is allowed.

## Explicit Non-Goals For Version 1

- No identity verification.
- No Agencia Tributaria lookup.
- No EU VIES status lookup.
- No document authenticity checks.
- No legal or tax advice.
- No claim that a syntactically valid identifier belongs to a real person or company.

## Future Ideas

- Dedicated VAT / VIES Workbench with explicit network policy.
- Spanish phone validator.
- Postal code validator.
- IBAN Spain inspector.
- Batch CSV validation.
- Masking/anonymization helper for logs.
