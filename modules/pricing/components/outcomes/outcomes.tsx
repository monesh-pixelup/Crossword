import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";
import medallion from "@/modules/dynamic-landing-pages/assets/shared/medallion.svg";
import { Studs } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { SectionTick } from "@/modules/dynamic-landing-pages/components/shared/section-tick";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { outcomes } from "../../config/pricing";

/**
 * How Crossword optimizes (content doc): the four outcomes Crossword reports on. The header, then
 * the four as studded tiles on 1px engraved hairlines (the kit's bento tiles), cream and sand
 * alternating, each a gilt medallion over a Crimson title and its line of copy.
 */
export function Outcomes() {
  return (
    <section aria-labelledby="outcomes-title" className="relative section-pad">
      <SectionTick />

      <div className="flex content-width flex-col gap-section">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Results</Eyebrow>
          <SectionTitle id="outcomes-title" initial="S" firstLine="ee how Crossword" secondLine="drives your business" width={560} />
        </div>

        <ul className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((o, i) => (
            <li
              key={o.title}
              className={cn(
                "relative flex min-h-[260px] flex-col justify-end gap-4 p-8 shadow-[inset_0_0_0_1px_var(--color-engraved)]",
                i % 2 ? "bg-sand" : "bg-cream",
              )}
            >
              <span aria-hidden className="pointer-events-none absolute inset-3 shadow-[inset_0_0_0_0.75px_var(--color-engraved)]" />
              <Studs inset={6} />
              <Image src={medallion} alt="" className="relative mb-auto size-7" />
              <h3 className="relative font-serif text-[24px] leading-[1.15] tracking-[-0.04em] text-ink">{o.title}</h3>
              <p className="relative font-sans text-[14px] leading-5 tracking-[-0.02em] text-ink-muted">{o.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
