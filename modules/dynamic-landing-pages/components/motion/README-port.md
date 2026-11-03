# Sell: Dynamic v2 motion visuals: port notes

Source: the "Crossword — Sell: Dynamic v2 motion" design handoff (a separate Vite project, not kept in this
repo). Its thirteen current visuals (01–13, in the live page's order) are on this page; the archived ones
aren't.

`components/`, `illustrations/`, `visuals/`, `brands/` and `assets/products/cutouts/index.ts` are the source's
`src/` files that the 13 visuals import, copied file for file. Logic, markup and copy are unchanged, apart from
these mechanical edits:

- **Images.** Next's static imports are `StaticImageData`, not URL strings, so each `import x from "….png"`
  became `import xImage from "@/modules/dynamic-landing-pages/assets/motion/…"` plus `const x = xImage.src;`.
  Assets live in `modules/dynamic-landing-pages/assets/motion/` with the source's `src/assets/` layout. The few
  files the source served from `public/assets/` by `import.meta.env.BASE_URL` (in `visuals/sellDynamicProducts.ts`
  and `visuals/GamesRewards/data.ts`) are static imports from `assets/motion/public/`.
- **Brand marks.** `brands/BrandIdentity.tsx` loaded the marks with Vite's `import.meta.glob`; the same maps are
  spelled out as imports. `brands/registry.json` names its brand fonts by the next/font variables (the same file
  as Retain's port).
- **The `.sbl` layer.** `visuals/SellDynamicV2/SellDynamicV2.tsx` keeps `Layer` and the 13 motion exports only.
- **CSS.** The per-component `import "./X.css"` lines are gone. All styles come from `motion.css`, generated from
  the source stylesheets these visuals import, in the order Vite concatenates them. In `motion.css`, every
  selector is prefixed with `.dlp-motion`, keyframes are renamed `dlpm-*` (globals.css already has `dlp-*`
  ones), Geist, DM Sans, Inter and Crimson Pro point at the next/font variables, and a zero-specificity block
  puts back the browser defaults that Tailwind preflight removes. The Storybook knock's sheets
  (`visuals/ProactiveV2/storybookKnockCss.ts`) are injected by the component as in the source, unscoped: their
  `wm-` classes are their own.
- **React 19 types.** `RefObject<T>` props take `RefObject<T | null>`.
- **Zoom.** The site zooms (or scales) each visual to fit its column. Everything that measures with
  `getBoundingClientRect` divides by that factor, so it stays in CSS px: the follow-scrolls in
  `GiftJourneyV2Motion` and `ProductDiscoveryV2Motion`, the jar flights in `AdToPageMotion` and
  `AdaptivePagesMotion`, the composer-to-panel morphs in `AdJourneyMotion` and `GamesRewardsMotion`,
  `TapRing`, and `GistUpFrontMotion`'s "Show more" scroll. (`sellDynamicMotion.ts` and `ProactiveV2Motion.tsx`
  already did.) At the drawn size the factor is 1, so nothing changes.

`dlp-motion.tsx` is the entry point: `dlpScenes` (by the source's slugs, each with its drawn size and about how
long it takes to settle, timed from the source build) and `DlpMotionRoot`, the `.dlp-motion` scope, which renders
the visuals on the client only. They are drawn by ScenePanel (`modules/sell/components/motion/scene-panel.tsx`):

| Visuals | Size | Used in |
| --- | --- | --- |
| 01 `roas-gap-motion` | 1280 × 600 | gap/roas-gap.tsx (via dlp-scene-panel.tsx) |
| 02 `dedicated-landing-pages-motion`, 09 `adaptive-product-pages-motion` | 687 × 586 | options/option-list.tsx (`OptionPanel`, by the option in focus) |
| 03–08 `comparison-tools-motion` … `offers-composer-motion` | 738 × 680 | options/dedicated-tab-list.tsx |
| 10–13 `ask-ai-on-page-motion` … `upsell-cross-sell-motion` | 738 × 760 | adaptive/adaptive-tabs.tsx (covering the stage) |

Playback works as in the source: a visual waits for webfonts, starts once it is on screen with the tab focused,
restarts when the viewer comes back, and shows its final state when `prefers-reduced-motion` is set. The tabs and
options that hold a visual give each its run plus a short hold before moving on.
