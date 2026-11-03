import { catalog, type CatalogProduct } from "../../brands/catalog";

// Personal Agents → Possibilities. One Trailwell carry-on line-up runs
// through all three visuals so the products never change between them.
export interface Bag { id: string; name: string; size: string; color: string; price: number; image: string }
const bag = (p: CatalogProduct): Bag => ({
  id: p.id, name: p.title, size: p.size ?? "", color: p.color ?? "", price: Number(p.price.slice(1)), image: p.image,
});

export const bags = {
  overnight: bag(catalog.trailwellOvernight),
  weekender: bag(catalog.trailwellWeekender),
  roam: bag(catalog.trailwellRoam),
};

export const $ = (n: number) => `$${Number.isInteger(n) ? n : n.toFixed(2)}`;

/* 01 — What's new? (Muse) */
export const whatsNew = {
  ask: "Find me a new carry-on from Trailwell, under $200.",
  reply: "Three carry-ons just launched this season, all under $200 and ready to ship:",
  picks: [
    { bag: bags.overnight, stock: "In stock", low: false },
    { bag: bags.weekender, stock: "In stock", low: false },
    { bag: bags.roam, stock: "Only 4 left", low: true },
  ],
  muse: [
    "Trailwell's newest carry-ons all fit your budget. The ",
    { b: "Weekender" },
    " at $148 is the best all-rounder; the ",
    { b: "Roam" },
    " has the most room, with 4 left.",
  ] as Run[],
};

/* 02 — Why this one? (Grok Bot) */
export const whyThis = {
  ask: "Why the Weekender for my 3-day work trips?",
  reply: "Here's what sets the Weekender apart:",
  working: "Getting product details from Trailwell via Crossword",
  worked: "Got product details from Trailwell via Crossword",
  benefits: [
    { title: "Lighter weight", detail: "2.4 lb empty, about a pound lighter than most 30L carry-ons" },
    { title: "Built to last", detail: "Recycled ripstop shell, water-resistant zippers" },
    { title: "Lifetime warranty", detail: "Free repair or replacement, no receipt needed" },
  ],
  grok: [
    "On short work trips you're lifting it into overhead bins and carrying it between meetings, so the ",
    { b: "lighter build" },
    " matters most. It holds three days of clothes plus a laptop, and the warranty covers it if a strap or zipper gives out.",
  ] as Run[],
  pick: "My pick for your trips",
};

/* 03 — Is there an offer? (Muse) */
export const offers = {
  ask: "Does Trailwell have any offers on carry-ons right now?",
  reply: "Three offers are available on carry-ons right now:",
  cards: [
    {
      id: "upgrade", label: "Carry-on upgrade", image: bags.roam.image,
      title: "Roam 40L", price: 169, was: 189,
      condition: "When you trade up from the Weekender",
    },
    {
      id: "bundle", label: "Packing-cube bundle", image: bags.weekender.image,
      title: "Weekender + 3 packing cubes", price: 168, was: 192,
      condition: "Cubes ship together · while supplies last",
    },
    {
      id: "seasonal", label: "Fall Getaway", image: bags.overnight.image,
      title: "Overnight 24L", price: 112, was: 132,
      condition: "Ends Nov 30 · one per order",
    },
  ],
  muse: [
    "If you're set on the Weekender, the ",
    { b: "packing-cube bundle" },
    " saves the most, at $24. Want more space? The ",
    { b: "Roam upgrade" },
    " is $20 off. Which would you like?",
  ] as Run[],
};

export type Run = string | { b: string };
