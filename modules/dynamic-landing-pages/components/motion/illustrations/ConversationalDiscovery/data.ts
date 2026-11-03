import type { RecommendationProduct } from "../../components/ill/RecommendationProductCard";
import { catalog } from "../../brands/catalog";

// Copy preserved verbatim from the supplied brief.
export const script = {
  brand: catalog.maraisLinenDress.brand,
  userMessage: "I need something for a beach wedding, but I run hot and hate anything tight.",
  assistantMessage:
    "Got it, breathable, relaxed and wedding-appropriate. I found three linen options in lighter weaves. Let me narrow those down to your size.",
};

// The two context signals, carried as Assistant/Insight supporting
// reasoning rather than additional chat turns.
export const insightLines = [
  "Using the size saved on your profile.",
  "You've leaned toward linen in past orders.",
];

export const products: RecommendationProduct[] = [
  catalog.maraisLinenDress,
  catalog.maraisShirtDress,
  catalog.maraisLinenTrousers,
].map(({ id, title, image }) => ({ id, name: title, image }));
