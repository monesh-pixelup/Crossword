import { catalog } from "../../brands/catalog";
import type { CommerceProduct } from "../../components/ill/CommerceProductCard";

export const script = {
  brand: catalog.aurellePendant.brand,
  userMessage: "I need a birthday gift for my mum. Around $150.",
  assistantMessage:
    "Based on the gifts you've bought her before, she tends to prefer simple gold jewellery. I found three options under $150, including this teardrop pendant, which fits the delicate styles she's liked before.",
};

export const insightLines = [
  "She's preferred simple gold jewellery in past gifts.",
  "All three options are within your $150 budget.",
];

export const gifts: CommerceProduct[] = [
  catalog.aurellePendant,
  catalog.aurelleBracelet,
  catalog.aurelleAnklet,
];
