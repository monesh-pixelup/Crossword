import { catalog } from "../../brands/catalog";

// Running shoe product shots generated for this scenario (fictional
// models, no branding), on Messages' own light grey so they sit flush
// in the rich-link media strip.
export const brand = catalog.strideCourt01.brand;

export const script = {
  assistantMessage: "Looking for a new pair of shoes? We've got some new arrivals you might like.",
};

export const campaign = { title: "New arrivals: Footwear", domain: "3 styles · stride.com" };

export const arrivals = [
  catalog.strideCourt01,
  catalog.strideSuedeRunner,
  catalog.strideSneakersBlack,
];
