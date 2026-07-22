# Build Hardening V2

Build Hardening V2 exists to keep ValidoHub development fast as the generated site grows. The full release build is no longer the default feedback loop for country, portal, or global-tool edits.

## Default Development Loop

Use scoped builds first:

- `npm run build:portal` updates the home page, tools portal, countries portal, shared assets, and localized portal shells.
- `npm run build:country -- --country <slug> [--locales en,pl]` updates one country hub and its already-generated local tool pages.
- `npm run build:tools -- --slugs <slug-a>,<slug-b> [--locales en]` updates shared assets, runtime scripts, /en/tools/, and selected already-generated global tool pages.

Use scoped audits next:

- `npm run audit:country-premium -- --country <slug>` for a country contract check.
- `npm run audit:tools -- --base http://127.0.0.1:<port> --slugs <slug-a>,<slug-b>` for selected global tools.

## Release Gates

Use full commands only at checkpoints:

- `npm run build:full` is the full Java + Node publisher and site integrity gate. It may take a long time because it validates the full generated site.
- `npm run audit:full` is the broad country-suite/global audit gate.

The legacy `npm run build` still points to the full build for compatibility, but AI agents must not use it for routine UI/runtime/content iteration unless the user explicitly asks for a full release build or new YAML routes must be published.

## Important Limit

`build:tools` is a dev accelerator, not a Java publisher. If a brand-new YAML global tool has never been generated, run one full/release build first. After that, `build:tools -- --slugs ...` is enough for CSS, JS, runtime, portal, and generated-page asset refreshes.

## Target Timings

A small scoped tools loop should be seconds, not tens of minutes. Example smoke from Build Hardening V2:

- `npm run build:tools -- --slugs webhook-signature-verifier,phone-e164-workbench --locales en`: about 3 seconds.
- `npm run audit:tools -- --base http://127.0.0.1:8099 --slugs webhook-signature-verifier,phone-e164-workbench`: about 5 seconds.

## AI Rule

Before running a full build, ask: can this be validated with `build:portal`, `build:country`, or `build:tools` plus a scoped audit? If yes, do the scoped path. Full build is a release gate, not a normal edit loop.
