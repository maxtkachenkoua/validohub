# Tool Quality Standard

Every ValidoHub tool must be specified before implementation.

## Required Product Spec

Before a new tool is implemented, create or update a product spec that defines:

- Primary user task
- Inputs
- Outputs
- Actions
- Validation behavior
- Error messages
- Examples
- Copy and download behavior
- Browser-only feasibility
- Accessibility and keyboard expectations
- Mobile expectations
- Edge cases

## Quality Bar

A production ValidoHub tool must:

- Work fully in the browser whenever possible.
- Never require a backend for transformations that browser APIs can safely perform.
- Provide live interaction when live execution is useful and safe.
- Preserve user privacy by default.
- Provide specific validation errors.
- Offer useful examples.
- Support copy and download.
- Avoid fake buttons and "not implemented" UI.
- Keep docs below the primary workbench.

## Reference Standard

Base64 Encoder is the current reference quality standard.

Future tools should meet or exceed Base64 Encoder for:

- First-viewport usability
- Live interaction
- Validation detail
- Preview quality
- Copy/download behavior
- Keyboard workflow
- Mobile usability

## Engine Rule

Do not solve site-specific product behavior by making Valido Engine less generic. If a tool needs custom behavior, prefer a ValidoHub-owned product spec and, after the future refactor, ValidoHub-owned assets.
