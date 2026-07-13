# Entity Lifecycle & Review System (V1.0)

This document standardizes the lifecycle stages that every entity in the ValidoHub central knowledge graph goes through.

---

## 1. Lifecycle Stages

```
  ┌──────────────┐      ┌───────────────┐      ┌──────────────┐
  │  1. Draft    │ ───> │  2. Verified  │ ───> │ 3. Deprecated│
  └──────────────┘      └───────────────┘      └──────────────┘
```

---

## 2. Stage Flow Criteria

### A. Draft Stage
* **Description:** Newly added identifiers under development.
* **Status Badge:** `Verification: draft`.
* **Criteria:** Must pass schema validation and parse correctly.

### B. Verified Stage
* **Description:** Stable and officially reviewed specifications.
* **Status Badge:** `Verification: verified`.
* **Criteria:** Fully aligned with official registry standards and audited within the last 365 days.

### C. Deprecated Stage
* **Description:** Retired national identifiers.
* **Status Badge:** `Status: deprecated`.
* **Criteria:** Formally replaced by a new registry standard.
