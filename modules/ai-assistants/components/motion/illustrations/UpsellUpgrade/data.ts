import { catalog } from "../../brands/catalog";

export const script = {
  brand: catalog.hearthwareCompact.brand,
  userMessage: "I'm looking at this air fryer.",
  assistantMessage:
    "This one will work, but I'd recommend the next model up for you. You've previously bought for a family of four, and this smaller basket may mean cooking in batches. The larger model gives you more capacity without a significant jump in price.",
};

// Household size + purchase history are already explicit in the reply
// above ("previously bought for a family of four") — Insight only adds
// the one signal that isn't already visible: price sensitivity.
export const insightLines = ["You've tended to go mid-range rather than premium before."];

export const current = {
  ...catalog.hearthwareCompact,
  name: catalog.hearthwareCompact.title,
  capacity: catalog.hearthwareCompact.size,
};

export const recommended = {
  ...catalog.hearthwareFamily,
  name: catalog.hearthwareFamily.title,
  capacity: catalog.hearthwareFamily.size,
};
