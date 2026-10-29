import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import railAccent from "../../assets/shared/rail-accent.svg";
import { retainTestimonials, sellTestimonials, supportTestimonials, type Testimonial } from "../../config/testimonials";
import { RailAccent } from "../shared/rail-accent";
import { SectionTitle } from "../shared/section-title";
import { TestimonialCarousel } from "./testimonial-carousel";

type Variant = "home" | "sell" | "support" | "retain";

/** Each page's eyebrow, headline (and the header width it needs) and slides. */
const variants: Record<Variant, { eyebrow: string; title: ReactNode; headerWidth: string; slides?: Testimonial[]; largeName?: boolean }> = {
  home: {
    eyebrow: "Customer Testimonials",
    title: (
      <SectionTitle
        id="testimonials-title"
        initial={"T "}
        firstLine="rusted by brands who used"
        secondLine="to do this the hard way"
        width={612.677}
        variant="calligraphic"
        weight="light"
      />
    ),
    headerWidth: "max-w-[650px]",
    largeName: true,
  },
  sell: {
    eyebrow: "Client testimonial",
    title: (
      <SectionTitle
        id="testimonials-title"
        initial="C"
        firstLine="onversion on our PDP"
        secondLine="jumped 31% in six weeks."
        width={612.677}
        variant="quote"
      />
    ),
    headerWidth: "max-w-[650px]",
    slides: sellTestimonials,
  },
  support: {
    eyebrow: "Client testimonial",
    title: (
      <SectionTitle
        id="testimonials-title"
        initial="R"
        firstLine="esolution time dropped from hours to under"
        secondLine="two minutes, without losing the personal touch."
        width={1000}
        variant="calligraphic"
        weight="light"
      />
    ),
    headerWidth: "max-w-[1000px]",
    slides: supportTestimonials,
  },
  retain: {
    eyebrow: "Client testimonial",
    title: (
      <SectionTitle
        id="testimonials-title"
        initial="R"
        firstLine="eturns dropped 18% in the first quarter"
        secondLine="without changing our return policy."
        width={1000}
        variant="calligraphic"
        weight="light"
      />
    ),
    headerWidth: "max-w-[1000px]",
    slides: retainTestimonials,
  },
};

/**
 * The testimonial carousel under a centred eyebrow and headline. `sell`, `support` and `retain`
 * are Figma's Client testimonial on those pages: their own headline (two 60px lines; Sell's after a
 * Parisienne swash, Support's and Retain's after a Tangerine one, Light at 0.9) and quote.
 */
export function Testimonials({ variant = "home" }: { variant?: Variant }) {
  const v = variants[variant];

  return (
    <section aria-labelledby="testimonials-title" className="relative section-pad">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[98px]">
        <RailAccent src={railAccent} className="absolute top-0 left-[calc(var(--frame-inset)-0.5px)]" />
        <RailAccent src={railAccent} className="absolute top-0 right-[calc(var(--frame-inset)-0.5px)]" />
      </div>

      <div className="flex flex-col items-stretch gap-section">
        <div className={`mx-auto flex content-width ${v.headerWidth} flex-col items-center gap-6`}>
          <Eyebrow>{v.eyebrow}</Eyebrow>
          {v.title}
        </div>

        {/* The carousel spans the page rails, not the content column. */}
        <TestimonialCarousel testimonials={v.slides} largeName={v.largeName} />
      </div>
    </section>
  );
}
