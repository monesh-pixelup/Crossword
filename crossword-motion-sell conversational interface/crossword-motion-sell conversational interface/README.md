# Crossword — Motion scenarios 28–34

Source handoff for 7 motion illustrations, exported from the Crossword illustration kit as a trimmed `src/` tree — just these scenarios and the shared code/assets they actually depend on (154 files total). Drop the `src/` folder into a React + TypeScript + Vite project (or adapt the imports to your own bundler) and import the entry components below.

## Entry components

| # | Import | File |
| --- | --- | --- |
| 28 | `PriceObjectionMotion` | `src/illustrations/SellMotion/PriceObjectionMotion.tsx` |
| 29 | `ProductComparisonMotion` | `src/illustrations/SellMotion/ProductComparisonMotion.tsx` |
| 30 | `CartUpsellOfferMotion` | `src/illustrations/SellMotion/CartUpsellOfferMotion.tsx` |
| 31 | `StockAvailabilityMotion` | `src/illustrations/SellMotion/StockAvailabilityMotion.tsx` |
| 32 | `PurchaseConfirmationMotion` | `src/illustrations/SellMotion/PurchaseConfirmationMotion.tsx` |
| 33 | `DecisionSupportMotion` | `src/illustrations/SellMotion/DecisionSupportMotion.tsx` |
| 34 | `HumanModeMotion` | `src/illustrations/SellMotion/HumanModeMotion.tsx` (composes `KnowsWhenToHelpMotion`, `KnowsHowToGuideMotion`, `KnowsWhenYoureReadyMotion` from the same folder) |

Each is a self-contained React function component — no props. Render it directly:

```tsx
import { DecisionSupportMotion } from "./src/illustrations/SellMotion/DecisionSupportMotion";

<DecisionSupportMotion />
```

## What's included

- `src/illustrations/SellMotion/` — the 7 entry components plus their shared motion scaffolding (`ChatMotionScene.tsx`, `useChatTimeline.ts`, `parts.tsx`, `RichStagger.tsx`, `LoadingFrame.*`).
- `src/illustrations/<Scenario>/` (static siblings: `PriceObjection`, `ProductComparison`, `CartUpsellOffer`, `StockAvailability`, `PurchaseConfirmation`, `DecisionSupport`, `HumanMode`) — each motion file imports its `data.ts` (copy/script content) and `.css` from here.
- `src/components/ill/` — the full shared primitive/module library these scenarios use (Shell, ChatHeader, ChatComposer, ChatMessage, cards, etc.), including `tokens.css` (all design tokens as CSS custom properties).
- `src/assets/` — every image/icon these 7 scenarios reference (product cutouts, ill-icons, two CSS background images).

Nothing outside this dependency graph was copied — the other ~30 scenarios in the full kit are not included.

## Integration notes

- **Fonts**: everything here uses `"Geist"` and `"DM Sans"` (see `font-family` in the CSS). Load both, e.g. via Google Fonts:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap" rel="stylesheet" />
  ```
- **Design tokens**: `src/components/ill/tokens.css` defines all the `--ill-*` CSS custom properties (colors, spacing, radii, strokes) these components read. Import it once, globally, before rendering any of these components.
- **No external animation library**: these 7 scenarios animate with plain CSS transitions/keyframes and `setTimeout`-driven React state (see `useChatTimeline.ts`) — no `framer-motion`/`gsap`/etc. dependency to add.
- **Peer dependencies**: only `react` (^18) and `react-dom` (^18). Nothing else from the original kit's `package.json` (no `gsap`, `motion`, `three`, `agentation`, `dialkit`) is used by this subset.
- Each `*Motion.tsx` file's own top-of-file comment explains the scenario's specific beat sequence and any design-feedback history worth knowing before changing it.
