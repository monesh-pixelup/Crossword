import { catalog } from "../../brands/catalog";
import auraReviewImage from "../../../../assets/motion/scenarios/retain-v2/aura-review.png";

const auraReview = auraReviewImage.src;

const product = catalog.auraEarbuds;

export const brand = product.brand;

export const script = {
  assistantMessage:
    "How did everything work out with your new earbuds? If you have a minute, we'd love to hear what you think.",
};

export const purchase = {
  image: auraReview,
  alt: `${product.title} in ${product.color}`,
  brand: product.brand,
  title: product.title,
  status: "Delivered Oct 9",
};

export const feedback = { label: "Rate your experience", action: "Write a review" };
