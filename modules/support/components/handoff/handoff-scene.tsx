"use client";

import { type SceneEntry, ScenePanel } from "@/modules/sell/components/motion/scene-panel";
import { supportScenesB } from "../motion/index-b";
import { SupportMotionRoot } from "../motion/root";

/** The human-in-the-loop scenes, one per handoff mode, in order. */
const slugs = ["human-takeover", "merchant-approval", "whisper-to-agent"] as const;

/** The visible card inside each 738 × 680 scene frame (the rest of the frame draws nothing). */
const CARD = { left: 191.5, top: 139, width: 355, height: 402 };

/** Each scene cropped to its card, so the step's cell can hold just the card. */
const cards: SceneEntry[] = slugs.map((slug) => {
  const scene = supportScenesB[slug];
  const Scene = scene.Component;
  function Card({ play }: { play?: boolean }) {
    return (
      <div className="relative overflow-hidden" style={{ width: CARD.width, height: CARD.height }}>
        <div className="absolute" style={{ left: -CARD.left, top: -CARD.top, width: scene.width, height: scene.height }}>
          <Scene play={play} />
        </div>
      </div>
    );
  }
  return { ...scene, Component: Card, width: CARD.width, height: CARD.height };
});

/** The `i`th handoff mode's motion scene (its 355 × 402 card), zoomed to fill the step's cell. */
export function HandoffScene({ index }: { index: number }) {
  const scene = cards[index];
  return scene ? <ScenePanel scene={scene} root={SupportMotionRoot} /> : null;
}
