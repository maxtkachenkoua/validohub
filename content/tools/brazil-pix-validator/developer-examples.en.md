---
title:
  en: Pix developer examples
order: 50
status: draft
---

Implementation checklist for developers:

- Keep a compact canonical payload string for scanners and CRC. Add visual grouping only in UI.
- Compute CRC over the payload ending in `6304`, then append the four uppercase hex digits as tag 63.
- Normalize and validate Pix keys before QR assembly, but do not treat local key validity as DICT proof.
- Preserve field boundaries in logs and QA output: raw payload, parsed TLV rows, offsets, lengths, value paths, CRC input, expected CRC, calculated CRC, and warnings.
- Generate negative fixtures deliberately: bad CRC, missing tag 26.00, missing tag 26.01, wrong currency, wrong country, malformed amount, overlong merchant name, and malformed nested lengths.
- Separate static Pix key QR flows from dynamic URL/location flows. Dynamic Pix depends on PSP/network behavior and cannot be simulated by a static browser-only payload checker.

The developer snapshot on this page is designed to be copied into bug reports or automated fixture reviews. It should describe what the browser proved and, just as importantly, what official systems still need to verify.
