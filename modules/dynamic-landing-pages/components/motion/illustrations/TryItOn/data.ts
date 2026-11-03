import { catalog } from "../../brands/catalog";
import shopperUploadImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/try-it-on/shopper-upload.jpg";
import tryonResultImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/try-it-on/tryon-consistent.webp";

const shopperUpload = shopperUploadImage.src;
const tryonResult = tryonResultImage.src;

// Copy preserved verbatim from the supplied brief.
export const script = {
  brand: catalog.maraisBalloonDress.brand,
  userMessage: "Would this dress work on me?",
  assistantOffer: "Absolutely. I'll show you how it looks on you, simply upload your image.",
  assistantResult: "Since you usually prefer a relaxed fit, I've kept the styling true to that.",
};

// Upload and try-on retain the same shopper; the result uses the referenced dress.
export const referencedProduct = {
  ...catalog.maraisBalloonDress,
  alt: "Referenced dress",
};

export const media = {
  dressReference: catalog.maraisBalloonDress.image,
  shopperUpload,
  tryonResult,
};
