# Engine Architecture Spec (V1.0)

This document specifies the core runtime architecture, component versioning rules, and layouts translation of the Interactive Entity Engine.

---

## 1. Component Versioning & Backward Compatibility
To prevent breaking legacy pages, components are versioned and registered with a major version prefix:
* **Directory Structure:**
  ```
  assets/js/components/FieldExplorer/v1/FieldExplorer.js
  assets/js/components/FieldExplorer/v2/FieldExplorer.js
  ```
* **Resolution Rule:** The entity metadata specifies the targeted component version (e.g. `FieldExplorer@v1`). The component resolver queries the matching file path, ensuring older entities continue to run unchanged.

---

## 2. Plugin API for Third-Party Components
External developers can register custom interactive display plugins by calling:
```javascript
window.ValidoEngine.registerComponent("ASN1Explorer", {
  init(container, data) { ... },
  update(container, value) { ... }
});
```
This enables specialized rendering systems (like ASN.1, certificate structures, or barcode parsers) without modifying IEE core files.

---

## 3. Dynamic Layout Configuration
Instead of hardcoding a layout template, the entity metadata defines a custom layout hierarchy:
```yaml
layout:
  - Hero
  - QuickFacts
  - customColumns:
      left: [FieldExplorer, Decoder]
      right: [ChecksumExplorer, KnowledgeGraphViewer]
  - ExampleExplorer
```
The renderer processes layout arrays sequentially, assembling pages dynamically.

---

## 4. Theme System
Theme rules are declared in metadata and compiled to class hooks:
* **Themes:** `developer` (monospace, terminal style), `education` (legend-heavy breakdown), `enterprise` (clean cards, minimal badges).
* **Execution:** Class wrappers are written on page mount: `<div class="theme-developer">`.
