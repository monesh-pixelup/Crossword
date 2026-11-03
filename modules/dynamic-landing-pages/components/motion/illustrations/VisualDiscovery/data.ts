import { catalog } from "../../brands/catalog";
import { cutouts } from "../../assets/products/cutouts";
import type { RecommendationProduct } from "../../components/ill/RecommendationProductCard";

export const script = {
  brand: catalog.amberTripod.brand,
  userMessage: "I want something like this.",
  assistantMessage:
    "I found the closest matches. Since you've previously saved warm, ambient lighting, I've prioritised lamps with a similar glow rather than just matching the shape. This one is the closest match.",
};

export const uploadedImage = {
  src: cutouts.referenceLamp,
  alt: "Lamp photo uploaded by the shopper",
};

// "This one is the closest match" is the first item — order carries the
// hierarchy rather than an enlarged card, consistent with not scaling any
// card beyond its authored geometry (same principle applied in scenario 04).
export const matches: RecommendationProduct[] = [
  { id: "tripod-lamp", name: "Warm Tripod Table Lamp", image: catalog.amberTripod.image },
  { id: "mushroom-lamp", name: "Mod Dome Table Lamp", image: catalog.amberDome.image },
  { id: "bedside-lamp", name: "Copper-Rim Bedside Lamp", image: catalog.amberBedside.image },
];
