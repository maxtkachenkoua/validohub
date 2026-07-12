# Graph-Powered Discovery Architecture: Platform V2

This document details the design philosophy, ranking algorithms, reverse relationship resolutions, search indexes, and curation rules for the user-facing **Graph-Powered Discovery** features introduced in Platform V2.

---

## 1. Discovery Philosophy

ValidoHub is built as a Developer Knowledge Atlas. Rather than presenting country hubs as isolated articles, Phase 4 establishes semantic links that help developers navigate between countries, validation tools, banking standards, domestic payment systems, and official authorities.

Key constraints:
- **Build-Time Generation:** The Graph remains a build-time database. Only lightweight, compact discovery indexes are compiled into client assets.
- **Visual Identity Preservation:** Spacing, typography, and theme accents remain identical to original designs. Existing manual sections are enriched, never replaced.
- **Semantic Curation:** Internal namespaced IDs are completely hidden from the user; all relationships are rendered using developer-friendly names.

---

## 2. Relationship Curation & Ranking Rules

Every relationship shown on a Country Hub is extracted from the explicit graph nodes:

1. **Identifiers:** Fetches targets of `USES_IDENTIFIER`. If a workbench validates this identifier (e.g. `steuernummer-validator` for `steuer-id` in Germany), the card links directly to that interactive workbench page (`en/germany/steuernummer-validator/`). Otherwise, it remains a non-link card.
2. **Payment Systems:** Fetches targets of `SUPPORTS_PAYMENT_SYSTEM`.
3. **Banking Standards:** Fetches targets of `PARTICIPATES_IN` (e.g. `IBAN`). Links directly to the global validation tool if available (e.g. `en/tools/iban-validator/`).
4. **Authorities:** Fetches all direct publishers (`PUBLISHES_REFERENCE_FOR`) and indirect governors (`GOVERNED_BY` for the country's identifiers and payments).
5. **Workbenches:** Lists all local validators validating the country's identifiers.

---

## 3. Related Countries Similarity Algorithm

The compiler discovers related countries by analyzing shared standards and payment networks in the graph:
- **Shared Standards:** Spain, Poland, and Germany participate in the `IBAN` standard.
- **Shared Payments:** Spain, Poland, and Germany support `SEPA` networks.
- **Ranking:** The compiler groups candidate countries, counts the number of shared standard/payment nodes, sorts them descending by count (breaking ties alphabetically), and limits the UI display to the top 3 most relevant countries (e.g. Spain is related to Germany via `IBAN` and `SEPA`).

---

## 4. Reverse Relationship Resolution (Workbench Pages)

Every workbench page (e.g. PESEL Validator) dynamically references the bidirectional graph edges to display:
- **Validates:** The identifiers or standards validated (e.g. `PESEL`).
- **Supported Countries:** The countries utilizing those identifiers (e.g. `Poland`).
- **Official Authorities:** The entities governing those identifiers (e.g. `ZUS`).
- **Related Standards:** Relevant standards (e.g. `National Identifier`).

---

## 5. Discovery Index Formats

All generated artifacts are written to `knowledge/` using deterministic key and array sorting:

### `country-to-identifiers.json`
```json
{
  "germany": ["Steuer-IdNr", "USt-IdNr"],
  "poland": ["NIP", "PESEL", "REGON"]
}
```

### `search-index.json`
Maps all namespaced entity IDs to title, aliases, keywords, country references, and a relationship summary for instant autocomplete:
```json
{
  "identifier:steuer-id": {
    "title": "Steuer-IdNr",
    "aliases": ["Steueridentifikationsnummer", "IdNr"],
    "keywords": ["identifier", "Steueridentifikationsnummer", "IdNr"],
    "countryReferences": ["germany"],
    "relationshipSummaries": ["governed by BZSt", "used by country Germany", "validated by workbench steuernummer-validator"]
  }
}
```

---

## 6. Future Expansion Strategy

- **Stage A (Germany):** Verified pilot implementation.
- **Stage B (Brazil):** Enabled discovery widgets on Brazil page.
- **Stage C (Spain):** Enabled discovery widgets on Spain page.
- **Stage D (Poland):** Enabled discovery widgets on Poland page.
- **New Countries:** Scaffolded country hubs are initialized as `draft` and only show discovery indexes once they are promoted to `researched` or `verified`.
