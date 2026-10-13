import { Eyebrow } from "@/components/ui/eyebrow";
import { TextLink } from "@/modules/dynamic-landing-pages/components/shared/text-link";
import { DividerBand } from "@/modules/landing/components/shared/divider-band";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ctaLinks } from "@/modules/marketing";
import { FaqList } from "./faq-list";

/**
 * FAQs. Layout/Conversion, FAQ variant (Figma “Before you ask the concierge”, the kit's `.wk-faq`):
 * a 420px column with the eyebrow, swash headline, a line of copy and a link, 120px from the
 * accordion of the doc's starter questions. Below 992px they stack.
 */
export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="relative section-pad-band">
      <DividerBand glyph="book" />

      <div className="grid content-width gap-12 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-[120px]">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>FAQs</Eyebrow>
          <SectionTitle id="faq-title" initial="H" firstLine="ave a question?" secondLine="Ask Crossword" width={420} />
          <p className="font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted">
            Everything brands ask before their first conversation. If yours is not here, the desk is open.
          </p>
          <TextLink href={ctaLinks.bookDemo}>Talk to us</TextLink>
        </div>

        <FaqList />
      </div>
    </section>
  );
}
