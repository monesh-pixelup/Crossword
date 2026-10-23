import { sellDynamicProducts } from "../sellDynamicProducts";
const { crewneck, heavyweight } = sellDynamicProducts;

// Sell: Personal Agents — a shopper's own AI agent consults Crossword on
// the merchant's behalf. Dialogue is the brief's, verbatim.
export const brand = "Northwick";

// Static states the motion pass will step through. Every timeline item
// names the state it first appears in; the composition at state N shows
// everything up to N.
export type State = 1 | 2 | 3 | 4 | 5;

export const states = [
  { state: 1, label: "Request received" },
  { state: 2, label: "Consulting Crossword" },
  { state: 3, label: "Recommendations received" },
  { state: 4, label: "Checking offers" },
  { state: 5, label: "Task completed" },
] as const;

export const agent = {
  label: "Personal agent",
  status: "Working",
  ask: "My user wants a warm wool sweater for winter, under $90.",
  followUp: "Any current offers?",
  close: "Noted. I’ll show both options to my user, with the free wool wash offer.",
};

// Inline runs: `b` marks a named product or offer in Crossword's reply.
export type Run = string | { b: string };

export interface Pick {
  id: string;
  name: string;
  price: string;
  image: string;
}

export const picks: Pick[] = [
  { id: "crewneck", name: "Alpine Merino Crewneck", price: "$85", image: crewneck },
  { id: "heavyweight", name: "Alpine Merino Heavyweight", price: "$98", image: heavyweight },
];

// Each call: `state` is when the tool call opens, `returned` is when
// Crossword's answer lands inside it.
export const calls = {
  products: {
    state: 2,
    returned: 3,
    topic: "Products",
    reply: [
      "The ", { b: "Alpine Merino Crewneck" }, " at $85 fits the budget. There’s also the ",
      { b: "Alpine Merino Heavyweight" }, " at $98. It’s $13 more, but the knit is thicker and holds its shape longer, so it’s better value if they plan to wear it all season.",
    ] as Run[],
  },
  offers: {
    state: 4,
    returned: 4,
    topic: "Offers",
    reply: [
      "Yes. The ", { b: "Winter Knit Edit" }, " launches this week, with a free travel-size wool wash on orders over $95. It’s valid until November 30 and limited to one per customer.",
    ] as Run[],
  },
} as const;

export const offer = {
  title: "Winter Knit Edit",
  detail: "Free travel-size wool wash over $95",
  terms: "Until Nov 30 · 1 per customer",
};
