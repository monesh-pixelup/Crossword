"use client";

import { type ComponentType, type CSSProperties, useSyncExternalStore } from "react";
import {
  BackInStockIMessageV2,
  BrowseRecoveryWhatsAppV2Motion,
  CartRecoveryV2Motion,
  LaunchAudienceV2Motion,
  OutboundWhatsAppV2,
  PostPurchaseWhatsAppV2,
  PriceDropWhatsAppV2,
  ReplenishmentIMessageV2,
  ReviewWhatsAppV2,
  SegmentedIMessageV2,
  SizeConfidenceDrawerV2Motion,
  SizeConfidenceMwebV2Motion,
  WinBackIMessageV2,
} from "./visuals/RetainV2/RetainV2";
import { LaunchAudienceFit } from "./illustrations/LaunchAudience/LaunchAudience";
import "./motion.css";

/**
 * Retain v2 motion 01–05, in the order of the Proactive recovery items (config/recovery.ts). As the 15 November 2026
 * handoff has them, each in a native channel: 01, 03 and 05 on iMessage, 02 and 04 on WhatsApp (the widget versions
 * of 02–05 are archived in the source; their components are still exported by RetainV2.tsx).
 */
const recoveryScenes: ComponentType[] = [
  CartRecoveryV2Motion,
  BrowseRecoveryWhatsAppV2Motion,
  BackInStockIMessageV2,
  PriceDropWhatsAppV2,
  ReplenishmentIMessageV2,
];

/** Liveries the campaigns take in turn: maroon (the source's), then aubergine, then forest green. */
export const campaignTones = ["maroon", "aubergine", "forest"] as const;

/**
 * Retain v2 motion 06–10, in the order of the campaigns (config/campaigns.ts). As the 15 November 2026 handoff has
 * them, each in a native channel (06, 08 and 10 on WhatsApp, 07 and 09 on iMessage) on the 788 × 579 canvas
 * (`.rv2-wide`); the 821 × 611 widget versions are archived in the source.
 */
const campaignScenes: ComponentType[] = [
  OutboundWhatsAppV2,
  SegmentedIMessageV2,
  PostPurchaseWhatsAppV2,
  WinBackIMessageV2,
  ReviewWhatsAppV2,
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
          // `rv2m`: the class the source page sets on <body> for its window standard (motion.css's `.rtn-motion.rv2m …`).
          <div className={tone ? `rtn-motion rv2m rtn-tone-${tone}` : "rtn-motion rv2m"}>
            <Scene />
          </div>
        )}
      </div>
    </div>
  );
}

/** Proactive recovery's panel: the 687 × 586 visual of the recovery moment open beside it (`index` in config/recovery.ts). */
export function RecoveryMotion({ index }: { index: number }) {
  return <MotionStage scene={recoveryScenes[index] ?? recoveryScenes[0]} width={687} height={586} />;
}

/**
 * A campaign's 788 × 579 visual, by its index in config/campaigns.ts, in its turn's livery. It fills the damask of the
 * section's 821 × 611 framed panel (16px in on every side, 789 × 579), without a backdrop of its own there (`.rtn-bare`).
 */
export function CampaignMotion({ index }: { index: number }) {
  const tone = campaignTones[index % campaignTones.length];
  return <MotionStage scene={campaignScenes[index]} width={788} height={579} tone={tone === "maroon" ? undefined : tone} />;
}

/** Audiences' 1280 × 599 panel: turning customer patterns into an audience, on the Insights dashboard. */
export function AudienceMotion() {
  return <MotionStage scene={LaunchAudienceV2Motion} width={1280} height={599} />;
}

/** Return reduction's 1280 × 599 panel: Ask AI opens a drawer with a confident size, then it's in the cart. */
export function ReturnMotion() {
  return <MotionStage scene={SizeConfidenceDrawerV2Motion} width={1280} height={599} />;
}

/**
 * Audiences on a phone (11m, 353 × 440): the same Insights dashboard laid out at the small window's size (container
 * queries fold the rail and restack the card). Plays once.
 */
export function AudienceMwebMotion() {
  return <MotionStage scene={LaunchAudienceFit} width={353} height={440} />;
}

/** Return reduction on a phone (12m, 353 × 440): a phone-size product page where Ask AI opens the chat as a bottom sheet. Plays once. */
export function ReturnMwebMotion() {
  return <MotionStage scene={SizeConfidenceMwebV2Motion} width={353} height={440} />;
}
