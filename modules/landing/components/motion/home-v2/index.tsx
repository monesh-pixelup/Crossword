"use client";

import type { ReactNode } from "react";
import "./home-motion.css";

/*
 * The home page's motion visuals, built from the "Crossword — Home v2 Motion (01–11)" source
 * (Crossword-Homev2-Motion-01-11/source): home-motion.js is its Vite build of the 11 visuals, unminified with React
 * external, so markup, classes, copy and timings are the source's own. Only the `ill-`/`sell-` classes are renamed
 * `hm-ill-`/`hm-sell-` (see home-motion.css), brand fonts point at the next/font variables, and assets are served
 * from public/images/landing/home-v2/assets (photos as WebP).
 */
export {
  AdJourneyMotion,
  AiAssistantsMotion,
  AiSearchMotion,
  AnonymousTrafficMotion,
  AskInsightMotion,
  GiftJourneyMotion,
  PersonalAgentsMotion,
  RetentionGrowthMotion,
  RevenueAttributionMotion,
  ServiceResolutionMotion,
  SponsoredComparisonMotion,
} from "./home-motion";

/** The scope home-motion.css lives under: the source page's `:root` tokens and body type. */
export function HomeMotion({ children }: { children: ReactNode }) {
  return <div className="home-motion">{children}</div>;
}
