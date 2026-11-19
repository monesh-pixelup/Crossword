"use client";

import { type CSSProperties, type ReactNode, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * The site's crossfade between tab panels (first tuned on Sell's Product discovery): the chosen panel eases in over
 * 1.1s, a beat (0.15s) after the one before starts easing out over 0.8s. Opacity only, no blur, so a panel stays crisp
 * as it fades; with `prefers-reduced-motion`, a quick 0.2s fade. Set inline (or through the Web Animations API), so it
 * never waits on a stylesheet.
 */
export const CROSSFADE = {
  inMs: 1100,
  inDelayMs: 150,
  inEasing: "cubic-bezier(0.33, 0, 0.2, 1)",
  outMs: 800,
  outEasing: "cubic-bezier(0.45, 0, 0.55, 1)",
  reducedMs: 200,
} as const;

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const query = window.matchMedia(reducedQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/** Whether the viewer asks for reduced motion (false on the server and until known). */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(reducedQuery).matches,
    () => false,
  );
}

/**
 * The inline style for one of several panels sharing a cell, all mounted: the shown one (`active`) at full opacity,
 * the rest hidden, each easing to its state as the choice changes. Pair it with `inert` on the hidden ones.
 */
export function crossfadeStyle(active: boolean, reducedMotion: boolean): CSSProperties {
  if (reducedMotion) {
    return { opacity: active ? 1 : 0, transition: `opacity ${CROSSFADE.reducedMs}ms linear`, pointerEvents: active ? undefined : "none" };
  }
  return active
    ? { opacity: 1, transition: `opacity ${CROSSFADE.inMs}ms ${CROSSFADE.inEasing} ${CROSSFADE.inDelayMs}ms` }
    : { opacity: 0, pointerEvents: "none", transition: `opacity ${CROSSFADE.outMs}ms ${CROSSFADE.outEasing}` };
}

/** One layer of a SwapFade: fades in when it arrives after the first, fades out (then goes) when it's replaced. */
function Layer({ entering, leaving, onGone, children }: { entering: boolean; leaving: boolean; onGone: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const gone = useRef(onGone);
  useEffect(() => {
    gone.current = onGone;
  });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!entering || !el) return;
    const fade = el.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      reducedMotion
        ? { duration: CROSSFADE.reducedMs, easing: "linear", fill: "backwards" }
        : { duration: CROSSFADE.inMs, delay: CROSSFADE.inDelayMs, easing: CROSSFADE.inEasing, fill: "backwards" },
    );
    return () => fade.cancel();
    // Only on arrival.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!leaving || !el) return;
    const fade = el.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: reducedMotion ? CROSSFADE.reducedMs : CROSSFADE.outMs,
      easing: reducedMotion ? "linear" : CROSSFADE.outEasing,
      fill: "forwards",
    });
    fade.onfinish = () => gone.current();
    return () => fade.cancel();
  }, [leaving, reducedMotion]);

  return (
    <div ref={ref} inert={leaving} className="absolute inset-0">
      {children}
    </div>
  );
}

/**
 * For a panel that shows one thing at a time and swaps it outright (a tab's visual, keyed to replay): the outgoing
 * content fades out as the incoming fades in, with the site's crossfade, instead of cutting. `swapKey` names what's
 * shown; when it changes, the last content stays drawn, fading, until it's gone. Fills its (positioned) parent.
 */
export function SwapFade({ swapKey, children }: { swapKey: string | number; children: ReactNode }) {
  const [layers, setLayers] = useState<{ key: string | number; node: ReactNode; entering: boolean }[]>([
    { key: swapKey, node: children, entering: false },
  ]);
  const current = layers[layers.length - 1];
  // A new key: keep what was shown (frozen as it was) and add the new content on top.
  if (current.key !== swapKey) {
    setLayers([...layers.slice(-1), { key: swapKey, node: children, entering: true }]);
  }

  return (
    <>
      {layers.map((layer, i) => {
        const isCurrent = i === layers.length - 1 && layer.key === swapKey;
        return (
          <Layer
            key={layer.key}
            entering={layer.entering}
            leaving={!isCurrent}
            onGone={() => setLayers((all) => all.filter((l) => l.key !== layer.key))}
          >
            {isCurrent ? children : layer.node}
          </Layer>
        );
      })}
    </>
  );
}

/**
 * One of several panels sharing a cell, all mounted, crossfading as the choice changes (see crossfadeStyle): the shown
 * one (`active`) eases in, the rest ease out and are inert.
 */
export function CrossfadePanel({
  active,
  className,
  style,
  children,
}: {
  active: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <div inert={!active} className={className} style={{ ...style, ...crossfadeStyle(active, reducedMotion) }}>
      {children}
    </div>
  );
}
