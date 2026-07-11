# Country Hub Best Practices

## Purpose

Every country hub should answer one question:

> "If I need to build an integration for this country tomorrow, what do I need to know?"

The page should feel like product documentation written for software engineers—not an encyclopedia.

## Preferred information architecture

When applicable, country hubs should follow a consistent structure:

- Country overview
- Implementation highlights
- Validation expectations
- Integration checklist
- Common implementation mistakes
- Practical implementation reminders
- Payment & banking ecosystem
- Official reference authorities
- Copy-ready API snippets
- Localization notes
- Country ecosystem / relationships
- Related global tools
- Planned workbenches
- Discovery links

Countries may differ in complexity, but the overall architecture should remain familiar.

## Content philosophy

Always prioritize practical engineering guidance.

Prefer:

- implementation notes
- validation rules
- developer checklists
- common pitfalls
- copy-ready code examples
- official references
- ecosystem relationships

Avoid:

- encyclopedic descriptions
- long legal explanations
- filler content
- duplicated information between sections

## Information flow

Readers should naturally move through:

Overview
↓
Implementation
↓
Validation
↓
Pitfalls
↓
Examples
↓
References
↓
Future tooling

## Code examples

Keep examples extremely small (1–3 lines), immediately copyable, and practical.

## Avoid repetition

Each section should provide unique value. If the same fact appears in multiple places, consolidate it into the most appropriate section.

## Consistency

Developers should immediately know where to find validation, localization, payment, references, examples, and future tooling regardless of the selected country.

## Progressive enhancement

Whenever a new section or design pattern proves valuable in one country hub, evaluate whether it should become part of the standard architecture for all existing and future country hubs instead of remaining country-specific.

## Guiding principle

A developer should leave the page thinking:

"I know how to implement this integration."

—not—

"I learned interesting facts about this country."
