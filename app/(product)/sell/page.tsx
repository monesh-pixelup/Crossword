import type { Metadata } from "next";
import { CtaEnvelope, Testimonials } from "@/modules/landing";
import {
  ConversionAssist,
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
      <Upsell />
      <ConversionAssist />
      <ProactiveMessages />
      <StorefrontPresence />
      <Testimonials />
      <CtaEnvelope />
    </main>
  );
}
