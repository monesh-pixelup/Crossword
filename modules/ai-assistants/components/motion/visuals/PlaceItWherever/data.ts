// "Place it where it works best" — Figma node 2071:1296 (fileKey
// TiAeD9ICNjjC8N3zoUJExk) only authors a decorative placeholder image for
// this card ("Place Crossword wherever it makes the most sense."); there
// is no existing reference artwork for the launcher/chip states
// themselves. Content below is invented for this brief, following the
// kit's own established "pre-set, tappable" AI Pils copy style (see
// DynamicLandingPage's askAI options) rather than any specific chat
// script — this illustration sells placement flexibility, not a scripted
// shopper conversation.
export const browserUrl = "shop.example.com";

export const suggestions = [
  { id: "gift", text: "Help me find a gift" },
  { id: "compare", text: "Compare these two" },
  { id: "trending", text: "What's trending right now" },
];

export const states = [
  { id: "left", title: "Launcher — left", align: "left" as const, edge: "bottom" as const },
  { id: "right", title: "Launcher — top right", align: "right" as const, edge: "top" as const },
  { id: "expanded", title: "Expanded composer", align: "right" as const, edge: "bottom" as const },
];
