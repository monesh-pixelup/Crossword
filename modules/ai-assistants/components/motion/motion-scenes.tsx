"use client";

import type { ComponentType, ReactNode } from "react";
import { type PaSceneSlug, PaMotionRoot, paScenes } from "@/modules/personal-agents/components/motion/pa-motion";
import type { SceneEntry } from "@/modules/sell/components/motion/scene-panel";
import { type AiaSceneSlug, AiaMotionRoot, aiaScenes } from "./aia-motion";

/**
 * A motion visual for the sections the AI Assistants and Personal Agents pages share: an AI
 * Assistants V3 visual (aia-motion.tsx) or a Personal Agents one (`pa-` slugs, pa-motion.tsx).
 */
export type MotionSlug = AiaSceneSlug | PaSceneSlug;

/** A shared section's visual by slug, with the CSS scope it renders in. */
export function motionScene(slug: MotionSlug): { scene: SceneEntry; root: ComponentType<{ children: ReactNode }> } {
  return slug in paScenes
    ? { scene: paScenes[slug as PaSceneSlug], root: PaMotionRoot }
    : { scene: aiaScenes[slug as AiaSceneSlug], root: AiaMotionRoot };
}
