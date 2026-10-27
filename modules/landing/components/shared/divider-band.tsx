import tile from "../../assets/shared/divider-tile.svg";
import { AnimatedStamp } from "./animated-stamp";
import type { StampGlyph } from "./stamp-svgs";

/**
 * Patterned separator across the top of a section, between the page rails,
 * with the animated stamp badge in the middle (AnimatedStamp; `badge={false}` leaves the band plain, as
 * under the Pricing header). It is 24px tall; sections that open with it add 24px to their top padding. Below 768px
 * the band, its pattern and the badge are drawn at 0.75x (18px tall); the sections keep their spacing.
 */
export function DividerBand({ glyph, badge = true }: { glyph: StampGlyph; badge?: boolean }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-(--frame-inset) top-0 h-6 bg-[#fef8ea] bg-size-[27.78px_25.44px] bg-top-left bg-repeat shadow-[inset_0_0_0_0.5px_#d2cbba] max-md:h-[18px] max-md:bg-size-[20.835px_19.08px]"
      style={{ backgroundImage: `url(${tile.src})` }}
    >
      {badge && (
        <div className="absolute top-1/2 left-1/2 z-2 h-[74.94px] w-[74px] -translate-x-1/2 -translate-y-1/2 leading-0 max-md:h-[56.205px] max-md:w-[55.5px]">
          <AnimatedStamp glyph={glyph} />
        </div>
      )}
    </div>
  );
}
