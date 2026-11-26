import { RailAccent } from "@/components/ui/rail-accent";
import { Rails } from "@/modules/marketing/components/rails";
import { waitlist } from "../config/waitlist";

/**
 * The waitlist page's hero: the centred headline (Crimson ExtraLight, the "W" a Parisienne swash) under the cream
 * header, one line below it on who the waitlist is for, and a gold tick on the left rail. No patterned band at its
 * foot, so the hero runs straight into the form.
 */
export function WaitlistHero() {
  return (
    <section aria-labelledby="waitlist-hero-title" className="relative overflow-hidden bg-cream">
      <Rails />
      <RailAccent className="absolute top-[96.4px] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[208.9px] w-px max-lg:hidden" />

      <div className="relative content-width flex flex-col items-center gap-5 pt-[71.5px] text-center max-md:gap-4 max-md:pt-12">
        <h1
          id="waitlist-hero-title"
          className="font-serif text-[clamp(44px,5.556vw,80px)] leading-none font-extralight text-balance text-ink max-md:text-[min(44px,11vw)]"
        >
          <span className="leading-[1.1] tracking-[-0.05em]">Join the </span>
          <span className="whitespace-nowrap">
            <span className="font-script text-[1.25em] leading-[1.18] font-normal tracking-[0.05em]">W</span>
            <span className="leading-[1.1] tracking-[-0.05em]">aitlist</span>
          </span>
        </h1>
        <p className="max-w-[560px] font-sans text-lg leading-7 tracking-[-0.02em] text-pretty text-ink-muted max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px]">
          {waitlist.audience}
        </p>
      </div>
    </section>
  );
}
