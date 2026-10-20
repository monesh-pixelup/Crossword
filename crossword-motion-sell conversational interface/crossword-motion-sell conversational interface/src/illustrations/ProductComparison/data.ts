import { cutouts } from "../../assets/products/cutouts";

export const script = {
  brand: "AERIA",
  userMessage: "How does this compare to the Dyson?",
  assistantMessage:
    "The Dyson has stronger suction, but this model gives you a larger dustbin and costs $500 less.",
};

export const recommended = {
  name: "Aeria Cyclone Pro",
  image: cutouts.aeriaCycloneProVacuum,
  suction: "Comparable",
  dustbin: "1.5L",
  price: "$249",
};

export const current = {
  name: "Dyson V15",
  image: cutouts.dysonV15Vacuum,
  suction: "Stronger",
  dustbin: "0.76L",
  price: "$749",
};
