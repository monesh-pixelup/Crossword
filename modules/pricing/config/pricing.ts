/** Highlight (content doc): what you never pay for. */
export const noFees = ["No platform fee", "No per-seat fees", "No per-resolution fees"];

export type Plan = {
  name: string;
  description: string;
  /** The big figure and the line beside it. */
  amount: string;
  per?: string;
  cta: { label: string; variant: "primary" | "wine-gold" | "outline" };
  /** What the plan includes. Derived from the doc's other sections; TODO: confirm with the Crossword team. */
  features: string[];
  tone: "cream" | "featured" | "sand";
};

/** Pricing options (content doc). The doc gives no prices; the figures restate what it does say. */
export const plans: Plan[] = [
  {
    name: "Free pilot",
    description: "See what Crossword can do with your shoppers, products, and workflows.",
    amount: "Free",
    per: "to start",
    cta: { label: "START YOUR FREE PILOT", variant: "primary" },
    features: ["Every Crossword feature", "Your shoppers, products, and workflows", "Setup and connectors included", "A forward-deployed engineer"],
    tone: "cream",
  },
  {
    name: "Pay-as-you-go",
    description: "Set a monthly spending cap so your bill is never a surprise. Your agent keeps working even if you hit the cap.",
    amount: "$0",
    per: "platform fee, then per credit",
    cta: { label: "BOOK A DEMO", variant: "wine-gold" },
    features: ["Every Crossword feature", "A monthly spending cap you set", "Keeps working at the cap", "Unlimited seats"],
    tone: "featured",
  },
  {
    name: "Scale",
    description: "Committed volume guarantees best pricing. Scale is built for brands ready to put Crossword across more of the customer journey.",
    amount: "Custom",
    cta: { label: "TALK TO SALES", variant: "outline" },
    features: ["Everything in Pay-as-you-go", "Best pricing on committed volume", "More of the customer journey", "A forward-deployed engineer"],
    tone: "sand",
  },
];

export type CreditRow = { label: string; credits: string; note: string };
export type CreditGroup = { title: string; rows: CreditRow[] };

/** What does a credit cover? and Some things never cost a credit (content doc), as one rate table. */
export const creditGroups: CreditGroup[] = [
  {
    title: "Agent conversations and search",
    rows: [
      {
        label: "Most replies",
        credits: "1",
        note: "Finding products, answering questions, checking stock, tracking an order, starting a return or an exchange.",
      },
      { label: "Complex replies", credits: "2", note: "Replies where the agent requires complex thinking." },
      { label: "A typical conversation", credits: "About 5", note: "Across the whole conversation." },
      {
        label: "Visual requests",
        credits: "3",
        note: "A shopper uploads a photo and the agent finds something similar. The replies after it bill at the conversation rate.",
      },
    ],
  },
  {
    // Breaks after “messages,” (the table renders line breaks in group titles).
    title: "Dynamic landing pages, proactive messages,\nand audience builder",
    rows: [
      { label: "Dynamic landing pages", credits: "1 per view", note: "Each page design is custom priced, based on its complexity." },
      { label: "Personalized proactive messages", credits: "1 per message", note: "A proactive message for a specific shopper, charged when it’s shown." },
      { label: "Static proactive messages", credits: "Free", note: "Messages that invite shoppers to chat and are shown to all of them." },
      {
        label: "Audience builder",
        credits: "Free",
        note: "Building segments is free. Sending proactive messages on site is billed per personalized message.",
      },
    ],
  },
  {
    title: "Some things never cost a credit",
    rows: [
      { label: "Adding to cart", credits: "Free", note: "Always free." },
      { label: "Handing off to your team", credits: "Free", note: "Always free." },
      { label: "Setup, connectors, knowledge ingestion, and your branded widget", credits: "Free", note: "Always free." },
    ],
  },
];

export type FeeIcon = "storefront" | "seats" | "resolution";

/** Detailed para (content doc): the same Crossword on every plan. */
export const sameCrossword: { icon: FeeIcon; title: string; body: string }[] = [
  { icon: "storefront", title: "No platform fee", body: "You’re paying for the work Crossword does, not for access to a dashboard." },
  { icon: "seats", title: "No per-seat fees", body: "Add as many people from your team as you need." },
  {
    icon: "resolution",
    title: "No per-resolution fees",
    body: "A conversation doesn’t suddenly cost more because it involved a return, exchange, or closed ticket.",
  },
];

/** How Crossword optimizes (content doc). */
export const outcomes = [
  { title: "Conversion lift", body: "How conversations increase the number of sales." },
  { title: "Basket size", body: "How recommendations grow average order value." },
  { title: "Tickets your team never had to touch", body: "How instant, knowledge-based answers reduce ticket volume." },
  {
    title: "Returns that were never made",
    body: "How product matching gets the shopper to the right purchase the first time, and how a conversation can turn a return request into a solution.",
  },
];

/** Calculator defaults (content doc: prepopulate 2% and 5, but allow override). */
export const calculatorDefaults = { engagementRate: 2, repliesPerConversation: 5 };

/**
 * FAQs (content doc: the starter questions). The doc gives no answers; these restate what the
 * page already says. TODO: confirm all four with the Crossword team, especially expiry and
 * contracts.
 */
export const faqs = [
  {
    q: "What’s a Crossword credit?",
    a: "Credits power engagement: a conversational reply, a personalized message, or a dynamic landing page view. Most replies use 1 credit, and a typical conversation runs about 5.",
  },
  {
    q: "Do credits expire?",
    a: "That depends on your plan. Talk to us and we’ll walk you through it.",
  },
  {
    q: "Can I set a spending limit?",
    a: "Yes. On Pay-as-you-go you set a monthly spending cap, so your bill is never a surprise. Your agent keeps working even if you hit the cap.",
  },
  {
    q: "Is there a contract?",
    a: "Pay-as-you-go needs no committed volume. Scale is built on committed volume, which guarantees the best pricing. Talk to us for the details.",
  },
];
