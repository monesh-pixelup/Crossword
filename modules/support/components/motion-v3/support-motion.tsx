"use client";

import { type ReactNode, useSyncExternalStore } from "react";
import type { SceneEntry } from "@/modules/sell/components/motion/scene-panel";
import "./motion.css";
import {
  DecisionDashboardMotion,
  GuardrailsMotion,
  HelpdeskInsightsDashboardMotion,
  MerchantInsightDeskMotion,
  MerchantInsightMotion,
  OrderTrackingMotion,
  ProductUsageMotion,
  RefundStatusMotion,
  ReturnEligibilityMotion,
  ShadeChangeMotion,
  SizeExchangeMotion,
  TakeoverDashboardMotion,
  WhisperDashboardMotion,
} from "./support-v3";

/*
 * The Support page's motion visuals, built from the "Crossword — Support V3 motion visuals" source
 * (Crossword-Support-V3-Motion/source): support-v3.js is its Vite build of the 12 live visuals, unminified with
 * React external, so markup, classes, copy and timings are the source's own. Mechanical changes only:
 *
 * - Anything that measures with getBoundingClientRect divides by the zoom (or scale) the site draws the visual at, so
 *   it stays in CSS px: ChatMotionScene and MerchantInsightMotion (follow-scroll), ProactiveMotionScene (composer clip)
 *   and useMeasuredSkeleton (the result panels' skeleton). At the drawn size the factor is 1, so nothing changes. (useFrameCamera already
 *   measures in the visual's own units.)
 * - Brand fonts point at the next/font variables, and assets are served from public/images/support/v3/assets
 *   (photos as WebP). motion.css is scoped under `.sup-motion` (see its header).
 */

const subscribe = () => () => {};

/**
 * The `.sup-motion` scope the visuals render in (motion.css is prefixed with it). The visuals are drawn on the client
 * only: they read `prefers-reduced-motion` and the window's focus on their first render, which the server can't know.
 */
export function SupportMotionRoot({ children }: { children: ReactNode }) {
  const client = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return <div className="sup-motion">{client && children}</div>;
}

/*
 * Support V3 motion visuals 01–12, by the source's slugs, drawn by ScenePanel (modules/sell/components/motion/scene-panel.tsx).
 * Each draws at its design size and plays itself, as in the source: it starts once it is 30% on screen with the tab
 * focused, restarts when the viewer comes back, stops at its end, and shows its final state with
 * `prefers-reduced-motion`. The `play` prop ScenePanel passes is ignored. `duration` is how long (ms) a visual takes to
 * settle, for the tabs that time their turns by it: 01–06 and 09 play the same scripts as before; 07, 08 and 10–12 from
 * the source's own beat timings.
 *
 * | Slugs | Size | Used in |
 * | --- | --- | --- |
 * | 01–06 `order-tracking` … `return-eligibility` | 738 × 680 | resolve/resolve-tabs.tsx |
 * | 07 `merchant-helpdesk-inbox` | 738 × 680 | helpdesk/helpdesk-options.tsx (row 1) |
 * | 08 `merchant-insight` (the source's archived 08, kept on this page) | 687 × 586 | control/take-control.tsx |
 * | 08 `merchant-insight-inbox` (the source's current 08, not used yet) | 687 × 586 | — |
 * | 09 `guardrails` | 1280 × 498 | guardrails/guardrails.tsx |
 * | 10–12 `human-takeover-dashboard`, `merchant-approval-dashboard`, `whisper-to-agent-dashboard` | 1280 × 599 | handoff/handoff-scene.tsx |
 */
export const supportScenes = {
  "order-tracking": {
    Component: OrderTrackingMotion,
    label:
      "A shopper asks where their week-old order is. The assistant says it shipped Tuesday and is in transit through Chicago, expected by Friday, with a shipped, in transit, out for delivery tracker.",
    width: 738,
    height: 680,
    duration: 4400,
  },
  "product-usage": {
    Component: ProductUsageMotion,
    label:
      "A shopper asks how much vitamin C serum to use. The assistant recommends 2–3 drops after cleansing and before moisturizer, shown as a three-step routine.",
    width: 738,
    height: 680,
    duration: 4750,
  },
  "size-exchange": {
    Component: SizeExchangeMotion,
    label:
      "A shopper wants to exchange an item for a size up. The assistant starts the exchange: a prepaid return label is in their email and the new size ships once the return is scanned.",
    width: 738,
    height: 680,
    duration: 5300,
  },
  "shade-change": {
    Component: ShadeChangeMotion,
    label:
      "A shopper ordered the wrong foundation shade. The order hasn't shipped, so the assistant offers to switch it from Shade 3 Fair to Shade 4 Buff, with buttons to make the change or keep it.",
    width: 738,
    height: 680,
    duration: 5100,
  },
  "refund-status": {
    Component: RefundStatusMotion,
    label:
      "A shopper asks about the refund for a returned serum. The assistant confirms the return arrived and the $48.25 refund is processed, back on the original payment method in 3–5 business days.",
    width: 738,
    height: 680,
    duration: 4500,
  },
  "return-eligibility": {
    Component: ReturnEligibilityMotion,
    label:
      "A shopper asks whether opened protein powder can be returned. The assistant says yes: within 30 days and with less than 25% used, with a Start return button.",
    width: 738,
    height: 680,
    duration: 5550,
  },
  "merchant-helpdesk-inbox": {
    Component: HelpdeskInsightsDashboardMotion,
    label:
      "A merchant asks Crossword what's happening with their customer conversations. It reads the team inbox, sorts what needs attention and shows the inbox with active, waiting and escalated conversations.",
    width: 738,
    height: 680,
    duration: 10200,
  },
  "merchant-insight": {
    Component: MerchantInsightMotion,
    label:
      "A merchant asks the helpdesk assistant what's happening with their customer conversations. It reads the customer's history and summarises a delayed refund, then, asked for more, explains where the refund is and offers to draft a reply.",
    width: 687,
    height: 586,
    duration: 5000,
  },
  "merchant-insight-inbox": {
    Component: MerchantInsightDeskMotion,
    label:
      "In the helpdesk inbox, Crossword summarises a customer's delayed refund. Asked for anything else, it explains the refund is approved but hasn't reached the payment processor yet, and drafts the reply.",
    width: 687,
    height: 586,
    duration: 16400,
  },
  guardrails: {
    Component: GuardrailsMotion,
    label:
      "The merchant's guardrails (refund policy, tone of voice, escalation) connect to the assistant's chat. Checking the refund policy, the assistant declines to override the return window, offers to flag a specialist, and marks the policy as respected.",
    width: 1280,
    height: 498,
    duration: 5900,
  },
  "human-takeover-dashboard": {
    Component: TakeoverDashboardMotion,
    label:
      "In the helpdesk inbox, a shopper asks for a person. The assistant brings in the team, a team member takes over the conversation and replies with the full context.",
    width: 1280,
    height: 599,
    duration: 14900,
  },
  "merchant-approval-dashboard": {
    Component: DecisionDashboardMotion,
    label:
      "In the helpdesk inbox, a shopper asks for 20% off. The assistant checks with the team, the merchant approves 15%, and the assistant offers 15% off the order.",
    width: 1280,
    height: 599,
    duration: 12300,
  },
  "whisper-to-agent-dashboard": {
    Component: WhisperDashboardMotion,
    label:
      "In the helpdesk inbox, a team member privately tells the assistant that a disappointed shopper is a premium customer and to keep it warm, and the assistant replies with a warm, personal apology.",
    width: 1280,
    height: 599,
    duration: 11200,
  },
} satisfies Record<string, SceneEntry>;

export type SupportSceneSlug = keyof typeof supportScenes;
