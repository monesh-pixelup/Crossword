import { catalog, audenViewedProducts } from "../../brands/catalog";

export const script = {
  brand: catalog.audenBlack.brand,
  // No user message — this interaction begins from observed browsing
  // behaviour, not a question. No UserTurn is rendered at all.
  assistantMessage:
    "You've looked at three models in the $450 to $600 range. If you're already comfortable at that price point, this model is worth considering, it has the longer battery life you tend to prioritize and is currently only $100 more than the one you've been viewing.",
};

// Both context signals (browsing behaviour, battery-life preference) are
// already spoken verbatim in the reply above, and browsing behaviour is
// now also shown visually via the previously-viewed row — no
// Assistant/Insight added, same precedent as scenarios 02/06/10.
export const previouslyViewed = {
  caption: "3 models viewed · $450–$600",
  items: audenViewedProducts.map((product) => ({ ...product, alt: product.title })),
};

// Card-Commerce (not the bare ProductAnchor thumbnail+title treatment)
// per design feedback — the single focal recommendation should carry
// full product detail (rating, price, Add to cart), matching
// REF/Product/Card-Commerce-Watch.svg.
// Card-Commerce's Card density has no subtitle slot (matches the
// authored component — battery life stays in the reply text instead).
export const recommendedProduct = {
  ...catalog.audenBlack,
  rating: 5,
  ratingCount: "1.1k",
};
