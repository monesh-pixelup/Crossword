/** Managed launch and progress (content doc): what each side commits to. */
export const commitments = [
  { label: "Your commitment", value: "30", unit: "minutes a week." },
  { label: "Our commitment", value: "Everything", unit: "else." },
];

/** How it works (Figma "ALT · How it works"): the cycle, then six to-do cards, each a title over its lines. */
export const cycle = "Goal > Journeys > Launch > Learn > Improve > Repeat";

export const howSteps: { title: string; lines: string[] }[] = [
  { title: "Start with the goal", lines: ["You tell us what you’re trying to move.", "We help identify the journey that makes sense."] },
  {
    title: "Choose the journey",
    lines: [
      "You don’t need to dream up an AI experience from scratch. We start with a proven journey framework and adapt it to the job at hand. Whether it’s product discovery, support, product Q&A, or something else, we design and tune the experience.",
    ],
  },
  {
    title: "Make it yours",
    lines: [
      "A shoe quiz for one brand shouldn’t behave like a shoe quiz for another.",
      "We bring in your products, policies, business rules, customer context and brand voice.",
    ],
  },
  {
    title: "Put it to work",
    lines: ["We don’t throw it over the wall.", "We implement it, test it and deploy it to a segment of your customers."],
  },
  {
    title: "See what happens",
    lines: [
      "What did your customers ask for?",
      "Where did they drop off?",
      "Which experience worked?",
      "Did the journey move the metric you cared about?",
    ],
  },
  {
    title: "Keep improving",
    lines: [
      "We change what’s not working.",
      "Double down on what is.",
      "And when we’ve learned enough from one journey, we move on to the next.",
    ],
  },
];

/** Choose the journey (Figma "Three-card row (Journeys)"): the three example journeys, as written there. */
export const journeyCards: { title: string; body: string }[] = [
  {
    title: "‘Product discovery’ journey",
    body: "Customer is on the homepage or collection pages. User asks Crossword a question. Crossword suggests product recommendations. Crossword measures whether the customer added the product to the cart.",
  },
  {
    title: "‘Product Q&A’ journey",
    body: "Customer is on the product page. Crossword sends a welcome message and some starter questions. Customer chooses a starter question. Crossword answers the customer’s question. Crossword measures whether the customer added the product to the cart.",
  },
  {
    title: "‘Support’ journey",
    body: "Customer messages regarding a refund. Crossword fetches the recent order. Customer chooses the product for a refund. Crossword understands why the customer is requesting for a refund. Crossword checks the guardrails, like date range of exchange. Crossword offers refund, and another option of solving the issue to reduce returns.",
  },
];

/** Journey library (Figma "Section · Journey library (4x4)", row 1): a few of the journeys the team builds. */
export const libraryJourneys = [
  {
    title: "Gift finder",
    body: "Helps someone who has no idea what to buy. Asks about the person they’re shopping for, then narrows to a few options they can feel good about.",
  },
  {
    title: "Style match",
    body: "Learns taste, budget, and occasion in a few questions, then builds a shortlist that looks chosen, not generated.",
  },
  {
    title: "Size and fit guide",
    body: "Answers the question that stops most clothing purchases. Recommends a size from the shopper’s measurements and past orders, and explains the fit.",
  },
  {
    title: "Support",
    body: "Helps the shopper find the answer they need and process a change all without submitting a ticket. For complex issues, it handoffs to the team with all of the required context.",
  },
];
