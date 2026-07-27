# Spain ID Gold Log

Date: 2026-07-27

Internal AI memory for the bespoke Spain DNI/NIE/NIF/CIF workbench. This is not user-facing copy.

## Why This Tool Exists

Spanish identifier data is a high-frequency integration problem because developers often receive DNI, NIE, personal NIF, legal-entity NIF, legacy CIF terminology, and optional `ES` VAT-prefixed values in the same data flows. A useful ValidoHub page must do more than regex validation: it needs to classify the identifier, normalize it safely, replay the public control-character algorithms, expose anatomy, generate safe fixtures, and state what still requires official systems.

## Primary Sources And Boundary

The page links users toward official Spanish government, Agencia Tributaria, and EU VIES resources. The workbench must keep the local/official boundary explicit:

- ValidoHub checks browser-local shape, normalization, DNI/NIE modulo-23 letters, CIF/NIF weighted control symbols, entity-prefix context, and optional `ES` VAT syntax.
- ValidoHub does not verify identity, document authenticity, taxpayer status, company registration, VIES status, ownership, or official assignment.

## Implemented Capabilities

- Bespoke Gold lab mounted on `spain-id-validator` with `data-gold-lab` so the shared `gold-tools-lab.js` overlay does not create a duplicate lower sandbox.
- Success-first samples for valid DNI, NIE, CIF/NIF, and ES VAT syntax plus invalid DNI/NIE samples.
- Local normalization that strips display separators, uppercases input, and tracks optional `ES` VAT prefix separately from the local Spanish body.
- DNI / personal NIF replay: 8-digit body modulo 23 against the public control-letter table.
- NIE / foreigner NIF replay: X/Y/Z prefix mapped to 0/1/2 before modulo-23 control-letter replay.
- Legal-entity NIF / legacy CIF replay: weighted odd/even digit sum, expected control digit and/or letter, and entity-prefix family context.
- Generated fictional DNI, NIE, and legal-entity NIF/CIF fixtures.
- Timeline, summary cards, identifier anatomy table, checksum replay, batch replay, official-source/boundary panel, workflow-specific Integration traps, and Developer Snapshot JSON.
- Copy normalized identifier and Copy developer JSON actions with browser fallback.
- Layout hardening based on Pix/CURP fixes: local wrapping/scrolling for long values, tables filling their cards, no page-level horizontal overflow, and hover/focus states that do not move controls.

## Fixture Notes

Known safe examples:

- DNI: `00000000T`
- NIE: `X1234567L`
- Legal entity NIF / legacy CIF: `B12345674`
- ES VAT-style syntax: `ESX1234567L`

Invalid examples must stay review/error paths and must not be silently replaced by generated valid fixtures.

## QA Plan

Completed for the 2026-07-27 bespoke Gold V1 pass:

- `node --check assets/js/tools/spain-id.js`
- `node --check scripts/build-country-dev.mjs`
- `node --check scripts/build-all.mjs`
- `node --check scripts/audit-country-premium.mjs`
- `npm run build:country -- --country spain --locales en`
- Generated HTML route check: `/en/spain/spain-id-validator/` loads `spain-id.js` and does not load `gold-tools-lab.js`.
- Browser smoke on `/en/spain/spain-id-validator/?v=spain-gold-v1f` confirmed the bespoke Gold page, sample deck, official links, valid DNI flow, timeline, summary cards, and anatomy area render without the shared lower overlay.
- `npm run audit:country-premium -- --country spain --locales en` passed as `full-premium-ready` with 61 tools, 0 blockers, and 1 warning.

Important build lesson:

- Spain ID is still materialized under the Spain country-suite route in generated HTML. The scoped and full builders must route-postprocess this page to remove the shared Gold overlay and append `spain-id.js`; otherwise the source runtime exists but the user still sees the generic suite.

## Open Risks

- The source buttons currently point to stable official portals rather than deep manual anchors; re-check exact official deep links before release marketing claims.
- Legacy CIF terminology remains common in datasets, but modern copy should explain it as legal-entity NIF context rather than a separate current official identifier family.
- The browser lab is local evidence only. Do not add wording that implies AEAT, VIES, police, registry, or identity status verification.
