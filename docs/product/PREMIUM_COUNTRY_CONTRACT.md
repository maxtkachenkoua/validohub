# Premium Country Contract

This is the executable product contract for any country described as **full premium**. It converts lessons from Brazil, Poland, France, Netherlands, Switzerland, Germany, Italy, and Spain into rules that future countries must pass before sign-off.

## Product Outcome

A full premium country is a browser-only developer suite for local compliance and data workflows. It must feel like a polished product, not generated filler:

- Country hub with country-specific content, route groups, highlights, developer notes, official boundaries, ecosystem links, localization notes, and available workbenches.
- Country hub technical standards with non-empty plug type, voltage, grid frequency, and emergency-number values.
- Country hub search with local market hints in the placeholder/chips, such as BLIK, PIX, Multibanco, KID, Bankgiro, PlusGiro, OGM, variable symbol, viitenumero, Eircode, HETU, CPR, CVR, CNP, or the strongest equivalent local identifiers/payment abbreviations. Do not ship only generic `IBAN, SWIFT/BIC, SEPA, VAT, INVOICE`.
- Country visual assets and hero accents that visibly use the local flag/brand palette. New generated countries must not reuse the same generic teal/blue placeholder visual system. Country outline/location cards must use real Natural Earth geometry whenever available; Brazil is the reference for this visual quality.
- Country hub civic snapshot before Developer Actions with flag, state languages, capital, major cities with approximate population, and useful country-level developer context.
- Country civic snapshot must use a dedicated inner layout wrapper, not the same CSS class as the outer section. It must never overlap headings, fact cards, or city lists at desktop or mobile widths.
- Country breadcrumbs with a single separator. `Home / / Countries / / X` is a regression.
- No `Official + language` quick-action block unless the pill truly navigates to an available production-localized route for that official/government language.
- Brazil-style first-viewport flag-gradient hero background. A mostly white country hero with weak/invisible national colors is not premium.
- Every generated country hero and civic snapshot must carry inline flag-gradient CSS variables from the country's visual identity, or an explicit equivalent theme class. Do not depend on old hard-coded country classes only.
- Tool suite covering the country's real local developer needs: identifiers, tax, banking, payments, addresses, phone, documents, privacy/redaction, logistics, locale formatting, API payloads, and test fixtures when those domains exist.
- Every tool has immediate analysis, normalization, masking where relevant, copy/download, validation pipeline, field breakdown, quality notes, advanced analysis, developer JSON, and offline/live boundary copy.
- Every country-scoped tool must be as rich as the domain honestly allows.
- Existing bespoke country runtimes must not regress below this bar while they remain outside Country Suite Factory V1. Brazil, Poland, France, and Netherlands pages must load the shared legacy rich layer before their suite runtime so accepted analyzers keep PESEL-level history, batch, API preview, raw JSON, and related-tool ergonomics.
 Factory-based country runtimes must provide the same depth natively through `csf-rich-lab`; this is mandatory for current factory countries and every future country generated from Country Suite Factory V1.
 Poland PESEL is the debug-depth reference: presets/history, batch where useful, immediate result cards, validation pipeline, field/evidence breakdown, calculation/parser debugger, repair suggestions, developer API preview, and raw JSON/audit output are part of the premium bar.
- Every production locale renders the same structural quality. The core production locales are `en`, `es`, `pt-BR`, `de`, `fr`, `pl`, and `uk`.

## Tool Count Rule

Sixty tools is a reference density from Spain, Italy, Switzerland, and Germany. It is not a quota, not a cap, and not an excuse for filler.

- Add more than 60 tools when the country has more genuinely useful offline/browser-only local workflows.
- Ship fewer than 60 tools when the country does not honestly support that many strong local workbenches.
- Never pad a suite with generic, duplicate, or weak tools just to hit a number.
- Every included tool must justify its existence for the local market and must pass the same premium workbench standard.

## Mandatory Tool Standard

Every country-scoped tool must include:

- Compact Brazil-scale premium shell, not a generic `Workbench / Run the tool` utility page.
- Short mark/code badge, concise summary, short sample labels, country-local related tools, and no raw payloads in selectors.
- Browser-only validation or analysis with explicit official/live lookup boundaries.
- Success states that are green/teal/neutral, never red; red is reserved for actual errors or destructive warnings.
- Validation pipeline with meaningful checks, not decorative placeholder steps.
- Dedicated field breakdown panel for every tool. This is mandatory for debugging: split identifiers, bank accounts, taxes, address/phone components, document parts, detected CSV/data fields, evidence slices, or local parsing groups as appropriate.
- Result cards with normalized/masked/copyable values where relevant.
- Quality notes explaining privacy, fixture safety, official boundary, and developer handling.
- Advanced analysis and developer payload that wrap locally and cannot create page-level horizontal overflow.
- A PESEL-like debug layer: either checksum replay, parser stages, field extraction evidence, data-quality diagnostics, or another domain-specific debugger. Do not fake math for non-math tools; expose the real evidence the browser can prove.

## Mandatory Country Hub Standard

Every full premium country hub must include country-specific source data and rendered content:

- No foreign fallback copy from Poland, Brazil, France, Germany, Spain, Italy, Switzerland, Netherlands, or any other country unless the section is explicitly comparative.
- No literal `[object Object]` anywhere in generated pages.
- No empty headings, empty card summaries, icon-only cards, or status-only cards.
- Lower-page structured data must render human titles and summaries from `title/text`, `name/description`, `label/description`, `language/code`, and `note` shapes.
- Country ecosystem and localization sections must show useful real content, not icon plus `available` badges.
- Route groups and related links must be country-local by default.
- Technical standards cards must not be empty. If plug type, voltage, frequency, or emergency number is unknown, research/fill it before full-premium sign-off.
- Search placeholders and shortcut chips must include local identifiers and payment systems, not only generic European banking terms.
- Outline/location cards must carry country-specific color treatment derived from flag/visual identity values and real country geometry from the shared Natural Earth map source whenever available. Generic polygons, abstract waves, and ISO-only placeholders are not accepted for full-premium countries when real geometry exists.
- Inlined country SVG visuals must not contain `<style>` blocks. Active-country paint and base map paint must be expressed through SVG attributes or external bundle CSS so generated HTML passes integrity checks and never degrades into raw unstyled pages.
- Civic snapshot must appear before Developer Actions and include flag, official/state languages, capital, main cities with approximate population, and city shield-style icons.
- Civic snapshot layout must be structurally stable: one outer `vh-country-civic-snapshot` section, one inner `vh-country-civic-layout` wrapper, responsive fact cards, wrapped long values, and no duplicated layout class on child divs.
- Breadcrumbs must not receive duplicate separator systems.
- Country hero background must visibly use the flag/visual identity palette, matching the Brazil country-hub strength.

## Localization Contract

Full premium includes runtime localization, not only static route titles:

- Workbench controls, statuses, empty states, errors, diagnostics, sample labels, field breakdowns, pipeline labels, quality notes, advanced headings, developer payload labels, copy/download labels, and boundary copy must be localized for every configured production locale.
- English-only runtime strings are acceptable only for protocol names, official abbreviations, code literals, sample identifiers, or intentionally local terms.
- If a new locale is added, the structural guardrails apply to that locale immediately.

## Factory Contract

New country suites should use Country Suite Factory V1 unless a country spec documents a strong reason for a bespoke runtime.

- Generated pages must load `country-suite-factory.js` before the country runtime.
- Factory routes must collapse the generic workbench to a minimal static host before scripts run.
- Finished factory pages must not ship `.workbench-heading` or visible `Run the tool` fallback copy.
- Finished factory pages must mount `.csf-rich-lab` along with `.csf-hero`, `.csf-result-card`, `.csf-pipeline`, `.csf-breakdown`, `.csf-quality`, and `.csf-advanced`.
- Every analyzer must return non-empty `fields`, `breakdownTitle`, `breakdownSummary`, and `breakdown` slices or an equivalent explicit breakdown structure.

## Acceptance Gates

Before calling any country full premium:

1. Run `npm run build:country -- --country <slug>` during development. The selected-country build must refresh the hub and all local country tool pages for that slug, including current CSS/JS bundle links.
2. Run `npm run audit:country-premium -- --country <slug>` and fix blockers.
3. Run `npm run audit:country-suite` and fix blockers.
4. Build the full site and confirm `Build Integrity Verification: PASSED` before release sign-off.
5. Run Engine doctor against `site.yaml` when the change affects generated routes or site structure.
6. Browser-check representative identifier, banking/tax, developer/data, document/privacy, and locale/address tools on desktop and mobile.
7. Confirm generated output under `generated/validohub` is not committed.
8. Confirm Valido Engine remains untouched unless a truly generic platform capability was required.

## Regression Blocklist

A future country is not complete if any of these appear:

- Generic `Run the tool` shell or hybrid generic plus premium shell.
- Missing field breakdown.
- Red success styling.
- `[object Object]`.
- Empty lower-page cards or headings.
- Empty technical standards cards.
- Generic country search placeholder/chips without local payment systems or identifier abbreviations.
- Generic non-flag visual cards or reused teal/blue placeholder accents for a new country.
- Missing civic snapshot before Developer Actions.
- Civic snapshot overlap, duplicated snapshot class on inner wrappers, or missing `vh-country-civic-layout`.
- Breadcrumb official-language quick actions when official-language navigation is not real.
- Double breadcrumb separators.
- Weak mostly-white hero background without visible flag-gradient wash.
- Missing inline flag-gradient variables on generated country hero or civic snapshot.
- Inline `<style>` blocks embedded by country SVG/map assets.
- Icon-only/status-only ecosystem/localization cards.
- Raw payload sample labels.
- Foreign fallback copy.
- Cross-country related links by default.
- Horizontal overflow from long values, JSON, tables, selectors, or code blocks.
- English-only interactive runtime in configured production locales.
