"use client";

import type { ReactNode } from "react";
import { SellColorContext } from "./sell-motion";
import "./sell-motion.css";

/*
 * The Sell page's motion visuals, built from the "Crossword — Sell: Conversational interface v2 (motion)" source:
 * sell-motion.js is its Vite build of the 25 visuals, unminified with React external, so markup, classes, copy and
 * timings are the source's own. Only the `ill-`/`sell-` classes are renamed `sv-ill-`/`sv-sell-` and keyframes
 * prefixed `sv-` (see sell-motion.css), brand fonts point at the next/font variables, and assets are served from
 * public/images/sell/motion-v2/assets (photos as WebP).
 *
 * Each visual starts itself once it is at least 30% on screen with the tab focused and fonts loaded, as in the
 * source; mount it (keyed) to replay it from the start.
 */
export {
  BrandedWidgetMotion,
  BrowseUpsellMotion,
  BundleBuildingMotion,
  CartUpsellOfferMotion,
  ComparisonGuidanceMotion,
  CompleteChannelDeploymentMotion,
  ConversationalDiscoveryMotion,
  CrossSellMotion,
  DecisionSupportMotion,
  GiftFinderMotion,
  GuidedFinderMotion,
  HumanModeMotion,
  OutfitBuildingMotion,
  PlaceItWhereverMotion,
  PriceObjectionMotion,
  ProactiveInterventionMotion,
  ProductComparisonMotion,
  ProductQaMotion,
  PurchaseConfirmationMotion,
  ReturnVisitComparisonMotion,
  SizeFitMotion,
  StockAvailabilityMotion,
  TryItOnMotion,
  UpsellUpgradeMotion,
  VisualDiscoveryMotion,
} from "./sell-motion";

/** The scope sell-motion.css lives under (the source page's `:root` tokens and body type), in its crimson colour context. */
export function SellMotionRoot({ children }: { children: ReactNode }) {
  return (
    <div className="cw-sell-v2">
      <SellColorContext>{children}</SellColorContext>
    </div>
  );
}
