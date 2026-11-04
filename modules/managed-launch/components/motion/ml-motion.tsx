"use client";

import { type ReactNode, useSyncExternalStore } from "react";
import { type SceneEntry, ScenePanel } from "@/modules/sell/components/motion/scene-panel";
import { ManagedLaunchMotion } from "./visuals/ManagedLaunch/ManagedLaunch";
import "./motion.css";

const subscribe = () => () => {};

/**
 * The `.ml-motion` scope the Managed Launch visual renders in (motion.css is prefixed with it).
 * Drawn on the client only: the visual reads `prefers-reduced-motion` and the window's focus on
 * its first render, which the server can't know.
 */
function MlMotionRoot({ children }: { children: ReactNode }) {
  const client = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return <div className="ml-motion">{client && children}</div>;
}

/**
 * Managed Launch motion 01 (1280 × 599): the launch checklist Crossword runs for the merchant
 * beside the product UI on Aurelle's storefront, changing at each stage. It plays itself, as in
 * the source: it starts once it is 30% on screen with the tab focused, fades out and loops when it
 * finishes, and shows its final state with `prefers-reduced-motion`. The `play` prop ScenePanel
 * passes is ignored.
 */
const managedLaunchScene: SceneEntry = {
  Component: ManagedLaunchMotion,
  label:
    "Crossword's launch checklist for Aurelle (define goal, choose journey, customize, test and launch, measure, improve, expand) beside its storefront, the product UI changing at each step.",
  width: 1280,
  height: 599,
  duration: 0,
};

/**
 * The Managed Launch visual, filling the panel it sits in (past its drawn 1280px on wide screens).
 * Scaled with a transform: zoomed down to a phone's width its text would hit the browser's minimum
 * font size and overflow.
 */
export function ManagedLaunchPanel() {
  return <ScenePanel scene={managedLaunchScene} root={MlMotionRoot} maxScale={Infinity} transform />;
}
