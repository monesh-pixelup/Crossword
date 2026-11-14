import type { AiPillOption } from "../../components/ill/AiPills";
import { catalog } from "../../brands/catalog";
import trailwellDeliveredImage from "../../../../assets/motion/scenarios/retain-v2/trailwell-delivered.png";

const trailwellDelivered = trailwellDeliveredImage.src;

const product = catalog.trailwellWeekender;

export const brand = product.brand;

export const script = {
  assistantMessage:
    "How is your new Weekender working out? If you'd like, I can show you a few travel pieces that work well with it.",
};

export const purchase = {
  image: trailwellDelivered,
  alt: `${product.brand} ${product.title} in ${product.color}`,
  brand: product.brand,
  title: `${product.title} 30L`,
  status: "Delivered Oct 14",
};

export const replies: AiPillOption[] = [
  { id: "great", text: "It's working great" },
  { id: "compatible", text: "Show travel pieces" },
];
