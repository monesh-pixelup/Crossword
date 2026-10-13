"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * A to-do card from the How it works checklist (the doc's design note: “Checklist style, To-do
 * cards”). Its square box is ticked once the card is well into view: the box turns maroon (the
 * web kit's selected checkbox) and the gold tick draws in. Reduced motion skips the drawing; the
 * box is simply ticked.
 */
export function ChecklistCard({ index, title, children }: { index: number; title: string; children: ReactNode }) {
  const ref = useRef<HTMLLIElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setDone(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -35% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <li ref={ref} className="relative flex gap-5 bg-cream p-6 shadow-[inset_0_0_0_0.5px_var(--color-engraved)] md:gap-6 md:p-8">
      <span
        aria-hidden
        className={cn(
          "mt-1 flex size-5 shrink-0 items-center justify-center transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          done ? "bg-maroon" : "shadow-[inset_0_0_0_1px_var(--color-engraved)]",
        )}
      >
        <svg viewBox="0 0 15 12.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-3 text-gold">
          <path
            d="M1 7 5.5 11 14 1.5"
            pathLength={1}
            className="transition-[stroke-dashoffset] delay-150 duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [stroke-dasharray:1] motion-reduce:transition-none"
            style={{ strokeDashoffset: done ? 0 : 1 }}
          />
        </svg>
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <p className="font-sans text-[11px] leading-[1.3] tracking-[0.06em] text-label-olive uppercase">Step {index + 1}</p>
        <h3 className="font-serif text-[24px] leading-[1.15] tracking-[-0.04em] text-ink">{title}</h3>
        {children}
      </div>
      <span className="sr-only">{done ? "Done" : ""}</span>
    </li>
  );
}
