"use client";

import { useEffect, useRef, useState } from "react";

/** Notch radius of the outer frame. */
const NOTCH = 50;
/** The inner hairline rectangle's insets from the outer frame (Figma). */
const INSET = { left: 14.55, top: 13.04, right: 14.69, bottom: 16.91 };
/** Lines are 0.5px, drawn inside their box as in Figma: their centres sit this far in. */
const HALF = 0.25;

/** Outer frame: a rectangle with a quarter-circle notch cut from each corner. */
function outerPath(w: number, h: number) {
  const [l, t, r, b] = [HALF, HALF, w - HALF, h - HALF];
  const n = NOTCH;
  return [
    `M${l + n} ${t}H${r - n}`,
    `A${n} ${n} 0 0 0 ${r} ${t + n}V${b - n}`,
    `A${n} ${n} 0 0 0 ${r - n} ${b}H${l + n}`,
    `A${n} ${n} 0 0 0 ${l} ${b - n}V${t + n}`,
    `A${n} ${n} 0 0 0 ${l + n} ${t}Z`,
  ].join("");
}

/** Inner hairline rectangle, with square corners. */
function innerPath(w: number, h: number) {
  const l = INSET.left + HALF;
  const t = INSET.top + HALF;
  const r = w - INSET.right - HALF;
  const b = h - INSET.bottom - HALF;
  return `M${l} ${t}H${r}V${b}H${l}Z`;
}

/**
 * The footer's gilt frame: a notched outline with a square hairline rectangle
 * inside it, inset from the footer's edges. Drawn as one SVG at the frame's
 * measured size so every line closes cleanly at any width.
 */
export function FooterFrame() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute top-[33.28px] right-[18.25px] bottom-[35.4px] left-[18.26px]"
    >
      {size && (
        <svg
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
          fill="none"
          className="absolute inset-0 overflow-visible"
        >
          <g stroke="#FFB657" strokeOpacity=".36" strokeWidth=".5">
            <path d={outerPath(size.w, size.h)} />
            <path d={innerPath(size.w, size.h)} />
          </g>
        </svg>
      )}
    </div>
  );
}
