# Metadata & Relationship Model (V1.0)

This document standardizes graph relationships, trust verification tags, and the metadata structure required for automated AI parsing.

---

## 1. Relationships & Semantic Connections
Relationships are mapped in the central registry database (`knowledge/relationships.json`):
* **`country:*` $\rightarrow$ `identifier:*`:** Declares which countries use this identifier.
* **`identifier:*` $\rightarrow$ `authority:*`:** Identifies the governing body.
* **`workbench:*` $\rightarrow$ `identifier:*`:** Connects the active validation tool.

---

## 2. Provenance & Trust Model
To maintain verification levels, source registry entries declare verification metadata:
* **Verification Status:** `verified` (officially checked), `draft` (unverified).
* **Source Records:** Links to official documents (Ministry of Digital Affairs, statutory acts, ISO documents).

---

## 3. AI-Assisted Auto Generation (Future Proofing)
AI models can generate new entity definitions from official standards by following these rules:
1. **Analyze standard:** Extract length, character set, fields, and checksum math (e.g. from an ISO standard).
2. **Draft config:** Generate the `metadata.json` DSL, relationship records, and markdown content blocks.
3. **Validate:** Compile the drafted entity using the IEE build pipeline, verifying it against the entity schema before merging.
