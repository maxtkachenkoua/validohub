# UX Principles & Guidelines (V1.0)

ValidoHub UI and UX are designed to help developers validate, decode, and troubleshoot structures as efficiently as possible. We follow strict UX guidelines to ensure the platform feels professional and utility-first.

---

## 1. Usability Guidelines

### A. Reduce Cognitive Load
Developers land on ValidoHub in the middle of a task. The page should not require reading paragraphs of text or configuring complex options to get a simple validation result.
* **Why:** The interface should guide the user's eye naturally from the input area down to the results. Color-coded validation states draw focus to errors.

### B. Make Primary Actions Obvious
The action buttons (e.g. Format, Validate, Decode, Clear) must be clearly separated and placed predictably below the input area.
* **Why:** Clear button hierarchies prevent accidental clicks. Primary actions use the primary button style (`button-primary`), while secondary/clear actions use the secondary ghost style (`button-secondary`).

### C. No Decorative Widgets
Every icon, badge, visualization, and line must serve a purpose. Do not add decorative layouts, generic vector graphics, or non-functional charts.
* **Why:** Unnecessary elements clutter the interface. Every visual element must convey meaning.

### D. Minimize Scrolling
The canonical layout aligns inputs and primary results on a single screen without requiring vertical scrolling.
* **Why:** Developers scan pages quickly. Forcing users to scroll to see validation results is inefficient.

### E. Avoid Duplicated Information
Do not display the same error message, statistics, or status in multiple places.
* **Why:** Duplicate feedback causes confusion. Keep validation errors grouped together inside the results panel.

---

## 2. Visualization Guidelines

Visualizations must explain how a format works.
* **Breakdown Legends:** Use legends that map directly to input segments. Hovering over a segment (like the year segment in a PESEL card) should highlight both the input characters and the explanation text.
* **Calculation Matrices:** Use matrices to display math steps, showing weights and products clearly.
* **Tree Inspectors:** Tree visualizations should be interactive, allowing users to expand, collapse, and filter nodes to explore deep structures.
