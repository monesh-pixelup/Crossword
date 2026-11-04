import { catalog } from "../../brands/catalog";
import type { CommerceProduct } from "../../components/ill/CommerceProductCard";

// Managed Launch · Journey. One merchant (Aurelle, jewellery) through
// Crossword's five launch steps, then a second journey. Products, prices
// and images are the canonical catalog records. Counts, percentages and
// conversion figures are illustrative, as in the other Insights visuals.
export const brand = "Aurelle";

export type StepId = "goal" | "journey" | "customize" | "launch" | "measure";

export const steps: { id: StepId; title: string; owner: string }[] = [
  { id: "goal", title: "Define goal", owner: "You & Crossword" },
  { id: "journey", title: "Choose journey", owner: "Crossword" },
  { id: "customize", title: "Customize", owner: "Crossword" },
  { id: "launch", title: "Test & launch", owner: "Crossword" },
  { id: "measure", title: "Measure & improve", owner: "Crossword" },
];

export const discovery = {
  name: "Product discovery",
  where: "Journey 1 · Necklaces collection",
  url: "aurelle.com/collections/necklaces",
  goal: "Increase product discovery and add-to-cart conversions.",
  goalDone: "More discovery and add-to-cart",
  journeyActive: "Product discovery selected",
  journeyDone: "Product discovery",
  inputs: ["Catalog · 9 pieces", "Brand styling", "Customer context", "Price rules"],
  customizeDone: "5 sources connected",
  testing: "Tested on 300 sample chats · live to 20%",
  launchDone: "Live to all visitors",
  measuring: "Reading 1,240 conversations",
  opportunity: "1 opportunity found",
  improved: "Journey updated · chain length, best match first",
};

// The journeys Crossword suggests for the goal (Choose journey).
export const suggestions = [
  { id: "discovery", name: "Product discovery", line: "Shoppers ask, Crossword recommends and refines.", fit: "Best fit for your goal" },
  { id: "gift", name: "Gift finder", line: "Narrows a gift from who it’s for and the budget.", fit: "Good fit" },
  { id: "support", name: "Support & exchanges", line: "Answers orders and returns without a ticket.", fit: "Later" },
];

// Define goal: the product page the goal is about (canonical record;
// rating count from GiftJourney data, delivery line illustrative).
export const pdp = {
  url: "AURELLE.COM/NECKLACES/TEARDROP-PENDANT-NECKLACE",
  brand: "Aurelle",
  sizesLabel: "Chain",
  product: {
    image: catalog.aurellePendant.image,
    alt: "Aurelle Teardrop Pendant Necklace in gold",
    brand: "Aurelle",
    title: catalog.aurellePendant.title,
    subtitle: "Gold · teardrop silhouette",
    price: catalog.aurellePendant.price,
    rating: 4.8,
    ratingCount: "1.1k",
    sizes: ["16 in", "18 in", "20 in"],
    // The same silhouette in gold and rose gold (catalog records).
    gallery: [catalog.aurellePendant.image, catalog.aurelleRosePendant.image],
    color: "Gold",
    description: "A polished teardrop on a fine cable chain. Light enough to wear every day, special enough to give.",
    details: ["Gold finish", "Teardrop silhouette", "Fine cable chain", "Gift box included"],
  },
};

// What the picked journey gives shoppers: pieces it recommends from the
// catalog (canonical records) and how the conversation runs.
export const journeyPreview = {
  title: "Product discovery",
  line: "Shoppers say what they want; Crossword recommends from your catalog and refines until it fits.",
  label: "Recommends from your catalog · 9 pieces",
  rows: [
    { image: catalog.aurellePendant.image, title: catalog.aurellePendant.title, meta: `Gold · ${catalog.aurellePendant.price}` },
    { image: catalog.aurelleBar.image, title: catalog.aurelleBar.title, meta: `Rose gold · ${catalog.aurelleBar.price}` },
    { image: catalog.aurelleHalo.image, title: catalog.aurelleHalo.title, meta: `Rose gold · ${catalog.aurelleHalo.price}` },
  ],
  flow: ["Asks", "Recommends", "Refines", "Adds to cart"],
};

// Choose journey (dropdown): the options Crossword suggests for the goal.
export const journeyOptions = [
  { id: "discovery", name: "Product discovery", line: "From your catalog, refined", fit: "Best fit" },
  { id: "gift", name: "Gift finder", line: "By recipient and budget", fit: "Good fit" },
  { id: "support", name: "Support & exchanges", line: "Orders and returns in chat", fit: "Later" },
];

// Customize (multi-select tags): what Crossword plugs in. One left off.
export const sources = [
  { label: "Catalog · 9 pieces", on: true },
  { label: "Brand styling", on: true },
  { label: "Customer context", on: true },
  { label: "Price rules", on: true },
  { label: "Returns policy", on: true },
  { label: "Gift wrap", on: false },
];

export const giftSources = [
  { label: "Gift wrap", on: true },
  { label: "Delivery dates", on: true },
  { label: "Customer context", on: true },
  { label: "Price rules", on: false },
];

// Test & launch (segmented rollout).
export const rollout = { stops: ["10%", "50%", "100%"], test: "300 sample chats passed" };

// Measure & improve (approve a recommendation).
export const recommendation = {
  title: "Show chain length on every card",
  reason: "4 in 10 asked about chain length.",
  applied: "Applied · cards updated",
};

// Define goal: Crossword's suggestions under the field; the first is tapped.
export const goalSuggestions = [
  { label: "Increase conversions", metric: "Add-to-cart rate" },
  { label: "Raise order value", metric: "Avg. order value" },
  { label: "Reduce returns", metric: "Return rate" },
];

// Measure → Improve: the insight card. Illustrative figures.
export const insight = {
  period: "Product discovery · last 14 days",
  stats: [
    { label: "Engaged", value: "38%", sub: "of visitors chatted", after: "41%" },
    { label: "Add to cart", value: "6.2%", sub: "from chat", after: "7.9%" },
    { label: "Drop-off", value: "41%", sub: "after product cards", after: "29%" },
  ],
  stall: "41% left after the product cards. 4 in 10 of them had asked about chain length.",
  opportunity: "Show chain length on every card and lead with one best match.",
  changes: ["Chain length added to every card", "Best match shown first"],
};

export const giftFinder = {
  name: "Gift finder",
  where: "Journey 2 · Homepage",
  url: "aurelle.com",
  goalDone: "More confident gift purchases",
  journeyDone: "Gift finder, suggested from your goal",
  customizing: ["Gift wrap", "Delivery dates", "Customer context"],
};

export const openerDiscovery = {
  text: "Welcome back. Still thinking about rose gold? Tell me what you’re after and I’ll find it.",
  followups: ["Everyday pieces", "Gifts under $150", "Pick a chain"],
};

export const turnDiscovery = {
  user: "Something I can wear every day, under $150",
  reply: "Two everyday pieces, light and easy to layer.",
  followups: ["Show rose gold", "Which chain length?", "Gift wrap it"],
  improvedFollowups: ["Show rose gold", "Add a matching chain", "Gift wrap it"],
};

const chainLength = "Adjustable 16–18 in chain";

export const picks: CommerceProduct[] = [
  { ...catalog.aurelleBar, brand, rating: 4, ratingCount: "275", imageFit: "cover" },
  { ...catalog.aurellePendant, brand, rating: 5, ratingCount: "1.1k", imageFit: "cover" },
];

export const improvedPicks: CommerceProduct[] = [
  { ...picks[1], subtitle: chainLength, tag: "Best match" },
  { ...picks[0], subtitle: chainLength },
];

export const openerGift = {
  text: "Finding a gift? Tell me who it’s for and I’ll narrow it to a few pieces they’ll love.",
  followups: ["My partner", "My mom", "A friend"],
};

export const turnGift = {
  user: "My mom",
  reply: "Two pieces moms keep wearing, gift-wrapped free.",
  followups: ["Under $100", "Show necklaces", "Add a note"],
};

export const giftPicks: CommerceProduct[] = [
  { ...catalog.aurelleBracelet, brand, rating: 4, ratingCount: "487", tag: "Most gifted", imageFit: "cover" },
  { ...catalog.aurelleAnklet, brand, rating: 4, ratingCount: "312", imageFit: "cover" },
];
