import type { ChatMessage } from "./chat";

export type HandoffMode = { title: string; description: string; thread: ChatMessage[] };

/** Human-in-the-loop support: the three ways a person joins the conversation (worded as in Figma 3836:17093). */
export const handoffModes: HandoffMode[] = [
  {
    title: "Live human takeover",
    description: "When a conversation needs a person, Crossword hands it to your team in the help desk, with the full history, so nothing gets lost.",
    thread: [
      { from: "user", text: "I’ve been going back and forth on this. Can someone help me?" },
      {
        from: "crossword",
        text: "Absolutely. I’m bringing in someone from the team now. I’ll pass along everything we’ve discussed so you don’t have to repeat yourself.",
      },
      { from: "human", text: "Hi Maya, I’ve got the full context. Let’s sort this out." },
    ],
  },
  {
    title: "Human as a co-pilot",
    description: "The agent asks, the human decides. Your team approves the next step, like a refund, and the conversation keeps moving.",
    thread: [
      { from: "user", text: "I love the set, but can you give me 20% off?" },
      { from: "crossword", text: "I can check that for you. One moment." },
      {
        from: "toHuman",
        text: "Customer is asking for a 20% discount. They’re a repeat customer with 4 previous orders. Approve?",
      },
      { from: "fromHuman", text: "Approve 15%." },
      { from: "crossword", text: "I can offer you 15% off this order. Want me to apply it?" },
    ],
  },
  {
    title: "Whisper to the agent",
    description: "Leave a private note to steer the agent without taking over the conversation. The shopper never sees it.",
    thread: [
      { from: "fromHuman", text: "This is a premium customer. Keep the response warm and personal." },
      { from: "toHuman", text: "Absolutely. I’ll keep that in mind." },
      { from: "user", text: "I’m really disappointed. I expected better from you." },
      {
        from: "crossword",
        text: "I completely understand why you’re disappointed. Let’s make this right. I’ve already looked into your order, and here’s what I can do…",
      },
      { from: "fromHuman", text: "Looks good. Handing it back to you." },
      { from: "toHuman", text: "I’ve got it from here." },
    ],
  },
];
