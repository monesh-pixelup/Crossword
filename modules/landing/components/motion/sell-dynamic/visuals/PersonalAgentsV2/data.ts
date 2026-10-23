// Sell: Personal Agents V2 — the V1 agent-to-Crossword exchange (imported
// verbatim from ../PersonalAgents/data), now inside the personal agent's
// own chat with the shopper. Only the shopper's ask and the agent's final
// answer are new copy.
import type { Run } from "../PersonalAgents/data";
export { agent, calls, offer, picks } from "../PersonalAgents/data";

export type Step = 1 | 2 | 3 | 4 | 5 | 6;

export const steps = [
  { label: "Shopper asks" },
  { label: "Consulting Crossword" },
  { label: "Recommendations received" },
  { label: "Offer lookup" },
  { label: "Agent acknowledges" },
  { label: "Answer to shopper" },
] as const;

export const shopper = {
  ask: "Find me a warm wool sweater for winter, under $90.",
};

export const panel = {
  open: "Consulting Crossword",
  done: "Used Crossword",
  lookups: (n: number) => `${n} lookup${n === 1 ? "" : "s"}`,
};

// The agent's answer to the shopper restates what Crossword returned, in
// the agent's voice, and claims nothing Crossword didn't say.
export const answer: Run[] = [
  "Here are two options from Northwick. The ", { b: "Alpine Merino Crewneck" }, " at $85 fits your budget. The ",
  { b: "Alpine Merino Heavyweight" }, " at $98 is $13 more, but its thicker knit holds its shape all season. The ",
  { b: "Winter Knit Edit" }, " also adds a free travel-size wool wash on orders over $95, until November 30.",
];

export const placeholder = "Message your agent";
