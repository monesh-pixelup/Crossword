import { audenViewedProducts } from "../../brands/catalog";

export const script = {
  brand: "AUDEN",
  assistantMessage: "Still deciding? Compare the three products you viewed side by side.",
};

const differentiators = ["Clearer mids", "Longest battery life", "Lightest build"];

export const products = audenViewedProducts.map((product, index) => ({
  ...product,
  name: product.title,
  differentiator: differentiators[index],
}));
