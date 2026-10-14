export type AdaptiveId = "ask" | "gist" | "direct" | "upsell";

export type AdaptiveFeature = { id: AdaptiveId; title: string; description: string };

/** Dynamic components Crossword adds to an existing product page (copy from Figma). */
export const adaptiveFeatures: AdaptiveFeature[] = [
  {
    id: "ask",
    title: "Ask AI, right on the page",
    description:
      "An AI panel embedded on the product display page (PDP) that goes beyond static details, letting shoppers ask about the product, compare options, or see accessories without leaving the page. Suggested prompts do the work of intuiting what they’d want to ask next.",
  },
  {
    id: "gist",
    title: "The gist, up front",
    description:
      "A short AI-generated summary pulls the details that actually matter into a few plain sentences up front. Shoppers get the gist in seconds, with a “Show more” for anyone who wants the full detail.",
  },
  {
    id: "direct",
    title: "Your customer asks directly",
    description:
      "A dedicated search bar for direct questions pre-loaded with the ones shoppers usually ask. Type a new one or tap a suggestion and get an answer pulled straight from details, reviews, and Q&A.",
  },
  {
    id: "upsell",
    title: "Crossword finds ways to upsell & cross-sell",
    description:
      "From a natural add-on to a better upgrade, recommendations feel useful to the shopper. Crossword suggests what to buy next based on what the customer is already considering, their preferences and what they’ve bought before.",
  },
];

/** The merchant product the stage's mock-up shows (the content doc's dynamic landing page example). */
export const pdp = {
  brand: "Field & Root",
  name: "Ashwagandha 600mg Capsules",
  price: "$29",
  rating: "4.8",
  reviews: "212 reviews",
  prompts: ["How do I take it?", "Can I take it with coffee?", "How long until I notice results?"],
  ask: {
    question: "When should I take this, morning or night?",
    answer:
      "Either works. Most people take it with a meal, and evening is popular if you're using it to wind down. Pick a time you'll stick to, since consistency matters more than timing.",
  },
  gist: "A once-daily 600mg ashwagandha capsule for everyday stress and winding down. Take it with a meal, morning or night. Consistency matters more than timing.",
  direct: {
    question: "Can I take it with my multivitamin?",
    answer:
      "Generally yes. Check the label for overlapping ingredients, and if you're on medication or have a health condition, it's best to confirm with your doctor first.",
    source: "From product details and Q&A",
  },
  alsoConsider: [
    { name: "Magnesium Glycinate", note: "Relaxation & winding down · Capsules", price: "$24" },
    { name: "Sleep Support Blend", note: "Stress-related sleep support · Gummies", price: "$32" },
  ],
};
