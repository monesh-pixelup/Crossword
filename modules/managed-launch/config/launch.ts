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
 * Figma 4233:12689 "Section · Journey library (4x4)": the nine journeys on their cards, five over four. `initial` is
 * the title's swash capital, `title` the rest of it; `accent` is the card's bottom bar (aubergine, maroon or green).
 */
export const libraryJourneys: {
  initial: string;
  title: string;
  description: string;
  accent: "aubergine" | "maroon" | "green";
}[] = [
  { initial: "G", title: "ift finder", description: "Help for finding something meaningful and tailored", accent: "aubergine" },
  { initial: "S", title: "tyle match", description: "A shortlist after a few questions", accent: "maroon" },
  { initial: "S", title: "ize and fit", description: "The correct size before they hesitate", accent: "green" },
  { initial: "R", title: "eturns and exchanges", description: "Answers in chat without a ticket", accent: "maroon" },
  { initial: "O", title: "rder tracking", description: "Live status without contacting support", accent: "aubergine" },
  { initial: "C", title: "are guide", description: "Upkeep tips after delivery", accent: "maroon" },
  {
    initial: "P",
    title: "roduct deep dive",
    description: "Details beyond the spec sheet to answer questions specific to the customer",
    accent: "aubergine",
  },
  { initial: "B", title: "undle builder", description: "Thoughtful pairings to increase AOV", accent: "maroon" },
  { initial: "B", title: "rand FAQ", description: "Your brand story in your voice", accent: "green" },
];
