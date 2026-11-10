import type { SceneEntry } from "../motion/scene-panel";
import {
  BrandedWidgetMotion,
  BrowseUpsellMotion,
  BundleBuildingMotion,
  CartUpsellOfferMotion,
  ComparisonGuidanceMotion,
  CompleteChannelDeploymentMotion,
  ConversationalDiscoveryMotion,
  CrossSellMotion,
  DecisionSupportMotion,
  GiftFinderMotion,
  GuidedFinderMotion,
  HumanModeMotion,
  OutfitBuildingMotion,
  PlaceItWhereverMotion,
  PriceObjectionMotion,
  ProactiveInterventionMotion,
  ProductComparisonMotion,
  ProductQaMotion,
  PurchaseConfirmationMotion,
  ReturnVisitComparisonMotion,
  SizeFitMotion,
  StockAvailabilityMotion,
  TryItOnMotion,
  UpsellUpgradeMotion,
  VisualDiscoveryMotion,
} from ".";

/*
 * The Sell page's scenes, by slug. `width` × `height` is each visual's drawn size in the source build;
 * `duration` is how long its script takes to settle once it starts (its last change, measured in the source
 * build, plus a short margin for the final transition). Render them with `root={SellMotionRoot}`.
 */

/** Product discovery 09–16: the 738 × 680 maroon frame with a chat window. */
export const discoveryScenes = {
  "conversational-discovery": {
    Component: ConversationalDiscoveryMotion,
    label:
      "A shopper asks for something for a beach wedding, saying they run hot and hate anything tight; the assistant replies with three linen dresses, a sea glass maxi, a coral midi and a lavender maxi.",
    width: 738,
    height: 680,
    duration: 5900,
  },
  "try-it-on": {
    Component: TryItOnMotion,
    label:
      "A shopper asks whether a dress would work on them, uploads a photo when the assistant offers a try-on, and gets a personalised try-on image.",
    width: 738,
    height: 680,
    duration: 7300,
  },
  "product-qa": {
    Component: ProductQaMotion,
    label:
      "A shopper asks whether a laptop is good enough for them; the assistant answers based on how they use their laptop.",
    width: 738,
    height: 680,
    duration: 5200,
  },
  "outfit-building": {
    Component: OutfitBuildingMotion,
    label:
      "A shopper says they love a shirt and asks what to wear with it; the assistant suggests pieces to go with it, shown as product cards.",
    width: 738,
    height: 680,
    duration: 5800,
  },
  "guided-finder": {
    Component: GuidedFinderMotion,
    label:
      "A shopper asks for help finding the right foundation. The assistant asks about their preferred finish, what they want to cover and their skin type, then recommends a foundation.",
    width: 738,
    height: 680,
    duration: 7300,
  },
  "visual-discovery": {
    Component: VisualDiscoveryMotion,
    label:
      "A shopper uploads a photo of a lamp and asks for something like it. The assistant shows three matching lamps: an aged brass triple-dome, an asymmetric two-dome and a copper four-dome.",
    width: 738,
    height: 680,
    duration: 5100,
  },
  "size-fit": {
    Component: SizeFitMotion,
    label: "A shopper asks whether a helmet will fit them, and the assistant recommends the right size for them.",
    width: 738,
    height: 680,
    duration: 4200,
  },
  "gift-finder": {
    Component: GiftFinderMotion,
    label:
      "A shopper asks for a birthday gift for their mum, around $150. Drawing on past gifts, the assistant notes she prefers simple gold jewellery and shows three options under $150.",
    width: 738,
    height: 680,
    duration: 5700,
  },
} satisfies Record<string, SceneEntry>;

/** Upsell 17–20: a phone chat on the 738 × 680 maroon frame. */
export const upsellScenes = {
  "upsell-upgrade": {
    Component: UpsellUpgradeMotion,
    label:
      "A shopper says they're looking at a compact air fryer. Knowing they've bought for a family of four, the assistant recommends the larger family model and compares the two: 6L for $99 against 4L for $89.",
    width: 738,
    height: 680,
    duration: 5700,
  },
  "cross-sell": {
    Component: CrossSellMotion,
    label:
      "A shopper says they'll take a gold teardrop pendant. The assistant suggests a matching chain-link bracelet and beaded anklet.",
    width: 738,
    height: 680,
    duration: 4600,
  },
  "bundle-building": {
    Component: BundleBuildingMotion,
    label:
      "A shopper says they're getting a new coffee machine. The assistant suggests bundling it with a milk frother, reusable filter and coffee starter pack, shown as a three-item bundle.",
    width: 738,
    height: 680,
    duration: 5700,
  },
  "browse-upsell": {
    Component: BrowseUpsellMotion,
    label:
      "The assistant points out that the shopper has looked at three headphone models in the $450 to $600 range and suggests a model worth considering at that price point.",
    width: 738,
    height: 680,
    duration: 10000,
  },
} satisfies Record<string, SceneEntry>;

/** Proactive messages 21–23: a storefront in a browser, 1280 × 509, with the assistant opening on its own. */
export const proactiveScenes = {
  "proactive-intervention": {
    Component: ProactiveInterventionMotion,
    label:
      "A Crestline mountain-bike helmet page. The shopping assistant opens on its own, offers to help check the sizing and whether the smaller size is in stock, with Not now and Check smaller size buttons.",
    width: 1280,
    height: 509,
    duration: 7000,
  },
  "comparison-guidance": {
    Component: ComparisonGuidanceMotion,
    label:
      "A foundation product page. The shopping assistant opens on its own and offers to narrow the foundations the shopper has viewed down by finish, coverage, undertone and budget.",
    width: 1280,
    height: 509,
    duration: 7000,
  },
  "return-visit-comparison": {
    Component: ReturnVisitComparisonMotion,
    label:
      "A mesh office chair page the shopper keeps coming back to. The shopping assistant opens on its own and offers to show how it compares with the other options they've viewed.",
    width: 1280,
    height: 509,
    duration: 7000,
  },
} satisfies Record<string, SceneEntry>;

/** Conversion assist 28–33: a phone chat on the 687 × 586 aubergine frame. */
export const assistScenes = {
  "price-objection": {
    Component: PriceObjectionMotion,
    label:
      "A shopper says they're not sure a $68 vitamin C serum is worth the price. The assistant offers similar options for less or to explain what makes it worth it, with Compare benefits and Find alternatives buttons.",
    width: 687,
    height: 586,
    duration: 4900,
  },
  "product-comparison": {
    Component: ProductComparisonMotion,
    label:
      "A shopper asks how a vacuum compares to the Cyclone Max. The assistant says to choose the Cyclone Max if suction matters most, while the Cyclone Pro has a larger 1.5L dustbin and costs $500 less.",
    width: 687,
    height: 586,
    duration: 4900,
  },
  "cart-upsell-offer": {
    Component: CartUpsellOfferMotion,
    label:
      "The assistant points out the shopper's cart is $14 away from a $15 offer and suggests adding the $29 Sorelle Labs Cloud Gel Moisturizer to qualify.",
    width: 687,
    height: 586,
    duration: 8200,
  },
  "stock-availability": {
    Component: StockAvailabilityMotion,
    label:
      "A shopper asks if black leather sneakers are in stock. The assistant confirms their preferred size is available with delivery by Friday, and that the other colour they viewed is out of stock.",
    width: 687,
    height: 586,
    duration: 4500,
  },
  "purchase-confirmation": {
    Component: PurchaseConfirmationMotion,
    label:
      "A shopper says they'll take a relaxed cotton shirt. The assistant has selected their saved size and the olive colour they preferred, ready to add to the cart.",
    width: 687,
    height: 586,
    duration: 4200,
  },
  "decision-support": {
    Component: DecisionSupportMotion,
    label:
      "The assistant offers to compare the three headphones the shopper viewed side by side, from balanced studio sound to the longest battery life.",
    width: 687,
    height: 586,
    duration: 7700,
  },
} satisfies Record<string, SceneEntry>;

export type AssistSceneSlug = keyof typeof assistScenes;

/** Storefront presence: the 413 × 402 aubergine panel (with its caption under it where the visual has one). */
export const storefrontScenes = {
  "brand-adaptability": {
    Component: BrandedWidgetMotion,
    label:
      "One Crossword widget on three storefronts in turn, Sorelle Labs, Trailwell and Brewhaus, restyling its launcher and suggestion chips to match each brand.",
    width: 413,
    // Its 402px panel alone: the caption under it is hidden on the site (.sf-nocap, sell-motion.css).
    height: 402,
    duration: 0,
  },
  "place-it-wherever": {
    Component: PlaceItWhereverMotion,
    label:
      "A storefront page where the Crossword launcher moves to different spots on the page, from a message bar to a corner launcher.",
    width: 413,
    // Its 402px panel alone: the caption under it is hidden on the site (.sf-nocap, sell-motion.css).
    height: 402,
    duration: 0,
  },
  "complete-channel-deployment": {
    Component: CompleteChannelDeploymentMotion,
    label:
      "The same short support conversation shown in turn on a website chat widget, a messaging app, WhatsApp and Instagram, with a channel picker highlighting each one.",
    width: 413,
    height: 402,
    duration: 0,
  },
} satisfies Record<string, SceneEntry>;

/** Human mode 34: three phone chats on the 1280 × 599 aubergine frame. */
export const humanModeScene: SceneEntry = {
  Component: HumanModeMotion,
  label:
    "Three moments in one Sorelle Labs skincare chat: the assistant asks if a serum works for sensitive skin and offers to check the ingredients, then recommends the fragrance-free Calming Serum as a better match that costs $16 less.",
  width: 1280,
  height: 599,
  duration: 24000,
};
