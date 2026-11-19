"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { type StampGlyph, stampSvgs } from "./stamp-svgs";

/**
 * The divider band's animated stamp (see stampSvgs), filling the badge's 74 × 74.95 box: its 78px SVG sits 2px out
 * on every side (58.5px and 1.5px at the band's 0.75x below 768px). The stamp is always drawn, its animations held
 * until half of the badge is on screen, so its glyph's entrance plays as the band comes into view, then runs into its
 * idle loop. It's decorative: hovering or tapping it does nothing (the band lets the pointer pass through).
 */
export function AnimatedStamp({ glyph }: { glyph: StampGlyph }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={cn(
        "absolute -inset-[2px] max-md:-inset-[1.5px] [&_svg]:block [&_svg]:size-full [&_svg]:overflow-visible",
        // Held at their start (the glyph not yet in) until the badge is on screen; important, as the SVG's own
        // `animation` shorthands would otherwise set them running.
        !inView && "[&_*]:[animation-play-state:paused!important]",
      )}
    >
      <span className="contents" dangerouslySetInnerHTML={{ __html: stampSvgs[glyph] }} />
    </span>
  );
}
