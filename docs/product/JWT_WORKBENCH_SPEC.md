# JWT Workbench Spec

## Primary User Task

Developers paste a JSON Web Token and immediately decode, inspect, validate structure, analyze claims, copy sections, and download decoded JSON without sending the token to a server.

## Related Tool Page

- `tools/jwt-decoder.yaml`

## Source Asset

- `assets/js/tools/jwt.js`

## Current Actions

- Decode.
- Validate.
- Inspect / parse.
- Analyze / explain.
- Copy decoded sections.
- Download decoded sections.
- Clear input/output.

## Workbench Sections

- Raw token.
- Header.
- Payload.
- Signature.
- Decoded JSON.
- Token analysis.
- Token health.

## Header

- Pretty JSON.
- Syntax highlighting.
- Copy.
- Download.

## Payload

- Pretty JSON.
- Syntax highlighting.
- Tree view.
- Search.
- JSONPath display.
- Copy.
- Download.

## Token Analysis

Show registered and common claims when present:

- Algorithm.
- Issuer.
- Audience.
- Subject.
- JWT ID.
- Issued At.
- Not Before.
- Expiration.

## Token Health

Show badges for:

- Valid structure.
- Expired.
- Not yet valid.
- Missing signature.
- Weak algorithm.
- Unknown algorithm.

## Expiration UX

Expiration and validity times should be human-readable:

- Expires in 2 days.
- Expired 5 hours ago.
- Valid in 10 minutes.

## Copy Helpers

Allow copying:

- Header.
- Payload.
- Signature.
- Claims.
- Whole decoded JSON.

## Download Helpers

Allow downloading:

- Header JSON.
- Payload JSON.
- Decoded JSON.

## Error UX

Invalid JWTs should:

- Highlight the malformed section.
- Explain why decoding or parsing failed.
- Suggest a repair.

## Samples

Provide safe sample JWTs for:

- Valid token.
- Expired token.
- Unsigned token.
- Malformed token.

## Privacy Requirement

All JWT decoding, inspection, validation, and analysis must run locally in the browser. No backend, REST API, Java execution, or database is required.

## Explicit Non-Goal For Version 1

JWT Workbench Version 1 does not verify signatures. Signature verification requires a separate key-handling product spec.
