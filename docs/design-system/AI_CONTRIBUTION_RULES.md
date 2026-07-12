# AI Contribution Rules (V1.0)

This document establishes the guidelines that all AI agents must follow when creating or modifying ValidoHub tools.

---

## 1. Compliance Requirements

### A. Design System Alignment
* **Rule:** Do not design custom interfaces. Every tool must follow the visual language, typography, and page structure defined in this design system.
* **Why:** Consistent layouts prevent visual drift and ensure a unified developer experience.

### B. No Inline Styling
* **Rule:** Do not write inline styles or custom `<style>` blocks in tool javascript plugins. All layout rules must reside in `validohub.css`.
* **Why:** Inline styles make the codebase harder to maintain and compromise visual consistency.

---

## 2. Implementation Rules

### A. Real-time Debounced Validation
* **Rule:** Always use a 250ms debounced event listener on primary input fields to trigger validation automatically as the user types.
* **Why:** Live validation makes the tool feel fast and responsive.

### B. Local Storage Validation History
* **Rule:** Store the last 20 inputs in local storage, and prepend a clearable History selector directly beside the Presets dropdown.
* **Why:** History lists help developers quickly reuse previous inputs during testing.
