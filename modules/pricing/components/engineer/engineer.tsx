import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TextLink } from "@/modules/dynamic-landing-pages/components/shared/text-link";
import quoteMark from "@/modules/landing/assets/launch/quote-mark.svg";
import { SectionTick } from "@/modules/dynamic-landing-pages/components/shared/section-tick";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";

/**
 * Engineer and setup (content doc). Layout/Process, Quote + steps variant's header (as Managed
 * launch on the home page, the kit's `.wk-ql`): a centred eyebrow, swash headline and copy, then
 * the doc's closing line as the sand quote bar with gold quote marks, and a link to Managed Launch.
 */
export function Engineer() {
  return (
    <section aria-labelledby="engineer-title" className="relative section-pad">
      <SectionTick />

      <div className="flex content-width flex-col items-center gap-section">
        <div className="flex flex-col items-center gap-6 text-center">
          <Eyebrow>Engineer and setup</Eyebrow>
          <SectionTitle
            id="engineer-title"
            initial="E"
            firstLine="very launch comes"
            secondLine="with an engineer"
            width={500}
            variant="centered"
          />
          <p className="max-w-[600px] font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted">
            Every Crossword account launches with our support, a human forward-deployed engineer who works with your team
            to get the agent live, connected, trained, and working the way it should. Implementation, connectors,
            knowledge ingestion, and your branded widget are included.
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-8">
          <blockquote className="relative w-full max-w-[827px] bg-sand/50 px-5 py-11 text-center shadow-[inset_0_0_0_0.5px_var(--color-engraved)] xs:py-4 xs:pr-16 xs:pl-[72px]">
            <p className="font-serif text-[22px] leading-[1.1] tracking-[-0.04em] text-ink">
              The goal isn&rsquo;t to get you set up. It&rsquo;s to get you working.
            </p>
            <Image src={quoteMark} alt="" className="absolute top-2 left-3 xs:top-[12.39px] xs:left-[26.16px]" />
            <Image src={quoteMark} alt="" className="absolute right-3 bottom-2 rotate-180 xs:right-[26.16px] xs:bottom-[12.75px]" />
          </blockquote>
          <TextLink href="/managed-launch">See Managed Launch</TextLink>
        </div>
      </div>
    </section>
  );
}
