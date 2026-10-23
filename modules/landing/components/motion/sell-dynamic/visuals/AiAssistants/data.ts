import { sellDynamicProducts } from "../sellDynamicProducts";
const { cream, lotion, gel, set } = sellDynamicProducts;

// AI Assistants — Sorelle Labs (skincare, Brand registry) inside ChatGPT.
// One transcript feeds all five frames so copy, prices and imagery never
// drift between states. Dialogue is the brief's, verbatim.

export const merchant = "Sorelle Labs";
export const domain = "chatgpt.com";

export interface Product {
  id: string;
  name: string;
  price: string;
  note: string;
  image: string;
}

// The two alternatives are named stand-ins for the brief's "Option 2 / 3"
// placeholders; everything stays under the shopper's $50.
export const picks: Product[] = [
  { id: "cream", name: "Deep Hydration Cream", price: "$42", note: "Rich moisture that never feels sticky", image: cream },
  { id: "lotion", name: "Barrier Repair Lotion", price: "$34", note: "Lightweight daily lotion with ceramides", image: lotion },
  { id: "gel", name: "Cloud Gel Moisturizer", price: "$29", note: "Water-gel texture for normal to dry skin", image: gel },
];

export const bundle: Product = {
  id: "set",
  name: "Deep Hydration Set",
  price: "$55",
  note: "Cream, night mask and travel-size cleanser",
  image: set,
};

export const promo = { name: "Winter Glow Special", detail: "Free gift on orders over $50", resolved: "Free gift included" };

// Inline runs: `b` is ChatGPT's bold for a named product.
export type Run = string | { b: string };

export type Turn =
  | { role: "user"; text: string }
  | { role: "assistant"; text: Run[]; result?: "picks" | "bundle" | "order" };

export const transcript: Turn[] = [
  { role: "user", text: "I'm looking for a moisturizer for dry skin, under $50." },
  {
    role: "assistant",
    text: ["Here are three options in your range. The ", { b: "Deep Hydration Cream" }, " at $42 is especially moisturizing without feeling sticky, according to reviewers."],
    result: "picks",
  },
  { role: "user", text: "I'll go with the Deep Hydration Cream." },
  {
    role: "assistant",
    text: ["For $13 more, the ", { b: "Deep Hydration Set" }, " adds a night mask and a travel-size cleanser. Our ", { b: "Winter Glow Special" }, " also includes a free gift on orders over $50."],
    result: "bundle",
  },
  { role: "user", text: "I'll take the set." },
  { role: "assistant", text: ["Done. Your free gift is added too."], result: "order" },
];

// How many transcript turns each frame shows. 01 adds the in-progress
// reply (status line + loading tiles) after the first user turn.
export const steps = [
  { label: "Customer intent", turns: 1 },
  { label: "Product discovery", turns: 2 },
  { label: "Product selection", turns: 3 },
  { label: "Bundle and promotion", turns: 4 },
  { label: "Conversion", turns: 6 },
] as const;

export const status = "Searching for moisturizers for dry skin";
export const placeholder = "Ask anything";
