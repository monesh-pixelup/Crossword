import Image from "next/image";
import medallion from "@/modules/dynamic-landing-pages/assets/shared/medallion.svg";

/**
 * The page's opening statement, straight under the hero (no divider band, as on Support): the
 * doc's two short lines as one centred serif statement under a gilt medallion, the second in
 * maroon, then the rest of the paragraph as centred body copy.
 */
export function RetainIntro() {
  return (
    <section aria-label="Introduction" className="relative section-pad">
      <div className="flex content-width flex-col items-center gap-8 text-center">
        <Image src={medallion} alt="" className="size-9" />
        <p className="max-w-[920px] font-serif text-(length:--h5-size) leading-[1.25] font-light tracking-[-0.04em] text-ink">
          Most brands lose customers quietly. <span className="text-maroon">Not to competitors but to silence.</span>
        </p>
        <p className="max-w-[560px] font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted">
          A customer buys once, and then hears nothing until the next sale email. Crossword stays in the relationship,
          recovering what was almost lost and reaching out only when it&rsquo;s truly useful.
        </p>
      </div>
    </section>
  );
}
