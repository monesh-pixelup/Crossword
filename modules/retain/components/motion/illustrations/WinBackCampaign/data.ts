import { catalog } from "../../brands/catalog";
import goodwellShareImage from "../../../../assets/motion/scenarios/retain-v2/goodwell-winback-share.png";

const goodwellShare = goodwellShareImage.src;

export const brand = catalog.goodwellSleep60.brand;

export const script = {
  assistantMessage:
    "It's been a while since your last order. Daily Sleep Gummies are now available in a 60-count jar if you'd like a longer supply.",
};

export const previous = {
  label: "Previously purchased",
  image: catalog.goodwellSleep28.image,
  alt: "Goodwell Daily Sleep Gummies, 28 count",
  title: "Daily Sleep Gummies, 28 count",
  meta: "Ordered in March",
};

export const next = {
  label: "Larger size",
  image: goodwellShare,
  alt: "Goodwell Daily Sleep Gummies, 60 count",
  brand: catalog.goodwellSleep60.brand,
  title: "Daily Sleep Gummies, 60 count",
  subtitle: "Now in a 60-count jar",
  price: catalog.goodwellSleep60.price,
  cta: "See the 60-count jar",
};
