# Next Workbench Ideas

Prioritize new workbenches by practical developer utility and how well they fit browser-only execution.

## High Priority

1. HTML Workbench
   - Encode and decode HTML entities.
   - Preview encoded/decoded output safely.
   - Highlight dangerous rendering assumptions.

2. XML Workbench
   - Format, minify, validate well-formed XML.
   - Tree view can reuse concepts from JSON Workbench.

3. CSV Workbench
   - Validate rows and columns.
   - Preview table.
   - Detect delimiters.

4. Regex Workbench
   - Test pattern against text.
   - Highlight matches and capture groups.
   - Explain flags and common mistakes.

## Medium Priority

5. UUID Workbench
   - Generate UUIDs.
   - Validate UUID versions.
   - Batch generation.

6. Hash Workbench
   - MD5, SHA-1, SHA-256.
   - Text and file hashing.
   - Clear security notes for weak hashes.

7. Timestamp Workbench
   - Unix timestamp conversion.
   - ISO date parsing.
   - Timezone display.

8. URL Parser / URL Analyzer
   - Split URL components.
   - Query parameter table.
   - Normalize and copy parts.

## Later Converter Section

Create a dedicated converter section later for:

- JSON
- YAML
- CSV
- XML
- TOML

Converters should have product specs before implementation and must avoid adding backend dependencies when browser execution is practical.
