# Countries Architecture

Countries are a first-class ValidoHub product section. They organize local, jurisdiction-specific developer tools without moving product behavior into Valido Engine.

## Ownership

ValidoHub owns the Countries product experience:

- Country content and configuration in `countries/`.
- Country-linked tool definitions in `tools/`.
- Country navigation and product UX in `assets/` when needed.
- Product documentation and future workbench specifications in `docs/product/`.

Valido Engine remains the generic platform. It may generate routes, breadcrumbs, SEO, static assets, and static pages, but it must not contain Brazil-, Poland-, PESEL-, PIX-, CPF-, CNPJ-, NIE-, DNI-, or country-specific product logic.

## Routing Rules

Locale is always the first route segment.

```text
/{locale}/tools/{tool-slug}/
/{locale}/{country-slug}/
/{locale}/{country-slug}/{tool-slug}/
```

Rules:

- Never remove locale prefixes.
- Do not localize route slugs.
- Human-facing titles, descriptions, and body content localize; URLs stay stable.
- Global tools use `/tools/`.
- Country workbenches live under their country hub.
- Country slugs are stable product identifiers, not translated labels.

Current examples:

```text
/en/brazil/
/en/brazil/brazil-pix-validator/
/en/poland/
/en/poland/pesel-validator/
/en/tools/base64-encoder/
```

## Product Hierarchy

The user mental model is:

```text
Global Tools > Countries > Country > Workbench
```

Country hubs should make it clear which local tools are available and should avoid mixing country-specific workflows into the global tools list as if they were interchangeable generic utilities.

## Current Metadata Model

Current ValidoHub content uses the existing Engine DSL only:

- `countries/*.yaml` defines country hubs.
- `tools/*.yaml` declares `country` for country-specific workbenches.
- `category`, `capabilities`, `related`, and `seo` provide grouping and discovery.

Do not add undocumented DSL fields in ValidoHub content.

## Future Metadata Requirements

The Countries product model should eventually support reusable metadata such as:

- Country.
- Categories.
- Tags.
- Featured status.
- Display order.
- Icon.

These fields must be introduced only through a deliberate Engine architecture change or approved ACR if the current DSL cannot support them. Until then, use the existing fields and document future needs here.

## Country Hub Requirements

Country hubs should support:

- Hero title and summary.
- SEO title and description.
- Featured workbenches.
- Category grouping.
- Related country workbenches.
- Future sponsor or ad layout regions that do not interrupt the tool-first experience.

Current MVP hubs are generated from `countries/` plus related country tools. More advanced hub composition requires a future generic Engine capability and must not be hardcoded for one country.

Brazil is the reference implementation for Country Hub Template V3. See `docs/product/COUNTRY_HUB_TEMPLATE_SPEC.md`.

Country Hub V3 keeps country-specific facts in product-owned country metadata and uses generic rendering logic for sections, visual identity placeholders, official brand placeholders, cards, status chips, copy controls, semantic discovery tags, snippets, ecosystem diagrams, and hidden future ad slots.

## Navigation

Navigation must scale beyond two countries.

Product-side navigation may group country hubs under a Countries entry, but it must not hardcode Brazil or Poland. It should derive countries from generated country links and preserve the original locale-first URLs.

## Future Countries

The product should be ready to add:

- Brazil
- Poland
- Spain
- Germany
- Austria
- France
- United Kingdom
- Italy
- Portugal
- Netherlands
- Belgium
- United States
- Canada
- Australia

Adding a country should not require Engine code changes unless a genuinely generic platform capability is missing.

## Explicit Non-Goals For This Phase

This phase does not implement new validators or workbenches.

Do not implement:

- PIX validation.
- CPF validation.
- CNPJ validation.
- PESEL validation.
- NIE validation.
- DNI validation.
- Any Java algorithm execution.
- Any backend service.

Country-specific validators require their own product specs before implementation.
