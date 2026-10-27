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
  /** Shown beside the panel, above the art. */
  description?: string;
  /** The empty framed panel the answer plays in. */
  panel: StaticImageData;
};

/** TODO: Figma only writes the first question's description; confirm the others with the Crossword team. */
export const shopperQuestions: ShopperQuestion[] = [
  {
    label: "“Which one should I get?”",
    description: "Crossword showcases your products, with photos, prices and options, lined up next to each other.",
    panel: panelMaroon,
  },
  {
    label: "“The black one, with the packing cubes.”",
    panel: panelForest,
  },
  {
    label: "“Choose this one.”",
    panel: panelAubergine,
  },
  {
    label: "“I’m looking for the best value.”",
    panel: panelMaroon,
  },
];
