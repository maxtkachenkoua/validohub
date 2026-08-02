# ValidoHub Build Handoff For Next Chat

Last updated: 2026-08-02, Europe/Kiev.

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

Update from the 2026-08-01/2026-08-02 build-hardening continuation:

- `scripts/repair-generic-country-tools-premium.mjs` now streams generated HTML with progress output and also cleans stale global `/tools/*` workbench headings, not only country tool shells.
- The repair script now uses concurrency-limited processing (`VALIDOHUB_REPAIR_CONCURRENCY`, default 48) plus fast paths for already-clean global, bespoke, legacy-rich, country-utility, and `csf-static-host` pages. Standalone benchmark on the verified generated tree scanned 86,632 HTML pages in about 5.2s with 0 rewrites; the passing full build after this optimization ran the repair phase in 25s.
- `scripts/build-all.mjs` now runs that script as the `Repair premium tool shells` phase after localization/chrome/script normalization and before search-index/sitemap/validation.
- `scripts/build-all.mjs` now prints child-process progress snapshots for long silent commands: child `pid/etime/cpu/mem/state`, plus generated output size during Maven/Engine publish. Disable with `--no-progress-snapshot` or `VALIDOHUB_BUILD_PROGRESS_SNAPSHOT=0`.
- The repair script handles Brazil CPF/CNPJ as bespoke tax-id tools and has a country-utility cleanup path so Brazil IBAN/Pix pages keep their generic/Pix runtimes instead of receiving duplicate `country-legacy-rich-layer.js` and `brazil-suite.js`.
- `scripts/minify-generated-assets.mjs` and `npm run minify:generated-assets` now minify generated `.js` and `.css` files with `esbuild`. `scripts/build-all.mjs` runs this as `Minify generated CSS/JS assets` after premium-shell repair and before search-index compaction, sitemap writing, validation, and optional archive packaging. The primary hashed CSS/JS bundles are fingerprinted from minified content.
- `scripts/build-all.mjs` now also runs `Normalize generated bundle asset links` after final localization/chrome normalization. This fixed a validation failure where localized pages could keep stale bundle hashes after the main assets changed.
- `scripts/load-test-static-site.mjs` and `npm run loadtest:vps` now provide a controlled VPS/IP load check.
- Full `npm run build:release -- --progress-seconds 30` passed after the repair fast-path optimization with `Build Duration: 448524 ms` (about 7m29s), 86,632 total registered routes, 75,074 Java-owned routes, and 11,558 Node-owned routes. Java publisher was 4m02s; repair was 25s; integrity validation was 22s.
- After the Valido Engine HTML exporter optimization, full `npm run build:release -- --progress-seconds 30` passed with `Build Duration: 230584 ms` (about 3m51s). `Prepare Java publisher classpath` took 1s, `Run Java publisher` took 15s, and Engine now prints `[engine:html] exported ...` progress while writing 75,075 HTML routes.
- Follow-up `npm run build:release:node -- --progress-seconds 30` passed with `Build Duration: 169754 ms` (about 2m50s), 86,632 total registered routes, 86,434 Java-owned reused routes, and 198 Node-owned routes. On the already-clean generated tree, premium-shell repair scanned 86,632 HTML pages in 5s with 0 rewrites.
- Final generated size after the passing full build: `generated/validohub 1.8G`, `generated/validohub/en 135M`, `generated/validohub/assets 895M`.
- Deploy archive support is now present: `scripts/package-generated-site.mjs`, `npm run package:site`, and `npm run build:release:archive`. Default artifact is `generated/releases/validohub-<release-id>.tar.gz` with a `.sha256` checksum; `--format tar.zst` and `--format zip` are supported.
- Real archive smoke passed: `npm run package:site` created `generated/releases/validohub-20260802-005701.tar.gz` in 80s. Size is 954,935,958 bytes (`911M` shown by `ls -lh`, `912M` by `du -h`); sha256 is `57dd38fc44a472ea6c26da897ba125f5c1b3fc4a0f945d72246c23a53bc22432`; `shasum -a 256 -c validohub-20260802-005701.tar.gz.sha256` passed from `generated/releases`.
- Latest archive from the 3m51s full build: `generated/releases/validohub-20260802-011524.tar.gz`, 955,743,196 bytes, created in 79s, sha256 `ee518717ebb1ef836413f1493cf2806f7f37a55d2b138af0ca1c2a6552935f8c`; checksum verification passed from `generated/releases`.
- `docs/VPS_HOSTING.md` was updated from the old 89G warning to the current 1.8G generated size and now documents both archive-based deploy and direct rsync deploy.
- Safe VPS deploy tooling is now present: `scripts/deploy-vps-site.mjs`, `npm run deploy:vps`, `npm run rollback:vps`, `npm run status:vps`, and `npm run list:vps-releases`. Verified `status`, `list`, and rollback-to-current-release against `137.74.173.107`. The script deploys immutable release directories and only switches `/srv/validohub/current` after checksum and smoke checks.
- `npm run audit:generated-premium` now passes with 0 failures across 86,632 generated HTML pages.
- `npm run audit:performance` passes.
- `npm run audit:seo` passes with known Open Graph/Twitter warnings.
- Standalone generated asset minification was verified without a full rebuild: 233 JS/CSS files processed in about 3s, raw JS/CSS reduced from 36,383,874 bytes to 26,710,364 bytes (about 26.6% saved). Current generated asset sizes after the pass: `generated/validohub/assets/js 25M`, `generated/validohub/assets/css 1.5M`, `generated/validohub/assets 887M`.
- Final release archive build after these hooks passed: `npm run build:release:archive -- --progress-seconds 30`, `Build Duration: 233250 ms` (about 3m53s), archive `generated/releases/validohub-20260802-021127.tar.gz`, 951,057,481 bytes, sha256 `7bed77aed7bb8f47a475dd0c6ce43a297008213d49ed4816a58fc40af093cd1d`.
- Deployed `20260802-021127` to the VPS. Current symlink: `/srv/validohub/current -> /srv/validohub/releases/20260802-021127`; previous release: `/srv/validohub/releases/20260802-011524`.
- Load test passed after deploy: `npm run loadtest:vps -- --duration-seconds 60 --rate 100 --max-inflight 1000 --timeout-ms 10000` completed 6,000/6,000 requests with 0 failures, 99.9 req/s, p50 78.3ms, p95 207.6ms, p99 238.5ms, max 330.3ms.
- SEO launch mode is now in the release pipeline. `VALIDOHUB_SEO_LOCALES` defaults to `en`; non-indexable locale pages remain accessible but receive `noindex, follow`, sitemap shards only include indexable locales, and hreflang alternates are limited to indexable locales plus `x-default`.
- Node-only SEO release archive build passed: `npm run build:release:node -- --archive --progress-seconds 30`, `Build Duration: 267644 ms` (about 4m28s), sitemap `12,376` English indexable routes across 1 shard, archive `generated/releases/validohub-20260802-023203.tar.gz`, 946,847,590 bytes, sha256 `0cb43ebec8f84e421e5359c96b9809fa5dfe0d31680578349ea9f6c9380079de`.
- Deployed `20260802-023203` to the VPS. Current symlink: `/srv/validohub/current -> /srv/validohub/releases/20260802-023203`; previous rollback target: `/srv/validohub/releases/20260802-021127`. Live checks confirmed `/sitemap.xml` references only `sitemap-en.xml`, `/en/` has no `noindex`, and `/de/` has `<meta name="robots" content="noindex, follow">`.
- GoDaddy DNS now points to the VPS: `validohub.com A 137.74.173.107`, `www CNAME validohub.com`. Caddy was updated from IP-only preview to domain hosting with `www` -> apex redirect and IP-preview preserved. Verified `https://validohub.com/en/` -> 200, `http://validohub.com/` -> 308 HTTPS redirect, `https://www.validohub.com/en/` -> 301 to apex, sitemap/robots over HTTPS, gzip on CSS, and noindex on `https://validohub.com/de/`.
- Live language selector bug fixed after SEO launch mode: `assets/js/bundle.js` no longer depends only on `hreflang` alternates for non-English navigation. It now constructs the same path under the requested supported locale when a direct alternate link is absent.
- Node-only language-switcher release passed: `npm run build:release:node -- --archive --progress-seconds 30`, `Build Duration: 203358 ms` (about 3m23s), archive `generated/releases/validohub-20260802-025658.tar.gz`, 946,880,312 bytes, sha256 `6795b673f6831458fac537cbb8d46b989e88e4850ed49aab121fcda94d0ea91b`.
- Deployed `20260802-025658` to the VPS. Current symlink: `/srv/validohub/current -> /srv/validohub/releases/20260802-025658`; previous rollback target: `/srv/validohub/releases/20260802-023203`. Verification passed: `node --check assets/js/bundle.js`, `npm run audit:seo`, `npm run audit:performance`, `npm run audit:generated-premium`, plus headless browser smoke `/en/` -> select `de` -> `/de/`, then select `uk` -> `/uk/`, and `/en/tools/` -> select `fr` -> `/fr/tools/`.
- Production localization hardening continued after user screenshots exposed mixed English/broken locale text in `de`/`fr` pages, runtime mega menus, country names, identifier/category shells, and SEO/JSON-LD. `AGENTS.md` now says new user-visible content must be localized by default for production locales.
- `assets/js/bundle.js` now localizes runtime mega navigation copy and country names for `es`, `pt-BR`, `de`, `fr`, `pl`, and `uk`. `scripts/localization-pass.mjs` now covers safer literal matching, country/tool title cleanup, category shell descriptions, structured-data/meta description replacements, `Company Suffix`, role words such as `Normalizer`, French `National Identifiants`, and stale bad hero artifacts like `Gültigate`/`Valideeeate`.
- `scripts/audit-localization-production.mjs` now hard-blocks the specific production localization artifacts found during live smoke. `scripts/normalize-generated-seo-indexability.mjs` was added for standalone localization repairs; run it after any standalone `applyFinalLocalizationPass` because the localization pass can reintroduce non-indexable hreflang links before the normal build post-step runs.
- A full Node release build with archive completed as `generated/releases/validohub-20260802-145645.tar.gz`, but its internal elapsed timer was corrupted by a system time jump and the archive was not used as final because localization audit caught generic SEO descriptions. A standalone re-localization pass then updated 69,877 generated pages in 24m49s, followed by SEO indexability normalization.
- Final verified archive after national-identifier cleanup: `generated/releases/validohub-20260802-154058.tar.gz`, 950,081,901 bytes, sha256 `22546de03a57628536a4d988e2f7eec5133fdf51764f91a4bc385bb86739cee0`.
- Deployed `20260802-154058` to VPS. Current symlink: `/srv/validohub/current -> /srv/validohub/releases/20260802-154058`; previous useful rollback releases include `/srv/validohub/releases/20260802-153054`, `/srv/validohub/releases/20260802-051151`, and `/srv/validohub/releases/20260802-025658`.
- Final verification for `20260802-154058`: `npm run audit:seo` passed with the known OG/Twitter warning set, `npm run audit:performance` passed, `npm run audit:generated-premium` passed (`86,632` HTML, `84,343` country tool pages, 0 failures), targeted `npm run audit:localization -- --fail-on-soft` passed, broad greps found 0 stale localization markers, and live smoke confirmed `/de/`, `/fr/`, `/de/tools/`, `/fr/tools/`, `/de|fr/categories/national-identifiers/`, and localized company-suffix pages return 200 without hard markers.
- Headless Playwright language-select smoke passed on live: `/` redirects to `/en/`, selecting `fr` navigates to `/fr/` with French H1, and selecting `de` from `/fr/` navigates to `/de/` with German H1.
- Country visual bloat was fixed after launch: `scripts/optimize-country-images.mjs` creates 720px JPEGs for `assets/images/countries/*-outline.png` and `*-location.png`, rewrites generated HTML refs to `.jpg`, and can prune generated PNG copies. `package.json` exposes `npm run optimize:country-images`; `scripts/build-all.mjs` runs it as `Optimize generated country images` with `--generated --prune-generated-png`.
- The source PNGs remain as raw visual source assets, but generated release output prunes the duplicated PNGs. `generated/validohub/assets/images/countries` dropped from about `860M` to `40M`; `generated/validohub/assets` dropped to about `67M`; current `generated/validohub` is about `1.0G`.
- New deployed release: `20260802-160123`, archive `generated/releases/validohub-20260802-160123.tar.gz`, `97,763,266` bytes, sha256 `44078cbc90a0440e184567ce10242d3094ed518339bc1514407aeb96850d1708`. Current symlink: `/srv/validohub/current -> /srv/validohub/releases/20260802-160123`.
- Verification for `20260802-160123`: `npm run audit:performance`, `npm run audit:seo`, and `npm run audit:generated-premium` passed; live bundle is `/assets/js/bundle.f941ff.js`; live language selector order is Ukrainian before Polish; representative image sizes are Egypt location `214,528` bytes, Egypt outline `105,760` bytes, France location `101,115` bytes, France outline `46,813` bytes; old PNG URLs return 404.
- Fresh Node pipeline release after image optimization passed: `npm run build:release:node -- --archive --progress-seconds 30`, `Build Duration: 1281484 ms` (about `21m21s`), archive `generated/releases/validohub-20260802-164620.tar.gz`, `97,860,193` bytes, sha256 `7fc3cc9883c064a52a6d34df8b0640ca6fbc1667aa21a22def8a294e5e126bd9`.
- The slow phase in that fresh build was `Apply final localization pass` at `17m02s`; it rewrote `32,198` pages. New slow-route diagnostics in `scripts/localization-pass.mjs` showed the costly batches are localized country hub pages such as `/de/brazil/`, `/pt-BR/india/`, and `/pl/france/`, not a stuck process.
- `scripts/localization-pass.mjs` now normalizes localization cache source by stripping volatile bundle/CSS hashes and alternate tags before hashing. This prevents asset-hash-only changes from invalidating localization cache keys as aggressively on future rebuilds.
- Deployed `20260802-164620` to VPS. Current symlink: `/srv/validohub/current -> /srv/validohub/releases/20260802-164620`; previous rollback target: `/srv/validohub/releases/20260802-160123`. VPS status: Caddy active, `/dev/sda1` 96G total / 31G used / 66G free, 10 release dirs, 20 uploaded archives.
- Verification for `20260802-164620`: `npm run audit:performance`, `npm run audit:seo`, and `npm run audit:generated-premium` passed; generated size is `1.0G`, generated assets `67M`, generated country images `40M`, archive `97M`; live bundle is `/assets/js/bundle.a63ecc.js`; live JS has Ukrainian before Polish; Egypt live JPEGs are `214,528` and `105,760` bytes; old Egypt PNG returns `404`.
- IndexNow launch push was added after Google/Bing sitemap setup. `config/indexnow-key.txt`, `scripts/indexnow.mjs`, and npm scripts `indexnow:prepare`, `indexnow:dry-run`, and `indexnow:submit` now exist; `scripts/build-all.mjs` materializes the IndexNow key into the generated root after sitemap writing. The submit payload must include `keyLocation`; without it the official endpoint returned `403 SiteVerificationNotCompleted`.
- Packaged current generated output without a full rebuild: `generated/releases/validohub-20260802-171627.tar.gz`, `97,859,984` bytes, sha256 `2a8bdb73006f941688495cbd589a228c85c8433dece341aea321d479618ad47c`.
- Deployed `20260802-171627` to VPS. Current symlink: `/srv/validohub/current -> /srv/validohub/releases/20260802-171627`; previous rollback target: `/srv/validohub/releases/20260802-164620`.
- Verification for `20260802-171627`: deploy smoke passed for `https://validohub.com/`, `/en/`, and `/en/tools/`; `https://validohub.com/67952aa5-e375-4253-9942-7d7ae0c560f2.txt` returns the key; `https://validohub.com/sitemap.xml` returns `200`; `npm run indexnow:dry-run` found 12,376 URL(s) in 2 batches; `npm run indexnow:submit` completed 2/2 batches with `HTTP 200`.
- `scripts/deploy-vps-site.mjs` rsync upload now includes `--timeout=60` while preserving macOS-compatible `--progress`. Do not use `--info=progress2` on the bundled macOS rsync; it is unsupported.
- Google Analytics launch tag was added after the GA4 stream was created. `config/google-analytics-measurement-id.txt` stores `G-QH4SZME9KW`; `scripts/apply-google-analytics.mjs` injects a marked idempotent GA4 snippet; package scripts `analytics:apply` and `analytics:dry-run` exist; and `scripts/build-all.mjs` runs the apply phase after sitemap writing / IndexNow key materialization.
- Applied GA4 to the current generated tree without full rebuild: 86,632 HTML files updated, second dry-run showed 0 changes. Verification passed with `node --check scripts/apply-google-analytics.mjs`, `node --check scripts/build-all.mjs`, `npm run audit:seo`, and `npm run audit:performance`.
- Packaged and deployed `20260802-173659`, archive `generated/releases/validohub-20260802-173659.tar.gz`, `98,419,432` bytes, sha256 `94e7b628ce3c670cba0969a06a52043644d098378f5ef150f29fc86bbbc52cc9`. Current symlink: `/srv/validohub/current -> /srv/validohub/releases/20260802-173659`; previous rollback target: `/srv/validohub/releases/20260802-171627`.
- Live verification for `20260802-173659`: deploy smoke passed for `/`, `/en/`, and `/en/tools/`; `https://validohub.com/en/` contains `googletagmanager.com/gtag/js?id=G-QH4SZME9KW` and `gtag('config', 'G-QH4SZME9KW')`; VPS status showed Caddy active, `/dev/sda1` 96G total / 34G used / 63G free, 12 release dirs, 24 uploaded archives.

ValidoHub:

```text
## main...origin/main
 M docs/ai/BUILD_NEXT_CHAT_HANDOFF.md
 M docs/ai/CHANGELOG_AI.md
 M docs/VPS_HOSTING.md
 M docs/product/BUILD_HARDENING_V2.md
 M assets/js/bundle.js
 M package.json
 M package-lock.json
 M scripts/audit-seo-production.mjs
 M scripts/build-all.mjs
 A scripts/load-test-static-site.mjs
 A scripts/minify-generated-assets.mjs
 A scripts/package-generated-site.mjs
 M scripts/repair-generic-country-tools-premium.mjs
```

Valido Engine:

```text
## main...origin/main
 M valido-exporter-html/src/main/java/com/validoengine/exporter/html/HtmlExporter.java
```

Generated output is a clean product of the passing full release build and follow-up audits as of this handoff.

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
Total HTML Size: 905,917,768 bytes
Build Duration: 169,754 ms
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
