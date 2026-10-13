export type DynamicOption = { title: string; description: string; href: string };

/** The two ways to go dynamic (Options in the content doc). */
export const dynamicOptions: DynamicOption[] = [
  {
    title: "Dedicated landing pages",
    description:
      "Full, ad-specific pages built for a single campaign or audience, with components like quizzes, games, and comparisons built in.",
    href: "#dedicated-landing-pages",
  },
  {
    title: "Adaptive product pages",
    description:
      "Keep your current pages and add dynamic elements where they matter most, like common questions addressed or a personalized summary.",
    href: "#adaptive-product-pages",
  },
];
