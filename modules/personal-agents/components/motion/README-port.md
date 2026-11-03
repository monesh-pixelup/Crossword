# Personal Agents motion visuals: port notes

Source: the "Crossword — Personal Agents motion" design handoff (a separate Vite project, not kept in this repo). Its
eleven visuals (00–10) are on the Personal Agents page.

`brands/`, `components/`, `illustrations/`, `visuals/` and `assets/products/cutouts/index.ts` are the source's `src/`
files that the 11 visuals import, copied file for file. Logic, markup and copy are unchanged, apart from these
mechanical edits:

- **Images.** Next's static imports are `StaticImageData`, not URL strings, so each `import x from "….png"` became
  `import xImage from "@/modules/personal-agents/assets/motion/…"` plus `const x = xImage.src;`. Assets live in
  `modules/personal-agents/assets/motion/` with the source's `src/assets/` layout (LaunchAudience's avatars under
  `illustrations/LaunchAudience/avatars/`).
- **Brand marks.** `brands/BrandIdentity.tsx` loaded the marks with Vite's `import.meta.glob`; the same maps are
  spelled out as imports. `brands/registry.json` names its brand fonts by the next/font variables (the same file as
  Retain's port).
- **CSS.** The per-component `import "./X.css"` lines are gone. All styles come from `motion.css`, generated from the
  source stylesheets these visuals import (with `PersonalAgentsPossibilitiesMotion.css`, which the source's page
  imports itself), in the order Vite concatenates them. In `motion.css`, every selector is prefixed with `.pa-motion`,
  keyframes are renamed `pam-*`, Geist and Crimson Pro point at the next/font variables, and a zero-specificity block
  puts back the browser defaults that Tailwind preflight removes. One site rule is added: the visuals caption
  themselves with the gallery's tile label, which the site leaves out.
- **React 19 types.** `RefObject<T>` props take `RefObject<T | null>`.

Nothing in these visuals measures layout with `getBoundingClientRect`, so they need no changes for the site's zoom.

`pa-motion.tsx` is the entry point: `paScenes` (the source's slugs with a `pa-` prefix, each with its drawn size and
about how long it takes to settle, timed from the source build) and `PaMotionRoot`, the `.pa-motion` scope, which
renders the visuals on the client only. The page's sections are the AI Assistants page's, which look a slug up in
both pages' registries (`modules/ai-assistants/components/motion/motion-scenes.tsx`):

| Visuals | Size | Used in |
| --- | --- | --- |
| 00 `pa-the-case-motion` | 1280 × 599 | The case (AssistantCampaigns `scene`, app/(product)/personal-agents/page.tsx) |
| 01–03 `pa-whats-new-motion` … `pa-is-there-an-offer-motion` | 789 × 579 | Possibilities tabs, inside the panel's lattice frame (config/possibilities.ts) |
| 04–06 `pa-send-it-back-motion` … `pa-something-i-like-motion` | 679 × 579 | Logged-in panel, by the open quote (config/logged-in.ts) |
| 07 `pa-insights-motion` | 1280 × 599 | Insights (`scene`, the page) |
| 08–10 `pa-upgrade-suggestion-motion` … `pa-merchandising-priorities-motion` | 355 × 402 | Promotions steps' cells (config/promotions.ts) |
