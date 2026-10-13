import type { OutboundMessage } from "./messages";

export type RecoveryItem = { title: string; description: string; message: OutboundMessage };

/**
 * Proactive recovery (content doc): each moment with the message Crossword sends. The timestamp
 * lines after the first and the attached products are mock-up detail, not doc copy.
 */
export const recoveryItems: RecoveryItem[] = [
  {
    title: "Cart recovery",
    description: "Brings them back to what they left behind when the timing is right.",
    message: {
      when: "iMessage · 2 hours after the cart was left",
      text: "Still thinking about the jacket you added? It’s still in your size, and I can hold your cart for 24 more hours if you need a bit more time.",
      attachment: { name: "Quilted field jacket", meta: "Size M · In your cart", price: "$168" },
    },
  },
  {
    title: "Browse-abandonment recovery",
    description: "Follows up on what they looked at, even if it never hit the cart.",
    message: {
      when: "iMessage · The next morning",
      text: "Still looking for a new handbag? The one you spent the most time on is back in stock, and I found two similar options you might like. Want to see them?",
      attachment: { name: "Structured leather tote", meta: "Back in stock", price: "$245" },
    },
  },
  {
    title: "Back-in-stock alerts",
    description: "Tells them the moment it’s available again.",
    message: {
      when: "iMessage · Just restocked",
      text: "Good news, the moisturizer you were looking at is back in stock in your preferred shade.",
      attachment: { name: "Tinted daily moisturizer", meta: "Your shade · Back in stock", price: "$42" },
    },
  },
  {
    title: "Price-drop alerts",
    description: "When the price gets better, Crossword can let you know.",
    message: {
      when: "iMessage · The price just dropped",
      text: "You were looking at this serum earlier. It’s now 20% off with a new coupon. Want to use it before the offer ends?",
      attachment: { name: "Vitamin C serum", meta: "20% off with your coupon", price: "$38" },
    },
  },
  {
    title: "Replenishment reminders",
    description: "Reaches out right before they run out, not after.",
    message: {
      when: "iMessage · Around restock time",
      text: "Running low on your usual serum? It’s around the time you normally restock. Want me to add it to your cart?",
      attachment: { name: "Your usual serum", meta: "Reorder in one tap", price: "$48" },
    },
  },
];
