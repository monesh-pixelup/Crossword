"use client";

import type { ReactNode } from "react";
import {
  ComparisonGuidanceMotion,
  HumanModeMotion,
  ProactiveInterventionMotion,
  ReturnVisitComparisonMotion,
  SellColorContext,
} from "./sell-motion";
import "./sell-motion.css";

/*
 * The Sell page's motion visuals, built from the "Crossword — Sell: Conversational interface v2 (motion)" source (the
 * package with the camera versions of Upsell 17b–20b, Conversion assist 28b–33b and Human mode 34b): sell-motion.js is
 * its Vite build of the 25 visuals, unminified with React external, so markup, classes, copy and
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
  ComparisonGuidanceMwebMotion,
  CompleteChannelDeploymentMotion,
  ConversationalDiscoveryMotion,
  CrossSellMotion,
  DecisionSupportMotion,
  GiftFinderMotion,
  GuidedFinderMotion,
  HumanModeMotion,
  HumanModeMwebMotion,
  OutfitBuildingMotion,
  PlaceItWhereverMotion,
  PriceObjectionMotion,
  ProactiveInterventionMotion,
  ProactiveInterventionMwebMotion,
  ProductComparisonMotion,
  ProductQaMotion,
  PurchaseConfirmationMotion,
  ReturnVisitComparisonMotion,
  ReturnVisitComparisonMwebMotion,
  SizeFitMotion,
  StockAvailabilityMotion,
  TryItOnMotion,
  UpsellUpgradeMotion,
  VisualDiscoveryMotion,
} from "./sell-motion";

/**
 * The scope sell-motion.css lives under (the source page's `:root` tokens and body type), in its crimson colour context.
 * It carries `hv2` too: the source page's window standard (24px corners and a gold edge on 09–16 and 21–23) is scoped
 * under it, and reads `.cw-sell-v2.hv2 …` here.
 */
export function SellMotionRoot({ children }: { children: ReactNode }) {
  return (
    <div className="cw-sell-v2 hv2">
      <SellColorContext>{children}</SellColorContext>
    </div>
  );
}

/*
 * 21–23 and 34b at their desktop layout. Since the 11 November 2026 update these take an optional flag for their phone
 * layout (21–23 `narrow`, 34b `mweb`; the phone versions are their own exports), which doesn't fit the scenes'
 * `{ play }` props, so scenes.ts registers these no-props versions instead. They render exactly as before. They live
 * here, in the client module, so server components can pass the scenes that hold them to ScenePanel.
 */
export function ProactiveInterventionDesktopMotion() {
  return <ProactiveInterventionMotion />;
}
export function ComparisonGuidanceDesktopMotion() {
  return <ComparisonGuidanceMotion />;
}
export function ReturnVisitComparisonDesktopMotion() {
  return <ReturnVisitComparisonMotion />;
}
export function HumanModeDesktopMotion() {
  return <HumanModeMotion />;
}
