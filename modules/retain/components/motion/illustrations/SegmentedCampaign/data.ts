import type { RecommendationProduct } from "../../components/ill/RecommendationProductCard";
import { catalog } from "../../brands/catalog";

export const brand = catalog.sorelleHydrating.brand;

export const script = {
  assistantMessage:
    "Based on the skincare products you've been looking at, I've shortlisted three options for your skin type and routine.",
};

// What Crossword inferred from browsing — remembered context, so it
// renders as a low-chrome Insight note, not as shopper-picked chips.
export const signal = {
  source: "From your browsing",
  line: "Gentle, hydrating formulas suited to sensitive skin.",
};

export const shortlistLabel = "Picked for you";

export const shortlist: RecommendationProduct[] = [
  catalog.sorelleHydrating,
  catalog.sorelleCream,
  catalog.sorelleGel,
].map((product) => ({
  id: product.id,
  name: product.title,
  price: product.price,
  image: product.image,
}));
