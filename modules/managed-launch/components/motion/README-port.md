# Managed Launch motion visual: port notes

Source: the "Crossword — Managed Launch motion" design handoff (a separate Vite project, not kept in this repo). Its
one visual, Managed Launch: Crossword grows with every step (1280 × 599), plays in the Journey section.

`brands/`, `components/`, `illustrations/`, `storefronts/`, `visuals/` and `assets/products/cutouts/index.ts` are the
source's `src/` files that the visual imports, copied file for file. Logic, markup and copy are unchanged, apart from
these mechanical edits:

- **Images.** Next's static imports are `StaticImageData`, not URL strings, so each `import x from "….png"` became
  `import xImage from "@/modules/managed-launch/assets/motion/…"` plus `const x = xImage.src;`. Assets live in
  `modules/managed-launch/assets/motion/` with the source's `src/assets/` layout (LaunchAudience's avatars under
  `illustrations/LaunchAudience/avatars/`).
- **Brand marks.** `brands/BrandIdentity.tsx` loaded the marks with Vite's `import.meta.glob`; the same maps are
  spelled out as imports. `brands/registry.json` names its brand fonts by the next/font variables (the same file as
  Retain's port).
- **Missing type.** A few source files import only the `CommerceProduct` type from the kit's CommerceProductCard,
  which the package doesn't include (Vite erases type imports). `components/ill/CommerceProductCard.ts` declares it,
  so the type check resolves it.
- **CSS.** The per-component `import "./X.css"` lines are gone. All styles come from `motion.css`, generated from the
  source stylesheets the visual imports, in the order Vite concatenates them: every selector prefixed with
  `.ml-motion`, keyframes renamed `mlm-*`, Geist, DM Sans, Inter and Crimson Pro pointing at the next/font variables,
  and a zero-specificity block putting back the browser defaults Tailwind preflight removes. `storefronts/fonts.css`
  is left out: its @font-face rules load Geist from local files, and here Geist is the site's next/font one.
- **React 19 types.** `RefObject<T>` props take `RefObject<T | null>`.
- **Zoom.** The site scales the visual to fit its column. The stepper's FLIP (`useStepFlip`) and the follow-scrolls
  (`useFollowLatest` in ManagedLaunch.tsx, GiftJourneyV2Motion) divide their `getBoundingClientRect` values by that
  factor, so they stay in CSS px. At the drawn size the factor is 1, so nothing changes.

`ml-motion.tsx` is the entry point: `ManagedLaunchPanel` draws the visual in the `.ml-motion` scope (on the client
only), filling the panel it sits in, used by journey/journey.tsx. It plays as in the source: it starts once it is 30%
on screen with the tab focused, fades out and loops when it finishes, and shows its final state with
`prefers-reduced-motion`.
