import type { ChatMessage } from "@/modules/support/config/chat";

/** Return reduction (content doc): choosing the right size before checkout. */
export const returnThread: ChatMessage[] = [
  { from: "user", text: "I’m between a small and medium. Which one should I get?" },
  {
    from: "crossword",
    text: "Based on the fit of this style and the measurements you shared, I’d go with a Medium. The Small runs closer through the shoulders. If you prefer a more fitted look, Small could work too.",
  },
  { from: "user", text: "Medium it is." },
  { from: "crossword", text: "Good choice. I’ve added the Medium to your cart." },
];
