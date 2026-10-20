import type { ComponentType } from "react";
import { MerchantHelpdeskScene } from "./merchant-helpdesk";
import { OrderTrackingScene } from "./order-tracking";
import { ProductUsageScene } from "./product-usage";
import { RefundStatusScene } from "./refund-status";
import { ReturnEligibilityScene } from "./return-eligibility";
import { ShadeChangeScene } from "./shade-change";
import { SizeExchangeScene } from "./size-exchange";

/*
 * Support motion visuals 01–07. Each scene renders its 738 × 680 frame at
 * native size (it shrinks to fit a narrower container) and must be wrapped
 * in <SupportMotionRoot>. `duration` is about how long (ms) the script takes
 * to settle once `play` turns true, from the beat timings (typing has ±30%
 * jitter per character).
 */

export type SupportSceneA = {
  Component: ComponentType<{ play?: boolean }>;
  label: string;
  width: number;
  height: number;
  duration: number;
};

export const supportScenesA = {
  "order-tracking": {
    Component: OrderTrackingScene,
    label:
      "A shopper asks where their week-old order is. The assistant says it shipped Tuesday and is in transit through Chicago, expected by Friday, with a shipped, in transit, out for delivery tracker.",
    width: 738,
    height: 680,
    duration: 4400,
  },
  "product-usage": {
    Component: ProductUsageScene,
    label:
      "A shopper asks how much vitamin C serum to use. The assistant recommends 2–3 drops after cleansing and before moisturizer, shown as a three-step routine with an Add to cart button.",
    width: 738,
    height: 680,
    duration: 4750,
  },
  "size-exchange": {
    Component: SizeExchangeScene,
    label:
      "A shopper wants to exchange an item for a size up. The assistant starts the exchange: a prepaid return label is in their email and the new size ships once the return is scanned.",
    width: 738,
    height: 680,
    duration: 5300,
  },
  "shade-change": {
    Component: ShadeChangeScene,
    label:
      "A shopper ordered the wrong foundation shade. The order hasn't shipped, so the assistant offers to switch it from Shade 3 Fair to Shade 4 Buff, with buttons to make the change or keep it.",
    width: 738,
    height: 680,
    duration: 5100,
  },
  "refund-status": {
    Component: RefundStatusScene,
    label:
      "A shopper asks about the refund for a returned serum. The assistant confirms the return arrived and the $48.25 refund is processed, back on the original payment method in 3–5 business days.",
    width: 738,
    height: 680,
    duration: 4500,
  },
  "return-eligibility": {
    Component: ReturnEligibilityScene,
    label:
      "A shopper asks whether opened protein powder can be returned. The assistant says yes: within 30 days and with less than 25% used, with a Start return button.",
    width: 738,
    height: 680,
    duration: 5550,
  },
  "merchant-helpdesk": {
    Component: MerchantHelpdeskScene,
    label:
      "A merchant asks about their customer conversations. The assistant shows the team inbox: 12 active, 4 waiting and 2 escalated, with an escalated delivery issue ready to assign.",
    width: 738,
    height: 680,
    duration: 5400,
  },
} satisfies Record<string, SupportSceneA>;

export type SupportSceneASlug = keyof typeof supportScenesA;
