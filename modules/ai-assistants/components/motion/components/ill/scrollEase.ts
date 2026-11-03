// Same cubic-bezier(0.32, 0.72, 0, 1) curve used everywhere else in this
// scenario, evaluated in JS — so the auto-scroll moves with the same
// "voice" as every other transition instead of the browser's own native
// smooth-scroll easing/duration, which doesn't match.
function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  const ax = 3 * p1x - 3 * p2x + 1;
  const bx = 3 * p2x - 6 * p1x;
  const cx = 3 * p1x;
  const ay = 3 * p1y - 3 * p2y + 1;
  const by = 3 * p2y - 6 * p1y;
  const cy = 3 * p1y;

  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const sampleDerivativeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;

  const solveT = (x: number) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const xEst = sampleX(t) - x;
      const derivative = sampleDerivativeX(t);
      if (Math.abs(derivative) < 1e-6) break;
      t -= xEst / derivative;
    }
    return t;
  };

  return (x: number) => sampleY(solveT(x));
}

const drawerEase = cubicBezier(0.32, 0.72, 0, 1);

// Returns a cancel function so a caller that can re-trigger the scroll
// mid-flight (a ResizeObserver following growing content) can stop the
// previous tween instead of letting two fight over scrollTop. Existing
// callers ignore the return value and behave exactly as before.
export function animateScrollTo(el: HTMLElement, to: number, durationMs = 320): () => void {
  const from = el.scrollTop;
  const delta = to - from;
  if (Math.abs(delta) < 1) return () => {};

  let cancelled = false;
  const start = performance.now();
  const step = (now: number) => {
    if (cancelled) return;
    const t = Math.min(1, (now - start) / durationMs);
    el.scrollTop = from + delta * drawerEase(t);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  return () => {
    cancelled = true;
  };
}
