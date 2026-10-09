import type { StaticImageData } from "next/image";
import eye from "../assets/upsell/eye.svg";
import packageIcon from "../assets/upsell/package.svg";
import puzzlePiece from "../assets/upsell/puzzle-piece.svg";
import trendUp from "../assets/upsell/trend-up.svg";

export type UpsellFeature = { icon: StaticImageData; title: string; description: string };

export const upsellFeatures: UpsellFeature[] = [
  {
    icon: trendUp,
    title: "Upselling to increase AOV",
    description: "Suggests the better version, when it fits the customer’s needs.",
  },
  {
    icon: puzzlePiece,
    title: "Cross-sell / complete-the-look",
    description: "Adds what naturally goes with what they picked as well as their previous orders.",
  },
  {
    icon: packageIcon,
    title: "Bundle building",
    description: "Groups products into a bundle worth buying together.",
  },
  {
    icon: eye,
    title: "Browse upselling",
    description: "Notices what they're looking at and nudges accordingly.",
  },
];
