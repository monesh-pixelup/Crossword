"use client";

import { useEffect, useState } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";

/** How far below the top of the screen a part counts as the one being read (under the 72.5px header). */
const READ_LINE = 140;

/**
 * A post's Index (after the Limelight post's sidebar, Figma 1655:2573, in the site's design): a sand panel with an
 * engraved line, the "Index" eyebrow over one row per part of the post (Geist 14/22, between engraved hairlines). The
 * part being read is in ink with a maroon rule along its left; the rest are muted. Each row jumps to its part.
 */
export function PostIndex({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      let current = 0;
      items.forEach(({ id }, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= READ_LINE) current = i;
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  return (
    <nav aria-label="Index" className="flex w-full flex-col gap-4 border-[0.5px] border-engraved bg-sand py-6">
      <div className="px-6">
        <Eyebrow surface="sand">Index</Eyebrow>
      </div>
      <ol className="flex flex-col pr-4 pl-6">
        {items.map(({ id, title }, i) => {
          const on = i === active;
          return (
            <li key={id} className={cn(i > 0 && "border-t-[0.5px] border-engraved")}>
              <a
                href={`#${id}`}
                aria-current={on ? "location" : undefined}
                className={cn(
                  "relative block py-2 pl-3 font-sans text-[14px] leading-[22px] tracking-[-0.28px] transition-colors duration-200 [word-break:break-word] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon",
                  on ? "text-ink" : "text-ink-muted hover:text-ink-soft",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-y-2 left-0 w-0.5 bg-maroon transition-opacity duration-200",
                    on ? "opacity-100" : "opacity-0",
                  )}
                />
                {title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
