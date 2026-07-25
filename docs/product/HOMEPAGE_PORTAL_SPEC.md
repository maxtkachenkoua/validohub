# Homepage Portal Spec

The Homepage Portal is the global command center for ValidoHub.

Route:

```text
/{locale}/
```

## Product Goal

The homepage must feel like a premium developer work surface, not a marketing landing page. It should help users immediately find a global tool, country hub, local format, validator, generator, or debugging workflow.

The first viewport must expose:

- A clear product promise.
- A working country/tool search.
- Direct links into global tools such as JSON, JWT, Base64, URL, Regex, UUID, IBAN Validator, and IBAN Generator when those routes exist.
- Direct links into strong premium country workbenches.
- A clear path into the Countries Portal.
- Real launcher lanes for global tools, country tools, generators, and the debug contract.

## Ownership

The Homepage Portal belongs entirely to ValidoHub.

Source files:

- `scripts/build-countries-portal.mjs`: renders the Node-owned `/en/` homepage through `compileHomePortal`.
- `scripts/build-portal-dev.mjs`: fast development rebuild for homepage and countries portal only.
- `assets/js/portal-home.js`: homepage search enhancement.
- `assets/css/validohub.css`: homepage visual system.

Valido Engine must not contain ValidoHub homepage product logic, country-specific discovery logic, homepage search behavior, or product styling.

## Fast Development Rebuild

After a prior full publish/build, regenerate only the homepage and Countries Portal with:

```bash
cd /Users/maxtkachenko/work/validohub
npm run build:portal
```

This command:

- Recompiles the shared CSS/JS bundles.
- Copies the homepage and country portal runtime assets into `generated/validohub/assets/js/`.
- Renders `/en/`.
- Renders `/en/countries/` without regenerating every country hub.
- Applies the final localization pass only to `/` and `/countries/` for the configured production locales.

It is a development accelerator. `npm run build` remains the release gate.

## Interaction Rules

- Homepage search must be real. Typing filters visible country/tool cards, and Enter opens the first matching result.
- Suggested search chips must perform an observable search action.
- Cards must link to real existing routes or stable portal routes.
- The homepage must include global tools, not only country tools; users may arrive looking for generic encoding, JSON, JWT, regex, UUID, or IBAN workflows.
- Do not ship fake buttons, inactive controls, or "coming soon" primary actions on the homepage.
- Homepage content must not claim that a country/tool exists unless the linked route exists or the card clearly points to the Countries Portal.
- The Countries Portal `/en/countries/` region filter must expose every current continent group rendered by the directory, including Africa and Oceania.

## Visual Rules

- The homepage is a command center, not a decorative hero-only page.
- Use premium ValidoHub card density, strong typography, and calm operational layout.
- Hero typography must stay useful and scannable; do not regress to oversized marketing type that pushes search and launcher actions out of the first viewport.
- Coverage metrics and example signal buttons are allowed only when they are compact and tied to real homepage behavior.
- The homepage must include a premium interactive world coverage map once all country hubs are generated. Country shapes should use each hub's flag-color visual palette, hover/focus must show a short useful country preview, and click/Enter must open the country hub. Countries missing from the base SVG geometry must remain reachable via visible flag markers rather than disappearing.
- The Countries Portal world map must use a calm neutral atlas by default. Do not fill every country with bright flag colors at rest, and do not try to fake premium country artwork with flat SVG fills. On hover/focus, only the active country shape should receive a restrained outline/glow, while the tooltip renders a premium raster country-shape preview using the saved `assets/images/countries/*-outline.png` asset plus the country name; click/Enter opens the corresponding country hub. Do not add visual fallback squares, diamonds, or circular flag badges on top of the atlas; countries without SVG geometry remain reachable through the country cards/search rather than cluttering the map.
- Avoid huge marketing-only sections, empty stat cards, generic SaaS filler, gradient-only decoration, and one-note palettes.
- Keep the first viewport useful on desktop and mobile.
- Search, cards, metrics, and calls to action must not overflow horizontally.

## Validation

Validate with:

```bash
node --check scripts/build-countries-portal.mjs
node --check scripts/build-portal-dev.mjs
node --check scripts/localization-pass.mjs
node --check assets/js/portal-home.js
npm run build:portal
```

Preview from:

```bash
cd /Users/maxtkachenko/work/validohub/generated/validohub
python3 -m http.server 8130 --bind 127.0.0.1
```

Browser-check:

- `/en/`
- `/en/countries/`
- A localized home route such as `/uk/`
- A localized Countries route such as `/uk/countries/`
- Search filtering and Enter navigation.
- Desktop and mobile layout.
- No console errors.
- No horizontal overflow.
