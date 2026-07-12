# Premium Workbench Platform Specification (Product Phase 3)

This document establishes the architectural standards, UX principles, validation/parsing pipelines, and development guidelines to elevate every interactive validator on ValidoHub into a premium developer workbench.

---

## 1. Canonical Workbench Template

Every workbench layout must support the following standard sections using consistent responsive layouts:

```
+-------------------------------------------------------------+
|  [Eyebrow] VALIDOHUB WORKBENCH                              |
|  [H1] PESEL Validator & Explainer                           |
|  [Description] Live checksum audit and metadata extraction   |
+-------------------------------------------------------------+
|                                                             |
|  [Interactive Form Input Box]                               |
|  +-------------------------------------------------------+  |
|  | Enter PESEL number...                                 |  |
|  +-------------------------------------------------------+  |
|  [Validate Button] [Clear] [Copy Result]                    |
|                                                             |
+-------------------------------------------------------------+
|                                                             |
|  [Live Validation Results Panel]                            |
|  - Checksum Status: [Valid / Invalid]                       |
|  - Structure: Length, Characters                            |
|                                                             |
|  [Live Metadata Parser & Explainer]                         |
|  - Birth Date: Year, Month, Day                             |
|  - Gender: Female / Male                                    |
|  - Century: 20th / 21st                                     |
|                                                             |
+-------------------------------------------------------------+
|                                                             |
|  [Developer Mode (Toggleable Details)]                      |
|  - Raw JSON Output Block                                    |
|  - Step-by-Step Checksum Formula                            |
|  - Regex Match Verification Pipeline                        |
|                                                             |
+-------------------------------------------------------------+
|                                                             |
|  [Shared Code Snippets Tabbed Box]                          |
|  [Java] [JavaScript] [Python] [Go] [Rust]                  |
|  - Ready-to-use validation script                           |
|                                                             |
+-------------------------------------------------------------+
|                                                             |
|  [Graph-Powered Discovery Sidebar]                          |
|  - Validates: PESEL Number                                  |
|  - Supported Country: Poland                                |
|  - Governing Authority: ZUS                                 |
|                                                             |
+-------------------------------------------------------------+
```

---

## 2. Three-Layer Architecture: Validator, Parser, Explainer

A premium workbench must process inputs through three distinct execution layers:

1. **Validation Layer:** Runs checksum audits and syntax rules (regex). Returns boolean state and error codes (e.g. `ERR_LENGTH`, `ERR_CHECKSUM`).
2. **Parsing Layer:** Extracts embedded metadata from the validated string. For example, for a Polish PESEL, it decodes birth date (handling month offsets for different centuries) and gender digit.
3. **Explanation Layer:** Translates the parsed data and checksum steps into human-readable tables, clarifying *how* the output was derived.

---

## 3. Developer Mode Specifications

To support debugging of real-world compliance issues, every workbench must output a `Developer Mode` panel containing:

- **Raw JSON Block:** The structured payload returned by the validator script.
- **Regex Audit:** Detailed explanation of the syntax rules.
- **Checksum Calculation Steps:** For example, showing PESEL weight multiplications:
  $$\text{checksum} = (1 \times d_1 + 3 \times d_2 + 7 \times d_3 + 9 \times d_4 + 1 \times d_5 + 3 \times d_6 + 7 \times d_7 + 9 \times d_8 + 1 \times d_9 + 3 \times d_{10}) \pmod{10}$$

---

## 4. Multi-Language Code Snippet Standards

Copy-paste snippets should reside in a tabbed panel. The compiler sources them from standard templates:

* **JavaScript / TypeScript:** Standard client-side regex + checksum helper.
* **Python:** Standard library implementation utilizing type checking.
* **Rust:** Idiomatic structure returning a `Result<Pesel, PeselError>`.
* **Java:** Strict OOP utility class with static validate methods.

---

## 5. Premium UX Principles

* **Instant Verification:** Validates input on-the-fly (`input` and `change` event listeners) where possible, without blocking page state.
* **Zero Reloads:** All execution must occur locally on the browser client.
* **Keyboard Navigation:** Forms must be navigable using Tab keys; submit handles Enter key.
* **Copy-Paste Optimization:** Provide "Copy to Clipboard" buttons for results, snippets, and parsed JSON structures.

---

## 6. Workbench Maturity Model

- **1. Draft:** Page structure exists; placeholder text; mock form fields.
- **2. Basic:** Form works; simple regex syntax check; no advanced parsing.
- **3. Interactive:** Checksum validation fully coded; basic output alerts.
- **4. Premium:** Parsing & Explanation layers complete; code snippets tabbed panel visible.
- **5. Reference:** Graph-powered discovery populated; step-by-step math explained; strict failure tests pass.

---

## 7. Reference Implementation: PESEL Validator

The Polish PESEL Validator ([pesel-validator/index.html](file:///Users/maxtkachenko/work/validohub/generated/validohub/en/poland/pesel-validator/index.html)) serves as the benchmark:
1. **Validation:** Runs weighted MOD10 checksum calculation.
2. **Parsing:** Decodes century offsets (e.g. adding 80 for 1800s, 20 for 2000s, 40 for 2100s, 60 for 2200s).
3. **Graph Hook:** Uses `enhanceWorkbenchPage()` client-side VM hooks to dynamically show related resources, authorities, and standards.
