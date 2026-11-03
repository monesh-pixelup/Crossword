"use client";

import { ScenePanel } from "@/modules/sell/components/motion/scene-panel";
import { type MotionSlug, motionScene } from "./motion-scenes";

/**
 * A motion visual by slug (AI Assistants V3, or Personal Agents with a `pa-` slug), fitted to the
 * panel it fills. Server components use this rather than ScenePanel directly, since the scene and
 * its root are functions, which can't be passed from the server to a client component. `fill`
 * lets the scene grow past its drawn size, so it always spans the panel's full width (the panel
 * then matching the scene's shape). `transform` scales it with a transform rather than zoom (see
 * ScenePanel), for a wide scene that shrinks far on phones.
 */
export function AiaScenePanel({
  slug,
  fill = false,
  maxScale,
  transform = false,
}: {
  slug: MotionSlug;
  fill?: boolean;
  /** Cap on the zoom (ScenePanel's own default, 1, unless given); `fill` lifts it entirely. */
  maxScale?: number;
  transform?: boolean;
}) {
  const { scene, root } = motionScene(slug);
  return <ScenePanel scene={scene} root={root} maxScale={fill ? Infinity : maxScale} transform={transform} />;
}
