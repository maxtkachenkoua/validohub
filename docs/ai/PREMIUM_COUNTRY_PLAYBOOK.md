# Premium Country Playbook

This is the fast handoff for AI sessions that generate, upgrade, or debug ValidoHub country suites.

Read this after `docs/ai/START_HERE_AI.md` and before touching any country page, country suite runtime, or country generation script. Repository docs are the source of truth; do not rely on chat memory.

## Current Direction

ValidoHub country pages should feel like Brazil and Poland at their best: dense, useful, polished, interactive, and honest about browser-only boundaries. A full-premium country is not a decorative landing page. It is a developer portal with local tools, local examples, local visuals, debuggable field breakdowns, and enough context to understand each workflow quickly.

Use Country Suite Factory V1 for future factory-based countries unless the user explicitly asks for a bespoke runtime. Do not migrate accepted bespoke Brazil, Poland, France, or Netherlands suites to the factory without explicit approval.

## Required Country Tool Shape

Every factory-rendered country tool must have this order:

1. Premium tool hero with country/tool identity and real same-country related links.
2. Tool context block explaining what the tool is for, where the format is used, what is checked locally, and the official/source-system boundary.
3. Compact Advanced tools accordion with history, batch diagnostics, API preview, raw JSON, and local related links.
4. Main input/action area with clear example buttons.
5. Result cards, green success pipeline, field/evidence breakdown, quality notes, and centered replay/debugger after execution.

Never ship the old generic `Run the tool` shell, a hybrid generic-plus-premium shell, or a page where the country runtime mounts below stale generated workbench UI.

The expected workbench promise is validate + generate + explain + debug where the domain allows it. A user arriving from search should immediately understand whether the tool can check an existing value, generate a safe fixture, inspect every field, replay the local algorithm, and copy developer-ready output.

## Non-Negotiable Regression Bar

Do not repeat these already-fixed bugs:

- Valid success states must not show red panels, red validate buttons, or red review cards.
- Invalid, short, bad-country, bad-checksum, wrong-prefix, and review examples must render review/error states. Never infer sample intent with `/valid/i`; `Invalid` contains `valid`.
- Sample buttons must be short clear actions: `Valid sample`, `Grouped valid sample`, `Invalid sample`, `Short sample`, `Bad country prefix`, or a named edge case. Do not expose raw payloads in labels.
- Related controls must navigate or perform an observable action. Do not use inert native selects named `Samples and related tools`.
- Field breakdown is mandatory for every country tool. It must have local meaning, dark readable text, wrapping, and internal padding. No white text on white cards.
- Structured local ID/company/tax/VAT/EORI tools need local analyzers, local field decoding, control/checksum evidence when applicable, named pipeline checks, and useful debugger output. Generic `identifier evidence`, `tax evidence`, `payment evidence`, or `workflow` cards are only unfinished fallback behavior.
- Quality notes must be tool-specific. Do not reuse the same generic four cards everywhere.
- Do not ship a generic Repair suggestions column. Use clear examples plus one centered replay/debugger surface.
- Copy buttons must show a prominent copied toast/popover above the clicked button.
- IBAN coverage needs both validators and generators. Generators must create a fresh structural fixture on every valid Generate click, infer the local country on country routes, and preserve invalid/review examples instead of silently generating a valid value.
- Developer payloads, long identifiers, token strips, and code blocks must wrap or scroll locally and must not create page-level horizontal overflow.

## Required Country Hub Shape

Country hubs should match the Brazil-quality presentation:

- Hero uses flag-colored gradients and real country outline/location visuals.
- Country shape/location cards use real geometry from the shared Natural Earth map source whenever available. Do not use generic polygon placeholders for full-premium countries.
- Civic snapshot appears before Developer Actions and includes flag, official/state languages, capital, main cities with approximate populations, and useful generic country context.
- Hero clock uses a real IANA timezone, for example `Europe/Helsinki`. Placeholder strings like `Europe local time zone` are forbidden.
- Search placeholder and chips must include local systems and abbreviations, not generic `IBAN, SWIFT/BIC, SEPA, VAT, INVOICE` everywhere.
- Technical standards must be populated: plug types, voltage, grid frequency, emergency number.
- Lower-page cards must render real titles and summaries. Never show `[object Object]`, empty cards, icon-only/status-only placeholders, or empty technical cards.
- Breadcrumbs use one separator only: never `Home / / Countries / / X`.

## Generation Workflow

For a new full-premium country:

1. Read the mandatory docs from `START_HERE_AI.md`, especially `DEVELOPMENT_RULES.md`, `COUNTRY_SUITE_GENERATION_GUARDRAILS.md`, `COUNTRY_SUITE_FACTORY_SPEC.md`, and `PREMIUM_COUNTRY_CONTRACT.md`.
2. Choose strong local tools based on actual country workflows. Around 60 tools is a reference density, not a cap or quota. Add more if there are more genuinely useful local offline workflows; ship fewer rather than padding.
3. Build country data first: local identifiers, taxes, banking/payment systems, postal/address formats, vehicle/company documents, locale conventions, civic snapshot, technical standards, visual theme, real timezone, and search hints.
4. Generate tools with explicit sample intent, local quality notes, official boundaries, field breakdowns, and analyzer coverage.
5. Add domain-specific analyzer/generator profiles whenever the local format has real structure. Do not accept generic `source payload / offline only` cards for national IDs, VAT/tax IDs, company numbers, IBAN/account formats, payment references, vehicle/documents, or other structured local formats.
6. Apply shared factory improvements to existing countries too. If a bug was visible in Ireland, Finland, Czechia, Brazil, or any current route, assume all generated countries need the source fix and regenerate/build from source.
7. Use `npm run build:country -- --country <slug>` for fast iteration. This must rebuild the country hub and every local tool page under that country with current CSS/JS bundle links.
8. Run `npm run audit:country-suite` and any country-premium audit available.
9. Browser-smoke representative routes: hub, local ID, VAT/tax, IBAN validator, IBAN generator, invoice/payment, CSV/locale, and one broad helper.
10. Run full `npm run build` before release/sign-off.

## Verification Expectations

Minimum checks before saying a country/tool is done:

- `node --check assets/js/tools/country-suite-factory.js` after factory edits.
- `npm run audit:country-suite` after country/factory edits.
- `npm run build:country -- --country <slug>` during iteration.
- Full `npm run build` for release-level confidence.
- Browser smoke from `generated/validohub`, not project root.
- Confirm Valido Engine is untouched unless the capability is truly generic platform behavior.

## Where To Fix Shared Problems

If a bug appears across many country tools, fix `assets/js/tools/country-suite-factory.js` and the generating scripts, not individual generated pages.

If accepted bespoke Brazil, Poland, France, or Netherlands need the same UX layer, preserve or improve `assets/js/tools/country-legacy-rich-layer.js` rather than migrating them implicitly.

If generated output looks wrong after a build, update the source runtime, data, CSS, or generator script. Do not hand-edit generated HTML as the fix.
