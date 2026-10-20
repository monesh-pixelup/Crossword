import { useEffect, useState, type RefObject } from "react";

function isWindowActive() {
  return typeof document !== "undefined" && document.visibilityState === "visible" && document.hasFocus();
}

// True only while the element is actually on screen AND the browser
// tab/window is focused — gates a one-shot reveal so it starts (or
// restarts) only once the viewer has actually landed on it, instead of
// playing out unseen while the tab is backgrounded or the illustration
// hasn't scrolled into view yet.
//
// Promoted here from being DynamicLandingPageMotion-local (its own copy
// there is untouched) once Support V3 Motion's six scenarios needed the
// same gating — per the kit's "promote a scenario-local helper instead
// of copy-pasting it" convention.
export function useLandedOnScreen(ref: RefObject<Element>) {
  const [intersecting, setIntersecting] = useState(false);
  const [windowActive, setWindowActive] = useState(isWindowActive);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIntersecting(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), {
      threshold: 0.3,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const update = () => setWindowActive(isWindowActive());
    document.addEventListener("visibilitychange", update);
    window.addEventListener("focus", update);
    window.addEventListener("blur", update);
    return () => {
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("focus", update);
      window.removeEventListener("blur", update);
    };
  }, []);

  return intersecting && windowActive;
}
