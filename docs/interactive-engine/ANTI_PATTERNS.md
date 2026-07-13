# Engine Anti-Patterns (V1.0)

This document standardizes architecture design anti-patterns to prevent visual drift and layout fragmentation.

---

## 1. Design & UX Anti-Patterns
* **Visual Divergence:** Creating custom HTML layout templates for individual identifiers instead of using the central `identifier.template.html`.
* **Static Readme Page:** Creating plain text/markdown pages with zero interactive components.

---

## 2. Code & Technical Anti-Patterns
* **Custom Styles:** Injecting inline styles or embedding `<style>` tags directly inside javascript component drivers.
* **Component-Specific Hacks:** Adding condition checks (e.g. `if (id === 'pesel')`) inside general-purpose components. Component behavior must be driven entirely by declarative metadata.
* **Orphan Entities:** Materializing identifier pages without registering country references and workbench validation links in the knowledge graph.
