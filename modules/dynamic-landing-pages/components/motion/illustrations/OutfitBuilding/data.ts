import { catalog } from "../../brands/catalog";
import type { RecommendationProduct } from "../../components/ill/RecommendationProductCard";

export const script = {
  brand: catalog.maraisShirtIvory.brand,
  userMessage: "I love this shirt. What would you wear with it?",
  assistantMessage:
    "Since you usually go for relaxed fits and neutral colours, I'd pair it with these straight-leg trousers and these sneakers. You also mentioned you're dressing for a dinner, so I'd keep it polished without making it formal.",
};

export const insightLines = [
  "You usually go for relaxed fits in neutral colours, size M.",
  "Dressing for a dinner — kept the pairing polished, not formal.",
];

export const anchor = {
  ...catalog.maraisShirtIvory,
  alt: "Referenced shirt",
};

export const coordinates: RecommendationProduct[] = [
  catalog.maraisTailoredTrousers,
  catalog.maraisSneakers,
].map(({ id, title, image }) => ({ id, name: title, image }));
