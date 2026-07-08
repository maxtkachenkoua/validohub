---
title:
  en: How JWT decoding works
order: 10
status: draft
---

A JSON Web Token contains Base64URL-encoded sections separated by dots.

Decoding can show the header and payload, but signature verification requires trusted keys and should be treated separately from inspection.
