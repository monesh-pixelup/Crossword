/** Livery tiles; `scroll` is the maroon tile, filled with the guidelines' scroll damask as the web kit's bento does. */
export type BentoTone = "aubergine" | "forest" | "scroll" | "cream" | "sand";

export type BentoTile = {
  title: string;
  body: string;
  tone: BentoTone;
  /** Dark eyebrow shown on livery tiles. */
  eyebrow?: string;
  /** Spans two of the three columns. */
  wide?: boolean;
  /** The taller first row (420px at desktop). */
  tall?: boolean;
};

/**
 * Components of a dedicated landing page, laid out as Figma's bento: livery tiles never repeat a
 * colour in a row. Legal: any tile that later shows a real competitor comparison needs a
 * "Based on AI research" disclaimer.
 */
export const dedicatedTiles: BentoTile[] = [
  {
    title: "Comparison tools",
    eyebrow: "Compare",
    body: "Built for the shopper who's already weighing you against a competitor. Lay the labels, sizes, and prices side by side, and lead with the detail that matters most to that shopper, not a generic feature list.",
    tone: "aubergine",
    wide: true,
    tall: true,
  },
  {
    title: "Games and rewards",
    eyebrow: "Play",
    body: "A quick, playful moment (collect stars, dodge obstacles, unlock a reward) that turns a passive visit into an active one and hands the shopper a reason, and a discount, to convert now.",
    tone: "forest",
    tall: true,
  },
  {
    title: "Bundle and routine",
    body: "Understands the complete shopping goal and assembles bundles for them, instead of asking them to build a cart product by product.",
    tone: "cream",
  },
  {
    title: "Chats and quizzes",
    body: "A short, conversational quiz meets the shopper where they are, asking one plain question at a time and using the answer to guide them to the right next step.",
    tone: "sand",
  },
  {
    title: "Offers",
    body: "The offer follows the shopper from ad to cart. A welcome perk applied automatically, shown clearly, next to the exact product it applies to.",
    tone: "scroll",
  },
  {
    title: "Personalized content",
    body: "The exact product from the ad, with the specific details the shopper clicked for, front and center, so there's no hunting through a catalog to find it again.",
    tone: "cream",
    wide: true,
  },
];
