import type { StaticImageData } from "next/image";
import iconDashboard from "../assets/plans/icon-dashboard.svg";
import iconTicket from "../assets/plans/icon-ticket.svg";
import iconUsers from "../assets/plans/icon-users.svg";

export type Plan = {
  name: string;
  description: string;
  cta: { label: string; variant: "primary" | "wine-gold" | "outline" };
  tone: "cream" | "featured" | "sand";
};

/** Pricing options (Figma 3156:13342). */
export const plans: Plan[] = [
  {
    name: "Free pilot",
    description: "See what Crossword can do with your shoppers, products, and workflows.",
    cta: { label: "START YOUR FREE PILOT", variant: "primary" },
    tone: "cream",
  },
  {
    name: "Pay-as-you-go",
    description: "Set a monthly spending cap so your bill is never a surprise. Your agent keeps working even if you hit the cap.",
    cta: { label: "BOOK A DEMO", variant: "wine-gold" },
    tone: "featured",
  },
  {
    name: "Scale",
    description: "Committed volume guarantees best pricing. Scale is built for brands ready to put Crossword across more of the customer journey.",
    cta: { label: "TALK TO SALES", variant: "outline" },
    tone: "sand",
  },
];

/** Included in every plan (Figma 3167:13973): what you never pay for. */
export const inclusions: { icon: StaticImageData; title: string; body: string }[] = [
  { icon: iconDashboard, title: "No platform fee", body: "You’re paying for the work Crossword does, not for access to a dashboard." },
  { icon: iconUsers, title: "No per-seat fees", body: "Add as many people from your team as you need." },
  {
    icon: iconTicket,
    title: "No per-resolution fees",
    body: "A conversation doesn’t cost more because it involved a return, exchange, or closed ticket.",
  },
];

/** A rate table row; `null` is a cell with nothing to say (drawn as a short rule). */
export type CreditRow = { label: string; credits: string; billedPer: string | null; note: string | null };

/** What does a credit cover? (Figma 3221:14131). */
export const creditRows: CreditRow[] = [
  { label: "Agent conversations and search", credits: "1–2", billedPer: "Reply", note: "Complex replies are 2" },
  { label: "Visual requests", credits: "3", billedPer: "Photo request", note: "Follow-ups at reply rate" },
  { label: "Dynamic landing pages", credits: "1", billedPer: "Page view", note: "Design priced separately" },
  { label: "Personalized proactive messages", credits: "1", billedPer: "Message shown", note: "Static messages are free" },
  { label: "Audience Builder segments", credits: "Free", billedPer: null, note: "Sending bills as above" },
  { label: "Adding to cart and team handoffs", credits: "Free", billedPer: null, note: null },
  { label: "Setup, connectors and knowledge ingestion", credits: "Free", billedPer: null, note: "Includes branded widget" },
];

/** What Crossword moves (Figma 3161:27801), two to a row. */
export const outcomes = [
  { title: "Conversion lift", body: "How conversations increase the number of sales." },
  { title: "Basket size", body: "How recommendations grow average order value." },
  { title: "Fewer tickets", body: "How instant, knowledge-based answers reduce ticket volume." },
  { title: "Fewer returns", body: "How product matching gets shoppers to the right purchase the first time." },
];

/** Calculator defaults (content doc: prepopulate 2% and 5, but allow override). */
export const calculatorDefaults = { engagementRate: 2, repliesPerConversation: 5 };

/**
 * FAQs (Figma 3156:13890). The doc gives no answers; these restate what the page already says.
 * TODO: confirm all six with the Crossword team, especially expiry and contracts.
 */
export const faqs = [
  {
    q: "What’s a Crossword credit?",
    a: "Credits are used to power engagement, whether it’s a conversational reply, personalized message, or a dynamic landing page.",
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
  {
    q: "What does a pilot include?",
    a: "Everything Crossword does, with your shoppers, products, and workflows. Setup, connectors, knowledge ingestion, and your branded widget are included, with a forward-deployed engineer to get you live.",
  },
  {
    q: "Is there a program for early-stage brands?",
    a: "Yes. If you’re an early-stage ecommerce brand doing under $1M in annual online revenue, apply and join the waitlist for free access to Crossword.",
  },
];
