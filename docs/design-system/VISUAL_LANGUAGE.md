# Visual Language & Styling Spec (V1.0)

This document standardizes the visual language, colors, typography, margins, borders, and animations of ValidoHub.

---

## 1. Typography & Typography Rationale
* **Primary Sans-Serif Font:** `Outfit`, `Inter`, `Roboto`, or native system defaults.
  ```css
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  ```
* **Code / Monospace Font:** `Fira Code`, `JetBrains Mono`, `SFMono-Regular`, or console monospace.
  * **Why:** Monospace is required for hex dumps, JSON strings, calculations, and code snippets to maintain alignment.
* **Heading Hierarchy:**
  * Title: `h1` (32px / 2rem, weight 800)
  * Section Headers: `h2` (20px / 1.25rem, weight 700)
  * Field Labels: (14px / 0.875rem, weight 600)

---

## 2. Palette Rationale (Hex Tokens)

We avoid generic primary colors, using a professional dark/light semantic palette instead:

* **Background (`--bg`):** `#f8fafc` (Light) / `#0f172a` (Dark)
* **Surface Card (`--surface`):** `#ffffff` (Light) / `#1e293b` (Dark)
* **Lines / Borders (`--line`):** `#e2e8f0` (Light) / `#334155` (Dark)
* **Primary Text (`--text`):** `#0f172a` (Light) / `#f8fafc` (Dark)
* **Muted/Helper Text (`--muted`):** `#64748b` (Light) / `#94a3b8` (Dark)
* **Pass / Success Active (`--success`):** `#16a34a` (Light) / `#4ade80` (Dark)
* **Fail / Error Active (`--error`):** `#dc2626` (Light) / `#f87171` (Dark)
* **Warning Active (`--warning`):** `#ea580c` (Light) / `#fb923c` (Dark)

---

## 3. Spacing & Border Metrics
* **Standard Grid Gap:** `16px`.
* **Standard Card Margins:** `margin-bottom: 24px`.
* **Standard Padding:**
  * Card body padding: `24px`
  * Text area padding: `12px 16px`
  * Action button padding: `10px 20px`
* **Border Radius:**
  * Main inputs & cards: `8px`
  * Custom pills & badges: `9999px`

---

## 4. UI States & Animations

### Focus Ring Spec
Any input, select, button, or interactive card must show a distinct focus outline when focused.
* **Outline Style:** `2px solid #3b82f6` with an offset of `2px`.
* **Why:** Focus states are essential for keyboard navigation and accessibility.

### Hover Effects
* **Select Dropdowns & Buttons:** Background shifts using a CSS variable transition.
* **Breakdown Digits:** Active cells scale slightly (`transform: scale(1.02)`) and show a blue outline.

### Transitions
* **Rule:** Transitions must be fast and subtle.
  ```css
  transition: all 0.15s ease-in-out;
  ```
  * **Why:** Fast transitions make the interface feel responsive, avoiding slow animations that drag down performance.
