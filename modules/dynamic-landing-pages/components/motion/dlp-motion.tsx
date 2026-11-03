"use client";

import { type ReactNode, useSyncExternalStore } from "react";
import type { SceneEntry } from "@/modules/sell/components/motion/scene-panel";
import {
  AdaptiveProductPagesV2Motion,
  AdJourneyV2Motion,
  AskAiRightOnPageV2Motion,
  BuildBundleV2Motion,
  ComparisonToolsV2Motion,
  CrossSellV2Motion,
  DedicatedLandingPagesV2Motion,
  DirectAskV2Motion,
  GamesRewardsV2Motion,
  GistUpFrontV2Motion,
  OffersComposerV2Motion,
  PersonalizedContentV2Motion,
  RoasGapV2Motion,
} from "./visuals/SellDynamicV2/SellDynamicV2";
import "./motion.css";

const subscribe = () => () => {};

/**
 * The `.dlp-motion` scope the Sell: Dynamic v2 visuals render in (motion.css is prefixed with it).
 * The visuals are drawn on the client only: they read `prefers-reduced-motion` and the window's
 * focus on their first render, which the server can't know.
 */
export function DlpMotionRoot({ children }: { children: ReactNode }) {
  const client = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return <div className="dlp-motion">{client && children}</div>;
}

/*
 * Sell: Dynamic v2 motion visuals 01–13, by the source's slugs, each at its drawn size. Each
 * plays itself, as in the source: it waits for webfonts, starts once it is on screen with the tab
 * focused, restarts when the viewer comes back, and shows its final state with
 * `prefers-reduced-motion`. The `play` prop ScenePanel passes is ignored. `duration` is about how
 * long (ms) a visual takes to settle, timed from the source build, for the tabs that time their
 * turns by it.
 */
export const dlpScenes = {
  "roas-gap-motion": {
    Component: RoasGapV2Motion,
    label:
      "A Goodwell ad leads to a generic store page: the ad's context is lost along the way, and the shopper drops off.",
    width: 1280,
    height: 600,
    duration: 4000,
  },
  "dedicated-landing-pages-motion": {
    Component: DedicatedLandingPagesV2Motion,
    label: "An Instagram ad for Goodwell sleep gummies becomes its own landing page, the jar flying into the hero.",
    width: 687,
    height: 586,
    duration: 3500,
  },
  "comparison-tools-motion": {
    Component: ComparisonToolsV2Motion,
    label:
      "A shopper searches Goodwell vs Moonrest and lands on a comparison page laying the two brands' labels, pack sizes and prices side by side.",
    width: 738,
    height: 680,
    duration: 6600,
  },
  "games-rewards-motion": {
    Component: GamesRewardsV2Motion,
    label: "A shopper taps an ad into a quick game on the landing page, collects stars and unlocks a reward to use at checkout.",
    width: 738,
    height: 680,
    duration: 21000,
  },
  "build-your-bundle-motion": {
    Component: BuildBundleV2Motion,
    label:
      "A Goodwell gummies ad leads to its landing page, where two quick questions match the shopper to a bundle of gummies to add.",
    width: 738,
    height: 680,
    duration: 20200,
  },
  "ad-journey-motion": {
    Component: AdJourneyV2Motion,
    label: "A shopper taps an ad into a short chat quiz that asks one question at a time and guides them to the right products.",
    width: 738,
    height: 680,
    duration: 21400,
  },
  "personalized-content-motion": {
    Component: PersonalizedContentV2Motion,
    label: "The exact product from the ad lands front and center on the page the shopper clicks through to.",
    width: 738,
    height: 680,
    duration: 6300,
  },
  "offers-composer-motion": {
    Component: OffersComposerV2Motion,
    label:
      "A welcome offer card pops in above the chat composer on the landing page; tapped, the chat opens with the offer and its WELCOME10 code.",
    width: 738,
    height: 680,
    duration: 11400,
  },
  "adaptive-product-pages-motion": {
    Component: AdaptiveProductPagesV2Motion,
    label: "On a product page, the shopper taps Ask AI and a chat drawer opens from the left to answer them.",
    width: 687,
    height: 586,
    duration: 6900,
  },
  "ask-ai-on-page-motion": {
    Component: AskAiRightOnPageV2Motion,
    label: "On a Sorelle Labs product page, the shopper asks the embedded AI panel a question and gets an answer without leaving the page.",
    width: 738,
    height: 760,
    duration: 12400,
  },
  "gist-up-front-motion": {
    Component: GistUpFrontV2Motion,
    label: "A product page's AI summary gives the gist in a few plain sentences, with Show more opening the full detail.",
    width: 738,
    height: 760,
    duration: 6300,
  },
  "direct-ask-motion": {
    Component: DirectAskV2Motion,
    label: "A shopper taps a suggested question in the product page's search bar and gets an answer from its details, reviews and Q&A.",
    width: 738,
    height: 760,
    duration: 6900,
  },
  "upsell-cross-sell-motion": {
    Component: CrossSellV2Motion,
    label: "On a product page, Crossword suggests a natural add-on to what the shopper is already considering.",
    width: 738,
    height: 760,
    duration: 13300,
  },
} satisfies Record<string, SceneEntry>;

export type DlpSceneSlug = keyof typeof dlpScenes;
