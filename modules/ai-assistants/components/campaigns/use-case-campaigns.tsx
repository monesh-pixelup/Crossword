import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import type { AiaSceneSlug } from "../motion/aia-motion";
import { AiaScenePanel } from "../motion/aia-scene-panel";

/** Figma's two use cases (3562:56, 3562:74), each with its motion visual. */
const useCases: { label: string; title: string; body: string; scene: AiaSceneSlug }[] = [
  {
    label: "Back in stock",
    scene: "back-in-stock-motion",
    title: "Tell me when my size is back.",
    body: "They ask once and then forget about it. When it’s in stock, ChatGPT tells them. The same works for price drops, exchanges and support replies.",
  },
  {
    label: "Price drop",
    scene: "price-drop-motion",
    title: "Let me know when it drops below my budget.",
    body: "Crossword follows a customer-defined price condition, and proactively informs them when the time is right.",
  },
];

/**
 * Section · Campaigns (Figma 3305:453): the eyebrow 24px over a row holding the one-line swash headline (615px box)
 * and, across from it at the row's right edge, its 529px line of copy, the two centred on each other; then 80px
 * below, two 620px use cases 40px apart. Each is its motion visual (620 × 420: ChatGPT on the forest damask in its
 * gold corner-notched frame, the alert landing in the conversation), and 40px under it an Open Sans SemiBold 12
 * label in wine, a Crimson 22 line (#040404) and Geist 16 copy, 16px apart. Below 1280px the copy goes under the
 * headline (beside the 615px headline it would be squeezed to a sliver); below 768px the use cases stack. A 232px
 * gold tick sits on the left rail beside the eyebrow (98px down in Figma).
 */
export function UseCaseCampaigns() {
  return (
    <section aria-labelledby="ai-campaigns-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-22px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-section">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Campaigns</Eyebrow>
          {/* Figma 3932:16696: the headline and its copy on one row, centred on each other, the copy at the right edge. */}
          <div className="flex w-full flex-col items-start gap-[27px] min-[1280px]:flex-row min-[1280px]:items-center min-[1280px]:justify-between min-[1280px]:gap-10">
            <div className="max-w-full shrink-0">
              <SectionTitle id="ai-campaigns-title" initial="R" firstLine="eaches them first" width={614.744} variant="oneLine" weight="light" />
            </div>
            <p className="max-w-[528.945px] min-w-0 font-sans text-base leading-6 tracking-[-0.32px] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-ink-muted min-[1280px]:w-[528.945px] min-[1280px]:shrink-0">
              Send a price-drop alert or a back-in-stock note straight into the conversation. It lands where the shopper
              is already spending their time.
            </p>
          </div>
        </div>

        {/* Stacked below 768px, a thin rule halfway between the two (64px either side). */}
        <ul className="grid w-full grid-cols-1 gap-16 md:grid-cols-2 md:gap-10 max-md:[&>li+li]:border-t max-md:[&>li+li]:border-black/10 max-md:[&>li+li]:pt-16">
          {useCases.map((useCase) => (
            <li key={useCase.label} className="flex min-w-0 flex-col items-start">
              {/* The use case's motion visual, filling the column (past its drawn 620px where the column is wider). */}
              <div className="relative aspect-[620/420] w-full">
                <AiaScenePanel slug={useCase.scene} fill />
              </div>
              <h3 className="mt-10 flex flex-col items-start gap-4">
                <span className="font-open-sans text-[12px] leading-[1.1667] font-semibold tracking-[1.44px] max-md:text-[10px] max-md:leading-3 max-md:tracking-[1.2px] text-wine uppercase">{useCase.label}</span>
                <span className="max-w-[580px] font-serif text-[22px] max-md:text-[20px] leading-[1.0909] font-normal tracking-[-0.88px] text-ink">
                  {useCase.title}
                </span>
              </h3>
              <p className="mt-4 max-w-[540px] font-sans text-base leading-6 tracking-[-0.32px] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-ink-muted">{useCase.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
