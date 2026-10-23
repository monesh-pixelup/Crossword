import { sellDynamicProducts as images } from "../sellDynamicProducts";

export const brand = "Goodwell";
export const domain = "goodwell.com";

export const page = {
  headline: "Feel good, one gummy at a time.",
  sub: "Functional gummies for sleep, energy and focus.",
  shop: "Shop gummies",
};

export interface Gummy {
  id: string;
  name: string;
  variant: string;
  price: string;
  rating: number;
  reviews: string;
  image: string;
}

export const gummies: Record<string, Gummy> = {
  sleep60: { id: "sleep60", image: images.sleep60, name: "Daily Sleep Gummies", variant: "60 Count", price: "$29.99", rating: 4.8, reviews: "2,140" },
  sleep28: { id: "sleep28", image: images.sleep28, name: "Daily Sleep Gummies", variant: "28 Count", price: "$17.99", rating: 4.7, reviews: "860" },
  energy: { id: "energy", image: images.energy, name: "Clean Energy Gummies", variant: "60 Count", price: "$27.99", rating: 4.6, reviews: "1,310" },
  focus: { id: "focus", image: images.focus, name: "Daily Focus Gummies", variant: "60 Count", price: "$27.99", rating: 4.7, reviews: "980" },
  calm: { id: "calm", image: images.calm, name: "Calm Mood Gummies", variant: "60 Count", price: "$26.99", rating: 4.5, reviews: "720" },
  immunity: { id: "immunity", image: images.immunity, name: "Immunity Gummies", variant: "60 Count", price: "$24.99", rating: 4.6, reviews: "1,050" },
};

export const shelf = [gummies.sleep60, gummies.energy, gummies.focus, gummies.calm];

export const search = {
  placeholder: "Search products or ask anything",
  askLabel: "Ask AI",
  suggestions: [
    { id: "sleep", text: "Something to help me sleep better" },
    { id: "energy", image: images.energy, text: "Energy without caffeine" },
    { id: "focus", image: images.focus, text: "Gummies for daily focus" },
  ],
  selected: "sleep",
  recentLabel: "Recent searches",
  recent: [gummies.immunity, gummies.focus, gummies.calm],
};

export const results = {
  query: "Something to help me sleep better",
  answer: "For better sleep and easier mornings, I'd recommend our Daily Sleep Gummies, made with magnesium and calming botanicals.",
  picks: [gummies.sleep60, gummies.sleep28],
  moreLabel: "Explore more wellness gummies",
  more: [gummies.calm, gummies.focus, gummies.energy, gummies.immunity],
  composer: "Refine your search…",
  followUps: [
    { id: "no-melatonin", text: "No melatonin" },
    { id: "compare", text: "Compare these" },
    { id: "under-25", text: "Under $25" },
  ],
};

export const pdp = {
  product: gummies.sleep60,
  blurb: "Magnesium and calming botanicals to help you wind down and wake up easier.",
  variants: [gummies.sleep60, gummies.sleep28],
  askLabel: "Ask AI about this product",
  suggestions: [
    { id: "why", text: "Why did you recommend this?" },
    { id: "melatonin", text: "Does it contain melatonin?" },
    { id: "compare", text: "Compare with 28 Count" },
  ],
  backLabel: "Back to AI search",
};

export const steps = [
  "Storefront",
  "Search expanded",
  "Query selected",
  "Results loading",
  "Results loaded",
  "More results",
  "Product selected",
  "Product deep dive",
];
