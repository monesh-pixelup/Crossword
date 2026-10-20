"use client";

import { ScenePanel } from "@/modules/sell/components/motion/scene-panel";
import { supportScenesA } from "./index-a";
import { supportScenesB } from "./index-b";
import { SceneFrame } from "./parts-a";
import { SupportMotionRoot } from "./root";

const supportScenes = { ...supportScenesA, ...supportScenesB };

export type SupportSceneSlug = keyof typeof supportScenes;

/**
 * A support motion scene by slug, fitted to the panel it fills. Server components use this rather
 * than ScenePanel directly, since the scene and its root are functions, which can't be passed
 * from the server to a client component. `fill` lets the scene grow past its drawn size, so it
 * always spans the panel's full width (the panel then matching the scene's shape).
 */
export function SupportScenePanel({ slug, fill = false }: { slug: SupportSceneSlug; fill?: boolean }) {
  return <ScenePanel scene={supportScenes[slug]} root={SupportMotionRoot} maxScale={fill ? Infinity : undefined} />;
}

/** The support scenes' 738 × 680 maroon frame with nothing in it, for a panel whose scene isn't designed yet. */
function EmptyFrame() {
  return <SceneFrame>{null}</SceneFrame>;
}

const emptyFrame = { Component: EmptyFrame, label: "", width: 738, height: 680, duration: 0 };

/** An empty support scene frame, fitted to the panel it fills (decorative). */
export function SupportEmptyFrame() {
  return (
    <div aria-hidden className="absolute inset-0">
      <ScenePanel scene={emptyFrame} root={SupportMotionRoot} />
    </div>
  );
}
