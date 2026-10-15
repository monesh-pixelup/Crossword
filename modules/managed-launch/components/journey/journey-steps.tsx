"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const ROLL = 465; // ms for the steps to roll to the chosen one (as the home wheel)
const DROP = 750; // ms for a stamp to fall, land and settle
const LAND = 0.72; // point of DROP where the stamp touches the pile
const PILE = 3; // stamps kept on the pile at rest
const ROTATIONS = [0, 17, 7, 24, -6, 12]; // degrees per step, added to the art's own tilt
const EASE_DROP = "cubic-bezier(.215, .61, .355, 1)";
const EASE_PRESS = "cubic-bezier(.25, .46, .45, .94)";
const SHADOW_REST = "drop-shadow(0 2px 4px rgba(24, 8, 36, 0.35))";
const SHADOW_AIR = "drop-shadow(0 20px 14px rgba(24, 8, 36, 0.3))";

/** Where the active step's middle sits inside the steps window: level with the panel's centre. */
const CENTRE = 212.6;

/**
 * The Journey row's click animation, after the home page's Managed launch wheel: clicking a step
 * makes it the active one (forest, Crimson Light), rolls the list so it sits level with the
 * panel's centre (steps can wrap to two lines, so each is centred by its own height), fades the
 * rest by distance, and drops that step's stamp onto the panel, keeping the last three. With
 * reduced motion nothing moves: the step swaps and its stamp appears in place.
 */
export function JourneySteps({
  steps,
  initial,
  stamp,
  panel,
}: {
  steps: string[];
  initial: number;
  stamp: StaticImageData;
  panel: React.ReactNode;
}) {
  const [active, setActive] = useState(initial);
  const [y, setY] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const pileRef = useRef<HTMLDivElement>(null);
  const templateRef = useRef<HTMLImageElement>(null);

  // Roll so the active step's middle lands on CENTRE.
  useLayoutEffect(() => {
    const measure = () => {
      const item = listRef.current?.children[active] as HTMLElement | undefined;
      if (item) setY(CENTRE - (item.offsetTop + item.offsetHeight / 2));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  // The still stamp stays until the first click; drops then go onto the pile above it.
  useEffect(() => () => pileRef.current?.replaceChildren(), []);

  function drop(step: number) {
    const pile = pileRef.current;
    const template = templateRef.current;
    if (!pile || !template) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = template.cloneNode(false) as HTMLImageElement;
    // The clone keeps its Tailwind centring (the separate translate property), so transforms only rotate and move.
    const rest = `rotate(${ROTATIONS[step % ROTATIONS.length]}deg)`;
    el.style.visibility = "visible";
    el.style.transform = rest;
    pile.appendChild(el);
    // The still stamp gives way to the pile once the first drop lands.
    const hideStill = () => (template.style.visibility = "hidden");

    const extra = Array.from(pile.children).slice(0, Math.max(0, pile.children.length - PILE));
    const trim = () => extra.forEach((old) => old.remove());
    if (reduce) {
      hideStill();
      return trim();
    }

    const dist = pile.clientHeight / 2 + el.offsetHeight * 1.2;
    const tilt = `rotate(${ROTATIONS[step % ROTATIONS.length] + (step % 2 ? -12 : 12)}deg)`;
    el.animate(
      [
        { transform: `translateY(${-dist}px) ${tilt} scale(1.16)`, filter: SHADOW_AIR, easing: EASE_DROP },
        { transform: `${rest} scale(1)`, filter: SHADOW_REST, offset: LAND, easing: EASE_PRESS },
        { transform: `${rest} scale(0.97)`, filter: SHADOW_REST, offset: LAND + (1 - LAND) / 2, easing: EASE_PRESS },
        { transform: `${rest} scale(1)`, filter: SHADOW_REST },
      ],
      { duration: DROP },
    );
    setTimeout(() => {
      hideStill();
      extra.forEach((old) => old.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, easing: "ease" }).finished.then(() => old.remove()));
    }, DROP * LAND);
  }

  const choose = (i: number) => {
    if (i === active) return;
    setActive(i);
    drop(i);
  };

  return (
    <>
      <div className="relative h-[310px] w-[316px] shrink-0 overflow-clip bg-aubergine lg:absolute lg:top-[98.59px] lg:left-1/2 lg:-translate-x-1/2">
        {panel}
        <Image
          ref={templateRef}
          src={stamp}
          alt=""
          sizes="128px"
          className="absolute top-1/2 left-1/2 h-auto w-[127.3px] max-w-none -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_2px_4px_rgba(24,8,36,0.35)]"
        />
        <div ref={pileRef} aria-hidden className="absolute inset-0" />
      </div>

      {/* The steps window: the list rolls inside it, fading out at the top and bottom edges. */}
      <div className="relative h-[425px] w-full max-w-[413px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0,#000_18%,#000_82%,transparent_100%)] lg:absolute lg:top-[40.97px] lg:left-[867px]">
        <ol
          ref={listRef}
          aria-label="How a launch grows"
          className="flex flex-col gap-[5.848px] font-serif text-[40px] leading-[1.1] transition-transform duration-[465ms] ease-[cubic-bezier(.645,.045,.355,1)] motion-reduce:transition-none"
          style={{ transform: `translateY(${y}px)`, transitionDuration: `${ROLL}ms` }}
        >
          {steps.map((step, i) => {
            const d = Math.abs(i - active);
            return (
              <li key={step}>
                <button
                  type="button"
                  aria-current={d === 0 ? "step" : undefined}
                  onClick={() => choose(i)}
                  className={cn(
                    "cursor-pointer text-left whitespace-pre-line transition-[color,opacity,letter-spacing] duration-[330ms] ease-[ease] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon motion-reduce:transition-none",
                    d === 0
                      ? "cursor-default font-light tracking-[-1.6px] text-[#002915]"
                      : cn("font-extralight tracking-[-2px] text-ink hover:opacity-80", d === 1 ? "opacity-55" : "opacity-25"),
                  )}
                >
                  {step}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
