import { useEffect } from "react";
import type { Timeline } from "./useChatTimeline";

/** How long a finished scene holds before it replays. */
const HOLD_MS = 3000;

/**
 * Site: makes a scene play on a loop. Rendered inside a ChatMotionScene, it waits for the script to play out, holds,
 * then calls `onLoop` (the scene's owner bumps a key, so it starts again from the top). Nothing loops with reduced motion.
 */
export function LoopWhenDone({ t, onLoop }: { t: Timeline; onLoop: () => void }) {
  useEffect(() => {
    if (!t.done || t.reducedMotion) return;
    const id = window.setTimeout(onLoop, HOLD_MS);
    return () => window.clearTimeout(id);
  }, [t.done, t.reducedMotion, onLoop]);
  return null;
}
