import type { ReactNode } from "react";
import { StampButton } from "@/components/ui/stamp-button";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ctaLinks } from "@/modules/marketing";
import { TwillPanel } from "@/modules/pricing/components/shared/twill-panel";

/**
 * Figma "Section · CTA" (node 3305:1697), the site's CTA banner layout: the maroon twill panel with its gold hairline
 * frame 14px in, 96px of padding inside and around it, and 28px between the cream swash headline and the Primary
 * stamp button, with the tilted green postage stamp in the top right corner. No eyebrow or corner studs.
 *
 * The default headline sets two lines across 1032.586px, re-broken onto three shorter ones (860px) below 768px so it
 * stays legible. Personal agents passes its own two-line headline (724px).
 */
export function AssistantsCta({
  id = "assistants-cta-title",
  initial = "T",
  firstLine,
  secondLine,
  width = 1032.586,
}: {
  id?: string;
  initial?: string;
  firstLine?: ReactNode;
  secondLine?: ReactNode;
  /** The headline's Figma text-box width. */
  width?: number;
}) {
  const own = firstLine !== undefined;
  return (
    <section aria-labelledby={id} className="relative py-16 md:py-24">
      <div className="content-width">
        <CtaBannerPanel>
          <CtaBannerTitle
            id={id}
            initial={initial}
            firstLine={
              firstLine ?? (
                <>
                  hink of the difference between being<span className="max-md:hidden"> name-</span>
                </>
              )
            }
            secondLine={
              own ? (
                secondLine
              ) : (
                <>
                  <span className="max-md:hidden">dropped at a party and actually being in the room</span>
                  <span className="md:hidden">
                    name-dropped at a party and actually
                    <br />
                    being in the room
                  </span>
                </>
              )
            }
            width={width}
            mobileWidth={own ? undefined : 860}
          />
          <StampButton href={ctaLinks.bookDemo} className="focus-visible:outline-gold">
            TALK TO US
          </StampButton>
        </CtaBannerPanel>
      </div>
    </section>
  );
}

/**
 * The CTA banner's panel (AI Assistants, Personal agents, Managed launch, Pricing): the twill panel with its frame
 * 14px in and the postage stamp, its contents centred in a column 28px apart, with 96px of padding (64px and 24px
 * on phones, where the top keeps 96px so the stamp clears the headline).
 */
export function CtaBannerPanel({ children }: { children: ReactNode }) {
  return (
    <TwillPanel
      frameInset={14}
      stamp
      className="flex flex-col items-center gap-7 px-6 pt-24 pb-16 text-center md:px-20 md:py-24"
    >
      {children}
    </TwillPanel>
  );
}

/** The CTA banner's cream swash headline, scaled to fit the panel's content box (its own container). */
export function CtaBannerTitle(props: {
  id: string;
  initial: string;
  firstLine: ReactNode;
  secondLine: ReactNode;
  width: number;
  mobileWidth?: number;
}) {
  return (
    <div className="@container flex w-full justify-center">
      <SectionTitle {...props} variant="dynamicCentered" weight="light" tone="cream" gutter={0} />
    </div>
  );
}
