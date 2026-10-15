import type { StaticImageData } from "next/image";
import panelConversational from "../assets/discovery/panel-conversational.webp";

export type DiscoveryFeature = {
  label: string;
  /** Shown beside the panel, above the art. */
  description?: string;
  href: string;
  panel: StaticImageData;
};

// TODO: panel art for every tab after the first, once it’s designed.
export const discoveryFeatures: DiscoveryFeature[] = [
  {
    label: "Conversational discovery",
    description: "Shoppers describe what they want in their own words. Crossword finds the match.",
    href: "#conversational-discovery",
    panel: panelConversational,
  },
  {
    label: "Try it on",
    description:
      "Upload your own image and see how the product looks on you, with image and video experiences that make choosing easier, more visual, and more personal.",
    href: "#try-it-on",
    panel: panelConversational,
  },
  {
    label: "Deep-dive product Q&A",
    description:
      "Real answers on materials, fit, specs, and care, not a spec sheet dump. Your customers can also compare with other products on your website for better decision making.",
    href: "#product-qa",
    panel: panelConversational,
  },
  {
    label: "Look & outfit building",
    description:
      "Like a certain shirt? Crossword builds the outfit around it, the jeans, the shoes, the sunglasses that go with it, styled for the occasion you need it for.",
    href: "#outfit-building",
    panel: panelConversational,
  },
  {
    label: "Guided finder",
    description:
      "A few smart questions, asked like a conversation. All to narrow thousands of options down to a few, and in turn increasing the possibility of conversion.",
    href: "#guided-finder",
    panel: panelConversational,
  },
  {
    label: "Visual discovery",
    description: "See something you like in a photo? Just share the image. Crossword finds it, or the closest thing to it.",
    href: "#visual-discovery",
    panel: panelConversational,
  },
  {
    label: "Size & fit guidance",
    description: "Answers the one question that stops most purchases cold.",
    href: "#size-and-fit",
    panel: panelConversational,
  },
  {
    label: "Gift & occasion finder",
    description: "Helps shoppers buy for someone else, confidently.",
    href: "#gift-finder",
    panel: panelConversational,
  },
];
