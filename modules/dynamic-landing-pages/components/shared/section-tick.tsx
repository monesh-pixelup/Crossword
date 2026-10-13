import { RailAccent } from "@/modules/landing/components/shared/rail-accent";

/**
 * The gold section tick (brand guidelines 7.4 and 7.5; web kit `.wk-tick`): a 1px × 180px gold
 * accent on the left page rail, starting 24px above the section's top padding, so it sits beside
 * the eyebrow and headline. It grows in as it scrolls into view, and is desktop only.
 */
export function SectionTick() {
  return (
    <RailAccent className="absolute top-[calc(var(--section-pad)-24px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[180px] w-px max-lg:hidden" />
  );
}
