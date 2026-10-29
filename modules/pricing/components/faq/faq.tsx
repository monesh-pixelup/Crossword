import { Eyebrow } from "@/components/ui/eyebrow";
import { TextLink } from "@/modules/dynamic-landing-pages/components/shared/text-link";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ctaLinks } from "@/modules/marketing";
import { BandDivider } from "../shared/band-divider";
import { FaqList } from "./faq-list";

/**
 * Library · FAQ (Figma 3564:23164), under the chat divider band: a 420px column with the eyebrow,
 * swash headline and a link, 120px from the accordion. Below 992px they stack.
 */
export function Faq() {
  return (
    <section
      aria-labelledby="faq-title"
      className="relative pt-[calc(var(--section-pad)+75px)] pb-(--section-pad) max-md:pt-[calc(var(--section-pad)+56px)]"
    >
      <BandDivider glyph="chat" />
      <RailAccent className="absolute top-[calc(var(--section-pad)+75px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[210px] w-px max-lg:hidden" />

      <div className="grid content-width gap-12 lg:grid-cols-[420px_minmax(0,1fr)] lg:gap-[120px]">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>FAQs</Eyebrow>
          <SectionTitle id="faq-title" initial="H" firstLine="ave a question?" secondLine="Ask Crossword" width={408} weight="light" />
          <TextLink href={ctaLinks.bookDemo}>Talk to sales</TextLink>
        </div>

        <FaqList />
      </div>
    </section>
  );
}
