#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const projectRoot = resolve(dirname(new URL(import.meta.url).pathname), '..');
const siteRoot = resolve(projectRoot, 'generated/validohub');

const locales = ['es', 'pt-BR', 'de', 'fr', 'pl', 'uk'];

const slugs = [
  'oauth-oidc-flow-debugger',
  'jwt-risk-scanner',
  'jwks-rotation-inspector',
  'openapi-breaking-change-diff',
  'json-patch-builder',
  'json-merge-patch-builder',
  'rest-pagination-contract-tester',
  'api-error-code-catalog-builder',
  'webhook-replay-payload-builder',
  'idempotency-collision-lab',
  'robots-txt-tester',
  'xml-sitemap-inspector',
  'canonical-hreflang-auditor',
  'search-snippet-preview',
  'structured-data-json-ld-validator',
  'csv-schema-inferencer',
  'duplicate-row-detector',
  'unicode-confusable-scanner',
  'locale-number-parser',
  'locale-date-parser',
  'luhn-card-fixture-generator',
  'bin-iin-shape-inspector',
  'currency-minor-units-checker',
  'sepa-pain001-fixture-helper',
  'payment-reference-generator',
  'password-policy-tester',
  'csp-nonce-hash-helper',
  'cookie-samesite-lab',
  'email-header-auth-inspector',
  'log-redaction-rule-tester'
];

function localizeLinks(content, locale, slug) {
  let next = content
    .replace('<html lang="en">', `<html lang="${locale}">`)
    .replace(
      `<link rel="canonical" href="https://validohub.com/en/tools/${slug}/">`,
      `<link rel="canonical" href="https://validohub.com/${locale}/tools/${slug}/">`
    )
    .replace(
      `<meta property="og:url" content="https://validohub.com/en/tools/${slug}/">`,
      `<meta property="og:url" content="https://validohub.com/${locale}/tools/${slug}/">`
    )
    .replace(
      `"url":"https://validohub.com/en/tools/${slug}/"`,
      `"url":"https://validohub.com/${locale}/tools/${slug}/"`
    )
    .replace(/href="\/en\//g, `href="/${locale}/`)
    .replace(/href="\/en"/g, `href="/${locale}"`);

  return next;
}

async function main() {
  let written = 0;
  for (const slug of slugs) {
    const sourcePath = resolve(siteRoot, 'en/tools', slug, 'index.html');
    const source = await readFile(sourcePath, 'utf8');
    for (const locale of locales) {
      const outputPath = resolve(siteRoot, locale, 'tools', slug, 'index.html');
      await mkdir(dirname(outputPath), { recursive: true });
      const localized = localizeLinks(source, locale, slug);
      await writeFile(outputPath, localized, 'utf8');
      written += 1;
    }
  }
  console.log(`Synced ${written} localized premium global tool pages.`);
}

main().catch(error => {
  console.error(error.message || error);
  process.exit(1);
});
