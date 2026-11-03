import { catalog } from "../../brands/catalog";
import type { CommerceProduct } from "../../components/ill/CommerceProductCard";

export const script = {
  brand: catalog.aurellePendant.brand,
  userMessage: "I'll take this pendant.",
  assistantMessage:
    "Good choice. You've bought similar styles before. You might also like this chain-link bracelet and beaded anklet. Both match the pendant's gold finish.",
};

export const anchor = {
  ...catalog.aurellePendant,
  alt: "Gold teardrop pendant being purchased",
};

export const addOns = [
  catalog.aurelleBracelet,
  catalog.aurelleAnklet,
] satisfies CommerceProduct[];
