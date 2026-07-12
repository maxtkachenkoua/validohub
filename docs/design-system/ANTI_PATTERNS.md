# Design & Development Anti-Patterns (V1.0)

This document lists design and development anti-patterns to avoid.

---

## 1. UX & Visual Anti-Patterns

### A. The "Mystery Meat" Navigation
* **Anti-Pattern:** Using icons without labels for critical actions.
* **Why it's bad:** Developers should not have to guess what an icon button does. All actions must feature explicit text labels or clear title indicators.

### B. Multi-Step Wizards for Single Utilities
* **Anti-Pattern:** Splitting simple formatting or validation workflows into multi-screen steps.
* **Why it's bad:** Developers want immediate feedback. Forcing users through multiple steps to format a JSON string or validate an identifier is inefficient.

---

## 2. Technical & Code Anti-Patterns

### A. Custom Ad-hoc CSS in Plugins
* **Anti-Pattern:** Injecting inline style properties or appending custom `<style>` blocks in tool Javascript files.
* **Why it's bad:** All shared layout rules must reside in `validohub.css` to maintain visual consistency.

### B. Remote Server Roundtrips for Static Checksums
* **Anti-Pattern:** Sending inputs to remote API servers to validate simple math checksums (like PESEL or tax IDs).
* **Why it's bad:** Violates data privacy guarantees and introduces unnecessary network latency. All validation logic must run client-side.

### C. Direct DOM Overwrites of Global Shell Elements
* **Anti-Pattern:** Modifying global navbars, page wrappers, or footers from within tool plugins.
* **Why it's bad:** Breaking isolation boundaries can cause visual errors across other pages. Plugins must only update elements within their workbench form container.
