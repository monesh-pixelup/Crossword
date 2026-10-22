// Reveals `text` progressively in small steps with a touch of randomized
// jitter on each tick's delay, instead of a perfectly uniform interval —
// a dead-even mechanical tick reads as robotic; real typing (human or
// streamed) has slight variance. Returns a cancel function.
export function revealText(
  text: string,
  {
    msPerStep,
    jitterMs = msPerStep * 0.3,
    chunk = 1,
    onTick,
    onDone,
  }: {
    msPerStep: number;
    jitterMs?: number;
    chunk?: number;
    onTick: (revealed: string) => void;
    onDone: () => void;
  },
): () => void {
  let cancelled = false;
  let i = 0;
  let timeoutId: number;

  const step = () => {
    if (cancelled) return;
    i = Math.min(text.length, i + chunk);
    onTick(text.slice(0, i));
    if (i >= text.length) {
      onDone();
      return;
    }
    const jitter = (Math.random() * 2 - 1) * jitterMs;
    timeoutId = window.setTimeout(step, Math.max(8, msPerStep + jitter));
  };

  timeoutId = window.setTimeout(step, msPerStep);
  return () => {
    cancelled = true;
    window.clearTimeout(timeoutId);
  };
}
