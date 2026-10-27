export type LoggedInQuote = {
  /** The customer's question, set in curly quotes. */
  quote: string;
  description: string;
};

/** Logged in experience, as Figma's quote list (node 3305:912): what a signed-in customer asks, and what Crossword does. */
export const loggedInQuotes: LoggedInQuote[] = [
  {
    quote: "“Where’s my order?”",
    description:
      "Customers sign in securely, with no passwords typed into the chat, and ask about delivery. If a human-in-the-loop is needed, the support ticket already has the story attached.",
  },
  {
    quote: "“I need an exchange or refund.”",
    description:
      "Crossword checks eligibility, explains the options, and completes enabled refund or exchange workflows with the required approvals. When a human is needed, it creates a support ticket with the relevant context attached.",
  },
  {
    quote: "“Does my loyalty benefit apply?”",
    description:
      "Crossword checks relevant purchase history and benefit eligibility after authorized sign-in. Crossword combines that brand context with available shopper intent and preferences from ChatGPT to make recommendations and offers more relevant.",
  },
  {
    quote: "“Help me buy these.”",
    description:
      "Crossword prepares a cart with the selected products and eligible offers, then continues to the supported checkout flow. It rechecks pricing and availability before making any commitment. The merchant-hosted checkout remains the default; embedded payment options depend on eligibility.",
  },
];
