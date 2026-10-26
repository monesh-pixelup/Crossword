import type { AssistSceneSlug } from "../components/motion/assist";

export type AssistFeature = {
  title: string;
  /** Optional; items without one show the title alone. */
  description?: string;
  /** The motion scene the panel plays while this item is open. */
  scene: AssistSceneSlug;
};

export const assistFeatures: AssistFeature[] = [
  {
    title: "Objection handling",
    description: "Price, shipping, returns, sizing doubt, answered on the spot.",
    scene: "price-objection",
  },
  {
    title: "Turn competitor comparisons into conversions",
    description:
      "Show shoppers why your product is the better choice right when they’re comparing, helping reduce decision drop-off and improve ROAS.",
    scene: "product-comparison",
  },
  {
    title: "Offer & coupon surfacing",
    description: "The right discount, shown at the right moment.",
    scene: "cart-upsell-offer",
  },
  {
    title: "Stock & availability checks",
    description: "No dead ends. Just what’s currently in stock.",
    scene: "stock-availability",
  },
  {
    title: "Add-to-cart & checkout assist",
    description:
      "Crossword doesn’t just understand what your customers might like. It helps them act on it, through cart and checkout.",
    scene: "purchase-confirmation",
  },
  {
    title: "Page-level auto-suggestions",
    description: "The relevant prompt on the home page, product page, or cart, automatically.",
    scene: "decision-support",
  },
];
