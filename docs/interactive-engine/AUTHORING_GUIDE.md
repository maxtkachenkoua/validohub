# Entity Authoring Guide (V1.0)

Follow this guide to author a new identifier entity in under 10 minutes.

---

## 1. Quick Authoring Workflow

### Step 1: Create Entity Metadata
Create the entity folder `content/identifiers/<id>/` and write its `metadata.json` declaring fields and checksum:
```json
{
  "name": "NIP",
  "country": "Poland",
  "length": 10,
  "fields": [ ... ]
}
```

### Step 2: Add Markdown Content Blocks
Write the explanatory content files inside the entity folder:
* `overview.en.md`
* `structure.en.md`
* `checksum.en.md`
* `faq.en.md`
* `developer-notes.en.md`
* `references.en.md`

### Step 3: Add Code Snippets and Test Examples
Add implementation code and test values inside `snippets.json` and `examples.json`.

### Step 4: Register Relationships
Add semantic links connecting the identifier to country and workbench pages in `knowledge/relationships.json`.

### Step 5: Run the Compiler
Execute the compilation script to output the compiled page:
```bash
node scripts/build-identifiers.mjs
```
The page is generated and validated automatically from the templates.
