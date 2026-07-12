# ADR 001: Standardization on Gold Standard PESEL Reference

## Status
**Accepted** (July 13, 2026)

---

## Context
ValidoHub tools were starting to diverge in layouts, interactive behaviors, error displays, and coding standards. This visual and functional drift increased cognitive load and compromised the platform's premium developer experience.

---

## Decision
We will adopt the **Polish PESEL Validator & Explainer** page structure as the canonical Gold Standard reference implementation for all ValidoHub tools.
* **Component Standardization:** All pages must reuse the layout elements established by PESEL (e.g. unified presets, history selectors, validation timelines, developer code previews).
* **Code Frozen:** The PESEL plugin code is frozen at Version 1.0 to prevent design drift.
* **Documentation-First workflow:** Design changes must be proposed and approved in this design system documentation before code is modified.

---

## Rationale
* **Consistency:** Establishing a single reference layout ensures all tools feel like they belong to the same professional suite.
* **Predictability:** Consistent placement of input controls, results, and action buttons helps developers navigate the platform efficiently.
* **Reliability:** Standardizing on client-side, local-first execution ensures data privacy and fast feedback across all tools.
