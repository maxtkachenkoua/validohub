# Build Hardening V2

Build Hardening V2 exists to keep ValidoHub development fast as the generated site grows. The full release build is no longer the default feedback loop for country, portal, or global-tool edits.

## Default Development Loop

Use scoped builds first:

- `npm run build:portal` updates the home page, tools portal, countries portal, shared assets, and localized portal shells.
- `npm run build:country -- --country <slug> [--locales en,pl]` updates one country hub and its already-generated local tool pages.
- `npm run build:tools -- --slugs <slug-a>,<slug-b> [--locales en]` updates shared assets, runtime scripts, /en/tools/, and selected already-generated global tool pages.

All scoped builds that recompile shared hashed CSS/JS assets must also refresh generated HTML bundle links across the existing generated preview tree. This prevents pages outside the selected country/tool scope from pointing at a deleted old bundle hash and appearing unstyled in local preview.

Use scoped audits next:

- `npm run audit:country-premium -- --country <slug>` for a country contract check.
- `npm run audit:tools -- --base http://127.0.0.1:<port> --slugs <slug-a>,<slug-b>` for selected global tools.

## Release Gates

Use full commands only at checkpoints:

- `npm run build:full` is the full Java + Node publisher and site integrity gate. It may take a long time because it validates the full generated site.
- `npm run build:release:node` is the Node-only release gate. It skips the Java publisher, reuses existing Java-owned generated routes, and still runs ValidoHub post-processing, localization, sitemap writing, and generated output validation.
- `npm run build:release:archive` is the full release gate plus a final deploy archive phase. It writes `generated/releases/validohub-<release-id>.tar.gz` and a `.sha256` checksum after generated-output validation and `build-report.json`.
- `npm run package:site` packages the current `generated/validohub` tree without rebuilding. Use it after a previously verified full build when you only need a deploy artifact.
- `npm run analytics:dry-run` checks how many generated HTML files would receive the configured GA4 tag without writing files.
- `npm run analytics:apply` injects the configured GA4 tag into generated HTML using an idempotent marker. Release builds run this automatically after sitemap writing / IndexNow key materialization and before validation.
- `npm run indexnow:prepare` writes the public IndexNow key file into `generated/validohub`; release builds run this automatically after sitemap writing.
- `npm run indexnow:dry-run` reads the generated sitemap and prints the IndexNow batch plan without network submission.
- `npm run indexnow:submit` reads the generated sitemap and submits indexable URLs to IndexNow in batches of at most 10,000. The payload includes `keyLocation`; keep it because the official endpoint rejected the first launch attempt without it.
- `npm run minify:generated-assets` minifies generated `.js` and `.css` files in place with `esbuild`. The full release pipeline runs this automatically before validation and before optional archive packaging, so deploy archives contain already-minified browser assets.
- `npm run loadtest:vps -- --duration-seconds 60 --rate 100` runs a controlled static-site load check against the current VPS/IP preview.
- `npm run audit:full` is the broad country-suite/global audit gate.
- `npm run build:release:incremental` is the resumable release-prep gate. It chunks portal, global tool, identifier, and country static builds, stores source fingerprints, skips only completed chunks whose inputs have not changed, and protects each step with progress heartbeats, a per-step timeout, and a no-output watchdog.
- `npm run build:release:plan` prints the pending incremental release-prep steps without running them. Use it before any long country sweep, then run small windows with `--limit`, restart with `--resume-from <step-name-or-id>`, and watch progress from another terminal with `npm run build:release:status`.

The legacy `npm run build` still points to the full build for compatibility, but AI agents must not use it for routine UI/runtime/content iteration unless the user explicitly asks for a full release build or new YAML routes must be published.

If the monolithic release build cannot finish after the incremental release-prep pass is clean, do not keep rerunning it blindly. The full build prints per-phase timings and child-process progress; use the last printed phase to identify the bottleneck, keep incremental chunks and scoped audits for product QA, then profile the Java publisher as a separate performance problem.

Use `npm run build:release:node` only after the route already exists in generated output. It is not a replacement for the first Java materialization of brand-new YAML routes.

The Node release gate includes a generated premium-shell repair phase after localization, chrome normalization, related-link pruning, and workbench script normalization. That phase runs `scripts/repair-generic-country-tools-premium.mjs` so stale Java/global tool workbench headings, fake API preview blocks, intermediate `vh-generic-country-*` shells, and country-suite fallback forms are removed before sitemap writing and generated-output validation. The repair script prints progress while scanning generated HTML so it cannot fail as a long silent step.

After premium-shell repair, the release pipeline runs `scripts/optimize-country-images.mjs --generated --prune-generated-png`, then `scripts/minify-generated-assets.mjs`. The country-image optimizer converts generated country outline/location PNGs to 720px JPEGs and removes the duplicated generated PNG copies before archive packaging. The asset minifier then minifies all generated CSS/JS files before search-index compaction, sitemap writing, validation, and archive packaging. The primary hashed CSS/JS bundles are fingerprinted from minified content.

After final localization and generated chrome normalization, the release pipeline also normalizes generated bundle asset links across every route. This prevents localized fallback pages from carrying stale `/assets/css/bundle.*.css` or `/assets/js/bundle.*.js` references into validation or deploy archives.

The release pipeline now has an SEO indexability mode controlled by `VALIDOHUB_SEO_LOCALES` and defaults to `en`. Generated non-indexable locale pages remain accessible, but receive `<meta name="robots" content="noindex, follow">`; sitemap shards are written only for indexable locales; hreflang alternates are limited to indexable locales plus `x-default`. Do not add non-English locales back to the index until their localization quality is ready for search traffic.

After sitemap writing, the release pipeline materializes the IndexNow verification key from `config/indexnow-key.txt` into the generated site root as `<key>.txt`. This keeps archive deploys ready for `npm run indexnow:submit` after the new release is live.

After IndexNow key materialization, the release pipeline applies the Google Analytics tag from `config/google-analytics-measurement-id.txt` to every generated HTML page. The snippet is wrapped in `validohub-google-analytics` markers so repeated runs update in place instead of duplicating scripts.

## Important Limit

`build:tools` is a dev accelerator, not a Java publisher. If a brand-new YAML global tool has never been generated, run one full/release build first. After that, `build:tools -- --slugs ...` is enough for CSS, JS, runtime, portal, and generated-page asset refreshes.

## Target Timings

A small scoped tools loop should be seconds, not tens of minutes. Example smoke from Build Hardening V2:

- `npm run build:tools -- --slugs webhook-signature-verifier,phone-e164-workbench --locales en`: about 3 seconds.
- `npm run audit:tools -- --base http://127.0.0.1:8099 --slugs webhook-signature-verifier,phone-e164-workbench`: about 5 seconds.

Observed full release gate after the 2026-08-01 generated premium-shell repair integration and repair fast path: `npm run build:release -- --progress-seconds 30` passed in `448524 ms` (about 7m29s) for 86,632 routes. The Java publisher phase was about 4m02s, generated premium-shell repair was about 25s, and generated-output integrity validation was about 22s.

Observed full release gate after the Valido Engine HTML exporter optimization: `npm run build:release -- --progress-seconds 30` passed in `230584 ms` (about 3m51s). The Java publisher classpath preparation was about 1s, the Java publisher phase was about 15s, generated premium-shell repair was about 26s, and generated-output integrity validation was about 22s. Engine now prints `[engine:html] exported ...` progress while writing static HTML routes.

Observed Node-only release gate after the same optimization: `npm run build:release:node -- --progress-seconds 30` passed in `169754 ms` (about 2m50s). On an already-clean generated tree, the premium-shell repair phase scanned 86,632 HTML pages in about 5s with 0 rewrites.

Observed standalone generated asset minification on the verified generated tree: `npm run minify:generated-assets` processed 233 JS/CSS files in about 3s, reducing raw JS/CSS from 36,383,874 bytes to 26,710,364 bytes (about 26.6% saved). Current generated asset directory sizes after the pass: JS about `25M`, CSS about `1.5M`. The total `assets/` directory remains dominated by image/media files.

Long child-process phases print progress snapshots by default: child `pid/etime/cpu/mem/state`, and Maven/Engine publish also prints generated output size. Use `--no-progress-snapshot` or `VALIDOHUB_BUILD_PROGRESS_SNAPSHOT=0` when a quiet build log is preferred.

Default deploy artifact format is `tar.gz` for Ubuntu compatibility. Latest local packaging smoke from the 3m51s full build: `npm run package:site` produced `generated/releases/validohub-20260802-011524.tar.gz` in 79s, size 955,743,196 bytes, with sha256 `ee518717ebb1ef836413f1493cf2806f7f37a55d2b138af0ca1c2a6552935f8c`. `npm run package:site -- --format tar.zst` is supported when both local and VPS environments have `zstd` available.

Observed final release archive gate after generated asset minification and bundle-link normalization: `npm run build:release:archive -- --progress-seconds 30` passed in `233250 ms` (about 3m53s) before archive packaging, then created `generated/releases/validohub-20260802-021127.tar.gz` in 36s. Archive size was 951,057,481 bytes and sha256 was `7bed77aed7bb8f47a475dd0c6ce43a297008213d49ed4816a58fc40af093cd1d`.

Observed VPS load smoke after deploying `20260802-021127`: `npm run loadtest:vps -- --duration-seconds 60 --rate 100 --max-inflight 1000 --timeout-ms 10000` completed 6,000/6,000 requests with 0 failures, 99.9 req/s, p50 78.3ms, p95 207.6ms, p99 238.5ms, max 330.3ms.

Observed Node-only release archive gate after SEO launch-mode localization noindexing: `npm run build:release:node -- --archive --progress-seconds 30` passed in `267644 ms` (about 4m28s) before archive packaging. It wrote a sitemap with `12,376` English indexable routes across `1` shard, normalized SEO indexability on `86,632` pages in about `10s`, and created `generated/releases/validohub-20260802-023203.tar.gz` in `39s`. Archive size was `946,847,590` bytes and sha256 was `0cb43ebec8f84e421e5359c96b9809fa5dfe0d31680578349ea9f6c9380079de`.

Observed standalone country-image optimization release after launch: `npm run optimize:country-images -- --source --generated --prune-generated-png` converted 388 source PNGs and 388 generated PNGs. Generated country images dropped from `856.3M` PNGs to `36.2M` JPEGs; generated assets dropped to about `67M`. `npm run package:site` then created `generated/releases/validohub-20260802-160123.tar.gz` in `20s`; archive size was `97,763,266` bytes and sha256 was `44078cbc90a0440e184567ce10242d3094ed518339bc1514407aeb96850d1708`.

Observed fresh Node-only release archive gate after wiring country-image optimization into the normal pipeline: `npm run build:release:node -- --archive --progress-seconds 30` passed with `Build Duration: 1281484 ms` (about 21m21s), then created `generated/releases/validohub-20260802-164620.tar.gz` in `39s`. Archive size was `97,860,193` bytes and sha256 was `7fc3cc9883c064a52a6d34df8b0640ca6fbc1667aa21a22def8a294e5e126bd9`. The long phase was final localization (`17m02s`), and slow-route diagnostics identified localized country hub pages as the heavy batches.

Observed IndexNow launch packaging after the verified fresh generated tree: `npm run package:site` created `generated/releases/validohub-20260802-171627.tar.gz` in 24s. Archive size was `97,859,984` bytes and sha256 was `2a8bdb73006f941688495cbd589a228c85c8433dece341aea321d479618ad47c`. Deploy smoke passed on `https://validohub.com/`, `/en/`, and `/en/tools/`; `npm run indexnow:submit` submitted `12,376` English indexable URLs in 2 batches with `HTTP 200`.

Observed Google Analytics launch packaging: `npm run analytics:apply` updated `86,632` generated HTML files with GA4 Measurement ID `G-QH4SZME9KW`; a second `npm run analytics:dry-run` showed `0` changes. `npm run package:site` created `generated/releases/validohub-20260802-173659.tar.gz` in 21s. Archive size was `98,419,432` bytes and sha256 was `94e7b628ce3c670cba0969a06a52043644d098378f5ef150f29fc86bbbc52cc9`. Deploy smoke passed and live `/en/` contains the GA4 snippet.

## AI Rule

Before running a full build, ask: can this be validated with `build:portal`, `build:country`, or `build:tools` plus a scoped audit? If yes, do the scoped path. Full build is a release gate, not a normal edit loop.

If a scoped asset rebuild changes `/assets/css/bundle.*.css` or `/assets/js/bundle.*.js`, verify that no generated HTML still references a missing bundle before browser sign-off.
