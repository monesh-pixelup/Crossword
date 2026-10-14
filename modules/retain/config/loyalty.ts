export type LoyaltyCard = { title: string; description: string };

/** Loyalty & relationship (content doc, worded as in Figma): the three steps. */
export const loyaltyCards: LoyaltyCard[] = [
  {
    title: "Personalized recommendations from memory",
    description:
      "Suggests based on what your customers bought, liked, their quiz answers and even if they simply visited the page.",
  },
  {
    title: "Loyalty program integration",
    description: "Keeps points, tiers, and rewards part of every conversation.",
  },
  {
    title: "Subscription management",
    description: "Let them pause, skip, or adjust without calling anyone.",
  },
];
