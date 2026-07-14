# Current State

This document records the current ValidoHub and Valido Engine boundary so future sessions do not accidentally undo it.

## Repository Boundary

- Valido Engine is now a generic static site generator.
- ValidoHub owns product content, configuration, and browser assets.
- Site-specific browser behavior lives in `validohub/assets/`, not in Valido Engine.
- The browser-side Workbench Framework lives in `validohub/assets/js/workbench/`.
- Tool plugins live in `validohub/assets/js/tools/`.
- The Brand Asset System lives in `validohub/assets/js/brand-assets.js`.

## Current Working Plugins

- Base64 Workbench: `assets/js/tools/base64.js`
- URL Workbench: `assets/js/tools/url.js`
- JSON Workbench: `assets/js/tools/json.js`
- JWT Workbench: `assets/js/tools/jwt.js`
- PIX Workbench: `assets/js/tools/pix.js`


## Countries Platform

Countries are now treated as a first-class ValidoHub product section.

Current country hubs:

- Brazil: `/en/brazil/`
- Poland: `/en/poland/`
- Spain: `/en/spain/`

Current country workbench routes:

- Brazil PIX Workbench: `/en/brazil/brazil-pix-validator/`
- PESEL Validator: `/en/poland/pesel-validator/`

Route rules:

- Locale is always the first path segment.
- Global tools stay under `/{locale}/tools/{tool-slug}/`.
- Country hubs stay under `/{locale}/{country-slug}/`.
- Country workbenches stay under `/{locale}/{country-slug}/{tool-slug}/`.
- Do not localize route slugs.

The Countries navigation is ValidoHub-owned product behavior in `assets/js/countries.js`. It groups generated country hub links under a scalable Countries menu without hardcoding country names or changing Engine templates.

The global Countries Portal is now a ValidoHub-owned product page at:

```text
/en/countries/
```

Current source files:

- Portal metadata and shared country exports: `assets/js/countries.js`.
- Portal renderer and interactions: `assets/js/portal-countries.js`.
- Portal styling: `assets/css/validohub.css`.
- Post-publish route materializer: `scripts/build-countries-portal.mjs`.

The portal discovers available country hubs from generated links, shows roadmap countries from product-owned country metadata, groups countries by continent, supports instant search and filters, includes a lightweight interactive world map, and highlights Brazil as the Reference Implementation.

Countries Portal Visual Polish V1 is complete. The portal now uses stronger product messaging, richer derived platform metrics, subtle country identity accents, improved card elevation, polished filter controls, a more prominent world map interaction, refined continent headings, and a premium Brazil reference badge. This was a visual iteration only; routing, discovery, metadata ownership, and Engine boundaries did not change.

Current Engine does not generate arbitrary product pages such as `/en/countries/`, and it only emits country hubs that are connected to generated country-specific tools. To keep Engine generic, ValidoHub materializes the Countries Portal and metadata-only country hub shells after publish with `node scripts/build-countries-portal.mjs`. Do not move this product behavior into Engine unless a future generic static-page capability is approved.

Brazil now uses Country Hub Template V3 as the reference Developer Country Intelligence Portal. It also uses Country Hub Visual Identity V2 for real SVG geography. The rich hub is rendered by `assets/js/countries.js` from a generic country metadata structure and keeps the Engine-generated country page as fallback HTML.

Spain Country Hub V1 is complete as the first architecture-reuse proof for the Brazil reference system. Spain is implemented through the same shared country metadata model, renderer, Brand Asset System, Country Visual System, copy controls, status chips, snippets, cards, and Countries Portal discovery behavior. It adds Spain outline and world-map SVG assets plus Spain/EU reusable brand entries, but it does not implement DNI, NIE, NIF, VAT, phone, postal-code, Bizum, payment, banking, or identity validators.

Brazil is also the canonical Country Hub design reference. Future country hubs must read `docs/product/COUNTRY_HUB_DESIGN_GUIDE.md` and `docs/ai/COUNTRY_HUB_AI_GUIDE.md` before implementation. Spain, Poland, Germany, France, Japan, and all future countries inherit the Brazil structure and design language; only metadata and local content should change.

Country Hub Template V3 includes:

- Hero and quick summary.
- Real Brazil SVG outline and highlighted world map visual identity.
- Rich Country Statistics.
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
- Developer API Examples with copyable snippets.
- JSON Examples.
- Localization Notes.
- Country Ecosystem.
- Copy buttons for important code/value fields.
- Reusable status chips.
- Official brand/logo placeholder support.
- Semantic discovery tags for future filtering/search.
- Hidden future ad-slot regions.

This does not implement PIX, CPF, CNPJ, CEP, phone, or banking validators.

Advanced metadata such as tags, featured status, display order, and icon remain future architecture requirements unless the Engine DSL explicitly supports them.

Permanent Country Hub rules:

- Brazil is the reference implementation.
- Country Hub improvements must be reusable.
- New country hubs must not invent different layouts.
- Official and famous brand identities should use legally usable official SVG/logo assets where possible.
- Monochrome SVG logos are preferred for a calm documentation-grade appearance.
- Semantic icons are for non-branded concepts such as CPF, CNPJ, CEP, Regex, JSON, Base64, URL, Unicode, Locale, Calendar, and ICU.

## Brand Asset System

ValidoHub now has a project-wide Brand Asset System:

- Architecture doc: `docs/product/BRAND_ASSET_SYSTEM.md`.
- Registry doc: `docs/product/BRAND_REGISTRY.md`.
- Runtime registry: `assets/js/brand-assets.js`.
- First reference consumer: Brazil Country Hub through `assets/js/countries.js`.

Every current and future page, workbench, Country Hub, card, navigation surface, Markdown page, and generated page must use the Brand Asset System when a recognizable brand, technology, organization, payment system, language, database, framework, protocol, standard, or ecosystem appears visually.

AI assistants must check the Brand Registry before choosing a logo or icon. New brands require a registry entry first.

Current registered brands include PIX, Java, Python, Go, Kotlin, C#, .NET, Node.js, React, Next.js, TypeScript, JavaScript, Docker, Kubernetes, PostgreSQL, MySQL, MongoDB, Redis, JWT, Stripe, Visa, Mastercard, American Express, SWIFT, SEPA, IBAN, Bizum, VIES, European Union, GitHub, OpenAPI, GraphQL, gov.br, Gobierno de España, Agencia Tributaria, Seguridad Social, Banco de España, Banco Central do Brasil, Receita Federal, Correos, and Correos Spain.

## Generated Site Root

The generated static site root is:

```text
/Users/maxtkachenko/work/validohub/generated/validohub
```

This is intentional. Do not serve ValidoHub from the project root. The project root contains source files such as YAML, Markdown, product docs, and raw assets. The deployable website is the generated output directory.

## Commands

Run these from `/Users/maxtkachenko/work/valido-engine`.

Doctor:

```bash
mvn -q -pl valido-cli exec:java -Dexec.mainClass=com.validoengine.cli.EngineMain -Dexec.args="doctor --site /Users/maxtkachenko/work/validohub/site.yaml"
```

Publish:

```bash
mvn -q -pl valido-cli exec:java -Dexec.mainClass=com.validoengine.cli.EngineMain -Dexec.args="publish --site /Users/maxtkachenko/work/validohub/site.yaml"
```

ValidoHub post-publish route materialization:

```bash
cd /Users/maxtkachenko/work/validohub
node scripts/build-countries-portal.mjs
```

Local preview:

```bash
cd /Users/maxtkachenko/work/validohub/generated/validohub
python3 -m http.server 8130 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8130/
```

## Local Java Note

The target stack is Java 21. Some local Codex sessions currently have only Java 17 installed. In those sessions, the established temporary validation workaround is:

```bash
mvn clean test -Dmaven.compiler.release=17
```

Do not treat this workaround as a product architecture change.

## Hard Rule

Never serve from the ValidoHub project root. Always serve from `generated/validohub` after publishing.
