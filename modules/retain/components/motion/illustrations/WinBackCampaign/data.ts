import calmingSerumImage from "../../../../assets/motion/scenarios/human-mode/calming-serum.png";
import calmingSerum2Image from "../../../../assets/motion/scenarios/retain/calming-serum-2.png";

const calmingSerum = calmingSerumImage.src;
const calmingSerum2 = calmingSerum2Image.src;

export const brand = "SORELLE LABS";

export const script = {
  assistantMessage:
    "It's been a while. A few new skincare products have arrived since your last order, including a new version of one you used to buy.",
};

export const previous = {
  label: "Previously purchased",
  image: calmingSerum,
  alt: "Calming Serum, 30 ml",
  title: "Calming Serum",
  meta: "Ordered in March",
};

export const next = {
  label: "New version",
  image: calmingSerum2,
  alt: "Calming Serum 2.0, 30 ml",
  brand: "SORELLE LABS",
  title: "Calming Serum 2.0",
  subtitle: "Now with ceramides",
  price: "$52",
  cta: "See what's new",
};
