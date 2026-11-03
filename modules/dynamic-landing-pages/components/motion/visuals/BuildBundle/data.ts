import { catalog } from "../../brands/catalog";
import type { CommerceProduct } from "../../components/ill/CommerceProductCard";

// Sell: Build your bundle. One Goodwell campaign from the ad to a matched
// two-jar routine: the shopper answers two questions in the chat and
// Crossword recommends a morning and a night gummy.
export const brand = "Goodwell";
export const domain = "goodwell.com/my-routine";

export const ad = {
  headline: ["Your daily routine,", "matched to you."],
  tag: "Personalized wellness bundle",
  cta: "Find my match",
  caption: "Two questions, one routine. Let us match your gummies to your day.",
  tags: "#goodwell #dailyroutine",
};

export const hero = {
  eyebrow: "From your ad",
  headline: "Build your daily wellness bundle.",
  sub: "Answer two questions and we'll match the gummies to your day.",
};

export const bundle: CommerceProduct[] = [
  { ...catalog.goodwellEnergy, subtitle: "Mornings · 60 count" },
  { ...catalog.goodwellSleep60, subtitle: "Nights · 60 count" },
];

// 02: the suggestion knocks above the composer (11b's Storybook knock):
// a two-line message, the quiet door first and the primary last. Tapping
// it opens the composer into the window.
export const knock = {
  line: "Two quick questions and I'll match your gummies to your day.",
  doors: [{ label: "Not now" }, { label: "Find my match", primary: true }],
};

// The conversation, one entry per step. `picked` is the shopper's answer
// (02's "Find my match" door, then each step's chips), shown as their bubble.
export const q1 = {
  picked: "Find my match",
  ai: "What are you looking to build a routine for?",
  chips: ["Energy & focus", "Better sleep", "Both"],
};
export const q2 = {
  picked: "Both",
  ai: "Got it: steady energy by day and better sleep at night. Which Goodwell gummies do you already have?",
  chips: ["Energy", "Sleep", "Starting fresh"],
};
export const result = {
  picked: "Starting fresh",
  loading: "Building your bundle…",
  ai: "Here's your match: Clean Energy for the morning, Daily Sleep for the night.",
};

export type Step = 1 | 2 | 3 | 4 | 5 | 6;
export const steps = [
  "Instagram ad",
  "Landing page with the assistant",
  "Question 1: the routine",
  "Question 2: what you own",
  "Building the bundle",
  "Bundle recommendation",
];
