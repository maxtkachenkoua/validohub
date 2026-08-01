# ValidoHub Build Handoff For Next Chat

Last updated: 2026-08-01, Europe/Kiev.

This file is a build-focused handoff for a fresh Codex chat. It is intentionally separate from `docs/ai/NEXT_CHAT_HANDOFF.md` and should be read together with:

- `AGENTS.md`
- `docs/ai/START_HERE_AI.md`
- `docs/ai/NEXT_CHAT_HANDOFF.md`
- `docs/ai/BUILD_WORKFLOW.md`

## Non-Negotiables

- Work in `/Users/maxtkachenko/work/validohub`.
- Also inspect `/Users/maxtkachenko/work/valido-engine` when build output depends on generator/exporter behavior.
- Before any action, check git status in both repos:
  - `git status --short --branch` in ValidoHub
  - `git status --short --branch` in Valido Engine
- Do not run `git revert`, `git clean`, `git reset`, or destructive cleanup unless the user explicitly asks.
- Do not start the full build without explicit approval.
- If a long build/audit goes silent abnormally, take a dump or stop/analyze/fix/restart instead of waiting indefinitely.
- The product goal is not merely passing commands. Old/fallback tool layouts must disappear from country/global tool pages. Weak tools should still render as Gold-lite inside the premium shell.

## Current Git Snapshot At Handoff

ValidoHub:

```text
## main...origin/main
 M docs/ai/BUILD_WORKFLOW.md
 M docs/product/BUILD_HARDENING_V2.md
 M package.json
 M scripts/audit-performance-budget.mjs
 M scripts/build-all.mjs
 M scripts/build-reference-guides.mjs
 M scripts/localization-pass.mjs
?? docs/VPS_HOSTING.md
?? docs/ai/BUILD_NEXT_CHAT_HANDOFF.md
```

Valido Engine:

```text
## main...origin/main [ahead 3]
 M valido-exporter-html/src/main/java/com/validoengine/exporter/html/HtmlExporter.java
 M valido-generator/src/main/java/com/validoengine/generator/RelatedLinkResolver.java
 M valido-generator/src/test/java/com/validoengine/generator/ValidoGeneratorTest.java
```

Generated output may have partial edits from an interrupted run of `node scripts/repair-generic-country-tools-premium.mjs`. Do not treat generated HTML as canonical until the repair phase and audits are rerun cleanly.

## What Was Fixed Today

The original build problem looked catastrophic: generated output grew to roughly `104G`, and full build behavior felt unbounded. The root cause was not normal page count alone. The main causes were page bloat and repeated/generated chrome/link artifacts.

Current generated size after systemic fixes:

```text
generated/validohub        1.8G
generated/validohub/en     135M
generated/validohub/assets 896M
```

The Node-side release gate completed in about `151,469 ms` after fixes, roughly `2m31s`.

### Valido Engine Fixes

Changed files:

- `valido-generator/src/main/java/com/validoengine/generator/RelatedLinkResolver.java`
- `valido-generator/src/test/java/com/validoengine/generator/ValidoGeneratorTest.java`
- `valido-exporter-html/src/main/java/com/validoengine/exporter/html/HtmlExporter.java`

Key changes:

- Related links are capped to 12.
- Related link resolution is deterministic and sorts public tools.
- Matching candidates are capped early to avoid massive related-link expansion.
- Exporter no longer scans/duplicates expensive global route/chrome structures per page.
- Site assets are cached once.
- Navigation is fixed to the expected static links rather than expanding from all routes.
- Breadcrumb lookup is O(1).

Validated successfully:

```bash
mvn -pl valido-generator -Dtest=ValidoGeneratorTest test
mvn -pl valido-generator,valido-exporter-html -Dtest=ValidoGeneratorTest,HtmlExporterTest test
mvn -pl valido-cli -am install -DskipTests
```

The Maven publisher then succeeded and reported:

```text
writtenArtifacts: 75811
```

### ValidoHub Build Fixes

Changed files:

- `package.json`
- `scripts/build-all.mjs`
- `scripts/localization-pass.mjs`
- `scripts/audit-performance-budget.mjs`
- `scripts/build-reference-guides.mjs`
- `docs/ai/BUILD_WORKFLOW.md`
- `docs/product/BUILD_HARDENING_V2.md`
- `docs/VPS_HOSTING.md`

Important `scripts/build-all.mjs` changes:

- Added `--skip-java-publisher` and `VALIDOHUB_SKIP_JAVA_PUBLISHER=1`.
- Added package script `build:release:node`.
- Added build progress reporting for long phases.
- Added root-file link validation for generated files like `/sitemap.xml`.
- Added `dedupeGeneratedHeadArtifacts` to enforce one CSS link, one bundle script, and one JSON-LD block per Java-generated page.
- Added `createInternalRouteLinkRepairer(routeRegistry)` to repair localized broken internal URLs by nearest registered route.
- Added localized technical attribute repair for:
  - `data-algorithm-id`
  - `id`
  - `for`
  - `aria-controls`
  - `aria-labelledby`
  - `aria-describedby`
- Added technical and URL alias maps for localized tokens such as:
  - locale
  - privacy
  - phone
  - postal-code
  - payment-reference
  - bank-account
  - tax-number
  - documents
  - vehicles
- Fixed alias ordering longest-first so words like `telefone` do not become `phonee`.
- Added canonical route path extraction so route-specific script overrides come from canonical/current route, not arbitrary links inside the page.
- Added expected tool-script pruning so stale unrelated `/assets/js/tools/*.js` tags are removed from interactive pages.
- Added `pruneNonInteractiveWorkbenchScripts` for pages without `data-algorithm-id`.
- Added `pathHasRenderableHtml` so 0-byte localized pages are rematerialized from English fallback.
- Added empty/malformed HTML validation before CSS-link validation.
- Imported and ran `compileReferenceGuides` inside build-all so `/en/guides/` and localized guide routes are present in registry/sitemap.

Important `scripts/localization-pass.mjs` changes:

- Removed per-route spam and added progress/caching.
- Added literal map regex caching.
- Protected URL-like attrs from localization.
- Protected technical attrs from localization:
  - `data-algorithm-id`
  - `id`
  - `for`
  - `aria-controls`
  - `aria-labelledby`
  - `aria-describedby`
- Final localization pass now uses a cache marker and skips the default second full normalization unless explicitly requested.

Important `scripts/audit-performance-budget.mjs` changes:

- Added tool page size guard for:
  - `en`
  - `es`
  - `pt-BR`
  - `de`
  - `fr`
  - `pl`
  - `uk`
- Default max tool HTML size: `300k`.
- Default max related cards: `24`.
- Search index budget raised to `6MB`.
- Sitemap budget raised to `8MB`.

Important `scripts/build-reference-guides.mjs` change:

- Exported `compileReferenceGuides` so `build-all.mjs` can include guide pages in the build registry.

## Build Commands That Worked

Syntax checks:

```bash
node --check scripts/build-all.mjs
node --check scripts/localization-pass.mjs
node --check scripts/audit-performance-budget.mjs
node --check scripts/build-reference-guides.mjs
```

Node release gate command:

```bash
VALIDOHUB_BUILD_CONCURRENCY=8 VALIDOHUB_BUILD_PROGRESS_ITEMS=5000 npm run build:release:node -- --progress-seconds 30
```

Last successful result:

```text
Total Registered Routes: 86632
Java-Owned: 86434
Node-Owned: 198
Validator Pages: 86337
Category Pages: 98
Internal Links Validated: 2,029,657
JSON-LD Payloads Generated: 86,632
Total HTML Size: 920,737,446 bytes
Build Duration: 151,469 ms
Integrity PASSED
```

Audits that passed:

```bash
npm run audit:performance
npm run audit:seo
git diff --check
```

SEO audit passed but still warned that country hubs miss some OG/Twitter title/description metadata. Treat that as quality debt, not the current build blocker.

## Known Fixed Failure Classes

These were observed and fixed systemically:

- Broken `/sitemap.xml` internal route link validation.
- Duplicate CSS and JSON-LD payloads in generated pages.
- Localized URL corruption such as German `Gebietsschema-date-parser`.
- Localized algorithm IDs such as:
  - `validohub.Gebietsschema-date-parser`
  - `validohub.Telefon-e164`
  - `validohub.phonee-e164`
- Brazil Pix loading stale `brazil-tax-id.js`.
- Non-interactive country pages loading tool scripts.
- Missing localized guide routes such as `/de/guides/`.
- 0-byte localized HTML files, for example Djibouti date locale formatter.
- Translated category slugs such as `/uk/categories/документи/`.

Smoke checks after fixes:

- `pt-BR/tools/phone-e164-workbench/` had `data-algorithm-id="validohub.phone-e164"` and `generic-suite.js`.
- `en/brazil/brazil-pix-validator/` had `data-algorithm-id="validohub.brazil-pix"` and only `pix.js`, not `brazil-tax-id.js`.
- `es/djibouti/djibouti-date-locale-formatter/` was non-empty and had CSS plus `data-algorithm-id="validohub.djibouti-suite"`.

## Still Not Done

### 1. Generated Premium Contract Is Red

Command:

```bash
npm run audit:generated-premium
```

Last result:

```text
1170 failures
```

First failures were Brazil country tool pages, for example:

- `generated/validohub/en/brazil/brazil-address-formatter/index.html`
- page contained `<h2>Run the tool</h2>`
- page had legacy/intermediate generic country shell markers

Audit forbidden patterns include:

- `Static tools generated by Valido Engine`
- fake API preview blocks
- legacy workbench headings such as `Run the tool`, `Interactive workbench`, `Browser workbench`
- `vh-generic-country-`
- `WHAT THIS TOOL IS FOR`
- `Paste input, choose an action`
- `Browser-only Offline checks`
- `Browser-only checks prove`

This is directly tied to the original product goal: old/fallback tool layouts must disappear everywhere.

There is an existing repair script:

```bash
node scripts/repair-generic-country-tools-premium.mjs
```

It is intended to:

- strip intermediate generic country shell
- remove legacy workbench headings
- remove fake API blocks
- collapse weak country tools into premium static/factory host shells
- ensure correct factory/legacy scripts

However, the last run was interrupted after a long silent period. It must be treated as incomplete. Recommended next step is to add progress/output to this script, rerun it cleanly, then wire it into `scripts/build-all.mjs` as a normal phase rather than relying on manual generated-output repair.

Suggested build-all phase placement:

```js
await runBuildPhase('Repair generic country tool premium shells', () =>
  runCommand('node scripts/repair-generic-country-tools-premium.mjs', projectRoot)
);
```

Place it after Java page post-processing and before final validation/audits, then rerun:

```bash
node --check scripts/build-all.mjs
VALIDOHUB_BUILD_CONCURRENCY=8 VALIDOHUB_BUILD_PROGRESS_ITEMS=5000 npm run build:release:node -- --progress-seconds 30
npm run audit:generated-premium
npm run audit:performance
```

### 2. Localization Audit Is Red

Command:

```bash
npm run audit:localization
```

Last result:

```text
1023 blockers
10473 warnings
```

Most observed examples were high-signal UI strings left untranslated or badly translated on localized pages, especially German pages with English fragments such as fixture/workbench/sample labels.

Important brand rule discovered from user feedback:

- Never translate `ValidoHub`.
- The header title/brand must stay `ValidoHub` in all locales.
- Hero/title translations must not produce broken hybrid text like Ukrainian or Polish mixed with English verbs.

Localization quality is separate from the immediate build-size/performance fix, but it is visible product debt.

### 3. Global Premium Audit Needs Better Progress

Command attempted:

```bash
npm run audit:global-premium
```

First failure was sandbox/Chromium related. Escalated run then failed because no local server was running. A local static server was started:

```bash
python3 -m http.server 8093 --directory generated/validohub
```

Then global audit went silent long enough to violate the user's "anomalous silence" rule and was stopped. Before running it again, add progress or a targeted mode to the audit.

If a server is still running on port `8093`, stop it when no longer needed.

## Recommended Next Steps

1. Check git status in both repos.
2. Inspect whether any repair/static server process is still running.
3. Patch `scripts/repair-generic-country-tools-premium.mjs` to emit progress and avoid long silent scans.
4. Rerun `node scripts/repair-generic-country-tools-premium.mjs` cleanly.
5. Rerun `npm run audit:generated-premium`.
6. If premium audit passes, integrate the repair script into `scripts/build-all.mjs`.
7. Rerun `node --check scripts/build-all.mjs`.
8. Rerun `build:release:node`.
9. Rerun `audit:generated-premium` and `audit:performance`.
10. Only after the premium contract is green, decide whether to attack localization audit or OG/Twitter warnings.

## Hosting Notes

The generated site is now roughly `1.8G`, not `104G`.

Practical hosting direction:

- Static object/CDN hosting is the best fit long-term because the site is fully generated.
- A VPS is workable but less ideal if it only serves static HTML; it adds patching, monitoring, nginx config, backups, and deploy scripting.
- If using VPS anyway, choose at least:
  - 2 vCPU
  - 4 GB RAM minimum
  - 80-100 GB NVMe disk minimum
  - nginx or Caddy
  - gzip/brotli
  - rsync or artifact deploy
- OVH VPS-3 with 6 vCores, 12 GB RAM, 100 GB NVMe is enough for serving ValidoHub as static output, but probably more than needed for static hosting.
- Keep at least 3x generated size available on deployment/build machines because artifacts, temp output, previous release, and compression can overlap.

## Welcome Message For New Chat

Привет. Продолжаем ValidoHub build hardening.

Сначала прочитай:

- `/Users/maxtkachenko/work/validohub/AGENTS.md`
- `/Users/maxtkachenko/work/validohub/docs/ai/START_HERE_AI.md`
- `/Users/maxtkachenko/work/validohub/docs/ai/NEXT_CHAT_HANDOFF.md`
- `/Users/maxtkachenko/work/validohub/docs/ai/BUILD_NEXT_CHAT_HANDOFF.md`

Работай в `/Users/maxtkachenko/work/validohub`. Перед любыми действиями проверь `git status --short --branch` в ValidoHub и `/Users/maxtkachenko/work/valido-engine`.

Ничего не `revert`/`clean`/`reset`. Full build не запускать без явного апрува.

Контекст: за прошлый заход починили гигантский build bloat, generated снизился примерно с `104G` до `1.8G`, `build:release:node` проходил за ~`2m31s`, `audit:performance` и `audit:seo` проходили. Но `audit:generated-premium` еще красный: около `1170` страниц со старым `Run the tool`/generic fallback shell. Следующий шаг - не руками по URL, а системно починить/встроить `scripts/repair-generic-country-tools-premium.mjs` в build pipeline, затем прогнать targeted audits.
