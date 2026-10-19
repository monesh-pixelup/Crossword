import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import ring from "@/modules/dynamic-landing-pages/assets/gap/ring.svg";
import damaskAubergine from "@/modules/dynamic-landing-pages/assets/personalization/damask-aubergine.webp";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";

/** The panel's 10px gold rings, on the corners of a 649 × 551 box centred on it. */
const rings = ["top-[17.5px] left-[19.5px]", "top-[17.5px] right-[18.5px]", "bottom-[17.5px] left-[19.5px]", "right-[18.5px] bottom-[17.5px]"];

/**
 * Figma "Library · Accordion + media" (Human has complete control): on the left the eyebrow, a
 * two-line headline (77px swash, 50px lines at 1.1, the page's other headings' leading) and a 462.87px line of copy, 18px apart; on
 * the right, 10px down, a 687 × 586 aubergine panel holding the notched damask with its gold frame
 * (as The stranger problem on Dynamic landing pages) and a gold ring in each corner. A 209px gold
 * tick sits on the left rail beside the eyebrow.
 */
export function TakeControl() {
  return (
    <section aria-labelledby="control-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-16.51px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[208.94px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="flex flex-col items-start gap-[18px] lg:shrink-0">
          <Eyebrow>Human has complete control</Eyebrow>
          <SectionTitle id="control-title" initial="T" firstLine="ake control," secondLine="whenever you like" width={553.133} variant="assist" />
          <p className="max-w-[462.865px] font-sans text-base leading-6 tracking-[-0.32px] text-black/60">
            Crossword gives the human-in-the-loop full context. Every conversation, workflow, order, page viewed, note and
            stuck moment. Crossword can surface the important bits, while the human stays in control.
          </p>
        </div>

        <div aria-hidden className="relative aspect-[687/586] w-full overflow-clip bg-aubergine lg:mt-2.5 lg:w-[687px] lg:shrink">
          {/* Notched damask with its gold frame (646.64 × 548.28 in Figma), 20.68px in from the left and 18.75px from the top. */}
          <div className="absolute top-[18.75px] right-[19.68px] bottom-[18.97px] left-[20.68px]">
            <Image src={damaskAubergine} alt="" fill sizes="(min-width: 992px) 647px, 94vw" className="object-fill" />
          </div>
          {rings.map((place) => (
            <Image key={place} src={ring} alt="" className={`absolute size-2.5 ${place}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
