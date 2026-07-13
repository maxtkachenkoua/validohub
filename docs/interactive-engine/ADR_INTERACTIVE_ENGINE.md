# ADR 002: Declarative Interactive Entity Engine

## Status
**Accepted** (July 13, 2026)

---

## Context
As ValidoHub grows to support hundreds of national identifiers (e.g. NIP, REGON, CPF, Steuer-ID), manually writing individual HTML validator pages, calculators, and decoders leads to duplicate code and makes the platform harder to maintain.

---

## Decision
We will replace hardcoded layout pages with a declarative **Interactive Entity Engine (IEE)**.
- **Declarative DSL:** Identifiers declare formatting structures and algorithms using a YAML/JSON metadata schema.
- **Generic Component Registry:** Reusable UI components adapt their presentation dynamically based on metadata.
- **Template Separation:** Design structure rules are decoupled from domain logic.

---

## Rationale
- **Scalability:** Authors can add new identifiers in minutes by creating metadata files, with no custom UI code required.
- **Maintainability:** Layout and style upgrades are applied globally to all generated pages by updating the central template and component drivers.
- **Consistency:** Ensures all entity pages share the same design system standards.
