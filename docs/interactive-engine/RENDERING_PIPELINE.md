# Rendering & Compilation Pipeline (V1.0)

This document standardizes the sequence of compilation steps during site generation.

---

## 1. Compilation Lifecycle Sequence

```
  ┌──────────────────────────────────────┐
  │ 1. DSL Loader & YAML Parse           │
  └──────────────────┬───────────────────┘
                     ▼
  ┌──────────────────────────────────────┐
  │ 2. Schema Validation (ENTITY_SCHEMA) │
  └──────────────────┬───────────────────┘
                     ▼
  ┌──────────────────────────────────────┐
  │ 3. Relationship Index Resolver       │
  └──────────────────┬───────────────────┘
                     ▼
  ┌──────────────────────────────────────┐
  │ 4. Component Dependencies Resolve    │
  └──────────────────┬───────────────────┘
                     ▼
  ┌──────────────────────────────────────┐
  │ 5. Template Assembly & Slot Inject   │
  └──────────────────┬───────────────────┘
                     ▼
  ┌──────────────────────────────────────┐
  │ 6. Output Generation & Path Write    │
  └──────────────────────────────────────┘
```

---

## 2. Pipeline Execution Steps

### Step 1: DSL Loader
Parses raw configuration files (`metadata.json` or `.yaml`) and markdown content files under the entity content folder.

### Step 2: Schema Validation
Validates metadata layouts, weights alignments, and field definitions to prevent compile-time failures.

### Step 3: Relationship Index Resolver
Queries `relationships.json` and updates local connections dynamically, resolving authorities, country portals, and validator links.

### Step 4: Component Dependencies Resolve
Resolves component drivers and versions, verifying that all dependencies (e.g. `checksum` parameters for `ChecksumExplorer`) are met.

### Step 5: Template Assembly
Loads the reusable template (`templates/identifier.template.html`), replaces variable placeholders, and injects HTML modules.

### Step 6: Output Generation
Writes the final compiled, static, deterministic file directly to the output route folder.
