"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * A gold accent on a page rail. It grows from the top, 0 → 100% of its
 * height, as the line itself scrolls into view (like the hero's, which grow
 * on load); with reduced motion it is simply there. `className` places and
 * sizes it; without `src` it is a plain 1px gold line filling that box.
 */
export function RailAccent({ src, className }: { src?: StaticImageData; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // The box keeps its full height (only the line inside scales), so it can be watched directly.
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const grow = cn(
    "block origin-top transition-[scale] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:scale-y-100 motion-reduce:transition-none",
    shown ? "scale-y-100" : "scale-y-0",
  );

  return (
    <span ref={ref} aria-hidden className={cn("pointer-events-none", className)}>
      {src ? (
        <Image src={src} alt="" className={grow} />
      ) : (
        <span className={cn(grow, "size-full bg-[#e0be60]")} />
      )}
    </span>
  );
}
