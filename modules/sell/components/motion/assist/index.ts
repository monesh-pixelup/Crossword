import type { SceneEntry } from "../scene-panel";
import { CartUpsellOfferScene } from "./cart-upsell-offer";
import { DecisionSupportScene } from "./decision-support";
import { PriceObjectionScene } from "./price-objection";
import { ProductComparisonScene } from "./product-comparison";
import { PurchaseConfirmationScene } from "./purchase-confirmation";
import { StockAvailabilityScene } from "./stock-availability";

/*
 * The conversion-assistance group of Sell motion visuals (scenarios 28–33):
 * each a 450 × 500 chat on its 687 × 586 art, rendered at native size inside
 * <MotionRoot>. `duration` is about how long (ms) the script takes to settle
 * once `play` turns true, from the beat timings.
 */

export const assistScenes = {
  "price-objection": {
    Component: PriceObjectionScene,
    label:
      "A shopper doubts a $68 vitamin C serum is worth the price. The assistant offers similar options for less or to explain its value, with Find alternatives and Compare benefits buttons.",
    width: 687,
    height: 586,
    duration: 5200,
  },
  "product-comparison": {
    Component: ProductComparisonScene,
    label:
      "A shopper asks how a vacuum compares to the Dyson. The assistant compares the $249 Aeria Cyclone Pro with the $749 Dyson V15 on suction, dustbin size and price.",
    width: 687,
    height: 586,
    duration: 4400,
  },
  "cart-upsell-offer": {
    Component: CartUpsellOfferScene,
    label:
      "The assistant points out a $15 offer on orders over $150, shows the $136 cart's progress toward it and suggests adding an $18 leather wallet.",
    width: 687,
    height: 586,
    duration: 3600,
  },
  "stock-availability": {
    Component: StockAvailabilityScene,
    label:
      "A shopper asks if sneakers are in stock. The assistant confirms size US 9 is available with Friday delivery, in black, and that tan is out of stock.",
    width: 687,
    height: 586,
    duration: 4250,
  },
  "purchase-confirmation": {
    Component: PurchaseConfirmationScene,
    label:
      "A shopper says they'll take a cotton shirt. The assistant has selected their saved size M in olive and shows it with an Add to cart button.",
    width: 687,
    height: 586,
    duration: 3850,
  },
  "decision-support": {
    Component: DecisionSupportScene,
    label:
      "The assistant offers to compare the three Auden Wave Pro headphones the shopper viewed, ivory, olive and mustard, with a Compare products button.",
    width: 687,
    height: 586,
    duration: 3200,
  },
} satisfies Record<string, SceneEntry>;

export type AssistSceneSlug = keyof typeof assistScenes;
