/**
 * The page's two hairline rails, --frame-inset in from each side of the positioned box they sit in,
 * running its full height: 0.5px in the rail colour (#d2cbba), centred on the inset. Drawn as
 * borders rather than a 0.5px-wide image, which a 1x screen can round away entirely: a 0.5px
 * border always paints at least one device pixel, so the line shows on every screen (one crisp
 * device pixel on a 2x one, as in Figma).
 */
export function Rails() {
  return (
    <>
      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-[calc(var(--frame-inset)-0.25px)] border-l-[0.5px] border-rail" />
      <span aria-hidden className="pointer-events-none absolute inset-y-0 right-[calc(var(--frame-inset)-0.25px)] border-r-[0.5px] border-rail" />
    </>
  );
}
