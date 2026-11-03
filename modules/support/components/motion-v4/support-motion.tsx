"use client";

import { type ReactNode, useSyncExternalStore } from "react";
import type { SceneEntry } from "@/modules/sell/components/motion/scene-panel";
import {
  GuardrailsV4Motion,
  HumanTakeoverV4Motion,
  MerchantApprovalCardV4Motion,
  MerchantHelpdeskV4Motion,
  MerchantInsightV4Motion,
  OrderTrackingV4Motion,
  ProductUsageV4Motion,
  RefundStatusV4Motion,
  ReturnEligibilityV4Motion,
  ShadeChangeV4Motion,
  SizeExchangeV4Motion,
  WhisperToAgentFloatingV4Motion,
} from "./visuals/SupportV4/SupportV4";
import "./motion.css";

const subscribe = () => () => {};

/**
 * The `.sup-motion` scope the Support v4 visuals render in (motion.css is prefixed with it).
 * The visuals are drawn on the client only: they read `prefers-reduced-motion` and the window's
 * focus on their first render, which the server can't know.
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
 * Support v4 motion visuals 01–12, by the source's slugs. Each draws at its design size
 * and plays itself, as in the source: it starts once it is 30% on screen with the tab focused,
 * restarts when the viewer comes back, stops at its end, and shows its final state with
 * `prefers-reduced-motion`. The `play` prop ScenePanel passes is ignored. `duration` is about
 * how long (ms) a visual takes to settle, from its beat timings, for the tabs that time their
 * turns by it.
 *
 * The human-in-the-loop visuals (10–12) are drawn in the 738 × 680 scene frame with no
 * background: the visible card (handoff backdrop + chat) is 355 × 402, centred (at 191.5, 139).
 */
export const supportScenes = {
  "order-tracking": {
    Component: OrderTrackingV4Motion,
    label:
      "A shopper asks where their week-old order is. The assistant says it shipped Tuesday and is in transit through Chicago, expected by Friday, with a shipped, in transit, out for delivery tracker.",
    width: 738,
    height: 680,
    duration: 4400,
  },
  "product-usage": {
    Component: ProductUsageV4Motion,
    label:
      "A shopper asks how much vitamin C serum to use. The assistant recommends 2–3 drops after cleansing and before moisturizer, shown as a three-step routine.",
    width: 738,
    height: 680,
    duration: 4750,
  },
  "size-exchange": {
    Component: SizeExchangeV4Motion,
    label:
      "A shopper wants to exchange an item for a size up. The assistant starts the exchange: a prepaid return label is in their email and the new size ships once the return is scanned.",
    width: 738,
    height: 680,
    duration: 5300,
  },
  "shade-change": {
    Component: ShadeChangeV4Motion,
    label:
      "A shopper ordered the wrong foundation shade. The order hasn't shipped, so the assistant offers to switch it from Shade 3 Fair to Shade 4 Buff, with buttons to make the change or keep it.",
    width: 738,
    height: 680,
    duration: 5100,
  },
  "refund-status": {
    Component: RefundStatusV4Motion,
    label:
      "A shopper asks about the refund for a returned serum. The assistant confirms the return arrived and the $48.25 refund is processed, back on the original payment method in 3–5 business days.",
    width: 738,
    height: 680,
    duration: 4500,
  },
  "return-eligibility": {
    Component: ReturnEligibilityV4Motion,
    label:
      "A shopper asks whether opened protein powder can be returned. The assistant says yes: within 30 days and with less than 25% used, with a Start return button.",
    width: 738,
    height: 680,
    duration: 5550,
  },
  "merchant-helpdesk": {
    Component: MerchantHelpdeskV4Motion,
    label:
      "A merchant asks about their customer conversations. The assistant shows the team inbox with active, waiting and escalated conversations, and an escalated delivery issue ready to assign.",
    width: 738,
    height: 680,
    duration: 5400,
  },
  "merchant-insight": {
    Component: MerchantInsightV4Motion,
    label:
      "A merchant asks the helpdesk assistant what's happening with their customer conversations. It reads the customer's history and summarises a delayed refund, then, asked for more, explains where the refund is and offers to draft a reply.",
    width: 687,
    height: 586,
    duration: 5000,
  },
  guardrails: {
    Component: GuardrailsV4Motion,
    label:
      "The merchant's guardrails (refund policy, tone of voice, escalation) connect to the assistant's chat. Checking the refund policy, the assistant declines to override the return window, offers to flag a specialist, and marks the policy as respected.",
    width: 1280,
    height: 498,
    duration: 5900,
  },
  "human-takeover": {
    Component: HumanTakeoverV4Motion,
    label:
      "A shopper asks for help from a person. The assistant brings in someone from the team, passing along the conversation, and a team member joins with the full context.",
    width: 738,
    height: 680,
    duration: 6700,
  },
  "merchant-approval": {
    Component: MerchantApprovalCardV4Motion,
    label:
      "A shopper asks for 20% off. The assistant privately asks the team for approval, the merchant approves 15%, and the assistant offers 15% off the order.",
    width: 738,
    height: 680,
    duration: 7200,
  },
  "whisper-to-agent": {
    Component: WhisperToAgentFloatingV4Motion,
    label:
      "A disappointed shopper writes in. A team member privately whispers to the assistant that this is a premium customer and to keep it warm, and the assistant replies with a warm, personal apology.",
    width: 738,
    height: 680,
    duration: 5900,
  },
} satisfies Record<string, SceneEntry>;

export type SupportSceneSlug = keyof typeof supportScenes;
