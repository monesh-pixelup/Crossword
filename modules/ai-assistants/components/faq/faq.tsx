import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/components/ui/section-title";
import { FaqList } from "@/modules/pricing/components/faq/faq-list";
import { assistantFaqs } from "../../config/faq";

/**
 * Figma "Section · FAQs" (node 3305:1628), Pricing's FAQ without its divider band, copy and link:
 * a 420px column with the eyebrow over the swash headline, 120px from the accordion, 120px above
 * and below. Below 992px they stack. Personal agents (3308:914) passes its own questions.
 */
export function AssistantsFaq({
  id = "assistants-faq-title",
  items = assistantFaqs,
  swashTracking,
}: {
  id?: string;
  items?: readonly { q: string; a: string }[];
  /**
   * The H's tracking in em, where Figma sets its own (AI Assistants 3991:205446: -6%, a 399px box; Personal agents
   * 3991:206643: -5%, 400px); +5% otherwise. The box narrows with the tighter capital.
   */
  swashTracking?: number;
}) {
  return (
    <section aria-labelledby={id} className="section-pad">
      <div className="grid content-width gap-12 lg:grid-cols-[420px_minmax(0,1fr)] lg:gap-[120px]">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>FAQs</Eyebrow>
          <SectionTitle
            id={id}
            initial="H"
            firstLine="ave a question?"
            secondLine="Ask Crossword"
            width={swashTracking === undefined ? 408 : Math.round(408 - (0.05 - swashTracking) * 82)}
            variant="dynamic"
            weight="light"
            swashTracking={swashTracking}
          />
        </div>

        <FaqList items={items} variant="plain" />
      </div>
    </section>
  );
}
