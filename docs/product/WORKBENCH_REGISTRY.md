# Workbench Registry

This registry records production browser workbenches currently owned by ValidoHub.

## Base64 Workbench

- Source JS: `assets/js/tools/base64.js`
- Related YAML tool pages:
  - `tools/base64-encoder.yaml`
  - `tools/base64-decoder.yaml`
- Algorithm IDs:
  - `validohub.base64`
  - `validohub.base64-decoder`
- Current capabilities:
  - Encode
  - Decode
  - Validate
  - Unicode-safe text handling
  - Base64URL support
  - Padding options
  - Auto-detection
  - Detailed diagnostics
  - Advanced analysis
  - Hex preview
  - Text, JSON, image, PDF, and binary decode previews
  - File choose and drag-and-drop
  - Copy and smart download
  - Keyboard-friendly workflow
- Known future ideas:
  - Batch encode/decode
  - Line wrapping options
  - Data URL helper
  - MIME-aware file naming improvements
- Current quality status: Reference-quality production workbench.

## URL Workbench

- Source JS: `assets/js/tools/url.js`
- Related YAML tool pages:
  - `tools/url-encoder.yaml`
  - `tools/url-decoder.yaml`
- Algorithm IDs:
  - `validohub.url-encoder`
  - `validohub.url-decoder`
- Current capabilities:
  - Encode
  - Decode
  - Validate
  - UTF-8 support
  - Auto-detect already encoded input
  - Malformed percent-sequence diagnostics
  - Space handling notes
  - Character, byte, encoded length, decoded length, reserved character, unsafe character, and percent-byte stats
  - Invalid sequence highlighting
  - Advanced analysis
  - Samples
  - Copy and download through the shared framework
- Known future ideas:
  - URL Parser
  - URL Analyzer
  - Query Parser
  - Query Builder
  - Component-level copy helpers
  - Normalize and sort query parameters
- Current quality status: Production workbench, below Base64 and JSON in depth.

## JSON Workbench

- Source JS: `assets/js/tools/json.js`
- Related YAML tool pages:
  - `tools/json-formatter.yaml`
  - `tools/json-validator.yaml`
- Algorithm IDs:
  - `validohub.json-formatter`
  - `validohub.json-validator`
- Current capabilities:
  - Format / pretty print
  - Minify
  - Validate
  - Explain
  - Sort object keys
  - Remove empty values
  - Interactive tree explorer
  - JSONPath display and copy
  - Search by key/value with next and previous
  - Selected-node copy helpers for value, key, JSONPath, and subtree JSON
  - Syntax highlighting
  - Error line, column, token highlight, likely cause, and repair suggestions
  - Duplicate property warnings
  - Extended statistics
  - Large JSON mode with capped tree rendering
  - File choose and drag-and-drop
  - Copy and download through the shared framework
- Known future ideas:
  - JSON Diff
  - JSON Merge
  - JSON Schema Generator
  - TypeScript Generator
  - Java POJO Generator
  - Kotlin data class Generator
  - C# Generator
  - Go structs
  - YAML conversion
- Current quality status: Production-quality V2 workbench.

## JWT Workbench

- Source JS: `assets/js/tools/jwt.js`
- Related YAML tool page:
  - `tools/jwt-decoder.yaml`
- Algorithm ID:
  - `validohub.jwt-decoder`
- Current capabilities:
  - Decode
  - Validate
  - Inspect / parse
  - Analyze / explain
  - Header JSON pretty print and syntax highlighting
  - Payload JSON pretty print and syntax highlighting
  - Payload tree view
  - Payload search
  - Payload JSONPath display
  - Raw token section display
  - Signature display
  - Token analysis for algorithm, issuer, audience, subject, JWT ID, issued at, not before, and expiration
  - Token health badges for valid structure, expired, not yet valid, missing signature, weak algorithm, and unknown algorithm
  - Human-readable expiration and validity timing
  - Copy helpers for header, payload, signature, claims, raw token, and decoded JSON
  - Download helpers for header, payload, and decoded JSON
  - Error UX with malformed-section highlighting and repair suggestions
  - Safe sample JWT tokens
- Known future ideas:
  - Signature verification with explicit key-handling UX
  - JWKS fetching only if a future product spec approves network behavior
  - Claim expectation checks for issuer, audience, and subject
  - Token comparison
- Current quality status: Production-quality V1 workbench.


## Countries Platform

This is a product platform section, not a browser workbench plugin.

- Source JS: `assets/js/countries.js`
- Related content/config:
  - `countries/brazil.yaml`
  - `countries/poland.yaml`
  - `tools/brazil-pix-validator.yaml`
  - `tools/pesel-validator.yaml`
- Current capabilities:
  - Locale-first country hub routes.
  - Locale-first country workbench routes.
  - Product-owned Countries navigation grouping.
  - Country Hub Template V3 renderer for Brazil.
  - Country Hub Design Guide as the permanent reusable design standard.
  - Country Hub AI Guide for future AI implementation discipline.
  - Structured country metadata model.
  - Country visual identity and official brand placeholder support.
  - Global brand asset policy for official logos, monochrome logo preference, and semantic icon fallback.
  - Rich Country Statistics.
  - Developer Quick Actions.
  - Developer Country Profile.
  - Copy buttons for important country values and code snippets.
  - Reusable status chips for Ready, Available, Coming soon, Planned, Experimental, and Deprecated.
  - Brazil Developer Cheat Sheet.
  - Brazil localization examples, address examples, phone examples, local formats, payments, banking overview, official resources, available workbenches, planned workbenches, related global tools, developer notes, and integration checklist.
  - Validation Rules and Common Integration Mistakes summaries without implementing validators.
  - Developer API Examples and JSON Examples with copyable snippets.
  - Localization Notes and Country Ecosystem cards.
  - Discovery Links and semantic tags for future search/filtering.
  - Hidden future ad-slot hooks.
  - No hardcoded Brazil or Poland behavior in Engine or browser assets.
  - Existing Engine country hub and breadcrumb generation.
- Known future ideas:
  - Move rich country data into a generic build-time model if SEO requirements demand it.
  - Country landing page editorial content.
  - Featured workbenches.
  - Country tool category grouping.
  - Tags, display order, and icons through approved generic metadata.
  - Country-specific validator specs before any implementation.
- Current quality status: Brazil is the reference Country Intelligence Portal V3 and design-system standard; country-specific validators remain future work.
