import { catalog } from "../../brands/catalog";
import { sellDynamicProducts as images } from "../sellDynamicProducts";
import { gummies } from "../AiSearch/data";

export const brand = "Goodwell";
export const domain = "goodwell.com";

export const serp = {
  query: "goodwell vs moonrest",
  url: "google.com/search?q=goodwell+vs+moonrest",
  tabs: ["AI Mode", "All", "Shopping", "Images", "Videos", "Forums", "More", "Tools"],
  productsLabel: "Sponsored Products",
  products: [gummies.sleep60, gummies.sleep28, gummies.energy, gummies.focus, gummies.calm],
  resultsLabel: "Sponsored Results",
  ad: {
    title: "Goodwell or Moonrest Sleep?",
    // Shown truncated on the page; the full copy sits behind "See more".
  description: "Two brands. A clear look at the labels, pack sizes, and prices.",
    sitelinks: ["Daily Sleep Gummies", "Bundle & Save", "Shop All"],
  },
};

export const landing = {
  path: "goodwell.com/compare/moonrest",
  // Shown truncated on the page; the full copy sits behind "See more".
  description: "Nightly L‑Theanine and chamomile gummies",
  seeMore: "See more",
  cta: "Add to cart",
};

export const pdpProduct = gummies.sleep60;

export const comparisonTitle = "Goodwell vs Moonrest";

export interface Product {
  id: string;
  brand: string;
  name: string;
  sub: string;
  image: string | null;
}

export const products: [Product, Product] = [
  { id: "goodwell", brand: "Goodwell", name: "Goodwell", sub: "30 servings", image: images.sleep60 },
  { id: "moonrest", brand: "Moonrest", name: "Moonrest", sub: "25 servings", image: images.moonrestSleep },
];

export interface Row {
  id: string;
  label: string;
  values: [string, string];
  highlight?: boolean;
}

// Fictional demo specs (brief).
export const rows: Row[] = [
  { id: "price", label: "Price", values: [catalog.goodwellSleep60.price, catalog.moonrestSleep.price] },
  { id: "gummies", label: "Gummies", values: ["60", "50"] },
  { id: "servings", label: "Servings", values: ["30", "25"] },
  { id: "per-serving", label: "Per serving", values: ["$1.00", "$0.80"] },
  { id: "melatonin", label: "Melatonin", values: ["Melatonin‑free", "Contains melatonin"], highlight: true },
  { id: "ingredients", label: "Ingredients", values: ["L-Theanine, Chamomile", "Melatonin, Chamomile"] },
];


export const takeaway = {
  headline: "One has melatonin.",
  body: "Goodwell Sleep is melatonin-free. Moonrest Sleep contains melatonin.",
};

export const steps = [
  "Search results",
  "Sponsored result picked",
  "Comparison page opens",
  "Comparison details revealed",
  "Personalized insight",
];
