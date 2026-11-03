import { catalog } from "../../brands/catalog";
import goodwellSocialAdImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/goodwell-campaign/goodwell-social-ad-v1.png";

const goodwellSocialAd = goodwellSocialAdImage.src;

export interface Question {
  label: string;
  options: { key: string; text: string }[];
}

const content = {
  brand: "Goodwell",
  domain: "goodwell.com/gummies",
  campaignProducts: [catalog.goodwellSleep60, catalog.goodwellCalm, catalog.goodwellFocus],
  campaignCreative: { image: goodwellSocialAd, alt: "Goodwell Sleep, Calm and Focus gummies on lilac and blush podiums in warm sunlight" },
  knockLine: "Tell us your routine. We'll help you find your gummies.",
  ad: {
    handle: "goodwell", headline: "Feel good.", cta: "Find my gummies",
    caption: "Sleep, calm and focus. Find the gummies that fit your daily routine.", tags: "#dailyroutine #goodwell",
  },
  page: { eyebrow: "Your daily routine", headline: "Feel good, one gummy at a time.", sub: "Functional gummies for sleep, calm and focus." },
  picks: [catalog.goodwellSleep60, catalog.goodwellSleep28, catalog.goodwellCalm].map((p) => ({
    id: p.id, name: p.title, meta: p.size, price: p.price, image: p.image,
  })),
  widget: {
    start: "Find My Match",
    q1Answer: "B",
    q2Answer: "A",
    thinking: "Thinking…",
    composer: "Or tell us in your own words…",
    welcome: "Hi! I'm your Goodwell guide. Tell us about your routine, and we'll help you choose your gummies.",
    prompts: [{ id: "sleep", text: "Sleep gummies" }, { id: "calm", text: "Calm gummies" }, { id: "match", text: "Find My Match" }],
    intro: "Let's find gummies that fit your daily routine.",
    q1: { label: "Q1. What would you like to focus on?", options: [{ key: "A", text: "Energy and focus" }, { key: "B", text: "An evening wind-down routine" }, { key: "C", text: "Everyday wellness" }] },
    q2: { label: "Q2. What matters most for your evening routine?", options: [{ key: "A", text: "Sleep and feeling calm" }, { key: "B", text: "A smaller jar to try first" }, { key: "C", text: "A simple daily habit" }] },
    result: "For your evening routine, compare Daily Sleep in two jar sizes and Calm Mood:",
  },
};

export const { brand, domain, campaignProducts, campaignCreative, knockLine, ad, page, picks, widget } = content;

export const steps = [
  "Instagram ad",
  "Landing page",
  "Guided shopping · Q1",
  "Customer selection",
  "Q2",
  "Processing",
  "Recommendations",
];
