import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";
import grainTile from "@/modules/landing/assets/trust/grain-tile.webp";
import { DashedGuides } from "@/modules/landing/components/shared/dashed-guides";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { type FeeIcon, sameCrossword } from "../../config/pricing";

/** Phosphor-style marks on the 24 grid, 1.5px round strokes, in gold. */
const icons: Record<FeeIcon, string[]> = {
  // A storefront with a slash: no platform fee.
  storefront: ["M4 10v9.5h16V10", "M3 5h18l-1.5 5h-15z", "M9.5 19.5v-5h5v5", "M3.5 3.5l17 17"],
  // Three people: no per-seat fees.
  seats: ["M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z", "M3.5 19a5.5 5.5 0 0 1 11 0", "M16 5.3a3 3 0 0 1 0 5.4", "M17.5 13.6a5.5 5.5 0 0 1 3 5.4"],
  // A check in a circle: no per-resolution fees.
  resolution: ["M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17Z", "m8.5 12.2 2.4 2.4 4.6-4.9"],
};

/**
 * Detailed para (content doc): the same Crossword on every plan, set like the home page's Trust
 * band (“Your data is safe with us”): a full-bleed forest band holding a deep-green card with the
 * soft-light grain tile at 40%, framed by gold dashed guides that overshoot its corners. Inside, a
 * centred Dark eyebrow and cream swash headline, then the three columns split by 0.5px white/10
 * rules, each a 28px gold mark over a Crimson 24 title and on-dark copy.
 */
export function SameCrossword() {
  return (
    <section aria-labelledby="same-title" className="relative bg-forest py-12 md:py-16 lg:py-[87px]">
      <div className="relative flex content-width flex-col items-center px-5 pt-14 pb-10 shadow-[0_0_2px_rgba(0,0,0,0.25)] md:px-8 md:pt-16 md:pb-12 lg:px-16 lg:pt-[88px] lg:pb-16">
        {/* Card surface: deep green with a soft-light grain tile at 40%. */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-forest-deep" />
          <div
            className="absolute inset-0 bg-size-[172.82454997301102px_172.82454997301102px] bg-top-left opacity-40 mix-blend-soft-light"
            style={{ backgroundImage: `url(${grainTile.src})` }}
          />
        </div>
        <DashedGuides />

        <div className="relative flex w-full max-w-[1030px] flex-col items-center gap-14 lg:gap-20">
          <div className="flex flex-col items-center gap-4 text-center">
            <Eyebrow surface="green">Every plan</Eyebrow>
            <SectionTitle
              id="same-title"
              initial="Y"
              firstLine="ou never pay more"
              secondLine="to unlock features"
              width={520}
              variant="centered"
              tone="light"
            />
            <p className="mt-2 max-w-[560px] font-sans text-base leading-6 tracking-[-0.02em] text-on-dark">
              Whether you&rsquo;re on Pay-as-you-go or Scale, you get the same Crossword.
            </p>
          </div>

          <ul className="grid w-full gap-10 md:grid-cols-3 md:gap-0">
            {sameCrossword.map((item, i) => (
              <li
                key={item.title}
                className={cn(
                  "flex flex-col gap-3.5 md:px-6 md:py-8",
                  i === 0 && "md:pl-0",
                  i > 0 && "md:shadow-[inset_0.5px_0_0_rgba(255,255,255,0.1)]",
                )}
              >
                <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4 size-7 text-gold md:mb-8">
                  {icons[item.icon].map((d) => (
                    <path key={d} d={d} />
                  ))}
                </svg>
                <h3 className="font-serif text-[24px] leading-[1.15] tracking-[-0.04em] text-cream">{item.title}</h3>
                <p className="font-sans text-base leading-6 tracking-[-0.02em] text-on-dark">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
