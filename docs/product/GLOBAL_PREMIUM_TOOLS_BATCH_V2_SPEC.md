# Global Premium Tools Batch V2

This spec covers the second global premium batch: JSON Schema Workbench, OpenAPI Inspector, YAML / TOML Workbench, XML / XPath Workbench, CSV Profiler, SQL Query Risk Inspector, Cron Expression Workbench, Regex Explainer & Generator, Date / Timezone Workbench, Color Contrast & Token Workbench, Markdown / MDX Inspector, GraphQL Workbench, Email Address & Domain Workbench, User-Agent & Client Hints Parser, and HTTP Security Headers Inspector.

## Contract

- All tools are browser-only and must not fetch, upload, execute SQL, call APIs, send email, resolve DNS, or submit banking/security data.
- Each tool must ship success, invalid/review, and generator/explainer samples where the domain supports it.
- Immediate result cards, field breakdown, validation/inspection pipeline, quality notes, Developer API preview, and Developer snapshot JSON are mandatory.
- Invalid samples must render review states, not fake green success.
- Generated outputs are fixtures or starter snippets, never proof of live external status.
- The shared ValidoHub generic premium shell owns the implementation; Valido Engine stays untouched.

## Routes

- /en/tools/json-schema-workbench/ - JSON Schema Workbench
- /en/tools/openapi-inspector/ - OpenAPI / Swagger Inspector
- /en/tools/yaml-toml-workbench/ - YAML / TOML Workbench
- /en/tools/xml-xpath-workbench/ - XML / XPath Workbench
- /en/tools/csv-profiler/ - CSV Profiler
- /en/tools/sql-query-inspector/ - SQL Formatter & Query Risk Inspector
- /en/tools/cron-expression-workbench/ - Cron Expression Workbench
- /en/tools/regex-explainer-generator/ - Regex Explainer & Generator
- /en/tools/date-timezone-workbench/ - Date / Timezone Workbench
- /en/tools/color-contrast-token-workbench/ - Color Contrast & Token Workbench
- /en/tools/markdown-mdx-inspector/ - Markdown / MDX Inspector
- /en/tools/graphql-workbench/ - GraphQL Workbench
- /en/tools/email-domain-workbench/ - Email Address & Domain Workbench
- /en/tools/user-agent-client-hints-parser/ - User-Agent & Client Hints Parser
- /en/tools/http-security-headers-inspector/ - HTTP Headers & Security Headers Inspector

## Required Validation

Use scoped loops first: `node --check` for changed JS/MJS, `npm run build:tools -- --slugs <batch> --locales en`, browser smoke from `generated/validohub`, and `npm run audit:tools -- --base <local-url> --slugs <batch>`. Because these are brand-new YAML routes, one full route materialization build is allowed before scoped iterations can refresh generated pages.
