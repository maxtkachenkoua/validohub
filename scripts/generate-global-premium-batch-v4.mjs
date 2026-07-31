import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');

const batch = [
  ['oauth-oidc-flow-debugger', 'validohub.oauth-oidc-flow', 'OAuth / OIDC Flow Debugger', 'Auth redirect QA', 'OAUTH', 'Security / Auth', 'Validate OAuth and OpenID Connect redirect flows, PKCE hints, scopes, state, nonce, issuer, and callback handoff without contacting an identity provider.', ['authorize', 'token', 'client_id', 'redirect_uri', 'scope', 'state', 'nonce', 'code_challenge', 'issuer'], ['implicit', 'token=', 'client_secret', 'localhost', 'missing state', 'openid email profile admin'], 'OAuth redirect or token exchange notes', [['happy-path', 'PKCE flow', 'https://auth.example.com/authorize?response_type=code&client_id=web&redirect_uri=https%3A%2F%2Fapp.example.com%2Fcallback&scope=openid%20profile&state=st_123&nonce=n_123&code_challenge=abc&code_challenge_method=S256'], ['implicit-risk', 'Implicit risk', 'https://auth.example.com/authorize?response_type=token&client_id=web&redirect_uri=http%3A%2F%2Flocalhost%2Fcallback&scope=openid%20email%20admin']]],
  ['jwt-risk-scanner', 'validohub.jwt-risk-scanner', 'JWT Risk Scanner', 'Claim risk QA', 'JWT!', 'Security / Auth', 'Scan JWT headers and claims for weak algorithms, missing audience, expired tokens, oversized scopes, issuer drift, and browser-only verification boundaries.', ['alg', 'typ', 'iss', 'aud', 'sub', 'exp', 'iat', 'scope', 'kid'], ['"alg":"none"', '"alg":"HS256"', 'admin', 'exp":0', 'password', 'secret'], 'JWT or decoded claims JSON', [['rs-token', 'RS token claims', '{"alg":"RS256","kid":"billing-2026"}\n{"iss":"https://auth.example.com","aud":"billing-api","sub":"usr_123","scope":"invoice:read","exp":1900000000}'], ['weak-token', 'Weak claims', '{"alg":"none"}\n{"sub":"usr_123","scope":"admin write:*","exp":0}']]],
  ['jwks-rotation-inspector', 'validohub.jwks-rotation', 'JWKS Rotation Inspector', 'Keyset lifecycle QA', 'JWKS', 'Security / Auth', 'Inspect JWKS key sets for algorithm mix, duplicate kids, legacy keys, use/sig metadata, rotation coverage, and offline verification boundaries.', ['keys', 'kid', 'kty', 'alg', 'use', 'x5c', 'n', 'e'], ['HS256', 'oct', 'duplicate', 'legacy', 'missing kid', 'none'], 'JWKS JSON', [['rotation', 'Two-key rotation', '{"keys":[{"kty":"RSA","kid":"current","alg":"RS256","use":"sig"},{"kty":"RSA","kid":"next","alg":"RS256","use":"sig"}]}'], ['legacy', 'Legacy oct key', '{"keys":[{"kty":"oct","kid":"legacy","alg":"HS256"}]}']]],
  ['openapi-breaking-change-diff', 'validohub.openapi-breaking-diff', 'OpenAPI Breaking Change Diff', 'Contract diff QA', 'APIΔ', 'Backend / API', 'Compare OpenAPI before and after snippets for removed paths, method changes, schema drift, status-code regressions, and client-breaking review items.', ['openapi', 'paths', 'components', 'schemas', 'responses', 'required', 'deprecated'], ['removed', 'delete', 'breaking', 'required', '401', '500'], 'Before OpenAPI snippet', [['safe-add', 'Add endpoint', 'openapi: 3.1.0\npaths:\n  /invoices:\n    get:\n      responses:\n        "200": {description: ok}', 'openapi: 3.1.0\npaths:\n  /invoices:\n    get:\n      responses:\n        "200": {description: ok}\n  /customers:\n    get:\n      responses:\n        "200": {description: ok}'], ['remove-path', 'Removed path', 'paths:\n  /invoices:\n    get: {}\n  /customers:\n    get: {}', 'paths:\n  /invoices:\n    get: {}']]],
  ['json-patch-builder', 'validohub.json-patch-builder', 'JSON Patch Builder', 'RFC 6902 payload QA', 'PATCH', 'Data & Integration', 'Build and inspect JSON Patch operations with add, replace, remove, move, copy, test, pointer safety, and before/after handoff previews.', ['op', 'path', 'value', 'add', 'replace', 'remove', 'test'], ['remove /', 'password', 'secret', 'missing test', 'unsafe path'], 'JSON Patch operations or before payload', [['replace-email', 'Replace field', '[{"op":"test","path":"/status","value":"draft"},{"op":"replace","path":"/status","value":"paid"}]'], ['risky-remove', 'Risky remove', '[{"op":"remove","path":"/customer"},{"op":"replace","path":"/password","value":"secret"}]']]],
  ['json-merge-patch-builder', 'validohub.json-merge-patch-builder', 'JSON Merge Patch Builder', 'RFC 7396 payload QA', 'MERGE', 'Data & Integration', 'Inspect JSON Merge Patch payloads for null deletes, nested object replacement, sparse updates, destructive fields, and API-safe copy output.', ['null', 'status', 'metadata', 'patch', 'merge', 'replace'], ['password', 'secret', '"id": null', '"email": null', 'delete'], 'JSON Merge Patch body', [['status-only', 'Status update', '{"status":"paid","metadata":{"source":"webhook"}}'], ['delete-email', 'Null delete', '{"email":null,"password":"secret"}']]],
  ['rest-pagination-contract-tester', 'validohub.rest-pagination-contract', 'REST Pagination Contract Tester', 'Pagination QA', 'PAGE', 'Backend / API', 'Inspect REST pagination contracts for cursor, limit, next links, ordering stability, total counts, retry windows, and client handoff notes.', ['cursor', 'limit', 'next', 'prev', 'total', 'page', 'per_page', 'Link:'], ['offset', 'missing next', 'unstable sort', 'limit=10000', 'page=1'], 'Pagination response or headers', [['cursor-json', 'Cursor response', '{"data":[{"id":"inv_1"}],"next_cursor":"cur_2","limit":50,"has_more":true}'], ['offset-risk', 'Offset risk', 'GET /items?page=1&limit=10000\n{"data":[],"total":999999}']]],
  ['api-error-code-catalog-builder', 'validohub.api-error-catalog', 'API Error Code Catalog Builder', 'Error taxonomy QA', 'ERRS', 'Backend / API', 'Build and validate API error-code catalogs with stable codes, retryability, HTTP status mapping, localization keys, and support escalation metadata.', ['code', 'status', 'retryable', 'message', 'locale', 'docs', 'type'], ['UNKNOWN', 'Something went wrong', '500', 'stack', 'exception'], 'Error catalog JSON/YAML', [['catalog', 'Stable catalog', '[{"code":"PAYMENT_DECLINED","status":402,"retryable":false,"messageKey":"errors.payment_declined"},{"code":"RATE_LIMITED","status":429,"retryable":true,"messageKey":"errors.rate_limited"}]'], ['thin', 'Thin errors', '{"error":"Something went wrong","status":500}']]],
  ['webhook-replay-payload-builder', 'validohub.webhook-replay-payload', 'Webhook Replay Payload Builder', 'Event fixture QA', 'REPLAY', 'Backend / API', 'Build replayable webhook fixtures with event id, timestamp, signature base string, idempotency hints, retry count, and raw-payload boundaries.', ['event', 'id', 'timestamp', 'signature', 'retry', 'payload', 'webhook'], ['missing id', 'no timestamp', 'secret', 'password', 'duplicate'], 'Webhook event payload', [['invoice-event', 'Invoice event', '{"id":"evt_123","type":"invoice.created","created":"2026-07-29T10:00:00Z","data":{"id":"inv_123","total":12500}}'], ['thin-event', 'Thin event', '{"type":"paid","data":{"password":"secret"}}']]],
  ['idempotency-collision-lab', 'validohub.idempotency-collision-lab', 'Idempotency Collision Lab', 'Retry collision QA', 'IDEM+', 'Backend / API', 'Model idempotency collision cases across keys, payload fingerprints, expiry windows, conflict responses, and duplicate replay handling.', ['Idempotency-Key', 'fingerprint', 'retry', 'conflict', 'expiry', 'payload', 'POST'], ['123', 'same key different body', 'no expiry', 'missing key', 'duplicate charge'], 'Retry scenario text', [['safe-retry', 'Safe retry', 'POST /payments\nIdempotency-Key: idem_cart_123\nBody fingerprint: sha256:abc\nRetry window: 24h\nSame payload on retry'], ['collision', 'Collision', 'Idempotency-Key: 123\nFirst body amount=100\nSecond body amount=200']]],
  ['robots-txt-tester', 'validohub.robots-txt-tester', 'robots.txt Tester', 'Crawler rule QA', 'ROBOTS', 'SEO / Publishing', 'Inspect robots.txt directives for user-agent groups, allow/disallow precedence, sitemap hints, crawl-delay portability, and accidental blocking.', ['User-agent', 'Disallow', 'Allow', 'Sitemap', 'Crawl-delay'], ['Disallow: /', 'noindex', 'private', 'admin', 'staging'], 'robots.txt', [['sane', 'Sane robots', 'User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://validohub.com/sitemap.xml'], ['blocked', 'Blocked site', 'User-agent: *\nDisallow: /']]],
  ['xml-sitemap-inspector', 'validohub.xml-sitemap-inspector', 'XML Sitemap Inspector', 'Indexing map QA', 'SITE', 'SEO / Publishing', 'Inspect XML sitemaps for URL count, loc/lastmod shape, hreflang adjacency, sitemap-index structure, duplicate URLs, and crawl handoff notes.', ['urlset', 'sitemapindex', '<loc>', '<lastmod>', 'hreflang', 'priority'], ['localhost', 'noindex', 'duplicate', '404', 'staging'], 'XML sitemap', [['urlset', 'URL set', '<urlset><url><loc>https://validohub.com/en/tools/</loc><lastmod>2026-07-29</lastmod></url></urlset>'], ['bad-loc', 'Bad loc', '<urlset><url><loc>http://localhost:8140/test</loc></url></urlset>']]],
  ['canonical-hreflang-auditor', 'validohub.canonical-hreflang-auditor', 'Canonical / Hreflang Auditor', 'Locale SEO QA', 'HREF', 'SEO / Publishing', 'Audit canonical and hreflang clusters for x-default, reciprocal alternates, mixed hosts, missing locales, and duplicate canonical drift.', ['canonical', 'hreflang', 'alternate', 'x-default', 'rel=', 'href='], ['localhost', 'staging', 'missing x-default', 'duplicate canonical', 'noindex'], 'HTML head links', [['cluster', 'Locale cluster', '<link rel="canonical" href="https://validohub.com/en/tools/">\n<link rel="alternate" hreflang="en" href="https://validohub.com/en/tools/">\n<link rel="alternate" hreflang="fr" href="https://validohub.com/fr/tools/">\n<link rel="alternate" hreflang="x-default" href="https://validohub.com/en/tools/">'], ['mixed-host', 'Mixed host', '<link rel="canonical" href="http://localhost:8140/en/tools/">']]],
  ['search-snippet-preview', 'validohub.search-snippet-preview', 'Search Snippet Preview', 'SERP copy QA', 'SERP', 'SEO / Publishing', 'Preview title, meta description, slug, canonical, and Open Graph copy length for search-result snippets and localized landing pages.', ['title', 'description', 'canonical', 'og:title', 'slug', 'meta'], ['too long', 'missing description', 'duplicate', 'Untitled', 'localhost'], 'Title and metadata notes', [['good-snippet', 'Good snippet', '<title>IBAN Generator | ValidoHub</title>\n<meta name="description" content="Generate structural IBAN test data locally with MOD-97 evidence, copy-ready output, and no server upload.">'], ['thin-snippet', 'Thin snippet', '<title>Tool</title>']]],
  ['structured-data-json-ld-validator', 'validohub.structured-data-jsonld', 'Structured Data / JSON-LD Validator', 'Schema.org QA', 'LD+J', 'SEO / Publishing', 'Inspect JSON-LD blocks for SoftwareApplication, BreadcrumbList, FAQPage, Article, required fields, invalid JSON, and rich-result boundary notes.', ['@context', '@type', 'SoftwareApplication', 'BreadcrumbList', 'FAQPage', 'name', 'url'], ['not json', 'missing @context', 'localhost', 'reviewRating', 'aggregateRating'], 'JSON-LD script or object', [['software-app', 'Software app', '{"@context":"https://schema.org","@type":"SoftwareApplication","name":"ValidoHub","applicationCategory":"DeveloperApplication","url":"https://validohub.com/en/tools/"}'], ['bad-jsonld', 'Bad JSON-LD', '{"@type":"SoftwareApplication","name":}']]],
  ['csv-schema-inferencer', 'validohub.csv-schema-inferencer', 'CSV Schema Inferencer', 'Import schema QA', 'CSV→S', 'Data Quality', 'Infer column types, required fields, nullability, delimiters, enum candidates, sample values, and fixture JSON from CSV data.', ['id', 'email', 'amount', 'date', 'true', 'false', ',', ';'], ['ragged', 'missing', 'null', 'N/A', 'bad date', 'password'], 'CSV data', [['typed-csv', 'Typed CSV', 'id,email,amount,paid,date\n1,billing@example.com,125.50,true,2026-07-29\n2,support@example.com,88,false,2026-07-30'], ['ragged-csv', 'Ragged CSV', 'id,email,amount\n1,billing@example.com,125\n2,support@example.com']]],
  ['duplicate-row-detector', 'validohub.duplicate-row-detector', 'Duplicate Row Detector', 'Import dedupe QA', 'DUPE', 'Data Quality', 'Detect exact and key-based duplicate rows in CSV, JSONL, and pasted lists, with collision keys, counts, and safe dedupe export notes.', ['id', 'email', 'sku', 'duplicate', 'row', 'hash'], ['same email', 'same id', 'empty', 'duplicate', 'password'], 'CSV, JSONL, or list rows', [['duplicates', 'Duplicate emails', 'id,email,total\n1,billing@example.com,125\n2,billing@example.com,125\n3,support@example.com,88'], ['clean-list', 'Clean list', 'A-001\nA-002\nA-003']]],
  ['unicode-confusable-scanner', 'validohub.unicode-confusable-scanner', 'Unicode Normalizer / Confusable Scanner', 'Text spoofing QA', 'UNI', 'Data Quality', 'Normalize Unicode text, detect mixed scripts, hidden spaces, confusable identifiers, smart punctuation, and copy-safe canonical output.', ['é', 'а', 'Α', 'zero width', 'NFC', 'NFKC', 'ZWSP'], ['\u200b', '\u202e', 'paypal', 'раураl', 'mixed script'], 'Unicode text', [['mixed-script', 'Mixed script', 'раураl.com and paypal.com\nzero\u200bwidth'], ['normal-text', 'Normal text', 'Café → Café, ValidoHub']]],
  ['locale-number-parser', 'validohub.locale-number-parser', 'Locale Number Parser', 'Numeric locale QA', 'NUM', 'Locale / Formats', 'Parse locale-specific number strings, grouping separators, decimal conventions, percent/currency markers, canonical machine value, and ambiguity warnings.', [',', '.', '1 234', '1.234,56', '1,234.56', '%', 'currency'], ['ambiguous', 'NaN', 'mixed', 'bad grouping', '1,234,56'], 'Number strings', [['eu-number', 'EU number', '1.234,56 EUR\n12,5%\n1 000 000,00'], ['mixed-number', 'Mixed separators', '1,234,56']]],
  ['locale-date-parser', 'validohub.locale-date-parser', 'Locale Date Parser', 'Date locale QA', 'DATE', 'Locale / Formats', 'Parse locale date strings, month names, day/month ambiguity, ISO output, timezone hints, and fixture-safe validation notes.', ['2026', '/', '-', 'Jan', 'Feb', 'Mär', 'лип', 'UTC'], ['31/02', '13/13', 'ambiguous', 'invalid', 'DST'], 'Date strings', [['mixed-dates', 'Mixed dates', '29/07/2026\n07/29/2026\n2026-07-29T10:00:00Z'], ['invalid-date', 'Invalid date', '31/02/2026\n13/13/2026']]],
  ['luhn-card-fixture-generator', 'validohub.luhn-card-fixture-generator', 'Card Number Masker / Luhn Fixture Generator', 'Payment test QA', 'LUHN', 'Payments / Fixtures', 'Generate and inspect Luhn-valid test card fixtures, masks, last4 output, brand shape hints, and payment-provider boundary notes.', ['4242', '4111', '5555', '3782', 'luhn', 'card', 'last4'], ['real card', 'cvv', 'password', '4111111111111111', 'live'], 'Card number or fixture request', [['visa-test', 'Visa test', '4242 4242 4242 4242'], ['bad-luhn', 'Bad Luhn', '4242 4242 4242 4241']]],
  ['bin-iin-shape-inspector', 'validohub.bin-iin-shape-inspector', 'BIN / IIN Shape Inspector', 'Card prefix QA', 'BIN', 'Payments / Fixtures', 'Inspect payment card BIN/IIN prefix shape, length, brand hints, mask safety, test-data boundaries, and no-live-issuer lookup notes.', ['BIN', 'IIN', 'Visa', 'Mastercard', 'Amex', '6 digits', '8 digits'], ['real card', 'full PAN', 'issuer lookup', 'cvv', 'live'], 'BIN/IIN or masked PAN', [['bin8', '8-digit BIN', '42424200 **** **** 4242'], ['full-pan', 'Full PAN risk', '4111111111111111 CVV 123']]],
  ['currency-minor-units-checker', 'validohub.currency-minor-units', 'Currency Minor Units Checker', 'Money amount QA', 'ISO4217', 'Payments / Fixtures', 'Inspect currency minor units, decimal precision, integer amount conversion, zero-decimal currencies, and API-safe money payload shape.', ['USD', 'EUR', 'JPY', 'KWD', 'amount', 'minor', 'decimal'], ['floating point', 'too many decimals', 'JPY .00', 'NaN', 'missing currency'], 'Money payload or amount list', [['money-json', 'Money JSON', '{"currency":"JPY","amount":"1250","minorUnits":0}\n{"currency":"KWD","amount":"12.345","minorUnits":3}'], ['bad-money', 'Bad precision', '{"currency":"JPY","amount":"12.34"}']]],
  ['sepa-pain001-fixture-helper', 'validohub.sepa-pain001-fixture', 'SEPA pain.001 Fixture Helper', 'Credit transfer XML QA', 'PAIN', 'Payments / Fixtures', 'Build and inspect SEPA pain.001 credit-transfer fixture structure, debtor/creditor IBANs, amounts, remittance, and bank-status boundary notes.', ['pain.001', 'CstmrCdtTrfInitn', 'PmtInf', 'Dbtr', 'Cdtr', 'IBAN', 'InstdAmt'], ['real account', 'missing IBAN', 'invalid XML', 'live bank', 'password'], 'pain.001 XML or fixture notes', [['pain-fixture', 'pain.001 fixture', '<CstmrCdtTrfInitn><PmtInf><Dbtr><Nm>Demo GmbH</Nm></Dbtr><CdtTrfTxInf><Amt><InstdAmt Ccy="EUR">125.50</InstdAmt></Amt><Cdtr><Nm>Acme SAS</Nm></Cdtr></CdtTrfTxInf></PmtInf></CstmrCdtTrfInitn>'], ['thin-payment', 'Thin payment', '<Payment><Amount>125.50</Amount></Payment>']]],
  ['payment-reference-generator', 'validohub.payment-reference-generator', 'Payment Reference Generator', 'Reference fixture QA', 'REF', 'Payments / Fixtures', 'Generate and inspect structured payment references, invoice references, check-digit hints, remittance text, and provider boundary notes.', ['RF', 'invoice', 'reference', 'remittance', 'check digit', 'payment'], ['real invoice', 'ambiguous', 'too long', 'password', 'secret'], 'Payment reference request', [['rf-reference', 'RF reference', 'Generate RF creditor reference for invoice INV-2026-0042 amount EUR 125.50'], ['ambiguous-ref', 'Ambiguous free text', 'payment for thing']]],
  ['password-policy-tester', 'validohub.password-policy-tester', 'Password Policy Tester', 'Credential policy QA', 'PASS', 'Security / Auth', 'Test password policy rules locally for length, character classes, breached-pattern hints, user-info overlap, entropy approximation, and UX-safe feedback.', ['length', 'uppercase', 'lowercase', 'number', 'symbol', 'entropy', 'password'], ['password', '123456', 'qwerty', 'admin', 'email', 'secret'], 'Password policy and sample', [['strong-ish', 'Strong-ish sample', 'Policy: min 14, require letters numbers symbols\nSample: correct horse battery staple 2026!'], ['weak', 'Weak sample', 'password123']]],
  ['csp-nonce-hash-helper', 'validohub.csp-nonce-hash-helper', 'CSP Nonce / Hash Helper', 'Inline script CSP QA', 'NONCE', 'Security / Browser', 'Generate and inspect CSP nonce and hash policy snippets for inline scripts/styles, strict-dynamic boundaries, and deploy-safe rotation notes.', ['nonce-', 'sha256-', 'script-src', 'style-src', 'strict-dynamic', 'unsafe-inline'], ['unsafe-inline', 'static nonce', 'reuse', '*', 'unsafe-eval'], 'CSP or inline script/style', [['hash-script', 'Hash inline script', '<script>window.__APP_VERSION__="2026.07";</script>'], ['unsafe-inline', 'Unsafe policy', "script-src 'self' 'unsafe-inline' *"]]],
  ['cookie-samesite-lab', 'validohub.cookie-samesite-lab', 'Cookie SameSite Lab', 'Cross-site cookie QA', 'SAME', 'Security / Browser', 'Model SameSite cookie behavior for first-party, cross-site, top-level navigation, iframe, OAuth callback, Secure, HttpOnly, and partitioned-cookie contexts.', ['SameSite', 'Lax', 'Strict', 'None', 'Secure', 'HttpOnly', 'Partitioned'], ['SameSite=None', 'missing Secure', 'third-party', 'iframe', 'Domain=.'], 'Set-Cookie header or scenario', [['oauth-cookie', 'OAuth callback cookie', 'Set-Cookie: __Host-session=abc; Path=/; Secure; HttpOnly; SameSite=Lax\nScenario: top-level OAuth callback'], ['third-party', 'Third-party risk', 'Set-Cookie: sid=abc; SameSite=None']]],
  ['email-header-auth-inspector', 'validohub.email-header-auth-inspector', 'Email Header / SPF-DKIM-DMARC Inspector', 'Email delivery QA', 'MAIL+', 'Security / Email', 'Inspect pasted email headers for SPF, DKIM, DMARC, ARC, alignment hints, authentication-results, forwarding caveats, and no-live-DNS boundaries.', ['Authentication-Results', 'spf=', 'dkim=', 'dmarc=', 'From:', 'Return-Path', 'ARC-Seal'], ['spf=fail', 'dkim=fail', 'dmarc=fail', 'spoof', 'softfail', 'none'], 'Email headers', [['pass-headers', 'Passing headers', 'Authentication-Results: mx.example; spf=pass smtp.mailfrom=example.com; dkim=pass header.d=example.com; dmarc=pass header.from=example.com\nFrom: Billing <billing@example.com>'], ['fail-headers', 'Failing headers', 'Authentication-Results: mx.example; spf=fail; dkim=fail; dmarc=fail\nFrom: Security <security@paypaI.example>']]],
  ['log-redaction-rule-tester', 'validohub.log-redaction-rule-tester', 'Log Redaction Rule Tester', 'Privacy log QA', 'REDACT', 'Security / Ops Premium', 'Test log redaction rules against payloads, verify masked output, detect missed secrets/PII, preserve debugging fields, and export safe examples.', ['redact', 'mask', 'email', 'token', 'authorization', 'password', 'rule'], ['sk_live', 'Bearer ', 'password=', 'email=', 'ssn', 'private key'], 'Logs and redaction rules', [['log-safe', 'Log with secrets', 'Authorization: Bearer sk_live_1234567890abcdef\nemail=billing@example.com\nrequest_id=req_123\nRule: mask authorization and email'], ['clean-log', 'Clean log', 'level=info request_id=req_123 status=200']]],
];

function yamlFor(tool, related) {
  const [slug, algorithmId, title, kicker, mark, group, summary, , , inputLabel] = tool;
  const fieldLines = [
    '      - type: textarea',
    '        name: input',
    '        label:',
    `          en: ${inputLabel}`
  ];
  if (tool[10] && tool[10].some(sample => sample[3])) {
    fieldLines.push(
      '      - type: textarea',
      '        name: changed',
      '        label:',
      '          en: Changed / after payload'
    );
  }
  return [
    'schemaVersion: 1',
    `id: ${slug}`,
    'kind: tool',
    'module: validohub',
    'category: developer-tools',
    'status: active',
    'name:',
    `  en: ${title}`,
    'summary:',
    `  en: ${summary}`,
    'capabilities: [validate, generate, explain, parse]',
    'algorithm:',
    `  algorithmId: ${algorithmId}`,
    'forms:',
    '  validate:',
    '    inputs:',
    ...fieldLines,
    '      - type: select',
    '        name: profile',
    '        label:',
    '          en: Profile',
    '        options:',
    `          - ${group.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    '          - strict',
    '          - review',
    `        default: "${group.toLowerCase().replace(/[^a-z0-9]+/g, '-')}"`,
    '    actions: [validate, generate, explain, parse]',
    'related:',
    `  explicit: [${related.join(', ')}]`,
    '  auto:',
    '    sameCountry: false',
    '    sameCategory: true',
    '    sameCapability: true',
    '    sameModule: true',
    'seo:',
    '  title:',
    `    en: ${title}`,
    '  description:',
    `    en: ${summary}`,
    ''
  ].join('\n');
}

function formEntry(tool) {
  const [slug, algorithmId, , kicker, , group] = tool;
  const hasChanged = tool[10].some(sample => sample[3]);
  const fields = [
    "{ type: 'textarea', name: 'input', label: '" + tool[9].replace(/'/g, "\\'") + "' }"
  ];
  if (hasChanged) fields.push("{ type: 'textarea', name: 'changed', label: 'Changed / after payload' }");
  fields.push("{ type: 'select', name: 'profile', label: 'Profile', options: ['" + group.toLowerCase().replace(/[^a-z0-9]+/g, '-') + "', 'strict', 'review'], value: '" + group.toLowerCase().replace(/[^a-z0-9]+/g, '-') + "' }");
  return `  '${slug}': { id: '${slug}', algorithmId: '${algorithmId}', capability: 'validate', group: '${group}', forms: [{ capability: 'validate', title: '${kicker}', fields: [${fields.join(', ')}], actions: ['validate','parse','generate','explain'] }] },`;
}

function configEntry(tool) {
  const [slug, algorithmId, title, kicker, mark, group, summary, signalWords, riskWords, , samples] = tool;
  const sampleObjects = samples.map(([id, label, input, changed]) => ({
    id,
    label,
    values: changed ? { profile: group.toLowerCase().replace(/[^a-z0-9]+/g, '-'), input, changed } : { profile: group.toLowerCase().replace(/[^a-z0-9]+/g, '-'), input },
    action: id.includes('bad') || id.includes('risk') || id.includes('weak') || id.includes('thin') || id.includes('fail') || id.includes('blocked') || id.includes('collision') || id.includes('remove') || id.includes('unsafe') || id.includes('delete') ? 'validate' : 'parse'
  }));
  const chips = [group, 'Focused QA', 'Browser only', 'Developer JSON'];
  return `    ['${algorithmId}', { slug: '${slug}', title: ${JSON.stringify(title)}, kind: '${slug}', batch: 'global-4-7', group: '${group}', defaultAction: 'validate', theme: 'developer', mark: '${mark}', kicker: ${JSON.stringify(kicker)}, summary: ${JSON.stringify(summary)}, chips: ${JSON.stringify(chips)}, signalWords: ${JSON.stringify(signalWords)}, riskWords: ${JSON.stringify(riskWords)}, samples: ${JSON.stringify(sampleObjects)} }, globalPremiumBatchHandler],`;
}

function auditEntry(tool) {
  const [slug, , title, , , , , , , , samples] = tool;
  const reviewSample = samples.find(sample => /risk|weak|thin|bad|fail|blocked|collision|unsafe|delete|remove/i.test(sample[0] + sample[1])) || samples[1] || samples[0];
  const keyWord = title.split(/\s+/)[0].replace(/[^\w/-]/g, '');
  return [
    '  {',
    `    path: "/en/tools/${slug}/",`,
    '    input: "textarea, input",',
    `    sampleText: ${JSON.stringify(reviewSample ? reviewSample[1] : null)},`,
    `    mustContain: [${JSON.stringify(keyWord)}, "Field breakdown", "Developer snapshot JSON"],`,
    '  },'
  ].join('\n');
}

function replaceBlock(content, start, end, replacement) {
  const pattern = new RegExp(`${start.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${end.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'm');
  const block = `${start}\n${replacement}\n${end}`;
  return pattern.test(content) ? content.replace(pattern, block) : null;
}

function insertAfter(content, needle, start, end, replacement) {
  const replaced = replaceBlock(content, start, end, replacement);
  if (replaced) return replaced;
  const index = content.indexOf(needle);
  if (index < 0) throw new Error('Missing insertion needle: ' + needle);
  return content.slice(0, index + needle.length) + `\n${start}\n${replacement}\n${end}` + content.slice(index + needle.length);
}

function insertBefore(content, needle, start, end, replacement) {
  const replaced = replaceBlock(content, start, end, replacement);
  if (replaced) return replaced;
  const index = content.indexOf(needle);
  if (index < 0) throw new Error('Missing insertion needle: ' + needle);
  return content.slice(0, index) + `${start}\n${replacement}\n${end}\n` + content.slice(index);
}

async function main() {
  await mkdir(resolve(projectRoot, 'tools'), { recursive: true });
  for (let index = 0; index < batch.length; index += 1) {
    const related = [
      batch[(index + 1) % batch.length][0],
      batch[(index + 2) % batch.length][0],
      batch[(index + 3) % batch.length][0],
      'json-schema-workbench'
    ];
    await writeFile(resolve(projectRoot, 'tools', batch[index][0] + '.yaml'), yamlFor(batch[index], related), 'utf8');
  }

  const buildAllPath = resolve(projectRoot, 'scripts', 'build-all.mjs');
  let buildAll = await readFile(buildAllPath, 'utf8');
  buildAll = insertAfter(
    buildAll,
    'const TOOL_SCRIPT_BY_ALGORITHM = {',
    '  // BEGIN global premium batch v4 scripts',
    '  // END global premium batch v4 scripts',
    batch.map(tool => `  '${tool[1]}': 'generic-suite.js',`).join('\n')
  );
  buildAll = insertAfter(
    buildAll,
    'const GENERIC_UTILITY_WORKBENCHES = {',
    '  // BEGIN global premium batch v4 workbenches',
    '  // END global premium batch v4 workbenches',
    batch.map(formEntry).join('\n')
  );
  await writeFile(buildAllPath, buildAll, 'utf8');

  const buildToolsPath = resolve(projectRoot, 'scripts', 'build-tools-dev.mjs');
  let buildTools = await readFile(buildToolsPath, 'utf8');
  buildTools = insertAfter(
    buildTools,
    'const GENERIC_SUITE_ALGORITHMS = new Set([',
    '  // BEGIN global premium batch v4 algorithms',
    '  // END global premium batch v4 algorithms',
    batch.map(tool => `  "${tool[1]}",`).join('\n')
  );
  await writeFile(buildToolsPath, buildTools, 'utf8');

  const suitePath = resolve(projectRoot, 'assets', 'js', 'tools', 'generic-suite.js');
  let suite = await readFile(suitePath, 'utf8');
  suite = insertBefore(
    suite,
    '  ];\n\n  configs.forEach',
    '    // BEGIN global premium batch v4 configs',
    '    // END global premium batch v4 configs',
    batch.map(configEntry).join('\n')
  );
  await writeFile(suitePath, suite, 'utf8');

  const auditPath = resolve(projectRoot, 'scripts', 'audit-global-tools-premium.mjs');
  let audit = await readFile(auditPath, 'utf8');
  audit = insertBefore(
    audit,
    '];\n\nfunction selectedSlugs',
    '  // BEGIN global premium batch v4 audit routes',
    '  // END global premium batch v4 audit routes',
    batch.map(auditEntry).join('\n')
  );
  await writeFile(auditPath, audit, 'utf8');

  const spec = [
    '# Global Premium Tools Batch V4',
    '',
    'Batch V4 adds 30 focused browser-only global workbenches across auth, API contracts, SEO, data quality, locale formats, payments, and security operations.',
    '',
    ...batch.map((tool, index) => `${index + 1}. ${tool[2]} - ${tool[6]}`),
    '',
    'Each route uses the shared generic-suite premium shell with success and review samples, local result cards, replay pipeline, field breakdown, quality notes, Developer snapshot JSON, and copy/download-ready JSON. Live OAuth introspection, issuer verification, DNS lookups, card network lookup, bank execution, crawler fetching, and external validation remain explicit production boundaries.',
    ''
  ].join('\n');
  await writeFile(resolve(projectRoot, 'docs', 'product', 'GLOBAL_PREMIUM_TOOLS_BATCH_V4_SPEC.md'), spec, 'utf8');

  console.log(`Generated ${batch.length} global premium batch v4 tools.`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
