"use client";

import Image from "next/image";
import { type CSSProperties, type TouchEvent, useRef, useState } from "react";
import arrowNext from "../../assets/testimonials/arrow-next.svg";
import arrowPrev from "../../assets/testimonials/arrow-prev.svg";
import { initialTestimonial, type Testimonial, testimonials as defaultTestimonials } from "../../config/testimonials";
import { TestimonialSlide } from "./testimonial-slide";

/** How far a swipe must travel (px) to change the testimonial. */
const SWIPE_DISTANCE = 40;
/** How far a touch moves (px) before it counts as a swipe across or a scroll down the page. */
const SWIPE_LOCK = 8;

const arrowButton =
  "pointer-events-auto relative h-[32.133px] w-[38.357px] cursor-pointer transition-opacity disabled:cursor-default disabled:opacity-40";

/**
 * Centred testimonial with faded neighbours either side, spanning the page rails. The track
 * slides so the active slide's centre sits at the window's centre: a slide step of 908px
 * (844px card + 64px gap) from 992px, 544px below, and 85% of the window on phones.
 * The arrows sit on the active card's edges, and under the card on phones.
 *
 * On a touch screen the cards can be swiped too: the track follows the finger (stiffer past the first and last
 * card), and letting go 40px or more across moves to the next or previous one. A touch that starts down the page
 * scrolls it as usual.
 */
export function TestimonialCarousel({
  testimonials = defaultTestimonials,
  largeName = false,
}: {
  testimonials?: Testimonial[];
  /** The author's name at 38px, as on the home page (28px elsewhere). */
  largeName?: boolean;
}) {
  const [active, setActive] = useState(initialTestimonial);
  const last = testimonials.length - 1;
  // The swipe under way: where it started and whether it has turned out to run across (true) or down the page (false).
  const touch = useRef<{ x: number; y: number; across: boolean | null } | null>(null);
  /** How far the track is dragged from its resting place, in px (null when not being swiped). */
  const [drag, setDrag] = useState<number | null>(null);

  const onTouchStart = (e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, across: null };
  };
  const onTouchMove = (e: TouchEvent) => {
    const start = touch.current;
    if (!start) return;
    const dx = e.touches[0].clientX - start.x;
    const dy = e.touches[0].clientY - start.y;
    if (start.across === null) {
      if (Math.abs(dx) < SWIPE_LOCK && Math.abs(dy) < SWIPE_LOCK) return;
      start.across = Math.abs(dx) > Math.abs(dy);
    }
    if (!start.across) return;
    // Past the first or last card there is nothing to show, so the track gives only a third of the way.
    const pastEnd = (active === 0 && dx > 0) || (active === last && dx < 0);
    setDrag(pastEnd ? dx / 3 : dx);
  };
  const onTouchEnd = () => {
    const start = touch.current;
    touch.current = null;
    if (!start?.across || drag === null) return setDrag(null);
    if (drag <= -SWIPE_DISTANCE) setActive((i) => Math.min(last, i + 1));
    else if (drag >= SWIPE_DISTANCE) setActive((i) => Math.max(0, i - 1));
    setDrag(null);
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      className="@container relative mx-(--frame-inset)"
    >
      {/* `pan-y`: the browser scrolls the page for a touch moving down it and leaves one moving across to the swipe. */}
      <div
        className="touch-pan-y overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        <div
          className="flex items-center transition-transform duration-500 ease-out [--half:42.5cqw] [--step:85cqw] motion-reduce:transition-none md:[--half:272px] md:[--step:544px] lg:gap-16 lg:[--half:422px] lg:[--step:908px]"
          style={
            {
              "--i": active,
              transform: `translateX(calc(50cqw - var(--half) - var(--i) * var(--step) + ${drag ?? 0}px))`,
              // Following the finger, the track moves with it at once; let go, it eases to its card.
              ...(drag !== null && { transitionDuration: "0s" }),
            } as CSSProperties
          }
        >
          {testimonials.map((t, i) => (
            <TestimonialSlide key={i} testimonial={t} active={i === active} index={i} total={testimonials.length} largeName={largeName} />
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
