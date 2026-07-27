---
title:
  en: Pix FAQ
order: 30
status: draft
---

Can this prove that a Pix key exists?

No. Browser checks can prove local shape, TLV structure, QR rendering, and CRC consistency. DICT existence, ownership, account status, PSP enrollment, payment initiation, and settlement require official connected systems.

Why does a valid QR still need manual integration review?

BR Code syntax is only one layer. Production code also needs PSP rules, merchant onboarding, limits, error handling, refunds, reconciliation, audit logs, privacy controls, and live status handling outside this page.

Why does the workbench store amount as `34.00` instead of `34,00`?

EMV tag 54 should carry decimal text with a dot. Locale display can show Brazilian formatting elsewhere, but the payload itself should remain compact and scanner-safe.

Should real customer Pix keys be pasted here?

Avoid it when possible. The lab is browser-local, but production teams should still use fixture-safe keys and mask real values in screenshots, logs, tickets, analytics, and exported examples.
