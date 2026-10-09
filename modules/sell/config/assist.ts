import type { StaticImageData } from "next/image";
import panelObjection from "../assets/assist/panel-objection.webp";

export type AssistFeature = {
  title: string;
  /** Figma repeats the first description on the next two items and leaves the rest without one. */
  description?: string;
  panel: StaticImageData;
};

// TODO: real descriptions and panel art per item once they're designed.
export const assistFeatures: AssistFeature[] = [
  {
    title: "Objection handling",
    description: "Price, shipping, returns, sizing doubt, answered on the spot.",
    panel: panelObjection,
  },
  {
    title: "Turn competitor comparisons into conversions",
    description: "Price, shipping, returns, sizing doubt, answered on the spot.",
    panel: panelObjection,
  },
  {
    title: "Offer & coupon surfacing",
    description: "Price, shipping, returns, sizing doubt, answered on the spot.",
    panel: panelObjection,
  },
  { title: "Stock & availability checks", panel: panelObjection },
  { title: "Add-to-cart & checkout assist", panel: panelObjection },
  { title: "Page-level auto-suggestions", panel: panelObjection },
];
