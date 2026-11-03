import { catalog } from "../../brands/catalog";
import merinoCrewneckImage from "@/modules/personal-agents/assets/motion/scenarios/personal-agents/merino-crewneck-wide.png";
import merinoCrewneckThumbnailImage from "@/modules/personal-agents/assets/motion/scenarios/personal-agents/merino-crewneck.jpg";
import merinoHeavyweightImage from "@/modules/personal-agents/assets/motion/scenarios/personal-agents/merino-heavyweight-wide.png";
import type { Run } from "./data";


const merinoCrewneck = merinoCrewneckImage.src;
const merinoCrewneckThumbnail = merinoCrewneckThumbnailImage.src;
const merinoHeavyweight = merinoHeavyweightImage.src;

// Personal Agents → Logged-in Experiences. Account-specific flows: the
// shopper authorizes the brand account first, then Crossword answers
// from it. Sorelle Labs for the return, Marais for the other two.

export interface Item { id: string; name: string; price: number; meta: string; image: string; thumbnailImage?: string }

export const cream: Item = { id: "sorelle-cream", name: catalog.sorelleCream.title, price: 42, meta: "50 ml · Qty 1", image: catalog.sorelleCream.image };
export const crewneck: Item = { id: "merino-crewneck", name: "Merino Crewneck", price: 118, meta: "Oatmeal · Size M", image: merinoCrewneck, thumbnailImage: merinoCrewneckThumbnail };
export const cableKnit: Item = { id: "cable-knit", name: "Heavyweight Cable Knit", price: 165, meta: "Forest · Size M", image: merinoHeavyweight };
export const oliveShirt: Item = { id: "olive-shirt", name: catalog.maraisShirtOlive.title, price: 110, meta: "Olive · Size M", image: catalog.maraisShirtOlive.image };
export const trousers: Item = { id: "tailored-trousers", name: catalog.maraisTailoredTrousers.title, price: 120, meta: "Long inseam · 32", image: catalog.maraisTailoredTrousers.image };

/* 04 — I need to send it back. (Muse · Sorelle Labs) */
export const sendBack = {
  ask: "I need to send back the moisturizer I just got from Sorelle Labs.",
  auth: {
    title: "Sign in to Sorelle Labs",
    meta: "Muse will be able to view your orders and start returns.",
    allow: "Sign in and allow",
  },
  found: "Found your order. It's eligible for a return until Nov 23:",
  order: { number: "Order #SL-20418", status: "Delivered Oct 24" },
  options: [
    { id: "refund", title: "Return for a refund", detail: "$42 back to Visa ending 4821 · free return label" },
    { id: "exchange", title: "Exchange it", detail: "Swap for another Sorelle Labs moisturizer" },
  ],
  confirm: "Return it for a refund.",
  approve: { title: "Confirm return to Sorelle Labs?", meta: "Refund $42.00 to Visa ending 4821", allow: "Confirm return" },
  started: "Return started",
  number: "Return #R-55102",
  steps: [
    "Show the QR code at any UPS Store. No box or printer needed.",
    "Drop it off by Nov 7.",
    "Your $42 refund arrives 5–7 business days after Sorelle Labs receives it.",
  ],
  track: ["Started", "Dropped off", "Refunded"],
};

/* 05 — Find me a sweater with my store credit. (Grok Bot · Marais) */
export const storeCredit = {
  ask: "Find me a wool sweater I can buy with my Marais store credit.",
  auth: {
    title: "Sign in to Marais",
    meta: "Grok Bot will see your store credit, size and saved preferences.",
    allow: "Sign in and allow",
  },
  working: "Getting your Marais account details via Crossword",
  worked: "Got your Marais account details via Crossword",
  account: [
    { label: "Store credit", value: "$150.00" },
    { label: "Size", value: "M" },
    { label: "Prefers", value: "Crew necks, muted colors" },
  ],
  reply: "Two wool sweaters in your size. The crewneck is covered in full by your credit:",
  picks: [
    { item: crewneck, note: "Fully covered by credit", best: true },
    { item: cableKnit, note: "$15 after credit", best: false },
  ],
  choose: "I'll take the merino crewneck.",
  checkout: {
    subtotal: 118, tax: 10.33, shipping: "Free",
    credit: 128.33, due: 0, remaining: 21.67,
  },
  grok: ["Checkout is ready. Your store credit covers the full ", { b: "$128.33" }, ", and nothing is placed until you approve."] as Run[],
  approve: { title: "Approve order with Marais?", meta: "$128.33 from store credit · $0.00 due · $21.67 credit left", allow: "Approve" },
};

/* 06 — Something I like. (Muse · Marais) */
export const somethingILike = {
  ask: "Find me something from Marais I'd actually like.",
  auth: {
    title: "Allow Muse to use your Marais account?",
    meta: "Shares purchase history, loyalty status and past support with Muse.",
    allow: "Allow",
  },
  reply: "Here's what we're going on:",
  // Each fact keeps its source: the Marais account or what Muse shared.
  profile: [
    { label: "Colors", value: "Oatmeal, ivory, olive", from: "Muse" },
    { label: "Size and fit", value: "M, relaxed", from: "Marais" },
    { label: "Bought before", value: "Relaxed Cotton Shirt in Ivory", from: "Marais" },
    { label: "Past support", value: "Exchanged trousers for a longer inseam", from: "Marais" },
    { label: "Loyalty", value: "Gold member · 15% off knitwear", from: "Marais" },
  ],
  recs: "Three picks for you. The crewneck is my top match:",
  spotlight: {
    item: crewneck,
    reasons: ["In your oatmeal palette, relaxed fit in M", "Layers over the Relaxed Cotton Shirt you own"],
    loyalty: { label: "Gold member price", price: 100.3, was: 118 },
  },
  alternatives: [
    { item: oliveShirt, note: "Your shirt, in olive" },
    { item: trousers, note: "Long inseam in stock" },
  ],
};
