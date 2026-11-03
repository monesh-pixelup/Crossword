import { catalog } from "../../brands/catalog";
import type { CardFeatureStackedData } from "../../components/ill/CardFeatureStacked";

export const script = {
  brand: catalog.brewhausMachine.brand,
  userMessage: "I'm getting a new coffee machine.",
  assistantMessage:
    "If you're setting this up at home, I'd bundle it with these three: a milk frother, reusable filter and coffee starter pack. They're the accessories you're most likely to need, and buying them together saves you from ordering them separately later.",
};

export const insightLines = ["Matches the accessories from the machine you replaced."];

export const anchor = {
  image: catalog.brewhausMachine.image,
  alt: "Coffee machine being purchased",
  brand: catalog.brewhausMachine.brand,
  title: catalog.brewhausMachine.title,
  price: catalog.brewhausMachine.price,
};

// ILL/Module/Product/Card-Feature-Stacked — added to Figma after this
// kit's first build, replacing the earlier code-only workaround (a text
// label over a row of separate Card-Commerce cards). This is the
// Figma-authored way to show a 3-item bundle as one purchase unit: a
// single card (eyebrow + title + price), with a decorative stack behind
// it signaling "more than one item." Price is a bundle total ($72 summed
// individually) shown slightly discounted to reflect "buying them
// together saves you."
export const bundle = {
  image: catalog.brewhausKit.image,
  eyebrow: "BUNDLE · 3 ITEMS",
  title: catalog.brewhausKit.title,
  price: catalog.brewhausKit.price,
} satisfies CardFeatureStackedData;
