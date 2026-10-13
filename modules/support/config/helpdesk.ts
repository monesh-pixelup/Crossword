import type { ChatMessage } from "./chat";

export type InboxStatus = "Active" | "Waiting" | "Escalated";

/** Rows in the Crossword helpdesk mock; the snippets reuse the doc’s example questions. */
export const inboxRows: { customer: string; snippet: string; status: InboxStatus; owner: string }[] = [
  { customer: "Maya R.", snippet: "Where is my order? It’s been a week.", status: "Active", owner: "CW" },
  { customer: "Jordan K.", snippet: "I want to exchange it for a size up.", status: "Waiting", owner: "AL" },
  { customer: "Priya S.", snippet: "I’ve been waiting two weeks for my refund.", status: "Escalated", owner: "SM" },
  { customer: "Elena V.", snippet: "Can I change the shade before it ships?", status: "Active", owner: "CW" },
];

export const helpdeskThread: ChatMessage[] = [
  { from: "brand", text: "I need to see what’s happening with our customer conversations." },
  {
    from: "toHuman",
    text: "You can manage them all in Crossword. See active, waiting, and escalated conversations, assign them to your team, and pick up where the customer left off.",
  },
];

/** Helpdesks named in the content doc; the last tile stands for any other. TODO: swap in logos once supplied. */
export const helpdeskIntegrations = [
  { name: "Zendesk", note: "Two-way sync" },
  { name: "Gorgias", note: "Two-way sync" },
  { name: "Freshdesk", note: "Two-way sync" },
  { name: "Your helpdesk", note: "Ask us about it" },
];
