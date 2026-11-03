# AI Assistants V3 motion visuals: port notes

Source: the "Crossword — AI Assistants V3 motion" design handoff (a separate Vite project, not kept in this repo).
Its fifteen visuals are on the AI Assistants page, in the page's order.

`brands/`, `components/`, `illustrations/`, `visuals/` and `assets/products/cutouts/index.ts` are the source's `src/`
files that the 15 visuals import, copied file for file. Logic, markup and copy are unchanged, apart from these
mechanical edits:

- **Images.** Next's static imports are `StaticImageData`, not URL strings, so each `import x from "….png"` became
  `import xImage from "@/modules/ai-assistants/assets/motion/…"` plus `const x = xImage.src;`. Assets live in
  `modules/ai-assistants/assets/motion/` with the source's `src/assets/` layout (LaunchAudience's avatars under
  `illustrations/LaunchAudience/avatars/`).
- **Brand marks.** `brands/BrandIdentity.tsx` loaded the marks with Vite's `import.meta.glob`; the same maps are
  spelled out as imports. `brands/registry.json` names its brand fonts by the next/font variables (the same file as
  Retain's port).
- **Missing types.** A few source files import only types from three kit files the package doesn't include
  (`CommerceProductCard`, `RecommendationProductCard`, `CardFeatureStacked`); Vite erases type imports, so its build
  never needed them. `components/ill/` has type-only modules with those declarations, so the type check resolves them.
- **CSS.** The per-component `import "./X.css"` lines are gone. All styles come from `motion.css`, generated from the
  source stylesheets these visuals import, in the order Vite concatenates them. In `motion.css`, every selector is
  prefixed with `.aia-motion`, keyframes are renamed `aiav-*`, Geist, Inter and Crimson Pro point at the next/font
  variables, and a zero-specificity block puts back the browser defaults that Tailwind preflight removes. One site
  rule is added: 11–14 caption themselves with the gallery's tile label, which the site leaves out.
- **React 19 types.** `RefObject<T>` props take `RefObject<T | null>`.
- **Zoom.** The site zooms (or scales) each visual to fit its column. The follow-scrolls in `GiftJourneyV2Motion` and
  `ProductDiscoveryV2Motion` divide their `getBoundingClientRect` values by that factor, so they stay in CSS px
  (`sellDynamicMotion.ts` already did). At the drawn size the factor is 1, so nothing changes.

`aia-motion.tsx` is the entry point: `aiaScenes` (by the source's slugs, each with its drawn size and about how long it
takes to settle, timed from the source build) and `AiaMotionRoot`, the `.aia-motion` scope, which renders the visuals
on the client only. They are drawn by ScenePanel (`modules/sell/components/motion/scene-panel.tsx`):

| Visuals | Size | Used in |
| --- | --- | --- |
| 01–04 `which-one-motion` … `best-value-motion` | 789 × 579 | possibilities/shopper-asks-tabs.tsx, inside the panel's lattice frame (config/possibilities.ts) |
| 05–06 `back-in-stock-motion`, `price-drop-motion` | 620 × 420 | campaigns/use-case-campaigns.tsx |
| 07–10 `order-status-motion` … `checkout-motion` | 687 × 586 | logged-in/quote-tabs.tsx, by the open quote (config/logged-in.ts) |
| 11 `app-detail-motion` | 1280 × 599 | brand/brand-aesthetics.tsx |
| 12–14 `promo-upgrade`, `promo-offer`, `promo-launches` | 355 × 402 | promotions/promotions.tsx, in the steps' cells (config/promotions.ts) |
| 15 `insights-motion` | 1280 × 599 | insights/insights.tsx (`scene`, passed by the AI Assistants page) |

The Personal agents page shares these sections with its own copy and no visuals, so it keeps the still panels.
