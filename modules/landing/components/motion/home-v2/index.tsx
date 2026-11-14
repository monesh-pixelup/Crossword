"use client";

import type { ReactNode } from "react";
import "./home-motion.css";

/*
 * The home page's motion visuals, built from the "Crossword — Home page visuals (v2, motion)" source of 15 November
 * 2026 (Crossword-Homev2-Motion/source): home-motion.js is its Vite build of the 12 visuals (01–11 and 08m, the
 * Shopper's experience laid out for a 353px phone column), unminified with React external, so markup, classes, copy
 * and timings are the source's own. Only the `ill-`/`sell-` classes are renamed `hm-ill-`/`hm-sell-` (see
 * home-motion.css), brand fonts point at the next/font variables, and assets are served from
 * public/images/landing/home-v2/assets (photos as WebP).
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
  SponsoredComparisonMobileMotion,
  SponsoredComparisonMotion,
} from "./home-motion";

/**
 * The scope home-motion.css lives under: the source page's `:root` tokens and body type (`.home-motion`), and its
 * `.hv2` window standard (homev2-motion.css: 24px outer windows with a gold edge on every visual).
 */
export function HomeMotion({ children }: { children: ReactNode }) {
  return <div className="home-motion hv2">{children}</div>;
}
