---
title:
  en: URL decoder examples
order: 20
status: draft
---

The value `hello%20world` decodes to `hello world`.

Malformed values such as `%ZZ` should produce a validation error instead of silently changing the input.
