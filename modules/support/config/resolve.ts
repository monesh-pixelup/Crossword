import type { ChatMessage } from "./chat";

export type ResolveCase = {
  label: string;
  description: string;
  thread: ChatMessage[];
  /** The motion scene played in the case's panel (by slug). */
  scene: "order-tracking" | "product-usage" | "size-exchange" | "shade-change" | "refund-status" | "return-eligibility";
};

/** Customer support, handled by Crossword: each question type with its example conversation (content doc). */
export const resolveCases: ResolveCase[] = [
  {
    label: "Order status (WISMO)",
    scene: "order-tracking",
    description: "“Where is my order?” answered instantly, with the real tracking status.",
    thread: [
      { from: "user", text: "Where is my order? It’s been a week." },
      {
        from: "crossword",
        text: "It shipped Tuesday and is currently in transit through Chicago, expected by Friday. I’ll send you a message the moment it’s out for delivery, so you don’t have to check back.",
      },
    ],
  },
  {
    label: "Product usage & how-to support",
    scene: "product-usage",
    description: "Helps them use what they bought, not just return it.",
    thread: [
      { from: "user", text: "How much of this vitamin C serum should I use?" },
      {
        from: "crossword",
        text: "Start with 2–3 drops after cleansing, before moisturizer. If your skin is new to vitamin C, try it every other morning first. Want me to add it to a simple morning routine?",
      },
    ],
  },
  {
    label: "Returns & exchanges",
    scene: "size-exchange",
    description: "Starts and tracks the process, no form required.",
    thread: [
      { from: "user", text: "This doesn’t fit. I want to exchange it for a size up." },
      {
        from: "crossword",
        text: "No problem, I’ve started the exchange for the next size up. A prepaid return label is in your email, and the new one ships as soon as the return is scanned. Want me to notify you the moment it does?",
      },
    ],
  },
  {
    label: "Cancellations & modifications",
    scene: "shade-change",
    description: "Changes an order while there’s still time to.",
    thread: [
      { from: "user", text: "I ordered the wrong shade of foundation. Can I change it before it ships?" },
      {
        from: "crossword",
        text: "Yes. Your order hasn’t shipped yet, so I can switch it from Shade 3 Fair to Shade 4 Buff. Want me to make that change?",
      },
    ],
  },
  {
    label: "Refund status",
    scene: "refund-status",
    description: "Tells them exactly where their money is.",
    thread: [
      { from: "user", text: "I returned my serum last week. Where’s my refund?" },
      {
        from: "crossword",
        text: "Your return was received yesterday and the refund has been processed. You should see $48 back on your original payment method within 3–5 business days.",
      },
    ],
  },
  {
    label: "FAQ & policy answers",
    scene: "return-eligibility",
    description: "Pulled straight from your actual policy, not a guess.",
    thread: [
      { from: "user", text: "I opened the protein powder but it’s not working for me. Can I still return it?" },
      {
        from: "crossword",
        text: "Yes. Our policy allows opened supplements to be returned within 30 days, as long as less than 25% of the product has been used. I can walk you through the return.",
      },
    ],
  },
];
