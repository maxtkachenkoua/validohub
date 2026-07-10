# Country Hub AI Guide

This guide teaches future AI assistants how Country Hubs are built.

Read this before changing any country hub, country visual, country metadata model, country navigation behavior, or country-specific workbench relationship.

## Golden Reference

Brazil is the golden reference implementation.

Never invent a new Country Hub layout for another country.

Future countries inherit the Brazil structure, section order, visual system, card anatomy, badge system, responsive behavior, and copy style.

Only country data changes.

## Repository Boundary

Country Hubs belong to ValidoHub.

Valido Engine must remain generic. Do not modify Engine for Brazil, Poland, Spain, Germany, France, Japan, CPF, CNPJ, PIX, PESEL, CEP, or any other country-specific behavior.

Modify Engine only when a capability is genuinely generic and needed by future static sites, not just ValidoHub.

## Required Reading

Before country work, read:

- `AGENTS.md`.
- `docs/ai/START_HERE_AI.md`.
- `docs/ai/AI_DEVELOPMENT_PROTOCOL.md`.
- `docs/product/PRODUCT_VISION.md`.
- `docs/product/CURRENT_STATE.md`.
- `docs/product/COUNTRIES_ARCHITECTURE.md`.
- `docs/product/COUNTRY_HUB_TEMPLATE_SPEC.md`.
- `docs/product/COUNTRY_HUB_DESIGN_GUIDE.md`.
- `docs/product/BRAND_ASSET_SYSTEM.md`.
- `docs/product/BRAND_REGISTRY.md`.
- `docs/product/DEVELOPMENT_RULES.md`.
- `docs/product/WORKBENCH_REGISTRY.md`.

## Implementation Model

Country data lives in ValidoHub.

Rendering stays generic.

When adding a future country:

1. Reuse the Brazil template.
2. Add country-specific data.
3. Use the same mandatory sections where data exists.
4. Add approved visual assets.
5. Do not create country-specific rendering branches.
6. Run doctor.
7. Run publish.
8. Browser-verify from `generated/validohub`.
9. Update documentation.

## Reusable Improvements

New sections should improve every country, not only Brazil.

When adding a reusable improvement:

1. Update Brazil first.
2. Keep the renderer generic.
3. Document the new rule in `docs/product/COUNTRY_HUB_TEMPLATE_SPEC.md`.
4. Document the design behavior in `docs/product/COUNTRY_HUB_DESIGN_GUIDE.md`.
5. Update `docs/product/CURRENT_STATE.md`.
6. Update `docs/product/WORKBENCH_REGISTRY.md` if capabilities changed.
7. Update `docs/ai/CHANGELOG_AI.md`.

Do not add isolated one-off sections for a single country unless the user explicitly approves a reusable architecture decision.

## Visual Assets

Use real assets when legally usable.

Country visual assets:

- Country outline SVG.
- Miniature world map SVG highlighting the country.
- Flag.
- Continent badge.

Official brand assets:

- Use official SVGs/logos when usage rights are clear.
- Prefer monochrome logos for documentation-grade UI.
- Keep text badges when licensing is unclear.
- Never redraw official logos from memory.
- Check `docs/product/BRAND_REGISTRY.md` before choosing a logo or icon.
- Use `brandKey` and the shared Brand Asset System renderer when a registered brand appears.

Semantic icons are acceptable only when no official branding exists.

## Production UI Rules

Do not redesign the country hub without explicit instruction.

Do not remove existing sections.

Do not simplify Brazil.

Do not replace production-quality sections with placeholders.

Do not add fake buttons or inactive controls.

Do not show empty sections. Omit them until data exists.

Production UI should avoid emoji icons in new work. Existing emoji-based areas may remain until a deliberate icon-system pass replaces them.

## Future Country Rule

Spain must not invent a different layout.

Germany must not invent a different layout.

Japan must not invent a different layout.

Every country inherits the same design language.

Only metadata changes.

Only local content changes.

Architecture remains generic.

## Validation

For country hub changes:

- Run `node --check assets/js/countries.js` if JavaScript changed.
- Run Engine doctor against ValidoHub.
- Run Engine publish.
- Serve from `generated/validohub`.
- Browser-verify the changed country page.
- Check mobile and desktop.
- Check no horizontal overflow.
- Check no console errors.
- Confirm `generated/` is not committed.

Stop and ask before changing Engine or inventing new DSL fields.
