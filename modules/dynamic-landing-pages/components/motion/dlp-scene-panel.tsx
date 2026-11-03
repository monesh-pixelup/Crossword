"use client";

import { ScenePanel } from "@/modules/sell/components/motion/scene-panel";
import { type DlpSceneSlug, DlpMotionRoot, dlpScenes } from "./dlp-motion";

/**
 * A Sell: Dynamic v2 motion visual by slug, fitted to the panel it fills. Server components use
 * this rather than ScenePanel directly, since the scene and its root are functions, which can't be
 * passed from the server to a client component. `fill` lets the scene grow past its drawn size, so
 * it always spans the panel's full width (the panel then matching the scene's shape). `transform`
 * scales it with a transform rather than zoom (see ScenePanel), for a wide scene that shrinks far
 * on phones.
 */
export function DlpScenePanel({
  slug,
  fill = false,
  maxScale,
  transform = false,
}: {
  slug: DlpSceneSlug;
  fill?: boolean;
  /** Cap on the zoom (ScenePanel's own default, 1, unless given); `fill` lifts it entirely. */
  maxScale?: number;
  transform?: boolean;
}) {
  return <ScenePanel scene={dlpScenes[slug]} root={DlpMotionRoot} maxScale={fill ? Infinity : maxScale} transform={transform} />;
}
