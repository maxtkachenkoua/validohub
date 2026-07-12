# Workbench Design Guide (V1.0)

The Workbench is the focal interactive playground of any ValidoHub tool. It houses input elements, presets, historical runs, and primary action buttons.

---

## 1. Grid Alignment Blueprint

To maintain design system layout consistency, the Workbench follows a strict CSS Grid structure:

```css
.field-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
```

* **Presets (Column 1):** Occupies the first grid cell.
* **History (Column 2):** Occupies the second grid cell.
* **Primary Text Area:** Set to span both columns (`grid-column: 1 / -1`), sitting directly below the controls.

---

## 2. Component Guidelines

### Presets Dropdown
* **Naming:** Target select uses id `#pesel-presets` or equivalent.
* **Behavior:** Selecting an option immediately overwrites the input area and triggers a validation run.
* **Placeholder:** Always default to `-- Select Preset --` or equivalent.

### History Dropdown
* **Storage:** Persistent locally via `localStorage` (e.g. `validohub.pesel.history`).
* **Format:** Stores up to 20 recent runs.
* **Clear Action:** A compact, flat clear button (`pesel-clear-history-btn`) is placed next to the History label header to clear the list.

### Workbench Input Options
* **Live Mode:** Validates automatically as the user types, using a 250ms debounce to prevent layout thrashing.
* **Default Values:** New sessions should display the sandbox empty state card rather than filling fields with hardcoded values.

---

## 3. Keyboard Shortcuts

Every workbench must bind the following keyboard events:
* **Focus Command:** Pressing `/` focuses the primary input.
* **Clear Command:** `Ctrl + L` or `Cmd + L` clears the input and resets results.
* **Copy Output Command:** `Ctrl + C` or `Cmd + C` copies the current output.
