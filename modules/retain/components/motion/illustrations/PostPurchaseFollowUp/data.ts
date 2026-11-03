import type { AiPillOption } from "../../components/ill/AiPills";
import { catalog } from "../../brands/catalog";

const product = catalog.strideCourt01;

export const brand = product.brand;

export const script = {
  assistantMessage:
    "How are the new Court 01s feeling? If you'd like, I can show you a few pieces that work well with them.",
};

export const purchase = {
  image: product.image,
  alt: `${product.title} in ${product.color}`,
  brand: product.brand,
  title: product.title,
  status: "Delivered Oct 14",
};

export const replies: AiPillOption[] = [
  { id: "great", text: "It's working great" },
  { id: "compatible", text: "Show compatible products" },
];
