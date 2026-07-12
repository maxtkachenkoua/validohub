# Legacy Tool Migration Guide (V1.0)

To maintain platform stability, never migrate multiple tools at the same time. Follow this step-by-step migration guide for each legacy tool refactor.

---

## 1. Migration Process

```
┌──────────────────────────────────────┐
│ Step 1. Study the Legacy Tool        │
└──────────────────┬───────────────────┘
                   ▼
┌──────────────────────────────────────┐
│ Step 2. Identify the Archetype       │
└──────────────────┬───────────────────┘
                   ▼
┌──────────────────────────────────────┐
│ Step 3. Map Existing Features        │
└──────────────────┬───────────────────┘
                   ▼
┌──────────────────────────────────────┐
│ Step 4. Implement Layout & CSS       │
└──────────────────┬───────────────────┘
                   ▼
┌──────────────────────────────────────┐
│ Step 5. Connect Pipeline Timeline    │
└──────────────────┬───────────────────┘
                   ▼
┌──────────────────────────────────────┐
│ Step 6. Visual Comparison vs PESEL   │
└──────────────────┬───────────────────┘
                   ▼
┌──────────────────────────────────────┐
│ Step 7. Verify & Run Test Suite      │
└──────────────────────────────────────┘
```

---

## 2. Detailed Steps

### Step 1. Study the Legacy Tool
Analyze how the legacy tool is used, what inputs it accepts, and how validation errors are returned.

### Step 2. Identify the Archetype
Match the tool to an official archetype (e.g. Validator, Encoder, Decoder, Formatter). This dictates the required visual blocks and expected interactions.

### Step 3. Map Existing Features
Identify all existing validation algorithms, parsing functions, and helper logic to ensure no functionality is lost during the migration.

### Step 4. Implement Layout & CSS
Structure the HTML page flow according to the canonical ordering. Prepend Presets and History select dropdowns inside the `.field-grid` layout.

### Step 5. Connect Pipeline Timeline
Link validation checks to the timeline component. Use green pass or red fail markers to indicate the status of each pipeline stage.

### Step 6. Visual Comparison vs PESEL
Verify that fonts, alignments, margins, colors, and interactive behaviors match the gold standard reference implementation.

### Step 7. Verify & Run Test Suite
Run the automated test suite and check pages locally to verify the layout remains stable.
