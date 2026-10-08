export type InsightFeature = {
  title: string;
  body: string;
  /** Narrower text measure, as in the Webflow build. */
  narrow?: boolean;
};

export const insightFeatures: InsightFeature[] = [
  {
    title: "No dashboards to dig through. Just ask.",
    body: "Type any business question in plain language and get a real answer, not a chart you have to interpret yourself.",
    narrow: true,
  },
  {
    title: "See exactly what a conversation was worth across touchpoints.",
    body: "Every sale, every channel, every touchpoint is traced back to the conversation that made it happen.",
  },
  {
    title: "Even anonymous traffic isn't a mystery anymore.",
    body: "Know your visitors before they introduce themselves. See where they’re coming from and how they’re engaging. When they log in, Crossword connects the dots.",
  },
];

export const insightPrompts = [
  { icon: "users", label: "Find the best user to send campaign to" },
  { icon: "cart", label: "Find repeat cart abandoners" },
  { icon: "funnel", label: "Segment apparel checkout abandoners" },
  { icon: "bell", label: "Announce a new launch" },
] as const;
