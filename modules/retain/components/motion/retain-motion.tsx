"use client";

import { type ComponentType, type CSSProperties, useSyncExternalStore } from "react";
import { useStrangerActive } from "@/modules/dynamic-landing-pages/components/personalization/stranger-scroll";
import { BackInStockMotion } from "./illustrations/RetainMotion/BackInStockMotion";
import { BrowseRecoveryMotion } from "./illustrations/RetainMotion/BrowseRecoveryMotion";
import { CartRecoveryMotion } from "./illustrations/RetainMotion/CartRecoveryMotion";
import { PriceDropMotion } from "./illustrations/RetainMotion/PriceDropMotion";
import { ReplenishmentMotion } from "./illustrations/RetainMotion/ReplenishmentMotion";
import { OutboundCampaignMotion } from "./illustrations/CampaignsMotion/OutboundCampaignMotion";
import { PostPurchaseFollowUpMotion } from "./illustrations/CampaignsMotion/PostPurchaseFollowUpMotion";
import { ReviewSolicitationMotion } from "./illustrations/CampaignsMotion/ReviewSolicitationMotion";
import { SegmentedCampaignMotion } from "./illustrations/CampaignsMotion/SegmentedCampaignMotion";
import { WinBackCampaignMotion } from "./illustrations/CampaignsMotion/WinBackCampaignMotion";
import { DemandDiscoveryMotion } from "./illustrations/WidgetLandscapeMotion/DemandDiscoveryMotion";
import { SizeConfidenceMotion } from "./illustrations/WidgetLandscapeMotion/SizeConfidenceMotion";
import "./motion.css";

/** Retain motion 01–05, in the order of the Proactive recovery items (config/recovery.ts). */
const recoveryScenes: ComponentType[] = [
  CartRecoveryMotion,
  BrowseRecoveryMotion,
  BackInStockMotion,
  PriceDropMotion,
  ReplenishmentMotion,
];

/** Liveries the campaigns take in turn: maroon (the source's), then aubergine, then forest green. */
export const campaignTones = ["maroon", "aubergine", "forest"] as const;

/** Retain motion 06–10, in the order of the campaigns (config/campaigns.ts). */
const campaignScenes: ComponentType[] = [
  OutboundCampaignMotion,
  SegmentedCampaignMotion,
  PostPurchaseFollowUpMotion,
  WinBackCampaignMotion,
  ReviewSolicitationMotion,
];

const subscribe = () => () => {};

/**
 * One motion visual drawn at its design size and zoomed to the width of the column it sits in, so
 * at that width it renders 1:1 with the source build. Rendered on the client only: the visuals
 * read `prefers-reduced-motion` and the viewport on their first render, which the server can't
 * know. Each one plays itself once it is 30% on screen with the tab focused, and restarts when the
 * viewer comes back, as in the source.
 */
function MotionStage({
  scene: Scene,
  width,
  height,
  tone,
}: {
  scene: ComponentType;
  width: number;
  height: number;
  /** A livery other than the source's (motion.css's `.rtn-tone-*`). */
  tone?: "aubergine" | "forest";
}) {
  const client = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  return (
    <div aria-hidden className="@container w-full">
      <div inert className="scale-to-container" style={{ width, height, "--fit-width": `${width}px` } as CSSProperties}>
        {client && (
          <div className={tone ? `rtn-motion rtn-tone-${tone}` : "rtn-motion"}>
            <Scene />
          </div>
        )}
      </div>
    </div>
  );
}

/** Proactive recovery's panel: the 687 × 586 visual of the recovery moment currently open beside it. */
export function RecoveryMotion() {
  const active = useStrangerActive();
  return <MotionStage scene={recoveryScenes[active] ?? recoveryScenes[0]} width={687} height={586} />;
}

/** A campaign's 821 × 611 panel, by its index in config/campaigns.ts, in its turn's livery. */
export function CampaignMotion({ index }: { index: number }) {
  const tone = campaignTones[index % campaignTones.length];
  return <MotionStage scene={campaignScenes[index]} width={821} height={611} tone={tone === "maroon" ? undefined : tone} />;
}

/** Audiences' 1280 × 599 panel: discovering demand from past conversations. */
export function AudienceMotion() {
  return <MotionStage scene={DemandDiscoveryMotion} width={1280} height={599} />;
}

/** Return reduction's 1280 × 599 panel: a confident size, then it's in the cart. */
export function ReturnMotion() {
  return <MotionStage scene={SizeConfidenceMotion} width={1280} height={599} />;
}
