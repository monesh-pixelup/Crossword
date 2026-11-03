import sleepThreeQuarterImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/ai-search-gallery/goodwell-sleep-three-quarter.png";
import sleepElevatedImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/ai-search-gallery/goodwell-sleep-elevated.png";
import sleepCampaignImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/goodwell-campaign/goodwell-social-ad-v1.png";
import { catalog } from "../../brands/catalog";
import { sellDynamicProducts as images } from "../sellDynamicProducts";


const sleepThreeQuarter = sleepThreeQuarterImage.src;
const sleepElevated = sleepElevatedImage.src;
const sleepCampaign = sleepCampaignImage.src;

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
  sleep60: { ...catalog.goodwellSleep60, image: catalog.goodwellSleep60.image, name: "Daily Sleep Gummies", variant: "60 Count", price: "$29.99", rating: 4.8, reviews: "2,140" },
  sleep28: { ...catalog.goodwellSleep28, image: catalog.goodwellSleep28.image, name: "Daily Sleep Gummies", variant: "28 Count", price: "$17.99", rating: 4.7, reviews: "860" },
  energy: { ...catalog.goodwellEnergy, image: catalog.goodwellEnergy.image, name: "Clean Energy Gummies", variant: "60 Count", price: "$27.99", rating: 4.6, reviews: "1,310" },
  focus: { ...catalog.goodwellFocus, image: catalog.goodwellFocus.image, name: "Daily Focus Gummies", variant: "60 Count", price: "$27.99", rating: 4.7, reviews: "980" },
  calm: { ...catalog.goodwellCalm, image: catalog.goodwellCalm.image, name: "Calm Mood Gummies", variant: "60 Count", price: "$26.99", rating: 4.5, reviews: "720" },
  immunity: { ...catalog.goodwellImmunity, image: catalog.goodwellImmunity.image, name: "Immunity Gummies", variant: "60 Count", price: "$24.99", rating: 4.6, reviews: "1,050" },
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
  gallery: [
    { src: catalog.goodwellSleep60.image, alt: "Goodwell Daily Sleep Gummies, 60 count — front view" },
    { src: sleepThreeQuarter, alt: "Goodwell Daily Sleep Gummies — three-quarter view" },
    { src: sleepElevated, alt: "Goodwell Daily Sleep Gummies — elevated lid view" },
    { src: sleepCampaign, alt: "Daily Sleep with Calm Mood and Daily Focus in the Goodwell campaign" },
  ],
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
