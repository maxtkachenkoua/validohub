# Base64 Workbench Product Spec

Base64 Workbench is the reference implementation for ValidoHub tool quality.

## Primary Jobs

- Encode text to Base64.
- Decode Base64 to text or binary.
- Validate Base64 and Base64URL input.
- Encode local file bytes to Base64 without upload.

## Required Capabilities

- Live encode.
- Decode.
- Validate.
- Unicode support.
- URL-safe Base64URL option.
- Padding option.
- Copy result.
- Download result.
- Keyboard shortcuts.
- File choose and drag-and-drop.
- Sample inputs.
- Detailed diagnostics and analysis.

## Current Implementation

- Source JS: `assets/js/tools/base64.js`
- Primary tool page: `tools/base64-encoder.yaml`
- Related tool page: `tools/base64-decoder.yaml`
- Execution: browser-only, offline, no backend, no REST API, no Java execution.

## Input Mode Guidance

The tool should guide users without taking destructive action.

Supported status badges:

- Looks like text
- Looks like Base64
- Looks like Base64URL
- Invalid Base64

## Validation Diagnostics

Invalid Base64 feedback should identify:

- Invalid character
- Character position
- Unexpected padding
- Invalid length
- Mixed standard and URL-safe alphabet warning
- Whitespace normalization note

## Analysis Panel

After encode, decode, or validate, show:

- Input characters
- Input UTF-8 bytes
- Output characters
- Decoded byte size
- Variant: Standard Base64 or Base64URL
- Padding: included, omitted, invalid, or not required
- Expansion ratio for encoding
- Estimated decoded size for validation
- Whether input contains whitespace
- Whether input is canonical

## Decode Preview

When decoding:

- Show text preview for valid UTF-8.
- Format JSON when decoded bytes are JSON.
- Show image preview for PNG, JPEG, GIF, WebP, and SVG.
- Show "PDF document detected" and size for PDFs.
- Show a hex preview for binary or unknown data.

## Hex Preview

Show the first 64 decoded bytes with:

- Grouped hex bytes
- Offset
- ASCII preview when printable

## Download Behavior

- Encoded text downloads as `.txt`.
- Decoded binary downloads with best guessed extension:
  - `.png`
  - `.jpg`
  - `.gif`
  - `.webp`
  - `.svg`
  - `.pdf`
  - `.bin` fallback

## Keyboard And Workflow

- Live mode is supported.
- Copy, download, clear, and keyboard shortcuts use the shared Workbench Framework.
- Sample buttons should remain available for common encode/decode/validate paths.

## Privacy Requirement

All Base64 work must run locally in the browser. Files must not be uploaded.

## Future Ideas

- Batch encode/decode.
- Optional line wrapping.
- Data URL helper.
- More MIME-specific download naming.
