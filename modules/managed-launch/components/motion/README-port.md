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

## 11 November 2026 update

From the updated handoff (the window standard, and 01m):

- **01m** (`ManagedLaunchMwebStatic`, 353 × 440): the plan card at its final state, laid out for a phone.
  `ManagedLaunchMwebPanel` draws it; journey/journey.tsx shows it below 768px in place of 01.
- **Window standard:** the source's page stylesheet, `managed-launch-motion.css`, is scoped under `.mlm`, which its page
  sets on <body>. The `.ml-motion` root carries `mlm` too, so those rules read `.ml-motion.mlm …`.
- **Source changes carried over:** GrowComposer (new) and Shell's `growComposer`, LaunchAudience's merchant mark,
  `bare` / `compact` / `railActive` and `fit`, the Amber & Oak lamps, the Auden names, and `beatsDurationMs`.
- **motion.css** was regenerated from the new source's stylesheets in its build order (GrowComposer.css and
  managed-launch-motion.css are new; SceneFrame.css now comes before BrandIdentity.css). The new 353 × 440 green frame
  is the one relative url, pointing at assets/motion/ill-frame. A "Site" rule at the end hides 01m's gallery caption.

## 15 November 2026 update: the diagram

From the "Crossword — Managed Launch · Diagram" handoff, whose one visual is "C — Deliverable per step"
(`DeliverableSteps`):

- `visuals/ManagedLaunch/JourneyDiagram.tsx` is the source file with the image imports changed as above (its icons and
  the refine connector are in `assets/motion/managed-launch/`). It reads `journeyPreview` from `data.ts`, which is
  unchanged, as is the catalog.
- **motion.css** has its stylesheet, `JourneyDiagram.css`, as a new segment after managed-launch-motion.css, scoped and
  renamed like the rest (`.ml-motion …`, `mlm-jd-*` keyframes, Geist and Inter on the next/font variables, the green
  damask at assets/motion/ill-frame/retain). One "Site" rule follows it: the landing motion waits until the diagram is
  on screen (`jd-wait`), where the source plays it on load.
- `ManagedLaunchDiagram` (ml-motion.tsx) draws it in the `.ml-motion` scope, on the server too, as a block that fills
  its column and reflows by its own width; journey/journey.tsx shows it at every screen width, in place of 01 and 01m.
  `ManagedLaunchPanel` and `ManagedLaunchMwebPanel` (01 and 01m) are still here but no longer used on the page.


## 17 November 2026 update: the diagram's phone version

From the "Crossword — Managed Launch · Diagram (V2)" handoff:

- `JourneyDiagram.tsx` merged with the new source: `DeliverableStepsNarrow` ("C — Deliverable per step · 353 Thread",
  353 × 560) and the steps' `short` tag labels. The image imports stay as above.
- **motion.css**: the JourneyDiagram segment regenerated from the new `JourneyDiagram.css` (the Thread's styles, and
  the one tag style on every `.jd-who`, which the 1280 diagram picks up too). Its backdrop, `managed-launch-bg.webp`,
  is in `assets/motion/managed-launch/`.
- `ManagedLaunchDiagramNarrowPanel` in ml-motion.tsx draws it scaled to fit its panel, starting once it is on screen;
  journey/journey.tsx shows it below 768px in place of the 1280 diagram.
