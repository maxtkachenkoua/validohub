---
title:
  en: JWT decoder FAQ
order: 30
status: draft
---

Decoding a JWT does not prove it is valid or trusted. Anyone can Base64URL-decode the header and payload.

Sensitive tokens should not be pasted into tools unless the processing model is trusted.
