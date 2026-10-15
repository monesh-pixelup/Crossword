import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import cardArt from "@/modules/retain/assets/returns/card-art.webp";
import { journeyCards } from "../../config/launch";

/**
 * Figma "Library · Three-card row (Journeys)", as Return reduction on Retain: the eyebrow, a
 * two-line headline and a line of 14px copy, then 80px below three equal cards (413.33px at 1280px,
 * 20px apart) on #fdf4de in a black/10 hairline: the 330px textured aubergine panel (the same Figma
 * art), then 20px below the journey's name in Crimson ExtraLight 24 over its steps in Geist 14.
 * A 209px gold tick sits on the left rail beside the eyebrow.
 */
export function ChooseJourney() {
  return (
    <section aria-labelledby="choose-journey-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-12.74px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[208.94px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col items-start gap-section">
        <div className="flex max-w-[575px] flex-col items-start gap-6">
          <Eyebrow>How it works</Eyebrow>
          <SectionTitle id="choose-journey-title" initial="C" firstLine="hoose" secondLine="the journey" width={300} />
          <p className="font-sans text-[14px] leading-5 tracking-[-0.28px] text-black/60">
            You don&rsquo;t need to dream up an AI experience from scratch. We start with a proven journey framework and
            adapt it to the job at hand. Whether it&rsquo;s product discovery, support, product Q&amp;A, or something else,
            we design and tune the experience.
          </p>
        </div>

        <ul className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {journeyCards.map((card) => (
            <li key={card.title} className="flex flex-col gap-5 overflow-clip border border-black/10 bg-[#fdf4de]">
              <Image src={cardArt} alt="" sizes="(min-width: 992px) 412px, (min-width: 768px) 48vw, 96vw" className="h-auto w-full" />
              <div className="flex flex-col items-start gap-2 px-5 pb-5">
                <h3 className="font-serif text-[24px] leading-[1.1] font-extralight tracking-[-1.2px] text-ink">{card.title}</h3>
                <p className="font-sans text-[14px] leading-5 tracking-[-0.28px] text-black/60">{card.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
