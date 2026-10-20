"use client";

import brandMark from "@/modules/sell/assets/motion/place-it-wherever-brand-mark.svg";
import { type CSSProperties, type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../motion";
import { Composer, ContentFade, Icon } from "../primitives";
import { BrowserChrome } from "../proactive/parts";
import { FitBox, MaybeContainer } from "./parts";

/*
 * 25 — Place it where it works best (`ys`). On a storefront page the launcher
 * (bubble + suggestion chips) sits bottom-left, travels to the top-right, then
 * the bubble shrinks into the send button of a full-width composer that
 * unrolls with the chips below it.
 *
 * Mechanics: three invisible "ghost" layouts (left, right, expanded) are
 * measured, and their positions are handed to the CSS as `--piw-*` custom
 * properties; one live stage (chips, composer, bubble) animates between them
 * (scenes.css `.piw-motion--*`).
 */

const pageUrl = "shop.example.com";

const suggestions = [
  { id: "gift", text: "Help me find a gift" },
  { id: "compare", text: "Compare these two" },
  { id: "trending", text: "What's trending right now" },
];

type Placement = "left" | "right" | "expanded";
const placements: Placement[] = ["left", "right", "expanded"];

/** The launcher bubble's size; the expanded state scales it to the send button. */
const bubbleSize = 56;
/** Width of the right-edge chip fade. */
const fadeWidth = 40;
/** The page is laid out at 403.75 square and scaled into 306 × 306. */
const pageSize = 403.75;
const fitSize = 306;

/** Phase timings per placement (ms); also handed to the CSS as `--piw-t-<placement>-<name>`. */
const timings = {
  right: { travel: 750, chips: 1150, chipStagger: 50, chipSwap: 200 },
  expanded: {
    travel: 480,
    markOutAt: 330,
    markOut: 180,
    composerAt: 440,
    arrowInAt: 440,
    arrowIn: 180,
    bubbleOutAt: 480,
    bubbleOut: 80,
    unrollAt: 520,
    unroll: 480,
    textAt: 780,
    text: 220,
    chips: 1100,
    chipStagger: 40,
    chipSwap: 400,
  },
  reduced: { fade: 300 },
};

/** How long each placement holds once its move has finished (ms). */
const holdMs: Record<Placement, number> = { left: 1600, right: 1600, expanded: 2000 };

/** How long the move into each placement takes (ms). */
const moveMs: Record<"right" | "expanded", number> = {
  right: Math.max(timings.right.travel, timings.right.chips + 2 * timings.right.chipStagger),
  expanded: Math.max(
    timings.expanded.unrollAt + timings.expanded.unroll,
    timings.expanded.textAt + timings.expanded.text,
    timings.expanded.chips + 2 * timings.expanded.chipStagger,
  ),
};

const timingVars = Object.fromEntries(
  Object.entries(timings).flatMap(([placement, phases]) =>
    Object.entries(phases).map(([name, ms]) => [`--piw-t-${placement}-${name}`, `${ms}ms`]),
  ),
);

/** A blank product card on the storefront page (`$2`). */
function PageCard() {
  return (
    <article className="ill-page-card">
      <div className="ill-page-card__media" />
      <div className="ill-page-card__meta">
        <div className="ill-page-card__meta-row">
          <div className="ill-page-card__brand" />
          <div className="ill-page-card__rating-icons" />
        </div>
        <div className="ill-page-card__title" />
        <div className="ill-page-card__rating" />
      </div>
      <div className="ill-page-card__cta" />
    </article>
  );
}

/** Browser window with a blank storefront; `pageLayer` sits over the page, `children` over everything (`xs`). */
function BrowserScene({ pageLayer, children }: { pageLayer?: ReactNode; children: ReactNode }) {
  return (
    <div className="ill-browser-scene">
      <BrowserChrome url={pageUrl} />
      <div className="ill-browser-scene__nav">
        <span className="ill-browser-scene__logo" />
        <div className="ill-browser-scene__nav-links">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="ill-browser-scene__page">
        <PageCard />
        <PageCard />
        {pageLayer && <div className="ill-browser-scene__page-layer">{pageLayer}</div>}
      </div>
      <ContentFade />
      <div className="ill-browser-scene__widget-layer">{children}</div>
    </div>
  );
}

/** Suggestion chips (`W2`). */
function SuggestionPills({ selectedId }: { selectedId: string }) {
  return (
    <div className="ill-ai-pills">
      {suggestions.map((option) => (
        <div key={option.id} className={option.id === selectedId ? "ill-ai-pill ill-ai-pill--selected" : "ill-ai-pill"}>
          <Icon name="insight" size={16} />
          <span>{option.text}</span>
        </div>
      ))}
    </div>
  );
}

function BrandMark() {
  // eslint-disable-next-line @next/next/no-img-element -- drawn at its source pixels, like the original
  return <img src={brandMark.src} alt="" aria-hidden="true" width={26} height={26} />;
}

/** The collapsed launcher: chips + brand bubble (`e0`). */
function WidgetLauncher({ align, edge = "bottom" }: { align: "left" | "right"; edge?: "top" | "bottom" }) {
  return (
    <div className={`ill-widget-launcher ill-widget-launcher--${align} ill-widget-launcher--${edge}`}>
      <div className="ill-widget-launcher__chips">
        <SuggestionPills selectedId="" />
      </div>
      <button type="button" className="ill-widget-launcher__bubble" aria-label="Open Crossword">
        <BrandMark />
      </button>
    </div>
  );
}

/** The expanded launcher: composer with the chips under it (`ws`). */
function ExpandedComposer() {
  return (
    <div className="ill-expanded-composer">
      <Composer />
      <div className="ill-expanded-composer__suggestions">
        <SuggestionPills selectedId="" />
      </div>
    </div>
  );
}

type Box = { x: number; y: number; w: number; h: number };

/**
 * Reads the ghost layouts into `--piw-*` custom properties, in the widget
 * layer's unscaled pixels (`fs`). Null until all three ghosts are mounted.
 */
function measureGhosts(root: HTMLElement): Record<string, string> | null {
  const layer = root.querySelector<HTMLElement>(".ill-browser-scene__widget-layer");
  const ghost = (name: Placement) => root.querySelector<HTMLElement>(`[data-piw-ghost="${name}"]`);
  if (!layer || !ghost("left") || !ghost("right") || !ghost("expanded")) return null;
  const layerBox = layer.getBoundingClientRect();
  const scale = layerBox.width / layer.offsetWidth;
  const boxOf = (el: Element): Box => {
    const r = el.getBoundingClientRect();
    return {
      x: (r.left - layerBox.left) / scale,
      y: (r.top - layerBox.top) / scale,
      w: r.width / scale,
      h: r.height / scale,
    };
  };
  const px = (n: number) => `${n.toFixed(2)}px`;
  const vars: Record<string, string> = {};
  const pills = (name: Placement) =>
    ghost(name)!
      .querySelectorAll(".ill-ai-pill")
      .forEach((pill, i) => {
        const box = boxOf(pill);
        vars[`--piw-pill${i + 1}-${name}-x`] = px(box.x);
        vars[`--piw-pill${i + 1}-${name}-y`] = px(box.y);
      });

  for (const name of ["left", "right"] as const) {
    const bubble = boxOf(ghost(name)!.querySelector(".ill-widget-launcher__bubble")!);
    vars[`--piw-bubble-${name}-x`] = px(bubble.x);
    vars[`--piw-bubble-${name}-y`] = px(bubble.y);
    pills(name);
  }
  pills("expanded");

  const expanded = ghost("expanded")!;
  const composer = boxOf(expanded.querySelector(".ill-chat-composer")!);
  const send = boxOf(expanded.querySelector(".ill-chat-composer .ill-icon-button")!);
  const chips = boxOf(expanded.querySelector(".ill-expanded-composer__suggestions")!);
  vars["--piw-bubble-expanded-x"] = px(send.x + send.w / 2 - bubbleSize / 2);
  vars["--piw-bubble-expanded-y"] = px(send.y + send.h / 2 - bubbleSize / 2);
  vars["--piw-bubble-expanded-scale"] = (send.w / bubbleSize).toFixed(4);
  vars["--piw-composer-x"] = px(composer.x);
  vars["--piw-composer-y"] = px(composer.y);
  vars["--piw-composer-w"] = px(composer.w);
  // The composer starts clipped to the send button and unrolls to its full pill.
  const top = send.y - composer.y;
  const left = send.x - composer.x;
  const right = composer.x + composer.w - (send.x + send.w);
  const bottom = composer.y + composer.h - (send.y + send.h);
  vars["--piw-composer-clip-closed"] = `inset(${px(top)} ${px(right)} ${px(bottom)} ${px(left)} round ${px(send.w / 2)})`;
  vars["--piw-composer-clip-open"] = `inset(0px 0px 0px 0px round ${px(composer.h / 2)})`;
  vars["--piw-fade-expanded-start"] = px(chips.x + chips.w - fadeWidth);
  vars["--piw-fade-expanded-end"] = px(chips.x + chips.w);
  vars["--piw-fade-off-start"] = px(layerBox.width / scale);
  vars["--piw-fade-off-end"] = px(layerBox.width / scale + fadeWidth);
  return vars;
}

/**
 * `bare` drops the aubergine container (texture + gold frame) and renders
 * only the 306 × 306 browser scene, which sits centred in the 413 × 402
 * container (left 53.5, top 48).
 */
export function PlaceItWherever({ play = true, bare = false }: { play?: boolean; bare?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [placement, setPlacement] = useState<Placement>("left");
  const [layout, setLayout] = useState<Record<string, string> | null>(null);
  // While snapping, transitions are off (first measure, and each restart back to the left).
  const [snap, setSnap] = useState(true);
  const wasPlaying = useRef(play);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const measure = () => setLayout(measureGhosts(root));
    measure();
    document.fonts.ready.then(measure);
    const observer = new ResizeObserver(measure);
    root.querySelectorAll("[data-piw-ghost]").forEach((ghost) => observer.observe(ghost));
    return () => observer.disconnect();
  }, []);

  // Let the snapped layout paint for a frame, then turn transitions back on.
  useEffect(() => {
    if (!snap || !layout) return;
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => setSnap(false));
    });
    return () => cancelAnimationFrame(frame);
  }, [snap, layout]);

  // Restart from the left each time play turns back on.
  useEffect(() => {
    if (play && !wasPlaying.current) {
      setSnap(true);
      setPlacement("left");
    }
    wasPlaying.current = play;
  }, [play]);

  useEffect(() => {
    if (!play || !layout || snap) return;
    const next = placements[placements.indexOf(placement) + 1];
    if (!next) return;
    const move = placement === "left" ? 0 : reducedMotion ? timings.reduced.fade : moveMs[placement];
    const timer = window.setTimeout(() => setPlacement(next), move + holdMs[placement]);
    return () => window.clearTimeout(timer);
  }, [placement, play, layout, snap, reducedMotion]);

  const className = [
    "piw-motion",
    `piw-motion--${placement}`,
    layout && "piw-motion--ready",
    snap && "piw-motion--snap",
    reducedMotion && "piw-motion--reduced",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div ref={rootRef} className={className} style={{ ...timingVars, ...layout } as CSSProperties}>
      <MaybeContainer bare={bare}>
        <FitBox contentWidth={pageSize} contentHeight={pageSize} maxWidth={fitSize} maxHeight={fitSize}>
          <BrowserScene
            pageLayer={
              <div className="piw-motion__ghost" data-piw-ghost="right" aria-hidden="true" inert>
                <WidgetLauncher align="right" edge="top" />
              </div>
            }
          >
            <div className="piw-motion__ghost" data-piw-ghost="left" aria-hidden="true" inert>
              <WidgetLauncher align="left" />
            </div>
            <div className="piw-motion__ghost" data-piw-ghost="expanded" aria-hidden="true" inert>
              <ExpandedComposer />
            </div>
            {/* Remounted per placement under reduced motion, so each one fades in. */}
            <div key={reducedMotion ? placement : "stage"} className="piw-motion__stage">
              <div className="piw-motion__chips">
                <SuggestionPills selectedId="" />
              </div>
              <div className="piw-motion__composer" inert={placement !== "expanded"}>
                <Composer />
              </div>
              <button
                type="button"
                className="ill-widget-launcher__bubble piw-motion__bubble"
                aria-label="Open Crossword"
                inert={placement === "expanded"}
              >
                <BrandMark />
              </button>
            </div>
          </BrowserScene>
        </FitBox>
      </MaybeContainer>
    </div>
  );
}
