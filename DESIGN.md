---
version: alpha
name: Crossword
description: >-
  Crossword (Crossword, Inc., a CometChat product) is an AI shopper assistant
  presented as "the concierge desk for your brand". The visual language borrows
  from a grand hotel's front desk: a service-bell mark, cream paper, maroon and
  gold, jewel-toned damask panels, stamps, wax seals, and swash-capital serif
  headlines. Guardrail: it must never read as a generic AI chatbot or SaaS
  dashboard, nor as a costume or Victorian pastiche.
colors:
  primary: "#7d0034"
  on-primary: "#f7c849"
  secondary: "#6c2332"
  on-secondary: "#e0be60"
  trim: "#e0be60"
  trim-bright: "#f7c849"
  neutral: "#fff9ea"
  surface: "#fff9ea"
  surface-sand: "#f3e9d4"
  surface-parchment: "#faedd4"
  surface-linen: "#efe9db"
  surface-bone: "#e8dec1"
  surface-forest: "#00331a"
  surface-forest-deep: "#002916"
  surface-forest-light: "#004c27"
  surface-aubergine: "#462160"
  surface-night: "#0e0501"
  on-surface: "#141414"
  on-surface-soft: "#33322f"
  on-surface-muted: "#66645e"
  on-surface-label: "#766640"
  on-dark: "#dfe3d2"
  on-dark-muted: "#869d88"
  on-night: "#fff9ea"
  line: "#c8c3b8"
  line-rail: "#d2cbba"
  line-engraved: "#b7ae9a"
  line-mockup: "#cfb8bb"
  accent-amber: "#ffb657"
  success: "#2f6b3f"
  warning: "#8a5a14"
  error: "#9b1c1c"
  info: "#462160"
typography:
  display:
    fontFamily: Crimson Pro
    fontSize: 70px
    fontWeight: 200
    lineHeight: 1.1
    letterSpacing: -0.05em
  headline:
    fontFamily: Crimson Pro
    fontSize: 60px
    fontWeight: 200
    lineHeight: 1.1
    letterSpacing: -0.05em
  swash:
    fontFamily: Parisienne
    fontSize: 82px
    fontWeight: 400
    lineHeight: 1.18
  h4:
    fontFamily: Crimson Pro
    fontSize: 40px
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: -0.04em
  h5:
    fontFamily: Crimson Pro
    fontSize: 32px
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: -0.04em
  h6:
    fontFamily: Crimson Pro
    fontSize: 28px
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: -0.03em
  title-sm:
    fontFamily: Crimson Pro
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -0.04em
  body-lg:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: 300
    lineHeight: 1.3
    letterSpacing: -0.02em
  body:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: -0.02em
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: -0.02em
  caption:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: -0.03em
  ui-serif:
    fontFamily: Crimson Pro
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.375
    letterSpacing: -0.03em
  label:
    fontFamily: Open Sans
    fontSize: 12px
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: 0.12em
rounded:
  none: 0px
  mockup: 12px
  full: 9999px
spacing:
  unit: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  section-gap: 80px
  section-pad: 120px
  page-pad: 80px
  frame-inset: 24px
  container-max: 1280px
  nav-height: 72px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.ui-serif}"
    rounded: "{rounded.none}"
    padding: 8px 12px
  button-primary-soft:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.trim}"
    typography: "{typography.ui-serif}"
    rounded: "{rounded.none}"
    padding: 8px 12px
  button-wine:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    typography: "{typography.ui-serif}"
    rounded: "{rounded.none}"
    padding: 8px 12px
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.ui-serif}"
    rounded: "{rounded.none}"
    padding: 8px 12px
  text-link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-soft}"
    typography: "{typography.ui-serif}"
    rounded: "{rounded.none}"
    padding: 2px
  eyebrow:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-label}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: 10.5px 5.5px
  eyebrow-sand:
    backgroundColor: "{colors.surface-sand}"
    textColor: "{colors.on-surface-label}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
  tab:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.title-sm}"
    rounded: "{rounded.none}"
    padding: 40px
  tab-active:
    backgroundColor: "{colors.surface-sand}"
    textColor: "{colors.on-surface}"
  card:
    backgroundColor: "{colors.surface-sand}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.none}"
    padding: 24px
  panel-forest:
    backgroundColor: "{colors.surface-forest}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.none}"
  panel-aubergine:
    backgroundColor: "{colors.surface-aubergine}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.none}"
  panel-maroon:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.none}"
  footer:
    backgroundColor: "{colors.surface-forest}"
    textColor: "{colors.on-dark}"
    typography: "{typography.caption}"
  footer-legal:
    backgroundColor: "{colors.surface-forest}"
    textColor: "{colors.on-dark-muted}"
    typography: "{typography.caption}"
  hero-night:
    backgroundColor: "{colors.surface-night}"
    textColor: "{colors.on-night}"
    typography: "{typography.display}"
  chat-bubble-user:
    backgroundColor: "{colors.secondary}"
    textColor: "#ffffff"
    typography: "{typography.body-sm}"
    rounded: "{rounded.mockup}"
  input:
    backgroundColor: "{colors.surface-linen}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    height: 48px
  card-mockup:
    backgroundColor: "{colors.surface-parchment}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.mockup}"
    padding: 16px
  card-forest-deep:
    backgroundColor: "{colors.surface-forest-deep}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: 24px
  portrait-card:
    backgroundColor: "{colors.surface-forest-light}"
    textColor: "{colors.on-night}"
    typography: "{typography.h5}"
    rounded: "{rounded.none}"
  skeleton:
    backgroundColor: "{colors.surface-bone}"
    rounded: "{rounded.none}"
    height: 16px
  divider:
    backgroundColor: "{colors.line}"
    height: 1px
  page-rail:
    backgroundColor: "{colors.line-rail}"
    width: 0.5px
  eyebrow-frame:
    backgroundColor: "{colors.line-engraved}"
    width: 0.5px
  mockup-hairline:
    backgroundColor: "{colors.line-mockup}"
    height: 0.5px
  live-indicator:
    backgroundColor: "{colors.accent-amber}"
    rounded: "{rounded.full}"
    size: 8px
  status-success:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.success}"
    typography: "{typography.body-sm}"
  status-warning:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.warning}"
    typography: "{typography.body-sm}"
  status-info:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.info}"
    typography: "{typography.body-sm}"
  status-error:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.error}"
    typography: "{typography.body-sm}"
---

## Overview

Crossword is the **concierge desk for your brand**: an AI shopper assistant that
remembers, recommends, resolves and reports. The interface argues that idea before
the copy does. It draws on hotel stationery and front-of-house craft (a service-bell
mark, cream paper, gilt trim, stamps, wax seals, damask-lined panels, engraved
hairlines and a handwritten swash capital on every headline), all set with modern
precision.

The guardrail: never read as a generic AI chatbot or SaaS dashboard (no sparkle logos,
neon gradients or robot glyphs), and never tip into costume (no faux-Victorian
excess). Ornament lives at the edges; content stays clean.

The long-form audit, reasoning and debt are in `brand.md`. If the two disagree, this
file wins.

## Colors

- **Paper first.** Every page starts on `neutral` cream `#fff9ea`. Use `surface-sand`
  for active, selected and card states, and `surface-parchment` for mock-up grounds.
  Pure white is only for third-party mock-up UI.
- **Maroon is the brand colour** (`primary #7d0034`), used for the primary button,
  active progress rules and featured panels. `secondary` wine `#6c2332` is the
  secondary button ground and the hairline outline on gilded ornaments.
- **Gold is trim** (`trim #e0be60`): studs, 0.5–1px rails, dashed button borders,
  icon and seal fills. Gold text on cream is 1.71:1, so never use it as text on
  light grounds. It is fine on maroon (6.09), wine (6.08), forest (7.86) and
  aubergine (7.11).
- **Livery panels.** `surface-forest #00331a` (footer, Trust, Upsell),
  `surface-aubergine #462160` and maroon carry damask texture behind product
  mock-ups. Use one livery panel per viewport. `surface-night #0e0501` sits behind
  photographic heroes.
- **Text.** `on-surface` ink `#141414` (17.5:1 on cream). `on-surface-muted`
  `#66645e` (= black/60, 5.63:1) is the floor for small text. Never go below 60%
  black on cream. On forest, use `on-dark #dfe3d2` and `on-dark-muted #869d88`
  (= `#dfe3d2`@60, 4.83:1).
- **Lines.** `line-rail #d2cbba` (page rails, dividers) and `line-engraved #b7ae9a`
  (eyebrow frames) are decorative, below 3:1, and never carry meaning on their own.
  `line` is the generic UI border.
- **Amber** `accent-amber #ffb657` is a live indicator and gilt line on dark grounds
  only (1.65:1 on cream).
- **Semantic** colours are reserved for product UI. `error` is a true red, distinct
  from maroon, so an error never reads as brand.

## Typography

- **Crimson Pro** is the voice: headlines (ExtraLight 200 at display sizes, Light 300
  for the second line, quotes and h4–h6), plus 16px UI serif (nav, button labels,
  text links) at 400/500.
- **Parisienne** sets the *first capital of a headline only*, at about 1.3× the line
  size. The repo ships a subset of A C E G N O S T W Y; extend the subset before
  writing a headline that needs another letter. Use one swash per headline and one
  swash headline per section. Never use it for words, body, buttons or product UI.
- **Geist** handles body, microcopy and all product UI.
- **Open Sans SemiBold** is for the 12px uppercase eyebrow label (+12% tracking)
  and nothing else.
- Headline grammar: two lines in sentence case, each line a complete phrase.
  Hierarchy comes from family and size, not weight: big type is *light*.
- Tracking: body −2%, serif UI −3%, h4–h6 −4%, display −5%, label +12%.
- Responsive: display 70/56/48/44; headline 60/48/40/36; h4 40/34/30/28;
  h5 32/28/26/24; h6 28/24/22/20 (desktop / ≤991 / ≤767 / ≤479).
- Retired: Inter, DM Sans and Tangerine (DM Sans may only appear inside a mock-up
  depicting a specific merchant's site).

## Layout

- Desktop artboard 1440, content 1280 (`page-pad` 80 → 48 → 24 → 20). Cap the
  content at `container-max` 1280.
- Two 0.5px `line-rail` page rails run the full height at `frame-inset`
  (24 → 12 → 8). A 1px gold accent marks each section's header on the left rail.
- Sections: a 24px divider band carrying a notched stamp badge, then the eyebrow,
  the swash headline (24px gap), body (24–32px gap) and the composed artboard.
  Padding is 120 → 96 → 72 → 64.
- Spacing rhythm: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80 · 120.
- Breakpoints: 480 · 768 · 992 (and 1200 on product pages).
- Illustrations and mock-ups are composed artboards scaled to their container.
  Running text reflows; never scale body text with `zoom`.

## Elevation & Depth

Depth is **paper and objects, not UI layers**. Brand chrome is flat. Shadows are
soft, warm and low-opacity: the eyebrow uses `0 1px 1px rgba(0,0,0,.11)`, and
stamps use `0 2px 4px rgba(24,8,36,.35)` at rest and `0 20px 14px rgba(24,8,36,.3)`
in the air. Mock-ups may use an inset wine glow (`inset 0 0 20px rgba(108,35,50,.45)`)
and a soft gold halo. Physical objects (stamps, seals, the envelope, portrait cards)
may tilt (±7°) and cast shadows; UI never tilts.

## Shapes

- Radius **0** for every brand element: buttons, eyebrows, cards, tabs, panels,
  header, footer and modals. `rounded.mockup` (12px) and `full` are only for
  depictions of third-party UI (chat widget, merchant storefront cards, pills).
- Frames get **concave quarter-circle notches** at the corners (stamp or ticket);
  stamps get perforated edges.
- Hairlines are 0.5px, drawn as an outline with a negative offset so they take no
  layout space.
- The StampButton carries four 3px gold studs about 2px inside its corners, with
  large and small studs alternating diagonally, and a 1px dashed gold border.
- Icons: Phosphor Regular, 12/16/20/24px, `currentColor`. Ornamental "gilded" icons
  (gold fill with a 0.5px wine hairline) are for feature or decorative use at 24px
  and above.

## Components

- **button-primary**: maroon ground, gold-bright UPPERCASE Crimson 500 16px label,
  dashed gold border, four studs. Hover: `brightness(1.1)` over 200ms. Pressed:
  translateY(1px) and brightness(.95) over 100ms. Focus: a 2px outline at offset 2,
  maroon on light grounds and **gold** on dark or maroon. Disabled: 40% opacity.
  Use one per view.
- **button-wine**: the primary-button equivalent on forest, photo or night grounds.
- **button-outline**: the secondary action on cream (`#b8b8b8` border, grey studs).
- **text-link**: UPPERCASE Crimson 16px, a 1px bottom border at
  `rgba(40,40,40,.3)` and an arrow. Hover moves to ink.
- **eyebrow**: a square label with a 0.5px engraved stroke and four corner curls,
  in Open Sans 600 12px uppercase olive. Every section has one.
- **tab / tab-active**: square cells with 1px borders. The active cell is sand, and
  inactive content sits at 50% opacity. A 2px progress rule (maroon on light, gold
  on dark) fills over 6s. The rule pauses on hover, focus and off-screen, and is
  static under reduced motion.
- **card**: sand or parchment, square, with an optional 0.5px gold or rail hairline.
- **panel-***: a full content-width livery panel with damask texture, a notched gold
  inner frame and an inset parchment mock-up card. One per viewport.
- **footer**: forest ground with grain at 40% soft-light, a gilt notched frame,
  `{ COMPANY }` / `{ PLATFORM }` headings and the monogram tagline.
- **input** (product): square, linen ground, 48px tall, with a 2px maroon focus
  outline.

## Do's and Don'ts

- Do start every composition on cream. Add one livery panel per viewport for emphasis.
- Do open every section headline with one Parisienne swash capital, followed by
  two lines of Crimson Pro ExtraLight.
- Do use gold only as trim: studs, rails, dashed borders, seals and icon fills.
- Do keep every brand corner square; notch frames, never round them.
- Do give every interactive element a visible `:focus-visible` ring.
- Don't use gold or amber as text on cream (they fail contrast).
- Don't use script for anything but the first capital of a headline.
- Don't use sparkle, robot or brain glyphs, or purple–blue gradients, as brand
  elements.
- Don't put two livery panels side by side, or damask behind working product UI.
- Don't use maroon to mean "error".
- Don't animate with springs or overshoot outside the envelope and stamp ceremonies.
- Don't go below 60% black (light) or 60% `#dfe3d2` (forest) for small text.

## Motion

The motion personality is **unhurried and attentive**. The canonical values live in
`tokens/motion.css`.

| Token | Value | Use |
|---|---|---|
| `--dur-instant` | 100ms | press |
| `--dur-fast` | 150ms | colour and opacity hover, exits |
| `--dur-base` | 200ms | button feedback, focus |
| `--dur-moderate` | 300ms | tabs, accordion, menus |
| `--dur-slow` | 500ms | carousel, panel enter |
| `--dur-ambient` | 6000ms | auto-advance dwell |
| `--ease-out` | cubic-bezier(0.22, 1, 0.36, 1) | enters and UI transitions |
| `--ease-in-out` | cubic-bezier(0.65, 0, 0.35, 1) | moves between rests |
| `--ease-in` | cubic-bezier(0.4, 0, 1, 1) | exits |
| `--distance-sm/md/lg` | 4 / 8 / 24px | dropdown, hover lift, reveal |

- Animate `transform` and `opacity` only; name the properties (never `transition: all`).
- Auto-rotation pauses on hover, keyboard focus, off-screen and hidden tabs.
- Reduced motion keeps colour and opacity changes and drops movement and auto-advance.
- Hover effects are gated by `(hover: hover)`.
- Ceremonies are exempt and documented individually: the **envelope** (a GSAP
  scrubbed timeline: seal press, flap, letter, photo) and the **launch wheel**
  (stamp drop with squash).

## Imagery

- Textures: maroon, aubergine and forest damask (inside livery panels at full
  strength, elsewhere at 20% or less); paper grain at soft-light 40% on forest; the
  trellis divider tile at 20%.
- Stamps and seals: guilloché postage stamps and wax seals (green, purple, gold) as
  objects that may tilt and cast shadows.
- Photography: hospitality interiors and front-of-house people in warm tungsten
  light, faded to `surface-night` for type. No tech offices, screens-as-hero or
  AI-generated faces.

## Voice

A seasoned concierge: warm, composed, quietly confident. Short declaratives and
parallel triplets ("remembers, recommends, resolves, and reports").

- Headlines are sentence case. Buttons and text links are UPPERCASE.
- Use the Oxford comma, curly apostrophes and the em dash.
- Say concierge, desk, hire, guest, conversation and guardrails. Avoid bot,
  chatbot, magic, seamless and supercharge.
