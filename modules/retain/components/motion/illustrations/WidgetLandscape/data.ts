import jacketImage from "../../../../assets/motion/scenarios/retain/jacket.jpg";
import jacketModelImage from "../../../../assets/motion/scenarios/retain/jacket-model.png";
import jacketDetailImage from "../../../../assets/motion/scenarios/retain/jacket-detail.jpg";
import handbagViewedImage from "../../../../assets/motion/scenarios/retain/handbag-viewed.jpg";
import handbagAlt1Image from "../../../../assets/motion/scenarios/retain/handbag-alt-1.jpg";
import handbagAlt2Image from "../../../../assets/motion/scenarios/retain/handbag-alt-2.jpg";

const jacket = jacketImage.src;
const jacketModel = jacketModelImage.src;
const jacketDetail = jacketDetailImage.src;
const handbagViewed = handbagViewedImage.src;
const handbagAlt1 = handbagAlt1Image.src;
const handbagAlt2 = handbagAlt2Image.src;

// Two landscape widget scenarios (1280x509, the framed canvas Visuals
// 21-23 use). Dialogue is the supplied brief verbatim. No audience count
// is given anywhere in the brief, so 01 uses the neutral "Matched
// shoppers" label rather than inventing a number.

export const demandDiscovery = {
  brand: "HALDEN",
  url: "ADMIN.HALDEN.CO/NEW-ARRIVALS",
  // Background admin page — this week's launches, the products the
  // audience is being matched against.
  arrivals: [
    { image: handbagViewed, title: "Margot Top-Handle Bag", price: "$248" },
    { image: handbagAlt1, title: "Isla Shoulder Bag", price: "$215" },
    { image: handbagAlt2, title: "Noor Mini Top-Handle", price: "$265" },
  ],
  brandRequest:
    "Find shoppers who told us what they wanted, but we didn’t have a suitable product then and whose requests match this week’s new arrivals. Exclude anyone who has since bought a suitable alternative from us.",
  reply: "Here’s your audience, should I send them all a personalized message with a relevant launch product link?",
  approval: "Yes!",
  audience: {
    label: "Matched shoppers",
    source: "From past conversations",
    conditions: [
      "Previously requested an unavailable product",
      "Matches this week’s new arrivals",
      "Has not purchased a suitable alternative",
    ],
    // One illustrative match — a past request paired with the launch it
    // now maps to. Not a shopper record; replace with real scenario data.
    example: {
      image: handbagViewed,
      request: "“Looking for a cognac top-handle bag”",
      match: "Margot Top-Handle Bag · New this week",
    },
    action: "Send personalized messages",
  },
};

export const sizeConfidence = {
  brand: "OSTROM",
  url: "OSTROM.CO/JACKETS/WAXED-FIELD-JACKET",
  product: {
    image: jacket,
    alt: "Ostrom Waxed Field Jacket in olive",
    brand: "OSTROM",
    title: "Waxed Field Jacket",
    subtitle: "Olive · Waxed cotton",
    price: "$189",
    rating: 4.6,
    ratingCount: "212",
    sizes: ["XS", "S", "M", "L", "XL"],
    gallery: [jacket, jacketModel, jacketDetail],
    color: "Olive",
    description:
      "A waxed cotton field jacket with a corduroy collar, built to shed rain and soften with every wear.",
    details: ["Waxed cotton shell", "Corduroy collar", "Two bellows pockets", "Regular fit"],
  },
  userQuestion: "I'm between a small and medium. Which one should I get?",
  recommendation:
    "Based on the fit of this style and the measurements you shared, I'd go with a Medium. The Small runs closer through the shoulders. If you prefer a more fitted look, Small could work too.",
  userChoice: "Medium it is.",
  confirmation: "Good choice. I've added the medium to your cart.",
  sizeOptions: [
    { size: "S", selected: false },
    { size: "M", selected: true },
  ],
  recommendedLabel: "Recommended fit",
  addedLabel: "Added to cart",
};
