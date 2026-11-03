import jacketImage from "../../../../assets/motion/scenarios/retain/jacket.jpg";
// 3:1 share image (the jacket shot with its own backdrop extended) — the
// landscape og:image Messages crops a link preview to.
import jacketShareImage from "../../../../assets/motion/scenarios/retain/jacket-share.jpg";
import handbagViewedImage from "../../../../assets/motion/scenarios/retain/handbag-viewed.jpg";
import handbagAlt1Image from "../../../../assets/motion/scenarios/retain/handbag-alt-1.jpg";
import handbagAlt2Image from "../../../../assets/motion/scenarios/retain/handbag-alt-2.jpg";
import moisturizerImage from "../../../../assets/motion/scenarios/dynamic-landing-page/moisturizer.webp";
import vitaminCSerumImage from "../../../../assets/motion/scenarios/product-usage/vitamin-c-serum.webp";
import { catalog } from "../../brands/catalog";

const jacket = jacketImage.src;
const jacketShare = jacketShareImage.src;
const handbagViewed = handbagViewedImage.src;
const handbagAlt1 = handbagAlt1Image.src;
const handbagAlt2 = handbagAlt2Image.src;
const moisturizer = moisturizerImage.src;
const vitaminCSerum = vitaminCSerumImage.src;

// Retain — five proactive retention messages. Crossword speaks first in
// every one (no shopper ask), so there are no UserTurns. Dialogue is the
// supplied brief verbatim; product facts restate only what each message
// claims (size, shade, price, discount, "your usual").

export const cartRecovery = {
  brand: "Marais",
  timestamp: "Today 4:12 PM",
  message:
    "Still thinking about the jacket you added? It’s still in your size, and I can hold your cart for 24 more hours if you need a bit more time.",
  product: {
    image: jacket,
    alt: "Marais Waxed Field Jacket in olive",
    title: "Waxed Field Jacket",
    detail: "Olive · Size M · $189",
  },
  // What Messages renders for the cart link: the page's share image,
  // its <title>, and the domain.
  preview: { image: jacketShare, title: "Your cart · Waxed Field Jacket, Size M", domain: "marais.co" },
};

export const browseRecovery = {
  brand: "MARAIS",
  message:
    "Still looking for a new handbag? The one you spent the most time on is back in stock, and I found two similar options you might like. Want to see them?",
  viewed: {
    image: handbagViewed,
    alt: "Marais Margot top-handle bag in cognac",
    brand: "MARAIS",
    title: "Margot Top-Handle Bag, Cognac",
    price: "$248",
  },
  viewedLabel: "Recently viewed",
  similarLabel: "Similar options",
  similar: [
    { id: "alt-1", image: handbagAlt1, alt: "Marais Isla slouch shoulder bag", title: "Isla Shoulder Bag", price: "$215" },
    { id: "alt-2", image: handbagAlt2, alt: "Marais Noor mini top-handle bag", title: "Noor Mini Top-Handle", price: "$265" },
  ],
};

export const backInStock = {
  brand: "SORELLE LABS",
  message: "Good news, the moisturizer you were looking at is back in stock in your preferred shade.",
  product: {
    image: moisturizer,
    alt: "Sorelle Labs Skin Tint Moisturizer",
    brand: "SORELLE LABS",
    title: "Skin Tint Moisturizer SPF 30",
    price: "$42",
  },
  status: "Back in stock",
  // Swatch fill is product data (the shade itself), not a system color.
  shade: { name: "03 Warm Ivory", swatch: "#e8c9a8", note: "Your shade" },
  cta: "Add to cart",
};

export const priceDrop = {
  brand: "SORELLE LABS",
  message:
    "You were looking at this serum earlier. It’s now 20% off with a new coupon. Want to use it before the offer ends?",
  product: {
    image: vitaminCSerum,
    alt: "Sorelle Labs Vitamin C Brightening Serum",
    brand: "SORELLE LABS",
    title: "Vitamin C Brightening Serum",
  },
  was: "$68",
  now: "$54.40",
  discount: "20% off",
  coupon: "GLOW20",
  cta: "Apply coupon",
};

export const replenishment = {
  brand: catalog.sorelleHydrating.brand,
  message:
    "Running low on your usual serum? It’s around the time you normally restock. Want me to add it to your cart?",
  product: {
    image: catalog.sorelleHydrating.image,
    alt: `${catalog.sorelleHydrating.brand} ${catalog.sorelleHydrating.title}`,
    brand: catalog.sorelleHydrating.brand,
    title: `${catalog.sorelleHydrating.title}, 30 ml`,
    price: catalog.sorelleHydrating.price,
  },
  label: "Your usual",
  lastOrder: "1 × 30 ml",
  cta: "Reorder",
};
