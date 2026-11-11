"use client";

import type { ReactNode } from "react";
import "./home-mobile-motion.css";

/*
 * The home page's mobile web visual, 08m: Shopper's experience laid out at 1:1 for a 353px phone column (353 × 440),
 * built on its own from the "Crossword — Home v2 Motion (01–11 + 08m)" source, so the desktop visuals (../home-v2, from
 * the earlier source) stay exactly as they are. It plays the search result, the tap, the product page, its skeletons
 * resolving and the scroll down to Crossword's comparison, in its 24px gold-edged browser window.
 */
export { SponsoredComparisonMobileMotion } from "./home-mobile-motion";

/** The scope home-mobile-motion.css lives under: the source page's tokens, and its `.hv2` window standard. */
export function HomeMobileMotion({ children }: { children: ReactNode }) {
  return <div className="home-motion-m hv2">{children}</div>;
}
