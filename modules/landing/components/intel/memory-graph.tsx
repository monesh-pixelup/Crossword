"use client";

import Image, { type StaticImageData } from "next/image";
import { type CSSProperties, useEffect, useId, useRef } from "react";
import { cn } from "@/lib/cn";
import cardDecisions from "../../assets/intel/card-decisions.webp";
import cardMemory from "../../assets/intel/card-memory.webp";
import cardOutcome from "../../assets/intel/card-outcome.webp";
import cardSignal from "../../assets/intel/card-signal.webp";
import { type CardState, GLOW, GRAPH_H as H, GRAPH_W as W, LINES, NODES, type NodeKind, SPRITE, STATES } from "../../config/intel";
import { boxFor, lineFor, pathOf, startMemoryGraph } from "./memory-graph-engine";

const cardImages: Record<CardState, StaticImageData> = {
  memory: cardMemory,
  signal: cardSignal,
  decisions: cardDecisions,
  outcome: cardOutcome,
};

const nodeStyles: Record<NodeKind, string> = {
  soft: "rounded-lg bg-sand blur-[4px]",
  pill: "rounded-[28px] bg-sand blur-[4px]",
  solid: "rounded-lg bg-[#ddd2b9b3]",
  warm: "rounded-lg bg-[var(--intel-card-fill,#cab58766)] shadow-[inset_0_0_0_0.5px_#00000026,0_2px_14px_#00000038]",
};

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

/**
 * Customer intelligence memory graph. Server markup is the storyboard's
 * Memory frame; the engine animates it once it is on screen.
 */
export function MemoryGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => (ref.current ? startMemoryGraph(ref.current) : undefined), []);

  return (
    <div ref={ref} aria-hidden className="relative mt-2 aspect-[1279/684] w-[99.9219%] select-none">
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
        return (
          <Image
            key={state}
            src={cardImages[state]}
            alt=""
            data-intel-card={state}
            sizes={`(min-width: 1440px) ${Math.ceil(w)}px, ${((w / 1440) * 100).toFixed(1)}vw`}
            className="pointer-events-none absolute block h-auto max-w-none origin-[50%_55%] will-change-[transform,opacity]"
            style={
              {
                left: pct(x, W),
                top: pct(y, H),
                width: pct(w, W),
                opacity: shown ? 1 : 0,
                visibility: shown ? "visible" : "hidden",
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
