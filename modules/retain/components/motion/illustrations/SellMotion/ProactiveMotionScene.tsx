import { useLayoutEffect, useRef, useState } from "react";
import { ContentFade } from "../../components/ill/ContentFade";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { useChatTimeline, type Beat, type Timeline } from "./useChatTimeline";

type Clip = { top: number; right: number; bottom: number; left: number; radius: number };

// Frame 1 -> Frame 2: clips the widget (rendered in its final layout) down
// to its own composer's rect until `expanded`, then lets ProactiveMotion.css
// ease the clip open. Offsets are measured, not hand-tuned, so each
// visual's widget clips to exactly its own composer.
//
// The shell itself never resizes between the two states (it's always
// rendered at its final, Frame 2 size — only the clip-path changes), so a
// ResizeObserver on the shell alone never re-fires from a webfont swap:
// the header/body text above the composer can still reflow at a
// different line-height once its real font lands, nudging the composer
// down inside the same-height shell while the clip (a stale CSS-var
// snapshot of where the composer used to be) stays put — the pill then
// visibly jumps once the clip catches up on the next remeasure, or never
// catches up at all. Re-measuring once document.fonts settles (plus one
// rAF after, since a font swap can still repaint a frame late) keeps the
// clip glued to the composer's actual, final position throughout Frame 1,
// not just at first paint.
export function ExpandShell({ expanded, children }: { expanded: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [clip, setClip] = useState<Clip | null>(null);

  useLayoutEffect(() => {
    const shell = ref.current;
    const composer = shell?.querySelector(".ill-chat-composer");
    if (!shell || !composer) return;
    let cancelled = false;
    const measure = () => {
      if (cancelled) return;
      const s = shell.getBoundingClientRect();
      const c = composer.getBoundingClientRect();
      // Back to the shell's own CSS px: the site zooms each visual to fit
      // its panel, and getBoundingClientRect reports zoomed values. 1 (a
      // no-op) at the visual's drawn size.
      const zoom = shell.offsetWidth ? s.width / shell.offsetWidth : 1;
      setClip({
        top: (c.top - s.top) / zoom,
        right: (s.right - c.right) / zoom,
        bottom: (s.bottom - c.bottom) / zoom,
        left: (c.left - s.left) / zoom,
        radius: c.height / 2 / zoom,
      });
    };
    measure();
    document.fonts?.ready?.then(() => {
      measure();
      requestAnimationFrame(measure);
    });
    if (typeof ResizeObserver === "undefined") return () => {
      cancelled = true;
    };
    const observer = new ResizeObserver(measure);
    observer.observe(shell);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  const className = ["sell-expand", expanded && "sell-expand--expanded", !clip && "sell-expand--unmeasured"]
    .filter(Boolean)
    .join(" ");
  const style = clip
    ? ({
        "--sell-clip-top": `${clip.top}px`,
        "--sell-clip-right": `${clip.right}px`,
        "--sell-clip-bottom": `${clip.bottom}px`,
        "--sell-clip-left": `${clip.left}px`,
        "--sell-clip-radius": `${clip.radius}px`,
      } as React.CSSProperties)
    : undefined;

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

// The three proactive-message visuals' shared canvas: the retailer page
// (`Background`) with the Content-Fade gradient behind a widget slot —
// the same framed structure the static visuals use (Figma node 2752:2738,
// visualCanvasFramed.css), driven by a beat timeline.
// The widget opens as Figma's Frame 1 (just the compact composer); once
// the `expand` beat is reached it becomes Frame 2 (the full widget).
//
// The widget slot always carries `sell-widget-align-composer`
// (ProactiveMotion.css) — it pins every widget's bottom edge to the same
// canvas coordinate (Visual 1's own), so with each widget's composer
// sitting the same fixed distance above its own bottom edge, all three
// widgets' composers land at the identical position regardless of how
// tall each widget's own content makes it. This supersedes the static
// pages' own per-visual positioning (Visual 1 at its literal Figma
// coordinates, Visuals 2-3 vertically centered) by request — the three
// widgets reading as one consistent anchor point across the group is
// worth more here than matching each one's own static position.
export function ProactiveMotionScene({
  beats,
  Background,
  children,
}: {
  beats: Beat[];
  Background: React.ComponentType;
  children: (t: Timeline) => React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const active = useLandedOnScreen(rootRef);
  const timeline = useChatTimeline(beats, active);

  return (
    <div className="ill-visual-canvas ill-visual-canvas--framed" ref={rootRef}>
      <div className="ill-visual-canvas__background">
        <Background />
      </div>
      <div className="ill-visual-canvas__fade">
        <ContentFade />
      </div>
      <div className="ill-visual-canvas__widget sell-widget-align-composer">
        {/* Keyed per landing so the pill's own entrance replays on restart. */}
        <div className="sell-widget-enter" key={timeline.runKey}>
          <ExpandShell expanded={timeline.reached("expand")}>{children(timeline)}</ExpandShell>
        </div>
      </div>
    </div>
  );
}
