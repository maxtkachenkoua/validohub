# Documentation Guide (V1.0)

Every ValidoHub tool must end with a comprehensive, markdown-rendered reference documentation section. This provides educational context directly inside the tool sandbox.

---

## 1. Documentation Structure & Order

Documentation is divided into expandable accordions (`<details class="doc-accordion">`):

1. **How it Works (Overview):** Basic usage rules, input formats, and core mechanics.
2. **Algorithm & Math (Detailed Spec):** Multipliers, character sets, bounds, and mathematical verification logic.
3. **Use Cases & Examples:** Practical engineering scenarios where this tool is needed.
4. **RFC & Standards References:** Direct links to official standards (e.g. ISO, RFC 3986, RFC 8259).
5. **Frequently Asked Questions (FAQ):** Explanations for common validation failures and configuration questions.

---

## 2. Technical Execution Standards

### A. Document Accordion Toolbar
* **Controls:** Placing an expand/collapse controls bar above the details section allows developers to toggle all documentation with a single click.
* **Implementation:**
  ```html
  <div class="doc-controls-bar">
    <button type="button" class="button button-secondary compact" id="pesel-expand-docs-btn">Expand All</button>
    <button type="button" class="button button-secondary compact" id="pesel-collapse-docs-btn">Collapse All</button>
  </div>
  ```

### B. HTML Translation Rules
* **No Raw Markdown:** Documentation must be pre-rendered to valid, semantic HTML elements (e.g. `<strong>`, `<ul>`, `<code>`).
* **Clean Code Blocks:** Use pre-rendered `<pre><code>` structures for code blocks.
* **Clickable Links:** External links to specs (RFCs, official databases) must open in a new tab (`target="_blank"`).
* **Typography:** Document styles must follow system defaults, matching line heights and text sizes to prevent layout shift.
