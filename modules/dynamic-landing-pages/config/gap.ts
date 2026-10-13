export type GapIcon = "ad" | "page" | "broken" | "matched" | "bag" | "crossword";

export type GapStep = { icon: GapIcon; label: string; note: string };

export type GapLane = {
  label: string;
  /** "broken": dashed, fading rule that snaps before the last step; "closed": a solid gold rule. */
  tone: "broken" | "closed";
  steps: GapStep[];
};

/** The doc's diagram suggestion (Ad > Static page > Broken journey), and the same click with Crossword. */
export const gapLanes: GapLane[] = [
  {
    label: "Today",
    tone: "broken",
    steps: [
      { icon: "ad", label: "Your ad", note: "A specific product, offer and audience" },
      { icon: "page", label: "Static page", note: "The same generic page everyone sees" },
      { icon: "broken", label: "Broken journey", note: "The click is won, the sale is lost" },
    ],
  },
  {
    label: "With Crossword",
    tone: "closed",
    steps: [
      { icon: "ad", label: "Your ad", note: "A specific product, offer and audience" },
      { icon: "crossword", label: "Crossword", note: "Builds the page around the ad" },
      { icon: "matched", label: "Matched page", note: "Same headline, product and offer" },
      { icon: "bag", label: "Conversion", note: "The click becomes a sale" },
    ],
  },
];

export type GapColumn = { title: string; body: string[] };

export const gapColumns: GapColumn[] = [
  {
    title: "The click",
    body: [
      "A specific product, a specific offer, a specific audience, all carefully built into the ad. Then the click lands on the same generic page everyone sees.",
    ],
  },
  {
    title: "The result",
    body: ["You spend to win the click, but lose the opportunity to convert it."],
  },
  {
    title: "Crossword closes the gap",
    body: [
      "Instead of sending every ad to the same landing page, Crossword builds the page around the ad, the headline, the product, the offer, so the experience after the click feels like a continuation of the ad, not a disconnected destination.",
    ],
  },
];
