# JSON Workbench Spec

## Primary User Task

Developers paste or drop JSON and quickly format, minify, validate, inspect, copy, or download the result without sending data to a server.

## Inputs

- JSON text in a textarea.
- Local `.json` or text files through drag-and-drop or file picker.
- Built-in sample JSON for common API, config, array, and invalid-input cases.

## Outputs

- Pretty-printed JSON.
- Minified JSON.
- Validation report.
- Structural explanation.
- Interactive tree explorer.
- Syntax-highlighted preview.
- Error location with line, column, exact token, likely cause, and repair hint.

## Current Implementation

- Source JS: `assets/js/tools/json.js`
- Related tool pages:
  - `tools/json-formatter.yaml`
  - `tools/json-validator.yaml`
- Execution: browser-only, offline, no backend, no REST API, no Java execution.

## Actions

- Pretty print.
- Minify.
- Sort object keys alphabetically.
- Remove empty values recursively.
- Validate.
- Explain.
- Copy result.
- Download result.
- Clear input/output.

## Validation Behavior

- Parsing runs fully in the browser with `JSON.parse`.
- Invalid JSON reports line, column, position, parser message, and a practical repair hint.
- Valid JSON reports character count, UTF-8 byte size, object count, array count, property count, and nesting depth.
- Duplicate properties warn because later values overwrite earlier values in JavaScript parsing.
- Large JSON mode caps tree rendering while preserving full formatted output.

## Interactive Explorer

- Tree nodes expand and collapse using native details controls.
- The toolbar provides expand all, collapse all, focus search, clear search, next match, and previous match.
- Every node exposes a JSONPath, type, child count, subtree size, and nesting depth.
- Selecting a node enables copy helpers for value, key, JSONPath, and subtree JSON.
- Search matches keys and visible values, highlights matches, and tracks current match position.
- Search supports next and previous match navigation.
- Selected nodes expose copy helpers for value, key, JSONPath, and subtree JSON.

## Transform Actions

- Sort object keys alphabetically while preserving values.
- Remove empty values recursively:
  - `null`
  - empty strings
  - empty arrays
  - empty objects

## Examples

- API response.
- App config.
- JSON array.
- Invalid JSON with a trailing comma.

## Copy And Download

- Copy uses the shared Workbench clipboard utility.
- Download uses the shared Workbench download utility.
- Formatted, minified, sorted, and cleaned JSON download as `.json`.
- Validation and explanation reports download as `.txt`.

## Statistics

Show:

- Characters.
- UTF-8 bytes.
- Output characters.
- Nodes.
- Objects.
- Arrays.
- Properties.
- Strings.
- Numbers.
- Booleans.
- Null values.
- Maximum depth.
- Largest array size.
- Largest object size.
- Root type.

## Browser-Only Feasibility

JSON formatting, validation, minification, tree rendering, statistics, and file reading are browser-only. No backend, REST API, Java execution, or database is required.

## Accessibility And Keyboard

- Existing Workbench keyboard flow applies: `Ctrl/Meta+Enter` runs the active action and `Esc` clears.
- Buttons remain real buttons with visible labels.
- Error messages appear in the workbench and use the existing live message region.

## Mobile

- No right sidebar.
- Tree and code previews scroll inside their own panels.
- Buttons wrap in the existing action row.

## Edge Cases

- Empty input shows a clear prompt.
- Invalid strings, trailing commas, unexpected end-of-input, and malformed object keys show focused hints.
- Duplicate properties warn because later values overwrite earlier values in JavaScript parsing.
- Large JSON remains local and warns when input is large.
- Very large tree previews are capped to keep the page responsive.

## Explicit Non-Goals For Version 2

These belong to future versions:

- JSON Diff.
- JSON Merge.
- JSON Schema Generator.
- TypeScript Generator.
- Java POJO Generator.
- Kotlin data class Generator.
- C# Generator.
- Go structs.
- YAML conversion.
