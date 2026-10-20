// Human Mode — "A concierge that knows when to step in." Three
// 327x336 chat shells: proactive help, comparison guidance, and
// purchase completion, all in one Sorelle Labs skincare thread.
import type { CommerceProduct } from "../../components/ill/CommerceProductCard";
import hydratingSerum from "../../assets/scenarios/human-mode/hydrating-serum.png";
import calmingSerum from "../../assets/scenarios/human-mode/calming-serum.png";

export const brand = "Sorelle Labs";

export const knowsWhenToHelp = {
  proactiveMessage: "Wondering if this serum works for sensitive skin?",
  userMessage: "Yes, my skin reacts to fragrance.",
  assistantMessage: "This one is fragrance-free and made for sensitive skin. Want me to check the ingredients?",
  product: {
    id: "daily-hydrating-serum",
    image: hydratingSerum,
    brand: "Sorelle Labs",
    title: "Daily Hydrating Serum",
    price: "$48",
  } satisfies CommerceProduct,
  ctaLabel: "Check ingredients",
};

export const knowsHowToGuide = {
  userMessage: "Which of these is better for sensitive skin?",
  assistantMessage: "The Calming Serum is a better match. It's fragrance-free, has a simpler formula, and costs $16 less.",
  recommended: { id: "calming-serum", name: "Calming Serum", price: "$52", image: calmingSerum },
  current: { id: "daily-hydrating-serum", name: "Daily Hydrating Serum", price: "$68", image: hydratingSerum },
};

export const knowsWhenYoureReady = {
  userMessage: "Okay, I'll take the Calming Serum.",
  assistantMessage: "Great. I've selected the 30 ml Calming Serum for you.",
  product: {
    id: "calming-serum-30ml",
    image: calmingSerum,
    brand: "Sorelle Labs",
    title: "Calming Serum — 30 ml",
    price: "$52",
  } satisfies CommerceProduct,
};
