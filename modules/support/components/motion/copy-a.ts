import foundationPhoto from "../../assets/motion/foundation.webp";
import vitaminSerumPhoto from "../../assets/motion/vitamin-c-serum.webp";
import type { SupportStep } from "./parts-a";

/*
 * Copy of the support motion scenes 01–07, verbatim from the support scene
 * chunk (minified names in brackets).
 */

/** The store every scene's chat widget belongs to. [k] */
export const supportBrand = "Sorelle Labs";

/** 01 — Order tracking. [F] */
export const orderTrackingCopy = {
  userMessage: "Where is my order? It's been a week.",
  assistantMessage:
    "It shipped Tuesday and is currently in transit through Chicago, expected by Friday. I'll send you a message the moment it's out for delivery, so you don't have to check back.",
  status: "In transit",
  eta: "Expected by Friday",
  steps: [
    { label: "Shipped", detail: "Tuesday", state: "done" },
    { label: "In transit", detail: "Chicago", state: "current" },
    { label: "Out for delivery", detail: "We'll message you", state: "upcoming" },
  ] satisfies SupportStep[],
};

/** 02 — Product usage guidance. [P] */
export const productUsageCopy = {
  product: { image: vitaminSerumPhoto.src, alt: "Sorelle Labs Vitamin C Serum", title: "Vitamin C Serum" },
  userMessage: "How much of this vitamin C serum should I use?",
  assistantMessage:
    "Start with 2–3 drops after cleansing, before moisturizer. If your skin is new to vitamin C, try it every other morning first. Want me to add it to a simple morning routine?",
  steps: [
    { label: "Cleanse", detail: "Before serum", state: "done" },
    { label: "Vitamin C serum", detail: "2–3 drops", state: "current" },
    { label: "Moisturizer", detail: "After serum", state: "upcoming" },
  ] satisfies SupportStep[],
  cta: "Add to cart",
};

/** 03 — Size exchange. [E] */
export const sizeExchangeCopy = {
  userMessage: "This doesn't fit. I want to exchange it for a size up.",
  assistantMessage:
    "No problem, I've started the exchange for the next size up. A prepaid return label is in your email, and the new one ships as soon as the return is scanned. Want me to notify you the moment it does?",
  heading: "Exchange",
  status: "Started",
  swap: [
    { label: "Returning", value: "Current size" },
    { label: "Sending", value: "Next size up" },
  ],
  steps: [
    { label: "Prepaid return label", detail: "In your email", state: "done" },
    { label: "New size ships", detail: "As soon as the return is scanned", state: "upcoming" },
  ] satisfies SupportStep[],
};

/** 04 — Change foundation shade. [C] */
export const shadeChangeCopy = {
  userMessage: "I ordered the wrong shade of foundation. Can I change it before it ships?",
  assistantMessage:
    "Yes. Your order hasn’t shipped yet, so I can switch it from Shade 3 Fair to Shade 4 Buff. Want me to make that change?",
  product: { image: foundationPhoto.src, alt: "Sorelle Labs Foundation in the shopper's order", title: "Foundation" },
  status: "Not shipped yet",
  from: { label: "In your order", shade: "Shade 3 Fair", swatch: "#efd3bd" },
  to: { label: "Switch to", shade: "Shade 4 Buff", swatch: "#e2bc9a" },
  confirm: "Make the change",
  decline: "Keep Shade 3 Fair",
};

/** 05 — Refund status. [I] */
export const refundStatusCopy = {
  userMessage: "I returned my serum last week. Where’s my refund?",
  assistantMessage:
    "Your return was received yesterday and the refund has been processed. You should see $48.25 back on your original payment method within 3–5 business days.",
  label: "Refund",
  amount: "$48.25",
  status: "Processed",
  facts: [
    { label: "Return", value: "Received yesterday" },
    { label: "Back to", value: "Original payment method" },
    { label: "Arrives in", value: "3–5 business days" },
  ],
};

/** 06 — Return eligibility. [V] */
export const returnEligibilityCopy = {
  userMessage: "I opened the protein powder but it’s not working for me. Can I still return it?",
  assistantMessage:
    "Yes. Our policy allows opened supplements to be returned within 30 days, as long as less than 25% of the product has been used. I can walk you through the return.",
  status: "Eligible for return",
  conditions: [
    { value: "30 days", label: "Return window" },
    { value: "Less than 25%", label: "Product used" },
  ],
  cta: "Start return",
};

/** 07 — Merchant helpdesk overview. [T] */
export const merchantHelpdeskCopy = {
  userMessage: "I need to see what’s happening with our customer conversations.",
  assistantMessage:
    "You can manage them all in Crossword. See active, waiting, and escalated conversations, assign them to your team, and pick up where the customer left off.",
  inboxLabel: "Team inbox",
  allConversationsLabel: "All conversations",
  attentionLabel: "Needs attention",
  overview: [
    { label: "Active", value: "12" },
    { label: "Waiting", value: "4" },
    { label: "Escalated", value: "2" },
  ],
  conversations: [
    { name: "Alex Chen", issue: "Delivery issue", status: "Escalated", action: "Assign" },
    { name: "Sophie Moore", issue: "Return request", status: "Waiting", action: undefined },
  ],
};
