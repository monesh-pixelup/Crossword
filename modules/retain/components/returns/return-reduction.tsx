import { Eyebrow } from "@/components/ui/eyebrow";
import { GiltPanel } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ChatThread } from "@/modules/support/components/shared/chat-thread";
import { returnThread } from "../../config/returns";

/**
 * Layout/Livery, forest panel between the page rails: forest grain inside the gilt frame (14px in,
 * studs 7px in), the eyebrow, headline and copy on the left and the size-advice conversation on
 * the ivory chat card on the right, as the guidelines put mock-ups on jewel panels (10.4). The
 * content keeps the page's side padding from 992px, lining up with the other sections; below that
 * the page padding is narrower than the gilt frame, so it keeps its own padding inside the frame.
 */
export function ReturnReduction() {
  return (
    <section aria-labelledby="returns-title" className="relative px-(--frame-inset)">
      <GiltPanel tone="forest" inset={14} className="py-16 md:py-24">
        <div className="relative mx-auto flex w-full flex-col gap-12 px-6 md:px-16 lg:w-[calc(100%-2*(var(--page-pad)-var(--frame-inset)))] lg:px-0 min-[1200px]:flex-row min-[1200px]:items-center min-[1200px]:justify-between min-[1200px]:gap-16">
          <div className="flex flex-col items-start gap-6 min-[1200px]:max-w-[610px]">
            <Eyebrow surface="green">Return reduction</Eyebrow>
            <SectionTitle
              id="returns-title"
              initial="M"
              firstLine="ore confidence at checkout."
              secondLine="Fewer returns after it"
              width={610}
              variant="assist"
              tone="light"
            />
            <p className="max-w-[480px] font-sans text-base leading-6 tracking-[-0.02em] text-on-dark">
              Crossword helps customers choose with more confidence, so they&rsquo;re less likely to buy the wrong size,
              shade, or product in the first place.
            </p>
          </div>

          <div className="w-full min-[1200px]:max-w-[520px] min-[1200px]:flex-[0_1_520px]">
            <ChatThread messages={returnThread} />
          </div>
        </div>
      </GiltPanel>
    </section>
  );
}
