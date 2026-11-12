"use client";

import { type ReactNode, useEffect, useRef } from "react";

/**
 * A marquee track: holds two identical copies of its content side by side and slides left by one copy's width,
 * linearly, looping forever. Driven by the Web Animations API, so it starts as soon as the page hydrates and doesn't
 * depend on a stylesheet keyframe. `duration` is one full pass, in ms.
 */
export function MarqueeTrack({ duration, children }: { duration: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = ref.current;
    if (!track) return;
    const animation = track.animate([{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }], {
      duration,
      iterations: Infinity,
      easing: "linear",
    });
    return () => animation.cancel();
  }, [duration]);
  return (
    <div ref={ref} className="flex w-max will-change-transform">
      {children}
    </div>
  );
}
