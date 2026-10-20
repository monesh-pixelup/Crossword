import { cutouts } from "../../assets/products/cutouts";

export const script = {
  brand: "AUDEN",
  assistantMessage: "Still deciding? Compare the three products you viewed side by side.",
};

// The same three previously-viewed colorways BrowseUpsell shows muted in
// the background — here they're the focus instead, so each renders at
// full weight with its own differentiator, not as supporting evidence
// behind a single recommendation.
export const products = [
  { id: "ivory", image: cutouts.audenIvory, name: "Auden Wave Pro — Ivory", differentiator: "Clearer mids", price: "$649" },
  { id: "olive", image: cutouts.audenOlive, name: "Auden Wave Pro — Olive", differentiator: "Longest battery life", price: "$629" },
  { id: "mustard", image: cutouts.audenMustard, name: "Auden Wave Pro — Mustard", differentiator: "Lightest build", price: "$599" },
];
