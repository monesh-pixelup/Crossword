import { useLayoutEffect, useRef } from "react";

// FLIP for a bottom-anchored chat run: a new message makes the run jump up
// by its height, so offset it back down by that growth and transition the
// offset to 0 on transform alone (compositor-only, no per-frame layout).
// `arrivals` is how many messages are on screen; `runKey` restarts it.
export function useRunFlip(arrivals: number, runKey: number) {
  const runRef = useRef<HTMLDivElement>(null);
  const lastHeight = useRef(0);
  useLayoutEffect(() => {
    const run = runRef.current;
    if (!run?.parentElement) return;
    const h = run.offsetHeight;
    const grew = h - lastHeight.current;
    lastHeight.current = h;
    const anchoredBottom = getComputedStyle(run.parentElement).justifyContent === "flex-end";
    if (grew <= 0 || arrivals === 0 || !anchoredBottom || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    run.style.transition = "none";
    run.style.transform = `translateY(${grew}px)`;
    void run.offsetHeight;
    run.style.transition = "";
    run.style.transform = "";
  }, [arrivals, runKey]);
  return runRef;
}
