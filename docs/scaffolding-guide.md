# ValidoHub Country Hub Scaffolding Guide

This guide details how to use and maintain the Country Hub Scaffolding system (`scripts/create-country-hub.mjs`). This CLI automates the visual, configuration, and registry setup for adding premium Country Hub pages.

---

## Usage

To scaffold a new country, run the script from the project root:

```bash
node scripts/create-country-hub.mjs \
    --id <country_id> \
    --name <country_name> \
    --iso2 <iso2_code> \
    --iso3 <iso3_code>
```

### CLI Arguments

- `--id` (Required): Lowercase country ID matching the directory slug name (e.g. `germany`).
- `--name` (Required): Descriptive display name (e.g. `Germany`).
- `--iso2` (Required): Two-letter uppercase ISO 3166-1 alpha-2 code (e.g. `DE`).
- `--iso3` (Required): Three-letter uppercase ISO 3166-1 alpha-3 code (e.g. `DEU`).
- `--viewbox` (Optional): Custom crop coordinates for the location map SVG (e.g. `"380 340 160 120"`). If omitted, the crop will be computed automatically.
- `--theme` (Optional): Comma-separated hex values for flag-inspired accent colors: `primary,secondary,tertiary` (e.g. `#000000,#ff0000,#ffcf00`).
- `--dry-run`: Prints coordinate calculations and registry injections without modifying files.
- `--help`: Shows the CLI help manual.

---

## Automation Pipeline & Algorithms

The scaffolder runs the following operations to ensure visual precision:

1. **Geometry Extraction**: Parses `assets/images/countries/world-map-source.svg` to extract path data matching the country's ID or ISO code.
2. **Point-on-Surface (POS)**: Implements ray-casting polygon checks to locate a coordinate point that is guaranteed to fall inside the country's boundaries. This ensures markers are never placed in coastal waters or bordering countries.
3. **Map Marker Projection**: Projects raw geographic coordinates onto the portal world map coordinate system using a least-squares linear regression model.
4. **Outline Transformations**: Scales and translates the country shape to center it within the standard `360x260` outline preview card boundaries.
5. **Dynamic Crop (viewBox)**: Computes a generic `4:3` crop bounding box centered on the Point-on-Surface to generate the `*-location.svg` asset.

---

## Registry Integration

The script dynamically inserts entries into `assets/js/countries.js`:

- **COUNTRY_VISUAL_ASSETS**: Registers SVG asset paths, alt texts, and location card callout offsets.
- **COUNTRY_HUBS**: Sets up the default profile template data as separate key assignments (e.g. `COUNTRY_HUBS.germany = { ... }`).
- **COUNTRY_PORTAL_CATALOG**: Updates or appends portal world map metadata (coordinates, currency, identifiers, etc.).

All changes are validated using VM sandboxing to assert syntax validity, duplicate key prevention, and verification that Spain, Brazil, and Poland data remains byte-for-byte identical.

---

## Test Suite

To run the full test suite verifying CLI arguments, validations, and point-on-surface math:

```bash
node scripts/test-scaffolder.mjs
```
