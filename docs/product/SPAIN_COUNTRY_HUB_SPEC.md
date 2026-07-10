# Spain Country Hub Spec

Spain Country Hub V1 proves that the Brazil Country Hub reference implementation can be reused for another country without a new page system.

Route:

```text
/en/spain/
```

## Scope

Spain V1 is a Country Intelligence Hub, not a validator suite.

Included:

- Spain country profile and developer metadata.
- Spain outline and world-map visual identity assets.
- Local identifier and format guidance.
- Locale, address, phone, timezone, currency, and formatting examples.
- Payments and banking context for EUR, SEPA, Spanish IBAN, SWIFT/BIC, Bizum, cards, direct debit, and VIES.
- Official resource labels for Spanish, EU, postal, banking, tax, and social-security systems.
- Planned Spain workbench roadmap.
- Developer snippets and JSON examples.

Not included:

- DNI, NIE, NIF, CIF, VAT, IBAN, phone, postal-code, Bizum, or vehicle validation.
- Payment initiation, bank verification, VIES calls, identity verification, tax advice, or legal guidance.
- Spain-specific layout, CSS, renderer, or Engine behavior.

## Structured Metadata

Spain is implemented through the shared `COUNTRY_HUBS.spain` data model in `assets/js/countries.js`.

The profile includes:

- Name: Spain.
- Native name: España.
- ISO2: `ES`.
- ISO3: `ESP`.
- Numeric ISO: `724`.
- Locale: `es-ES`.
- ICU / CLDR locale: `es_ES`.
- Currency: Euro (`EUR`, `€`).
- Calling code: `+34`.
- TLD: `.es`.
- Postal-code format: `NNNNN`.
- Date format: `DD/MM/YYYY`.
- Time format: 24-hour `HH:mm`.
- Decimal separator: comma.
- Thousands separator: dot.
- Primary timezone: `Europe/Madrid`.
- Timezone note: mainland and Balearic Islands use CET/CEST; Canary Islands use a different local timezone offset.
- Official/common languages: Spanish plus regional co-official languages where applicable.

Population is intentionally approximate and should not be treated as a timeless constant.

## Visual Identity

Spain uses the existing Country Visual System:

- Country outline: `assets/images/countries/spain-outline.svg`.
- Shared world location map: `assets/images/countries/world-map.svg`, with Spain marker metadata rendered by the shared Country Visual System.
- Flag and Europe continent badge through the shared renderer.

No Spain-specific renderer branch or CSS was introduced.

## Identifiers And Formats

Spain V1 documents these as planned or reference contexts only:

- DNI.
- NIE.
- NIF.
- Legacy CIF terminology.
- NAF / Social Security number.
- Spanish postal code.
- Spanish phone numbers.
- Spanish IBAN.
- BIC / SWIFT.
- EU VAT / VIES.
- Vehicle registration.
- Bizum.

Important distinctions:

- DNI, NIE, NIF, and legacy CIF are not interchangeable terms.
- Formatting validation is not identity verification.
- VIES status lookup is different from local VAT syntax validation.
- IBAN checksum validation does not prove account ownership.

## Brand Asset Use

Spain V1 adds reusable Brand Asset entries for:

- Bizum.
- VIES.
- European Union.
- Gobierno de España.
- Agencia Tributaria.
- Seguridad Social.
- Banco de España.
- Correos.

These entries use project-owned glyphs or text-brand treatment. Official logos are not bundled until usage rights are clear.

## Official Resource Strategy

Spain V1 uses the existing label-only official-resource pattern to avoid guessed deep links.

Reference categories:

- Government: Gobierno de España / Administracion.gob.es.
- Identity: Ministerio del Interior.
- Tax: Agencia Tributaria.
- Social security: Seguridad Social.
- Banking: Banco de España.
- Postal: Correos.
- EU VAT: European Commission VIES.
- Payments: European Payments Council / SEPA.

Future workbench specs must verify exact official URLs before adding deep links.

## Planned Workbenches

Planned Spain-specific workbenches:

- DNI Validator.
- NIE Validator.
- NIF Inspector.
- Legacy CIF Inspector.
- Spain Phone Validator.
- Spain Postal Code Validator.
- Spain VAT / VIES Workbench.
- Spanish IBAN Tools.
- Bizum Reference / Inspector.

None are implemented in Spain V1.

## Reuse Audit

Reused systems:

- Existing Engine-generated country route.
- Existing Country Hub renderer.
- Existing Country Hub section model.
- Existing Country Visual System.
- Existing Brand Asset System.
- Existing status chips, cards, copy controls, snippets, discovery links, and hidden ad-slot hooks.
- Existing Countries Portal discovery and filters.

Generic additions:

- New reusable Spain/EU brand entries.
- Spain geography assets in the existing country asset location.
- Generic post-publish metadata-only country route materialization through `scripts/build-countries-portal.mjs`.
- Generic portal search support for country `nativeName`.
- Generic renderer copy cleanup so section headings no longer mention Brazil on every country.
- Related global tool cards now pass through `brandKey` generically.

Valido Engine remains untouched.
