# ValidoHub Build Workflow

Full builds are release gates, not the default development loop.

## Fast development loop

Use this first after UI, search, localization, or tool-page edits:

```bash
npm run build:changed -- --dry-run --locales en
npm run build:changed -- --locales en
```

`build:changed` reads the current git diff and chooses only the affected portal, global tool pages, country hub pages, country tool pages, or identifier pages. It never runs the Java publisher and never starts the full build.

Dev builds keep old fingerprinted CSS/JS bundles and refresh asset links only on the routes they touch. Do not delete old `assets/css/bundle.*.css` or `assets/js/bundle.*.js` files during dev; they are compatibility shims for generated pages that were not rebuilt.

## Target one country

```bash
npm run build:country -- --country brazil --locales en,fr,uk
```

Use this when a country hub, country search, country visuals, or country-local tool shell changed.

## Target global tools

```bash
npm run build:tools -- --slugs iban-generator,uuid-generator --locales en
```

Use this when a global tool YAML, global tool runtime, or tool-specific interaction changed.

## Target portals

```bash
npm run build:portal
```

Use this for `/`, `/tools/`, `/countries/`, nav, mega-menu, hero, or portal search changes.

## Target identifiers

```bash
npm run build:identifiers
```

Use this for identifier article templates and identifier landing pages.

## Visual premium audit

Use this after tool-shell, workbench, CSS, runtime, or generated preview repairs when you want a browser-level signal without a full build:

```bash
npm run audit:visual-premium
```

The audit starts a local static server for `generated/validohub`, samples premium country/global tool routes, and checks for JavaScript errors, desktop/mobile horizontal overflow, old/fake markers, missing workbench shells, missing country related footers, too-few top workbench samples, missing boundary text, missing developer output, and oversized textareas.

Useful scoped runs:

```bash
npm run audit:visual-premium -- --limit 24 --mobile-limit 8
npm run audit:visual-premium -- --limit 500 --mobile-limit 80
npm run audit:visual-premium -- --limit 250 --shards 4 --shard-index 0
```

For multi-machine or multi-terminal QA, run shard indexes `0..N-1`. This is a visual/DOM sampling gate, not a replacement for `audit:generated-premium` or release builds.

## Release build

For large visual QA, do not start with the monolithic release build. Use the resumable release-prep chunks first:

```bash
npm run build:release:plan -- --locales en --scope portal,tools,identifiers
npm run build:release:incremental -- --locales en --scope changed
npm run build:release:incremental -- --locales en --scope portal,tools,identifiers
npm run build:release:incremental -- --locales en --all-countries --limit 10
npm run build:release:status
```

`build:release:incremental` records completed steps in `generated/validohub/.build/release-incremental.json`. Each saved step includes a source fingerprint, so edited templates, scripts, CSS, YAML, or country data automatically make the affected step pending again. If the laptop sleeps, the terminal is killed, or a country chunk fails, rerun the same command and it skips only still-current completed steps. Repeating `--all-countries --limit 10` walks the next unfinished country chunk, so a full country pass can be done across multiple sessions.

Use `--plan`/`npm run build:release:plan` before long runs to see the exact pending step names and ids. Use `--resume-from country:spain` or any printed step id when you want to restart at a known point, `--limit` to keep the chunk small, and `npm run build:release:status` from a second terminal to see the active step, last output, recent failures, and recent completed chunks.

Every incremental step has a watchdog: by default it prints progress every 60 seconds, stops a single step after 90 minutes, and stops a single step after 15 minutes with no output. Tune this with `--progress-seconds`, `--step-timeout-minutes`, and `--max-silent-seconds`; use `0` for any limit only when you intentionally want to disable it.

Use `--no-resume` when you intentionally want to force a step even though its source fingerprint matches. Use `npm run build:release:incremental -- --reset` only when you want to discard all saved release-prep state.

Use targeted countries when checking a visual fix:

```bash
npm run build:release:incremental -- --locales en,fr,uk --countries brazil,poland,france
```

This route does not run the Java publisher; it is the practical release-prep path for portal pages, global tools, identifiers, and country pages before a final gate.

## End-of-development release path

When the site is visually close and you want a real release signal without losing another night to a monolithic build, use this order:

```bash
npm run build:changed -- --dry-run --locales en
npm run build:changed -- --locales en
npm run build:release:plan -- --locales en --scope portal,tools,identifiers
npm run build:release:incremental -- --locales en --scope portal,tools,identifiers
npm run build:release:incremental -- --locales en --all-countries --limit 20
npm run build:release:status
```

Keep rerunning the country chunk until status shows no pending English country steps. Then do the production-localized pass in smaller chunks:

```bash
npm run build:release:incremental -- --locales en,es,pt-BR,de,fr,pl,uk --scope portal,tools,identifiers
npm run build:release:incremental -- --locales en,es,pt-BR,de,fr,pl,uk --all-countries --limit 10
```

After incremental status is clean, run the scoped audits you need for the changed surface. Only then use the monolithic release build as the final gate:

```bash
npm run build:release
```

The release build still runs the full Java publisher, but it now streams child output, prints periodic "still running" progress, prints `[phase] ... done in ...` timings for every Node post-process stage, and times out after 180 minutes by default. If incremental chunks are clean and the monolithic release still cannot finish overnight, treat that as a publisher-performance bug, not a product-edit failure: keep the incremental release-prep plus audits as the practical QA gate while profiling the Java publisher separately.

When Java-owned routes already exist and the Java publisher is the bottleneck, use the Node release gate to refresh the ValidoHub-owned portals, identifiers, localizations, post-processing, sitemap, and generated-site validation without re-running Maven:

```bash
npm run build:release:node
```

This command passes `--skip-java-publisher` to `scripts/build-all.mjs`; it reuses the existing generated Java-owned routes and must not be used to materialize brand-new YAML routes for the first time.

Useful overrides:

```bash
npm run build:release -- --timeout-minutes 360
npm run build:release -- --progress-seconds 30
npm run build:release -- --no-timeout
```

Only use `--no-timeout` when you are intentionally leaving the machine overnight and already know the build can finish.
