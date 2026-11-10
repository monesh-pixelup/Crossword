import Image from "next/image";
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StampButton } from "@/components/ui/stamp-button";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ctaLinks } from "@/modules/marketing";
import { TwillPanel } from "@/modules/pricing/components/shared/twill-panel";
import ctaStamp from "../../assets/cta-stamp.webp";

/**
 * Figma "Section · CTA" (node 3305:1697): the maroon twill panel with its gold hairline frame 14px in, 96px of
 * padding inside and around it, and 28px between the cream swash headline (two lines across 1032.586px) and the
 * Primary stamp button, with the tilted green postage stamp in the top right corner (exported from Figma at 3x, cut
 * out of the maroon). Below 768px the headline re-breaks onto three shorter lines (860px), so it stays legible.
 *
 * Personal agents (3308:950) sets it the earlier way, `withEyebrow`: a centred "Talk to us" eyebrow above its own
 * two-line headline, corner studs 8px in and no postage stamp.
 */
export function AssistantsCta({
  id = "assistants-cta-title",
  initial = "T",
  firstLine = (
    <>
      hink of the difference between being<span className="max-md:hidden"> name-</span>
    </>
  ),
  secondLine = (
    <>
      <span className="max-md:hidden">dropped at a party and actually being in the room</span>
      <span className="md:hidden">
        name-dropped at a party and actually
        <br />
        being in the room
      </span>
    </>
  ),
  width = 1032.586,
  mobileWidth = 860,
  withEyebrow = false,
}: {
  id?: string;
  initial?: string;
  firstLine?: ReactNode;
  secondLine?: ReactNode;
  /** The headline's Figma text-box width. */
  width?: number;
  /** Its width below 768px, where the lines re-break (see SectionTitle). */
  mobileWidth?: number;
  /** Personal agents' version: the eyebrow and corner studs, no postage stamp. */
  withEyebrow?: boolean;
}) {
  return (
    <section aria-labelledby={id} className="relative py-16 md:py-24">
      <div className="content-width">
        <TwillPanel
          frameInset={14}
          studInset={withEyebrow ? 8 : undefined}
          // On phones, more room on top so the postage stamp clears the headline.
          className={`flex flex-col items-center gap-7 px-6 py-16 text-center md:px-20 md:py-24 ${withEyebrow ? "" : "max-md:pt-24"}`}
        >
          {withEyebrow ? (
            <Eyebrow surface="green">Talk to us</Eyebrow>
          ) : (
            // 95.84 × 94.96 at (1130.4, 40.46) in the 1280px panel, so 53.76px in from its right edge.
            <Image
              src={ctaStamp}
              alt=""
              aria-hidden
              sizes="96px"
              className="pointer-events-none absolute top-[40.5px] right-[53.8px] h-auto w-[95px] select-none max-lg:top-[28px] max-lg:right-[32px] max-lg:w-[76px] max-md:top-[22px] max-md:right-[22px] max-md:w-[58px]"
            />
          )}
          {/* Its own container, so the headline scales to fit the panel's content box. */}
          <div className="@container flex w-full justify-center">
            <SectionTitle
              id={id}
              initial={initial}
              firstLine={firstLine}
              secondLine={secondLine}
              width={width}
              mobileWidth={withEyebrow ? undefined : mobileWidth}
              variant="dynamicCentered"
              weight="light"
              tone="cream"
              gutter={0}
            />
          </div>
          <StampButton href={ctaLinks.bookDemo} className="focus-visible:outline-gold">
            TALK TO US
          </StampButton>
        </TwillPanel>
      </div>
    </section>
  );
}
