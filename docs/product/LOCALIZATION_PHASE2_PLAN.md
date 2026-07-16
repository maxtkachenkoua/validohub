# Localization Phase 2 Plan

Status: Completed foundation pass

## Goals

- Prepare ValidoHub for scalable multi-locale expansion (30-50 locales) without changing URL structure.
- Keep locale as the first path segment.
- Keep route slugs stable and non-translated.

## Phase 2 scope (this kickoff)

- Enable initial locale set in site config: `en`, `pl`, `de`, `es`, `pt-BR`.
- Keep fallback behavior safe when translated pages are not yet generated.
- Add global language controls in header with country-official quick language buttons.

## Behavior contract

Priority order for language selection:

1. User explicit choice (saved preference)
2. URL locale
3. Browser locale
4. Country-official locale hints
5. Default locale (`en`)

## UX requirements

- Language switcher available from any page.
- Country pages show dedicated quick buttons for official language(s).
- If target locale page does not exist yet, keep user on current page and persist preference.

## Completed foundation

- Initial locale set is enabled: `en`, `pl`, `de`, `es`, `pt-BR`.
- Locale-first route variants are generated for every discovered route.
- Route slugs stay stable and are not translated.
- Hreflang alternates are emitted for generated locale siblings.
- The final build pass rewrites canonical URLs, same-locale links, document language, common UI labels, and major country-page shell text.
- Node-owned rich pages such as country hubs, the Countries Portal, and identifier reference pages are materialized into localized routes instead of leaving Java fallback shells in place.
- Technical identifiers such as IANA time zones remain unlocalized, for example `Europe/Warsaw`, `Europe/Madrid`, and `Europe/Berlin`.

## Remaining future work

1. Add human-reviewed content packs for deep editorial copy per language.
2. Add translation completeness checks into build validation.
3. Expand the locale matrix in waves based on traffic and country coverage.
