import { useLayoutEffect, useRef } from "react";

// Tap feedback for a scripted take: on each `tap` bump, a ring spreads
// and fades from the centre of `target` (a selector inside the ring's
// offset parent). Transform/opacity only, via WAAPI.
export function TapRing({ target, tap }: { target: string; tap: number }) {
  const ringRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ring = ringRef.current;
    const host = ring?.offsetParent as HTMLElement | null;
    const el = host?.querySelector<HTMLElement>(target);
    if (!tap || !ring || !host || !el) return;
    const box = host.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    // Back to the host's own CSS px: the site zooms each visual to fit its
    // panel, and getBoundingClientRect reports zoomed values. 1 (a no-op)
    // at the visual's drawn size.
    const zoom = host.offsetWidth ? box.width / host.offsetWidth : 1;
    const at = `translate(${(r.left - box.left + r.width / 2) / zoom}px, ${(r.top - box.top + r.height / 2) / zoom}px) translate(-50%, -50%)`;
    const animation = ring.animate(
      [
        { transform: `${at} scale(0.4)`, opacity: 0.6 },
        { transform: `${at} scale(1)`, opacity: 0 },
      ],
      { duration: 420, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
    );
    return () => animation.cancel();
  }, [tap, target]);

  return <span ref={ringRef} className="askm-tap" aria-hidden="true" />;
}
