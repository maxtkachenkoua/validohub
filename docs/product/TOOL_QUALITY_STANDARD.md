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

## Generic Tool Baseline

Generic non-country tools must not ship as plain documentation pages. If a generic tool is available, it needs either a dedicated plugin or the shared `assets/js/tools/generic-suite.js` baseline with real browser-side behavior.

Generic utility pages must include:

- Tool-specific descriptions. Never repeat generic copy such as "open the production-grade workbench" across cards.
- Real local actions for the domain whenever browser APIs make them possible.
- Samples, copy, download, diagnostics, result cards, and advanced analysis.
- Multiple meaningful samples per mode: valid, invalid, malformed/short, and at least one edge case that proves the error path really fails.
- A premium identity shell with tool-specific mark, color theme, domain summary, chips, and local-execution boundary.
- Expanded advanced analysis by default after a result is produced.
- Developer API preview before raw JSON when the tool returns structured diagnostics.
- Compact premium card typography: small uppercase labels, moderate-weight values, muted explanatory text, and wrapped long strings.
- No oversized bold paragraph blocks inside result cards.
- Validators and generators must not share fake-green results: invalid samples must render invalid/review states, while generators must clearly label generated fixture output.
- Global utility tools must carry top-tier domain intelligence. JSON, JWT, Base64, URL, Regex, UUID, and IBAN routes are incomplete if they only validate/convert; they must expose domain-specific debugger surfaces such as repair candidates, schema/path maps, claim/security timelines, byte signatures, full URL/query/security analysis, capture-group maps, UUID version/variant/timestamp details, and IBAN MOD-97/BBAN breakdowns.
- Global tool changes must run `npm run audit:global-premium -- --base <local-url>` in addition to syntax checks. The audit exists to prevent pretty-but-thin regressions and fake-green invalid sample behavior.

## Identity Rules

Every country, country tool, generic tool, related-country card, and ecosystem card should have a recognizable identity marker.

- Use an official logo only when it is permitted and already registered in the Brand Asset System.
- If no official mark is available, use a compact text mark, standard badge, or semantic icon.
- Related country cards must use the country flag instead of a generic planet icon.
- Future tools must add identity metadata or a documented fallback before visual launch.
