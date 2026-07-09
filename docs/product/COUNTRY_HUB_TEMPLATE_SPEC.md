# Country Hub Template Spec

Country hubs are Developer Intelligence pages for country-specific implementation work. They are not validator pages and they are not a promise that every listed local format has a completed workbench.

Brazil is the reference implementation for Country Hub Template V3.

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

Country Hub Template V3 includes all V1 and V2 sections and adds a richer Developer Country Intelligence Portal model:

- Hero with flag, country name, developer-focused description, status badge, and quick summary.
- Rich Country Statistics.
- Country visual identity placeholders.
- Official brand/logo placeholder support.
- Developer Quick Actions.
- Developer Country Profile.
- Developer Cheat Sheet.
- Localization Examples.
- Address Example.
- Phone Number Examples.
- Local Formats.
- Developer Integration Checklist.
- Validation Rules.
- Common Integration Mistakes.
- Payments & Banking.
- Banking Overview.
- Government & Official Resources.
- Available Workbenches.
- Planned Workbenches.
- Related Global Tools.
- Discovery Links.
- Things Developers Should Know.
- Developer Notes.
- Developer API Examples.
- JSON Examples.
- Localization Notes.
- Country Ecosystem.
- Disabled layout-safe ad slot regions for future sponsorship or advertising.

## Data Model

The current product-side model lives in `assets/js/countries.js` and is keyed by stable country slug. The renderer is generic; Brazil is the first data entry.

Recommended country data shape:

- `flag`
- `name`
- `badge`
- `description`
- `metadata`
- `visualIdentity`
- `stats`
- `countryProfile`
- `quickActions`
- `cheatSheet`
- `localizationExamples`
- `addressExample`
- `phoneExamples`
- `localFormats`
- `integrationChecklist`
- `validationRules`
- `commonMistakes`
- `payments`
- `bankingOverview`
- `officialResources`
- `availableWorkbenches`
- `plannedWorkbenches`
- `relatedGlobalTools`
- `relatedCategories`
- `futureCountryPages`
- `highlights`
- `developerNotes`
- `developerExamples`
- `jsonExamples`
- `localizationNotes`
- `ecosystem`

Do not add unsupported YAML fields to ValidoHub content. If the data model must move into Engine-generated static HTML later, use a generic architecture change or approved ACR.

## Visual Identity And Brand Placeholders

Country Hub V3 supports reusable visual placeholders for:

- Country shape / outline.
- Small country location map panel.
- Continent badge.
- Official brand or logo placeholders for systems such as PIX, Banco Central do Brasil, Gov.br, Correios, SWIFT, Visa, Mastercard, and future country-specific brands.

Do not invent unofficial artwork. Use placeholders until official assets are approved.

## Copy UX

Country Hub V3 supports one-click copy for important developer values:

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

Country Hub V3 uses reusable status chips:

- Ready.
- Available.
- Coming soon.
- Planned.
- Experimental.
- Deprecated.

These statuses are UI components for country hubs and future product surfaces. They do not imply a validator exists unless the corresponding workbench is implemented.

## Brazil Reference

Brazil V3 covers:

- Population, capital, largest city, continent, language, currency, calling code, TLD, driving side, ISO codes, locale, date/time, separators, address format, postal code format, and time zones.
- Developer Country Profile for area, measurement system, paper size, plug types, voltage, frequency, emergency number, week starts, RTL support, Unicode locale, ICU locale, CLDR locale, and metric/imperial context.
- Localization examples for date, time, currency, decimal, percentage, phone, postal code, address, and person name.
- Address and phone examples with field-level explanations.
- Developer Integration Checklist.
- Validation Rules summaries for CPF, CNPJ, CEP, phone, PIX, and bank code.
- Common Integration Mistakes.
- CPF, CNPJ, CEP, PIX, RG, CNH, RENAVAM, Brazilian phone numbers, and Brazil banking notes.
- PIX, TED, DOC, Boleto, SWIFT, bank code, currency, payment identifier, QR payment, and IBAN notes.
- Label-only official resource references for Banco Central do Brasil, Receita Federal, Correios, Gov.br, and PIX documentation.
- Existing Brazil-related generated page: Brazil Pix Validator, clearly labeled as a content scaffold rather than a working validator.
- Planned workbenches: PIX Workbench, CPF Validator, CNPJ Validator, CEP Lookup, Brazil Phone Validator, and Brazil Banking Tools.
- Related categories, related global tools, and expanded future country hub placeholders without broken links.
- Developer API examples for Java, JavaScript, TypeScript, Python, Go, C#, Kotlin, PostgreSQL, text notes, and JSON payload examples.
- Localization Notes for plural rules, week start, calendar, sorting, Unicode, ICU, and locale naming.
- Country Ecosystem relationship cards connecting PIX, CPF, CNPJ, CEP, phone, banks, government, and payments.

This does not implement PIX, CPF, CNPJ, CEP, phone, or banking validation.

## Search And Discovery Preparation

Country Hub V3 continues to add semantic `data-country-tags` attributes to cards for future filtering/search.

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

Current V3 is a product-side enhancement over the Engine-generated country hub. The fallback HTML remains a valid country page with canonical route and existing Engine SEO.

Future generic Engine work may be needed if rich country intelligence content must be fully rendered at build time for SEO. That change must stay country-agnostic and must not add Brazil-specific Engine logic.

## Localization Strategy

The model should support localized human-facing labels later, but route slugs must remain stable. Locale remains the first path segment.

Do not translate country slugs.

## Ad Slot Strategy

The rendered hub includes disabled, hidden ad slot regions. They are layout-safe hooks for future sponsorship or ads and do not render visible ad UI.

Future ad placement must not interrupt the main country intelligence flow.

## Future Country Expansion

Future country hubs should reuse the same model and sections for Poland, Spain, Germany, Austria, France, United Kingdom, Italy, Portugal, Netherlands, Belgium, United States, Canada, and Australia.

Adding country-specific validators requires separate product specs before implementation.
