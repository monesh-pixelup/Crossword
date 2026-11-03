import { catalog, type CatalogProduct } from "../../brands/catalog";
export type { Run } from "../AiAssistants/data";
import type { Run } from "../AiAssistants/data";

export const $ = (n: number) => `$${Number.isInteger(n) ? n : n.toFixed(2)}`;
const price = (p: CatalogProduct) => Number(p.price.slice(1));
export interface Product { id: string; brand: string; name: string; price: number; note: string; image: string }
export const product = (p: CatalogProduct, note: string, name = p.title): Product => ({
  id: p.id, brand: p.brand, name, price: price(p), note, image: p.image,
});

export const skincare = {
  hydrating: product(catalog.sorelleHydrating, "Daily hydration"),
  calming: product(catalog.sorelleCalming, "Fragrance-free · 30 ml"),
  vitaminC: product(catalog.sorelleVitaminC, "Vitamin C serum"),
};
export const gifts = [
  product(catalog.aurellePendant, "Gold · necklace"),
  product(catalog.aurelleAnklet, "Gold · anklet"),
  product(catalog.aurelleBracelet, "Gold · bracelet"),
];
export const machine = product(catalog.brewhausMachine, "Brushed steel");
export const kit = product(catalog.brewhausKit, "Three-piece brewing kit");
export const sleep = product(catalog.goodwellSleep60, "60 count", "Daily Sleep · 60 count");
export const sleepSmall = product(catalog.goodwellSleep28, "28 count", "Daily Sleep · 28 count");

export const copy = {
  which: {
    ask: "Which serum should I get for my daily routine?",
    picks: ["Three from Sorelle Labs. For everyday hydration, start with the ", { b: "Daily Hydrating Serum" }, "."] as Run[],
    why: "Why is the hydrating serum $16 more?",
    because: ["They're different formulas. Choose by your ", { b: "routine" }, ", rather than price alone:"] as Run[],
  },
  configure: {
    intro: ["The ", { b: "Pro Espresso Machine" }, " is $449. You can add the three-piece brewing kit:"] as Run[],
    ask: "The espresso machine, with the starter kit.",
    done: ["Selected: the ", { b: "Pro Espresso Machine and brewing kit" }, ". Two items, $514 in total."] as Run[],
  },
  shortlist: {
    ask: "Shortlist a few gold gifts under $150.",
    picks: ["Three from ", { b: "Aurelle" }, ", all within your budget:"] as Run[],
    follow: "Which of these is a bracelet?",
    answer: ["The ", { b: "Chain-Link Bracelet" }, ". The others are a necklace and an anklet:"] as Run[],
    choose: "Choose the Chain-Link Bracelet.",
    chosen: ["Selected: the ", { b: "Chain-Link Bracelet" }, " in Gold, $109."] as Run[],
  },
  value: {
    ask: "Which Goodwell sleep jar is better value?",
    pick: [{ b: "The 60-count jar" }, " has the lowest price per gummy:"] as Run[],
  },
};
export const statusLine = { which: "Searching Sorelle Labs serums", shortlist: "Searching Aurelle gifts under $150", value: "Comparing Goodwell Daily Sleep jar sizes" };

export const helmet = product(catalog.crestlineHelmet, "Graphite · MTB");
export const restock = {
  image: helmet.image,
  ask: "Tell me when the Graphite helmet in Medium is back.",
  sold: ["The ", { b: "Enduro MTB Helmet in Medium" }, " is out of stock right now:"] as Run[],
  alternatives: "In stock: Small and Large in Graphite",
  confirm: ["Done. I'll message you here when the ", { b: "Graphite helmet in Medium" }, " is back in stock."] as Run[],
  when: "Thursday, 9:14 AM",
  back: ["Your size is back at CRESTLINE. The ", { b: "Enduro MTB Helmet in Medium" }, " is still $180."] as Run[],
  left: "Medium is available again",
};
// The current price and image match the canonical SKU; the earlier price is an alert fixture.
export const priceProduct = { ...product(catalog.aurellePendant, "Gold · teardrop necklace"), was: 149, now: price(catalog.aurellePendant), target: 135 };
export const priceWatch = {
  ask: "Let me know when this drops below $135.",
  confirm: ["I'll watch Aurelle's ", { b: "Teardrop Pendant Necklace" }, " and message you below $135. It's $149 today."] as Run[],
  when: "Monday, 8:02 AM",
  drop: ["The ", { b: "Teardrop Pendant Necklace" }, " is now $129, below your $135 limit. That's $20 off."] as Run[],
};

export const shopper = { name: "Alex Rivera", email: "alex.rivera@hey.com", card: "Visa ··4417" };
export const orders = {
  helmet: { id: "CR-19876", item: helmet.name, variant: "Graphite · M", price: helmet.price, delivered: "Oct 22", returnBy: "Nov 21", image: helmet.image },
  pendant: {
    id: "AU-20418", item: catalog.aurellePendant.title, variant: "Gold", extra: "Qty 1", price: price(catalog.aurellePendant),
    eta: "Saturday, Oct 31", carrier: "UPS ··4821", image: catalog.aurellePendant.image,
    steps: [{ label: "Ordered", when: "Oct 26" }, { label: "Shipped", when: "Oct 28" }, { label: "In transit", when: "Today" }, { label: "Delivered", when: "Sat" }], at: 2,
  },
};
export const exchange = { id: "EX-5531", to: "L", dropBy: "Nov 12", image: helmet.image };
// Loyalty, return and alert states are browser-local demo fixtures.
export const club = { name: "Aurelle Circle", tier: "Gold", since: "2023", benefit: "$25 off jewellery over $100", off: 25, orders: "2 orders · $238 this year" };
export const loyaltyProduct = product(catalog.aurellePendant, "Gold");
export const cart = {
  machine: { name: machine.name, variant: "Brushed steel", price: machine.price, image: machine.image },
  kit: { name: kit.name, variant: "Three-piece kit", price: kit.price, image: kit.image },
  get total() { return this.machine.price + this.kit.price; },
};
export const mobileCopy = {
  orders: {
    ask: "Where's my order?",
    connect: ["I can check with ", { b: "Aurelle" }, ". Connect your account first. You'll sign in on Aurelle."] as Run[],
    status: ["Your Teardrop Pendant Necklace is in transit and should arrive ", { b: "Saturday, Oct 31" }, "."] as Run[],
  },
  exchange: {
    ask: "I'd like to exchange the helmet I bought last week.",
    found: ["Found it: your ", { b: "Enduro MTB Helmet, Graphite, Medium" }, ", delivered Oct 22."] as Run[],
    eligible: ["It's eligible. Unused helmets can be exchanged or refunded within 30 days of delivery."] as Run[],
    choose: "Exchange it for the Large one.",
    summary: ["Here's the exchange. Same price, so there's nothing to pay."] as Run[],
    confirm: "Confirm the exchange.",
    done: ["Approved. Your Large Graphite helmet ships as soon as UPS scans the original."] as Run[],
  },
  loyalty: {
    ask: "Does my Aurelle Circle benefit apply to this?",
    checking: ["I'll check your Aurelle Circle membership."] as Run[],
    verified: ["You're a ", { b: "Gold" }, " member, and this necklace qualifies:"] as Run[],
    applied: ["Your Gold benefit takes ", { b: "$25 off" }, ", so the Teardrop Pendant Necklace is $104."] as Run[],
  },
  checkout: {
    ask: "Help me buy the espresso machine and brewing kit.",
    found: ["Here are both from ", { b: "BREWHAUS" }, ": the machine is $449 and the three-piece kit is $65."] as Run[],
    cart: ["I've put them in a BREWHAUS cart:"] as Run[],
    check: "Check they're both in stock and confirm the total.",
    verified: ["Both are in stock. Your total is ", { b: "$514" }, ", with free shipping. Tax is calculated at checkout."] as Run[],
    go: "Looks good. Let's check out.",
    handoff: ["Your cart is ready. You'll choose payment on BREWHAUS's checkout; nothing has been charged."] as Run[],
  },
};
