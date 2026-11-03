# Retain motion visuals: port notes

Source: the "Crossword — Retain v2 motion" design handoff (a separate Vite project, not kept in this repo).
Its visuals are the Retain and Campaigns motion inside the Storybook `.sbl` layer, plus the Storybook
Insights dashboard (11) and the Ask AI drawer (12).

`components/`, `illustrations/`, `visuals/` and `brands/` are the source's `src/` files that
`visuals/RetainV2/RetainV2.tsx` imports, copied file for file. Logic, markup and copy are unchanged,
apart from these mechanical edits:

- **Images.** Next's static imports are `StaticImageData`, not URL strings, so each
  `import x from "….png"` became `import xImage from "…"` plus `const x = xImage.src;`. Everything
  downstream still gets the same string. Assets live in `modules/retain/assets/motion/` with the
  source's `src/assets/` layout (11's avatars under `illustrations/LaunchAudience/avatars/`).
- **Brand marks.** `brands/BrandIdentity.tsx` loaded the marks with Vite's `import.meta.glob`; the
  same maps are spelled out as imports. `brands/registry.json` names its brand fonts by the
  next/font variables.
- **The `.sbl` layer.** `visuals/SellDynamicV2/SellDynamicV2.tsx` keeps only `Layer`: the Sell
  visuals the source file also exports aren't on this page.
- **CSS.** The per-component `import "./X.css"` lines are gone. All styles come from `motion.css`,
  generated from the source stylesheets these visuals import, in the order Vite concatenates them
  (equal-specificity overrides depend on it). In `motion.css`, every selector is prefixed with
  `.rtn-motion`, keyframes are renamed `rtn-*`, Geist, DM Sans, Inter, Crimson Pro and Playfair
  Display point at the next/font variables, and a zero-specificity block puts back the browser
  defaults that Tailwind preflight removes. The source page had no preflight. See the file header.
- **React 19 types.** `RefObject<T>` props take `RefObject<T | null>`.
- **Zoom.** The site zooms each visual to fit its column. `ChatMotionScene` (follow-scroll) and
  `ProactiveMotionScene` (composer clip) divide their `getBoundingClientRect` deltas by that zoom, so
  they stay in CSS px. At the drawn size the zoom is 1, so nothing changes.
- **Site liveries** (not in the source): the campaign frame in aubergine and forest green
  (`.rtn-tone-*` in `motion.css`), and the landscape canvas's `maroon` backdrop, which 12 uses.

`retain-motion.tsx` is the entry point. Its `MotionStage` draws a visual at its design size inside
`.rtn-motion`, zooms it to the container width with `scale-to-container`, and renders it on the
client only. It exports:

| Export | Visuals | Used in |
| --- | --- | --- |
| `RecoveryMotion` | 01–05 (687 × 586), follows the open item through `useStrangerActive()` | recovery/proactive-recovery.tsx |
| `CampaignMotion` | 06–10 (821 × 611), by campaign index | campaigns/campaign-tabs.tsx |
| `AudienceMotion` | 11, Launch audience (1280 × 599) | audience/audience-builder.tsx |
| `ReturnMotion` | 12, Size confidence in the Ask AI drawer (1280 × 599) | returns/return-reduction.tsx |

At 1440px wide every panel is exactly its drawn size, so the zoom is 1. Playback works as in the
source: a visual starts once it is 30% on screen with the tab focused, restarts when the viewer
comes back, and shows its final state when `prefers-reduced-motion` is set.
