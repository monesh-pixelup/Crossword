import { cutouts } from "../../assets/products/cutouts";

export const script = {
  brand: "MARAIS",
  userMessage: "Okay, I'll take it.",
  assistantMessage:
    "Great. I've selected your saved size and the color you preferred. Simply add it to your cart.",
};

// Per design feedback, no longer the same sneaker as Stock Availability —
// its own independent moment now, same MARAIS cutout CrossSell/
// OutfitBuilding already use for this brand.
export const product = {
  image: cutouts.cottonShirt,
  alt: "Relaxed cotton shirt",
  brand: "MARAIS",
  title: "Relaxed Cotton Shirt",
  price: "$110",
  size: "M",
  color: "Olive",
};
