import type { ChatMessage } from "@/modules/support/config/chat";

export type LoyaltyCard = { title: string; description: string; thread: ChatMessage[] };

/** Loyalty & relationship (content doc): each capability with its example conversation. */
export const loyaltyCards: LoyaltyCard[] = [
  {
    title: "Personalized recommendations from memory",
    description:
      "Suggests based on what your customers bought, liked, their quiz answers, and even if they simply visited the page.",
    thread: [
      { from: "user", text: "I need some new coffee beans." },
      {
        from: "crossword",
        text: "You usually go for medium roasts. I found three new ones that are similar to your usual blend. Want to try something different or stick with what you know?",
      },
    ],
  },
  {
    title: "Loyalty program integration",
    description: "Keeps points, tiers, and rewards part of every conversation.",
    thread: [
      {
        from: "crossword",
        text: "As one of our top members, you get early access to the new collection, 48 hours before it goes live to everyone else. Want me to remind you the morning it drops?",
      },
    ],
  },
  {
    title: "Subscription management",
    description: "Let them pause, skip, or adjust without calling anyone.",
    thread: [
      { from: "user", text: "I won’t need my usual order next month." },
      { from: "crossword", text: "No problem. I can skip next month and resume your subscription the following month." },
    ],
  },
];
