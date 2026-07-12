# Result Presentation Patterns (V1.0)

This document standardizes how processing and validation results are presented on ValidoHub.

---

## 1. State Mapping Specifications

### A. Empty State (Sandbox Shield)
* **Visual:** Dash-bordered, rounded surface card containing a lock/shield emoji, descriptive title, and three trust badges.
* **Why:** Reassures users that processing happens locally and prevents layout shifts before input is provided.

### B. Valid State (Success Pass)
* **Visual:** Success badges (`state: success`) or timeline dots in dark forest green (`#16a34a`). A checkmark icon (`✓ Valid Struct`) is prepended to the card title.
* **Why:** Clear confirmation of successful validation.

### C. Invalid State (Failure Block)
* **Visual:** Error badges (`state: error`) and timeline dots in blood red (`#dc2626`). An error message detail lists the precise parsing exception.
* **Why:** Failure must draw immediate attention. Highlighting malformed sequences (red backgrounds on bad bytes) helps developers quickly debug syntax errors.

### D. Warning State (Partial Pass)
* **Visual:** Warning badges (`state: warning`) or timelines in amber orange (`#ea580c`). Shows warning tips (e.g. "expired token" or "algorithm is set to none").
* **Why:** Used for tokens or structures that are technically syntactically valid but contain security vulnerabilities or flags.

### E. Loading State
* **Visual:** Faint pulse micro-animation or progress bar filling.
* **Why:** Real-time feedback runs instantly (zero lag), but file imports may include micro-delays where indicators prevent layout freezing.

---

## 2. Interactive & Developer Mode
* **Hover Segments:** Mappings highlight corresponding visualization elements.
* **Copy Triggers:** All copy elements (e.g. Copy JSON, Copy URL, Copy decoded value) must display inline feedback and transition to "Copied!" for 1.5 seconds.
* **Code Preview Tabs:** Syntaxes (cURL, Javascript, etc.) default to the developer's raw input variables dynamically, displaying real-time payloads.
