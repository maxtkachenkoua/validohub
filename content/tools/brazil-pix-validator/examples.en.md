---
title:
  en: Pix examples
order: 20
status: draft
---

Common checks to run before shipping a Pix integration:

- Paste an email Pix key such as `payments@example.com` and confirm it normalizes as an email key, not as a BR Code payload.
- Paste CPF and CNPJ fixture keys and verify that invalid check digits fail before the values are allowed into QR generation.
- Generate a static QR payload with amount, merchant name, city, TXID, and optional description; then inspect tag 54, tag 59, tag 60, tag 62.05, and tag 63.
- Use Break CRC to create a negative fixture. The TLV may still parse, but the CRC replay must fail, which is exactly what downstream scanner tests should catch.
- Use Diff sample when a payload looks valid but differs from the safe fixture. The diff highlights changed merchant, key, amount, city, TXID, and description branches without requiring a debugger.

Good Pix QA suites should contain at least one valid static BR Code, one bad CRC payload, one malformed TLV length payload, one valid key-only sample, and one key shape that looks plausible but fails CPF/CNPJ checksum or email/phone syntax.
