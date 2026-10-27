import type { DifferentiationRow } from "@/modules/ai-assistants/config/differentiation";

/** What changes when your brand has an agent? (Figma 3308:385); `experience` holds the interaction. */
export const agentDifferentiationRows: DifferentiationRow[] = [
  {
    experience: "When it comes to catalog discovery",
    without: "The agent works with the limited pages, results, or existing tools it finds.",
    with: "Crossword helps the personal agent identify relevant products and variants across your connected catalog.",
  },
  {
    experience: "Regarding shopper preferences",
    without: "The personal agent knows the shopper’s priorities, but your brand doesn’t receive that context.",
    with: "Crossword tailors recommendations and offers using available intent and preferences and provides you with the context.",
  },
  {
    experience: "For brand differentiation",
    without: "The agent interprets your value from the information it encounters.",
    with: "Crossword explains the specific product benefits based on the customer’s requirements and your enriched catalog.",
  },
  {
    experience: "When it comes to upsells and bundles",
    without: "Website recommendations never enter the agent’s evaluation.",
    with: "Crossword proposes suitable upgrades and complementary products directly based on your brand priorities.",
  },
  {
    experience: "For promotions",
    without: "Banners and promotional pages can be skipped.",
    with: "Crossword introduces applicable offers during the interaction.",
  },
  {
    experience: "Regarding the selling approach",
    without: "The agent chooses its own route through your store.",
    with: "Crossword follows your selling playbooks when responding and recommending.",
  },
  {
    experience: "Account-related tasks",
    without: "The agent navigates available account pages, forms, or integrations.",
    with: "Crossword provides an authorized route to enable order, refund, exchange, and support actions.",
  },
  {
    experience: "Regarding visibility and control",
    without: "A page visit doesn’t reveal intent or provide a record of the task.",
    with: "Records requests, approvals, actions, and tracked outcomes handled are through Crossword.",
  },
];
