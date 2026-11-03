import { catalog } from "../../brands/catalog";

export const script = {
  brand: catalog.holtCardholder.brand,
  // Proactive message, not a reply to a question — same precedent as
  // BrowseUpsell/23's no-UserTurn opening.
  assistantMessage:
    "You have a $15 offer available on orders over $150. Adding the matching accessory you were looking at would take your cart over the threshold.",
};

export const cart = {
  value: 136,
  threshold: 150,
};

export const offer = {
  savings: "$15",
};

export const accessory = {
  ...catalog.holtCardholder,
  alt: "Matching leather card holder",
};
