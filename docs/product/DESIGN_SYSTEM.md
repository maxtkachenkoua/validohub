# Design System

ValidoHub should feel like a modern developer product: calm, sharp, fast, and trustworthy.

## Visual Direction

- Light theme first.
- Compact, premium spacing.
- Clear hierarchy without oversized marketing hero sections.
- Subtle borders and shadows.
- Professional typography.
- Dense enough for repeated developer use.

## Components

### Header

- Sticky.
- Compact.
- Clear brand area.
- Navigation must not dominate the workbench.

### Workbench

- The workbench is the visual center of a tool page.
- Use a large but compact card.
- Inputs and outputs should have stable dimensions.
- Buttons should be easy to scan and operate.
- Feedback panels should be informative without feeling noisy.

### Buttons

- Primary action: strong visual weight.
- Secondary actions: copy, download, utility actions.
- Destructive or clearing actions: visually calmer, never ambiguous.
- If a button exists, it must work.

### Feedback

- Success, warning, and error states must be visually distinct.
- Validation feedback should be structured, not a wall of text.
- Advanced analysis can use compact metric cards and collapsible details.

### Country Tool Metric Cards

- Poland and Brazil country tools share the same metric-card typography from `assets/css/validohub.css`.
- Metric labels are small, uppercase, muted, and letter-spaced.
- Metric values are compact and moderately bold, not oversized. Long explanations become muted note text.
- Do not create country-specific oversized result-card typography. Future country tools must reuse the shared metric-card standard so one CSS change updates every country workbench.

### Code, Tables, Lists

- Code blocks must be readable on desktop and mobile.
- Tables must not cause page-level horizontal scrolling.
- Lists should support scanning and avoid decorative noise.

## Asset Direction

For the MVP, Engine emits the current shared static assets. Future architecture should move ValidoHub-specific CSS, JavaScript, and static assets into `validohub/assets`.
