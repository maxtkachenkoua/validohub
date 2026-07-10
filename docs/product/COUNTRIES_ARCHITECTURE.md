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
/en/spain/
/en/tools/base64-encoder/
/en/countries/
```

The global Countries Portal route is a ValidoHub product route:

```text
/{locale}/countries/
```

Current Valido Engine does not generate arbitrary product landing pages, and metadata-only country hubs may not have an Engine-generated route until a country-specific tool exists. ValidoHub therefore materializes `/en/countries/` and missing metadata-only country hub shells after publish through `scripts/build-countries-portal.mjs`, using the generated site shell and ValidoHub-owned browser assets. This is intentionally product-owned and must not become country-specific Engine behavior.

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

## Countries Portal

The Countries Portal is documented in `docs/product/COUNTRIES_PORTAL_SPEC.md`.

Source ownership:

- `assets/js/countries.js` owns shared country metadata, generated country hub discovery helpers, Country Hub rendering, and Countries navigation.
- `assets/js/portal-countries.js` owns portal rendering, search, filters, previews, and lightweight map interactions.
- `scripts/build-countries-portal.mjs` creates `/en/countries/` in generated output after Engine publish.

Discovery rules:

- Available country hubs are discovered from generated locale-first country links.
- Countries with metadata but no generated country hub remain visible as planned or in-progress entries.
- Future metadata additions make countries appear in the portal.
- Future generated country hubs become clickable automatically when their route exists.

Progress rules:

- V1 uses explicit ValidoHub product metadata because the current Engine DSL does not have a generic country readiness model.
- Brazil is the reference country and appears as `100%`.
- Countries with generated but incomplete hubs can be marked in progress.
- Roadmap countries show planned progress.

The portal must never imply that a validator exists when only a roadmap entry exists.

## Country Hub Requirements

Country hubs should support:

- Hero title and summary.
- SEO title and description.
- Featured workbenches.
- Category grouping.
- Related country workbenches.
- Future sponsor or ad layout regions that do not interrupt the tool-first experience.

Current MVP hubs are generated from `countries/` plus related country tools. More advanced hub composition requires a future generic Engine capability and must not be hardcoded for one country.

Brazil is the reference implementation for Country Hub Template V3 and Country Hub Visual Identity V2. See `docs/product/COUNTRY_HUB_TEMPLATE_SPEC.md`.

The permanent Country Hub design standard lives in `docs/product/COUNTRY_HUB_DESIGN_GUIDE.md`. Future AI sessions must also read `docs/ai/COUNTRY_HUB_AI_GUIDE.md` before country hub work.

Country Hub V3 keeps country-specific facts in product-owned country metadata and uses generic rendering logic for sections, visual identity assets, official brand placeholders, cards, status chips, copy controls, semantic discovery tags, snippets, ecosystem diagrams, and hidden future ad slots.

Spain Country Hub V1 proves that this model can be reused by adding country metadata and assets rather than a country-specific page system. Spain reuses the Brazil renderer, section order, status system, Brand Asset System, visual asset registry, copy controls, snippets, and Countries Portal discovery behavior.

Country Hub Visual Identity V2 keeps geographic visuals in ValidoHub-owned assets:

- Country outline SVGs live under `assets/images/countries/`.
- Highlighted world map SVGs live under `assets/images/countries/`.
- `assets/js/countries.js` owns the product-side visual asset registry.
- Country data provides a stable `visualIdentity.countryId`; the renderer resolves that id to approved SVG assets.

Use real public-domain, official, permissively licensed, or otherwise legally usable assets whenever available. Use placeholders only when an appropriate asset genuinely cannot be bundled.

Official logos and wordmarks must not be redrawn. Add official logo assets only when usage rights are clear enough for the product repository; otherwise keep the text brand badge and document the licensing limitation.

The global brand policy applies to Country Hubs, workbenches, Markdown, docs, navigation, generated pages, and future product surfaces:

- Use official SVG/logo assets when legally usable.
- Prefer monochrome brand marks for premium documentation UI.
- Use semantic icons only when no official brand identity exists.
- Avoid emoji icons in new production UI.

## Navigation

Navigation must scale beyond two countries.

Product-side navigation may group country hubs under a Countries entry, but it must not hardcode Brazil or Poland. It should derive countries from generated country links and preserve the original locale-first URLs.

The Countries menu includes an `All Countries` entry pointing to `/en/countries/`. Generated country hub links are grouped beneath it.

## Future Countries

The product should be ready to add:

- Brazil
- Poland
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

Future countries must inherit the Brazil layout and design language. Spain, Poland, Germany, France, Japan, and every future country should change metadata and local content, not the page architecture.

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
