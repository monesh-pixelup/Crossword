import { DividerBand } from "@/components/ui/divider-band";
import { RailAccent } from "@/components/ui/rail-accent";
import { Rails } from "@/modules/marketing/components/rails";

/**
 * The waitlist page's hero, drawn like the Privacy hero: the one-line headline (Crimson ExtraLight, the "W" a
 * Parisienne swash) under the cream header, a gold tick on the left rail and the patterned band along its foot.
 */
export function WaitlistHero() {
  return (
    <section aria-labelledby="waitlist-hero-title" className="relative h-[303.5px] overflow-hidden bg-cream max-md:h-[220px]">
      <Rails />
      <RailAccent className="absolute top-[96.4px] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[208.9px] w-px max-lg:hidden" />

      <div className="relative content-width pt-[71.5px] max-md:pt-12">
        <h1
          id="waitlist-hero-title"
          className="font-serif text-[clamp(44px,5.556vw,80px)] leading-none font-extralight whitespace-nowrap text-ink max-md:text-[min(44px,11vw)]"
        >
          <span className="leading-[1.1] tracking-[-0.05em]">The </span>
          <span className="font-script text-[1.25em] leading-[1.18] font-normal tracking-[0.05em]">W</span>
          <span className="leading-[1.1] tracking-[-0.05em]">aitlist</span>
        </h1>
      </div>

      <div className="absolute inset-x-0 bottom-[2px] h-6 max-md:h-[18px]">
        <DividerBand glyph="chat" badge={false} />
      </div>
    </section>
  );
}
