"use client";

import { type ReactNode, useSyncExternalStore } from "react";
import type { SceneEntry } from "@/modules/sell/components/motion/scene-panel";
import { V3AppDetailMotion } from "./visuals/AiAssistantsV3/AppDetailMotion";
import {
  V3BackInStockMotion,
  V3ConfigureMotion,
  V3PriceDropMotion,
  V3ShortlistMotion,
  V3ValueMotion,
  V3WhichMotion,
} from "./visuals/AiAssistantsV3/AiAssistantsV3Motion";
import { V3InsightsMotion } from "./visuals/AiAssistantsV3/Insights";
import { V3CheckoutMotion, V3ExchangeMotion, V3LoyaltyMotion, V3OrderStatusMotion } from "./visuals/AiAssistantsV3/MobileCommerceMotion";
import { V3PromoLaunches, V3PromoOffer, V3PromoUpgrade } from "./visuals/AiAssistantsV3/Promotions";
import "./motion.css";

const subscribe = () => () => {};

/**
 * The `.aia-motion` scope the AI Assistants V3 visuals render in (motion.css is prefixed with it).
 * The visuals are drawn on the client only: they read `prefers-reduced-motion` and the window's
 * focus on their first render, which the server can't know.
 */
export function AiaMotionRoot({ children }: { children: ReactNode }) {
  const client = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return <div className="aia-motion">{client && children}</div>;
}

/*
 * AI Assistants V3 motion visuals 01–15, by the source's slugs, each at its drawn size (11–14
 * without the gallery's tile label, see motion.css). Each plays itself, as in the source: it
 * starts once it is 30% on screen with the tab focused, the chats restart when the viewer comes
 * back, 12–14 land once and stay, and `prefers-reduced-motion` shows the final state. The `play`
 * prop ScenePanel passes is ignored. `duration` is about how long (ms) a visual takes to settle,
 * timed from the source build, for the tabs that time their turns by it.
 */
export const aiaScenes = {
  "which-one-motion": {
    Component: V3WhichMotion,
    label: "In ChatGPT, a shopper asks which serum to get; the brand's products line up with prices, and a follow-up on why one costs more is answered from the catalog.",
    width: 789,
    height: 579,
    duration: 12900,
  },
  "black-with-cubes-motion": {
    Component: V3ConfigureMotion,
    label: "In ChatGPT, the shopper configures the espresso machine with its starter kit, and the view changes as they talk.",
    width: 789,
    height: 579,
    duration: 8900,
  },
  "choose-this-one-motion": {
    Component: V3ShortlistMotion,
    label: "In ChatGPT, the product options stay visible as the shopper browses, compares and picks one from their shortlist.",
    width: 789,
    height: 579,
    duration: 21600,
  },
  "best-value-motion": {
    Component: V3ValueMotion,
    label: "In ChatGPT, a shopper asks for the best value, and suitable products within budget are prioritised with the price differences explained.",
    width: 789,
    height: 579,
    duration: 9300,
  },
  "back-in-stock-motion": {
    Component: V3BackInStockMotion,
    label: "In ChatGPT, a shopper asks to be told when their size is back, and later the back-in-stock note lands in the conversation.",
    width: 620,
    height: 420,
    duration: 12900,
  },
  "price-drop-motion": {
    Component: V3PriceDropMotion,
    label: "In ChatGPT, a shopper asks to know when a product drops below their budget, and later the price-drop alert lands in the conversation.",
    width: 620,
    height: 420,
    duration: 11000,
  },
  "order-status-motion": {
    Component: V3OrderStatusMotion,
    label: "In ChatGPT on a phone, a signed-in customer asks where their order is and sees its delivery status.",
    width: 687,
    height: 586,
    duration: 16200,
  },
  "exchange-motion": {
    Component: V3ExchangeMotion,
    label: "In ChatGPT on a phone, a customer asks for an exchange or refund; eligibility is checked and the options explained.",
    width: 687,
    height: 586,
    duration: 22100,
  },
  "loyalty-motion": {
    Component: V3LoyaltyMotion,
    label: "In ChatGPT on a phone, a customer asks whether their loyalty benefit applies, checked against their purchase history.",
    width: 687,
    height: 586,
    duration: 14200,
  },
  "checkout-motion": {
    Component: V3CheckoutMotion,
    label: "In ChatGPT on a phone, a customer asks to buy the products they picked; a cart is prepared with eligible offers and continues to checkout.",
    width: 687,
    height: 586,
    duration: 27600,
  },
  "app-detail-motion": {
    Component: V3AppDetailMotion,
    label: "ChatGPT's plugin page for Sorelle Labs: the brand's own app, listed inside ChatGPT.",
    width: 1280,
    height: 599,
    duration: 1000,
  },
  "promo-upgrade": {
    Component: V3PromoUpgrade,
    label: "In ChatGPT, a shopper asks for a carry-on under $200 and Trailwell, via Crossword, suggests the Roam Pro upgrade and what the extra cost buys.",
    width: 355,
    height: 402,
    duration: 1000,
  },
  "promo-offer": {
    Component: V3PromoOffer,
    label: "In ChatGPT, Trailwell, via Crossword, brings up an offer the shopper would otherwise have missed.",
    width: 355,
    height: 402,
    duration: 1000,
  },
  "promo-launches": {
    Component: V3PromoLaunches,
    label: "In ChatGPT, Trailwell, via Crossword, puts a launch and its best sellers up front when they match the shopper's request.",
    width: 355,
    height: 402,
    duration: 1000,
  },
  "insights-motion": {
    Component: V3InsightsMotion,
    label: "The merchant's Insights dashboard: what customers asked in ChatGPT, what they picked, and the carts, orders and support cases that followed.",
    width: 1280,
    height: 599,
    duration: 7800,
  },
} satisfies Record<string, SceneEntry>;

export type AiaSceneSlug = keyof typeof aiaScenes;
