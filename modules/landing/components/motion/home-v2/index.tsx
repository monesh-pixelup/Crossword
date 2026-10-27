"use client";

import type { ReactNode } from "react";
import "./home-motion.css";

/*
 * The home page's motion visuals, ported from the "Crossword — Home page visuals (v2, motion)" build
 * (homev2-motion-export). The .jsx modules are decompiled from its bundle as is: same markup, classes, copy and
 * timings, with only the `ill-`/`sell-` classes renamed `hm-ill-`/`hm-sell-` (see home-motion.css) and assets
 * imported from ./assets (photos as WebP) or served from public/images/landing/home-v2.
 */
export { AdJourneyMotion } from "./ad-journey";
export { AiAssistantsMotion } from "./ai-assistants";
export { AiSearchMotion } from "./ai-search";
export { AnonymousTrafficMotion } from "./anonymous-traffic";
export { AskInsightMotion } from "./ask-insight";
export { GiftJourneyMotion } from "./gift-journey";
export { PersonalAgentsMotion } from "./personal-agents";
export { RetentionGrowthMotion } from "./retention-growth";
export { RevenueAttributionMotion } from "./revenue-attribution";
export { ServiceResolutionMotion } from "./service-resolution";
export { SponsoredComparisonMotion } from "./sponsored-comparison";

/** The scope home-motion.css lives under: the source page's `:root` tokens and body type. */
export function HomeMotion({ children }: { children: ReactNode }) {
  return <div className="home-motion">{children}</div>;
}
