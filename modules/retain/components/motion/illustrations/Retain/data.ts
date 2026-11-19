import jacketImage from "@/modules/shared/assets/motion/scenarios/retain/jacket.jpg";
// 3:1 share image (the jacket shot with its own backdrop extended) — the
// landscape og:image Messages crops a link preview to.
import jacketShareImage from "../../../../assets/motion/scenarios/retain/jacket-share.jpg";
import handbagAlt1Image from "@/modules/shared/assets/motion/scenarios/retain/handbag-alt-1.jpg";
import handbagAlt2Image from "@/modules/shared/assets/motion/scenarios/retain/handbag-alt-2.jpg";
import margotPreviewImage from "../../../../assets/motion/scenarios/retain-v2/marais-margot-preview.png";
import dusklightShareImage from "../../../../assets/motion/scenarios/retain-v2/dusklight-arc-share.png";
import aurelleOfferImage from "../../../../assets/motion/scenarios/retain-v2/aurelle-pendant-offer.png";
import proteinmaxShareImage from "../../../../assets/motion/scenarios/retain-v2/proteinmax-replenishment-share.png";
import { catalog } from "../../brands/catalog";

const jacket = jacketImage.src;
const jacketShare = jacketShareImage.src;
const handbagAlt1 = handbagAlt1Image.src;
const handbagAlt2 = handbagAlt2Image.src;
const margotPreview = margotPreviewImage.src;
const dusklightShare = dusklightShareImage.src;
const aurelleOffer = aurelleOfferImage.src;
const proteinmaxShare = proteinmaxShareImage.src;

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
    image: margotPreview,
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
  brand: catalog.dusklightArc.brand,
  message: "Good news, the Arc Task Light you were looking at is back in stock in matte black.",
  product: {
    image: dusklightShare,
    alt: "DUSKLIGHT Arc Task Light on a desk",
    brand: catalog.dusklightArc.brand,
    title: catalog.dusklightArc.title,
    price: catalog.dusklightArc.price,
  },
  status: "Back in stock",
  // Swatch fill is product data (the shade itself), not a system color.
  shade: { name: "Matte Black", swatch: "#252525", note: "Your finish" },
  cta: "Add to cart",
};

export const priceDrop = {
  brand: catalog.aurelleRosePendant.brand,
  message:
    "You were looking at this pendant earlier. It’s now 20% off with a new coupon. Want to use it before the offer ends?",
  product: {
    image: aurelleOffer,
    alt: "Aurelle Rose Gold Teardrop Pendant Necklace",
    brand: catalog.aurelleRosePendant.brand,
    title: catalog.aurelleRosePendant.title,
  },
  was: catalog.aurelleRosePendant.price,
  now: "$108",
  discount: "20% off",
  coupon: "ROSE20",
  cta: "Apply coupon",
};

export const replenishment = {
  brand: catalog.proteinWhey.brand,
  message:
    "Running low on your usual whey protein? It’s around the time you normally restock. Want me to add it to your cart?",
  product: {
    image: proteinmaxShare,
    alt: `${catalog.proteinWhey.brand} ${catalog.proteinWhey.title}, Double Rich Chocolate`,
    brand: catalog.proteinWhey.brand,
    title: `${catalog.proteinWhey.title}, 2.17 LB`,
    price: catalog.proteinWhey.price,
  },
  label: "Your usual",
  lastOrder: "1 × 2.17 LB",
  cta: "Reorder",
};
