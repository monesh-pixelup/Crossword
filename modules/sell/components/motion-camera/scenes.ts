import type { SceneEntry } from "../motion/scene-panel";
import {
  BrowseUpsellCameraMotion,
  BundleBuildingCameraMotion,
  CrossSellCameraMotion,
  UpsellUpgradeCameraMotion,
} from "./sell-camera-motion";

/**
 * Upsell 17b–20b: a phone chat on the 738 × 680 maroon frame, with the camera zooming into each moment. Durations are
 * the measured runs of the source build (to the camera's last move), so each tab waits for its visual to finish.
 */
export const upsellCameraScenes = {
  "upsell-upgrade": {
    Component: UpsellUpgradeCameraMotion,
    label:
      "A shopper says they're looking at a compact air fryer. Knowing they've bought for a family of four, the assistant recommends the larger family model and compares the two: 6L for $99 against 4L for $89.",
    width: 738,
    height: 680,
    duration: 13000,
  },
  "cross-sell": {
    Component: CrossSellCameraMotion,
    label:
      "A shopper says they'll take a gold teardrop pendant. The assistant suggests a matching chain-link bracelet and beaded anklet.",
    width: 738,
    height: 680,
    duration: 11700,
  },
  "bundle-building": {
    Component: BundleBuildingCameraMotion,
    label:
      "A shopper says they're getting a new coffee machine. The assistant suggests bundling it with a milk frother, reusable filter and coffee starter pack, shown as a three-item bundle.",
    width: 738,
    height: 680,
    duration: 13100,
  },
  "browse-upsell": {
    Component: BrowseUpsellCameraMotion,
    label:
      "The assistant points out that the shopper has looked at three headphone models in the $450 to $600 range and suggests a model worth considering at that price point.",
    width: 738,
    height: 680,
    duration: 12200,
  },
} satisfies Record<string, SceneEntry>;
