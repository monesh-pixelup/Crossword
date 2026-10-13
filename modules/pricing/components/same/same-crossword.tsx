import { Eyebrow } from "@/components/ui/eyebrow";
import { LiveryGround } from "@/modules/dynamic-landing-pages/components/shared/livery";
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
 * Detailed para (content doc): the same Crossword on every plan. Layout/Livery, Forest grid variant
 * (the kit's `.wk-fg`, as Upsell on Sell): forest grain between the page rails, a centred Dark
 * eyebrow and cream swash headline, then the three columns split by 1px dashed gold/30 rules, each
 * a 28px gold mark 48px over a Crimson 24 title and on-dark copy.
 */
export function SameCrossword() {
  return (
    <section aria-labelledby="same-title" className="relative px-(--frame-inset)">
      <div className="relative overflow-clip px-5 pt-16 pb-16 md:px-10 lg:pt-[72px] lg:pb-[110px]">
        <LiveryGround tone="forest" />

        <div className="relative mx-auto flex w-full max-w-[1100px] flex-col items-center gap-14 lg:gap-16">
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
            {sameCrossword.map((item) => (
              <li
                key={item.title}
                className="flex flex-col gap-3.5 md:px-6 md:pt-6 md:pb-8 md:not-first:border-l md:not-first:border-dashed md:not-first:border-gold/30"
              >
                <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4 size-7 text-gold md:mb-12">
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
