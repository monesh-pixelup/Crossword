/** The journal's industry filters, in Figma's order (after "All", see JournalIndex). */
export const blogCategories = [
  "Logistics",
  "Fintech",
  "Healthcare",
  "Commerce",
  "Industrial",
  "Insurance",
  "Software",
  "Staffing",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export type BlogPost = {
  title: string;
  category: BlogCategory;
  /** The line of details under the title (Geist Mono caps), after the category. */
  details: string[];
  href?: string;
};

// The journal's posts. Placeholders from Figma (1660:935) until the real posts are written: every card shares the
// "Turning Interest into Action." cover and this title.
export const blogPosts: BlogPost[] = Array.from({ length: 6 }, () => ({
  title: "The judgement is in the transcript, and the outcome is logged against it.",
  category: "Logistics" as const,
  details: ["Series C", "180 people", "Northeast"],
}));
