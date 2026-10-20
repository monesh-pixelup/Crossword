import type { ComponentType } from "react";
import { BrowseUpsellScene } from "./browse-upsell";
import { BundleBuildingScene } from "./bundle-building";
import { CrossSellScene } from "./cross-sell";
import { UpsellUpgradeScene } from "./upsell-upgrade";

/*
 * The upsell group of Sell motion visuals. Each scene renders at its native
 * size and must be wrapped in <MotionRoot>. `duration` is about how long (ms)
 * the script takes to settle once `play` turns true, from the beat timings
 * (typing has ±30% jitter per character).
 */

export type UpsellScene = {
  Component: ComponentType<{ play?: boolean }>;
  label: string;
  width: number;
  height: number;
  duration: number;
};

export const upsellScenes = {
  "upsell-upgrade": {
    Component: UpsellUpgradeScene,
    label:
      "A shopper says they're looking at a compact air fryer. The assistant recommends the larger family model and compares the two: 6L for $99 against 4L for $89.",
    width: 450,
    height: 500,
    duration: 5900,
  },
  "cross-sell": {
    Component: CrossSellScene,
    label:
      "A shopper buying gold aviator sunglasses is offered a matching leather frame case and a gold-tone silk scarf as product cards with Add to cart buttons.",
    width: 450,
    height: 500,
    duration: 4700,
  },
  "bundle-building": {
    Component: BundleBuildingScene,
    label:
      "A shopper buying an espresso machine is offered a $65 bundle of a milk frother, reusable filter and coffee starter pack, shown as a stacked bundle card.",
    width: 450,
    height: 500,
    duration: 5750,
  },
  "browse-upsell": {
    Component: BrowseUpsellScene,
    label:
      "The assistant points out three headphone models the shopper viewed in the $450 to $600 range and suggests the $699 Auden Wave Pro for its longer battery life.",
    width: 450,
    height: 500,
    duration: 5400,
  },
} satisfies Record<string, UpsellScene>;

export type UpsellSceneSlug = keyof typeof upsellScenes;
