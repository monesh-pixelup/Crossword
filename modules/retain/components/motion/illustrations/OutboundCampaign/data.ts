import { catalog } from "../../brands/catalog";

// Running shoe product shots generated for this scenario (fictional
// models, no branding), on Messages' own light grey so they sit flush
// in the rich-link media strip.
export const brand = catalog.brewhausMachine.brand;

export const script = {
  assistantMessage: "Looking to make more coffee at home? We've got a few brewing essentials you might like.",
};

export const campaign = { title: "Brewing essentials", domain: "2 products · brewhaus.com" };

export const arrivals = [
  catalog.brewhausMachine,
  catalog.brewhausKit,
];
