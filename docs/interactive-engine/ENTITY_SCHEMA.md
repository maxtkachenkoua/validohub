# Entity Schema Validation (V1.0)

To ensure compile-time stability, every metadata configuration is validated against this schema during build runs.

---

## 1. Schema Validation Rules

### A. Format Integrity
- **Identifier Length:** Must be a positive integer.
- **Fields Positions:** Must not overlap and must fit within the total identifier length.
- **Required Fields:** Every identifier requires at least a name, country reference, and length parameter.

### B. Algorithm Safety
- **Weights Alignment:** If using a weighted checksum, the weights array length must match `length - 1`.
- **Known Algorithms:** The `checksum.algorithm` must match a supported engine plugin (e.g. `weighted-mod10`, `weighted-mod11`, `luhn`, `verhoeff`).

---

## 2. JSON Schema Definition
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "ValidoHubIdentifier",
  "type": "OBJECT",
  "properties": {
    "name": { "type": "STRING" },
    "country": { "type": "STRING" },
    "length": { "type": "INTEGER" },
    "fields": {
      "type": "ARRAY",
      "items": {
        "properties": {
          "id": { "type": "STRING" },
          "positions": {
            "type": "ARRAY",
            "items": { "type": "INTEGER" }
          }
        }
      }
    }
  },
  "required": ["name", "country", "length", "fields"]
}
```
Validation runs occur automatically at the start of the build pipeline, preventing compilation of broken definitions.
