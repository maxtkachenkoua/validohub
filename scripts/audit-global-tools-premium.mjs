import { chromium } from "playwright";

const DEFAULT_BASE = "http://127.0.0.1:8093";
const baseArgIndex = process.argv.indexOf("--base");
const baseUrl = baseArgIndex >= 0 ? process.argv[baseArgIndex + 1] : DEFAULT_BASE;

const routes = [
  {
    path: "/en/tools/",
    input: null,
    sampleText: null,
    mustContain: ["Global Workbench Registry", "Phone E.164", "Webhook Signature", "All Global Tools"],
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
