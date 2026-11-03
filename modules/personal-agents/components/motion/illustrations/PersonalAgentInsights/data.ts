// Personal Agents → Insights, "You know what happened": Marais' Insights
// dashboard, reporting what shoppers' personal agents (Muse, Grok Bot) did
// through Crossword. Records follow the Personal Agents scenarios (05 and
// 06 verbatim; the return and the trousers question are 04's and 02's
// flows told for Marais). Ages and Marais order numbers are illustrative.
export type Agent = "muse" | "grok";
export type Outcome = "prepared" | "recommended" | "return" | "ordered";

export const personalAgentInsights = {
  query: "What did personal agents do with Crossword this week?",
  thought: "Thought for 3s",
  saved: ["Which personal-agent requests ended in an order?", "Show returns started by personal agents."],
  recent: [
    { text: "Which products do agents recommend most?", age: "1d" },
    { text: "How often do agents use store credit?", age: "3d" },
  ],
  card: {
    source: "Personal agents",
    title: "Marais · Last 7 days",
    columns: ["Source", "Request", "Action", "Outcome"],
    records: [
      {
        agent: "grok" as Agent, age: "2m",
        request: "Find me a wool sweater I can buy with my store credit.",
        action: "Signed the shopper in, applied $128.33 store credit, prepared checkout",
        outcome: "prepared" as Outcome, label: "Checkout prepared", detail: "Awaiting approval",
      },
      {
        agent: "muse" as Agent, age: "18m",
        request: "Find me something from Marais I'd actually like.",
        action: "Combined purchase history, Gold status and Muse's style notes",
        outcome: "recommended" as Outcome, label: "Recommended", detail: "Merino Crewneck · $100.30",
      },
      {
        agent: "muse" as Agent, age: "1h",
        request: "I need to send back the linen shirt dress.",
        action: "Verified order #MR-30871 and eligibility, started the return",
        outcome: "return" as Outcome, label: "Return initiated", detail: "$135 refund pending",
      },
      {
        agent: "grok" as Agent, age: "3h",
        request: "Why these trousers for my commute?",
        action: "Explained fabric, fit and long-inseam options",
        outcome: "ordered" as Outcome, label: "Ordered", detail: "Tailored Trousers · $120",
      },
    ],
  },
};
