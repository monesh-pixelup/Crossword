import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { ScrollHighlight } from "./scroll-highlight";

/**
 * The page's opening statement, straight under the hero (Figma "Wide panel header (Intro)"): the
 * eyebrow on the left, and on the right a 847px serif paragraph whose words fill from 30% to full ink
 * as it scrolls through the viewport.
 * The paragraph hangs off a 0.5px hairline, gold for its first 71.69px; a 232px gold tick sits on
 * the left page rail, 22px above the section's top padding.
 */
export function SupportIntro() {
  return (
    <section aria-label="Introduction" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-22px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col items-start gap-8 lg:flex-row lg:justify-between">
        <Eyebrow>Intro</Eyebrow>
        <div className="relative pl-[32.5px]">
          <span aria-hidden className="absolute inset-y-0 left-0 w-[0.5px] bg-[#d2cbba]" />
          <RailAccent className="absolute top-0 left-0 h-[71.69px] w-px" />
          <ScrollHighlight
            text="We’re solving that moment when your customer wants to know where their order is, how to return it, or whether a policy applies to them instead of sending them to a queue."
            className="max-w-[847.084px] font-serif text-(length:--h4-size) leading-[1.18] font-extralight tracking-[-0.05em] text-ink"
          />
        </div>
      </div>
    </section>
  );
}
