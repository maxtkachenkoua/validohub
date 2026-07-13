# Component Registry Specification (V1.0)

The Component Registry tracks all available presentation driver modules, their required metadata configurations, and their dependencies.

---

## 1. Registry Definitions

| Driver Module | Required DSL Keys | Dependencies |
| :--- | :--- | :--- |
| **FieldExplorer** | `fields` | None |
| **TemporalEncodingExplorer** | `temporalEncoding` | `FieldExplorer` |
| **ChecksumExplorer** | `checksum` | `FieldExplorer` |
| **Decoder** | `fields`, `decoder` | `FieldExplorer`, `checksum` |
| **KnowledgeGraphViewer** | None | Registry relationships |

---

## 2. Dependency Resolution Logic
When compiling an entity page, the component resolver validates that all required dependencies are satisfied.
* **Validation Rule:** If `ChecksumExplorer` is declared in the layout, the resolver verifies that `checksum` parameters exist in the DSL metadata.
* **Version Fallback:** If a component variant is missing, the resolver falls back to the nearest minor version (e.g. `FieldExplorer@v1.1` falls back to `v1.0`).
* **Conflict Alerts:** If a component fails validation, the build pipeline exits with a descriptive error.
