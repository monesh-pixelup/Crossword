import { sellDynamicProducts as images } from "../sellDynamicProducts";

export const brand = "Trailwell";
export const domain = "trailwell.com/backpacks";

export const ad = {
  handle: "trailwell",
  headline: "Everyday. Anywhere.",
  cta: "Find my backpack",
  caption: "Commute, weekends away, trails. Find the backpack that fits how you carry.",
  tags: "#everydaycarry #travel",
};

export const page = {
  eyebrow: "Find your carry",
  headline: "Your everyday carry, sorted.",
  sub: "Backpacks for work, weekends and the trail.",
};

export interface Backpack {
  id: string;
  name: string;
  meta: string;
  price: string;
  image: string;
}

export const picks: Backpack[] = [
  { id: "weekender", image: images.weekender, name: "Weekender", meta: "30L · Opens flat", price: "$148" },
  { id: "roam", image: images.roam, name: "Roam", meta: "40L · Lockable zips", price: "$189" },
  { id: "overnight", image: images.overnight, name: "Overnight", meta: "24L · Shoe pocket", price: "$132" },
];

export interface Question {
  label: string;
  options: { key: string; text: string }[];
}

export const widget = {
  welcome: "Hi! I'm your Trailwell guide. Tell us how you carry, and we'll find a backpack that fits.",
  prompts: [
    { id: "laptop", text: "Laptop-friendly?" },
    { id: "carryon", text: "Carry-on size?" },
    { id: "match", text: "Find My Match" },
  ],
  start: "Find My Match",
  intro: "Let's find a backpack that fits the way you travel.",
  q1: {
    label: "Q1. What will you mainly use your backpack for?",
    options: [
      { key: "A", text: "Work and everyday commute" },
      { key: "B", text: "Weekend trips and short getaways" },
      { key: "C", text: "Hiking and outdoor adventures" },
    ],
  } as Question,
  q1Answer: "B",
  q2: {
    label: "Q2. What matters most in your weekend backpack?",
    options: [
      { key: "A", text: "Room for 2–3 days" },
      { key: "B", text: "Lightweight and easy to carry" },
      { key: "C", text: "A separate laptop compartment" },
    ],
  } as Question,
  q2Answer: "A",
  thinking: "Thinking…",
  result: "For 2–3 days away, three carry-on packs:",
  composer: "Or tell us in your own words…",
};

export const steps = [
  "Instagram ad",
  "Landing page",
  "Guided shopping · Q1",
  "Customer selection",
  "Q2",
  "Processing",
  "Recommendations",
];
