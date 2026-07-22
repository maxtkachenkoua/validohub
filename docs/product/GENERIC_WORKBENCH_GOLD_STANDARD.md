# Generic Workbench Gold Standard

This document is mandatory product memory for every ValidoHub generic, non-country tool.

Generic tools are not secondary utilities. They must be premium product workbenches that match the quality, visual hierarchy, interaction richness, and depth of the best Poland and Brazil national instruments.

## Product Standard

Every current and future generic tool must be built as if it is intended to be the best tool of its kind on the internet.

The benchmark is not "working" or "clean." The benchmark is:

- Poland country workbenches for density, validation depth, advanced analysis, result cards, local conventions, diagnostics, and developer-grade explainability.
- Brazil country workbenches for visual confidence, branded workbench presence, vivid but controlled identity, rich tool headers, and premium interaction polish.
- The strongest competing public tools on the internet for the same task, then exceed their functional depth. If a competitor offers X meaningful capabilities, ValidoHub should aim for at least X plus a richer analysis layer, and often X times 2 where the domain supports it.

## Non-Negotiable UX Rules

Each generic workbench must be tool-first. The usable instrument is the first meaningful screen, not documentation, marketing copy, or a thin form.

Each generic workbench must include, where applicable:

- A branded, tool-specific header with precise copy and local trust/privacy badges.
- Mode-specific presets and samples that succeed in the current mode by default.
- Presets for valid, invalid, edge-case, real-world, and developer/debug scenarios.
- Browser-only/offline execution whenever possible.
- A validation or processing pipeline visual with states that never collapse into text runs.
- Premium result cards with compact typography, no cramped inline labels, and copy actions on values users actually need.
- Advanced analysis expanded by default when it teaches or verifies the result.
- Field, byte, token, claim, component, or step breakdowns appropriate to the domain.
- Interactive exploration panels, not static dumps, wherever the data structure allows it.
- Quality notes, repair suggestions, warnings, limitations, and privacy/network boundary copy.
- Developer API previews that match the active action or mode, never stale generic snippets.
- Copy, download, history, sample, and batch flows where they make the workbench meaningfully better.
- Local result JSON or audit export for developer workflows where useful.
- Per-tool documentation and descriptions. Never use repeated generic copy.

## Visual Rules

Generic workbenches must visually follow the premium country workbench system:

- Compact, premium card typography.
- Dense but readable information hierarchy.
- Branded headers and tool identity cues.
- Polished buttons, tabs, chips, selectors, timelines, code blocks, and explorer rows.
- No native browser-looking controls in premium surfaces.
- No raw unstyled advanced sections.
- No floating status words, collapsed timeline labels, overlapping result text, or single-line metric collisions.
- No card-inside-card clutter unless the component is a real nested tool surface.
- Advanced panels and result areas must look intentional at desktop and mobile widths.

If a generic tool emits legacy shared fragments, CSS must explicitly support those fragments until the markup is modernized.

## Functional Depth

Generic tools must be enriched beyond basic conversion/validation:

- Encoding tools should include variants, normalization, padding, URL-safe modes, bytes, chunks, previews, files, batch, repair suggestions, and examples.
- JSON/JWT-like tools should include tree explorers, search, path/pointer copy, syntax and semantic diagnostics, structured downloads, claim or node analysis, and safe samples.
- URL tools should include component parsing, query tools, reserved/unsafe character analysis, normalization, sorting, repair, and percent-byte inspection.
- Hash tools should include multiple algorithms where relevant, file hashing, HMAC or keyed hashing when appropriate, checksum comparison, batch, encoding inputs, and security notes.
- Text tools should include diff modes, normalization, casing locale notes, slug rules, Unicode/codepoint analysis, batch options, and copyable outputs.
- Identifier-like generic tools should include normalization, checksum/math explanation, masked output, generated safe fixtures, batch validation, and audit JSON.

The exact features depend on the domain, but the standard is always exploration and analysis, not a single output box.

## Mode Integrity

Every mode must be coherent end to end:

- A decoder must not show encoder-first presets.
- A validator must not show generator-first history labels.
- API snippets must use the active operation.
- Badges, messages, result labels, downloads, filenames, and copy actions must match the selected action.
- The first available preset must demonstrate success unless it is explicitly labeled as an invalid/error sample.
- Error samples must be intentional, labeled, and visually polished.

## Localization

All localization work must cover every supported language and every visible user-facing surface affected by the tool:

- Titles.
- Descriptions.
- Preset labels.
- Button labels.
- Result labels.
- Warnings.
- Repair suggestions.
- Documentation sections.
- Empty states.
- Advanced analysis labels.

Do not localize only page titles.

## Future Tool Rule

Any new generic instrument must start from this gold standard. It is not acceptable to ship a generic form and plan to enrich it later unless the task explicitly says to build a temporary scaffold.

## New Generic Instrument Contract

When adding a new global tool under `/{locale}/tools/{tool-slug}/`, do not start from the minimum Engine-generated form. Start from the premium workbench contract:

The `/en/tools/` directory is mandatory for global-tool discovery. Follow `docs/product/TOOLS_PORTAL_SPEC.md` in addition to this gold standard whenever adding, renaming, or hardening a global tool.

- Define the tool-specific product spec and registry entry before or alongside implementation.
- Choose a deterministic neutral visual theme, mark, chips, and header copy; never use country flag colors for a country-neutral tool.
- Ship a success-first default preset for every primary mode. The first available preset must succeed in the selected mode.
- Ship at least one invalid/error preset where validation is part of the tool domain, and make the error result visually premium.
- Place the primary result block immediately after the input/action area. Advanced analysis must follow the result, not hide the result.
- Include a validation/processing pipeline, premium result cards, field/component/byte/token breakdown, quality notes, and developer JSON or API preview where useful.
- Include copy/download behavior for the values developers actually need, not only the raw textarea output.
- Browser-verify first load, first preset, primary success, invalid/error, mobile layout, and advanced analysis before calling the tool complete.
- If a competing public tool has a meaningful capability, ValidoHub should match it and add a richer local analysis layer.
- Global tools must compete on domain depth, not only presentation. JSON needs repair/schema/path/flatten/secret-scan intelligence; JWT needs claim timeline, security checklist, and verification-boundary explanation; Base64 needs byte/data-URI/MIME/canonicalization inspection; URL tools need full URL parsing, query tables, canonical output, redirect/credential/UTM/security hints; UUID and IBAN tools need generation plus validation/debug replay where the domain allows it.
- `npm run audit:global-premium -- --base <local-url>` is the required fast-loop audit for global tool work. It must pass before a global tool hardening task is called done. A full `npm run build` remains the release gate, but global-only development should not wait on full-site materialization when targeted generated assets and browser audits are enough for iteration.

When upgrading existing generic tools, audit the whole user flow:

1. First load.
2. First preset.
3. Primary successful run.
4. Primary invalid/error run.
5. Advanced analysis.
6. Copy/download/history.
7. Mobile layout.
8. Developer snippets.
9. Documentation and related tools.

If any of these looks weaker than the Poland/Brazil workbench baseline, keep iterating.

## IBAN Global And Country Rule

IBAN is both a global finance standard and a country-specific banking structure. Do not treat every IBAN page as interchangeable SEO copy.

- Keep one global `IBAN Validator` under `/{locale}/tools/iban-validator/` as the universal entry point.
- The global tool must detect the country, validate ISO shape, country length, MOD-97, grouping, masking, and ownership-boundary notes.
- If ValidoHub has a supported country hub and the country has meaningful local IBAN/BBAN structure, provide a country-specific IBAN workbench.
- Country-specific IBAN pages must add real local value: BBAN field map, bank/branch/account slicing, domestic check digits where available, local examples, common mistakes, payment/SEPA notes where relevant, and clear official lookup boundaries.
- Country-specific IBAN pages must not be thin duplicates of the global page. If a country has no meaningful local rules or demand, leave it as a detected profile in the global tool until the product case is strong.
- The global result should point users to the deeper country page when one exists.
- Country pages must reject or clearly flag wrong-country IBANs rather than silently validating them as generic IBANs.
