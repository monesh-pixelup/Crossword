import type { ChatMessage } from "./chat";

/** What the person taking over can see (content doc: “Every conversation, workflow, order…”). */
export const controlSignals = ["Every conversation", "Workflows", "Orders", "Pages viewed", "Notes", "Stuck moments"];

/** The customer card in the console mock, built from the facts in the doc’s example. */
export const controlCustomer = {
  name: "Returning customer",
  meta: "6 orders · Prefers email updates",
  context: [
    { label: "Open issue", value: "Delayed refund, order #4821" },
    { label: "Returns page", value: "Visited twice" },
    { label: "Refund policy", value: "3 minutes on the page" },
    { label: "Refund", value: "Approved, not yet at the processor" },
  ],
};

/** The private exchange between the person and Crossword (content doc). */
export const controlThread: ChatMessage[] = [
  { from: "fromHuman", text: "Give me the context before I respond." },
  {
    from: "toHuman",
    text: "They’re a returning customer with 6 orders. They’re asking about a delayed refund for order #4821. They’ve visited the returns page twice and spent 3 minutes on the refund policy. Previous conversations show they prefer email updates.",
  },
  { from: "fromHuman", text: "Anything else I should know?" },
  {
    from: "toHuman",
    text: "The refund is approved but hasn’t reached the payment processor yet. I can draft the response for you.",
  },
];
