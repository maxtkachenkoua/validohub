# Country Hub Template Spec

Country hubs are Developer Intelligence pages for country-specific implementation work. They are not validator pages and they are not a promise that every listed local format has a completed workbench.

Brazil is the reference implementation for Country Hub Template V2.

## Purpose

A country hub helps developers quickly understand local identifiers, payment systems, banking formats, locale conventions, government systems, phone and address formats, currencies, time zones, and official references.

The hub should be useful before every country-specific validator exists.

## Route Model

Locale always stays first:

```text
/{locale}/{country-slug}/
/{locale}/{country-slug}/{tool-slug}/
```

Country slugs are stable and not localized:

```text
/en/brazil/
/pt-br/brazil/
/es/brazil/
```

Only human-facing labels and body copy should localize in the future.

## Template Sections

Country Hub Template V2 includes all V1 sections and adds richer developer UX:

- Hero with flag, country name, developer-focused description, status badge, and quick summary.
- Rich Country Statistics.
- Developer Quick Actions.
- Developer Cheat Sheet.
- Local Formats.
- Payments & Banking.
- Government & Official Resources.
- Available Workbenches.
- Planned Workbenches.
- Related Global Tools.
- Discovery Links.
- Things Developers Should Know.
- Developer Notes.
- Developer Examples.
- Disabled layout-safe ad slot regions for future sponsorship or advertising.

## Data Model

The current product-side model lives in `assets/js/countries.js` and is keyed by stable country slug. The renderer is generic; Brazil is the first data entry.

Recommended country data shape:

- `flag`
- `name`
- `badge`
- `description`
- `metadata`
- `stats`
- `quickActions`
- `cheatSheet`
- `localFormats`
- `payments`
- `officialResources`
- `availableWorkbenches`
- `plannedWorkbenches`
- `relatedGlobalTools`
- `relatedCategories`
- `futureCountryPages`
- `highlights`
- `developerNotes`
- `developerExamples`

Do not add unsupported YAML fields to ValidoHub content. If the data model must move into Engine-generated static HTML later, use a generic architecture change or approved ACR.

## Copy UX

Country Hub V2 supports one-click copy for important developer values:

- Locale.
- ISO2.
- ISO3.
- Numeric ISO.
- Currency code.
- Currency symbol.
- Calling code.
- Internet TLD.
- Date format.
- Time format.
- Decimal separator.
- Thousands separator.
- Postal code format.
- Primary time zone.
- Developer code snippets.

Quick actions should hide when a value is unavailable. Copy behavior lives in ValidoHub assets only.

## Status System

Country Hub V2 uses reusable status chips:

- Ready.
- Available.
- Coming soon.
- Planned.
- Experimental.
- Deprecated.

These statuses are UI components for country hubs and future product surfaces. They do not imply a validator exists unless the corresponding workbench is implemented.

## Brazil Reference

Brazil V2 covers:

- Population, capital, largest city, continent, language, currency, calling code, TLD, driving side, ISO codes, locale, date/time, separators, address format, postal code format, and time zones.
- CPF, CNPJ, CEP, PIX, RG, CNH, RENAVAM, Brazilian phone numbers, and Brazil banking notes.
- PIX, bank code, currency, payment identifier, QR payment, and SWIFT/BIC notes.
- Label-only official resource references for Banco Central do Brasil, Receita Federal, Correios, Gov.br, and PIX documentation.
- Existing Brazil-related generated page: Brazil Pix Validator, clearly labeled as a content scaffold rather than a working validator.
- Planned workbenches: PIX Workbench, CPF Validator, CNPJ Validator, CEP Lookup, Brazil Phone Validator, and Brazil Banking Tools.
- Related categories, related global tools, and future country hub placeholders without broken links.
- Developer examples for Java Locale, JavaScript Intl, JavaScript Date, Python locale, ICU locale, SQL/PostgreSQL formatting, currency formatting, and date formatting.

This does not implement PIX, CPF, CNPJ, CEP, phone, or banking validation.

## Search And Discovery Preparation

Country Hub V2 adds semantic `data-country-tags` attributes to cards for future filtering/search.

Current tag families include:

- identifiers
- payments
- government
- addresses
- phone
- banking
- locale
- currency
- tax
- postal
- developer
- workbench
- country

## SEO Strategy

Current V2 is a product-side enhancement over the Engine-generated country hub. The fallback HTML remains a valid country page with canonical route and existing Engine SEO.

Future generic Engine work may be needed if rich country intelligence content must be fully rendered at build time for SEO. That change must stay country-agnostic and must not add Brazil-specific Engine logic.

## Localization Strategy

The model should support localized human-facing labels later, but route slugs must remain stable. Locale remains the first path segment.

Do not translate country slugs.

## Ad Slot Strategy

V1 includes disabled, hidden ad slot regions in the rendered hub. They are layout-safe hooks for future sponsorship or ads and do not render visible ad UI.

Future ad placement must not interrupt the main country intelligence flow.

## Future Country Expansion

Future country hubs should reuse the same model and sections for Poland, Spain, Germany, Austria, France, United Kingdom, Italy, Portugal, Netherlands, Belgium, United States, Canada, and Australia.

Adding country-specific validators requires separate product specs before implementation.
