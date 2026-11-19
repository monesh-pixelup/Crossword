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

/** One layer of a SwapFade: fades in over the last when it arrives after the first; when replaced, it stays put underneath until covered, then goes. */
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

  // Replaced: it stays fully drawn underneath while the new layer fades in over it, and goes once it's covered. Fading
  // both at once let what sits behind them show through mid-fade (the window or phone the two visuals share washing
  // out over the panel); this way what's the same in both never dims, and only what changes crossfades.
  // Where the two don't overlap exactly, what's left of the old one then eases away (0.3s) rather than vanishing.
  useEffect(() => {
    const el = ref.current;
    if (!leaving || !el) return;
    const fade = el.animate([{ opacity: 1 }, { opacity: 1, offset: reducedMotion ? 0 : 0.8 }, { opacity: 0 }], {
      duration: reducedMotion ? CROSSFADE.reducedMs : CROSSFADE.inDelayMs + CROSSFADE.inMs + 300,
      easing: "linear",
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
 * For a panel that shows one thing at a time and swaps it outright (a tab's visual, keyed to replay): the incoming
 * content fades in over the outgoing (1.1s, a beat in), which stays fully drawn underneath until it's covered, instead
 * of cutting. So what both share (a chat window, a phone, a frame) holds steady and only what changes crossfades.
 * `swapKey` names what's shown. Fills its (positioned) parent.
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
