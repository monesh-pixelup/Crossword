"use client";

import Image from "next/image";
import { type CSSProperties, type TouchEvent, useEffect, useRef, useState } from "react";
import arrowNext from "../../assets/testimonials/arrow-next.svg";
import arrowPrev from "../../assets/testimonials/arrow-prev.svg";
import { initialTestimonial, type Testimonial, testimonials as defaultTestimonials } from "../../config/testimonials";
import { TestimonialSlide } from "./testimonial-slide";

/** How far a swipe must travel (px) to change the testimonial. */
const SWIPE_DISTANCE = 40;
/** How far a touch moves (px) before it counts as a swipe across or a scroll down the page. */
const SWIPE_LOCK = 8;

/** How long a testimonial stays before the next one takes its place on its own (ms). */
const AUTOPLAY_MS = 6000;
/** Slides drawn either side of the centre one: its neighbours, and the next ones in, ready as the track moves. */
const SIDE = 2;

const wrapIndex = (i: number, n: number) => ((i % n) + n) % n;

const arrowButton =
  "pointer-events-auto relative h-[32.133px] w-[38.357px] cursor-pointer transition-opacity disabled:cursor-default disabled:opacity-40";

/**
 * Centred testimonial with faded neighbours either side, spanning the page rails. The track
 * slides so the active slide's centre sits at the window's centre: a slide step of 908px
 * (844px card + 64px gap) from 992px, 544px below, and 85% of the window on phones.
 * The arrows sit on the active card's edges, and under the card on phones.
 *
 * On a touch screen the cards can be swiped too: the track follows the finger, and letting go 40px or more across
 * moves to the next or previous one. A touch that starts down the page scrolls it as usual.
 *
 * It loops: after the last testimonial comes the first again, and before the first the last, in either direction
 * without end. The position (`at`) just counts on, and the slides drawn are a window around it (two either side),
 * each showing the testimonial its place wraps to; the track's left margin stands in for the slides before the
 * window, so sliding on and redrawing the window never moves what's on screen. With a single testimonial there is
 * nothing to loop to: it sits alone, the arrows off.
 *
 * It also moves on by itself every 6 seconds, while it's on screen and the tab is showing. It waits while the pointer
 * is over it, a control in it has keyboard focus or a finger is on it (so a quote can be read to the end), counts
 * afresh after any move, and doesn't run at all for visitors who ask for reduced motion.
 */
export function TestimonialCarousel({
  testimonials = defaultTestimonials,
  largeName = false,
}: {
  testimonials?: Testimonial[];
  /** The author's name at 38px, as on the home page (28px elsewhere). */
  largeName?: boolean;
}) {
  const count = testimonials.length;
  const loops = count > 1;
  // The position, counting on without end in either direction; the testimonial showing is the one it wraps to.
  const [at, setAt] = useState(initialTestimonial);
  const step = (by: number) => loops && setAt((i) => i + by);
  const root = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  // Whether it may play by itself: on screen, in a showing tab, and motion not turned down.
  const [playable, setPlayable] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el || !loops) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    const update = () => setPlayable(inView && document.visibilityState === "visible" && !reduced.matches);
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        update();
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    document.addEventListener("visibilitychange", update);
    reduced.addEventListener("change", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      reduced.removeEventListener("change", update);
    };
  }, [loops]);

  const playing = playable && !hovered && !focused && !touching;
  // Restarted by every move (`at`), so a testimonial chosen by hand gets its full turn too.
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setAt((i) => i + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [playing, at]);

  // The swipe under way: where it started and whether it has turned out to run across (true) or down the page (false).
  const touch = useRef<{ x: number; y: number; across: boolean | null } | null>(null);
  /** How far the track is dragged from its resting place, in px (null when not being swiped). */
  const [drag, setDrag] = useState<number | null>(null);

  const onTouchStart = (e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, across: null };
    setTouching(true);
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
    // A single testimonial has nothing either side, so the track gives only a third of the way.
    setDrag(loops ? dx : dx / 3);
  };
  const onTouchEnd = () => {
    const start = touch.current;
    touch.current = null;
    setTouching(false);
    if (!start?.across || drag === null) return setDrag(null);
    if (drag <= -SWIPE_DISTANCE) step(1);
    else if (drag >= SWIPE_DISTANCE) step(-1);
    setDrag(null);
  };

  // The slides drawn: the centre one and SIDE either side (just the one when there's nothing to loop to).
  const first = loops ? at - SIDE : at;
  const places = Array.from({ length: loops ? SIDE * 2 + 1 : 1 }, (_, k) => first + k);

  return (
    <div
      ref={root}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={(e) => setFocused(e.target.matches(":focus-visible"))}
      onBlur={() => setFocused(false)}
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
              "--i": at,
              // The slides before the window, as space: the window can move along without the track shifting.
              marginLeft: `calc(${first} * var(--step))`,
              transform: `translateX(calc(50cqw - var(--half) - var(--i) * var(--step) + ${drag ?? 0}px))`,
              // Following the finger, the track moves with it at once; let go, it eases to its card.
              ...(drag !== null && { transitionDuration: "0s" }),
            } as CSSProperties
          }
        >
          {places.map((place) => {
            const i = wrapIndex(place, count);
            // Keyed by its place, so a slide stays the same element as the window moves along under it.
            return <TestimonialSlide key={place} testimonial={testimonials[i]} active={place === at} index={i} total={count} largeName={largeName} />;
          })}
        </div>
      </div>

      <div className="pointer-events-none mt-6 flex items-center justify-center gap-3 md:absolute md:top-1/2 md:left-1/2 md:mt-0 md:w-[534px] md:-translate-x-1/2 md:-translate-y-1/2 md:justify-between lg:w-[882px]">
        <button
          type="button"
          aria-label="Previous testimonial"
          disabled={!loops}
          onClick={() => step(-1)}
          className={arrowButton}
        >
          {/* Figma mirrors this artwork horizontally. */}
          <Image src={arrowPrev} alt="" className="absolute top-[-6px] left-[-8.001px] max-w-none -scale-x-100" />
        </button>
        <button
          type="button"
          aria-label="Next testimonial"
          disabled={!loops}
          onClick={() => step(1)}
          className={arrowButton}
        >
          <Image src={arrowNext} alt="" className="absolute top-[-6px] left-[-8.001px] max-w-none" />
        </button>
      </div>
    </div>
  );
}
