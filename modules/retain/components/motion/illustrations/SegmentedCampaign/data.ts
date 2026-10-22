import type { RecommendationProduct } from "../../components/ill/RecommendationProductCard";
import faceWashImage from "../../../../assets/motion/scenarios/dynamic-landing-page/face-wash.webp";
import hydratingSerumImage from "../../../../assets/motion/scenarios/human-mode/hydrating-serum.png";
import moisturizerImage from "../../../../assets/motion/scenarios/dynamic-landing-page/moisturizer.webp";

const faceWash = faceWashImage.src;
const hydratingSerum = hydratingSerumImage.src;
const moisturizer = moisturizerImage.src;

export const brand = "DERMA HOUSE";

export const script = {
  assistantMessage:
    "Based on the skincare products you've been looking at, I've shortlisted three options for your skin type and routine.",
};

// What Crossword inferred from browsing — remembered context, so it
// renders as a low-chrome Insight note, not as shopper-picked chips.
export const signal = {
  source: "From your browsing",
  line: "Gentle, hydrating formulas suited to sensitive skin.",
};

export const shortlistLabel = "Picked for you";

export const shortlist: RecommendationProduct[] = [
  { id: "cleanser", name: "Gentle Face Wash", price: "$24", image: faceWash },
  { id: "serum", name: "Hydrating Serum", price: "$48", image: hydratingSerum },
  { id: "moisturizer", name: "Barrier Moisturizer", price: "$36", image: moisturizer },
];
