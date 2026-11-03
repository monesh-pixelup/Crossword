import type { DlpSceneSlug } from "../components/motion/dlp-motion";

export type DedicatedTab = {
  label: string;
  description: string;
  /** The motion visual played in the component's panel (by slug). */
  scene: DlpSceneSlug;
};

/**
 * Dedicated landing pages, as Figma's vertical tabs (node 3121:30680): each component's label and the line shown
 * above its panel, the copy the page's former bento section gave each component. Legal: if the comparison
 * panel later shows a real competitor comparison, it needs a "Based on AI research" disclaimer.
 */
export const dedicatedTabs: DedicatedTab[] = [
  {
    label: "Comparison tools",
    scene: "comparison-tools-motion",
    description:
      "Built for the shopper who’s already weighing you against a competitor. Lay the labels, sizes, and prices side by side, and lead with the detail that matters most to that shopper, not a generic feature list.",
  },
  {
    label: "Games and rewards",
    scene: "games-rewards-motion",
    description:
      "A quick, playful moment, collect stars, dodge obstacles, unlock a reward, that turns a passive visit into an active one and hands the shopper a reason (and a discount) to convert now.",
  },
  {
    label: "Bundle and routine",
    scene: "build-your-bundle-motion",
    description:
      "Understands the complete shopping goal and assembles bundles for them, instead of asking them to build a cart product by product.",
  },
  {
    label: "Chats and quizzes",
    scene: "ad-journey-motion",
    description:
      "A short, conversational quiz meets the shopper where they are, asking one plain question at a time and using the answer to guide them to the right next step instead of making them browse for it.",
  },
  {
    label: "Personalized content",
    scene: "personalized-content-motion",
    description:
      "The exact product from the ad, with the specific details the shopper clicked for, front and center, so there’s no hunting through a catalog to find it again.",
  },
  {
    label: "Offers",
    scene: "offers-composer-motion",
    description:
      "The offer follows the shopper from ad to cart. A welcome perk applied automatically, shown clearly, next to the exact product it applies to.",
  },
];

export type DynamicOption = {
  title: string;
  description: string;
  /** The motion visual played in the options panel while this option is in focus (by slug). */
  scene: DlpSceneSlug;
};

/** The two ways to go dynamic (Figma "Section · Options", 3361:299). */
export const dynamicOptions: DynamicOption[] = [
  {
    title: "Dedicated landing pages",
    scene: "dedicated-landing-pages-motion",
    description:
      "Full, ad-specific pages built for a single campaign or audience, with components like quizzes, games, and comparisons built in.",
  },
  {
    title: "Adaptive product pages",
    scene: "adaptive-product-pages-motion",
    description:
      "Keep your current pages and add dynamic elements where they matter most, like common questions addressed or a personalized summary.",
  },
];
