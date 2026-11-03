import type { ReactNode } from "react";
import type { AiaSceneSlug } from "../motion/aia-motion";
import { AiaScenePanel } from "../motion/aia-scene-panel";
import { WidePanelSection } from "../wide-panel/wide-panel-section";

/**
 * Figma "Section · Brand aesthetics" (the reporting one, node 3307:28488): the eyebrow and a one-line headline (82px
 * swash at 1.18, Crimson Light 60 at 1.1) on the left, a 477px line of Geist 120px after it, centred on it, then 80px below
 * the 1280 × 599 aubergine panel (see WidePanelSection), playing `scene` when given (AI Assistants V3 15, the Insights
 * dashboard, on the AI Assistants page). Personal agents (3312:29867) passes its own headline and copy, and no scene.
 */
export function Insights({
  id = "insights-title",
  initial = "Y",
  firstLine = "ou see what happened",
  copy = (
    <>
      You&rsquo;ll see what customers asked and what they picked plus the carts, orders and support cases associated.
    </>
  ),
  scene,
}: {
  id?: string;
  initial?: string;
  firstLine?: ReactNode;
  copy?: ReactNode;
  /** The motion visual the panel plays (1280 × 599); the bare panel without one. */
  scene?: AiaSceneSlug;
}) {
  return (
    <WidePanelSection
      id={id}
      eyebrow="Insights"
      initial={initial}
      firstLine={firstLine}
      variant="oneLine"
      layout="inline"
      copyWidth={477.244}
      copy={<p>{copy}</p>}
    >
      {/* Fills the content width (past its drawn 1280px on wide screens); a transform, so it shrinks cleanly on phones. */}
      {scene && <AiaScenePanel slug={scene} fill transform />}
    </WidePanelSection>
  );
}
