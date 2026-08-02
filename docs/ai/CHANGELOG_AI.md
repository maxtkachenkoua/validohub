## 2026-08-02 - Google Analytics Launch Tag

- Added `config/google-analytics-measurement-id.txt`, `scripts/apply-google-analytics.mjs`, and npm scripts `analytics:apply` / `analytics:dry-run`.
- `scripts/build-all.mjs` now applies the GA4 tag after sitemap writing and IndexNow key materialization, before generated output validation, so future release builds include Analytics automatically.
- Applied GA4 Measurement ID `G-QH4SZME9KW` to the current generated site without a full rebuild. Dry-run verified 86,632 HTML files would be updated, the apply pass updated 86,632, and a second dry-run showed 0 changes, confirming the marker is idempotent.
- Verification passed: `node --check scripts/apply-google-analytics.mjs`, `node --check scripts/build-all.mjs`, `npm run audit:seo`, and `npm run audit:performance`.
- Packaged `generated/releases/validohub-20260802-173659.tar.gz`, 98,419,432 bytes, sha256 `94e7b628ce3c670cba0969a06a52043644d098378f5ef150f29fc86bbbc52cc9`.
- Deployed release `20260802-173659` to the VPS. Current symlink points to `/srv/validohub/releases/20260802-173659`; previous rollback target is `/srv/validohub/releases/20260802-171627`.
- Live verification confirmed `https://validohub.com/en/` contains the `googletagmanager.com/gtag/js?id=G-QH4SZME9KW` script and `gtag('config', 'G-QH4SZME9KW')`.

## 2026-08-02 - IndexNow Submission Pipeline

- Added `config/indexnow-key.txt`, `scripts/indexnow.mjs`, and npm scripts `indexnow:prepare`, `indexnow:dry-run`, and `indexnow:submit`.
- `scripts/build-all.mjs` now materializes the IndexNow key into the generated site root as `<key>.txt` after sitemap writing, so future release archives include the verification file automatically.
- Hardened VPS deploy upload by adding an rsync network timeout while keeping macOS-compatible `--progress` output; an attempted `--info=progress2` was rejected by macOS rsync and replaced.
- Packaged current generated output without a full rebuild: `generated/releases/validohub-20260802-171627.tar.gz`, 97,859,984 bytes, sha256 `2a8bdb73006f941688495cbd589a228c85c8433dece341aea321d479618ad47c`.
- Deployed release `20260802-171627` to VPS. Current symlink points to `/srv/validohub/releases/20260802-171627`; previous rollback target is `/srv/validohub/releases/20260802-164620`.
- Verified `https://validohub.com/67952aa5-e375-4253-9942-7d7ae0c560f2.txt` returns the IndexNow key and `https://validohub.com/sitemap.xml` returns `200`.
- Submitted the English indexable sitemap to IndexNow: dry-run found 12,376 URLs in 2 batches; first full attempt returned `403 SiteVerificationNotCompleted` until `keyLocation` was added to the payload; final full submit returned `HTTP 200` for both batches and completed 12,376 URL submissions.

## 2026-08-02 - Fresh Node Pipeline Release After Image Optimization

- Added localization-pass hardening for release builds: localization cache keys now ignore volatile bundle/CSS hashes and alternate tags, and slow localization batches print the slowest routes. This turned the previously opaque slow area into named country hub routes such as `/de/brazil/`, `/pt-BR/india/`, and `/pl/france/`.
- Ran fresh `npm run build:release:node -- --archive --progress-seconds 30` after country image optimization. Build integrity passed with `Build Duration: 1281484 ms` (about 21m21s); `Apply final localization pass` was the long phase at 17m02s and rewrote 32,198 pages. The archive was created in 39s.
- Created `generated/releases/validohub-20260802-164620.tar.gz`, 97,860,193 bytes, sha256 `7fc3cc9883c064a52a6d34df8b0640ca6fbc1667aa21a22def8a294e5e126bd9`.
- Verification passed: `node --check scripts/localization-pass.mjs`, `node --check scripts/build-all.mjs`, `node --check scripts/optimize-country-images.mjs`, `npm run audit:performance`, `npm run audit:seo`, `npm run audit:generated-premium`, PNG-reference grep, generated JPEG/PNG counts, and representative country image size checks.
- Deployed release `20260802-164620` to VPS. Current symlink points to `/srv/validohub/releases/20260802-164620`; previous rollback target is `/srv/validohub/releases/20260802-160123`. Live smoke passed for `/`, `/en/`, `/en/tools/`, bundle `/assets/js/bundle.a63ecc.js`, Ukrainian-before-Polish selector order, Egypt JPEG sizes, and old Egypt PNG `404`.

## 2026-08-02 - Language Switcher Route Fallback Fix

- Fixed the live language switcher after SEO launch mode. Because hreflang alternates are now intentionally limited to indexable locales (`en` plus `x-default`), the browser language selector could no longer find non-English alternate links and appeared to do nothing.
- Updated `assets/js/bundle.js` so locale navigation first uses a matching alternate URL when present, then falls back to constructing the same route under the requested supported locale prefix.
- Built and deployed node-only release `20260802-025658`: `npm run build:release:node -- --archive --progress-seconds 30` passed with `Build Duration: 203358 ms` (about 3m23s), archive `generated/releases/validohub-20260802-025658.tar.gz`, 946,880,312 bytes, sha256 `6795b673f6831458fac537cbb8d46b989e88e4850ed49aab121fcda94d0ea91b`.
- Deployed `20260802-025658` to the VPS. Current symlink: `/srv/validohub/current -> /srv/validohub/releases/20260802-025658`; previous rollback target: `/srv/validohub/releases/20260802-023203`.
- Verification: `node --check assets/js/bundle.js`, `npm run audit:seo`, `npm run audit:performance`, and `npm run audit:generated-premium` passed. Headless browser smoke checks confirmed `https://validohub.com/en/` language select `de` navigates to `https://validohub.com/de/`, then `uk` navigates to `https://validohub.com/uk/`; `https://validohub.com/en/tools/` language select `fr` navigates to `https://validohub.com/fr/tools/`.

## 2026-08-02 - Final Release Archive Deploy And Load Test

- Added `scripts/load-test-static-site.mjs` and `npm run loadtest:vps` for controlled static-site load checks against the VPS/IP preview.
- Fixed the full build validation gap where localized pages could keep stale `/assets/css/bundle.*.css` and `/assets/js/bundle.*.js` references after `applyFinalLocalizationPass`. `scripts/build-all.mjs` now runs `Normalize generated bundle asset links` after generated chrome normalization and before repair/minification/validation; the successful release run updated 75,068 generated pages to the current bundle hashes.
- Final `npm run build:release:archive -- --progress-seconds 30` passed with `Build Duration: 233250 ms` (about 3m53s). Current bundles: `/assets/css/bundle.d9cd69.css`, `/assets/js/bundle.02d7da.js`. Minification processed 235 JS/CSS files in 3s and saved 9,641,321 bytes (26.31%).
- Created deploy archive `generated/releases/validohub-20260802-021127.tar.gz`, 951,057,481 bytes (`913M` by `du`), sha256 `7bed77aed7bb8f47a475dd0c6ce43a297008213d49ed4816a58fc40af093cd1d`; local checksum verification passed.
- Deployed release `20260802-021127` to the VPS. Current symlink is `/srv/validohub/current -> /srv/validohub/releases/20260802-021127`; previous release is `/srv/validohub/releases/20260802-011524`. Caddy is active, `/`, `/en/`, `/en/tools/`, Brazil CPF, Mexico CURP, and Spain ID smoke checks returned `200`.
- Ran controlled load test against `http://137.74.173.107`: 100 GET requests/second for 60 seconds, 6,000 attempted/completed, 6,000 HTTP 200, 0 failures/errors, 99.9 req/s observed, latency p50 78.3ms, p95 207.6ms, p99 238.5ms, max 330.3ms.
- Post-load VPS status stayed healthy: `/dev/sda1` 96G total, 9.7G used, 87G available, `/srv/validohub` 6.8G, Caddy active.

## 2026-08-02 - Generated Asset Minification Before Archive

- Added `scripts/minify-generated-assets.mjs` and `npm run minify:generated-assets` to minify generated `.js` and `.css` files with `esbuild`.
- Wired `scripts/build-all.mjs` to run `Minify generated CSS/JS assets` after premium-shell repair and before search-index compaction, sitemap writing, validation, and optional archive packaging. Deploy archives created by `npm run build:release:archive` now contain already-minified JS/CSS.
- Updated hashed bundle compilation so the primary `/assets/css/bundle.*.css` and `/assets/js/bundle.*.js` filenames are based on minified content.
- Verification without full build: `npm install`, `node --check scripts/minify-generated-assets.mjs`, `node --check scripts/build-all.mjs`, `npm run minify:generated-assets`, `find generated/validohub/assets -type f -name '*.js' -exec node --check {} \;`, `npm run package:site -- --dry-run`, `npm run audit:performance`, and `npm run audit:generated-premium` passed. Current generated asset sizes after the local minify pass: JS about `25M`, CSS about `1.5M`.

## 2026-08-02 - Full Build Timing And Deploy Archive Smoke

- Optimized the Valido Engine HTML exporter and wired ValidoHub full builds to prepare the current engine classpath before publish. Full `npm run build:release -- --progress-seconds 30` now passes in 230,584 ms (about 3m51s), down from 448,524 ms (about 7m29s). `Run Java publisher` dropped from about 4m02s to 15s.
- Re-ran the Node-only release gate after the premium-shell repair fast path: `npm run build:release:node -- --progress-seconds 30` passed in 169,754 ms (about 2m50s) for 86,632 registered routes. On the already-clean generated tree, `Repair premium tool shells` scanned 86,632 HTML pages in 5s with 0 rewrites.
- Created a fresh deploy archive from the 3m51s full build with `npm run package:site`: `generated/releases/validohub-20260802-011524.tar.gz`, 955,743,196 bytes, created in 79s, sha256 `ee518717ebb1ef836413f1493cf2806f7f37a55d2b138af0ca1c2a6552935f8c`.
- Deployed `20260802-011524` to the OVH VPS for IP-only preview. Caddy now serves `/srv/validohub/current` on `:80`; `http://137.74.173.107/` redirects to `/en/`, and `/en/`, `/en/tools/`, and the hashed CSS bundle return `200 OK`.
- Updated `scripts/package-generated-site.mjs` to set `COPYFILE_DISABLE=1` for tar/zip subprocesses so future macOS-created deploy archives do not emit GNU tar extended-attribute warnings on Ubuntu.
- Added `scripts/deploy-vps-site.mjs` plus `npm run deploy:vps`, `npm run rollback:vps`, `npm run status:vps`, and `npm run list:vps-releases`. The deploy helper uploads immutable release archives, verifies checksums on the VPS, checks release files before switch, atomically changes `/srv/validohub/current`, reloads Caddy, runs public smoke checks, and auto-rolls back to the previous symlink target if public smoke fails.
- Verification: `mvn -pl valido-exporter-html -am test`, `mvn -pl valido-cli -am test`, `mvn -pl valido-cli -am -DskipTests install`, direct Engine `publish --site /Users/maxtkachenko/work/validohub/site.yaml`, full `npm run build:release -- --progress-seconds 30`, `npm run audit:generated-premium`, `npm run audit:performance`, `npm run audit:seo`, `shasum -a 256 -c validohub-20260802-011524.tar.gz.sha256`, `node --check scripts/deploy-vps-site.mjs`, `npm run status:vps`, `npm run list:vps-releases`, and `npm run rollback:vps -- --release-id 20260802-011524` passed.

## 2026-08-01 - Generated Premium Shell Repair Pipeline Hook

- Integrated `scripts/repair-generic-country-tools-premium.mjs` into `scripts/build-all.mjs` as the `Repair premium tool shells` phase after localization, chrome normalization, country related-link pruning, and workbench script normalization.
- Reworked the repair script from a silent full-array walk into a streaming generated-HTML scan with progress output every 5,000 files by default via `VALIDOHUB_REPAIR_PROGRESS_ITEMS`.
- Optimized the repair script with a concurrency-limited scanner (`VALIDOHUB_REPAIR_CONCURRENCY`, default 48) and fast paths for already-clean global, bespoke, legacy-rich, country-utility, and `csf-static-host` pages. The standalone repair benchmark on the verified generated tree dropped from the previous multi-minute scan to about 5.2 seconds with 86,632 HTML pages scanned and 0 rewrites.
- Added child-process progress snapshots to `scripts/build-all.mjs`: long silent child commands now print child `pid/etime/cpu/mem/state`, and Maven/Engine publish also prints generated output size. Use `--no-progress-snapshot` or `VALIDOHUB_BUILD_PROGRESS_SNAPSHOT=0` to disable the extra heartbeat.
- Extended the repair pass to remove stale global `/tools/*` workbench headings and fake API preview blocks in addition to the existing country-tool cleanup for intermediate `vh-generic-country-*` shells, legacy-rich country pages, bespoke Spain ID, and factory suite fallback hosts.
- Added Brazil CPF/CNPJ bespoke tax-id cleanup and a country-utility cleanup path so legacy-rich country pages only keep `country-legacy-rich-layer.js` when their algorithm is the actual `validohub.<country>-suite`; Brazil IBAN/Pix utility pages no longer get duplicate country suite scripts.
- Added `scripts/package-generated-site.mjs`, `npm run package:site`, and `npm run build:release:archive` so a verified generated site can be packaged into `generated/releases/validohub-<release-id>.tar.gz` plus a `.sha256` checksum. `tar.gz` is the default for Ubuntu compatibility, with `--format tar.zst` and `--format zip` available.
- Full `npm run build:release -- --progress-seconds 30` now passes. Final repair stats inside the passing build: 86,632 HTML pages scanned, 734 global tool pages cleaned, 1,365 legacy-rich pages cleaned, 21 bespoke pages cleaned, 392 country utility pages cleaned, and 82,250 pages already premium.
- Verification: `node --check scripts/repair-generic-country-tools-premium.mjs`, `node --check scripts/package-generated-site.mjs`, `node --check scripts/build-all.mjs`, `node scripts/repair-generic-country-tools-premium.mjs`, `npm run package:site -- --dry-run`, full `npm run build:release -- --progress-seconds 30` passed after the fast-path repair optimization in 448,524 ms, `npm run audit:generated-premium` passed across 86,632 pages, `npm run audit:performance` passed, and `npm run audit:seo` passed with known Open Graph/Twitter warnings.

## 2026-07-31 - Country/Global Legacy Tool Layout Kill Sweep

- Removed the intermediate `vh-generic-country-*` generated repair shell from the allowed premium contract. `scripts/audit-generated-premium-contract.mjs` now fails generated pages that contain old/intermediate tool shell markers, fake API preview copy, `Run the tool`, or stale Engine footer text.
- Reworked `scripts/repair-generic-country-tools-premium.mjs` so stale factory country-suite pages collapse to the real `csf-static-host`, accepted legacy-rich Brazil/Poland/France/Netherlands pages keep their form host but lose the intermediate hero/sample/trap shell, and bespoke Spain ID pages keep their own runtime while dropping the same intermediate shell.
- Removed fake `/v1/...` endpoint metadata from `assets/js/tools/country-legacy-rich-layer.js`; developer output remains local JSON/debug capture, not a public API promise.
- Made country tool related footers country-local by default in `scripts/build-country-dev.mjs` and `scripts/repair-country-tool-related-footer.mjs`. The footer keeps same-country related links plus country hub, countries directory, and global tools directory actions; cross-country related cards are no longer emitted by the shared footer.
- Tightened audits for the current architecture: `scripts/audit-country-suite-factory.mjs` excludes bespoke Spain ID from factory script requirements, and `scripts/audit-country-premium.mjs` allows directory action links while still blocking foreign country related cards.
- Refreshed generated preview without a full build: collapsed 82,250 stale country-suite pages, cleaned 1,771 accepted legacy-rich pages, cleaned 7 Spain ID bespoke pages, and rewrote 84,028 country tool related footers.
- Verification: syntax checks for changed JS/MJS, `npm run audit:generated-premium` across 86,632 HTML pages, `npm run audit:country-suite`, and targeted `npm run audit:country-premium -- --country bahrain|belgium` all passed. Full build was not run.

## 2026-07-31 - Spain ID Gold-Lite Layout Polish

- Fixed the Spain ID bespoke standalone mount on generated country pages where the host is already a `<form>`; the runtime now reuses that form instead of inserting an invalid nested form.
- Reworked the first viewport of `/en/spain/spain-id-validator/`: safe fixture auto-renders, styled fixture/generator chips sit above the input, the textarea is compact, action buttons stay in one desktop row, and result summary cards appear before the timeline.
- Kept official/source links in the lower source panel rather than inflating the top fixture deck.
- Verification completed without full build: `node --check assets/js/tools/spain-id.js`, `npm run build:country -- --country spain`, Playwright desktop/mobile sanity against `http://127.0.0.1:8141/en/spain/spain-id-validator/`, `npm run audit:country-premium -- --country spain`, and `npm run audit:generated-premium`.

## 2026-07-31 - Targeted Visual Audit Pass

- Ran a browser-based targeted visual audit across 72 representative country/global tool pages after the legacy-layout sweep. The audit checked JS errors, horizontal overflow, old/fake markers, related footer presence, top-of-workbench samples, boundary/trap text, developer output, and oversized textareas.
- Fixed the shared Country Suite Factory render order so pages now render `hero -> input/samples/results -> context/debug/traps`; this moves styled samples and the main workbench into the first viewport on long-tail CSF pages.
- Fixed the accepted legacy-rich layer for Brazil/Poland/France/Netherlands routes: replaced lingering `API handoff preview` wording with developer JSON/raw output language and added a visible Official boundary strip.
- Verification completed without full build: `node --check` for the two touched runtimes, scoped `build:country` for Bahrain and Brazil, Playwright visual audit finished with `checked: 72`, `weakCount: 0`, `overflow: 0`, `oldMarker: 0`, plus `npm run audit:generated-premium`, `npm run audit:country-premium -- --country brazil`, and `npm run audit:country-premium -- --country bahrain`.

## 2026-07-31 - Visual Premium Audit Gate

- Added `scripts/audit-visual-premium.mjs` and `npm run audit:visual-premium` as a reusable Playwright sampling gate for premium country/global tool pages.
- The audit starts a local generated-site server unless `--base-url` is provided, supports `--limit`, `--mobile-limit`, `--locales`, `--shards`, and `--shard-index`, and checks for JS errors, desktop/mobile overflow, old/fake markers, missing workbenches, missing country related footers, too-few top workbench samples, missing boundary text, missing developer output, and oversized textareas.
- Verification completed without full build: `node --check scripts/audit-visual-premium.mjs`, `npm run audit:visual-premium -- --limit 24 --mobile-limit 8`, `npm run audit:visual-premium -- --limit 120 --mobile-limit 40`, and `npm run audit:generated-premium` all passed.

## 2026-07-28 - Country Factory Runtime Localization Sweep

- Promoted the country-suite runtime localization work from page-specific French fixes into the shared `country-suite-factory.js` layer used by generated country tools.
- Localized common runtime UI for the 7 production locales (`en`, `es`, `pt-BR`, `de`, `fr`, `pl`, `uk`): compact route rails, validation pipeline cards, field/anatomy breakdowns, calculation debugger table headers, Developer API preview, and Raw JSON output summaries.
- Added runtime country metadata (`iso2`, `iso3`, `adjective`) to generated country-suite mounts so localized country names can resolve via `Intl.DisplayNames` instead of hardcoded country-name fallbacks.
- Verified without full build using scoped Colombia builds across `es,pt-BR,de,fr,pl,uk` and Playwright smoke on `/colombia/colombia-currency-decimal-formatter/` to catch shared English markers in rail/pipeline/breakdown/debugger blocks.

## 2026-07-28 - Country Locale Navigation and Summary Sweep

- Hardened scoped country localization so `build:country` hydrates all localized route siblings and country display names before materializing locale trees. Localized country tool pages now rewrite known `/en/...` navigation/related links to the active locale instead of leaving English nav islands.
- Added localized category/navigation labels for country-tool breadcrumbs and primary nav (`Address`, `Documents`, `Government`, `Privacy`, `Tax`, `country`, etc.) plus a safe fallback from `/en/categories/country/` to `/<locale>/countries/`.
- Added country-tool title normalization for generated suites: English demonym prefixes such as `Colombian` and `Ecuadorian` become localized country-name prefixes like `Colombie:` and `Еквадор:` on localized pages.
- Added production summary translation patterns for the common generated country-tool descriptions across identifier, tax, bank account, MRZ/passport, currency, address, phone, postal, VIN, CSV, date, company-suffix, privacy, and API fixture tools.
- Verified without full build: `node --check scripts/localization-pass.mjs`, `node --check scripts/build-country-dev.mjs`, scoped `npm run build:country -- --country colombia --locales es,pt-BR,de,fr,pl,uk`, scoped `npm run build:country -- --country ecuador --locales es,pt-BR,de,fr,pl,uk`, plus grep smoke showing no stale `/en/` links, English action buttons, or checked English summary starts in sampled localized pages.

## 2026-07-28 - Production Locale Tool Page Foundation

- Extended localization beyond portals into selected individual global tool pages: `scripts/build-tools-dev.mjs` now passes `/tools/<slug>/` suffixes into `applyFinalLocalizationPass()` and can force-refresh localized copies from current English output during scoped builds.
- Exported `translateVisibleHtml()` from `scripts/localization-pass.mjs` and wired it into `scripts/build-country-dev.mjs`, so scoped country builds apply the same production locale sweep across generated country hub/tool HTML.
- Added a production workbench-surface phrase pack for the 7 production locales covering core labels such as Generate, Copy developer JSON, Field breakdown, Integration traps, Official boundary, batch controls, IBAN form labels, JSON/redaction form labels, and common workbench status text.
- Fixed the generated country-suite runtime label precedence in `assets/js/tools/country-suite-factory.js`: generated suite English `i18n` base labels no longer override locale defaults, and route buttons translate `Validate`/`Generate` dynamically.
- Added a global `generic-suite.js` chrome localization layer for common runtime UI: samples, action buttons, quality cards, integration traps, advanced sections, official boundary, developer snapshot actions, copy/download feedback, and waiting/input-ready states.
- Verified without full build: `node --check` for changed localization/build/runtime files, scoped `npm run build:tools -- --slugs iban-generator,json-schema-workbench,secret-pii-redactor --locales es,pt-BR,de,fr,pl,uk`, scoped `npm run build:country -- --country brazil --locales es,pt-BR,de,fr,pl,uk`, and grep smoke on localized global pages showing translated IBAN summary/form labels and no stale exact English labels for the checked workbench chrome.

## 2026-07-27 - Production Locale Portal Foundation

- Shifted current priority from new functionality to localization quality for the 7 production locales in `site.yaml`: `en`, `es`, `pt-BR`, `de`, `fr`, `pl`, and `uk`.
- Added a production locale overlay in `scripts/localization-pass.mjs` for homepage, global tools portal, countries portal, SEO titles/descriptions, common workbench labels, country summary repair, and `fr`/`uk` title phrase coverage.
- Hydrated localized country display names from route-registry country metadata via `Intl.DisplayNames`, so portal/country surfaces no longer depend only on the old four-country hardcoded name map.
- Fixed a localization ownership bug: `/en/tools/` is now explicitly marked Node-owned in `build:portal`, `build:tools`, and full build wiring so localized `/tools/` pages copy the fresh premium tools portal instead of reusing the older Java-owned shell.
- Verified without full build: `node --check` for changed localization/build scripts, scoped `npm run build:portal`, targeted grep smoke for stale English portal strings, and Playwright smoke on `/fr/`, `/uk/`, `/de/tools/`, `/es/countries/`, `/pl/tools/`, and `/pt-BR/` with correct `lang`, localized titles/H1s, and zero horizontal overflow.

## 2026-07-27 - Homepage Premium Command Center

- Redesigned `/en/` as the product face: compact premium command-center hero, restrained launcher lanes, tighter search/chips, dense metric strip, and calmer tool/country/contract sections.
- Replaced the old flag-gradient home world map with a neutral atlas treatment matching the premium countries portal: calm country fills, subtle hover/focus lift, no country selected by default, and no popover shown at load.
- Added country outline preview art to the home map popover via `data-country-outline` and `data-vh-world-popover-image`, preserving click/focus navigation to country hubs.
- Updated `scripts/build-countries-portal.mjs`, `assets/css/validohub.css`, and `assets/js/portal-home.js`.
- Verified without full build: `node --check` for changed portal JS/MJS, scoped `npm run build:portal -- --locales en`, and Playwright desktop/mobile smoke on `/en/` with zero horizontal overflow, neutral map fill, and zero active countries at load.

## 2026-07-27 - Countries Portal Premium Registry

- Redesigned `/en/countries/` into a compact premium country registry with a restrained intro, dense controls, smaller country-card typography, compact fact rows, clipped chip rows, and a neutral preview sidebar.
- Preserved the existing world-map visual design and only changed the default selection behavior: no country, including Brazil, is selected on initial page load.
- Fixed preview currency labels so countries without a separate currency code no longer render values like `CLP (undefined)`.
- Updated `scripts/build-countries-portal.mjs`, `assets/css/countries-portal.css`, `assets/css/validohub.css`, and `assets/js/countries-portal.js`.
- Verified without full build: `node --check` for changed portal JS/MJS, scoped `npm run build:portal -- --locales en`, and Playwright desktop/mobile smoke on `/en/countries/` with zero horizontal overflow and zero active countries at load.

## 2026-07-27 - Global Tools Portal Premium Registry

- Redesigned `/en/tools/` from a giant-text flat directory into a compact premium registry grouped by integration job: Data & API Contracts, Security & Trust, Regulated Formats, DevOps & Cloud QA, Frontend & Product QA, AI & Data Ops, and Text/Time utilities.
- Reworked `scripts/build-countries-portal.mjs` to classify global routes into these families, render compact featured workbenches, and generate category sections with targeted filter chips.
- Tightened `assets/css/validohub.css` for small fixed typography, restrained cards, compact hero/search, premium spacing, and mobile-safe layout with no viewport-scaled headline bloat.
- Updated `assets/js/portal-tools.js` so search hides empty category families while keeping the live result count accurate.
- Verified without full build: `node --check scripts/build-countries-portal.mjs`, `node --check assets/js/portal-tools.js`, scoped `npm run build:portal -- --locales en`, and Playwright desktop/mobile smoke on `/en/tools/` with zero horizontal overflow.

## 2026-07-27 - Global Tools Gold Interaction Floor

- Upgraded `assets/js/tools/generic-suite.js` with a shared Gold interaction floor for the 72 global routes that use the generic suite.
- Added current-result evidence strips, compact sample/batch replay matrices, official/source-system boundary panels, and in-block Developer Snapshot actions for copying result JSON, copying current output, and downloading developer JSON.
- Added domain-specific integration traps for structured identifiers/banking, data/API formats, security/ops tools, and cloud/frontend QA workflows so global tools no longer rely on one generic warning set.
- Expanded generic-suite premium CSS in `assets/css/workbench.css` for evidence strips, replay tables, boundary cards, developer action bars, local overflow containment, and missing global themes such as security, design, data/url/encoding, and cloud.
- Cache-busted `generic-suite.js` in scoped/full build wiring via `generic-suite-global-gold-v2-20260727`.
- Verified without full build: `node --check` for changed JS/MJS files, `npm run build:tools -- --locales en`, static sweep across all 79 `/en/tools/*` routes, and `npm run audit:global-premium -- --base http://127.0.0.1:8141` passing for its 69-route browser coverage.

## 2026-07-27 - Country Tool MVP Triage

- Audited mounted factory country-suite inventory from `assets/js/tools/*-suite.js`: 11,747 parsed tools across 190 suite files, excluding legacy/special wrappers for Brazil, France, Netherlands, Poland, and the generic suite.
- Classified tools into MVP treatment buckets: 5,697 `SHIP/SPOTCHECK`, 2,948 `REVIEW`, 2,244 `MERGE/GLOBALIZE`, and 858 `HIDE/REFERENCE`.
- Identified repeated weak patterns that should not remain primary country catalog items before MVP: company onboarding auditors, business-register readiness helpers, e-invoicing readiness checkers, tax-authority handoff helpers, accounting audit-trail checklists, generic API payload auditors, regex/slug/accessibility helpers, privacy/support scrubbers, and policy/checklist pages.
- Added `docs/reports/COUNTRY_TOOL_MVP_TRIAGE.md` as the product decision map for the next visibility-tier pass.

## 2026-07-27 - Factory Developer Data Workflow Gold Floor

- Upgraded `assets/js/tools/country-suite-factory.js` for generated developer-data workflows: 2,742 tools across 187 parsed mounted country-suite files now get targeted local analysis for CSV/JSON/API payloads, data-quality workbenches, form-field auditors, regex/slug helpers, privacy redaction, OCR cleanup, fixtures, schemas, smoke matrices, retention, checkout, and shipping-label workflows.
- Added JSON parsing with error/type/key evidence, CSV delimiter/header/row-width profiling, key/field extraction from labelled text, safe fixture JSON generation, privacy-signal detection, irreversible masked previews, OCR line cleanup, form/accessibility label evidence, developer JSON, and explicit source-truth/privacy/compliance boundaries.
- Added a compact `csf-developer-data-bar` with the same anti-overflow grid rules as the banking/payment/locale factory rails.
- Corrected analyzer/render priority so developer-data routes get this layer while bank/account, payment/invoice, and locale/date/currency pages keep their stronger dedicated rails.
- Verified without full build: syntax check, scoped Algeria/Canada/United States/Japan builds, generated runtime sync, and headless browser smoke for 11 developer-data representatives plus Algeria bank-account, payment-reference, and calendar-week negative scope checks.
- Added `docs/ai/gold-tools/FACTORY_DEVELOPER_DATA_WORKFLOW_GOLD_LOG.md`.

## 2026-07-27 - Factory Locale Date Currency Gold Floor

- Upgraded `assets/js/tools/country-suite-factory.js` for generated locale/date/currency workflows: 234 route candidates across 188 suites now get targeted local parsing for locale numbers, currency/decimal formatting, date-locale formatting, calendar-week helpers, and timezone/business-hours helpers.
- Added localized number token extraction, decimal/group separator detection, canonical machine-number export, currency marker detection, date component/order parsing, ISO date/week replay, timezone/business-hour hints, ambiguity warnings, masked developer JSON, and explicit exchange-rate/holiday/DST/source boundaries.
- Added a compact `csf-locale-format-bar` with the same full-width auto-fit anti-overflow rules as the other factory rails.
- Corrected analyzer/render priority so locale/date/currency routes run before broad document/payment/tax fallbacks while banking and payment-reference pages stay in their own rails.
- Verified without full build: syntax check, scoped Algeria/Canada/Bahamas/Japan builds, generated runtime sync, and headless browser smoke for Algeria calendar week, locale number, currency decimal, date locale, Japan calendar/locale number, Canada currency/timezone, Bahamas date locale, plus Algeria bank-account and payment-reference negative scope checks.
- Added `docs/ai/gold-tools/FACTORY_LOCALE_DATE_CURRENCY_GOLD_LOG.md`.

## 2026-07-27 - Factory Bank Account Workflow Gold Floor

- Upgraded `assets/js/tools/country-suite-factory.js` for generated non-IBAN bank/account workflows: 806 id-matched bank account, BIC/SWIFT, routing/bank-code, masked-account, direct-debit/SEPA/domestic-transfer, and bank-statement/reconciliation route candidates across 192 suites now get targeted local banking parsing.
- Added BIC/SWIFT institution/country/location/branch anatomy, BIC route-country inference from valid samples, domestic routing/account slices, ABA checksum replay when a nine-digit US routing candidate is visible, mandate/scheme hints, statement date/amount/reference hints, masked-account previews, developer JSON parts, and explicit bank/provider ownership-settlement boundaries.
- Added a compact `csf-bank-account-bar` with the same full-width auto-fit anti-overflow rules as the other factory rails.
- Corrected analyzer/render priority so direct-debit/domestic-transfer/bank-statement routes use banking anatomy before broad payment workflow fallback, while ordinary payment references and VIN/document routes stay in their own rails.
- Verified without full build: syntax check, scoped Algeria/United States/Germany/Australia builds, generated runtime sync, and headless browser smoke for Algeria bank account, BIC/SWIFT, direct debit, bank statement, masked account, Australia domestic transfer, plus Algeria payment-reference and VIN negative scope checks.
- Added `docs/ai/gold-tools/FACTORY_BANK_ACCOUNT_WORKFLOW_GOLD_LOG.md`.

## 2026-07-27 - Factory Payment Invoice Workflow Gold Floor

- Upgraded `assets/js/tools/country-suite-factory.js` for generated payment reference, payment, remittance, invoice, e-invoice, and procurement workflow tools: 1,161 tools across 191 country suites now get targeted workflow parsing instead of falling into generic payment/workflow evidence.
- Added reference extraction, XML/JSON/e-invoice payload classification, amount/currency and date hints, party/account evidence, route sample-shape replay, placeholder rejection, masked developer JSON, and explicit settlement/fiscal/e-invoice/procurement official-boundary output.
- Added a compact `csf-payment-workflow-bar` with the same full-width auto-fit anti-overflow rules as the previous factory rails.
- Corrected analyzer/render priority so invoice/payment/procurement routes no longer get tax/business rails just because generated copy contains tax or company vocabulary.
- Verified without full build: syntax check, scoped Algeria/Germany/Australia/Japan builds, generated runtime sync, and headless browser smoke for Algeria payment reference, remittance, invoice, e-invoicing, procurement, Germany XRechnung/ZUGFeRD, Japan payment/e-invoicing, plus Algeria VIN negative scope check.
- Added `docs/ai/gold-tools/FACTORY_PAYMENT_INVOICE_WORKFLOW_GOLD_LOG.md`.

## 2026-07-27 - Factory Document Vehicle Reference Gold Floor

- Upgraded `assets/js/tools/country-suite-factory.js` for generated document/passport/MRZ, vehicle/plate/VIN, customs, and tracking tools: 2,090 tools across 191 country suites now get a targeted analyzer instead of falling into broad generic or tax/business evidence.
- Added document/reference token extraction, route sample-shape replay, masked developer output, VIN WMI/VDS/VIS anatomy, MRZ line parsing with escaped/newline handling, MRZ check-slot evidence when available, customs importer/HS/amount hints, tracking prefix/body slices, and explicit authority/registry/carrier/customs boundaries.
- Added a compact `csf-document-reference-bar` with the same full-width auto-fit anti-overflow rules as the previous contact/address pass.
- Corrected analyzer/render priority so VIN/customs routes no longer show the tax/business rail merely because generic copy contains tax/registration words.
- Verified without full build: syntax check, scoped Algeria/Japan/Australia builds, generated runtime sync, and headless browser smoke for Algeria MRZ, Algeria plate, Australia VIN, Algeria customs, Algeria tracking, plus Algeria postal negative scope check.
- Added `docs/ai/gold-tools/FACTORY_DOCUMENT_VEHICLE_REFERENCE_GOLD_LOG.md`.

## 2026-07-27 - Factory Contact Address Gold Floor

- Upgraded `assets/js/tools/country-suite-factory.js` for generated `phone`, `postal`, and `address` tools: 834 tools across 190 country suites now get route-sample calling code/postal-shape inference, local phone/postal/address evidence slices, E.164-style previews where possible, masking, developer JSON parts, official-boundary notes, and a compact route-context rail.
- Hardened the new rail CSS after browser QA caught vertical text/overflow risk: factory input rails now use full-width auto-fit grids with minimum card widths, local wrapping, and zero horizontal overflow on representative desktop routes.
- Kept scope tight: non-contact tools such as region mappers do not receive the contact/address rail; richer route-bound Gold Lab tools such as Canada postal continue to use their dedicated lab runtime.
- Verified without full build: syntax check, scoped sequential Algeria/Japan/Canada builds, generated runtime sync, in-app browser layout smoke, and headless Playwright smoke for Algeria phone, Algeria postal, Japan address, Algeria region negative, and Canada postal Gold Lab.
- Added `docs/ai/gold-tools/FACTORY_CONTACT_ADDRESS_GOLD_LOG.md`.

## 2026-07-27 - Factory Tax Business Identifier Gold Pass

- Upgraded `assets/js/tools/country-suite-factory.js` for the targeted VAT/EORI/company/register identifier class: 629 generated factory tools across 190 country suites now get route-prefix inference, local type-marker/body slicing, placeholder rejection, masked developer output, tax/business anatomy, official-boundary copy, and a compact premium route-context rail.
- Reused stronger local company/tax parsers for profile-backed VAT/EORI countries where appropriate, while keeping tax-rate, tax-return, invoice, onboarding, audit, and other non-identifier workflows out of this analyzer.
- Fixed generated-suite prefix inference when the mounted suite config only carries `slug/name`: the factory now falls back to the valid sample prefix for route-locked VAT/EORI/company evidence.
- Verified without full build: syntax checks, scoped Germany/Austria/Belgium/Algeria builds, targeted count audit, and browser smoke for Germany VAT, Austria EORI, Belgium VAT, Algeria generic tax, plus a negative scope check that Algeria tax-rate did not receive the identifier rail.
- Added `docs/ai/gold-tools/FACTORY_TAX_BUSINESS_IDENTIFIER_GOLD_LOG.md`.

## 2026-07-27 - Factory IBAN Generator Gold Pass

- Upgraded `assets/js/tools/country-suite-factory.js` IBAN generator behavior for 44 country-scoped IBAN routes with route-locked country profiles, expected IBAN length, local BBAN anatomy slices, grouped/masked output, MOD-97 replay, current-result developer JSON copy, and compact premium generator spacing.
- Fixed the generator/validator mismatch on factory IBAN routes: `Generate` now feeds a clean route BBAN of the correct profile length, creates a fresh full IBAN on every click, and keeps invalid/short/wrong-prefix samples on review paths.
- Cache-busted `country-suite-factory.js` separately in scoped/full builders via `country-suite-factory-iban-gold-20260727`.
- Verified without full build: syntax checks, scoped Albania/Germany/Spain/Switzerland builds, generated asset/script greps, and browser smoke for those four IBAN generator routes with correct generated country/length, review samples preserved, JSON copy present, and zero horizontal overflow.
- Added `docs/ai/gold-tools/IBAN_GENERATOR_FACTORY_GOLD_LOG.md`.

## 2026-07-27 - Gold Tools Round 4 Shared Interaction Uplift

- Upgraded `assets/js/tools/gold-tools-lab.js` to `2026-07-27-country-rich-lab-v4` for the 281 route-bound shared country-tool profiles.
- Added a richer fixture deck, batch replay, current-result Developer JSON/value copy, JSON download, route-local history, anchored copy popovers, and tighter compact typography/spacing.
- Cache-busted `gold-tools-lab.js` separately in `scripts/build-country-dev.mjs` and `scripts/build-all.mjs` via `gold-tools-lab-v4-20260727`.
- Verified without full build: syntax checks, scoped sequential Greece/Germany/United States builds, and Playwright smoke for representative tax, IBAN, and phone routes with zero desktop/mobile horizontal overflow.
- Added `docs/ai/gold-tools/ROUND4_SHARED_GOLD_UX_UPLIFT_LOG.md`.

## 2026-07-27 - Gold Tools Round 3 Strong Expansion

- Added a shared Developer Snapshot copy control to the route-bound rich country lab runtime so every generated rich tool exposes `Copy developer JSON` directly next to the JSON payload, not only near the input controls.
- Fixed country-page tool search suggestions so the dropdown closes on outside pointer click, Escape, Clear, or focus leaving the search form; scoped United States build refreshed the generated bundle/runtime assets.
- Added the highest-priority country-tool override: every country-scoped tool must aim for Pix/CURP-level best-in-world quality to the maximum extent its format allows. Generated routes, generic factory pages, and shared overlays are not sufficient when richer browser-checkable behavior is possible.
- Promoted the 281 route-bound country tool profiles from a bottom-of-page overlay to a primary rich workbench runtime in `assets/js/tools/gold-tools-lab.js` (`2026-07-27-country-rich-lab-v3`): the route host now opens directly with source links, samples, input, local evidence, anatomy tables, replay checks, implementation lint, official boundary, integration traps, and developer snapshot.
- Added family-specific rich workbench behavior/copy for IBAN, BIC/SWIFT, phone, postal, passport-like document numbers, vehicle plates, invoice references, payment references, and bank/account references, plus corrected tax/business vs identity classification for AFM/NIF/PIN-style identifiers.
- Expanded the shared `assets/js/tools/gold-tools-lab.js` overlay from 110 to 281 route-bound profiles.
- Recorded the corrected Gold definition after user review: Gold must mean bespoke maximum-quality on the actual page, not a staged overlay label. Shared overlays are now documented as migration/triage scaffolding only; finished Gold pages must hit the Pix/CURP/Spain ID bar before being presented as Gold.
- Added strong shared analyzers for BIC/SWIFT, phone/E.164, postal codes, passport-like document numbers, vehicle plates, invoice references, payment references, bank/account references, postal tracking, customs references, and procurement identifiers.
- Added 171 additional strong Gold profiles across existing generated country routes without creating new YAML routes or running a full build.
- Added route-specific overlay injection for selected older Poland/Brazil standalone routes whose algorithm IDs are not country-suite IDs.
- Ran scoped sequential `build:country -- --country poland --locales en` and `build:country -- --country brazil --locales en`; no full build was run.
- Verified syntax, VM sample replay, invalid-fixture behavior, generated route resolution, script injection, and generated runtime asset sync.
- Added `docs/ai/gold-tools/ROUND3_STRONG_GOLD_EXPANSION_LOG.md`.

## 2026-07-26 - Brazil Pix bespoke Gold V2

- Deepened `assets/js/tools/pix.js` from production V1 into the first bespoke Gold payment/QR/payload lab.
- Added BR Code formatting, deliberate bad-CRC fixture generation, safe-fixture diff, nested TLV paths, offsets, raw TLV segments, CRC replay input, implementation lint, official BCB/source links, and Pix-specific integration traps.
- Fixed scoped `build:country` runtime syncing so Brazil copies standalone `pix.js` and Poland copies standalone `pesel.js` into generated assets instead of leaving stale standalone runtimes.
- Updated `docs/product/PIX_WORKBENCH_SPEC.md`, `docs/product/WORKBENCH_REGISTRY.md`, and `docs/ai/gold-tools/BRAZIL_PIX_GOLD_LOG.md`.
- Verified with `node --check`, scoped Brazil build, Brazil premium audit, and browser smoke for valid BR Code plus bad-CRC flows. Full build was not run.

## 2026-07-26 - Gold Tools Lab V1 first 50 flagship overlay

- Added ValidoHub-owned `assets/js/tools/gold-tools-lab.js`, an additive browser-lab overlay for flagship local-market tools; it currently covers 64 generated route profiles after Pix was promoted out of the overlay.
- The overlay adds source links, valid/invalid fixtures, safe generation, local analysis, anatomy/evidence cards, batch replay, integration traps, official-boundary notes, and developer JSON while preserving existing PESEL, Spain ID, legacy-rich, and Country Suite Factory behavior. Pix now uses its bespoke full-page runtime instead.
- Wired the overlay into `scripts/build-all.mjs` and scoped `scripts/build-country-dev.mjs`; standalone PESEL receives Gold Lab injection without replacing `pesel.js`. Standalone Pix is intentionally excluded from the overlay.
- Added AI-facing implementation logs under `docs/ai/gold-tools/` so future sessions can see the target list, route status, verification commands, limitations, and next deepening queue.
- Aligned `audit:country-premium` with existing runtime mappings for PESEL and IBAN generator and fixed inline YAML capability parsing.
- Verified without full build: syntax checks, sequential scoped country builds, representative script injection checks, browser smoke for Brazil Pix / Poland PESEL / India PAN, and premium audits for Brazil, Poland, India, and United States.

## 2026-07-25 - All-country premium visual and coverage baseline checkpoint

- Regenerated Africa country shape and location PNGs to the Ghana/Kenya-approved premium 3D raster style, including tactile raised outline assets and neutral-gray relief location maps with only the target country highlighted.
- Added full Oceania source coverage for 14 sovereign UN member countries and generated premium outline/location PNGs for Australia, Fiji, Kiribati, Marshall Islands, Micronesia, Nauru, New Zealand, Palau, Papua New Guinea, Samoa, Solomon Islands, Tonga, Tuvalu, and Vanuatu.
- Regenerated United States outline/location PNGs so USA uses unmistakable stars-and-stripes artwork instead of a generic red/white/blue treatment.
- Restored missing North America YAML source manifests for all 23 generated North America countries so country source/data/assets coverage now lines up.
- Adjusted country hero visual image fitting to preserve wide island/archipelago assets without cropping.
- Verified local source coverage at 194 country YAML/data/image pairs: Asia 48, Europe 43, Africa 54, North America 23, South America 12, Oceania 14. Russia and Belarus remain excluded by product decision.
- Ran scoped builds/audits, not a full build: Africa final five, all Oceania countries, United States, Fiji post-CSS, portal, and `npm run audit:country-suite` passed.

## 2026-07-24 - Oceania baseline expansion batch

- Added a documented Oceania premium generation batch for Australia (australia), Fiji (fiji), Kiribati (kiribati), Marshall Islands (marshall-islands), Micronesia (micronesia), Nauru (nauru), New Zealand (new-zealand), Palau (palau), Papua New Guinea (papua-new-guinea), Samoa (samoa), Solomon Islands (solomon-islands), Tonga (tonga), Tuvalu (tuvalu), Vanuatu (vanuatu).
- Each country uses Country Suite Factory V1, quality-driven local workbenches, runtime localization for en/es/pt-BR/de/fr/pl/uk, mandatory field breakdown, same-country related links, validate/generate affordances, and explicit official boundaries.
- Added `docs/product/OCEANIA_PREMIUM_SUITE_SPEC.md` so future AI sessions treat batch generation quality as a contract, not a one-off.

## 2026-07-25 - Ghana/Kenya premium country visual baseline

- Promoted the Ghana/Kenya imagegen-style country visual system to the finished-country baseline: independent premium 3D raster outline and location assets, no baked labels/badges, no split panels/gutters, and target-only flag-color highlights on neutral relief maps.
- Flat procedural/SVG-derived country images are now documented as temporary scaffolding only, not the accepted premium country standard.

## 2026-07-24 - Africa baseline expansion batch

- Added a documented Africa premium generation batch for Algeria (algeria), Angola (angola), Benin (benin), Botswana (botswana), Burkina Faso (burkina-faso), Burundi (burundi), Cabo Verde (cabo-verde), Cameroon (cameroon), Central African Republic (central-african-republic), Chad (chad), Comoros (comoros), Republic of the Congo (congo), Cote dIvoire (cote-d-ivoire), Democratic Republic of the Congo (democratic-republic-of-the-congo), Djibouti (djibouti), Egypt (egypt), Equatorial Guinea (equatorial-guinea), Eritrea (eritrea), Eswatini (eswatini), Ethiopia (ethiopia), Gabon (gabon), Gambia (gambia), Ghana (ghana), Guinea (guinea), Guinea-Bissau (guinea-bissau), Kenya (kenya), Lesotho (lesotho), Liberia (liberia), Libya (libya), Madagascar (madagascar), Malawi (malawi), Mali (mali), Mauritania (mauritania), Mauritius (mauritius), Morocco (morocco), Mozambique (mozambique), Namibia (namibia), Niger (niger), Nigeria (nigeria), Rwanda (rwanda), Sao Tome and Principe (sao-tome-and-principe), Senegal (senegal), Seychelles (seychelles), Sierra Leone (sierra-leone), Somalia (somalia), South Africa (south-africa), South Sudan (south-sudan), Sudan (sudan), Tanzania (tanzania), Togo (togo), Tunisia (tunisia), Uganda (uganda), Zambia (zambia), Zimbabwe (zimbabwe).
- Each country uses Country Suite Factory V1, quality-driven local workbenches, runtime localization for en/es/pt-BR/de/fr/pl/uk, mandatory field breakdown, same-country related links, validate/generate affordances, and explicit official boundaries.
- Added `docs/product/AFRICA_BASELINE_SUITE_SPEC.md` so future AI sessions treat batch generation quality as a contract, not a one-off.

## 2026-07-24 - Asia full-premium expansion batch

- Added a documented Asia premium generation batch for Japan (japan), India (india), Singapore (singapore), South Korea (south-korea), United Arab Emirates (united-arab-emirates).
- Each country uses Country Suite Factory V1, quality-driven local workbenches, runtime localization for en/es/pt-BR/de/fr/pl/uk, mandatory field breakdown, same-country related links, validate/generate affordances, and explicit official boundaries.
- Added `docs/product/ASIA_PREMIUM_SUITE_SPEC.md` so future AI sessions treat batch generation quality as a contract, not a one-off.


## 2026-07-24 - Broken Country Shape Raster Repair

- Replaced the 32 broken 887x887 paired-composite `*-outline.png` source assets with standalone 1254x1254 country-shape raster PNGs after the Croatia test was accepted as the working style direction.
- Regenerated only outline/source raster assets; `*-location.png` assets, country data, and Valido Engine were untouched.
- Ran scoped sequential `npm run build:country -- --country <slug> --locales en` for all materialized repaired routes. Japan has a repaired source `japan-outline.png`, but `build:country -- --country japan --locales en` currently reports `Country route not found in source registry: japan`.
- Verified source/generated outline PNGs match for the 31 materialized repaired countries and confirmed HTTP 200 on their local preview pages.

## 2026-07-24 - Scoped Build Asset Link Refresh

- Fixed the local-preview unstyled-page regression where scoped asset rebuilds deleted old hashed CSS/JS bundles while generated pages outside the selected scope still linked those old bundle names.
- Added `scripts/dev-asset-links.mjs` and wired it into `build:country`, `build:portal`, and `build:tools` so scoped builds refresh generated HTML bundle links across the existing generated preview tree after recompiling shared assets.
- Ran `npm run build:country -- --country albania --locales en`; it refreshed 24,130 generated pages, rebuilt the Albania English tree, and passed targeted country HTML guards.
- Verified generated HTML no longer references missing CSS or JS bundle files. Valido Engine and country images were untouched.

## 2026-07-24 - Shared Tool Hero and Country Visual Rules Hardening

- Removed decorative acronym/logo tiles and hero-side Examples panels from the shared country-suite and generic-suite tool shells; samples remain near the input where they are actionable.
- Added shared Integration traps blocks for country-scoped and global tools so every workbench carries concrete developer time-savers and common integration mistakes without per-tool filler.
- Recorded the country raster visual rule: generate outline and location as independent final assets, use national flag colors, keep continent maps neutral except for the target country, and reject paired/cropped images, vertical split panels, white side gutters, satellite textures, and accidental neighboring-country highlights.
- Kept Valido Engine untouched and verified the shared runtime changes with scoped build:tools and scoped Colombia build.

## 2026-07-24 - North America Premium Batch V1

- Added browser-only premium country suites for 23 North America countries: United States, Canada, Mexico, Belize, Guatemala, El Salvador, Honduras, Nicaragua, Costa Rica, Panama, Bahamas, Cuba, Jamaica, Haiti, Dominican Republic, Antigua and Barbuda, Dominica, Saint Kitts and Nevis, Saint Lucia, Saint Vincent and the Grenadines, Grenada, Barbados, and Trinidad and Tobago.
- Added `docs/product/NORTH_AMERICA_PREMIUM_SUITE_SPEC.md` and `scripts/generate-north-america-premium-batch.mjs`; generated suites include 22 local workbenches per country with field anatomy, quality notes, batch/debug/API layers, and Integration traps.
- Extended the route registry and scoped country dev builder so JSON-backed `countries/data/*.json` `hub.routes` materialize real country tool pages without requiring legacy YAML route files.
- Updated release/scoped build mappings and premium audit mappings for the new Country Suite Factory runtimes; scoped audits passed for United States, Canada, Mexico, and Jamaica.
- Updated `audit:country-premium -- --country <slug>` to use English-only scoped checks during development and to treat JSON `hub.routes` as valid factory-suite tool source data.
- Hardened country visual rendering so missing raster PNG assets do not render broken images; North America pages without generated premium PNG maps omit the visual cards until those assets are produced.
- Ran scoped English-only `build:country` for all 23 North America countries and kept Valido Engine untouched.

## 2026-07-23 - Country Tool Anatomy Breakdown V1

- Added shared Country Suite Factory anatomy enrichment so factory-based country tools explain local value segments instead of only showing generic evidence cards.
- Structured values now expose readable prefixes, body blocks, registry/type blocks, check/control digits, routing/account pieces, postal/phone/vehicle/date/amount parts, display-only punctuation, and official-boundary notes where the format supports it.
- Browser-verified Colombia NIT `900.123.456-7` on the generated local site: the UI now shows `900` as registry prefix, `123456` as registry body, and `7` as check digit.
- Removed the duplicate compact segment/strip rendering for generated anatomy results so users see one detailed anatomy card grid instead of repeated values.
- Completed civic main-city profiles for every current country hub so full-premium countries no longer fall back to a single capital plus `population varies by source`; microstates use honest town/quarter/district context.
- Audited local IBAN coverage: every country whose data contains IBAN workflows has both a country-scoped validator and generator; non-IBAN markets continue to use domestic account/payment tools instead of fake IBAN routes.
- Strengthened country hub intent filters so the selected block has a visible active pill, check marker, counter styling, and `aria-pressed`/`aria-current` state.
- Restyled country hub catalog group headers as distinct section bands with accent rails and separated child lists so selected parent categories no longer blend into their first tool rows.
- Simplified country catalog group counters so category clicks show the plain total while `visible/total` fractions appear only during text search; count badges now resize safely.
- Kept Valido Engine untouched; scoped Colombia/Peru/Uruguay checks, country-suite audit, and Peru/Uruguay premium audits passed.

## 2026-07-23 - Global Tools Deep Premium Lens V1

- Upgraded the shared Batch 4-7 global runtime in `assets/js/tools/generic-suite.js` from mostly generic static signal/risk counting into domain-specific browser-only lenses.
- Added specialized cards, field breakdown rows, pipeline checks, domain-risk names, and developer JSON for Kubernetes YAML, Dockerfile, GitHub Actions, Terraform, CORS, Accessibility, Prompt Injection, RAG chunking, JSONL fine-tune, HTML SEO, and browser storage workflows.
- Kept Valido Engine untouched and documented the hardening in Current State and Workbench Registry.

## 2026-07-23 - South America Premium Batch V1

- Added full-premium South America coverage excluding Brazil: Argentina (argentina), Bolivia (bolivia), Chile (chile), Colombia (colombia), Ecuador (ecuador), Guyana (guyana), Paraguay (paraguay), Peru (peru), Suriname (suriname), Uruguay (uruguay), Venezuela (venezuela).
- Used Country Suite Factory V1, domestic LATAM banking/payment terminology, runtime localization, field breakdowns, same-country related links, and official/live lookup boundaries.
- Added `docs/product/SOUTH_AMERICA_PREMIUM_SUITE_SPEC.md` as the batch contract.

## 2026-07-23 - Global Premium Tools Batch V2

- Added fifteen new premium global workbench definitions for JSON Schema, OpenAPI, YAML/TOML, XML/XPath, CSV profiling, SQL query risk inspection, cron expressions, regex explanation/generation, date/timezone conversion, color contrast/tokens, Markdown/MDX, GraphQL, email/domain parsing, user-agent/client hints, and HTTP security headers.
- Wired the batch into the shared ValidoHub generic-suite runtime, build mappings, Tools portal discovery, and global premium audit route list.
- Added `docs/product/GLOBAL_PREMIUM_TOOLS_BATCH_V2_SPEC.md` as the batch product contract.
- Kept Valido Engine untouched; new YAML routes require one full route materialization build before scoped `build:tools` loops can refresh pages.

## 2026-07-22 - Homepage command center visual polish

- Tightened homepage hero typography and spacing so the first viewport reads like a premium launcher instead of an oversized marketing panel.
- Added a compact coverage metric strip and actionable signal buttons that reuse the real homepage search behavior.
- Strengthened the homepage visual layer with denser command lanes, richer but restrained gradients, and mobile-safe responsive rules.
- Kept Valido Engine untouched and used the fast `npm run build:portal` path for homepage/countries-only regeneration.

## 2026-07-22 - Homepage command center refinement

- Reworked the Homepage Portal away from a large marketing/stat hero into a denser command-center launcher.
- Added first-class global tool discovery for JSON, JWT, Base64, URL, Regex, UUID, IBAN validation, and IBAN generation alongside premium country workbenches.
- Added real launcher lanes for Global Tools, Country Tools, Generators, and the Debug Contract; cards now link only to real routes or stable in-page sections.
- Updated the homepage spec so future AI sessions keep global tools visible and do not regress to empty stat panels or hero-only marketing.
- Kept Valido Engine untouched and used the fast `npm run build:portal` path for homepage/countries-only regeneration.

## 2026-07-21 - Strict Europe full-premium expansion batch

- Added a documented strict-Europe premium generation batch for Portugal (portugal), Austria (austria), Belgium (belgium), Ireland (ireland), Czechia (czechia), Sweden (sweden), Norway (norway), Denmark (denmark), Finland (finland), Romania (romania), Albania (albania), Andorra (andorra), Bosnia and Herzegovina (bosnia-and-herzegovina), Bulgaria (bulgaria), Croatia (croatia), Cyprus (cyprus), Estonia (estonia), Greece (greece), Hungary (hungary), Iceland (iceland), Latvia (latvia), Liechtenstein (liechtenstein), Lithuania (lithuania), Luxembourg (luxembourg), Malta (malta), Moldova (moldova), Monaco (monaco), Montenegro (montenegro), North Macedonia (north-macedonia), San Marino (san-marino), Serbia (serbia), Slovakia (slovakia), Slovenia (slovenia), Ukraine (ukraine), United Kingdom (united-kingdom), Vatican City (vatican-city).
- Each country uses Country Suite Factory V1, quality-driven local workbenches, runtime localization for en/es/pt-BR/de/fr/pl/uk, mandatory field breakdown, same-country related links, validate/generate affordances, and explicit official boundaries.
- Added `docs/product/EUROPE_BATCH_PREMIUM_SUITE_SPEC.md` so future AI sessions treat batch generation quality as a contract, not a one-off.

## 2026-07-21 - Country tool sample correctness and debug UX hardening

- Fixed the shared factory sample classifier so `Invalid sample` no longer matches the word `valid` and cannot be treated as a success fixture.
- Added broader valid/invalid/short/wrong-prefix/edge examples to generated factory country tools and forced intentional invalid/review fixtures into review results even when a broad generic analyzer would otherwise pass.
- Made factory repair suggestions interactive, tool-specific, and action-backed: load valid fixture, load invalid fixture, try short sample, run sample batch, or copy normalized output.
- Reworked factory evidence breakdown hierarchy to avoid duplicate `Evidence breakdown` / `Identifier breakdown` headers, added safer token-strip spacing, and improved wrapping so long values do not touch card borders.
- Added hover/focus/active affordances for country tool buttons, sample chips, related links, rich tabs, and repair actions.
- Removed duplicate local badges from the advanced tools body and kept a single badge in the summary.
- Updated global and country-scoped IBAN generator behavior so Generate creates fresh structural fixtures and country routes infer local profiles for France and Netherlands as well as existing supported profiles.
- Added audit and product-rule coverage for these regressions so future countries inherit the same standard.
- Kept Valido Engine untouched.

## 2026-07-21 - Factory sample UX and IBAN generator hardening

- Replaced confusing factory sample dropdown behavior with clear valid/invalid/edge sample buttons and same-country related links that actually navigate.
- Collapsed history, batch diagnostics, API preview, raw JSON, and related local workflows into compact advanced tooling so PESEL-rich depth stays available without taking over the main input area.
- Changed factory primary action styling to success-first instead of inheriting red country accents for normal Validate/Generate actions.
- Added a global `iban-generator` plus country-scoped IBAN generator coverage for generated factory countries and existing bespoke/premium countries, with local check-digit generation, MOD-97 replay, BBAN/check-digit breakdown, masked output, and official bank-ownership boundary notes.
- Added audit and Product Bible rules so future country generation cannot regress to `Review sample`, inert related-tool selects, red success actions, oversized history/batch panels, or validator-only IBAN coverage.
- Kept Valido Engine untouched.

## 2026-07-21 - Factory analyzer intelligence hardening

- Fixed the Country Suite Factory rich-layer gap where some national ID/company/social tools rendered PESEL-rich UI but still used generic analyzer semantics.
- Added shared country-aware analyzer profiles for Switzerland, Spain, Germany, Italy, Austria, Belgium, Czechia, Denmark, Finland, Ireland, Norway, Portugal, Romania, and Sweden.
- Czech Rodne cislo, Czech ICO, Swiss AHV/UID, Spanish DNI/NIE/CIF, German IdNr/Handelsregister, Italian Codice Fiscale/Partita IVA, and the Europe batch core ID/company samples now decode local fields and checksum/control evidence instead of generic `identifier evidence` cards.
- Updated valid fixtures whose previous sample values failed their own local checksum/formula, and added factory audit/doc rules blocking generic analyzer output for finished local ID/company/social/tax tools.
- Kept Valido Engine untouched.

## 2026-07-21 - Native factory rich layer for all factory countries

- Raised Country Suite Factory V1 to native PESEL-rich parity for all factory-based countries.
- Added `csf-rich-lab` to `assets/js/tools/country-suite-factory.js` so Austria, Czechia, Norway, Sweden, Denmark, Finland, Spain, Italy, Germany, Switzerland, and future factory suites get browser history, multi-row diagnostics, API preview, raw JSON/audit output, and same-country related-tool UX from the shared factory.
- Added audit and product-rule coverage so future country work must improve the shared factory instead of adding one-off rich-debug patches.
- Browser-verified the Norway factory tool route from generated output with the rich layer, result card, pipeline, field breakdown, quality notes, advanced panels, no generic `Run the tool` fallback, no raw blue links, and no console errors.
- Kept Valido Engine untouched.

## 2026-07-21 - Legacy country PESEL-rich parity bridge

- Added `assets/js/tools/country-legacy-rich-layer.js` for accepted bespoke country suites: Brazil, Poland, France, and Netherlands.
- The bridge preserves existing bespoke analyzers while adding shared PESEL-depth surfaces: recent validations, batch diagnostics, API preview, raw JSON capture, and country-local related-tool UX.
- Updated full and one-country build mappings so legacy suites load the bridge before their runtime and `npm run build:country -- --country <slug>` keeps selected country tool pages current.
- Added audit/doc guardrails so future work cannot remove the bridge or ship bespoke country tools below the PESEL-rich standard without an explicit equivalent migration.
- Kept Valido Engine untouched.

## 2026-07-21 - PESEL-rich factory and SVG integrity hardening

- Upgraded Country Suite Factory tools toward the Poland PESEL debug-depth bar: presets, recent validations, batch validation, result-first output, field/evidence token strips, calculation/parser debugger, repair suggestions, developer API preview, and raw JSON output.
- Removed inline `<style>` generation from country map/location SVG assets after full build integrity rejected inlined country SVG styles. Future country visuals must paint paths with SVG attributes or external bundle CSS, never embedded SVG style blocks.
- Added permanent rules to the premium country docs requiring every future country tool to target PESEL-level debug depth without faking checksum math for non-checksum domains.
- Full build and country-suite/premium audits passed after the fix.

## 2026-07-21 - Country snapshot and one-country build hardening

- Reworked `npm run build:country -- --country <slug>` so it recompiles shared assets and renders the English country hub from source before localizing that single country tree.
- Fixed the civic snapshot overlap regression by separating the outer snapshot section from the inner layout wrapper and tightening responsive card wrapping.
- Added generated flag-gradient variables to country heroes and civic snapshots so new countries inherit Brazil-strength flag color backgrounds instead of mostly white/default themes.
- Added premium audit blockers and project rules for missing flag-gradient variables, duplicated civic snapshot layout classes, and missing civic layout wrappers.
- Kept Valido Engine untouched.

## 2026-07-21 - Europe batch hub regression hardening

- Fixed the first 10-country Europe batch hub regressions: empty Technical Standards cards now have plug type, voltage, and frequency values; country search placeholders and chips now use local identifiers/payment rails instead of the generic IBAN/SWIFT/SEPA/VAT/INVOICE fallback; country outline/location visuals now use flag-color identity.
- Removed country breadcrumb official-language quick actions where government-language switching is not real, added a required civic snapshot before Developer Actions, fixed duplicate breadcrumb separator risk, and strengthened all country hero backgrounds toward the Brazil flag-gradient baseline.
- Added premium audit blockers for empty technical standards, generic country search placeholders, and object/string rendering leaks so future countries cannot pass with these regressions.
- Promoted the fixes into the Premium Country Contract, country-suite guardrails, and Europe batch spec as mandatory future-country rules.
- Kept Valido Engine untouched.

## 2026-07-21 - Europe premium 10-country stress batch (superseded by strict-Europe V2)

- Added a documented 10-country premium generation batch for Portugal (portugal), Austria (austria), Belgium (belgium), Ireland (ireland), Czechia (czechia), Sweden (sweden), Norway (norway), Denmark (denmark), Finland (finland), Romania (romania).
- Each country uses Country Suite Factory V1, 60 local workbenches, runtime localization for en/es/pt-BR/de/fr/pl/uk, mandatory field breakdown, same-country related links, and explicit official boundaries.
- Added `docs/product/EUROPE_BATCH_PREMIUM_SUITE_SPEC.md` so future AI sessions treat batch generation quality as a contract, not a one-off.
- Superseded by the strict-Europe V2 expansion, where the same generator contract covers all approved missing strict-Europe countries and keeps 60 as a density reference rather than a hard cap.

# 2026-07-21 - Premium country suite tool-count rule

- Documented that full-country suite tool count is quality-driven, not quota-driven.
- Treat 60 tools as reference density only: add more when local workflows justify it, ship fewer when fewer strong offline/browser-only tools exist, and never pad with weak tools.
- Added the rule to AI entrypoint, country-suite guardrails, and Country Suite Factory spec so future country prompts inherit it.

# 2026-07-21 - Spain Premium Country Suite V1

- Upgraded Spain from two standalone country tools into a full premium Country Suite Factory V1 suite.
- Preserved existing Spain ID and Spain IBAN routes while switching them to `validohub.spain-suite`.
- Added `assets/js/tools/spain-suite.js`, expanded Spain country metadata, 60 Spain-specific tool YAML pages, factory/build mappings, and audit coverage.
- Kept Valido Engine untouched.

# 2026-07-21 - Core Locale Matrix and Country Dev Build

Changed:

- Narrowed the production locale matrix to seven core locales: `en`, `es`, `pt-BR`, `de`, `fr`, `pl`, and `uk`.
- Added `npm run build:country -- --country <slug>` as a fast ValidoHub-only development refresh for a single generated country tree after a prior full publish.
- Added full-build pruning for stale generated locale directories when the locale matrix changes.
- Restricted the global language switcher to the configured seven production locales and added a build guard so it cannot drift from `site.yaml`.
- Documented that partial country builds are dev accelerators and full `npm run build` remains the release gate.

Reason:

The 24+ locale full-site generation path was too expensive for scaling toward 100-200 countries. Seven core production locales preserve global coverage while keeping generated size, build time, sitemap volume, and link validation manageable.

Impact:

- ValidoHub owns the locale matrix and partial country build tooling.
- Valido Engine remains untouched.
- Future locale expansion is demand-driven instead of default all-locale generation.

## 2026-07-20 - Italy Premium Country Suite V1

- Added Italy as a full premium country hub with 60 browser-only workbenches on Country Suite Factory V1.
- Added `assets/js/tools/italy-suite.js`, `countries/italy.yaml`, Italy visual assets, and `tools/italy-*.yaml` pages.
- Registered `validohub.italy-suite` in build/runtime mappings and country-suite audits, including mandatory field-breakdown coverage.
- Added `docs/product/ITALY_PREMIUM_SUITE_SPEC.md` and updated current-state/factory guardrails so future countries keep the Poland/Brazil/Germany quality bar.

## Germany Premium Country Suite V1

- Added Germany as the second Country Suite Factory V1 consumer with 60 active Germany-specific workbenches.
- Upgraded the existing German IBAN country route from the generic IBAN runtime into the full Germany suite while preserving the route.
- Added Germany hub metadata, available workbench catalog, official-boundary notes, ecosystem sections, field-breakdown coverage, runtime localization, docs, build mappings, and audits.
- Hardened the build pipeline so factory-based country algorithms skip generic utility workbench injection.

# AI Changelog

## 2026-07-21 - Premium Country Contract hardening gate

- Added `docs/product/PREMIUM_COUNTRY_CONTRACT.md` as the mandatory full-premium country contract.
- Added `npm run audit:country-premium` / `scripts/audit-country-premium.mjs` to generate readiness reports and block known country regressions before future country batches.
- Wired the contract into AI start docs, country-suite guardrails, and factory audit expectations.


## 2026-07-20 - All-Country Field Breakdown Requirement

- Expanded the field-breakdown requirement from full premium suites to every country-scoped tool in every country.
- Extended `scripts/audit-country-field-breakdown.mjs` to cover standalone Germany/Spain country tools in addition to Brazil, Poland, France, Netherlands, and Switzerland suites.
- Confirmed Germany and Spain IBAN tools use the country-aware generic IBAN breakdown, and Spain ID has its own identifier breakdown/debugger.
- Updated `docs/product/DEVELOPMENT_RULES.md`, `docs/product/COUNTRY_SUITE_GENERATION_GUARDRAILS.md`, and `docs/ai/START_HERE_AI.md` to say field breakdown is a primary debugging surface and mandatory for all country tools.
- Valido Engine remains untouched.

## 2026-07-20 - Future Country Fixed-Regression Rule

- Promoted all recently fixed country-suite regressions into `docs/product/DEVELOPMENT_RULES.md` as a mandatory future-country acceptance bar.
- Updated `docs/ai/START_HERE_AI.md` so future country work reads the rule before implementation.
- The rule now explicitly blocks generic or hybrid tool shells, oversized tool UI, red success states, missing field breakdowns, raw sample dropdown payloads, foreign fallback copy, cross-country related links, `[object Object]`, empty or icon-only lower hub cards, and page-level horizontal overflow.
- Valido Engine remains untouched.

## 2026-07-20 - Country Field Breakdown Audit

- Added `scripts/audit-country-field-breakdown.mjs` and wired it into `npm run audit:country-suite` so accepted country suites cannot lose a named field-breakdown panel.
- Upgraded `assets/js/tools/france-suite.js` to render a dedicated field breakdown from extracted French local fields, matching the premium country-suite contract.
- Strengthened country-suite guardrails and Factory V1 spec: every premium country tool, including broad text/data helpers, must expose field slices or detected-evidence groups instead of only generic result cards.
- Kept the change in ValidoHub runtime assets, scripts, and docs. Valido Engine remains untouched.

## 2026-07-20 - Switzerland Premium Country Suite V1

- Added Switzerland as a full premium available country hub with 58 active country-specific browser workbenches.
- Added `countries/switzerland.yaml`, `countries/data/switzerland.json`, Switzerland visual SVG assets, `tools/switzerland-*.yaml`, `assets/js/tools/switzerland-suite.js`, and `docs/product/SWITZERLAND_PREMIUM_SUITE_SPEC.md`.
- Used Country Suite Factory V1 from the start, making Switzerland the first full future-country factory consumer without migrating Brazil, Poland, France, or Netherlands.
- Added runtime localization for every supported ValidoHub locale across Switzerland workbench shell labels, states, sample labels, tool titles/summaries, diagnostics, quality notes, and advanced labels.
- Added ValidoHub build mappings so Switzerland pages load `country-suite-factory.js` before `switzerland-suite.js`, and extended same-country related-link pruning to Switzerland.
- Covered Swiss UID, MWST/VAT, AHV/AVS, EORI/customs, IBAN, SIC/BC, BIC/SWIFT, QR-bill, ESR, CHF, tax, payroll, company onboarding, Zefix readiness, FADP/GDPR privacy, address, canton, phone, vehicle, OCR, data-quality, API, JSON, regex, and form-audit workflows.
- Kept the implementation in ValidoHub assets, content, scripts, and docs. Valido Engine remains untouched.

## 2026-07-20 - Country Suite Factory V1

- Added `assets/js/tools/country-suite-factory.js` as an additive-only future-country runtime with compact Brazil-scale header, input, result, validation pipeline, dedicated field breakdown, quality notes, advanced analysis, copy, and download controls.
- Added config validation for suite identity, country metadata, theme colors, tool ids, names, codes, summaries, short-label samples, quality notes, official boundaries, duplicate ids, and raw payload sample labels.
- Added `docs/product/COUNTRY_SUITE_FACTORY_SPEC.md` and linked it from the Country Hub mandatory reading flow.
- Added `scripts/audit-country-suite-factory.mjs` and `npm run audit:country-suite` to protect the factory contract and assert that accepted Brazil, Poland, France, and Netherlands suites do not import or call the factory without an explicit migration task.
- Promoted all-locale runtime localization to the factory contract: future premium country suites must localize workbench controls, statuses, errors, result labels, field breakdowns, quality notes, samples, and advanced/developer labels across every supported ValidoHub locale.
- Kept the factory additive and unconnected to existing country suites. Valido Engine remains untouched.

## 2026-07-20 - Country Tool Shell Hardening Pass

- Tightened France suite runtime sizing to the compact Brazil workbench scale: smaller hero padding, mark, title, summary, chips, selector, input typography, result cards, pipeline, field cards, quality notes, and advanced payload panels.
- Tightened generic premium hero sizing in `assets/css/workbench.css` so global utility workbenches follow the same compact tool-shell rhythm instead of drifting toward landing-page hero proportions.
- Added `scripts/audit-country-tool-shell.mjs` to catch compact-shell regressions in France, Netherlands, generic premium hero sizing, and the country-suite guardrails before future countries are called complete.
- Updated current-state and country-suite guardrails so future country generation runs the shell audit and compares representative tools against Brazil CPF/CNPJ typography, spacing, textarea height, button sizing, result card density, and field-breakdown proportions.
- Kept the hardening pass inside ValidoHub assets, scripts, and docs. Valido Engine remains untouched.

## 2026-07-20 - Netherlands Premium Suite V2 Field Breakdown Pass

- Upgraded `assets/js/tools/netherlands-suite.js` from a broad premium V1 into a Brazil-style V2 workbench runtime with dedicated field breakdown panels on every Netherlands tool family.
- Reduced the Netherlands tool header from oversized landing-hero scale to compact Brazil workbench proportions so inputs and results remain close to the first viewport.
- Tightened Netherlands tool typography and spacing across header, sample selector, chips, input textarea, buttons, result cards, pipeline cards, field breakdown tiles, and advanced panels so the full workbench reads closer to the Brazil visual rhythm.
- Added domain-specific breakdown slices for BSN/RSIN eleven-test numbers, KVK, BTW/VAT, EORI, Dutch IBAN/BBAN, BIC, postcode, phone, EUR values, vehicle/RDW/VIN/plate evidence, audit-file snippets, and developer/data payloads.
- Kept the premium ordering contract intact: branded header, short sample selector labels, input controls, immediate result card, validation pipeline, dedicated field breakdown, quality notes, then expanded advanced analysis/developer payload.
- Updated Netherlands product memory so future country suites are not accepted as "premium" unless every offline-capable tool has a real breakdown strategy, not just generic result cards.
- Rebuilt ValidoHub and kept the implementation inside ValidoHub browser assets and docs. Valido Engine remains untouched.

## 2026-07-19 - Netherlands Premium Country Suite V1

- Added Netherlands as a full available country hub and first complete country generated after the country-suite anti-regression guardrails.
- Added 63 Netherlands-specific workbenches covering BSN, RSIN, KVK, BTW/VAT, EORI, DigiD boundaries, Dutch IBAN/BIC/SEPA/iDEAL, postcode/BAG/address/phone/locale, tax and e-invoicing readiness, audit-file snippets, AVG/GDPR/PII masking, data quality, vehicle/RDW/VIN/plates, PostNL tracking, EAN fixtures, and developer workflow audits.
- Added the shared `assets/js/tools/netherlands-suite.js` premium runtime with Netherlands-branded headers, short sample labels, immediate result cards after input controls, validation pipelines, field breakdowns, quality notes, local checks, copyable output, and developer payloads.
- Added Netherlands country registration, country visual SVG assets, and `docs/product/NETHERLANDS_PREMIUM_SUITE_SPEC.md` as future-memory for complete country generation.
- Updated country-suite docs and current-state memory so future full-country prompts read both France and Netherlands suite specs plus the anti-regression guardrails.
- Kept implementation in ValidoHub country data, tool YAML, assets, build post-processing, and docs. Valido Engine remains untouched.

## 2026-07-19 - Country Suite Anti-Regression Guardrails

- Added `docs/product/COUNTRY_SUITE_GENERATION_GUARDRAILS.md` as mandatory future memory for complete country generation.
- Recorded the France regressions that must not repeat: Poland fallback copy on France route groups, cross-country related-link spillover, long raw sample payloads inside native selectors, and long result/developer payload values stretching layouts.
- Added the guardrails doc to the Country Hub mandatory reading list in `docs/ai/START_HERE_AI.md`.
- Future country work must now audit same-country related links, foreign-term leakage, long-value layout safety, short sample labels, immediate result placement, all-locale coverage, generated-output exclusion, and Valido Engine cleanliness before calling a country complete.

## 2026-07-19 - France Premium Country Suite V1

- Added France as a full available country hub instead of a planned shell.
- Added 64 France-specific workbenches covering SIREN, SIRET, TVA, EORI, APE/NAF, French IBAN/RIB/BIC/SEPA, postal/address/phone/locale, tax and e-invoicing readiness, GDPR/PII masking, NIR boundaries, vehicle workflows, OCR repair, CSV/EUR/accent/slug utilities, JSON fixtures, regex packs, API payload audits, and form-field audits.
- Added the shared `assets/js/tools/france-suite.js` premium runtime with France-branded headers, samples, immediate result cards after input controls, validation pipelines, field breakdowns, quality notes, local checks, copyable output, and developer payloads.
- Added France country registration, country visual SVG assets, and `docs/product/FRANCE_PREMIUM_SUITE_SPEC.md` as future-memory for complete country generation.
- Kept the implementation in ValidoHub country data, tool YAML, assets, and docs. Valido Engine remains untouched.

## 2026-07-19 - Country-Specific IBAN Strategy And Workbenches

- Documented the permanent IBAN strategy: one global detector plus country-specific IBAN workbenches only when they add real local banking structure beyond SEO.
- Added Brazil, Germany, and Spain IBAN tool definitions using the country-aware generic finance runtime.
- Expanded the shared IBAN runtime with country detection, country-locked validation, BBAN field maps, local quality notes, wrong-country diagnostics, and deep country route guidance.
- Added Spain CCC check-digit replay, Germany BLZ/account slicing, and Brazil bank/branch/account/account-type slicing.
- Kept implementation in ValidoHub assets, tool YAML, and product docs. Valido Engine remains untouched.

## 2026-07-19 - Generic Tools Final Premium Contract And Completion Pass

- Strengthened `docs/product/GENERIC_WORKBENCH_GOLD_STANDARD.md` with the new generic instrument contract: future global tools must be born premium, not shipped as basic forms for later cleanup.
- Added success-first presets, intentional edge/error samples, richer premium result cards, domain-specific result previews, and quality-note cards across the shared Generic Utility Workbench Suite.
- Added hash digest recompute/compare flows for MD5, SHA-1, and SHA-256 when users provide both input and an expected digest.
- Upgraded URL Encoder/Decoder mode integrity so decoder pages offer encoded success presets first and Developer API previews use the active encode/decode endpoint.
- Kept all work in ValidoHub product assets and docs. Valido Engine remains untouched.

## 2026-07-18 - Generic Workbench Gold Standard Doctrine

- Added `docs/product/GENERIC_WORKBENCH_GOLD_STANDARD.md` as mandatory product memory for all current and future generic, non-country tools.
- Promoted Poland and Brazil premium country workbenches to the explicit visual and functional baseline for generic tools.
- Documented that generic tools must be competitor-aware, richly interactive, advanced-analysis-heavy, mode-correct, and deeper than the strongest public tools where the domain supports it.
- Added first-preset, success, invalid/error, advanced-analysis, copy/download/history, mobile, developer-snippet, documentation, and related-tool audits as the expected acceptance sweep before calling a generic tool premium.
- Linked the new standard from `docs/ai/START_HERE_AI.md`, `docs/product/CURRENT_STATE.md`, and `docs/product/WORKBENCH_REGISTRY.md`.

## 2026-07-18 - Generic Tools Premium Functionality Audit

- Audited the shared Generic Utility Workbench Suite against the Poland and Brazil premium workbench bar.
- Fixed generic-suite execution gaps: Slug Generator now uses its own slug workflow, hash tools call the intended MD5/SHA-1/SHA-256 algorithms, and sample chips populate the correct fields.
- Added UUID batch generation, IBAN masked display, regex capture-group reporting, and safer case-converter empty-token handling.
- Added ValidoHub build-time materialization for shared generic utility pages so Engine-generated documentation/form pages receive full premium workbench markup and helper script wiring without changing Valido Engine.
- Kept implementation in ValidoHub browser assets and documentation; Valido Engine remains untouched.

## 2026-07-18 - Generic Tools Premium UI Pass

- Added a shared premium identity shell for global generic tools, including tool marks, theme accents, domain summaries, capability chips, and browser-only privacy boundary.
- Tightened generic tool card typography so result and analysis panels match the Poland/Brazil premium standard instead of oversized bold blocks.
- Kept all changes in ValidoHub assets and documentation; Valido Engine remains untouched.

## 2026-07-17 - Brazil Premium Diagnostics Pass

- Upgraded the shared Brazil suite workbench renderer with premium pipeline progress, local result cards, tailored field breakdowns, quality notes, and advanced analysis.
- Documented Brazil as the diagnostics reference for broad country tool suites alongside Poland.
- Kept the implementation entirely in ValidoHub browser assets; Valido Engine remains untouched.

## Country Tool Header Standard

Changed:

- Added premium country-aware headers to Poland Premium, Expansion, and Baseline suite tools.
- Upgraded Brazil suite headers with brighter flag-color treatment and real sample chips.
- Documented country tool headers as the standard for future mature country suites.

Reason:

Country tool pages should immediately communicate local identity, presets, and useful entry points instead of opening with generic controls.

Impact:

- Future country tools should start with an identity-rich header using local colors, approved marks/acronyms, presets, samples, and local history when available.
- Valido Engine remains generic and untouched.


## All-Locale Localization Baseline

Changed:

- Promoted the language switcher list to the required localization matrix for country pages, tool pages, Workbenches, and visible UI.
- Expanded ValidoHub localized route generation beyond the earlier five-locale set.
- Added Poland as the first all-locale country-page acceptance test target.

Reason:

Future localization work must not silently ship partial language coverage when the product exposes more languages in the selector.

Impact:

- Any new localized country or tool must include every supported locale by default.
- Localized internal links must point at the selected locale route when that route exists.
- Valido Engine remains generic and untouched.


## Poland Localization Completion Sweep

- Tightened the Poland country-page localization pass for remaining rich country hub strings across supported locales.
- Added explicit localization coverage for intent tabs, catalog rows, identifier/specification cards, interactive sandbox copy, banking/payment prose, phone examples, graph labels, and short chips.
- Updated the country localization standard so future Poland-grade countries must sweep dense product surfaces, not just navigation and headings.

## Poland Four-Locale Deep Localization Parity

Changed:

- Brought the Poland Country Hub deep-section localization sweep to parity across Polish, German, Spanish, and Brazilian Portuguese.
- The developer checklist, knowledge graph, regional cross-links, highlights, developer notes, common mistakes, code examples, ecosystem, localization notes, and footer now share the same source-string coverage in every supported localized route.

Reason:

Any string localized in one supported language must be available in all supported localized languages.

Impact:

- Future country localization work should keep locale maps symmetrical for shared rich-section source strings.
- Valido Engine remains generic and untouched.

## Poland Localization Deep Section Sweep

Changed:

- Translated the remaining deep Poland Country Hub sections that appear below the primary catalog: developer checklist, knowledge graph, regional cross-links, key highlights, developer notes, common mistakes, code examples, country ecosystem, and localization notes.
- Updated the country localization standard and Poland gold standard so future countries must localize these lower-page product sections before being considered complete.

Reason:

Poland-grade localization must cover the full visible page, not only navigation, hero, cards, and top-level catalogs.

Impact:

- Future country localization work should include a lower-page screenshot/text sweep.
- Valido Engine remains generic and untouched.

## Poland Localization Pass V2

Changed:

- Completed the rich Poland Country Hub localization pass across Polish, German, Spanish, and Brazilian Portuguese for the remaining country facts, official sources, address, technical, locale, tags, badges, and copy controls.
- Added `docs/product/COUNTRY_LOCALIZATION_STANDARD.md` as the future-country localization checklist.
- Linked the localization standard from `docs/product/POLAND_COUNTRY_HUB_GOLD_STANDARD.md`.

Reason:

Localized country pages must feel fully native, not partially translated navigation around English rich sections.

Impact:

- Poland remains the mature Country Hub baseline for both structure and localization completeness.
- Future country work should localize every supported route before calling the country Poland-grade.
- Valido Engine remains generic and untouched.

## Poland Baseline Workbench Suite V1

Changed:

- Added 24 additional Poland country workbenches as the broad Poland baseline.
- Added `assets/js/tools/poland-baseline.js` and metadata-only `validohub.poland-baseline`.
- Added KSeF XML, JPK XML, split payment, PKD, PKWiU, BDO, CEIDG readiness, company onboarding, invoice data, receipts, transfer titles, payment QR, bank statements, postal addresses, TERYT hierarchy, municipality codes, MRZ/passport, passport number, driving licence, vehicle registration certificate, insurance policy, parcel tracking, PPE energy, and Polish data-quality pages.
- Linked all new tools from the Poland country hub.
- Added real browser-side SVG QR generation for the payment QR helper by reusing ValidoHub-owned QR infrastructure patterns.

Reason:

Poland needed a complete first country baseline beyond PESEL and the earlier premium/expansion suites.

Impact:

- Poland now has a broad suite of browser-only premium workbenches under `/en/poland/`.
- Engine remains untouched and generic.
- Official lookup, gateway submission, legal status, bank execution, and registry verification remain out of scope unless future product specs approve them.

This is an AI-oriented project history. It is not release notes.

Record changes that future AI assistants need to understand before continuing work.

## Phase 4: Engine And ValidoHub Asset Separation

Changed:

- Site-specific assets moved from Valido Engine into ValidoHub.
- Workbench Framework moved to `assets/js/workbench/`.
- Tool plugins moved to `assets/js/tools/`.
- Engine now copies site-owned assets into generated output.

Reason:

Engine must remain a generic static site generator. ValidoHub product behavior belongs in ValidoHub.

Impact:

- Future workbench behavior should be implemented in ValidoHub assets.
- Engine should not contain Base64, URL, JSON, or future workbench implementations.

## Base64 Workbench

Changed:

- Base64 became the reference-quality workbench.
- Implemented encode, decode, validate, Unicode support, Base64URL support, padding options, file support, diagnostics, analysis, hex preview, decode previews, copy, and smart downloads.

Reason:

ValidoHub needed a production-quality reference tool to define the quality bar.

Impact:

- Future workbenches should match or exceed the Base64 UX standard.

## URL Workbench

Changed:

- Implemented URL encode, decode, validate, auto-detection guidance, malformed percent diagnostics, stats, advanced analysis, samples, copy, and download.

Reason:

The URL tool proved the reusable Workbench Framework could support another production browser-only tool.

Impact:

- URL remains production-quality but has future room for parser, analyzer, and query-builder improvements.

## JSON Workbench V1

Changed:

- Implemented JSON formatter, validator, pretty print, minify, live mode, tree view, syntax highlighting, error line and column, copy, download, samples, file support, and statistics.

Reason:

JSON is a core developer workflow and needed a browser-only production workbench.

Impact:

- Established JSON-specific product spec and plugin.

## JSON Workbench V2

Changed:

- Added interactive tree explorer.
- Added JSONPath display and copy helpers.
- Added search with next and previous navigation.
- Added selected-node copy helpers.
- Added sort keys and remove empty actions.
- Improved syntax highlighting.
- Improved error token highlighting and repair suggestions.
- Added extended statistics and large JSON mode.

Reason:

JSON Workbench should feel comparable to professional developer tools such as DevUtils, JSON Editor Online, and VS Code JSON Viewer.

Impact:

- JSON is now a production-quality V2 workbench.
- Future JSON Diff, Merge, Schema, code generation, and conversion features remain out of scope until explicitly requested.

## JWT Workbench V1

Changed:

- Added browser-only JWT decoding, validation, inspection, and analysis.
- Added header, payload, signature, raw token, and decoded JSON sections.
- Added payload tree view, search, and JSONPath display.
- Added token health badges for structure, expiration, not-before, missing signature, weak algorithm, and unknown algorithm.
- Added human-readable expiration and validity timing.
- Added copy and download helpers for decoded sections.
- Added malformed-section error UX and safe sample tokens.

Reason:

JWT is a high-priority developer workflow and can be handled privately in the browser without backend execution.

Impact:

- JWT Workbench lives entirely in ValidoHub assets.
- Signature verification remains out of scope until key-handling UX is specified.

## PIX Workbench V1

Changed:

- Replaced the Brazil PIX preview with a production browser-only PIX Workbench.
- Added PIX key validation for CPF, CNPJ, email, Brazilian phone, and EVP UUID keys.
- Added CPF and CNPJ check digit validation.
- Added BR Code / EMV TLV parsing and explanation.
- Added static PIX payload generation with CRC16-CCITT-FALSE.
- Added local SVG QR generation, payload copy, QR SVG download, presets, local history, validation timeline, result cards, TLV table, CRC debugger, and developer JSON snapshot.

Reason:

Brazil PIX is a core Brazil developer workflow and should match the PESEL gold-standard tool quality instead of remaining a preview page.

Impact:

- PIX Workbench lives in ValidoHub assets.
- The workbench remains browser-only, offline, and privacy-first.
- No Banco Central lookup, payment initiation, dynamic PIX URL fetching, backend, REST API, database, or Java execution was added.

## Spain ID Workbench V1

Changed:

- Added a browser-only Spain DNI/NIE/NIF/CIF Workbench.
- Added DNI and NIE modulo-23 control-letter validation and explanation.
- Added legal-entity NIF / legacy CIF weighted control digit or letter validation.
- Added optional `ES` VAT-prefix syntax handling without VIES lookup.
- Added safe fictional fixture generation for DNI, NIE, and CIF/NIF patterns.
- Added presets, local history, validation timeline, result cards, token breakdown, checksum debugger, and developer JSON snapshot.

Reason:

Spain needed a first production-quality country workbench comparable to PESEL and PIX while preserving browser-only privacy and avoiding identity or tax-status claims.

Impact:

- Spain ID Workbench lives in ValidoHub assets.
- Valido Engine remains generic except for reusable asset-loading behavior when needed.
- No identity verification, Agencia Tributaria lookup, VIES lookup, backend, REST API, database, or Java execution was added.

## AI Operating System

Changed:

- Added `docs/ai/` as the AI-facing operating layer.
- Added entrypoint, development protocol, architecture guardrails, decision log, and AI changelog.

Reason:

Future AI assistants need enough repository-native context to continue ValidoHub without relying on prior conversations.

Impact:

- AI sessions must start with `docs/ai/START_HERE_AI.md`.
- Documentation updates are required after completed feature changes.


## Countries Platform

Changed:

- Added the Countries Architecture product note.
- Documented locale-first country hub and country workbench route rules.
- Added product-owned Countries navigation grouping in ValidoHub assets.
- Recorded Brazil and Poland as the current country hubs.

Reason:

ValidoHub needs a scalable country section for jurisdiction-specific developer tools without moving product logic into Valido Engine.

Impact:

- Country platform work belongs in ValidoHub unless a generic Engine capability is explicitly required.
- Country-specific validators still need their own product specs before implementation.
- Engine must not hardcode country, validator, or jurisdiction behavior.

## Country Hub Template V1

Changed:

- Added `docs/product/COUNTRY_HUB_TEMPLATE_SPEC.md`.
- Implemented Brazil as the reference Country Intelligence Hub.
- Added Brazil hero, Developer Cheat Sheet, local formats, payments and banking notes, official resource placeholders, available workbenches, planned workbenches, related global tools, developer notes, and hidden future ad-slot hooks.
- Kept the implementation in ValidoHub-owned assets.

Reason:

Country hubs should be useful developer intelligence pages, not only lists of generated tools.

Impact:

- Brazil is the reference model for future country hubs.
- PIX, CPF, CNPJ, CEP, phone, and banking validators are still not implemented.
- Any future move from product-side data to build-time SEO-rendered country data must be generic and must not introduce country-specific Engine logic.

## Country Hub Template V2

Changed:

- Expanded Brazil into the gold-standard Country Intelligence Hub.
- Added structured country metadata for stats, quick actions, cheat-sheet values, snippets, discovery cards, highlights, and future country references.
- Added copyable quick actions, copy buttons for important values, and copyable developer snippets.
- Added reusable status chips for Ready, Available, Coming soon, Planned, Experimental, and Deprecated.
- Added semantic discovery tags for future client-side filtering/search.
- Added richer internal discovery without broken links.

Reason:

Brazil should define the reusable quality bar for future country hubs without implementing country validators or moving product behavior into Engine.

Impact:

- Country Hub V2 remains entirely in ValidoHub assets and docs.
- PIX, CPF, CNPJ, CEP, phone, and banking validators remain unimplemented.
- Future country hubs should mostly require data additions, not custom rendering logic.

## Country Hub Template V3

Changed:

- Elevated Brazil into a premium Developer Country Intelligence Portal.
- Added country visual identity placeholders and official brand/logo placeholder support.
- Added Developer Country Profile, Localization Examples, Address Example, Phone Number Examples, Developer Integration Checklist, Validation Rules, Common Integration Mistakes, Banking Overview, JSON Examples, Localization Notes, and Country Ecosystem sections.
- Expanded Developer API Examples across Java, JavaScript, TypeScript, Python, Go, C#, Kotlin, PostgreSQL, text notes, and JSON payload examples.
- Expanded future country discovery placeholders without creating broken links.

Reason:

Brazil should be the reusable gold-standard template for future country hubs while keeping all product behavior in ValidoHub.

Impact:

- Country Hub V3 remains entirely in ValidoHub assets and docs.
- No PIX, CPF, CNPJ, CEP, phone, banking validator, new workbench, or new country was implemented.
- Future country hubs should reuse the same data-driven renderer and add country-specific data only.

## Country Hub Visual Identity V2

Changed:

- Replaced the Brazil country-shape placeholder with a real SVG Brazil outline.
- Replaced the dot-only location placeholder with a real miniature world map SVG highlighting Brazil.
- Added a reusable product-owned visual asset registry keyed by country id.
- Added asset-aware official logo rendering support while preserving safe text badges when logo usage rights are unclear.
- Updated Country Hub documentation with the real asset policy, SVG outline policy, world map component policy, and logo licensing considerations.

Reason:

Country hubs should feel like production-quality developer intelligence pages, not wireframes. Real geographic visuals make the Brazil reference hub clearer and set the right quality standard for future country hubs.

Impact:

- The change remains entirely in ValidoHub assets and docs.
- Valido Engine remains untouched.
- No PIX, CPF, CNPJ, CEP, phone, banking validator, new workbench, or new country was implemented.
- Future countries should add approved SVG assets and registry entries rather than custom rendering branches.

## Country Hub Design Standard

Changed:

- Added `docs/product/COUNTRY_HUB_DESIGN_GUIDE.md` as the canonical Country Hub design reference.
- Added `docs/ai/COUNTRY_HUB_AI_GUIDE.md` as the implementation guide for future AI sessions.
- Documented Brazil as the permanent golden reference for future country hubs.
- Documented mandatory Country Hub sections, card anatomy, badge system, icon policy, logo policy, global brand asset policy, monochrome brand preference, copywriting style, localization strategy, responsive expectations, accessibility expectations, and visual QA checklist.
- Updated current state, development rules, country architecture, country template spec, workbench registry, and AI startup guidance to reference the new guides.

Reason:

Future country hubs need to inherit one reusable product standard instead of drifting into separate layouts and inconsistent visual systems.

Impact:

- This is documentation and design-system standardization only.
- Valido Engine remains untouched.
- No new country-specific functionality, validator, workbench, country, route, YAML field, JavaScript behavior, CSS behavior, or generated output was added.

## Brand Asset System

Changed:

- Added `assets/js/brand-assets.js` as the shared browser-side Brand Asset System registry and renderer.
- Added `docs/product/BRAND_ASSET_SYSTEM.md` as the permanent architecture guide.
- Added `docs/product/BRAND_REGISTRY.md` as the source of truth for visual identity decisions.
- Registered PIX, Java, Python, Go, Kotlin, C#, .NET, Node.js, React, Next.js, TypeScript, JavaScript, Docker, Kubernetes, PostgreSQL, MySQL, MongoDB, Redis, JWT, Stripe, Visa, Mastercard, American Express, SWIFT, SEPA, IBAN, GitHub, OpenAPI, GraphQL, gov.br, Banco Central do Brasil, Receita Federal, and Correios.
- Updated the Brazil Country Hub to use `brandKey` values and the shared renderer for visible brand/standard references.
- Updated AI and product documentation to require Brand Registry checks before logo/icon decisions.

Reason:

ValidoHub needs one permanent visual identity system so recognizable brands, technologies, payment systems, databases, languages, protocols, and standards are rendered consistently instead of through ad-hoc icons.

Impact:

- The change remains entirely in ValidoHub assets and docs.
- Valido Engine remains untouched.
- No official logos were bundled in this step.
- No new country-specific validator, workbench, country, route, YAML field, backend behavior, or generated output was added.

## Countries Portal V1

Changed:

- Added the global Countries Portal product page at `/en/countries/`.
- Added `assets/js/portal-countries.js` for portal rendering, search, filters, country previews, continent grouping, and lightweight map interactions.
- Extended `assets/js/countries.js` with shared country portal metadata exports and an `All Countries` navigation entry.
- Added ValidoHub-owned post-publish route generation through `scripts/build-countries-portal.mjs`.
- Added `docs/product/COUNTRIES_PORTAL_SPEC.md`.
- Updated country architecture, current state, registry, and future planning documentation.

Reason:

ValidoHub needs a global discovery homepage for country intelligence while Valido Engine remains a generic static site generator.

Impact:

- The change remains entirely in ValidoHub assets, scripts, and docs.
- Valido Engine remains untouched.
- Available country hubs are discovered from generated links.
- Roadmap countries are visible without creating fake hubs.
- No PIX, CPF, CNPJ, CEP, PESEL, banking, payment, or country-specific validator was implemented.

## Countries Portal Visual Polish V1

Changed:

- Improved Countries Portal hero messaging and hierarchy.
- Added richer derived platform metrics.
- Elevated Brazil as the flagship reference country with a premium Reference Implementation badge.
- Added subtle country identity accent strips to country cards.
- Improved card hover, focus, lift, and shadow states.
- Improved filter control styling and selected states.
- Improved world map presentation, marker animation, active-country emphasis, and selected-country focus line.
- Refined continent section headers.
- Added reduced-motion handling for portal microinteractions.

Reason:

The Countries Portal needed to feel more like a premium SaaS product while preserving the existing ValidoHub-owned architecture.

Impact:

- Visual polish only.
- Valido Engine remains untouched.
- Routes, metadata ownership, country discovery, validators, and workbench functionality did not change.

## Spain Country Hub V1

Changed:

- Added Spain as a generated country hub at `/en/spain/`.
- Added `countries/spain.yaml`.
- Added Spain country outline and highlighted world map assets.
- Added Spain country metadata, local-format context, localization examples, address and phone examples, payments and banking context, official resource labels, planned workbenches, related global tools, developer snippets, JSON examples, localization notes, and ecosystem cards.
- Added reusable Brand Asset entries for Bizum, VIES, European Union, Gobierno de España, Agencia Tributaria, Seguridad Social, Banco de España, and Correos Spain.
- Updated the Countries Portal so Spain is an in-progress real hub instead of a roadmap-only country.
- Extended the existing post-publish route materializer so metadata-only country hubs receive generated locale-first shells.
- Added generic portal search support for country native names.
- Cleaned generic Country Hub renderer copy that still mentioned Brazil in shared section headings.
- Allowed related global tool cards to pass `brandKey` through the existing shared card renderer.

Reason:

Spain proves the Brazil Country Hub reference implementation can be reused for another country through metadata and assets rather than a Spain-specific page system.

Impact:

- The change remains entirely in ValidoHub assets, country config, and docs.
- Valido Engine remains untouched.
- No DNI, NIE, NIF, CIF, VAT, VIES, phone, postal-code, IBAN, Bizum, payment, banking, tax, vehicle, or identity validator was implemented.
- Future Spain-specific tools require dedicated product specs before implementation.

## Poland Premium Workbench Suite V1

Changed:

- Added ten browser-only Poland premium workbenches modeled after the PESEL reference page.
- Added NIP, REGON, Polish IBAN / NRB, tax microaccount input, postal code, phone number, license plate, KRS, Polish VAT syntax, and bank-code tools.
- Added shared `assets/js/tools/poland-suite.js` with presets, recent local inputs, validation timeline, result cards, field breakdown, debugger, developer JSON, copy helpers, safe fixture generation, and offline boundary explanations.
- Updated Poland Country Hub metadata so the new pages are available and linked as country workbenches.
- Added `docs/product/POLAND_PREMIUM_SUITE_SPEC.md`.

Reason:

Poland needed a premium country-specific suite around the PESEL gold standard so developers can validate and understand the most common Polish identifiers, payments, tax, banking, postal, phone, and vehicle formats without leaving the browser.

Impact:

- Poland Premium Workbench Suite lives entirely in ValidoHub assets, content, and metadata.
- Valido Engine remains untouched.
- No official registry lookup, VIES lookup, bank lookup, vehicle lookup, phone lookup, tax-status lookup, backend, REST API, database, or Java execution was added.

## Poland Premium Workbench Suite V2

Changed:

- Upgraded all ten Poland Premium Suite workbenches in the shared browser plugin.
- Added batch validation for every tool with mixed valid/invalid summaries and copyable batch JSON.
- Added masking/anonymization helpers for Polish identifiers, IBAN/NRB, phone numbers, license plates, VAT numbers, and bank-account inputs.
- Added copy helpers for masked value and generated test case in addition to normalized value and audit JSON.
- Added versioned audit JSON with fields, warnings, diagnostics, repair recommendations, proof scope, and boundary copy.
- Expanded offline bank-code, phone-prefix, mobile-prefix, and license-plate prefix dictionaries.
- Improved per-tool diagnostics, field tables, quality notes, and repair suggestions.
- Preserved browser-only execution and kept Valido Engine untouched.

Reason:

The first Poland suite pass established the pages. V2 moves all ten tools closer to the PESEL gold standard by making them more useful for real developer workflows, test fixtures, support logs, batch cleanup, and safe offline diagnostics.

Impact:

- The implementation remains entirely in ValidoHub assets and documentation.
- Valido Engine remains generic and untouched.
- No official registry lookup, VIES lookup, bank lookup, phone lookup, vehicle lookup, tax-status lookup, backend, REST API, database, or Java execution was added.

## Poland Expansion Workbench Suite V1

Changed:

- Added fifteen additional browser-only Poland workbenches as a second premium country pack.
- Added Polish ID card, BIC/SWIFT, TERYT, BLIK, PLN amount, VAT calculator, date/locale, address, VIN, EORI, PII masker, test-data generator, invoice number, grosz converter, and SEPA transfer helper pages.
- Added shared `assets/js/tools/poland-expansion.js` with presets, local history, batch validation, masking, result cards, field breakdowns, quality notes, audit JSON, and copy helpers.
- Added metadata-only `validohub.poland-expansion` and linked all new tools from the Poland country hub.
- Added `docs/product/POLAND_EXPANSION_SUITE_SPEC.md`.

Reason:

Poland had enough high-confidence browser-only developer workflows to expand beyond PESEL and the first ten premium validators without changing Valido Engine or adding official lookup behavior.

Impact:

- The implementation remains entirely in ValidoHub assets, content, config, and documentation.
- Valido Engine remains untouched.
- No official registry lookup, banking lookup, payment execution, customs lookup, vehicle lookup, tax-status lookup, backend, REST API, database, or Java execution was added.

## Localization Foundation Pass

Changed:

- Completed the initial ValidoHub localization foundation for `pl`, `de`, `es`, and `pt-BR`.
- Added a final build-time localization pass for route materialization, canonical URLs, hreflang alternates, same-locale links, common UI labels, and country-page shell text.
- Ensured rich Node-owned pages such as country hubs, the Countries Portal, and identifier reference pages are generated for localized routes instead of keeping Java fallback shells.
- Kept technical identifiers such as route slugs, locale codes, and IANA time zones stable.

Reason:

Users should be able to choose a supported language from any page and stay in that locale across the generated site without changing Valido Engine.

Impact:

- The change remains in ValidoHub scripts, assets, and documentation.
- Valido Engine remains untouched.
- Deep human editorial translations remain future content-pack work.

## Brazil Premium Suite baseline

- Added Brazil country-hub portfolio with 60 available local workbenches.
- Added `validohub.brazil-suite` metadata and browser-side suite plugin.
- Updated country renderer to support Brazil-specific identities, descriptions, workbench grouping, and quick-start routing without Valido Engine changes.

## Generic Utility Workbench Suite V1

Changed:

- Added `assets/js/tools/generic-suite.js` as a shared browser-only plugin for global non-country tools.
- Wired generic algorithm IDs through the ValidoHub build process without changing Valido Engine.
- Added premium shared workbench card styling for generic utility result cards, pipeline panels, quality notes, previews, and advanced analysis.
- Documented the baseline that available generic tools must provide real browser behavior, tool-specific descriptions, identity markers, compact card typography, and expanded advanced analysis.

Reason:

Global utility tools such as HTML, UUID, hash, regex, IBAN, case conversion, slug generation, and text diff needed to stop looking like weak documentation pages and meet the same product-quality direction as country tools.

Impact:

- ValidoHub owns the browser behavior and styling.
- Valido Engine remains generic and untouched.
- No backend, REST API, database, Java execution, or server-side runtime was added.
# 2026-07-21

- Added the Homepage Portal as a ValidoHub-owned command-center homepage rendered after publish, with working country/tool search, featured premium workbenches, country hub entry cards, platform metrics, and premium-contract messaging.
- Added `npm run build:portal` for fast homepage + Countries Portal development rebuilds after a prior full build, including targeted localization only for `/` and `/countries/`.
- Documented the homepage/countries portal ownership and rebuild workflow in `docs/product/HOMEPAGE_PORTAL_SPEC.md`, `docs/product/COUNTRIES_PORTAL_SPEC.md`, `docs/product/CURRENT_STATE.md`, and `docs/ai/START_HERE_AI.md` so future AI sessions do not reintroduce generic homepage shells or full-site rebuilds for portal-only iteration.

- Hardened Country Suite Factory sample semantics: invalid/short/bad-country/review sample buttons now carry executable review intent, invalid fixture values remain self-marking for batch/debug flows, and IBAN generators no longer fresh-generate over an active invalid fixture.
- Added shared country-suite copy feedback via a toast/status announcer for Copy result, Copy normalized, batch JSON copy, and repair-copy actions.
- Fixed factory field/evidence breakdown readability by keeping segment/card/token values high-contrast and wrapped inside their containers.
- Added audit/documentation guardrails so future countries cannot ship silent copy actions, valid-looking invalid samples, low-contrast breakdown text, or localization-fragile official-boundary cards.

- Upgraded Country Suite Factory V1 toward Poland PESEL-level tool richness for factory-based country suites: presets/history, batch validation, result-first analysis, visual field/evidence strips, calculation/parser debugger, repair suggestions, developer API preview, and raw JSON/audit output.
- Added permanent product rules requiring PESEL-like debug depth for every country-scoped tool, with domain-appropriate parser/evidence diagnostics for non-checksum tools.
- Refined the shared country-tool debug layer after visual QA: copy feedback must appear as a prominent toast anchored above the triggering button, success pipelines must render green only, field/evidence token strips must keep dark padded text, and the advanced layer should use one centered replay calculation instead of a generic repair-suggestions column.
- Replaced placeholder `Europe local time zone` values in new Europe country data with real IANA zones so every country hub can render the compact hero clock reliably.
- Added a mandatory factory tool-context block after each country-tool hero and before advanced diagnostics/input. The block explains the real workflow use case, local browser checks, and official/source-system boundary with tool-specific copy.
- Added `docs/ai/PREMIUM_COUNTRY_PLAYBOOK.md` as the AI handoff for future premium country work and switched copy feedback to an anchored popover above the clicked copy button.
# 2026-07-22 - Global tools portal and mega-premium expansion

- Added `/en/tools/` as a first-class global tools portal with search, featured workbenches, categories, and premium discovery cards.
- Added ten global mega-premium workbench configs: Phone E.164, Postal Code, SWIFT/BIC, MRZ Passport, CSV Locale Normalizer, EU VAT, ISO 20022 / SEPA, Secret + PII Redactor, Locale Test Data Generator, and Webhook Signature Verifier.
- Added `docs/product/TOOLS_PORTAL_SPEC.md` so future AI sessions know global tools must be registered, searchable, audited, invalid-state correct, and richer than a basic generated form.
- Extended global premium audit coverage so the Tools portal and new invalid/review samples are release gates.

# 2026-07-22 - Build Hardening V2

- Added `npm run build:tools` for scoped global-tool development builds that refresh assets, runtime scripts, `/en/tools/`, selected generated tool pages, and localized tools portal shells without invoking the full Java publisher.
- Added `npm run audit:tools -- --slugs ...` for selected global-tool premium checks and kept `build:full` / `audit:full` as explicit release-gate commands.
- Documented the new workflow in `docs/product/BUILD_HARDENING_V2.md`, `docs/product/CURRENT_STATE.md`, and `docs/ai/START_HERE_AI.md` so future sessions avoid full-site rebuilds for normal iteration.

# 2026-07-22 - Next Chat Handoff

- Added `docs/ai/NEXT_CHAT_HANDOFF.md` as compact project memory for fresh AI sessions.
- Linked the handoff from `START_HERE_AI.md` so future chats inherit the fixed-regression bar, build discipline, country/tool contracts, IBAN rules, and Europe modeling notes without relying on chat history.


## Global Premium Tools Batch V3

Added 15 global premium workbenches across Web/API Quality, Data & Integration, and Security / Ops Premium. The batch also hardens the shared generic-suite advanced-analysis layout so field cards, pipelines, quality notes, API previews, and JSON/code blocks stay contained without horizontal page overflow.


## Global Premium Tools Batch 4-7

Added 20 global premium workbenches across Cloud / DevOps, AI / Data / RAG, Backend / API, and Frontend / QA. These continue the browser-only premium standard with local static analyzers, tool-specific samples, validation pipelines, field breakdowns, quality notes, Developer API previews, and snapshot JSON.

## Guyana Country Visual Assets

- Replaced the Guyana country visual cards with premium raster assets for the outline and South America location map.
- Taught the country visual renderer to support raster assets through `<img>` while preserving inline SVG support.
- Updated scoped `build:country` to copy country visual PNG/WebP/JPG assets into `generated/validohub`, so local country rebuilds render the images without a full build.
- Removed visible headings/captions from country visual cards and recorded the Guyana raster-visual standard: image-only cards, tight framing, no decorative clutter, no LLM-invented outline blobs, and national-flag color gradients/accent glow for future country visuals.
- Added Argentina raster country visuals using the same compact overlay-label card standard and Argentina flag palette.
- Added Chile, Peru, and Colombia raster country visuals using the same compact overlay-label card standard and national flag palettes.

## Full Country Raster Visual Migration

- Replaced all existing country shape/location visual references with saved premium raster PNG assets under `assets/images/countries/`.
- Ensured 59/59 country data files now carry non-null PNG `visualAssets`, including planned Canada, Japan, Mexico, and United States entries that previously had no visuals.
- Reconfirmed the Guyana-style rule: compact overlay labels only, no large headings/captions, no generated SVG blobs, tight framing, national-flag color palettes, and no build-time image regeneration.

## North America Follow-Up Hardening

- Fixed the North America generator baseline so all 23 country suites produce 61 browser-only local workbenches instead of a shallow 22-tool set.
- Added 3-4 main-city civic snapshot data for North America countries and documented that a single-capital fallback is not acceptable for full-premium country suites.
- Rebuilt the English Countries portal after North America generation so `/en/countries/` includes the `North America` group with all 23 countries.
- Replaced the USA, Canada, and Mexico source raster assets with checked non-split-panel outline/location PNGs as the control set for the remaining North America visual cleanup.
- Fixed North America hero clocks by replacing placeholder `Local time zone varies by territory/region` values with real IANA zones for all 23 countries and hardening the renderer so invalid pseudo-zones do not produce dead clocks.

## 2026-07-24 Baseline Checkpoint

- Recorded the current North America/country-visual checkpoint in `docs/ai/NEXT_CHAT_HANDOFF.md`, including the accepted visual rules, the paused/unaccepted country image cleanup, the stale CSS bundle-link risk on older generated country pages, and the requirement to run country scoped builds sequentially.
- Preserved the current dirty worktree as a baseline commit by request so later visual/runtime regressions can be compared against this checkpoint.

## 2026-07-26 Approved Premium Site Baseline

- Recorded the user-approved premium ValidoHub revision as the current rollback baseline before future country-tool realism and atlas-detail work.
- Preserved the all-country source/data/image baseline, premium 3D raster country visuals, Africa/Oceania/USA visual pass, and Countries Portal interactive neutral world map with raster country-shape hover cards.
- Documented that the accepted Countries Portal map uses a calm neutral atlas, no fallback square/diamond/flag markers, restrained active geography outline/glow, and `assets/images/countries/*-outline.png` mini-card previews instead of flat SVG flag painting.
- Noted the remaining atlas limitation: current world-map geometry is simplified; true higher-detail country contours require a deliberate high-detail atlas asset pipeline.

## 2026-07-26 Gold Tool Specification Lab Standard

- Recorded the new non-negotiable Gold/local flagship tool expectation: a premium structured-format tool must be a best-in-world interactive specification laboratory, not a prettier validator.
- Added rules requiring every public/spec-supported local check to be implemented where applicable: validation, parsing, checksum/control/CRC replay, field anatomy, normalization, masking, safe fixture generation, batch/debug workflows, copy-ready JSON/API/payload output, and workflow-specific integration traps.
- Clarified that every tool should share the same recognizable ValidoHub foundation for consistency, but that foundation is not a functional limit: flagship tools may and should add custom ValidoHub JavaScript, CSS, parser logic, QR/payload generation, fixture generation, anatomy explorers, repair/lint actions, registry/source panels, downloads, mode-specific UX, and bespoke components of any complexity whenever the format requires it.
- Added the value-driven country tool inventory rule: one country may have 200 visible tools and another may have 2, but only genuinely useful public/spec-backed developer workflows should be promoted; generated filler, fake validators, and weak placeholders should be downgraded or hidden.
- Added the country search term rule: placeholders, chips, and suggestions must use only real, commonly used local market terms for that country, never invented acronyms or generated SEO filler.
- Clarified that PESEL is the identifier reference, Brazil Pix is the payment/QR/payload reference, and IBAN is the banking/spec-registry reference.
- Reaffirmed that local validation must never pretend to prove official existence, ownership, registry status, or payment settlement; those boundaries must be visible in the tool.
- Added the one-stop Gold tool rule: flagship tools must let developers validate, generate, parse, debug, learn, copy/export, and reach official source links without needing weaker competitor tools for the same workflow.
- Added the internal AI log requirement for Gold/local flagship tools: `docs/ai/gold-tools/` logs must capture sources, competitor notes, capabilities, boundaries, samples, QA, browser observations, and open risks, and a Gold tool is not done when that log is missing or stale.
- Corrected Brazil Pix Gold presentation after user feedback: the duplicate shared overlay stays removed, but Pix keeps visible Gold identity inside the main workbench with an input-driven connected evidence strip.
- Locked the accepted Pix polish baseline into product docs: bespoke Gold tools must use one connected lab, keep full-width analysis tables, contain long payloads locally, avoid page-level horizontal overflow, place Developer Snapshot after human-readable diagnostics, and render Integration traps as compact workflow-specific guidance rather than oversized generic copy.
- Promoted Mexico CURP as the next bespoke Gold tool after Pix: added a connected browser lab with CURP normalization, anatomy parsing, date/state semantics, check-digit replay, safe fixture generator, sample batch replay, source/boundary copy, and Developer Snapshot JSON.
- Added `docs/product/MEXICO_CURP_WORKBENCH_SPEC.md` and `docs/ai/gold-tools/MEXICO_CURP_GOLD_LOG.md`; updated the Gold index and Workbench Registry so future sessions treat CURP as an intentional Pix-derived Gold implementation rather than a generic overlay.

## 2026-07-27 Spain ID Bespoke Gold Lab

- Promoted Spain DNI/NIE/NIF/CIF from legacy rich / shared-overlay candidate into a bespoke Gold V1 workbench.
- Added connected Spanish ID evidence: sample chips, DNI/NIE modulo-23 replay, NIE prefix mapping, legal-entity NIF / legacy CIF weighted control replay, entity-family context, anatomy table, batch replay, official-source/boundary panel, workflow-specific Integration traps, and Developer Snapshot JSON copy.
- Marked the Spain ID lab with `data-gold-lab` so the shared Gold overlay does not duplicate the workbench.
- Documented the Pix/CURP-derived layout fixes for future Gold tools: no hover layout jumps, balanced generator grids, date pickers for date fixtures, contained focus rings, spaced action rows, local overflow containment, and copy JSON near Developer Snapshot.
- Hardened scoped/full build behavior for suite-hosted bespoke Gold routes: Spain ID is materialized by the Spain suite, so builders now remove the shared overlay and inject `spain-id.js` on the specific Spain ID route.
- Added `docs/ai/gold-tools/SPAIN_ID_GOLD_LOG.md` and updated `SPAIN_ID_WORKBENCH_SPEC.md`, `WORKBENCH_REGISTRY.md`, Gold index, and the AI handoff.

## 2026-07-27 Gold Tools Round 2 Flagship Expansion

- Expanded the shared `gold-tools-lab.js` profile matrix to 110 route-bound flagship local-market profiles.
- Added real browser-side replay/anatomy handlers for South Africa ID, Turkey TCKN, Israel Teudat Zehut, Portugal NIF, Croatia OIB, Czech ICO, Greece AFM, Ecuador cedula, Uruguay cedula, and Kenya KRA PIN.
- Split PAN, GSTIN, Aadhaar, payment aliases, date-coded national IDs, and structured tax/registry identifiers into family-specific evidence/boundary handlers so the overlay is no longer just generic normalized text.
- Synchronized scoped and full build wiring for the expanded flagship country set in `scripts/build-country-dev.mjs` and `scripts/build-all.mjs`.
- Verified all 110 valid fixtures pass, all 110 invalid fixtures review/fail, all profile slugs resolve to generated English routes, and all non-bespoke profiles have `gold-tools-lab.js` in generated HTML after scoped sequential country builds with `--locales en`.
- Added `docs/ai/gold-tools/ROUND2_FLAGSHIP_EXPANSION_LOG.md` as the AI-facing implementation trace.
- Tightened country hub search hints so placeholders and chips are route-bound: generated/local metadata terms are shown only when the country has a matching tool route or a documented alias to one. Rebuilt Greece with English-only scoped country build to verify the search UI now reflects actual available workbenches instead of stale filler hints.

## 2026-07-27 Brazil CPF/CNPJ Bespoke Gold Lab

- Promoted Brazil CPF and CNPJ from shared Gold overlay profiles into a dedicated browser-only Gold V1 runtime at `assets/js/tools/brazil-tax-id.js`.
- Added connected CPF/CNPJ labs with normalization, display/storage forms, masking, repeated-placeholder rejection, safe fictional fixture generation, two modulo-11 check-digit replays, field anatomy, replay table, Receita source/boundary panel, Integration traps, and Developer Snapshot JSON copy.
- Hardened scoped/full build post-processing so `/en/brazil/brazil-cpf-validator/` and `/en/brazil/brazil-cnpj-validator/` remove `gold-tools-lab.js`, load `brazil-tax-id.js`, and expose `validohub.brazil-tax-id` as their static route algorithm.
- Added `docs/product/BRAZIL_TAX_ID_WORKBENCH_SPEC.md` and `docs/ai/gold-tools/BRAZIL_TAX_ID_GOLD_LOG.md`; updated the Gold index, Workbench Registry, and Current State.

## 2026-07-27 Country Tool MVP Visibility + Traps Typography

- Added source-level country route visibility tiers in `scripts/render-country-sections.mjs`: primary local tools, secondary local workflows, and collapsed reference workflows.
- Country hubs now show `Primary + secondary` first, render tier pills per tool row, and move readiness/checklist/handoff/policy-style routes into a closed `More reference workflows` group while keeping URLs searchable and stable.
- Reduced oversized `Integration traps` typography across Country Suite Factory, generic-suite CSS, shared Gold lab, Pix, Brazil CPF/CNPJ, Spain ID legacy styles, and Mexico CURP to compact supporting copy.
- Verified with scoped English builds for Canada, Brazil, Spain, Mexico, and Poland plus headless browser smoke on Poland catalog/generator, Brazil CPF/Pix, Spain ID, and Mexico CURP. No full build was run.
- Follow-up polish fixed the tier pills so Primary/Secondary/Reference labels use a stable right-side grid rail instead of floating in the middle of rows. All 194 English country hubs were targeted-rebuilt through `compileCountriesPortal`, and a mass HTML check found 0 catalog tier mismatches.
- Fixed related-only South America tool pages caused by scoped builds omitting `country-suite-factory.js` for Chile, Colombia, Ecuador, Paraguay, Peru, and Uruguay. Added the full South America factory set to `scripts/build-country-dev.mjs`, rebuilt those six countries with `--locales en`, and verified 11,509 generated `csf-static-host` tool pages have the factory runtime.

## 2026-07-29 Reference Guides Layer

- Added `scripts/build-reference-guides.mjs` and `npm run build:guides` for a Node-owned `/guides/` reference layer.
- Generated scope is intentionally value-driven: `/guides/` plus 45 high-signal guide pages across global developer tools, identifiers, tax IDs, banking, payments, privacy/security, and fixture workflows.
- Added compact guide styling in `assets/css/validohub.css`, guide phrase coverage in `scripts/localization-pass.mjs`, localized route generation through the final localization pass, and scoped sitemap refresh for all configured production locales.
- Product constraint: guides support live workbenches and SEO. They must not replace tool-first pages or become a thin article page for every generated country route.

## 2026-08-02 SEO Launch Indexability Mode

- Added release-pipeline SEO indexability control through `VALIDOHUB_SEO_LOCALES`, defaulting to `en`.
- Kept non-English locale routes accessible for users while adding `noindex, follow` robots meta to non-indexable locale pages.
- Restricted generated sitemap shards and hreflang alternates to indexable locales plus `x-default`, so the launch sitemap now exposes only English URLs until localization quality is ready.
- Updated `scripts/audit-seo-production.mjs` so the SEO gate verifies English pages remain indexable, non-English pages remain noindex, and sitemap URLs do not include non-indexable locales.
- Ran `npm run build:release:node -- --archive --progress-seconds 30`; build integrity passed for `86,632` routes, sitemap wrote `12,376` English indexable routes, and archive `generated/releases/validohub-20260802-023203.tar.gz` was created.
- Deployed release `20260802-023203` to the VPS IP. Current symlink points to `/srv/validohub/releases/20260802-023203`; rollback target is `/srv/validohub/releases/20260802-021127`.
- Connected GoDaddy DNS to the VPS: `validohub.com A 137.74.173.107` and `www CNAME validohub.com`.
- Switched Caddy from IP-only preview to live domain hosting. `https://validohub.com/en/` returns `200`, `http://validohub.com/` redirects to HTTPS, `https://www.validohub.com/en/` redirects to `https://validohub.com/en/`, and `http://137.74.173.107/en/` remains available as an IP preview.

## 2026-08-02 Production Localization Hardening Release

- Added the project rule that any new user-visible UI, navigation, generated runtime copy, SEO text, and structured data must be localized by default for `en`, `es`, `pt-BR`, `de`, `fr`, `pl`, and `uk`.
- Fixed broken localization artifacts such as `Gültigate`, `Valideeeate`, English mega-menu labels, untranslated country names, `Company Suffix`, generic `Validation, generation, parsing...` SEO text, JSON-LD role words, `Home` aria/breadcrumb labels, and hybrid French `National Identifiants`.
- `assets/js/bundle.js` now localizes runtime mega navigation labels and country names instead of relying on English data after page load.
- `scripts/localization-pass.mjs` now applies safer literal replacements, localized country/tool title cleanup, category shell replacements, structured-data/meta description replacements, and final artifact repairs.
- `scripts/audit-localization-production.mjs` now hard-blocks the newly found production artifacts, including generic SEO descriptions and national-identifier category shell leftovers.
- Added `scripts/normalize-generated-seo-indexability.mjs` for standalone post-localization repair of `noindex, follow` robots meta and indexable-only hreflang links when a full build is not rerun.
- Verification passed after repair/repack: `npm run audit:seo`, `npm run audit:performance`, `npm run audit:generated-premium`, targeted `npm run audit:localization -- --fail-on-soft`, broad generated greps for stale localization markers, and Playwright language-select smoke.
- Deployed final release `20260802-154058` to VPS. Current symlink points to `/srv/validohub/releases/20260802-154058`. Archive: `generated/releases/validohub-20260802-154058.tar.gz`, `950,081,901` bytes, sha256 `22546de03a57628536a4d988e2f7eec5133fdf51764f91a4bc385bb86739cee0`.

## 2026-08-02 Country Image Optimization Release

- Added `scripts/optimize-country-images.mjs` and `npm run optimize:country-images` to convert country `*-outline` and `*-location` PNGs into 720px JPEGs and prune generated PNG copies.
- Wired the optimizer into `scripts/build-all.mjs` before generated JS/CSS minification, so future release builds do not repackage the duplicated 860M country PNG set.
- Rewrote country visual references from `.png` to `.jpg` in source country data, generated scripts, generated HTML/JS/SVG, and refreshed the main runtime bundle hash to `/assets/js/bundle.f941ff.js`.
- Moved Ukrainian before Polish in the language selector and production locale ordering.
- Verification passed: `npm run audit:performance`, `npm run audit:seo`, `npm run audit:generated-premium`, generated PNG-reference greps, `node --check` on changed JS/MJS, and live HTTPS checks for bundle order/image content sizes.
- Deployed release `20260802-160123` to VPS. Current symlink points to `/srv/validohub/releases/20260802-160123`. Archive: `generated/releases/validohub-20260802-160123.tar.gz`, `97,763,266` bytes, sha256 `44078cbc90a0440e184567ce10242d3094ed518339bc1514407aeb96850d1708`.
