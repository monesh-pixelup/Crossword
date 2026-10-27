"use client";

import { useEffect, useRef, useState } from "react";
import { type StampGlyph, stampSvgs } from "./stamp-svgs";

/** A hover replays the stamp at most this often, so sweeping the pointer across it doesn't restart it mid-press. */
const HOVER_REPLAY_MS = 2200;

/**
 * The divider band's animated stamp (see stampSvgs), filling the badge's 74 × 74.95 box: its 78px SVG sits 2px out
 * on every side (58.5px and 1.5px at the band's 0.75x below 768px). The SVG is only added once half of the badge is
 * on screen, so its press-in plays as the band comes into view, then runs into its idle loop; a mouse hover (at most
 * every 2.2s) or a tap replays it from the start, as the Stamp Motion handoff does by swapping in a fresh copy.
 */
export function AnimatedStamp({ glyph }: { glyph: StampGlyph }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  // Bumped to remount the SVG, which restarts every animation in it.
  const [run, setRun] = useState(0);
  const lastHover = useRef(0);

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

  const replay = () => setRun((r) => r + 1);

  return (
    <span
      ref={ref}
      onClick={replay}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse" || Date.now() - lastHover.current < HOVER_REPLAY_MS) return;
        lastHover.current = Date.now();
        replay();
      }}
      className="pointer-events-auto absolute -inset-[2px] cursor-pointer max-md:-inset-[1.5px] [&_svg]:block [&_svg]:size-full [&_svg]:overflow-visible"
    >
      {inView && <span key={run} className="contents" dangerouslySetInnerHTML={{ __html: stampSvgs[glyph] }} />}
    </span>
  );
}
