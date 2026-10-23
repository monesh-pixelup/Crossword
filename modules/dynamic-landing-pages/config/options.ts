export type DedicatedTab = { label: string; description: string };

/**
 * Dedicated landing pages, as Figma's vertical tabs (node 3121:30680): each component's label and the line shown
 * above its panel, the copy the page's former bento section gave each component. Legal: if the comparison
 * panel later shows a real competitor comparison, it needs a "Based on AI research" disclaimer.
 */
export const dedicatedTabs: DedicatedTab[] = [
  {
    label: "Comparison tools",
    description:
      "Built for the shopper who’s already weighing you against a competitor. Lay the labels, sizes, and prices side by side, and lead with the detail that matters most to that shopper, not a generic feature list.",
  },
  {
    label: "Games and rewards",
    description:
      "A quick, playful moment, collect stars, dodge obstacles, unlock a reward, that turns a passive visit into an active one and hands the shopper a reason (and a discount) to convert now.",
  },
  {
    label: "Bundle and routine",
    description:
      "Understands the complete shopping goal and assembles bundles for them, instead of asking them to build a cart product by product.",
  },
  {
    label: "Chats and quizzes",
    description:
      "A short, conversational quiz meets the shopper where they are, asking one plain question at a time and using the answer to guide them to the right next step instead of making them browse for it.",
  },
  {
    label: "Personalized content",
    description:
      "The exact product from the ad, with the specific details the shopper clicked for, front and center, so there’s no hunting through a catalog to find it again.",
  },
  {
    label: "Offers",
    description:
      "The offer follows the shopper from ad to cart. A welcome perk applied automatically, shown clearly, next to the exact product it applies to.",
  },
];
