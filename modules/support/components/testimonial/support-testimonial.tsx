import Image from "next/image";
import { Studs } from "@/modules/dynamic-landing-pages/components/shared/livery";
import markClose from "@/modules/landing/assets/testimonials/mark-close.svg";
import markOpen from "@/modules/landing/assets/testimonials/mark-open.svg";
import { type Testimonial, supportTestimonial } from "../../config/testimonial";

/**
 * One client quote (Support's by default; Retain passes its own) on a studded sand card (the
 * testimonial card's ground and hairline): the result as a serif pull quote between the quote
 * marks, and the longer quote with its attribution beside it, split by a hairline.
 */
export function SupportTestimonial({ testimonial }: { testimonial?: Testimonial }) {
  const t = testimonial ?? supportTestimonial;

  return (
    <section aria-label="Client testimonial" className="relative pb-(--section-pad)">
      <figure className="relative grid content-width gap-12 bg-sand p-8 shadow-[inset_0_0_0_0.5px_var(--color-engraved)] md:p-12 lg:grid-cols-[1.25fr_1fr] lg:gap-0">
        <Studs inset={8} />

        <blockquote className="flex flex-col items-start gap-5 lg:pr-12">
          <Image src={markOpen} alt="" className="h-4 w-auto" />
          <p className="font-serif text-(length:--h5-size) leading-[1.2] font-light tracking-[-0.04em] text-ink">
            {t.headline}
            <Image src={markClose} alt="" className="ml-2 inline h-3 w-auto align-top" />
          </p>
        </blockquote>

        <div className="flex flex-col justify-between gap-8 lg:border-l-[0.5px] lg:border-rail lg:pl-12">
          <p className="font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted">&ldquo;{t.quote}&rdquo;</p>
          {/* The guidelines retire Tangerine (6.1); the name is set in Crimson until a signature is drawn as artwork. */}
          <figcaption className="flex flex-col gap-1">
            <span className="font-serif text-[20px] leading-[1.1] tracking-[-0.04em] text-ink">{t.name}</span>
            <span className="font-sans text-[12px] leading-[1.3] tracking-[-0.03em] text-ink-muted">{t.role}</span>
          </figcaption>
        </div>
      </figure>
    </section>
  );
}
