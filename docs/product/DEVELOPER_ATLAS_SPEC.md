# ValidoHub Developer Atlas Foundation Specification (Product Phase 1)

This document establishes the product definition, design guidelines, taxonomy rules, content maturity benchmarks, and AI contribution models to scale ValidoHub into the premier Developer Knowledge Atlas.

---

## 1. Global Information Architecture

To support a scale of over 200 countries and hundreds of developer tools without layout decay, ValidoHub defines a strict, single-parent routing hierarchy:

```
validohub.com/
  ├── en/                         # Locale Root
  │    ├── countries/             # Countries Domain (Portal Index)
  │    │    ├── germany/          # Country Hub (e.g. Germany)
  │    │    └── brazil/
  │    ├── tools/                 # Developer Tools Domain (Validator Index)
  │    │    ├── iban-validator/   # Tool Page (e.g. IBAN Tool)
  │    │    └── jwt-decoder/
  │    ├── identifiers/           # Identifiers Domain (Specs & Mappings)
  │    │    ├── pesel/
  │    │    └── steuer-id/
  │    ├── standards/             # Banking & Tech Standards Domain
  │    │    ├── iban/
  │    │    └── sepa/
  │    ├── authorities/           # Governing Authorities Domain
  │    │    ├── bzst/
  │    │    └── aeat/
  │    └── docs/                  # Documentation & Guides Domain
```

---

## 2. Homepage Specification

The future homepage (`validohub.com/en/`) acts as a curated directory that leads developers to relevant concepts rather than listing links indiscriminately.

### Layout Sections:
1. **Hero Section:** Clear title detailing the purpose: *"Developer Intelligence for Country-Specific Formats, Standards, and Local Conformance."* Includes a global search widget.
2. **Global Search Input:** Autocomplete autocomplete input using `knowledge/search-index.json`.
3. **Featured Standards & Essentials:** Side-by-side lists of primary international banking standards (`IBAN`, `SWIFT`, `SEPA`) and essential country identifiers (`CPF`, `Steuer-IdNr`, `PESEL`).
4. **Browse by Country:** Responsive interactive map crops (SVG cropped highlights) for active premium countries (`germany`, `brazil`, `spain`, `poland`) with status labels.
5. **Featured Workbenches:** Highlight cards for interactive tools (e.g. *German Tax ID Inspector*, *Brazil Pix Validator*).
6. **Maturity & Verification Metrics:** Statistics widget demonstrating graph verification ratios (fetched from `reports/coverage.json` and `reports/statistics.json`).

---

## 3. Canonical Page Types

Every route family must adhere to a standardized layout to ensure user familiarity:

### A. Country Hub Page
- **Purpose:** Centralize domestic compliance rules, local format conventions, and validator references for software engineers.
- **Required Sections:** Flag & Hero header, Local Formats Cheat Sheet, Address Format, Phone Number conventions, Domestic Payments overview, Validation Rules index, Workbench lists, Graph-powered Discovery.

### B. Identifier Page (Future)
- **Purpose:** Document structure, checksum algorithms, validation logic, and regulatory governance of specific identifiers.
- **Required Sections:** Format Spec, Validation Formula, Regex Pattern, Common Errors, Governing Authority link, Associated Workbenches, Active Countries.

### C. Workbench Page (Validator)
- **Purpose:** Provide sandboxed, copy-paste-friendly testing of formats.
- **Required Sections:** Live Form with checksum explanation, Advanced metadata parser, API Copy Snippets, Graph-powered Discovery sidebar, Official Reference Accordions.

---

## 4. Cross-Linking Curation Rules

Cross-linking must map semantic relationships exactly without generating low-value links:

* **Rule 1 (Relevance):** Link to validator workbenches directly from country identifier sections, but never link to generic global tools (like base64 converter) from tax specs.
* **Rule 2 (Authority Hierarchy):** A country page links to its identifiers, which link to their governing authority. The authority links to reference URLs, never homepage-to-homepage.
* **Rule 3 (No Redundant Cycles):** A page must not link to another page multiple times. Shared standard discovery must be grouped in a single `Related Resources` block.

---

## 5. Content Quality Levels (Maturity Model)

We introduce a formal 5-tier maturity model. A page type progresses through reviews by achieving explicit thresholds:

| Maturity Level | Requirements | Example Implementation |
| :--- | :--- | :--- |
| **1. Draft** | Scaffolder generated; initial placeholder content; `verificationStatus: "draft"`. | Greece (Future Scaffold) |
| **2. Basic** | Confirmed locale cheat sheet; basic regex validation rules; `verificationStatus: "researched"`. | Poland (Initial state) |
| **3. Complete** | Manually verified address, phone, and locale rules; stable references linked. | Spain (Current Hub) |
| **4. Premium** | Direct interactive validators integrated; zero placeholder tags. | Germany, Brazil |
| **5. Reference** | 100% sourced graph nodes; full evidence metadata verified; strict review audits. | Germany Hub |

---

## 6. Product Roadmap

### Near-Term:
1. Promote remaining active hubs (Spain, Poland) to Premium.
2. Scaffold and enrich next top European hubs: France (`FR`), Italy (`IT`).
3. Materialize dedicated `identifiers/` spec pages using the graph schemas.

### Medium-Term:
1. Expose public REST API `/api/v2/graph` for external tooling.
2. Integrate interactive sandbox runner inside doc pages.

### Long-Term:
1. Ship Antigravity SDKs (npm/pip) package wrappers.
2. Ship IDE Plugins (VS Code, JetBrains) for realtime regex validation hints.
3. Expose MCP Server (Model Context Protocol) so other AI tools can query ValidoHub.

---

## 7. AI Contribution Guidelines

To ensure the safety and trust of our knowledge platform, AI contributors must follow these boundaries:

- **AI May:** Generate standard address structures; research official regulatory pages; write copy-paste code snippets; suggest keywords/aliases; summarize document PDFs.
- **AI Must Never:** Self-verify status (change `draft` to `verified`); invent URLs or retrieve mock dates; mutate `createdAt` or `updatedAt` without source edits; remove human auditor reviewer tags.

---

## 8. Long-Term Platform Vision

ValidoHub is defined as:
> **"A trusted Developer Atlas for country-specific and country-independent technical knowledge."**

By structuring country conformance details as a connected, validated Knowledge Graph rather than static document blobs, ValidoHub bridges the gap between official regulations and code-level reality, enabling future autonomous code generators to build bulletproof locale engines.
