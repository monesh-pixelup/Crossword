export type SignalId = "headline" | "benefits" | "reviews" | "compare" | "fit" | "recs";

export type Signal = { id: SignalId; title: string };

/** What changes on the page for a known shopper (from the content doc's personalization copy). */
export const signals: Signal[] = [
  { id: "headline", title: "The headline speaks to their purpose" },
  { id: "benefits", title: "The most relevant benefits come first" },
  { id: "reviews", title: "Reviews focus on the questions they care about" },
  { id: "compare", title: "Comparisons reflect their priorities" },
  { id: "fit", title: "Size, fit, color and budget carry through" },
  { id: "recs", title: "Recommendations account for what they own" },
];

/** The returning shopper the storefront mock-up is personalised for. */
export const shopper = {
  name: "Maya",
  facts: ["3 past orders", "Size M", "Prefers navy", "Budget $150"],
};
