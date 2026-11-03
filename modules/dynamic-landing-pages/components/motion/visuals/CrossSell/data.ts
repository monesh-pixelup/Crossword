import courtProfileImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/stride-premium/court-01-profile.png";
import courtOverheadImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/stride-premium/court-01-overhead.png";
import { catalog } from "../../brands/catalog";


const courtProfile = courtProfileImage.src;
const courtOverhead = courtOverheadImage.src;

export const brand = catalog.strideCourt01.brand;
export const url = "stride.com/products/court-01";

export const product = {
  ...catalog.strideCourt01,
  name: catalog.strideCourt01.title,
  eyebrow: "Stride · Leather collection",
  sizes: ["US 9", "US 9.5", "US 10", "US 10.5", "US 11"],
};

export const gallery = [
  { image: product.image, alt: "Court 01 Leather Sneaker in chalk, three-quarter view" },
  { image: courtProfile, alt: "Court 01 Leather Sneaker, side profile" },
  { image: courtOverhead, alt: "Court 01 Leather Sneaker, overhead view" },
];

export const added = { label: "Added to bag", detail: `${product.size} · ${product.color} · ${product.price}` };

export const thinking = "Building your footwear rotation…";
export const intro = "Your everyday pair is sorted. Add a suede runner for casual days or an espresso loafer for smarter plans.";

export type Rec = { id: string; title: string; price: string; image: string; tag: string; reason: string };
export const recs: Rec[] = [
  { ...catalog.strideSuedeRunner, tag: "Taupe · US 10", reason: "Soft suede and tonal mesh for a more relaxed look." },
  { ...catalog.stridePennyLoafer, tag: "Espresso · US 10", reason: "Polished leather for days that call for a smarter shoe." },
];

export const picks = recs.map((r) => r.id);
const total = [product, ...recs].reduce((sum, p) => sum + Number(p.price.slice(1)), 0);

export const bag = {
  title: "Your bag",
  meta: `3 items · $${total}`,
  note: "Free shipping unlocked on orders over $200.",
  cta: "Checkout",
};

export const followUps = [
  { id: "care", text: "Leather & suede care" },
  { id: "gift", text: "Compare these styles" },
];

export const steps = [
  "Default PDP",
  "Added to bag",
  "Crossword opens",
  "Personalised picks",
  "Runner added",
  "Bag updated",
];
