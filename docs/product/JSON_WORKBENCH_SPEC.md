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
- Tree view and syntax-highlighted preview.
- Error location with line, column, and repair hint.

## Actions

- Pretty print.
- Minify.
- Validate.
- Explain.
- Copy result.
- Download result.
- Clear input/output.

## Validation Behavior

- Parsing runs fully in the browser with `JSON.parse`.
- Invalid JSON reports line, column, position, parser message, and a practical repair hint.
- Valid JSON reports character count, UTF-8 byte size, object count, array count, property count, and nesting depth.

## Examples

- API response.
- App config.
- JSON array.
- Invalid JSON with a trailing comma.

## Copy And Download

- Copy uses the shared Workbench clipboard utility.
- Download uses the shared Workbench download utility.
- Formatted and minified JSON download as `.json`.
- Validation and explanation reports download as `.txt`.

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
- Large JSON remains local and warns when input is large.
- Very large tree previews are capped to keep the page responsive.
