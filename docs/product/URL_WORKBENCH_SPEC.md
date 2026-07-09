# URL Workbench Spec

## Primary User Task

Developers paste text, URLs, or percent-encoded strings and quickly encode, decode, validate, inspect, copy, or download results without sending data to a server.

## Related Tool Pages

- `tools/url-encoder.yaml`
- `tools/url-decoder.yaml`

## Current Actions

- Encode text with `encodeURIComponent`.
- Decode percent-encoded input with `decodeURIComponent`.
- Validate percent-encoded sequences.
- Copy result.
- Download result.
- Clear input/output.

## Current UX

- Tool first, documentation below.
- Browser-only execution.
- Offline capable.
- Uses the shared Workbench Framework for input/output panels, live mode, copy, download, status messages, samples, and keyboard flow.

## Auto-Detection And Guidance

The workbench guides users when input appears already encoded. It warns when encoding input that already contains `%XX` sequences because double-encoding will escape percent signs.

## Validation Diagnostics

Malformed URL encoding should report:

- Invalid percent sequence.
- Character position.
- Highlighted invalid sequence.
- Malformed UTF-8 byte sequence when percent escapes are syntactically valid but not decodable as UTF-8.

## Statistics

Show:

- Mode.
- Input UTF-8 bytes.
- Output UTF-8 bytes.
- Character count.
- Encoded length.
- Decoded length.
- Percent-encoded byte count.
- Reserved character count.
- Unsafe character count.
- Contains spaces.
- Already encoded.

## Advanced Analysis

Show:

- Space handling visualization.
- Warning for plus signs during decode/validate because `+` is preserved and is not treated as a space.
- Warning for already encoded input during encode.
- Invalid sequence highlighting.

## Privacy Requirement

All URL encoding, decoding, and validation must run locally in the browser. No backend, REST API, Java execution, or database is required.

## Future Ideas

- URL Parser.
- URL Analyzer.
- URL Builder.
- Query Parser.
- Query Builder.
- Normalize query parameter order.
- Decode only selected URL components.
- Copy helpers for scheme, host, path, query, fragment, and individual query parameters.
