import type { Metadata } from "next";
import { Testimonials } from "@/modules/landing";
import {
  ConversionAssist,
  HumanMode,
  HumanTouch,
  ProactiveMessages,
  ProductDiscovery,
  SellHero,
  StorefrontPresence,
  Upsell,
} from "@/modules/sell";

export const metadata: Metadata = {
  title: "Sell",
  description:
    "From the first question to the final click, Crossword guides every shopper toward the product that's perfect for them.",
};

export default function SellPage() {
  return (
    <main>
      <SellHero />
      <ProductDiscovery />
      <HumanTouch />
      <HumanMode />
      <Upsell />
      <ConversionAssist />
      <ProactiveMessages />
      <StorefrontPresence />
      <Testimonials variant="sell" />
    </main>
  );
}
