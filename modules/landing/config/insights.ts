/** Motion visual shown in the panel while a tab is open (see components/motion). */
export type InsightVisual = "ask-insight" | "revenue-attribution" | "anonymous-traffic";

export type InsightFeature = {
  title: string;
  body: string;
  /** Narrower text measure, as in the Webflow build. */
  narrow?: boolean;
  visual: InsightVisual;
};

export const insightFeatures: InsightFeature[] = [
  {
    title: "No dashboards to dig through. Just ask.",
    body: "Type any business question in plain language and get a real answer, not a chart you have to interpret yourself.",
    narrow: true,
    visual: "ask-insight",
  },
  {
    title: "See exactly what a conversation was worth across touchpoints.",
    body: "Every sale, every channel, every touchpoint is traced back to the conversation that made it happen.",
    visual: "revenue-attribution",
  },
  {
    title: "Even anonymous traffic isn't a mystery anymore.",
    body: "Know your visitors before they introduce themselves. See where they’re coming from and how they’re engaging. When they log in, Crossword connects the dots.",
    visual: "anonymous-traffic",
  },
];

