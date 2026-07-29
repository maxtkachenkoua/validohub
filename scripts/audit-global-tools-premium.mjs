import { chromium } from "playwright";

const DEFAULT_BASE = "http://127.0.0.1:8093";
const baseArgIndex = process.argv.indexOf("--base");
const baseUrl = baseArgIndex >= 0 ? process.argv[baseArgIndex + 1] : DEFAULT_BASE;

const routes = [
  {
    path: "/en/tools/",
    input: null,
    sampleText: null,
    mustContain: ["High-signal starting points", "Phone E.164", "Webhook Signature", "Grouped by integration job"],
  },
  {
    path: "/en/tools/json-formatter/",
    input: "textarea, input",
    sampleText: "Secret scan payload",
    mustContain: ["Path, schema, and fixture intelligence", "Inferred schema preview", "Secret scan"],
  },
  {
    path: "/en/tools/jwt-decoder/",
    input: "textarea, input",
    sampleText: "Unsigned Token",
    mustContain: ["JWT security and claim intelligence", "Registered claims", "Security checklist"],
  },
  {
    path: "/en/tools/base64-decoder/",
    input: "textarea, input",
    sampleText: "Decode data URI",
    mustContain: ["Base64 byte and payload intelligence", "Byte signature", "Data URI"],
  },
  {
    path: "/en/tools/url-encoder/",
    input: "textarea, input",
    sampleText: "Full URL with redirect",
    mustContain: ["Full URL and query intelligence", "Query params", "Security hints"],
  },
  {
    path: "/en/tools/regex-tester/",
    input: "textarea, input",
    sampleText: "Named groups",
    mustContain: ["Flag audit", "Replacement preview", "Field breakdown"],
  },
  {
    path: "/en/tools/uuid-generator/",
    input: "textarea, input",
    sampleText: null,
    mustContain: ["UUID", "version", "variant"],
  },
  {
    path: "/en/tools/iban-validator/",
    input: "textarea, input",
    sampleText: "Invalid",
    mustContain: ["MOD-97", "field breakdown", "Developer API preview"],
  },
  {
    path: "/en/tools/iban-generator/",
    input: "textarea, input",
    sampleText: "Bad country prefix",
    mustContain: ["Generated IBAN", "MOD-97", "Developer API preview"],
  },
  {
    path: "/en/tools/phone-e164-workbench/",
    input: "textarea, input",
    sampleText: "Wrong prefix",
    mustContain: ["E.164", "Field breakdown", "Developer API preview"],
  },
  {
    path: "/en/tools/postal-code-workbench/",
    input: "textarea, input",
    sampleText: "Invalid sample",
    mustContain: ["Postal", "Field breakdown", "Developer API preview"],
  },
  {
    path: "/en/tools/swift-bic-workbench/",
    input: "textarea, input",
    sampleText: "Bad country prefix",
    mustContain: ["BIC", "Field breakdown", "Developer API preview"],
  },
  {
    path: "/en/tools/mrz-passport-workbench/",
    input: "textarea, input",
    sampleText: "Invalid checksum",
    mustContain: ["MRZ", "Field breakdown", "Developer API preview"],
  },
  {
    path: "/en/tools/csv-locale-normalizer/",
    input: "textarea, input",
    sampleText: "Invalid row",
    mustContain: ["CSV", "Field breakdown", "Developer API preview"],
  },
  {
    path: "/en/tools/eu-vat-number-workbench/",
    input: "textarea, input",
    sampleText: "Bad country prefix",
    mustContain: ["VAT", "VIES", "Developer API preview"],
  },
  {
    path: "/en/tools/iso20022-sepa-inspector/",
    input: "textarea, input",
    sampleText: "Invalid XML",
    mustContain: ["ISO 20022", "Field breakdown", "Developer API preview"],
  },
  {
    path: "/en/tools/secret-pii-redactor/",
    input: "textarea, input",
    sampleText: "Secrets + PII",
    mustContain: ["Secret", "Redacted", "Developer API preview"],
  },
  {
    path: "/en/tools/locale-test-data-generator/",
    input: "textarea, input",
    sampleText: "Brazil CSV",
    mustContain: ["Locale", "Fixtures ready", "Developer API preview"],
  },
  {
    path: "/en/tools/webhook-signature-verifier/",
    input: "textarea, input",
    sampleText: "Invalid signature",
    mustContain: ["Webhook", "Signature mismatch", "Developer API preview"],
  },
  {
    path: "/en/tools/json-schema-workbench/",
    input: "textarea, input",
    sampleText: "Missing required",
    mustContain: ["JSON","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/openapi-inspector/",
    input: "textarea, input",
    sampleText: "Missing info",
    mustContain: ["OpenAPI","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/yaml-toml-workbench/",
    input: "textarea, input",
    sampleText: "Bad indent",
    mustContain: ["YAML","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/xml-xpath-workbench/",
    input: "textarea, input",
    sampleText: "Invalid XML",
    mustContain: ["XML","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/csv-profiler/",
    input: "textarea, input",
    sampleText: "Ragged row",
    mustContain: ["CSV","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/sql-query-inspector/",
    input: "textarea, input",
    sampleText: "Dangerous DELETE",
    mustContain: ["SQL","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/cron-expression-workbench/",
    input: "textarea, input",
    sampleText: "Invalid cron",
    mustContain: ["Cron","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/regex-explainer-generator/",
    input: "textarea, input",
    sampleText: "ReDoS risk",
    mustContain: ["Regex","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/date-timezone-workbench/",
    input: "textarea, input",
    sampleText: "Invalid date",
    mustContain: ["Date","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/color-contrast-token-workbench/",
    input: "textarea, input",
    sampleText: "Low contrast",
    mustContain: ["Color","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/markdown-mdx-inspector/",
    input: "textarea, input",
    sampleText: "Broken anchor",
    mustContain: ["Markdown","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/graphql-workbench/",
    input: "textarea, input",
    sampleText: "Bad variables",
    mustContain: ["GraphQL","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/email-domain-workbench/",
    input: "textarea, input",
    sampleText: "Invalid email",
    mustContain: ["Email","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/user-agent-client-hints-parser/",
    input: "textarea, input",
    sampleText: "Bot UA",
    mustContain: ["User-Agent","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/http-security-headers-inspector/",
    input: "textarea, input",
    sampleText: "Weak CORS",
    mustContain: ["HTTP","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/jwt-jwk-oauth-inspector/",
    input: "textarea, input",
    sampleText: "JWKS keys",
    mustContain: ["JWT","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/csp-builder-auditor/",
    input: "textarea, input",
    sampleText: "Unsafe CSP",
    mustContain: ["CSP","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/cookie-security-inspector/",
    input: "textarea, input",
    sampleText: "Weak cookie",
    mustContain: ["Cookie","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/url-redirect-utm-workbench/",
    input: "textarea, input",
    sampleText: "Campaign URL",
    mustContain: ["URL","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/http-message-diff-inspector/",
    input: "textarea, input",
    sampleText: "Status change",
    mustContain: ["HTTP","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/jsonpath-jmespath-workbench/",
    input: "textarea, input",
    sampleText: "Missing path",
    mustContain: ["JSONPath","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/avro-protobuf-schema-inspector/",
    input: "textarea, input",
    sampleText: "Protobuf schema",
    mustContain: ["Avro","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/ndjson-log-parser-workbench/",
    input: "textarea, input",
    sampleText: "Malformed line",
    mustContain: ["NDJSON","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/diff-patch-workbench/",
    input: "textarea, input",
    sampleText: "Text diff",
    mustContain: ["Diff","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/base64-binary-payload-inspector/",
    input: "textarea, input",
    sampleText: "JWT part",
    mustContain: ["Base64","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/secret-scanner-workbench/",
    input: "textarea, input",
    sampleText: "Clean config",
    mustContain: ["Secret","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/tls-certificate-inspector/",
    input: "textarea, input",
    sampleText: "Expired dates",
    mustContain: ["TLS","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/dns-record-workbench/",
    input: "textarea, input",
    sampleText: "Weak SPF",
    mustContain: ["DNS","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/spf-dmarc-builder/",
    input: "textarea, input",
    sampleText: "Reject policy",
    mustContain: ["SPF","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/sri-hash-integrity-inspector/",
    input: "textarea, input",
    sampleText: "Integrity attr",
    mustContain: ["SRI","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/kubernetes-yaml-inspector/",
    input: "textarea, input",
    sampleText: "Risky deployment",
    mustContain: ["Kubernetes","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/dockerfile-auditor/",
    input: "textarea, input",
    sampleText: "Root latest",
    mustContain: ["Dockerfile","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/github-actions-workflow-inspector/",
    input: "textarea, input",
    sampleText: "Danger trigger",
    mustContain: ["GitHub","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/terraform-hcl-plan-inspector/",
    input: "textarea, input",
    sampleText: "Destroy risk",
    mustContain: ["Terraform","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/nginx-apache-config-inspector/",
    input: "textarea, input",
    sampleText: "Proxy risk",
    mustContain: ["NGINX","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/prompt-injection-scanner/",
    input: "textarea, input",
    sampleText: "Injection doc",
    mustContain: ["Prompt","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/rag-chunking-workbench/",
    input: "textarea, input",
    sampleText: "Long doc",
    mustContain: ["RAG","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/vector-metadata-schema-inspector/",
    input: "textarea, input",
    sampleText: "PII metadata",
    mustContain: ["Vector","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/jsonl-finetune-dataset-inspector/",
    input: "textarea, input",
    sampleText: "Bad JSONL",
    mustContain: ["JSONL","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/eval-dataset-builder/",
    input: "textarea, input",
    sampleText: "Thin eval",
    mustContain: ["Eval","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/rest-error-contract-inspector/",
    input: "textarea, input",
    sampleText: "Thin error",
    mustContain: ["REST","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/idempotency-key-workbench/",
    input: "textarea, input",
    sampleText: "Weak key",
    mustContain: ["Idempotency","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/rate-limit-header-inspector/",
    input: "textarea, input",
    sampleText: "Missing retry",
    mustContain: ["Rate","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/cors-policy-workbench/",
    input: "textarea, input",
    sampleText: "Wildcard creds",
    mustContain: ["CORS","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/websocket-sse-message-inspector/",
    input: "textarea, input",
    sampleText: "Bad JSON frame",
    mustContain: ["WebSocket","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/html-meta-seo-inspector/",
    input: "textarea, input",
    sampleText: "SEO thin",
    mustContain: ["HTML","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/accessibility-snapshot-inspector/",
    input: "textarea, input",
    sampleText: "A11Y risk",
    mustContain: ["Accessibility","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/design-token-inspector/",
    input: "textarea, input",
    sampleText: "Duplicate tokens",
    mustContain: ["Design","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/source-map-stack-trace-parser/",
    input: "textarea, input",
    sampleText: "Missing release",
    mustContain: ["Source","Field breakdown","Developer API preview"],
  },
  {
    path: "/en/tools/browser-storage-inspector/",
    input: "textarea, input",
    sampleText: "Token storage",
    mustContain: ["Browser","Field breakdown","Developer API preview"],
  },
];

function selectedSlugs() {
  const index = process.argv.indexOf("--slugs");
  const inline = process.argv.find(arg => arg.startsWith("--slugs="));
  const raw = inline ? inline.slice("--slugs=".length) : (index >= 0 ? process.argv[index + 1] || "" : "");
  return raw.split(",").map(item => item.trim()).filter(Boolean);
}

function routeSlug(path) {
  return String(path || "").replace(/^\/en\/tools\//, "").replace(/\/$/, "");
}

const requestedSlugs = selectedSlugs();
const auditedRoutes = requestedSlugs.length
  ? routes.filter(route => requestedSlugs.includes(routeSlug(route.path)))
  : routes;

if (requestedSlugs.length && auditedRoutes.length !== requestedSlugs.length) {
  const found = new Set(auditedRoutes.map(route => routeSlug(route.path)));
  const missing = requestedSlugs.filter(slug => !found.has(slug));
  if (missing.length) {
    console.error("Global premium audit unknown --slugs: " + missing.join(", "));
    process.exit(1);
  }
}

function url(path) {
  return new URL(path, baseUrl).toString();
}

async function clickSample(page, label) {
  if (!label) return false;
  const selects = page.locator("select");
  const selectCount = await selects.count();
  for (let index = 0; index < selectCount; index++) {
    const candidate = selects.nth(index);
    const option = candidate.locator("option", { hasText: label }).first();
    if (await option.count()) {
      await candidate.selectOption({ label });
      return true;
    }
  }
  const chip = page.getByRole("button", { name: new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") }).first();
  if (await chip.count()) {
    await chip.click();
    return true;
  }
  return false;
}

async function runPrimary(page) {
  const button = page.locator(".button-row button").filter({ hasText: /^(Validate|Inspect|Generate|Encode|Decode|Format|Parse)$/i }).first();
  if (await button.count()) {
    await button.click();
  }
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
const failures = [];

for (const route of auditedRoutes) {
  await page.goto(url(route.path), { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(400);

  if (route.sampleText) {
    const applied = await clickSample(page, route.sampleText);
    if (!applied) {
      failures.push(`${route.path}: sample not found: ${route.sampleText}`);
    }
  }

  await runPrimary(page);
  await page.waitForTimeout(800);
  const text = await page.locator("body").innerText();

  const lowerText = text.toLowerCase();
  for (const expected of route.mustContain) {
    if (!lowerText.includes(expected.toLowerCase())) {
      failures.push(`${route.path}: missing premium evidence "${expected}"`);
    }
  }

  if (/Invalid|Malformed|Bad country prefix|Wrong prefix|Wrong country|Unsigned/i.test(route.sampleText || "")) {
    if (/Offline checks passed|Completed locally|Generated IBAN/i.test(text) && !/review|invalid|error|unsigned|Repair status/i.test(text)) {
      failures.push(`${route.path}: review sample appears fake-green`);
    }
  }
}

await browser.close();

if (failures.length) {
  console.error("Global premium audit failed:");
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Global premium audit passed for ${auditedRoutes.length} routes at ${baseUrl}`);
