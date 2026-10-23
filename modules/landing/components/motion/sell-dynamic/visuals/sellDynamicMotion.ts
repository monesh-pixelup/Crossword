import { useEffect, useState, type RefObject } from "react";
import { animateScrollTo } from "../components/ill/scrollEase";

// Shared by the Sell: Dynamic motion visuals (Ad journey, AI Search, AI
// Assistants, Personal agents).

// Webfonts settle before a sequence starts: a font swap mid-cascade
// reflows text under an animation, and the Ad journey's expand measures
// its widgets once.
export function useFontsReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return ready;
}

// Keeps a conversation scroller on its newest exchange. With `pin`, the
// newest matching turn (the shopper's latest message) is held at the top
// of the viewport, so the previous exchange scrolls up and out the way a
// fresh send does — unless what follows it outgrows the viewport, in
// which case the end of the thread wins. Without `pin` it simply keeps
// the end of the thread in view. `focus` overrides both: the view moves
// back to put that element at its top (a card about to be picked). A
// ResizeObserver re-runs the check whenever the thread grows without a
// beat change (a turn mounting, a card row resolving). Marks the viewport's parent `data-scrolled` while
// a turn is cut by its top edge, for a top fade.
export function useFollowLatest(
  scrollerRef: RefObject<HTMLElement | null>,
  {
    thread,
    pin,
    focus,
    clearance = 0,
    index,
    reducedMotion,
  }: { thread: string; pin?: string; focus?: string; clearance?: number; index: number; reducedMotion: boolean },
) {
  useEffect(() => {
    const scroller = scrollerRef.current;
    const threadEl = scroller?.querySelector<HTMLElement>(thread);
    if (!scroller || !threadEl) return;

    let cancelScroll: (() => void) | undefined;
    const follow = () => {
      const box = scroller.getBoundingClientRect();
      // The site zooms the visual to fit its panel: rect deltas are divided by that zoom to stay in CSS px.
      const scale = drawnScale(scroller);
      const toContent = (y: number) => (y - box.top) / scale + scroller.scrollTop;
      let target = Math.max(0, toContent(threadEl.getBoundingClientRect().bottom) - scroller.clientHeight + clearance);
      const pins = pin ? threadEl.querySelectorAll<HTMLElement>(pin) : null;
      const pinned = pins?.[pins.length - 1];
      const pinTop = pinned ? toContent(pinned.getBoundingClientRect().top) : 0;
      target = Math.max(target, pinTop);
      // A turn that would only lose its first few px to the clearance
      // starts the view instead: the clearance gives way, not the turn.
      const turns = [...threadEl.children].map((child) => {
        const r = child.getBoundingClientRect();
        return { top: toContent(r.top), bottom: toContent(r.bottom) };
      });
      const nearTop = turns.find((turn) => target > turn.top && target - turn.top <= clearance);
      if (nearTop) target = nearTop.top;
      const focused = focus ? threadEl.querySelector(focus) : null;
      if (focused) target = Math.max(0, toContent(focused.getBoundingClientRect().top) - 8);
      // The top fade only when a turn is actually cut by the top edge.
      const cut = turns.some((turn) => turn.top < target - 1 && turn.bottom > target + 1);
      if (scroller.parentElement) scroller.parentElement.dataset.scrolled = String(cut);
      if (Math.abs(target - scroller.scrollTop) < 1) return;
      cancelScroll?.();
      if (reducedMotion) scroller.scrollTop = target;
      else cancelScroll = animateScrollTo(scroller, target);
    };

    follow();
    const observer = new ResizeObserver(follow);
    observer.observe(threadEl);
    return () => {
      observer.disconnect();
      cancelScroll?.();
    };
  }, [scrollerRef, thread, pin, focus, clearance, index, reducedMotion]);
}

/**
 * How much the visual is zoomed on screen (1 at its drawn size): the site
 * zooms each visual to fit its panel, so getBoundingClientRect distances are
 * the drawn ones times this, while scroll offsets and layout sizes are not.
 */
export function drawnScale(el: HTMLElement) {
  const scale = el.getBoundingClientRect().height / el.offsetHeight;
  return Number.isFinite(scale) && scale > 0 ? scale : 1;
}

export function cx(...names: (string | false | null | undefined)[]) {
  return names.filter(Boolean).join(" ");
}
