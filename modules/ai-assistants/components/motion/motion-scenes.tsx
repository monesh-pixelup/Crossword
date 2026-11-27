"use client";

import type { ComponentType, ReactNode } from "react";
import { type PaSceneSlug, PaMotionRoot, paMwebScenes, paScenes } from "@/modules/personal-agents/components/motion/pa-motion";
import type { SceneEntry } from "@/modules/shared/motion/scene-panel";
import { type AiaSceneSlug, AiaMotionRoot, aiaMwebScenes, aiaScenes } from "./aia-motion";

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

/**
 * A shared section's visual in its mobile-web layout (353 × 440), for phones: the AI Assistants V3 visuals that have
 * one (01–10, 12–14) and the Personal Agents ones (01–09). Undefined for the others, which keep their desktop layout
 * there.
 */
export function mobileMotionScene(slug: MotionSlug): { scene: SceneEntry; root: ComponentType<{ children: ReactNode }> } | undefined {
  if (slug in paScenes) {
    const scene = paMwebScenes[slug as PaSceneSlug];
    return scene ? { scene, root: PaMotionRoot } : undefined;
  }
  const scene = aiaMwebScenes[slug as AiaSceneSlug];
  return scene ? { scene, root: AiaMotionRoot } : undefined;
}
