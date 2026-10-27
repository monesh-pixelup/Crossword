import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StampButton } from "@/components/ui/stamp-button";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ctaLinks } from "@/modules/marketing";
import { TwillPanel } from "@/modules/pricing/components/shared/twill-panel";

/**
 * Figma "Section · CTA" (node 3305:1697), Pricing's CTA banner with a three-line headline: the
 * maroon twill panel with its gold hairline frame 14px in and studs 8px in, 96px of padding inside
 * and around it and 28px between a centred Dark eyebrow, the cream swash headline (860px) and the
 * Primary stamp. Personal agents (3308:950) passes its own two-line headline.
 */
export function AssistantsCta({
  id = "assistants-cta-title",
  initial = "T",
  firstLine = "hink of the difference between being",
  secondLine = (
    <>
      name-dropped at a party and actually
      <br />
      being in the room
    </>
  ),
  width = 860,
}: {
  id?: string;
  initial?: string;
  firstLine?: ReactNode;
  secondLine?: ReactNode;
  /** The headline's Figma text-box width. */
  width?: number;
}) {
  return (
    <section aria-labelledby={id} className="relative py-16 md:py-24">
      <div className="content-width">
        <TwillPanel frameInset={14} studInset={8} className="flex flex-col items-center gap-7 px-6 py-16 text-center md:px-20 md:py-24">
          <Eyebrow surface="green">Talk to us</Eyebrow>
          <SectionTitle
            id={id}
            initial={initial}
            firstLine={firstLine}
            secondLine={secondLine}
            width={width}
            variant="channels"
            tone="cream"
            gutter={96}
          />
          <StampButton href={ctaLinks.bookDemo} className="focus-visible:outline-gold">
            TALK TO US
          </StampButton>
        </TwillPanel>
      </div>
    </section>
  );
}
