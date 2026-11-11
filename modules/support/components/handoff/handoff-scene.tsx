"use client";

import { ScenePanel } from "@/modules/sell/components/motion/scene-panel";
import { SupportMotionRoot, supportScenes } from "../motion-v3/support-motion";

/** The human-in-the-loop dashboards, one per handoff mode, in order (Support V3 10–12, each 1280 × 599). */
const slugs = ["human-takeover-dashboard", "merchant-approval-dashboard", "whisper-to-agent-dashboard"] as const;
/** Their phone versions (10m–12m, 353 × 440): the inbox folded into one chat window. */
const mobileSlugs = ["human-takeover-mweb", "merchant-approval-mweb", "whisper-to-agent-mweb"] as const;

/**
 * The `i`th handoff mode's helpdesk dashboard, fitted whole to the panel it fills (the stage, which has the
 * dashboard's 1280:599 shape). Scaled with a transform (see ScenePanel), so on a phone its small text shrinks with
 * the drawing instead of hitting the browser's minimum font size.
 */
export function HandoffScene({ index, active, mobile = false }: { index: number; active?: boolean; mobile?: boolean }) {
  // `mobile`: the phone version, for the accordion below 768px (its panel has the 353:440 shape).
  const slug = (mobile ? mobileSlugs : slugs)[index];
  return slug ? (
    <ScenePanel scene={supportScenes[slug]} active={active} root={SupportMotionRoot} maxScale={Infinity} transform />
  ) : null;
}

/** The `i`th handoff mode's scene run, in ms (for timing its tab's turn). */
export const handoffDuration = (index: number) => {
  const slug = slugs[index];
  return slug ? supportScenes[slug].duration : 0;
};
