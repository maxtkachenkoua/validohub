# Canonical Page Structure & Architecture (V1.0)

Every tool page must follow the identical structural order. This consistency reduces cognitive load, enables developers to build a mental map of the platform, and ensures a cohesive experience.

---

## 1. The Canonical Page Flow

The visual order of components from top to bottom is:

```
┌────────────────────────────────────────────────────────┐
│ 1. Hero Title & Summary Description                    │
├────────────────────────────────────────────────────────┤
│ 2. Feature / Trust Badge Row (Pills)                   │
├────────────────────────────────────────────────────────┤
│ 3. Workbench Section Header                            │
│    ├─ Presets & History Select Dropdowns               │
│    ├─ Primary Input Field                              │
│    ├─ Generator Playground Actions                      │
│    └─ Primary Action Buttons Row (Validate, Clear)     │
├────────────────────────────────────────────────────────┤
│ 4. Validation Timeline Progress Bar                    │
├────────────────────────────────────────────────────────┤
│ 5. Primary Results Summary Card (Metadata)            │
├────────────────────────────────────────────────────────┤
│ 6. Interactive Breakdown / Spec Explainer Visualization│
├────────────────────────────────────────────────────────┤
│ 7. Advanced Analysis (Monospace Logs / DevTools Tabs)   │
├────────────────────────────────────────────────────────┤
│ 8. Developer API Code Preview (Tabbed Snippets)        │
├────────────────────────────────────────────────────────┤
│ 9. Progressive Documentation (Accordion Specs)        │
├────────────────────────────────────────────────────────┤
│ 10. Related Country / Category Tools Section           │
└────────────────────────────────────────────────────────┘
```

---

## 2. Rationale Behind the Ordering

### Top-down Scanning Path
* **Why the Hero is first:** Developers land on pages from search engines or navigation hubs. They must instantly identify the page's capabilities and verify that the tool is local and private before pasting sensitive payloads.
* **Why the Workbench precedes Results:** The input field is the focal point of the page. It must sit at the top of the viewport.
* **Why results sit directly under the Workbench:** Results must update instantly as the user types or toggles choices. Keeping them close to the input minimizes layout shifting and eye movement.

### Secondary Analysis vs. Primary Results
* **Why details are deferred:** Advanced details (such as hex dumps, JSON AST trees, or developer API curl syntaxes) are secondary. They should not clutter the primary interface but must remain accessible as scrollable details cards.
* **Why docs are at the bottom:** Documentation accordions provide reference specifications. They are static and read-only, serving as a reference after the user has finished interacting with the tool.
