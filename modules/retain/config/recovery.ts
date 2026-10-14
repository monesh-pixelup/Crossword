export type RecoveryItem = { title: string; description: string };

/** Proactive recovery (content doc): the moments Crossword reaches back out. */
export const recoveryItems: RecoveryItem[] = [
  {
    title: "Cart recovery",
    description: "Brings them back to what they left behind when the timing is right.",
  },
  {
    title: "Browse-abandonment recovery",
    description: "Follows up on what they looked at, even if it never hit the cart.",
  },
  {
    title: "Back-in-stock alerts",
    description: "Tells them the moment it’s available again.",
  },
  {
    title: "Price-drop alerts",
    description: "When the price gets better, Crossword can let you know.",
  },
  {
    title: "Replenishment reminders",
    description: "Reaches out right before they run out, not after.",
  },
];
