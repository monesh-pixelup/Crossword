import type { ShopperQuestion } from "@/modules/ai-assistants/config/possibilities";
import panelMaroon from "@/modules/sell/assets/discovery/panel-conversational.webp";
import panelAubergine from "@/modules/sell/assets/discovery/panel-conversational-aubergine.webp";
import panelForest from "@/modules/sell/assets/discovery/panel-conversational-forest.webp";

/** When a customer's agent shows up (Figma 3308:312): the three visible questions, each on the next damask panel. */
export const agentQuestions: ShopperQuestion[] = [
  {
    label: "“What’s new?”",
    description:
      "Crossword looks through your whole catalog, with live stock and prices, not just what a search turns up first. It understands your priorities and showcases them.",
    panel: panelMaroon,
  },
  {
    label: "“Why this one?”",
    description:
      "Crossword explains what makes a bag lighter, tougher, or better covered by warranty, in terms that match what the customer asked for. It uses all of your approved data, not just the basics on a product page.",
    panel: panelForest,
  },
  {
    label: "“Is there an offer?”",
    description:
      "Crossword brings up the bundle, the upgrade, and the sale, with the price and the fine print attached.",
    panel: panelAubergine,
  },
];
