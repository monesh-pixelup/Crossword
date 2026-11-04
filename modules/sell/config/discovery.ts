export type DiscoveryFeature = {
  label: string;
  /** Shown beside the panel, above the visual. */
  description?: string;
  href: string;
  /** The motion visual played in the panel (by slug, see motion-v2/scenes.ts). */
  scene: string;
};

export const discoveryFeatures: DiscoveryFeature[] = [
  {
    label: "Conversational discovery",
    description: "Shoppers describe what they want in their own words. Crossword finds the match.",
    href: "#conversational-discovery",
    scene: "conversational-discovery",
  },
  {
    label: "Try it on",
    description:
      "Upload your own image and see how the product looks on you, with image and video experiences that make choosing easier, more visual, and more personal.",
    href: "#try-it-on",
    scene: "try-it-on",
  },
  {
    label: "Deep-dive product Q&A",
    description:
      "Real answers on materials, fit, specs, and care, not a spec sheet dump. Your customers can also compare with other products on your website for better decision making.",
    href: "#product-qa",
    scene: "product-qa",
  },
  {
    label: "Look & outfit building",
    description:
      "Like a certain shirt? Crossword builds the outfit around it, the jeans, the shoes, the sunglasses that go with it, styled for the occasion you need it for.",
    href: "#outfit-building",
    scene: "outfit-building",
  },
  {
    label: "Guided finder, without the form feel",
    description:
      "A few smart questions, asked like a conversation. All to narrow thousands of options down to a few, and in turn increasing the possibility of conversion.",
    href: "#guided-finder",
    scene: "guided-finder",
  },
  {
    label: "Visual discovery",
    description: "See something you like in a photo? Just share the image. Crossword finds it, or the closest thing to it.",
    href: "#visual-discovery",
    scene: "visual-discovery",
  },
  {
    label: "Size & fit guidance",
    description: "Answers the one question that stops most purchases cold.",
    href: "#size-and-fit",
    scene: "size-fit",
  },
  {
    label: "Gift & occasion finder",
    description: "Helps shoppers buy for someone else, confidently.",
    href: "#gift-finder",
    scene: "gift-finder",
  },
];
