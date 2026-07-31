# Global Premium Tools Batch V4

Batch V4 adds 30 focused browser-only global workbenches across auth, API contracts, SEO, data quality, locale formats, payments, and security operations.

1. OAuth / OIDC Flow Debugger - Validate OAuth and OpenID Connect redirect flows, PKCE hints, scopes, state, nonce, issuer, and callback handoff without contacting an identity provider.
2. JWT Risk Scanner - Scan JWT headers and claims for weak algorithms, missing audience, expired tokens, oversized scopes, issuer drift, and browser-only verification boundaries.
3. JWKS Rotation Inspector - Inspect JWKS key sets for algorithm mix, duplicate kids, legacy keys, use/sig metadata, rotation coverage, and offline verification boundaries.
4. OpenAPI Breaking Change Diff - Compare OpenAPI before and after snippets for removed paths, method changes, schema drift, status-code regressions, and client-breaking review items.
5. JSON Patch Builder - Build and inspect JSON Patch operations with add, replace, remove, move, copy, test, pointer safety, and before/after handoff previews.
6. JSON Merge Patch Builder - Inspect JSON Merge Patch payloads for null deletes, nested object replacement, sparse updates, destructive fields, and API-safe copy output.
7. REST Pagination Contract Tester - Inspect REST pagination contracts for cursor, limit, next links, ordering stability, total counts, retry windows, and client handoff notes.
8. API Error Code Catalog Builder - Build and validate API error-code catalogs with stable codes, retryability, HTTP status mapping, localization keys, and support escalation metadata.
9. Webhook Replay Payload Builder - Build replayable webhook fixtures with event id, timestamp, signature base string, idempotency hints, retry count, and raw-payload boundaries.
10. Idempotency Collision Lab - Model idempotency collision cases across keys, payload fingerprints, expiry windows, conflict responses, and duplicate replay handling.
11. robots.txt Tester - Inspect robots.txt directives for user-agent groups, allow/disallow precedence, sitemap hints, crawl-delay portability, and accidental blocking.
12. XML Sitemap Inspector - Inspect XML sitemaps for URL count, loc/lastmod shape, hreflang adjacency, sitemap-index structure, duplicate URLs, and crawl handoff notes.
13. Canonical / Hreflang Auditor - Audit canonical and hreflang clusters for x-default, reciprocal alternates, mixed hosts, missing locales, and duplicate canonical drift.
14. Search Snippet Preview - Preview title, meta description, slug, canonical, and Open Graph copy length for search-result snippets and localized landing pages.
15. Structured Data / JSON-LD Validator - Inspect JSON-LD blocks for SoftwareApplication, BreadcrumbList, FAQPage, Article, required fields, invalid JSON, and rich-result boundary notes.
16. CSV Schema Inferencer - Infer column types, required fields, nullability, delimiters, enum candidates, sample values, and fixture JSON from CSV data.
17. Duplicate Row Detector - Detect exact and key-based duplicate rows in CSV, JSONL, and pasted lists, with collision keys, counts, and safe dedupe export notes.
18. Unicode Normalizer / Confusable Scanner - Normalize Unicode text, detect mixed scripts, hidden spaces, confusable identifiers, smart punctuation, and copy-safe canonical output.
19. Locale Number Parser - Parse locale-specific number strings, grouping separators, decimal conventions, percent/currency markers, canonical machine value, and ambiguity warnings.
20. Locale Date Parser - Parse locale date strings, month names, day/month ambiguity, ISO output, timezone hints, and fixture-safe validation notes.
21. Card Number Masker / Luhn Fixture Generator - Generate and inspect Luhn-valid test card fixtures, masks, last4 output, brand shape hints, and payment-provider boundary notes.
22. BIN / IIN Shape Inspector - Inspect payment card BIN/IIN prefix shape, length, brand hints, mask safety, test-data boundaries, and no-live-issuer lookup notes.
23. Currency Minor Units Checker - Inspect currency minor units, decimal precision, integer amount conversion, zero-decimal currencies, and API-safe money payload shape.
24. SEPA pain.001 Fixture Helper - Build and inspect SEPA pain.001 credit-transfer fixture structure, debtor/creditor IBANs, amounts, remittance, and bank-status boundary notes.
25. Payment Reference Generator - Generate and inspect structured payment references, invoice references, check-digit hints, remittance text, and provider boundary notes.
26. Password Policy Tester - Test password policy rules locally for length, character classes, breached-pattern hints, user-info overlap, entropy approximation, and UX-safe feedback.
27. CSP Nonce / Hash Helper - Generate and inspect CSP nonce and hash policy snippets for inline scripts/styles, strict-dynamic boundaries, and deploy-safe rotation notes.
28. Cookie SameSite Lab - Model SameSite cookie behavior for first-party, cross-site, top-level navigation, iframe, OAuth callback, Secure, HttpOnly, and partitioned-cookie contexts.
29. Email Header / SPF-DKIM-DMARC Inspector - Inspect pasted email headers for SPF, DKIM, DMARC, ARC, alignment hints, authentication-results, forwarding caveats, and no-live-DNS boundaries.
30. Log Redaction Rule Tester - Test log redaction rules against payloads, verify masked output, detect missed secrets/PII, preserve debugging fields, and export safe examples.

Each route uses the shared generic-suite premium shell with success and review samples, local result cards, replay pipeline, field breakdown, quality notes, Developer API preview, and copy/download-ready JSON. Live OAuth introspection, issuer verification, DNS lookups, card network lookup, bank execution, crawler fetching, and external validation remain explicit production boundaries.
