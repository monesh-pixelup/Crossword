import type { LoggedInQuote } from "@/modules/ai-assistants/config/logged-in";

/** Not just another generic agent (Figma 3308:453): what a signed-in customer's agent asks, and what Crossword does. */
export const agentQuotes: LoggedInQuote[] = [
  {
    quote: "“I need to send it back.”",
    description:
      "After the customer signs in and gives permission, Crossword handles orders, returns, exchanges, and support tickets directly with the personal agent.",
  },
  {
    quote: "“Find me a sweater with my store credit.”",
    description:
      "After sign in, Crossword helps the personal agent access the shopper’s account, make fully informed selections, and checkout.",
  },
  {
    quote: "“Something I like.”",
    description:
      "Crossword combines relevant shopper purchase history, loyalty eligibility, and previous support context with available preferences from the customer’s personal agent.",
  },
];
