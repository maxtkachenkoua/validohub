---
title:
  en: PESEL FAQ & Pitfalls
order: 30
status: verified
---

### Common Integration Mistakes
* **Treating Month as 1-12:** Developers often forget the century offset (e.g. +20 for years 2000+). A birth date in 2005-08-12 is encoded as month 28 (`052812...`), which causes parsing errors if not mapped properly.
* **Saving as Integer:** PESEL numbers can have leading zeros (e.g. born in 2000-2009). Saving them as raw integers truncates the leading digit, corrupting the length and validation. Store as `VARCHAR(11)`.
* **Ignoring the Checksum:** Many legacy systems check the 11-digit length only, bypassing checksum validation, allowing typo errors.
