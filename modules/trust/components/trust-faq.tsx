import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/components/ui/rail-accent";
import { SectionTitle } from "@/components/ui/section-title";
import { Rails } from "@/modules/marketing/components/rails";
import { FaqList } from "@/modules/pricing/components/faq/faq-list";

// Figma (4495:6599) gives the questions only; these answers are drafts to review.
const faqs = [
  {
    q: "Can we sign a DPA?",
    a: "Yes. We sign data processing agreements with customers on request. Ask your Crossword contact and we’ll send ours over, or review yours.",
  },
  {
    q: "Does Crossword train on customer data?",
    a: "No. Your catalog, policies, order data and conversations are used to serve your shoppers, not to train AI models.",
  },
  {
    q: "How does Crossword prevent hallucinations and unsafe responses?",
    a: "Crossword answers only from what you’ve approved: your catalog, policies and order data. Every reply is checked against your rules before it’s sent, attempts to rewrite its instructions are screened out, and when the answer isn’t there it says so and hands the shopper to your team.",
  },
];

/**
 * Figma "FAQ" (Trust & security, 4495:6599): as Pricing's, the 420px column with the eyebrow and swash headline, 120px
 * from the plain accordion (the first question open). Below 1024px they stack.
 */
export function TrustFaq() {
  return (
    <section aria-labelledby="trust-faq-title" className="relative section-pad bg-cream">
      <Rails />
      <RailAccent className="absolute top-(--section-pad) left-[calc(var(--frame-inset)-0.5px)] z-2 h-[210px] w-px max-lg:hidden" />

      <div className="relative grid content-width gap-12 lg:grid-cols-[420px_minmax(0,1fr)] lg:gap-[120px]">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>FAQs</Eyebrow>
          <SectionTitle id="trust-faq-title" initial="H" firstLine="ave a question?" secondLine="Ask Crossword" width={408} variant="dynamic" weight="light" />
        </div>

        <FaqList variant="plain" items={faqs} />
      </div>
    </section>
  );
}
