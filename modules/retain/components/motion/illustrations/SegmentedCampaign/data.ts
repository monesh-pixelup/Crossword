import type { RecommendationProduct } from "../../components/ill/RecommendationProductCard";
import { catalog } from "../../brands/catalog";

export const brand = catalog.amberOpalGlass.brand;

export const script = {
  assistantMessage:
    "Based on the lighting you've been looking at, I've shortlisted three table lamps for your space.",
};

// What Crossword inferred from browsing — remembered context, so it
// renders as a low-chrome Insight note, not as shopper-picked chips.
export const signal = {
  source: "From your browsing",
  line: "Warm light and sculptural forms for a living room.",
};

export const shortlistLabel = "Picked for you";

export const shortlist: RecommendationProduct[] = [
  catalog.amberOpalGlass,
  catalog.amberPleatedLinen,
  catalog.amberTripod,
].map((product) => ({
  id: product.id,
  name: product.title,
  price: product.price,
  image: product.image,
}));
