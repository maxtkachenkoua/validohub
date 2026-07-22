# Global Tools Portal Contract

`/en/tools/` is the first-class registry for non-country ValidoHub workbenches. It must stay buildable without regenerating every country page through `npm run build:portal`.

## Required Product Shape

- Every global tool must be born premium, not shipped as a basic generated form.
- Every global tool must appear in `/en/tools/` and be discoverable by search terms, category, slug, and major use case.
- Every global tool must use the generic premium workbench contract unless a dedicated richer plugin is justified.
- Every tool must include multiple realistic valid, invalid, edge, and generator samples where the domain allows generation.
- Invalid, bad-prefix, malformed, unsigned, or review samples must never produce a fake-green success result.
- Validation and generation should live together when users naturally search for both, for example IBAN, phone, UUID, locale fixtures, webhook signatures, MRZ, VAT fixtures, and postal codes.
- Copy actions must provide visible feedback. Download and copy output must use the current result, not stale fixture state.
- Result pages must include immediate result cards, field breakdown, validation pipeline, quality notes, developer JSON/API preview, official-boundary copy, and advanced analysis when useful.
- Generic quality notes must be tool-specific. Do not reuse empty or identical copy across unrelated tools.

## Build Hooks

Adding a global tool requires all of these:

- `tools/{slug}.yaml`
- `TOOL_SCRIPT_BY_ALGORITHM` entry in `scripts/build-all.mjs`
- `GENERIC_UTILITY_WORKBENCHES` entry in `scripts/build-all.mjs`
- `assets/js/tools/generic-suite.js` config and handler coverage
- `/en/tools/` inclusion through `compileToolsPortal`
- Runtime asset copy for `portal-tools.js`
- Audit coverage in `scripts/audit-global-tools-premium.mjs`

## Required Verification

- `node --check` for changed JS/MJS files.
- `npm run build:portal` for home/tools/countries iteration.
- `npm run build` before release.
- `npm run audit:global-premium -- --base <local-url>` before global-tool work is called done.

If a future tool cannot meet this contract yet, do not advertise it as premium.
