"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { type Beat, type BeatState, smoothScrollTo, useBeats } from "./motion";
import { ChatShell, Thread } from "./primitives";

/*
 * The scene runner nearly every Sell visual is built on: a chat shell whose
 * thread is rendered from the beat script's state, scrolled to keep the
 * newest turn in view.
 */

/** How far the newest turn sits above the viewport's bottom edge (the fade). */
const followMargin = 40;

/**
 * The visuals may be zoomed to fit their panel (CSS zoom/transform), making
 * on-screen distances the drawn ones times the zoom. scrollTop is in drawn
 * pixels: divide by this. 1 when not zoomed, which is the source's case:
 * offsetHeight is rounded to whole pixels (the shell's 22.616px padding
 * leaves the viewport fractional), so ratios within 1% count as unzoomed.
 */
function drawnScale(el: HTMLElement) {
  const scale = el.getBoundingClientRect().height / el.offsetHeight;
  if (!Number.isFinite(scale) || scale <= 0 || Math.abs(scale - 1) < 0.01) return 1;
  return scale;
}

/**
 * A scripted chat. `children(t)` renders the thread's turns from the beat
 * state `t` (see useBeats); the composer types whatever a `compose` beat is
 * typing. The script runs while `play` is true and restarts from the top
 * each time `play` turns true again; it does not loop on its own.
 *
 * Whenever the beat changes or the thread resizes, the viewport eases (320ms)
 * so the last turn's bottom sits 40px above its bottom edge, unless it's
 * already in view. With `alignTallTurnTop`, a last turn taller than the
 * viewport is aligned by its top instead.
 */
export function ChatScene({
  brand,
  beats,
  play = true,
  width,
  height,
  header,
  className,
  threadClassName,
  alignTallTurnTop = false,
  children,
}: {
  brand?: ReactNode;
  beats: Beat[];
  play?: boolean;
  width?: number | string;
  height?: number | string;
  /** Replaces the stock header. */
  header?: ReactNode;
  /** Extra class on `.ill-shell`; may depend on the beat state. */
  className?: string | ((t: BeatState) => string | undefined);
  /** Wraps the thread in a div with this class. */
  threadClassName?: string;
  alignTallTurnTop?: boolean;
  children: (t: BeatState) => ReactNode;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const t = useBeats(beats, play);
  const { index, runKey, reducedMotion, composer } = t;

  useEffect(() => {
    const viewport = viewportRef.current;
    const thread = viewport?.querySelector(".ill-thread");
    if (!viewport || !thread) return;
    let cancelScroll: (() => void) | undefined;

    const follow = () => {
      const latest = thread.lastElementChild;
      if (!latest) {
        cancelScroll?.();
        viewport.scrollTop = 0;
        return;
      }
      const box = viewport.getBoundingClientRect();
      const rect = latest.getBoundingClientRect();
      const scale = drawnScale(viewport);
      if (rect.bottom <= box.bottom - followMargin * scale && rect.top >= box.top) return;
      const room = box.height - followMargin * scale;
      const top =
        alignTallTurnTop && rect.height > room
          ? viewport.scrollTop + (rect.top - box.top) / scale
          : viewport.scrollTop + (rect.bottom - box.bottom) / scale + followMargin;
      cancelScroll?.();
      if (reducedMotion) viewport.scrollTop = top;
      else cancelScroll = smoothScrollTo(viewport, top);
    };

    follow();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(follow);
    observer.observe(thread);
    return () => {
      observer.disconnect();
      cancelScroll?.();
    };
  }, [index, runKey, reducedMotion, alignTallTurnTop]);

  const thread = <Thread>{children(t)}</Thread>;
  return (
    <ChatShell
      brand={brand}
      width={width}
      height={height}
      header={header}
      className={typeof className === "function" ? className(t) : className}
      viewportRef={viewportRef}
      composerValue={composer && composer.value ? composer.value : undefined}
      composerTyping={composer?.typing ?? false}
    >
      {threadClassName ? <div className={threadClassName}>{thread}</div> : thread}
    </ChatShell>
  );
}
