# Mexico CURP Gold Log

Internal AI implementation memory for the Mexico CURP flagship workbench.

## Why This Tool Exists

CURP is one of Mexico's highest-value local identifier formats for developer workflows. It appears in onboarding, HR/payroll, tax-adjacent forms, public-sector integrations, data imports, QA fixtures, masking, and local validation flows. A useful ValidoHub page must be much richer than a regex checker: developers need anatomy, date/state semantics, check-digit replay, safe fixtures, and an honest RENAPO boundary.

## Sources And Boundary

Primary source links used in the page:

- `https://www.gob.mx/segob/renapo/articulos/sabes-como-se-conforma-tu-curp?idiom=es`
- `https://www.gob.mx/tramites/ficha/asignacion-de-curp/RENAPO8836`
- `https://www.gob.mx/segob/acciones-y-programas/clave-unica-de-registro-de-poblacion-curp`

Boundary rule: ValidoHub checks browser-local structure, date, sex marker, state/entity code, homoclave/control position, and check digit. It does not call RENAPO and must not claim official assignment, person existence, identity proof, ownership, correction status, or active registry status.

## Implemented Capabilities

- Bespoke Gold lab mounted only on `mexico-curp-validator`.
- Generic Gold overlay skipped through `data-gold-lab` to avoid duplicate Pix-style lower sandbox.
- Normalize spaces/hyphens/non-CURP characters locally.
- Shape, length, date, state code, and final check-digit diagnostics.
- Public weighted check-digit replay with expected/provided values.
- Parsed anatomy cards: initial block, date, age estimate, sex marker, birth entity, internal consonants, homoclave, check digit.
- Safe fixture generator for initials, birth date, sex, state, and internal consonants.
- Samples: valid, grouped, bad digit, short, bad state, invalid date.
- Batch replay across fixtures.
- Integration traps specific to CURP storage/display, checksum false confidence, state/date semantics, test fixtures, and masking.
- Official sources and boundary panel.
- Developer Snapshot JSON.
- Layout hardening: the accepted CURP Gold layout is vertical and full-width. Samples, CURP input, safe fixture generator, and actions appear first across the full workbench; the current status/check-card result block sits directly underneath; CURP Anatomy, Check Digit Replay, batch/traps/sources/snapshot sections continue below. This replaces the rejected desktop split that created a tall right column and empty left-side whitespace.
- Control polish: the date generator field is `type="date"` so users get a real date picker, and the CURP sex marker is a styled H/M segmented control rather than a native select popup.

## Fixture Notes

The accepted safe fixture is `GODE561231HDFRRN00`. The older generated overlay sample `GODE561231HDFRRN09` is intentionally treated as a bad check digit. Future sessions must not reuse the old value as a valid example.

## QA Plan

Completed in the first bespoke pass:

- `node --check assets/js/tools/mexico-suite.js`
- `npm run build:country -- --country mexico --locales en`
- Browser smoke on `/en/mexico/mexico-curp-validator/` at `http://127.0.0.1:8161/`:
  - one `[data-gold-lab]`
  - default fixture passes
  - bad digit, short, bad state, and invalid date samples review
  - generator creates a passing fixture
  - no page-level horizontal overflow
- `npm run audit:country-premium -- --country mexico --locales en`

Result: scoped Mexico premium audit passed with 61 tools, 0 blockers, and 0 warnings.

## Open Risks

- CURP source pages and government route URLs can change; keep links official and re-check before release.
- The century inference is format evidence only and should remain worded as an inference, not proof.
- Competitor research was not the focus of this first bespoke implementation pass; future iterations can add deeper edge-case examples if official sources expose more detail.
