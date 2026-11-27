"use client";

import type { ComponentType, ReactNode } from "react";
import {
  BrandedWidgetMotion,
  BrowseUpsellMotion,
  BundleBuildingMotion,
  CartUpsellOfferMotion,
  ComparisonGuidanceMotion,
  CompleteChannelDeploymentMotion,
  ConversationalDiscoveryV2Motion,
  CrossSellMotion,
  DecisionSupportMotion,
  GiftFinderV2Motion,
  GuidedFinderV2Motion,
  HumanModeMotion,
  OutfitBuildingV2Motion,
  PlaceItWhereverMotion,
  PriceObjectionMotion,
  ProactiveInterventionMotion,
  ProductComparisonMotion,
  ProductQAV2Motion,
  PurchaseConfirmationMotion,
  ReturnVisitComparisonMotion,
  SellColorContext,
  SheetMweb,
  SizeFitV2Motion,
  StockAvailabilityMotion,
  TryItOnV2Motion,
  UpsellUpgradeMotion,
  VisualDiscoveryV2Motion,
} from "./sell-motion";
import "./sell-motion.css";
// After sell-motion.css, as the source loads its mobile layouts after the visuals' own styles.
import "./sell-mweb.css";

/*
 * The Sell page's motion visuals, built from the "Crossword — Sell: Conversational interface v2 (motion)" source (the
 * package with the camera versions of Upsell 17b–20b, Conversion assist 28b–33b and Human mode 34b): sell-motion.js is
 * its Vite build of the 25 visuals, unminified with React external, so markup, classes, copy and
 * timings are the source's own. Only the `ill-`/`sell-` classes are renamed `sv-ill-`/`sv-sell-` and keyframes
 * prefixed `sv-` (see sell-motion.css), brand fonts point at the next/font variables, and assets are served from
 * public/images/sell/motion-v2/assets (photos as WebP).
 *
 * Since the 15 November 2026 update: 09–16 render inside a `data-slug` wrapper (no box of its own), which the source
 * page's stylesheet keys their 788 × 579 damask canvas and 676 × 467 window on, and 21–23 are the source's "polished
 * storefront" versions (the plain ones are still in the build, unexported).
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

/*
 * The mobile-web layouts (352 × 440) from the 27 November 2026 source (src/visuals/SellMweb/SellMweb.tsx): each wraps
 * the desktop visual, unchanged, in a `.smw` box that sell-mweb.css lays out for a phone. The phone demos (17m–20m,
 * 28m–33m) also provide SheetMweb, which swaps their desktop frame for the 352 × 440 one and sizes the phone to 372px
 * tall at rest (440 − 2 × the camera's 34px margin).
 */
type Tone = "maroon" | "aubergine";

function SellMweb({ tone = "maroon", children }: { tone?: Tone; children: ReactNode }) {
  return <div className={`smw smw--${tone}`}>{children}</div>;
}

const mweb = (C: ComponentType, tone?: Tone) =>
  function Mweb() {
    return (
      <SellMweb tone={tone}>
        <C />
      </SellMweb>
    );
  };

// The bare 352 × 440 frame, for the phone demos (their maroon or aubergine backdrop, sell-mweb.css).
const frame = (tone: Tone) =>
  function SellMwebFrame({ children }: { children: ReactNode }) {
    return <div className={`smw-frame smw-frame--${tone}`}>{children}</div>;
  };
const FRAMES = { maroon: frame("maroon"), aubergine: frame("aubergine") };

const mwebPhone = (C: ComponentType, tone: Tone) =>
  function MwebPhone() {
    return (
      <SellMweb tone={tone}>
        <SheetMweb.Provider value={{ Frame: FRAMES[tone], slotH: 372 }}>
          <C />
        </SheetMweb.Provider>
      </SellMweb>
    );
  };

// Product discovery 09m–16m: the chat window at phone width.
export const ConversationalDiscoveryMwebMotion = mweb(ConversationalDiscoveryV2Motion);
export const TryItOnMwebMotion = mweb(TryItOnV2Motion);
export const ProductQaMwebMotion = mweb(ProductQAV2Motion);
export const OutfitBuildingMwebMotion = mweb(OutfitBuildingV2Motion);
export const GuidedFinderMwebMotion = mweb(GuidedFinderV2Motion);
export const VisualDiscoveryMwebMotion = mweb(VisualDiscoveryV2Motion);
export const SizeFitMwebMotion = mweb(SizeFitV2Motion);
export const GiftFinderMwebMotion = mweb(GiftFinderV2Motion);
// Upsell 17m–20m, on the maroon frame.
export const UpsellUpgradeMwebMotion = mwebPhone(UpsellUpgradeMotion, "maroon");
export const CrossSellMwebMotion = mwebPhone(CrossSellMotion, "maroon");
export const BundleBuildingMwebMotion = mwebPhone(BundleBuildingMotion, "maroon");
export const BrowseUpsellMwebMotion = mwebPhone(BrowseUpsellMotion, "maroon");
// Conversion assist 28m–33m, on the aubergine frame.
export const PriceObjectionMwebMotion = mwebPhone(PriceObjectionMotion, "aubergine");
export const ProductComparisonMwebMotion = mwebPhone(ProductComparisonMotion, "aubergine");
export const CartUpsellOfferMwebMotion = mwebPhone(CartUpsellOfferMotion, "aubergine");
export const StockAvailabilityMwebMotion = mwebPhone(StockAvailabilityMotion, "aubergine");
export const PurchaseConfirmationMwebMotion = mwebPhone(PurchaseConfirmationMotion, "aubergine");
export const DecisionSupportMwebMotion = mwebPhone(DecisionSupportMotion, "aubergine");
// Storefront presence 35m, 25m, 26m.
export const BrandedWidgetMwebMotion = mweb(BrandedWidgetMotion, "aubergine");
export const PlaceItWhereverMwebMotion = mweb(PlaceItWhereverMotion, "aubergine");
export const CompleteChannelDeploymentMwebMotion = mweb(CompleteChannelDeploymentMotion, "aubergine");
