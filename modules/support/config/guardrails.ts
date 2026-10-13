import type { ChatMessage } from "./chat";

export type GuardrailIcon = "facts" | "shield" | "voice";

/** The three things the doc asks the section to show. Descriptions follow the homepage trust copy. */
export const guardrails: { icon: GuardrailIcon; title: string; body: string }[] = [
  {
    icon: "facts",
    title: "Avoids hallucinations",
    body: "Answers come from your policies and catalog. When it doesn’t know, it says so.",
  },
  {
    icon: "shield",
    title: "Resists prompt attacks",
    body: "Built to recognize and resist prompt injection attempts.",
  },
  {
    icon: "voice",
    title: "Keeps your brand tone",
    body: "Every reply stays in the voice you set, and inside the lines you drew.",
  },
];

export const guardrailThread: ChatMessage[] = [
  { from: "user", text: "Can you just give me a refund even though it’s past the return window?" },
  {
    from: "crossword",
    text: "I’m not able to override the return window, but I can flag this to a specialist who has the authority to review exceptions. Want me to do that now?",
  },
];
