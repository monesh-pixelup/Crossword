import type { Icon } from "@phosphor-icons/react";
import { BrowserIcon, ChartLineUpIcon, PackageIcon, TShirtIcon } from "@phosphor-icons/react/ssr";

export type UpsellFeature = {
  /** The motion scene the panel plays while this feature is open (by slug). */
  scene: "upsell-upgrade" | "cross-sell" | "bundle-building" | "browse-upsell";
  /** The icon tile's glyph, from Phosphor (phosphoricons.com). */
  icon: Icon;
  title: string;
  description: string;
};

/** Upsell & cross-sell, as Figma's tabbed panel (node 2914:36238): each feature's glyph, copy and scene. */
export const upsellFeatures: UpsellFeature[] = [
  {
    scene: "upsell-upgrade",
    icon: ChartLineUpIcon,
    title: "Upselling to increase AOV",
    description: "Suggests the better version, when it fits the customer’s needs.",
  },
  {
    scene: "cross-sell",
    icon: TShirtIcon,
    title: "Cross-sell / complete-the-look",
    description: "Adds what naturally goes with what they picked as well as their previous orders.",
  },
  {
    scene: "bundle-building",
    icon: PackageIcon,
    title: "Bundle building",
    description: "Groups products into a bundle worth buying together.",
  },
  {
    scene: "browse-upsell",
    icon: BrowserIcon,
    title: "Browse upselling",
    description: "Notices what they're looking at and nudges accordingly.",
  },
];
