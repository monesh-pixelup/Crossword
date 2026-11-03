import { bags } from "../PersonalAgentsPossibilities/data";

// AI Assistants → Promotions & Upselling (12–14). Trailwell's line-up from
// the catalog, as in Personal Agents' set. The Roam Pro ($219) is the one
// new product (the upgrade); it borrows the Roam's photo, as there.
// Offer terms and dates are illustrative.
export const upgrade = {
  ask: "A Trailwell carry-on under $200?",
  reply: "For $30 more, the Roam Pro lasts longer:",
  from: { ...bags.roam, note: "In your budget" },
  to: { name: "Roam Pro", size: "40L", price: 219, image: bags.roam.image, note: "Upgrade pick" },
  benefits: ["A pound lighter, at 2.1 lb", "Lifetime warranty, up from 5 years"],
};

export const promo = {
  ask: "Show me small Trailwell carry-ons.",
  reply: "The Overnight is in Trailwell’s Fall sale:",
  bag: bags.overnight,
  price: 112,
  was: 132,
  offer: "Fall Getaway · 15% off",
  why: "Store-only offer · applied at checkout",
  conditions: "Through Nov 30 · one per order · US orders only",
};

export const launches = {
  ask: "Travel gear for a weekend trip?",
  reply: "Trailwell’s new arrival and best seller:",
  launch: { bag: bags.weekender, tag: "New" },
  bestSeller: { bag: bags.roam, tag: "Best seller" },
  conditions: "Free shipping on the Fall collection · US only",
};
