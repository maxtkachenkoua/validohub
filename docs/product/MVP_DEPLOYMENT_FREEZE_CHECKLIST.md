# ValidoHub MVP Deployment Freeze Checklist

Use this checklist when the site is within 72 hours of production deploy. The goal is to protect the approved premium UX while allowing only release-critical fixes.

## Freeze Rule

- Do not add new tools, new countries, or new visual systems during freeze.
- Allow only localization corrections, broken layout fixes, search relevance fixes, SEO metadata, generated asset integrity, accessibility blockers, and runtime errors.
- Do not run a full build unless a release gate explicitly requires it or a generated artifact cannot be repaired safely.
- Never reset, clean, or revert unrelated worktree changes.

## Required Release Gates

Run these before deploying:

```bash
npm run audit:localization -- --limit 120
npm run audit:seo -- --strict-localization
npm run audit:performance
npm run audit:tools
```

If a scoped source change touches a country/tool generator, also run the smallest matching scoped build, for example:

```bash
npm run build:portal
npm run build:country -- --country poland --locales en,fr,uk
```

## Manual Smoke Pages

Check these routes in English plus one non-English locale:

- `/en/`
- `/en/tools/`
- `/en/countries/`
- `/en/poland/`
- `/en/poland/poland-pesel-validator/`
- `/en/brazil/brazil-cpf-validator/`
- `/en/brazil/brazil-pix-validator/`
- `/en/mexico/mexico-curp-validator/`
- `/en/spain/spain-id-validator/`
- `/en/tools/iban-generator/`

## UX Acceptance

- Language switcher is visible in the main header where the page supports localized alternates.
- Search accepts local-language queries, common abbreviations, and Cyrillic/transliterated identifier names where relevant.
- Pressing Enter in search opens the best visible result.
- No oversized hero typography on tool/catalog pages.
- No card text overlaps, floating labels, or page-level horizontal overflow.
- Advanced/debug panels are compact enough to scan without dominating the main workflow.

## SEO Acceptance

- `robots.txt` points to the production sitemap.
- `sitemap.xml` includes localized production routes.
- Each generated page has exactly one `h1`, a production canonical URL, and no `noindex`.
- Localized pages have matching `html lang`, canonical locale, current-locale hreflang, and x-default when alternates exist.
- Tool pages keep the official/local boundary clear; offline checks must not imply identity, account, carrier, registry, ownership, or legal status proof.

## Rollback Note

The approved "premium site" rollback baseline was pushed before the localization/SEO freeze pass. If release QA exposes a broad regression, revert by comparing against that pushed baseline first, then reapply only the smallest necessary fix.

## 2026-07-29 Freeze Candidate Result

This checkpoint is treated as MVP-freeze complete when the final source commit is present:

- `npm run audit:full` passes.
- `npm run audit:localization -- --limit 120` passes across the localized generated site.
- `npm run audit:seo -- --strict-localization` passes across the generated site.
- Desktop/mobile smoke covers homepage, tools portal, countries portal, key country hubs, key flagship tools, search query restore, and repaired factory runtime pages.

After this point, do not add new tools, redesigns, or broad localization rewrites before MVP deploy. Allow only release blockers, broken links, runtime errors, SEO/indexing defects, severe localization leftovers visible on priority pages, and deployment infrastructure work such as HTTPS, canonical production host, Search Console, analytics, compression, cache headers, and server rollback setup.
