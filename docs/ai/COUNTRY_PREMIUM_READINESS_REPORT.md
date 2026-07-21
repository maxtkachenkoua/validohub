# Country Premium Readiness Report

Last updated: 2026-07-22

This report is the fast handoff for the current country-suite state. Read it after
`docs/ai/START_HERE_AI.md` and `docs/ai/PREMIUM_COUNTRY_PLAYBOOK.md` before adding
or upgrading any country.

## Current Production Shape

ValidoHub has two accepted country implementations:

- Bespoke premium baselines: Brazil, Poland, France, Netherlands.
- Factory premium countries: Switzerland, Germany, Italy, Spain, Austria, Belgium,
  Czechia, Denmark, Finland, Ireland, Norway, Portugal, Romania, Sweden.

The factory layer is now the default path for new countries. Do not copy old
minimal pages or one-off tool shells. New country work should improve the shared
factory first, then regenerate the country.

## Current Premium Contract

Every available country must ship with:

- Brazil/Poland-level country hub presentation: flag-colored hero gradient,
  real rendered outline/map assets, local search hints, technical standards,
  civic snapshot, and no placeholder/object text.
- A visible hero clock using a real IANA time zone when the country page has
  enough civic data.
- One breadcrumb separator only.
- Tool pages with hero, tool context block, compact advanced tools, examples,
  validation/generation controls, result cards, validation pipeline, field
  breakdown, quality notes, replay calculation, API/raw JSON views, related tools,
  copy actions, and clear success/failure states.
- Field breakdown on every tool. This is a primary debugging surface, not an
  optional decoration.
- Invalid samples that actually fail. A sample labelled invalid, short, wrong
  prefix, bad checksum, or malformed must not render a success result.
- Success states that are green/neutral only. Red is reserved for invalid/review
  states.
- Copy feedback anchored immediately above the clicked copy button.
- IBAN coverage as both validator and generator globally and per country where
  the country supports IBAN. The generator must create a fresh value per click.

## Shared Fixes That Must Not Regress

- No `[object Object]` anywhere in country hubs or tool pages.
- No empty technical-standard cards.
- No inert dropdowns or selectors that look clickable but do nothing.
- No giant recent-validation or batch-validation sections above the main task.
- No duplicate advanced-tool headings/badges.
- No generic quality notes repeated across unrelated tools.
- No generic analyzer output pretending to be rich local parsing.
- No white text on white/light cards in identifier breakdown.
- No field tokens touching borders or overflowing cards.
- No distant corner copy toast. Copy confirmation appears above the triggering
  control.
- No country hub language switcher claiming an official locale if that locale is
  not actually available.

## Build And Audit Workflow

For one-country development:

1. Edit country data or shared factory source.
2. Run `npm run build:country -- --country <slug>`.
3. Confirm that this rebuilds both `/en/<country>/` and all local tool pages under
   `/en/<country>/<tool>/`.
4. Run country-suite audits.
5. Browser-smoke the country hub plus representative local tools.

For release:

1. Run full build.
2. Run country-suite audits.
3. Browser-smoke at least one bespoke baseline and multiple factory countries.
4. Only commit after the build/audit/smoke gate is green.

## Current Verification Notes

Recent checks before this report:

- `node --check assets/js/tools/country-suite-factory.js`
- `node scripts/audit-country-suite-factory.mjs`
- `npm run audit:country-suite`
- `npm run build:country -- --country germany`
- Full `npm run build`: 8218 routes, 192250531 bytes HTML, integrity PASSED.
- Browser smoke verified representative Germany, Czechia, Finland, Ireland,
  Brazil, and Poland routes from `generated/validohub`.
- Browser smoke verified the copy toast anchors above the clicked button.
- Browser smoke verified a Czech invalid sample renders review state instead of
  success.

Run these checks again after any further edits before committing.

## Where To Fix Problems

- Shared tool UX, analyzer behavior, examples, copy toast, validation states:
  `assets/js/tools/country-suite-factory.js`
- Country hub CSS and shared hub presentation:
  `assets/css/country.css`
- Europe/factory country data generation:
  `scripts/generate-europe-premium-batch.mjs`
- Hub hardening and visuals:
  `scripts/harden-europe-premium-batch-hubs.mjs`,
  `scripts/render-country-visuals.mjs`
- Regression gates:
  `scripts/audit-country-suite-factory.mjs`,
  `scripts/audit-country-tool-shell.mjs`,
  `scripts/audit-country-field-breakdown.mjs`
