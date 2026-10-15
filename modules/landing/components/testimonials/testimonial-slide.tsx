import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import markClose from "../../assets/testimonials/mark-close.svg";
import markOpen from "../../assets/testimonials/mark-open.svg";
import ornament from "../../assets/testimonials/ornament.webp";
import stamp from "../../assets/testimonials/stamp.webp";
import type { Testimonial } from "../../config/testimonials";
import { PortraitCard } from "./portrait-card";

/*
 * From 992px Figma lays out the centre (active) slide and the faded side slides differently,
 * so each state carries its own coordinates (px in the 844px card). The art (ornament,
 * portrait, stamp) lives in a 394 × 389 box anchored at (450, 19) of the card; below 992px
 * that box is pinned to the card's bottom-right and zoomed (320 / 256 / 224px wide, as in the
 * Webflow build) under the quote, which then flows in the card's padding.
 */
const layouts = {
  active: {
    card: "lg:top-0 lg:h-[408px]",
    quote: { left: 41, top: 29 },
    author: { left: 41, top: 324 },
    // The damask ornament is one export, shown 1.1844x larger on side slides.
    ornament: { clipLeft: 201, left: 0, top: 0.21, width: 193, height: 269 },
    portrait: { left: 73.17, top: 99.32 },
    stamp: { left: 1.678, top: 256.533 },
  },
  inactive: {
    card: "lg:top-6 lg:h-[360px]",
    quote: { left: 40.55, top: 18.71 },
    author: { left: 40.55, top: 287 },
    ornament: { clipLeft: 200.55, left: -43.96, top: -44, width: 228.58, height: 318.59 },
    portrait: { left: 72.72, top: 75.32 },
    stamp: { left: -10.062, top: 229.353 },
  },
} as const;

const move = "transition-[left,top] duration-500 ease-out motion-reduce:transition-none";

/** Desktop coordinates as variables, so phones and tablets can lay the same element out in flow. */
const at = (p: { left: number; top: number }) => ({ "--l": `${p.left}px`, "--t": `${p.top}px` }) as CSSProperties;

type TestimonialSlideProps = {
  testimonial: Testimonial;
  active: boolean;
  index: number;
  total: number;
};

export function TestimonialSlide({ testimonial, active, index, total }: TestimonialSlideProps) {
  const l = layouts[active ? "active" : "inactive"];

  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}`}
      aria-hidden={!active || undefined}
      inert={!active}
      className="relative flex w-[85cqw] shrink-0 px-3 md:w-[544px] md:px-6 lg:h-[408px] lg:w-[844px] lg:px-0"
    >
      <figure
        className={cn(
          "relative w-full overflow-clip bg-sand pt-6 pr-6 pb-[184px] pl-8 transition-[top,height,opacity,clip-path] duration-500 ease-out motion-reduce:transition-none xs:pb-[208px] md:pt-[29px] md:pr-8 md:pb-[260px] md:pl-[41px] lg:absolute lg:inset-x-0 lg:p-0",
          // Side slides fade; below 992px they are also clipped 24px top and bottom (Figma's shrink).
          active ? "opacity-100" : "opacity-40 [clip-path:inset(24px_0)] lg:[clip-path:none]",
          l.card,
        )}
      >
        {/* Art box: Figma positions from 992px; bottom-right and zoomed below. */}
        <div
          aria-hidden
          className={cn(
            "absolute right-0 bottom-0 h-[389px] w-[394px] [zoom:0.6497] max-xs:[zoom:0.5685] md:[zoom:0.8122] lg:right-auto lg:bottom-auto lg:left-[450px] lg:top-[19px] lg:[zoom:1]",
          )}
        >
          <div
            className={`absolute -top-[19px] right-0 bottom-0 overflow-clip lg:left-(--l) ${move}`}
            style={{ "--l": `${l.ornament.clipLeft}px`, left: layouts.active.ornament.clipLeft } as CSSProperties}
          >
            <Image
              src={ornament}
              alt=""
              sizes="229px"
              className="absolute max-w-none transition-[left,top,width,height] duration-500 ease-out motion-reduce:transition-none"
              style={{
                left: l.ornament.left,
                top: l.ornament.top + 19,
                width: l.ornament.width,
                height: l.ornament.height,
              }}
            />
          </div>

          <PortraitCard
            color={testimonial.cardColor}
            className={`absolute left-[73.17px] top-[99.32px] lg:left-(--l) lg:top-(--t) ${move}`}
            style={at(l.portrait)}
          />

          {/*
            The stamp's guilloché pattern is a Figma WebGPU shader, so it ships as
            a 3x export, cut out of its background. The export's box includes the
            drop shadow, offset (-13.772, -10.467) from the stamp's own box.
          */}
          <Image
            src={stamp}
            alt=""
            sizes="131px"
            className={`absolute top-[256.533px] left-[1.678px] h-[127.667px] w-[130.667px] max-w-none lg:left-(--l) lg:top-(--t) ${move}`}
            style={at(l.stamp)}
          />
        </div>

        <blockquote
          className={`relative font-serif ${testimonial.smallQuote ? "text-[24px] leading-[1.15]" : "text-(length:--h5-size) leading-[1.1]"} font-light tracking-[-0.04em] text-[#040404] lg:absolute lg:left-(--l) lg:top-(--t) lg:w-[443.706px] ${move}`}
          style={at(l.quote)}
        >
          <Image src={markOpen} alt="" className="absolute top-[0.83px] -left-[22.39px]" />
          <p>
            {testimonial.quote}
            <Image src={markClose} alt="" className="relative top-[2px] ml-[5.1px] inline-block rotate-180 align-top" />
          </p>
        </blockquote>

        <figcaption
          className={`relative mt-6 flex flex-col items-start gap-2 lg:absolute lg:left-(--l) lg:top-(--t) lg:mt-0 ${move}`}
          style={at(l.author)}
        >
          <span className="font-calligraphy text-[28px] leading-[1.13] font-bold tracking-[-0.84px] whitespace-nowrap text-[#121212]">
            {testimonial.name}
          </span>
          <span className="font-inter text-[12px] leading-[1.13] tracking-[-0.36px] text-[rgba(18,18,18,0.8)]">
            <span className="text-[#121212]">{testimonial.role}</span>
            {" at "}
            <span className="text-[#121212]">{testimonial.company}</span>
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
