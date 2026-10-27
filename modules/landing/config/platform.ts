export type PlatformCard = {
  title: string;
  paragraphs: string[];
  /** Narrower text measure (px), as in the Webflow build. */
  narrow?: number;
};

export const platformCards: PlatformCard[] = [
  {
    title: "Complex thinking simplified",
    paragraphs: [
      "Underneath every reply, multiple specialized agents work in sequence. Crossword understands what's being asked, checks it against your guardrails, pulls the relevant data, and decides what to do next, all before your customer notices a thing. It's not one model guessing. It's an orchestrated system, trained on your brand voice, that learns from every interaction and improves without anyone retraining it by hand.",
    ],
  },
  {
    title: "Context changes everything",
    paragraphs: [
      "Crossword brings together customer identity, consent, behavior, intent, memory, orders, returns, catalog knowledge and analytics to give every interaction the context behind the message. So the AI isn't simply responding to what a customer just said; it's understanding who they are, what they've done, what they're trying to accomplish and what should happen next.",
    ],
    narrow: 453.973,
  },
  {
    title: "Intelligence needs guardrails",
    // Shortened from the doc's four paragraphs so the card matches the other two in length (and doesn't overflow).
    paragraphs: [
      "Beneath it all are the controls businesses need to operate AI at scale,  permissions, PII protection, evaluations, observability, cost controls and security. Crossword connects the intelligence layer across web, mobile and emerging AI surfaces, along with integrations with commerce, CRM, helpdesk and messaging platforms. What looks like a simple customer conversation on the outside is a coordinated system of agents, models, workflows, data, integrations and guardrails working together.",
    ],
  },
];
