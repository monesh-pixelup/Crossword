import { catalog, type CatalogProduct } from "../../brands/catalog";
import fluxKnitImage from "@/modules/personal-agents/assets/motion/scenarios/personal-agents/sneakers/flux-knit.png";
import court01CobaltImage from "@/modules/personal-agents/assets/motion/scenarios/personal-agents/sneakers/court-01-cobalt.png";
import suedeRunnerEmberImage from "@/modules/personal-agents/assets/motion/scenarios/personal-agents/sneakers/suede-runner-ember.png";
import studioHighBurgundyImage from "@/modules/personal-agents/assets/motion/scenarios/personal-agents/sneakers/studio-high-burgundy.png";

const fluxKnit = fluxKnitImage.src;
const court01Cobalt = court01CobaltImage.src;
const suedeRunnerEmber = suedeRunnerEmberImage.src;
const studioHighBurgundy = studioHighBurgundyImage.src;

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

// 01–03 use a scenario-scoped Stride sneaker line-up; The Case and
// Promotions keep the canonical Trailwell products above.
export const brand = { id: "stride", name: "Stride" };
export const shoes = {
  minimal: { id: "stride-flux-knit", name: "Flux Knit", size: "Unisex", color: "Black / Cobalt", price: 225, image: fluxKnit },
  court: { id: "stride-court-01-cobalt", name: "Court 01", size: "Unisex", color: "Chalk / Cobalt", price: 245, image: court01Cobalt },
  runner: { id: "stride-suede-runner-ember", name: "Suede Runner", size: "Unisex", color: "Taupe / Ember", price: 295, image: suedeRunnerEmber },
  highTop: { id: "stride-studio-high", name: "Studio High", size: "Unisex", color: "Burgundy / Silver", price: 325, image: studioHighBurgundy },
};

/* 01 — What's new? (Muse) */
export const whatsNew = {
  ask: "Find me new sneakers from Stride, under $300.",
  reply: "Three sneakers just launched this season, all under $300 and ready to ship:",
  picks: [
    { bag: shoes.minimal, stock: "In stock", low: false },
    { bag: shoes.court, stock: "In stock", low: false },
    { bag: shoes.runner, stock: "Only 4 left", low: true },
  ],
  muse: [
    "Stride's newest sneakers all fit your budget. The ",
    { b: "Court 01" },
    " at $245 is the best all-rounder; the ",
    { b: "Suede Runner" },
    " is the softest, with 4 left.",
  ] as Run[],
};

/* 02 — Why this one? (Grok Bot) */
export const whyThis = {
  ask: "Why the Court 01 for my daily commute?",
  reply: "Here's what sets the Court 01 apart:",
  working: "Getting product details from Stride via Crossword",
  worked: "Got product details from Stride via Crossword",
  meta: "Leather sneaker",
  benefits: [
    { title: "Lighter weight", detail: "11 oz per shoe, lighter than most leather court sneakers" },
    { title: "Built to last", detail: "Full-grain leather on a stitched cupsole you can resole" },
    { title: "2-year warranty", detail: "Free repair or replacement for defects" },
  ],
  grok: [
    "On a daily commute you're on your feet and in and out of transit, so the ",
    { b: "lighter build" },
    " matters most. The stitched sole stands up to daily wear, and the warranty covers it if the sole or stitching gives out.",
  ] as Run[],
  pick: "My pick for your commute",
  pickMeta: "2-year warranty",
};

/* 03 — Is there an offer? (Muse) */
export const offers = {
  ask: "Does Stride have any offers on sneakers right now?",
  reply: "Three offers are available on sneakers right now:",
  cards: [
    {
      id: "upgrade", label: "Sneaker upgrade", image: shoes.runner.image,
      title: "Suede Runner", price: 265, was: 295,
      condition: "When you trade up from the Court 01",
    },
    {
      id: "bundle", label: "Care-kit bundle", image: shoes.court.image,
      title: "Court 01 + leather care kit", price: 259, was: 279,
      condition: "Kit ships together · while supplies last",
    },
    {
      id: "seasonal", label: "Fall Edit", image: shoes.highTop.image,
      title: "Studio High", price: 276, was: 325,
      condition: "Ends Nov 30 · one per order",
    },
  ],
  muse: [
    "If you're set on the Court 01, the ",
    { b: "care-kit bundle" },
    " adds the kit for $14. Want something softer? The ",
    { b: "Suede Runner trade-up" },
    " is $30 off. Which would you like?",
  ] as Run[],
};

export type Run = string | { b: string };
