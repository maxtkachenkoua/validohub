# Mexico CURP Workbench Product Spec

## Primary User Task

Developers working with Mexican onboarding, identity forms, test fixtures, payroll, tax, CRM, and compliance data need to validate CURP-like values, decode their public structure, generate safe fixtures, replay the check digit, and understand the RENAPO boundary without sending personal identifiers to a server.

## Related Route

- Country route slug: `mexico-curp-validator`
- Source asset: `assets/js/tools/mexico-suite.js`
- Gold AI log: `docs/ai/gold-tools/MEXICO_CURP_GOLD_LOG.md`

## Current Quality Target

Mexico CURP is the next bespoke Gold implementation after Brazil Pix. It must follow the accepted Pix polish baseline: one connected lab, immediate input-driven evidence, compact premium layout, no duplicate lower Gold sandbox, local containment for long values, workflow-specific traps, official source links, and a Developer Snapshot after human-readable diagnostics.

## Required Capabilities

- Normalize display input by removing spaces and hyphens while preserving the 18-character storage value.
- Validate 18-character CURP shape.
- Decode public anatomy: initial letter block, birth date, age estimate, sex marker, entidad code, internal consonants, homoclave/control position, and final check digit.
- Validate calendar dates from the `YYMMDD` segment.
- Map official CURP state/entity codes including `NE` for born abroad.
- Infer century from the homoclave position only as local format evidence, never as identity proof.
- Replay the public weighted check-digit algorithm and show expected/provided digits.
- Generate safe structural fixtures from user-selected initials, date, sex marker, state code, and consonants.
- Provide valid, grouped, bad-digit, short, bad-state, and invalid-date samples.
- Run batch replay across samples.
- Export a developer JSON snapshot with normalized value, masked value, parsed anatomy, check-digit result, diagnostics, and boundary copy.

## Boundaries

The browser lab proves only local structure, date/state semantics, and check-digit consistency. It must never claim RENAPO assignment, registry existence, identity proof, person existence, ownership, correction status, or official validity.

Official/source links should remain visible near the workbench:

- RENAPO/government CURP composition context.
- gob.mx CURP assignment/tramite context.
- SEGOB/RENAPO CURP program context.

## Layout Rules

- The Gold lab must be mounted inside the primary country workbench host and mark itself with `data-gold-lab` so the generic Gold overlay does not duplicate it.
- Result status, check cards, CURP anatomy, check-digit replay, batch replay, traps, sources, and Developer Snapshot must all reflect the same current input.
- Keep the primary interaction area as a vertical Gold flow: samples, CURP input, safe fixture generator, and action buttons span the full workbench width first; the current result status/check cards render as a distinct full-width block directly below; anatomy, replay, batch, traps, sources, and snapshots continue below. Do not return to a side-by-side layout that creates a tall right column or empty left-side whitespace.
- Generator controls should use domain-appropriate UI, not raw browser defaults: date entry uses a real date input/date picker, and the binary sex marker uses a compact segmented H/M control rather than a native dropdown.
- Long normalized values and JSON must wrap or scroll locally; page-level horizontal overflow is a blocker.
- Integration traps use compact, soft typography and must be specific to CURP integration.
- Source and boundary copy should be informative but compact, with explicit separation between browser evidence and official RENAPO systems.

## Acceptance Checks

- First load starts with a valid safe fixture and passes local checks.
- Bad digit sample fails only the check-digit evidence where possible.
- Short sample fails length/shape.
- Bad-state sample flags the entidad code.
- Invalid-date sample flags calendar semantics.
- Generated fixture passes when its input parts are valid.
- Browser QA confirms no duplicate Gold lab and no page-level horizontal overflow on desktop and mobile.
