// Verbatim from crossword-storybook-master (apps/storybook/flows/widget-main):
// the web proactive knock as BarProactiveWeb KnockSeat injects it.
// Generated copy, do not edit by hand; re-copy from the Storybook instead.
// Only interpolations are resolved: BUZZ_ENTER_MS 883, BUZZ_SHAKE_MS 483,
// BUZZ_EXIT_MS 333; WINDOW_TIP_CSS (icon-door tooltips) is left out, as
// no door here is icon-only.

// BUZZ_NOTE_CSS — animation/BarProductBuzz.stories.tsx
export const BUZZ_NOTE_CSS = `
/* The notification: seated a turn (16px) above the resting bar,
   arriving the way the study draws it — a POP from nothing, growing
   through 105%, easing back through 95% and seating at full, all
   about its own centre. The dismissal SINKS — down past the bar and
   off the floor of the screen, fading as it goes — and a finger can
   drag it the same way. Enter and exit are SEPARATE animations —
   is-out replaces the property, so the finished fill-both pop never
   holds the transform against the leave. */
.wm-bar-buzz-note {
  position: fixed;
  bottom: calc(1.5rem + var(--wm-bar-height, 56px) + 1rem);
  left: 50%;
  /* A settled seat: 360px even, phones excepted — long copy ellipsises
     inside it rather than growing the card. */
  width: min(22.5rem, calc(100vw - 2rem));
  z-index: 30;
  /* A snug (8px) inset on every side; the right adds the close's box
     (1.75rem) plus a step (12px) of air before the words — the words
     keep the same distance from the close as they do from the bell. */
  padding: var(--wm-space-snug, 0.5rem);
  padding-right: calc(
    var(--wm-space-snug, 0.5rem) + 1.75rem + var(--wm-space-step, 0.75rem)
  );
  border-radius: var(--wm-radius-pill, 62.5rem);
  /* The nudge's own ground — the store speaking first — not a white
     card of its own: the wash says whose knock this is. */
  background: var(--wm-surface-nudge, #eef4f0);
  /* The bar's own cast rather than a plate's: the notification floats
     over the page the way the capsule does, and a card's 6% pool read
     as printed on it. */
  box-shadow:
    0 0 0 1px var(--wm-hairline, rgba(22, 23, 27, 0.08)),
    var(--wm-shadow-bar, 0 6px 16px rgba(18, 23, 20, 0.1), 0 18px 30px -6px rgba(18, 23, 20, 0.18));
  transform: translate(-50%, 0);
  animation: wm-buzz-in 883ms cubic-bezier(0.33, 0, 0.67, 1) both;
  transition:
    transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  /* The card owns its touches — a downward swipe is a dismissal, not
     a scroll. */
  touch-action: none;
}
/* Under the finger the card follows LIVE — the spring-back transition
   waits until the finger lets go. */
.wm-bar-buzz-note.is-dragging {
  transition: none;
}
/* Landed, the arrival lets go — the finished fill-both fall would
   otherwise hold the transform against a later drag. A clock marks
   it, never animationend. */
.wm-bar-buzz-note.is-landed {
  animation: none;
}
/* A hand on the card deepens its cast a little (dictated: no lift,
   anywhere) — the card stands still and settles harder onto the page. */
.wm-bar-buzz-note.is-landed:not(.is-out):hover {
  box-shadow:
    0 0 0 1px var(--wm-hairline, rgba(22, 23, 27, 0.08)),
    var(--wm-shadow-bar-hover, 0 8px 20px rgba(18, 23, 20, 0.12), 0 22px 36px -6px rgba(18, 23, 20, 0.22));
}
/* Ignored for five seconds, the card BUZZES — the study's shiver: a
   ±1° turn of the whole pill at four-frame steps, done in half a
   second. The class comes and goes on clocks; its fill releases with
   it, so the hover above gets the transform back the moment the
   shiver ends. */
.wm-bar-buzz-note.is-buzzing {
  animation: wm-buzz-shake 483ms cubic-bezier(0.33, 0, 0.67, 1) both;
}
@keyframes wm-buzz-shake {
  0%,
  100% {
    transform: translate(-50%, 0) rotate(0deg);
  }
  17.2%,
  44.8%,
  72.4% {
    transform: translate(-50%, 0) rotate(1deg);
  }
  31%,
  58.6%,
  86.2% {
    transform: translate(-50%, 0) rotate(-1deg);
  }
}
/* The study's pop, frame for frame: ten frames of nothing, the
   overshoot at 24, the under-swing at 39, seated at 53. */
@keyframes wm-buzz-in {
  0%,
  18.9% {
    transform: translate(-50%, 0) scale(0);
  }
  45.3% {
    transform: translate(-50%, 0) scale(1.05);
  }
  73% {
    transform: translate(-50%, 0) scale(0.95);
  }
  100% {
    transform: translate(-50%, 0) scale(1);
  }
}
.wm-bar-buzz-note.is-out {
  animation: wm-buzz-out 333ms cubic-bezier(0.55, 0, 1, 0.45) both;
  /* The shrink gathers toward the card's FOOT — the edge meeting the
     bar — so the narrowing reads as the bar taking it in. */
  transform-origin: 50% 100%;
}
/* The sink: from wherever the card stands — its seat, or the finger's
   last held offset (--wm-buzz-y) — down BEHIND the bar: the card drops
   a step in z (below) and ends centred on the bar's own line, the bar
   swallowing it. The card is WIDER than the bar, so it also shrinks as
   it goes — by the time it reaches the bar's line its overhang has
   pulled in and no ears poke past the capsule; the fade only finishes
   what the bar's edges leave. */
@keyframes wm-buzz-out {
  from {
    transform: translate(-50%, var(--wm-buzz-y, 0px)) scale(1);
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  to {
    transform: translate(
        -50%,
        max(calc(50% + (var(--wm-bar-height, 56px) / 2) + 1rem), var(--wm-buzz-y, 0px))
      )
      scale(0.4, 0.7);
    opacity: 0;
  }
}
/* Behind, not over: a dragged or leaving card gives up its raised z
   and falls back on tree order — after the backdrop, before the bar —
   so the acrylic capsule paints over it and swallows the sink. */
.wm-bar-buzz-note.is-dragging,
.wm-bar-buzz-note.is-out {
  z-index: auto;
}
/* One line of furniture: the bell leads, the header speaks, the tease
   whispers under it — a notification row, not a stack. */
.wm-bar-buzz-note {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  /* The whole card is the door to the thread it teases. */
  cursor: pointer;
}
/* The white disc, holding the greeting — the study's hand, said with
   the platform's own emoji: no bell, no count; the wave is the news. */
.wm-bar-buzz-note__bell {
  position: relative;
  flex: none;
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: var(--wm-surface-card, #ffffff);
  box-shadow: 0 0 0 1px var(--wm-hairline, rgba(22, 23, 27, 0.08));
  color: var(--wm-primary, #004c27);
}
/* The greeting, exactly as the "Hand wave final" study plays it
   (60fps, 121 frames, a second after the knock lands): the study's
   own hand, standing at ONE size the whole time — no growing, no
   shrinking — waving ±30° about the study's null, a swing every 20
   frames: 0 → +30 → −30 → +30 → −30 → 0 across 100. */
.wm-bar-buzz-note__hand {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
/* A stage's own mark in the disc — the cart's filled glyph — drawn at
   the hand's own visual size, in the disc's primary ink. */
.wm-bar-buzz-note__glyph {
  width: 1.375rem;
  height: 1.375rem;
}
/* A PRODUCT in the disc — the photograph takes the whole circle, the
   white ground and the mark both standing down; the disc's hairline
   stays on as the photo's frame. */
.wm-bar-buzz-note__product {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
/* The study's hand PNG and its motion-mark strokes share one
   300-unit square, drawn at one 4.75rem seat and both centred on the
   disc — so the marks land exactly where the study put them, and the
   drawn hand (112 of the 300 units) fills the disc the way an icon
   would. The wave turns about the study's own null — (181.8, 185) of
   300, the wrist. */
.wm-bar-buzz-note__hand-img,
.wm-bar-buzz-note__hand-lines {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 3.75rem;
  height: 3.75rem;
  max-width: none;
  margin: -1.875rem;
}
.wm-bar-buzz-note__hand-img {
  transform-origin: 60.6% 61.7%;
  animation: wm-buzz-wave 1667ms cubic-bezier(0.33, 0, 0.67, 1) var(--wm-buzz-wave-delay, 1000ms)
    both;
}
@keyframes wm-buzz-wave {
  0%,
  100% {
    transform: rotate(0deg);
  }
  20%,
  60% {
    transform: rotate(30deg);
  }
  40%,
  80% {
    transform: rotate(-30deg);
  }
}
/* The study's motion marks: four swoosh strokes that flash beside
   the hand as it swings — the lower-left pair first and again
   mid-wave, the upper pair between and at the end — each drawing in
   from its head and erasing off its tail, the trim-path figure said
   in dash-offset (each path's own length normalised to 100). The
   snap from erased (−100) back to unstruck (100) happens while the
   stroke is invisible. */
.wm-bar-buzz-note__hand-lines {
  fill: none;
  stroke: var(--wm-nudge-wave-ink, #975500);
  stroke-width: 2;
  stroke-linecap: round;
  pointer-events: none;
}
.wm-bar-buzz-note__hand-lines path {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
}
.wm-bar-buzz-note__hand-lines .is-low {
  animation: wm-buzz-swoosh-low 1667ms linear var(--wm-buzz-wave-delay, 1000ms) both;
}
.wm-bar-buzz-note__hand-lines .is-high {
  animation: wm-buzz-swoosh-high 1667ms linear var(--wm-buzz-wave-delay, 1000ms) both;
}
@keyframes wm-buzz-swoosh-low {
  0%,
  4% {
    stroke-dashoffset: 100;
  }
  18% {
    stroke-dashoffset: 0;
  }
  35%,
  46.9% {
    stroke-dashoffset: -100;
  }
  47% {
    stroke-dashoffset: 100;
  }
  62% {
    stroke-dashoffset: 0;
  }
  74%,
  100% {
    stroke-dashoffset: -100;
  }
}
@keyframes wm-buzz-swoosh-high {
  0%,
  30% {
    stroke-dashoffset: 100;
  }
  41.5% {
    stroke-dashoffset: 0;
  }
  53%,
  73.9% {
    stroke-dashoffset: -100;
  }
  74% {
    stroke-dashoffset: 100;
  }
  85% {
    stroke-dashoffset: 0;
  }
  97%,
  100% {
    stroke-dashoffset: -100;
  }
}
/* The words: one header, one whispered line, each on a single line. */
.wm-bar-buzz-note__text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  /* Each line owns only its words — no stretched selection boxes. */
  align-items: flex-start;
  gap: var(--wm-space-nudge, 0.25rem);
}
.wm-bar-buzz-note__title,
.wm-bar-buzz-note__desc {
  max-width: 100%;
}
.wm-bar-buzz-note__title {
  /* A step under text-sm: the header should lead the 12px tease
     without shouting over a card this small — by ink, not by weight. */
  font-size: 0.8125rem;
  font-weight: var(--wm-weight-body, 400);
  line-height: 1.3;
  color: var(--wm-ink, #16171b);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.wm-bar-buzz-note__desc {
  font-size: var(--wm-text-2xs, 0.75rem);
  font-weight: var(--wm-weight-body, 400);
  line-height: 1.3;
  color: var(--wm-ink-muted, rgba(22, 23, 27, 0.55));
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* A knock carrying its own door hugs its content — the fixed seat is
   the plain card's; a card with a Checkout makes exactly the room the
   button needs and no more. */
.wm-bar-buzz-note.has-cta {
  width: fit-content;
  /* The plain cards' own ceiling — a named product's longer line
     truncates rather than growing the card past it. */
  max-width: min(26rem, calc(100vw - 2rem));
  /* The pill sits closer to the close than words would — a snug (8px)
     rather than the text cards' step. */
  padding-right: calc(2 * var(--wm-space-snug, 0.5rem) + 1.75rem);
}
/* The door itself: a small primary pill on the card's midline, seated
   between the words and the close. */
.wm-bar-buzz-note__cta {
  flex: none;
  display: inline-grid;
  place-items: center;
  height: 2rem;
  border: 0;
  cursor: pointer;
  padding: 0 var(--wm-space-step, 0.75rem);
  border-radius: var(--wm-radius-pill, 62.5rem);
  background-color: var(--wm-primary, #004c27);
  color: var(--wm-primary-fg, #ffffff);
  font-size: var(--wm-text-2xs, 0.75rem);
  font-weight: var(--wm-weight-medium, 500);
  line-height: 1.3;
  white-space: nowrap;
  /* The shine's stage: the stripes are children clipped by the pill. */
  position: relative;
  overflow: hidden;
}
.wm-bar-buzz-note__cta:hover {
  background-color: var(
    --wm-primary-600,
    color-mix(in srgb, var(--wm-primary, #004c27) 85%, #000000)
  );
}
/* The coupon: the code on its own white ground with the copy mark —
   a chip to take, not a door to walk through. The mark speaks in the
   muted ink; the taken beat turns it a check. */
.wm-bar-buzz-note__code {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: var(--wm-space-hair, 0.375rem);
  height: 2rem;
  border: 0;
  cursor: pointer;
  padding: 0 var(--wm-space-step, 0.75rem);
  border-radius: var(--wm-radius-pill, 62.5rem);
  background: var(--wm-surface-card, #ffffff);
  box-shadow: 0 0 0 1px var(--wm-hairline, rgba(22, 23, 27, 0.08));
  color: var(--wm-ink, #16171b);
  font-size: var(--wm-text-2xs, 0.75rem);
  font-weight: var(--wm-weight-medium, 500);
  line-height: 1.3;
  white-space: nowrap;
}
.wm-bar-buzz-note__code svg {
  color: var(--wm-ink-muted, rgba(22, 23, 27, 0.55));
}
/* The taken beat, said the window chip's way: the label re-keys on each
   swap, so code-to-Copied and the return both ride the confirm's glide;
   the check speaks in the store's colour. */
.wm-bar-buzz-note__code-label {
  display: inline-flex;
  align-items: center;
  gap: var(--wm-space-hair, 0.375rem);
  animation: wm-buzz-code-swap 460ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
/* The chip holds ONE width through the swap — both tellings stand in
   the stack as silent ghosts under the live label, so Copied never
   shrinks the button and the code's return never snaps it back. */
.wm-bar-buzz-note__code-stack {
  display: inline-grid;
  justify-items: center;
}
.wm-bar-buzz-note__code-stack > * {
  grid-area: 1 / 1;
}
.wm-bar-buzz-note__code-label.is-ghost {
  visibility: hidden;
  animation: none;
}
.wm-bar-buzz-note__code.is-copied svg {
  color: var(--wm-primary, #004c27);
}
@keyframes wm-buzz-code-swap {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
}
/* The island's checkout shine, said the island's own way — two SOLID
   tilted stripes of light crossing the button, a wide one led by a
   narrow one, the way a highlight sweeps a curved surface in two
   catches rather than one bar. The pair travel together on one clock,
   held apart by their resting offsets; most of the cycle is the button
   at rest (the sweep is over by 45%), because a sheen on repeat every
   second is an advert, not a glint. */
.wm-bar-buzz-note__cta::before,
.wm-bar-buzz-note__cta::after {
  content: "";
  position: absolute;
  top: -25%;
  height: 150%;
  left: 0;
  pointer-events: none;
  transform: skewX(-20deg) translateX(var(--wm-buzz-shine-x, -3rem));
  animation: wm-buzz-cta-shine 3.2s ease-in-out infinite;
}
.wm-bar-buzz-note__cta::before {
  width: 1rem;
  background: rgba(255, 255, 255, 0.32);
  --wm-buzz-shine-x: -3rem;
}
.wm-bar-buzz-note__cta::after {
  width: 0.375rem;
  background: rgba(255, 255, 255, 0.24);
  --wm-buzz-shine-x: -4.25rem;
}
@keyframes wm-buzz-cta-shine {
  0% {
    transform: skewX(-20deg) translateX(var(--wm-buzz-shine-x, -3rem));
  }
  45%,
  100% {
    transform: skewX(-20deg) translateX(calc(var(--wm-buzz-shine-x, -3rem) + 12rem));
  }
}
/* The close sits INSIDE the card, on its midline — furniture of the
   card now, not a handle on its corner — quiet until hovered. */
.wm-bar-buzz-note__close {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: var(--wm-space-snug, 0.5rem);
  display: grid;
  place-items: center;
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: none;
  color: var(--wm-ink-quiet, rgba(22, 23, 27, 0.35));
  cursor: pointer;
}
.wm-bar-buzz-note__close:hover {
  color: var(--wm-ink, #16171b);
}
@media (prefers-reduced-motion: reduce) {
  .wm-bar-buzz-note,
  .wm-bar-buzz-note__hand-img,
  .wm-bar-buzz-note__hand-lines path {
    animation: none;
  }
  .wm-bar-buzz-note__cta::before,
  .wm-bar-buzz-note__cta::after {
    animation: none;
    content: none;
  }
}
`;

// KNOCK_CSS — dev-handoff/primitives/_orb.tsx
export const KNOCK_CSS = `
/* The KNOCK rises above the ORB, aligned to its wall the way the
   chips are — dictated. It stands where the chips stack stands (the
   orb's 1.5rem seat + its 4rem + a breath), and hugs the orb's own
   wall. The study's centring translate is baked into every keyframe
   (the pop, the shiver, the hover lift), so the seat moves the ANCHOR
   instead: left is computed so the −50% lands the card's edge 1.5rem
   off the wall. The middle seat keeps the study's own centre. */
.wm-as-knock .wm-bar-buzz-note {
  bottom: calc(1.5rem + 3.5rem + 0.75rem);
  /* This seat's own cut — dictated: the card caps at 320 (the study's
     360), and the words keep 24px of air before the close — the
     study's formula (the close's snug inset + its 1.75rem box) with
     the step grown to 24. The wall-anchor calcs below read the same
     20rem. */
  width: min(20rem, calc(100vw - 2rem));
  /* The card's insets stand at a STEP (12px) on every side —
     dictated (a 16 stood briefly, then called back); the right wall
     keeps the formula with the step in the close's seat: step + the
     close's 1.75rem box + 16px of air before the words (the ragged
     lines and the glyph's own box inset already read as more). */
  padding: var(--wm-space-md, 0.75rem);
  padding-right: calc(0.75rem + 1.75rem + 1rem);
  /* Long words WRAP now (below) — the wave rides the card's TOP edge
     beside the first line rather than centring against the grown
     height. */
  align-items: flex-start;
  /* Wrapped lines outgrow the capsule — dictated: a grown card trades
     the study's full pill for the 20px corner. (At this width and
     copy the title always wraps; a one-line knock would want the pill
     back.) */
  border-radius: var(--wm-radius-plate, 1.25rem);
}
/* The words-to-tail air — dictated to a snug (8px) over the study's
   own nudge. */
.wm-as-knock .wm-bar-buzz-note__text {
  gap: var(--wm-space-sm, 0.5rem);
}
/* Looser leading for the grown card — dictated: the study's 1.3 steps
   up to 1.4 on title and tail both. */
.wm-as-knock .wm-bar-buzz-note__title,
.wm-as-knock .wm-bar-buzz-note__desc {
  line-height: var(--wm-nudge-line-height, 1.4);
}
/* The 320 cut costs the title its one line — dictated: the words take
   a SECOND line instead of the ellipsis; the tail keeps its own
   one-line cut. */
.wm-as-knock .wm-bar-buzz-note__title {
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
}
/* The wave's white disc squares off — dictated: the 44px seat trades
   its circle for a rounded square, the 12px corner sitting a step
   inside the card's own 20. */
.wm-as-knock .wm-bar-buzz-note__bell {
  border-radius: var(--wm-radius-md-lg, 0.75rem);
}
/* The LEAVE just DISAPPEARS — dictated: no sink, no travel; the card
   fades where it stands (a gather-into-the-orb told once and called
   back). The drag's own offset (--wm-buzz-y) rides along, the
   study's way, so a swiped card fades from the hand's last hold. */
.wm-as-knock .wm-bar-buzz-note.is-out {
  animation: wm-as-knock-out 0.2s ease-out both;
}
@keyframes wm-as-knock-out {
  from {
    transform: translate(-50%, var(--wm-buzz-y, 0px));
    opacity: 1;
  }
  to {
    transform: translate(-50%, var(--wm-buzz-y, 0px));
    opacity: 0;
  }
}
/* The close rides the TOP with the wave — dictated: the study centres
   it against the capsule, but a card grown to two or three lines wants
   its close where a notification keeps it, on the head line. The
   card's own snug inset seats it. */
.wm-as-knock .wm-bar-buzz-note__close {
  top: var(--wm-space-md, 0.75rem);
  right: var(--wm-space-md, 0.75rem);
  transform: none;
}
.wm-as-knock.is-right .wm-bar-buzz-note {
  left: calc(100vw - 1.5rem - min(20rem, 100vw - 2rem) / 2);
}
.wm-as-knock.is-left .wm-bar-buzz-note {
  left: calc(1.5rem + min(20rem, 100vw - 2rem) / 2);
}
`;

// NUDGE_CARD_CSS — dev-handoff/primitives/_stage.tsx
export const NUDGE_CARD_CSS = `
.wm-nudge .wm-bar-buzz-note {
  align-items: flex-start;
  /* A VERY SUBTLE cast — dictated, called back from none: the
     hairline edge plus the faintest settle, nothing that reads as a
     floating panel. */
  box-shadow:
    0 0 0 1px var(--wm-color-border, rgba(22, 23, 27, 0.08)),
    var(--wm-nudge-shadow, 0 2px 8px rgba(22, 23, 27, 0.08), 0 10px 32px rgba(22, 23, 27, 0.1));
}
/* Under a resting pointer the cast deepens a little and nothing moves
   (dictated: the lift is gone, here and everywhere). */
.wm-nudge .wm-bar-buzz-note.is-landed:not(.is-out):hover {
  box-shadow:
    0 0 0 1px var(--wm-color-border, rgba(22, 23, 27, 0.08)),
    var(--wm-nudge-shadow-hover, 0 3px 10px rgba(22, 23, 27, 0.1), 0 14px 36px rgba(22, 23, 27, 0.14));
}
.wm-nudge .wm-bar-buzz-note .wm-bar-buzz-note__text {
  min-height: 2.75rem;
  justify-content: center;
}
/* The words hold TWO lines (dictated: concise) — longer copy
   truncates on the second with an ellipsis. */
.wm-nudge .wm-bar-buzz-note__title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
/* The disc is ONE seat in every telling (dictated): 44 on the tint,
   the disc's corners — whatever it holds, the wave, a glyph or the
   product's own shot, which fills it and takes its corners. */
.wm-nudge .wm-bar-buzz-note__product {
  border-radius: var(--wm-radius-md-lg, 0.75rem);
}
.wm-nudge .wm-bar-buzz-note .wm-bar-buzz-note__desc {
  display: none;
}
/* The disc's own COLOUR — an icon seated with currentColor reads the
   family colour on the white plate. */
.wm-nudge .wm-bar-buzz-note__bell {
  color: var(--wm-color-text, #16171b);
}
.wm-nudge .wm-bar-buzz-note.has-cta {
  display: grid;
  grid-template-columns: 2.75rem 1fr;
  column-gap: 0.75rem;
  row-gap: 0.75rem;
  align-items: start;
  max-width: none;
  padding-right: calc(0.75rem + 1.75rem + 1rem);
}
.wm-nudge .wm-bar-buzz-note.has-cta .wm-bar-buzz-note__bell {
  grid-row: 1;
  grid-column: 1;
}
.wm-nudge .wm-bar-buzz-note.has-cta .wm-bar-buzz-note__text {
  grid-row: 1;
  grid-column: 2;
}
.wm-nudge .wm-bar-buzz-note.has-cta .wm-bar-buzz-note__cta {
  grid-row: 2;
  grid-column: 1 / -1;
  justify-self: stretch;
  justify-content: center;
  margin-right: calc(-1.75rem - 1rem);
  min-width: 0;
  height: 2.5rem;
  font-size: var(--wm-font-size-sm, 0.875rem);
  font-weight: var(--wm-font-weight-body, 400);
}
/* A BODY in the card — the Product Row, the Rating Row — seats in
   the text column on the row under the words, the column's whole
   width (a row's badge ranges to its far end; an inline row keeps
   its own), and the doors step down one. */
.wm-nudge .wm-bar-buzz-note.has-cta .wm-bar-buzz-note__body {
  grid-column: 2;
  grid-row: 2;
  justify-self: stretch;
  align-self: start;
  min-width: 0;
}
.wm-nudge .wm-bar-buzz-note.has-cta:has(.wm-bar-buzz-note__body) .wm-bar-buzz-note__ctas {
  grid-row: 3;
}
.wm-nudge .wm-bar-buzz-note.has-cta .wm-bar-buzz-note__ctas {
  grid-row: 2;
  grid-column: 1 / -1;
  justify-self: stretch;
  min-width: 0;
  margin-right: calc(-1.75rem - 1rem);
}
.wm-nudge .wm-bar-buzz-note__ctas .wm-pro-ctas {
  position: static;
  flex-wrap: nowrap;
  justify-content: flex-start;
  width: 100%;
}
.wm-nudge .wm-bar-buzz-note__ctas .wm-pro-ctas.is-stack {
  flex-direction: column;
}
.wm-nudge .wm-bar-buzz-note__ctas .wm-pro-ctas.is-stack .wm-pro-cta {
  flex: none;
  width: 100%;
}
.wm-nudge .wm-bar-buzz-note__ctas .wm-pro-cta {
  /* EQUAL halves (dictated) — flex alone still floors each door at
     its label's width; min-width 0 lifts the floor so both take the
     same share of the row. */
  flex: 1 1 0;
  min-width: 0;
}
/* Icon-only doors keep their square — a mark stretched to half the
   row would float in a void — and the pair ranges RIGHT (dictated),
   to the doors' own 12 off the card's edge. Beside a LABELLED door
   the icon keeps its square on the left and the label takes the line
   that remains (the Search Top Picks pair). */
.wm-nudge .wm-bar-buzz-note__ctas .wm-pro-cta.is-icon,
.wm-nudge .wm-bar-buzz-note__ctas .nw-win__tooltip-anchor {
  flex: none;
}
.wm-nudge .wm-bar-buzz-note__ctas .wm-pro-ctas:has(.wm-pro-cta.is-icon) {
  justify-content: flex-end;
}
/* The door is the Button pair's primary — the study's shine stands
   down. */
.wm-nudge .wm-bar-buzz-note__cta::before,
.wm-nudge .wm-bar-buzz-note__cta::after {
  display: none;
  animation: none;
}
`;

// NUDGE_CTA_CSS — dev-handoff/primitives/_stage.tsx
export const NUDGE_CTA_CSS = `
.wm-pro-ctas {
  position: fixed;
  display: flex;
  gap: 0.5rem;
  z-index: 30;
}
.wm-pro-cta {
  height: 2.25rem;
  padding: 0 0.875rem;
  border: 0;
  border-radius: var(--wm-radius-full, 62.5rem);
  background: var(--wm-color-surface, #ffffff);
  color: var(--wm-color-text, #16171b);
  font: inherit;
  font-size: 0.8125rem;
  font-weight: var(--wm-font-weight-body, 400);
  white-space: nowrap;
  cursor: pointer;
  /* The hairline alone — dictated: no cast on the capsules; the edge
     is the only thing that parts them from the card. */
  box-shadow: 0 0 0 1px var(--wm-color-border, rgba(22, 23, 27, 0.08));
  animation: wm-pro-cta-in 0.42s cubic-bezier(0.22, 1, 0.36, 1) both;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}
.wm-pro-cta:hover {
  background: var(--wm-color-surface-muted, #f8f8f8);
}
.wm-pro-cta:active {
  transform: scale(0.96);
}
/* ICON-ONLY doors (dictated): the capsule squared to its own height,
   the mark alone at the door-mark size; the label lives on for the
   reader in aria-label, and for the eye in the Tooltip primitive's
   word (TIP_CSS below, its window tokens re-said in the store's). */
.wm-pro-cta.is-icon {
  display: inline-grid;
  place-items: center;
  width: 2.25rem;
  padding: 0;
}
.wm-pro-cta.is-icon svg {
  width: var(--wm-icon-size-xl, 1.25rem);
  height: var(--wm-icon-size-xl, 1.25rem);
}
@keyframes wm-pro-cta-in {
  from {
    opacity: 0;
    transform: translateY(0.75rem);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
/* INSIDE the card the row speaks the Button primitive's own pair at
   the Button's own geometry — 2.5rem tall, text-sm. The unmarked
   capsule is the TRUE SECONDARY, dictated: no background, the inset
   hairline ring, the text colour's own word. Floating under the card (the
   seats' outside telling) the capsules keep the chips' white background —
   a transparent pill over a storefront says nothing. */
.wm-bar-buzz-note__ctas .wm-pro-cta {
  height: 2.5rem;
  font-size: var(--wm-font-size-sm, 0.875rem);
  background: transparent;
  box-shadow: inset 0 0 0 1px var(--wm-color-border, rgba(22, 23, 27, 0.08));
}
.wm-bar-buzz-note__ctas .wm-pro-cta:hover {
  background: color-mix(in srgb, var(--wm-color-text, #16171b) 4%, transparent);
}
.wm-bar-buzz-note__ctas .wm-pro-cta.is-icon {
  width: 2.5rem;
}
/* The PRIMARY telling of a door — dictated for the two-button row:
   the left stays the secondary (the plate ringed in the hairline),
   the right commits in the primary's colours. Said AFTER the in-card
   secondary so the primary's background wins its seats. */
.wm-pro-cta.is-primary {
  background: var(--wm-color-primary, #16171b);
  color: var(--wm-color-on-primary, #ffffff);
  box-shadow: none;
}
.wm-pro-cta.is-primary:hover {
  background: color-mix(in srgb, var(--wm-color-primary, #16171b) 85%, #ffffff);
}
@media (prefers-reduced-motion: reduce) {
  .wm-pro-cta {
    animation: none;
  }
}

.wm-pro-ctas .nw-win__tooltip-anchor {
  --nww-fg: var(--wm-color-text, #16171b);
  --nww-card-bg: var(--wm-color-surface, #ffffff);
  --nww-space-snug: var(--wm-space-sm, 0.5rem);
  --nww-space-nudge: var(--wm-space-2xs, 0.25rem);
  --nww-text-xs: var(--wm-font-size-xs, 0.75rem);
  --nww-weight-regular: var(--wm-font-weight-body, 400);
  --nww-ease: var(--wm-easing-standard, cubic-bezier(0.4, 0, 0.2, 1));
}
/* No tooltip on the PHONE (dictated): a finger has no hover to
   arrive on, and the plate said above a door at the wall ran past
   the layout's edge. The door's label stays in its aria-label. */
@media (max-width: 480px) {
  .wm-pro-ctas .nw-win__tooltip-anchor .nw-win__tooltip {
    display: none;
  }
}
`;

// PRO_KNOCK_CSS — dev-handoff/BarProactiveWeb.stories.tsx
export const PRO_KNOCK_CSS = `
/* Dictated: the proactive knocks stand WHITE — the sage nudge tint
   stays the page's; the card goes paper, the content on its own colours
   (the bell keeps its hairline ring, the doors their own background). */
.wm-as-knock .wm-bar-buzz-note {
  background: var(--wm-color-surface, #ffffff);
  /* And the doors in the PRIMITIVE'S manner, not the store's green —
     the note re-says the primary token as the family colour, so the
     primary door's rest and its hover both follow the Nudge page's
     own background. */
  --wm-primary: var(--wm-color-text, #16171b);
  --wm-color-primary: var(--wm-primary);
}
.wm-as-knock .wm-bar-buzz-note {
  width: min(21.25rem, calc(100vw - 2 * var(--wm-space-lg, 1rem)));
  bottom: calc(var(--wm-space-xl, 1.5rem) + 3.5rem + var(--wm-space-md, 0.75rem));
}
/* The close puck at 24 (dictated, folder-wide) — the 14px glyph
   keeps its size; the smaller puck alone closes the visual gap. */
.wm-as-knock .wm-bar-buzz-note__close {
  width: var(--wm-close-button-size, 1.5rem);
  height: var(--wm-close-button-size, 1.5rem);
}
`;
