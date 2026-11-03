import { catalog } from "../../brands/catalog";

// Sell: Offers. One product and one welcome perk from the ad to the cart:
// Goodwell Daily Sleep Gummies, 10% off the first jar, applied for the
// shopper (no code to find or type).
export const brand = "Goodwell";
export const domain = "goodwell.com/welcome";

export const product = {
  name: catalog.goodwellSleep60.title,
  size: "60 gummies",
  flavor: "Lavender Berry",
  image: catalog.goodwellSleep60.image,
  price: catalog.goodwellSleep60.price,
  offerPrice: "$26.99",
  purchase: "One-time purchase",
  rating: 4.8,
  reviews: "2,140",
};

export const offer = {
  percent: "10% off",
  code: "WELCOME10",
  savings: "$3.00",
};

export const ad = {
  handle: "goodwell",
  // Two lines, like 09's ad, so the tag and jar sit in the same place.
  headline: ["10% off", "your first jar."],
  tag: "Welcome offer · No code needed",
  cta: "Claim 10% off",
  caption: "Daily Sleep Gummies for calmer nights. Your welcome perk is waiting.",
  tags: "#goodwell #sleep",
};

export const hero = {
  eyebrow: "From your ad",
  headline: "Your welcome perk is ready.",
  sub: "The Daily Sleep jar from your ad, with 10% already taken off.",
};

export const applied = {
  banner: "Your 10% welcome offer is already applied.",
  detail: `${offer.code} · Save ${offer.savings} on your first jar`,
  cta: `Add my first jar · ${product.offerPrice}`,
  reassurance: "No code needed. The perk stays on this jar through checkout.",
};

export const steps = ["Ad with welcome offer", "Landing page, offer applied", "Product and cart, offer attached"];

// 11b: the same ad, but the tap lands on the page with Crossword's composer
// and the Storybook's post-checkout offer knock (NDG-08) above it. The knock
// clamps to two lines, so it carries a short line; a tap on the card opens
// the chat on the full offer, the coupon as the trail's last chip.
export const knock = {
  line: "Welcome! Your 10% off is waiting. Want it on your first jar?",
  doors: [{ label: "No, thanks" }, { label: "Show coupon", primary: true }],
  greet: `Welcome from our ad! As a thank-you, enjoy ${offer.percent} your first jar of Daily Sleep Gummies. Here's your code, ready at checkout.`,
  followups: ["Trending now", "Best deals"],
};

export const composerSteps = ["Ad with welcome offer", "Landing page, the offer knocks above the composer", "Card tapped: the chat opens on the offer"];
