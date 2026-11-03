import { catalog } from "../../brands/catalog";
import thumb1Image from "@/modules/dynamic-landing-pages/assets/motion/scenarios/return-visit-comparison/thumb-1.webp";
import thumb2Image from "@/modules/dynamic-landing-pages/assets/motion/scenarios/return-visit-comparison/thumb-2.webp";
import thumb3Image from "@/modules/dynamic-landing-pages/assets/motion/scenarios/return-visit-comparison/thumb-3.webp";

const thumb1 = thumb1Image.src;
const thumb2 = thumb2Image.src;
const thumb3 = thumb3Image.src;

// Visual 3 — Return-visit comparison nudge. New composition (no specific
// Figma node), same ILL/* system and REF composition logic as Visuals 1-2.
// Photography is from crossword-build/assets/Sell_proactive message
// (chair_*): separate crops for the PDP and for the widget.
export const marketplace = {
  url: "FORMWORK.CO/CHAIRS/MESH-OFFICE-CHAIR",
  retailer: catalog.formworkMesh.brand,
  image: catalog.formworkMesh.image,
  thumbnails: [thumb1, thumb2, thumb3],
  title: catalog.formworkMesh.title,
  subtitle: "Graphite, Adjustable Lumbar",
  price: catalog.formworkMesh.price,
  rating: 4.5,
  ratingCount: "142",
  viewedLabel: "Viewed 3×",
};

// The other two chairs the shopper has also looked at — shown as subtle
// background evidence (a compact "Also viewed" row), not the focus.
export const alsoViewed = [
  { ...catalog.formworkTask, widgetImage: catalog.formworkTask.image },
  { ...catalog.formworkExecutive, widgetImage: catalog.formworkExecutive.image },
];

export const widget = {
  brand: marketplace.retailer,
  current: {
    image: catalog.formworkMesh.image,
    brand: marketplace.retailer,
    title: marketplace.title,
    price: marketplace.price,
  },
  message:
    "Looks like this one caught your attention. Want me to show you how it compares with the other options you’ve viewed?",
  primaryAction: "Compare them",
  secondaryAction: "Not now",
};
