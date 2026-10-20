import type { ComponentType } from "react";
import { ConversationalDiscovery, OutfitBuilding, ProductQa, TryItOn } from "./scenes-a";

/*
 * Registry of the product-discovery visuals, group A. `width` × `height` is
 * the scene's native size; `duration` is how long (ms) after `play` turns
 * true the script takes to settle, measured in the source build (settle time of
 * its timeline; typing jitter moves it by roughly ±150ms).
 */

export type DiscoveryScene = {
  Component: ComponentType<{ play?: boolean }>;
  label: string;
  width: number;
  height: number;
  duration: number;
};

export const discoveryScenesA = {
  "conversational-discovery": {
    Component: ConversationalDiscovery,
    label:
      "A shopper asks a chat assistant for something for a beach wedding that is breathable and not tight; the assistant replies, notes it is using their saved size and linen preference, and shows three linen recommendations.",
    width: 450,
    height: 500,
    duration: 6500,
  },
  "try-it-on": {
    Component: TryItOn,
    label:
      "A shopper asks whether a linen dress would work on them, uploads a photo when the assistant offers a try-on, and gets a personalised try-on image styled to their preferred relaxed fit.",
    width: 450,
    height: 500,
    duration: 7300,
  },
  "product-qa": {
    Component: ProductQa,
    label:
      "A shopper asks whether a laptop is good enough for them; the assistant answers based on how they use their laptop and notes it drew on their browsing history and past priorities.",
    width: 450,
    height: 500,
    duration: 5200,
  },
  "outfit-building": {
    Component: OutfitBuilding,
    label:
      "A shopper asks what to wear with a cotton shirt; the assistant suggests straight-leg trousers and leather sneakers based on their style and dinner plans, shown as product cards.",
    width: 450,
    height: 500,
    duration: 6400,
  },
} satisfies Record<string, DiscoveryScene>;
