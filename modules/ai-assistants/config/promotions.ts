import type { AiaSceneSlug } from "../components/motion/aia-motion";

export type PromotionStep = {
  title: string;
  description: string;
  /** The step's motion visual (355 × 402), shown in its cell in place of the stamped card; the card without one. */
  scene?: AiaSceneSlug;
};

/** Promotions & upselling (Figma 3305:1197): the three numbered steps under the headline. */
export const promotionSteps: PromotionStep[] = [
  {
    title: "Upgrades that make sense to the buyer",
    scene: "promo-upgrade",
    description:
      "When a higher tier suits the shopper better, Crossword suggests it. It explains what they get for the extra cost, so they can decide with the full picture.",
  },
  {
    title: "Offers shoppers would otherwise miss",
    scene: "promo-offer",
    description:
      "Your site shows off new products, special offers and bundles, but shoppers in ChatGPT never see those placements. Crossword brings the relevant ones into the chat and explains why they matter to that shopper.",
  },
  {
    title: "Launches and best sellers up front",
    scene: "promo-launches",
    description:
      "With Crossword, launches, seasonal collections and featured products show when they match the shopper’s needs. Eligibility conditions and discount limits are never lost.",
  },
];
