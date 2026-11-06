"use client";

import type { ReactNode } from "react";
import { SellCameraColorContext } from "./sell-camera-motion";
import "./sell-camera-motion.css";

/*
 * Upsell & cross-sell's motion visuals, built from the "Crossword — Sell: mobile demos with camera" source:
 * sell-camera-motion.js is its Vite build of the four phone chats with the Screen Studio-style camera (17b–20b),
 * unminified with React external, so markup, classes, copy, camera moves and timings are the source's own. Only the
 * `ill-`/`sell-` classes are renamed `sc-ill-`/`sc-sell-` and keyframes prefixed `sc-` (see sell-camera-motion.css),
 * brand fonts point at the next/font variables, and assets are served from public/images/sell/motion-camera/assets
 * (photos as WebP).
 *
 * Each visual starts itself once it is on screen with the tab focused, as in the source; mount it (keyed) to replay it
 * from the start.
 */
export {
  BrowseUpsellCameraMotion,
  BundleBuildingCameraMotion,
  CrossSellCameraMotion,
  UpsellUpgradeCameraMotion,
} from "./sell-camera-motion";

/** The scope sell-camera-motion.css lives under (the source page's `:root` tokens and body type), in its crimson colour context. */
export function SellCameraMotionRoot({ children }: { children: ReactNode }) {
  return (
    <div className="cw-sell-cam">
      <SellCameraColorContext>{children}</SellCameraColorContext>
    </div>
  );
}
