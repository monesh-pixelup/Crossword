"use client";

import Image, { type StaticImageData } from "next/image";
import { type CSSProperties, useEffect, useId, useRef } from "react";
import { cn } from "@/lib/cn";
import cardDecisions from "../../assets/intel/card-decisions.webp";
import cardMemory from "../../assets/intel/card-memory.webp";
import cardOutcome from "../../assets/intel/card-outcome.webp";
import cardProfile from "../../assets/intel/card-profile.webp";
import cardSignal from "../../assets/intel/card-signal.webp";
import { type CardState, GLOW, GRAPH_H as H, GRAPH_W as W, LINES, NODES, type NodeKind, SPRITE, STATES } from "../../config/intel";
import { boxFor, lineFor, pathOf, startMemoryGraph } from "./memory-graph-engine";

const cardImages: Record<CardState, StaticImageData> = {
  memory: cardMemory,
  signal: cardSignal,
  decisions: cardDecisions,
  outcome: cardOutcome,
  profile: cardProfile,
};

const nodeStyles: Record<NodeKind, string> = {
  soft: "rounded-lg bg-sand blur-[4px]",
  pill: "rounded-[28px] bg-sand blur-[4px]",
  solid: "rounded-lg bg-[#ddd2b9b3]",
  warm: "rounded-lg bg-[var(--intel-card-fill,#cab58766)] shadow-[inset_0_0_0_0.5px_#00000026,0_2px_14px_#00000038]",
};

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

/**
 * Each card's label (top left, beside its icon), set as text over the art. `left` and `top` are where its capitals
 * start in the card image (imageW × imageH px, drawn at half size on the stage).
 */
const cardLabels: Record<CardState, { text: string; left: number; top: number; imageW: number; imageH: number }> = {
  memory: { text: "Memory", left: 128, top: 52, imageW: 649, imageH: 658 },
  signal: { text: "Signal", left: 116, top: 52, imageW: 803, imageH: 514 },
  decisions: { text: "Decisions", left: 103, top: 49, imageW: 793, imageH: 556 },
  outcome: { text: "Outcome", left: 102, top: 49, imageW: 744, imageH: 513 },
  profile: { text: "Customer profile", left: 102, top: 49, imageW: 730, imageH: 564 },
};
/** Label font size in stage units: 12-unit capitals, as in the art. */
const LABEL_SIZE = 20;

/**
 * Customer intelligence memory graph. Server markup is the storyboard's
 * Memory frame; the engine animates it once it is on screen.
 */
export function MemoryGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => (ref.current ? startMemoryGraph(ref.current) : undefined), []);

  // Phones: the graph is drawn 2.2x the screen's width in a strip that scrolls sideways (see below), and whenever a
  // card opens the strip glides to centre it, so the card in play is always in view at a readable size.
  useEffect(() => {
    const graph = ref.current;
    const strip = scroller.current;
    if (!graph || !strip) return;
    const phone = window.matchMedia("(max-width: 767px)");
    let shown: Element | null = null;
    const centre = (smooth: boolean) => {
      if (!phone.matches) return;
      const card = [...graph.querySelectorAll<HTMLElement>("[data-intel-card]")].find(
        (el) => el.style.visibility !== "hidden" && Number(el.style.opacity || 1) > 0.5,
      );
      if (!card || (smooth && card === shown)) return;
      shown = card;
      const left = graph.offsetLeft + card.offsetLeft + card.offsetWidth / 2 - strip.clientWidth / 2;
      strip.scrollTo({ left: Math.max(0, left), behavior: smooth ? "smooth" : "instant" });
    };
    centre(false);
    const observer = new MutationObserver(() => centre(true));
    graph.querySelectorAll("[data-intel-card]").forEach((el) => observer.observe(el, { attributes: true, attributeFilter: ["style"] }));
    const onChange = () => centre(false);
    phone.addEventListener("change", onChange);
    return () => {
      observer.disconnect();
      phone.removeEventListener("change", onChange);
    };
  }, []);

  return (
    // Below 768px the 1279 × 684 graph would shrink to a sliver: it's drawn at 220% of the column instead, in a strip
    // running to the screen's edges that scrolls sideways (no bar). From 768px it's as before.
    <div
      ref={scroller}
      className="max-md:-mx-(--page-pad) max-md:overflow-x-auto max-md:overscroll-x-contain max-md:px-(--page-pad) max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden"
    >
      <div ref={ref} aria-hidden className="@container relative mt-2 aspect-[1279/684] w-[99.9219%] select-none max-md:w-[220%]">
        {NODES.map((node) => {
          const [x, y, w, h, o] = boxFor(node.id, "m");
          return (
            <div
              key={node.id}
              data-intel-node={node.id}
              className={cn("pointer-events-none absolute origin-center will-change-[transform,opacity]", nodeStyles[node.kind])}
              style={{ left: pct(x, W), top: pct(y, H), width: pct(w, W), height: pct(h, H), opacity: o }}
            />
          );
        })}

        <svg
          data-intel-lines
          viewBox={`0 0 ${W} ${H}`}
          fill="none"
          className="pointer-events-none absolute inset-0 size-full overflow-visible"
        >
          <defs>
            {GLOW.map((glow) => (
              <linearGradient
                key={glow.id}
                id={`${id}-glow-${glow.id}`}
                data-intel-glow-grad={glow.id}
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0" stopColor="#e0be60" />
                <stop offset="1" stopColor="#e0be60" stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>
          {LINES.map((line) => (
            <path
              key={line.id}
              data-intel-line={line.id}
              d={pathOf(lineFor(line.id, "m").p)}
              stroke="#f2ead9"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {GLOW.map((glow) => (
            <path
              key={glow.id}
              data-intel-glow={glow.id}
              d={pathOf(lineFor(glow.id, "m").p)}
              stroke={`url(#${id}-glow-${glow.id})`}
              strokeWidth="1"
              opacity={glow.frames.m}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <circle data-intel-dot cx="364" cy="291" r="3.5" fill="#fef8ea" stroke="#e0be60" strokeWidth="1" />
          <circle data-intel-dot cx="230" cy="369" r="3.5" fill="#fef8ea" stroke="#e0be60" strokeWidth="1" />
        </svg>

        {STATES.map((state) => {
          const [x, y, w] = SPRITE[state];
          const shown = state === "memory";
          const label = cardLabels[state];
          return (
            <div
              key={state}
              data-intel-card={state}
              className="pointer-events-none absolute origin-[50%_55%] will-change-[transform,opacity]"
              style={
                {
                  left: pct(x, W),
                  top: pct(y, H),
                  width: pct(w, W),
                  opacity: shown ? 1 : 0,
                  visibility: shown ? "visible" : "hidden",
                } as CSSProperties
              }
            >
              <Image
                src={cardImages[state]}
                alt=""
                sizes={`(min-width: 1440px) ${Math.ceil(w)}px, ${((w / 1440) * 100).toFixed(1)}vw`}
                className="block h-auto w-full max-w-none"
              />
              {/* Live text over the art (which has the label cleared out), so it stays sharp at any size. */}
              <span
                className="intel-label-shimmer absolute -my-[0.1em] block py-[0.1em] font-serif leading-none font-normal whitespace-nowrap uppercase [text-box:trim-both_cap_alphabetic]"
                style={{
                  left: `${(label.left / label.imageW) * 100}%`,
                  top: `${(label.top / label.imageH) * 100}%`,
                  fontSize: `${(LABEL_SIZE / W) * 100}cqw`,
                }}
              >
                {label.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
