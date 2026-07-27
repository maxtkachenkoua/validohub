---
title:
  en: How Pix validation works
order: 10
status: draft
---

Pix is Brazil's instant-payment scheme operated under Banco Central do Brasil rules. A copy-and-paste Pix QR payload is a BR Code string based on EMV TLV fields: each field has a two-digit tag, a two-digit length, and a value. The most important Pix-specific branch is Merchant Account Information tag 26, where tag 26.00 must identify the Pix GUI (`br.gov.bcb.pix`) and tag 26.01 usually carries the static Pix key.

This workbench keeps all analysis in the browser. It can validate the local shape of CPF, CNPJ, email, phone, and EVP UUID Pix keys; build static BR Code payloads; render scannable QR SVG; parse nested TLV fields; replay CRC16-CCITT-FALSE; compare a payload against a safe fixture; and export a developer JSON snapshot. These checks are useful before fixtures, QA payloads, checkout forms, reconciliation tools, and PSP integration tests reach production systems.

Local validation is intentionally not the same as official verification. A valid key shape or valid QR payload does not prove that the key exists in DICT, that the payee owns it, that a PSP account is active, that settlement will occur, or that a payment request is authorized. Treat ValidoHub output as syntax, structure, and implementation evidence; use official PSP or BCB-connected flows for live existence, ownership, payment, and settlement decisions.
