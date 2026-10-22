import type { AiPillOption } from "../../components/ill/AiPills";
import curlingIronImage from "../../../../assets/motion/scenarios/retain/curling-iron.png";

const curlingIron = curlingIronImage.src;

export const brand = "VELA";

export const script = {
  assistantMessage:
    "How's the new curling iron working out? If you'd like, I can show you a few products that work well with it.",
};

export const purchase = {
  image: curlingIron,
  alt: "Ceramic curling iron",
  brand: "VELA",
  title: "Ceramic Curling Iron 25mm",
  status: "Delivered Oct 14",
};

export const replies: AiPillOption[] = [
  { id: "great", text: "It's working great" },
  { id: "compatible", text: "Show compatible products" },
];
