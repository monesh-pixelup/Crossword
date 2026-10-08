import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import railAccent from "../../assets/shared/rail-accent.svg";
import { SectionTitle } from "../shared/section-title";
import { TestimonialCarousel } from "./testimonial-carousel";

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="relative section-pad">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[98px]">
        <Image src={railAccent} alt="" className="absolute top-0 left-[calc(var(--frame-inset)-0.5px)]" />
        <Image src={railAccent} alt="" className="absolute top-0 right-[calc(var(--frame-inset)-0.5px)]" />
      </div>

      <div className="flex flex-col items-stretch gap-section">
        <div className="mx-auto flex content-width max-w-[650px] flex-col items-center gap-6">
          {/* Figma's label is padded with a space on each side. */}
          <Eyebrow>{" Customer Testimonials "}</Eyebrow>
          <SectionTitle
            id="testimonials-title"
            initial={"T "}
            firstLine="rusted by brands who used"
            secondLine={<span className="font-light">to do this the hard way</span>}
            width={612.677}
            variant="calligraphic"
          />
        </div>

        {/* The carousel spans the page rails, not the content column. */}
        <TestimonialCarousel />
      </div>
    </section>
  );
}
