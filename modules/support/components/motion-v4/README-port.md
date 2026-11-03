# Support v4 motion visuals: port notes

Source: the "Crossword — Support v4 motion" design handoff (a separate Vite project, not kept in this repo).
Its twelve visuals are the Support v3 motion inside the Storybook `.sbl` layer, with this page's
fixes in `visuals/SupportV4/SupportV4.css` (scoped by the `.sv4` wrapper).

`components/`, `illustrations/`, `visuals/`, `brands/` and `assets/products/cutouts/index.ts` are
the source's `src/` files that `visuals/SupportV4/SupportV4.tsx` imports, copied file for file.
Logic, markup and copy are unchanged, apart from these mechanical edits:

- **Images.** Next's static imports are `StaticImageData`, not URL strings, so each
  `import x from "….png"` became `import xImage from "@/modules/support/assets/motion-v4/…"` plus
  `const x = xImage.src;`. Everything downstream still gets the same string. Assets live in
  `modules/support/assets/motion-v4/` with the source's `src/assets/` layout.
- **Brand marks.** `brands/BrandIdentity.tsx` loaded the marks with Vite's `import.meta.glob`; the
  same maps are spelled out as imports. `brands/registry.json` names its brand fonts by the
  next/font variables (the same file as Retain's port).
- **The `.sbl` layer.** `visuals/SellDynamicV2/SellDynamicV2.tsx` keeps only `Layer`: the Sell
  visuals the source file also exports aren't on this page. `SupportV4.tsx` imported
  `FADE_CLEARANCE` (32) from `GiftJourneyV2Motion`, which isn't on this page either; the constant
  is inlined.
- **CSS.** The per-component `import "./X.css"` lines are gone. All styles come from `motion.css`,
  generated from the source stylesheets these visuals import, in the order Vite concatenates them
  (equal-specificity overrides depend on it). In `motion.css`, every selector is prefixed with
  `.sup-motion`, keyframes are renamed `sup-*`, Geist, DM Sans, Inter and Crimson Pro point at the
  next/font variables, and a zero-specificity block puts back the browser defaults that Tailwind
  preflight removes. The source page had no preflight. See the file header.
- **React 19 types.** `RefObject<T>` props take `RefObject<T | null>`.
- **Zoom.** The site zooms (or scales) each visual to fit its column. Everything that measures with
  `getBoundingClientRect` divides by that factor, so it stays in CSS px: `ChatMotionScene`
  (follow-scroll), `ProactiveMotionScene` (composer clip), `MerchantInsightMotion` (follow-scroll),
  `SupportV4.tsx`'s `Follow`, and `useMeasuredSkeleton` (the result panels' skeleton). At the drawn
  size the factor is 1, so nothing changes.

`support-motion.tsx` is the entry point: `supportScenes` (by the source's slugs, each with its
drawn size and about how long it takes to settle) and `SupportMotionRoot`, the `.sup-motion` scope,
which renders the visuals on the client only. They are drawn by ScenePanel
(`modules/sell/components/motion/scene-panel.tsx`):

| Slugs | Size | Used in |
| --- | --- | --- |
| 01–06 `order-tracking` … `return-eligibility` | 738 × 680 | resolve/resolve-tabs.tsx |
| 07 `merchant-helpdesk` | 738 × 680 | helpdesk/helpdesk-options.tsx (row 1) |
| 08 `merchant-insight` | 687 × 586 | control/take-control.tsx |
| 09 `guardrails` | 1280 × 498 | guardrails/guardrails.tsx |
| 10–12 `human-takeover`, `merchant-approval`, `whisper-to-agent` | 738 × 680, cropped to the 355 × 402 card | handoff/handoff-scene.tsx |

Playback works as in the source: a visual starts once it is 30% on screen with the tab focused,
restarts when the viewer comes back, stops at its end, and shows its final state when
`prefers-reduced-motion` is set.
