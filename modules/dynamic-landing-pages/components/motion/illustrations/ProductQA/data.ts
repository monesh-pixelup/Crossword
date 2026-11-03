import { catalog } from "../../brands/catalog";

export const script = {
  brand: catalog.wavelineLaptop.brand,
  userMessage: "Is this laptop good enough for me?",
  assistantMessage:
    "For how you use your laptop, yes. You mostly use it for browsing, presentations and video calls, so you don't need to pay extra for a high-performance configuration. This model gives you the battery life and screen quality you've previously prioritized, without the unnecessary processing power.",
};

export const insightLines = [
  "Based on your browsing history — mostly video calls and presentations.",
  "Matches the battery life and screen quality you've prioritized before.",
];

export const product = {
  ...catalog.wavelineLaptop,
  alt: "Referenced laptop",
  rating: 4,
  ratingCount: "860",
};
