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
 * Figma 3295:53 "Section · Journey library (4x4)": the seven journeys, one per punched note, in the strip's order (four
 * across, then three below). `lead` is the note's copy, in Geist Medium.
 */
export const libraryJourneys: { title: string; lead: string }[] = [
  { title: "Gift finder:", lead: "Help for finding something meaningful and tailored." },
  { title: "Style match:", lead: "A shortlist after a few questions." },
  { title: "Size and fit:", lead: "The correct size before they hesitate." },
  { title: "Returns and exchanges:", lead: "Answers in chat without a ticket." },
  { title: "Order tracking:", lead: "Live status without contacting support." },
  { title: "Care guide:", lead: "Upkeep tips after delivery." },
  { title: "Product deep dive:", lead: "Details beyond the spec sheet to answer questions specific to the customer." },
];
