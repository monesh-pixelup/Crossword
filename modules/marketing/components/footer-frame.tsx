"use client";

import { useEffect, useRef, useState } from "react";

/** The inner hairline rectangle's insets from the outer frame (Figma). */
const INSET = { left: 14.7969, top: 13.2891, right: 14.9431, bottom: 17.1539 };

/**
 * Outer frame: a rectangle with a concave notch cut from each corner, each a little different
 * (Figma's "Subtract"). The corner curves are Figma's own, held at their corners while the
 * straight runs stretch with the footer.
 */
function outerPath(w: number, h: number) {
  return [
    // Top edge, then the top-right notch.
    `M${w - 44.83} 0C${w - 40.96} 22.5559 ${w - 22.63} 40.0048 ${w} 41.9443`,
    // Right edge, then the bottom-right notch.
    `V${h - 52.086}C${w - 25.99} ${h - 50.381} ${w - 46.56} ${h - 28.233} ${w - 46.56} ${h - 1.161}`,
    `C${w - 46.56} ${h - 0.773} ${w - 46.56} ${h - 0.386} ${w - 46.55} ${h}`,
    // Bottom edge, then the bottom-left notch.
    `H51.5615C51.6263 ${h - 1.066} 51.6592 ${h - 2.14} 51.6592 ${h - 3.222}`,
    `C51.6591 ${h - 31.405} 29.3694 ${h - 54.252} 1.87305 ${h - 54.252}`,
    `C1.24602 ${h - 54.252} 0.621407 ${h - 54.241} 0 ${h - 54.217}`,
    // Left edge, then the top-left notch.
    "V49.2178C0.0148762 49.2178 0.0300427 49.2188 0.0449219 49.2188C26.9497 49.2186 48.8691 27.3443 49.7998 0Z",
  ].join("");
}

/**
 * The footer's gilt frame: the notched outline (a 1px stroke clipped to the shape, so 0.5px shows
 * inside, as Figma draws it) with a square hairline rectangle inside it. Drawn as one SVG at the
 * frame's measured size so every line closes cleanly at any width. Its sides line up with the CTA
 * envelope's: 25px in (13px below 768px, 9px below 480px) from the 2000px-capped page, centred in
 * the full-width footer. Below 960px the footer has no frame.
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

  const outer = size && outerPath(size.w, size.h);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute top-[36.97px] bottom-[31.71px] inset-x-[max(25px,calc((100%_-_2000px)/2_+_25px))] max-md:inset-x-[13px] max-[480px]:inset-x-[9px] max-[960px]:hidden"
    >
      {size && outer && (
        <svg
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
          fill="none"
          className="absolute inset-0 overflow-visible"
        >
          <mask id="footer-frame-mask" fill="white">
            <path d={outer} />
          </mask>
          <g stroke="#FFB657" strokeOpacity=".36">
            <rect
              x={INSET.left}
              y={INSET.top}
              width={size.w - INSET.left - INSET.right}
              height={size.h - INSET.top - INSET.bottom}
              strokeWidth=".5"
            />
            <path d={outer} mask="url(#footer-frame-mask)" />
          </g>
        </svg>
      )}
    </div>
  );
}
