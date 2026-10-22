import { useEffect, useRef } from "react";
import { Shell } from "../../components/ill/Shell";
import { Thread } from "../../components/ill/Thread";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { animateScrollTo } from "../../components/ill/scrollEase";
import { useChatTimeline, type Beat, type Timeline } from "./useChatTimeline";
import { ExpandShell } from "./ProactiveMotionScene";

// ConversationViewport's ContentFade is a 32px gradient pinned to the
// viewport's bottom edge, solid for its bottom third — "fully visible"
// has to mean clear of that band too, or a turn can pass the check while
// its last line still sits under the fade, visibly erasing it.
const FADE_CLEARANCE = 40;

// The bare Shell chrome every static scenario in this group uses
// (450x500, no SceneFrame), driven by a beat timeline. `children`
// renders the thread's turns against the timeline — what is on screen at
// each beat is the scenario's call, when it appears is the timeline's.
//
// `width`/`height`/`header`/`className` pass straight through to Shell
// and `threadClassName` wraps the Thread, for a group whose statics
// aren't the bare 450x500 shell (Support V3 Motion's 07, 09-12). All
// unset by default, so every Sell scenario renders exactly as before.
// `className` may also be a function of the timeline, for a shell whose
// own visibility is a beat (09's flow intro fades the shell in late).
// `alignTallTurnTop` keeps a newest turn that's taller than the viewport
// pinned by its top edge rather than its bottom — for a scene whose key
// moment is that turn's opening (12's whisper card), not its tail.
// `expandAfter` opens the scene as just its composer and clips the shell
// open around it once the named beat has passed — ProactiveMotionScene's
// Frame 1 -> Frame 2 expand, for a chat scene that starts on a typed ask
// (Retain's landscape 11 and 12). Unset, the shell is there from the start.
export function ChatMotionScene({
  brand,
  beats,
  children,
  width,
  height,
  header,
  className,
  threadClassName,
  alignTallTurnTop = false,
  expandAfter,
}: {
  brand: string;
  beats: Beat[];
  children: (t: Timeline) => React.ReactNode;
  width?: number;
  height?: number;
  header?: React.ReactNode;
  className?: string | ((t: Timeline) => string | undefined);
  threadClassName?: string;
  alignTallTurnTop?: boolean;
  expandAfter?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  // With `expandAfter`, the on-screen check watches the unclipped wrapper:
  // IntersectionObserver counts the shell's own clip, so the composer-only
  // Frame 1 would never cover enough of the shell to count as landed.
  const expandRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const active = useLandedOnScreen(expandAfter ? expandRef : rootRef);
  const timeline = useChatTimeline(beats, active);
  const { index, runKey, reducedMotion, composer } = timeline;

  // Keeps the newest turn in view as it grows. A ResizeObserver rather
  // than only the beat index, because a beat can change the thread's
  // height without changing beat (an insight settling, a card row
  // mounting): anything that grows the thread re-runs the same check.
  useEffect(() => {
    const viewport = viewportRef.current;
    const thread = viewport?.querySelector(".ill-thread");
    if (!viewport || !thread) return;

    let cancelScroll: (() => void) | undefined;
    const follow = () => {
      const target = thread.lastElementChild;
      if (!target) {
        cancelScroll?.();
        viewport.scrollTop = 0;
        return;
      }
      // Rects in the viewport's own CSS px: the site zooms each visual to
      // fit its panel, and getBoundingClientRect reports zoomed values
      // while scrollTop doesn't. 1 (a no-op) at the visual's drawn size.
      const zoom = viewport.offsetHeight ? viewport.getBoundingClientRect().height / viewport.offsetHeight : 1;
      const unzoom = (r: DOMRect) => ({ top: r.top / zoom, bottom: r.bottom / zoom, height: r.height / zoom });
      const viewportRect = unzoom(viewport.getBoundingClientRect());
      const targetRect = unzoom(target.getBoundingClientRect());
      const isFullyVisible =
        targetRect.bottom <= viewportRect.bottom - FADE_CLEARANCE && targetRect.top >= viewportRect.top;
      if (isFullyVisible) return;

      const available = viewportRect.height - FADE_CLEARANCE;
      const targetTop =
        alignTallTurnTop && targetRect.height > available
          ? viewport.scrollTop + targetRect.top - viewportRect.top
          : viewport.scrollTop + targetRect.bottom - viewportRect.bottom + FADE_CLEARANCE;
      cancelScroll?.();
      if (reducedMotion) {
        viewport.scrollTop = targetTop;
      } else {
        cancelScroll = animateScrollTo(viewport, targetTop);
      }
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

  const thread = <Thread>{children(timeline)}</Thread>;

  const shell = (
    <Shell
      brand={brand}
      width={width}
      height={height}
      header={header}
      className={typeof className === "function" ? className(timeline) : className}
      rootRef={rootRef}
      viewportRef={viewportRef}
      composerValue={composer && composer.value ? composer.value : undefined}
      composerTyping={composer?.typing ?? false}
    >
      {threadClassName ? <div className={threadClassName}>{thread}</div> : thread}
    </Shell>
  );

  if (!expandAfter) return shell;
  // Keyed per landing so the composer's entrance and the clip replay on restart.
  return (
    <div ref={expandRef}>
      <div className="sell-widget-enter" key={runKey}>
        <ExpandShell expanded={timeline.passed(expandAfter)}>{shell}</ExpandShell>
      </div>
    </div>
  );
}
