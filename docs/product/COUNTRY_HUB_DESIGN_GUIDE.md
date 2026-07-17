# Country Hub Design Guide

This is the canonical design reference for ValidoHub Country Hubs.

Brazil is the base Country Hub template reference. Poland is the mature, tool-rich Country Hub gold standard for countries with broad local tool portfolios. Future country hubs must inherit the shared structure, visual language, section order, and interaction principles; mature countries should also follow `docs/product/POLAND_COUNTRY_HUB_GOLD_STANDARD.md`. Do not invent unrelated layouts for Spain, Germany, France, Japan, or any other country.

## Page Philosophy

Country Hubs are Developer Intelligence pages.

They help developers understand local identifiers, payment systems, banking formats, address rules, phone rules, locale conventions, government systems, official references, and available country-specific workbenches.

They are not validator pages by themselves. They can point to validators and workbenches, but they must not imply that a country-specific validator exists until it is implemented.

The page must feel useful before every local tool exists.

## Visual Hierarchy

Use the Brazil hub as the hierarchy standard:

1. Hero and country identity.
2. Quick facts and visual geography.
3. Copy-ready developer constants.
4. Implementation profile.
5. Local formats and examples.
6. Validation guidance and common mistakes.
7. Payments, banking, government, and official resources.
8. Available and planned workbenches.
9. Developer snippets and JSON examples.
10. Discovery, tips, ecosystem notes, and hidden future ad slots.

Do not move documentation above the developer utility sections. Country Hubs are product surfaces, not essays.

## Mandatory Sections

Every mature Country Hub should contain:

- Hero.
- Developer Cheat Sheet.
- Developer Country Profile.
- Localization Examples.
- Address Example.
- Phone Examples.
- Validation Rules.
- Developer Notes.
- Implementation Notes.
- Common Integration Mistakes.
- Developer Checklist.
- Payments & Banking.
- Government Systems.
- Official Resources.
- Available Workbenches.
- Planned Workbenches.
- Related Global Tools.
- API Snippets.
- JSON Examples.
- Developer Tips.
- Future Discovery Links.
- Future Ad Slots.

If a country lacks data for a section, keep the section structure available in the model and omit empty UI rather than showing fake content.

## Reusable Sections

Sections must be generic.

A future country should provide data, not custom rendering. New sections should improve every country, not only Brazil. If a new section is genuinely reusable, update Brazil first, document the section here, then reuse it for future countries.

Country-specific validators, parsers, lookups, and workbenches require their own product specs before implementation.

## Card Anatomy

Every Country Hub card should follow one shared anatomy:

- Header.
- Logo or icon.
- Title.
- Badge.
- Body.
- Short description.
- Optional footer.
- Optional related tool.
- Optional external docs.
- Optional status.

Avoid one-off card layouts. Cards should look like members of the same system even when they represent identifiers, payments, government systems, localization examples, snippets, or future tools.

Cards should be scan-friendly. A developer should understand the category, status, and purpose within a few seconds.

## Spacing Rules

Use calm, consistent spacing:

- Page sections should breathe.
- Cards should use consistent internal padding.
- Grid gaps should remain regular across sections.
- Related badges and chips should sit close to the content they describe.
- Avoid dense walls of text.
- Avoid oversized graphics that push useful developer data below the fold.

Mobile spacing should be tighter but never cramped.

## Typography

Typography should feel like a premium documentation portal:

- Headings are clear and compact.
- Body copy is direct and technical.
- Labels use small, strong type.
- Codes and constants use monospace.
- Long identifiers must wrap safely.
- Avoid decorative type treatments.

Do not scale typography with viewport width.

### Card Typography Scale

All country-level cards, portal cards, instrument cards, reference cards, resource cards, and ecosystem cards must use compact card typography. Card headings are not page headings: keep them around `0.92rem` to `1rem`, use tight line-height, and avoid hero-sized text inside cards. Card body copy should read as supporting metadata around `0.84rem` to `0.9rem`; badges, labels, and identity marks should stay smaller and single-line where possible.

When adding or localizing cards, never let translated text force oversized card typography. Prefer concise card descriptions, safe wrapping, and a stable grid over increasing font size. The Poland Country Hub is the visual reference for this compact card scale.

## Badge System

Use one global badge system.

Statuses:

- Available.
- Ready.
- Coming Soon.
- Planned.
- Experimental.
- Deprecated.

Context badges:

- Global.
- Country.
- Developer.
- Beta.

Badge style:

- Compact inline-flex shape.
- Pill radius.
- Small padding.
- Medium-heavy font weight.
- Single-line when possible.
- Consistent height across cards.
- Clear color semantics.

Badges must not imply working validators or production tools unless the implementation exists.

## Icon Policy

Use one cohesive icon language.

Production UI should avoid emoji as icons. Existing emoji-based country UI is legacy-compatible until replaced by a deliberate visual-system pass, but future work should use consistent SVG icons or approved brand marks.

Do not mix random icon libraries. If an icon family is adopted, use it consistently.

Use semantic icons for concepts that do not have official visual identities, such as:

- CPF.
- CNPJ.
- CEP.
- Regex.
- JSON.
- Base64.
- URL.
- Unicode.
- Locale.
- Calendar.
- ICU.

### Country And Instrument Identity

Every country-level instrument card and every instrument page must carry a stable identity mark.

Priority:

1. Approved official logo or SVG through the Brand Asset System.
2. Registered ValidoHub glyph when official usage is not safe.
3. Short text mark/acronym such as `BLIK`, `KSeF`, `NIP`, `REGON`, `IBAN`, `SEPA`, `VAT`, or `PESEL`.
4. Deliberate semantic fallback only when no recognizable identity exists.

Related country cards must use country flags instead of globe or planet icons.

Do not ship random emoji as permanent identity for official standards, payment systems, registries, or developer tools.

### Country Workbench Header Standard

Every mature country-specific workbench page must open with a premium country-aware tool header before the main input area. This header is part of the product standard, not decorative chrome.

The header must include:

- A stable identity mark or approved logo/acronym for the tool.
- The tool title and a concise, domain-specific summary.
- A flag-aware or country-color gradient that feels native to the country without overpowering the page.
- Presets or sample chips when the tool has useful examples.
- Local input history when supported.
- No fake buttons, no dead controls, and no generic repeated copy.

Poland and Brazil are the reference implementations for this pattern: Poland proves the standard across a broad tool suite, and Brazil proves vivid country-color treatment for payment-heavy and registry-heavy tools. Future country tools should inherit this pattern before inventing a different header layout.

### Country Workbench Diagnostics Standard

Every mature country-specific tool should provide a premium diagnostics stack, not only a basic output box.

Required sections:

- validation pipeline with progress and per-step pass/check cards;
- local result cards with normalized value, masked value, tool type, confidence, and official-boundary text;
- field breakdown for identifiers, fiscal keys, payment payloads, phone numbers, postal codes, amounts, or other structured inputs;
- quality notes that separate browser-only proof from official lookup requirements;
- advanced analysis with developer JSON, validation trace, and integration hints;
- per-tool identity mark, country-color accent, and domain-specific language.

Brazil and Poland are the reference implementations. A future country tool may be simpler only while it is explicitly experimental; once marked available, it should meet this diagnostics standard.

## Global Brand Asset Policy

This policy applies to UI, Markdown, documentation, navigation, cards, Country Hubs, workbenches, future pages, and generated pages.

The canonical project-wide architecture is `docs/product/BRAND_ASSET_SYSTEM.md`.

The canonical registry is `docs/product/BRAND_REGISTRY.md`.

Whenever an organization, payment system, company, technology, framework, protocol, language, database, operating system, standard, API, or ecosystem has an official visual identity, use it.

Never replace famous brands with generic icons.

Priority:

1. Official SVG or logo.
2. Carefully recreated vector version only when appropriate and legally safe.
3. Generic semantic icon only when no official branding exists or when licensing prevents use.

Examples that should use official visual identity when legally usable:

- PIX.
- Java.
- Python.
- Go.
- Kotlin.
- C#.
- .NET.
- Node.js.
- React.
- Next.js.
- TypeScript.
- JavaScript.
- Docker.
- Kubernetes.
- PostgreSQL.
- MySQL.
- MongoDB.
- Redis.
- JWT.
- Stripe.
- Visa.
- Mastercard.
- American Express.
- SWIFT.
- SEPA.
- IBAN.
- Banco Central do Brasil.
- Receita Federal.
- gov.br.
- GitHub.
- OpenAPI.
- GraphQL.

Do not redraw official logos from memory. Do not bundle unclear trademark assets without documenting the licensing decision.

AI assistants must not choose logos or icons ad hoc. Check the Brand Registry first. If a brand is missing, add a Brand Registry entry and use the configured rendering mode.

## Monochrome Brand System

Prefer tasteful monochrome SVG logos for a premium documentation appearance.

Use monochrome branding when:

- The page contains many logos.
- The brand is supporting context, not the primary subject.
- Full-color logos would create visual noise.
- The card grid should feel calm and documentation-grade.

Use full-color branding intentionally when:

- The official brand guidelines require it.
- Color carries important recognition.
- The logo is the primary subject of a page or workbench.

Monochrome logos must still be recognizable and must not violate brand usage rules.

## Logo Policy

Official logos belong in ValidoHub assets only when usage rights are clear enough for the product repository.

If licensing, trademark, or usage rights are unclear:

- Keep a text brand badge.
- Document the limitation.
- Do not create an unofficial imitation.

Logo sizing:

- Keep logos small and supporting.
- Do not let logos dominate country cards.
- Align logos with titles and badges.
- Preserve aspect ratio.

## Country Visual System

Every mature Country Hub should include:

- Flag.
- Country outline.
- Miniature world map highlighting the country.
- Continent badge.
- Country name.
- Status.
- Quick facts.

Country outlines should be real SVG geography when legally usable data exists. The current Brazil SVGs are generated from Natural Earth geometry and are the reference.

Future countries should add approved SVG assets and registry entries. They should not add country-specific renderer branches.

## Responsive Behavior

Country Hubs must work cleanly on:

- Mobile.
- Tablet.
- Desktop.

Rules:

- No horizontal scrolling.
- Card grids collapse predictably.
- Copy controls remain reachable.
- Badges wrap cleanly.
- Maps and outlines shrink without cropping.
- Code snippets wrap or scroll within their own code block, never the page.
- No right sidebar.

## Accessibility Expectations

Country Hubs must be accessible by default:

- Real images need meaningful `alt` text.
- Decorative icons should be hidden from assistive tech when appropriate.
- Buttons must have clear labels.
- Copy feedback should be announced.
- Color must not be the only status signal.
- Keyboard users must be able to reach copy actions.
- Text must remain readable at mobile widths.

## Copywriting Style

Write like a practical developer reference.

Sentences should be:

- Short.
- Technical.
- Direct.
- Active voice.

Avoid:

- Marketing language.
- Hype.
- Empty adjectives.
- Long paragraphs.
- Claims that imply tools exist before they are implemented.

Use concrete developer language: format, normalize, preserve, validate, parse, display, store, compare, copy.

## Localization Strategy

Routes are stable and not localized.

Human-facing labels and copy may localize later. Country facts should be structured enough to support future localization without changing the layout.

Locale remains the first URL segment.

Do not translate country slugs.

## Future Scalability

The design must scale to many countries.

Brazil defines the standard. Spain, Poland, Germany, France, Japan, and every future country inherit the same layout and design language.

Only metadata and local content should change.

Architecture remains generic.

## Polish Pass Checklist

Every future Country Hub should be reviewed for:

- Spacing.
- Padding.
- Margins.
- Card heights.
- Logo sizing.
- Badge alignment.
- Typography.
- Responsive layout.
- Mobile.
- Tablet.
- Desktop.
- Copy consistency.
- Visual hierarchy.
- Empty states.
- Future scalability.
- No horizontal overflow.
- No console errors.
- Generated output not committed.

Do this review from the generated site root, not from source files.
