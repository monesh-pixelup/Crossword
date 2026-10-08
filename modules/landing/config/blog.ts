export type BlogPost = {
  title: string;
  excerpt: string;
  href: string;
};

// TODO: replace with real posts (and slugs) from the CMS.
export const featuredPost: BlogPost & { category: string; coverTitle: [string, string, string] } = {
  title: "The real cost of asking a customer to repeat themselves.",
  excerpt:
    "Crossword gives every customer the experience your best in-store staff used to deliver and runs it across every channel.",
  href: "#blog-real-cost-of-repeating",
  category: "INSIGHT",
  // Cover headline: swash capital, rest of line 1, line 2.
  coverTitle: ["T", "urning Interest ", "into Action."],
};

/** Figma breaks every list excerpt after "your". */
const listExcerpt = [
  "Crossword gives every customer the experience your ",
  "best in-store staff used to deliver and runs it across every channel.",
] as const;

export const recentPosts: (BlogPost & { excerptLines: readonly [string, string] })[] = [
  {
    title: "What luxury retail understood about service that everyone else forgot.",
    excerpt: listExcerpt.join(""),
    excerptLines: listExcerpt,
    href: "#blog-luxury-retail-service",
  },
  {
    title: "The eight seconds that decide whether a customer trusts you.",
    excerpt: listExcerpt.join(""),
    excerptLines: listExcerpt,
    href: "#blog-eight-seconds",
  },
  {
    title: "The real cost of asking a customer to repeat themselves.",
    excerpt: listExcerpt.join(""),
    excerptLines: listExcerpt,
    href: "#blog-real-cost-of-repeating",
  },
];
