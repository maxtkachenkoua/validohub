# Component Library Specification (V1.0)

This document contains visual and behavioral specifications for all reusable UI components.

---

## 1. Page Header Hero
* **Purpose:** Introduce the tool's namespace, scope, and trust flags.
* **When to use:** Every tool page must begin with a Hero block.
* **When NOT to use:** Do not use inside sub-dialogs or multi-step setups.
* **Visual Behavior:** Centered or left-aligned clear text using the system typeface (`Inter`, `Outfit`, or native sans-serif).
* **Spacing:** `margin-bottom: 24px`.

---

## 2. Trust & Feature Badges
* **Purpose:** Establish trust and signal features (e.g. standard versions, privacy guarantees).
* **When to use:** Placed underneath the Hero summary text.
* **Visual Behavior:** Small, border-radius `9999px` pills (`pesel-pill`) using subtle borders and soft backgrounds. Active pills use blue colors.

---

## 3. Presets & History Dropdowns
* **Purpose:** Let users load sample data or review their past work immediately.
* **When to use:** Prepend inside the main `.field-grid` before the primary text inputs.
* **When NOT to use:** If the tool accepts file uploads only (no text inputs).
* **Visual Behavior:** Styled custom select elements matching standard input boxes (`height: 42px`, `border: 1px solid var(--line)`, `border-radius: 6px`).
* **Alignment:** Row 1 has Presets and History aligned side-by-side with matched header label heights (`style="height: 18px;"`).

---

## 4. Sandbox Empty State Card
* **Purpose:** Prevent empty workbench states from looking blank.
* **When to use:** Show when the input text area is blank.
* **Visual Behavior:** Dash-bordered rounded card (`pesel-empty-state`) with a soft background, detailed description, and trust badges.
* **Interaction:** Fades out/in gracefully as the user begins typing.

---

## 5. Validation Timeline Tracker
* **Purpose:** Indicate validation pipeline state execution visually.
* **When to use:** Active on validators or decoders once input is supplied.
* **Visual Behavior:** Horizontal node layout with connecting lines. Nodes color-code to green (Pass) or red (Fail). A progress bar fills from left to right.
* **Responsive Behavior:** Auto-scrolls horizontally on small viewports.

---

## 6. Primary Results Summary Card
* **Purpose:** Display key outputs (e.g. metadata, formats, parsed values) prominently.
* **When to use:** Shown immediately when validation/processing succeeds.
* **Visual Behavior:** Multi-column grid containing rows with small labels and bold value texts.
* **Interactions:** Each copyable row features a small text copy link that fades to "Copied!" upon activation.

---

## 7. Interactive Breakdown Card
* **Purpose:** Map input segments visually to explanation legends.
* **When to use:** Great for identifiers (PESEL, IBAN, VIN), encoded tokens (JWT), or escaping schemes (URL).
* **Interactions:** Hovering over individual code elements highlights both the legend item and the input segments concurrently, while displaying a text description.

---

## 8. Checksum Table Debugger
* **Purpose:** Guide developers through calculation/algebra steps.
* **When to use:** Math-heavy validation control matching (checksum checks).
* **Interactions:** Features a `▶ Replay` trigger animating table rows sequentially (120ms intervals) to show weights and products before revealing mod results.

---

## 9. Developer API Code Preview
* **Purpose:** Increase tool utility for developers building applications.
* **When to use:** In all tools.
* **Visual Behavior:** Tab buttons (cURL, JS, Python, Java, C#, Go) above a syntax-highlighted code block. Code matches the current user input value.

---

## 10. Documentation Accordions
* **Purpose:** Provide references, FAQs, and specs progressive disclosures.
* **When to use:** Bottom of every page.
* **Interactions:** Top toolbar features sticky `Expand All` and `Collapse All` buttons. Markdown bold text is rendered correctly as HTML.
