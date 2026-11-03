import vitaminCSerumImage from "@/modules/support/assets/motion-v4/scenarios/product-usage/vitamin-c-serum.webp";
import foundationImage from "@/modules/support/assets/motion-v4/scenarios/shade-change/foundation.webp";

const vitaminCSerum = vitaminCSerumImage.src;
const foundation = foundationImage.src;

// Support V3 — six standalone support conversations. Dialogue is the
// supplied script verbatim; everything in the supporting modules is
// restated from that same dialogue (no order numbers, dates, product
// names or statuses beyond what the script itself says).
export const brand = "Sorelle Labs";

export const orderTracking = {
  userMessage: "Where is my order? It's been a week.",
  assistantMessage:
    "It shipped Tuesday and is currently in transit through Chicago, expected by Friday. I'll send you a message the moment it's out for delivery, so you don't have to check back.",
  status: "In transit",
  eta: "Expected by Friday",
  steps: [
    { label: "Shipped", detail: "Tuesday", state: "done" },
    { label: "In transit", detail: "Chicago", state: "current" },
    { label: "Out for delivery", detail: "We'll message you", state: "upcoming" },
  ] as const,
};

export const productUsage = {
  // The shopper is asking about "this" serum — a product they're already
  // looking at, so it rides on their turn as a Product/Reference.
  product: { image: vitaminCSerum, alt: "Sorelle Labs Vitamin C Serum", title: "Vitamin C Serum" },
  userMessage: "How much of this vitamin C serum should I use?",
  assistantMessage:
    "Start with 2–3 drops after cleansing, before moisturizer. If your skin is new to vitamin C, try it every other morning first. Want me to add it to a simple morning routine?",
  // Reuses the same StatusSteps timeline as 01/03 — "current" repurposed
  // to mean "the step being asked about," not "in progress now".
  // Every tab needs its own sub-head — Cleanse/Moisturizer have no dose of
  // their own, so their sub-heads restate the script's own ordering
  // language ("after cleansing, before moisturizer") rather than
  // inventing a new fact.
  steps: [
    { label: "Cleanse", detail: "Before serum", state: "done" },
    { label: "Vitamin C serum", detail: "2–3 drops", state: "current" },
    { label: "Moisturizer", detail: "After serum", state: "upcoming" },
  ] as const,
  cta: "Add to cart",
};

export const sizeExchange = {
  userMessage: "This doesn't fit. I want to exchange it for a size up.",
  assistantMessage:
    "No problem, I've started the exchange for the next size up. A prepaid return label is in your email, and the new one ships as soon as the return is scanned. Want me to notify you the moment it does?",
  heading: "Exchange",
  status: "Started",
  // No sizes are given in the script, so the swap is described
  // relatively ("current" / "next size up") instead of inventing values.
  swap: [
    { label: "Returning", value: "Current size" },
    { label: "Sending", value: "Next size up" },
  ],
  steps: [
    { label: "Prepaid return label", detail: "In your email", state: "done" },
    { label: "New size ships", detail: "As soon as the return is scanned", state: "upcoming" },
  ] as const,
};

export const shadeChange = {
  userMessage: "I ordered the wrong shade of foundation. Can I change it before it ships?",
  assistantMessage:
    "Yes. Your order hasn’t shipped yet, so I can switch it from Shade 3 Fair to Shade 4 Buff. Want me to make that change?",
  product: { image: foundation, alt: "Sorelle Labs Foundation in the shopper's order", title: "Foundation" },
  status: "Not shipped yet",
  // Swatch fills are product data (the shade itself), not system colors —
  // replace with the merchant's real shade swatches.
  from: { label: "In your order", shade: "Shade 3 Fair", swatch: "#efd3bd" },
  to: { label: "Switch to", shade: "Shade 4 Buff", swatch: "#e2bc9a" },
  confirm: "Make the change",
  decline: "Keep Shade 3 Fair",
};

export const refundStatus = {
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

export const merchantHelpdesk = {
  // The speaker here is the brand's own team, not a shopper — Crossword's
  // merchant-facing helpdesk surface, so the embedded module is support
  // operations data (queue counts, assignable conversations), not a
  // product result.
  userMessage: "I need to see what’s happening with our customer conversations.",
  assistantMessage:
    "You can manage them all in Crossword. See active, waiting, and escalated conversations, assign them to your team, and pick up where the customer left off.",
  // "Operational Queue" layout — design feedback replacing the earlier
  // Figma-literal version (filled Assign/Open pills, a separate status
  // chip per row): flatter hierarchy, a named inbox + "view all" on top,
  // a "Needs attention" section for the list below it.
  inboxLabel: "Team inbox",
  allConversationsLabel: "All conversations",
  attentionLabel: "Needs attention",
  overview: [
    { label: "Active", value: "12" },
    { label: "Waiting", value: "4" },
    { label: "Escalated", value: "2" },
  ],
  // Issue + status now read as one line ("Delivery issue · Escalated")
  // instead of a separate status chip. `action` is only set where the row
  // has a real next step (Assign); its absence renders a subtle chevron
  // instead, per feedback.
  conversations: [
    { name: "Alex Chen", issue: "Delivery issue", status: "Escalated", action: "Assign" as string | undefined },
    { name: "Sophie Moore", issue: "Return request", status: "Waiting", action: undefined as string | undefined },
  ],
};

export const merchantInsight = {
  // Its own brand label (node 2725:29703 etc.) — distinct from the
  // shared `brand` above, which the other seven scenarios (including 07
  // Merchant helpdesk) use. This scene's reference instances all show
  // "Marais", not "Sorelle Labs", so it's kept as its own constant
  // rather than overwritten to match the rest of the set.
  brand: "Marais",
  userMessage: "I need to see what’s happening with our customer conversations.",
  context:
    "They’re a returning customer with 6 orders. They’re asking about a delayed refund for order #4821. They’ve visited the returns page twice and spent 3 minutes on the refund policy. Previous conversations show they prefer email updates.",
  followUpMessage: "Anything else I should know?",
  resolution: "The refund is approved but hasn’t reached the payment processor yet. I can draft the response for you.",
};

export const guardrails = {
  userMessage: "I need to see what’s happening with our customer conversations.",
  assistantMessage:
    "I can't override the return window, but I can flag this to a specialist who can review exceptions.",
  policyChip: "Policy Respected",
  heading: "Your guardrails",
  // Node 2743:33835 gives each row its own title and leading icon; the
  // per-row subcopy was dropped in review (31 Oct 2026).
  rules: [
    { title: "Refund policy", icon: "money" as const },
    { title: "Tone of voice", icon: "userSound" as const },
    { title: "Escalation", icon: "warning" as const },
  ],
};

export const humanTakeover = {
  userMessage: "I’ve been going back and forth on this. Can someone help me?",
  assistantMessage:
    "Absolutely. I’m bringing in someone from the team now. I’ll pass along everything we’ve discussed so you don’t have to repeat yourself.",
  // "the team" is lifted from the assistant line above, not an invented name
  // the script never gives the human agent.
  handoffLabel: "From the team",
  humanMessage: "Hi Maya, I’ve got the full context. Let’s sort this out.",
};

export const merchantApproval = {
  userMessage: "I love the set, but can you give me 20% off?",
  checkingMessage: "I can check that for you. One moment.",
  // Merchant-side only — Crossword's request to the human never reaches
  // the shopper's own thread on the right.
  requestMessage:
    "Customer is asking for a 20% discount. They’re a repeat customer with 4 previous orders. Approve?",
  decision: "Approve 15%",
  offerMessage: "I can offer you 15% off this order. Want me to apply it?",
  // UI chrome, not script dialogue — marks the card/popout as merchant-only.
  privacyLabel: "Private · Only visible to your team",
};

export const whisperToAgent = {
  whisperMessage: "This is a premium customer. Keep the response warm and personal.",
  userMessage: "I’m really disappointed. I expected better from you.",
  assistantMessage:
    "I completely understand why you’re disappointed. Let’s make this right. I’ve already looked into your order, and here’s what I can do…",
  // The whisper's named sender, for the floating card's Assistant/Insight
  // card (node 2742:33561) — that node's own example copy is literally
  // "Alex from Sorelle Labs", matching this set's own `brand` above.
  whisperSender: "Alex",
  guidanceReceivedLabel: "Guidance received.",
};

export const returnEligibility = {
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
