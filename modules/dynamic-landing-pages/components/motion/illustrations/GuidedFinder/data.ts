import { catalog } from "../../brands/catalog";

export const script = {
  brand: catalog.lumenSecondSkin.brand,
  userMessage: "Help me find the right foundation.",
  framing: "Let's narrow it down in 3 quick questions.",
  resultMessage: "Based on your answers, and your saved shade preference, this is your best match.",
};

// Resolved answers — the static shows the quiz already completed, per
// the kit's static-first rule, while staying visible question-by-question
// (not collapsed into one summary row) per the brief's revision.
export const answers = [
  { question: "Preferred finish?", options: ["Matte", "Dewy", "Satin"], answer: "Dewy" },
  { question: "What are you looking to cover?", options: ["Dark circles", "Some redness & spots", "Uneven tone"], answer: "Some redness & spots" },
  { question: "Skin type?", options: ["Dry", "Combination", "Oily"], answer: "Combination" },
];

export const insightLines = [
  "Matched to your saved shade — Warm 3.",
  "You've repurchased dewy finishes twice before.",
];

export const product = {
  ...catalog.lumenSecondSkin,
  rating: 5,
  ratingCount: "1.4k",
};
