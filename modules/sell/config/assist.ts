import type { AssistSceneSlug } from "../components/motion/assist";

export type AssistFeature = {
  title: string;
  /** Figma repeats the first description on the next two items and leaves the rest without one. */
  description?: string;
  /** The motion scene the panel plays while this item is open. */
  scene: AssistSceneSlug;
};

// TODO: real descriptions per item once they're designed.
export const assistFeatures: AssistFeature[] = [
  {
    title: "Objection handling",
    description: "Price, shipping, returns, sizing doubt, answered on the spot.",
    scene: "price-objection",
  },
  {
    title: "Turn competitor comparisons into conversions",
    description: "Price, shipping, returns, sizing doubt, answered on the spot.",
    scene: "product-comparison",
  },
  {
    title: "Offer & coupon surfacing",
    description: "Price, shipping, returns, sizing doubt, answered on the spot.",
    scene: "cart-upsell-offer",
  },
  { title: "Stock & availability checks", scene: "stock-availability" },
  { title: "Add-to-cart & checkout assist", scene: "purchase-confirmation" },
  { title: "Page-level auto-suggestions", scene: "decision-support" },
];
