import { catalog } from "../../brands/catalog";
import type { CommerceProduct } from "../../components/ill/CommerceProductCard";

// Same AURELLE jewelry photography as GiftJourneyMotion (01b) — the two
// scenarios share identical products, so they share the same assets
// rather than duplicating files.
export const brand = "Aurelle";

export const turn1 = {
  userMessage:
    "I need a birthday gift for my wife. She has pretty expensive taste, but my budget doesn't really match it this year.",
  assistantMessage:
    "Let's find something that still feels special without stretching your budget — here are three pieces under $150 that read more expensive than they cost.",
  // Proactive follow-ups offered under the reply (Storybook .nw-win__row).
  followups: ["More like the pendant", "Show rose gold", "Under $100"],
};

export const firstPicks: CommerceProduct[] = [
  { ...catalog.aurelleAnklet, brand, rating: 4, ratingCount: "312", image: catalog.aurelleAnklet.image },
  { ...catalog.aurellePendant, brand, rating: 5, ratingCount: "1.1k", image: catalog.aurellePendant.image, imageFit: "cover" },
  { ...catalog.aurelleBracelet, brand, rating: 4, ratingCount: "487", image: catalog.aurelleBracelet.image },
];

export const turn2 = {
  userMessage: "I like the middle one. Can you show me more styles like that, in rose gold?",
  assistantMessage:
    "Good eye — the teardrop pendant is one of our most-gifted pieces. Here are a few more pendant styles in rose gold.",
  followups: ["Add the first one to my cart", "Compare these", "Is gift wrap free?"],
};

export const pendants: CommerceProduct[] = [
  { ...catalog.aurelleRosePendant, brand, rating: 5, ratingCount: "860", image: catalog.aurelleRosePendant.image, imageFit: "cover" },
  { ...catalog.aurelleHalo, brand, rating: 5, ratingCount: "402", image: catalog.aurelleHalo.image, imageFit: "cover" },
  { ...catalog.aurelleBar, brand, rating: 4, ratingCount: "275", image: catalog.aurelleBar.image, imageFit: "cover" },
];

export const turn3 = {
  userMessage: "Add the first one to my cart.",
  assistantMessage: "Added to your cart. Want to pair it with something else, like a matching chain?",
  followups: ["Earrings to match", "Go to checkout", "Gift wrap it"],
};

export const addedPendant: CommerceProduct = pendants[0];

export const turn4 = {
  userMessage: "Yes, show me a matching chain.",
  assistantMessage:
    "Here are three chains that pair well with it — most people choose the fine box chain with this pendant.",
  followups: ["Which length?", "Show gold instead", "Compare chains"],
};

export const chains: CommerceProduct[] = [
  { ...catalog.aurelleBoxChain, brand, rating: 5, ratingCount: "930", tag: "Most paired", image: catalog.aurelleBoxChain.image, imageFit: "cover" },
  { ...catalog.aurelleSnakeChain, brand, rating: 4, ratingCount: "214", image: catalog.aurelleSnakeChain.image, imageFit: "cover" },
  { ...catalog.aurelleCurbChain, brand, rating: 4, ratingCount: "158", image: catalog.aurelleCurbChain.image, imageFit: "cover" },
];

export const turn5 = {
  userMessage: "Perfect, add that one too.",
  assistantMessage: "Added — your pendant and chain are both in the cart, ready for checkout.",
  followups: ["Go to checkout", "Add a gift note", "Keep browsing"],
};

export const addedChain: CommerceProduct = chains[0];
