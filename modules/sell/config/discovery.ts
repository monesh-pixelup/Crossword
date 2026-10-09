import type { StaticImageData } from "next/image";
import panelConversational from "../assets/discovery/panel-conversational.webp";

export type DiscoveryFeature = {
  label: string;
  /** Shown beside the panel; only "Conversational discovery" is written in Figma so far. */
  description?: string;
  href: string;
  panel: StaticImageData;
};

// TODO: descriptions and panel art for every tab after the first, once they're designed.
export const discoveryFeatures: DiscoveryFeature[] = [
  {
    label: "Conversational discovery",
    description: "Shoppers describe what they want in their own words. Crossword finds the match.",
    href: "#conversational-discovery",
    panel: panelConversational,
  },
  { label: "Try it on", href: "#try-it-on", panel: panelConversational },
  { label: "Deep-dive product Q&A", href: "#product-qa", panel: panelConversational },
  { label: "Look & outfit building", href: "#outfit-building", panel: panelConversational },
  { label: "Guided finder", href: "#guided-finder", panel: panelConversational },
  { label: "Visual discovery", href: "#visual-discovery", panel: panelConversational },
  { label: "Size & fit guidance", href: "#size-and-fit", panel: panelConversational },
  { label: "Gift & occasion finder", href: "#gift-finder", panel: panelConversational },
  { label: "Your website, with a human touch", href: "#human-touch", panel: panelConversational },
];
