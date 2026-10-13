/** Managed launch and progress (content doc): what each side commits to. */
export const commitments = [
  { label: "Your commitment", value: "30 min", unit: "a week" },
  { label: "Our commitment", value: "Everything", unit: "else" },
];

/**
 * The journey (content doc): how a launch grows, step by step. Step 2 shows the journeys the doc
 * names (in sentence case, as its comment asks).
 */
export const journeySteps: { title: string; journeys?: string[] }[] = [
  { title: "You share your objectives" },
  { title: "We suggest potential journeys", journeys: ["Product deep dive", "Comparison landing page", "Refund process"] },
  { title: "We adapt the experience to your business" },
  { title: "A/B test. Measure the results" },
  { title: "Make changes" },
  { title: "Launch and continue to optimize" },
];

/** The loop the How it works steps run in (content doc). */
export const cycle = ["Goal", "Journeys", "Launch", "Learn", "Improve", "Repeat"];

export type HowStep = { title: string; lead: string; body: string[] };

/** How it works (content doc): six to-do cards. Card 2 also carries the example journeys below. */
export const howSteps: HowStep[] = [
  {
    title: "Start with the goal",
    lead: "You tell us what you’re trying to move.",
    body: ["We help identify the journey that makes sense."],
  },
  {
    title: "Choose the journey",
    lead: "You don’t need to dream up an AI experience from scratch.",
    body: [
      "We start with a proven journey framework and adapt it to the job at hand. Whether it’s product discovery, support, product Q&A, or something else, we design and tune the experience.",
    ],
  },
  {
    title: "Make it yours",
    lead: "A shoe quiz for one brand shouldn’t behave like a shoe quiz for another.",
    body: ["We bring in your products, policies, business rules, customer context, and brand voice."],
  },
  {
    title: "Put it to work",
    lead: "We don’t throw it over the wall.",
    body: ["We implement it, test it, and deploy it to a segment of your customers."],
  },
  {
    title: "See what happens",
    lead: "What did your customers ask for?",
    body: ["Where did they drop off?", "Which experience worked?", "Did the journey move the metric you cared about?"],
  },
  {
    title: "Keep improving",
    lead: "We change what’s not working.",
    body: ["Double down on what is.", "And when we’ve learned enough from one journey, we move on to the next."],
  },
];

/** The example journeys inside card 2 (content doc; “user” reads “customer”, per the voice rules). */
export const exampleJourneys: { name: string; steps: string[] }[] = [
  {
    name: "Product discovery",
    steps: [
      "Customer is on the homepage or collection pages",
      "Customer asks Crossword a question",
      "Crossword suggests product recommendations",
      "Crossword measures whether the customer added the product to the cart",
    ],
  },
  {
    name: "Product Q&A",
    steps: [
      "Customer is on the product page",
      "Crossword sends a welcome message and some starter questions",
      "Customer chooses a starter question",
      "Crossword answers the customer’s question",
      "Crossword measures whether the customer added the product to the cart",
    ],
  },
  {
    name: "Support",
    steps: [
      "Customer messages about a refund",
      "Crossword fetches the recent order",
      "Customer chooses the product for a refund",
      "Crossword understands why the customer is requesting a refund",
      "Crossword checks the guardrails, like the exchange date range",
      "Crossword offers the refund, and another way of solving the issue to reduce returns",
    ],
  },
];

/**
 * The partnership (content doc): meetings get less frequent as things mature. The doc's design
 * note: weekly for one quarter, monthly for two, then quarterly onwards.
 */
export const cadence = [
  { rhythm: "Weekly", span: "First quarter", note: "For the first few months, we meet weekly.", ticks: 13, quarters: 1 },
  { rhythm: "Monthly", span: "The next two quarters", note: "Then monthly.", ticks: 6, quarters: 2 },
  { rhythm: "Quarterly", span: "Onwards", note: "Then quarterly as things mature.", ticks: 3, quarters: 2 },
];

export const jobs = [
  { label: "Your job", body: "Bring us the business context and tell us what’s changing." },
  { label: "Our job", body: "Turn that into better customer experiences." },
];
