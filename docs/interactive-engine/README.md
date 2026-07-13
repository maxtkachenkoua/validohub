# Interactive Entity Engine (IEE) V1.0

The Interactive Entity Engine (IEE) is the core compiler and runtime framework of ValidoHub. It replaces static documentation pages with declarative, interactive playgrounds.

---

## 1. Engine Objectives
The engine is built around three core architectural values:
1. **Metadata-Driven Execution:** New pages are added by creating DSL definitions and content markdown files. No UI code is written.
2. **Zero Code Duplication:** Interactive visualizers, checksum calculators, timelines, and decoders are shared component drivers that adapt their behavior dynamically based on metadata configurations.
3. **Decoupled Architecture:** Presentation layout schemas, logic engines, and metadata are cleanly separated.

---

## 2. Directory Roadmap

The documentation is split into the following modular files:

| File Name | Purpose / Contents |
| :--- | :--- |
| [README.md](file:///Users/maxtkachenko/work/validohub/docs/interactive-engine/README.md) | Introduction, goals, and directory roadmap. |
| [ENGINE_ARCHITECTURE.md](file:///Users/maxtkachenko/work/validohub/docs/interactive-engine/ENGINE_ARCHITECTURE.md) | Central design patterns, component registries, versioning, and themes. |
| [DSL_SPECIFICATION.md](file:///Users/maxtkachenko/work/validohub/docs/interactive-engine/DSL_SPECIFICATION.md) | YAML/JSON specification format for mapping identifiers, fields, and algorithms. |
| [ENTITY_SCHEMA.md](file:///Users/maxtkachenko/work/validohub/docs/interactive-engine/ENTITY_SCHEMA.md) | Validation rules for verifying IEE metadata configurations. |
| [COMPONENT_REGISTRY.md](file:///Users/maxtkachenko/work/validohub/docs/interactive-engine/COMPONENT_REGISTRY.md) | Available components (e.g. FieldExplorer, ChecksumExplorer) and dependencies. |
| [RENDERING_PIPELINE.md](file:///Users/maxtkachenko/work/validohub/docs/interactive-engine/RENDERING_PIPELINE.md) | Lifecycle stages of compilation (DSL load $\rightarrow$ component resolution $\rightarrow$ HTML output). |
| [METADATA_MODEL.md](file:///Users/maxtkachenko/work/validohub/docs/interactive-engine/METADATA_MODEL.md) | Graph relationship mapping, provenance tags, and AI auto-generation models. |
| [PLUGIN_SYSTEM.md](file:///Users/maxtkachenko/work/validohub/docs/interactive-engine/PLUGIN_SYSTEM.md) | Mathematical plugin model specifications for checksum calculators. |
| [ENTITY_LIFECYCLE.md](file:///Users/maxtkachenko/work/interactive-engine/ENTITY_LIFECYCLE.md) | Stage flow criteria for drafts, verification, and deprecation. |
| [AUTHORING_GUIDE.md](file:///Users/maxtkachenko/work/validohub/docs/interactive-engine/AUTHORING_GUIDE.md) | Guidelines for adding new entities in under 10 minutes. |
| [ANTI_PATTERNS.md](file:///Users/maxtkachenko/work/validohub/docs/interactive-engine/ANTI_PATTERNS.md) | Code and layout pitfalls to avoid. |
| [ADR_INTERACTIVE_ENGINE.md](file:///Users/maxtkachenko/work/validohub/docs/interactive-engine/ADR_INTERACTIVE_ENGINE.md) | Architecture Decision Record justifying declarative generation. |
