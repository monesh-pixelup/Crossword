import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { type ShopperQuestion, shopperQuestions } from "../../config/possibilities";
import { ShopperAsksTabs } from "./shopper-asks-tabs";

/**
 * Section · Possibilities (Figma 3305:252): the eyebrow, a two-line headline (Crimson Light 60 at 1.1) and a line of
 * Geist copy as wide as it, then 80px below the vertical tabs of shopper questions beside their damask
 * panels. A 232px gold tick sits on the left rail beside the eyebrow (98px down in Figma). Personal agents
 * (3308:184) uses it with its own headline and questions, and no copy line (hidden in Figma).
 */
export function ShopperAsks({
  id = "possibilities-title",
  initial = "A",
  firstLine = " shopper asks,",
  secondLine = "Crossword answers",
  width = 707.715,
  copy = (
    <>
      Shoppers in ChatGPT ask real buying questions. Crossword makes sure the answers come with your available products
      attached and informed by your brand&rsquo;s priorities.
    </>
  ),
  questions = shopperQuestions,
}: {
  id?: string;
  initial?: string;
  firstLine?: ReactNode;
  secondLine?: ReactNode;
  /** The headline's Figma text-box width (the copy line keeps to it too). */
  width?: number;
  /** The line under the headline; null for none. */
  copy?: ReactNode;
  questions?: ShopperQuestion[];
}) {
  return (
    <section aria-labelledby={id} className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-22px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col items-start gap-section">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Possibilities</Eyebrow>
          <SectionTitle id={id} initial={initial} firstLine={firstLine} secondLine={secondLine} width={width} weight="light" />
          {copy && (
            <p className="font-sans text-base leading-6 tracking-[-0.32px] text-black/59" style={{ maxWidth: width }}>
              {copy}
            </p>
          )}
        </div>

        <ShopperAsksTabs questions={questions} />
      </div>
    </section>
  );
}
