import { cutouts } from "../../assets/products/cutouts";

export const script = {
  brand: "FIELDSTRIDE",
  userMessage: "Do you have this in stock?",
  assistantMessage:
    "Yes, this is available in your preferred size, with delivery by Friday. The other color you viewed is currently out of stock.",
};

export const product = {
  image: cutouts.leatherSneakers,
  alt: "Minimal leather sneakers",
  brand: "FIELDSTRIDE",
  title: "Minimal Leather Sneakers",
  price: "$145",
  size: "US 9",
  delivery: "Friday",
  colors: [
    { name: "Black", available: true },
    { name: "Tan", available: false },
  ],
};
