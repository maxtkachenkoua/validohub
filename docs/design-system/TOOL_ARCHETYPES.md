# ValidoHub Tool Archetypes (V1.0)

Not all utility pages are identical. Different tools require different structures. To prevent layout inconsistency, every ValidoHub tool must classify itself under one of the official archetypes.

---

## 1. Identifier Validator
Used to validate national registration formats (e.g. PESEL, VAT, NIP, Steuer-ID).
* **Required Sections:** Hero, Presets/History, Text Input, Validation Timeline, Results Summary Card, Interactive Breakdown, Checksum Debugger (if mathematically controlled), REST API Preview, Documentation.
* **Optional Sections:** Generator playground (Random, Male, Female).
* **Forbidden Sections:** File Dropzone (identifiers are short strings, not files).
* **Expected Interaction:** Debounced live validation as the developer types.

---

## 2. Encoder / Decoder
Translates raw data into alternative representations (e.g. Base64, Hex, HTML Entities, URL Escape).
* **Required Sections:** Hero, Presets/History, Text Input, Results Summary Card, Visual Explanation (ASCII hex mapping table), Hex Dump (Advanced Analysis), REST API Preview, Documentation.
* **Optional Sections:** File Dropzone.
* **Expected Interaction:** Auto-detection of plain vs encoded values. Dynamic downloads of binary payload files.

---

## 3. Formatter / Beautifier
Beautifies and verifies structured layouts (e.g. JSON Formatter, XML Formatter).
* **Required Sections:** Hero, Presets/History, Large Text Area, Validation Timeline, Interactive Tree explorer (searchable), REST API Preview, Documentation.
* **Expected Outputs:** Formatted, minified, sorted, or cleaned text.

---

## 4. Generator
Creates random valid mock data (e.g. UUID, Password, Key).
* **Required Sections:** Hero, Output Input, Action Buttons (Generate, Copy), Configuration Options, REST API Preview, Documentation.
* **Forbidden Sections:** Input Text Area.

---

## 5. Hash Tool
Calculates checksum values (e.g. MD5, SHA256).
* **Required Sections:** Hero, Text Input, File Dropzone, Results Grid (Hex, Base64 output keys), REST API Preview, Documentation.
* **Forbidden:** Validation Timeline (hashes cannot be invalid).

---

## 6. Finance / Payment Tool
Validates financial routing structures (e.g. IBAN, BIC, Pix Key).
* **Required Sections:** Hero, Text Input, Validation Timeline, Results Card (Bank name, country, routing details), REST API Preview, Documentation.
