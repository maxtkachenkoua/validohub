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
