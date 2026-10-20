import type { StaticImageData } from "next/image";
import cardChannels from "../assets/storefront/card-channels.webp";
import cardPlacement from "../assets/storefront/card-placement.webp";
import cardWidget from "../assets/storefront/card-widget.webp";

export type UpsellFeature = {
  art: StaticImageData;
  /** The motion scene played in the card's panel (by slug). */
  scene: "upsell-upgrade" | "cross-sell" | "bundle-building" | "browse-upsell";
  title: string;
  description: string;
};

/** Upsell & cross-sell, as Figma's four-card row: each card's panel art (Storefront presence's) and copy. */
export const upsellFeatures: UpsellFeature[] = [
  {
    art: cardWidget,
    scene: "upsell-upgrade",
    title: "Upselling to increase AOV",
    description: "Suggests the better version, when it fits the customer’s needs.",
  },
  {
    art: cardPlacement,
    scene: "cross-sell",
    title: "Cross-sell / complete-the-look",
    description: "Adds what naturally goes with what they picked as well as their previous orders.",
  },
  {
    art: cardChannels,
    scene: "bundle-building",
    title: "Bundle building",
    description: "Groups products into a bundle worth buying together.",
  },
  {
    art: cardChannels,
    scene: "browse-upsell",
    title: "Browse upselling",
    description: "Notices what they're looking at and nudges accordingly.",
  },
];
