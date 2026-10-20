import type { StaticImageData } from "next/image";
import cardChannels from "../assets/storefront/card-channels.webp";
import cardPlacement from "../assets/storefront/card-placement.webp";
import cardWidget from "../assets/storefront/card-widget.webp";

export type StorefrontCard = {
  image: StaticImageData;
  /** The motion scene played over the card's art (by slug). */
  scene: "brand-adaptability" | "place-it-wherever" | "complete-channel-deployment";
  title: string;
  description: string;
  /** Figma's description box width, where it wraps narrower than the card. */
  descriptionWidth?: number;
};

export const storefrontCards: StorefrontCard[] = [
  { image: cardWidget, scene: "brand-adaptability", title: "Your branded widget", description: "Styled to match your brand." },
  {
    image: cardPlacement,
    scene: "place-it-wherever",
    title: "Place it where it works best",
    description: "Place Crossword wherever it makes the most sense.",
  },
  {
    image: cardChannels,
    scene: "complete-channel-deployment",
    title: "Complete channel deployment",
    description:
      "Web widget, email, SMS, iMessage, WhatsApp, Instagram, Facebook, TikTok and everywhere else your customers already are.",
    descriptionWidth: 337.203,
  },
];
