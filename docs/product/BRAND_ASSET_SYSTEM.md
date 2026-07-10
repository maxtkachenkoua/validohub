# Brand Asset System

This is the permanent visual identity architecture for ValidoHub.

The Brand Asset System applies to:

- UI.
- Navigation.
- Country Hubs.
- Workbenches.
- Cards.
- Documentation.
- Markdown pages.
- Generated pages.
- Future products.

Whenever a recognizable technology, organization, payment system, framework, language, database, protocol, standard, or ecosystem appears visually, the renderer must use this system.

AI assistants must never independently decide which logo or icon to use.

## Purpose

Visual recognition is part of developer UX.

Developers recognize technologies, payment systems, databases, programming languages, and standards faster through consistent visual identity than through random generic icons.

The Brand Asset System reduces cognitive load and prevents ad-hoc icon decisions.

## Architecture

The current browser-side registry lives in:

```text
assets/js/brand-assets.js
```

It exposes:

```text
window.ValidoHubBrands.registry
window.ValidoHubBrands.getBrand(key)
window.ValidoHubBrands.createBrandMark(key, options)
```

Country Hubs consume the registry through `assets/js/countries.js`.

Future workbenches and product pages should consume the same system instead of creating local icon maps.

## Asset Hierarchy

Use assets in this order:

1. Official SVG or official logo, only when usage rights are clear.
2. Monochrome treatment for documentation-grade UI when official usage is approved or safe.
3. Project-owned glyph inspired by the concept, not by protected brand artwork.
4. Semantic fallback icon only when the concept has no official visual identity or legal usage is unclear.

Do not redraw official logos from memory.

Do not imitate protected logos.

Do not replace famous brands with unrelated generic icons.

## Rendering Modes

Each brand entry defines exactly one preferred rendering mode.

### Official

Use the official logo or official SVG.

Only use this when licensing, trademark, and usage rights are clear enough for the product repository.

### Monochrome

Use a restrained monochrome treatment for documentation UI.

Prefer this when many brands appear in a card grid and full-color marks would create visual noise.

### Glyph

Use a project-owned glyph that represents the concept without imitating protected branding.

Examples:

- PIX uses a payment-transfer glyph.
- Visa uses a payment-card glyph.
- SWIFT uses an international-transfer glyph.
- IBAN uses a bank-account glyph.

### Semantic

Use a generic semantic icon.

Use this for non-branded concepts and standards where there is no single official product visual identity.

## Naming

Brand keys use stable camelCase or lowercase identifiers:

```text
pix
java
python
postgresql
bancoCentralBrasil
receitaFederal
govbr
```

Do not rename existing keys once they are used by content or renderers.

## Reuse Rules

When visual identity is needed:

1. Check `docs/product/BRAND_REGISTRY.md`.
2. Use the configured rendering mode.
3. Use `window.ValidoHubBrands.createBrandMark(...)` in browser UI.
4. If the brand does not exist, add one Brand Registry entry first.
5. Do not create local one-off icons.

Future additions should require one registry entry, not page-specific rendering branches.

## Licensing Notes

Official assets are not automatically safe to bundle.

Before bundling official logos:

- Confirm the owner.
- Confirm trademark/brand usage rules.
- Confirm whether monochrome usage is allowed.
- Record the documentation source.
- Prefer linking to the official source in docs.

If usage is unclear, use the registered glyph or semantic fallback.

## Fallback Strategy

Fallbacks must be intentional.

If a brand cannot use official assets:

- Use the registered glyph.
- Keep the brand name visible.
- Keep the mark optically consistent with other brands.
- Document why the official asset is not bundled.

Do not silently swap to an unrelated icon.

## Design Consistency

All Brand Assets should share:

- Visual weight.
- Optical size.
- Padding.
- Alignment.
- Spacing.
- Border radius.
- Typography.
- Accessible labels.

Brand marks should feel like one coherent design system.

## Brazil Reference

Brazil is the first reference consumer.

Currently displayed brands and standards such as PIX, Banco Central do Brasil, gov.br, Receita Federal, Correios, SWIFT, IBAN, JWT, Java, Python, Go, Kotlin, C#, JavaScript, TypeScript, and PostgreSQL should use Brand Asset System entries instead of ad-hoc icons.

Brazil must not contain special rendering logic for these brands. It should provide `brandKey` values and let the shared renderer resolve the visual.

## Future Scalability

Future Country Hubs, workbenches, documentation pages, and generated pages should reuse the same registry.

If the system later needs build-time brand rendering for SEO or no-JavaScript output, that change must remain generic and must not move ValidoHub-specific brand decisions into Valido Engine.

Valido Engine must remain generic.
