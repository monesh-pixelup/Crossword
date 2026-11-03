import { catalog } from "../../brands/catalog";

// Sell: Personalized content. One product and one message from the ad
// through the page: Goodwell's Daily Sleep Gummies, "Better sleep.
// No melatonin." The jar is the same asset in every frame.
export const brand = "Goodwell";
export const domain = "goodwell.com/sleep";

export const product = {
  name: catalog.goodwellSleep60.title,
  image: catalog.goodwellSleep60.image,
  price: catalog.goodwellSleep60.price,
  size: "60 gummies",
};

export const promise = "Better sleep. No melatonin.";

export const ad = {
  handle: "goodwell",
  cta: "Shop now",
  caption: "Magnesium sleep gummies for calmer nights and clear mornings.",
  tags: "#melatoninfree #sleep",
};

export const hero = {
  eyebrow: "From your ad",
  headline: promise,
  sub: "Goodwell Daily Sleep Gummies, with the details you came for.",
};

export const details = {
  eyebrow: "The gummy from your ad",
  headline: "A closer look at Daily Sleep.",
  sub: "Here's the formula, the key ingredient and the routine in one place.",
  cards: [
    { id: "formula", index: "01 / The formula", title: "No melatonin.", body: "Wind down without the next-morning grogginess." },
    { id: "magnesium", index: "02 / The key ingredient", title: "Magnesium, for calm.", body: "Magnesium glycinate with L‑Theanine and chamomile." },
    { id: "routine", index: "03 / The routine", title: "Two gummies before bed.", body: "30 minutes before lights out. A 30-night supply." },
  ],
};

export const purchase = { cta: "Add to cart" };

export const steps = ["Ad creative", "Personalized landing page", "Expanded product details"];
