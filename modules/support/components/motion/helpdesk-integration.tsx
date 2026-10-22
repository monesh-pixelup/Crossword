"use client";

import { ScenePanel } from "@/modules/sell/components/motion/scene-panel";
import integrationLines from "../../assets/helpdesk/integration-lines.svg";
import integrationTiles from "../../assets/helpdesk/integration-tiles.svg";
import { SceneFrame } from "./parts-a";
import { SupportMotionRoot } from "./root";

/** Figma's tile labels, at their left edges in the 738 × 680 frame (all 547.82px down). */
const labels = [
  { name: "Zendesk", left: 84.35 },
  { name: "Gorgias", left: 251.36 },
  { name: "Freshdesk", left: 418.36 },
  { name: "Other helpdesks", left: 557.08 },
];

/*
 * Figma "Support_helpdesk integration" (static): the Crossword tile wired down to the Zendesk,
 * Gorgias, Freshdesk and other-helpdesk tiles, over the gold connector lines. The lines and the
 * tiles are Figma's own SVG exports, placed at their offsets in the frame; the labels are text.
 * The whole illustration is drawn at 70%, centred in the full-size frame.
 */
function HelpdeskIntegrationScene() {
  return (
    <SceneFrame>
      <div className="relative h-[680px] w-[738px] origin-center scale-70">
        {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, nothing to optimize */}
        <img
          src={integrationLines.src}
          alt=""
          aria-hidden="true"
          className="absolute top-4 left-[13.2852px] block h-[648px] w-[687px] max-w-none"
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, nothing to optimize */}
        <img
          src={integrationTiles.src}
          alt=""
          aria-hidden="true"
          className="absolute top-[118.891px] left-[61.2676px] block h-[423px] w-[615px] max-w-none"
        />
        {labels.map((label) => (
          <p
            key={label.name}
            className="absolute top-[547.82px] font-sans text-base leading-6 font-normal tracking-[-0.32px] whitespace-nowrap text-[#f0e5cc]"
            style={{ left: label.left }}
          >
            {label.name}
          </p>
        ))}
      </div>
    </SceneFrame>
  );
}

const helpdeskIntegration = {
  Component: HelpdeskIntegrationScene,
  label: "Crossword connected to Zendesk, Gorgias, Freshdesk and other helpdesks",
  width: 738,
  height: 680,
  duration: 0,
};

/**
 * The static helpdesk-integration illustration in the support scenes' frame, fitted to the panel it
 * fills, never past `maxScale` (1, its drawn size, unless given).
 */
export function SupportHelpdeskIntegration({ maxScale }: { maxScale?: number }) {
  return (
    <div role="img" aria-label={helpdeskIntegration.label} className="absolute inset-0">
      <ScenePanel scene={helpdeskIntegration} root={SupportMotionRoot} maxScale={maxScale} />
    </div>
  );
}
