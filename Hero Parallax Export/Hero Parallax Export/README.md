# Hero Parallax — Export

Self-contained, production build of the 8-layer parallax hero
(`src/hero/main-parallax.tsx` in the Crossword repo, cursor-driven
camera orbit around the concierge, with HoloMosaic glitch on the
concierge layer). No dev server, no Node, no build step required —
every asset is bundled and referenced with a relative path.

## View it

Open `hero-parallax.html` directly in a browser, or serve the folder
with anything static, e.g.:

```
python3 -m http.server 8080
```

then visit `http://localhost:8080/hero-parallax.html`.

## What's inside

- `hero-parallax.html` — the page.
- `assets/` — the bundled JS, CSS, and the eight cropped parallax
  layers it uses (`01_bg` … `08_bell`; the hashed JS/CSS files are the
  built bundle).

This is a snapshot: rebuilding `main-parallax.tsx` (or re-cropping the
layers) later won't update this folder. The DialKit tuning panel still
renders in this build since it isn't gated behind a dev check — it's
not meant for the recipient to touch, just left over from dev.

Rebuilt from the Crossword repo with:
```
npx vite build --config vite.config.parallax-export.ts
```
using `vite.config.parallax-export.ts` at the repo root — a one-off
config (unlike the main `vite.config.ts`) whose `rollupOptions.input`
points only at `hero-parallax.html` and whose `outDir` points at this
folder, kept in the repo so this export can be rebuilt after future
edits.
