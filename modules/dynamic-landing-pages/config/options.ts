export type DynamicOption = { tag: string; title: string; description: string; href: string };

/** The two ways to go dynamic (Options in the content doc, titled as in Figma). */
export const dynamicOptions: DynamicOption[] = [
  {
    tag: "Dedicated landing pages",
    title: "Dedicated dynamic landing pages",
    description:
      "Full, ad-specific pages built for a single campaign or audience, with components like quizzes, games, and comparisons built in.",
    href: "#dedicated-landing-pages",
  },
  {
    tag: "Adaptive product pages",
    title: "Dynamic components on existing pages",
    description:
      "Keep your current pages and add dynamic elements where they matter most, like common questions addressed or a personalized summary.",
    href: "#adaptive-product-pages",
  },
];
