import Image, { type StaticImageData } from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/components/ui/section-title";
import cardDamask from "../../assets/library/card-damask.png";
import cardPaper from "../../assets/library/card-paper.png";
import stampGiftFinder from "../../assets/library/stamps/1-gift-finder.png";
import stampStyleMatch from "../../assets/library/stamps/2-style-match.png";
import stampSizeAndFit from "../../assets/library/stamps/3-size-and-fit.png";
import stampReturns from "../../assets/library/stamps/4-returns.png";
import stampOrderTracking from "../../assets/library/stamps/5-order-tracking.png";
import stampCareGuide from "../../assets/library/stamps/6-care-guide.png";
import stampProductDeepDive from "../../assets/library/stamps/7-product-deep-dive.png";
import stampBundleBuilder from "../../assets/library/stamps/8-bundle-builder.png";
import stampBrandFaq from "../../assets/library/stamps/9-brand-faq.png";
import { libraryJourneys } from "../../config/launch";

/**
 * Each journey's embossed stamp, in libraryJourneys order. Their leather and guilloché looks are Figma WebGPU shaders,
 * so they ship as 3x exports (their shadow included), as the blog's stamp does.
 */
const stamps: StaticImageData[] = [
  stampGiftFinder,
  stampStyleMatch,
  stampSizeAndFit,
  stampReturns,
  stampOrderTracking,
  stampCareGuide,
  stampProductDeepDive,
  stampBundleBuilder,
  stampBrandFaq,
];

/** The card's 5px bottom bar, by accent. */
const accentBar = {
  aubergine: "shadow-[inset_0_-5px_0_0_#462160]",
  maroon: "shadow-[inset_0_-5px_0_0_#7d0034]",
  green: "shadow-[inset_0_-5px_0_0_#004926]",
} as const;

/**
 * Figma's journey card (4233:12710): 244 × 329 on cream paper (white under a multiplied paper grain, tinted #fff9ea),
 * a damask band along its foot and a 5px bar in its accent, lifted on a soft shadow. 26px in: the title (a Parisienne
 * 45 capital, then Crimson ExtraLight 29, aubergine), 19.56px over a hairline and 19.56px more over the Geist 16
 * line, all 191.84px wide. The stamp sits 239px down, 26px in, turned -6.78°, wherever the copy ends.
 */
function JourneyCard({ index }: { index: number }) {
  const journey = libraryJourneys[index];
  return (
    <li className="relative isolate h-[329px] w-[244px] shrink-0 overflow-clip px-[26.081px] pt-[26.081px] shadow-[0_4.075px_6.276px_rgba(0,0,0,0.08)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-white">
        <Image src={cardPaper} alt="" sizes="244px" className="absolute inset-0 size-full max-w-none mix-blend-multiply" />
        <div className="absolute inset-0 bg-[#fff9ea] mix-blend-color" />
        {/* A 3x export of the damask band, its 51px above the 5px bar. */}
        <Image src={cardDamask} alt="" sizes="244px" className="absolute bottom-[5px] left-0 h-[51px] w-full max-w-none" />
      </div>

      <div className="flex w-[191.837px] flex-col items-start gap-[19.561px]">
        <h3 className="w-full font-serif text-[29px] leading-[1.1] font-extralight tracking-[-1.45px] text-[#462160] mix-blend-multiply">
          <span className="font-script text-[45px] leading-[1.18] font-normal">{journey.initial}</span>
          {journey.title}
        </h3>
        <span aria-hidden className="h-[0.859px] w-full bg-black/10" />
        <p className="w-full font-sans text-base leading-6 tracking-[-0.32px] text-ink-muted">{journey.description}</p>
      </div>

      {/* Figma's 65 × 62 stamp box at (26.08, 239); the export carries its shadow, 10.5px out (7.3px above). */}
      <Image
        src={stamps[index]}
        alt=""
        aria-hidden
        sizes="87px"
        className="pointer-events-none absolute top-[231.7px] left-[15.58px] h-[84px] w-[87px] max-w-none select-none"
      />

      <span aria-hidden className={`pointer-events-none absolute inset-0 ${accentBar[journey.accent]}`} />
    </li>
  );
}

/**
 * Figma "Section · Journey library (4x4)" (node 4233:12689): a sand panel between the page rails (a 0.5px black/25
 * hairline), everything left-aligned (Figma centres it): the cream eyebrow 70px down, 24px over the two-line swash
 * headline (1000px box) and 24px under it an 820px line of Geist in ink muted. 55px below that, the nine journey
 * cards from the same left edge: five across, then four, 24px apart either way, 106px clear of the panel's foot.
 * Narrower, the cards wrap to fewer per row, still from the left.
 */
export function JourneyLibrary() {
  return (
    <section aria-labelledby="journey-library-title" className="relative px-(--frame-inset)">
      <div className="overflow-clip bg-sand shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]">
        {/* The eyebrow, headline and copy left-aligned (by request, Figma 4233:12691 centres them), 24px apart, 70px down the panel. */}
        <div className="mx-auto flex w-[calc(100%-2*(var(--page-pad)-var(--frame-inset)))] flex-col items-start gap-6 pt-16 text-left md:pt-[70px]">
          <Eyebrow>A few of the many</Eyebrow>
          <SectionTitle
            id="journey-library-title"
            initial="E"
            firstLine="very Journey is built by us:"
            secondLine={
              <>
                {/* Below 768px the long second line breaks in two, so the headline keeps the other sections' size. */}
                people who study this
                <br className="md:hidden" />
                <span className="max-md:hidden"> </span>for a living
              </>
            }
            width={1000}
            mobileWidth={700}
            variant="dynamic"
            weight="light"
          />
          <p className="max-w-[820px] font-sans text-base leading-6 tracking-[-0.32px] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-ink-muted">
            Each one maps the whole path: what the shopper asks, where they stall, what nudges them forward, and when a
            person should step in. Then it&rsquo;s tested against how real customers behave before it reaches yours.
          </p>
        </div>

        {/*
          The cards from the copy's left edge, wrapping left-aligned: up to 1316px (5 × 244 + 4 × 24), so five across and
          then four where the panel has room (the row may run past the copy's right edge, within the panel).
        */}
        <ul
          aria-label="Journeys"
          className="mt-10 mr-4 ml-[calc(var(--page-pad)-var(--frame-inset))] flex max-w-[1316px] flex-wrap justify-start gap-6 pb-16 md:mt-[55px] md:pb-[106px]"
        >
          {libraryJourneys.map((journey, i) => (
            <JourneyCard key={journey.initial + journey.title} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
