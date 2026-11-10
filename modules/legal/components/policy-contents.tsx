"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** How far below the top of the screen a section counts as the one being read (under the 72.5px header). */
const READ_LINE = 140;

/**
 * The policy's sidebar (Figma 1684:11428): the date and a line of Geist Light over the contents box (#fbf1db, a #ccc
 * line), one row per section: its number (Crimson Light 10) and title (Crimson Light 16) at half strength, between
 * black/5 hairlines. The section being read is full strength with a maroon rule under it. From 992px it stays in view
 * as the policy scrolls past.
 */
export function PolicyContents({ updated, summary, sections }: { updated: string; summary: string; sections: string[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      let current = 0;
      sections.forEach((_, i) => {
        const el = document.getElementById(`section-${String(i + 1).padStart(2, "0")}`);
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
  }, [sections]);

  return (
    <div className="flex w-full flex-col gap-9">
      <div className="flex flex-col gap-3 font-sans text-base leading-6 font-light tracking-[-0.32px] [word-break:break-word]">
        <p className="text-black">{updated}</p>
        <p className="text-black/60">{summary}</p>
      </div>

      <nav aria-label="Contents" className="flex flex-col gap-1 border border-[#ccc] bg-[#fbf1db] px-6 pt-4 pb-6">
        {sections.map((title, i) => {
          const on = i === active;
          const n = String(i + 1).padStart(2, "0");
          return (
            <a
              key={title}
              href={`#section-${n}`}
              aria-current={on ? "location" : undefined}
              className={cn(
                "flex flex-col items-start border-b pr-2.5 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon",
                on ? "border-black/9" : "border-black/5",
              )}
            >
              <span
                className={cn(
                  "flex w-[237px] max-w-full items-end gap-2 border-b py-2 font-serif leading-none font-light transition-colors duration-200 [word-break:break-word]",
                  on ? "border-maroon text-[#010101]" : "border-transparent text-[rgba(1,1,1,0.5)] hover:text-[rgba(1,1,1,0.75)]",
                )}
              >
                <span className="shrink-0 text-[10px] tracking-[-0.4px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">{n}.</span>
                <span className="text-base tracking-[-0.64px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">{title}</span>
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
