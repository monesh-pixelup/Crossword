# Scenarios 02d & 06 — Export

Self-contained, production build of two individual MotionShowcase
scenarios, each on its own page (no nav/switcher chrome):

- `scenario-02d-sponsored-comparison-motion.html` — **02d — Sell: Dynamic
  sponsored comparison (motion)** (`src/visuals/SponsoredComparisonMotion`)
- `scenario-06-ask-insight.html` — **06 — Insights: Ask your business**
  (`src/illustrations/AskInsight`)

No dev server, no Node, no build step required — every asset is bundled
and referenced with a relative path.

## View it

Open either `.html` file directly in a browser, or serve the folder with
anything static, e.g.:

```
python3 -m http.server 8080
```

then visit `http://localhost:8080/scenario-02d-sponsored-comparison-motion.html`
or `http://localhost:8080/scenario-06-ask-insight.html`.

## What's inside

- The two scenario pages.
- `assets/` — the bundled JS, CSS, and source images/SVGs each scenario
  uses.

This is a snapshot: rebuilding the source components later won't update
this folder.

Rebuilt from the Crossword repo with:
```
npx vite build --config vite.config.scenarios-export.ts
```
using `vite.config.scenarios-export.ts` at the repo root — a one-off
config (unlike the main `vite.config.ts`) whose `rollupOptions.input`
points at `scenario-02d-sponsored-comparison-motion.html` and
`scenario-06-ask-insight.html`, and whose `outDir` points at this
folder, kept in the repo so this export can be rebuilt after future
edits. Each page's entry (`src/scenario-02d-main.tsx` /
`src/scenario-06-main.tsx`) just renders that one component standalone,
reusing `App.css`'s `.app-stage` wrapper for the same centered layout
it gets inside the full showcase.
