"use client";

import { ScenePanel } from "@/modules/shared/motion/scene-panel";
import { useReplay } from "@/modules/shared/motion/use-replay";
import { type MotionSlug, mobileMotionScene, motionScene } from "./motion-scenes";

/**
 * A motion visual by slug (AI Assistants V3, or Personal Agents with a `pa-` slug), fitted to the
 * panel it fills. Server components use this rather than ScenePanel directly, since the scene and
 * its root are functions, which can't be passed from the server to a client component. `fill`
 * lets the scene grow past its drawn size, so it always spans the panel's full width (the panel
 * then matching the scene's shape). `transform` scales it with a transform rather than zoom (see
 * ScenePanel), for a wide scene that shrinks far on phones. `replayAfter` (ms) plays a visual that runs once over
 * again, that long after it ends (see useReplay).
 */
export function AiaScenePanel({
  slug,
  fill = false,
  maxScale,
  transform = false,
  replayAfter,
  mobile = false,
}: {
  slug: MotionSlug;
  /** Its mobile-web layout (353 × 440) where it has one (AI Assistants 01–10, 12–14); otherwise its own. */
  mobile?: boolean;
  fill?: boolean;
  /** Cap on the zoom (ScenePanel's own default, 1, unless given); `fill` lifts it entirely. */
  maxScale?: number;
  transform?: boolean;
  replayAfter?: number;
}) {
  const { scene, root } = (mobile && mobileMotionScene(slug)) || motionScene(slug);
  const { ref, take } = useReplay(scene.duration, replayAfter);
  const panel = <ScenePanel key={take} scene={scene} root={root} maxScale={fill ? Infinity : maxScale} transform={transform} />;
  if (replayAfter === undefined) return panel;
  return (
    <div ref={ref} className="absolute inset-0">
      {panel}
    </div>
  );
}
