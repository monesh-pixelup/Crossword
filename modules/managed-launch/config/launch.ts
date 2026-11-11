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

/**
 * Figma 3295:53 "Section · Journey library (4x4)": the five journeys on the punched notes. `lead` opens the copy in
 * Geist Medium, `body` follows it.
 */
export const libraryJourneys: { title: string; lead: string; body: string }[] = [
  {
    title: "Gift finder:",
    lead: "Help for finding something meaningful and tailored.",
    body: "Starts when someone lands on a gift page or asks what to get for a person. It asks about the person they’re shopping for, then narrows to a few options they can feel good about.",
  },
  {
    title: "Style match:",
    lead: "A shortlist after a few questions.",
    body: "Picks up when a shopper has been moving between product pages without settling on one. It learns taste, budget, and occasion, then builds a shortlist that looks chosen, not generated.",
  },
  {
    title: "Size and fit:",
    lead: "The right size before they hesitate.",
    body: "Steps in when a shopper opens the size chart or keeps going back to the size selector. It recommends a size from their measurements and past orders, and explains the fit.",
  },
  {
    title: "Support and exchanges:",
    lead: "Answers in chat without a ticket.",
    body: "Starts from an order lookup or a return request. It finds the answer or processes the change in the conversation. If it needs a person, it hands it over with the full context.",
  },
  {
    title: "Order tracking:",
    lead: "Live status without contacting support.",
    body: "Starts when a customer enters an order ID or asks where their order is. It pulls live courier data and shows each milestone with a tracking link.",
  },
];
