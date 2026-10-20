# Sell motion visuals: shared layer port

Source: `index-CBDjKBqm.js` and `index-B9W2-i5Q.css` from the "Sell: Conversational
Interface — Motion" build. The scene chunk (`sellConversationalInterfaceMotion-*.js`)
imports these as
`import{j as e,r as c,M as D,I as Z,…}from"./index-CBDjKBqm.js"`. `e` (jsx runtime),
`c` (React) and `k0` (createRoot) are not ported.

## Export map

"Scene alias" is the name inside the scene chunk; "index" is the letter in
`index-CBDjKBqm.js`'s `export{}`.

| Scene alias | Index | Minified | Port | File |
| --- | --- | --- | --- | --- |
| `R` | `C` | `C3` | `ChatScene` | chat-scene.tsx |
| `b0` | `f` | `o3` | `useBeats` (+ types `Beat`, `BeatState`) | motion.ts |
| `y2` | `u` | `Ac` | `useInViewAndFocused` | motion.ts |
| `y` | `U` | `h3` | `UserTurn` | primitives.tsx |
| `v` | `A` | `m3` | `AssistantTurn` | primitives.tsx |
| `B` | `a` | `is` | `ChatMessage` | primitives.tsx |
| `k` | `T` | `d3` | `ThinkingStatus` | primitives.tsx |
| `N` | `b` | `p3` | `AssistantReply` | primitives.tsx |
| `I2` | `R` | `k3` | `ReservedReply` | primitives.tsx |
| `H2` | `k` | `x3` | `Reveal` | primitives.tsx |
| `M` | `E` | `w3` | `EnterDelayed` | primitives.tsx |
| `Y` | `h` | `S3` | `ExpandItem` | primitives.tsx |
| `S` | `c` | `v3` | `InsightCard` | primitives.tsx |
| `c2` | `P` | `_3` | `ProductReference` | primitives.tsx |
| `D` | `M` | `zc` | `Media` | primitives.tsx |
| `Z` | `I` | `Tn` | `Icon` (+ type `IconName`) | primitives.tsx (data in artwork.ts) |
| `h2` | `p` | `Zt` | `IconButton` | primitives.tsx |
| `L` | `B` | `g3` | `Button` | primitives.tsx |
| `C` | `S` | `y3` | `Skeleton` | primitives.tsx |
| `b2` | `e` | `E3` | `Chip` | primitives.tsx |
| `j0` | `m` | `L3` | `AttributeRow` | primitives.tsx |
| `F2` | `i` | `Ic` | `ChatHeader` | primitives.tsx |
| `o2` | `l` | `Vc` | `Composer` | primitives.tsx |
| `n0` | `g` | `Fc` | `ContentFade` | primitives.tsx |
| `f0` | `n` | `Oc` | `ChatShell` | primitives.tsx |
| `y0` | `o` | `Bc` | `Thread` | primitives.tsx |
| `p` | `d` | `jc` | `productImages` (+ `productCutouts`) | products.ts |

Also ported (exported by index but not imported by the scenes): `t`/`s3` → `AiStatus`,
`v`/`a3` → `StaggerText`, `s`/`Wc` → `typeText`, `w`/`$c` → `smoothScrollTo`. Internal
helpers: `f3` → `RichStaggerText`, `u3` → `AiStatusIcon`, `Dc` → `ConversationViewport`,
`i3` → `replyDuration`, `l3` → `wordCount`, `r3` → `usePrefersReducedMotion`.
New: `MotionRoot` (the `.ill-sell` scope wrapper, see CSS below).

## Props

- **`ChatScene`** `{ brand?, beats: Beat[], play? = true, width?, height?, header?, className?: string | (t) => string | undefined, threadClassName?, alignTallTurnTop? = false, children: (t: BeatState) => ReactNode }`.
  Renders `ChatShell` (450 × 500 unless both `width` and `height` given) with
  `<Thread>{children(t)}</Thread>` (wrapped in `<div className={threadClassName}>` if set).
  The composer shows what the current `compose` beat has typed (stock "Ask anything..."
  plus a blinking caret while a compose beat with text is current, even before typing starts).
  Follow-scroll: on every beat change and every thread resize, if the last turn isn't fully
  above `viewport bottom - 40px`, eases (320ms, cubic-bezier(.32,.72,0,1)) so its bottom sits
  40px above the edge (`alignTallTurnTop`: a turn taller than the viewport is aligned by its
  top). Instant under reduced motion. Empty thread → scrollTop 0.
  **`play` replaces the source's `y2(rootRef)` gate.** The source played while ≥30% in view
  and the tab visible and focused; here the host decides.
- **`useBeats(beats, play)`** → `BeatState`: `reached(id)` (index ≥ beat), `passed(id)`
  (index > beat), `loading(id)` (index === beat), `status(id)` (`{label, visible}` while that
  think beat plays, else null), `composer` (`{value, typing: true}` during a compose beat
  with text, else null), `index`, `done`, `reducedMotion`, `runKey`. Unknown ids throw.
  Beats (durations unchanged):
  - `compose {text?, leadMs?, holdMs?}`: lead 350ms (first beat) / 900ms, types 26ms/char ±30%
    jitter, sends 220ms after the last char. No text: holds `holdMs ?? 700`.
  - `think {labels}`: 1 label 600ms; 2 labels swap at 300ms, hold 800ms total; then
    `visible: false` and 150ms exit.
  - `text {text}`: `words × 45 + 220 + 150` ms (`**` markers not counted).
  - `appear {ms? = 450}`, `load {ms? = 650}`, `pause {ms}`.
  Looping/restart: identical to source. Plays while `play`; `play` false stops the clock
  where it is; `play` false → true restarts from beat 0 and bumps `runKey`. It never loops on
  its own. Reduced motion: starts at the end (`index = beats.length`).
- **`useInViewAndFocused(ref)`** → boolean: IntersectionObserver threshold 0.3 AND
  `document.visibilityState === "visible" && document.hasFocus()`. Use it where a source
  scene called `y2(ref)` only if you want the source gate; prefer the scene's `play` prop
  (`const active = play;` or `play && inView`).
- **`UserTurn` / `AssistantTurn`** `{ animateIn? = false, className?, children }`.
- **`ChatMessage`** `{ role: "user" | "assistant", text?, children? }` (children win).
- **`ThinkingStatus`** `{ t: BeatState, id }`: `AiStatus` for think beat `id` while it plays.
- **`AssistantReply`** `{ text }`: assistant bubble, word stagger, inline `**bold**`.
- **`ReservedReply`** `{ t, text, thinkId, replyId }`: invisible copy reserves the reply's
  height; status then reply overlaid (`.sell-reserve*`).
- **`Reveal`** `{ show, children }`: `sell-hidden` (keeps space) until `show`, then enters.
- **`EnterDelayed`** `{ delayMs?, children }`: `ill-assistant-turn--enter` with animation delay.
- **`ExpandItem`** `{ index, children }`: `.sell-expand-item` with `--sell-i`. Its CSS
  (`.sell-expand`, `.sell-expand--expanded .sell-expand-item`, keyframes) is scene CSS, not shared.
- **`InsightCard`** `{ source? = "Thinking", sourceSuffix?, lines: string[], attribution?, footer?: { label, icon?: IconName = "checks" } }`.
- **`ProductReference`** `{ image?: StaticImageData | string, alt, brand?, title, price? }`.
- **`Media`** `{ src?: StaticImageData | string, alt, sizes? }`: `img.ill-media` (cover);
  `--cutout` (contain on subtle bg) when `src` is one of `productImages`; no src →
  placeholder div. Static images go through `next/image` **unoptimized** (source pixels) with
  `loading="eager"`; pass `sizes` to opt into Next resizing. String src → plain `<img>`.
- **`Icon`** `{ name: IconName, size? }`: data-URI `<img>` at native size or scaled to width
  `size`. Names: history, add, expand, close, send, favorite, insight, caretDown, aiStatus,
  historyGold, addGold, expandGold, closeGold, sendGold, addMuted, sparkle, lock, shieldCheck,
  checks, union, sourceDot, money, userSound, warning, caretRight, search, address, spark.
- **`IconButton`** `{ icon, label, variant: "outline" | "outline-md" | "accent" | "accent-sm", onClick?, className? }`
  (send/sendGold rotated −90°; `accent` draws the icon at 20px).
- **`Button`** `{ appearance: "primary" | "secondary" | "accent" | "ghost", label, onClick?, iconLeading?, iconTrailing? }`.
- **`Skeleton`** `{ width?, height?, aspectRatio?, radius? }`.
- **`Chip`** `{ kind? = "label" | "discount" | "action", size? = "md" | "sm", tone? = "primary" | "gold", children }`.
- **`AttributeRow`** `{ label, value }`.
- **`ChatHeader`** `{ brand, showHistory?, showAdd?, showExpand?, showClose? (all true), onClose? }`.
- **`Composer`** `{ value? = "Ask anything...", typing? = false, variant? = "default" | "expanded", visible? = true, sending? = false }`.
- **`ChatShell`** `{ brand?, width?, height?, composerValue?, composerTyping?, viewportRef?, rootRef?, header?, composer?, className?, children }`.
- **`Thread`**, **`ContentFade`**, **`ConversationViewport`** `{ ref?, children }`.
- **`productImages`**: espressoMachine, accessoryBundle, leatherFrameCase, silkScarf,
  smartSpeaker, wirelessEarbuds, leatherWallet, auden, audenIvory, audenOlive, audenMustard,
  familyAirFryer, compactAirFryer, referenceLamp, tripodLamp, domeLamp, bedsideLamp,
  foundation, cottonShirt, tailoredTrousers, leatherSneakers (800 × 800 PNGs in
  `modules/sell/assets/motion/`, hash suffix stripped). `p.example` / `p.webp` in the scene
  chunk are unrelated locals.

## CSS (`shared.css`, imported by primitives.tsx)

- Verbatim from `index-B9W2-i5Q.css`, minus the gallery's own rules (`.app-*`, `*`, `body`).
- **Every selector is prefixed with `.ill-sell `** and `:root` became `.ill-sell`. Reason: the
  home page's motion CSS uses the same `ill-` class names with different values, and Next
  keeps a route's CSS after client navigation. **Render scenes inside `<MotionRoot>`** (one
  per section is enough) and **prefix every scene-CSS selector with `.ill-sell ` too** so the
  original cascade (source scene CSS loaded after index CSS, same specificity + 1) holds.
  `@keyframes` names are left as they are (shared ones are identical to the home page's).
- `.ill-sell` restores the source page's defaults over Tailwind's base: Geist, 16px,
  `line-height: normal`, black, default smoothing / text-rendering. Tailwind preflight still
  applies inside (margins 0, `img { display:block; max-width:100%; height:auto }`,
  `button { font: inherit; background: transparent; border: 0 solid }`, `h1–h6` unstyled,
  lists unstyled). Shared CSS sets everything it relies on; check scene CSS that relied on
  UA defaults (e.g. default `<p>`/`<h*>` margins, default button chrome).
- Font families map to next/font variables (lib/fonts.ts): use `var(--ill-font-geist)`,
  `--ill-font-dm-sans` (DM Sans with opsz), `--ill-font-inter`, `--ill-font-geist-mono`,
  `--ill-font-playfair-display`, `--ill-font-noto-serif`, `--ill-font-quicksand`,
  `--ill-font-space-grotesk`. SF Pro / `--im-font-*` stacks in the scene CSS are system
  fonts: leave them.
- `.sell-reserve`, `.sell-hidden`, `.sell-reserve__live` (scene CSS in the source) are
  appended to shared.css because `ReservedReply`/`Reveal` need them.
- Generator used: `node <scratchpad>/gen-css.mjs <minified.css> <out.css>` (prefixes, drops
  gallery rules, maps fonts); format with `npx prettier@3.3.3 --parser css`.

## Verification

`app/motion-preview` (temporary) renders a paused shell and the `conversational-discovery`
script without cards. At 1x vs `http://127.0.0.1:5180/?s=conversational-discovery`: paused
shell 0 px different; scripted frames 0 px different once the source is served the same
font files. Residual on Windows: Google serves Windows-hinted Geist to Windows browsers
while next/font self-hosts the file it fetched with a macOS user agent, so on Windows a few
glyph-edge pixels differ (about 60–100 px per 450 × 500 frame, max channel delta ~27).
