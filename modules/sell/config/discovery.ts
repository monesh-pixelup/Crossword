import type { StaticImageData } from "next/image";
import panelConversational from "../assets/discovery/panel-conversational.webp";

export type DiscoveryFeature = {
  label: string;
  /** Shown beside the panel, above the art. */
  description?: string;
  href: string;
  /** The empty framed panel the scene plays in. */
  panel: StaticImageData;
  /** The motion scene played in the panel (by slug). */
  scene: string;
};

export const discoveryFeatures: DiscoveryFeature[] = [
  {
    label: "Conversational discovery",
    description: "Shoppers describe what they want in their own words. Crossword finds the match.",
    href: "#conversational-discovery",
    panel: panelConversational,
    scene: "conversational-discovery",
  },
  {
    label: "Try it on",
    description:
      "Upload your own image and see how the product looks on you, with image and video experiences that make choosing easier, more visual, and more personal.",
    href: "#try-it-on",
    panel: panelConversational,
    scene: "try-it-on",
  },
  {
    label: "Deep-dive product Q&A",
    description:
      "Real answers on materials, fit, specs, and care, not a spec sheet dump. Your customers can also compare with other products on your website for better decision making.",
    href: "#product-qa",
    panel: panelConversational,
    scene: "product-qa",
  },
  {
    label: "Look & outfit building",
    description:
      "Like a certain shirt? Crossword builds the outfit around it, the jeans, the shoes, the sunglasses that go with it, styled for the occasion you need it for.",
    href: "#outfit-building",
    panel: panelConversational,
    scene: "outfit-building",
  },
  {
    label: "Guided finder",
    description:
      "A few smart questions, asked like a conversation. All to narrow thousands of options down to a few, and in turn increasing the possibility of conversion.",
    href: "#guided-finder",
    panel: panelConversational,
    scene: "guided-finder",
  },
  {
    label: "Visual discovery",
    description: "See something you like in a photo? Just share the image. Crossword finds it, or the closest thing to it.",
    href: "#visual-discovery",
    panel: panelConversational,
    scene: "visual-discovery",
  },
  {
    label: "Size & fit guidance",
    description: "Answers the one question that stops most purchases cold.",
    href: "#size-and-fit",
    panel: panelConversational,
    scene: "size-fit",
  },
  {
    label: "Gift & occasion finder",
    description: "Helps shoppers buy for someone else, confidently.",
    href: "#gift-finder",
    panel: panelConversational,
    scene: "gift-finder",
  },
];
