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

### Code, Tables, Lists

- Code blocks must be readable on desktop and mobile.
- Tables must not cause page-level horizontal scrolling.
- Lists should support scanning and avoid decorative noise.

## Asset Direction

For the MVP, Engine emits the current shared static assets. Future architecture should move ValidoHub-specific CSS, JavaScript, and static assets into `validohub/assets`.
