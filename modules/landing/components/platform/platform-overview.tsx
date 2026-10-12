import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";
import divider from "../../assets/platform/divider.svg";
import { platformCards } from "../../config/platform";
import { SectionTitle } from "../shared/section-title";
import { AgentDiagram } from "./agent-diagram";
import { CardCarousel } from "./card-carousel";

/*
 * Layout follows the Webflow build: a sand panel inset to the page rails holding a header row
 * (headline beside the channel diagram, stacked below 992px), the arrows, then a slider whose
 * slides carry their own side padding (56 / 32 / 20px) so the dividers sit between them.
 */
export function PlatformOverview() {
  return (
    <section aria-labelledby="platform-title" className="relative px-(--frame-inset)">
      {/* Sand panel; its 0.5px border is a hairline outline so it adds no size. */}
      <div className="relative overflow-clip bg-sand px-3 py-12 hairline-[0.5px] outline-black/25 md:px-6 md:py-16 lg:px-[53px] lg:py-20">
        <div className="@container mx-auto w-full max-w-[1280px]">
          <div className="flex flex-col items-start gap-10 lg:h-[299px] lg:flex-row lg:justify-between lg:gap-8">
            <div className="flex flex-none flex-col items-start gap-6">
              <Eyebrow surface="sand">Platform overview</Eyebrow>
              <SectionTitle
                id="platform-title"
                initial="O"
                firstLine="ne reply,"
                secondLine={<span className="font-light">A dozen decisions</span>}
                width={372}
                variant="compact"
                gutter={0}
              />
            </div>

            {/* The diagram is drawn at 699px and zoomed to its box (full width when stacked). */}
            <div className="@container w-full max-w-[699px] lg:mt-[16.5px] lg:mr-[20.5px] lg:min-w-0 lg:flex-[0_1_auto]">
              <div className="h-[285.33px] w-[699px] scale-to-container [--fit-width:699px]">
                <AgentDiagram />
              </div>
            </div>
          </div>

          <CardCarousel
            label="How the Crossword platform works"
            controlsClassName="mt-[26px] justify-end"
            className="mt-8 -mx-5 md:mt-10 md:-mx-8 lg:mt-[62px] lg:-mx-14"
          >
            {platformCards.map((card, i) => {
              const last = i === platformCards.length - 1;
              return (
                <article
                  key={card.title}
                  data-carousel-card
                  // Its copy runs long: on phones it widens to match the other cards' height.
                  data-carousel-fit={last || undefined}
                  className={cn(
                    "relative flex w-[85%] shrink-0 snap-start flex-col items-start gap-6 px-5 md:px-8 lg:px-14",
                    last ? "md:w-[min(768px,100%)] lg:w-[1112px]" : "md:w-[512px] lg:w-[649px]",
                  )}
                >
                  <h3 className="font-serif text-(length:--h6-size) leading-[1.1] tracking-[-0.04em] text-ink">{card.title}</h3>
                  <div
                    className="text-base leading-6 tracking-[-0.32px] text-black/50"
                    style={card.narrow ? { maxWidth: card.narrow } : undefined}
                  >
                    {card.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                  {!last && (
                    <Image
                      src={divider}
                      alt=""
                      aria-hidden
                      className="absolute top-0 right-0 h-[203px] w-[1.054px] max-w-none translate-x-1/2"
                    />
                  )}
                </article>
              );
            })}
          </CardCarousel>
        </div>
      </div>
    </section>
  );
}
