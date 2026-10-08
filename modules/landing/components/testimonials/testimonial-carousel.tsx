"use client";

import Image from "next/image";
import { type CSSProperties, useState } from "react";
import arrowNext from "../../assets/testimonials/arrow-next.svg";
import arrowPrev from "../../assets/testimonials/arrow-prev.svg";
import { initialTestimonial, testimonials } from "../../config/testimonials";
import { TestimonialSlide } from "./testimonial-slide";

const arrowButton =
  "pointer-events-auto relative h-[32.133px] w-[38.357px] cursor-pointer transition-opacity disabled:cursor-default disabled:opacity-40";

/**
 * Centred testimonial with faded neighbours either side, spanning the page rails. The track
 * slides so the active slide's centre sits at the window's centre: a slide step of 908px
 * (844px card + 64px gap) from 992px, 544px below, and 85% of the window on phones.
 * The arrows sit on the active card's edges, and under the card on phones.
 */
export function TestimonialCarousel() {
  const [active, setActive] = useState(initialTestimonial);
  const last = testimonials.length - 1;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      className="@container relative mx-(--frame-inset)"
    >
      <div className="overflow-hidden">
        <div
          className="flex items-center transition-transform duration-500 ease-out [--half:42.5cqw] [--step:85cqw] motion-reduce:transition-none md:[--half:272px] md:[--step:544px] lg:gap-16 lg:[--half:422px] lg:[--step:908px]"
          style={
            {
              "--i": active,
              transform: "translateX(calc(50cqw - var(--half) - var(--i) * var(--step)))",
            } as CSSProperties
          }
        >
          {testimonials.map((t, i) => (
            <TestimonialSlide key={i} testimonial={t} active={i === active} index={i} total={testimonials.length} />
          ))}
        </div>
      </div>

      <div className="pointer-events-none mt-6 flex items-center justify-center gap-3 md:absolute md:top-1/2 md:left-1/2 md:mt-0 md:w-[534px] md:-translate-x-1/2 md:-translate-y-1/2 md:justify-between lg:w-[882px]">
        <button
          type="button"
          aria-label="Previous testimonial"
          disabled={active === 0}
          onClick={() => setActive((i) => Math.max(0, i - 1))}
          className={arrowButton}
        >
          {/* Figma mirrors this artwork horizontally. */}
          <Image src={arrowPrev} alt="" className="absolute top-[-6px] left-[-8.001px] max-w-none -scale-x-100" />
        </button>
        <button
          type="button"
          aria-label="Next testimonial"
          disabled={active === last}
          onClick={() => setActive((i) => Math.min(last, i + 1))}
          className={arrowButton}
        >
          <Image src={arrowNext} alt="" className="absolute top-[-6px] left-[-8.001px] max-w-none" />
        </button>
      </div>
    </div>
  );
}
