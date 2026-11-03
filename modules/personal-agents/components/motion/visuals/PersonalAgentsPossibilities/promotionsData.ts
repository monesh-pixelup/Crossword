import { bags } from "./data";

// Personal Agents → Promotions & Upselling. Same Trailwell line-up as
// Possibilities. The Roam Pro ($219) is the one new product, the upgrade
// the brief asks for; it borrows the Roam's photo.
export const upgrade = {
  ask: "Is the Weekender my best pick?",
  from: bags.weekender,
  to: { name: "Roam Pro", size: "40L", price: 219, image: bags.roam.image },
  reply: "Fits your $200 budget. For $71 more, the Roam Pro is our pick:",
  benefits: ["2.1 lb, a pound lighter than the Weekender", "Lifetime warranty, up from 5 years"],
};

export const promo = {
  ask: "Find a small Trailwell carry-on.",
  reply: "The Overnight is in our Fall Getaway sale:",
  bag: bags.overnight, price: 112, was: 132,
  offer: "15% off",
  conditions: "Ends Nov 30 · one per order",
};

export const priorities = {
  ask: "Find travel essentials for my trip.",
  reply: "Our newest carry-on, and its bundle:",
  launch: { bag: bags.weekender, tag: "New" },
  bundle: { name: "Weekender + 3 cubes", price: 168, was: 192, image: bags.weekender.image },
  conditions: "With the Weekender only · while supplies last",
};
