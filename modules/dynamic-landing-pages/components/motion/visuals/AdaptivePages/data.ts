import { catalog } from "../../brands/catalog";

export const landing = {
  domain: "goodwell.com/sleep",
  eyebrow: catalog.goodwellSleep60.title,
  sub: "Calmer nights and clear mornings, without the melatonin.",
  cta: "Shop now",
  steps: ["Campaign ad", "Dedicated landing page"],
};

export const pdp = {
  brand: catalog.auraEarbuds.brand,
  domain: "aura.com/earbuds/wireless",
  category: "Earbuds",
  product: { ...catalog.auraEarbuds, eyebrow: "Wireless · In-ear" },
  description: "Your everyday sound, in ivory. Earbuds and a matching charging case.",
  detailLabel: "Specifications",
  cta: "Add to bag",
  question: "Do these come with a charging case?",
  answer:
    "Yes, the Wireless Earbuds include a matching ivory charging case. The earbuds and case come together for $89.",
  // Proactive follow-ups after the reply (§15): none predicts a next line.
  followups: ["View specifications", "See the ivory finish"],
  steps: ["Storefront with Ask AI", "Ask AI drawer"],
};
