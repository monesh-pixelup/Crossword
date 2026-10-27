import type { StaticImageData } from "next/image";
import panelMaroon from "@/modules/sell/assets/discovery/panel-conversational.webp";
import panelAubergine from "@/modules/sell/assets/discovery/panel-conversational-aubergine.webp";
import panelForest from "@/modules/sell/assets/discovery/panel-conversational-forest.webp";

/*
 * The shopper questions in "A shopper asks, Crossword answers" (Figma 3305:381). Each takes one of the
 * framed damask panels from Sell's Product discovery in turn (maroon, as Figma draws it, then forest
 * green, then aubergine): the same 821 × 611 export with its cream lattice frame and 1px #d2cdc0 border.
 */

export type ShopperQuestion = {
  /** The shopper's question, in curly quotes: the list label and the block's title. */
  label: string;
  /** Shown beside the panel, above the art. A blank line (\n\n) starts a new paragraph. */
  description?: string;
  /** The empty framed panel the answer plays in. */
  panel: StaticImageData;
};

export const shopperQuestions: ShopperQuestion[] = [
  {
    label: "“Which one should I get?”",
    description:
      "Crossword showcases your products, with photos, prices and options, lined up next to each other.\n\nThe shopper asks why one costs more and the answer comes directly from your catalog.",
    panel: panelMaroon,
  },
  {
    label: "“The black one, with the packing cubes.”",
    description: "The view changes as they talk. Size, color, quantity and bundle are all picked in the chat.",
    panel: panelForest,
  },
  {
    label: "“Choose this one.”",
    description:
      "Crossword keeps the product options visible within the ChatGPT conversation. It lets customers browse, compare, and ask follow-up questions without losing their shortlist.",
    panel: panelAubergine,
  },
  {
    label: "“I’m looking for the best value.”",
    description:
      "Uses your full enriched catalog to prioritize suitable products within budget, explain price differences, and highlight relevant offers or bundles.",
    panel: panelMaroon,
  },
];
