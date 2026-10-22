# Retain motion visuals: port notes

Source: the "Crossword — Retain Motion" design handoff (a separate Vite project, not kept in this repo).
`components/ill/` and `illustrations/` are the source's `src/components/ill/` and
`src/illustrations/` copied file for file. Logic, markup and copy are unchanged, apart from these
mechanical edits:

- **Images.** Next's static imports are `StaticImageData`, not URL strings, so each
  `import x from "….png"` became `import xImage from "…"` plus `const x = xImage.src;`. Everything
  downstream still gets the same string. Assets live in `modules/retain/assets/motion/` with the
  source folder layout. `products/cutouts/index.ts` keeps only the one cutout the visuals use.
- **CSS.** The per-component `import "./X.css"` lines are gone. All styles come from `motion.css`,
  generated from the build's `build/assets/index-Da5IhBiR.css`, because Vite concatenates CSS in
  module-graph order and some equal-specificity overrides depend on that order. In `motion.css`,
  every selector is prefixed with `.rtn-motion`, keyframes are renamed `rtn-*`, Geist, DM Sans and
  Inter point at the next/font variables, and a zero-specificity block puts back the browser
  defaults that Tailwind preflight removes. The source page had no preflight. See the file header.
- **React 19 types.** `useLandedOnScreen` takes `RefObject<Element | null>`.
- **Zoom.** The site zooms each visual to fit its column. `ChatMotionScene` (follow-scroll) and
  `ExpandShell` (composer clip) divide their `getBoundingClientRect` deltas by that zoom, so they
  stay in CSS px. At the drawn size the zoom is 1, so nothing changes.

`retain-motion.tsx` is the entry point. Its `MotionStage` draws a visual at its design size inside
`.rtn-motion`, zooms it to the container width with `scale-to-container`, and renders it on the
client only. It exports:

| Export | Visuals | Used in |
| --- | --- | --- |
| `RecoveryMotion` | 01–05 (687 × 586), follows the open item through `useStrangerActive()` | recovery/proactive-recovery.tsx |
| `CampaignMotion` | 06–10 (821 × 611), by campaign index | campaigns/campaign-tabs.tsx |
| `AudienceMotion` | 11 (1280 × 599) | audience/audience-builder.tsx |
| `ReturnMotion` | 12 (1280 × 599) | returns/return-reduction.tsx |

At 1440px wide every panel is exactly its drawn size, so the zoom is 1. Playback works as in the
source: a visual starts once it is 30% on screen with the tab focused, restarts when the viewer
comes back, and shows its final state when `prefers-reduced-motion` is set.
