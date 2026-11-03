import { catalog } from "../../brands/catalog";

export const brand = catalog.sorelleHydrating.brand;
export const url = "sorellelabs.com/serums/daily-hydrating";

export const product = {
  name: catalog.sorelleHydrating.title,
  eyebrow: "Sorelle Labs · Daily hydration",
  price: catalog.sorelleHydrating.price,
  image: catalog.sorelleHydrating.image,
  size: "30 ml",
};

export const insight = {
  label: "Is it right for sensitive skin?",
  text: "Fragrance-free daily hydration that supports your skin barrier.",
  more: "See more",
};

export const summary = {
  label: "AI summary",
  text: "Sorelle Labs Daily Hydrating Serum is fragrance-free and formulated to support sensitive skin. Lightweight daily hydration helps support your skin barrier.",
  more: "Show more",
  less: "Show less",
  prompt: "Tell me more about this serum",
  details: [
    { id: "formula", title: "Fragrance-free", body: "Formulated without added fragrance." },
    { id: "hydration", title: "Daily hydration", body: "A lightweight serum for your daily routine." },
    { id: "barrier", title: "Skin barrier support", body: "Supports your skin barrier." },
    { id: "size", title: "Bottle size", body: "30 ml per bottle." },
  ],
};

export const specificInfo = {
  label: "Looking for specific info?",
  placeholder: "Ask AI about this serum",
  chips: [
    { id: "fragrance", text: "Is it fragrance-free?" },
    { id: "routine", text: "How do I use it?" },
    { id: "size", text: "What size is the bottle?" },
  ],
};

export const detailAnswer = "Yes, Sorelle Labs Daily Hydrating Serum is fragrance-free and formulated to support sensitive skin. It helps hydrate and support your skin barrier.";
export const detailFollowUps = [
  { id: "ingredients", text: "Full ingredients" },
  { id: "pairing", text: "Pair with a moisturiser" },
];

export const directAsk = {
  chipId: "fragrance",
  answer: detailAnswer,
  followUps: detailFollowUps,
};

export const question = "Is this serum good for sensitive skin?";
export const thinking = "Checking the serum formula…";

export const answer = {
  title: "Daily hydration for sensitive skin",
  meta: "Daily Hydrating Serum · 30 ml",
  themes: [
    { id: "fragrance", title: "Fragrance-free", body: "No added fragrance." },
    { id: "hydration", title: "Hydration", body: "Lightweight daily formula." },
    { id: "barrier", title: "Barrier support", body: "Supports your skin barrier." },
  ],
};

export const followUps = [
  { id: "fragrance", text: "Is it fragrance-free?" },
  { id: "routine", text: "How do I use it?" },
  { id: "pairing", text: "Pair with a moisturiser" },
];

export const steps = [
  "Default PDP",
  "AI triggered",
  "AI drawer opens",
  "AI responds",
  "Suggested follow-ups",
  "Formula detail",
];
