import Image, { type StaticImageData } from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import giftFinder from "../../assets/library/gift-finder.svg";
import sizeFit from "../../assets/library/size-fit.svg";
import styleMatch from "../../assets/library/style-match.svg";
import support from "../../assets/library/support.svg";
import { libraryJourneys } from "../../config/launch";

/** Each journey's 22px gold line icon, in the order of libraryJourneys. */
const icons: StaticImageData[] = [giftFinder, styleMatch, sizeFit, support];

/**
 * Figma's 32px icon tile: maroon inside a 0.8px #efe9db border ringed by 0.8px of gold, a gold square turned 45°
 * (35.2px, clipped to the tile), a 1.6px gold stud in each corner, and the 22px icon centred (0.13px low) in a
 * 21.719px clip.
 */
function IconTile({ icon }: { icon: StaticImageData }) {
  return (
    <span aria-hidden className="relative size-8 shrink-0 overflow-clip border-[0.8px] border-[#efe9db] bg-maroon shadow-[0_0_0_0.8px_#ffb657]">
      <span className="absolute top-[calc(50%+0.13px)] left-1/2 size-[21.719px] -translate-1/2 overflow-clip">
        <Image src={icon} alt="" className="absolute top-0 left-0 size-[22px] max-w-none" />
      </span>
      <span className="absolute top-1/2 left-1/2 size-[35.2px] -translate-1/2 rotate-45 border-[0.8px] border-[#ffb657]" />
      {["top-0 left-0", "top-0 right-0", "right-0 bottom-0", "bottom-0 left-0"].map((corner) => (
        <span key={corner} className={`absolute ${corner} size-[1.6px] rounded-full bg-[#ffb657]`} />
      ))}
    </span>
  );
}

/**
 * Figma "Section · Journey library (4x4)" (node 3295:53): a sand panel between the page rails (0.5px black/25
 * hairline, 80px top and bottom inside it, as Workflows on Support), the cream eyebrow over a two-line swash headline
 * (1000px box) and 8px below it an 820px line of Geist Light, then 80px below a row of four journeys, 28px either
 * side of 10% black rules: the icon tile, a Crimson 22 title and Geist 15 copy in ink muted, 24px apart. Two
 * columns from 640px, four (with the rules) from 992px; stacked below.
 */
export function JourneyLibrary() {
  return (
    <section aria-labelledby="journey-library-title" className="relative px-(--frame-inset)">
      <div className="bg-sand py-16 shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)] md:py-20">
        {/* Full content width, no cap, so the heading lines up with the other sections' at every viewport. */}
        <div className="mx-auto flex w-[calc(100%-2*(var(--page-pad)-var(--frame-inset)))] flex-col gap-16 lg:gap-20">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>A few of the many</Eyebrow>
            <div className="flex flex-col items-start gap-2">
              <SectionTitle
                id="journey-library-title"
                initial="E"
                firstLine="very Journey is built by people"
                secondLine="who study this for a living"
                width={1000}
                variant="humanMode"
              />
              <p className="max-w-[820px] font-sans text-base leading-6 font-light tracking-[-0.32px] text-black/60">
                Each one maps the whole path: what the shopper asks, where they stall, what nudges them forward, and when a
                person should step in. Then it&rsquo;s tested against how real customers behave before it reaches yours.
              </p>
            </div>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 lg:flex lg:items-start lg:gap-7">
            {libraryJourneys.map((journey, i) => (
              <div key={journey.title} className="contents">
                {/* The 0-wide rule's 1.054px stroke (black/20 at 50%) is centred on its line. */}
                {i > 0 && (
                  <span aria-hidden className="relative hidden w-0 shrink-0 self-stretch lg:block">
                    <span className="absolute inset-y-0 -left-[0.527px] w-[1.054px] bg-black/10" />
                  </span>
                )}
                <div className="flex min-w-0 flex-col items-start gap-6 lg:flex-1 lg:basis-0">
                  <IconTile icon={icons[i]} />
                  <h3 className="font-serif text-[22px] leading-[1.1] tracking-[-0.88px] text-ink">{journey.title}</h3>
                  <p className="font-sans text-[15px] leading-[1.5] tracking-[-0.3px] text-ink-muted">{journey.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
