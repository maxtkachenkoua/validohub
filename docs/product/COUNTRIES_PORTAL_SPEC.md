# Countries Portal Spec

The Countries Portal is the global entry point for ValidoHub country intelligence.

Route:

```text
/en/countries/
```

## Product Goal

The portal should make ValidoHub feel like a global Developer Intelligence Platform, not only a collection of isolated tools. It helps developers discover country hubs, local identifiers, payment systems, banking conventions, government references, locale behavior, and country-specific workbench roadmaps.

## Ownership

The Countries Portal belongs entirely to ValidoHub.

Source files:

- `assets/js/countries.js`: shared country platform metadata, country hub renderer, and Countries navigation.
- `assets/js/portal-countries.js`: Countries Portal renderer and interactions.
- `assets/css/validohub.css`: portal visual system.
- `scripts/build-countries-portal.mjs`: ValidoHub-owned post-publish route builder for `/en/countries/`.

Valido Engine must not contain Countries Portal product logic, country-specific browser behavior, or product styling.

## Route Generation

Current Valido Engine generates home, tool, category, and country hub routes. It does not yet have a generic product page route for `/en/countries/`.

To keep Engine generic, ValidoHub creates the Countries Portal after Engine publish:

```bash
cd /Users/maxtkachenko/work/validohub
node scripts/build-countries-portal.mjs
```

The script uses the generated `/en/` shell, updates SEO for the Countries Portal, inserts a `data-countries-portal` mount point, and writes:

```text
generated/validohub/en/countries/index.html
```

Generated output remains ignored and must not be committed.

## Data Model

Country portal metadata is product-owned browser data exported from `assets/js/countries.js`.

The portal catalog includes:

- Stable country id.
- Flag.
- Country name.
- ISO2 / ISO3.
- Continent / region.
- Primary language.
- Currency code and currency name.
- Developer status.
- Summary.
- Identifiers.
- Payment systems.
- Developer feature tags.
- Available workbench labels.
- Planned workbench labels.
- Completion score.
- Lightweight map coordinates.

Brazil reuses the rich Brazil Country Hub metadata where possible and is marked as the reference implementation.

## Discovery

The portal automatically detects available country hubs from generated locale-first country links in the generated site shell.

Rules:

- If a country has metadata and a generated country hub link exists, the card and map marker open that hub.
- If a country has metadata but no generated country hub link exists, it remains visible as a planned or in-progress country with a Coming Soon state.
- Adding future metadata makes the country appear in the portal.
- Adding a real generated country hub makes the country become clickable without Engine changes.

## Interactions

The portal supports:

- Instant search by country name, ISO code, currency, language, identifier, and payment system.
- Region filter.
- Status filter.
- Developer feature filters for Payments, Identity, Government, and Banking.
- Featured Brazil section with Reference Implementation badge.
- Interactive lightweight world map.
- Hover/focus country previews.
- Continent grouping.
- Completion progress bars.

Countries without hubs must not show fake links. They show Coming Soon instead.

## Visual Polish V1

Visual Polish V1 keeps the existing architecture and functionality intact while improving the premium SaaS feel of the portal.

Implemented visual refinements:

- Stronger hero messaging: "Build country-aware software with confidence."
- Clearer subtitle focused on validation, localization, identifiers, payments, banking standards, and implementation guidance.
- More breathable hero spacing and stronger typography hierarchy.
- Derived platform metrics for countries, workbenches, identifier rules, payment systems, developer guides, and brand assets.
- Brazil presented as the flagship reference country with a premium Reference Implementation badge.
- Subtle country identity accents through top card strips.
- Smoother card hover, focus, lift, and shadow states.
- Improved filter pills with clearer hover and selected states.
- Refined continent headers.
- More polished interactive world map, animated markers, active marker emphasis, and selected-country focus line.
- Reduced-motion handling for users who prefer minimal motion.

Visual Polish V1 does not change:

- Route structure.
- Country discovery.
- Metadata ownership.
- Generated page route materialization.
- Validation behavior.
- Workbench implementation status.
- Valido Engine.

## Progress Calculation

V1 uses an explicit product metadata completion score because the current Engine DSL does not expose a generic country readiness model.

The score is based on current country hub maturity and implemented/generated workbench coverage:

- Brazil is `100%` because it is the current reference Country Hub.
- Poland is in progress because it has a generated hub and PESEL route but not a rich V3 hub yet.
- Roadmap countries show early planned progress.

A future architecture pass may move this to a richer build-time model if needed for SEO or automated reporting.

## Non-Goals

Do not implement:

- PIX validation.
- CPF validation.
- CNPJ validation.
- CEP validation.
- PESEL validation.
- Country-specific validators.
- Runtime APIs.
- Server-side logic.
- New Engine product routes.

## Validation

Validate with:

```bash
node --check assets/js/countries.js
node --check assets/js/portal-countries.js
node --check scripts/build-countries-portal.mjs
```

Then from Valido Engine:

```bash
mvn -q -pl valido-cli exec:java -Dexec.mainClass=com.validoengine.cli.EngineMain -Dexec.args="doctor --site /Users/maxtkachenko/work/validohub/site.yaml"
mvn -q -pl valido-cli exec:java -Dexec.mainClass=com.validoengine.cli.EngineMain -Dexec.args="publish --site /Users/maxtkachenko/work/validohub/site.yaml"
```

Then from ValidoHub:

```bash
node scripts/build-countries-portal.mjs
cd generated/validohub
python3 -m http.server 8130 --bind 127.0.0.1
```

Browser-verify:

- `/en/countries/`
- Search.
- Filters.
- World map.
- Brazil card and marker open `/en/brazil/`.
- Planned countries show Coming Soon.
- Desktop and mobile layout.
- No horizontal overflow.
- No console errors.
