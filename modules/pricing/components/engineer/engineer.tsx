import { Eyebrow } from "@/components/ui/eyebrow";
import { StampButton } from "@/components/ui/stamp-button";
import { TextLink } from "@/modules/dynamic-landing-pages/components/shared/text-link";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ctaLinks } from "@/modules/marketing";
import { TwillPanel } from "../shared/twill-panel";

/**
 * Library · CTA banner (Figma 3156:13867), closing the page: the maroon twill panel with its gold
 * hairline frame 14px in and studs 8px in, 96px of padding top and bottom and 28px between: a
 * centred Dark eyebrow, cream swash headline and on-dark copy, then the Wine stamp beside a cream
 * text link. 96px below it.
 */
export function Engineer() {
  return (
    <section aria-labelledby="engineer-title" className="relative pb-16 md:pb-24">
      <div className="content-width">
        <TwillPanel frameInset={14} studInset={8} className="flex flex-col items-center gap-7 px-6 py-16 text-center md:px-20 md:py-24">
          <Eyebrow surface="green">Engineer and setup</Eyebrow>
          <SectionTitle
            id="engineer-title"
            initial="E"
            firstLine="very launch comes"
            secondLine="with an engineer"
            width={500}
            variant="channels"
            tone="cream"
            gutter={96}
          />
          <p className="max-w-[520px] font-sans text-base leading-6 tracking-[-0.02em] text-on-dark">
            Every Crossword account launches with a human, forward-deployed engineer who works with your team to get the agent
            live, connected, trained, and working the way it should. The goal isn&rsquo;t to get you set up. It&rsquo;s to get
            you working.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <StampButton href={ctaLinks.bookDemo} variant="wine-gold" className="gap-3 focus-visible:outline-gold">
              START YOUR FREE PILOT
              <svg aria-hidden viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-[11px] w-[22px]">
                <path d="M0 6h21M15.5.5 21 6l-5.5 5.5" />
              </svg>
            </StampButton>
            <TextLink href="/managed-launch" tone="cream-solid">
              See Managed Launch
            </TextLink>
          </div>
        </TwillPanel>
      </div>
    </section>
  );
}
