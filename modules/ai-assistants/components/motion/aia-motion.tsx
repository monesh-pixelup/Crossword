"use client";

import { type ReactNode, useSyncExternalStore } from "react";
import type { SceneEntry } from "@/modules/sell/components/motion/scene-panel";
import "./motion.css";
import {
  V3AppDetailMotion,
  V3AppDetailMwebMotion,
  V3BackInStockMotion,
  V3CheckoutMotion,
  V3ConfigureMotion,
  V3ExchangeMotion,
  V3InsightsMotion,
  V3InsightsMwebMotion,
  V3LoyaltyMotion,
  V3OrderStatusMotion,
  V3PriceDropMotion,
  V3PromoLaunches,
  V3PromoOffer,
  V3PromoUpgrade,
  V3ShortlistMotion,
  V3ValueMotion,
  V3WhichMotion,
} from "./aia-v3";

/*
 * The AI Assistants page's motion visuals, built from the "Crossword — AI Assistants V3 motion" source
 * (Crossword-AI-Assistants-V3-Motion-2026-11-11/source, the 11 November 2026 update: the 24px gold-edged window
 * standard, and 11m and 15m, the mobile web visuals): aia-v3.js is its Vite build of the 17 visuals, unminified with React
 * external, so markup, classes, copy and timings are the source's own. Mechanical changes only:
 *
 * - The follow-scrolls in GiftJourneyV2Motion and ProductDiscoveryV2Motion divide their getBoundingClientRect values by
 *   the zoom (or scale) the site draws the visual at, so they stay in CSS px (sellDynamicMotion.ts, useSmoothFollow and
 *   useChatCamera already did). At the drawn size the factor is 1, so nothing changes.
 * - Brand fonts point at the next/font variables, and assets are served from public/images/ai-assistants/v3/assets
 *   (photos as WebP; 05–06's campaigns_bg and the compact_bg frame are the site's own re-exports). motion.css is scoped
 *   under `.aia-motion` (see its header and its "Site" rules).
 *
 * | Visuals | Size | Used in |
 * | --- | --- | --- |
 * | 01–04 `which-one-motion` … `best-value-motion` | 789 × 579 | possibilities/shopper-asks-tabs.tsx |
 * | 05–06 `back-in-stock-motion`, `price-drop-motion` | 620 × 420 | campaigns/use-case-campaigns.tsx |
 * | 07–10 `order-status-motion` … `checkout-motion` | 687 × 586 | logged-in/quote-accordion.tsx |
 * | 11 `app-detail-motion` | 1280 × 599 | brand/brand-aesthetics.tsx |
 * | 12–14 `promo-upgrade`, `promo-offer`, `promo-launches` | 355 × 402 | promotions/promotions.tsx |
 * | 15 `insights-motion` | 1280 × 599 | insights/insights.tsx |
 * | 11m `app-detail-mweb-motion`, 15m `insights-mweb-motion` | 353 × 440 | the same sections, below 768px |
 *
 * The page's window standard (the source's ai-assistants-v3-motion.css) is scoped under the source page's `.hv2` root,
 * which lifts it over the visuals' shared rules; the root here carries `hv2` too (motion.css has `.aia-motion.hv2 …`).
 */


const subscribe = () => () => {};

/**
 * 11 at its desktop layout. The source's component takes an optional `mweb` flag (11m is it with `mweb`, see
 * V3AppDetailMwebMotion), which doesn't fit the scenes' `{ play }` props, so it's registered through this wrapper.
 */
const V3AppDetailDesktopMotion = () => <V3AppDetailMotion />;

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
  return <div className="aia-motion hv2">{client && children}</div>;
}

/*
 * AI Assistants V3 motion visuals 01–15, by the source's slugs, each at its drawn size (11–14
 * without the gallery's tile label, see motion.css). Each plays itself, as in the source: it
 * starts once it is 30% on screen with the tab focused, the chats restart when the viewer comes
 * back, 12–14 land once and stay, and `prefers-reduced-motion` shows the final state. The `play`
 * prop ScenePanel passes is ignored. `duration` is about how long (ms) a visual takes to settle, for the tabs that
 * time their turns by it: 01–06 and 11–15 as timed from the source build; 07–10 from the source's own beats as its
 * phone camera paces them (useCameraBeats: slower typing, a dwell after each send and a closing read).
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
    duration: 18400,
  },
  "exchange-motion": {
    Component: V3ExchangeMotion,
    label: "In ChatGPT on a phone, a customer asks for an exchange or refund; eligibility is checked and the options explained.",
    width: 687,
    height: 586,
    duration: 24600,
  },
  "loyalty-motion": {
    Component: V3LoyaltyMotion,
    label: "In ChatGPT on a phone, a customer asks whether their loyalty benefit applies, checked against their purchase history.",
    width: 687,
    height: 586,
    duration: 16300,
  },
  "checkout-motion": {
    Component: V3CheckoutMotion,
    label: "In ChatGPT on a phone, a customer asks to buy the products they picked; a cart is prepared with eligible offers and continues to checkout.",
    width: 687,
    height: 586,
    duration: 30800,
  },
  "app-detail-motion": {
    Component: V3AppDetailDesktopMotion,
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
  "app-detail-mweb-motion": {
    Component: V3AppDetailMwebMotion,
    label: "ChatGPT's plugin page for Sorelle Labs on a phone: the brand's own app, listed inside ChatGPT.",
    width: 353,
    height: 440,
    duration: 1000,
  },
  "insights-mweb-motion": {
    Component: V3InsightsMwebMotion,
    label: "The merchant's Insights dashboard on a phone: what customers asked in ChatGPT, what they picked, and the carts, orders and support cases that followed.",
    width: 353,
    height: 440,
    duration: 7800,
  },
} satisfies Record<string, SceneEntry>;

export type AiaSceneSlug = keyof typeof aiaScenes;
